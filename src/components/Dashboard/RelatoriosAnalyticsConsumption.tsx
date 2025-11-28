import { useEffect } from "react";

export const RelatoriosAnalyticsConsumption = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, []);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;

    // Relatórios Semanais
    const weeklyData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [2, 4, 3, 5, 4, 1, 0],
      type: 'bar',
      marker: { color: '#F4C8D8' }
    }];

    Plotly.newPlot('relatorios-weekly-chart', weeklyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Relatórios Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Relatórios por Categoria
    const categoriesData = [{
      values: [35, 28, 22, 15],
      labels: ['Trimestral', 'Anual', 'Mensal', 'Especial'],
      type: 'pie',
      marker: { colors: ['#F4C8D8', '#C5E8D4', '#D8BFD8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('relatorios-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Leitura
    const timeData = [{
      x: ['0-30 min', '30-60 min', '1-2h', '2h+'],
      y: [8, 15, 22, 12],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#F4C8D8'] }
    }];

    Plotly.newPlot('relatorios-time-chart', timeData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Tempo de Leitura' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Relatórios' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Engajamento Mensal
    const monthlyData = [{
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [12, 15, 14, 18, 16, 22],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#F4C8D8', width: 3 },
      marker: { size: 8, color: '#F4C8D8' }
    }];

    Plotly.newPlot('relatorios-monthly-chart', monthlyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Relatórios Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: Relatórios</h2>
        <p className="text-slate-600">Seu histórico de leitura de relatórios e estudos</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Total Lidos</span>
            <i className="fas fa-file-alt text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">57</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +12 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Tempo Total</span>
            <i className="fas fa-clock text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">94h</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +18% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Mensal</span>
            <i className="fas fa-chart-bar text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">9.5</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Relatórios por mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Downloads</span>
            <i className="fas fa-download text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">38</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Salvos localmente
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Relatórios Semanais</h3>
          <div id="relatorios-weekly-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="relatorios-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Leitura</h3>
          <div id="relatorios-time-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Engajamento Mensal</h3>
          <div id="relatorios-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* Relatórios Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Relatórios Lidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Relatório Trimestral - Q2 2024 do Mercado', author: 'Financial Insights', type: 'Trimestral', date: 'Hoje' },
            { title: 'Análise Anual: Setor Bancário 2024', author: 'Banking Research', type: 'Anual', date: 'Ontem' },
            { title: 'Relatório Mensal de Crédito - Junho', author: 'Credit Analytics', type: 'Mensal', date: '3 dias atrás' },
            { title: 'Estudo Especial: Open Finance no Brasil', author: 'Bacen Research', type: 'Especial', date: '5 dias atrás' },
            { title: 'Relatório de Riscos - H1 2024', author: 'Risk Management', type: 'Trimestral', date: '1 semana atrás' }
          ].map((relatorio, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <i className="fas fa-file-alt text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{relatorio.title}</p>
                  <p className="text-xs text-slate-500">{relatorio.author} • {relatorio.type} • {relatorio.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
