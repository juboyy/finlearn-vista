import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, Filter, Users } from "lucide-react";
import { useEffect, useRef } from "react";

const Estatisticas = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && (window as any).Plotly) {
      const chartData = [
        {
          x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          y: [8, 12, 6, 10, 7, 11],
          name: 'Análise Fund.',
          type: 'bar',
          marker: { color: '#6b7280' }
        },
        {
          x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          y: [5, 4, 7, 3, 6, 5],
          name: 'Renda Fixa',
          type: 'bar',
          marker: { color: '#4ade80' }
        },
        {
          x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          y: [3, 2, 5, 4, 3, 6],
          name: 'Gestão de Risco',
          type: 'bar',
          marker: { color: '#a78bfa' }
        },
        {
          x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          y: [2, 3, 4, 5, 4, 3],
          name: 'Compliance',
          type: 'bar',
          marker: { color: '#fb923c' }
        }
      ];

      const layout = {
        barmode: 'stack',
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
        showlegend: true,
        legend: {
          orientation: 'h',
          yanchor: 'bottom',
          y: 1.02,
          xanchor: 'right',
          x: 1
        },
        xaxis: {
          showgrid: false,
          tickfont: { color: '#64748b' }
        },
        yaxis: {
          gridcolor: '#e2e8f0',
          tickfont: { color: '#64748b' },
          title: 'Conteúdos Lidos'
        },
        margin: { t: 20, b: 40, l: 60, r: 20 },
        font: {
          family: 'Inter, sans-serif',
          size: 12,
          color: '#64748b'
        }
      };

      (window as any).Plotly.newPlot(chartRef.current, chartData, layout, {
        responsive: true,
        displayModeBar: false,
        displaylogo: false
      });
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Meus Autores</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Gerencie os criadores de conteúdo que você segue</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar autor..." 
                  className="w-72 pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-gray-dark transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-pastel-gray-dark font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                <Filter size={16} />
                <span>Filtrar</span>
              </button>
              
              <button className="relative w-10 h-10 text-muted-foreground hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-pastel-gray-dark text-white font-semibold text-sm rounded-lg hover:bg-slate-700 transition-colors">
                <Users size={16} />
                <span>Ver Autores</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl shadow-sm p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-light text-pastel-gray-dark flex-shrink-0 flex items-center justify-center">
                <i className="fa-solid fa-users text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Autores Seguidos</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">48</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl shadow-sm p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success-light text-pastel-gray-dark flex-shrink-0 flex items-center justify-center">
                <i className="fa-solid fa-book-open-reader text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Conteúdos Lidos</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">84</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl shadow-sm p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent-light text-pastel-gray-dark flex-shrink-0 flex items-center justify-center">
                <i className="fa-solid fa-heart text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Autor Mais Lido</p>
                <p className="text-lg font-bold text-slate-900 mt-1 truncate">Marina Santos</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl shadow-sm p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning-light text-pastel-gray-dark flex-shrink-0 flex items-center justify-center">
                <i className="fa-solid fa-chart-pie text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Área de Foco</p>
                <p className="text-lg font-bold text-slate-900 mt-1 truncate">Análise Fund.</p>
              </div>
            </div>
          </section>
          
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-1">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Seus Autores Prediletos</h2>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                    alt="Marina Santos" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Marina Santos</h3>
                    <p className="text-xs text-muted-foreground">32 conteúdos lidos</p>
                  </div>
                  <i className="fa-solid fa-crown text-yellow-400 text-lg"></i>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" 
                    alt="Bruno Lima" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Bruno Lima</h3>
                    <p className="text-xs text-muted-foreground">18 conteúdos lidos</p>
                  </div>
                  <i className="fa-solid fa-medal text-slate-400 text-lg"></i>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" 
                    alt="Ricardo Alves" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Ricardo Alves</h3>
                    <p className="text-xs text-muted-foreground">15 conteúdos lidos</p>
                  </div>
                  <i className="fa-solid fa-award text-orange-400 text-lg"></i>
                </div>
              </div>
            </div>
            <div className="xl:col-span-2 bg-card border border-border rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Leituras por Categoria</h2>
              <p className="text-sm text-muted-foreground mb-4">Atividade nos últimos 6 meses</p>
              <div ref={chartRef} className="h-[250px]"></div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Todos os Autores Seguidos</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <select className="text-sm font-medium border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-pastel-gray-dark">
                  <option>Progresso</option>
                  <option>Nome</option>
                  <option>Recentes</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                    alt="Marina Santos" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Marina Santos</h3>
                    <p className="text-sm text-muted-foreground">Análise Fundamentalista</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-2">Progresso de Leitura:</p>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                  <div className="bg-pastel-gray-dark h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-5">
                  <span>75%</span>
                  <span>32 de 43 conteúdos</span>
                </div>
                <button className="w-full py-2.5 bg-slate-100 text-pastel-gray-dark font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  Ver Perfil
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" 
                    alt="Bruno Lima" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Bruno Lima</h3>
                    <p className="text-sm text-muted-foreground">Gestor de Risco</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-2">Progresso de Leitura:</p>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                  <div className="h-2 rounded-full" style={{ width: '90%', backgroundColor: '#a78bfa' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-5">
                  <span>90%</span>
                  <span>18 de 20 conteúdos</span>
                </div>
                <button className="w-full py-2.5 bg-slate-100 text-pastel-gray-dark font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  Ver Perfil
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" 
                    alt="Ricardo Alves" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Ricardo Alves</h3>
                    <p className="text-sm text-muted-foreground">Análise Técnica</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-2">Progresso de Leitura:</p>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                  <div className="h-2 rounded-full" style={{ width: '40%', backgroundColor: '#4ade80' }}></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-5">
                  <span>40%</span>
                  <span>15 de 38 conteúdos</span>
                </div>
                <button className="w-full py-2.5 bg-slate-100 text-pastel-gray-dark font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  Ver Perfil
                </button>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Descubra Novos Autores</h2>
              <a href="#" className="text-sm font-medium text-pastel-gray-dark hover:underline">Ver Todos</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-light text-pastel-gray-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-chart-line text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Analista de Mercado</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">Especialistas em análise técnica e fundamentalista de ativos.</p>
                  </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center text-xs text-muted-foreground gap-4 mt-2 mb-4">
                  <span><i className="fa-solid fa-users mr-1"></i>34 autores</span>
                  <span><i className="fa-solid fa-star text-yellow-400 mr-1"></i>4.8 Média</span>
                </div>
                <button className="w-full py-2 bg-slate-100 text-pastel-gray-dark font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i>Seguir Categoria
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success-light text-pastel-gray-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-building-columns text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Especialista em Renda Fixa</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">Experts em títulos públicos, debêntures e investimentos conservadores.</p>
                  </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center text-xs text-muted-foreground gap-4 mt-2 mb-4">
                  <span><i className="fa-solid fa-users mr-1"></i>21 autores</span>
                  <span><i className="fa-solid fa-star text-yellow-400 mr-1"></i>4.9 Média</span>
                </div>
                <button className="w-full py-2 bg-slate-100 text-pastel-gray-dark font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i>Seguir Categoria
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-light text-pastel-gray-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-scale-balanced text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Consultor de Compliance</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">Orientação sobre regulamentação e governança corporativa.</p>
                  </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center text-xs text-muted-foreground gap-4 mt-2 mb-4">
                  <span><i className="fa-solid fa-users mr-1"></i>15 autores</span>
                  <span><i className="fa-solid fa-star text-yellow-400 mr-1"></i>4.7 Média</span>
                </div>
                <button className="w-full py-2 bg-slate-100 text-pastel-gray-dark font-semibold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i>Seguir Categoria
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Estatisticas;
