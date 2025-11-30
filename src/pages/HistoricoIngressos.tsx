import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Filter, Download, CalendarCheck, Award, Clock, Wallet, Search, MapPin, User, CheckCircle, Utensils, Video, FileText, Play, Images, Network, Gift, Star, ChevronDown, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HistoricoIngressos() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <button 
                    onClick={() => navigate('/meus-ingressos')}
                    className="text-slate-400 hover:text-slate-600 text-sm flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar para Meus Ingressos
                  </button>
                </div>
                <h1 className="text-3xl font-bold text-slate-800">Histórico de Ingressos</h1>
                <p className="text-slate-600 mt-1">Visualize todos os eventos que você participou e seus certificados.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filtrar
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" /> Exportar PDF
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Total de Eventos</span>
                  <CalendarCheck className="text-pastel-purple w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">27</p>
                <span className="text-xs text-slate-400">Desde 2022</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Certificados</span>
                  <Award className="text-pastel-blue w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">23</p>
                <span className="text-xs text-slate-400">Disponíveis</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Horas Totais</span>
                  <Clock className="text-pastel-green w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">142h</p>
                <span className="text-xs text-slate-400">De participação</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Investimento</span>
                  <Wallet className="text-pastel-yellow w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">R$ 8.450</p>
                <span className="text-xs text-slate-400">Em capacitação</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar eventos..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200">
                <option>Todos os anos</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200">
                <option>Todos os tipos</option>
                <option>Conferência</option>
                <option>Workshop</option>
                <option>Seminário</option>
                <option>Fórum</option>
              </select>
            </div>
          </header>

          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">2024</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            {/* Ticket History 1 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-16 bg-pastel-pink/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-xl font-bold text-slate-700">15</span>
                  <span className="text-[10px] text-slate-500 uppercase">Nov</span>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-pastel-pink text-slate-700 text-[10px] font-semibold rounded-md">Seminário</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md">Presencial</span>
                        <span className="text-[10px] text-slate-400">Pedido #848902</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Regulação do Mercado Financeiro 2024</h3>
                      <p className="text-xs text-slate-600 mb-2">Análise das novas diretrizes regulatórias e impactos no setor financeiro brasileiro.</p>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Hotel Maksoud Plaza</p>
                            <p className="text-[10px] text-slate-500">São Paulo, SP</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">09:00 - 18:00</p>
                            <p className="text-[10px] text-slate-500">8 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Ingresso VIP</p>
                            <p className="text-[10px] text-slate-500">R$ 850,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <User className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="text-green-500 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Check-in realizado às 08:47</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Utensils className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Coffee break e almoço inclusos</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition flex items-center gap-1.5 whitespace-nowrap">
                        <Award className="w-3 h-3" /> Certificado
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5">
                        <Download className="w-3 h-3" /> Baixar
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">Palestrantes:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-5 h-5 rounded-full object-cover" alt="speaker" />
                          <span className="text-slate-700 font-medium">Dr. Carlos Mendes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-5 h-5 rounded-full object-cover" alt="speaker" />
                          <span className="text-slate-700 font-medium">Dra. Ana Paula Silva</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="text-slate-400 w-3 h-3" />
                        <span className="text-slate-600">245 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket History 2 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-16 bg-pastel-peach/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-xl font-bold text-slate-700">02</span>
                  <span className="text-[10px] text-slate-500 uppercase">Nov</span>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-pastel-peach text-slate-700 text-[10px] font-semibold rounded-md">Workshop</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md">Online</span>
                        <span className="text-[10px] text-slate-400">Pedido #847651</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Workshop Avançado: Derivativos Financeiros</h3>
                      <p className="text-xs text-slate-600 mb-2">Estratégias práticas para operações com derivativos no mercado brasileiro.</p>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Video className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Plataforma Online</p>
                            <p className="text-[10px] text-slate-500">Zoom Meeting</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">14:00 - 18:00</p>
                            <p className="text-[10px] text-slate-500">4 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Ingresso Padrão</p>
                            <p className="text-[10px] text-slate-500">R$ 420,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <User className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="text-green-500 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Presença confirmada (100%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FileText className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Material didático disponível</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition flex items-center gap-1.5 whitespace-nowrap">
                        <Award className="w-3 h-3" /> Certificado
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5">
                        <Play className="w-3 h-3" /> Gravação
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">Instrutor:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-5 h-5 rounded-full object-cover" alt="instructor" />
                          <span className="text-slate-700 font-medium">Prof. Ricardo Almeida</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="text-slate-400 w-3 h-3" />
                        <span className="text-slate-600">87 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket History 3 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-16 bg-pastel-blue/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-xl font-bold text-slate-700">20</span>
                  <span className="text-[10px] text-slate-500 uppercase">Out</span>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-pastel-blue text-slate-700 text-[10px] font-semibold rounded-md">Fórum</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md">Presencial</span>
                        <span className="text-[10px] text-slate-400">Pedido #845320</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Fórum Nacional de Meios de Pagamento</h3>
                      <p className="text-xs text-slate-600 mb-2">Discussões sobre inovação, Pix e tendências do setor de pagamentos no Brasil.</p>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Centro de Convenções</p>
                            <p className="text-[10px] text-slate-500">Rio de Janeiro, RJ</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">08:00 - 19:00</p>
                            <p className="text-[10px] text-slate-500">11 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Ingresso Premium</p>
                            <p className="text-[10px] text-slate-500">R$ 1.200,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <User className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="text-green-500 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Check-in realizado às 07:52</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Gift className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Kit premium recebido</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition flex items-center gap-1.5 whitespace-nowrap">
                        <Award className="w-3 h-3" /> Certificado
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5">
                        <Images className="w-3 h-3" /> Fotos
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">Painelistas:</span>
                        <div className="flex -space-x-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" className="w-5 h-5 rounded-full object-cover border-2 border-white" alt="panelist" />
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" className="w-5 h-5 rounded-full object-cover border-2 border-white" alt="panelist" />
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" className="w-5 h-5 rounded-full object-cover border-2 border-white" alt="panelist" />
                          <div className="w-5 h-5 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[8px] font-medium">+5</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="text-slate-400 w-3 h-3" />
                        <span className="text-slate-600">482 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 my-8">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">2023</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            {/* Ticket History 4 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-16 bg-pastel-green/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-xl font-bold text-slate-700">08</span>
                  <span className="text-[10px] text-slate-500 uppercase">Dez</span>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-pastel-green text-slate-700 text-[10px] font-semibold rounded-md">Conferência</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md">Híbrido</span>
                        <span className="text-[10px] text-slate-400">Pedido #832145</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Summit de Investimentos 2023</h3>
                      <p className="text-xs text-slate-600 mb-2">Estratégias de investimento e análise de cenários econômicos para 2024.</p>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">WTC São Paulo</p>
                            <p className="text-[10px] text-slate-500">São Paulo, SP</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">08:30 - 17:30</p>
                            <p className="text-[10px] text-slate-500">9 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Ingresso Executivo</p>
                            <p className="text-[10px] text-slate-500">R$ 950,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <User className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="text-green-500 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Presença confirmada</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Network className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">15 conexões realizadas</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition flex items-center gap-1.5 whitespace-nowrap">
                        <Award className="w-3 h-3" /> Certificado
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5">
                        <Download className="w-3 h-3" /> Material
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">Keynote Speakers:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" className="w-5 h-5 rounded-full object-cover" alt="speaker" />
                          <span className="text-slate-700 font-medium">Dra. Mariana Costa</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="text-slate-400 w-3 h-3" />
                        <span className="text-slate-600">356 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket History 5 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-16 bg-pastel-purple/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-xl font-bold text-slate-700">22</span>
                  <span className="text-[10px] text-slate-500 uppercase">Set</span>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-pastel-purple text-slate-700 text-[10px] font-semibold rounded-md">Masterclass</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md">Online</span>
                        <span className="text-[10px] text-slate-400">Pedido #828764</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">Masterclass: Compliance e Gestão de Riscos</h3>
                      <p className="text-xs text-slate-600 mb-2">Frameworks modernos para gestão de compliance no mercado financeiro.</p>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Video className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Transmissão Online</p>
                            <p className="text-[10px] text-slate-500">Microsoft Teams</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">19:00 - 22:00</p>
                            <p className="text-[10px] text-slate-500">3 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-3 h-3" />
                          <div>
                            <p className="text-[10px] font-medium text-slate-700">Ingresso Premium</p>
                            <p className="text-[10px] text-slate-500">R$ 380,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <User className="text-slate-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="text-green-500 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Participação completa</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="text-amber-400 w-3 h-3" />
                          <span className="text-[10px] text-slate-600">Avaliação: 5.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition flex items-center gap-1.5 whitespace-nowrap">
                        <Award className="w-3 h-3" /> Certificado
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5">
                        <Play className="w-3 h-3" /> Replay
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">Instrutor:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-5 h-5 rounded-full object-cover" alt="instructor" />
                          <span className="text-slate-700 font-medium">Prof. Eduardo Santos</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="text-slate-400 w-3 h-3" />
                        <span className="text-slate-600">124 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-center">
            <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition font-medium flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Carregar mais eventos
            </button>
          </div>

          <section className="mt-12 bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Seus Certificados</h2>
                <p className="text-slate-600">Acesse e baixe todos os seus certificados de participação</p>
              </div>
              <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition flex items-center gap-2">
                <Download className="w-4 h-4" /> Baixar Todos
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="group cursor-pointer">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition mb-3 aspect-[3/4] flex flex-col items-center justify-center">
                  <Award className="w-16 h-16 text-slate-300 mb-2 group-hover:text-slate-400 transition" />
                  <span className="text-xs text-slate-500 text-center">Regulação do Mercado</span>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">15 Nov 2024</p>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition mb-3 aspect-[3/4] flex flex-col items-center justify-center">
                  <Award className="w-16 h-16 text-slate-300 mb-2 group-hover:text-slate-400 transition" />
                  <span className="text-xs text-slate-500 text-center">Derivativos Financeiros</span>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">02 Nov 2024</p>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition mb-3 aspect-[3/4] flex flex-col items-center justify-center">
                  <Award className="w-16 h-16 text-slate-300 mb-2 group-hover:text-slate-400 transition" />
                  <span className="text-xs text-slate-500 text-center">Meios de Pagamento</span>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">20 Out 2024</p>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition mb-3 aspect-[3/4] flex flex-col items-center justify-center">
                  <Award className="w-16 h-16 text-slate-300 mb-2 group-hover:text-slate-400 transition" />
                  <span className="text-xs text-slate-500 text-center">Investimentos 2023</span>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">08 Dez 2023</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
