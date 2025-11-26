import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  day: string;
  month: string;
  title: string;
  time: string;
  bgColor: string;
  onClick?: () => void;
}

export const EventCard = ({ day, month, title, time, bgColor, onClick }: EventCardProps) => {
  return (
    <div 
      className={cn("p-4 rounded-lg cursor-pointer hover:opacity-80 transition-opacity", bgColor)}
      onClick={onClick}
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-10 h-10 bg-card rounded-lg flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-xs text-muted-foreground font-medium">{month}</span>
          <span className="text-sm text-foreground font-bold">{day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground text-sm mb-1">{title}</h3>
          <p className="text-xs text-foreground/70 flex items-center gap-1">
            <Clock size={12} />
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};
