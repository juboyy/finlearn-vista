import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bookmark, Share2, Printer, TrendingUp, ChevronRight, Volume2, 
  Video, Lightbulb, CheckCircle2, ChartLine, Percent, Smartphone,
  Plus, Linkedin, Twitter, Mail, Facebook, Link as LinkIcon, MessageCircle, Bot
} from "lucide-react";
import { Link } from "react-router-dom";

const Artigo = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(12);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      setScrollProgress(scrollPercent);
      
      const totalMinutes = 12;
      const remainingMinutes = Math.ceil(totalMinutes * (1 - scrollPercent / 100));
      setTimeRemaining(remainingMinutes);
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
                  <TrendingUp className="text-sidebar-primary-foreground" size={20} />
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
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e9f4ab2317-1e3bd4dce6a6584fbcbe.png" 
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

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Tabelas de Amortização: SAC vs. PRICE</h2>
                <p className="text-base text-foreground leading-relaxed mb-6">
                  A escolha do sistema de amortização impacta diretamente no valor total pago ao longo do financiamento:
                </p>

                {/* Comparison Grid */}
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

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Tendências do Mercado em 2024</h2>
                <p className="text-base text-foreground leading-relaxed mb-6">
                  O mercado de crédito imobiliário passa por transformações importantes, impulsionadas por mudanças na economia e inovações tecnológicas no setor financeiro:
                </p>

                {/* Trends */}
                <div className="space-y-4 mb-8">
                  <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-10 h-10 bg-pastel-blue/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ChartLine size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Digitalização dos Processos</h4>
                      <p className="text-sm text-muted-foreground">
                        Análise de crédito mais rápida e processos totalmente digitais, reduzindo o tempo de aprovação.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-10 h-10 bg-pastel-green/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Percent size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Taxas Competitivas</h4>
                      <p className="text-sm text-muted-foreground">
                        Maior concorrência entre bancos tem levado a taxas de juros mais atrativas para os clientes.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-10 h-10 bg-pastel-purple/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smartphone size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Fintechs no Mercado</h4>
                      <p className="text-sm text-muted-foreground">
                        Empresas de tecnologia financeira oferecem soluções inovadoras e alternativas aos bancos tradicionais.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Conclusão</h2>
                <p className="text-base text-foreground leading-relaxed mb-6">
                  O crédito imobiliário continua sendo uma das formas mais acessíveis de adquirir um imóvel no Brasil. Com planejamento adequado, compreensão das modalidades disponíveis e atenção às condições de mercado, é possível realizar o sonho da casa própria com segurança financeira.
                </p>
              </div>

              {/* Author Bio */}
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                      alt="Author" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">Ana Clara Ribeiro</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Especialista em Crédito Imobiliário com mais de 10 anos de experiência no mercado financeiro.
                      </p>
                      <div className="flex gap-3">
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                          <Linkedin size={16} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                          <Twitter size={16} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                          <Mail size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-pastel-blue hover:bg-pastel-blue/80">
                    <Plus size={16} className="mr-2" />
                    Seguir
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <section className="bg-card rounded-xl p-8 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Artigos Relacionados</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="group cursor-pointer">
                  <div className="h-40 overflow-hidden rounded-lg mb-4 border-2 border-pastel-pink">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ad30114ec7-77d7ae529e5d4ddc694a.png" 
                      alt="Planejamento Financeiro"
                    />
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-pastel-pink/20 text-foreground px-2 py-1 rounded-full">Financiamento</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-muted-foreground transition">
                    Como Calcular a Capacidade de Endividamento
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Aprenda a avaliar quanto você pode comprometer da sua renda em um financiamento imobiliário.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" 
                      className="w-5 h-5 rounded-full"
                      alt="Marcos Borges"
                    />
                    <span>Marcos Borges</span>
                    <span>•</span>
                    <span>8 min</span>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="h-40 overflow-hidden rounded-lg mb-4 border-2 border-pastel-green">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a316c55a6f-c26be2191eddcb81fb3c.png" 
                      alt="Portabilidade"
                    />
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-pastel-green/20 text-foreground px-2 py-1 rounded-full">Imóveis</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-muted-foreground transition">
                    Portabilidade de Crédito: Vale a Pena?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Entenda quando e como transferir seu financiamento para outro banco pode ser vantajoso.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                      className="w-5 h-5 rounded-full"
                      alt="Sofia Lima"
                    />
                    <span>Sofia Lima</span>
                    <span>•</span>
                    <span>10 min</span>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* Right Sidebar */}
          <aside className="col-span-3 space-y-6">
            {/* Table of Contents */}
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
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground py-2 border-l-2 border-transparent hover:border-pastel-blue pl-3 transition">
                  Tabelas de Amortização
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground py-2 border-l-2 border-transparent hover:border-pastel-blue pl-3 transition">
                  Tendências do Mercado
                </a>
              </nav>
            </div>

            {/* AI Assistant */}
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

            {/* Tags */}
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

            {/* Share */}
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
    </div>
  );
};

export default Artigo;
