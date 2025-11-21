import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MinhasMetas() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Resumo de Configuração</h1>
                <p className="text-sm text-slate-500 mt-1">Revise todas as suas configurações antes de finalizar</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/minhas-metas/notificacoes')} className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                  <ArrowLeft className="inline w-4 h-4 mr-2" />
                  Voltar
                </button>
                <button onClick={() => navigate('/minhas-metas/configuracao')} className="px-6 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-edit mr-2"></i>
                  Configurar Metas
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">

          <section className="mb-8">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border-2 border-pastel-blue p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <i className="fas fa-newspaper text-slate-700 text-xl"></i>
                  </div>
                  <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium">Ativo</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">5</p>
                <p className="text-sm text-slate-600">Tipos de Conteúdo</p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-pastel-green p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <i className="fas fa-tags text-slate-700 text-xl"></i>
                  </div>
                  <span className="px-2 py-1 bg-pastel-green text-slate-700 rounded text-xs font-medium">Ativo</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">12</p>
                <p className="text-sm text-slate-600">Tags Selecionadas</p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-pastel-purple p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <i className="fas fa-bell text-slate-700 text-xl"></i>
                  </div>
                  <span className="px-2 py-1 bg-pastel-purple text-slate-700 rounded text-xs font-medium">Ativo</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">3</p>
                <p className="text-sm text-slate-600">Canais de Notificação</p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-pastel-yellow p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <i className="fas fa-target text-slate-700 text-xl"></i>
                  </div>
                  <span className="px-2 py-1 bg-pastel-yellow text-slate-700 rounded text-xs font-medium">Configurado</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">8</p>
                <p className="text-sm text-slate-600">Metas Definidas</p>
              </div>
            </div>
          </section>


          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-slate-700"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Progresso das Metas</h2>
                    <p className="text-sm text-slate-500">Acompanhamento semanal e mensal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">Semana</button>
                  <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Mês</button>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-file-alt text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Leitura de Artigos</p>
                        <p className="text-xs text-slate-500">12 de 21 artigos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">57%</p>
                      <p className="text-xs text-slate-500">Faltam 9</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-blue h-3 rounded-full transition-all duration-500" style={{width: '57%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-pink rounded-lg flex items-center justify-center">
                        <i className="fas fa-video text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Vídeos & Webinars</p>
                        <p className="text-xs text-slate-500">85 de 120 minutos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">71%</p>
                      <p className="text-xs text-slate-500">Faltam 35min</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-pink h-3 rounded-full transition-all duration-500" style={{width: '71%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fas fa-podcast text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Podcasts</p>
                        <p className="text-xs text-slate-500">120 de 180 minutos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">67%</p>
                      <p className="text-xs text-slate-500">Faltam 60min</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-purple h-3 rounded-full transition-all duration-500" style={{width: '67%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <i className="fas fa-book text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">E-books</p>
                        <p className="text-xs text-slate-500">45 de 100 páginas esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">45%</p>
                      <p className="text-xs text-slate-500">Faltam 55 pág.</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-yellow h-3 rounded-full transition-all duration-500" style={{width: '45%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-pen text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Escrita de Artigos</p>
                        <p className="text-xs text-slate-500">0 de 1 artigo esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">0%</p>
                      <p className="text-xs text-slate-500">Falta 1</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-green h-3 rounded-full transition-all duration-500" style={{width: '0%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-peach rounded-lg flex items-center justify-center">
                        <i className="fas fa-robot text-slate-700 text-sm"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Agente de IA</p>
                        <p className="text-xs text-slate-500">40 de 60 minutos esta semana</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">67%</p>
                      <p className="text-xs text-slate-500">Faltam 20min</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-pastel-peach h-3 rounded-full transition-all duration-500" style={{width: '67%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-layer-group text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Progresso por Área</h2>
                  <p className="text-sm text-slate-500">Distribuição de conteúdo por segmento</p>
                </div>
              </div>

            </div>
          </section>


        </div>
      </main>
    </div>
  );
}
