import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, ChevronLeft, ChevronRight, CalendarCheck, Clock, BookOpen, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MinhaAgendaDia() {
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Agenda do Dia</h1>
              <p className="text-sm text-slate-500 mt-1">Terça-feira, 19 de Novembro de 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setShowGoogleModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
              >
                <i className="fab fa-google text-pastel-blue"></i>
                <span>Conectar Google Calendar</span>
              </button>
              <button 
                onClick={() => setShowAddEventModal(true)}
                className="px-4 py-2 bg-pastel-purple text-white rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                <i className="fas fa-plus mr-2"></i>
                Novo Evento
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar esquerda */}
            <aside className="w-80 space-y-6 sticky top-8 self-start">
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

              {/* Daily Summary */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Resumo do Dia</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <CalendarCheck size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Total de Eventos</span>
                    </div>
                    <span className="font-semibold text-slate-800">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                        <Clock size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Horas Agendadas</span>
                    </div>
                    <span className="font-semibold text-slate-800">6h 30m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-rose rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Estudos</span>
                    </div>
                    <span className="font-semibold text-slate-800">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Reuniões</span>
                    </div>
                    <span className="font-semibold text-slate-800">2</span>
                  </div>
                </div>
              </section>

              {/* Upcoming Days */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Próximos Dias</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Quarta, 20 Nov</p>
                      <p className="text-xs text-slate-500 mt-1">5 eventos agendados</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Quinta, 21 Nov</p>
                      <p className="text-xs text-slate-500 mt-1">3 eventos agendados</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Sexta, 22 Nov</p>
                      <p className="text-xs text-slate-500 mt-1">6 eventos agendados</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                </div>
              </section>
            </aside>

            {/* Main Calendar Area */}
            <div className="flex-1 space-y-6">
              {/* Day View Header */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                      <ChevronLeft size={20} />
                    </button>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">Terça-feira, 19 de Novembro</h2>
                      <p className="text-sm text-slate-500 mt-1">8 atividades agendadas</p>
                    </div>
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate('/minha-agenda')}
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition font-medium"
                    >
                      Mês
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition font-medium">
                      Semana
                    </button>
                    <button className="px-4 py-2 bg-pastel-green text-white rounded-lg text-sm font-medium">
                      Dia
                    </button>
                  </div>
                </div>
              </section>

              {/* Timeline View */}
              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex">
                  {/* Time Column */}
                  <div className="w-24 border-r border-slate-200 bg-slate-50">
                    <div className="h-16 border-b border-slate-200"></div>
                    {['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map((time) => (
                      <div key={time} className="h-20 border-b border-slate-200 flex items-start justify-end pr-3 pt-2">
                        <span className="text-xs text-slate-500 font-medium">{time}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Events Column */}
                  <div className="flex-1 relative">
                    <div className="h-16 border-b border-slate-200 flex items-center px-4 bg-slate-50">
                      <span className="text-sm font-semibold text-slate-700">Terça-feira, 19 Nov</span>
                    </div>
                    
                    <div className="relative">
                      {[...Array(14)].map((_, i) => (
                        <div key={i} className="h-20 border-b border-slate-100"></div>
                      ))}
                      
                      {/* Event 1 - 08:00 */}
                      <div className="absolute top-[40px] left-3 right-3 h-[75px] bg-pastel-rose rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-podcast text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">08:00 - 08:45</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Podcast: Análise Macroeconômica</h4>
                            <p className="text-xs text-slate-900 leading-tight">Episódio: Juros e Inflação 2024</p>
                          </div>
                          <i className="fas fa-headphones text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      {/* Event 2 - 09:30 */}
                      <div className="absolute top-[180px] left-3 right-3 h-[75px] bg-pastel-blue rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-users text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">09:30 - 10:30</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Reunião: Revisão de Portfólio</h4>
                            <p className="text-xs text-slate-900 leading-tight">Sala de Reuniões 2</p>
                          </div>
                          <i className="fas fa-video text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      {/* Event 3 - 11:00 */}
                      <div className="absolute top-[280px] left-3 right-3 h-[75px] bg-pastel-rose rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-book-open text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">11:00 - 12:00</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Estudo: Fundos de Investimento</h4>
                            <p className="text-xs text-slate-900 leading-tight">Capítulo 5: Renda Variável</p>
                          </div>
                          <i className="fas fa-bookmark text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      {/* Event 4 - 14:00 */}
                      <div className="absolute top-[460px] left-3 right-3 h-[75px] bg-pastel-purple rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-graduation-cap text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">14:00 - 15:00</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Treinamento: Compliance Bancário</h4>
                            <p className="text-xs text-slate-900 leading-tight">Módulo 3: Prevenção à Lavagem</p>
                          </div>
                          <i className="fas fa-certificate text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      {/* Event 5 - 15:30 */}
                      <div className="absolute top-[560px] left-3 right-3 h-[75px] bg-pastel-rose rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-video text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">15:30 - 16:15</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Vídeo: Análise de Crédito</h4>
                            <p className="text-xs text-slate-900 leading-tight">Curso: Gestão de Risco</p>
                          </div>
                          <i className="fas fa-play-circle text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      {/* Event 6 - 16:30 */}
                      <div className="absolute top-[660px] left-3 right-3 h-[75px] bg-pastel-green rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-desktop text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">16:30 - 17:30</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Webinar: Tendências do Mercado</h4>
                            <p className="text-xs text-slate-900 leading-tight">Especialista: Dr. Carlos Mendes</p>
                          </div>
                          <i className="fas fa-signal text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      {/* Event 7 - 18:00 */}
                      <div className="absolute top-[760px] left-3 right-3 h-[75px] bg-pastel-rose rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-podcast text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">18:00 - 18:30</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Podcast: Mercado de Capitais</h4>
                            <p className="text-xs text-slate-900 leading-tight">Episódio: IPOs e Ofertas Públicas</p>
                          </div>
                          <i className="fas fa-headphones text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      {/* Event 8 - 19:00 */}
                      <div className="absolute top-[860px] left-3 right-3 h-[75px] bg-pastel-rose rounded-lg px-4 py-3 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-shrink-0">
                            <i className="fas fa-book-open text-slate-700 text-sm"></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-slate-900">19:00 - 19:45</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-0.5 leading-tight">Leitura: Artigo Técnico</h4>
                            <p className="text-xs text-slate-900 leading-tight">Tema: ESG e Finanças Sustentáveis</p>
                          </div>
                          <i className="fas fa-file-alt text-slate-700 text-sm flex-shrink-0"></i>
                        </div>
                      </div>

                      <div className="h-20 border-b border-slate-100"></div>
                      <div className="h-20"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Event List */}
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
                      <span className="px-3 py-1 bg-pastel-rose bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Estudo</span>
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
                      <span className="px-3 py-1 bg-pastel-blue bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Reunião</span>
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
                      <span className="px-3 py-1 bg-pastel-rose bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Estudo</span>
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
                      <span className="px-3 py-1 bg-pastel-purple bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Treinamento</span>
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
                      <span className="px-3 py-1 bg-pastel-rose bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Estudo</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 6 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-green hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-green rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-desktop text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Webinar: Tendências do Mercado</h4>
                      <p className="text-xs text-slate-900 mt-1">16:30 - 17:30 • Especialista: Dr. Carlos Mendes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Webinar</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 7 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-rose hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-rose rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-rose rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-podcast text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Podcast: Mercado de Capitais</h4>
                      <p className="text-xs text-slate-900 mt-1">18:00 - 18:30 • Episódio: IPOs e Ofertas Públicas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-rose bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Estudo</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>

                  {/* Event 8 */}
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-pastel-rose hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-1 h-16 bg-pastel-rose rounded-full"></div>
                    <div className="w-12 h-12 bg-pastel-rose rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-book-open text-slate-700"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">Leitura: Artigo Técnico</h4>
                      <p className="text-xs text-slate-900 mt-1">19:00 - 19:45 • Tema: ESG e Finanças Sustentáveis</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-pastel-rose bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">Estudo</span>
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

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Novo Evento</h3>
              <button 
                onClick={() => setShowAddEventModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título do Evento</label>
                <input type="text" placeholder="Ex: Reunião de Compliance" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Data de Início</label>
                  <input type="date" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Horário de Início</label>
                  <input type="time" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Data de Término</label>
                  <input type="date" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Horário de Término</label>
                  <input type="time" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Atividade</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Reunião</option>
                  <option>Treinamento</option>
                  <option>Webinar</option>
                  <option>Estudo - Podcast</option>
                  <option>Estudo - Vídeo</option>
                  <option>Estudo - Leitura</option>
                  <option>Evento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                <textarea rows={4} placeholder="Adicione detalhes sobre o evento..." className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Localização / Link</label>
                <input type="text" placeholder="Ex: Sala de Reuniões 3 ou Link da videoconferência" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="reminder" className="w-4 h-4 rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                <label htmlFor="reminder" className="text-sm text-slate-700">Enviar lembrete 15 minutos antes</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-pastel-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition">
                  Criar Evento
                </button>
                <button 
                  onClick={() => setShowAddEventModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Calendar Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-google text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Conectar Google Calendar</h3>
              <p className="text-sm text-slate-500">Sincronize seus eventos e compromissos automaticamente</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <i className="fas fa-check-circle text-pastel-green mt-1"></i>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Sincronização bidirecional</p>
                    <p className="text-xs text-slate-500 mt-1">Eventos criados aqui aparecem no Google Calendar e vice-versa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <i className="fas fa-check-circle text-pastel-green mt-1"></i>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Notificações integradas</p>
                    <p className="text-xs text-slate-500 mt-1">Receba lembretes em todos os seus dispositivos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-pastel-green mt-1"></i>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Dados seguros</p>
                    <p className="text-xs text-slate-500 mt-1">Sua privacidade é protegida com criptografia</p>
                  </div>
                </div>
              </div>
              <button className="w-full px-4 py-3 bg-pastel-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-2">
                <i className="fab fa-google"></i>
                <span>Conectar com Google</span>
              </button>
              <button 
                onClick={() => setShowGoogleModal(false)}
                className="w-full px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
