import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Share2, Bookmark, Calendar, Clock, Users, Video, PlayCircle, FileText, Award, MessageCircle, Shield, Star, Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function WebinarDetalhes() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/aprendizado" className="text-foreground hover:text-foreground/80">
                <ArrowLeft className="text-lg" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Cenário Macroeconômico 2025</h1>
                <p className="text-sm text-muted-foreground mt-1">Webinar Premium</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-foreground hover:bg-accent rounded-lg transition">
                <Share2 className="text-lg" />
              </button>
              <button className="p-2 text-foreground hover:bg-accent rounded-lg transition">
                <Bookmark className="text-lg" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              {/* Hero Section */}
              <section className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="h-96 bg-pastel-blue overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png" 
                    alt="Cenário Macroeconômico"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur text-white text-sm font-medium rounded-full">Macroeconomia</span>
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur text-white text-sm font-medium rounded-full">Premium</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Cenário Macroeconômico 2025</h2>
                    <p className="text-lg text-white/90">O que esperar dos mercados globais no próximo ano</p>
                  </div>
                </div>
              </section>

              {/* Webinar Info */}
              <section className="bg-card rounded-xl border border-border p-8">
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-foreground text-lg" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">DATA</p>
                      <p className="text-sm text-foreground font-semibold">20 de Novembro, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-foreground text-lg" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">HORÁRIO</p>
                      <p className="text-sm text-foreground font-semibold">14:00 - 16:00 (BRT)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-foreground text-lg" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">VAGAS</p>
                      <p className="text-sm text-foreground font-semibold">142 de 300 disponíveis</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Sobre o Webinar</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Prepare-se para navegar pelos desafios e oportunidades do cenário macroeconômico global em 2025. Este webinar premium oferece uma análise profunda e estratégica dos principais fatores que moldarão os mercados financeiros no próximo ano.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Com especialistas renomados, você terá acesso a insights exclusivos sobre política monetária, inflação, taxas de juros, crescimento econômico e seus impactos diretos nos investimentos. Uma oportunidade única para profissionais que buscam se antecipar às tendências e tomar decisões mais assertivas.
                  </p>
                </div>
                
                <div className="bg-pastel-yellow/[0.3] border border-pastel-yellow rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Star className="text-pastel-gray-dark text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Webinar Premium</h4>
                      <p className="text-sm text-muted-foreground">Este é um evento exclusivo com acesso limitado. Inclui material complementar, certificado de participação e acesso à gravação por 30 dias.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Agenda Section */}
              <section className="bg-card rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Agenda do Webinar</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 pb-4 border-b border-border">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-semibold text-foreground">14:00</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Abertura e Contexto Global</h4>
                      <p className="text-sm text-muted-foreground">Panorama econômico mundial e principais tendências para 2025</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pb-4 border-b border-border">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-semibold text-foreground">14:20</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Política Monetária e Taxas de Juros</h4>
                      <p className="text-sm text-muted-foreground">Análise das decisões dos principais bancos centrais e impactos nos mercados</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pb-4 border-b border-border">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-semibold text-foreground">14:45</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Inflação e Crescimento Econômico</h4>
                      <p className="text-sm text-muted-foreground">Projeções inflacionárias e expectativas de crescimento para as principais economias</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pb-4 border-b border-border">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-semibold text-foreground">15:10</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Mercados Emergentes e Brasil</h4>
                      <p className="text-sm text-muted-foreground">Oportunidades e riscos nos mercados emergentes com foco no cenário brasileiro</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pb-4 border-b border-border">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-semibold text-foreground">15:30</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Estratégias de Investimento</h4>
                      <p className="text-sm text-muted-foreground">Como posicionar carteiras diante do cenário macroeconômico projetado</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm font-semibold text-foreground">15:50</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Q&A com Palestrantes</h4>
                      <p className="text-sm text-muted-foreground">Sessão de perguntas e respostas ao vivo com os especialistas</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Speakers Section */}
              <section className="bg-card rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Palestrantes</h3>
                <div className="space-y-6">
                  <div className="flex gap-6 pb-6 border-b border-border">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" 
                      alt="Dr. Roberto Lima" 
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">Dr. Roberto Lima</h4>
                          <p className="text-sm text-muted-foreground">Economista-Chefe e Expert em Macroeconomia</p>
                        </div>
                        <div className="flex gap-2">
                          <a href="#" className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition">
                            <Linkedin className="text-sm" />
                          </a>
                          <a href="#" className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition">
                            <Mail className="text-sm" />
                          </a>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        PhD em Economia pela Universidade de São Paulo com mais de 20 anos de experiência em análise macroeconômica. Ex-diretor do Banco Central e atualmente Chief Economist de uma das maiores instituições financeiras do país. Autor de diversos artigos sobre política monetária e crescimento econômico.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Video size={14} />
                          15 webinars
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Star size={14} />
                          4.9/5.0
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          8.2k participantes
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 pb-6 border-b border-border">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" 
                      alt="Dra. Mariana Santos" 
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">Dra. Mariana Santos</h4>
                          <p className="text-sm text-muted-foreground">Especialista em Mercados Internacionais</p>
                        </div>
                        <div className="flex gap-2">
                          <a href="#" className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition">
                            <Linkedin className="text-sm" />
                          </a>
                          <a href="#" className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition">
                            <Mail className="text-sm" />
                          </a>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Mestre em Finanças Internacionais pela London School of Economics com especialização em mercados emergentes. Atuou como estrategista global em fundos de investimento internacionais por 15 anos. Reconhecida por suas análises precisas sobre fluxos de capital e tendências globais.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Video size={14} />
                          12 webinars
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Star size={14} />
                          4.8/5.0
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          6.5k participantes
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" 
                      alt="Prof. Carlos Mendes" 
                      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">Prof. Carlos Mendes</h4>
                          <p className="text-sm text-muted-foreground">Analista Sênior de Mercado e Estrategista</p>
                        </div>
                        <div className="flex gap-2">
                          <a href="#" className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition">
                            <Linkedin className="text-sm" />
                          </a>
                          <a href="#" className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center text-pastel-gray-dark hover:bg-opacity-80 transition">
                            <Mail className="text-sm" />
                          </a>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        MBA pela Columbia Business School e CFA Charterholder com 18 anos de experiência em gestão de portfólios. Professor visitante em diversas universidades e palestrante internacional. Especialista em alocação de ativos e estratégias de investimento baseadas em análise macroeconômica.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Video size={14} />
                          18 webinars
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Star size={14} />
                          5.0/5.0
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          9.8k participantes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Benefits Section */}
              <section className="bg-card rounded-xl border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">O que está incluído</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="text-pastel-gray-dark" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Acesso ao Vivo</h4>
                      <p className="text-sm text-muted-foreground">Participe ao vivo com interação direta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <PlayCircle className="text-pastel-gray-dark" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Gravação por 30 dias</h4>
                      <p className="text-sm text-muted-foreground">Assista quantas vezes quiser</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="text-pastel-gray-dark" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Material Complementar</h4>
                      <p className="text-sm text-muted-foreground">Slides e relatórios em PDF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="text-pastel-gray-dark" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Certificado</h4>
                      <p className="text-sm text-muted-foreground">Certificado digital de participação</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-pastel-gray-dark" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Sessão Q&A</h4>
                      <p className="text-sm text-muted-foreground">Perguntas diretas aos palestrantes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-pastel-gray-dark" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Networking</h4>
                      <p className="text-sm text-muted-foreground">Acesso ao grupo exclusivo</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <section className="bg-card rounded-xl border-2 border-pastel-blue p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-foreground">R$ 297</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pagamento único</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <i className="fas fa-check-circle text-pastel-blue"></i>
                      <span>Acesso ao webinar ao vivo</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <i className="fas fa-check-circle text-pastel-blue"></i>
                      <span>Gravação disponível por 30 dias</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <i className="fas fa-check-circle text-pastel-blue"></i>
                      <span>Material complementar em PDF</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <i className="fas fa-check-circle text-pastel-blue"></i>
                      <span>Certificado de participação</span>
                    </div>
                  </div>
                  <button className="w-full px-6 py-3 bg-pastel-blue text-pastel-gray-dark rounded-lg font-semibold hover:bg-opacity-80 transition mb-3">
                    Inscrever-se Agora
                  </button>
                  <p className="text-xs text-center text-muted-foreground">Vagas limitadas: 142 disponíveis</p>
                </section>

                {/* Payment Options */}
                <section className="bg-card rounded-xl border border-border p-6">
                  <h4 className="font-semibold text-foreground mb-4">Formas de Pagamento</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <i className="fas fa-credit-card text-muted-foreground"></i>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Cartão de Crédito</p>
                        <p className="text-xs text-muted-foreground">Em até 3x sem juros</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <i className="fas fa-barcode text-muted-foreground"></i>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">PIX</p>
                        <p className="text-xs text-muted-foreground">À vista com aprovação imediata</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <i className="fas fa-file-invoice text-muted-foreground"></i>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Boleto Bancário</p>
                        <p className="text-xs text-muted-foreground">À vista, compensação em 1-2 dias</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Guarantee Section */}
                <section className="bg-pastel-green/[0.3] border border-pastel-green rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="text-pastel-gray-dark text-2xl" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Garantia de 7 dias</h4>
                      <p className="text-sm text-muted-foreground">Se não ficar satisfeito, devolvemos 100% do seu investimento sem perguntas.</p>
                    </div>
                  </div>
                </section>

                {/* Stats Section */}
                <section className="bg-card rounded-xl border border-border p-6">
                  <h4 className="font-semibold text-foreground mb-4">Estatísticas</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Vagas Preenchidas</span>
                        <span className="text-sm font-semibold text-foreground">53%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-pastel-blue h-2 rounded-full" style={{ width: '53%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">Total de Inscritos</span>
                      <span className="text-lg font-semibold text-foreground">158</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">Avaliação Média</span>
                      <div className="flex items-center gap-1">
                        <Star className="text-pastel-yellow" size={14} fill="currentColor" />
                        <span className="text-sm font-semibold text-foreground">4.9/5.0</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Share Section */}
                <section className="bg-card rounded-xl border border-border p-6">
                  <h4 className="font-semibold text-foreground mb-4">Compartilhar</h4>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-pastel-blue text-pastel-gray-dark rounded-lg hover:bg-opacity-80 transition">
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button className="flex-1 px-4 py-2 bg-pastel-green text-pastel-gray-dark rounded-lg hover:bg-opacity-80 transition">
                      <i className="fab fa-whatsapp"></i>
                    </button>
                    <button className="flex-1 px-4 py-2 bg-pastel-purple text-pastel-gray-dark rounded-lg hover:bg-opacity-80 transition">
                      <Mail size={18} />
                    </button>
                    <button className="flex-1 px-4 py-2 bg-pastel-pink text-pastel-gray-dark rounded-lg hover:bg-opacity-80 transition">
                      <LinkIcon size={18} />
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
