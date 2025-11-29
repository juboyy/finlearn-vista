import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  icon: LucideIcon;
  title: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  bgColor: string;
}

export const CourseCard = ({ 
  icon: Icon, 
  title, 
  progress, 
  completedLessons, 
  totalLessons, 
  bgColor 
}: CourseCardProps) => {
  return (
    <div className={cn("flex items-center gap-4 p-4 rounded-lg border hover:border-opacity-50 transition-all duration-300 hover:shadow-md", `border-${bgColor}`)}>
      <div className={cn("w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 duration-300", bgColor)}>
        <Icon className="text-foreground" size={28} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {completedLessons} de {totalLessons} aulas concluídas
        </p>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden relative">
          <div 
            className={cn("h-2 rounded-full transition-all duration-1000 ease-out", bgColor)} 
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </div>
      <Button className={cn("font-medium transition-all hover:bg-pastel-gray-dark hover:text-gray-100", bgColor)} variant="secondary">
        Continuar
      </Button>
    </div>
  );
};
