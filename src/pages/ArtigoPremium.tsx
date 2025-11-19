import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bookmark, Share2, Printer, TrendingUp, ChevronRight, Volume2, 
  Video, Lightbulb, CheckCircle2, Lock, Bot, MessageCircle,
  Linkedin, Twitter, Mail, Facebook, Link as LinkIcon, Crown,
  Infinity, Award, Shield, Undo, X, Gift, Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const ArtigoPremium = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(12);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    let paywallShown = false;
    
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      setScrollProgress(scrollPercent);
      
      const totalMinutes = 12;
      const remainingMinutes = Math.ceil(totalMinutes * (1 - scrollPercent / 100));
      setTimeRemaining(remainingMinutes);
      
      // Check paywall trigger
      const triggerElement = document.getElementById('paywall-trigger');
      if (triggerElement && !paywallShown) {
        const triggerPosition = triggerElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (triggerPosition < windowHeight) {
          paywallShown = true;
          setShowPaywall(true);
        }
      }
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="bg-background min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
        <div 
          className="h-full bg-pastel-blue transition-all duration-300" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-1 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-foreground" size={20} />
                </div>
                <span className="text-xl font-semibold text-foreground">FinLearn</span>
              </Link>
              <div className="h-6 w-px bg-border ml-2"></div>
              <nav className="flex items-center gap-1 ml-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition">
                  Dashboard
                </Link>
                <ChevronRight size={12} className="text-muted-foreground" />
                <Link to="/conteudo" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition">
                  Artigos
                </Link>
                <ChevronRight size={12} className="text-muted-foreground" />
                <span className="text-sm text-foreground font-medium px-3 py-2">Crédito Imobiliário</span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bookmark size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 size={20} />
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                alt="User" 
                className="w-9 h-9 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="col-span-2 sticky top-24 h-fit">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Progresso de Leitura</h3>
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle cx="48" cy="48" r="40" stroke="hsl(var(--border))" strokeWidth="8" fill="none"></circle>
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="hsl(var(--pastel-blue))" 
                      strokeWidth="8" 
                      fill="none" 
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">{Math.round(scrollProgress)}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {timeRemaining} min restantes
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
                <span className="px-3 py-1 bg-pastel-blue/20 text-foreground text-sm rounded-full font-medium">Crédito</span>
                <span className="px-3 py-1 bg-pastel-green/20 text-foreground text-sm rounded-full font-medium">Imobiliário</span>
                <span className="px-3 py-1 bg-pastel-peach/20 text-foreground text-sm rounded-full font-medium">Financiamento</span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                Guia Completo de Crédito Imobiliário: Tudo que Você Precisa Saber em 2024
              </h1>

              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                    alt="Author" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Ana Clara Ribeiro</p>
                    <p className="text-xs text-muted-foreground">Especialista em Crédito Imobiliário</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">16 de Novembro, 2024</p>
                  <p className="text-xs text-muted-foreground">12 min de leitura</p>
                </div>
              </div>

              {/* Content Consumption Options */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Volume2 size={16} className="text-pastel-purple" />
                  Escolha como consumir este conteúdo
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-pastel-blue hover:bg-pastel-blue/10 transition">
                    <div className="w-10 h-10 bg-pastel-blue/30 rounded-lg flex items-center justify-center">
                      <Volume2 size={18} className="text-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Ouvir Artigo</p>
                      <p className="text-xs text-muted-foreground">Áudio narrado</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-pastel-purple hover:bg-pastel-purple/10 transition">
                    <div className="w-10 h-10 bg-pastel-purple/30 rounded-lg flex items-center justify-center">
                      <Video size={18} className="text-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Ver em Vídeo</p>
                      <p className="text-xs text-muted-foreground">Avatar IA</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="h-96 overflow-hidden rounded-xl mb-8">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e9f4ab2317-b19eeda8c812f0fa087c.png" 
                  alt="Crédito Imobiliário"
                />
              </div>

              {/* Article Body */}
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-foreground leading-relaxed mb-6 font-medium">
                  O crédito imobiliário é uma das principais ferramentas para realização do sonho da casa própria no Brasil. Com as recentes mudanças nas taxas de juros e nas condições de financiamento, entender os detalhes desse mercado tornou-se ainda mais essencial para profissionais do setor financeiro e futuros compradores.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">O que é Crédito Imobiliário?</h2>
                <p className="text-base text-foreground leading-relaxed mb-6">
                  O crédito imobiliário é uma modalidade de empréstimo de longo prazo destinado exclusivamente à compra, construção ou reforma de imóveis. No Brasil, esse tipo de financiamento é regulamentado pelo Sistema Financeiro de Habitação (SFH) e pelo Sistema de Financiamento Imobiliário (SFI), cada um com suas características e regras específicas.
                </p>

                {/* Tip Box */}
                <div className="bg-pastel-yellow/20 border-l-4 border-pastel-yellow rounded-r-lg p-6 my-8">
                  <div className="flex gap-4">
                    <Lightbulb size={24} className="text-foreground flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Dica Importante</h4>
                      <p className="text-sm text-foreground">
                        A taxa de juros do crédito imobiliário está entre as mais baixas do mercado, variando entre 8% e 12% ao ano, dependendo do banco e das condições do financiamento.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Principais Modalidades de Financiamento</h2>
                <p className="text-base text-foreground leading-relaxed mb-6">
                  Existem diferentes tipos de financiamento imobiliário disponíveis no mercado brasileiro, cada um adequado a perfis específicos de compradores:
                </p>

                {/* Numbered List */}
                <div className="space-y-4 mb-8">
                  <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 bg-pastel-blue/30 rounded-full flex items-center justify-center text-sm font-bold text-foreground">1</span>
                      Sistema Financeiro de Habitação (SFH)
                    </h3>
                    <p className="text-sm text-muted-foreground ml-10">
                      Destinado a imóveis de até R$ 1,5 milhão, com financiamento de até 80% do valor. Oferece as menores taxas de juros do mercado e permite o uso do FGTS.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 bg-pastel-green/30 rounded-full flex items-center justify-center text-sm font-bold text-foreground">2</span>
                      Sistema de Financiamento Imobiliário (SFI)
                    </h3>
                    <p className="text-sm text-muted-foreground ml-10">
                      Ideal para imóveis acima de R$ 1,5 milhão. Não há limite de valor e permite financiar até 90% do imóvel, porém com taxas de juros ligeiramente mais altas.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 bg-pastel-purple/30 rounded-full flex items-center justify-center text-sm font-bold text-foreground">3</span>
                      Programa Casa Verde e Amarela
                    </h3>
                    <p className="text-sm text-muted-foreground ml-10">
                      Programa habitacional do governo para famílias de baixa renda, com subsídios e condições especiais de financiamento.
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Documentação Necessária</h2>
                <p className="text-base text-foreground leading-relaxed mb-6">
                  Para solicitar um financiamento imobiliário, é necessário reunir uma série de documentos que comprovem sua capacidade de pagamento e regularidade fiscal:
                </p>

                {/* Checklist */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-pastel-green mt-1" />
                    <span className="text-foreground">Documentos pessoais (RG, CPF, comprovante de residência)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-pastel-green mt-1" />
                    <span className="text-foreground">Comprovantes de renda dos últimos 3 meses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-pastel-green mt-1" />
                    <span className="text-foreground">Declaração de Imposto de Renda</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-pastel-green mt-1" />
                    <span className="text-foreground">Certidões negativas (civil, criminal, protestos)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-pastel-green mt-1" />
                    <span className="text-foreground">Documentação do imóvel (matrícula, IPTU)</span>
                  </li>
                </ul>

                <div id="paywall-trigger"></div>

                {/* Locked Content */}
                <div style={{ filter: 'blur(5px)', opacity: 0.4, pointerEvents: 'none' }}>
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Tabelas de Amortização: SAC vs. PRICE</h2>
                  <p className="text-base text-foreground leading-relaxed mb-6">
                    A escolha do sistema de amortização impacta diretamente no valor total pago ao longo do financiamento:
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-pastel-blue/20 rounded-lg p-5 border border-pastel-blue">
                      <h3 className="font-semibold text-foreground mb-3">Sistema SAC</h3>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>• Parcelas decrescentes</li>
                        <li>• Amortização constante</li>
                        <li>• Menor custo total</li>
                        <li>• Parcela inicial mais alta</li>
                      </ul>
                    </div>
                    <div className="bg-pastel-pink/20 rounded-lg p-5 border border-pastel-pink">
                      <h3 className="font-semibold text-foreground mb-3">Tabela PRICE</h3>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li>• Parcelas fixas</li>
                        <li>• Amortização crescente</li>
                        <li>• Maior previsibilidade</li>
                        <li>• Custo total mais alto</li>
                      </ul>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Uso do FGTS no Financiamento</h2>
                  <p className="text-base text-foreground leading-relaxed mb-6">
                    O Fundo de Garantia do Tempo de Serviço (FGTS) pode ser utilizado em diferentes momentos do financiamento imobiliário.
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
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground py-2 border-l-2 border-transparent hover:border-pastel-blue pl-3 transition">
                  O que é Crédito Imobiliário?
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground py-2 border-l-2 border-transparent hover:border-pastel-blue pl-3 transition">
                  Principais Modalidades
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground py-2 border-l-2 border-transparent hover:border-pastel-blue pl-3 transition">
                  Documentação Necessária
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground/50 py-2 border-l-2 border-transparent pl-3 cursor-not-allowed">
                  Tabelas de Amortização
                  <Lock size={12} />
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground/50 py-2 border-l-2 border-transparent pl-3 cursor-not-allowed">
                  Uso do FGTS
                  <Lock size={12} />
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground/50 py-2 border-l-2 border-transparent pl-3 cursor-not-allowed">
                  Tendências do Mercado
                  <Lock size={12} />
                </a>
              </nav>
            </div>

            <div className="bg-pastel-blue/20 rounded-xl p-6 border border-pastel-blue">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                  <Bot size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Assistente IA</h3>
                  <p className="text-xs text-muted-foreground">Tire suas dúvidas</p>
                </div>
              </div>
              <p className="text-sm text-foreground mb-4">
                Tem dúvidas sobre crédito imobiliário? Converse com nosso assistente especializado.
              </p>
              <Button className="w-full bg-card text-foreground hover:bg-muted">
                <MessageCircle size={16} className="mr-2" />
                Iniciar Chat
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Tags Populares</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full hover:bg-muted/80 cursor-pointer transition">
                  #CréditoImobiliário
                </span>
                <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full hover:bg-muted/80 cursor-pointer transition">
                  #Financiamento
                </span>
                <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full hover:bg-muted/80 cursor-pointer transition">
                  #FGTS
                </span>
                <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full hover:bg-muted/80 cursor-pointer transition">
                  #Imóveis
                </span>
                <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full hover:bg-muted/80 cursor-pointer transition">
                  #SFH
                </span>
                <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full hover:bg-muted/80 cursor-pointer transition">
                  #Amortização
                </span>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Compartilhar</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition">
                  <Linkedin size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">LinkedIn</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition">
                  <Twitter size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Twitter</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition">
                  <Facebook size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Facebook</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition">
                  <LinkIcon size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Copiar</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Paywall Overlay */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 backdrop-blur-lg bg-background/95"></div>
          <div className="absolute bottom-0 left-0 right-0 animate-slide-in-right">
            <div className="max-w-4xl mx-auto px-6 pb-8">
              <div className="bg-card rounded-t-3xl shadow-2xl border-t-4 border-pastel-blue p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-pastel-blue/30 rounded-full mb-6">
                    <Crown className="text-foreground" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">Continue Lendo com Acesso Premium</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Desbloqueie todo o conteúdo exclusivo e aprofunde seus conhecimentos no mercado financeiro
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 bg-pastel-green/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Infinity className="text-foreground" size={20} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Acesso Ilimitado</h4>
                    <p className="text-sm text-muted-foreground">Todos os artigos, webinars e cursos</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 bg-pastel-purple/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Bot className="text-foreground" size={20} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Assistente IA</h4>
                    <p className="text-sm text-muted-foreground">Suporte especializado 24/7</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 bg-pastel-pink/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Award className="text-foreground" size={20} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Certificados</h4>
                    <p className="text-sm text-muted-foreground">Reconhecimento profissional</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="border-2 border-border rounded-xl p-6 hover:border-pastel-blue transition cursor-pointer">
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
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-pastel-green" />
                        <span>Acesso total à plataforma</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-pastel-green" />
                        <span>Novos conteúdos semanais</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-pastel-green" />
                        <span>Suporte prioritário</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-muted text-foreground hover:bg-muted/80">
                      Assinar Mensal
                    </Button>
                  </div>

                  <div className="border-2 border-pastel-blue rounded-xl p-6 bg-pastel-blue/10 relative cursor-pointer">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-pastel-blue text-foreground text-xs font-bold px-4 py-1 rounded-full">MAIS POPULAR</span>
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
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-pastel-green" />
                        <span>Tudo do plano mensal</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-pastel-green" />
                        <span>Conteúdos exclusivos Premium</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-pastel-green" />
                        <span>Webinars ao vivo mensais</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                      Assinar Anual
                    </Button>
                  </div>
                </div>

                <div className="bg-pastel-yellow/20 border border-pastel-yellow rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pastel-yellow/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gift className="text-foreground" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Oferta Especial de Lançamento</h4>
                      <p className="text-sm text-foreground mb-3">
                        Assine agora e ganhe <strong>7 dias grátis</strong> para testar todos os recursos premium. Além disso, receba um e-book exclusivo sobre Estratégias de Crédito Imobiliário.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={16} />
                        <span>Oferta válida por tempo limitado</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-pastel-green" />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Undo size={16} className="text-pastel-blue" />
                    <span>Garantia de 30 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X size={16} className="text-muted-foreground" />
                    <span>Cancele quando quiser</span>
                  </div>
                </div>

                <div className="text-center">
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
};

export default ArtigoPremium;
