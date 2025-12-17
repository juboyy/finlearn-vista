import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Mic, MicOff, Phone, Send, Loader2, MessageCircle, RefreshCw, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Room, RoomEvent, Track, RemoteTrack, RemoteTrackPublication, RemoteParticipant, DataPacket_Kind } from "livekit-client";

interface LiveAvatarModalProps {
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

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error';

export const LiveAvatarModal = ({
  open,
  onOpenChange,
  agentName,
  agentAvatar
}: LiveAvatarModalProps) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [isAudioBlocked, setIsAudioBlocked] = useState(false);
  
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const roomRef = useRef<Room | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef<string | null>(null);
  const isConnectingRef = useRef(false);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (connectionStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connectionStatus]);

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

  const cleanupSession = useCallback(async (token?: string) => {
    const tokenToUse = token || sessionTokenRef.current;
    if (!tokenToUse) return;

    console.log('[LiveAvatar] Cleaning up session...');
    try {
      await supabase.functions.invoke('live-avatar-session', {
        body: { action: 'stop', sessionToken: tokenToUse }
      });
    } catch (error) {
      console.warn('[LiveAvatar] Cleanup error:', error);
    }
  }, []);

  const disconnectRoom = useCallback(() => {
    if (roomRef.current) {
      console.log('[LiveAvatar] Disconnecting room...');
      roomRef.current.disconnect();
      roomRef.current = null;
    }
  }, []);

  const startSession = useCallback(async () => {
    if (isConnectingRef.current) {
      console.log('[LiveAvatar] Already connecting, skipping...');
      return;
    }

    isConnectingRef.current = true;
    setConnectionStatus('connecting');
    console.log('[LiveAvatar] Starting session...');

    try {
      // Step 1: Create session token
      console.log('[LiveAvatar] Step 1: Creating token...');
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke('live-avatar-session', {
        body: { action: 'token', language: 'pt-BR' }
      });

      if (tokenError) {
        console.error('[LiveAvatar] Token error:', tokenError);
        throw new Error(tokenError.message || 'Failed to create token');
      }

      if (!tokenData?.success || !tokenData?.session_token) {
        console.error('[LiveAvatar] Token response invalid:', tokenData);
        throw new Error(tokenData?.error || 'No session token received');
      }

      const sessionToken = tokenData.session_token;
      sessionTokenRef.current = sessionToken;
      console.log('[LiveAvatar] Token created, session_id:', tokenData.session_id);

      // Step 2: Start session
      console.log('[LiveAvatar] Step 2: Starting session...');
      const { data: startData, error: startError } = await supabase.functions.invoke('live-avatar-session', {
        body: { action: 'start', sessionToken }
      });

      if (startError) {
        console.error('[LiveAvatar] Start error:', startError);
        throw new Error(startError.message || 'Failed to start session');
      }

      if (!startData?.success) {
        console.error('[LiveAvatar] Start response invalid:', startData);
        if (startData?.code === 4003) {
          throw new Error('Limite de sessoes simultaneas. Feche outras abas e tente em 1-2 minutos.');
        }
        throw new Error(startData?.error || 'Failed to start session');
      }

      const { livekit_url, livekit_token } = startData;
      if (!livekit_url || !livekit_token) {
        console.error('[LiveAvatar] Missing LiveKit credentials:', { livekit_url, livekit_token });
        throw new Error('LiveKit credentials not received');
      }

      console.log('[LiveAvatar] Session started, connecting to LiveKit...');

      // Step 3: Connect to LiveKit
      const room = new Room();
      roomRef.current = room;

      room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        console.log('[LiveAvatar] Track subscribed:', track.kind);

        if (track.kind === Track.Kind.Video && videoRef.current) {
          track.attach(videoRef.current);
          console.log('[LiveAvatar] Video attached');
        } else if (track.kind === Track.Kind.Audio && audioRef.current) {
          track.attach(audioRef.current);
          audioRef.current.play()
            .then(() => {
              console.log('[LiveAvatar] Audio playing');
              setIsAudioBlocked(false);
            })
            .catch(e => {
              console.warn('[LiveAvatar] Audio autoplay blocked:', e);
              setIsAudioBlocked(true);
            });
        }
      });

      room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
        track.detach();
      });

      room.on(RoomEvent.Connected, () => {
        console.log('[LiveAvatar] Connected to LiveKit room');
        setConnectionStatus('connected');
        toast.success(`Conectado com ${agentName}`);
        isConnectingRef.current = false;

        // Send welcome message after connection
        setTimeout(() => {
          sendWelcomeMessage(`Ola! Sou ${agentName}, seu assistente. Como posso ajudar?`);
        }, 2000);
      });

      room.on(RoomEvent.Disconnected, () => {
        console.log('[LiveAvatar] Disconnected from LiveKit');
        setConnectionStatus('idle');
      });

      room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant, kind?: DataPacket_Kind, topic?: string) => {
        try {
          const message = JSON.parse(new TextDecoder().decode(payload));
          console.log('[LiveAvatar] Data received:', message);

          const eventType = message.event_type || message.type;
          
          if (eventType === 'avatar.speak_started' || eventType === 'speaking_started') {
            setIsSpeaking(true);
          } else if (eventType === 'avatar.speak_ended' || eventType === 'speaking_ended') {
            setIsSpeaking(false);
          } else if (eventType === 'avatar.transcription_ended' && message.text) {
            const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            setMessages(prev => {
              if (prev.length > 0 && prev[prev.length - 1].content === message.text) {
                return prev;
              }
              return [...prev, { role: 'avatar', content: message.text, timestamp }];
            });
          }
        } catch (err) {
          console.warn('[LiveAvatar] Parse data error:', err);
        }
      });

      await room.connect(livekit_url, livekit_token);
      console.log('[LiveAvatar] Room connect called');

    } catch (error) {
      console.error('[LiveAvatar] Session error:', error);
      setConnectionStatus('error');
      isConnectingRef.current = false;
      
      const errorMessage = error instanceof Error ? error.message : 'Erro ao conectar';
      toast.error(errorMessage);
      
      // Cleanup on error
      if (sessionTokenRef.current) {
        await cleanupSession(sessionTokenRef.current);
        sessionTokenRef.current = null;
      }
    }
  }, [agentName, cleanupSession]);

  const stopSession = useCallback(async () => {
    console.log('[LiveAvatar] Stopping session...');
    
    if (isListening) {
      stopListening();
    }

    disconnectRoom();
    await cleanupSession();
    
    sessionTokenRef.current = null;
    isConnectingRef.current = false;
    setConnectionStatus('idle');
    setMessages([]);
    setCallDuration(0);
    setIsProcessingVoice(false);
    setIsSpeaking(false);
  }, [isListening, stopListening, disconnectRoom, cleanupSession]);

  const sendWelcomeMessage = useCallback((text: string) => {
    const room = roomRef.current;
    if (!room || room.state !== 'connected') return;

    try {
      const message = JSON.stringify({ 
        event_type: 'avatar.speak_text',
        text
      });
      const data = new TextEncoder().encode(message);
      room.localParticipant.publishData(data, { reliable: true, topic: 'agent-control' });
      console.log('[LiveAvatar] Welcome message sent');

      const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'avatar', content: text, timestamp }]);
      
      setIsSpeaking(true);
      const words = text.split(' ').length;
      setTimeout(() => setIsSpeaking(false), words * 300 + 2000);
    } catch (error) {
      console.error('[LiveAvatar] Welcome message error:', error);
    }
  }, []);

  const sendTextToAvatar = useCallback(async (text: string) => {
    const room = roomRef.current;
    if (!room || room.state !== 'connected' || !text.trim()) return;

    setIsSpeaking(true);

    try {
      const message = JSON.stringify({ 
        event_type: 'avatar.speak_text',
        text
      });
      const data = new TextEncoder().encode(message);
      room.localParticipant.publishData(data, { reliable: true, topic: 'agent-control' });
      console.log('[LiveAvatar] Text sent to avatar:', text.substring(0, 50));

      const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'avatar', content: text, timestamp }]);

    } catch (error) {
      console.error('[LiveAvatar] Send text error:', error);
      toast.error('Erro ao enviar mensagem');
    } finally {
      const words = text.split(' ').length;
      setTimeout(() => setIsSpeaking(false), words * 300 + 2000);
    }
  }, []);

  const enableAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsAudioBlocked(false);
          toast.success('Audio ativado');
        })
        .catch(e => {
          console.error('[LiveAvatar] Enable audio error:', e);
          toast.error('Nao foi possivel ativar o audio');
        });
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || connectionStatus !== 'connected' || isSpeaking) return;

    const userMessage = inputText.trim();
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp }]);
    setInputText('');

    try {
      const response = await supabase.functions.invoke('chat-agent', {
        body: {
          messages: [
            { role: 'system', content: `Voce e ${agentName}, um assistente especializado em financas. Responda de forma concisa em portugues. Maximo 2 frases.` },
            ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
            { role: 'user', content: userMessage }
          ],
          agentName,
          useReasoning: false
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Handle streaming response
      const reader = response.data?.body?.getReader?.();
      if (!reader) {
        // Non-streaming response
        const text = response.data?.content || response.data?.choices?.[0]?.message?.content || 'Desculpe, nao consegui processar.';
        await sendTextToAvatar(text);
        return;
      }
      
      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
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
            // Ignore parse errors
          }
        }
      }

      const aiResponse = fullContent.trim() || 'Desculpe, nao consegui processar sua mensagem.';
      await sendTextToAvatar(aiResponse);

    } catch (error) {
      console.error('[LiveAvatar] Chat error:', error);
      await sendTextToAvatar('Desculpe, ocorreu um erro. Por favor, tente novamente.');
    }
  }, [inputText, connectionStatus, isSpeaking, messages, agentName, sendTextToAvatar]);

  const toggleVoiceInput = useCallback(() => {
    if (connectionStatus !== 'connected' || isSpeaking) return;
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [connectionStatus, isSpeaking, isListening, startListening, stopListening]);

  const processVoiceInput = useCallback(async (voiceText: string) => {
    if (!voiceText.trim() || connectionStatus !== 'connected' || isProcessingVoice) return;
    
    setIsProcessingVoice(true);
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: 'user', content: voiceText, timestamp }]);
    
    try {
      const response = await supabase.functions.invoke('chat-agent', {
        body: {
          messages: [
            { role: 'system', content: `Voce e ${agentName}, um assistente especializado em financas. Responda de forma concisa em portugues. Maximo 2 frases.` },
            ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
            { role: 'user', content: voiceText }
          ],
          agentName,
          useReasoning: false
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const text = response.data?.content || response.data?.choices?.[0]?.message?.content || 'Desculpe, nao consegui processar.';
      await sendTextToAvatar(text);

    } catch (error) {
      console.error('[LiveAvatar] Voice chat error:', error);
      await sendTextToAvatar('Desculpe, ocorreu um erro ao processar sua mensagem.');
    } finally {
      setIsProcessingVoice(false);
    }
  }, [connectionStatus, isProcessingVoice, messages, agentName, sendTextToAvatar]);

  // Process voice transcription when finished
  useEffect(() => {
    if (hasFinishedRecording && transcript && !isProcessingVoice) {
      const voiceText = transcript;
      resetTranscript();
      resetFinished();
      processVoiceInput(voiceText);
    }
  }, [hasFinishedRecording, transcript, isProcessingVoice, resetTranscript, resetFinished, processVoiceInput]);

  const handleEndCall = useCallback(() => {
    stopSession();
    onOpenChange(false);
  }, [stopSession, onOpenChange]);

  const handleRetry = useCallback(async () => {
    await stopSession();
    setTimeout(() => startSession(), 500);
  }, [stopSession, startSession]);

  // Start session when modal opens
  useEffect(() => {
    if (open && connectionStatus === 'idle') {
      startSession();
    }
  }, [open, connectionStatus, startSession]);

  // Cleanup when modal closes
  useEffect(() => {
    if (!open && connectionStatus !== 'idle') {
      stopSession();
    }
  }, [open, connectionStatus, stopSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
      }
    };
  }, []);

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connecting': return 'Conectando...';
      case 'connected': return 'Conectado';
      case 'error': return 'Erro de conexao';
      default: return 'Desconectado';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 overflow-hidden bg-background">
        <DialogHeader className="sr-only">
          <DialogTitle>Videochamada com {agentName}</DialogTitle>
          <DialogDescription>
            Interacao em tempo real com o avatar de IA {agentName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex h-full">
          {/* Video Area */}
          <div className="flex-1 flex flex-col bg-muted/50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={agentAvatar} alt={agentName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{agentName}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-green-500' : 
                      connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
                      'bg-muted-foreground'
                    }`} />
                    <span className="text-muted-foreground">{getConnectionStatusText()}</span>
                  </div>
                </div>
              </div>
              {connectionStatus === 'connected' && (
                <span className="text-sm text-muted-foreground font-mono">
                  {formatDuration(callDuration)}
                </span>
              )}
            </div>

            {/* Video Container */}
            <div className="flex-1 relative bg-muted flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={false}
                className="w-full h-full object-cover"
              />
              <audio ref={audioRef} autoPlay playsInline />
              
              {/* Connection status overlay */}
              {connectionStatus !== 'connected' && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    {connectionStatus === 'connecting' && (
                      <>
                        <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
                        <p className="text-muted-foreground">Conectando ao avatar...</p>
                      </>
                    )}
                    {connectionStatus === 'error' && (
                      <>
                        <Video className="w-12 h-12 mx-auto text-destructive" />
                        <p className="text-destructive">Falha na conexao</p>
                        <Button onClick={handleRetry} variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Tentar novamente
                        </Button>
                      </>
                    )}
                    {connectionStatus === 'idle' && (
                      <>
                        <Video className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">Preparando conexao...</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Speaking indicator */}
              {isSpeaking && connectionStatus === 'connected' && (
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-4 bg-primary rounded-full animate-pulse" />
                    <span className="w-1.5 h-6 bg-primary rounded-full animate-pulse delay-75" />
                    <span className="w-1.5 h-3 bg-primary rounded-full animate-pulse delay-150" />
                  </div>
                  <span className="text-sm text-foreground">Falando...</span>
                </div>
              )}

              {/* Audio blocked indicator */}
              {isAudioBlocked && connectionStatus === 'connected' && (
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={enableAudio}
                    className="flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    Ativar audio
                  </Button>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 p-4 border-t border-border">
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="lg"
                className={`rounded-full w-14 h-14 ${isListening ? 'animate-pulse' : ''}`}
                onClick={toggleVoiceInput}
                disabled={connectionStatus !== 'connected' || isSpeaking}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="rounded-full w-14 h-14"
                onClick={handleEndCall}
              >
                <Phone className="w-6 h-6 rotate-[135deg]" />
              </Button>

              {connectionStatus === 'error' && (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={handleRetry}
                >
                  <RefreshCw className="w-6 h-6" />
                </Button>
              )}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 border-l border-border flex flex-col bg-background">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
              <h4 className="font-medium text-foreground">Chat</h4>
            </div>

            <ScrollArea className="flex-1 p-4" ref={chatScrollRef}>
              <div className="space-y-4">
                {messages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Inicie uma conversa
                  </p>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'avatar' && (
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        <img src={agentAvatar} alt={agentName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-[10px] opacity-70 mt-1 block">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
                {(isTranscribing || isProcessingVoice) && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isTranscribing ? 'Transcrevendo...' : 'Processando...'}</span>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? 'Ouvindo...' : 'Digite sua mensagem...'}
                  disabled={connectionStatus !== 'connected' || isSpeaking || isTranscribing}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={connectionStatus !== 'connected' || !inputText.trim() || isSpeaking}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {isListening && (
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  Ouvindo... {transcript && `"${transcript}"`}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveAvatarModal;
