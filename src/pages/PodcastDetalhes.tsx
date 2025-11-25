import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import {
  ArrowLeft,
  Bell,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Download,
  Clock,
  Calendar,
  Users,
  Headphones,
  Star,
  MoreVertical,
  Bookmark,
  Plus,
  TrendingUp,
  Activity,
  Award,
  MessageCircle,
  CheckCircle2,
  PlayCircle,
  Circle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Episode {
  id: number;
  number: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  plays: string;
  status: "played" | "playing" | "unplayed";
  image: string;
}

export default function PodcastDetalhes() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2700); // 45 minutes in seconds
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(142);
  const audioRef = useRef<HTMLAudioElement>(null);

  const episodes: Episode[] = [
    {
      id: 142,
      number: 142,
      title: "Análise Semanal: Volatilidade e Oportunidades no Mercado",
      description: "Discutimos os principais movimentos do mercado esta semana, incluindo decisões do COPOM, flutuações cambiais e oportunidades em renda variável.",
      duration: "45:32",
      date: "20/01/2025",
      plays: "12.4k",
      status: "playing",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    },
    {
      id: 141,
      number: 141,
      title: "Taxa Selic: Impactos e Projeções para o Primeiro Semestre",
      description: "Análise profunda das últimas decisões do Banco Central e seus efeitos no mercado de crédito, investimentos e consumo.",
      duration: "52:18",
      date: "13/01/2025",
      plays: "15.2k",
      status: "played",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    },
    {
      id: 140,
      number: 140,
      title: "Especial: Tendências Econômicas para 2025",
      description: "Episódio especial de fim de ano analisando as principais tendências macroeconômicas e oportunidades de investimento para 2025.",
      duration: "68:45",
      date: "06/01/2025",
      plays: "18.9k",
      status: "played",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    },
    {
      id: 139,
      number: 139,
      title: "Análise de Setores: Bancos e Fintechs em Dezembro",
      description: "Revisão completa do desempenho do setor financeiro no último mês do ano, com foco em bancos tradicionais e fintechs emergentes.",
      duration: "47:22",
      date: "30/12/2024",
      plays: "11.8k",
      status: "unplayed",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    },
    {
      id: 138,
      number: 138,
      title: "Mercado de Criptoativos: Regulamentação e Oportunidades",
      description: "Discussão sobre o cenário regulatório brasileiro para criptomoedas e as oportunidades que surgem com maior segurança jurídica.",
      duration: "55:10",
      date: "23/12/2024",
      plays: "16.5k",
      status: "unplayed",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    },
    {
      id: 137,
      number: 137,
      title: "Open Finance: Um Ano de Transformações",
      description: "Balanço do primeiro ano completo do Open Finance no Brasil, seus impactos no mercado e perspectivas futuras.",
      duration: "49:38",
      date: "16/12/2024",
      plays: "13.7k",
      status: "unplayed",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    },
    {
      id: 136,
      number: 136,
      title: "ESG no Setor Financeiro: Além do Marketing",
      description: "Análise crítica sobre práticas ESG genuínas vs. greenwashing no mercado financeiro brasileiro.",
      duration: "51:25",
      date: "09/12/2024",
      plays: "14.2k",
      status: "unplayed",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    },
    {
      id: 135,
      number: 135,
      title: "Cartões de Crédito: Revolução nos Programas de Benefícios",
      description: "Como os programas de benefícios dos cartões estão evoluindo e o que esperar para os próximos anos.",
      duration: "43:52",
      date: "02/12/2024",
      plays: "10.9k",
      status: "unplayed",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png"
    }
  ];

  const currentEpisode = episodes.find(ep => ep.number === selectedEpisode) || episodes[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 15));
  };

  const skipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 15));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[hsl(215,20%,85%)] flex-shrink-0 z-10">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/aprendizado')}
                className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Mercados em Foco</h1>
                <p className="text-sm text-slate-600 font-medium">Podcast semanal de análise de mercado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(322,35%,78%)] rounded-full ring-2 ring-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-[hsl(206,35%,75%)] to-[hsl(270,35%,78%)] px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-12 gap-8 items-center">
                {/* Podcast Cover */}
                <div className="col-span-4">
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <img 
                      src={currentEpisode.image}
                      alt="Mercados em Foco"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </div>

                {/* Podcast Info */}
                <div className="col-span-8">
                  <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    <Headphones className="w-3 h-3 mr-1.5" /> Podcast
                  </Badge>
                  <h2 className="text-4xl font-bold text-white mb-4">Mercados em Foco</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Análises semanais dos principais movimentos do mercado financeiro brasileiro. 
                    Discussões aprofundadas sobre macroeconomia, investimentos, regulação e tendências do setor.
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-white/80" />
                        <span className="text-xs text-white/80 font-semibold">Ouvintes</span>
                      </div>
                      <p className="text-2xl font-bold text-white">847k</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <PlayCircle className="w-4 h-4 text-white/80" />
                        <span className="text-xs text-white/80 font-semibold">Episódios</span>
                      </div>
                      <p className="text-2xl font-bold text-white">142</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-white/80" />
                        <span className="text-xs text-white/80 font-semibold">Avaliação</span>
                      </div>
                      <p className="text-2xl font-bold text-white">4.9</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-white/80" />
                        <span className="text-xs text-white/80 font-semibold">Reviews</span>
                      </div>
                      <p className="text-2xl font-bold text-white">12.3k</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg flex items-center gap-2">
                      <Plus className="w-5 h-5" /> Seguir
                    </button>
                    <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Audio Player Section */}
          <section className="sticky top-0 bg-white border-b border-[hsl(215,20%,85%)] shadow-lg z-20">
            <div className="px-8 py-6">
              <div className="max-w-7xl mx-auto">
                {/* Currently Playing Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={currentEpisode.image} alt="episode" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">Episódio #{currentEpisode.number}</p>
                    <h3 className="font-bold text-slate-800 truncate">{currentEpisode.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[hsl(206,35%,75%)]/20 text-[hsl(206,45%,30%)] border-[hsl(206,35%,75%)]/30">
                      <Clock className="w-3 h-3 mr-1" /> {currentEpisode.duration}
                    </Badge>
                    <Badge className="bg-[hsl(142,35%,75%)]/20 text-[hsl(142,45%,28%)] border-[hsl(142,35%,75%)]/30">
                      <Headphones className="w-3 h-3 mr-1" /> {currentEpisode.plays}
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(206, 35%, 75%) 0%, hsl(206, 35%, 75%) ${(currentTime / duration) * 100}%, hsl(215, 20%, 85%) ${(currentTime / duration) * 100}%, hsl(215, 20%, 85%) 100%)`
                    }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-600 font-medium">{formatTime(currentTime)}</span>
                    <span className="text-xs text-slate-600 font-medium">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Main Controls */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={skipBackward}
                      className="p-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={togglePlayPause}
                      className="p-4 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-all shadow-lg"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>
                    <button 
                      onClick={skipForward}
                      className="p-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Volume Controls */}
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <button onClick={toggleMute} className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                      {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(206, 35%, 75%) 0%, hsl(206, 35%, 75%) ${(isMuted ? 0 : volume) * 100}%, hsl(215, 20%, 85%) ${(isMuted ? 0 : volume) * 100}%, hsl(215, 20%, 85%) 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Episodes List */}
          <section className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Todos os Episódios</h2>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] bg-white">
                    <option>Mais recentes</option>
                    <option>Mais antigos</option>
                    <option>Mais ouvidos</option>
                    <option>Melhor avaliados</option>
                  </select>
                </div>
              </div>

              {/* Episodes Grid */}
              <div className="space-y-4">
                {episodes.map((episode) => (
                  <div 
                    key={episode.id}
                    onClick={() => setSelectedEpisode(episode.number)}
                    className={`bg-white rounded-xl border transition-all cursor-pointer ${
                      selectedEpisode === episode.number
                        ? 'border-[hsl(206,35%,75%)] shadow-lg ring-2 ring-[hsl(206,35%,75%)]/20'
                        : 'border-[hsl(215,20%,85%)] hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Episode Image */}
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                          <img src={episode.image} alt={episode.title} className="w-full h-full object-cover" />
                          {selectedEpisode === episode.number && (
                            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-sm">
                              {isPlaying ? (
                                <Pause className="w-8 h-8 text-white" />
                              ) : (
                                <Play className="w-8 h-8 text-white ml-1" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Episode Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                                  Episódio #{episode.number}
                                </Badge>
                                <span className="text-xs text-slate-500">{episode.date}</span>
                                {episode.status === "played" ? (
                                  <CheckCircle2 className="w-4 h-4 text-[hsl(142,45%,28%)]" />
                                ) : episode.status === "playing" ? (
                                  <Badge className="bg-[hsl(206,35%,75%)]/20 text-[hsl(206,45%,30%)] border-[hsl(206,35%,75%)]/30">
                                    <Activity className="w-3 h-3 mr-1" /> Reproduzindo
                                  </Badge>
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-300" />
                                )}
                              </div>
                              <h3 className="font-bold text-slate-800 mb-2 text-lg">{episode.title}</h3>
                              <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{episode.description}</p>
                            </div>
                          </div>

                          {/* Episode Meta */}
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{episode.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <Headphones className="w-4 h-4" />
                              <span className="font-medium">{episode.plays} reproduções</span>
                            </div>
                            <div className="flex-1"></div>
                            <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-[hsl(215,20%,85%)] px-8 pb-8">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-sm text-slate-600 font-medium">© 2025 Mercados em Foco - Todos os direitos reservados. Central de Conteúdo Educacional.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
