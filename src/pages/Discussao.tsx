import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Bookmark, Share2, MoreVertical, ThumbsUp, Heart, MessageCircle, Eye, Bold, Italic, List, Link2, Image, Code, UserPlus, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

export default function Discussao() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/comunidade')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Discussão</h1>
                <p className="text-sm text-slate-500 mt-1">Análise de Mercado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bookmark size={20} />
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <article className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                    alt="User" 
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-800">Carlos Mendes</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span>Analista Sênior</span>
                          <span>•</span>
                          <span>há 2 horas</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-full text-xs font-medium">Análise de Mercado</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-800 mb-4">Como interpretar indicadores macroeconômicos em cenário de alta volatilidade?</h1>

                <div className="prose prose-slate max-w-none text-slate-600 mb-6">
                  <p className="mb-4">Caros colegas, tenho observado divergências significativas entre os principais indicadores econômicos nos últimos trimestres, especialmente em relação aos índices de inflação, taxa de juros e crescimento do PIB.</p>
                  
                  <p className="mb-4">O cenário atual apresenta desafios únicos para análise fundamentalista, com múltiplos fatores contribuindo para a volatilidade:</p>
                  
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Políticas monetárias divergentes entre economias desenvolvidas e emergentes</li>
                    <li>Tensões geopolíticas afetando cadeias de suprimento globais</li>
                    <li>Transição energética impactando setores tradicionais</li>
                    <li>Adoção acelerada de tecnologias disruptivas em diversos setores</li>
                  </ul>

                  <p className="mb-4">Minha principal dúvida é: <strong>qual metodologia vocês têm utilizado para ponderar esses indicadores e construir cenários consistentes para tomada de decisão de investimento?</strong></p>

                  <p className="mb-4">Atualmente, estou utilizando uma abordagem que combina:</p>

                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li>Análise de correlação histórica entre indicadores</li>
                    <li>Modelagem de cenários com diferentes pesos para variáveis macroeconômicas</li>
                    <li>Backtesting de estratégias em períodos de volatilidade similar</li>
                  </ol>

                  <p className="mb-4">No entanto, sinto que essa metodologia pode estar deixando de capturar nuances importantes do momento atual. Gostaria de ouvir experiências de outros profissionais que estejam lidando com desafios similares.</p>

                  <p>Agradeço antecipadamente pelas contribuições!</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">#análise-macro</span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">#volatilidade</span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">#metodologia</span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">#indicadores</span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-slate-600 hover:text-pastel-blue transition">
                      <ThumbsUp size={18} />
                      <span className="text-sm font-medium">18</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 hover:text-pastel-pink transition">
                      <Heart size={18} />
                      <span className="text-sm font-medium">12</span>
                    </button>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MessageCircle size={18} />
                      <span className="text-sm font-medium">24 respostas</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Eye size={18} />
                      <span className="text-sm font-medium">312 visualizações</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    <i className="fas fa-reply mr-2"></i>
                    Responder
                  </button>
                </div>
              </article>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">24 Respostas</h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">Mais Relevantes</button>
                    <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Mais Recentes</button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-sky-50/60 rounded-lg rounded-tl-none p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-800">Maria Santos</h4>
                            <span className="text-xs text-slate-500">há 1 hora</span>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        <div className="text-slate-600 space-y-3 text-sm">
                          <p>Excelente questão, Carlos! Tenho enfrentado desafios similares na gestão de portfólios multi-ativos. Uma abordagem que tem funcionado bem para mim é a utilização de <strong>análise de regime de mercado</strong>. Posso compartilhar um paper que publiquei recentemente sobre o tema se houver interesse.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 pl-1">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <ThumbsUp size={14} />
                          <span className="text-sm font-medium">24</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <span className="text-sm font-medium">Responder</span>
                        </button>
                      </div>

                      <div className="mt-4 flex items-start gap-4">
                        <img 
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                          alt="User" 
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="bg-sky-50/60 rounded-lg rounded-tl-none p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-800">Carlos Mendes</h4>
                                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs font-medium">Autor</span>
                                <span className="text-xs text-slate-500">há 45 min</span>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600">
                                <MoreVertical size={16} />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600">Maria, muito obrigado pela contribuição! A abordagem de regime de mercado faz muito sentido. Tenho muito interesse no paper, seria possível compartilhar? A questão dos indicadores leading alternativos é especialmente relevante no momento atual.</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 pl-1">
                            <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                              <ThumbsUp size={14} />
                              <span className="text-sm font-medium">8</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                              <span className="text-sm font-medium">Responder</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" 
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-sky-50/60 rounded-lg rounded-tl-none p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-800">Pedro Almeida</h4>
                            <span className="text-xs text-slate-500">há 1 hora</span>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        <div className="text-slate-600 space-y-3 text-sm">
                          <p className="text-sm text-slate-500">Analista Quantitativo | PhD em Economia</p>
                          <p>Complementando a resposta da Maria, vale considerar também o uso de <strong>machine learning para detecção de padrões não-lineares</strong> entre indicadores.</p>
                          <p>Temos utilizado modelos de Random Forest e Gradient Boosting para identificar interações complexas que métodos tradicionais não capturam. Os resultados têm sido promissores, especialmente para previsão de turning points.</p>
                          <p>Um ponto importante: sempre validar com out-of-sample testing rigoroso para evitar overfitting.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 pl-1">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <ThumbsUp size={14} />
                          <span className="text-sm font-medium">16</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <span className="text-sm font-medium">Responder</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" 
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-sky-50/60 rounded-lg rounded-tl-none p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-800">Ana Rodrigues</h4>
                            <span className="text-xs text-slate-500">há 2 horas</span>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        <div className="text-slate-600 space-y-3 text-sm">
                          <p className="text-sm text-slate-500">Chief Economist | Especialista em Mercados Emergentes</p>
                          <p>Perspectiva interessante! Na minha experiência com mercados emergentes, adiciono uma camada de <strong>análise de risco político e institucional</strong> que frequentemente é subestimada.</p>
                          <p>Indicadores como qualidade institucional, estabilidade política e capacidade de implementação de reformas têm poder preditivo significativo, especialmente em períodos de transição.</p>
                          <p>Recomendo o framework desenvolvido pelo BIS para análise integrada de riscos macro-financeiros.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 pl-1">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <ThumbsUp size={14} />
                          <span className="text-sm font-medium">19</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <span className="text-sm font-medium">Responder</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" 
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-sky-50/60 rounded-lg rounded-tl-none p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-800">Lucas Oliveira</h4>
                            <span className="text-xs text-slate-500">há 3 horas</span>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        <div className="text-slate-600 space-y-3 text-sm">
                          <p className="text-sm text-slate-500">Trader Institucional | Derivativos</p>
                          <p>Do ponto de vista prático de trading, tenho usado <strong>volatilidade implícita</strong> como proxy para expectativas de mercado sobre incerteza futura.</p>
                          <p>A estrutura a termo de volatilidade frequentemente antecipa mudanças de regime antes dos indicadores tradicionais. Vale monitorar também skew e kurtosis das distribuições.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 pl-1">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <ThumbsUp size={14} />
                          <span className="text-sm font-medium">14</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <span className="text-sm font-medium">Responder</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" 
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-sky-50/60 rounded-lg rounded-tl-none p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-800">Roberto Santos</h4>
                            <span className="text-xs text-slate-500">há 4 horas</span>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        <div className="text-slate-600 space-y-3 text-sm">
                          <p className="text-sm text-slate-500">Risk Manager | FRM</p>
                          <p>Importante lembrar de <strong>stress testing</strong> e análise de cenários extremos. Em períodos de alta volatilidade, as caudas da distribuição ganham relevância desproporcional.</p>
                          <p>Sugiro incorporar cenários de crise históricos (2008, 2020) e simulações de Monte Carlo com choques correlacionados entre múltiplos indicadores.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 pl-1">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <ThumbsUp size={14} />
                          <span className="text-sm font-medium">11</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-pastel-blue transition">
                          <span className="text-sm font-medium">Responder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-3 border-2 border-dashed border-slate-300 text-slate-600 rounded-lg hover:border-pastel-blue hover:text-slate-800 hover:bg-slate-50 transition font-medium">
                  <i className="fas fa-plus mr-2"></i>
                  Carregar mais respostas (19 restantes)
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Adicionar Resposta</h3>
                <div className="flex items-start gap-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <Textarea 
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue resize-none" 
                      rows={6}
                      placeholder="Compartilhe sua experiência e insights..."
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <Bold size={18} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <Italic size={18} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <List size={18} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <Link2 size={18} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <Image size={18} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <Code size={18} />
                        </button>
                      </div>
                      <button className="px-6 py-2.5 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Publicar Resposta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                    alt="User" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800">Carlos Mendes</h3>
                    <p className="text-sm text-slate-500">Analista Sênior</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">Especialista em análise macroeconômica e estratégias de investimento em renda variável. 12 anos de experiência no mercado financeiro.</p>
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-slate-200">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-slate-800">127</p>
                    <p className="text-xs text-slate-500">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-slate-800">1.2k</p>
                    <p className="text-xs text-slate-500">Seguidores</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-slate-800">342</p>
                    <p className="text-xs text-slate-500">Pontos</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <UserPlus size={16} className="inline mr-2" />
                  Seguir
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Engajamento</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <ThumbsUp size={18} />
                      <span className="text-sm">Curtidas</span>
                    </div>
                    <span className="font-semibold text-slate-800">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Heart size={18} />
                      <span className="text-sm">Favoritos</span>
                    </div>
                    <span className="font-semibold text-slate-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MessageCircle size={18} />
                      <span className="text-sm">Respostas</span>
                    </div>
                    <span className="font-semibold text-slate-800">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Eye size={18} />
                      <span className="text-sm">Visualizações</span>
                    </div>
                    <span className="font-semibold text-slate-800">312</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Share2 size={18} />
                      <span className="text-sm">Compartilhamentos</span>
                    </div>
                    <span className="font-semibold text-slate-800">7</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Discussões Relacionadas</h3>
                <div className="space-y-4">
                  <a href="#" className="block group">
                    <h4 className="text-sm font-medium text-slate-800 mb-1 group-hover:text-pastel-blue transition line-clamp-2">Impacto da política monetária do Fed nos mercados emergentes</h4>
                    <p className="text-xs text-slate-500">42 respostas • 587 visualizações</p>
                  </a>
                  <a href="#" className="block group">
                    <h4 className="text-sm font-medium text-slate-800 mb-1 group-hover:text-pastel-blue transition line-clamp-2">Análise técnica vs fundamentalista em cenários de crise</h4>
                    <p className="text-xs text-slate-500">38 respostas • 521 visualizações</p>
                  </a>
                  <a href="#" className="block group">
                    <h4 className="text-sm font-medium text-slate-800 mb-1 group-hover:text-pastel-blue transition line-clamp-2">Modelagem quantitativa para previsão de recessão</h4>
                    <p className="text-xs text-slate-500">29 respostas • 394 visualizações</p>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                      alt="User" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">Maria Santos</p>
                      <p className="text-xs text-slate-500">24 respostas úteis</p>
                    </div>
                    <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs font-medium">Top</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" 
                      alt="User" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">Pedro Almeida</p>
                      <p className="text-xs text-slate-500">16 respostas úteis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" 
                      alt="User" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">Ana Rodrigues</p>
                      <p className="text-xs text-slate-500">19 respostas úteis</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
