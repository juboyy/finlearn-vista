import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell } from "lucide-react";

const Podcasts = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Podcasts Financeiros</h1>
                <p className="text-sm text-slate-500 mt-1">Ouça as melhores análises e discussões sobre mercado financeiro</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-plus mr-2"></i>
                  Criar Podcast
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-6 bg-slate-50 border-b border-slate-200 sticky top-[81px] z-10 bg-opacity-95 backdrop-blur-sm">
          <div className="mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button className="px-4 py-2 bg-pastel-blue text-slate-800 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-table-cells"></i>
                <span>Todos</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-podcast"></i>
                <span>Podcasts</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-graduation-cap"></i>
                <span>Cursos</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-robot"></i>
                <span>Avatar IA</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-book-open"></i>
                <span>E-books</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-video"></i>
                <span>Webinars</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-newspaper"></i>
                <span>Artigos</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-chart-line"></i>
                <span>Análises</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-file-alt"></i>
                <span>Documentos</span>
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm">
                <i className="fas fa-flask"></i>
                <span>Estudos Acadêmicos</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                placeholder="Buscar podcasts, episódios ou temas..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
              />
            </div>
            <button className="px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center gap-2 whitespace-nowrap">
              <i className="fas fa-filter"></i>
              <span>Filtro Avançado</span>
            </button>
            <button className="px-5 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2 whitespace-nowrap">
              <i className="fas fa-history"></i>
              <span>Histórico</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-8 pb-32">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Continue Ouvindo</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-blue">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="podcast cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">Mercados em Foco</p>
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Análise Semanal: Volatilidade e Oportunidades</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-slate-500">28 min restantes</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                      <div className="bg-pastel-blue h-1 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <button className="text-slate-600 hover:text-slate-800">
                      <i className="fas fa-play-circle text-2xl"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-green">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="podcast cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">Investidor Inteligente</p>
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Diversificação de Carteira em 2024</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-slate-500">15 min restantes</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                      <div className="bg-pastel-green h-1 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <button className="text-slate-600 hover:text-slate-800">
                      <i className="fas fa-play-circle text-2xl"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-purple">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="podcast cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">FinTech Brasil</p>
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Inovações em Meios de Pagamento</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-slate-500">22 min restantes</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                      <div className="bg-pastel-purple h-1 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <button className="text-slate-600 hover:text-slate-800">
                      <i className="fas fa-play-circle text-2xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Séries Populares</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Explorar todas</a>
            </div>
            <div className="grid grid-cols-5 gap-6">
              <div className="group cursor-pointer">
                <div className="relative mb-3">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-pastel-blue">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="series cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform">
                    <i className="fas fa-play ml-1"></i>
                  </button>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Mercados em Foco</h3>
                <p className="text-sm text-slate-500">142 episódios</p>
              </div>
              <div className="group cursor-pointer">
                <div className="relative mb-3">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-pastel-green">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="series cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform">
                    <i className="fas fa-play ml-1"></i>
                  </button>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Investidor Inteligente</h3>
                <p className="text-sm text-slate-500">89 episódios</p>
              </div>
              <div className="group cursor-pointer">
                <div className="relative mb-3">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-pastel-purple">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="series cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform">
                    <i className="fas fa-play ml-1"></i>
                  </button>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">FinTech Brasil</h3>
                <p className="text-sm text-slate-500">67 episódios</p>
              </div>
              <div className="group cursor-pointer">
                <div className="relative mb-3">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-pastel-pink">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/84f47f0351-d5b7ae096302eba637e5.png" alt="series cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform">
                    <i className="fas fa-play ml-1"></i>
                  </button>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Economia Global</h3>
                <p className="text-sm text-slate-500">201 episódios</p>
              </div>
              <div className="group cursor-pointer">
                <div className="relative mb-3">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-pastel-yellow">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8627363c2b-a72824be4bec8ab72346.png" alt="series cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform">
                    <i className="fas fa-play ml-1"></i>
                  </button>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Compliance em Foco</h3>
                <p className="text-sm text-slate-500">54 episódios</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Episódios Recentes</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-lg transition group">
                <button className="w-14 h-14 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:text-white transition">
                  <i className="fas fa-play text-xl"></i>
                </button>
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-blue">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="episode cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-1">Mercados em Foco • Episódio #143</p>
                  <h3 className="font-semibold text-slate-800 mb-1">Impactos da Taxa Selic nas Ações Brasileiras</h3>
                  <p className="text-sm text-slate-600 line-clamp-1">Análise detalhada sobre como as mudanças na taxa básica de juros afetam diferentes setores da bolsa.</p>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-sm text-slate-500">45 min</span>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-bookmark text-lg"></i>
                  </button>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-ellipsis-v text-lg"></i>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-lg transition group">
                <button className="w-14 h-14 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:text-white transition">
                  <i className="fas fa-play text-xl"></i>
                </button>
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-green">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="episode cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-1">Investidor Inteligente • Episódio #90</p>
                  <h3 className="font-semibold text-slate-800 mb-1">Estratégias de Hedge para Proteção de Carteira</h3>
                  <p className="text-sm text-slate-600 line-clamp-1">Aprenda técnicas avançadas para proteger seus investimentos em momentos de volatilidade.</p>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-sm text-slate-500">52 min</span>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-bookmark text-lg"></i>
                  </button>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-ellipsis-v text-lg"></i>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-lg transition group">
                <button className="w-14 h-14 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:text-white transition">
                  <i className="fas fa-play text-xl"></i>
                </button>
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-purple">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="episode cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-1">FinTech Brasil • Episódio #68</p>
                  <h3 className="font-semibold text-slate-800 mb-1">Open Banking e a Revolução dos Dados Financeiros</h3>
                  <p className="text-sm text-slate-600 line-clamp-1">Entenda como o compartilhamento de dados está transformando o setor financeiro brasileiro.</p>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-sm text-slate-500">38 min</span>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-bookmark text-lg"></i>
                  </button>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-ellipsis-v text-lg"></i>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-lg transition group">
                <button className="w-14 h-14 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-slate-800 hover:text-white transition">
                  <i className="fas fa-play text-xl"></i>
                </button>
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-pink">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/84f47f0351-d5b7ae096302eba637e5.png" alt="episode cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-1">Economia Global • Episódio #202</p>
                  <h3 className="font-semibold text-slate-800 mb-1">Inflação Global: Causas e Consequências</h3>
                  <p className="text-sm text-slate-600 line-clamp-1">Uma visão abrangente sobre os fatores que estão pressionando a inflação mundial.</p>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-sm text-slate-500">41 min</span>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-bookmark text-lg"></i>
                  </button>
                  <button className="text-slate-400 hover:text-slate-800">
                    <i className="fas fa-ellipsis-v text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Explorar por Categoria</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-pastel-blue rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-chart-line text-2xl text-slate-700"></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Análise de Mercado</h3>
                <p className="text-sm text-slate-600">48 episódios</p>
              </div>
              <div className="bg-pastel-green rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-piggy-bank text-2xl text-slate-700"></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Investimentos</h3>
                <p className="text-sm text-slate-600">67 episódios</p>
              </div>
              <div className="bg-pastel-purple rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-landmark text-2xl text-slate-700"></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Regulação Bancária</h3>
                <p className="text-sm text-slate-600">32 episódios</p>
              </div>
              <div className="bg-pastel-pink rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-gavel text-2xl text-slate-700"></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Compliance</h3>
                <p className="text-sm text-slate-600">29 episódios</p>
              </div>
            </div>
          </section>
        </div>

        <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-blue">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="current episode" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 truncate">O Futuro dos Pagamentos Digitais no Brasil</h4>
                <p className="text-sm text-slate-500 truncate">Mercados em Foco</p>
              </div>
              <button className="text-slate-400 hover:text-slate-800">
                <i className="fas fa-heart text-xl"></i>
              </button>
            </div>
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center justify-center gap-6 mb-2">
                <button className="text-slate-600 hover:text-slate-800">
                  <i className="fas fa-random text-sm"></i>
                </button>
                <button className="text-slate-600 hover:text-slate-800">
                  <i className="fas fa-step-backward text-lg"></i>
                </button>
                <button className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                  <i className="fas fa-play ml-1"></i>
                </button>
                <button className="text-slate-600 hover:text-slate-800">
                  <i className="fas fa-step-forward text-lg"></i>
                </button>
                <button className="text-slate-600 hover:text-slate-800">
                  <i className="fas fa-redo text-sm"></i>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">15:32</span>
                <div className="flex-1 bg-slate-200 rounded-full h-1 cursor-pointer group">
                  <div className="bg-pastel-blue h-1 rounded-full relative" style={{ width: '30%' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">52:00</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-600 hover:text-slate-800">
                <i className="fas fa-list text-lg"></i>
              </button>
              <div className="flex items-center gap-3">
                <button className="text-slate-600 hover:text-slate-800">
                  <i className="fas fa-volume-up text-lg"></i>
                </button>
                <div className="w-24 bg-slate-200 rounded-full h-1 cursor-pointer group">
                  <div className="bg-slate-600 h-1 rounded-full relative" style={{ width: '70%' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Podcasts;
