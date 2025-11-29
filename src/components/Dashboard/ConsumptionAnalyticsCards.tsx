import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      const Plotly = (window as any).Plotly;
      
      // Dados de evolução mensal (últimos 6 meses)
      const months = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const goalProgress = [72, 85, 78, 90, 88, percentage];
      
      const trace = {
        x: months,
        y: goalProgress,
        type: 'scatter',
        mode: 'lines+markers',
        line: { 
          color: 'hsl(142, 35%, 65%)', 
          width: 3,
          shape: 'spline'
        },
        marker: { 
          color: 'hsl(142, 35%, 65%)', 
          size: 8,
          line: {
            color: 'white',
            width: 2
          }
        },
        fill: 'tozeroy',
        fillcolor: 'rgba(133, 187, 153, 0.1)',
        hovertemplate: '<b>%{x}</b><br>Progresso: %{y}%<extra></extra>'
      };

      Plotly.newPlot('goal-evolution-chart', [trace], {
        margin: { l: 30, r: 10, t: 10, b: 30 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          gridcolor: '#f1f5f9',
          showgrid: false,
          fixedrange: true
        },
        yaxis: {
          gridcolor: '#f1f5f9',
          range: [0, 100],
          fixedrange: true,
          ticksuffix: '%'
        },
        showlegend: false,
        hovermode: 'x unified'
      }, { 
        displayModeBar: false,
        responsive: true
      });
    }
  }, [percentage]);


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
        <div className="space-y-3">
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
          <div className="flex items-center gap-1.5">
            <i className="fas fa-fire text-orange-500 text-xs"></i>
            <p className="text-[10px] font-bold text-slate-700">Sequência de {streak} dias!</p>
          </div>
          
          {/* Gráfico de Evolução */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[10px] font-semibold text-slate-600 mb-2">Evolução nos Últimos 6 Meses</p>
            <div id="goal-evolution-chart" className="h-32"></div>
          </div>
        </div>
      </div>
    </>
  );
};
