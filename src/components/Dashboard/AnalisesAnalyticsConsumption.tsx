import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const AnalisesAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  
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
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('analises-types-chart', typesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

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

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">6.5</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Análises por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Ativos Analisados</span>
            <i className="fas fa-coins text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">47</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Diferentes ativos
          </p>
        </div>

        <ConsumptionAnalyticsCards
          creatorsTitle="Analistas Mais Lidos"
          creators={[
            { initials: 'TP', name: 'Trading Pro', count: '28 análises', bgColor: 'bg-pastel-green' },
            { initials: 'FU', name: 'Fundamentus', count: '22 análises', bgColor: 'bg-pastel-blue' },
            { initials: 'MI', name: 'Macro Insights', count: '18 análises', bgColor: 'bg-pastel-pink' }
          ]}
          goalTitle="Meta de Análises do Mês"
          goalCurrent={93}
          goalTotal={100}
          goalUnit="análises"
          streak={12}
        />
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
    </div>
  );
};
