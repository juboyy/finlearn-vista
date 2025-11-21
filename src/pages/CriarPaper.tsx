import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Save, Eye, Send, Bold, Italic, Underline, Heading, List, ListOrdered, Quote, Calculator, Table, BarChart, Image, Bookmark, X, Plus, Edit, Lightbulb, Sparkles, SpellCheck, Copy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CriarPaper() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">Novo Paper Acadêmico</h1>
                  <p className="text-xs text-slate-500 mt-1">Última edição: há 2 minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition text-sm">
                  <Save size={16} className="inline mr-2" />
                  Salvar Rascunho
                </button>
                <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                  <Eye size={16} className="inline mr-2" />
                  Visualizar
                </button>
                <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                  <Send size={16} className="inline mr-2" />
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3 space-y-6">
              {/* Paper Metadata Section */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Informações do Paper</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Título do Paper</label>
                    <input 
                      type="text" 
                      placeholder="Digite o título do seu paper acadêmico..." 
                      defaultValue="Análise Empírica dos Determinantes da Estrutura de Capital em Empresas do Mercado de Capitais Brasileiro"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Área de Pesquisa</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                        <option>Finanças Corporativas</option>
                        <option>Mercado de Capitais</option>
                        <option>Economia Monetária</option>
                        <option>Regulação Financeira</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Tipo de Publicação</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                        <option>Working Paper</option>
                        <option>Journal Article</option>
                        <option>Conference Paper</option>
                        <option>Dissertação</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Palavras-chave</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-3 py-1.5 bg-pastel-blue text-slate-700 text-sm rounded-full flex items-center gap-2">
                        Estrutura de Capital
                        <button className="hover:text-slate-900"><X size={12} /></button>
                      </span>
                      <span className="px-3 py-1.5 bg-pastel-green text-slate-700 text-sm rounded-full flex items-center gap-2">
                        Mercado de Capitais
                        <button className="hover:text-slate-900"><X size={12} /></button>
                      </span>
                      <span className="px-3 py-1.5 bg-pastel-yellow text-slate-700 text-sm rounded-full flex items-center gap-2">
                        Finanças Corporativas
                        <button className="hover:text-slate-900"><X size={12} /></button>
                      </span>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Adicionar palavra-chave..." 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-purple text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Co-autores</label>
                    <div className="flex items-center gap-3 mb-3">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Co-autor" className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">Dra. Ana Carolina Silva</p>
                        <p className="text-xs text-slate-500">FGV EAESP - Finanças</p>
                      </div>
                      <button className="text-slate-400 hover:text-red-600">
                        <X size={16} />
                      </button>
                    </div>
                    <button className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition text-sm">
                      <Plus size={16} className="inline mr-2" />
                      Adicionar Co-autor
                    </button>
                  </div>
                </div>
              </section>

              {/* Editor Section */}
              <section className="bg-white rounded-xl border border-slate-200">
                <div className="border-b border-slate-200 p-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Negrito">
                      <Bold size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Itálico">
                      <Italic size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Sublinhado">
                      <Underline size={16} />
                    </button>
                    <div className="w-px h-6 bg-slate-200"></div>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Título">
                      <Heading size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Lista">
                      <List size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Lista Numerada">
                      <ListOrdered size={16} />
                    </button>
                    <div className="w-px h-6 bg-slate-200"></div>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Citação">
                      <Quote size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Equação">
                      <Calculator size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Tabela">
                      <Table size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-pastel-purple" title="Inserir Gráfico">
                      <BarChart size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Imagem">
                      <Image size={16} />
                    </button>
                    <div className="w-px h-6 bg-slate-200"></div>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-600" title="Adicionar Referência">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Resumo</h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      Este estudo investiga os determinantes da estrutura de capital em empresas brasileiras listadas na B3, analisando um painel de dados de 2015 a 2023. Utilizando modelos econométricos avançados, identificamos que fatores como rentabilidade, tamanho da empresa, tangibilidade de ativos e oportunidades de crescimento exercem influência significativa nas decisões de financiamento. Os resultados sugerem que empresas mais rentáveis tendem a utilizar menos endividamento, corroborando a teoria do pecking order.
                    </p>
                    
                    <div className="bg-pastel-yellow/20 border-l-4 border-pastel-yellow p-4 rounded-r-lg mb-6">
                      <div className="flex items-start gap-3">
                        <Lightbulb size={20} className="text-slate-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 mb-1">Sugestão da IA</p>
                          <p className="text-sm text-slate-600">Considere adicionar dados quantitativos específicos sobre a amostra (número de empresas, período exato). Exemplo: "analisando 247 empresas durante 96 meses".</p>
                          <div className="flex gap-2 mt-3">
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50">
                              Aplicar
                            </button>
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50">
                              Ignorar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introdução</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      A estrutura de capital representa uma das decisões financeiras mais relevantes para as corporações modernas. Desde os trabalhos seminais de Modigliani e Miller (1958), a literatura financeira tem buscado compreender os fatores que influenciam as escolhas de financiamento das empresas <span className="text-pastel-purple cursor-pointer hover:underline">[1]</span>.
                    </p>
                    
                    <div className="bg-pastel-blue/20 border-l-4 border-pastel-blue p-4 rounded-r-lg mb-6">
                      <div className="flex items-start gap-3">
                        <Sparkles size={20} className="text-slate-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 mb-1">Sugestão de Contexto</p>
                          <p className="text-sm text-slate-600 mb-2">A IA detectou que você pode expandir este parágrafo. Sugestões:</p>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition">
                              <span className="font-medium">Adicionar contexto histórico:</span> Mencionar evolução das teorias desde 1958
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition">
                              <span className="font-medium">Incluir estatísticas:</span> Dados sobre estrutura de capital no Brasil
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs hover:bg-slate-50 transition">
                              <span className="font-medium">Expandir teoria:</span> Detalhar trade-off theory e pecking order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-6">
                      No contexto brasileiro, características institucionais específicas, como o desenvolvimento do mercado de capitais, a concentração de propriedade e o ambiente regulatório, podem influenciar de forma particular as decisões de estrutura de capital (Myers, 1984; Rajan & Zingales, 1995) <span className="text-pastel-purple cursor-pointer hover:underline">[2,3]</span>.
                    </p>

                    <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800">Gráfico 1: Evolução da Alavancagem Média</h3>
                        <button className="text-slate-500 hover:text-slate-700">
                          <Edit size={16} />
                        </button>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm text-slate-500 text-center py-12">
                          <i className="fas fa-chart-line text-4xl text-slate-300 mb-3"></i><br />
                          Clique para adicionar gráfico
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 mt-3">Fonte: Elaboração própria com base em dados da B3 (2015-2023)</p>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Revisão de Literatura</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      A teoria de estrutura de capital evoluiu significativamente desde os trabalhos pioneiros. A trade-off theory sugere que empresas buscam um nível ótimo de endividamento, balanceando benefícios fiscais da dívida contra custos de dificuldades financeiras...
                    </p>

                    <div className="bg-white border border-slate-200 rounded-lg p-4 my-6">
                      <div className="flex items-start gap-3">
                        <i className="fas fa-quote-left text-2xl text-slate-300"></i>
                        <div className="flex-1">
                          <p className="text-sm text-slate-600 italic mb-2">
                            "Firms prefer internal financing to external financing, and if external financing is required, they prefer debt to equity."
                          </p>
                          <p className="text-xs text-slate-500">Myers (1984) - The capital structure puzzle <span className="text-pastel-purple cursor-pointer hover:underline">[2]</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pastel-green/20 border-l-4 border-pastel-green p-4 rounded-r-lg mb-6">
                      <div className="flex items-start gap-3">
                        <SpellCheck size={20} className="text-slate-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 mb-1">Melhoria de Escrita</p>
                          <p className="text-sm text-slate-600">O parágrafo anterior poderia ser mais acadêmico. Sugestão de reescrita:</p>
                          <div className="bg-white border border-slate-200 rounded-lg p-3 mt-2 mb-3">
                            <p className="text-sm text-slate-700">
                              "A teoria do trade-off propõe que as organizações estabelecem uma estrutura de capital ótima mediante a ponderação entre os benefícios fiscais provenientes do endividamento e os custos associados às dificuldades financeiras (Kraus & Litzenberger, 1973)."
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-pastel-green text-slate-700 rounded-lg text-xs font-medium hover:bg-opacity-80">
                              Substituir
                            </button>
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50">
                              Ver mais opções
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-4">
                      A teoria do trade-off propõe que as organizações estabelecem uma estrutura de capital ótima mediante a ponderação entre os benefícios fiscais provenientes do endividamento e os custos associados às dificuldades financeiras (Kraus & Litzenberger, 1973). Por outro lado, a pecking order theory, desenvolvida por Myers e Majluf (1984), argumenta que as empresas seguem uma hierarquia de preferências de financiamento, priorizando recursos internos, seguidos por dívida e, por último, emissão de ações.
                    </p>

                    <p className="text-slate-700 leading-relaxed mb-4">
                      No contexto dos mercados emergentes, particularmente no Brasil, estudos empíricos têm demonstrado que as decisões de estrutura de capital são influenciadas por fatores institucionais específicos. A concentração acionária, característica marcante do mercado brasileiro, pode afetar significativamente as escolhas de financiamento das empresas (Procianoy & Schnorrenberger, 2004). Além disso, o desenvolvimento do mercado de capitais local e as condições macroeconômicas, incluindo taxas de juros e inflação, desempenham papel crucial nessas decisões estratégicas.
                    </p>

                    <div className="bg-pastel-pink/20 border-l-4 border-pastel-pink p-4 rounded-r-lg mb-6">
                      <div className="flex items-start gap-3">
                        <i className="fas fa-quote-right text-slate-600 mt-1"></i>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800 mb-3">Sugestões de citações</p>
                          
                          <div className="space-y-3">
                            <div className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-sm transition cursor-pointer">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <p className="text-xs font-semibold text-slate-800 mb-1">Capital Structure in Emerging Markets: Evidence from Latin America</p>
                                  <p className="text-xs text-slate-500 mb-2">Terra, P. R. (2003) - Journal of Corporate Finance</p>
                                  <p className="text-xs text-slate-600 italic leading-relaxed">
                                    "Empresas em mercados emergentes latino-americanos apresentam níveis de endividamento significativamente inferiores aos observados em economias desenvolvidas, sugerindo que fatores institucionais desempenham papel determinante..."
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <button className="px-2 py-1 bg-pastel-pink/30 text-slate-700 rounded text-xs font-medium hover:bg-pastel-pink/50 transition">
                                  Adicionar citação
                                </button>
                                <button className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-xs hover:bg-slate-100 transition">
                                  Ver completo
                                </button>
                              </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-sm transition cursor-pointer">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <p className="text-xs font-semibold text-slate-800 mb-1">Determinants of Capital Structure in Brazil: Panel Data Analysis</p>
                                  <p className="text-xs text-slate-500 mb-2">Bastos, D. D., & Nakamura, W. T. (2009) - Revista de Administração</p>
                                  <p className="text-xs text-slate-600 italic leading-relaxed">
                                    "Os resultados indicam que rentabilidade, tamanho da firma e tangibilidade dos ativos são determinantes significativos da estrutura de capital no mercado brasileiro, com evidências que suportam tanto a teoria do pecking order quanto do trade-off..."
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <button className="px-2 py-1 bg-pastel-pink/30 text-slate-700 rounded text-xs font-medium hover:bg-pastel-pink/50 transition">
                                  Adicionar citação
                                </button>
                                <button className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-xs hover:bg-slate-100 transition">
                                  Ver completo
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-4">
                      A evidência empírica sugere que variáveis específicas da firma, como tamanho, rentabilidade, oportunidades de crescimento e tangibilidade de ativos, exercem influência consistente sobre as decisões de estrutura de capital. Empresas maiores tendem a ter maior acesso ao mercado de capitais e, consequentemente, apresentam níveis de endividamento mais elevados. A rentabilidade, por sua vez, apresenta relação negativa com alavancagem, conforme previsto pela teoria do pecking order.
                    </p>

                    <p className="text-slate-700 leading-relaxed mb-6">
                      Estudos recentes têm explorado a dinâmica temporal da estrutura de capital, investigando como as empresas ajustam seus níveis de endividamento ao longo do tempo em resposta a choques econômicos e mudanças nas condições de mercado. A velocidade de ajuste em direção à estrutura de capital alvo tem sido objeto de intenso debate acadêmico, com evidências sugerindo que custos de ajustamento e fricções de mercado podem retardar esse processo de convergência.
                    </p>

                    <div className="bg-gradient-to-r from-pastel-purple/20 to-pastel-blue/20 border border-pastel-purple rounded-xl p-5 mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-wand-magic-sparkles text-pastel-purple"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-slate-800 mb-1">Sugestões de Continuação da IA</h4>
                          <p className="text-xs text-slate-600">Selecione uma opção ou dite sua própria ideia</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <button className="w-full text-left p-4 bg-white border-2 border-slate-200 rounded-lg hover:border-pastel-purple hover:shadow-sm transition group">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                              <span className="text-sm font-bold text-slate-700">1</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-700 leading-relaxed">
                                <span className="font-medium">Abordagem Metodológica:</span> "Para investigar empiricamente essas questões, este estudo utiliza uma amostra de 247 empresas não-financeiras listadas na B3 durante o período de 2015 a 2023, totalizando 2.223 observações firma-ano. Empregamos modelos de dados em painel com efeitos fixos de firma e tempo..."
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-1 bg-pastel-blue/20 rounded text-xs text-slate-600">Metodologia</span>
                                <span className="text-xs text-slate-500">~87 palavras</span>
                              </div>
                            </div>
                          </div>
                        </button>

                        <button className="w-full text-left p-4 bg-white border-2 border-slate-200 rounded-lg hover:border-pastel-purple hover:shadow-sm transition group">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                              <span className="text-sm font-bold text-slate-700">2</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-700 leading-relaxed">
                                <span className="font-medium">Gap da Literatura:</span> "Apesar da extensa literatura sobre estrutura de capital, ainda existem lacunas importantes no entendimento das particularidades dos mercados emergentes. Especificamente, poucos estudos examinaram como a interação entre fatores macroeconômicos e características específicas das firmas afeta as decisões de financiamento no contexto brasileiro..."
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-1 bg-pastel-green/20 rounded text-xs text-slate-600">Revisão Literatura</span>
                                <span className="text-xs text-slate-500">~73 palavras</span>
                              </div>
                            </div>
                          </div>
                        </button>

                        <button className="w-full text-left p-4 bg-white border-2 border-slate-200 rounded-lg hover:border-pastel-purple hover:shadow-sm transition group">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                              <span className="text-sm font-bold text-slate-700">3</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-700 leading-relaxed">
                                <span className="font-medium">Contribuição Teórica:</span> "Este trabalho contribui para a literatura de estrutura de capital em múltiplas dimensões. Primeiro, fornecemos evidências atualizadas sobre os determinantes da estrutura de capital em um mercado emergente relevante. Segundo, investigamos a velocidade de ajuste em direção à estrutura de capital alvo, considerando diferentes contextos econômicos..."
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-1 bg-pastel-yellow/20 rounded text-xs text-slate-600">Contribuição</span>
                                <span className="text-xs text-slate-500">~79 palavras</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>

                      <div className="border-t border-slate-200 pt-4">
                        <div className="bg-white rounded-lg border-2 border-slate-200 p-3">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={handleVoiceInput}
                              className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-opacity-80 transition flex-shrink-0 group ${
                                isRecording ? 'bg-pastel-pink animate-pulse' : 'bg-pastel-purple'
                              }`}
                            >
                              <i className={`text-slate-700 text-lg group-hover:scale-110 transition ${
                                isRecording ? 'fas fa-stop' : 'fas fa-microphone'
                              }`}></i>
                            </button>
                            <div className="flex-1">
                              <input 
                                type="text" 
                                placeholder="Ou dite sua própria sugestão de continuação..." 
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                              />
                            </div>
                            <button className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition">
                              Gerar
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 ml-15">
                            <i className="fas fa-info-circle mr-1"></i>
                            Clique no microfone e dite sua ideia, ou digite diretamente
                          </p>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">3. Metodologia</h2>
                    
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">3.1 Amostra e Coleta de Dados</h3>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      A amostra deste estudo compreende 247 empresas não-financeiras listadas na B3 (Brasil, Bolsa, Balcão) durante o período de 2015 a 2023, totalizando 2.223 observações firma-ano. Foram excluídas instituições financeiras devido às suas características específicas de estrutura de capital e regulamentação prudencial diferenciada. Adicionalmente, empresas com dados incompletos ou inconsistentes para as variáveis de interesse foram removidas da amostra final.
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      Os dados financeiros foram coletados da base Economatica, enquanto informações sobre governança corporativa e características institucionais foram obtidas dos relatórios de referência disponibilizados pelas companhias. A amostra abrange empresas de diversos setores econômicos, proporcionando heterogeneidade suficiente para análise robusta dos determinantes da estrutura de capital.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
                      <h4 className="text-sm font-semibold text-slate-800 mb-3">Tabela 1: Composição Setorial da Amostra</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="text-left py-2 px-3 text-slate-700 font-medium">Setor</th>
                              <th className="text-right py-2 px-3 text-slate-700 font-medium">N° Empresas</th>
                              <th className="text-right py-2 px-3 text-slate-700 font-medium">% da Amostra</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-600">
                            <tr className="border-b border-slate-100">
                              <td className="py-2 px-3">Indústria</td>
                              <td className="text-right py-2 px-3">89</td>
                              <td className="text-right py-2 px-3">36,0%</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                              <td className="py-2 px-3">Energia</td>
                              <td className="text-right py-2 px-3">42</td>
                              <td className="text-right py-2 px-3">17,0%</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                              <td className="py-2 px-3">Varejo</td>
                              <td className="text-right py-2 px-3">38</td>
                              <td className="text-right py-2 px-3">15,4%</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                              <td className="py-2 px-3">Construção</td>
                              <td className="text-right py-2 px-3">31</td>
                              <td className="text-right py-2 px-3">12,6%</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                              <td className="py-2 px-3">Telecomunicações</td>
                              <td className="text-right py-2 px-3">24</td>
                              <td className="text-right py-2 px-3">9,7%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">Outros</td>
                              <td className="text-right py-2 px-3">23</td>
                              <td className="text-right py-2 px-3">9,3%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-slate-500 mt-3">Fonte: Elaboração própria</p>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-3">3.2 Variáveis do Estudo</h3>
                    
                    <h4 className="text-base font-semibold text-slate-700 mb-2">Variável Dependente</h4>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      A variável dependente principal é a <strong>Alavancagem (LEV)</strong>, mensurada como a razão entre o total de passivos onerosos e o ativo total da empresa. Alternativamente, utilizamos a alavancagem contábil de longo prazo (dívida de longo prazo sobre ativo total) e a alavancagem de mercado (dívida total sobre valor de mercado da firma) para análises de robustez.
                    </p>

                    <h4 className="text-base font-semibold text-slate-700 mb-2">Variáveis Independentes</h4>
                    <div className="space-y-3 mb-6">
                      <div className="bg-pastel-blue/20 border-l-4 border-pastel-blue p-4 rounded-r-lg">
                        <p className="text-sm font-semibold text-slate-800 mb-1">Rentabilidade (ROA)</p>
                        <p className="text-sm text-slate-600">Lucro operacional sobre ativo total. Espera-se relação negativa com alavancagem, conforme previsto pela pecking order theory.</p>
                      </div>
                      
                      <div className="bg-pastel-green/20 border-l-4 border-pastel-green p-4 rounded-r-lg">
                        <p className="text-sm font-semibold text-slate-800 mb-1">Tamanho (SIZE)</p>
                        <p className="text-sm text-slate-600">Logaritmo natural do ativo total. Empresas maiores tendem a apresentar maior endividamento devido a economias de escala e menor risco de falência.</p>
                      </div>
                      
                      <div className="bg-pastel-yellow/20 border-l-4 border-pastel-yellow p-4 rounded-r-lg">
                        <p className="text-sm font-semibold text-slate-800 mb-1">Tangibilidade (TANG)</p>
                        <p className="text-sm text-slate-600">Ativo imobilizado sobre ativo total. Ativos tangíveis servem como colateral, facilitando acesso ao crédito e reduzindo custos de agência.</p>
                      </div>
                      
                      <div className="bg-pastel-purple/20 border-l-4 border-pastel-purple p-4 rounded-r-lg">
                        <p className="text-sm font-semibold text-slate-800 mb-1">Oportunidades de Crescimento (MTB)</p>
                        <p className="text-sm text-slate-600">Market-to-book ratio. Empresas com maiores oportunidades de crescimento tendem a utilizar menos dívida para evitar problemas de sub-investimento.</p>
                      </div>
                      
                      <div className="bg-pastel-pink/20 border-l-4 border-pastel-pink p-4 rounded-r-lg">
                        <p className="text-sm font-semibold text-slate-800 mb-1">Liquidez (LIQ)</p>
                        <p className="text-sm text-slate-600">Ativo circulante sobre passivo circulante. Maior liquidez reduz necessidade de financiamento externo.</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-3">3.3 Modelos Econométricos</h3>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Para investigar os determinantes da estrutura de capital, estimamos modelos de dados em painel com efeitos fixos de firma e tempo. A especificação básica do modelo é dada por:
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                      <div className="text-center font-mono text-sm text-slate-700">
                        <p className="mb-2">LEV<sub>it</sub> = β<sub>0</sub> + β<sub>1</sub>ROA<sub>it</sub> + β<sub>2</sub>SIZE<sub>it</sub> + β<sub>3</sub>TANG<sub>it</sub> + β<sub>4</sub>MTB<sub>it</sub> + β<sub>5</sub>LIQ<sub>it</sub> + α<sub>i</sub> + γ<sub>t</sub> + ε<sub>it</sub></p>
                      </div>
                      <p className="text-xs text-slate-500 mt-4">
                        Onde LEV<sub>it</sub> representa a alavancagem da empresa <em>i</em> no período <em>t</em>, α<sub>i</sub> captura efeitos fixos de firma, γ<sub>t</sub> captura efeitos fixos de tempo, e ε<sub>it</sub> é o termo de erro.
                      </p>
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-4">
                      Adicionalmente, estimamos um modelo dinâmico de ajuste parcial para investigar a velocidade com que as empresas convergem para sua estrutura de capital alvo:
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                      <div className="text-center font-mono text-sm text-slate-700">
                        <p className="mb-2">LEV<sub>it</sub> - LEV<sub>it-1</sub> = λ(LEV*<sub>it</sub> - LEV<sub>it-1</sub>) + ε<sub>it</sub></p>
                      </div>
                      <p className="text-xs text-slate-500 mt-4">
                        Onde λ representa a velocidade de ajuste, LEV*<sub>it</sub> é a alavancagem alvo, e LEV<sub>it-1</sub> é a alavancagem defasada.
                      </p>
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-6">
                      Para controlar a endogeneidade potencial decorrente da simultaneidade e variáveis omitidas, empregamos o método dos Momentos Generalizados em Sistema (System-GMM) proposto por Blundell e Bond (1998). Este método utiliza transformações em diferenças e níveis das variáveis instrumentais, sendo particularmente adequado para painéis com dimensão temporal moderada e potencial persistência na variável dependente.
                    </p>

                    <div className="bg-pastel-blue/20 border-l-4 border-pastel-blue p-4 rounded-r-lg mb-6">
                      <div className="flex items-start gap-3">
                        <Calculator size={20} className="text-slate-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 mb-1">Testes de Robustez</p>
                          <p className="text-sm text-slate-600">
                            Para validar os resultados, realizamos: (i) teste de Sargan/Hansen para validade dos instrumentos; (ii) teste de autocorrelação de Arellano-Bond; (iii) estimações alternativas com diferentes proxies de alavancagem; (iv) análise de subamostras por setor e tamanho da empresa.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* References Section */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Referências Bibliográficas</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500">[1]</span>
                      <button className="text-slate-400 hover:text-red-600">
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-700">
                      Modigliani, F., & Miller, M. H. (1958). The cost of capital, corporation finance and the theory of investment. <span className="italic">The American Economic Review</span>, 48(3), 261-297.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500">[2]</span>
                      <button className="text-slate-400 hover:text-red-600">
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-700">
                      Myers, S. C. (1984). The capital structure puzzle. <span className="italic">The Journal of Finance</span>, 39(3), 574-592.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500">[3]</span>
                      <button className="text-slate-400 hover:text-red-600">
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-700">
                      Rajan, R. G., & Zingales, L. (1995). What do we know about capital structure? Some evidence from international data. <span className="italic">The Journal of Finance</span>, 50(5), 1421-1460.
                    </p>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition text-sm">
                  <Plus size={16} className="inline mr-2" />
                  Adicionar Referência
                </button>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-1 space-y-6">
              {/* AI Assistant Panel */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <i className="fas fa-robot text-slate-700"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Assistente IA</h3>
                    <p className="text-xs text-slate-500">Sempre disponível</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="text-xs font-medium text-slate-700 mb-2 block">Agente Especialista</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                    <option value="finance">Finanças Corporativas</option>
                    <option value="capital-markets">Mercado de Capitais</option>
                    <option value="regulation">Regulação Financeira</option>
                    <option value="economics">Economia Monetária</option>
                    <option value="risk">Gestão de Riscos</option>
                    <option value="accounting">Contabilidade</option>
                    <option value="statistics">Estatística Aplicada</option>
                    <option value="methodology">Metodologia Científica</option>
                  </select>
                  <div className="mt-2 p-2 bg-pastel-purple/20 rounded-lg border border-pastel-purple/30">
                    <p className="text-xs text-slate-700"><i className="fas fa-info-circle mr-1"></i> Agente atual: <span className="font-semibold">Finanças Corporativas</span></p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <button className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-search text-slate-500"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Consultar Papers</p>
                        <p className="text-xs text-slate-500">Buscar referências</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-chart-bar text-slate-500"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Inserir Gráfico</p>
                        <p className="text-xs text-slate-500">Visualizações de dados</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-language text-slate-500"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Revisar Texto</p>
                        <p className="text-xs text-slate-500">Gramática e estilo</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-slate-100 transition">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-lightbulb text-slate-500"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Sugestões</p>
                        <p className="text-xs text-slate-500">Melhorar conteúdo</p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-2">Estatísticas do documento</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Palavras</span>
                      <span className="font-medium text-slate-800">1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Caracteres</span>
                      <span className="font-medium text-slate-800">8,934</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Referências</span>
                      <span className="font-medium text-slate-800">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Seções</span>
                      <span className="font-medium text-slate-800">2</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Paper Search Panel */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Consultar Papers</h3>
                <div className="relative mb-4">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                  <input 
                    type="text" 
                    placeholder="Buscar artigos..." 
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple"
                  />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-pastel-purple cursor-pointer transition">
                    <p className="text-xs font-medium text-slate-800 mb-1">Capital Structure Decisions</p>
                    <p className="text-xs text-slate-500 mb-2">Myers & Majluf (1984)</p>
                    <button className="text-xs text-pastel-purple font-medium hover:underline">
                      <Copy size={12} className="inline mr-1" />
                      Copiar referência
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-pastel-purple cursor-pointer transition">
                    <p className="text-xs font-medium text-slate-800 mb-1">Testing Trade-Off Theory</p>
                    <p className="text-xs text-slate-500 mb-2">Frank & Goyal (2009)</p>
                    <button className="text-xs text-pastel-purple font-medium hover:underline">
                      <Copy size={12} className="inline mr-1" />
                      Copiar referência
                    </button>
                  </div>
                </div>
              </section>

              {/* Chart Options Panel */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Tipos de Gráficos</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-pastel-purple transition text-center">
                    <i className="fas fa-chart-line text-2xl text-slate-400 mb-2"></i>
                    <p className="text-xs font-medium text-slate-700">Linha</p>
                  </button>
                  <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-pastel-purple transition text-center">
                    <i className="fas fa-chart-bar text-2xl text-slate-400 mb-2"></i>
                    <p className="text-xs font-medium text-slate-700">Barras</p>
                  </button>
                  <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-pastel-purple transition text-center">
                    <i className="fas fa-chart-pie text-2xl text-slate-400 mb-2"></i>
                    <p className="text-xs font-medium text-slate-700">Pizza</p>
                  </button>
                  <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-pastel-purple transition text-center">
                    <i className="fas fa-chart-area text-2xl text-slate-400 mb-2"></i>
                    <p className="text-xs font-medium text-slate-700">Área</p>
                  </button>
                  <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-pastel-purple transition text-center">
                    <i className="fas fa-project-diagram text-2xl text-slate-400 mb-2"></i>
                    <p className="text-xs font-medium text-slate-700">Dispersão</p>
                  </button>
                  <button className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-pastel-purple transition text-center">
                    <i className="fas fa-th text-2xl text-slate-400 mb-2"></i>
                    <p className="text-xs font-medium text-slate-700">Heatmap</p>
                  </button>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  <Plus size={16} className="inline mr-2" />
                  Criar Gráfico
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
