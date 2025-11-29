import '@fortawesome/fontawesome-free/css/all.min.css';

interface Creator {
  initials: string;
  name: string;
  count: string;
  bgColor: string;
}

interface ConsumptionAnalyticsCardsProps {
  creatorsTitle: string;
  creators: Creator[];
  goalTitle: string;
  goalCurrent: number;
  goalTotal: number;
  goalUnit: string;
  streak: number;
}

export const ConsumptionAnalyticsCards = ({
  creatorsTitle,
  creators,
  goalTitle,
  goalCurrent,
  goalTotal,
  goalUnit,
  streak
}: ConsumptionAnalyticsCardsProps) => {
  const percentage = Math.round((goalCurrent / goalTotal) * 100);
  const remaining = goalTotal - goalCurrent;

  return (
    <>
      {/* Creators Mais Acessados */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-500">{creatorsTitle}</p>
          <i className="fas fa-users text-slate-400"></i>
        </div>
        <div className="space-y-2">
          {creators.map((creator, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full ${creator.bgColor} flex items-center justify-center text-xs font-bold text-slate-700`}>
                {creator.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{creator.name}</p>
                <p className="text-[10px] text-slate-500">{creator.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progresso de Meta do Mês */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-500">{goalTitle}</p>
          <i className="fas fa-target text-slate-400"></i>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold text-slate-800">{goalCurrent} de {goalTotal} {goalUnit}</p>
              <p className="text-[10px] font-bold text-slate-600">{percentage}%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">Faltam {remaining} {goalUnit}</p>
          <div className="flex items-center gap-1.5 pt-1">
            <i className="fas fa-fire text-orange-500 text-xs"></i>
            <p className="text-[10px] font-bold text-slate-700">Sequência de {streak} dias!</p>
          </div>
        </div>
      </div>
    </>
  );
};
