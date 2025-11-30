import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Download, CalendarPlus, MapPin, Users, Globe, MessageCircle, Star, Laptop, UtensilsCrossed, GlassWater, Music, Handshake, Briefcase, Camera, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProgramacaoEvento() {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {/* Header padrão do sistema */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/checkout-ingresso')}
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Programação Completa</h1>
                <p className="text-sm text-muted-foreground mt-1">Summit Mercado de Capitais 2025 • 15-17 Março</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Baixar PDF
              </Button>
              <Button className="bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2">
                <CalendarPlus className="w-4 h-4" />
                Adicionar ao Calendário
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-8">
          {/* Tabs de dias */}
          <div className="flex gap-2 mb-8 border-b border-slate-200">
            <button 
              onClick={() => setActiveDay(1)}
              className={`px-6 py-3 font-semibold transition ${
                activeDay === 1 
                  ? 'text-slate-800 border-b-2 border-pastel-blue' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Dia 15 - Terça
            </button>
            <button 
              onClick={() => setActiveDay(2)}
              className={`px-6 py-3 font-semibold transition ${
                activeDay === 2 
                  ? 'text-slate-800 border-b-2 border-pastel-blue' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Dia 16 - Quarta
            </button>
            <button 
              onClick={() => setActiveDay(3)}
              className={`px-6 py-3 font-semibold transition ${
                activeDay === 3 
                  ? 'text-slate-800 border-b-2 border-pastel-blue' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Dia 17 - Quinta
            </button>
            <button className="px-6 py-3 text-slate-500 hover:text-slate-800 transition ml-auto flex items-center gap-2">
              <span className="fas fa-th-large"></span>
              Visualização em Grade
            </button>
          </div>

          {/* Programação do Dia 1 */}
          {activeDay === 1 && (
            <div className="space-y-6">
              {/* Sessão 1 - Credenciamento */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-blue/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-blue/70">Credenciamento</span>
                      <span className="text-sm font-medium text-slate-500">08:00 - 09:00</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Credenciamento e Welcome Coffee</h3>
                    <p className="text-slate-600 mb-4">Recepção dos participantes com coffee break especial e entrega de kits. Momento de networking e integração antes do início oficial do evento.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Hall Principal</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Todos os participantes</span>
                    </div>
                  </div>
                  <button className="ml-4 w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center text-slate-400">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sessão 2 - Keynote */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-purple/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-purple/70">Keynote</span>
                      <span className="text-sm font-medium text-slate-500">09:00 - 10:30</span>
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded">Ao Vivo</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Abertura: O Cenário Econômico Global e Impactos no Brasil</h3>
                    <p className="text-slate-600 mb-4">Análise profunda sobre as dinâmicas macroeconômicas globais, políticas monetárias dos principais bancos centrais e seus reflexos diretos no mercado de capitais brasileiro. Discussão sobre inflação, taxas de juros e perspectivas para o setor financeiro em 2025.</p>
                    
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-3">PALESTRANTE PRINCIPAL</p>
                      <div className="flex items-center gap-3">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-12 h-12 rounded-full object-cover" alt="Palestrante" />
                        <div>
                          <p className="font-semibold text-slate-800">Dra. Mariana Costa</p>
                          <p className="text-sm text-slate-600">Economista-Chefe, Goldman Sachs Brasil</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs text-slate-500">150k seguidores</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Auditório Principal</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Capacidade: 2.000</span>
                      <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Português/Inglês</span>
                    </div>
                  </div>
                  <button className="ml-4 w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center text-slate-400">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sessão 3 - Coffee Break */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-green/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-green/70">Coffee Break</span>
                      <span className="text-sm font-medium text-slate-500">10:30 - 11:00</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Intervalo para Networking</h3>
                    <p className="text-slate-600 mb-4">Coffee break premium com patrocínio. Oportunidade para conexões e discussões informais entre participantes.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Área de Exposição</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessão 4 - Painel */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-pink/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-pink/70">Painel</span>
                      <span className="text-sm font-medium text-slate-500">11:00 - 12:30</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Renda Fixa em Transformação: Novas Oportunidades e Desafios</h3>
                    <p className="text-slate-600 mb-4">Debate sobre a evolução do mercado de renda fixa no Brasil, incluindo debêntures, CRIs, CRAs e títulos públicos. Como as mudanças regulatórias e o ambiente de juros estão moldando as estratégias de investimento e captação.</p>
                    
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-3">PAINELISTAS</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-10 h-10 rounded-full object-cover" alt="" />
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">Roberto Chang</p>
                            <p className="text-xs text-slate-600">Head Renda Fixa, XP Inc.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-10 h-10 rounded-full object-cover" alt="" />
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">Ana Paula Souza</p>
                            <p className="text-xs text-slate-600">Diretora, CVM</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" className="w-10 h-10 rounded-full object-cover" alt="" />
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">Felipe Andrade</p>
                            <p className="text-xs text-slate-600">CEO, BTG Pactual Asset</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" className="w-10 h-10 rounded-full object-cover" alt="" />
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">Juliana Rocha</p>
                            <p className="text-xs text-slate-600">Moderadora (Valor Econômico)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Auditório Principal</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Capacidade: 2.000</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> Q&A ao vivo</span>
                    </div>
                  </div>
                  <button className="ml-4 w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center text-slate-400">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sessão 5 - Almoço VIP */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-yellow/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-yellow/70">Almoço</span>
                      <span className="text-sm font-medium text-slate-500">12:30 - 14:00</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">VIP Exclusivo</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Almoço com Palestrantes</h3>
                    <p className="text-slate-600 mb-4">Experiência exclusiva para participantes VIP: almoço em ambiente reservado com acesso direto aos principais palestrantes do evento. Networking de alto nível em formato mesa redonda.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Restaurante VIP - 3º Andar</span>
                      <span className="flex items-center gap-1"><UtensilsCrossed className="w-4 h-4" /> Menu Premium</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessão 6 - Trilhas Paralelas */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-blue/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-blue/70">Trilhas Paralelas</span>
                      <span className="text-sm font-medium text-slate-500">14:00 - 15:30</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Sessões Simultâneas - Escolha sua Trilha</h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4 border-2 border-pastel-blue hover:border-pastel-blue/60 transition cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded bg-pastel-blue/20 flex items-center justify-center">
                            <span className="text-pastel-blue font-bold text-sm">A</span>
                          </div>
                          <span className="text-xs font-bold text-slate-700">TRILHA A</span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">Derivativos e Hedge</h4>
                        <p className="text-sm text-slate-600 mb-3">Estratégias avançadas de proteção e especulação no mercado de derivativos brasileiro.</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" className="w-6 h-6 rounded-full" alt="" />
                          <span>Pedro Martins</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Sala 101</p>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4 border-2 border-pastel-purple hover:border-pastel-purple/60 transition cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded bg-pastel-purple/20 flex items-center justify-center">
                            <span className="text-pastel-purple font-bold text-sm">B</span>
                          </div>
                          <span className="text-xs font-bold text-slate-700">TRILHA B</span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">IPOs e M&A</h4>
                        <p className="text-sm text-slate-600 mb-3">Tendências em aberturas de capital e fusões & aquisições no cenário pós-pandemia.</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" className="w-6 h-6 rounded-full" alt="" />
                          <span>Luciana Santos</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Sala 102</p>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4 border-2 border-pastel-green hover:border-pastel-green/60 transition cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded bg-pastel-green/20 flex items-center justify-center">
                            <span className="text-pastel-green font-bold text-sm">C</span>
                          </div>
                          <span className="text-xs font-bold text-slate-700">TRILHA C</span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">Compliance e Regulação</h4>
                        <p className="text-sm text-slate-600 mb-3">Novas normas da CVM e BACEN: impactos práticos nas operações diárias.</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-6 h-6 rounded-full" alt="" />
                          <span>Ana Paula Souza</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Sala 103</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessão 7 - Coffee Break */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-green/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-green/70">Coffee Break</span>
                      <span className="text-sm font-medium text-slate-500">15:30 - 16:00</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Intervalo Energizante</h3>
                    <p className="text-slate-600 mb-4">Momento de descontração com coffee break e visita aos estandes dos patrocinadores.</p>
                  </div>
                </div>
              </div>

              {/* Sessão 8 - Workshop */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-peach/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-peach/70">Workshop</span>
                      <span className="text-sm font-medium text-slate-500">16:00 - 17:30</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded">Vagas Limitadas</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Análise Técnica Aplicada ao Mercado de Capitais</h3>
                    <p className="text-slate-600 mb-4">Workshop prático e hands-on sobre ferramentas de análise técnica para tomada de decisão em renda variável. Traga seu notebook para acompanhar os exercícios práticos.</p>
                    
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-3">INSTRUTOR</p>
                      <div className="flex items-center gap-3">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-12 h-12 rounded-full object-cover" alt="" />
                        <div>
                          <p className="font-semibold text-slate-800">Carlos Mendes, CNPI</p>
                          <p className="text-sm text-slate-600">Analista Técnico Senior, Itaú BBA</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Laboratório Tech - 2º Andar</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 80 vagas</span>
                      <span className="flex items-center gap-1"><Laptop className="w-4 h-4" /> Material incluso</span>
                    </div>
                  </div>
                  <button className="ml-4 w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-100 transition flex items-center justify-center text-slate-400">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sessão 9 - Happy Hour */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-pastel-pink/60 text-slate-700 text-xs font-bold rounded-full uppercase border border-pastel-pink/70">Networking</span>
                      <span className="text-sm font-medium text-slate-500">17:30 - 19:00</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Happy Hour de Encerramento - Dia 1</h3>
                    <p className="text-slate-600 mb-4">Coquetel de networking com drinks premium, música ao vivo e oportunidade para conexões informais. Momento ideal para consolidar contatos e discutir os temas do dia.</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Terraço Panorâmico</span>
                      <span className="flex items-center gap-1"><GlassWater className="w-4 h-4" /> Open Bar</span>
                      <span className="flex items-center gap-1"><Music className="w-4 h-4" /> Live Jazz</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Atividades Especiais */}
              <section className="bg-white rounded-xl border border-slate-200 p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Star className="text-pastel-yellow w-5 h-5" />
                  Atividades Especiais do Dia
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-pastel-blue/20 flex items-center justify-center mb-3">
                      <Handshake className="text-pastel-blue w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Speed Networking</h4>
                    <p className="text-sm text-slate-600 mb-2">Sessões rápidas de 5 minutos para conexões objetivas.</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 13:00 - 13:45 | Hall B</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-pastel-green/20 flex items-center justify-center mb-3">
                      <Briefcase className="text-pastel-green w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Career Fair</h4>
                    <p className="text-sm text-slate-600 mb-2">Principais instituições financeiras buscando talentos.</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Todo o dia | Área Expo</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-pastel-purple/20 flex items-center justify-center mb-3">
                      <Camera className="text-pastel-purple w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Foto Oficial</h4>
                    <p className="text-sm text-slate-600 mb-2">Registro profissional para seu LinkedIn.</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 12:00 - 14:00 | Estúdio</p>
                  </div>
                </div>
              </section>

              {/* Legenda */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Legenda</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pastel-blue"></div>
                    <span className="text-sm text-slate-600">Palestras Principais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pastel-purple"></div>
                    <span className="text-sm text-slate-600">Painéis de Debate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pastel-peach"></div>
                    <span className="text-sm text-slate-600">Workshops Práticos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pastel-green"></div>
                    <span className="text-sm text-slate-600">Intervalos</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Programação dos outros dias */}
          {activeDay === 2 && (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-slate-600">Programação do Dia 16 em breve...</p>
            </div>
          )}

          {activeDay === 3 && (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-slate-600">Programação do Dia 17 em breve...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
