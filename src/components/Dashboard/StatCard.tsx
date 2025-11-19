import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: string;
  trendType?: "positive" | "neutral";
  bgColor: string;
}

export const StatCard = ({ icon: Icon, value, label, trend, trendType = "positive", bgColor }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", bgColor)}>
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
  );
};
