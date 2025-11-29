import { useEffect, useState } from "react";

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
  }, [selectedPeriod]);

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

    // Participação Semanal
    const participationData = [{
      x: periodData.weekly.x,
      y: periodData.weekly.y,
      type: 'bar',
      marker: { color: '#F4C8D8' }
    }];

    Plotly.newPlot('webinars-participation-chart', participationData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Webinars Assistidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Webinars por Categoria
    const categoriesData = [{
      values: [38, 25, 22, 15],
      labels: ['Mercado', 'Tecnologia', 'Regulação', 'ESG'],
      type: 'pie',
      marker: { colors: ['#F4C8D8', '#C5E8D4', '#D8BFD8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('webinars-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false }).then(() => {
      const categoriesChart = document.getElementById('webinars-categories-chart');
      if (categoriesChart) {
        (categoriesChart as any).on('plotly_click', (data: any) => {
          const label = data.points[0].label;
          setSelectedTopic(label);
          setShowDrillDown(true);
        });
      }
    });

    // Tempo de Participação
    const timeData = [{
      x: ['0-25%', '26-50%', '51-75%', '76-100%'],
      y: [5, 12, 18, 32],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#F4C8D8'] }
    }];

    Plotly.newPlot('webinars-time-chart', timeData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo Assistido' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Webinars' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Engajamento Mensal
    const monthlyData = [{
      x: selectedPeriod === '7d' ? ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 'Dia 6', 'Dia 7'] :
         selectedPeriod === '30d' ? ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'] :
         selectedPeriod === '90d' ? ['Mês 1', 'Mês 2', 'Mês 3'] :
         ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      y: selectedPeriod === '7d' ? [2, 3, 2, 4, 3, 1, 0] :
         selectedPeriod === '30d' ? [12, 15, 14, 18] :
         selectedPeriod === '90d' ? [42, 52, 56] :
         [52, 58, 62, 68, 72, 75, 78, 82, 85, 88, 92, 96],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#F4C8D8', width: 3 },
      marker: { size: 8, color: '#F4C8D8' }
    }];

    Plotly.newPlot('webinars-monthly-chart', monthlyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Webinars Participados' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Taxa de Conclusão
    const completionData = [{
      x: ['0-25%', '26-50%', '51-75%', '76-100%'],
      y: [8, 15, 22, 55],
      type: 'bar',
      marker: { color: '#C5E8D4' }
    }];

    Plotly.newPlot('webinars-completion-chart', completionData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Taxa de Conclusão' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Quantidade' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

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

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fas fa-lightbulb text-blue-600"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Insights Personalizados</h3>
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

      {/* KPIs - 9 cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Participação</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().participation}%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Tempo médio assistido
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Perguntas Feitas</span>
            <i className="fas fa-comment text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().questions}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Em webinars ao vivo
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
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

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Conclusão</span>
            <i className="fas fa-check-circle text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().avgCompletion}%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Média de conclusão
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Semanal</span>
            <i className="fas fa-calendar-week text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().avgPerWeek}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Webinars por semana
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Favoritos</span>
            <i className="fas fa-star text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().favorites}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Salvos para revisitar
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Compartilhamentos</span>
            <i className="fas fa-share text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().shares}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Com sua rede
          </p>
        </div>
      </div>

      {/* Charts Grid - 6 charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Participação Semanal</h3>
          <div id="webinars-participation-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 cursor-pointer hover:shadow-lg transition" onClick={() => {}}>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Distribuição por Categoria</h3>
          <p className="text-xs text-slate-500 mb-4">Clique em uma categoria para ver detalhes</p>
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
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Participação por Horário</h3>
          <div id="webinars-hourly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Drill-Down Modal */}
      {showDrillDown && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowDrillDown(false)}>
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Webinars: {selectedTopic}</h3>
              <button onClick={() => setShowDrillDown(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-3">
              {webinarsByTopic[selectedTopic]?.map((webinar, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                  <p className="font-medium text-slate-800 mb-1">{webinar.title}</p>
                  <p className="text-sm text-slate-600 mb-2">{webinar.host} • {webinar.duration}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${webinar.completionRate}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{webinar.completionRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Webinars Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Webinars Assistidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Análise Semanal do Mercado', host: 'Dr. Carlos Mendes', duration: '2h', completion: 95, date: 'Hoje' },
            { title: 'Bitcoin e Altcoins: Tendências 2025', host: 'Ana Paula Costa', duration: '1.5h', completion: 88, date: 'Ontem' },
            { title: 'Cenário Macroeconômico 2025', host: 'Dr. Roberto Lima', duration: '2h', completion: 72, date: '2 dias atrás' },
            { title: 'IA no Trading Algorítmico', host: 'Prof. Ana Santos', duration: '1.5h', completion: 100, date: '3 dias atrás' },
            { title: 'Investimentos Sustentáveis', host: 'Profa. Marina Costa', duration: '2h', completion: 85, date: '5 dias atrás' }
          ].map((webinar, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <i className="fas fa-video text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{webinar.title}</p>
                  <p className="text-xs text-slate-500">{webinar.host} • {webinar.duration} • {webinar.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{webinar.completion}%</p>
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