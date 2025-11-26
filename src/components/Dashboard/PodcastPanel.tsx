import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const PodcastCard = ({ podcast }: { podcast: Podcast }) => (
  <div className="group relative flex flex-col gap-3 p-4 rounded-xl border-2 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:border-pastel-purple/50 transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-20 h-20 rounded-lg object-cover shadow-md ring-2 ring-pastel-purple/20 group-hover:ring-pastel-pink/40 transition-all"
        />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-pastel-purple/90 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm">
          <Play className="h-3 w-3 text-white fill-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-base text-foreground mb-1 line-clamp-2 group-hover:text-pastel-purple transition-colors">
          {podcast.title}
        </h4>
        <p className="text-sm text-muted-foreground">{podcast.topic}</p>
      </div>
    </div>
    
    {/* Progress bar - full width */}
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Em reprodução</span>
        <span className="font-medium">24:30</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pastel-purple to-pastel-pink w-[60%] rounded-full transition-all duration-500"></div>
      </div>
    </div>
  </div>
);

export function PodcastPanel({ open, onOpenChange }: PodcastPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto bg-gradient-to-b from-background to-muted/20">
        <SheetHeader className="pb-6 border-b border-border/50">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
            Podcasts
          </SheetTitle>
          <p className="text-sm text-muted-foreground mt-1">Seu conteúdo de áudio favorito</p>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Rolando agora */}
          <div className="px-12 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-pastel-pink rounded-full animate-pulse"></div>
              <h3 className="text-base font-bold text-foreground">
                Rolando agora
              </h3>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {nowPlayingPodcasts.map((podcast) => (
                  <CarouselItem key={podcast.id}>
                    <PodcastCard podcast={podcast} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Continuar de onde parou */}
          <div className="px-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-pastel-blue rounded-full"></div>
              <h3 className="text-base font-bold text-foreground">
                Continuar de onde parou
              </h3>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {continuePodcasts.map((podcast) => (
                  <CarouselItem key={podcast.id}>
                    <PodcastCard podcast={podcast} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Recomendadas para você */}
          <div className="px-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-pastel-green rounded-full"></div>
              <h3 className="text-base font-bold text-foreground">
                Recomendadas para você
              </h3>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {recommendedPodcasts.map((podcast) => (
                  <CarouselItem key={podcast.id}>
                    <PodcastCard podcast={podcast} />
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
