import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Circle,
  BookmarkCheck,
  Loader2,
} from "lucide-react";
import { useSaveForLater } from "@/hooks/useSaveForLater";
import { Badge } from "@/components/ui/badge";
import { useProductViewTracker } from "@/hooks/useProductViewTracker";
import { usePodcastProgress } from "@/hooks/usePodcastProgress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ep142Image from "@/assets/podcast-ep142-volatilidade.png";
import ep141Image from "@/assets/podcast-ep141-selic.png";
import ep140Image from "@/assets/podcast-ep140-tendencias-2025.png";
import ep139Image from "@/assets/podcast-ep139-bancos-fintechs.png";
import ep138Image from "@/assets/podcast-ep138-cripto.png";
import ep137Image from "@/assets/podcast-ep137-open-finance.png";
import ep136Image from "@/assets/podcast-ep136-esg.png";
import ep135Image from "@/assets/podcast-ep135-cartoes.png";

interface PodcastData {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  duration_estimate: string | null;
  tags: string[] | null;
  audio_url: string | null;
  cover_image_url: string | null;
  hosts: { name: string; role: string; avatar: string; isMain?: boolean }[] | null;
  guests: { name: string; role: string; avatar: string }[] | null;
  status: string | null;
  created_at: string;
}

export default function PodcastDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mockUserId = "user-123";
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Podcast data state
  const [podcast, setPodcast] = useState<PodcastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2700);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Load podcast from database
  useEffect(() => {
    const loadPodcast = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("podcasts")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setPodcast({
            id: data.id,
            title: data.title,
            description: data.description,
            category: data.category,
            duration_estimate: data.duration_estimate,
            tags: data.tags,
            audio_url: data.audio_url,
            cover_image_url: data.cover_image_url,
            hosts: data.hosts as PodcastData["hosts"],
            guests: data.guests as PodcastData["guests"],
            status: data.status,
            created_at: data.created_at,
          });
        }
      } catch (error) {
        console.error("Error loading podcast:", error);
        toast.error("Erro ao carregar podcast");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPodcast();
  }, [id]);

  // Save for later functionality
  const { isSaved, isLoading: isSaving, toggleSave } = useSaveForLater({
    itemId: id || 'podcast-mercados-em-foco',
    itemTitle: podcast?.title || 'Podcast',
    itemType: 'podcast',
    itemDescription: podcast?.description || '',
    itemUrl: `/podcast/${id}`
  });

  // Track product view time
  useProductViewTracker({
    productId: id || 'podcast-mercados-em-foco',
    productType: 'podcast',
    productTitle: podcast?.title || 'Podcast',
    productCategory: podcast?.category || 'Geral',
    productTags: podcast?.tags || ['podcast']
  }, mockUserId);

  // Track podcast listening progress
  usePodcastProgress({
    podcastId: id || 'podcast',
    podcastTitle: podcast?.title || 'Podcast',
    podcastTopic: podcast?.category || 'Geral',
    podcastImage: podcast?.cover_image_url || ep142Image,
    episodeNumber: 1,
    currentTimeSeconds: currentTime,
    totalDurationSeconds: duration,
    isPlaying: isPlaying,
  });

  // Audio playback handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 2700);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [podcast?.audio_url]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
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
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 15);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 15);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
        <SidebarFix />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
        <SidebarFix />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Podcast nao encontrado</p>
          <button
            onClick={() => navigate('/aprendizado')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const coverImage = podcast.cover_image_url || ep142Image;
  const mainHost = podcast.hosts?.find(h => h.isMain) || podcast.hosts?.[0];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-[hsl(215,20%,85%)] dark:border-slate-700 flex-shrink-0 z-10">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/aprendizado')}
                className="p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Mercados em Foco</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Podcast semanal de análise de mercado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(322,35%,78%)] rounded-full ring-2 ring-white dark:ring-slate-800"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hidden Audio Element */}
          {podcast.audio_url && (
            <audio ref={audioRef} src={podcast.audio_url} preload="metadata" />
          )}

          {/* Hero Section */}
          <section className="bg-gradient-to-br from-[hsl(206,35%,75%)] to-[hsl(270,45%,52%)] px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-12 gap-8 items-center">
                {/* Podcast Cover */}
                <div className="col-span-4">
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <img 
                      src={coverImage}
                      alt={podcast.title}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </div>

                {/* Podcast Info */}
                <div className="col-span-8">
                  <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    <Headphones className="w-3 h-3 mr-1.5" /> {podcast.category || 'Podcast'}
                  </Badge>
                  <h2 className="text-4xl font-bold text-white mb-4">{podcast.title}</h2>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    {podcast.description || 'Sem descricao disponivel'}
                  </p>
                  
                  {/* Host Info */}
                  {mainHost && (
                    <div className="flex items-center gap-3 mb-6">
                      {mainHost.avatar && (
                        <img 
                          src={mainHost.avatar} 
                          alt={mainHost.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                        />
                      )}
                      <div>
                        <p className="text-white font-semibold">{mainHost.name}</p>
                        <p className="text-white/70 text-sm">{mainHost.role}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-white/80" />
                        <span className="text-xs text-white/80 font-semibold">Duracao</span>
                      </div>
                      <p className="text-xl font-bold text-white">{podcast.duration_estimate || '--'}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-white/80" />
                        <span className="text-xs text-white/80 font-semibold">Publicado</span>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {new Date(podcast.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-white/80" />
                        <span className="text-xs text-white/80 font-semibold">Participantes</span>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {(podcast.hosts?.length || 0) + (podcast.guests?.length || 0)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg flex items-center gap-2">
                      <Plus className="w-5 h-5" /> Seguir
                    </button>
                    <button 
                      onClick={toggleSave}
                      disabled={isSaving}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all border flex items-center gap-2 ${
                        isSaved 
                          ? 'bg-pastel-purple/40 text-slate-700 border-pastel-purple/50' 
                          : 'bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-5 h-5 fill-slate-700" /> : <Bookmark className="w-5 h-5" />}
                      {isSaved ? 'Salvo' : 'Ouvir Depois'}
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
          <section className="sticky top-0 bg-white dark:bg-slate-800 border-b border-[hsl(215,20%,85%)] dark:border-slate-700 shadow-lg z-20">
            <div className="px-8 py-3">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                  {/* Currently Playing Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={coverImage} alt="podcast" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400">{podcast.category || 'Podcast'}</p>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{podcast.title}</h3>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="flex items-center gap-3">
                    <button className="p-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={skipBackward}
                      className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={togglePlayPause}
                      className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-full hover:bg-slate-700 dark:hover:bg-slate-600 transition-all shadow-lg"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <button 
                      onClick={skipForward}
                      className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress Bar with Time */}
                  <div className="flex items-center gap-3 flex-[2] min-w-0">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleProgressChange}
                      className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(206, 35%, 75%) 0%, hsl(206, 35%, 75%) ${(currentTime / duration) * 100}%, hsl(215, 20%, 85%) ${(currentTime / duration) * 100}%, hsl(215, 20%, 85%) 100%)`
                      }}
                    />
                    <span className="text-xs text-slate-600 font-medium whitespace-nowrap">{formatTime(duration)}</span>
                  </div>

                  {/* Volume Controls and Badges */}
                  <div className="flex items-center gap-3">
                    <button onClick={toggleMute} className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(206, 35%, 75%) 0%, hsl(206, 35%, 75%) ${(isMuted ? 0 : volume) * 100}%, hsl(215, 20%, 85%) ${(isMuted ? 0 : volume) * 100}%, hsl(215, 20%, 85%) 100%)`
                      }}
                    />
                    <div className="flex items-center gap-2 ml-2">
                      <Badge className="bg-[hsl(206,35%,75%)]/20 text-[hsl(206,45%,30%)] border-[hsl(206,35%,75%)]/30">
                        <Clock className="w-3 h-3 mr-1" /> {podcast.duration_estimate || '--'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Participants Section */}
          {(podcast.hosts?.length || podcast.guests?.length) ? (
            <section className="px-8 py-8">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Participantes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {podcast.hosts?.map((host, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-[hsl(215,20%,85%)] dark:border-slate-700 p-4 flex items-center gap-4">
                      {host.avatar ? (
                        <img src={host.avatar} alt={host.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[hsl(206,35%,75%)]/20 flex items-center justify-center">
                          <Users className="w-6 h-6 text-[hsl(206,45%,30%)]" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{host.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{host.role}</p>
                        {host.isMain && (
                          <Badge className="mt-1 bg-[hsl(206,35%,75%)]/20 text-[hsl(206,45%,30%)] border-[hsl(206,35%,75%)]/30 text-xs">
                            Host Principal
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  {podcast.guests?.map((guest, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-[hsl(215,20%,85%)] dark:border-slate-700 p-4 flex items-center gap-4">
                      {guest.avatar ? (
                        <img src={guest.avatar} alt={guest.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[hsl(322,35%,78%)]/20 flex items-center justify-center">
                          <Users className="w-6 h-6 text-[hsl(322,45%,38%)]" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{guest.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{guest.role}</p>
                        <Badge className="mt-1 bg-[hsl(322,35%,78%)]/20 text-[hsl(322,45%,38%)] border-[hsl(322,35%,78%)]/30 text-xs">
                          Convidado
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* Tags Section */}
          {podcast.tags && podcast.tags.length > 0 && (
            <section className="px-8 py-8 bg-white dark:bg-slate-800 border-t border-[hsl(215,20%,85%)] dark:border-slate-700">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {podcast.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-[hsl(206,35%,75%)]/20 text-[hsl(206,45%,30%)] border-[hsl(206,35%,75%)]/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
