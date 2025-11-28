import { useEffect } from "react";

export const WebinarsAnalyticsConsumption = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, []);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;

    // Participação Semanal
    const participationData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [2, 3, 2, 4, 3, 1, 0],
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
    }, { displayModeBar: false });

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
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [8, 12, 15, 14, 18, 21],
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
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Webinars</h2>
        <p className="text-slate-600">Seu histórico de participação e engajamento em webinars</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Total Assistidos</span>
            <i className="fas fa-video text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">67</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +24% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Horas Totais</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">124h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +18% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Taxa de Participação</span>
            <i className="fas fa-users text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">78%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Tempo médio assistido
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Perguntas Feitas</span>
            <i className="fas fa-comment text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">42</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Em webinars ao vivo
          </p>
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
      </div>

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