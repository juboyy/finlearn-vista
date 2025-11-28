import { useEffect } from "react";

export const ArtigosAnalyticsConsumption = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, []);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;

    // Leitura Semanal
    const weeklyData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [8, 12, 9, 15, 11, 4, 2],
      type: 'bar',
      marker: { color: '#B8D4E8' }
    }];

    Plotly.newPlot('artigos-weekly-chart', weeklyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Artigos por Tema
    const topicsData = [{
      values: [32, 25, 20, 13, 10],
      labels: ['Regulação', 'Inovação', 'Mercado', 'Tecnologia', 'ESG'],
      type: 'pie',
      marker: { colors: ['#B8D4E8', '#C5E8D4', '#F4C8D8', '#D8BFD8', '#F4E4A6'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('artigos-topics-chart', topicsData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Leitura
    const timeData = [{
      x: ['0-5 min', '5-10 min', '10-20 min', '20+ min'],
      y: [25, 42, 28, 15],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#B8D4E8'] }
    }];

    Plotly.newPlot('artigos-time-chart', timeData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Leitura' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Engajamento Mensal
    const monthlyData = [{
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [45, 52, 48, 61, 58, 67],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#B8D4E8', width: 3 },
      marker: { size: 8, color: '#B8D4E8' }
    }];

    Plotly.newPlot('artigos-monthly-chart', monthlyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Artigos</h2>
        <p className="text-slate-600">Seu histórico de leitura e temas de interesse</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Total Lidos</span>
            <i className="fas fa-newspaper text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">284</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +32 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">86h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +15% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Diária</span>
            <i className="fas fa-chart-bar text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">4.2</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Artigos por dia
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Salvos</span>
            <i className="fas fa-bookmark text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">47</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Para ler depois
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Leitura Semanal</h3>
          <div id="artigos-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Tema</h3>
          <div id="artigos-topics-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Leitura</h3>
          <div id="artigos-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="artigos-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Artigos Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Artigos Lidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Nova Resolução do Bacen sobre Open Finance', author: 'Banco Central', time: '8 min', date: 'Hoje' },
            { title: 'IA Generativa no Setor Financeiro', author: 'Tech Finance', time: '12 min', date: 'Ontem' },
            { title: 'Cenário Regulatório para Fintechs 2025', author: 'Regulação Brasil', time: '15 min', date: '2 dias atrás' },
            { title: 'ESG e Investimentos Sustentáveis', author: 'Mercado Sustentável', time: '10 min', date: '3 dias atrás' },
            { title: 'Blockchain em Pagamentos Instantâneos', author: 'Crypto Finance', time: '18 min', date: '4 dias atrás' }
          ].map((artigo, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-newspaper text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{artigo.title}</p>
                  <p className="text-xs text-slate-500">{artigo.author} • {artigo.time} • {artigo.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
