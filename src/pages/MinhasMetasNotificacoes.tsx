import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Check, Bell, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MinhasMetasNotificacoes() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Preferências de Notificações</h1>
                <p className="text-sm text-slate-500 mt-1">Configure como e quando deseja ser notificado sobre novos conteúdos</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/minhas-metas/areas')} className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                  <ArrowLeft className="inline w-4 h-4 mr-2" />
                  Voltar
                </button>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-check mr-2"></i>
                  Salvar e Finalizar
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="text-pastel-blue w-3 h-3" />
                </div>
                <span className="text-sm text-slate-600">Tipo de Conteúdo</span>
              </div>
              <div className="h-0.5 w-8 bg-pastel-purple"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="text-pastel-blue w-3 h-3" />
                </div>
                <span className="text-sm text-slate-600">Áreas & Tags</span>
              </div>
              <div className="h-0.5 w-8 bg-pastel-purple"></div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-pastel-purple rounded-full">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-semibold text-slate-700">3</div>
                <span className="text-sm font-medium text-slate-700">Notificações</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Canais de Notificação */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <Bell className="text-slate-700 w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Canais de Notificação</h2>
                  <p className="text-sm text-slate-500">Escolha como deseja receber as atualizações</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 border-2 border-pastel-blue bg-white rounded-xl cursor-pointer hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-envelope text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">E-mail</h3>
                        <p className="text-xs text-slate-500">Resumos periódicos</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-blue relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">Receba resumos diários ou semanais dos novos conteúdos nas suas áreas de interesse.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium text-slate-700">joao.silva@email.com</span>
                  </div>
                </div>

                <div className="p-5 border-2 border-pastel-green bg-white rounded-xl cursor-pointer hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-mobile-alt text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">Push</h3>
                        <p className="text-xs text-slate-500">Notificações em tempo real</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-green relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">Alertas instantâneos no navegador e dispositivos móveis sobre conteúdos importantes.</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium text-slate-700">3 dispositivos conectados</span>
                  </div>
                </div>

                <div className="p-5 border-2 border-slate-200 rounded-xl cursor-pointer hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fab fa-whatsapp text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">WhatsApp</h3>
                        <p className="text-xs text-slate-500">Mensagens diretas</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-green relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">Receba resumos e alertas importantes diretamente no seu WhatsApp.</p>
                  <button className="px-3 py-1.5 bg-slate-100 rounded text-xs font-medium text-slate-700 hover:bg-slate-200 transition">
                    <i className="fas fa-plus mr-1"></i>
                    Conectar número
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Frequência de Notificações */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                  <Clock className="text-slate-700 w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Frequência de Notificações</h2>
                  <p className="text-sm text-slate-500">Defina com que frequência deseja ser notificado</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-slate-800">Resumo por E-mail</label>
                    <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium">Ativo</span>
                  </div>
                  <select className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat mb-3">
                    <option>Em tempo real</option>
                    <option selected>Diário (8h da manhã)</option>
                    <option>A cada 2 dias</option>
                    <option>Semanal (Segunda-feira)</option>
                    <option>Quinzenal</option>
                    <option>Mensal</option>
                  </select>
                  <p className="text-xs text-slate-500">Próximo envio: Amanhã às 8h00</p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-slate-800">Notificações Push</label>
                    <span className="px-2 py-1 bg-pastel-green text-slate-700 rounded text-xs font-medium">Ativo</span>
                  </div>
                  <select className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pastel-purple appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUwxMSAxLjUiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat mb-3">
                    <option selected>Instantâneo (conteúdo prioritário)</option>
                    <option>A cada 2 horas</option>
                    <option>A cada 4 horas</option>
                    <option>Diário (resumo)</option>
                    <option>Apenas urgentes</option>
                  </select>
                  <p className="text-xs text-slate-500">Últimas 24h: 8 notificações enviadas</p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-slate-800">Horário Silencioso</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-purple relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">Das</label>
                      <input type="time" defaultValue="22:00" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">Até</label>
                      <input type="time" defaultValue="07:00" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Não enviar notificações neste período</p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-slate-800">Finais de Semana</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-purple relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">Pausar notificações aos sábados e domingos</p>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input type="checkbox" className="rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                      Sábado
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input type="checkbox" className="rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                      Domingo
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tipos de Notificações */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <i className="fas fa-list-check text-slate-700"></i>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Tipos de Notificações</h2>
                  <p className="text-sm text-slate-500">Escolha sobre o que deseja ser notificado</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Novos Conteúdos */}
                <div className="p-5 border-2 border-pastel-blue bg-white rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-newspaper text-slate-700"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-slate-800">Novos Conteúdos</h3>
                          <span className="px-2 py-0.5 bg-pastel-blue text-slate-700 rounded text-xs font-medium">Prioridade Alta</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Seja notificado quando novos artigos, vídeos ou podcasts forem publicados nas suas áreas de interesse.</p>
                        <div className="flex flex-wrap gap-2">
                          {['Artigos', 'Vídeos', 'Podcasts', 'E-books', 'Webinars'].map((item, idx) => (
                            <label key={item} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition">
                              <input type="checkbox" defaultChecked={idx !== 3} className="rounded border-slate-300 text-pastel-blue focus:ring-pastel-blue" />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-blue relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Progresso de Metas */}
                <div className="p-5 border-2 border-pastel-purple bg-white rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-target text-slate-700"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-slate-800">Progresso de Metas</h3>
                          <span className="px-2 py-0.5 bg-pastel-purple text-slate-700 rounded text-xs font-medium">Prioridade Alta</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Acompanhe seu progresso e receba lembretes para cumprir suas metas de aprendizado.</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: 'Metas atingidas', checked: true },
                            { name: 'Lembretes diários', checked: true },
                            { name: 'Relatórios semanais', checked: false },
                            { name: 'Conquistas', checked: true }
                          ].map((item) => (
                            <label key={item.name} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition">
                              <input type="checkbox" defaultChecked={item.checked} className="rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                              <span>{item.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-purple relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Recomendações IA */}
                <div className="p-5 border-2 border-pastel-green bg-white rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-robot text-slate-700"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-slate-800">Recomendações IA</h3>
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs font-medium">Prioridade Média</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Receba sugestões personalizadas de conteúdo com base no seu perfil e histórico de aprendizado.</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: 'Sugestões diárias', checked: true },
                            { name: 'Tendências do mercado', checked: true },
                            { name: 'Conteúdo similar', checked: false }
                          ].map((item) => (
                            <label key={item.name} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition">
                              <input type="checkbox" defaultChecked={item.checked} className="rounded border-slate-300 text-pastel-green focus:ring-pastel-green" />
                              <span>{item.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-green relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Comunidade & Interações */}
                <div className="p-5 border-2 border-slate-200 bg-white rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-comments text-slate-700"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-slate-800">Comunidade & Interações</h3>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs font-medium">Prioridade Baixa</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Fique atualizado sobre comentários, menções e atividades na comunidade.</p>
                        <div className="flex flex-wrap gap-2">
                          {['Comentários', 'Menções', 'Novos seguidores'].map((item) => (
                            <label key={item} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition">
                              <input type="checkbox" className="rounded border-slate-300 text-pastel-yellow focus:ring-pastel-yellow" />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-yellow relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Marketplace & Ofertas */}
                <div className="p-5 border-2 border-slate-200 bg-white rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-store text-slate-700"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-slate-800">Marketplace & Ofertas</h3>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs font-medium">Prioridade Baixa</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Receba alertas sobre novos cursos, promoções e conteúdos premium.</p>
                        <div className="flex flex-wrap gap-2">
                          {['Novos cursos', 'Promoções', 'Lançamentos'].map((item) => (
                            <label key={item} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition">
                              <input type="checkbox" className="rounded border-slate-300 text-pastel-peach focus:ring-pastel-peach" />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-pastel-peach relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Sistema & Atualizações */}
                <div className="p-5 border-2 border-slate-200 bg-white rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-cog text-slate-700"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-semibold text-slate-800">Sistema & Atualizações</h3>
                          <span className="px-2 py-0.5 bg-pastel-pink text-slate-700 rounded text-xs font-medium">Essencial</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Informações importantes sobre atualizações da plataforma, segurança e conta.</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: 'Atualizações críticas', disabled: true },
                            { name: 'Segurança', disabled: true },
                            { name: 'Novas funcionalidades', disabled: false }
                          ].map((item) => (
                            <label key={item.name} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition">
                              <input type="checkbox" defaultChecked disabled={item.disabled} className="rounded border-slate-300 text-pastel-pink focus:ring-pastel-pink" />
                              <span>{item.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" defaultChecked disabled className="sr-only peer" />
                      <div className="w-11 h-6 bg-pastel-pink rounded-full peer-focus:outline-none peer-checked:bg-pastel-pink opacity-50 relative">
                        <div className="absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prévia de Notificações */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <Eye className="text-slate-700 w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Prévia de Notificações</h2>
                  <p className="text-sm text-slate-500">Veja como suas notificações aparecerão</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-pastel-blue bg-opacity-10 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fas fa-envelope text-pastel-blue"></i>
                    <h3 className="text-sm font-semibold text-slate-800">E-mail</h3>
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 p-4 text-xs">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-pastel-blue rounded flex items-center justify-center">
                        <i className="fas fa-chart-line text-slate-700 text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">FinLearn</p>
                        <p className="text-slate-500 text-xs">Seu resumo diário</p>
                      </div>
                    </div>
                    <p className="font-semibold text-slate-800 mb-2">5 novos artigos em Gestão de Riscos</p>
                    <p className="text-slate-600 mb-3">Olá João! Confira os destaques de hoje nas suas áreas de interesse...</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-pastel-blue rounded-full mt-1.5"></div>
                        <p className="text-slate-600 leading-relaxed">Basileia III: Novas diretrizes para 2024</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-pastel-blue rounded-full mt-1.5"></div>
                        <p className="text-slate-600 leading-relaxed">Gestão de risco operacional em fintechs</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-pastel-blue bg-opacity-10 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fas fa-mobile-alt text-pastel-green"></i>
                    <h3 className="text-sm font-semibold text-slate-800">Push Notification</h3>
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-chart-line text-slate-700"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs font-semibold text-slate-800">FinLearn</p>
                          <span className="text-xs text-slate-400">agora</span>
                        </div>
                        <p className="text-xs font-medium text-slate-800 mb-1">Novo artigo: Tendências em Open Banking</p>
                        <p className="text-xs text-slate-600">APIs, compartilhamento de dados e inovação no setor financeiro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Enviar Teste
                </button>
                <button className="px-4 py-2 text-sm text-pastel-blue border border-pastel-blue rounded-lg font-medium hover:bg-pastel-blue hover:bg-opacity-10 transition">
                  <i className="fas fa-edit mr-2"></i>
                  Personalizar Modelo
                </button>
              </div>
            </div>
          </section>

          {/* Ações Finais */}
          <section className="bg-white rounded-2xl border-2 border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">3</p>
                  <p className="text-xs text-slate-500 mt-1">Canais Ativos</p>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-800">5</p>
                  <p className="text-xs text-slate-500 mt-1">Tipos de Notificação</p>
                </div>
                <div className="h-12 w-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <i className="fas fa-check-circle text-pastel-green text-2xl"></i>
                    <p className="text-sm font-semibold text-slate-800">Configuração Completa</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Tudo pronto para começar</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/minhas-metas/areas')} className="px-5 py-3 text-slate-600 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition">
                  <ArrowLeft className="inline w-4 h-4 mr-2" />
                  Voltar
                </button>
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-pastel-purple text-slate-700 rounded-xl font-medium hover:bg-opacity-80 transition shadow-sm">
                  <i className="fas fa-check mr-2"></i>
                  Salvar e Começar
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
