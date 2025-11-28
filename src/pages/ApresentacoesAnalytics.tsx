import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Users, Eye, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const ApresentacoesAnalytics = () => {
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

    // Chart 1: Visualizações por Slide (Bar Chart)
    try {
      const slideViewsData = [
        {
          type: 'bar',
          x: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6', 'Slide 7', 'Slide 8', 'Slide 9', 'Slide 10'],
          y: [2840, 2650, 2420, 2180, 1950, 1720, 1480, 1250, 980, 720],
          name: 'Visualizações',
          marker: {
            color: pastelBlue,
            opacity: 0.9
          }
        }
      ];

      const slideViewsLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
          tickangle: 0
        },
        yaxis: {
          title: 'Visualizações',
          gridcolor: gridColor,
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
          zeroline: false
        }
      };

      Plotly.newPlot('slide-views-chart', slideViewsData as any, slideViewsLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Slide Views Chart Error:", e);
    }

    // Chart 2: Taxa de Completude (Line Chart)
    try {
      const completionData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6', 'Slide 7', 'Slide 8', 'Slide 9', 'Slide 10'],
          y: [100, 93.3, 85.2, 76.8, 68.7, 60.6, 52.1, 44.0, 34.5, 25.4],
          name: '% Completude',
          line: {
            color: pastelGreen,
            width: 3,
            shape: 'spline'
          },
          marker: {
            color: pastelGreen,
            size: 8,
            line: {
              color: '#fff',
              width: 2
            }
          }
        }
      ];

      const completionLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
          tickangle: 0
        },
        yaxis: {
          title: 'Taxa de Completude (%)',
          gridcolor: gridColor,
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
          zeroline: false,
          range: [0, 105]
        }
      };

      Plotly.newPlot('completion-chart', completionData as any, completionLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Completion Chart Error:", e);
    }

    // Chart 3: Perfil Profissional (Pie Chart)
    try {
      const profileData = [
        {
          type: 'pie',
          values: [35, 28, 18, 12, 7],
          labels: ['Analistas Financeiros', 'Gerentes de Risco', 'Controllers', 'Diretores', 'Outros'],
          marker: {
            colors: [pastelBlue, pastelPurple, pastelGreen, pastelPink, pastelOrange]
          },
          textinfo: 'none',
          textposition: 'inside',
          hoverinfo: 'label+percent+value',
          hole: 0.5,
          insidetextfont: {
            color: '#ffffff'
          }
        }
      ];

      const profileLayout = {
        margin: { t: 0, r: 0, b: 20, l: 0 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          orientation: 'v',
          y: 0.5,
          x: 1,
          font: {
            color: textColor,
            size: 11,
            family: 'Inter'
          }
        }
      };

      Plotly.newPlot('profile-chart', profileData as any, profileLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Profile Chart Error:", e);
    }

    // Chart 4: Tempo Médio por Slide (Bar Chart)
    try {
      const timeData = [
        {
          type: 'bar',
          x: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6', 'Slide 7', 'Slide 8', 'Slide 9', 'Slide 10'],
          y: [45, 52, 48, 65, 58, 72, 68, 55, 62, 50],
          name: 'Tempo Médio (seg)',
          marker: {
            color: pastelPurple,
            opacity: 0.9
          }
        }
      ];

      const timeLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
          tickangle: 0
        },
        yaxis: {
          title: 'Tempo Médio (segundos)',
          gridcolor: gridColor,
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
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

    // Chart 5: Engajamento ao Longo do Tempo (Line Chart)
    try {
      const engagementData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
          y: [420, 580, 720, 650, 890, 1050],
          name: 'Visualizações',
          line: {
            color: pastelPink,
            width: 3,
            shape: 'spline'
          },
          marker: {
            color: pastelPink,
            size: 8,
            line: {
              color: '#fff',
              width: 2
            }
          }
        }
      ];

      const engagementLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: {
            color: textColor,
            family: 'Inter'
          }
        },
        yaxis: {
          title: 'Visualizações',
          gridcolor: gridColor,
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
          zeroline: false
        }
      };

      Plotly.newPlot('engagement-chart', engagementData as any, engagementLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Engagement Chart Error:", e);
    }

  }, []);

  const topPresentations = [
    { title: 'Gestão de Riscos Financeiros 2025', views: 3240, completion: 72, avgTime: '8m 24s' },
    { title: 'Análise de Crédito Rural', views: 2850, completion: 68, avgTime: '7m 12s' },
    { title: 'Compliance Bancário Atualizado', views: 2420, completion: 81, avgTime: '9m 45s' },
    { title: 'Tendências Open Finance', views: 2180, completion: 65, avgTime: '6m 52s' },
    { title: 'Mercado de Pagamentos Digital', views: 1950, completion: 74, avgTime: '7m 38s' }
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
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Apresentações</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise detalhada de visualização e engajamento dos slides.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-hover:text-slate-700 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar apresentações..."
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

        <div className="py-8 px-4 space-y-8">
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Apresentações</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">142</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 18 este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600">
                <i className="fa-solid fa-person-chalkboard text-lg"></i>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Visualizações Totais</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">12.5k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Eye size={12} /> 8% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600">
                <Eye size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Completude</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">25.4%</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Média até o último slide
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(270,35%,78%)] flex items-center justify-center text-slate-600">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Perfil Principal</p>
                <h3 className="text-xl font-bold text-slate-800 mt-1">Analistas</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  35% do público total
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(340,35%,78%)] flex items-center justify-center text-slate-600">
                <Users size={20} />
              </div>
            </div>
          </section>

          {/* Charts Section Row 1 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Visualizações por Slide</h2>
                  <p className="text-sm text-slate-500 mt-1">Distribuição de audiência ao longo da apresentação</p>
                </div>
              </div>
              <div id="slide-views-chart" className="h-[300px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Taxa de Completude</h2>
                  <p className="text-sm text-slate-500 mt-1">Percentual de usuários que chegam a cada slide</p>
                </div>
              </div>
              <div id="completion-chart" className="h-[300px] w-full"></div>
            </div>
          </section>

          {/* Charts Section Row 2 */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Perfil Profissional</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por tipo de profissional</p>
              </div>
              <div id="profile-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Tempo Médio por Slide</h2>
                  <p className="text-sm text-slate-500 mt-1">Média de permanência em cada slide (segundos)</p>
                </div>
              </div>
              <div id="time-chart" className="h-[280px] w-full"></div>
            </div>
          </section>

          {/* Engagement Chart */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Engajamento ao Longo do Tempo</h2>
                <p className="text-sm text-slate-500 mt-1">Evolução de visualizações nas últimas 6 semanas</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Download size={14} />
                Exportar
              </button>
            </div>
            <div id="engagement-chart" className="h-[300px] w-full"></div>
          </section>

          {/* Top Presentations Table */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Apresentações Mais Acessadas</h2>
                <p className="text-sm text-slate-500 mt-1">Ranking das apresentações com maior engajamento</p>
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
                        Título da Apresentação
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Visualizações
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Taxa de Completude
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Tempo Médio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topPresentations.map((presentation, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(142,35%,75%)] text-slate-700 font-bold text-sm">
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{presentation.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{presentation.views.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[hsl(142,35%,65%)] rounded-full"
                                style={{ width: `${presentation.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-800 w-12">{presentation.completion}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{presentation.avgTime}</p>
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

export default ApresentacoesAnalytics;
