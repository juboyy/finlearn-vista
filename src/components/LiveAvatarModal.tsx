import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Mic, MicOff, Phone, Send, Loader2, MessageCircle, RefreshCw } from "lucide-react";
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

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export const LiveAvatarModal = ({
  open,
  onOpenChange,
  agentName,
  agentAvatar
}: LiveAvatarModalProps) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  
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

  useEffect(() => {
    sessionTokenRef.current = sessionToken;
  }, [sessionToken]);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (connectionStatus === 'connected' && open) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (!open) setCallDuration(0);
    };
  }, [connectionStatus, open]);

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

  const startSession = useCallback(async () => {
    setConnectionStatus('connecting');
    
    try {
      // Step 1: Get session token
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke('live-avatar-session', {
        body: { action: 'token', language: 'pt-BR' }
      });

      if (tokenError || !tokenData?.success) {
        throw new Error(tokenData?.error || tokenError?.message || 'Failed to create session token');
      }

      console.log('LiveAvatar token created:', tokenData.session_id);
      setSessionToken(tokenData.session_token);
      sessionTokenRef.current = tokenData.session_token;

      // Step 2: Start session
      const { data: startData, error: startError } = await supabase.functions.invoke('live-avatar-session', {
        body: { action: 'start', sessionToken: tokenData.session_token }
      });

      if (startError || !startData?.success) {
        throw new Error(startData?.error || startError?.message || 'Failed to start session');
      }

      console.log('LiveAvatar session started, connecting to LiveKit...');

      // Step 3: Connect to LiveKit Room
      const room = new Room();
      roomRef.current = room;

      // Handle video track
      room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
        console.log('Track subscribed:', track.kind);
        
        if (track.kind === Track.Kind.Video && videoRef.current) {
          track.attach(videoRef.current);
        } else if (track.kind === Track.Kind.Audio && audioRef.current) {
          track.attach(audioRef.current);
        }
      });

      room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
        track.detach();
      });

      room.on(RoomEvent.Connected, async () => {
        console.log('Connected to LiveKit room');
        setConnectionStatus('connected');
        toast.success(`Conectado com Avatar IA - ${agentName}`);

        // Step 4: Send stop_listening to mute LiveAvatar's internal ears
        try {
          await sendAvatarCommand('avatar.stop_listening', {});
          console.log('Avatar internal listening disabled');
        } catch (err) {
          console.warn('Could not disable avatar listening:', err);
        }

        // Send welcome message
        setTimeout(() => {
          sendTextToAvatar(`Ola! Sou ${agentName}, seu assistente de IA. Como posso ajudar voce hoje?`);
        }, 1500);
      });

      room.on(RoomEvent.Disconnected, () => {
        console.log('Disconnected from LiveKit room');
        setConnectionStatus('disconnected');
      });

      room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant?: RemoteParticipant, kind?: DataPacket_Kind) => {
        try {
          const message = JSON.parse(new TextDecoder().decode(payload));
          console.log('Data received from avatar:', message);
          
          if (message.type === 'speaking_started') {
            setIsSpeaking(true);
          } else if (message.type === 'speaking_ended') {
            setIsSpeaking(false);
          }
        } catch (err) {
          console.warn('Could not parse data message:', err);
        }
      });

      // Connect to LiveKit
      await room.connect(startData.livekit_url, startData.livekit_token);

    } catch (error) {
      console.error('Error starting LiveAvatar session:', error);
      setConnectionStatus('error');
      toast.error('Erro ao conectar com o avatar. Tente novamente.');
    }
  }, [agentName]);

  const stopSession = useCallback(async () => {
    if (isListening) {
      stopListening();
    }

    if (roomRef.current) {
      roomRef.current.disconnect();
      roomRef.current = null;
    }

    if (sessionTokenRef.current) {
      try {
        await supabase.functions.invoke('live-avatar-session', {
          body: { action: 'stop', sessionToken: sessionTokenRef.current }
        });
      } catch (error) {
        console.error('Error stopping session:', error);
      }
    }

    setSessionToken(null);
    sessionTokenRef.current = null;
    setConnectionStatus('disconnected');
    setMessages([]);
    setCallDuration(0);
    setIsProcessingVoice(false);
  }, [isListening, stopListening]);

  const sendAvatarCommand = async (command: string, payload: Record<string, unknown>) => {
    if (!sessionTokenRef.current) return;

    const { data, error } = await supabase.functions.invoke('live-avatar-session', {
      body: { 
        action: 'command', 
        sessionToken: sessionTokenRef.current,
        command,
        payload
      }
    });

    if (error) throw error;
    return data;
  };

  const sendTextToAvatar = useCallback(async (text: string) => {
    if (!sessionTokenRef.current || !text.trim()) return;

    setIsSpeaking(true);

    try {
      await sendAvatarCommand('avatar.speak_text', { text });

      const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'avatar', content: text, timestamp }]);

    } catch (error) {
      console.error('Error sending text to avatar:', error);
      toast.error('Erro ao enviar mensagem para o avatar');
    } finally {
      const words = text.split(' ').length;
      setTimeout(() => setIsSpeaking(false), words * 150);
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || connectionStatus !== 'connected' || isSpeaking) return;

    const userMessage = inputText.trim();
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp }]);
    setInputText('');

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

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
      
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
      console.error('Error generating response:', error);
      await sendTextToAvatar('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
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

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
      
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
      console.error('Error generating response:', error);
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

  const handleRetry = useCallback(() => {
    stopSession();
    setTimeout(() => startSession(), 500);
  }, [stopSession, startSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [stopSession]);

  // Auto-start session when modal opens
  useEffect(() => {
    if (open && connectionStatus === 'disconnected') {
      startSession();
    } else if (!open && connectionStatus !== 'disconnected') {
      stopSession();
    }
  }, [open, connectionStatus, startSession, stopSession]);

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
                className="w-full h-full object-cover"
              />
              <audio ref={audioRef} autoPlay />
              
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
