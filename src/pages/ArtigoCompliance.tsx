import { useState, useEffect } from "react";
import { 
  Bookmark, 
  Share2, 
  ChevronRight, 
  Clock, 
  Printer, 
  Volume2, 
  Video, 
  Bot, 
  Crown, 
  Infinity, 
  Award, 
  Check, 
  Gift, 
  Shield, 
  Undo, 
  X,
  Lock,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ArtigoCompliance() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      setProgress(scrollPercent);

      // Check if paywall trigger is visible
      const triggerElement = document.getElementById('paywall-trigger');
      if (triggerElement && !showPaywall) {
        const rect = triggerElement.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setShowPaywall(true);
        }
      }

      // Update active section
      const sections = ['o-que-muda', 'pilares-regulacoes', 'checklist-adequacao'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [showPaywall]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (progress / 100) * circumference;
  const remainingMinutes = Math.ceil(15 * (1 - progress / 100));

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-1 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-primary" size={20} />
                </div>
                <span className="text-xl font-semibold text-foreground">FinLearn</span>
              </Link>
              <div className="h-6 w-px bg-border ml-2" />
              <nav className="flex items-center gap-1 ml-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition">
                  Dashboard
                </Link>
                <ChevronRight size={12} className="text-muted-foreground" />
                <Link to="/conteudo" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition">
                  Artigos
                </Link>
                <ChevronRight size={12} className="text-muted-foreground" />
                <span className="text-sm text-foreground font-medium px-3 py-2">Compliance Bancário</span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition">
                <Bookmark size={20} />
              </button>
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition">
                <Share2 size={20} />
              </button>
              <div className="h-6 w-px bg-border" />
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                alt="User" 
                className="w-9 h-9 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="col-span-2 sticky top-24 h-fit">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Progresso de Leitura</h3>
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle cx="48" cy="48" r="40" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="8" 
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">{Math.round(progress)}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  <span>{remainingMinutes} min</span> restantes
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-border">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition text-left">
                  <Bookmark size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Salvar</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition text-left">
                  <Printer size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Imprimir</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition text-left">
                  <Share2 size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Compartilhar</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <article className="col-span-7">
            <div className="bg-card rounded-xl p-10 border border-border mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-sm rounded-full font-medium">Compliance</span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">BACEN</span>
                <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-sm rounded-full font-medium">Regulatório</span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                Compliance Bancário: Novas Diretrizes do BACEN
              </h1>

              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                    alt="Author" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Luiza Fernandes</p>
                    <p className="text-xs text-muted-foreground">Especialista em Regulação Financeira</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">11 de Março, 2024</p>
                  <p className="text-xs text-muted-foreground">15 min de leitura</p>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-6 mb-8 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Volume2 size={18} className="text-secondary" />
                  Escolha como consumir este conteúdo
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Volume2 size={18} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Ouvir Artigo</p>
                      <p className="text-xs text-muted-foreground">Áudio narrado</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-secondary hover:bg-secondary/10 transition">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Video size={18} className="text-secondary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Ver em Vídeo</p>
                      <p className="text-xs text-muted-foreground">Avatar IA</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="h-96 overflow-hidden rounded-xl mb-8">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0614aede0a-7e809795948e53eb2773.png" 
                  alt="Compliance bancário"
                />
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-foreground leading-relaxed mb-6 font-medium">
                  As novas diretrizes de compliance emitidas pelo Banco Central (BACEN) representam um marco para o sistema financeiro nacional. A análise detalhada das mudanças regulatórias é crucial para a gestão de riscos e a conformidade das instituições financeiras, impactando diretamente suas operações e estratégias de negócio.
                </p>

                <h2 id="o-que-muda" className="text-2xl font-bold text-foreground mt-10 mb-4">
                  O que muda com as Novas Diretrizes?
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  As recentes resoluções do BACEN aprofundam as exigências sobre a estrutura de gerenciamento de riscos, a política de conformidade (compliance) e a governança corporativa. O objetivo é fortalecer a resiliência do setor e proteger os consumidores, alinhando o Brasil às melhores práticas internacionais, como as recomendações do Comitê de Basileia.
                </p>
                
                <div className="bg-accent/20 border-l-4 border-accent rounded-r-lg p-6 my-8">
                  <div className="flex gap-4">
                    <TrendingUp className="text-accent flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Ponto de Atenção</h4>
                      <p className="text-sm text-muted-foreground">
                        A adequação não é opcional. Instituições que não se alinharem às novas regras estarão sujeitas a sanções severas, que vão de multas pecuniárias à suspensão de atividades.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 id="pilares-regulacoes" className="text-2xl font-bold text-foreground mt-10 mb-4">
                  Pilares das Novas Regulações
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  As diretrizes se apoiam em três pilares fundamentais que devem ser observados com atenção pelas equipes de compliance e risco:
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">1</span>
                      Governança Corporativa Reforçada
                    </h3>
                    <p className="text-sm text-muted-foreground ml-10">
                      Exigência de uma segregação clara de funções entre as áreas de negócio, risco e auditoria. O papel do Chief Compliance Officer (CCO) ganha ainda mais relevância e autonomia.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-sm font-bold text-accent">2</span>
                      Gestão Integrada de Riscos (GIR)
                    </h3>
                    <p className="text-sm text-muted-foreground ml-10">
                      As instituições devem adotar uma visão holística dos riscos (crédito, mercado, operacional, liquidez, reputacional e socioambiental), integrando-os em uma única estrutura de gerenciamento.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-sm font-bold text-secondary">3</span>
                      Cultura de Compliance
                    </h3>
                    <p className="text-sm text-muted-foreground ml-10">
                      O BACEN enfatiza a necessidade de disseminar uma cultura de conformidade em todos os níveis da organização, desde o conselho de administração até o atendimento ao cliente.
                    </p>
                  </div>
                </div>

                <h2 id="checklist-adequacao" className="text-2xl font-bold text-foreground mt-10 mb-4">
                  Checklist de Adequação
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Para auxiliar na adaptação, preparamos um checklist inicial com os principais pontos a serem revisados internamente:
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                    <span className="text-muted-foreground">Revisar e atualizar a Política de Compliance e o Código de Ética.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                    <span className="text-muted-foreground">Mapear os novos riscos regulatórios e seu impacto nos processos atuais.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                    <span className="text-muted-foreground">Garantir a autonomia e os recursos necessários para a área de Compliance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                    <span className="text-muted-foreground">Implementar treinamentos contínuos para todos os colaboradores.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                    <span className="text-muted-foreground">Ajustar sistemas e tecnologias para monitoramento e reporte de conformidade.</span>
                  </li>
                </ul>

                <div id="paywall-trigger" />

                <div style={{ filter: showPaywall ? 'blur(5px)' : 'none', opacity: showPaywall ? 0.4 : 1, pointerEvents: showPaywall ? 'none' : 'auto' }}>
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
                    Impactos Práticos na Gestão de Riscos
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    A abordagem baseada em risco (ABR) torna-se ainda mais central. As instituições precisarão refinar seus modelos de avaliação de risco de clientes (KYC), produtos e serviços.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-primary/10 rounded-lg p-5 border border-primary">
                      <h3 className="font-semibold text-foreground mb-3">Risco Operacional</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Mapeamento de processos ponta a ponta</li>
                        <li>• Testes de estresse mais robustos</li>
                        <li>• Planos de continuidade de negócios</li>
                        <li>• Prevenção a fraudes e ataques cibernéticos</li>
                      </ul>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-5 border border-secondary">
                      <h3 className="font-semibold text-foreground mb-3">Risco Reputacional</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Monitoramento de mídias sociais</li>
                        <li>• Gestão de crises</li>
                        <li>• Transparência com stakeholders</li>
                        <li>• Alinhamento com pautas ESG</li>
                      </ul>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
                    O Futuro do Compliance no Brasil
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    As novas diretrizes são apenas o começo de uma transformação mais profunda. A tendência é de um compliance cada vez mais data-driven, com uso de inteligência artificial e machine learning para predição de riscos e automação de controles.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="col-span-3 space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
              <h3 className="text-sm font-semibold text-foreground mb-4">Neste Artigo</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => scrollToSection('o-que-muda')}
                  className={`w-full text-left flex items-center justify-between text-sm py-2 border-l-2 pl-3 transition ${
                    activeSection === 'o-que-muda'
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary'
                  }`}
                >
                  O que muda?
                  {activeSection === 'o-que-muda' && (
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
                <button
                  onClick={() => scrollToSection('pilares-regulacoes')}
                  className={`w-full text-left flex items-center justify-between text-sm py-2 border-l-2 pl-3 transition ${
                    activeSection === 'pilares-regulacoes'
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary'
                  }`}
                >
                  Pilares das Regulações
                  {activeSection === 'pilares-regulacoes' && (
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
                <button
                  onClick={() => scrollToSection('checklist-adequacao')}
                  className={`w-full text-left flex items-center justify-between text-sm py-2 border-l-2 pl-3 transition ${
                    activeSection === 'checklist-adequacao'
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-primary'
                  }`}
                >
                  Checklist de Adequação
                  {activeSection === 'checklist-adequacao' && (
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2 border-l-2 border-transparent pl-3 cursor-not-allowed">
                  Impactos na Gestão de Riscos
                  <Lock size={12} />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2 border-l-2 border-transparent pl-3 cursor-not-allowed">
                  O Futuro do Compliance
                  <Lock size={12} />
                </div>
              </nav>
            </div>

            <div className="bg-secondary/20 rounded-xl p-6 border border-secondary">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                  <Bot className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Assistente IA</h3>
                  <p className="text-xs text-muted-foreground">Tire suas dúvidas</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Tem dúvidas sobre as novas diretrizes do BACEN? Converse com nosso assistente especializado.
              </p>
              <button className="w-full px-4 py-3 bg-card text-foreground rounded-lg font-medium hover:bg-muted transition">
                Iniciar Chat
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Paywall Overlay */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 animate-fade-in overflow-y-auto">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
          <div className="relative min-h-screen flex items-start justify-center py-8 animate-scale-in">
            <div className="max-w-4xl mx-auto px-6 w-full">
              <div className="bg-card rounded-3xl shadow-2xl border-t-4 border-primary p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
                    <Crown className="text-primary" size={36} />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">
                    Continue Lendo com Acesso Premium
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Desbloqueie todo o conteúdo exclusivo e aprofunde seus conhecimentos no mercado financeiro
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-6 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Infinity className="text-accent" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Acesso Ilimitado</h4>
                    <p className="text-sm text-muted-foreground">Todos os artigos, webinars e cursos</p>
                  </div>
                  <div className="text-center p-6 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Bot className="text-secondary" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Assistente IA</h4>
                    <p className="text-sm text-muted-foreground">Suporte especializado 24/7</p>
                  </div>
                  <div className="text-center p-6 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Award className="text-primary" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Certificados</h4>
                    <p className="text-sm text-muted-foreground">Reconhecimento profissional</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="border-2 border-border rounded-xl p-6 hover:border-primary transition cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Mensal</h3>
                        <p className="text-sm text-muted-foreground">Cancele quando quiser</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-foreground">R$49</p>
                        <p className="text-sm text-muted-foreground">/mês</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="text-accent" size={16} />
                        <span>Acesso total à plataforma</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="text-accent" size={16} />
                        <span>Novos conteúdos semanais</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="text-accent" size={16} />
                        <span>Suporte prioritário</span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition">
                      Assinar Mensal
                    </button>
                  </div>

                  <div className="border-2 border-primary rounded-xl p-6 bg-primary/5 relative cursor-pointer">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                        MAIS POPULAR
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Anual</h3>
                        <p className="text-sm text-muted-foreground">Economize 40%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-foreground">R$29</p>
                        <p className="text-sm text-muted-foreground">/mês</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="text-accent" size={16} />
                        <span>Tudo do plano mensal</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="text-accent" size={16} />
                        <span>Conteúdos exclusivos Premium</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="text-accent" size={16} />
                        <span>Webinars ao vivo mensais</span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition">
                      Assinar Anual
                    </button>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gift className="text-accent" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Oferta Especial de Lançamento</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Assine agora e ganhe <strong>7 dias grátis</strong> para testar todos os recursos premium. 
                        Além disso, receba um e-book exclusivo sobre Estratégias de Compliance.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={16} />
                        <span>Oferta válida por tempo limitado</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="text-accent" size={16} />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Undo className="text-primary" size={16} />
                    <span>Garantia de 30 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="text-muted-foreground" size={16} />
                    <span>Cancele quando quiser</span>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button 
                    onClick={() => setShowPaywall(false)}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Continuar com acesso limitado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
