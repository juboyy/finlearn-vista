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
    <Button size="icon" variant="ghost" className="shrink-0 hover:bg-primary/10">
      <Play className="h-4 w-4" />
    </Button>
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
          <div>
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
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>

          {/* Continuar de onde parou */}
          <div>
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
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>

          {/* Recomendadas para você */}
          <div>
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
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
