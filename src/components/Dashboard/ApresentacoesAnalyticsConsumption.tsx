import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";
import { ConsumptionAnalyticsCards } from "./ConsumptionAnalyticsCards";

export const ApresentacoesAnalyticsConsumption = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  const apresentacoesByTopic: Record<string, Array<{
    title: string;
    author: string;
    slides: string;
    date: string;
  }>> = {
    'Estratégia': [{
      title: 'Estratégia Digital 2025',
      author: 'Fintech Inovação',
      slides: '32 slides',
      date: 'Ontem'
    }],
    'Resultados': [{
      title: 'Resultados Q2 2024 - Banco XYZ',
      author: 'Banco XYZ',
      slides: '45 slides',
      date: 'Hoje'
    }],
    'Produtos': [{
      title: 'Lançamento: Novo Produto de Crédito',
      author: 'Crédito Fácil',
      slides: '28 slides',
      date: '2 dias atrás'
    }],
    'Mercado': [{
      title: 'Análise de Mercado: Fintechs Brasil',
      author: 'Market Research',
      slides: '52 slides',
      date: '4 dias atrás'
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
      hole: 0.4,
      marker: { colors: ['#F4C8D8', '#C5E8D4', '#D8BFD8', '#B8D4E8'] },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>%{value} apresentações (%{percent})<br><i>Clique para ver detalhes</i><extra></extra>',
      hoverlabel: { bgcolor: '#334155', font: { color: 'white', size: 14 } }
    }];

    Plotly.newPlot('apresentacoes-topics-chart', topicsData, {
      margin: { l: 20, r: 20, t: 0, b: 60 },
      showlegend: true,
      legend: { orientation: 'h', y: -0.1, font: { size: 11 } },
      paper_bgcolor: '#ffffff',
      hovermode: 'closest',
      transition: {
        duration: 800,
        easing: 'cubic-in-out'
      }
    }, { displayModeBar: false }).then(() => {
      const topicsChart = document.getElementById('apresentacoes-topics-chart');
      if (topicsChart) {
        topicsChart.style.cursor = 'pointer';
        (topicsChart as any).on('plotly_click', (data: any) => {
          const label = data.points[0].label;
          setSelectedTopic(label);
          setShowDrillDown(true);
        });
      }
    });

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

      {/* Main KPIs - 5 cards inline */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">5.3</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Apresentações por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Downloads</span>
            <i className="fas fa-download text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">28</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Salvos localmente
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Conclusão</span>
            <i className="fas fa-check-circle text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">72%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Slides vistos
          </p>
        </div>
      </div>

      {/* Meta + Top Creators Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Meta de Apresentações do Mês</span>
            <i className="fas fa-target text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-800">75 de 80 apresentações</p>
                <p className="text-[10px] font-bold text-slate-600">94%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(340,35%,65%)] rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Faltam 5 apresentações</p>
            <div className="flex items-center gap-1.5 pt-1">
              <i className="fas fa-fire text-orange-500 text-xs"></i>
              <p className="text-[10px] font-bold text-slate-700">Sequência de 9 dias!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Creators Mais Vistos</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(340,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">BX</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Banco XYZ</p>
                <p className="text-[10px] text-slate-500">12 apresentações</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(142,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">FI</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Fintech Inovação</p>
                <p className="text-[10px] text-slate-500">10 apresentações</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Additional Cards Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Slides Vistos</span>
            <i className="fas fa-images text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">2,140</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Total de slides</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Favoritos</span>
            <i className="fas fa-star text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">18</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Salvos</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Compartilhamentos</span>
            <i className="fas fa-share text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">14</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Com a equipe</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Médio</span>
            <i className="fas fa-hourglass-half text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">38min</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Por apresentação</p>
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
              Apresentações sobre estratégia dominam suas visualizações. Recomendamos explorar apresentações de resultados trimestrais para complementar sua visão estratégica com dados concretos de desempenho.
            </p>
          </div>
        </div>
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

      {/* Drill Down Modal */}
      {showDrillDown && selectedTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Apresentações: {selectedTopic}</h3>
              <button 
                onClick={() => setShowDrillDown(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              {apresentacoesByTopic[selectedTopic]?.map((apresentacao, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">{apresentacao.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">Autor: {apresentacao.author}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><i className="fas fa-display mr-1"></i>{apresentacao.slides}</span>
                    <span><i className="fas fa-calendar mr-1"></i>{apresentacao.date}</span>
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