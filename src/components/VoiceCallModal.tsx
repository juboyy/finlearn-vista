import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface VoiceCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  agentAvatar: string;
}

const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  open,
  onOpenChange,
  agentName,
  agentAvatar,
}) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) {
      endCall();
    }
  }, [open]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      
      audioContextRef.current = new AudioContext();
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        if (audioChunksRef.current.length > 0) {
          await processAudio();
        }
      };
      
      setIsConnected(true);
      toast({
        title: "Chamada conectada",
        description: `Conectado com ${agentName}. Pressione o microfone para falar.`,
      });
    } catch (error) {
      console.error("Error starting call:", error);
      toast({
        title: "Erro ao conectar",
        description: "Não foi possível acessar o microfone.",
        variant: "destructive",
      });
    }
  };

  const endCall = () => {
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsConnected(false);
    setIsRecording(false);
    setMessages([]);
    setCurrentTranscript("");
  };

  const toggleRecording = () => {
    if (!mediaRecorderRef.current || isProcessing) return;

    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setCurrentTranscript("");
    }
  };

  const processAudio = async () => {
    setIsProcessing(true);
    
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(",")[1];
        
        const { data, error } = await supabase.functions.invoke("voice-chat-agent", {
          body: {
            audio: base64Audio,
            agentName,
            messages,
          },
        });

        if (error) {
          throw error;
        }

        if (data.error) {
          throw new Error(data.error);
        }

        // Add messages to history
        const newMessages: Message[] = [
          ...messages,
          { role: "user", content: data.userText },
          { role: "assistant", content: data.assistantText },
        ];
        setMessages(newMessages);

        // Play audio response
        if (data.audioContent) {
          await playAudio(data.audioContent);
        }
      };
      
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error("Error processing audio:", error);
      toast({
        title: "Erro ao processar",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      audioChunksRef.current = [];
    }
  };

  const playAudio = async (base64Audio: string) => {
    setIsSpeaking(true);
    
    try {
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }
      
      const audioBlob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsSpeaking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogTitle className="sr-only">Chamada de voz com {agentName}</DialogTitle>
        
        <div className="flex flex-col items-center py-6">
          {/* Agent Avatar */}
          <div className={`relative mb-4 ${isSpeaking ? "animate-pulse" : ""}`}>
            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${
              isConnected 
                ? isSpeaking 
                  ? "border-[hsl(142,35%,50%)]" 
                  : "border-[hsl(206,35%,65%)]" 
                : "border-muted"
            } transition-colors`}>
              <img
                src={agentAvatar}
                alt={agentName}
                className="w-full h-full object-cover"
              />
            </div>
            {isSpeaking && (
              <div className="absolute -bottom-1 -right-1 bg-[hsl(142,35%,50%)] rounded-full p-1.5">
                <Volume2 size={14} className="text-white" />
              </div>
            )}
          </div>
          
          {/* Agent Name & Status */}
          <h3 className="text-lg font-semibold text-foreground mb-1">{agentName}</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {!isConnected && "Desconectado"}
            {isConnected && !isRecording && !isProcessing && !isSpeaking && "Pronto para ouvir"}
            {isRecording && "Ouvindo..."}
            {isProcessing && "Processando..."}
            {isSpeaking && "Falando..."}
          </p>

          {/* Messages History */}
          {messages.length > 0 && (
            <ScrollArea className="w-full h-32 mb-4 rounded-lg border border-border bg-muted/30 p-3">
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-2 rounded ${
                      msg.role === "user"
                        ? "bg-[hsl(206,35%,75%)]/30 text-foreground ml-4"
                        : "bg-[hsl(142,35%,65%)]/30 text-foreground mr-4"
                    }`}
                  >
                    <span className="font-medium">
                      {msg.role === "user" ? "Você: " : `${agentName}: `}
                    </span>
                    {msg.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}

          {/* Controls */}
          <div className="flex items-center gap-4">
            {!isConnected ? (
              <Button
                onClick={startCall}
                className="bg-[hsl(142,35%,50%)] hover:bg-[hsl(142,35%,40%)] text-white rounded-full w-14 h-14"
              >
                <Phone size={24} />
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={endCall}
                  className="bg-[hsl(350,35%,55%)] hover:bg-[hsl(350,35%,45%)] text-white border-none rounded-full w-12 h-12"
                >
                  <PhoneOff size={20} />
                </Button>
                
                <Button
                  onClick={toggleRecording}
                  disabled={isProcessing || isSpeaking}
                  className={`rounded-full w-16 h-16 transition-all ${
                    isRecording
                      ? "bg-[hsl(350,35%,55%)] hover:bg-[hsl(350,35%,45%)] animate-pulse"
                      : "bg-[hsl(206,35%,65%)] hover:bg-[hsl(206,35%,55%)]"
                  } text-white`}
                >
                  {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          <p className="text-xs text-muted-foreground mt-4 text-center max-w-xs">
            {!isConnected 
              ? "Clique no botão verde para iniciar a chamada"
              : "Pressione o microfone para falar, solte para enviar"
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceCallModal;
