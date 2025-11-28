import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Play, Share2, Heart, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Podcast {
  id: string;
  title: string;
  topic: string;
  image: string;
}

interface PodcastPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PodcastCardProps {
  podcast: Podcast;
  isFavorite: boolean;
  onToggleFavorite: (podcast: Podcast) => void;
}

const nowPlayingPodcasts: Podcast[] = [
  {
    id: "1",
    title: "Mercados em Foco #142",
    topic: "Volatilidade e Estratégias",
    image: "/src/assets/podcast-ep142-volatilidade.png",
  },
  {
    id: "2",
    title: "Mercados em Foco #141",
    topic: "Taxa Selic e Impactos",
    image: "/src/assets/podcast-ep141-selic.png",
  },
  {
    id: "3",
    title: "Mercados em Foco #140",
    topic: "Tendências 2025",
    image: "/src/assets/podcast-ep140-tendencias-2025.png",
  },
];

const continuePodcasts: Podcast[] = [
  {
    id: "4",
    title: "Mercados em Foco #139",
    topic: "Bancos e Fintechs",
    image: "/src/assets/podcast-ep139-bancos-fintechs.png",
  },
  {
    id: "5",
    title: "Mercados em Foco #138",
    topic: "Criptomoedas em 2025",
    image: "/src/assets/podcast-ep138-cripto.png",
  },
  {
    id: "6",
    title: "Mercados em Foco #137",
    topic: "Open Finance",
    image: "/src/assets/podcast-ep137-open-finance.png",
  },
];

const recommendedPodcasts: Podcast[] = [
  {
    id: "7",
    title: "Mercados em Foco #136",
    topic: "ESG no Mercado Financeiro",
    image: "/src/assets/podcast-ep136-esg.png",
  },
  {
    id: "8",
    title: "Mercados em Foco #135",
    topic: "Cartões de Crédito",
    image: "/src/assets/podcast-ep135-cartoes.png",
  },
];

const PodcastCard = ({ podcast, isFavorite, onToggleFavorite }: PodcastCardProps) => {
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${podcast.title} - ${podcast.topic}`);
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para área de transferência");
      return;
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="group relative flex flex-col gap-3 p-5 rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card via-card/95 to-muted/30 hover:shadow-2xl hover:shadow-pastel-purple/20 hover:border-pastel-purple/60 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-purple/5 via-transparent to-pastel-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing edge effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{
             background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent 40%)'
           }} />
      
      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0 group/image">
          <div className="absolute inset-0 bg-gradient-to-br from-pastel-purple/30 to-pastel-pink/30 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500 scale-90 group-hover:scale-110" />
          <img
            src={podcast.image}
            alt={podcast.title}
            className="relative w-24 h-24 rounded-xl object-cover shadow-lg ring-2 ring-pastel-purple/30 group-hover:ring-4 group-hover:ring-pastel-pink/50 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-pastel-purple to-pastel-pink rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <Play className="h-4 w-4 text-white fill-white animate-pulse" />
          </div>
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover/image:translate-x-[100%] transition-transform duration-1000" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-base text-foreground mb-1.5 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pastel-purple group-hover:to-pastel-pink group-hover:bg-clip-text transition-all duration-300">
            {podcast.title}
          </h4>
          <p className="text-sm text-muted-foreground/80 font-medium">{podcast.topic}</p>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 shrink-0 rounded-xl transition-all duration-300 ${
              isFavorite 
                ? 'text-red-500 hover:text-red-600 hover:bg-red-50 hover:scale-110' 
                : 'text-muted-foreground hover:text-red-500 hover:bg-red-50/50 hover:scale-110'
            }`}
            onClick={() => onToggleFavorite(podcast)}
          >
            <Heart className={`h-4 w-4 transition-all duration-300 ${isFavorite ? 'fill-current scale-110' : ''}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-110 transition-all duration-300"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleShare("facebook")}>
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("twitter")}>
                Twitter/X
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("copy")}>
                Copiar Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Progress bar - full width */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-pastel-purple">Em reprodução</span>
          <span className="text-foreground/90 font-mono">24:30</span>
        </div>
        <div className="relative w-full h-2.5 bg-gradient-to-r from-muted via-muted/80 to-muted rounded-full overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-purple/20 via-pastel-pink/20 to-pastel-purple/20 animate-pulse" />
          <div className="relative h-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 w-[60%] rounded-full transition-all duration-500 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export function PodcastPanel({ open, onOpenChange }: PodcastPanelProps) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Podcast[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (open) {
      loadFavorites();
    }
  }, [open]);

  const loadFavorites = async () => {
    const { data, error } = await supabase
      .from("user_favorite_podcasts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading favorites:", error);
      return;
    }

    if (data) {
      const favPodcasts: Podcast[] = data.map(fav => ({
        id: fav.podcast_id,
        title: fav.podcast_title,
        topic: fav.podcast_topic,
        image: fav.podcast_image,
      }));
      setFavorites(favPodcasts);
      setFavoriteIds(new Set(data.map(fav => fav.podcast_id)));
    }
  };

  const toggleFavorite = async (podcast: Podcast) => {
    const isFavorite = favoriteIds.has(podcast.id);

    if (isFavorite) {
      // Remove from favorites
      const { error } = await supabase
        .from("user_favorite_podcasts")
        .delete()
        .eq("podcast_id", podcast.id);

      if (error) {
        console.error("Error removing favorite:", error);
        toast.error("Erro ao remover dos favoritos");
        return;
      }

      toast.success("Removido dos favoritos");
      await loadFavorites();
    } else {
      // Add to favorites
      const { error } = await supabase
        .from("user_favorite_podcasts")
        .insert({
          podcast_id: podcast.id,
          podcast_title: podcast.title,
          podcast_topic: podcast.topic,
          podcast_image: podcast.image,
        });

      if (error) {
        console.error("Error adding favorite:", error);
        toast.error("Erro ao adicionar aos favoritos");
        return;
      }

      toast.success("Adicionado aos favoritos");
      await loadFavorites();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto bg-gradient-to-br from-background via-background to-muted/30 backdrop-blur-xl border-l-2 border-pastel-purple/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} />
        
        <SheetHeader className="relative pb-8 border-b-2 border-gradient-to-r from-pastel-purple/30 via-pastel-pink/30 to-pastel-blue/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <SheetTitle className="text-3xl font-black bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-blue bg-clip-text text-transparent animate-gradient">
                Podcasts
              </SheetTitle>
              <p className="text-sm text-muted-foreground/90 font-medium">Seu conteúdo de áudio favorito</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/historico-podcasts")}
              className="border-2 border-pastel-blue/40 hover:bg-gradient-to-r hover:from-pastel-blue/10 hover:to-pastel-purple/10 hover:border-pastel-blue hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <History className="h-4 w-4 mr-2" />
              Histórico
            </Button>
          </div>
        </SheetHeader>

        <div className="relative mt-10 space-y-10">
          {/* Meus Favoritos */}
          {favorites.length > 0 && (
            <div className="px-12 animate-fade-in">
              <div className="flex items-center gap-3 mb-5 group">
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <h3 className="text-lg font-black text-foreground tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300">
                  Meus Favoritos
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
              </div>
              <Carousel className="w-full">
                <CarouselContent>
                  {favorites.map((podcast) => (
                    <CarouselItem key={podcast.id}>
                      <PodcastCard 
                        podcast={podcast} 
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          {/* Rolando agora */}
          <div className="px-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-5 group">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-br from-pastel-pink to-pink-400 rounded-full shadow-lg shadow-pastel-pink/50 animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-pastel-pink rounded-full animate-ping opacity-75"></div>
              </div>
              <h3 className="text-lg font-black text-foreground tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pastel-pink group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                Rolando agora
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-pastel-pink/50 to-transparent"></div>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {nowPlayingPodcasts.map((podcast) => (
                  <CarouselItem key={podcast.id}>
                    <PodcastCard 
                      podcast={podcast}
                      isFavorite={favoriteIds.has(podcast.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Continuar de onde parou */}
          <div className="px-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-5 group">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-br from-pastel-blue to-blue-400 rounded-full shadow-lg shadow-pastel-blue/50"></div>
              </div>
              <h3 className="text-lg font-black text-foreground tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pastel-blue group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                Continuar de onde parou
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-pastel-blue/50 to-transparent"></div>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {continuePodcasts.map((podcast) => (
                  <CarouselItem key={podcast.id}>
                    <PodcastCard 
                      podcast={podcast}
                      isFavorite={favoriteIds.has(podcast.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Recomendadas para você */}
          <div className="px-12 pb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-5 group">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-br from-pastel-green to-green-400 rounded-full shadow-lg shadow-pastel-green/50"></div>
              </div>
              <h3 className="text-lg font-black text-foreground tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pastel-green group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-300">
                Recomendadas para você
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-pastel-green/50 to-transparent"></div>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {recommendedPodcasts.map((podcast) => (
                  <CarouselItem key={podcast.id}>
                    <PodcastCard 
                      podcast={podcast}
                      isFavorite={favoriteIds.has(podcast.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
