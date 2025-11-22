import { useEffect, useState } from "react";

export const NewspaperAnalytics = () => {
  const [insights, setInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showDrillDown, setShowDrillDown] = useState(false);

  // Mock data for articles by topic with completion rates
  const articlesByTopic: Record<string, Array<{title: string, source: string, completionRate: number, timeSpent: string, date: string}>> = {
    'Mercado de Capitais': [
      { title: 'Nova regulamentação da CVM impacta fundos de investimento', source: 'Valor Econômico', completionRate: 45, timeSpent: '2 min', date: 'Hoje' },
      { title: 'Análise profunda: Mercado de renda variável em 2025', source: 'InfoMoney', completionRate: 38, timeSpent: '3 min', date: 'Ontem' },
      { title: 'IPOs previstos para o primeiro trimestre', source: 'Bloomberg Brasil', completionRate: 62, timeSpent: '4 min', date: 'Hoje' },
      { title: 'Estratégias de hedge para mercados voláteis', source: 'Valor Econômico', completionRate: 51, timeSpent: '3 min', date: '2 dias atrás' },
      { title: 'Impacto das taxas de juros nos derivativos', source: 'InfoMoney', completionRate: 48, timeSpent: '2 min', date: 'Hoje' },
    ],
    'Regulamentação': [
      { title: 'LGPD: Novas diretrizes para instituições financeiras', source: 'CVM Notícias', completionRate: 72, timeSpent: '5 min', date: 'Hoje' },
      { title: 'Compliance em criptoativos: O que mudou em 2025', source: 'Valor Econômico', completionRate: 68, timeSpent: '4 min', date: 'Ontem' },
      { title: 'Basileia III: Implementação no Brasil', source: 'Bloomberg Brasil', completionRate: 55, timeSpent: '3 min', date: '3 dias atrás' },
    ],
    'Payments': [
      { title: 'Open Finance: Desafios técnicos da integração completa', source: 'InfoMoney', completionRate: 42, timeSpent: '2 min', date: 'Hoje' },
      { title: 'PIX internacional: Análise técnica e regulatória detalhada', source: 'Valor Econômico', completionRate: 35, timeSpent: '3 min', date: 'Ontem' },
      { title: 'Tokenização de pagamentos: Futuro ou presente?', source: 'Bloomberg Brasil', completionRate: 58, timeSpent: '4 min', date: 'Hoje' },
      { title: 'Fraudes em pagamentos digitais: Relatório completo 2024', source: 'InfoMoney', completionRate: 47, timeSpent: '2 min', date: '2 dias atrás' },
      { title: 'Carteiras digitais vs Bancos tradicionais: Comparativo extenso', source: 'Estadão Economia', completionRate: 52, timeSpent: '3 min', date: 'Hoje' },
    ],
    'Banking': [
      { title: 'Fusões e aquisições no setor bancário brasileiro', source: 'Valor Econômico', completionRate: 65, timeSpent: '5 min', date: 'Ontem' },
      { title: 'Banking as a Service: Modelo de negócio em expansão', source: 'InfoMoney', completionRate: 59, timeSpent: '4 min', date: 'Hoje' },
      { title: 'Crédito consignado: Análise de riscos e oportunidades', source: 'Bloomberg Brasil', completionRate: 71, timeSpent: '5 min', date: '3 dias atrás' },
    ],
    'Economia': [
      { title: 'Inflação global: Perspectivas para 2025 em 50 páginas', source: 'Estadão Economia', completionRate: 28, timeSpent: '2 min', date: 'Hoje' },
      { title: 'Taxa Selic: Projeções e cenários macroeconômicos', source: 'Valor Econômico', completionRate: 67, timeSpent: '4 min', date: 'Ontem' },
      { title: 'Relatório completo: PIB brasileiro 2024', source: 'InfoMoney', completionRate: 44, timeSpent: '3 min', date: 'Hoje' },
      { title: 'Dívida pública: Análise histórica e perspectivas', source: 'Bloomberg Brasil', completionRate: 73, timeSpent: '6 min', date: '2 dias atrás' },
    ],
  };

  useEffect(() => {
    // Initialize Plotly charts after component mounts
    if (typeof window !== 'undefined' && (window as any).Plotly) {
      initializeCharts();
    }
    
    // Generate AI insights
    generateInsights();
  }, []);

  const generateInsights = async () => {
    try {
      setLoadingInsights(true);
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      
      if (!supabaseUrl) {
        throw new Error("Supabase URL not configured");
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/generate-reading-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ analyticsData: {} })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data?.insights) {
        setInsights(data.insights);
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      setInsights("Não foi possível gerar insights no momento. Por favor, tente novamente mais tarde.");
    } finally {
      setLoadingInsights(false);
    }
  };

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

    // Topic Completion Correlation Chart
    const topicCorrelationData = [
      {
        x: ['Mercado de Capitais', 'Regulamentação', 'Payments', 'Banking', 'Economia'],
        y: [187, 142, 128, 96, 84],
        name: 'Artigos Lidos',
        type: 'bar',
        marker: { color: '#B8D4E8' },
        yaxis: 'y'
      },
      {
        x: ['Mercado de Capitais', 'Regulamentação', 'Payments', 'Banking', 'Economia'],
        y: [78, 82, 68, 75, 71],
        name: 'Taxa Conclusão (%)',
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: '#E8C5D8', width: 3 },
        marker: { size: 10, color: '#E8C5D8' },
        yaxis: 'y2'
      }
    ];
    
    const topicCorrelationLayout = {
      margin: { l: 50, r: 50, t: 20, b: 80 },
      xaxis: { 
        gridcolor: '#f1f5f9',
        tickangle: -45
      },
      yaxis: { 
        title: 'Número de Artigos',
        gridcolor: '#f1f5f9',
        side: 'left'
      },
      yaxis2: {
        title: 'Taxa de Conclusão (%)',
        overlaying: 'y',
        side: 'right',
        range: [0, 100]
      },
      plot_bgcolor: '#ffffff',
      paper_bgcolor: '#ffffff',
      showlegend: true,
      legend: {
        x: 0.5,
        y: 1.1,
        xanchor: 'center',
        orientation: 'h'
      }
    };
    
    Plotly.newPlot('topic-completion-correlation-chart', topicCorrelationData, topicCorrelationLayout, {displayModeBar: false});
    
    // Add click event to topic correlation chart
    const topicChart = document.getElementById('topic-completion-correlation-chart');
    if (topicChart) {
      (topicChart as any).on('plotly_click', (data: any) => {
        const pointIndex = data.points[0].pointIndex;
        const topics = ['Mercado de Capitais', 'Regulamentação', 'Payments', 'Banking', 'Economia'];
        const clickedTopic = topics[pointIndex];
        setSelectedTopic(clickedTopic);
        setShowDrillDown(true);
      });
    }

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

        {/* Topic Completion Correlation */}
        <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Correlação: Temas vs Taxa de Conclusão</h2>
              <p className="text-sm text-slate-500 mt-1">Análise da relação entre volume de leitura e engajamento por tema</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pastel-blue rounded"></div>
                <span className="text-xs text-slate-600">Artigos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pastel-pink rounded"></div>
                <span className="text-xs text-slate-600">Taxa Conclusão</span>
              </div>
            </div>
          </div>
          <div id="topic-completion-correlation-chart" className="h-96"></div>
          
          {/* Insights about correlation */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-arrow-up text-green-600"></i>
                <span className="text-sm font-semibold text-slate-800">Melhor Engajamento</span>
              </div>
              <p className="text-xs text-slate-600">Regulamentação tem 82% de conclusão apesar de ser o 2º tema mais lido</p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-exclamation-triangle text-yellow-600"></i>
                <span className="text-sm font-semibold text-slate-800">Oportunidade</span>
              </div>
              <p className="text-xs text-slate-600">Payments tem apenas 68% de conclusão - conteúdo pode ser muito longo</p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-chart-line text-blue-600"></i>
                <span className="text-sm font-semibold text-slate-800">Padrão Identificado</span>
              </div>
              <p className="text-xs text-slate-600">Temas com mais artigos tendem a ter taxas de conclusão mais variadas</p>
            </div>
          </div>
          
          {/* Instruction to click */}
          <div className="mt-4 p-3 bg-pastel-blue rounded-lg flex items-center gap-3">
            <i className="fas fa-info-circle text-slate-700"></i>
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Dica:</span> Clique em qualquer barra ou ponto do gráfico para ver artigos específicos com baixa conclusão
            </p>
          </div>
        </section>

        {/* Drill-Down Modal */}
        {showDrillDown && selectedTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                      <i className="fas fa-layer-group text-pastel-purple"></i>
                      Artigos com Baixa Conclusão: {selectedTopic}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Artigos com taxa de conclusão abaixo de 75% - Identifique oportunidades de melhoria
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowDrillDown(false)}
                    className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {articlesByTopic[selectedTopic]
                    ?.filter(article => article.completionRate < 75)
                    .sort((a, b) => a.completionRate - b.completionRate)
                    .map((article, index) => (
                      <div 
                        key={index}
                        className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                article.completionRate < 40 
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : article.completionRate < 60 
                                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                  : 'bg-orange-50 text-orange-700 border border-orange-200'
                              }`}>
                                {article.completionRate}% concluído
                              </span>
                              <span className="text-xs text-slate-500">{article.date}</span>
                            </div>
                            
                            <h3 className="font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">
                              {article.title}
                            </h3>
                            
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <div className="flex items-center gap-2">
                                <i className="fas fa-globe text-slate-400"></i>
                                <span>{article.source}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <i className="fas fa-clock text-slate-400"></i>
                                <span>{article.timeSpent} de leitura</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition whitespace-nowrap">
                              <i className="fas fa-book-open mr-2"></i>
                              Continuar Lendo
                            </button>
                            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition whitespace-nowrap">
                              <i className="fas fa-chart-bar mr-2"></i>
                              Ver Análise
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-600 font-medium">Progresso de Leitura</span>
                            <span className="text-xs text-slate-500">{article.completionRate}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                article.completionRate < 40 
                                  ? 'bg-red-400'
                                  : article.completionRate < 60 
                                  ? 'bg-yellow-400'
                                  : 'bg-orange-400'
                              }`}
                              style={{width: `${article.completionRate}%`}}
                            ></div>
                          </div>
                        </div>

                        {/* Suggested action */}
                        {article.completionRate < 50 && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <i className="fas fa-lightbulb text-blue-600 mt-0.5"></i>
                              <div>
                                <p className="text-xs font-semibold text-slate-800">Sugestão de Melhoria</p>
                                <p className="text-xs text-slate-600 mt-1">
                                  {article.completionRate < 40 
                                    ? 'Artigo pode ser muito técnico ou longo. Considere criar um resumo executivo.'
                                    : 'Adicione mais elementos visuais ou divida em seções menores para melhorar o engajamento.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {articlesByTopic[selectedTopic]?.filter(article => article.completionRate < 75).length === 0 && (
                  <div className="text-center py-12">
                    <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Excelente Engajamento!</h3>
                    <p className="text-slate-600">Todos os artigos deste tema têm taxa de conclusão acima de 75%</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold">
                      {articlesByTopic[selectedTopic]?.filter(article => article.completionRate < 75).length || 0}
                    </span> artigos com baixa conclusão encontrados
                  </div>
                  <button 
                    onClick={() => setShowDrillDown(false)}
                    className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completion Rate and Reading Habits */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Análise de Taxa de Conclusão</h2>
            <div id="completion-rate-chart" className="h-64"></div>
            
            {/* AI Insights Section */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <i className="fas fa-brain text-slate-700"></i>
                </div>
                <h3 className="text-base font-semibold text-slate-800">Análise Comportamental por IA</h3>
              </div>
              
              {loadingInsights ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-4/6"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4 mt-4"></div>
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                    {insights.split('\n').map((paragraph, index) => {
                      if (!paragraph.trim()) return null;
                      
                      // Check if it's a bullet point
                      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                        const content = paragraph.replace(/^[•\-]\s*/, '');
                        return (
                          <div key={index} className="flex gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                            <span className="text-pastel-purple font-bold flex-shrink-0">•</span>
                            <p className="text-slate-700">{content}</p>
                          </div>
                        );
                      }
                      
                      return (
                        <p key={index} className="text-slate-700">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={generateInsights}
                    className="mt-4 px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center gap-2"
                  >
                    <i className="fas fa-sync-alt"></i>
                    Gerar Novos Insights
                  </button>
                </div>
              )}
            </div>
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