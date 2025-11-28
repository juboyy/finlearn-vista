import { useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookOpen, Heart, Star, Play, Share2, Clock, Sparkles, TrendingUp, Bookmark } from "lucide-react";
import { toast } from "sonner";

interface Ebook {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  coverImage: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  isFree: boolean;
  progress?: number;
  category: string;
}

interface EbookPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EbookPanel = ({ open, onOpenChange }: EbookPanelProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      toast.success("Removido da wishlist");
    } else {
      newFavorites.add(id);
      toast.success("Adicionado à wishlist");
    }
    setFavorites(newFavorites);
  };

  // Mock data - In production, fetch from API
  const newReleases: Ebook[] = [
    {
      id: "1",
      title: "Gestão de Riscos no Mercado Financeiro",
      author: "Ana Clara Silva",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      coverImage: "/placeholder.svg",
      description: "Estratégias avançadas para gerenciamento de riscos em instituições financeiras",
      rating: 4.8,
      reviews: 342,
      price: 89.90,
      isFree: false,
      category: "Gestão de Riscos"
    },
    {
      id: "2",
      title: "Open Finance: O Futuro dos Pagamentos",
      author: "Ricardo Santos",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      coverImage: "/placeholder.svg",
      description: "Guia completo sobre Open Finance e suas aplicações práticas",
      rating: 4.9,
      reviews: 567,
      price: 0,
      isFree: true,
      category: "Pagamentos"
    },
    {
      id: "3",
      title: "Compliance e Regulamentação Bancária",
      author: "Marina Costa",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      coverImage: "/placeholder.svg",
      description: "Manual essencial sobre compliance no setor financeiro",
      rating: 4.7,
      reviews: 289,
      price: 129.90,
      isFree: false,
      category: "Compliance"
    },
    {
      id: "4",
      title: "Blockchain e Criptoativos",
      author: "João Pedro Lima",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      coverImage: "/placeholder.svg",
      description: "Tecnologia blockchain aplicada ao mercado financeiro",
      rating: 4.6,
      reviews: 421,
      price: 79.90,
      isFree: false,
      category: "Tecnologia"
    }
  ];

  const continueReading: Ebook[] = [
    {
      id: "5",
      title: "Análise Técnica para Iniciantes",
      author: "Sofia Rodrigues",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      coverImage: "/placeholder.svg",
      description: "Fundamentos de análise técnica aplicada ao mercado",
      rating: 4.5,
      reviews: 678,
      price: 59.90,
      isFree: false,
      progress: 65,
      category: "Análise Técnica"
    },
    {
      id: "6",
      title: "Gestão de Portfólio",
      author: "Carlos Mendes",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      coverImage: "/placeholder.svg",
      description: "Estratégias para otimização de carteiras de investimento",
      rating: 4.8,
      reviews: 523,
      price: 0,
      isFree: true,
      progress: 42,
      category: "Investimentos"
    },
    {
      id: "7",
      title: "Mercado de Capitais 2025",
      author: "Patricia Lima",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      coverImage: "/placeholder.svg",
      description: "Tendências e perspectivas do mercado de capitais",
      rating: 4.9,
      reviews: 845,
      price: 149.90,
      isFree: false,
      progress: 28,
      category: "Mercado de Capitais"
    }
  ];

  const wishlist: Ebook[] = [
    {
      id: "8",
      title: "Derivatives & Hedging Strategies",
      author: "Roberto Alves",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      coverImage: "/placeholder.svg",
      description: "Guia avançado sobre derivativos e estratégias de hedge",
      rating: 4.7,
      reviews: 412,
      price: 179.90,
      isFree: false,
      category: "Derivativos"
    },
    {
      id: "9",
      title: "ESG: Investimentos Sustentáveis",
      author: "Juliana Santos",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      coverImage: "/placeholder.svg",
      description: "Como integrar critérios ESG em decisões de investimento",
      rating: 4.8,
      reviews: 634,
      price: 99.90,
      isFree: false,
      category: "ESG"
    }
  ];

  const EbookCard = ({ ebook, showProgress = false }: { ebook: Ebook; showProgress?: boolean }) => {
    const isFavorited = favorites.has(ebook.id);
    
    return (
      <div className="group relative bg-gradient-to-br from-card via-card to-muted/20 border-2 border-border rounded-xl p-4 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/40 overflow-hidden">
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-purple/5 via-pastel-pink/5 to-pastel-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative">
          {/* Badge and favorite */}
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-gradient-to-r from-pastel-blue to-pastel-purple text-foreground border-0 px-3 py-1 font-semibold">
              {ebook.category}
            </Badge>
            <button
              onClick={() => toggleFavorite(ebook.id)}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all duration-300"
            >
              <Heart
                size={16}
                className={isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"}
              />
            </button>
          </div>

          {/* Cover Image */}
          <div className="relative mb-4 rounded-lg overflow-hidden group/image">
            <div className="w-full h-48 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <BookOpen size={64} className="text-muted-foreground/30" />
            </div>
            
            {/* Hover overlay with quick action */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-pastel-purple to-pastel-pink hover:from-pastel-pink hover:to-pastel-purple text-foreground font-semibold shadow-lg"
              >
                <Play size={14} className="mr-2" />
                Ler Agora
              </Button>
            </div>

            {/* Progress indicator for continue reading */}
            {showProgress && ebook.progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/50">
                <div 
                  className="h-full bg-gradient-to-r from-pastel-green to-pastel-blue transition-all duration-300"
                  style={{ width: `${ebook.progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Author info */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={ebook.authorAvatar}
              alt={ebook.author}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300"
            />
            <span className="text-xs text-muted-foreground font-medium">{ebook.author}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-foreground line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pastel-purple group-hover:to-pastel-pink transition-all duration-300">
            {ebook.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {ebook.description}
          </p>

          {/* Progress info for continue reading */}
          {showProgress && ebook.progress !== undefined && (
            <div className="flex items-center gap-2 mb-3 text-xs">
              <Clock size={14} className="text-pastel-blue" />
              <span className="text-muted-foreground">
                {ebook.progress}% completo
              </span>
            </div>
          )}

          {/* Rating and price */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Star size={14} className="fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">{ebook.rating}</span>
              <span className="text-xs text-muted-foreground">({ebook.reviews})</span>
            </div>
            
            <div className="flex items-center gap-2">
              {ebook.isFree ? (
                <Badge className="bg-gradient-to-r from-pastel-green to-pastel-blue text-foreground font-bold px-3 py-1">
                  GRÁTIS
                </Badge>
              ) : (
                <span className="text-lg font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
                  R$ {ebook.price.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-pastel-blue to-pastel-purple hover:from-pastel-purple hover:to-pastel-pink text-foreground font-semibold"
            >
              Ver Detalhes
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-2 hover:bg-muted"
            >
              <Share2 size={14} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px] p-0 bg-gradient-to-br from-background via-background to-muted/30 backdrop-blur-xl border-l-2 border-pastel-blue/20 overflow-y-auto"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--pastel-purple)/0.08),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--pastel-pink)/0.08),transparent_50%)] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
        
        <div className="relative">
          <SheetHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-r from-background/95 via-background to-background/95 backdrop-blur-sm sticky top-0 z-10">
            <SheetTitle className="font-black text-3xl bg-gradient-to-r from-pastel-purple via-pastel-pink to-pastel-blue bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Biblioteca de eBooks
            </SheetTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Explore nossa coleção de conteúdos educacionais premium
            </p>
          </SheetHeader>

          <div className="p-6 space-y-8">
            {/* New Releases Section */}
            <div className="space-y-4 group/section">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pastel-pink to-pastel-purple">
                    <Sparkles size={20} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover/section:text-transparent group-hover/section:bg-clip-text group-hover/section:bg-gradient-to-r group-hover/section:from-pastel-pink group-hover/section:to-pastel-purple transition-all duration-300">
                    Lançamentos
                  </h3>
                  <Badge className="bg-gradient-to-r from-pastel-pink to-pastel-purple text-foreground animate-pulse">
                    Novo
                  </Badge>
                </div>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {newReleases.map((ebook) => (
                    <CarouselItem key={ebook.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/2">
                      <EbookCard ebook={ebook} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>

            {/* Continue Reading Section */}
            <div className="space-y-4 group/section">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pastel-blue to-pastel-green">
                    <Clock size={20} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover/section:text-transparent group-hover/section:bg-clip-text group-hover/section:bg-gradient-to-r group-hover/section:from-pastel-blue group-hover/section:to-pastel-green transition-all duration-300">
                    Continuar de onde parou
                  </h3>
                  <Badge className="bg-gradient-to-r from-pastel-blue to-pastel-green text-foreground">
                    {continueReading.length} em andamento
                  </Badge>
                </div>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {continueReading.map((ebook) => (
                    <CarouselItem key={ebook.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/2">
                      <EbookCard ebook={ebook} showProgress={true} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>

            {/* Wishlist Section */}
            <div className="space-y-4 group/section">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pastel-purple to-pastel-blue">
                    <Bookmark size={20} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover/section:text-transparent group-hover/section:bg-clip-text group-hover/section:bg-gradient-to-r group-hover/section:from-pastel-purple group-hover/section:to-pastel-blue transition-all duration-300">
                    Wishlist
                  </h3>
                  <Badge className="bg-gradient-to-r from-pastel-purple to-pastel-blue text-foreground">
                    {wishlist.length} itens
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-pastel-purple/10 hover:to-pastel-blue/10"
                >
                  Ver todos
                </Button>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {wishlist.map((ebook) => (
                    <CarouselItem key={ebook.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/2">
                      <EbookCard ebook={ebook} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
