import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Mic, MicOff, VideoOff, Phone, Monitor, Minimize2, Maximize2, MessageCircle, FileText, Settings, Send, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [isLocalVideoMinimized, setIsLocalVideoMinimized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'agent', message: string, time: string}>>([]);
  const [messageInput, setMessageInput] = useState('');
  const [notes, setNotes] = useState('');
  const [callDuration, setCallDuration] = useState(0);
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

  // Cronômetro da chamada
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { role: 'user', message: messageInput, time }]);
    setMessageInput('');
    
    // Simula resposta do agente
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'agent', 
        message: 'Entendi sua mensagem. Como posso ajudá-lo?', 
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

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
      <DialogContent className="max-w-[95vw] h-[90vh] p-0 bg-slate-950 border-slate-800">
        <DialogDescription className="sr-only">
          Chamada de vídeo com {agentName}
        </DialogDescription>
        <div className="h-full flex">
          {/* Área de vídeo */}
          <div className="flex-1 flex flex-col relative">
            <DialogHeader className="px-6 py-4 bg-gradient-to-b from-slate-900/80 to-transparent absolute top-0 left-0 right-0 z-10">
              <DialogTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
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
                        <p className="text-sm text-green-400">Conectado • {formatDuration(callDuration)}</p>
                      </div>
                    )}
                  </div>
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
            {isLocalVideoMinimized ? (
              <button
                onClick={() => setIsLocalVideoMinimized(false)}
                className="absolute bottom-24 right-6 w-16 h-16 bg-slate-800 hover:bg-slate-700 rounded-full border-2 border-slate-700/50 shadow-2xl backdrop-blur-sm z-20 flex items-center justify-center transition-all group"
                title="Expandir vídeo local"
              >
                <Maximize2 className="text-slate-300 group-hover:text-white" size={24} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </button>
            ) : (
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
                <button
                  onClick={() => setIsLocalVideoMinimized(true)}
                  className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all group"
                  title="Minimizar vídeo local"
                >
                  <Minimize2 className="text-slate-400 group-hover:text-white" size={16} />
                </button>
              </div>
            )}
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

          {/* Sidebar lateral */}
          <div className={`${isSidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 bg-slate-900 border-l border-slate-800 flex flex-col overflow-hidden`}>
            {isSidebarOpen && (
              <>
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-white font-semibold">Painel</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <ChevronRight size={20} />
                  </Button>
                </div>

                <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                  <TabsList className="w-full grid grid-cols-3 bg-slate-800/50 rounded-none border-b border-slate-800">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-slate-700">
                      <MessageCircle size={16} className="mr-2" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="data-[state=active]:bg-slate-700">
                      <FileText size={16} className="mr-2" />
                      Notas
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
                      <Settings size={16} className="mr-2" />
                      Opções
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="chat" className="flex-1 flex flex-col p-0 mt-0 overflow-hidden">
                    <div className="flex-1 overflow-hidden">
                      <ScrollArea className="h-full p-4">
                        <div className="space-y-3">
                          {chatMessages.length === 0 ? (
                            <div className="text-center text-slate-500 py-8">
                              <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                              <p>Nenhuma mensagem ainda</p>
                              <p className="text-sm">Envie uma mensagem para começar</p>
                            </div>
                          ) : (
                            chatMessages.map((msg, idx) => (
                              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg p-3 ${
                                  msg.role === 'user' 
                                    ? 'bg-pastel-blue text-slate-800' 
                                    : 'bg-slate-800 text-white'
                                }`}>
                                  <p className="text-sm">{msg.message}</p>
                                  <p className="text-xs opacity-60 mt-1">{msg.time}</p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                    <div className="p-4 border-t border-slate-800 flex-shrink-0">
                      <div className="flex gap-2">
                        <Input
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Digite uma mensagem..."
                          className="flex-1 bg-slate-800 border-slate-700 text-white"
                        />
                        <Button
                          onClick={handleSendMessage}
                          size="icon"
                          className="bg-pastel-blue hover:bg-pastel-blue/80 text-slate-800"
                        >
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes" className="flex-1 flex flex-col p-4 mt-0">
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Faça anotações durante a chamada..."
                      className="flex-1 bg-slate-800 border-slate-700 text-white resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Suas notas serão salvas automaticamente
                    </p>
                  </TabsContent>

                  <TabsContent value="settings" className="flex-1 p-4 mt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-3">Qualidade de Vídeo</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-slate-300">
                            <input type="radio" name="quality" defaultChecked className="text-pastel-blue" />
                            Alta (720p)
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-300">
                            <input type="radio" name="quality" className="text-pastel-blue" />
                            Média (480p)
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-300">
                            <input type="radio" name="quality" className="text-pastel-blue" />
                            Baixa (360p)
                          </label>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <h4 className="text-white font-medium mb-3">Gravação</h4>
                        <label className="flex items-center justify-between text-sm text-slate-300">
                          <span>Gravar chamada</span>
                          <input type="checkbox" className="text-pastel-blue" />
                        </label>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <h4 className="text-white font-medium mb-3">Notificações</h4>
                        <label className="flex items-center justify-between text-sm text-slate-300">
                          <span>Sons de notificação</span>
                          <input type="checkbox" defaultChecked className="text-pastel-blue" />
                        </label>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                          Estatísticas da chamada
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>

          {/* Botão para abrir sidebar quando fechada */}
          {!isSidebarOpen && (
            <Button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-white rounded-full w-12 h-12 p-0 shadow-xl"
              title="Abrir painel"
            >
              <ChevronLeft size={24} />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
