import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";

export const LiveAnalyticsConsumption = () => {
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

    // Participação Semanal
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

    Plotly.newPlot('live-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Lives Assistidas' }
    }), { displayModeBar: false });

    // Lives por Tema
    const topicsData = [{
      values: [35, 30, 20, 15],
      labels: ['Mercado', 'Educação', 'Produtos', 'Q&A'],
      type: 'pie',
      marker: { colors: ['#C5E8D4', '#F4C8D8', '#D8BFD8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('live-topics-chart', topicsData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Participação
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

    Plotly.newPlot('live-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo Assistido', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Lives' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Lives Participadas'
    });

    Plotly.newPlot('live-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Lives Participadas' }
    }), { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Lives</h2>
        <p className="text-slate-600">Seu histórico de participação em transmissões ao vivo</p>
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
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Total Assistidas</span>
            <i className="fas fa-circle-dot text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">41</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +9 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Horas Totais</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">68h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +28% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Participação</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">82%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Tempo médio assistido
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Perguntas Feitas</span>
            <i className="fas fa-comment text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">27</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Em transmissões ao vivo
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Participação Semanal</h3>
          <div id="live-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Tema</h3>
          <div id="live-topics-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Participação</h3>
          <div id="live-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="live-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Lives Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Lives Assistidas Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Análise do Mercado em Tempo Real', host: 'Dr. Carlos Mendes', duration: '2h', participation: 95, date: 'Hoje' },
            { title: 'Bitcoin: O que esperar para 2025?', host: 'Ana Paula Costa', duration: '1.5h', participation: 88, date: 'Ontem' },
            { title: 'Lançamento: Novo Produto Open Finance', host: 'Fintech XYZ', duration: '1h', participation: 100, date: '3 dias atrás' },
            { title: 'Q&A: Tire suas dúvidas sobre investimentos', host: 'Prof. Roberto Lima', duration: '2h', participation: 75, date: '5 dias atrás' },
            { title: 'Tendências ESG no Mercado Financeiro', host: 'Marina Costa', duration: '1.5h', participation: 90, date: '1 semana atrás' }
          ].map((live, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-circle-dot text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{live.title}</p>
                  <p className="text-xs text-slate-500">{live.host} • {live.duration} • {live.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{live.participation}%</p>
                  <p className="text-xs text-slate-500">assistido</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
