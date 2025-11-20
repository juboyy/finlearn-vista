import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MessageCircle, Users, Trophy, Star, TrendingUp, DollarSign, Scale, Briefcase, ChartLine, Bell, Plus, Pen, Flame, Clock, Eye, Heart, MessageSquare, Bookmark, Crown } from "lucide-react";
import creditoRuralImage from "@/assets/credito-rural-2025.png";

export default function Comunidade() {
  const [activeTab, setActiveTab] = useState<"discussoes" | "artigos">("discussoes");

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Comunidade</h1>
              <p className="text-sm text-slate-500 mt-1">Conecte-se, compartilhe e aprenda com outros profissionais</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <Plus className="w-4 h-4 inline mr-2" />
                Nova Discussão
              </button>
              <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <Pen className="w-4 h-4 inline mr-2" />
                Novo Artigo
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <section className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center mb-auto">
                <MessageCircle className="text-slate-700 w-6 h-6" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-800 mb-1">1,247</h3>
                <p className="text-sm text-slate-500">Discussões Ativas</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mb-auto">
                <Users className="text-slate-700 w-6 h-6" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-800 mb-1">8,562</h3>
                <p className="text-sm text-slate-500">Membros Ativos</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center mb-auto">
                <Trophy className="text-slate-700 w-6 h-6" />
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-800 mb-1">342</h3>
                <p className="text-sm text-slate-500">Seus Pontos</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <Star className="text-slate-700 w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">#12</h3>
              <p className="text-sm text-slate-500 mb-4">Seu Ranking</p>
              <button className="w-full px-4 py-2 bg-pastel-pink border border-pastel-pink text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                Ver Ranking
              </button>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2">
              <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-pastel-blue border border-pastel-blue text-slate-700 rounded-lg text-sm font-medium">Todas</button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 border border-transparent rounded-lg text-sm font-medium transition">Seguindo</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue hover:shadow-md transition cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <ChartLine className="text-slate-700 w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 mb-1">Análise de Mercado</h3>
                        <p className="text-xs text-slate-500 mb-2">324 tópicos • 2.1k posts</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                          </div>
                          <span className="text-xs text-slate-500">+156 membros</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-green hover:shadow-md transition cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="text-slate-700 w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 mb-1">Investimentos</h3>
                        <p className="text-xs text-slate-500 mb-2">287 tópicos • 1.8k posts</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                          </div>
                          <span className="text-xs text-slate-500">+142 membros</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-purple hover:shadow-md transition cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <Scale className="text-slate-700 w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 mb-1">Compliance & Regulação</h3>
                        <p className="text-xs text-slate-500 mb-2">198 tópicos • 1.2k posts</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                          </div>
                          <span className="text-xs text-slate-500">+98 membros</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-yellow hover:shadow-md transition cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-slate-700 w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 mb-1">Carreira & Networking</h3>
                        <p className="text-xs text-slate-500 mb-2">256 tópicos • 1.5k posts</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                          </div>
                          <span className="text-xs text-slate-500">+124 membros</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200">
                <div className="border-b border-slate-200">
                  <div className="flex items-center gap-2 px-6 pt-6 pb-4">
                    <button 
                      onClick={() => setActiveTab("discussoes")}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                        activeTab === "discussoes" 
                          ? "text-slate-800 bg-pastel-blue border border-pastel-blue" 
                          : "text-slate-600 hover:bg-slate-100 border border-transparent"
                      }`}
                    >
                      Discussões
                    </button>
                    <button 
                      onClick={() => setActiveTab("artigos")}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                        activeTab === "artigos" 
                          ? "text-slate-800 bg-pastel-green border border-pastel-green" 
                          : "text-slate-600 hover:bg-slate-100 border border-transparent"
                      }`}
                    >
                      Artigos
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 border border-transparent rounded-lg transition">
                      Análises
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 border border-transparent rounded-lg transition">
                      Pesquisas
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                      {activeTab === "discussoes" ? "Discussões em Destaque" : "Artigos em Destaque"}
                    </h2>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition">
                        <Flame className="inline w-4 h-4 mr-1" />
                        {activeTab === "discussoes" ? "Populares" : "Mais Lidos"}
                      </button>
                      <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Recentes
                      </button>
                    </div>
                  </div>

                  {activeTab === "discussoes" ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue hover:shadow-md transition cursor-pointer" onClick={() => window.location.href = '/discussao/1'}>
                        <div className="flex items-start gap-4">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-slate-800 mb-1 hover:text-pastel-blue transition">Como interpretar indicadores macroeconômicos em cenário de alta volatilidade?</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <span className="font-medium text-slate-700">Carlos Mendes</span>
                                  <span>•</span>
                                  <span>há 2 horas</span>
                                  <span className="px-2 py-0.5 bg-pastel-blue rounded-full">Análise de Mercado</span>
                                </div>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">Tenho observado divergências significativas entre os principais indicadores econômicos. Qual metodologia vocês recomendam para análise em períodos de incerteza como este?</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                24 respostas
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                312 visualizações
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                18 curtidas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-green hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-slate-800 mb-1 hover:text-pastel-green transition">Estratégias de diversificação para portfólio de renda variável em 2025</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <span className="font-medium text-slate-700">Ana Rodrigues</span>
                                  <span>•</span>
                                  <span>há 5 horas</span>
                                  <span className="px-2 py-0.5 bg-pastel-green rounded-full">Investimentos</span>
                                </div>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">Com as mudanças regulatórias chegando, como vocês estão pensando em rebalancear seus portfolios de ações? Quais setores estão priorizando?</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                42 respostas
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                587 visualizações
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                35 curtidas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-purple hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-slate-800 mb-1 hover:text-pastel-purple transition">Novas diretrizes da CVM sobre fundos de investimento</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <span className="font-medium text-slate-700">Roberto Santos</span>
                                  <span>•</span>
                                  <span>há 1 dia</span>
                                  <span className="px-2 py-0.5 bg-pastel-purple rounded-full">Compliance & Regulação</span>
                                </div>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">A CVM publicou novas diretrizes para gestão de fundos. Alguém já teve tempo de analisar o impacto operacional dessas mudanças? Vamos discutir as principais alterações.</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                31 respostas
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                428 visualizações
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                27 curtidas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-yellow hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-slate-800 mb-1 hover:text-pastel-yellow transition">Transição de carreira: back office para front office</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <span className="font-medium text-slate-700">Juliana Costa</span>
                                  <span>•</span>
                                  <span>há 1 dia</span>
                                  <span className="px-2 py-0.5 bg-pastel-yellow rounded-full">Carreira & Networking</span>
                                </div>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">Trabalho há 3 anos em back office e gostaria de migrar para front office. Quais certificações e skills são essenciais? Alguém já fez essa transição?</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                56 respostas
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                694 visualizações
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                44 curtidas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-peach hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-slate-800 mb-1 hover:text-pastel-peach transition">IA aplicada à análise fundamentalista: ferramentas e resultados</h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <span className="font-medium text-slate-700">Pedro Almeida</span>
                                  <span>•</span>
                                  <span>há 2 dias</span>
                                  <span className="px-2 py-0.5 bg-pastel-peach rounded-full">Análise de Mercado</span>
                                </div>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">Quem aqui está usando IA para análise fundamentalista? Quais ferramentas recomendam e qual a acurácia dos modelos que estão utilizando?</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                38 respostas
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                521 visualizações
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                29 curtidas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <article onClick={() => window.location.href = '/artigo/credito-rural'} className="border border-slate-200 rounded-lg overflow-hidden hover:border-pastel-blue hover:shadow-md transition cursor-pointer">
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img className="w-full h-full object-cover" src={creditoRuralImage} alt="Análise de Crédito Rural" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium">Análise de Mercado</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">5 min de leitura</span>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-pastel-blue transition">Análise Profunda do Crédito Rural: Tendências, Riscos e Oportunidades para 2025</h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">Uma análise detalhada sobre o mercado de crédito rural brasileiro, incluindo projeções macroeconômicas, evolução do PIB agro e estratégias de gestão de portfólio para instituições.</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-2">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Co-author" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Co-author" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-800">Carlos Mendes e co-autores</p>
                                <p className="text-xs text-slate-500">há 15 min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                342
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                42
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                8
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="border border-slate-200 rounded-lg overflow-hidden hover:border-pastel-green hover:shadow-md transition cursor-pointer">
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f073da7c83-b43f4f357022991e8f02.png" alt="Financial charts illustration" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-pastel-green text-slate-700 rounded text-xs font-medium">Mercado de Capitais</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">12 min de leitura</span>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-pastel-green transition">O Impacto das Taxas de Juros no Mercado de Renda Fixa Brasileiro</h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">Uma análise detalhada sobre como as mudanças na política monetária do Banco Central afetam os diferentes tipos de títulos de renda fixa e as estratégias de alocação para investidores institucionais.</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-2">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="Co-author" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-800">Dr. Ricardo Fernandes e co-autores</p>
                                <p className="text-xs text-slate-500">há 3 horas</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                1.2k
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                87
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                23
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="border border-slate-200 rounded-lg overflow-hidden hover:border-pastel-blue hover:shadow-md transition cursor-pointer">
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d640e901cd-5a67709867593e6faa85.png" alt="PIX and Open Finance illustration" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium">Meios de Pagamento</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">8 min de leitura</span>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-pastel-blue transition">Open Finance e PIX: Transformação Digital no Sistema de Pagamentos</h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">Explorando as mudanças estruturais no ecossistema financeiro brasileiro com a implementação do Open Finance e a evolução contínua do PIX como instrumento de pagamento instantâneo.</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="text-sm font-medium text-slate-800">Mariana Campos</p>
                                <p className="text-xs text-slate-500">há 1 dia</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                2.4k
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                156
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                42
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="border border-slate-200 rounded-lg overflow-hidden hover:border-pastel-purple hover:shadow-md transition cursor-pointer">
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/dcfb61c7a5-734d33eff99c0e2388a8.png" alt="Compliance illustration" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-pastel-purple text-slate-700 rounded text-xs font-medium">Compliance</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">15 min de leitura</span>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-pastel-purple transition">Novas Diretrizes de Prevenção à Lavagem de Dinheiro: Guia Prático</h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">Um guia completo sobre as atualizações regulatórias em PLD/FT, incluindo as melhores práticas para implementação de controles internos e sistemas de monitoramento transacional.</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-2">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Co-author" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-800">Dr. Roberto Alves e co-autores</p>
                                <p className="text-xs text-slate-500">há 2 dias</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                1.8k
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                124
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                38
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="border border-slate-200 rounded-lg overflow-hidden hover:border-pastel-yellow hover:shadow-md transition cursor-pointer">
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c7c2e34325-9935efb9fd126e917007.png" alt="Risk assessment illustration" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-pastel-yellow text-slate-700 rounded text-xs font-medium">Gestão de Riscos</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">10 min de leitura</span>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-pastel-yellow transition">Modelagem de Risco de Crédito: Técnicas Avançadas para o Mercado Atual</h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">Análise das metodologias mais recentes em modelagem de risco de crédito, incluindo machine learning aplicado à previsão de inadimplência e otimização de portfolios.</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="text-sm font-medium text-slate-800">Felipe Monteiro</p>
                                <p className="text-xs text-slate-500">há 3 dias</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                956
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                73
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                19
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>

                      <article className="border border-slate-200 rounded-lg overflow-hidden hover:border-pastel-pink hover:shadow-md transition cursor-pointer">
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/850265aaa9-273e582e3db8766bcdb3.png" alt="ESG investing illustration" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-pastel-pink text-slate-700 rounded text-xs font-medium">ESG & Sustentabilidade</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">11 min de leitura</span>
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2 hover:text-pastel-pink transition">Investimentos ESG: Integrando Sustentabilidade nas Decisões Financeiras</h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">Como incorporar critérios ambientais, sociais e de governança nas estratégias de investimento, com foco em métricas de impacto e performance de longo prazo.</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Author" className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="text-sm font-medium text-slate-800">Dra. Beatriz Lima</p>
                                <p className="text-xs text-slate-500">há 4 dias</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                1.5k
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                98
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                31
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <aside className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Membros Ativos</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">Maria Santos</p>
                      <p className="text-xs text-slate-500">342 pontos</p>
                    </div>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">Lucas Oliveira</p>
                      <p className="text-xs text-slate-500">298 pontos</p>
                    </div>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">Fernanda Lima</p>
                      <p className="text-xs text-slate-500">276 pontos</p>
                    </div>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Tópicos Populares</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-full text-xs font-medium">#análise</span>
                  <span className="px-3 py-1.5 bg-pastel-green text-slate-700 rounded-full text-xs font-medium">
                    {activeTab === "discussoes" ? "#cripto" : "#pagamentos"}
                  </span>
                  <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 rounded-full text-xs font-medium">#regulação</span>
                  <span className="px-3 py-1.5 bg-pastel-yellow text-slate-700 rounded-full text-xs font-medium">#carreira</span>
                  <span className="px-3 py-1.5 bg-pastel-pink text-slate-700 rounded-full text-xs font-medium">#investimentos</span>
                  <span className="px-3 py-1.5 bg-pastel-peach text-slate-700 rounded-full text-xs font-medium">#tecnologia</span>
                </div>
              </div>

              {activeTab === "artigos" && (
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-4">Autores Recomendados</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Author" className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">Dr. Ricardo Fernandes</p>
                        <p className="text-xs text-slate-500">24 artigos</p>
                      </div>
                      <button className="px-3 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium hover:bg-opacity-80 transition">
                        Seguir
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Author" className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">Mariana Campos</p>
                        <p className="text-xs text-slate-500">18 artigos</p>
                      </div>
                      <button className="px-3 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium hover:bg-opacity-80 transition">
                        Seguir
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Author" className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">Dr. Roberto Alves</p>
                        <p className="text-xs text-slate-500">31 artigos</p>
                      </div>
                      <button className="px-3 py-1 bg-pastel-blue text-slate-700 rounded text-xs font-medium hover:bg-opacity-80 transition">
                        Seguir
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-pastel-blue rounded-xl p-6 text-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="w-6 h-6" />
                  <h3 className="font-semibold">Premium</h3>
                </div>
                <p className="text-sm mb-4 opacity-90">Desbloqueie recursos exclusivos e acelere seu aprendizado</p>
                <button className="w-full px-4 py-2 bg-white text-slate-800 rounded-lg font-medium hover:bg-opacity-90 transition">
                  Saiba Mais
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
