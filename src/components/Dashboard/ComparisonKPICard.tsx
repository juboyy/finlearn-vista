import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { calculatePercentageChange, getPeriodLabel } from "./PeriodComparisonToggle";

interface ComparisonKPICardProps {
  label: string;
  icon: LucideIcon;
  currentValue: number | string;
  comparisonValue?: number | string;
  currentPeriod: '7d' | '30d' | '90d' | '1y';
  comparisonPeriod?: '7d' | '30d' | '90d' | '1y';
  comparisonMode: boolean;
  suffix?: string;
  description?: string;
}

export const ComparisonKPICard = ({
  label,
  icon: Icon,
  currentValue,
  comparisonValue,
  currentPeriod,
  comparisonPeriod,
  comparisonMode,
  suffix = '',
  description,
}: ComparisonKPICardProps) => {
  const currentNum = typeof currentValue === 'string' ? parseFloat(currentValue) : currentValue;
  const comparisonNum = comparisonValue
    ? typeof comparisonValue === 'string'
      ? parseFloat(comparisonValue)
      : comparisonValue
    : 0;

  const percentChange = comparisonMode && comparisonValue
    ? calculatePercentageChange(currentNum, comparisonNum)
    : 0;

  const isPositive = percentChange > 0;
  const isNegative = percentChange < 0;
  const isNeutral = percentChange === 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <Icon size={20} className="text-slate-400" />
      </div>

      {!comparisonMode ? (
        <>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {currentValue}{suffix}
          </h3>
          {description && (
            <p className="text-xs text-slate-500 font-bold mt-1">{description}</p>
          )}
        </>
      ) : (
        <div className="space-y-3 mt-2">
          {/* Current Period */}
          <div className="bg-[hsl(142,35%,95%)] rounded-lg p-3">
            <p className="text-xs text-slate-600 font-medium mb-1">
              {getPeriodLabel(currentPeriod)}
            </p>
            <p className="text-xl font-bold text-slate-800">
              {currentValue}{suffix}
            </p>
          </div>

          {/* Comparison Period */}
          <div className="bg-[hsl(280,35%,95%)] rounded-lg p-3">
            <p className="text-xs text-slate-600 font-medium mb-1">
              {comparisonPeriod && getPeriodLabel(comparisonPeriod)}
            </p>
            <p className="text-xl font-bold text-slate-800">
              {comparisonValue}{suffix}
            </p>
          </div>

          {/* Percentage Change */}
          <div
            className={`flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-sm ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700'
                : isNegative
                ? 'bg-red-50 text-red-700'
                : 'bg-slate-50 text-slate-600'
            }`}
          >
            {isPositive && <TrendingUp size={16} />}
            {isNegative && <TrendingDown size={16} />}
            {isNeutral && <Minus size={16} />}
            <span>
              {isPositive && '+'}
              {percentChange}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
