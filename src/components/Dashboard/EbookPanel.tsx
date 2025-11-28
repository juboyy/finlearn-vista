import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookOpen, Heart, Star, Play, Share2, Clock, Sparkles, Bookmark } from "lucide-react";
import { toast } from "sonner";

// Import ebook cover images
import ebookGestaoRiscos from "@/assets/ebook-gestao-riscos.png";
import ebookOpenFinance from "@/assets/ebook-open-finance.png";
import ebookCompliance from "@/assets/ebook-compliance.png";
import ebookBlockchain from "@/assets/ebook-blockchain.png";
import ebookAnaliseTecnica from "@/assets/ebook-analise-tecnica.png";
import ebookPortfolio from "@/assets/ebook-portfolio.png";
import ebookMercadoCapitais from "@/assets/ebook-mercado-capitais.png";
import ebookDerivatives from "@/assets/ebook-derivatives.png";
import ebookESG from "@/assets/ebook-esg.png";
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
  discount?: number;
  originalPrice?: number;
}
interface EbookPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const EbookPanel = ({
  open,
  onOpenChange
}: EbookPanelProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
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
  const newReleases: Ebook[] = [{
    id: "1",
    title: "Gestão de Riscos no Mercado Financeiro",
    author: "Ana Clara Silva",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    coverImage: ebookGestaoRiscos,
    description: "Estratégias avançadas para gerenciamento de riscos em instituições financeiras",
    rating: 4.8,
    reviews: 342,
    price: 62.93,
    originalPrice: 89.90,
    discount: 30,
    isFree: false,
    category: "Gestão de Riscos"
  }, {
    id: "2",
    title: "Open Finance: O Futuro dos Pagamentos",
    author: "Ricardo Santos",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    coverImage: ebookOpenFinance,
    description: "Guia completo sobre Open Finance e suas aplicações práticas",
    rating: 4.9,
    reviews: 567,
    price: 0,
    isFree: true,
    category: "Pagamentos"
  }, {
    id: "3",
    title: "Compliance e Regulamentação Bancária",
    author: "Marina Costa",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    coverImage: ebookCompliance,
    description: "Manual essencial sobre compliance no setor financeiro",
    rating: 4.7,
    reviews: 289,
    price: 129.90,
    isFree: false,
    category: "Compliance"
  }, {
    id: "4",
    title: "Blockchain e Criptoativos",
    author: "João Pedro Lima",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    coverImage: ebookBlockchain,
    description: "Tecnologia blockchain aplicada ao mercado financeiro",
    rating: 4.6,
    reviews: 421,
    price: 55.93,
    originalPrice: 79.90,
    discount: 30,
    isFree: false,
    category: "Tecnologia"
  }];
  const continueReading: Ebook[] = [{
    id: "5",
    title: "Análise Técnica para Iniciantes",
    author: "Sofia Rodrigues",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    coverImage: ebookAnaliseTecnica,
    description: "Fundamentos de análise técnica aplicada ao mercado",
    rating: 4.5,
    reviews: 678,
    price: 59.90,
    isFree: false,
    progress: 65,
    category: "Análise Técnica"
  }, {
    id: "6",
    title: "Gestão de Portfólio",
    author: "Carlos Mendes",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    coverImage: ebookPortfolio,
    description: "Estratégias para otimização de carteiras de investimento",
    rating: 4.8,
    reviews: 523,
    price: 0,
    isFree: true,
    progress: 42,
    category: "Investimentos"
  }, {
    id: "7",
    title: "Mercado de Capitais 2025",
    author: "Patricia Lima",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    coverImage: ebookMercadoCapitais,
    description: "Tendências e perspectivas do mercado de capitais",
    rating: 4.9,
    reviews: 845,
    price: 104.93,
    originalPrice: 149.90,
    discount: 30,
    isFree: false,
    progress: 28,
    category: "Mercado de Capitais"
  }];
  const wishlist: Ebook[] = [{
    id: "8",
    title: "Derivatives & Hedging Strategies",
    author: "Roberto Alves",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
    coverImage: ebookDerivatives,
    description: "Guia avançado sobre derivativos e estratégias de hedge",
    rating: 4.7,
    reviews: 412,
    price: 125.93,
    originalPrice: 179.90,
    discount: 30,
    isFree: false,
    category: "Derivativos"
  }, {
    id: "9",
    title: "ESG: Investimentos Sustentáveis",
    author: "Juliana Santos",
    authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
    coverImage: ebookESG,
    description: "Como integrar critérios ESG em decisões de investimento",
    rating: 4.8,
    reviews: 634,
    price: 99.90,
    isFree: false,
    category: "ESG"
  }];
  const EbookCard = ({
    ebook,
    showProgress = false
  }: {
    ebook: Ebook;
    showProgress?: boolean;
  }) => {
    const isFavorited = favorites.has(ebook.id);
    return <div className="group relative bg-card border-2 border-border rounded-xl p-4 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/40 overflow-hidden">
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-background/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative">
          {/* Badge and favorite */}
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-pastel-blue text-foreground border-0 px-3 py-1 font-semibold">
              {ebook.category}
            </Badge>
            <div className="flex items-center gap-2">
              {ebook.discount && <Badge className="bg-pastel-pink text-foreground font-bold px-2 py-1">
                  -{ebook.discount}%
                </Badge>}
              <button onClick={() => toggleFavorite(ebook.id)} className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all duration-300">
                <Heart size={16} className={isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
              </button>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative mb-4 rounded-lg overflow-hidden group/image">
            <img src={ebook.coverImage} alt={ebook.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            
            {/* Hover overlay with quick action */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
              <Button size="sm" className="bg-pastel-purple hover:bg-pastel-pink text-foreground font-semibold shadow-lg" onClick={() => {
                onOpenChange(false);
                navigate(`/ler-ebook/${ebook.id}`);
              }}>
                <Play size={14} className="mr-2" />
                Ler Agora
              </Button>
            </div>

            {/* Progress indicator for continue reading */}
            {showProgress && ebook.progress !== undefined && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted/50">
                <div className="h-full bg-pastel-green transition-all duration-300" style={{
              width: `${ebook.progress}%`
            }} />
              </div>}
          </div>

          {/* Author info */}
          <div className="flex items-center gap-2 mb-3">
            <img src={ebook.authorAvatar} alt={ebook.author} className="w-7 h-7 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300" />
            <span className="text-xs text-muted-foreground font-medium">{ebook.author}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-foreground line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-primary transition-all duration-300">
            {ebook.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {ebook.description}
          </p>

          {/* Progress info for continue reading */}
          {showProgress && ebook.progress !== undefined && <div className="flex items-center gap-2 mb-3 text-xs">
              <Clock size={14} className="text-pastel-blue" />
              <span className="text-muted-foreground">
                {ebook.progress}% completo
              </span>
            </div>}

          {/* Rating and price */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Star size={14} className="fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">{ebook.rating}</span>
              <span className="text-xs text-muted-foreground">({ebook.reviews})</span>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              {ebook.isFree ? <Badge className="bg-pastel-green text-foreground font-bold px-3 py-1">
                  GRÁTIS
                </Badge> : <>
                  {ebook.discount && ebook.originalPrice && <span className="text-xs text-muted-foreground line-through">
                      R$ {ebook.originalPrice.toFixed(2).replace('.', ',')}
                    </span>}
                  <span className="text-lg font-bold text-muted-foreground">
                    R$ {ebook.price.toFixed(2).replace('.', ',')}
                  </span>
                </>}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1 bg-pastel-blue hover:bg-pastel-purple text-foreground font-semibold" onClick={() => {
              onOpenChange(false);
              navigate(`/ler-ebook/${ebook.id}`);
            }}>
              Ler Agora
            </Button>
            <Button size="sm" variant="outline" className="border-2 hover:bg-muted">
              <Share2 size={14} />
            </Button>
          </div>
        </div>
      </div>;
  };
  return <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[90vw] sm:w-[540px] max-w-[540px] p-0 bg-background backdrop-blur-xl border-l-2 border-pastel-blue/20 overflow-y-auto">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-muted/10 pointer-events-none" />
        
        <div className="relative">
          <SheetHeader className="p-6 pb-4 border-b border-border/50 bg-background">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-pastel-yellow border-2 border-pastel-yellow">
                <BookOpen size={28} className="text-slate-700" />
              </div>
              <div>
                <SheetTitle className="font-black text-3xl text-foreground mb-1">
                  <span className="text-4xl text-muted-foreground">Biblioteca</span>{" "}
                  <span className="text-muted-foreground text-2xl">de eBooks</span>
                </SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Explore nossa coleção de conteúdos educacionais premium
                </p>
              </div>
            </div>
          </SheetHeader>

          <div className="p-6 space-y-14">
            {/* New Releases Section */}
            <div className="space-y-4 group/section">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pastel-pink">
                    <Sparkles size={20} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover/section:text-pastel-pink transition-all duration-300">
                    Lançamentos
                  </h3>
                  <Badge className="bg-pastel-pink text-foreground animate-pulse">
                    Novo
                  </Badge>
                </div>
              </div>
              
              <Carousel className="w-full" opts={{
              align: "start"
            }}>
                <CarouselContent className="-ml-4">
                  {newReleases.map(ebook => <CarouselItem key={ebook.id} className="pl-4 basis-full">
                      <EbookCard ebook={ebook} />
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="left-[-20px] top-[140px]" />
                <CarouselNext className="right-[-20px] top-[140px]" />
              </Carousel>
            </div>

            {/* Continue Reading Section */}
            <div className="space-y-4 group/section">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pastel-blue">
                    <Clock size={20} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover/section:text-pastel-blue transition-all duration-300">
                    Continuar de onde parou
                  </h3>
                  <Badge className="bg-pastel-blue text-foreground">
                    {continueReading.length} em andamento
                  </Badge>
                </div>
              </div>
              
              <Carousel className="w-full" opts={{
              align: "start"
            }}>
                <CarouselContent className="-ml-4">
                  {continueReading.map(ebook => <CarouselItem key={ebook.id} className="pl-4 basis-full">
                      <EbookCard ebook={ebook} showProgress={true} />
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="left-[-20px] top-[140px]" />
                <CarouselNext className="right-[-20px] top-[140px]" />
              </Carousel>
            </div>

            {/* Wishlist Section */}
            <div className="space-y-4 group/section">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pastel-purple">
                    <Bookmark size={20} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-black text-foreground group-hover/section:text-pastel-purple transition-all duration-300">
                    Wishlist
                  </h3>
                  <Badge className="bg-pastel-purple text-foreground">
                    {wishlist.length} itens
                  </Badge>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-muted-foreground hover:text-foreground hover:bg-pastel-purple/10">
                  Ver todos
                </Button>
              </div>
              
              <Carousel className="w-full" opts={{
              align: "start"
            }}>
                <CarouselContent className="-ml-4">
                  {wishlist.map(ebook => <CarouselItem key={ebook.id} className="pl-4 basis-full">
                      <EbookCard ebook={ebook} />
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="left-[-20px] top-[140px]" />
                <CarouselNext className="right-[-20px] top-[140px]" />
              </Carousel>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>;
};
