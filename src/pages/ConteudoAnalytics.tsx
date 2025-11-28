import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Plotly from 'plotly.js-dist';

const ConteudoAnalytics = () => {
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

    // Chart 1: Performance Comparativa (Bar Chart)
    try {
      const performanceData = [
        {
          type: 'bar',
          x: ['E-books', 'Cursos', 'Relatórios', 'Infográficos', 'Entrevistas', 'Planilhas'],
          y: [18.9, 3.4, 12.1, 32.8, 15.2, 4.1],
          name: 'Downloads (k)',
          marker: {
            color: pastelGreen,
            opacity: 0.9
          }
        },
        {
          type: 'bar',
          x: ['E-books', 'Cursos', 'Relatórios', 'Infográficos', 'Entrevistas', 'Planilhas'],
          y: [8.5, 12.2, 6.8, 14.5, 9.3, 2.1],
          name: 'Compartilhamentos (k)',
          marker: {
            color: pastelPurple,
            opacity: 0.9
          }
        }
      ];

      const performanceLayout = {
        margin: { t: 20, r: 40, b: 40, l: 40 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          orientation: 'h',
          y: 1.1,
          x: 0.5,
          xanchor: 'center'
        },
        xaxis: {
          gridcolor: 'transparent',
          tickfont: {
            color: textColor,
            family: 'Inter'
          }
        },
        yaxis: {
          title: 'Quantidade (k)',
          gridcolor: gridColor,
          tickfont: {
            color: textColor,
            family: 'Inter'
          },
          zeroline: false
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
      };

      Plotly.newPlot('performance-chart', performanceData as any, performanceLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Performance Chart Error:", e);
    }

    // Chart 2: Distribuição (Pie Chart)
    try {
      const distributionData = [
        {
          type: 'pie',
          values: [30, 20, 15, 10, 10, 15],
          labels: ['Artigos', 'Webinars', 'Podcasts', 'Análises', 'Newsletters', 'Outros'],
          marker: {
            colors: [pastelBlue, pastelPink, pastelPurple, pastelGreen, pastelOrange, pastelYellow]
          },
          textinfo: 'percent',
          textposition: 'inside',
          hoverinfo: 'label+percent+value',
          hole: 0.5,
          insidetextfont: {
            color: '#ffffff'
          }
        }
      ];

      const distributionLayout = {
        margin: { t: 0, r: 0, b: 20, l: 0 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          orientation: 'h',
          y: -0.1,
          font: {
            color: textColor,
            size: 11,
            family: 'Inter'
          }
        }
      };

      Plotly.newPlot('distribution-chart', distributionData as any, distributionLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Distribution Chart Error:", e);
    }
  }, []);

  const contentTypes = [
    { name: 'Apresentações', subtitle: 'Slides profissionais', icon: 'fa-person-chalkboard', color: 'bg-[hsl(142,35%,75%)]', views: '12.5k', trend: '8%', trendUp: true, quantity: '142 arquivos', status: 'Ativo', textColor: 'text-[hsl(142,35%,40%)]' },
    { name: 'Live', subtitle: 'Transmissões ao vivo', icon: 'fa-tower-broadcast', color: 'bg-[hsl(340,35%,78%)]', views: '8.2k', trend: '24%', trendUp: true, quantity: '28 eventos', status: 'Ativo', textColor: 'text-[hsl(340,35%,40%)]' },
    { name: 'Podcast', subtitle: 'Áudios sobre mercado', icon: 'fa-microphone-lines', color: 'bg-[hsl(270,35%,78%)]', views: '45.1k', trend: '15%', trendUp: true, quantity: '86 episódios', status: 'Ativo', textColor: 'text-[hsl(270,35%,40%)]' },
    { name: 'Cursos', subtitle: 'Módulos estruturados', icon: 'fa-graduation-cap', color: 'bg-[hsl(48,40%,75%)]', views: '3.4k', trend: '0%', trendUp: false, quantity: '12 cursos', status: 'Ativo', textColor: 'text-[hsl(48,40%,40%)]' },
    { name: 'Avatar IA', subtitle: 'Vídeos com IA', icon: 'fa-robot', color: 'bg-[hsl(206,35%,75%)]', views: '156', trend: '120%', trendUp: true, quantity: '45 vídeos', status: 'Beta', textColor: 'text-[hsl(206,35%,40%)]', beta: true },
    { name: 'E-books', subtitle: 'Livros digitais', icon: 'fa-book-bookmark', color: 'bg-[hsl(35,35%,75%)]', views: '18.9k', trend: '2%', trendUp: false, quantity: '32 títulos', status: 'Ativo', textColor: 'text-[hsl(35,35%,40%)]' },
    { name: 'Webinars', subtitle: 'Transmissões agendadas', icon: 'fa-video', color: 'bg-[hsl(340,35%,78%)]', views: '92.4k', trend: '45%', trendUp: true, quantity: '156 sessões', status: 'Ativo', textColor: 'text-[hsl(340,35%,40%)]' },
    { name: 'Artigos', subtitle: 'Análises escritas', icon: 'fa-newspaper', color: 'bg-[hsl(206,35%,75%)]', views: '210k', trend: '5%', trendUp: true, quantity: '842 posts', status: 'Ativo', textColor: 'text-[hsl(206,35%,40%)]' },
    { name: 'Análises Técnicas', subtitle: 'Gráficos e projeções', icon: 'fa-chart-line', color: 'bg-[hsl(142,35%,75%)]', views: '45.2k', trend: '18%', trendUp: true, quantity: '120 análises', status: 'Ativo', textColor: 'text-[hsl(142,35%,40%)]' },
    { name: 'Relatórios', subtitle: 'Reports detalhados', icon: 'fa-file-invoice', color: 'bg-[hsl(270,35%,78%)]', views: '12.1k', trend: '0%', trendUp: false, quantity: '64 arquivos', status: 'Ativo', textColor: 'text-[hsl(270,35%,40%)]' },
    { name: 'Newspaper', subtitle: 'Clipping de notícias', icon: 'fa-scroll', color: 'bg-[hsl(340,35%,78%)]', views: '8.9k', trend: '5%', trendUp: false, quantity: '312 edições', status: 'Ativo', textColor: 'text-[hsl(340,35%,40%)]' },
    { name: 'Estudos Acadêmicos', subtitle: 'Teses e whitepapers', icon: 'fa-flask', color: 'bg-[hsl(35,35%,75%)]', views: '2.3k', trend: '2%', trendUp: true, quantity: '18 papers', status: 'Ativo', textColor: 'text-[hsl(35,35%,40%)]' },
    { name: 'Newsletters', subtitle: 'Resumos semanais', icon: 'fa-envelope-open-text', color: 'bg-[hsl(206,35%,75%)]', views: '65.4k', trend: '9%', trendUp: true, quantity: '42 envios', status: 'Ativo', textColor: 'text-[hsl(206,35%,40%)]' },
    { name: 'Infográficos', subtitle: 'Dados visuais', icon: 'fa-images', color: 'bg-[hsl(270,35%,78%)]', views: '32.8k', trend: '11%', trendUp: true, quantity: '105 imagens', status: 'Ativo', textColor: 'text-[hsl(270,35%,40%)]' },
    { name: 'Entrevistas', subtitle: 'Conversas com líderes', icon: 'fa-comments', color: 'bg-[hsl(48,40%,75%)]', views: '15.2k', trend: '3%', trendUp: true, quantity: '24 posts', status: 'Ativo', textColor: 'text-[hsl(48,40%,40%)]' },
    { name: 'Planilhas', subtitle: 'Modelos financeiros', icon: 'fa-table', color: 'bg-[hsl(142,35%,75%)]', views: '4.1k', trend: '0%', trendUp: false, quantity: '15 arquivos', status: 'Ativo', textColor: 'text-[hsl(142,35%,40%)]' },
    { name: 'Whitepaper', subtitle: 'Documentos técnicos', icon: 'fa-file-lines', color: 'bg-[hsl(206,35%,75%)]', views: '6.8k', trend: '7%', trendUp: true, quantity: '28 documentos', status: 'Ativo', textColor: 'text-[hsl(206,35%,40%)]' }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Performance de Conteúdos Criados</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Análise sintética de produção e engajamento por formato.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-hover:text-slate-700 transition-colors" />
              <input
                type="text"
                placeholder="Buscar formatos..."
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 w-64 transition-all shadow-sm text-slate-600 placeholder-slate-400"
              />
            </div>
            <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Conteúdos</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">1,428</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-arrow-up"></i> 12% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600">
                <i className="fa-solid fa-layer-group text-lg"></i>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Engajamento Total</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">845.2k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-arrow-up"></i> 5.4% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(270,35%,78%)] flex items-center justify-center text-slate-600">
                <i className="fa-solid fa-heart text-lg"></i>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Retenção</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">68.4%</h3>
                <p className="text-xs text-rose-600 font-bold mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-arrow-down"></i> 1.2% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600">
                <i className="fa-solid fa-stopwatch text-lg"></i>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Formato Top</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">Webinars</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  42% do tráfego total
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(340,35%,78%)] flex items-center justify-center text-slate-600">
                <i className="fa-solid fa-trophy text-lg"></i>
              </div>
            </div>
          </section>

          {/* Chart Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Performance Comparativa</h2>
                  <p className="text-sm text-slate-500 mt-1">Visualizações vs. Tempo de Permanência por formato</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200">
                    Exportar
                  </button>
                </div>
              </div>
              <div id="performance-chart" className="h-[300px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Distribuição de Formatos</h2>
                <p className="text-sm text-slate-500 mt-1">Share de produção atual</p>
              </div>
              <div id="distribution-chart" className="h-[300px] w-full"></div>
            </div>
          </section>

          {/* Detailed Content Table */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Análise por Tipo de Conteúdo</h2>
                <p className="text-sm text-slate-500 mt-1">Visualize métricas detalhadas de consumo por formato.</p>
              </div>
              <button className="text-sm font-bold text-[hsl(206,35%,40%)] hover:text-slate-800 transition-colors">
                Exportar relatório <i className="fa-solid fa-download ml-1"></i>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Tipo de Conteúdo
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Visualizações
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Variação
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Quantidade
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-right px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contentTypes.map((content, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${content.color} flex items-center justify-center text-slate-700`}>
                              <i className={`fa-solid ${content.icon}`}></i>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">
                                {content.name}
                                {content.beta && (
                                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded ml-1 border border-slate-200">
                                    BETA
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-slate-500">{content.subtitle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{content.views}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${
                            content.trend === '0%' 
                              ? 'text-slate-400 bg-slate-100' 
                              : content.trendUp 
                                ? 'text-emerald-600 bg-emerald-50' 
                                : 'text-rose-600 bg-rose-50'
                          }`}>
                            <i className={`fa-solid ${
                              content.trend === '0%' 
                                ? 'fa-minus' 
                                : content.trendUp 
                                  ? 'fa-arrow-up' 
                                  : 'fa-arrow-down'
                            }`}></i> {content.trend}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{content.quantity}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            <i className={`fa-solid fa-circle text-[6px] ${content.status === 'Beta' ? 'text-amber-500' : 'text-emerald-500'}`}></i>
                            {content.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => {
                              if (content.name === 'Apresentações') {
                                navigate('/apresentacoes-analytics');
                              }
                            }}
                            className={`text-sm font-bold ${content.textColor} hover:text-slate-800 transition-colors`}
                          >
                            Ver detalhes <i className="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
                          </button>
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

export default ConteudoAnalytics;
