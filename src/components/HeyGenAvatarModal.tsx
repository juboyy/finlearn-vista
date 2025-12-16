import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Mic, MicOff, Phone, Send, Loader2, MessageCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface HeyGenAvatarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  agentAvatar: string;
}

interface ChatMessage {
  role: 'user' | 'avatar';
  content: string;
  timestamp: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

export const HeyGenAvatarModal = ({
  open,
  onOpenChange,
  agentName,
  agentAvatar
}: HeyGenAvatarModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('new');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [hasVideoStream, setHasVideoStream] = useState(false);
  const [videoDebugInfo, setVideoDebugInfo] = useState<string>('');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  
  // Speech recognition for voice input
  const {
    isListening,
    transcript,
    isProcessing: isTranscribing,
    hasFinishedRecording,
    startListening,
    stopListening,
    resetTranscript,
    resetFinished,
  } = useSpeechRecognition();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Keep sessionIdRef in sync
  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected && open) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (!open) setCallDuration(0);
    };
  }, [isConnected, open]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = useCallback(async (retry = 0) => {
    setIsConnecting(true);
    setRetryCount(retry);
    
    try {
      // Create HeyGen session
      const { data, error } = await supabase.functions.invoke('heygen-avatar-session', {
        body: { action: 'create_session' }
      });

      if (error || !data?.success) {
        throw new Error(data?.error || error?.message || 'Failed to create session');
      }

      console.log('HeyGen session created:', data);
      setSessionId(data.session_id);
      sessionIdRef.current = data.session_id;

      // Setup WebRTC
      const pc = new RTCPeerConnection({
        iceServers: data.ice_servers || [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      peerConnectionRef.current = pc;

      // Handle incoming video/audio tracks
      pc.ontrack = (event) => {
        console.log('=== RECEIVED TRACK ===');
        console.log('Track kind:', event.track.kind);
        console.log('Track state:', event.track.readyState);
        console.log('Streams count:', event.streams.length);
        
        if (event.streams[0]) {
          const stream = event.streams[0];
          console.log('Stream tracks:', stream.getTracks().map(t => `${t.kind}: ${t.readyState}`));
          setVideoDebugInfo(`Track: ${event.track.kind}, State: ${event.track.readyState}`);
          
          if (videoRef.current) {
            console.log('Attaching stream to video element');
            videoRef.current.srcObject = stream;
            setHasVideoStream(true);
            setIsConnecting(false);
            
            // Force play with muted fallback for autoplay policy
            videoRef.current.play().then(() => {
              console.log('Video playback started successfully');
            }).catch(err => {
              console.warn('Autoplay blocked, trying muted:', err);
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play().then(() => {
                  console.log('Video playback started (muted)');
                }).catch(e => console.error('Video play failed even muted:', e));
              }
            });
          }
        } else {
          // Direct track without stream
          console.log('Track received without stream, creating new MediaStream');
          if (videoRef.current) {
            const newStream = new MediaStream([event.track]);
            videoRef.current.srcObject = newStream;
            setHasVideoStream(true);
            videoRef.current.play().catch(console.error);
          }
        }
      };

      // ICE candidate handler - send to HeyGen
      pc.onicecandidate = async (event) => {
        if (event.candidate && sessionIdRef.current) {
          console.log('Sending ICE candidate to HeyGen');
          try {
            await supabase.functions.invoke('heygen-avatar-session', {
              body: { 
                action: 'ice', 
                sessionId: sessionIdRef.current,
                candidate: event.candidate.toJSON()
              }
            });
          } catch (iceError) {
            console.warn('ICE candidate send error:', iceError);
          }
        }
      };

      // Connection state monitoring
      pc.onconnectionstatechange = () => {
        const state = pc.connectionState;
        console.log('WebRTC connection state:', state);
        setConnectionState(state);
        
        if (state === 'connected') {
          setIsConnected(true);
          setIsConnecting(false);
          toast.success(`Conectado com Avatar IA - ${agentName}`);
          
          // Send welcome message after connection is confirmed
          setTimeout(() => {
            sendTextToAvatar(`Ola! Sou ${agentName}, seu assistente de IA. Como posso ajudar voce hoje?`);
          }, 1500);
        } else if (state === 'failed') {
          console.error('WebRTC connection failed');
          if (retry < MAX_RETRIES) {
            toast.info(`Reconectando... (${retry + 1}/${MAX_RETRIES})`);
            setTimeout(() => startSession(retry + 1), RETRY_DELAY);
          } else {
            setIsConnecting(false);
            toast.error('Conexao com avatar falhou apos varias tentativas');
          }
        } else if (state === 'disconnected') {
          console.warn('WebRTC connection disconnected');
          setIsConnected(false);
        }
      };

      // ICE connection state monitoring
      pc.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', pc.iceConnectionState);
      };

      // ICE gathering state
      pc.onicegatheringstatechange = () => {
        console.log('ICE gathering state:', pc.iceGatheringState);
      };

      // Process SDP from HeyGen - handle both object and string formats
      if (data.sdp) {
        // Add transceivers to ensure we can receive media
        console.log('Adding transceivers for recvonly');
        pc.addTransceiver('video', { direction: 'recvonly' });
        pc.addTransceiver('audio', { direction: 'recvonly' });
        
        let sdpOffer: RTCSessionDescriptionInit;
        
        // Handle SDP that could be object {type, sdp} or just string
        if (typeof data.sdp === 'object' && data.sdp.sdp) {
          sdpOffer = {
            type: data.sdp.type || 'offer',
            sdp: data.sdp.sdp
          };
        } else if (typeof data.sdp === 'string') {
          sdpOffer = {
            type: 'offer',
            sdp: data.sdp
          };
        } else {
          // Assume it's already in correct format
          sdpOffer = data.sdp as RTCSessionDescriptionInit;
        }

        console.log('Setting remote description (offer)', sdpOffer.type);
        await pc.setRemoteDescription(new RTCSessionDescription(sdpOffer));

        // Create and set local answer
        console.log('Creating answer');
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        // Send answer SDP to HeyGen
        console.log('Sending answer to HeyGen');
        const { data: startData, error: startError } = await supabase.functions.invoke('heygen-avatar-session', {
          body: { 
            action: 'start_session', 
            sessionId: data.session_id,
            sdp: {
              type: answer.type,
              sdp: answer.sdp
            }
          }
        });

        if (startError) {
          console.warn('Start session warning:', startError);
        } else {
          console.log('Start session response:', startData);
        }

        // If HeyGen returns modified SDP, apply it
        if (startData?.sdp) {
          console.log('Received updated SDP from HeyGen');
        }
      } else {
        console.warn('No SDP received from HeyGen session creation');
      }


    } catch (error) {
      console.error('Error starting HeyGen session:', error);

      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes('Concurrent limit reached') || msg.includes('"code":10004') || msg.includes('10004')) {
        setIsConnecting(false);
        toast.error('Limite de sessoes simultaneas do HeyGen atingido. Finalize outras sessoes ou faça upgrade.');
        return;
      }

      if (retry < MAX_RETRIES) {
        toast.info(`Tentando reconectar... (${retry + 1}/${MAX_RETRIES})`);
        setTimeout(() => startSession(retry + 1), RETRY_DELAY);
      } else {
        setIsConnecting(false);
        toast.error('Erro ao conectar com o avatar. Tente novamente.');
      }
    }
  }, [agentName, isConnected, isConnecting]);

  const stopSession = useCallback(async () => {
    if (sessionId) {
      try {
        await supabase.functions.invoke('heygen-avatar-session', {
          body: { action: 'stop_session', sessionId }
        });
      } catch (error) {
        console.error('Error stopping session:', error);
      }
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Stop any ongoing voice recording
    if (isListening) {
      stopListening();
    }

    setSessionId(null);
    sessionIdRef.current = null;
    setIsConnected(false);
    setConnectionState('new');
    setMessages([]);
    setRetryCount(0);
    setHasVideoStream(false);
    setVideoDebugInfo('');
    setIsProcessingVoice(false);
  }, [sessionId, isListening, stopListening]);

  const sendTextToAvatar = useCallback(async (text: string) => {
    if (!sessionIdRef.current || !text.trim()) return;

    setIsSpeaking(true);

    try {
      const { data, error } = await supabase.functions.invoke('heygen-avatar-session', {
        body: { action: 'speak', sessionId: sessionIdRef.current, text }
      });

      if (error) {
        throw error;
      }

      // Add message to chat
      const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'avatar', content: text, timestamp }]);

    } catch (error) {
      console.error('Error sending text to avatar:', error);
      toast.error('Erro ao enviar mensagem para o avatar');
    } finally {
      // Estimate speech duration (roughly 100ms per word)
      const words = text.split(' ').length;
      setTimeout(() => setIsSpeaking(false), words * 150);
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || !isConnected || isSpeaking) return;

    const userMessage = inputText.trim();
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp }]);
    setInputText('');

    // Generate AI response and send to avatar using fetch for SSE handling
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-agent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: `Voce e ${agentName}, um assistente especializado em financas e mercado financeiro. Responda de forma concisa, breve e profissional em portugues. Maximo 2 frases.` },
              ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
              { role: 'user', content: userMessage }
            ],
            agentName,
            useReasoning: false
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`);
      }

      // Parse SSE stream to collect full response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
      
      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // Process line by line
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          
          if (!line || line.startsWith(':')) continue;
          if (!line.startsWith('data: ')) continue;
          
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
            }
          } catch {
            // Ignore parse errors for partial JSON
          }
        }
      }

      const aiResponse = fullContent.trim() || 'Desculpe, nao consegui processar sua mensagem.';
      await sendTextToAvatar(aiResponse);

    } catch (error) {
      console.error('Error generating response:', error);
      await sendTextToAvatar('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    }
  }, [inputText, isConnected, isSpeaking, messages, agentName, sendTextToAvatar]);

  // Handle voice input toggle
  const toggleVoiceInput = useCallback(() => {
    if (!isConnected || isSpeaking) return;
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isConnected, isSpeaking, isListening, startListening, stopListening]);

  // Process voice transcription and send to avatar
  const processVoiceInput = useCallback(async (voiceText: string) => {
    if (!voiceText.trim() || !isConnected || isProcessingVoice) return;
    
    setIsProcessingVoice(true);
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: voiceText, timestamp }]);
    
    try {
      // Use fetch directly to handle SSE streaming response
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-agent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: `Voce e ${agentName}, um assistente especializado em financas e mercado financeiro. Responda de forma concisa, breve e profissional em portugues. Maximo 2 frases.` },
              ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
              { role: 'user', content: voiceText }
            ],
            agentName,
            useReasoning: false
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`);
      }

      // Parse SSE stream to collect full response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
      
      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // Process line by line
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          
          if (!line || line.startsWith(':')) continue;
          if (!line.startsWith('data: ')) continue;
          
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
            }
          } catch {
            // Ignore parse errors for partial JSON
          }
        }
      }

      const aiResponse = fullContent.trim() || 'Desculpe, nao consegui processar sua mensagem.';
      await sendTextToAvatar(aiResponse);

    } catch (error) {
      console.error('Error generating response:', error);
      await sendTextToAvatar('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    } finally {
      setIsProcessingVoice(false);
    }
  }, [isConnected, isProcessingVoice, messages, agentName, sendTextToAvatar]);

  // Effect to handle completed voice transcription
  useEffect(() => {
    if (hasFinishedRecording && transcript && isConnected && !isProcessingVoice) {
      console.log('Voice transcription completed:', transcript);
      processVoiceInput(transcript);
      resetTranscript();
      resetFinished();
    }
  }, [hasFinishedRecording, transcript, isConnected, isProcessingVoice, processVoiceInput, resetTranscript, resetFinished]);

  const handleEndCall = useCallback(() => {
    stopSession();
    onOpenChange(false);
  }, [stopSession, onOpenChange]);

  const handleRetry = useCallback(() => {
    stopSession();
    setTimeout(() => startSession(0), 500);
  }, [stopSession, startSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  // Start session when modal opens
  useEffect(() => {
    if (open && !isConnected && !isConnecting) {
      startSession(0);
    }
    if (!open) {
      stopSession();
    }
  }, [open]);

  const getConnectionStatusText = () => {
    if (isConnecting) {
      return retryCount > 0 ? `Reconectando... (${retryCount}/${MAX_RETRIES})` : 'Conectando ao avatar...';
    }
    if (isConnected) {
      if (isListening) return 'Ouvindo...';
      if (isTranscribing) return 'Transcrevendo...';
      if (isProcessingVoice) return 'Processando...';
      if (isSpeaking) return 'Falando...';
      return `Conectado - ${formatDuration(callDuration)}`;
    }
    return connectionState;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[85vh] p-0 bg-slate-950 border-slate-800 overflow-hidden">
        <DialogDescription className="sr-only">
          Conversa com Avatar IA - {agentName}
        </DialogDescription>
        
        <div className="h-full flex">
          {/* Video Area */}
          <div className="flex-1 flex flex-col relative">
            <DialogHeader className="px-6 py-4 bg-gradient-to-b from-slate-900/90 to-transparent absolute top-0 left-0 right-0 z-10">
              <DialogTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-pastel-purple/50">
                  <img src={agentAvatar} alt={agentName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{agentName}</p>
                  <div className="flex items-center gap-2">
                    {isConnecting && (
                      <Loader2 className="w-3 h-3 animate-spin text-pastel-yellow" />
                    )}
                    {isConnected && (
                      <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-pastel-green animate-pulse' : 'bg-green-500'}`} />
                    )}
                    <p className={`text-sm ${isConnected ? 'text-green-400' : 'text-slate-300'}`}>
                      {getConnectionStatusText()}
                    </p>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            {/* Avatar Video */}
            <div className="flex-1 bg-slate-950">
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={true}
                  onLoadedMetadata={() => {
                    console.log('Video metadata loaded');
                    if (videoRef.current) {
                      console.log('Video dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
                    }
                  }}
                  onPlay={() => console.log('Video playing')}
                  onError={(e) => console.error('Video error:', e)}
                  onLoadedData={() => console.log('Video data loaded')}
                  className="w-full h-full object-contain bg-slate-900"
                />

                {isConnecting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pastel-purple to-pastel-blue mb-6 mx-auto flex items-center justify-center animate-pulse">
                        <Video className="text-slate-800" size={64} />
                      </div>
                      <p className="text-white text-xl font-medium mb-3">Iniciando Avatar IA...</p>
                      <p className="text-slate-400 text-sm">Powered by HeyGen</p>
                      <div className="flex gap-2 justify-center mt-4">
                        <div className="w-3 h-3 bg-pastel-purple rounded-full animate-bounce" />
                        <div className="w-3 h-3 bg-pastel-blue rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                        <div className="w-3 h-3 bg-pastel-pink rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                      </div>
                      {retryCount > 0 && (
                        <p className="text-pastel-yellow text-sm mt-4">
                          Tentativa {retryCount} de {MAX_RETRIES}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Debug info overlay */}
                {!isConnecting && isConnected && !hasVideoStream && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pastel-purple to-pastel-blue mb-4 flex items-center justify-center">
                      <img src={agentAvatar} alt={agentName} className="w-20 h-20 rounded-full object-cover" />
                    </div>
                    <p className="text-white text-lg mb-2">Aguardando video do avatar...</p>
                    <p className="text-slate-400 text-sm">{videoDebugInfo || 'Conectando stream de video...'}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRetry}
                      className="mt-4 border-slate-600"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reconectar
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              {/* Voice Input Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleVoiceInput}
                disabled={!isConnected || isSpeaking || isProcessingVoice}
                className={`w-12 h-12 rounded-full transition-all ${
                  isListening 
                    ? 'bg-pastel-green/30 border-pastel-green animate-pulse' 
                    : isTranscribing || isProcessingVoice
                      ? 'bg-pastel-yellow/30 border-pastel-yellow'
                      : 'bg-slate-800 border-slate-600 hover:bg-slate-700'
                }`}
              >
                {isListening ? (
                  <Mic className="text-pastel-green" />
                ) : isTranscribing || isProcessingVoice ? (
                  <Loader2 className="text-pastel-yellow animate-spin" />
                ) : (
                  <Mic className="text-white" />
                )}
              </Button>
              
              <Button
                onClick={handleEndCall}
                className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600"
              >
                <Phone className="rotate-[135deg]" />
              </Button>

              {!isConnecting && !isConnected && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRetry}
                  className="w-12 h-12 rounded-full bg-slate-800 border-slate-600"
                >
                  <RefreshCw className="text-white" />
                </Button>
              )}
            </div>

            {/* Voice Status Indicator */}
            {(isListening || isTranscribing || isProcessingVoice) && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-slate-800/90 px-4 py-2 rounded-full">
                <p className="text-sm text-white flex items-center gap-2">
                  {isListening && (
                    <>
                      <span className="w-2 h-2 bg-pastel-green rounded-full animate-pulse" />
                      Ouvindo... (fale agora)
                    </>
                  )}
                  {isTranscribing && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-pastel-yellow" />
                      Transcrevendo...
                    </>
                  )}
                  {isProcessingVoice && !isTranscribing && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-pastel-blue" />
                      Processando resposta...
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Chat Sidebar */}
          <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-white font-medium flex items-center gap-2">
                <MessageCircle size={18} />
                Chat com Avatar
              </h3>
            </div>

            <ScrollArea ref={chatScrollRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user' 
                        ? 'bg-pastel-blue/30 text-white' 
                        : 'bg-slate-800 text-slate-200'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs text-slate-500 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
                
                {isSpeaking && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-lg p-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-pastel-green rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-pastel-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-pastel-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-sm text-slate-400">Avatar falando...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-slate-800">
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  disabled={!isConnected || isSpeaking}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!isConnected || !inputText.trim() || isSpeaking}
                  className="bg-pastel-blue hover:bg-pastel-blue/80"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeyGenAvatarModal;
