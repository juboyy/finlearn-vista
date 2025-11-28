import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Users, Eye, Bot, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const AvatarIAAnalytics = () => {
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

    // Chart 1: Vídeos Gerados por Categoria
    try {
      const videosData = [
        {
          type: 'bar',
          x: ['Educacional', 'Marketing', 'Treinamento', 'Apresentações', 'Tutoriais'],
          y: [15, 12, 8, 6, 4],
          name: 'Vídeos',
          marker: {
            color: pastelBlue,
            opacity: 0.9
          }
        }
      ];

      const videosLayout = {
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
          title: 'Número de Vídeos',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('videos-chart', videosData as any, videosLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Videos Chart Error:", e);
    }

    // Chart 2: Taxa de Visualização
    try {
      const viewsData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['0-25%', '25-50%', '50-75%', '75-100%', '100%'],
          y: [100, 82, 64, 48, 32],
          name: '% Visualização',
          line: { color: pastelGreen, width: 3, shape: 'spline' },
          marker: { color: pastelGreen, size: 8, line: { color: '#fff', width: 2 } }
        }
      ];

      const viewsLayout = {
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

      Plotly.newPlot('views-chart', viewsData as any, viewsLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Views Chart Error:", e);
    }

    // Chart 3: Perfil de Usuários
    try {
      const profileData = [
        {
          type: 'pie',
          labels: ['Educadores', 'Profissionais de Marketing', 'Gestores', 'Consultores', 'Outros'],
          values: [42, 28, 15, 10, 5],
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

    // Chart 4: Duração Média dos Vídeos
    try {
      const durationData = [
        {
          type: 'bar',
          x: ['Educacional', 'Marketing', 'Treinamento', 'Apresentações', 'Tutoriais'],
          y: [3.2, 1.8, 4.5, 2.4, 2.1],
          name: 'Duração (min)',
          marker: { color: pastelOrange, opacity: 0.9 }
        }
      ];

      const durationLayout = {
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

      Plotly.newPlot('duration-chart', durationData as any, durationLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Duration Chart Error:", e);
    }

    // Chart 5: Crescimento de Criações
    try {
      const growthData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
          y: [5, 8, 12, 20],
          name: 'Vídeos Criados',
          line: { color: pastelPurple, width: 3, shape: 'spline' },
          marker: { color: pastelPurple, size: 10 }
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
          title: 'Novos Vídeos',
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

  const topVideos = [
    { title: 'Introdução ao Open Finance', views: 842, completion: 68, avgTime: '3m 24s' },
    { title: 'Tendências ESG 2025', views: 756, completion: 72, avgTime: '2m 45s' },
    { title: 'Análise de Mercado de Capitais', views: 624, completion: 81, avgTime: '4m 12s' },
    { title: 'Gestão de Riscos Básico', views: 548, completion: 65, avgTime: '2m 18s' },
    { title: 'Compliance para Iniciantes', views: 492, completion: 74, avgTime: '2m 52s' }
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
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Avatar IA</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise detalhada de vídeos gerados e engajamento da audiência.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-hover:text-slate-700 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar vídeos..."
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
                <p className="text-sm font-semibold text-slate-500">Vídeos Gerados</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">45</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 120% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600">
                <Bot size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Visualizações</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">3.262</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Eye size={12} /> 85% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(270,35%,78%)] flex items-center justify-center text-slate-600">
                <Eye size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Conclusão</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">32%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 12% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Duração Média</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">2m 48s</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Clock size={12} /> 8% este mês
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
                  <h2 className="text-lg font-bold text-slate-800">Vídeos Gerados por Categoria</h2>
                  <p className="text-sm text-slate-500 mt-1">Distribuição de criações por tipo de conteúdo</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2">
                  <Download size={14} />
                  Exportar
                </button>
              </div>
              <div id="videos-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Taxa de Visualização</h2>
                <p className="text-sm text-slate-500 mt-1">% de espectadores que assistem até o final</p>
              </div>
              <div id="views-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Perfil de Usuários</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por tipo de profissional</p>
              </div>
              <div id="profile-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Duração Média dos Vídeos</h2>
                  <p className="text-sm text-slate-500 mt-1">Tempo médio em minutos por categoria</p>
                </div>
              </div>
              <div id="duration-chart" className="h-[280px] w-full"></div>
            </div>
          </section>

          {/* Growth Chart */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Crescimento de Criações</h2>
                <p className="text-sm text-slate-500 mt-1">Evolução de vídeos gerados nas últimas 4 semanas</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Download size={14} />
                Exportar
              </button>
            </div>
            <div id="growth-chart" className="h-[300px] w-full"></div>
          </section>

          {/* Top Videos Table */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Vídeos Mais Assistidos</h2>
                <p className="text-sm text-slate-500 mt-1">Ranking dos vídeos com maior número de visualizações</p>
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
                        Título do Vídeo
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Visualizações
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
                    {topVideos.map((video, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(206,35%,75%)] text-slate-700 font-bold text-sm">
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{video.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{video.views}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                              <div 
                                className="h-full bg-[hsl(142,35%,65%)] rounded-full"
                                style={{ width: `${video.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-800 w-12">{video.completion}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{video.avgTime}</p>
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

export default AvatarIAAnalytics;
