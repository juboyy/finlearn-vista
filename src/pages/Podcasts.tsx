import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live' | 'entrevistas';

const Podcasts = () => {
  const [activeTab, setActiveTab] = useState<TabType>('podcasts');
  const navigate = useNavigate();
  
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

        <MenutabbarFix 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          showAnalyticsButton={true}
          onAnalyticsClick={() => {
            const analyticsRoutes: Record<TabType, string> = {
              'todos': '/conteudo-analytics',
              'podcasts': '/podcast-analytics',
              'cursos': '/cursos-analytics',
              'avatar-ia': '/avatar-ia-analytics',
              'ebooks': '/ebooks-analytics',
              'webinars': '/webinars-analytics',
              'artigos': '/artigos-analytics',
              'analises': '/analises-analytics',
              'relatorios': '/relatorios-analytics',
              'documentos': '/newspaper-analytics',
              'estudos': '/estudos-academicos-analytics',
              'infograficos': '/infografico-analytics',
              'whitepaper': '/whitepaper-analytics',
              'apresentacoes': '/apresentacoes-analytics',
              'live': '/live-analytics',
              'entrevistas': '/entrevistas-analytics'
            };
            const route = analyticsRoutes[activeTab];
            if (route) {
              navigate(route);
            }
          }}
        />

        <div className="flex-1 p-8 pb-32">
          {activeTab === 'todos' && (
            <>
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
            </>
          )}

          {activeTab === 'podcasts' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-podcast text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Podcasts</h3>
              <p className="text-slate-600">Conteúdo exclusivo de podcasts será exibido aqui</p>
            </div>
          )}

          {activeTab === 'cursos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Cursos</h3>
              <p className="text-slate-600">Explore cursos completos de finanças e investimentos</p>
            </div>
          )}

          {activeTab === 'avatar-ia' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-robot text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Avatar IA</h3>
              <p className="text-slate-600">Aprenda com avatares de inteligência artificial</p>
            </div>
          )}

          {activeTab === 'ebooks' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-book-open text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">E-books</h3>
              <p className="text-slate-600">Biblioteca digital de e-books especializados</p>
            </div>
          )}

          {activeTab === 'webinars' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-video text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Webinars</h3>
              <p className="text-slate-600">Participe de webinars ao vivo com especialistas</p>
            </div>
          )}

          {activeTab === 'artigos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-newspaper text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Artigos</h3>
              <p className="text-slate-600">Leia artigos aprofundados sobre o mercado financeiro</p>
            </div>
          )}

          {activeTab === 'analises' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Análises</h3>
              <p className="text-slate-600">Análises técnicas e fundamentalistas detalhadas</p>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-alt text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Documentos</h3>
              <p className="text-slate-600">Documentos oficiais e relatórios financeiros</p>
            </div>
          )}

          {activeTab === 'estudos' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-flask text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Estudos Acadêmicos</h3>
              <p className="text-slate-600">Pesquisas e estudos acadêmicos sobre economia e finanças</p>
            </div>
          )}
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
