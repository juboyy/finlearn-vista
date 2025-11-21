import { Home, Newspaper, Bot, GraduationCap, Book, MessageCircle, Store, Users, TrendingUp, Target, Rocket, Flame, Crown, Sliders, Video, Podcast, BookOpen, ChevronRight, Info } from "lucide-react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

export default function MinhasMetas() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Configurar Metas de Aprendizado</h1>
                <p className="text-sm text-slate-500 mt-1">Configure seus objetivos de forma simples e intuitiva</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                  <i className="fas fa-undo mr-2"></i>
                  Cancelar
                </button>
                <button className="px-6 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-check mr-2"></i>
                  Salvar Configurações
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-pastel-blue rounded-full">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-semibold text-slate-700">1</div>
                <span className="text-sm font-medium text-slate-700">Tipo de Conteúdo</span>
              </div>
              <div className="h-0.5 w-8 bg-slate-200"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-semibold text-slate-500">2</div>
                <span className="text-sm text-slate-500">Áreas & Tags</span>
              </div>
              <div className="h-0.5 w-8 bg-slate-200"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-semibold text-slate-500">3</div>
                <span className="text-sm text-slate-500">Notificações</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <section className="mb-12">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Configuração Rápida</h2>
              <p className="text-sm text-slate-500 mt-1">Escolha um modelo pré-definido ou personalize suas metas</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 text-left hover:shadow-lg hover:border-pastel-blue transition-all cursor-pointer group">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-pastel-blue rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Rocket className="text-slate-700 w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-lg mb-2">Iniciante</h3>
                    <p className="text-sm text-slate-500">2h/semana de estudo</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <i className="fas fa-check-circle text-pastel-blue"></i>
                      <span>Ideal para começar</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 text-left hover:shadow-lg hover:border-pastel-green transition-all cursor-pointer group">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-pastel-green rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Flame className="text-slate-700 w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-lg mb-2">Intermediário</h3>
                    <p className="text-sm text-slate-500">5h/semana de estudo</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <i className="fas fa-check-circle text-pastel-green"></i>
                      <span>Crescimento consistente</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 text-left hover:shadow-lg hover:border-pastel-purple transition-all cursor-pointer group">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-pastel-purple rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Crown className="text-slate-700 w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-lg mb-2">Avançado</h3>
                    <p className="text-sm text-slate-500">10h/semana de estudo</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <i className="fas fa-check-circle text-pastel-purple"></i>
                      <span>Máximo desempenho</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-pastel-yellow p-6 text-left hover:shadow-lg transition-all cursor-pointer">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 bg-pastel-yellow rounded-xl flex items-center justify-center mb-4">
                      <Sliders className="text-slate-700 w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-lg mb-2">Personalizado</h3>
                    <p className="text-sm text-slate-500">Configure manualmente</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <i className="fas fa-check-circle text-pastel-yellow"></i>
                      <span>Totalmente flexível</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Escolha seus Objetivos</h2>
                <p className="text-sm text-slate-500 mt-1">Selecione os tipos de conteúdo e defina suas metas</p>
              </div>
              <button className="px-4 py-2 text-pastel-purple border-2 border-pastel-purple rounded-lg font-medium hover:bg-pastel-purple hover:bg-opacity-20 transition">
                <i className="fas fa-magic mr-2"></i>
                Sugestão Inteligente
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Leitura de Artigos */}
              <div className="bg-white rounded-2xl border-2 border-pastel-blue p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-blue rounded-xl flex items-center justify-center">
                      <Newspaper className="text-slate-700 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Leitura de Artigos</h3>
                      <p className="text-xs text-slate-500">Mantenha-se atualizado</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pastel-blue"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Diária</span>
                      <span className="text-xs text-slate-500">Por dia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="3" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>artigos completos</option>
                        <option>minutos de leitura</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Semanal</span>
                      <span className="text-xs text-slate-500">Por semana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="15" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>artigos completos</option>
                        <option>minutos de leitura</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Mensal</span>
                      <span className="text-xs text-slate-500">Por mês</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="60" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>artigos completos</option>
                        <option>minutos de leitura</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tempo estimado semanal:</span>
                    <span className="font-semibold text-slate-800">~2h 30min</span>
                  </div>
                </div>
              </div>

              {/* Assistir Vídeos */}
              <div className="bg-white rounded-2xl border-2 border-pastel-green p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-green rounded-xl flex items-center justify-center">
                      <Video className="text-slate-700 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Assistir Vídeos</h3>
                      <p className="text-xs text-slate-500">Aprenda visualmente</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pastel-green"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Diária</span>
                      <span className="text-xs text-slate-500">Por dia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="30" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-green" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-green">
                        <option>minutos de vídeo</option>
                        <option>vídeos completos</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Semanal</span>
                      <span className="text-xs text-slate-500">Por semana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="180" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-green" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-green">
                        <option>minutos de vídeo</option>
                        <option>vídeos completos</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Mensal</span>
                      <span className="text-xs text-slate-500">Por mês</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="720" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-green" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-green">
                        <option>minutos de vídeo</option>
                        <option>vídeos completos</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tempo estimado semanal:</span>
                    <span className="font-semibold text-slate-800">~3h 00min</span>
                  </div>
                </div>
              </div>

              {/* Ouvir Podcasts */}
              <div className="bg-white rounded-2xl border-2 border-pastel-purple p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-purple rounded-xl flex items-center justify-center">
                      <Podcast className="text-slate-700 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Ouvir Podcasts</h3>
                      <p className="text-xs text-slate-500">Aprenda em movimento</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pastel-purple"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Diária</span>
                      <span className="text-xs text-slate-500">Por dia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="20" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                        <option>minutos de áudio</option>
                        <option>episódios completos</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Semanal</span>
                      <span className="text-xs text-slate-500">Por semana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="120" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                        <option>minutos de áudio</option>
                        <option>episódios completos</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Mensal</span>
                      <span className="text-xs text-slate-500">Por mês</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="480" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                        <option>minutos de áudio</option>
                        <option>episódios completos</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tempo estimado semanal:</span>
                    <span className="font-semibold text-slate-800">~2h 00min</span>
                  </div>
                </div>
              </div>

              {/* Ler E-books */}
              <div className="bg-white rounded-2xl border-2 border-pastel-yellow p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-yellow rounded-xl flex items-center justify-center">
                      <BookOpen className="text-slate-700 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Ler E-books</h3>
                      <p className="text-xs text-slate-500">Aprofunde conhecimento</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pastel-yellow"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Diária</span>
                      <span className="text-xs text-slate-500">Por dia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="15" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-yellow" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-yellow">
                        <option>minutos de leitura</option>
                        <option>páginas</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Semanal</span>
                      <span className="text-xs text-slate-500">Por semana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="90" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-yellow" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-yellow">
                        <option>minutos de leitura</option>
                        <option>páginas</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Mensal</span>
                      <span className="text-xs text-slate-500">Por mês</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="2" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-yellow" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-yellow">
                        <option>e-books completos</option>
                        <option>páginas</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tempo estimado semanal:</span>
                    <span className="font-semibold text-slate-800">~1h 30min</span>
                  </div>
                </div>
              </div>

              {/* Agente IA */}
              <div className="bg-white rounded-2xl border-2 border-pastel-pink p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-pink rounded-xl flex items-center justify-center">
                      <Bot className="text-slate-700 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Agente IA</h3>
                      <p className="text-xs text-slate-500">Tire dúvidas e explore</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pastel-pink"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Diária</span>
                      <span className="text-xs text-slate-500">Por dia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="10" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-pink" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-pink">
                        <option>minutos de conversa</option>
                        <option>interações</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Semanal</span>
                      <span className="text-xs text-slate-500">Por semana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="60" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-pink" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-pink">
                        <option>minutos de conversa</option>
                        <option>interações</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Mensal</span>
                      <span className="text-xs text-slate-500">Por mês</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="240" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-pink" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-pink">
                        <option>minutos de conversa</option>
                        <option>interações</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tempo estimado semanal:</span>
                    <span className="font-semibold text-slate-800">~1h 00min</span>
                  </div>
                </div>
              </div>

              {/* Webinars ao Vivo */}
              <div className="bg-white rounded-2xl border-2 border-pastel-peach p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-peach rounded-xl flex items-center justify-center">
                      <i className="fas fa-chalkboard-teacher text-slate-700"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Webinars ao Vivo</h3>
                      <p className="text-xs text-slate-500">Participe e interaja</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pastel-peach"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Semanal</span>
                      <span className="text-xs text-slate-500">Por semana</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="1" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-peach" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-peach">
                        <option>webinars completos</option>
                        <option>horas de participação</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Meta Mensal</span>
                      <span className="text-xs text-slate-500">Por mês</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue="4" className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pastel-peach" />
                      <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-peach">
                        <option>webinars completos</option>
                        <option>horas de participação</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-pastel-peach bg-opacity-20 rounded-xl border border-pastel-peach">
                    <div className="flex items-center gap-2">
                      <Info className="text-slate-600 w-4 h-4 flex-shrink-0" />
                      <p className="text-xs text-slate-600">Webinars são eventos ao vivo. Você receberá lembretes antes de cada sessão.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Tempo estimado semanal:</span>
                    <span className="font-semibold text-slate-800">~1h 30min</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Resumo Semanal</h3>
                <p className="text-sm text-slate-500">Baseado nas metas ativas selecionadas</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">11h</p>
                  <p className="text-xs text-slate-500 mt-1">Tempo Total</p>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">5</p>
                  <p className="text-xs text-slate-500 mt-1">Tipos Ativos</p>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <button className="px-6 py-3 bg-pastel-purple text-slate-700 rounded-xl font-medium hover:bg-opacity-80 transition">
                  <ChevronRight className="inline w-4 h-4 mr-2" />
                  Próximo Passo
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
