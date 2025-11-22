// Newsletter Analytics Page
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { BarChart3, Download, MailOpen, Percent, Clock, CheckCheck, Heart, ChartLine, CreditCard, Scale, Globe, Lightbulb, Trophy, Flame, Bookmark } from "lucide-react";
import { useEffect } from "react";

declare global {
  interface Window {
    Plotly: any;
  }
}

export default function NewsletterAnalytics() {
  useEffect(() => {
    if (!window.Plotly) {
      const script = document.createElement('script');
      script.src = 'https://cdn.plot.ly/plotly-2.24.1.min.js';
      script.async = true;
      script.onload = () => {
        createCharts();
      };
      document.head.appendChild(script);
    } else {
      createCharts();
    }
  }, []);

  const createCharts = () => {
    if (!window.Plotly) return;

    try {
      // Reading Trend Chart
      const readingTrendData = [{
        type: 'scatter',
        mode: 'lines',
        name: 'Este mês',
        x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        y: [3, 5, 4, 6, 7, 5, 8, 6, 7, 9, 5, 6, 8, 7, 6, 9, 8, 7, 6, 8, 9, 7, 8, 6, 7, 8, 9, 6, 7, 8],
        line: { color: '#B8D4E8', width: 3 },
        fill: 'tozeroy',
        fillcolor: 'rgba(184, 212, 232, 0.2)'
      }, {
        type: 'scatter',
        mode: 'lines',
        name: 'Mês anterior',
        x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        y: [2, 4, 3, 5, 6, 4, 6, 5, 5, 7, 4, 5, 6, 5, 5, 7, 6, 6, 5, 6, 7, 5, 6, 5, 6, 6, 7, 5, 5, 6],
        line: { color: '#D4C5E8', width: 2, dash: 'dot' }
      }];

      window.Plotly.newPlot('reading-trend', readingTrendData, {
        margin: { t: 20, r: 20, b: 40, l: 40 },
        showlegend: true,
        legend: { orientation: 'h', y: -0.15 },
        xaxis: { showgrid: false, title: 'Dia do mês' },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9', title: 'Newsletters' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Time Distribution Chart
      const timeDistData = [{
        type: 'bar',
        x: ['06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
        y: [5, 45, 38, 15, 12, 8, 22, 18, 7],
        marker: { color: '#B8D4E8' }
      }];

      window.Plotly.newPlot('time-distribution-chart', timeDistData, {
        margin: { t: 20, r: 20, b: 40, l: 40 },
        showlegend: false,
        xaxis: { showgrid: false },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Category Chart
      const categoryData = [{
        type: 'pie',
        labels: ['Economia Global', 'Mercado de Capitais', 'Payments', 'Compliance', 'Banking', 'Inovação'],
        values: [63, 52, 48, 24, 18, 12],
        marker: {
          colors: ['#E8E0C5', '#B8D4E8', '#D4C5E8', '#C5E8D4', '#E8D4C5', '#E8C5D8']
        },
        textinfo: 'label+percent',
        textposition: 'inside'
      }];

      window.Plotly.newPlot('category-chart', categoryData, {
        margin: { t: 20, r: 20, b: 20, l: 20 },
        showlegend: false,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Engagement Chart
      const engagementData = [{
        type: 'bar',
        x: ['Taxa Abertura', 'Taxa Conclusão', 'Favoritos', 'Compartilh.', 'Salvar depois'],
        y: [94, 89, 18, 3, 8],
        marker: {
          color: ['#B8D4E8', '#C5E8D4', '#E8C5D8', '#D4C5E8', '#E8E0C5']
        }
      }];

      window.Plotly.newPlot('engagement-chart', engagementData, {
        margin: { t: 20, r: 20, b: 60, l: 40 },
        showlegend: false,
        xaxis: { showgrid: false },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9', range: [0, 100] },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Weekly Comparison Chart
      const weeklyCompData = [{
        type: 'bar',
        name: 'Semana Atual',
        x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        y: [8, 7, 9, 8, 7, 6, 5],
        marker: { color: '#B8D4E8' }
      }, {
        type: 'bar',
        name: 'Semana Anterior',
        x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        y: [6, 6, 7, 6, 6, 5, 4],
        marker: { color: '#D4C5E8' }
      }];

      window.Plotly.newPlot('weekly-comparison-chart', weeklyCompData, {
        margin: { t: 20, r: 20, b: 40, l: 40 },
        showlegend: true,
        legend: { orientation: 'h', y: -0.2 },
        barmode: 'group',
        xaxis: { showgrid: false },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Sources Chart
      const sourcesData = [{
        type: 'pie',
        labels: ['Email', 'App Mobile', 'Web', 'Notificações'],
        values: [65, 20, 12, 3],
        marker: {
          colors: ['#B8D4E8', '#D4C5E8', '#C5E8D4', '#E8E0C5']
        },
        hole: 0.4
      }];

      window.Plotly.newPlot('sources-chart', sourcesData, {
        margin: { t: 20, r: 20, b: 20, l: 20 },
        showlegend: true,
        legend: { orientation: 'v', x: 1, y: 0.5 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Monthly Progress Chart
      const monthlyProgressData = [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
        y: [38, 45, 52, 47],
        line: { color: '#C5E8D4', width: 3 },
        marker: { color: '#C5E8D4', size: 10 }
      }];

      window.Plotly.newPlot('monthly-progress-chart', monthlyProgressData, {
        margin: { t: 20, r: 20, b: 40, l: 40 },
        showlegend: false,
        xaxis: { showgrid: false },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Content Type Chart
      const contentTypeData = [{
        type: 'bar',
        orientation: 'h',
        y: ['Análises', 'Notícias', 'Estudos', 'Entrevistas', 'Opinião'],
        x: [85, 72, 45, 28, 35],
        marker: {
          color: ['#B8D4E8', '#D4C5E8', '#C5E8D4', '#E8E0C5', '#E8C5D8']
        }
      }];

      window.Plotly.newPlot('content-type-chart', contentTypeData, {
        margin: { t: 20, r: 20, b: 40, l: 80 },
        showlegend: false,
        xaxis: { showgrid: true, gridcolor: '#f1f5f9' },
        yaxis: { showgrid: false },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

      // Day of Week Chart
      const dayOfWeekData = [{
        type: 'bar',
        x: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        y: [52, 48, 56, 50, 45, 32, 28],
        marker: { color: '#B8D4E8' }
      }];

      window.Plotly.newPlot('day-of-week-chart', dayOfWeekData, {
        margin: { t: 20, r: 20, b: 60, l: 40 },
        showlegend: false,
        xaxis: { showgrid: false },
        yaxis: { showgrid: true, gridcolor: '#f1f5f9' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false });

    } catch (e) {
      console.error("Chart error:", e);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Newsletter Analytics</h1>
              <p className="text-sm text-slate-500 mt-1">Análise completa do seu comportamento de leitura e engajamento</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                <option>Últimos 30 dias</option>
                <option>Últimos 7 dias</option>
                <option>Últimos 90 dias</option>
                <option>Este ano</option>
                <option>Todo período</option>
              </select>
              <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                <Download size={16} className="inline mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Overview KPIs */}
          <section className="grid grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                  <MailOpen className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+18%</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">187</h3>
              <p className="text-sm text-slate-500">Total de Newsletters Lidas</p>
              <p className="text-xs text-slate-600 mt-2">Últimos 30 dias</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                  <Percent className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">94%</h3>
              <p className="text-sm text-slate-500">Taxa de Abertura</p>
              <p className="text-xs text-slate-600 mt-2">Média mensal</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                  <Clock className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">+12%</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">8.5h</h3>
              <p className="text-sm text-slate-500">Tempo Total de Leitura</p>
              <p className="text-xs text-slate-600 mt-2">Este mês</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8E0C5' }}>
                  <CheckCheck className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">89%</h3>
              <p className="text-sm text-slate-500">Taxa de Conclusão</p>
              <p className="text-xs text-slate-600 mt-2">Média de leitura completa</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8C5D8' }}>
                  <Heart className="text-slate-700" size={20} />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">+15</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">42</h3>
              <p className="text-sm text-slate-500">Newsletters Favoritadas</p>
              <p className="text-xs text-slate-600 mt-2">Total acumulado</p>
            </div>
          </section>

          {/* Reading Trend and Time Distribution */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Tendência de Leitura</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-slate-700 rounded-lg text-sm font-medium" style={{ backgroundColor: '#B8D4E8' }}>Diário</button>
                  <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Semanal</button>
                  <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Mensal</button>
                </div>
              </div>
              <div id="reading-trend" style={{ height: '320px' }}></div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Horários de Leitura</h2>
              <div id="time-distribution-chart" style={{ height: '320px' }}></div>
            </section>
          </div>

          {/* Category Performance and Engagement Metrics */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Leituras por Categoria</h2>
              <div id="category-chart" style={{ height: '350px' }}></div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Métricas de Engajamento</h2>
              <div id="engagement-chart" style={{ height: '350px' }}></div>
            </section>
          </div>

          {/* Newsletter Performance */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Performance por Newsletter</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                    <ChartLine className="text-slate-700" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">Análise de Mercado Premium</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span><MailOpen size={12} className="inline mr-1" />52 lidas</span>
                      <span><Clock size={12} className="inline mr-1" />3.2h total</span>
                      <span><Percent size={12} className="inline mr-1" />96% abertura</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">96%</div>
                    <div className="text-xs text-slate-500">Taxa conclusão</div>
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: '96%', backgroundColor: '#B8D4E8' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                    <CreditCard className="text-slate-700" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">Payments Insider</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span><MailOpen size={12} className="inline mr-1" />48 lidas</span>
                      <span><Clock size={12} className="inline mr-1" />2.8h total</span>
                      <span><Percent size={12} className="inline mr-1" />92% abertura</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">88%</div>
                    <div className="text-xs text-slate-500">Taxa conclusão</div>
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: '88%', backgroundColor: '#D4C5E8' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                    <Scale className="text-slate-700" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">Compliance em Foco</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span><MailOpen size={12} className="inline mr-1" />24 lidas</span>
                      <span><Clock size={12} className="inline mr-1" />1.6h total</span>
                      <span><Percent size={12} className="inline mr-1" />96% abertura</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">92%</div>
                    <div className="text-xs text-slate-500">Taxa conclusão</div>
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: '92%', backgroundColor: '#C5E8D4' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8E0C5' }}>
                    <Globe className="text-slate-700" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">Economia em Números</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span><MailOpen size={12} className="inline mr-1" />63 lidas</span>
                      <span><Clock size={12} className="inline mr-1" />1.9h total</span>
                      <span><Percent size={12} className="inline mr-1" />98% abertura</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">94%</div>
                    <div className="text-xs text-slate-500">Taxa conclusão</div>
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: '94%', backgroundColor: '#E8E0C5' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Weekly Comparison, Sources, and Monthly Progress */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Comparativo Semanal</h2>
              <div id="weekly-comparison-chart" style={{ height: '280px' }}></div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Fontes de Leitura</h2>
              <div id="sources-chart" style={{ height: '280px' }}></div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Progresso Mensal</h2>
              <div id="monthly-progress-chart" style={{ height: '280px' }}></div>
            </section>
          </div>

          {/* Behavioral Insights */}
          <section className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#B8D4E8' }}>
                  <Lightbulb className="text-slate-700" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Melhor Horário de Leitura</h3>
                  <p className="text-xs text-slate-600 mb-3">Você é mais produtivo lendo newsletters entre <strong>08:00 - 10:00</strong> da manhã, com taxa de conclusão de 96%.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#B8D4E8' }}>Manhã</span>
                    <span className="text-xs text-slate-500">Alta produtividade</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C5E8D4' }}>
                  <Trophy className="text-slate-700" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Categoria Favorita</h3>
                  <p className="text-xs text-slate-600 mb-3"><strong>Economia Global</strong> é sua categoria mais lida, com 34% do total de newsletters consumidas este mês.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#C5E8D4' }}>Economia</span>
                    <span className="text-xs text-slate-500">63 leituras</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4C5E8' }}>
                  <BarChart3 className="text-slate-700" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Crescimento de Hábito</h3>
                  <p className="text-xs text-slate-600 mb-3">Seu engajamento aumentou <strong>23% comparado ao mês anterior</strong>, mantendo consistência de 6 dias por semana.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">+23%</span>
                    <span className="text-xs text-slate-500">Tendência positiva</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8E0C5' }}>
                  <Clock className="text-slate-700" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Tempo Médio de Leitura</h3>
                  <p className="text-xs text-slate-600 mb-3">Você gasta em média <strong>2min 45s</strong> por newsletter, 15% acima da média da plataforma.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#E8E0C5' }}>2min 45s</span>
                    <span className="text-xs text-slate-500">Leitura detalhada</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8C5D8' }}>
                  <Flame className="text-slate-700" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Sequência de Leitura</h3>
                  <p className="text-xs text-slate-600 mb-3">Você está em uma sequência de <strong>18 dias consecutivos</strong> lendo pelo menos uma newsletter por dia.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#E8C5D8' }}>18 dias</span>
                    <span className="text-xs text-slate-500">Recorde pessoal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8D4C5' }}>
                  <Bookmark className="text-slate-700" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Conteúdo Salvo</h3>
                  <p className="text-xs text-slate-600 mb-3">Você tem <strong>15 newsletters</strong> marcadas para ler mais tarde, com prioridade em temas de Regulamentação.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: '#E8D4C5' }}>15 pendentes</span>
                    <span className="text-xs text-slate-500">Lista de leitura</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Type and Day of Week Analysis */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Tipos de Conteúdo Preferidos</h2>
              <div id="content-type-chart" style={{ height: '300px' }}></div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Atividade por Dia da Semana</h2>
              <div id="day-of-week-chart" style={{ height: '300px' }}></div>
            </section>
          </div>

          {/* Detailed Stats */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Estatísticas Detalhadas</h2>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">47</div>
                <div className="text-sm text-slate-600 mb-1">Newsletters este mês</div>
                <div className="text-xs text-green-600">+12 vs mês anterior</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">234</div>
                <div className="text-sm text-slate-600 mb-1">Total acumulado</div>
                <div className="text-xs text-blue-600">Desde Jan/2024</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">6.2</div>
                <div className="text-sm text-slate-600 mb-1">Média semanal</div>
                <div className="text-xs text-green-600">+8% vs média geral</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">42</div>
                <div className="text-sm text-slate-600 mb-1">Newsletters favoritadas</div>
                <div className="text-xs text-slate-600">18% do total lido</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">15</div>
                <div className="text-sm text-slate-600 mb-1">Marcadas para depois</div>
                <div className="text-xs text-slate-600">Lista de leitura</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">5</div>
                <div className="text-sm text-slate-600 mb-1">Newsletters compartilhadas</div>
                <div className="text-xs text-blue-600">Com colegas</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">92%</div>
                <div className="text-sm text-slate-600 mb-1">Taxa de retenção</div>
                <div className="text-xs text-green-600">Acima da média</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-800 mb-2">3.2</div>
                <div className="text-sm text-slate-600 mb-1">Newsletters por dia</div>
                <div className="text-xs text-slate-600">Média diária</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
