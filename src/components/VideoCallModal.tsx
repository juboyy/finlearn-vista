import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Mic, MicOff, VideoOff, Phone, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
      
      // Solicita acesso à câmera e microfone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
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
      }, 2000);

    } catch (error) {
      console.error("Erro ao acessar mídia:", error);
      setIsConnecting(false);
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
      <DialogContent className="max-w-6xl h-[85vh] p-0">
        <div className="h-full flex flex-col bg-slate-900">
          <DialogHeader className="px-6 py-4 border-b border-slate-700">
            <DialogTitle className="text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={agentAvatar} alt={agentName} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-semibold">{agentName}</p>
                {isConnecting && <p className="text-sm text-slate-400">Conectando...</p>}
                {isConnected && <p className="text-sm text-green-400">Conectado</p>}
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 relative bg-slate-950">
            {/* Vídeo do Agente IA (Principal) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isConnecting ? (
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-pastel-purple mb-4 mx-auto flex items-center justify-center">
                    <Video className="text-slate-700" size={64} />
                  </div>
                  <p className="text-white text-lg">Conectando com {agentName}...</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <div className="w-2 h-2 bg-pastel-purple rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pastel-purple rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-pastel-purple rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Placeholder enquanto não há stream real */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <div className="text-center">
                      <div className="w-40 h-40 rounded-full overflow-hidden mb-4 mx-auto">
                        <img src={agentAvatar} alt={agentName} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-white text-xl font-semibold">{agentName}</p>
                      <p className="text-slate-400 text-sm mt-2">Aguardando resposta...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vídeo Local (Picture-in-Picture) */}
            <div className="absolute bottom-6 right-6 w-64 h-48 bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl">
              {isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <div className="text-center">
                    <VideoOff className="text-slate-400 mx-auto mb-2" size={32} />
                    <p className="text-slate-400 text-sm">Câmera desligada</p>
                  </div>
                </div>
              ) : (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Controles */}
          <div className="px-6 py-6 bg-slate-900 border-t border-slate-700">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={toggleMute}
                className={`rounded-full w-14 h-14 ${
                  isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-white"
                } border-0`}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={toggleVideo}
                className={`rounded-full w-14 h-14 ${
                  isVideoOff ? "bg-red-500 hover:bg-red-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-white"
                } border-0`}
              >
                {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-14 h-14 bg-slate-700 hover:bg-slate-600 text-white border-0"
              >
                <Monitor size={24} />
              </Button>

              <Button
                size="lg"
                onClick={handleEndCall}
                className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600 text-white"
              >
                <Phone size={24} className="rotate-[135deg]" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Alta qualidade</span>
              </div>
              <div>•</div>
              <div>10 créditos/minuto</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
