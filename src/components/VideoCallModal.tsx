import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Mic, MicOff, VideoOff, Phone, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface VideoCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  agentAvatar: string;
}

export const VideoCallModal = ({ open, onOpenChange, agentName, agentAvatar }: VideoCallModalProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open) {
      startCall();
    } else {
      endCall();
    }

    return () => {
      endCall();
    };
  }, [open]);

  const startCall = async () => {
    try {
      setIsConnecting(true);
      
      // Tenta solicitar acesso à câmera e microfone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });
      
      streamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Simula conexão (em produção, aqui você conectaria com a API de vídeo)
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        toast.success(`Conectado com ${agentName}`);
      }, 1500);

    } catch (error) {
      console.error("Erro ao acessar mídia:", error);
      setIsConnecting(false);
      toast.error("Não foi possível acessar câmera/microfone. A chamada continuará sem vídeo local.");
      
      // Continua sem vídeo local
      setTimeout(() => {
        setIsConnected(true);
      }, 1000);
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const handleEndCall = () => {
    endCall();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 bg-slate-950 border-slate-800">
        <DialogDescription className="sr-only">
          Chamada de vídeo com {agentName}
        </DialogDescription>
        <div className="h-full flex flex-col">
          <DialogHeader className="px-6 py-4 bg-gradient-to-b from-slate-900/80 to-transparent absolute top-0 left-0 right-0 z-10">
            <DialogTitle className="text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-pastel-purple/50">
                <img src={agentAvatar} alt={agentName} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-semibold">{agentName}</p>
                {isConnecting && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pastel-yellow rounded-full animate-pulse"></div>
                    <p className="text-sm text-slate-300">Conectando...</p>
                  </div>
                )}
                {isConnected && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-green-400">Conectado</p>
                  </div>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 relative bg-slate-950">
            {/* Vídeo do Agente IA (Principal) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isConnecting ? (
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pastel-purple to-pastel-blue mb-6 mx-auto flex items-center justify-center animate-pulse">
                    <Video className="text-slate-800" size={64} />
                  </div>
                  <p className="text-white text-xl font-medium mb-3">Conectando com {agentName}...</p>
                  <div className="flex gap-2 justify-center">
                    <div className="w-3 h-3 bg-pastel-purple rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-pastel-blue rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                    <div className="w-3 h-3 bg-pastel-pink rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center relative">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Placeholder enquanto não há stream real */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-6 mx-auto ring-4 ring-pastel-purple/30 shadow-2xl">
                        <img src={agentAvatar} alt={agentName} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-white text-2xl font-semibold mb-2">{agentName}</p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-slate-300 text-base">Na chamada</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vídeo Local (Picture-in-Picture) */}
            <div className="absolute bottom-24 right-6 w-72 h-52 bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl backdrop-blur-sm z-20">
              {isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-3 mx-auto">
                      <VideoOff className="text-slate-400" size={28} />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Câmera desligada</p>
                  </div>
                </div>
              ) : (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror"
                  style={{ transform: 'scaleX(-1)' }}
                />
              )}
              <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-lg">
                <p className="text-white text-xs font-medium">Você</p>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="px-8 py-6 bg-gradient-to-t from-slate-900/95 to-slate-900/80 backdrop-blur-md absolute bottom-0 left-0 right-0">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                variant="outline"
                size="lg"
                onClick={toggleMute}
                className={`rounded-full w-16 h-16 transition-all ${
                  isMuted 
                    ? "bg-red-500 hover:bg-red-600 text-white border-red-400" 
                    : "bg-slate-700/80 hover:bg-slate-600 text-white border-slate-600"
                } border-2`}
                title={isMuted ? "Ligar microfone" : "Desligar microfone"}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={toggleVideo}
                className={`rounded-full w-16 h-16 transition-all ${
                  isVideoOff 
                    ? "bg-red-500 hover:bg-red-600 text-white border-red-400" 
                    : "bg-slate-700/80 hover:bg-slate-600 text-white border-slate-600"
                } border-2`}
                title={isVideoOff ? "Ligar câmera" : "Desligar câmera"}
              >
                {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-16 h-16 bg-slate-700/80 hover:bg-slate-600 text-white border-2 border-slate-600 transition-all"
                title="Compartilhar tela"
              >
                <Monitor size={24} />
              </Button>

              <Button
                size="lg"
                onClick={handleEndCall}
                className="rounded-full w-20 h-20 bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/50 transition-all border-2 border-red-400"
                title="Encerrar chamada"
              >
                <Phone size={28} className="rotate-[135deg]" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Alta qualidade</span>
              </div>
              <div className="text-slate-600">•</div>
              <div className="flex items-center gap-2">
                <Video size={14} />
                <span>10 créditos/min</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
