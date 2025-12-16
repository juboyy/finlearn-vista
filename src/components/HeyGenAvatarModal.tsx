import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Mic, MicOff, Phone, Send, Loader2, MessageCircle, Settings, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

export const HeyGenAvatarModal = ({
  open,
  onOpenChange,
  agentName,
  agentAvatar
}: HeyGenAvatarModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

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

  const startSession = useCallback(async () => {
    setIsConnecting(true);
    
    try {
      // Request microphone access
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = stream;
      } catch (micError) {
        console.warn('Microphone access denied, continuing without audio input');
      }

      // Create HeyGen session
      const { data, error } = await supabase.functions.invoke('heygen-avatar-session', {
        body: { action: 'create_session' }
      });

      if (error || !data?.success) {
        throw new Error(data?.error || error?.message || 'Failed to create session');
      }

      console.log('HeyGen session created:', data);
      setSessionId(data.session_id);

      // Setup WebRTC
      const pc = new RTCPeerConnection({
        iceServers: data.ice_servers || [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      peerConnectionRef.current = pc;

      // Handle incoming video track
      pc.ontrack = (event) => {
        console.log('Received track:', event.track.kind);
        if (videoRef.current && event.streams[0]) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      // Set remote description from HeyGen
      if (data.sdp) {
        await pc.setRemoteDescription(new RTCSessionDescription({
          type: 'offer',
          sdp: data.sdp
        }));

        // Create and set local answer
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        // Send answer to HeyGen
        const { data: startData, error: startError } = await supabase.functions.invoke('heygen-avatar-session', {
          body: { 
            action: 'start_session', 
            sessionId: data.session_id,
            sdp: answer.sdp 
          }
        });

        if (startError) {
          console.warn('Start session warning:', startError);
        }
      }

      setIsConnected(true);
      setIsConnecting(false);
      toast.success(`Conectado com Avatar IA - ${agentName}`);

      // Send welcome message
      setTimeout(() => {
        sendTextToAvatar(`Olá! Sou ${agentName}, seu assistente de IA. Como posso ajudar você hoje?`);
      }, 2000);

    } catch (error) {
      console.error('Error starting HeyGen session:', error);
      setIsConnecting(false);
      toast.error('Erro ao conectar com o avatar. Tente novamente.');
    }
  }, [agentName]);

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

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    setSessionId(null);
    setIsConnected(false);
    setMessages([]);
  }, [sessionId]);

  const sendTextToAvatar = useCallback(async (text: string) => {
    if (!sessionId || !text.trim()) return;

    setIsSpeaking(true);

    try {
      const { data, error } = await supabase.functions.invoke('heygen-avatar-session', {
        body: { action: 'speak', sessionId, text }
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
  }, [sessionId]);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || !isConnected) return;

    const userMessage = inputText.trim();
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp }]);
    setInputText('');

    // Generate AI response and send to avatar
    try {
      const { data, error } = await supabase.functions.invoke('chat-agent', {
        body: {
          messages: [
            { role: 'system', content: `Você é ${agentName}, um assistente especializado em finanças e mercado financeiro. Responda de forma concisa e profissional em português.` },
            ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
            { role: 'user', content: userMessage }
          ],
          agentName,
          useReasoning: false
        }
      });

      if (error) throw error;

      const aiResponse = data?.content || data?.message || 'Desculpe, não consegui processar sua mensagem.';
      await sendTextToAvatar(aiResponse);

    } catch (error) {
      console.error('Error generating response:', error);
      await sendTextToAvatar('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    }
  }, [inputText, isConnected, messages, agentName, sendTextToAvatar]);

  const toggleMute = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  }, []);

  const handleEndCall = useCallback(() => {
    stopSession();
    onOpenChange(false);
  }, [stopSession, onOpenChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  // Start session when modal opens
  useEffect(() => {
    if (open && !isConnected && !isConnecting) {
      startSession();
    }
    if (!open) {
      stopSession();
    }
  }, [open]);

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
                  {isConnecting && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-pastel-yellow" />
                      <p className="text-sm text-slate-300">Conectando ao avatar...</p>
                    </div>
                  )}
                  {isConnected && (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-pastel-green animate-pulse' : 'bg-green-500'}`} />
                      <p className="text-sm text-green-400">
                        {isSpeaking ? 'Falando...' : `Conectado - ${formatDuration(callDuration)}`}
                      </p>
                    </div>
                  )}
                </div>
              </DialogTitle>
            </DialogHeader>

            {/* Avatar Video */}
            <div className="flex-1 bg-slate-950 flex items-center justify-center">
              {isConnecting ? (
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
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-slate-900"
                />
              )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMute}
                className={`w-12 h-12 rounded-full ${isMuted ? 'bg-red-500/20 border-red-500' : 'bg-slate-800 border-slate-600'}`}
              >
                {isMuted ? <MicOff className="text-red-400" /> : <Mic className="text-white" />}
              </Button>
              
              <Button
                onClick={handleEndCall}
                className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600"
              >
                <Phone className="rotate-[135deg]" />
              </Button>
            </div>
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
