import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  onClick?: () => void;
}

export const QuickActionCard = ({ icon: Icon, title, description, bgColor, onClick }: QuickActionCardProps) => {
  return (
    <button 
      onClick={onClick}
      className={cn("w-full flex items-center gap-4 p-4 rounded-lg hover:opacity-80 transition-opacity text-left", bgColor)}
    >
      <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center">
        <Icon className="text-foreground" size={20} />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-xs text-foreground/70">{description}</p>
      </div>
    </button>
  );
};
