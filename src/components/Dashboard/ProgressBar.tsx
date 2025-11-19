import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  progress: number;
  barColor: string;
}

export const ProgressBar = ({ label, progress, barColor }: ProgressBarProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm font-medium text-muted-foreground">{progress}%</p>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full", barColor)} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
