import { useEffect, useState } from "react";
import { PeriodComparisonToggle, getPeriodLabel } from "./PeriodComparisonToggle";
import { createComparisonLineChart, createComparisonBarChart, createComparisonLayout, generateMockDataByPeriod } from "./chartComparisonUtils";

export const WebinarsAnalyticsConsumption = () => {
  const [insights, setInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');

  const webinarsByTopic: Record<string, Array<{
    title: string;
    host: string;
    completionRate: number;
    duration: string;
    date: string;
  }>> = {
    'Mercado': [{
      title: 'Análise Semanal do Mercado',
      host: 'Dr. Carlos Mendes',
      completionRate: 95,
      duration: '2h',
      date: 'Hoje'
    }],
    'Tecnologia': [{
      title: 'IA no Trading Algorítmico',
      host: 'Prof. Ana Santos',
      completionRate: 100,
      duration: '1.5h',
      date: '3 dias atrás'
    }],
    'Regulação': [{
      title: 'Compliance em Fintechs',
      host: 'Dra. Maria Costa',
      completionRate: 88,
      duration: '2h',
      date: '5 dias atrás'
    }],
    'ESG': [{
      title: 'Investimentos Sustentáveis',
      host: 'Profa. Marina Costa',
      completionRate: 85,
      duration: '2h',
      date: '5 dias atrás'
    }]
  };

  const getDataByPeriod = () => {
    const data = {
      '7d': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [2, 3, 2, 4, 3, 1, 0] },
        totalWatched: 15, avgCompletion: 78, totalHours: 28, questions: 12, certificates: 8, participation: 76,
        avgPerWeek: 2.1, favorites: 5, shares: 3
      },
      '30d': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [2, 3, 2, 4, 3, 1, 0] },
        totalWatched: 67, avgCompletion: 78, totalHours: 124, questions: 42, certificates: 28, participation: 78,
        avgPerWeek: 15.5, favorites: 18, shares: 12
      },
      '90d': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [3, 4, 3, 5, 4, 2, 1] },
        totalWatched: 198, avgCompletion: 82, totalHours: 368, questions: 132, certificates: 85, participation: 81,
        avgPerWeek: 16.5, favorites: 52, shares: 38
      },
      '1y': {
        weekly: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [4, 5, 4, 6, 5, 3, 2] },
        totalWatched: 842, avgCompletion: 85, totalHours: 1542, questions: 598, certificates: 365, participation: 84,
        avgPerWeek: 16.2, favorites: 218, shares: 165
      }
    };
    return data[selectedPeriod];
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
    generateInsights();
  }, [selectedPeriod, comparisonMode, comparisonPeriod]);

  const generateInsights = () => {
    setLoadingInsights(true);
    setTimeout(() => {
      const periodData = getDataByPeriod();
      const insight = `Baseado no seu histórico de ${selectedPeriod === '7d' ? '7 dias' : selectedPeriod === '30d' ? '30 dias' : selectedPeriod === '90d' ? '90 dias' : '1 ano'}, você assistiu ${periodData.totalWatched} webinars, totalizando ${periodData.totalHours}h. Sua taxa média de conclusão é de ${periodData.avgCompletion}%, demonstrando alto engajamento. Você fez ${periodData.questions} perguntas durante webinars ao vivo e obteve ${periodData.certificates} certificados. Recomendamos focar em webinars sobre Tecnologia e ESG para expandir seu conhecimento.`;
      setInsights(insight);
      setLoadingInsights(false);
    }, 800);
  };

  const initializeCharts = () => {
    const periodData = getDataByPeriod();
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

    Plotly.newPlot('webinars-participation-chart', weeklyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Webinars Assistidos' }
    }), { displayModeBar: false });

    // Webinars por Categoria
    const categoriesData = [{
      values: [38, 25, 22, 15],
      labels: ['Mercado', 'Tecnologia', 'Regulação', 'ESG'],
      type: 'pie',
      hole: 0.4,
      marker: { colors: ['#F4C8D8', '#C5E8D4', '#D8BFD8', '#B8D4E8'] },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>%{value} webinars (%{percent})<br><i>Clique para ver detalhes</i><extra></extra>',
      hoverlabel: { bgcolor: '#334155', font: { color: 'white', size: 14 } }
    }];

    Plotly.newPlot('webinars-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 0, b: 60 },
      showlegend: true,
      legend: { orientation: 'h', y: -0.1, font: { size: 11 } },
      paper_bgcolor: '#ffffff',
      hovermode: 'closest'
    }, { displayModeBar: false }).then(() => {
      const categoriesChart = document.getElementById('webinars-categories-chart');
      if (categoriesChart) {
        categoriesChart.style.cursor = 'pointer';
        (categoriesChart as any).on('plotly_click', (data: any) => {
          const label = data.points[0].label;
          setSelectedTopic(label);
          setShowDrillDown(true);
        });
      }
    });

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

    Plotly.newPlot('webinars-time-chart', timeTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo Assistido', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Webinars' }
    }), { displayModeBar: false });

    // Engajamento Mensal
    const monthlyTraces = createComparisonLineChart({
      currentData,
      comparisonData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'line',
      title: 'Webinars Participados'
    });

    Plotly.newPlot('webinars-monthly-chart', monthlyTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Webinars Participados' }
    }), { displayModeBar: false });

    // Taxa de Conclusão
    const getCompletionData = generateMockDataByPeriod('completion');
    const currentCompletionData = getCompletionData(selectedPeriod);
    const comparisonCompletionData = comparisonMode ? getCompletionData(comparisonPeriod) : null;
    
    const completionTraces = createComparisonBarChart({
      currentData: currentCompletionData,
      comparisonData: comparisonCompletionData,
      currentPeriod: selectedPeriod,
      comparisonPeriod,
      comparisonMode,
      chartType: 'bar'
    });

    Plotly.newPlot('webinars-completion-chart', completionTraces, createComparisonLayout(comparisonMode, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Taxa de Conclusão', tickangle: 0 },
      yaxis: { gridcolor: '#f1f5f9', title: 'Quantidade' }
    }), { displayModeBar: false });

    // Interação por Horário
    const hourlyData = [{
      x: ['Manhã', 'Tarde', 'Noite', 'Madrugada'],
      y: [18, 32, 42, 8],
      type: 'bar',
      marker: { color: '#D8BFD8' }
    }];

    Plotly.newPlot('webinars-hourly-chart', hourlyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Período do Dia' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Webinars' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Webinars</h2>
        <p className="text-slate-600">Seu histórico de participação e engajamento em webinars</p>
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
            <span className="text-sm text-slate-500 font-medium">Total Assistidos</span>
            <i className="fas fa-video text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().totalWatched}</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +24% este período
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Horas Totais</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().totalHours}h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +18% este período
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Participação</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().participation}%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Tempo médio assistido
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Certificados</span>
            <i className="fas fa-certificate text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().certificates}</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            Obtidos
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Conclusão</span>
            <i className="fas fa-check-circle text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().avgCompletion}%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Média de conclusão
          </p>
        </div>
      </div>

      {/* Meta + Top Hosts Row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Meta de Webinars do Mês</span>
            <i className="fas fa-target text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-800">15 de 20 webinars</p>
                <p className="text-[10px] font-bold text-slate-600">75%</p>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[hsl(280,35%,65%)] rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Faltam 5 webinars</p>
            <div className="flex items-center gap-1.5 pt-1">
              <i className="fas fa-fire text-orange-500 text-xs"></i>
              <p className="text-[10px] font-bold text-slate-700">Sequência de 12 dias!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-500 font-medium">Hosts Mais Assistidos</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(206,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">FT</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Fintech Brasil</p>
                <p className="text-[10px] text-slate-500">24 webinars</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[hsl(142,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">PE</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Payments Evolution</p>
                <p className="text-[10px] text-slate-500">18 webinars</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Additional Cards Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Perguntas Feitas</span>
            <i className="fas fa-comment text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">{getDataByPeriod().questions}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Em webinars ao vivo</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">{getDataByPeriod().avgPerWeek}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Webinars por semana</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Favoritos</span>
            <i className="fas fa-star text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">{getDataByPeriod().favorites}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Salvos para revisitar</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Compartilhamentos</span>
            <i className="fas fa-share text-slate-400"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">{getDataByPeriod().shares}</p>
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
            {loadingInsights ? (
              <div className="flex items-center gap-2 text-slate-600">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Analisando seus dados...</span>
              </div>
            ) : (
              <p className="text-slate-700 leading-relaxed">{insights}</p>
            )}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Participação Semanal</h3>
          <div id="webinars-participation-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="webinars-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Participação</h3>
          <div id="webinars-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="webinars-monthly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Taxa de Conclusão</h3>
          <div id="webinars-completion-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Interação por Horário</h3>
          <div id="webinars-hourly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Webinars Assistidos Recentemente */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Webinars Assistidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Análise Semanal do Mercado Financeiro', host: 'Dr. Carlos Mendes', duration: '2h', date: 'Hoje', completion: 95 },
            { title: 'IA no Trading Algorítmico', host: 'Prof. Ana Santos', duration: '1.5h', date: 'Ontem', completion: 100 },
            { title: 'Compliance em Fintechs', host: 'Dra. Maria Costa', duration: '2h', date: '3 dias atrás', completion: 88 },
            { title: 'Investimentos Sustentáveis e ESG', host: 'Prof. Roberto Lima', duration: '1h 45min', date: '5 dias atrás', completion: 82 },
            { title: 'Blockchain e Tokenização de Ativos', host: 'Eng. Paula Santos', duration: '2h 15min', date: '1 semana atrás', completion: 90 }
          ].map((webinar, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-video text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{webinar.title}</p>
                  <p className="text-xs text-slate-500">{webinar.host} • {webinar.duration} • {webinar.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-600">{webinar.completion}%</p>
                  <p className="text-[10px] text-slate-400">concluído</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Drill-Down */}
      {showDrillDown && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Webinars: {selectedTopic}</h3>
              <button onClick={() => setShowDrillDown(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              {webinarsByTopic[selectedTopic]?.map((webinar, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">{webinar.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">Host: {webinar.host}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span><i className="fas fa-clock mr-1"></i>{webinar.duration}</span>
                    <span><i className="fas fa-calendar mr-1"></i>{webinar.date}</span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-check-circle mr-1"></i>
                      {webinar.completionRate}% concluído
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
