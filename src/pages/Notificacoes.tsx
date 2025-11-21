import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, Settings, Plus, Filter, Globe, CheckCheck, Archive, Download, 
  ArrowRight, ChevronDown, Clock, Newspaper, Lightbulb, Gavel, Users, 
  Pen, Video, GraduationCap, Cog, Store, Award, Brain, X, MoreVertical,
  ChartPie, Tags, Zap, Calendar, User
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Notificacoes() {
  const [activeTab, setActiveTab] = useState("todas");

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Notificações</h1>
                <p className="text-sm text-slate-500 mt-1">Histórico completo de alertas, insights e lembretes</p>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/configuracoes">
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition flex items-center gap-2">
                    <Settings size={18} />
                    Configurações
                  </button>
                </Link>
                <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                  <Plus size={18} />
                  Nova Notificação
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-200 -mb-px">
              <button 
                onClick={() => setActiveTab("todas")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "todas" 
                    ? "text-slate-800 border-pastel-blue" 
                    : "text-slate-600 hover:text-slate-800 border-transparent hover:border-slate-200"
                }`}
              >
                Todas
                <span className="ml-2 px-2 py-0.5 bg-pastel-blue rounded-full text-xs">247</span>
              </button>
              <button 
                onClick={() => setActiveTab("nao-lidas")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "nao-lidas" 
                    ? "text-slate-800 border-pastel-blue" 
                    : "text-slate-600 hover:text-slate-800 border-transparent hover:border-slate-200"
                }`}
              >
                Não lidas
                <span className="ml-2 px-2 py-0.5 bg-slate-200 rounded-full text-xs">12</span>
              </button>
              <button 
                onClick={() => setActiveTab("insights")}
                className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${
                  activeTab === "insights" 
                    ? "text-slate-800 border-pastel-blue" 
                    : "text-slate-600 hover:text-slate-800 border-transparent hover:border-slate-200"
                }`}
              >
                <Lightbulb size={16} className="text-pastel-pink" />
                Insights
                <span className="px-2 py-0.5 bg-slate-200 rounded-full text-xs">8</span>
              </button>
              <button 
                onClick={() => setActiveTab("lembretes")}
                className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${
                  activeTab === "lembretes" 
                    ? "text-slate-800 border-pastel-blue" 
                    : "text-slate-600 hover:text-slate-800 border-transparent hover:border-slate-200"
                }`}
              >
                <Clock size={16} className="text-pastel-peach" />
                Lembretes
                <span className="px-2 py-0.5 bg-slate-200 rounded-full text-xs">5</span>
              </button>
              <button 
                onClick={() => setActiveTab("arquivadas")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "arquivadas" 
                    ? "text-slate-800 border-pastel-blue" 
                    : "text-slate-600 hover:text-slate-800 border-transparent hover:border-slate-200"
                }`}
              >
                Arquivadas
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3 space-y-6">
              <section className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Filtros:</span>
                  </div>
                  
                  <select className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                    <option>Todos os tipos</option>
                    <option>Conteúdo</option>
                    <option>Eventos</option>
                    <option>Cursos</option>
                    <option>Regulamentações</option>
                    <option>Comunidade</option>
                    <option>Sistema</option>
                  </select>

                  <select className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                    <option>Última semana</option>
                    <option>Hoje</option>
                    <option>Ontem</option>
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Personalizado</option>
                  </select>

                  <select className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                    <option>Todas prioridades</option>
                    <option>Alta</option>
                    <option>Média</option>
                    <option>Baixa</option>
                  </select>

                  <button className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                    <Globe size={16} />
                    Todos canais
                  </button>

                  <div className="flex-1"></div>

                  <button className="px-3 py-1.5 text-sm text-pastel-blue hover:text-slate-700 font-medium">
                    Limpar filtros
                  </button>

                  <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2">
                    <CheckCheck size={16} />
                    Marcar todas como lidas
                  </button>
                </div>
              </section>

              <section className="bg-pastel-pink rounded-xl border-2 border-pastel-pink p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Lightbulb className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">Insight Personalizado</h3>
                      <span className="px-2 py-0.5 bg-white rounded-full text-xs font-medium text-slate-700">IA</span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">Com base no seu histórico de leitura sobre <strong>Mercado de Capitais e Fundos de Investimento</strong>, identificamos 3 novos artigos que podem ser do seu interesse sobre estruturação de operações no mercado brasileiro.</p>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700">
                        Ver Recomendações
                      </button>
                      <button className="px-4 py-2 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 border border-slate-200">
                        Mais tarde
                      </button>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>
              </section>

              <div className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-2">
                    <h4 className="text-sm font-semibold text-slate-800">Hoje</h4>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-pastel-peach hover:shadow-md transition cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-peach bg-opacity-30 rounded text-xs font-medium text-slate-700">Lembrete</span>
                            <span className="text-xs text-slate-500">há 2 horas</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Finalize o curso: Análise de Risco de Crédito</h3>
                          <p className="text-sm text-slate-600 mb-3">Você está a 2 módulos de concluir o curso. Continue de onde parou e conquiste seu certificado!</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-2">
                              <div className="bg-pastel-green h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600">75%</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                          <button className="px-3 py-1.5 bg-pastel-peach text-slate-700 rounded-lg text-xs font-medium hover:bg-opacity-80">
                            Continuar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                          <Newspaper className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-blue bg-opacity-30 rounded text-xs font-medium text-slate-700">Conteúdo</span>
                            <span className="text-xs text-slate-500">há 3 horas</span>
                            <span className="w-2 h-2 bg-pastel-blue rounded-full"></span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Novo artigo: Impactos da taxa Selic na economia brasileira</h3>
                          <p className="text-sm text-slate-600">Análise completa sobre os efeitos da última decisão do Copom e perspectivas para os próximos meses.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-pastel-pink hover:shadow-md transition cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-pink bg-opacity-30 rounded text-xs font-medium text-slate-700">Insight</span>
                            <span className="px-2 py-0.5 bg-slate-800 text-white rounded text-xs font-medium">IA</span>
                            <span className="text-xs text-slate-500">há 5 horas</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Recomendação: Webinar sobre Open Finance</h3>
                          <p className="text-sm text-slate-600 mb-3">Baseado no seu interesse em APIs e sistemas de pagamento, este webinar pode agregar valor ao seu conhecimento.</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar size={14} />
                            <span>Amanhã, 15:00</span>
                            <span>•</span>
                            <User size={14} />
                            <span>Dr. Carlos Mendes</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                          <button className="px-3 py-1.5 bg-pastel-pink text-slate-700 rounded-lg text-xs font-medium hover:bg-opacity-80">
                            Inscrever-se
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-yellow/70 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Gavel className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-yellow/20 rounded text-xs font-medium text-slate-700">Regulamentação</span>
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">Alta prioridade</span>
                            <span className="text-xs text-slate-500">há 6 horas</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Bacen publica nova resolução sobre Pix</h3>
                          <p className="text-sm text-slate-600">Resolução BCB nº 287/2024 traz mudanças nos limites e regras de segurança para transferências instantâneas.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-purple bg-opacity-30 rounded text-xs font-medium text-slate-700">Comunidade</span>
                            <span className="text-xs text-slate-500">há 8 horas</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Maria Costa respondeu seu comentário</h3>
                          <p className="text-sm text-slate-600">Em: "Análise de risco em operações de crédito estruturado"</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2 px-2">
                    <h4 className="text-sm font-semibold text-slate-800">Ontem</h4>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer opacity-75">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center flex-shrink-0">
                          <Pen className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-peach bg-opacity-30 rounded text-xs font-medium text-slate-700">Lembrete</span>
                            <span className="text-xs text-slate-500">ontem às 14:30</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Complete sua avaliação do curso "Fundos de Investimento"</h3>
                          <p className="text-sm text-slate-600">Sua opinião é importante para melhorarmos nossos conteúdos.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer opacity-75">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                          <Video className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-green bg-opacity-30 rounded text-xs font-medium text-slate-700">Evento</span>
                            <span className="text-xs text-slate-500">ontem às 10:15</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Webinar: Tendências do mercado de capitais 2024</h3>
                          <p className="text-sm text-slate-600">O evento começa em 2 horas. Prepare-se!</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer opacity-75">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-blue bg-opacity-30 rounded text-xs font-medium text-slate-700">Curso</span>
                            <span className="text-xs text-slate-500">ontem às 08:00</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Novo curso disponível: Blockchain e DeFi para o Mercado Financeiro</h3>
                          <p className="text-sm text-slate-600">Aprenda sobre tecnologias descentralizadas e seu impacto no setor financeiro.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer opacity-75">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Cog className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-slate-200 rounded text-xs font-medium text-slate-700">Sistema</span>
                            <span className="text-xs text-slate-500">ontem às 07:00</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Novas funcionalidades disponíveis</h3>
                          <p className="text-sm text-slate-600">Agora você pode exportar seus certificados em PDF e compartilhar no LinkedIn.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2 px-2">
                    <h4 className="text-sm font-semibold text-slate-800">Esta semana</h4>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer opacity-75">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                          <Store className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-purple bg-opacity-30 rounded text-xs font-medium text-slate-700">Marketplace</span>
                            <span className="text-xs text-slate-500">3 dias atrás</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Promoção: 30% off em todos os eBooks</h3>
                          <p className="text-sm text-slate-600">Aproveite descontos especiais em nossa biblioteca digital até sexta-feira.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer opacity-75">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-green bg-opacity-30 rounded text-xs font-medium text-slate-700">Certificado</span>
                            <span className="text-xs text-slate-500">4 dias atrás</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Parabéns! Certificado disponível</h3>
                          <p className="text-sm text-slate-600">Você concluiu "Fundamentos de Compliance" e seu certificado está pronto.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition cursor-pointer opacity-75">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="text-slate-700" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-pastel-pink bg-opacity-30 rounded text-xs font-medium text-slate-700">Insight</span>
                            <span className="px-2 py-0.5 bg-slate-800 text-white rounded text-xs font-medium">IA</span>
                            <span className="text-xs text-slate-500">5 dias atrás</span>
                          </div>
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">Você está desenvolvendo expertise em Mercado de Capitais</h3>
                          <p className="text-sm text-slate-600">Continue explorando conteúdos avançados para se tornar especialista na área.</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center py-6">
                <button className="px-6 py-3 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <ChevronDown size={18} />
                  Carregar mais notificações
                </button>
              </div>
            </div>

            <div className="col-span-1 space-y-6">
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ChartPie size={18} className="text-slate-600" />
                  <h3 className="font-semibold text-slate-800">Resumo</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pastel-blue rounded-full"></div>
                      <span className="text-sm text-slate-600">Não lidas</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">12</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pastel-pink rounded-full"></div>
                      <span className="text-sm text-slate-600">Insights</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">8</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pastel-peach rounded-full"></div>
                      <span className="text-sm text-slate-600">Lembretes</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">5</span>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Esta semana</span>
                      <span className="text-sm font-semibold text-slate-800">47</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Este mês</span>
                      <span className="text-sm font-semibold text-slate-800">247</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tags size={18} className="text-slate-600" />
                  <h3 className="font-semibold text-slate-800">Por Tipo</h3>
                </div>

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pastel-blue rounded"></div>
                      <span className="text-sm text-slate-700">Conteúdo</span>
                    </div>
                    <span className="text-xs text-slate-500">89</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pastel-green rounded"></div>
                      <span className="text-sm text-slate-700">Eventos</span>
                    </div>
                    <span className="text-xs text-slate-500">34</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pastel-pink rounded"></div>
                      <span className="text-sm text-slate-700">Insights</span>
                    </div>
                    <span className="text-xs text-slate-500">28</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pastel-peach rounded"></div>
                      <span className="text-sm text-slate-700">Lembretes</span>
                    </div>
                    <span className="text-xs text-slate-500">21</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pastel-yellow/70 rounded"></div>
                      <span className="text-sm text-slate-700">Regulamentações</span>
                    </div>
                    <span className="text-xs text-slate-500">18</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pastel-purple rounded"></div>
                      <span className="text-sm text-slate-700">Comunidade</span>
                    </div>
                    <span className="text-xs text-slate-500">42</span>
                  </button>

                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-200 rounded"></div>
                      <span className="text-sm text-slate-700">Sistema</span>
                    </div>
                    <span className="text-xs text-slate-500">15</span>
                  </button>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={18} className="text-slate-600" />
                  <h3 className="font-semibold text-slate-800">Ações Rápidas</h3>
                </div>

                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center gap-2">
                    <CheckCheck size={16} />
                    Marcar todas como lidas
                  </button>
                  <button className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center gap-2">
                    <Archive size={16} />
                    Arquivar lidas
                  </button>
                  <button className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center gap-2">
                    <Download size={16} />
                    Exportar histórico
                  </button>
                </div>
              </section>

              <section className="bg-pastel-blue bg-opacity-20 rounded-xl border border-pastel-blue p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Settings size={18} className="text-slate-700" />
                  <h3 className="font-semibold text-slate-800">Preferências</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">Personalize como você recebe suas notificações</p>
                <Link to="/configuracoes">
                  <button className="w-full px-4 py-2 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2">
                    Configurar
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
