import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bookmark, Share2, Printer, TrendingUp, ChevronRight, Volume2, 
  Video, Loader2, Pause, Play, RotateCcw, CheckCircle2, MessageCircle, Bot,
  ChevronLeft, List
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArticleExpertChat } from "@/components/Dashboard/ArticleExpertChat";
import { VideoAvatarModal } from "@/components/VideoAvatarModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

// Extract first image from HTML content
const extractFirstImage = (html: string | null): string | null => {
  if (!html) return null;
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : null;
};

// Strip HTML tags for plain text
const stripHtml = (html: string | null): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

// Extract headings from HTML for table of contents
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const extractHeadings = (html: string | null): TOCItem[] => {
  if (!html) return [];
  const headings: TOCItem[] = [];
  const regex = /<(h[1-3])[^>]*>([^<]+)<\/\1>/gi;
  let match;
  let index = 0;
  
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1].charAt(1));
    const text = match[2].trim();
    if (text) {
      headings.push({
        id: `heading-${index}`,
        text,
        level
      });
      index++;
    }
  }
  
  return headings;
};

const Artigo = () => {
  const { id: articleId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(12);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoAvatarOpen, setIsVideoAvatarOpen] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [savedProgress, setSavedProgress] = useState<number | null>(null);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch post data
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', articleId],
    queryFn: async () => {
      const postId = parseInt(articleId || '0', 10);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!articleId,
  });

  // Memoized values from post
  const articleTitle = post?.title || 'Artigo';
  const articleImage = useMemo(() => extractFirstImage(post?.html), [post?.html]);
  const articleDescription = post?.description || '';
  const articleText = useMemo(() => stripHtml(post?.html), [post?.html]);
  const tableOfContents = useMemo(() => extractHeadings(post?.html), [post?.html]);

  // Scroll to heading
  const scrollToHeading = (index: number) => {
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3');
    if (headings[index]) {
      headings[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Check if article is already saved
  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user || !articleId) return;
      
      try {
        const { data, error } = await supabase
          .from('saved_items')
          .select('id')
          .eq('user_id', user.id)
          .eq('item_id', articleId)
          .eq('item_type', 'read_later')
          .maybeSingle();
        
        if (data && !error) {
          setIsSaved(true);
        }
      } catch (err) {
        console.log('Article not in read later');
      }
    };
    
    checkIfSaved();
  }, [user, articleId]);

  // Handle save/unsave article
  const handleSaveArticle = async () => {
    if (!user) {
      toast({
        title: "Login necessario",
        description: "Faca login para salvar artigos.",
        variant: "destructive"
      });
      return;
    }

    if (!articleId) return;

    setIsSaving(true);
    
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('saved_items')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', articleId)
          .eq('item_type', 'read_later');

        if (error) throw error;

        setIsSaved(false);
        toast({
          title: "Removido",
          description: "Artigo removido de Ler Depois."
        });
      } else {
        const { error } = await supabase
          .from('saved_items')
          .insert({
            user_id: user.id,
            item_id: articleId,
            item_type: 'read_later',
            item_title: articleTitle,
            item_image: articleImage,
            item_description: articleDescription,
            item_url: `/artigo/${articleId}`,
            metadata: {
              category: post?.category,
              content_type: 'article'
            }
          });

        if (error) throw error;

        setIsSaved(true);
        toast({
          title: "Adicionado",
          description: "Artigo adicionado a Ler Depois."
        });
      }
    } catch (err) {
      console.error('Error saving article:', err);
      toast({
        title: "Erro",
        description: "Nao foi possivel salvar o artigo. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Load saved audio progress on mount
  useEffect(() => {
    const loadSavedProgress = async () => {
      if (!user || !articleId) return;
      
      try {
        const { data, error } = await supabase
          .from('article_audio_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('article_id', articleId)
          .maybeSingle();
        
        if (data && !error && !data.completed) {
          setSavedProgress(data.current_time_seconds);
          setPlaybackSpeed(data.playback_speed);
          setHasSavedProgress(true);
        }
      } catch (err) {
        console.log('No saved progress found');
      }
    };
    
    loadSavedProgress();
  }, [user, articleId]);

  // Save progress function
  const saveProgress = useCallback(async () => {
    if (!user || !articleId || !audioRef.current) return;
    
    const currentTimeValue = audioRef.current.currentTime;
    const durationValue = audioRef.current.duration;
    const progressValue = (currentTimeValue / durationValue) * 100;
    const isCompleted = progressValue >= 95;
    
    try {
      await supabase
        .from('article_audio_progress')
        .upsert({
          user_id: user.id,
          article_id: articleId,
          article_title: articleTitle,
          current_time_seconds: currentTimeValue,
          total_duration_seconds: durationValue,
          progress_percentage: progressValue,
          playback_speed: playbackSpeed,
          completed: isCompleted,
          last_played_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,article_id'
        });
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  }, [user, articleId, articleTitle, playbackSpeed]);

  // Auto-save progress every 5 seconds while playing
  useEffect(() => {
    if (isPlaying && user) {
      saveIntervalRef.current = setInterval(() => {
        saveProgress();
      }, 5000);
    }
    
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, [isPlaying, saveProgress, user]);

  // Save progress when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current && user) {
        saveProgress();
      }
    };
  }, [saveProgress, user]);

  // Scroll progress tracking
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      setScrollProgress(scrollPercent);
      
      const totalMinutes = Math.ceil((post?.read_time?.replace(/\D/g, '') || 12) as number);
      const remainingMinutes = Math.ceil(totalMinutes * (1 - scrollPercent / 100));
      setTimeRemaining(remainingMinutes);
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, [post?.read_time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleListenArticle = async () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    if (!articleText) {
      toast({
        title: "Erro",
        description: "Nao ha conteudo para reproduzir.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAudio(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech-elevenlabs', {
        body: { text: articleText.slice(0, 5000) }
      });

      if (error) throw error;

      if (data?.audioContent) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        
        audioRef.current = new Audio(audioUrl);
        audioRef.current.playbackRate = playbackSpeed;
        
        audioRef.current.onloadedmetadata = () => {
          if (audioRef.current) {
            setAudioDuration(audioRef.current.duration);
            if (savedProgress !== null && savedProgress > 0) {
              audioRef.current.currentTime = savedProgress;
              setCurrentTime(savedProgress);
              toast({
                title: "Continuando de onde parou",
                description: `Retomando em ${formatTime(savedProgress)}`,
              });
            }
          }
        };
        
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setAudioProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        };
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setAudioProgress(0);
          setCurrentTime(0);
          setSavedProgress(null);
          setHasSavedProgress(false);
          saveProgress();
        };
        
        audioRef.current.play();
        setIsPlaying(true);
        
        toast({
          title: "Reproduzindo artigo",
          description: "O audio do artigo esta sendo reproduzido.",
        });
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        title: "Erro ao gerar audio",
        description: "Nao foi possivel gerar o audio do artigo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (scrollProgress / 100) * circumference;

  const formattedDate = post?.published_at 
    ? new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Artigo nao encontrado</p>
        <Button onClick={() => navigate('/conteudo')}>
          <ChevronLeft size={16} className="mr-2" />
          Voltar para Conteudo
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-1 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-primary-foreground" size={20} />
                </div>
                <span className="text-xl font-semibold text-foreground">FinLearn</span>
              </Link>
              <div className="h-6 w-px bg-border ml-2" />
              <nav className="flex items-center gap-1 ml-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition">
                  Dashboard
                </Link>
                <ChevronRight size={12} className="text-muted-foreground" />
                <Link to="/conteudo" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition">
                  Artigos
                </Link>
                <ChevronRight size={12} className="text-muted-foreground" />
                <span className="text-sm text-foreground font-medium px-3 py-2 truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleSaveArticle} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Bookmark size={20} className={isSaved ? "fill-current" : ""} />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="col-span-2 sticky top-24 h-fit hidden lg:block">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Progresso de Leitura</h3>
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle cx="48" cy="48" r="40" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="8" 
                      fill="none" 
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">{Math.round(scrollProgress)}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {timeRemaining} min restantes
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-border">
                <button 
                  onClick={handleSaveArticle}
                  disabled={isSaving}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition text-left ${isSaved ? 'bg-primary/20' : ''}`}
                >
                  {isSaving ? (
                    <Loader2 size={16} className="text-muted-foreground animate-spin" />
                  ) : (
                    <Bookmark size={16} className={isSaved ? "text-primary fill-primary" : "text-muted-foreground"} />
                  )}
                  <span className={`text-sm ${isSaved ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    Ler Depois
                  </span>
                  {isSaved && <CheckCircle2 size={14} className="ml-auto text-primary" />}
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition text-left">
                  <Printer size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Imprimir</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition text-left">
                  <Share2 size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Compartilhar</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <article className="col-span-12 lg:col-span-7">
            <div className="bg-card rounded-xl p-6 md:p-10 border border-border mb-6">
              {/* Category badges */}
              {post.category && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-foreground text-sm rounded-full font-medium">
                    {post.category}
                  </span>
                  {post.visibility === 'premium' && (
                    <span className="px-3 py-1 bg-warning/20 text-warning text-sm rounded-full font-medium">
                      Premium
                    </span>
                  )}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-border gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {post.author_name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{post.author_name || 'Autor'}</p>
                    <p className="text-xs text-muted-foreground">Autor</p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-foreground">{formattedDate}</p>
                  <p className="text-xs text-muted-foreground">{post.read_time || '5 min'} de leitura</p>
                </div>
              </div>

              {/* Content Consumption Options */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Volume2 size={16} className="text-primary" />
                  Escolha como consumir este conteudo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button 
                    onClick={handleListenArticle}
                    disabled={isGeneratingAudio}
                    className={`flex items-center gap-3 p-4 bg-card rounded-lg border transition disabled:opacity-50 disabled:cursor-not-allowed ${
                      hasSavedProgress 
                        ? 'border-success hover:border-success hover:bg-success/10' 
                        : 'border-border hover:border-primary hover:bg-primary/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      hasSavedProgress ? 'bg-success/30' : 'bg-primary/30'
                    }`}>
                      {isGeneratingAudio ? (
                        <Loader2 size={18} className="text-foreground animate-spin" />
                      ) : isPlaying ? (
                        <Pause size={18} className="text-foreground" />
                      ) : hasSavedProgress ? (
                        <RotateCcw size={18} className="text-foreground" />
                      ) : (
                        <Volume2 size={18} className="text-foreground" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {isGeneratingAudio 
                          ? "Gerando audio..." 
                          : isPlaying 
                            ? "Pausar Audio" 
                            : hasSavedProgress 
                              ? "Continuar Ouvindo" 
                              : "Ouvir Artigo"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isGeneratingAudio 
                          ? "Aguarde" 
                          : isPlaying 
                            ? "Reproduzindo" 
                            : hasSavedProgress && savedProgress !== null
                              ? `Continuar em ${formatTime(savedProgress)}`
                              : "Audio narrado"}
                      </p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setIsVideoAvatarOpen(true)}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition"
                  >
                    <div className="w-10 h-10 bg-success/50 rounded-lg flex items-center justify-center">
                      <Video size={18} className="text-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Ver em Video</p>
                      <p className="text-xs text-muted-foreground">Avatar IA</p>
                    </div>
                  </button>
                </div>

                {/* Audio Player Controls */}
                {audioRef.current && (isPlaying || audioProgress > 0) && (
                  <div className="mt-4 p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={handleListenArticle}
                        className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center hover:bg-primary/50 transition"
                      >
                        {isPlaying ? (
                          <Pause size={18} className="text-foreground" />
                        ) : (
                          <Play size={18} className="text-foreground ml-0.5" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <input
                          type="range"
                          min={0}
                          max={audioDuration || 100}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(audioDuration)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Velocidade:</span>
                      <div className="flex gap-1">
                        {speedOptions.map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`px-2 py-1 text-xs rounded transition ${
                              playbackSpeed === speed
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {articleImage && (
                <div className="rounded-xl overflow-hidden mb-8">
                  <img 
                    src={articleImage} 
                    alt={post.title || 'Imagem do artigo'} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Article HTML Content */}
              <div 
                className="prose dark:prose-invert max-w-none
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                  prose-h1:text-3xl prose-h1:leading-tight
                  prose-h2:text-2xl prose-h2:leading-snug
                  prose-h3:text-xl prose-h3:leading-snug
                  prose-h4:text-lg prose-h4:font-semibold
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-img:rounded-xl prose-img:my-6
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:my-1
                  prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:italic
                  prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border"
                dangerouslySetInnerHTML={{ __html: post.html || '<p>Conteudo nao disponivel.</p>' }}
              />

              {/* Social engagement */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
                    <MessageCircle size={18} />
                    <span className="text-sm">{post.comments || 0} comentarios</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 size={14} className="mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <List size={16} className="text-primary" />
                    Neste Artigo
                  </h3>
                  <nav className="space-y-1">
                    {tableOfContents.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(index)}
                        className={`w-full text-left text-sm hover:text-primary transition py-1.5 ${
                          item.level === 1 
                            ? 'font-medium text-foreground' 
                            : item.level === 2 
                              ? 'pl-3 text-muted-foreground' 
                              : 'pl-6 text-muted-foreground text-xs'
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              {/* AI Chat */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Bot size={16} className="text-primary" />
                  Pergunte ao Especialista
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tire suas duvidas sobre este artigo com nosso assistente de IA especializado.
                </p>
                <Button 
                  onClick={() => setIsChatOpen(true)} 
                  className="w-full"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Iniciar Conversa
                </Button>
              </div>

              {/* Related Articles placeholder */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Artigos Relacionados</h3>
                <p className="text-sm text-muted-foreground">
                  Mais artigos sobre {post.category || 'este tema'} em breve.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Chat Panel */}
      <ArticleExpertChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        articleTitle={articleTitle}
        articleContext={articleText}
      />

      {/* Video Avatar Modal */}
      <VideoAvatarModal
        open={isVideoAvatarOpen}
        onOpenChange={setIsVideoAvatarOpen}
        articleTitle={articleTitle}
        articleContent={articleText}
      />
    </div>
  );
};

export default Artigo;
