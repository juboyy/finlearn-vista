import { useEffect } from "react";

export const NewspaperAnalytics = () => {
  useEffect(() => {
    // Initialize Plotly charts after component mounts
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
  }, []);

  const initializeCharts = () => {
    const Plotly = (window as any).Plotly;
    
    // Reading Performance Chart
    const readingPerformanceData = [{
      x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      y: [32, 28, 35, 30, 27, 18, 14],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Artigos Lidos',
      line: { color: '#B8D4E8', width: 3 },
      marker: { size: 8, color: '#B8D4E8' }
    }];
    
    const readingPerformanceLayout = {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    };
    
    Plotly.newPlot('reading-performance-chart', readingPerformanceData, readingPerformanceLayout, {displayModeBar: false});

    // Content Types Chart (Pie Chart)
    const contentTypesData = [{
      values: [42, 28, 18, 12],
      labels: ['Notícias', 'Análises', 'Relatórios', 'Estudos'],
      type: 'pie',
      marker: {
        colors: ['#B8D4E8', '#C5E8D4', '#E8C5D8', '#E8E0C5']
      },
      textinfo: 'label+percent',
      textposition: 'inside'
    }];
    
    const contentTypesLayout = {
      margin: { l: 20, r: 20, t: 20, b: 20 },
      showlegend: false,
      paper_bgcolor: '#ffffff'
    };
    
    Plotly.newPlot('content-types-chart', contentTypesData, contentTypesLayout, {displayModeBar: false});

    // Completion Rate Chart
    const completionRateData = [{
      x: ['0-25%', '26-50%', '51-75%', '76-100%'],
      y: [45, 89, 156, 498],
      type: 'bar',
      marker: { color: ['#E8C5D8', '#E8E0C5', '#C5E8D4', '#B8D4E8'] }
    }];
    
    const completionRateLayout = {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9', title: 'Taxa de Conclusão' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    };
    
    Plotly.newPlot('completion-rate-chart', completionRateData, completionRateLayout, {displayModeBar: false});

    // Hourly Distribution Chart
    const hourlyData = [{
      x: ['00h', '04h', '08h', '12h', '16h', '20h'],
      y: [2, 4, 42, 28, 18, 6],
      type: 'scatter',
      fill: 'tozeroy',
      fillcolor: 'rgba(184, 212, 232, 0.3)',
      line: { color: '#B8D4E8', width: 2 }
    }];
    
    const hourlyLayout = {
      margin: { l: 40, r: 20, t: 20, b: 30 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff'
    };
    
    Plotly.newPlot('hourly-distribution-chart', hourlyData, hourlyLayout, {displayModeBar: false});

    // Monthly Comparison Chart
    const monthlyData = [
      {
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        y: [842, 967, 1124, 1089, 1247, 1156, 1098, 1203, 1167, 1289, 1247, 1324],
        type: 'bar',
        name: '2024',
        marker: { color: '#B8D4E8' }
      },
      {
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        y: [756, 834, 912, 876, 1023, 945, 889, 967, 934, 1045, 998, 1087],
        type: 'bar',
        name: '2023',
        marker: { color: '#E8E0C5' }
      }
    ];
    
    const monthlyLayout = {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      xaxis: { gridcolor: '#f1f5f9' },
      yaxis: { gridcolor: '#f1f5f9', title: 'Artigos Lidos' },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      barmode: 'group'
    };
    
    Plotly.newPlot('monthly-comparison-chart', monthlyData, monthlyLayout, {displayModeBar: false});
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
        {/* KPIs Overview */}
        <section className="grid grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                <i className="fas fa-newspaper text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+8</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">47</h3>
            <p className="text-sm text-slate-500">Artigos Hoje</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">32</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-week text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+42</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">284</h3>
            <p className="text-sm text-slate-500">Artigos Semana</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">198</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-alt text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">+156</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">1,247</h3>
            <p className="text-sm text-slate-500">Artigos Mês</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">892</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                <i className="fas fa-clock text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+1.2h</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">8.4h</h3>
            <p className="text-sm text-slate-500">Tempo Semana</p>
            <p className="text-xs text-slate-600 mt-2">Média: <span className="font-semibold">1.2h/dia</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                <i className="fas fa-hourglass-half text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+4.8h</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">32.6h</h3>
            <p className="text-sm text-slate-500">Tempo Mês</p>
            <p className="text-xs text-slate-600 mt-2">Média: <span className="font-semibold">1.1h/dia</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center">
                <i className="fas fa-check-circle text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+6%</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">71%</h3>
            <p className="text-sm text-slate-500">Taxa Conclusão</p>
            <p className="text-xs text-slate-600 mt-2">Média mensal</p>
          </div>
        </section>

        {/* Reading Performance and Top Sources */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Desempenho de Leitura</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">Semanal</button>
                <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Mensal</button>
              </div>
            </div>
            <div id="reading-performance-chart" className="h-80"></div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Sites Mais Lidos</h2>
              <span className="text-sm text-slate-500">Últimos 30 dias</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">Valor Econômico</span>
                    <span className="text-sm font-bold text-slate-800">248 artigos</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-pastel-blue h-2 rounded-full" style={{width: '32%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">32% do total lido</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">InfoMoney</span>
                    <span className="text-sm font-bold text-slate-800">186 artigos</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-pastel-green h-2 rounded-full" style={{width: '24%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">24% do total lido</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">Bloomberg Brasil</span>
                    <span className="text-sm font-bold text-slate-800">142 artigos</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-pastel-purple h-2 rounded-full" style={{width: '18%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">18% do total lido</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">Estadão Economia</span>
                    <span className="text-sm font-bold text-slate-800">98 artigos</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-pastel-yellow h-2 rounded-full" style={{width: '13%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">13% do total lido</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">CVM Notícias</span>
                    <span className="text-sm font-bold text-slate-800">72 artigos</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-pastel-pink h-2 rounded-full" style={{width: '9%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">9% do total lido</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-slate-700"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">Outros</span>
                    <span className="text-sm font-bold text-slate-800">46 artigos</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-pastel-peach h-2 rounded-full" style={{width: '4%'}}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">4% do total lido</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Reading Actions, Content Types, and Time Distribution */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Ações de Leitura</h2>
            <div className="space-y-4">
              <div className="p-4 bg-pastel-blue rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-bookmark text-slate-700 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">Favoritados</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800">124</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-green-600 font-medium">+18 esta semana</span>
                </div>
              </div>

              <div className="p-4 bg-pastel-green rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-clock text-slate-700 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">Ler Mais Tarde</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800">67</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-blue-600 font-medium">+12 hoje</span>
                </div>
              </div>

              <div className="p-4 bg-pastel-purple rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-share text-slate-700 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">Compartilhados</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800">43</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-green-600 font-medium">+7 esta semana</span>
                </div>
              </div>

              <div className="p-4 bg-pastel-yellow rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-comment text-slate-700 text-lg"></i>
                    <span className="text-sm font-medium text-slate-700">Comentados</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800">89</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-green-600 font-medium">+14 esta semana</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Tipos de Conteúdo Lidos</h2>
            <div id="content-types-chart" className="h-80"></div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Distribuição de Tempo</h2>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Segunda</span>
                  <span className="text-sm font-medium text-slate-800">1.8h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-pastel-blue h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Terça</span>
                  <span className="text-sm font-medium text-slate-800">1.4h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-pastel-green h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Quarta</span>
                  <span className="text-sm font-medium text-slate-800">1.6h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-pastel-purple h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Quinta</span>
                  <span className="text-sm font-medium text-slate-800">1.2h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-pastel-yellow h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Sexta</span>
                  <span className="text-sm font-medium text-slate-800">1.0h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-pastel-pink h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Sábado</span>
                  <span className="text-sm font-medium text-slate-800">0.8h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-pastel-peach h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Domingo</span>
                  <span className="text-sm font-medium text-slate-800">0.6h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-300 h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Total Semanal</span>
                  <span className="text-2xl font-bold text-slate-800">8.4h</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Top Reading Topics */}
        <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Temas Mais Lidos</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-blue rounded-full flex items-center justify-center">
                  <i className="fas fa-chart-line text-slate-700 text-lg"></i>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Top 1</span>
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">Mercado de Capitais</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Artigos</span>
                  <span className="text-sm font-bold text-slate-800">187</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tempo</span>
                  <span className="text-sm font-bold text-slate-800">8.2h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div className="bg-pastel-blue h-2 rounded-full" style={{width: '28%'}}></div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-green rounded-full flex items-center justify-center">
                  <i className="fas fa-balance-scale text-slate-700 text-lg"></i>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Top 2</span>
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">Regulamentação</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Artigos</span>
                  <span className="text-sm font-bold text-slate-800">142</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tempo</span>
                  <span className="text-sm font-bold text-slate-800">6.8h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div className="bg-pastel-green h-2 rounded-full" style={{width: '21%'}}></div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-purple rounded-full flex items-center justify-center">
                  <i className="fas fa-credit-card text-slate-700 text-lg"></i>
                </div>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">Top 3</span>
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">Payments</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Artigos</span>
                  <span className="text-sm font-bold text-slate-800">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tempo</span>
                  <span className="text-sm font-bold text-slate-800">5.4h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div className="bg-pastel-purple h-2 rounded-full" style={{width: '19%'}}></div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-yellow rounded-full flex items-center justify-center">
                  <i className="fas fa-building text-slate-700 text-lg"></i>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded">Top 4</span>
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">Banking</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Artigos</span>
                  <span className="text-sm font-bold text-slate-800">96</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tempo</span>
                  <span className="text-sm font-bold text-slate-800">4.2h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div className="bg-pastel-yellow h-2 rounded-full" style={{width: '14%'}}></div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-pink rounded-full flex items-center justify-center">
                  <i className="fas fa-money-bill-wave text-slate-700 text-lg"></i>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded">Top 5</span>
              </div>
              <h3 className="text-base font-semibold text-slate-800 mb-2">Economia</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Artigos</span>
                  <span className="text-sm font-bold text-slate-800">84</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tempo</span>
                  <span className="text-sm font-bold text-slate-800">3.8h</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div className="bg-pastel-pink h-2 rounded-full" style={{width: '12%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Completion Rate and Reading Habits */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Análise de Taxa de Conclusão</h2>
            <div id="completion-rate-chart" className="h-64"></div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Hábitos de Leitura</h2>
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Horário Preferido</span>
                  <span className="text-lg font-bold text-slate-800">08:00 - 10:00</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-clock"></i>
                  <span>42% das leituras acontecem neste período</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Tempo Médio por Artigo</span>
                  <span className="text-lg font-bold text-slate-800">4.2 min</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-clock"></i>
                  <span>12% mais rápido que a média da plataforma</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Artigos por Sessão</span>
                  <span className="text-lg font-bold text-slate-800">6.8</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-layer-group"></i>
                  <span>Média de artigos lidos por sessão de acesso</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Streak de Leitura</span>
                  <span className="text-lg font-bold text-slate-800">23 dias</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-fire"></i>
                  <span>Continue lendo para manter sua sequência!</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Distribuição Horária</h3>
                <div id="hourly-distribution-chart" className="h-40"></div>
              </div>
            </div>
          </section>
        </div>

        {/* Monthly Comparison */}
        <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Comparação Mensal</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pastel-blue rounded"></div>
                <span className="text-sm text-slate-600">2024</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pastel-yellow rounded"></div>
                <span className="text-sm text-slate-600">2023</span>
              </div>
            </div>
          </div>
          <div id="monthly-comparison-chart" className="h-96"></div>
        </section>

        {/* Featured Articles and Insights */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Artigos em Destaque</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:shadow-md transition">
                <div className="w-20 h-20 bg-pastel-blue rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm">Nova regulamentação do Banco Central impacta mercado de crédito</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span><i className="fas fa-calendar mr-1"></i>Hoje</span>
                    <span><i className="fas fa-clock mr-1"></i>5 min</span>
                    <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded">Regulação</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:shadow-md transition">
                <div className="w-20 h-20 bg-pastel-green rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm">Análise: Tendências do mercado de capitais para 2025</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span><i className="fas fa-calendar mr-1"></i>Ontem</span>
                    <span><i className="fas fa-clock mr-1"></i>8 min</span>
                    <span className="px-2 py-1 bg-pastel-green text-slate-700 rounded">Análise</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:shadow-md transition">
                <div className="w-20 h-20 bg-pastel-purple rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm">Open Finance: Como as fintechs estão transformando o setor</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span><i className="fas fa-calendar mr-1"></i>2 dias atrás</span>
                    <span><i className="fas fa-clock mr-1"></i>6 min</span>
                    <span className="px-2 py-1 bg-pastel-purple text-slate-700 rounded">Fintech</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Insights Personalizados</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-trophy text-green-700"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">Excelente progresso!</h3>
                    <p className="text-xs text-slate-600">Você leu 42% mais artigos este mês comparado ao mês passado. Continue assim!</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-lightbulb text-blue-700"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">Sugestão de leitura</h3>
                    <p className="text-xs text-slate-600">Baseado no seu interesse em Mercado de Capitais, recomendamos explorar mais sobre Derivativos.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-chart-line text-purple-700"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">Meta alcançada</h3>
                    <p className="text-xs text-slate-600">Parabéns! Você atingiu sua meta de 8h de leitura semanal.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Reading Goals */}
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Metas de Leitura</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Meta Diária</h3>
                <span className="text-2xl font-bold text-green-600">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
                <div className="bg-green-500 h-3 rounded-full" style={{width: '100%'}}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">5 de 5 artigos</span>
                <span className="text-green-600 font-medium"><i className="fas fa-check-circle mr-1"></i>Completa</span>
              </div>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Meta Semanal</h3>
                <span className="text-2xl font-bold text-blue-600">85%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{width: '85%'}}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">34 de 40 artigos</span>
                <span className="text-blue-600 font-medium">Faltam 6</span>
              </div>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Meta Mensal</h3>
                <span className="text-2xl font-bold text-purple-600">72%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{width: '72%'}}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">115 de 160 artigos</span>
                <span className="text-purple-600 font-medium">Faltam 45</span>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};