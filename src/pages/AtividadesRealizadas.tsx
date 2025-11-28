import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, ChevronLeft, ChevronRight, CalendarCheck, Clock, BookOpen, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AtividadesRealizadas() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/minha-agenda/dia')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Atividades Realizadas</h1>
                <p className="text-sm text-slate-500 mt-1">Histórico de atividades concluídas</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar esquerda */}
            <aside className="w-80 space-y-6">
              {/* Mini Calendar */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Novembro 2024</h2>
                  <div className="flex gap-2">
                    <button className="p-1 text-slate-600 hover:bg-slate-100 rounded transition">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="p-1 text-slate-600 hover:bg-slate-100 rounded transition">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-600 mb-2">
                  <div className="py-1 font-medium">D</div>
                  <div className="py-1 font-medium">S</div>
                  <div className="py-1 font-medium">T</div>
                  <div className="py-1 font-medium">Q</div>
                  <div className="py-1 font-medium">Q</div>
                  <div className="py-1 font-medium">S</div>
                  <div className="py-1 font-medium">S</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {[27, 28, 29, 30, 31].map(day => (
                    <div key={`prev-${day}`} className="py-1 text-slate-400 text-xs">{day}</div>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                    <div 
                      key={`curr-${day}`}
                      className={`py-1 text-xs cursor-pointer rounded ${
                        day === 19 
                          ? 'bg-pastel-blue text-white font-semibold' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                  {[1, 2, 3, 4, 5, 6, 7].map(day => (
                    <div key={`next-${day}`} className="py-1 text-slate-400 text-xs">{day}</div>
                  ))}
                </div>
              </section>

              {/* Summary Card */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Resumo</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                        <CalendarCheck size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Total Realizadas</span>
                    </div>
                    <span className="font-semibold text-slate-800">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <Clock size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Horas Totais</span>
                    </div>
                    <span className="font-semibold text-slate-800">18h 45m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-rose rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Estudos</span>
                    </div>
                    <span className="font-semibold text-slate-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Reuniões</span>
                    </div>
                    <span className="font-semibold text-slate-800">8</span>
                  </div>
                </div>
              </section>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Lista de Atividades */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Lista de Atividades</h2>
                <div className="space-y-3">
                  {/* Event 1 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-rose hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-rose rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-rose rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-podcast text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Podcast: Análise Macroeconômica</h4>
                      <p className="text-xs text-slate-900 mt-1">08:00 - 08:45 • Episódio: Juros e Inflação 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Concluído</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-blue hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-blue rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-users text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Reunião: Revisão de Portfólio</h4>
                      <p className="text-xs text-slate-900 mt-1">09:30 - 10:30 • Sala de Reuniões 2</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Concluído</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-rose hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-rose rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-rose rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-book-open text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Estudo: Fundos de Investimento</h4>
                      <p className="text-xs text-slate-900 mt-1">11:00 - 12:00 • Capítulo 5: Renda Variável</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Concluído</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 4 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-purple hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-purple rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-graduation-cap text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Treinamento: Compliance Bancário</h4>
                      <p className="text-xs text-slate-900 mt-1">14:00 - 15:00 • Módulo 3: Prevenção à Lavagem</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Concluído</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 5 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-rose hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-rose rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-rose rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-video text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Vídeo: Análise de Crédito</h4>
                      <p className="text-xs text-slate-900 mt-1">15:30 - 16:15 • Curso: Gestão de Risco</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Concluído</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 6 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-green hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-green rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-chart-line text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Análise: Indicadores Econômicos</h4>
                      <p className="text-xs text-slate-900 mt-1">16:30 - 17:15 • Relatório Semanal</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Concluído</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 7 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-blue hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-blue rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-file-alt text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Revisão: Políticas de Crédito</h4>
                      <p className="text-xs text-slate-900 mt-1">17:30 - 18:30 • Compliance Trimestral</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Concluído</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
