import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Users, Eye, Headphones, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const PodcastAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pastelBlue = '#8AAACF';
    const pastelGreen = '#8EBC9F';
    const pastelPurple = '#AC9CC9';
    const pastelPink = '#CC99A9';
    const pastelOrange = '#C9AF89';
    const pastelYellow = '#E6D595';

    const gridColor = '#f3f4f6';
    const textColor = '#6b7280';

    // Chart 1: Reproduções por Episódio
    try {
      const episodeListensData = [
        {
          type: 'bar',
          x: ['Ep 135', 'Ep 136', 'Ep 137', 'Ep 138', 'Ep 139', 'Ep 140', 'Ep 141', 'Ep 142'],
          y: [8240, 7650, 9420, 8180, 7950, 9720, 10480, 8250],
          name: 'Reproduções',
          marker: {
            color: pastelPurple,
            opacity: 0.9
          }
        }
      ];

      const episodeListensLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' },
          tickangle: 0
        },
        yaxis: {
          title: 'Reproduções',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('episode-listens-chart', episodeListensData as any, episodeListensLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Episode Listens Chart Error:", e);
    }

    // Chart 2: Taxa de Conclusão
    try {
      const completionData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['0-5min', '5-10min', '10-15min', '15-20min', '20-25min', '25-30min', '30+min'],
          y: [100, 88, 76, 65, 52, 38, 22],
          name: '% Retenção',
          line: { color: pastelGreen, width: 3, shape: 'spline' },
          marker: { color: pastelGreen, size: 8, line: { color: '#fff', width: 2 } }
        }
      ];

      const completionLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' },
          tickangle: 0
        },
        yaxis: {
          title: 'Taxa de Retenção (%)',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('completion-chart', completionData as any, completionLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Completion Chart Error:", e);
    }

    // Chart 3: Perfil de Ouvintes
    try {
      const profileData = [
        {
          type: 'pie',
          labels: ['Analistas', 'Gestores', 'Diretores', 'Consultores', 'Outros'],
          values: [32, 26, 20, 14, 8],
          marker: {
            colors: [pastelBlue, pastelOrange, pastelPink, pastelGreen, pastelPurple]
          },
          textinfo: 'none',
          textposition: 'inside',
          hoverinfo: 'label+percent+value',
          hole: 0.4
        }
      ];

      const profileLayout = {
        margin: { t: 0, r: 0, b: 60, l: 0 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          orientation: 'h',
          y: -0.1,
          font: { color: textColor, size: 11, family: 'Inter' }
        }
      };

      Plotly.newPlot('profile-chart', profileData as any, profileLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Profile Chart Error:", e);
    }

    // Chart 4: Tempo Médio de Escuta
    try {
      const timeData = [
        {
          type: 'bar',
          x: ['Ep 135', 'Ep 136', 'Ep 137', 'Ep 138', 'Ep 139', 'Ep 140', 'Ep 141', 'Ep 142'],
          y: [18, 22, 24, 20, 19, 26, 28, 21],
          name: 'Tempo (min)',
          marker: { color: pastelOrange, opacity: 0.9 }
        }
      ];

      const timeLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' },
          tickangle: 0
        },
        yaxis: {
          title: 'Minutos',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('time-chart', timeData as any, timeLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Time Chart Error:", e);
    }

    // Chart 5: Crescimento de Audiência
    try {
      const growthData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
          y: [42000, 44500, 48200, 51800, 56400, 62100],
          name: 'Ouvintes',
          line: { color: pastelBlue, width: 3, shape: 'spline' },
          marker: { color: pastelBlue, size: 10 }
        }
      ];

      const growthLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' }
        },
        yaxis: {
          title: 'Total de Ouvintes',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('growth-chart', growthData as any, growthLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Growth Chart Error:", e);
    }

  }, []);

  const topPodcasts = [
    { title: 'Open Finance e o Futuro dos Bancos', listens: 10480, completion: 76, avgTime: '28m 12s' },
    { title: 'ESG no Mercado Financeiro', listens: 9720, completion: 72, avgTime: '26m 45s' },
    { title: 'Tendências de Pagamentos 2025', listens: 9420, completion: 81, avgTime: '24m 38s' },
    { title: 'Criptomoedas e Blockchain', listens: 8250, completion: 68, avgTime: '21m 15s' },
    { title: 'Gestão de Cartões de Crédito', listens: 8240, completion: 74, avgTime: '18m 52s' }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/conteudo-analytics')}
                className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Podcasts</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise detalhada de reproduções e engajamento dos episódios.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-hover:text-slate-700 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar podcasts..."
                  className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 w-64 transition-all shadow-sm text-slate-600 placeholder-slate-400"
                />
              </div>
              <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors relative shadow-sm">
                <Bell size={20} />
                <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Episódios</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">86</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 8 este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(270,35%,78%)] flex items-center justify-center text-slate-600">
                <Headphones size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Reproduções</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">45.1k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Eye size={12} /> 15% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600">
                <Eye size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Conclusão</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">74%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 6% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Tempo Médio</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">23min</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Clock size={12} /> 4% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(24,42%,75%)] flex items-center justify-center text-slate-600">
                <Clock size={20} />
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Reproduções por Episódio</h2>
                  <p className="text-sm text-slate-500 mt-1">Total de plays nos últimos episódios</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2">
                  <Download size={14} />
                  Exportar
                </button>
              </div>
              <div id="episode-listens-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Taxa de Conclusão</h2>
                <p className="text-sm text-slate-500 mt-1">% de ouvintes que completam os episódios</p>
              </div>
              <div id="completion-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Perfil de Ouvintes</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por tipo de profissional</p>
              </div>
              <div id="profile-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Tempo Médio de Escuta</h2>
                  <p className="text-sm text-slate-500 mt-1">Duração média em minutos por episódio</p>
                </div>
              </div>
              <div id="time-chart" className="h-[280px] w-full"></div>
            </div>
          </section>

          {/* Growth Chart */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Crescimento de Audiência</h2>
                <p className="text-sm text-slate-500 mt-1">Evolução de ouvintes nas últimas 6 semanas</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Download size={14} />
                Exportar
              </button>
            </div>
            <div id="growth-chart" className="h-[300px] w-full"></div>
          </section>

          {/* Top Podcasts Table */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Episódios Mais Ouvidos</h2>
                <p className="text-sm text-slate-500 mt-1">Ranking dos podcasts com maior audiência</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Posição
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Título do Episódio
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Reproduções
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Taxa de Conclusão
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Tempo Médio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topPodcasts.map((podcast, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(270,35%,78%)] text-slate-700 font-bold text-sm">
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{podcast.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{podcast.listens.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                              <div 
                                className="h-full bg-[hsl(142,35%,65%)] rounded-full"
                                style={{ width: `${podcast.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-800 w-12">{podcast.completion}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{podcast.avgTime}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PodcastAnalytics;
