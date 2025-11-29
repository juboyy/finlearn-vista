import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const ApresentacoesAnalyticsConsumption = () => {
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

    // Visualizações Semanais
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

    Plotly.newPlot('apresentacoes-weekly-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Apresentações Vistas' }
    }), { displayModeBar: false });

    // Apresentações por Tema
    const topicsData = [{
      values: [35, 28, 22, 15],
      labels: ['Estratégia', 'Resultados', 'Produtos', 'Mercado'],
      type: 'pie',
      marker: { colors: ['#F4C8D8', '#C5E8D4', '#D8BFD8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('apresentacoes-topics-chart', topicsData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Visualização
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

    Plotly.newPlot('apresentacoes-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Visualização', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Apresentações' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Apresentações Vistas'
    });

    Plotly.newPlot('apresentacoes-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Apresentações Vistas' }
    }), { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Apresentações</h2>
        <p className="text-slate-600">Seu histórico de visualização de apresentações e slides</p>
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
            <span className="text-sm text-slate-500 font-medium">Total Vistas</span>
            <i className="fas fa-display text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">75</p>
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
          <p className="text-3xl font-bold text-slate-800">48h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +22% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">5.3</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Apresentações por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Downloads</span>
            <i className="fas fa-download text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">28</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Salvos localmente
          </p>
        </div>

        <ConsumptionAnalyticsCards
          creatorsTitle="Creators Mais Vistos"
          creators={[
            { initials: 'BX', name: 'Banco XYZ', count: '12 apresentações', bgColor: 'bg-pastel-pink' },
            { initials: 'FI', name: 'Fintech Inovação', count: '10 apresentações', bgColor: 'bg-pastel-green' },
            { initials: 'MR', name: 'Market Research', count: '8 apresentações', bgColor: 'bg-pastel-blue' }
          ]}
          goalTitle="Meta de Apresentações do Mês"
          goalCurrent={75}
          goalTotal={80}
          goalUnit="apresentações"
          streak={9}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Visualizações Semanais</h3>
          <div id="apresentacoes-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Tema</h3>
          <div id="apresentacoes-topics-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Visualização</h3>
          <div id="apresentacoes-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="apresentacoes-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Apresentações Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Apresentações Vistas Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Resultados Q2 2024 - Banco XYZ', author: 'Banco XYZ', slides: '45 slides', date: 'Hoje' },
            { title: 'Estratégia Digital 2025', author: 'Fintech Inovação', slides: '32 slides', date: 'Ontem' },
            { title: 'Lançamento: Novo Produto de Crédito', author: 'Crédito Fácil', slides: '28 slides', date: '2 dias atrás' },
            { title: 'Análise de Mercado: Fintechs Brasil', author: 'Market Research', slides: '52 slides', date: '4 dias atrás' },
            { title: 'Open Finance: Case de Sucesso', author: 'Tech Finance', slides: '38 slides', date: '5 dias atrás' }
          ].map((apresentacao, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <i className="fas fa-display text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{apresentacao.title}</p>
                  <p className="text-xs text-slate-500">{apresentacao.author} • {apresentacao.slides} • {apresentacao.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
