import { useEffect, useState } from "react";

export const PodcastsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, [selectedPeriod]);

  const getDataByPeriod = () => {
    const data = {
      '7d': {
        episodes: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [4, 5, 6, 4, 3, 2, 1] },
        total: 142, growth: 18, hours: 86.5, completion: 68, streak: 14
      },
      '30d': {
        episodes: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [4, 5, 6, 4, 3, 2, 1] },
        total: 142, growth: 18, hours: 86.5, completion: 68, streak: 14
      },
      '90d': {
        episodes: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [5, 6, 7, 5, 4, 3, 2] },
        total: 428, growth: 52, hours: 245.8, completion: 71, streak: 42
      },
      '1y': {
        episodes: { x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], y: [6, 7, 8, 6, 5, 4, 3] },
        total: 1824, growth: 215, hours: 1024.5, completion: 73, streak: 89
      }
    };
    return data[selectedPeriod];
  };

  const initializeCharts = () => {
    const periodData = getDataByPeriod();
    const Plotly = (window as any).Plotly;

    // Episódios Ouvidos por Semana
    const episodesData = [{
      x: periodData.episodes.x,
      y: periodData.episodes.y,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Episódios',
      line: { color: '#D8BFD8', width: 3 },
      marker: { size: 8, color: '#D8BFD8' }
    }];

    Plotly.newPlot('podcast-episodes-chart', episodesData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Episódios' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Escuta por Categoria
    const categoriesData = [{
      values: [35, 28, 22, 15],
      labels: ['Mercado', 'Investimentos', 'Regulação', 'Tecnologia'],
      type: 'pie',
      marker: { colors: ['#D8BFD8', '#C5E8D4', '#E8C5D8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('podcast-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Taxa de Conclusão de Episódios
    const completionData = [{
      x: ['0-25%', '26-50%', '51-75%', '76-100%'],
      y: [12, 25, 38, 67],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#D8BFD8'] }
    }];

    Plotly.newPlot('podcast-completion-chart', completionData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Taxa de Conclusão' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Episódios' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Escuta Diário
    const dailyListeningData = [{
      x: ['00h', '04h', '08h', '12h', '16h', '20h'],
      y: [5, 8, 15, 32, 28, 12],
      type: 'scatter',
      fill: 'tozeroy',
      fillcolor: 'rgba(216, 191, 216, 0.3)',
      line: { color: '#D8BFD8', width: 2 }
    }];

    Plotly.newPlot('podcast-hourly-chart', dailyListeningData, {
      margin: { l: 40, r: 20, t: 20, b: 30 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: '% de Escuta' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Podcasts</h2>
        <p className="text-slate-600">Análise do seu histórico de escuta e engajamento</p>
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
            <span className="text-sm text-slate-500 font-medium">Total de Episódios</span>
            <i className="fas fa-headphones text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().total}</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +{getDataByPeriod().growth}% no período
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Horas Totais</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().hours}h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +12% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Conclusão</span>
            <i className="fas fa-check-circle text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().completion}%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Média da plataforma: 55%
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Streak Atual</span>
            <i className="fas fa-fire text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">{getDataByPeriod().streak} dias</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Ouvindo diariamente
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Episódios por Dia da Semana</h3>
          <div id="podcast-episodes-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="podcast-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Taxa de Conclusão</h3>
          <div id="podcast-completion-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Horário de Escuta</h3>
          <div id="podcast-hourly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Top Podcasts */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Podcasts Mais Ouvidos</h3>
        <div className="space-y-3">
          {[
            { name: 'Mercados em Foco', episodes: 28, hours: '14.2h', completion: 82 },
            { name: 'Investidor Inteligente', episodes: 24, hours: '12.8h', completion: 75 },
            { name: 'FinTech Brasil', episodes: 22, hours: '11.5h', completion: 71 },
            { name: 'Regulação e Compliance', episodes: 18, hours: '9.2h', completion: 88 },
            { name: 'Open Finance', episodes: 16, hours: '8.4h', completion: 65 }
          ].map((podcast, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-microphone text-slate-700"></i>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{podcast.name}</p>
                  <p className="text-xs text-slate-500">{podcast.episodes} episódios • {podcast.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{podcast.completion}%</p>
                  <p className="text-xs text-slate-500">conclusão</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};