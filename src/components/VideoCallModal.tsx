import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Mic, MicOff, VideoOff, Phone, Monitor, Minimize2, Maximize2, MessageCircle, FileText, Settings, Send, ChevronLeft, ChevronRight, X, Activity, TrendingUp, Target, Lightbulb, Key, BarChart3, Clock, Coins, UserPlus, Copy, Mail, Users } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
interface VideoCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  agentAvatar: string;
}
export const VideoCallModal = ({
  open,
  onOpenChange,
  agentName,
  agentAvatar
}: VideoCallModalProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isLocalVideoMinimized, setIsLocalVideoMinimized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{
    role: 'user' | 'agent';
    message: string;
    time: string;
  }>>([]);
  const [messageInput, setMessageInput] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'settings'>('chat');
  const [notes, setNotes] = useState('');
  const [noteColor, setNoteColor] = useState('#ffffff');
  const notesRef = useRef<HTMLDivElement>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [participants, setParticipants] = useState<Array<{
    id: string;
    name: string;
    avatar: string;
    status: 'connected' | 'pending';
  }>>([
    { id: '1', name: 'Você', avatar: '', status: 'connected' }
  ]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Dados do gráfico de créditos
  const creditsChartData = useMemo(() => {
    const minutes = Math.ceil(callDuration / 60);
    const data = [];
    for (let i = 0; i <= minutes; i++) {
      data.push({
        minuto: i,
        creditos: i * 10
      });
    }
    return data;
  }, [callDuration]);
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

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (chatScrollRef.current && isAtBottom) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      setUnreadCount(0);
    } else if (!isAtBottom) {
      setUnreadCount(prev => prev + 1);
    }
  }, [chatMessages, isAtBottom]);

  // Detectar se está no fundo do scroll
  const handleScroll = () => {
    if (chatScrollRef.current) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = chatScrollRef.current;
      const atBottom = scrollHeight - scrollTop - clientHeight < 50;
      setIsAtBottom(atBottom);
      if (atBottom) {
        setUnreadCount(0);
      }
    }
  };
  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      setIsAtBottom(true);
      setUnreadCount(0);
    }
  };
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const time = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    setChatMessages(prev => [...prev, {
      role: 'user',
      message: messageInput,
      time
    }]);
    setMessageInput('');

    // Simula resposta do agente
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'agent',
        message: 'Entendi sua mensagem. Como posso ajudá-lo?',
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }]);
    }, 1000);
  };
  const insertEmoji = (emoji: string) => {
    if (notesRef.current) {
      notesRef.current.focus();
      const span = document.createElement('span');
      span.style.color = noteColor;
      span.textContent = emoji;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
        range.setStartAfter(span);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      saveNotesToLocal();
    }
  };
  const handleNotesInput = () => {
    saveNotesToLocal();
  };
  const handleNotesKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Aplicar cor ao texto que será digitado
    setTimeout(() => {
      if (notesRef.current) {
        document.execCommand('foreColor', false, noteColor);
      }
    }, 0);
  };
  const handleColorChange = (color: string) => {
    setNoteColor(color);
    if (notesRef.current) {
      notesRef.current.focus();
      document.execCommand('foreColor', false, color);
    }
  };
  const saveNotesToLocal = () => {
    if (notesRef.current) {
      const content = notesRef.current.innerHTML;
      localStorage.setItem(`video-call-notes-${agentName}`, content);
    }
  };
  const loadNotesFromLocal = () => {
    if (notesRef.current) {
      const savedContent = localStorage.getItem(`video-call-notes-${agentName}`);
      if (savedContent) {
        notesRef.current.innerHTML = savedContent;
      }
    }
  };

  // Carregar notas salvas quando o modal abre
  useEffect(() => {
    if (open && activeTab === 'notes') {
      loadNotesFromLocal();
    }
  }, [open, activeTab]);
  const startCall = async () => {
    try {
      setIsConnecting(true);

      // Tenta solicitar acesso à câmera e microfone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720
        },
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

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/join-call/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Link copiado para área de transferência');
  };

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) {
      toast.error('Digite um email válido');
      return;
    }
    // Simula envio de convite
    toast.success(`Convite enviado para ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteModal(false);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0 bg-slate-950 border-slate-800 overflow-hidden">
        <DialogDescription className="sr-only">
          Chamada de vídeo com {agentName}
        </DialogDescription>
        <div className="h-full flex overflow-hidden">
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
                    {isConnecting && <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pastel-yellow rounded-full animate-pulse"></div>
                        <p className="text-sm text-slate-300">Conectando...</p>
                      </div>}
                    {isConnected && <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm text-green-400">Conectado • {formatDuration(callDuration)}</p>
                      </div>}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInviteModal(true)}
                  className="bg-pastel-purple/20 hover:bg-pastel-purple/30 border-pastel-purple/40 text-pastel-gray-dark hover:text-foreground transition-all"
                >
                  <UserPlus size={16} className="mr-2" />
                  Convidar
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 relative bg-slate-950">
            {/* Vídeo do Agente IA (Principal) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isConnecting ? <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pastel-purple to-pastel-blue mb-6 mx-auto flex items-center justify-center animate-pulse">
                    <Video className="text-slate-800" size={64} />
                  </div>
                  <p className="text-white text-xl font-medium mb-3">Conectando com {agentName}...</p>
                  <div className="flex gap-2 justify-center">
                    <div className="w-3 h-3 bg-pastel-purple rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-pastel-blue rounded-full animate-bounce" style={{
                    animationDelay: "0.15s"
                  }}></div>
                    <div className="w-3 h-3 bg-pastel-pink rounded-full animate-bounce" style={{
                    animationDelay: "0.3s"
                  }}></div>
                  </div>
                </div> : <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center relative">
                  <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
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
                </div>}
            </div>

            {/* Vídeo Local (Picture-in-Picture) */}
            {isLocalVideoMinimized ? <button onClick={() => setIsLocalVideoMinimized(false)} className="absolute bottom-24 right-6 w-16 h-16 bg-slate-800 hover:bg-slate-700 rounded-full border-2 border-slate-700/50 shadow-2xl backdrop-blur-sm z-20 flex items-center justify-center transition-all group" title="Expandir vídeo local">
                <Maximize2 className="text-slate-300 group-hover:text-white" size={24} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </button> : <div className="absolute bottom-24 right-6 w-72 h-52 bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl backdrop-blur-sm z-20">
                {isVideoOff ? <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-3 mx-auto">
                        <VideoOff className="text-slate-400" size={28} />
                      </div>
                      <p className="text-slate-400 text-sm font-medium">Câmera desligada</p>
                    </div>
                  </div> : <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover mirror" style={{
                transform: 'scaleX(-1)'
              }} />}
                <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-lg">
                  <p className="text-white text-xs font-medium">Você</p>
                </div>
                <button onClick={() => setIsLocalVideoMinimized(true)} className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all group" title="Minimizar vídeo local">
                  <Minimize2 className="text-slate-400 group-hover:text-white" size={16} />
                </button>
              </div>}
          </div>

            {/* Controles */}
            <div className="px-8 py-6 bg-gradient-to-t from-slate-900/95 to-slate-900/80 backdrop-blur-md absolute bottom-0 left-0 right-0">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button variant="outline" size="lg" onClick={toggleMute} className={`rounded-full w-16 h-16 transition-all ${isMuted ? "bg-red-500 hover:bg-red-600 text-white border-red-400" : "bg-slate-700/80 hover:bg-slate-600 text-white border-slate-600"} border-2`} title={isMuted ? "Ligar microfone" : "Desligar microfone"}>
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>

              <Button variant="outline" size="lg" onClick={toggleVideo} className={`rounded-full w-16 h-16 transition-all ${isVideoOff ? "bg-red-500 hover:bg-red-600 text-white border-red-400" : "bg-slate-700/80 hover:bg-slate-600 text-white border-slate-600"} border-2`} title={isVideoOff ? "Ligar câmera" : "Desligar câmera"}>
                {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
              </Button>

              <Button variant="outline" size="lg" className="rounded-full w-16 h-16 bg-slate-700/80 hover:bg-slate-600 text-white border-2 border-slate-600 transition-all" title="Compartilhar tela">
                <Monitor size={24} />
              </Button>

              <Button size="lg" onClick={handleEndCall} className="rounded-full w-20 h-20 bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/50 transition-all border-2 border-red-400" title="Encerrar chamada">
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
          <div className={`${isSidebarOpen ? 'w-96' : 'w-0'} transition-all duration-300 bg-slate-900 border-l border-slate-800 flex flex-col overflow-hidden relative flex-shrink-0`}>
            {isSidebarOpen && <>
                <div className="p-4 border-b border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Painel</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white">
                      <ChevronRight size={20} />
                    </Button>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="flex gap-2">
                    <button onClick={() => setActiveTab('chat')} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-slate-700 text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'}`}>
                      <MessageCircle size={16} />
                      Chat
                    </button>
                    <button onClick={() => setActiveTab('notes')} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'notes' ? 'bg-slate-700 text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'}`}>
                      <FileText size={16} />
                      Notas
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-slate-700 text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'}`}>
                      <Settings size={16} />
                      Config
                    </button>
                  </div>

                  {/* Participants Section */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white text-sm font-medium flex items-center gap-2">
                        <Users size={16} />
                        Participantes ({participants.length})
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {participants.map((participant) => (
                        <div key={participant.id} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                            {participant.avatar ? (
                              <img src={participant.avatar} alt={participant.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="text-white text-sm">{participant.name[0]}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">{participant.name}</p>
                            <div className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${participant.status === 'connected' ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                              <p className="text-slate-400 text-xs">{participant.status === 'connected' ? 'Conectado' : 'Pendente'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chat Tab */}
                {activeTab === 'chat' && <>
                    {/* Área de mensagens do chat */}
                    <div className="flex-1 min-h-0 overflow-hidden relative">
                  <div ref={chatScrollRef} className="h-full overflow-y-auto pb-[68px] chat-scrollbar" onScroll={handleScroll} style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#475569 #1e293b'
                }}>
                    <div className="p-4 space-y-3">
                      {chatMessages.length === 0 ? <div className="text-center text-slate-500 py-8">
                          <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                          <p>Nenhuma mensagem ainda</p>
                          <p className="text-sm">Envie uma mensagem para começar</p>
                        </div> : chatMessages.map((msg, idx) => <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user' ? 'bg-pastel-blue text-slate-800' : 'bg-slate-800 text-white'}`}>
                              <p className="text-sm">{msg.message}</p>
                              <p className="text-xs opacity-60 mt-1">{msg.time}</p>
                            </div>
                          </div>)}
                    </div>
                  </div>

                  {/* Indicador de novas mensagens */}
                  {!isAtBottom && unreadCount > 0 && <button onClick={scrollToBottom} className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-pastel-blue text-slate-800 px-4 py-2 rounded-full shadow-lg hover:bg-pastel-blue/80 transition-all animate-fade-in flex items-center gap-2 font-medium">
                      <MessageCircle size={16} />
                      {unreadCount} nova{unreadCount > 1 ? 's' : ''} mensagem{unreadCount > 1 ? 'ns' : ''}
                    </button>}
                    </div>

                    {/* Input do chat fixo no fundo */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm flex-shrink-0">
                      <div className="flex gap-2">
                        <Input value={messageInput} onChange={e => setMessageInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Digite uma mensagem..." className="flex-1 bg-slate-800 border-slate-700 text-white" />
                        <Button onClick={handleSendMessage} size="icon" className="bg-pastel-blue hover:bg-pastel-blue/80 text-slate-800">
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </>}

                {/* Notes Tab */}
                {activeTab === 'notes' && <div className="flex-1 flex flex-col p-4">
                    {/* Color Picker */}
                    <div className="mb-3">
                      <p className="text-white text-sm font-medium mb-2">Cor da escrita</p>
                      <div className="flex gap-2">
                        {[{
                    color: '#ffffff',
                    name: 'Branco'
                  }, {
                    color: '#ef4444',
                    name: 'Vermelho'
                  }, {
                    color: '#3b82f6',
                    name: 'Azul'
                  }, {
                    color: '#10b981',
                    name: 'Verde'
                  }, {
                    color: '#f59e0b',
                    name: 'Amarelo'
                  }, {
                    color: '#a855f7',
                    name: 'Roxo'
                  }, {
                    color: '#ec4899',
                    name: 'Rosa'
                  }].map(({
                    color,
                    name
                  }) => <button key={color} onClick={() => handleColorChange(color)} className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${noteColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`} style={{
                    backgroundColor: color
                  }} title={name} />)}
                      </div>
                    </div>

                    {/* Emoji Picker */}
                    <div className="mb-3">
                      <p className="text-white text-sm font-medium mb-2">Emojis</p>
                      <div className="flex flex-wrap gap-1">
                        {['😊', '👍', '❤️', '🎯', '⭐', '✅', '💡', '📝', '🔥', '💪', '🎉', '⚡', '📌', '🚀', '💼'].map(emoji => <button key={emoji} onClick={() => insertEmoji(emoji)} className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded transition-all hover:scale-110 text-lg">
                            {emoji}
                          </button>)}
                      </div>
                    </div>

                    <div ref={notesRef} contentEditable onInput={handleNotesInput} onKeyDown={handleNotesKeyDown} className="flex-1 bg-slate-800 border border-slate-700 rounded-md p-3 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-slate-600" style={{
                minHeight: '200px'
              }} suppressContentEditableWarning data-placeholder="Faça anotações durante a chamada..." />
                    <style>{`
                      [data-placeholder]:empty:before {
                        content: attr(data-placeholder);
                        color: #64748b;
                      }
                      [contenteditable] * {
                        display: inline;
                      }
                    `}</style>
                    <p className="text-xs text-slate-500 mt-2">
                      Suas notas são salvas automaticamente e preservadas entre sessões
                    </p>
                  </div>}

                {/* Settings Tab */}
                {activeTab === 'settings' && <div className="flex-1 p-4 overflow-y-auto">
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
                        <h4 className="text-white font-medium mb-3">Ferramentas</h4>
                        <div className="space-y-2">
                          <label className="flex items-center justify-between text-sm text-slate-300">
                            <span>Resumo Inteligente</span>
                            <input type="checkbox" defaultChecked className="text-pastel-blue" />
                          </label>
                          <label className="flex items-center justify-between text-sm text-slate-300">
                            <span>Transcrição</span>
                            <input type="checkbox" defaultChecked className="text-pastel-blue" />
                          </label>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <Button variant="outline" className="w-full border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white hover:border-white transition-all" onClick={() => setShowStatsModal(true)}>
                          Estatísticas da chamada
                        </Button>
                      </div>
                    </div>
                  </div>}
              </>}
          </div>

          {/* Botão para abrir sidebar quando fechada */}
          {!isSidebarOpen && <Button onClick={() => setIsSidebarOpen(true)} className="absolute top-1/2 right-4 -translate-y-1/2 bg-slate-800 hover:bg-slate-700 text-white rounded-full w-12 h-12 p-0 shadow-xl" title="Abrir painel">
              <ChevronLeft size={24} />
            </Button>}
        </div>

        {/* Modal de Convite */}
        {showInviteModal && (
          <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowInviteModal(false)}>
            <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Convidar Pessoas</h2>
                  <p className="text-slate-400 text-sm">Adicione participantes à chamada</p>
                </div>
                <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Compartilhar Link */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Copy size={16} className="text-pastel-blue" />
                    Compartilhar Link
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Copie o link e compartilhe com quem você deseja convidar
                  </p>
                  <Button
                    onClick={handleCopyInviteLink}
                    className="w-full bg-pastel-blue hover:bg-pastel-blue/80 text-slate-900"
                  >
                    <Copy size={16} className="mr-2" />
                    Copiar Link de Convite
                  </Button>
                </div>

                {/* Enviar por Email */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Mail size={16} className="text-pastel-purple" />
                    Enviar por Email
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Digite o email da pessoa que você deseja convidar
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="email@exemplo.com"
                      className="flex-1 bg-slate-800 border-slate-700 text-white"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
                    />
                    <Button
                      onClick={handleSendInvite}
                      className="bg-pastel-purple hover:bg-pastel-purple/80 text-slate-900"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Estatísticas */}
        {showStatsModal && <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowStatsModal(false)}>
            <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl w-full max-w-[95vw] max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-pastel-purple/20 to-pastel-blue/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Estatísticas da Chamada</h2>
                    <p className="text-slate-400 text-sm">Análise detalhada da sessão com {agentName}</p>
                  </div>
                  <button onClick={() => setShowStatsModal(false)} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content - Two Columns Layout */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Métricas Principais */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-pastel-purple/20 to-pastel-purple/5 border border-pastel-purple/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-pastel-purple/30 rounded-lg flex items-center justify-center">
                          <Clock size={20} className="text-pastel-purple" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Duração</p>
                          <p className="text-white text-2xl font-bold">{formatDuration(callDuration)}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-pastel-purple/20">
                        <p className="text-slate-400 text-xs">Tempo médio por sessão: 8:45</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-pastel-blue/20 to-pastel-blue/5 border border-pastel-blue/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-pastel-blue/30 rounded-lg flex items-center justify-center">
                          <MessageCircle size={20} className="text-pastel-blue" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Mensagens</p>
                          <p className="text-white text-2xl font-bold">{chatMessages.length}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-pastel-blue/20">
                        <p className="text-slate-400 text-xs">Você: {chatMessages.filter(m => m.role === 'user').length} | IA: {chatMessages.filter(m => m.role === 'agent').length}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-pastel-green/20 to-pastel-green/5 border border-pastel-green/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-pastel-green/30 rounded-lg flex items-center justify-center">
                          <Activity size={20} className="text-pastel-green" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Qualidade</p>
                          <p className="text-white text-2xl font-bold">Alta</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-pastel-green/20">
                        <p className="text-slate-400 text-xs">Latência média: 45ms</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-pastel-yellow/20 to-pastel-yellow/5 border border-pastel-yellow/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-pastel-yellow/30 rounded-lg flex items-center justify-center">
                          <Coins size={20} className="text-pastel-yellow" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Créditos Gastos</p>
                          <p className="text-white text-2xl font-bold">{Math.round(callDuration / 60 * 10)}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-pastel-yellow/20">
                        <p className="text-slate-400 text-xs">Taxa: 10 créditos/minuto</p>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Evolução de Créditos */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-pastel-yellow" />
                      Evolução de Créditos
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={creditsChartData} margin={{
                      top: 5,
                      right: 5,
                      left: 0,
                      bottom: 5
                    }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="minuto" stroke="#94a3b8" tick={{
                        fill: '#94a3b8',
                        fontSize: 12
                      }} label={{
                        value: 'Minutos',
                        position: 'insideBottom',
                        offset: -5,
                        fill: '#94a3b8'
                      }} />
                          <YAxis stroke="#94a3b8" tick={{
                        fill: '#94a3b8',
                        fontSize: 12
                      }} label={{
                        value: 'Créditos',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#94a3b8'
                      }} />
                          <Tooltip contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#fff'
                      }} labelStyle={{
                        color: '#94a3b8'
                      }} />
                          <Line type="monotone" dataKey="creditos" stroke="#fbbf24" strokeWidth={3} dot={{
                        fill: '#fbbf24',
                        r: 4
                      }} activeDot={{
                        r: 6
                      }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-slate-400 text-xs mt-3">
                      Taxa de consumo: 10 créditos por minuto de chamada
                    </p>
                  </div>

                  {/* Palavras-chave e Tópicos */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Key size={18} className="text-pastel-blue" />
                      Tópicos Principais
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Aprendizado', 'IA', 'Colaboração', 'Inovação', 'Produtividade', 'Análise', 'Estratégia'].map((topic, idx) => <span key={topic} className="px-3 py-1.5 rounded-full text-sm font-medium border" style={{
                    backgroundColor: `hsl(${idx * 50}, 70%, 20%)`,
                    borderColor: `hsl(${idx * 50}, 70%, 40%)`,
                    color: `hsl(${idx * 50}, 70%, 80%)`
                  }}>
                          {topic}
                        </span>)}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Análise de Interação */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 size={18} className="text-pastel-purple" />
                      Análise de Interação
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Taxa de resposta da IA</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-pastel-purple to-pastel-blue w-[95%]"></div>
                          </div>
                          <span className="text-white text-sm font-medium">95%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Clareza da comunicação</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-pastel-green to-pastel-yellow w-[88%]"></div>
                          </div>
                          <span className="text-white text-sm font-medium">88%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Engajamento</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-pastel-pink to-pastel-rose w-[92%]"></div>
                          </div>
                          <span className="text-white text-sm font-medium">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insights e Sugestões */}
                  <div className="bg-gradient-to-br from-pastel-yellow/10 to-pastel-orange/5 border border-pastel-yellow/30 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb size={18} className="text-pastel-yellow" />
                      Insights da Sessão
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-slate-300 text-sm">
                        <Target size={16} className="text-pastel-yellow mt-0.5 flex-shrink-0" />
                        <span>Excelente engajamento durante toda a chamada</span>
                      </li>
                      <li className="flex items-start gap-2 text-slate-300 text-sm">
                        <Target size={16} className="text-pastel-yellow mt-0.5 flex-shrink-0" />
                        <span>Comunicação clara e objetiva identificada</span>
                      </li>
                      <li className="flex items-start gap-2 text-slate-300 text-sm">
                        <Target size={16} className="text-pastel-yellow mt-0.5 flex-shrink-0" />
                        <span>Média de {callDuration > 0 ? Math.round(chatMessages.length / (callDuration / 60)) : 0} mensagens por minuto</span>
                      </li>
                    </ul>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-pastel-green" />
                      Performance
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
                        <span className="text-slate-300 text-sm">Tempo de resposta médio</span>
                        <span className="text-white font-medium">1.2s</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
                        <span className="text-slate-300 text-sm">Taxa de sucesso</span>
                        <span className="text-pastel-green font-medium">98%</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-slate-300 text-sm">Satisfação estimada</span>
                        <span className="text-pastel-blue font-medium">Excelente</span>
                      </div>
                    </div>
                  </div>

                  {/* Notas Automáticas da Reunião */}
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FileText size={18} className="text-pastel-purple" />
                      Notas Automáticas
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-pastel-purple rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm leading-relaxed">
                              Discussão iniciada sobre implementação de novos recursos de aprendizado adaptativo
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-pastel-purple/20 text-pastel-purple border border-pastel-purple/30 rounded text-xs">Alta prioridade</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-pastel-blue rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm leading-relaxed">
                              Revisão das métricas de engajamento e satisfação dos usuários com IA
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-pastel-blue/20 text-pastel-blue border border-pastel-blue/30 rounded text-xs">Análise</span>
                              <span className="px-2 py-0.5 bg-pastel-green/20 text-pastel-green border border-pastel-green/30 rounded text-xs">Dados</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-pastel-yellow rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm leading-relaxed">
                              Definidas próximas ações para otimização do sistema de recomendações
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-pastel-yellow/20 text-pastel-yellow border border-pastel-yellow/30 rounded text-xs">Ação</span>
                              <span className="px-2 py-0.5 bg-pastel-orange/20 text-pastel-orange border border-pastel-orange/30 rounded text-xs">Otimização</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-pastel-pink rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm leading-relaxed">
                              Exploração de novos modelos de IA para melhorar respostas contextuais
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-pastel-pink/20 text-pastel-pink border border-pastel-pink/30 rounded text-xs">Pesquisa</span>
                              <span className="px-2 py-0.5 bg-pastel-rose/20 text-pastel-rose border border-pastel-rose/30 rounded text-xs">IA</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-pastel-green rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm leading-relaxed">
                              Revisão das melhores práticas para integração de feedback dos usuários
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-pastel-green/20 text-pastel-green border border-pastel-green/30 rounded text-xs">Processo</span>
                              <span className="px-2 py-0.5 bg-pastel-blue/20 text-pastel-blue border border-pastel-blue/30 rounded text-xs">UX</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-pastel-orange rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-slate-300 text-sm leading-relaxed">
                              Planejamento de testes A/B para validar novas funcionalidades
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-pastel-orange/20 text-pastel-orange border border-pastel-orange/30 rounded text-xs">Testes</span>
                              <span className="px-2 py-0.5 bg-pastel-yellow/20 text-pastel-yellow border border-pastel-yellow/30 rounded text-xs">Validação</span>
                            </div>
                          </div>
                        </div>

                        
                      </div>

                      <div className="pt-3 border-t border-slate-700/50">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-800 bg-slate-900/50">
              <div className="flex gap-3 justify-end">
                <Button className="w-[25%] bg-pastel-blue hover:bg-pastel-blue/80 text-slate-900">
                  Exportar Relatório
                </Button>
                <Button variant="outline" className="w-[10%] border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white hover:border-white transition-all" onClick={() => setShowStatsModal(false)}>
                  Fechar
                 </Button>
              </div>
              </div>
            </div>
          </div>}
      </DialogContent>
    </Dialog>;
};