import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: string;
  trendType?: "positive" | "neutral";
  bgColor: string;
  agentImage?: string;
  agentName?: string;
  explanation?: string;
  insight?: string;
  note?: string;
}

export const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  trend, 
  trendType = "positive", 
  bgColor,
  agentImage,
  agentName,
  explanation,
  insight,
  note
}: StatCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center transition-transform hover:scale-110 duration-300", bgColor)}>
              <Icon className="text-foreground" size={24} />
            </div>
            {trend && (
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded",
                trendType === "positive" ? "text-green-600 bg-green-50" : "text-foreground/60 bg-muted"
              )}>
                {trend}
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-[500px] p-0 z-50 bg-card" side="top" align="center">
        <div className="p-4">
          {agentImage && agentName && (
            <div className="flex items-center gap-3 pb-2 border-b border-border mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={agentImage} alt={agentName} />
                <AvatarFallback>{agentName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">{agentName}</p>
                <p className="text-xs text-muted-foreground">Assistente IA</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-3">
            {explanation && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-1">O que significa</h4>
                <p className="text-xs text-muted-foreground leading-snug">{explanation}</p>
              </div>
            )}
            
            {insight && (
              <div className="bg-pastel-blue/20 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1">Insight</h4>
                <p className="text-xs text-muted-foreground leading-snug">{insight}</p>
              </div>
            )}
            
            {note && (
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-1">Nota</h4>
                <p className="text-xs text-muted-foreground leading-snug">{note}</p>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
