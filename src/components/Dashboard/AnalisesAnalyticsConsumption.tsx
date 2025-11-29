import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const AnalisesAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const analisesByCategory: Record<string, Array<{
    title: string;
    analyst: string;
    completionRate: number;
    duration: string;
    date: string;
  }>> = {
    'Técnica': [{
      title: 'Análise Técnica: PETR4 - Suporte em R$ 38,50',
      analyst: 'Trading Pro',
      completionRate: 95,
      duration: '8min',
      date: 'Hoje'
    }],
    'Fundamentalista': [{
      title: 'Vale3: Perspectivas para 2025',
      analyst: 'Fundamentus',
      completionRate: 100,
      duration: '12min',
      date: 'Ontem'
    }],
    'Macroeconômica': [{
      title: 'Cenário Macro: SELIC e Impactos no Mercado',
      analyst: 'Macro Insights',
      completionRate: 88,
      duration: '15min',
      date: '2 dias atrás'
    }],
    'Setorial': [{
      title: 'Setor Bancário: Análise Comparativa',
      analyst: 'Financial Research',
      completionRate: 85,
      duration: '10min',
      date: '3 dias atrás'
    }]
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, [selectedPeriod, comparisonMode, comparisonPeriod]);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;
    const getData = generateMockDataByPeriod('weekly');

    // Análises Semanais
    const currentData = getData(selectedPeriod);
    const comparisonData = comparisonMode ? getData(comparisonPeriod) : null;
    
    const weeklyTraces = createComparisonBarChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'bar'
    });

    Plotly.newPlot('analises-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Análises Lidas' }
    }), { displayModeBar: false });

    // Análises por Tipo
    const typesData = [{
      values: [38, 28, 20, 14],
      labels: ['Técnica', 'Fundamentalista', 'Macroeconômica', 'Setorial'],
      type: 'pie',
      marker: { colors: ['#C5E8D4', '#B8D4E8', '#F4C8D8', '#D8BFD8'] },
      textinfo: 'label+percent',
      hovertemplate: '<b>%{label}</b><br>%{value} análises (%{percent})<br><i>Clique para ver detalhes</i><extra></extra>',
      hoverlabel: { bgcolor: '#334155', font: { color: 'white', size: 14 } }
    }];

    Plotly.newPlot('analises-types-chart', typesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff',
      hovermode: 'closest',
      hoverlabel: { bgcolor: '#334155', font: { color: 'white' } }
    }, { displayModeBar: false }).then(() => {
      const typesChart = document.getElementById('analises-types-chart');
      if (typesChart) {
        typesChart.style.cursor = 'pointer';
        (typesChart as any).on('plotly_click', (data: any) => {
          const label = data.points[0].label;
          setSelectedCategory(label);
          setShowDrillDown(true);
        });
      }
    });

    // Tempo de Análise
    const getTimeData = generateMockDataByPeriod('completion');
    const currentTimeData = getTimeData(selectedPeriod);
    const comparisonTimeData = comparisonMode ? getTimeData(comparisonPeriod) : null;
    
    const timeTraces = createComparisonBarChart({
      currentData: currentTimeData,
      comparisonData: comparisonTimeData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'bar'
    });

    Plotly.newPlot('analises-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Leitura', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Análises' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Análises Lidas'
    });

    Plotly.newPlot('analises-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Análises Lidas' }
    }), { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Análises</h2>
        <p className="text-slate-600">Seu histórico de análises técnicas e fundamentalistas</p>
      </div>

      {/* Filtros de Período */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setSelectedPeriod('7d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '7d'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          7 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('30d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '30d'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          30 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('90d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '90d'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          90 dias
        </button>
        <button
          onClick={() => setSelectedPeriod('1y')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedPeriod === '1y'
              ? 'bg-[hsl(142,35%,50%)] text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          1 ano
        </button>
      </div>

      {/* Main KPIs - 5 cards inline */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Total Lidas</span>
            <i className="fas fa-chart-line text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">93</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +18 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">52h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +25% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">6.5</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Análises por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Ativos Analisados</span>
            <i className="fas fa-coins text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">47</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Diferentes ativos
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Retenção</span>
            <i className="fas fa-check-circle text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">78%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Leitores recorrentes
          </p>
        </div>
      </div>

      {/* Meta + Top Creators Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Meta de Análises do Mês</span>
            <i className="fas fa-target text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-800">93 de 100 análises</p>
                <p className="text-[10px] font-bold text-slate-600">93%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Faltam 7 análises</p>
            <div className="flex items-center gap-1.5 pt-1">
              <i className="fas fa-fire text-orange-500 text-xs"></i>
              <p className="text-[10px] font-bold text-slate-700">Sequência de 12 dias!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Analistas Mais Lidos</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(142,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">TP</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Trading Pro</p>
                <p className="text-[10px] text-slate-500">28 análises</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(206,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">FU</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Fundamentus</p>
                <p className="text-[10px] text-slate-500">22 análises</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Additional Cards Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Destaques Feitos</span>
            <i className="fas fa-highlighter text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">142</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Em análises</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Notas Adicionadas</span>
            <i className="fas fa-sticky-note text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">87</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Anotações pessoais</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Downloads</span>
            <i className="fas fa-download text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">34</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Salvos localmente</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Compartilhamentos</span>
            <i className="fas fa-share text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">18</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Com sua rede</p>
        </div>
      </div>

      {/* AI Insights with Agent Avatar */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
        <div className="flex items-start gap-3">
          <img 
            src="/src/assets/auxiliar-do-dia-avatar.png" 
            alt="AI Agent" 
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Insights Personalizados por IA</h3>
            <p className="text-slate-700 leading-relaxed">
              Sua análise de consumo mostra alto engajamento com análises técnicas. Continue focando em análises de qualidade e diversifique entre análises fundamentalistas e macroeconômicas para uma visão mais completa do mercado.
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Análises Semanais</h3>
          <div id="analises-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Tipo</h3>
          <div id="analises-types-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Análise</h3>
          <div id="analises-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="analises-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Análises Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Análises Lidas Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Análise Técnica: PETR4 - Suporte em R$ 38,50', author: 'Trading Pro', type: 'Técnica', date: 'Hoje' },
            { title: 'Vale3: Perspectivas para 2025', author: 'Fundamentus', type: 'Fundamentalista', date: 'Ontem' },
            { title: 'Cenário Macro: SELIC e Impactos no Mercado', author: 'Macro Insights', type: 'Macroeconômica', date: '2 dias atrás' },
            { title: 'Setor Bancário: Análise Comparativa', author: 'Financial Research', type: 'Setorial', date: '3 dias atrás' },
            { title: 'Bitcoin: Análise de Ondas de Elliott', author: 'Crypto Analysis', type: 'Técnica', date: '4 dias atrás' }
          ].map((analise, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{analise.title}</p>
                  <p className="text-xs text-slate-500">{analise.author} • {analise.type} • {analise.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drill Down Modal */}
      {showDrillDown && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Análises: {selectedCategory}</h3>
              <button 
                onClick={() => setShowDrillDown(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              {analisesByCategory[selectedCategory]?.map((analise, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">{analise.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">Analista: {analise.analyst}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><i className="fas fa-clock mr-1"></i>{analise.duration}</span>
                    <span><i className="fas fa-calendar mr-1"></i>{analise.date}</span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-check-circle mr-1"></i>
                      {analise.completionRate}% concluído
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
