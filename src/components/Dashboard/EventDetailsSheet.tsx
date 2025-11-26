import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, DollarSign, Video } from "lucide-react";
import { Link } from "react-router-dom";

interface Presenter {
  id: string;
  name: string;
  role: string;
  image: string;
  profileUrl: string;
}

interface EventDetails {
  id: string;
  type: "webinar" | "live" | "workshop";
  title: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  isPaid: boolean;
  price?: number;
  presenters: Presenter[];
  confirmedAttendees: number;
  capacity?: number;
}

interface EventDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventDetails | null;
}

export const EventDetailsSheet = ({ open, onOpenChange, event }: EventDetailsSheetProps) => {
  if (!event) return null;

  const eventTypeLabels = {
    webinar: "Webinar",
    live: "Live",
    workshop: "Workshop"
  };

  const eventTypeBgColors = {
    webinar: "bg-pastel-yellow",
    live: "bg-pastel-pink",
    workshop: "bg-pastel-peach"
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="space-y-2">
            <Badge className={`${eventTypeBgColors[event.type]} text-foreground hover:${eventTypeBgColors[event.type]}`}>
              {eventTypeLabels[event.type]}
            </Badge>
            <SheetTitle className="text-2xl font-semibold text-foreground pr-8">
              {event.title}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Event Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock size={16} />
              <span>{event.time} ({event.duration})</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Users size={16} />
              <span>{event.confirmedAttendees} participantes confirmados</span>
              {event.capacity && <span className="text-xs">/ {event.capacity} vagas</span>}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            {event.isPaid ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-pastel-green" />
                  <span className="text-sm text-muted-foreground">Investimento</span>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  R$ {event.price?.toFixed(2)}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Badge className="bg-pastel-green text-foreground hover:bg-pastel-green">
                  Evento Gratuito
                </Badge>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Sobre o Evento</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Presenters */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Apresentadores</h3>
            <div className="space-y-3">
              {event.presenters.map((presenter) => (
                <Link
                  key={presenter.id}
                  to={presenter.profileUrl}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={presenter.image} alt={presenter.name} />
                    <AvatarFallback>{presenter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-pastel-purple transition-colors">
                      {presenter.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{presenter.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-border">
            {event.isPaid && (
              <Button
                className="w-full bg-pastel-green hover:bg-pastel-green/80 text-foreground"
                size="lg"
              >
                <DollarSign size={18} className="mr-2" />
                Comprar Ingresso
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full border-pastel-purple text-foreground hover:bg-pastel-purple/20"
              size="lg"
            >
              <Calendar size={18} className="mr-2" />
              Reservar na Agenda
            </Button>
            {!event.isPaid && (
              <Button
                className="w-full bg-pastel-blue hover:bg-pastel-blue/80 text-foreground"
                size="lg"
              >
                <Video size={18} className="mr-2" />
                Confirmar Presença
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-pastel-blue/20 border border-pastel-blue/30 rounded-lg p-4 text-sm text-foreground">
            <p className="font-medium mb-1">Garanta sua participação!</p>
            <p className="text-xs text-muted-foreground">
              {event.isPaid 
                ? "Após a compra, você receberá o link de acesso por e-mail."
                : "Ao confirmar presença, você receberá o link de acesso por e-mail."}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
