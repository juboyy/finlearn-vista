import { ArrowLeftRight } from "lucide-react";

interface PeriodComparisonToggleProps {
  comparisonMode: boolean;
  setComparisonMode: (value: boolean) => void;
  selectedPeriod: '7d' | '30d' | '90d' | '1y';
  setSelectedPeriod: (value: '7d' | '30d' | '90d' | '1y') => void;
  comparisonPeriod: '7d' | '30d' | '90d' | '1y';
  setComparisonPeriod: (value: '7d' | '30d' | '90d' | '1y') => void;
}

export const PeriodComparisonToggle = ({
  comparisonMode,
  setComparisonMode,
  selectedPeriod,
  setSelectedPeriod,
  comparisonPeriod,
  setComparisonPeriod,
}: PeriodComparisonToggleProps) => {
  const periodButtons = [
    { value: '7d' as const, label: '7 dias' },
    { value: '30d' as const, label: '30 dias' },
    { value: '90d' as const, label: '90 dias' },
    { value: '1y' as const, label: '1 ano' },
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Comparison Mode Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setComparisonMode(!comparisonMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            comparisonMode
              ? 'bg-[hsl(280,35%,60%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ArrowLeftRight size={16} />
          {comparisonMode ? 'Modo Comparação Ativo' : 'Comparar Períodos'}
        </button>
        {comparisonMode && (
          <span className="text-sm text-slate-500">
            Selecione dois períodos para comparar métricas lado a lado
          </span>
        )}
      </div>

      {/* Period Selectors */}
      <div className={`flex gap-6 ${comparisonMode ? 'flex-col' : ''}`}>
        {/* Primary Period */}
        <div className={comparisonMode ? 'space-y-2' : ''}>
          {comparisonMode && (
            <label className="text-sm font-medium text-slate-700">Período Principal</label>
          )}
          <div className="flex gap-3">
            {periodButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setSelectedPeriod(btn.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedPeriod === btn.value
                    ? 'bg-[hsl(142,35%,50%)] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Period */}
        {comparisonMode && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Período de Comparação</label>
            <div className="flex gap-3">
              {periodButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setComparisonPeriod(btn.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    comparisonPeriod === btn.value
                      ? 'bg-[hsl(280,35%,60%)] text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate percentage change
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

// Helper function to format period label
export const getPeriodLabel = (period: '7d' | '30d' | '90d' | '1y'): string => {
  const labels = {
    '7d': 'Últimos 7 dias',
    '30d': 'Últimos 30 dias',
    '90d': 'Últimos 90 dias',
    '1y': 'Último ano',
  };
  return labels[period];
};
