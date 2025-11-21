import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Star, Bookmark, Share2, Download, ChevronLeft, ChevronRight, Eye, Clock, BookOpen, Search, Lightbulb, Wand2, TrendingUp, PieChart, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EvolucaoCartaoCredito() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("sumario-executivo");
  const totalPages = 7;

  const showPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      // Scroll to top of article
      document.getElementById('article-content')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'sumario-executivo',
        'introducao',
        'panorama-historico',
        'analise-mercado',
        'tendencias',
        'impacto-digital',
        'concorrencia',
        'regulacao',
        'conclusoes',
        'referencias'
      ];

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex-none">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/aprendizado" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Evolução do Cartão de Crédito no Brasil</h1>
                <p className="text-xs text-muted-foreground">Análise completa do mercado de cartões de crédito 2018-2025</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground transition-colors">
                <Star className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="bg-[#D4C5E8] hover:bg-[#D4C5E8]/80 text-[#475569] px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar PDF
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-muted/30">
          <div className="grid grid-cols-12 gap-6 px-8 py-8 max-w-[1600px] mx-auto">
            {/* Table of Contents - Left Sidebar */}
            <aside className="col-span-3">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-6">
                {/* Progress Bar */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Progresso de Leitura</span>
                    <span>{Math.round((currentPage / totalPages) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D4C5E8] rounded-full transition-all"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h2 className="text-base font-semibold text-foreground mb-4">Índice</h2>
                <nav className="space-y-1 text-sm">
                  <a 
                    href="#sumario-executivo" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'sumario-executivo' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    1. Sumário Executivo
                  </a>
                  <a 
                    href="#introducao" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'introducao' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    2. Introdução
                  </a>
                  <a 
                    href="#panorama-historico" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'panorama-historico' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    3. Panorama Histórico
                  </a>
                  <a 
                    href="#analise-mercado" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'analise-mercado' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    4. Análise de Mercado
                  </a>
                  <a 
                    href="#tendencias" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'tendencias' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    5. Tendências e Projeções
                  </a>
                  <a 
                    href="#impacto-digital" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'impacto-digital' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    6. Impacto da Digitalização
                  </a>
                  <a 
                    href="#concorrencia" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'concorrencia' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    7. Análise Competitiva
                  </a>
                  <a 
                    href="#regulacao" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'regulacao' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    8. Ambiente Regulatório
                  </a>
                  <a 
                    href="#conclusoes" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'conclusoes' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    9. Conclusões
                  </a>
                  <a 
                    href="#referencias" 
                    className={`block px-3 py-2 rounded-lg transition ${
                      activeSection === 'referencias' 
                        ? 'bg-[#D4C5E8] text-[#475569] font-medium' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    10. Referências
                  </a>
                </nav>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Ferramentas IA</h3>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-[#B8D4E8] text-[#475569] text-sm rounded-lg hover:bg-[#B8D4E8]/80 transition flex items-center gap-2">
                      <Wand2 className="w-4 h-4" />
                      <span>Resumir Página</span>
                    </button>
                    <button className="w-full px-3 py-2 bg-[#C5E8D4] text-[#475569] text-sm rounded-lg hover:bg-[#C5E8D4]/80 transition flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      <span>Buscar Específico</span>
                    </button>
                    <button className="w-full px-3 py-2 bg-[#E8E0C5] text-[#475569] text-sm rounded-lg hover:bg-[#E8E0C5]/80 transition flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      <span>Gerar Insights</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Article Content */}
            <article id="article-content" className="col-span-6 bg-card rounded-xl border border-border p-8">
              {/* Article Metadata */}
              <div className="mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#D4C5E8] rounded-lg flex items-center justify-center">
                    <i className="fas fa-robot text-[#475569] text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Análise Gerada por IA</p>
                    <p className="text-xs text-muted-foreground">Agente: Análise de Meios de Pagamento</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Atualizado há 3 horas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>28 min de leitura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>1.8k visualizações</span>
                  </div>
                </div>
              </div>

              {/* Page Content */}
              <section className="prose max-w-none">
                {currentPage === 1 && (
                  <>
                    <div id="sumario-executivo" className="mb-12">
                      <h2 className="text-2xl font-bold text-foreground mb-4">1. Sumário Executivo</h2>
                      <div className="bg-[#B8D4E8]/30 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Principais Destaques</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <i className="fas fa-check-circle text-[#D4C5E8] mt-1"></i>
                            <span>O mercado de cartões de crédito cresceu 48,6% entre 2018 e 2025, alcançando R$ 275 bilhões mensais</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <i className="fas fa-check-circle text-[#D4C5E8] mt-1"></i>
                            <span>Penetração de cartões digitais aumentou de 15% para 67% no período analisado</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <i className="fas fa-check-circle text-[#D4C5E8] mt-1"></i>
                            <span>Modalidade de crédito rotativo apresentou redução de 23% devido a novas regulamentações</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <i className="fas fa-check-circle text-[#D4C5E8] mt-1"></i>
                            <span>Fintechs conquistaram 34% do mercado de emissão de novos cartões em 2024-2025</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div id="introducao" className="mb-12">
                      <h2 className="text-2xl font-bold text-foreground mb-4">2. Introdução</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        O mercado brasileiro de cartões de crédito passou por transformações significativas nos últimos sete anos, refletindo mudanças estruturais no comportamento do consumidor, avanços tecnológicos e alterações no marco regulatório do setor financeiro. Este relatório apresenta uma análise detalhada da evolução do setor entre 2018 e 2025, contextualizando os principais drivers de crescimento e os desafios enfrentados pela indústria.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Segundo dados do Banco Central do Brasil, o volume transacionado com cartões de crédito apresentou crescimento consistente no período, mesmo com a concorrência crescente de novos meios de pagamento instantâneos como o Pix. A resiliência do segmento demonstra a relevância do crédito como ferramenta de gestão financeira para consumidores e empresas.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        A análise considera múltiplas variáveis macroeconômicas, incluindo taxa de juros, inflação, emprego, renda disponível e confiança do consumidor, além de fatores microeconômicos específicos do setor de pagamentos. Nossa metodologia combina análise quantitativa de séries históricas com insights qualitativos obtidos através de inteligência artificial especializada em mercado financeiro.
                      </p>

                      <div className="bg-muted rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                          <i className="fas fa-info-circle text-[#B8D4E8]"></i>
                          Metodologia de Análise
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Este estudo utiliza dados primários do Banco Central do Brasil, ABECS (Associação Brasileira das Empresas de Cartões de Crédito e Serviços), IBGE e instituições financeiras participantes. Os dados foram processados através de algoritmos de machine learning para identificação de padrões, tendências e correlações estatisticamente significativas.
                        </p>
                      </div>
                    </div>

                    <div id="panorama-historico" className="mb-12">
                      <h2 className="text-2xl font-bold text-foreground mb-4">3. Panorama Histórico 2018-2025</h2>
                      <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Evolução do Volume Transacionado</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        O período entre 2018 e 2025 foi marcado por crescimento contínuo no volume mensal transacionado com cartões de crédito no Brasil. Em 2018, o volume médio mensal era de R$ 185 bilhões, valor que cresceu para R$ 275 bilhões em 2025, representando um aumento acumulado de 48,6%. Este crescimento não foi linear, apresentando aceleração significativa nos anos de 2021-2022 e moderação em 2024-2025.
                      </p>

                      <div className="bg-card rounded-lg border border-border p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-foreground">Volume Transacionado Mensal (R$ Bilhões)</h4>
                        </div>
                        <div className="w-full h-[350px] bg-gradient-to-br from-[#D4C5E8]/10 to-[#B8D4E8]/10 rounded-lg flex items-center justify-center border border-border/50">
                          <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-[#D4C5E8] mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">Gráfico: Volume cresceu de R$ 185bi (2018) para R$ 275bi (2025)</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4">
                        A análise detalhada dos dados revela três fases distintas neste período. A primeira fase (2018-2020) foi caracterizada por crescimento moderado de 3,5% ao ano, impactado pela recuperação econômica pós-recessão de 2015-2016. A segunda fase (2021-2022) apresentou crescimento acelerado de 11,2% ao ano, impulsionado pela digitalização acelerada durante a pandemia e pela expansão do crédito. A terceira fase (2023-2025) mostra crescimento mais moderado de 4,8% ao ano, refletindo maturidade do mercado e concorrência de novos meios de pagamento.
                      </p>
                    </div>
                  </>
                )}

                {currentPage === 2 && (
                  <>
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Fatores Macroeconômicos</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        O comportamento do mercado de cartões de crédito está intrinsecamente ligado a variáveis macroeconômicas. Durante o período analisado, a taxa Selic variou significativamente, partindo de 6,5% ao ano em 2018, atingindo mínima histórica de 2% em 2020, e retornando para níveis de 10,75% em 2025. Esta volatilidade impactou diretamente o custo do crédito rotativo e parcelado, influenciando o comportamento dos consumidores.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#B8D4E8]/30 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <i className="fas fa-percentage text-[#475569] text-xl"></i>
                            <div>
                              <p className="text-xs text-muted-foreground">Taxa Selic 2025</p>
                              <p className="text-2xl font-bold text-foreground">10,75%</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#C5E8D4]/30 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <i className="fas fa-chart-line text-[#475569] text-xl"></i>
                            <div>
                              <p className="text-xs text-muted-foreground">Inflação Acumulada</p>
                              <p className="text-2xl font-bold text-foreground">4,62%</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">3.3 Distribuição por Bandeiras</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        A distribuição de mercado por bandeiras manteve-se relativamente estável, com Visa e Mastercard dominando 90% do mercado. A Visa mantém liderança com 52% de participação em 2025, seguida pela Mastercard com 38%. A bandeira nacional Elo detém 6% do mercado, enquanto Amex e outras bandeiras compartilham os 4% restantes.
                      </p>

                      <div className="bg-card rounded-lg border border-border p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-foreground">Distribuição por Bandeiras 2025</h4>
                        </div>
                        <div className="w-full h-[350px] bg-gradient-to-br from-[#B8D4E8]/10 to-[#C5E8D4]/10 rounded-lg flex items-center justify-center border border-border/50">
                          <div className="text-center">
                            <PieChart className="w-12 h-12 text-[#B8D4E8] mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">Distribuição: Visa 52%, Mastercard 38%, Elo 6%, Outros 4%</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        A Visa consolidou sua posição através de parcerias estratégicas com grandes bancos digitais e fintechs, especialmente no segmento de cartões virtuais e contactless. A Mastercard, por sua vez, investiu fortemente em tecnologia tokenização e programas de cashback, conquistando participação significativa entre consumidores de alta renda e pequenas empresas.
                      </p>

                      <div className="bg-[#E8E0C5]/30 rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                          <i className="fas fa-lightbulb text-[#475569]"></i>
                          Insight do Agente de IA
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A concentração de mercado nas duas principais bandeiras (90%) indica barreiras de entrada elevadas para novos players. No entanto, a ascensão de carteiras digitais e soluções de pagamento proprietárias pode desafiar esse modelo nos próximos anos, especialmente no segmento de pagamentos online e mobile.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {currentPage === 3 && (
                  <>
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">4.2 Perfil de Utilização</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        O comportamento de utilização dos cartões de crédito apresenta variações significativas por faixa etária, renda e região geográfica. Consumidores entre 25-44 anos representam 58% do volume transacionado, enquanto o público acima de 60 anos cresceu sua participação de 12% em 2018 para 19% em 2025, impulsionado pela digitalização e maior inclusão financeira.
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#B8D4E8]/30 rounded-lg p-4">
                          <div className="text-center">
                            <i className="fas fa-shopping-cart text-3xl text-[#475569] mb-3"></i>
                            <p className="text-2xl font-bold text-foreground">38%</p>
                            <p className="text-xs text-muted-foreground mt-1">Compras Varejo</p>
                          </div>
                        </div>
                        <div className="bg-[#C5E8D4]/30 rounded-lg p-4">
                          <div className="text-center">
                            <i className="fas fa-utensils text-3xl text-[#475569] mb-3"></i>
                            <p className="text-2xl font-bold text-foreground">22%</p>
                            <p className="text-xs text-muted-foreground mt-1">Alimentação</p>
                          </div>
                        </div>
                        <div className="bg-[#D4C5E8]/30 rounded-lg p-4">
                          <div className="text-center">
                            <i className="fas fa-plane text-3xl text-[#475569] mb-3"></i>
                            <p className="text-2xl font-bold text-foreground">18%</p>
                            <p className="text-xs text-muted-foreground mt-1">Viagens & Turismo</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        O ticket médio das transações cresceu 31% no período, passando de R$ 156 em 2018 para R$ 204 em 2025. Este crescimento reflete não apenas a inflação acumulada, mas também mudança no perfil de consumo, com maior utilização de cartões para compras de maior valor agregado, incluindo eletrônicos, móveis e serviços profissionais.
                      </p>

                      <div className="bg-card rounded-lg border border-border p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-foreground">Evolução do Ticket Médio (R$)</h4>
                        </div>
                        <div className="w-full h-[300px] bg-gradient-to-br from-[#C5E8D4]/10 to-[#E8E0C5]/10 rounded-lg flex items-center justify-center border border-border/50">
                          <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-[#C5E8D4] mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">Ticket médio cresceu de R$ 156 (2018) para R$ 204 (2025)</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">4.3 Modalidades de Crédito</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        A distribuição entre crédito rotativo, parcelado lojista e parcelado emissor apresentou alterações importantes. O crédito rotativo, historicamente responsável por 18-22% do volume, reduziu sua participação para 14% em 2025, resultado direto de regulamentações mais rígidas do Banco Central e conscientização dos consumidores sobre os altos custos desta modalidade.
                      </p>

                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted border-b border-border">
                              <th className="text-left py-3 px-4 font-semibold text-foreground">Modalidade</th>
                              <th className="text-center py-3 px-4 font-semibold text-foreground">2018</th>
                              <th className="text-center py-3 px-4 font-semibold text-foreground">2022</th>
                              <th className="text-center py-3 px-4 font-semibold text-foreground">2025</th>
                              <th className="text-center py-3 px-4 font-semibold text-foreground">Variação</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 text-muted-foreground">Parcelado Lojista</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">48%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">52%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">56%</td>
                              <td className="text-center py-3 px-4 text-green-600 font-medium">+8pp</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 text-muted-foreground">Parcelado Emissor</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">32%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">29%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">30%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground font-medium">-2pp</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 text-muted-foreground">Crédito Rotativo</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">20%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">19%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">14%</td>
                              <td className="text-center py-3 px-4 text-red-600 font-medium">-6pp</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {currentPage === 4 && (
                  <>
                    <div id="tendencias" className="mb-12">
                      <h2 className="text-2xl font-bold text-foreground mb-4">5. Tendências e Projeções</h2>
                      <h3 className="text-xl font-semibold text-foreground mb-3">5.1 Digitalização e Cartões Virtuais</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        A transformação digital revolucionou o mercado de cartões de crédito. Em 2018, apenas 15% dos cartões emitidos eram digitais ou virtuais. Este número saltou para 67% em 2025, impulsionado pela popularização de carteiras digitais (Apple Pay, Google Pay, Samsung Pay) e pela estratégia de bancos digitais que priorizam emissão virtual com opção de cartão físico sob demanda.
                      </p>

                      <div className="bg-card rounded-lg border border-border p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-foreground">Penetração de Cartões Digitais (%)</h4>
                        </div>
                        <div className="w-full h-[350px] bg-gradient-to-br from-[#B8D4E8]/10 to-[#D4C5E8]/10 rounded-lg flex items-center justify-center border border-border/50">
                          <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-[#B8D4E8] mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">Penetração cresceu de 15% (2018) para 67% (2025)</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4">
                        A tecnologia contactless (aproximação/NFC) também apresentou crescimento exponencial. De apenas 8% das transações presenciais em 2018, passou para 78% em 2025. A pandemia de COVID-19 acelerou significativamente esta adoção, com consumidores e estabelecimentos priorizando métodos de pagamento sem contato físico.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#C5E8D4]/30 rounded-lg p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-[#C5E8D4] rounded-lg flex items-center justify-center">
                              <i className="fas fa-mobile-alt text-[#475569] text-xl"></i>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Transações Mobile</p>
                              <p className="text-2xl font-bold text-foreground">62%</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Crescimento de 340% desde 2018</p>
                        </div>
                        <div className="bg-[#B8D4E8]/30 rounded-lg p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-[#B8D4E8] rounded-lg flex items-center justify-center">
                              <i className="fas fa-wifi text-[#475569] text-xl"></i>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Contactless</p>
                              <p className="text-2xl font-bold text-foreground">78%</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Das transações presenciais em 2025</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">5.2 Competição com Meios de Pagamento Instantâneos</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        O lançamento do Pix em novembro de 2020 representou o maior desafio competitivo para o mercado de cartões de crédito nas últimas décadas. Inicialmente projetado para substituir principalmente débito e dinheiro, o Pix também capturou parcela significativa de transações que tradicionalmente seriam realizadas via crédito, especialmente no segmento de pequenos valores e transferências pessoa-a-pessoa.
                      </p>

                      <div className="bg-[#E8E0C5]/30 rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                          <i className="fas fa-bolt text-[#475569]"></i>
                          Análise Comparativa: Cartão vs. Pix
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <i className="fas fa-check-circle text-[#C5E8D4] mt-0.5"></i>
                            <div>
                              <p className="font-medium text-foreground mb-1">Vantagens do Cartão de Crédito</p>
                              <p className="text-muted-foreground">Crédito imediato, parcelamento, programas de recompensas, proteção ao consumidor, aceitação internacional</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <i className="fas fa-check-circle text-[#B8D4E8] mt-0.5"></i>
                            <div>
                              <p className="font-medium text-foreground mb-1">Vantagens do Pix</p>
                              <p className="text-muted-foreground">Instantaneidade, sem taxas para pessoa física, disponibilidade 24/7, simplicidade, sem necessidade de crédito pré-aprovado</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentPage === 5 && (
                  <>
                    <div id="impacto-digital" className="mb-12">
                      <h2 className="text-2xl font-bold text-foreground mb-4">6. Impacto da Digitalização</h2>
                      <h3 className="text-xl font-semibold text-foreground mb-3">6.1 Inteligência Artificial e Machine Learning</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        A aplicação de inteligência artificial transformou fundamentalmente a operação de cartões de crédito. Sistemas de IA agora processam análises de crédito em tempo real, detectam fraudes com precisão superior a 96%, e personalizam ofertas com base no comportamento individual de cada cliente. O impacto é mensurável em todos os indicadores operacionais.
                      </p>

                      <div className="bg-[#D4C5E8]/30 rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <i className="fas fa-brain text-[#475569]"></i>
                          Aplicações de IA no Mercado de Cartões
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-card rounded-lg p-4">
                            <p className="font-medium text-foreground mb-2">Análise de Crédito Dinâmica</p>
                            <p className="text-sm text-muted-foreground">Avaliação contínua do perfil do cliente com ajuste automático de limites baseado em comportamento transacional, histórico de pagamentos e dados alternativos (telemetria mobile, redes sociais, padrões de consumo).</p>
                          </div>
                          <div className="bg-card rounded-lg p-4">
                            <p className="font-medium text-foreground mb-2">Detecção de Fraudes</p>
                            <p className="text-sm text-muted-foreground">Sistemas neurais identificam padrões anômalos em milissegundos, reduzindo fraudes em 67% e falsos positivos em 82% comparado a sistemas rule-based tradicionais.</p>
                          </div>
                          <div className="bg-card rounded-lg p-4">
                            <p className="font-medium text-foreground mb-2">Personalização de Ofertas</p>
                            <p className="text-sm text-muted-foreground">Algoritmos de recomendação sugerem produtos, limites e benefícios customizados para cada perfil, aumentando conversão em 54% e satisfação em 41%.</p>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted border-b border-border">
                              <th className="text-left py-3 px-4 font-semibold text-foreground">Indicador</th>
                              <th className="text-center py-3 px-4 font-semibold text-foreground">Antes IA (2018)</th>
                              <th className="text-center py-3 px-4 font-semibold text-foreground">Com IA (2025)</th>
                              <th className="text-center py-3 px-4 font-semibold text-foreground">Melhoria</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 text-muted-foreground">Taxa de Aprovação</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">42%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">68%</td>
                              <td className="text-center py-3 px-4 text-green-600 font-medium">+62%</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 text-muted-foreground">Tempo de Análise</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">3-5 dias</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">Instantâneo</td>
                              <td className="text-center py-3 px-4 text-green-600 font-medium">-99%</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 text-muted-foreground">Fraudes Detectadas</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">78%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">96%</td>
                              <td className="text-center py-3 px-4 text-green-600 font-medium">+23%</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 text-muted-foreground">Inadimplência &gt;90d</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">6.8%</td>
                              <td className="text-center py-3 px-4 text-muted-foreground">4.2%</td>
                              <td className="text-center py-3 px-4 text-green-600 font-medium">-38%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">6.3 Segurança e Tokenização</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        A evolução das tecnologias de segurança foi fundamental para sustentar o crescimento do mercado digital. A tokenização, processo que substitui dados sensíveis do cartão por tokens únicos e criptografados para cada transação, tornou-se padrão da indústria. Em 2025, 91% das transações digitais utilizam tokenização, comparado a apenas 23% em 2018.
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-card rounded-lg border border-border p-4 text-center">
                          <div className="w-12 h-12 bg-[#B8D4E8] rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-shield-alt text-[#475569] text-xl"></i>
                          </div>
                          <p className="text-2xl font-bold text-foreground mb-1">91%</p>
                          <p className="text-xs text-muted-foreground">Uso de Tokenização</p>
                        </div>
                        <div className="bg-card rounded-lg border border-border p-4 text-center">
                          <div className="w-12 h-12 bg-[#D4C5E8] rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-fingerprint text-[#475569] text-xl"></i>
                          </div>
                          <p className="text-2xl font-bold text-foreground mb-1">84%</p>
                          <p className="text-xs text-muted-foreground">Biometria Integrada</p>
                        </div>
                        <div className="bg-card rounded-lg border border-border p-4 text-center">
                          <div className="w-12 h-12 bg-[#C5E8D4] rounded-lg flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-lock text-[#475569] text-xl"></i>
                          </div>
                          <p className="text-2xl font-bold text-foreground mb-1">-73%</p>
                          <p className="text-xs text-muted-foreground">Redução de Fraudes</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentPage === 6 && (
                  <>
                    <div id="regulacao" className="mb-12">
                      <h2 className="text-2xl font-bold text-foreground mb-4">8. Ambiente Regulatório</h2>
                      <h3 className="text-xl font-semibold text-foreground mb-3">8.1 Marco Regulatório e Evolução</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        O ambiente regulatório brasileiro passou por transformações profundas no período analisado, com o Banco Central do Brasil assumindo papel protagonista na modernização do sistema financeiro. As principais iniciativas incluem a Agenda BC#, Open Finance, regulamentação de fintechs e medidas de proteção ao consumidor.
                      </p>

                      <div className="bg-muted rounded-lg p-6 mb-6">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <i className="fas fa-landmark text-[#D4C5E8]"></i>
                          Principais Marcos Regulatórios 2018-2025
                        </h4>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="w-20 flex-shrink-0">
                              <span className="inline-block px-3 py-1 bg-[#B8D4E8] text-[#475569] text-xs font-medium rounded">2018</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm mb-1">Resolução CMN nº 4.656</p>
                              <p className="text-xs text-muted-foreground">Regulamentação de instituições de pagamento e arranjos de pagamento</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-20 flex-shrink-0">
                              <span className="inline-block px-3 py-1 bg-[#C5E8D4] text-[#475569] text-xs font-medium rounded">2020</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm mb-1">Lançamento do PIX</p>
                              <p className="text-xs text-muted-foreground">Sistema de pagamentos instantâneos do Banco Central</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-20 flex-shrink-0">
                              <span className="inline-block px-3 py-1 bg-[#D4C5E8] text-[#475569] text-xs font-medium rounded">2021</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm mb-1">Open Banking (Open Finance)</p>
                              <p className="text-xs text-muted-foreground">Compartilhamento de dados e serviços entre instituições</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-20 flex-shrink-0">
                              <span className="inline-block px-3 py-1 bg-[#E8E0C5] text-[#475569] text-xs font-medium rounded">2023</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm mb-1">Resolução BCB nº 312</p>
                              <p className="text-xs text-muted-foreground">Novas regras de portabilidade de cadastro e propostas de crédito</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">8.2 Open Finance e Compartilhamento de Dados</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        O Open Finance, implementado em fases entre 2021 e 2023, revolucionou o ecossistema financeiro brasileiro. O compartilhamento de dados cadastrais, transacionais e de crédito entre instituições, mediante consentimento do cliente, possibilitou análises de crédito mais precisas, portabilidade facilitada e desenvolvimento de produtos financeiros personalizados.
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#B8D4E8]/30 rounded-lg p-4 text-center">
                          <i className="fas fa-users text-3xl text-[#475569] mb-3"></i>
                          <p className="text-2xl font-bold text-foreground">47M</p>
                          <p className="text-xs text-muted-foreground mt-1">Usuários Ativos Open Finance</p>
                        </div>
                        <div className="bg-[#C5E8D4]/30 rounded-lg p-4 text-center">
                          <i className="fas fa-exchange-alt text-3xl text-[#475569] mb-3"></i>
                          <p className="text-2xl font-bold text-foreground">2.8Bi</p>
                          <p className="text-xs text-muted-foreground mt-1">Compartilhamentos Realizados</p>
                        </div>
                        <div className="bg-[#D4C5E8]/30 rounded-lg p-4 text-center">
                          <i className="fas fa-building text-3xl text-[#475569] mb-3"></i>
                          <p className="text-2xl font-bold text-foreground">890+</p>
                          <p className="text-xs text-muted-foreground mt-1">Instituições Participantes</p>
                        </div>
                      </div>

                      <div className="bg-card rounded-lg border border-border p-6 mb-6">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <i className="fas fa-chart-line text-[#C5E8D4]"></i>
                          Impacto do Open Finance no Mercado de Cartões
                        </h4>
                        <div className="w-full h-[300px] bg-gradient-to-br from-[#C5E8D4]/10 to-[#B8D4E8]/10 rounded-lg flex items-center justify-center border border-border/50">
                          <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-[#C5E8D4] mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">Taxa de aprovação cresceu de 42% (2021) para 68% (2025)</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">9.2 Recomendações Estratégicas</h3>
                      <div className="space-y-6 mb-8">
                        <div className="bg-[#D4C5E8]/30 rounded-lg p-6">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <i className="fas fa-building text-[#475569]"></i>
                            Para Emissores Tradicionais
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <i className="fas fa-arrow-right text-[#D4C5E8] mt-1"></i>
                              <span>Acelerar transformação digital com foco em experiência mobile-first</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <i className="fas fa-arrow-right text-[#D4C5E8] mt-1"></i>
                              <span>Investir em IA para personalização e análise preditiva de comportamento</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <i className="fas fa-arrow-right text-[#D4C5E8] mt-1"></i>
                              <span>Desenvolver ecossistemas integrados além de pagamentos (marketplace, serviços)</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-[#C5E8D4]/30 rounded-lg p-6">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <i className="fas fa-rocket text-[#475569]"></i>
                            Para Fintechs e Novos Entrantes
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <i className="fas fa-arrow-right text-[#C5E8D4] mt-1"></i>
                              <span>Focar em nichos específicos com propostas de valor altamente diferenciadas</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <i className="fas fa-arrow-right text-[#C5E8D4] mt-1"></i>
                              <span>Construir parcerias estratégicas para acesso a infraestrutura e funding</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-6 mb-6">
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                          "A transformação do mercado de cartões de crédito brasileiro nos últimos sete anos representa microcosmo da revolução digital no setor financeiro. As lições aprendidas - importância da experiência do usuário, poder da inovação tecnológica, necessidade de regulação equilibrada e valor da competição - são aplicáveis a todo o ecossistema financeiro e servem de referência para outros mercados emergentes."
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                          <i className="fas fa-quote-right"></i>
                          <span>Agente de IA - Análise de Meios de Pagamento</span>
                        </div>
                      </div>
                    </div>

                    <div id="referencias" className="mb-12">
                      <h2 className="text-2xl font-bold text-foreground mb-4">10. Referências</h2>
                      <div className="space-y-4">
                        <div className="bg-card rounded-lg border border-border p-5">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <i className="fas fa-landmark text-[#D4C5E8]"></i>
                            Fontes Oficiais e Regulatórias
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <i className="fas fa-file-alt text-xs text-muted-foreground mt-1"></i>
                              <span>Banco Central do Brasil. (2018-2025). Relatório de Estabilidade Financeira. Brasília: BCB.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <i className="fas fa-file-alt text-xs text-muted-foreground mt-1"></i>
                              <span>Banco Central do Brasil. (2024). Estatísticas de Meios de Pagamento. Sistema de Pagamentos Brasileiro.</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-card rounded-lg border border-border p-5">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <i className="fas fa-chart-bar text-[#B8D4E8]"></i>
                            Associações e Entidades Setoriais
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <i className="fas fa-file-alt text-xs text-muted-foreground mt-1"></i>
                              <span>ABECS - Associação Brasileira das Empresas de Cartões de Crédito e Serviços. (2018-2025). Indicadores de Mercado.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <i className="fas fa-file-alt text-xs text-muted-foreground mt-1"></i>
                              <span>FEBRABAN - Federação Brasileira de Bancos. (2024). Pesquisa FEBRABAN de Tecnologia Bancária.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </section>

              {/* Pagination */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <button
                  onClick={() => showPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-lg transition flex items-center justify-center ${
                    currentPage === 1 
                      ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                      : 'bg-[#D4C5E8] text-[#475569] hover:bg-[#D4C5E8]/80'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => showPage(page)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition ${
                        currentPage === page
                          ? 'bg-[#D4C5E8] text-[#475569]'
                          : 'bg-muted text-muted-foreground hover:bg-accent/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => showPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-lg transition flex items-center justify-center ${
                    currentPage === totalPages
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-[#D4C5E8] text-[#475569] hover:bg-[#D4C5E8]/80'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </article>

            {/* Right Sidebar */}
            <aside className="col-span-3">
              <div className="sticky top-6 space-y-6">
                {/* Related Content */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Conteúdos Relacionados</h3>
                  <div className="space-y-4">
                    <a href="#" className="block p-3 bg-muted/50 rounded-lg hover:bg-accent/10 transition">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#B8D4E8] rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-file-alt text-[#475569]"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-2">Open Finance e o Futuro dos Pagamentos</p>
                          <p className="text-xs text-muted-foreground mt-1">12 min</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="block p-3 bg-muted/50 rounded-lg hover:bg-accent/10 transition">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#C5E8D4] rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-chart-pie text-[#475569]"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-2">Análise de Fintechs Brasileiras</p>
                          <p className="text-xs text-muted-foreground mt-1">18 min</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Author Info */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Sobre o Agente</h3>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D4C5E8] rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-robot text-[#475569] text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Agente de IA</p>
                      <p className="text-xs text-muted-foreground">Especialista em Meios de Pagamento</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Agente especializado em análise de mercado de pagamentos, crédito e serviços financeiros. Combina dados de múltiplas fontes para gerar insights estratégicos.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
