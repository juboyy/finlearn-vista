import { useEffect } from "react";

export const EbooksAnalyticsConsumption = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, []);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;

    // Progresso Semanal
    const progressData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [45, 62, 38, 71, 55, 28, 15],
      type: 'bar',
      marker: { color: '#D8BFD8' }
    }];

    Plotly.newPlot('ebooks-progress-chart', progressData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Páginas Lidas' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // E-books por Categoria
    const categoriesData = [{
      values: [35, 28, 22, 15],
      labels: ['Mercado Financeiro', 'Tecnologia', 'Compliance', 'Gestão'],
      type: 'pie',
      marker: { colors: ['#D8BFD8', '#C5E8D4', '#F4C8D8', '#B8D4E8'] },
      textinfo: 'label+percent'
    }];

    Plotly.newPlot('ebooks-categories-chart', categoriesData, {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Taxa de Conclusão
    const completionData = [{
      x: ['0-25%', '26-50%', '51-75%', '76-100%'],
      y: [6, 10, 14, 28],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#D8BFD8'] }
    }];

    Plotly.newPlot('ebooks-completion-chart', completionData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Progresso de Leitura' },
      yaxis: { gridcolor: '#f1f5f9', title: 'E-books' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });

    // Tempo de Leitura Mensal
    const monthlyData = [{
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [42, 38, 51, 48, 56, 63],
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#D8BFD8', width: 3 },
      marker: { size: 8, color: '#D8BFD8' }
    }];

    Plotly.newPlot('ebooks-monthly-chart', monthlyData, {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Horas de Leitura' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    }, { displayModeBar: false });
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics de Consumo: E-books</h2>
        <p className="text-slate-600">Seu histórico de leitura e progresso em e-books</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">E-books Lidos</span>
            <i className="fas fa-book text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">28</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +5 este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Páginas Lidas</span>
            <i className="fas fa-file-alt text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">8.420</p>
          <p className="text-xs text-emerald-600 font-medium mt-2">
            <i className="fas fa-arrow-up mr-1"></i>
            +12% este mês
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Média Diária</span>
            <i className="fas fa-chart-line text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">32 pág</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Por dia de leitura
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 font-medium">Destaques/Notas</span>
            <i className="fas fa-highlighter text-slate-400"></i>
          </div>
          <p className="text-3xl font-bold text-slate-800">156</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Total de anotações
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Progresso Semanal</h3>
          <div id="ebooks-progress-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Distribuição por Categoria</h3>
          <div id="ebooks-categories-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Taxa de Conclusão</h3>
          <div id="ebooks-completion-chart" className="h-64"></div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo de Leitura Mensal</h3>
          <div id="ebooks-monthly-chart" className="h-64"></div>
        </div>
      </div>

      {/* E-books Recentes */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">E-books Lidos Recentemente</h3>
        <div className="space-y-3">
          {[
            { title: 'Open Finance: Guia Completo', author: 'Dr. Carlos Mendes', progress: 88, pages: '245/280' },
            { title: 'Blockchain e Criptomoedas', author: 'Ana Paula Costa', progress: 65, pages: '192/295' },
            { title: 'Gestão de Riscos Financeiros', author: 'Roberto Lima', progress: 100, pages: '320/320' },
            { title: 'ESG no Mercado Financeiro', author: 'Marina Costa', progress: 42, pages: '128/305' },
            { title: 'Compliance Bancário na Prática', author: 'Prof. João Silva', progress: 75, pages: '180/240' }
          ].map((ebook, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-book text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{ebook.title}</p>
                  <p className="text-xs text-slate-500">{ebook.author} • {ebook.pages} páginas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{ebook.progress}%</p>
                  <p className="text-xs text-slate-500">concluído</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
