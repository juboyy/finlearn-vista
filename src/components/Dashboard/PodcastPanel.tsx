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
  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors">
    <img
      src={podcast.image}
      alt={podcast.title}
      className="w-16 h-16 rounded-md object-cover"
    />
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-sm text-foreground truncate">
        {podcast.title}
      </h4>
      <p className="text-xs text-muted-foreground truncate">{podcast.topic}</p>
    </div>
    <div className="flex flex-col gap-2 shrink-0">
      <Button size="icon" variant="ghost" className="h-12 w-12 hover:bg-primary/10">
        <Play className="h-5 w-5" />
      </Button>
      <div className="w-12 flex flex-col items-center gap-1">
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[60%]"></div>
        </div>
        <span className="text-[10px] text-muted-foreground">24:30</span>
      </div>
    </div>
  </div>
);

export function PodcastPanel({ open, onOpenChange }: PodcastPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Podcasts</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Rolando agora */}
          <div className="px-12">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Rolando agora
            </h3>
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
          <div className="px-12">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Continuar de onde parou
            </h3>
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
          <div className="px-12">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Recomendadas para você
            </h3>
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
