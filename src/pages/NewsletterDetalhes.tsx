import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Heart, Share2, ArrowLeft, Star, Flame, Podcast, FileText, Bot, ChartArea, Video, BookOpen, Lock, LockOpen, Check, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";
import Plot from 'react-plotly.js';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function NewsletterDetalhes() {
  const [planType, setPlanType] = useState<'mensal' | 'anual'>('mensal');
  const [showSampleSheet, setShowSampleSheet] = useState(false);
  const [showChapter, setShowChapter] = useState(false);
  
  const subscribersData = [{
    x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    y: [1200, 1500, 2100, 2800, 3500, 4200, 4900, 5600, 6200, 6800],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Assinantes Totais',
    line: { color: '#D4C5E8', width: 3 },
    marker: { size: 6, color: '#D4C5E8' },
    fill: 'tozeroy',
    fillcolor: 'rgba(212, 197, 232, 0.1)'
  }];

  const openRateData = [{
    x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    y: [85, 88, 87, 89, 91, 92, 93, 92, 94, 93],
    type: 'scatter',
    mode: 'lines',
    name: 'Taxa de Abertura (%)',
    yaxis: 'y2',
    line: { color: '#B8D4E8', width: 2, dash: 'dot' }
  }];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-20">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Link to="/newsletter" className="hover:text-foreground">Newsletter</Link>
                <span className="text-xs">›</span>
                <span className="text-foreground font-medium">Detalhes</span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground">Revolução dos Pagamentos</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition" title="Favoritar">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition" title="Compartilhar">
                <Share2 className="w-5 h-5" />
              </button>
              <Link to="/nova-assinatura">
                <button className="px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
              </Link>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="bg-card rounded-2xl border border-border overflow-hidden mb-8 shadow-sm">
            <div className="relative h-72 bg-[hsl(280,35%,85%)]">
              <div className="absolute inset-0 flex items-center justify-between px-10">
                <div className="z-10 max-w-2xl">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="px-3 py-1.5 bg-card text-foreground rounded-full text-xs font-bold shadow-sm uppercase tracking-wide border border-border">Premium</span>
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 border border-orange-200">
                      <Flame className="w-3 h-3" /> #2 Trending
                    </span>
                    <div className="flex items-center gap-1 bg-card px-3 py-1.5 rounded-full text-xs font-medium text-foreground border border-border">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.8 (1.2k avaliações)
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">Domine o Ecossistema de Pagamentos</h2>
                  <p className="text-lg text-foreground mb-6 font-medium">Análises profundas sobre PIX, Open Finance, Fintechs e o futuro das transações digitais, direto na sua caixa de entrada.</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Ana Paula Costa" />
                      <div>
                        <p className="text-sm font-bold text-foreground">Ana Paula Costa</p>
                        <p className="text-xs text-muted-foreground">Head de Inovação em Pagamentos</p>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div className="text-sm text-foreground">
                      <span className="font-bold">6.8K</span> assinantes ativos
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block h-64 w-64 relative z-10">
                  <img className="w-full h-full object-contain drop-shadow-2xl" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/412d9e8d3c-5b783ac9bdcf2157dc2d.png" alt="Ilustração do sistema de pagamentos" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[hsl(206,35%,85%)] opacity-30 rounded-tl-full"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-[hsl(340,35%,85%)] opacity-30 rounded-br-full"></div>
            </div>
            
            <div className="p-8 grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 border-r border-border pr-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Sobre a Newsletter</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A "Revolução dos Pagamentos" é a fonte definitiva para profissionais que precisam navegar pelas rápidas mudanças no setor financeiro. Semanalmente, dissecamos as regulações do Banco Central, movimentos de grandes players, e as tecnologias emergentes que estão redefinindo como o dinheiro se move.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-muted/50 p-4 rounded-xl border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(280,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Para quem é</h4>
                        <p className="text-sm text-muted-foreground">Executivos de bancos, fundadores de fintechs, reguladores e investidores de Venture Capital.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(206,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">O que você ganha</h4>
                        <p className="text-sm text-muted-foreground">Insights acionáveis, antecipação de tendências regulatórias e análise de concorrência.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">O que está incluso na assinatura</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[hsl(280,35%,75%)] hover:bg-muted/50 transition cursor-default">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(280,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <Podcast className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">Podcast Exclusivo</div>
                        <div className="text-xs text-muted-foreground">2 episódios/mês</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[hsl(280,35%,75%)] hover:bg-muted/50 transition cursor-default">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(25,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">Relatórios Deep Dive</div>
                        <div className="text-xs text-muted-foreground">1 relatório mensal</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[hsl(280,35%,75%)] hover:bg-muted/50 transition cursor-default">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(206,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">Avatar IA News</div>
                        <div className="text-xs text-muted-foreground">Resumo diário em vídeo</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[hsl(280,35%,75%)] hover:bg-muted/50 transition cursor-default">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(160,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <ChartArea className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">Análises de Dados</div>
                        <div className="text-xs text-muted-foreground">Dashboards interativos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[hsl(280,35%,75%)] hover:bg-muted/50 transition cursor-default">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(340,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">Webinars Mensais</div>
                        <div className="text-xs text-muted-foreground">Q&A com especialistas</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[hsl(280,35%,75%)] hover:bg-muted/50 transition cursor-default">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(45,35%,85%)] flex items-center justify-center text-[hsl(220,15%,30%)] shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">Biblioteca E-books</div>
                        <div className="text-xs text-muted-foreground">Acesso ao acervo</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">Amostra de Conteúdos Recentes</h3>
                    <a href="#" className="text-sm text-[hsl(280,45%,55%)] hover:text-[hsl(280,45%,45%)] font-medium">Ver todos</a>
                  </div>
                  <div className="space-y-4">
                    <div className="group relative bg-card border border-border rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                      <div className="absolute top-4 right-4 text-muted-foreground group-hover:text-[hsl(280,45%,55%)] transition">
                        <LockOpen className="w-4 h-4" />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden shrink-0">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-cc3eeac0dc56bb648ccb.png" className="w-full h-full object-cover" alt="Artigo" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">Gratuito</span>
                            <span className="text-xs text-muted-foreground">12 Out 2023 • 5 min leitura</span>
                          </div>
                          <h4 className="font-bold text-foreground mb-1 group-hover:text-[hsl(280,45%,55%)] transition">O impacto do Drex no varejo brasileiro</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">Uma análise preliminar sobre como o Real Digital vai transformar a experiência de compra e as liquidações financeiras no varejo...</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group relative bg-card border border-border rounded-xl p-4 hover:shadow-md transition cursor-pointer opacity-75 hover:opacity-100">
                      <div className="absolute top-4 right-4 text-muted-foreground">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-640177462dea5e4389d0.png" className="w-full h-full object-cover" alt="Artigo" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Exclusivo Assinantes</span>
                            <span className="text-xs text-muted-foreground">10 Out 2023 • 12 min leitura</span>
                          </div>
                          <h4 className="font-bold text-foreground mb-1 group-hover:text-[hsl(280,45%,55%)] transition">Open Finance: O relatório secreto dos bancos</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">Dados exclusivos mostram a verdadeira taxa de conversão e retenção pós-implementação do Open Finance nas grandes instituições...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-span-12 lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-card rounded-xl border border-border shadow-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[hsl(280,35%,85%)] opacity-20 rounded-bl-full -mr-4 -mt-4"></div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">Escolha seu plano</h3>
                    <p className="text-sm text-muted-foreground mb-6">Cancele a qualquer momento.</p>

                    <div className="bg-muted p-1 rounded-lg flex mb-6">
                      <button 
                        onClick={() => setPlanType('mensal')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${planType === 'mensal' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        Mensal
                      </button>
                      <button 
                        onClick={() => setPlanType('anual')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition relative ${planType === 'anual' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        Anual
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">-15%</span>
                      </button>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold text-foreground">
                        {planType === 'mensal' ? 'R$ 49' : 'R$ 499'}
                      </span>
                      <span className="text-muted-foreground">
                        {planType === 'mensal' ? '/mês' : '/ano'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6">
                      {planType === 'mensal' 
                        ? 'Cobrado mensalmente. Renovação automática.' 
                        : 'Cobrado anualmente. Economia de R$ 89 por ano.'}
                    </p>

                    <button className="w-full py-3 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-semibold shadow-lg transition mb-4 transform active:scale-95">
                      Assinar Agora
                    </button>
                    <button 
                      onClick={() => setShowSampleSheet(true)}
                      className="w-full py-3 bg-card border border-border text-foreground hover:bg-muted rounded-xl font-semibold transition mb-6"
                    >
                      Ler Amostra Grátis
                    </button>

                    <div className="space-y-3 pt-6 border-t border-border">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Acesso ilimitado ao arquivo</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Comentários e comunidade</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Webinars exclusivos</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Áudio de todos os artigos</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6">
                    <h4 className="font-bold text-foreground mb-4">Sobre a Autora</h4>
                    <div className="flex items-center gap-3 mb-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-12 h-12 rounded-full object-cover" alt="Ana Paula Costa" />
                      <div>
                        <div className="font-bold text-foreground">Ana Paula Costa</div>
                        <div className="text-xs text-muted-foreground">Especialista em Payments</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Com mais de 15 anos de experiência no setor bancário e passagens por grandes fintechs, Ana traduz o "bancanês" para estratégias de negócios reais.
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition">
                        Ver Perfil
                      </button>
                      <button className="flex-1 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition">
                        <Linkedin className="w-4 h-4 mx-auto text-blue-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Analytics e Avaliações Section */}
          <section className="grid grid-cols-12 gap-8 mb-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-card rounded-xl border border-border p-6 h-[450px]">
                <h3 className="text-lg font-bold text-foreground mb-4">Crescimento de Assinantes & Engajamento</h3>
                <div className="w-full h-[350px]">
                  <Plot
                    data={[...subscribersData, ...openRateData] as any}
                    layout={{
                      margin: { t: 20, r: 50, b: 40, l: 50 },
                      showlegend: true,
                      legend: { orientation: 'h', y: -0.2 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      xaxis: { 
                        showgrid: false,
                        tickfont: { color: '#94a3b8' }
                      },
                      yaxis: { 
                        title: 'Assinantes',
                        titlefont: { color: '#94a3b8', size: 12 },
                        tickfont: { color: '#94a3b8' },
                        gridcolor: '#e2e8f0'
                      },
                      yaxis2: {
                        title: 'Taxa de Abertura (%)',
                        titlefont: { color: '#94a3b8', size: 12 },
                        tickfont: { color: '#94a3b8' },
                        overlaying: 'y',
                        side: 'right',
                        range: [0, 100],
                        showgrid: false
                      },
                      height: 350
                    }}
                    config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Rating Summary */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Avaliações</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-5xl font-bold text-foreground">4.8</span>
                  <div className="mb-2">
                    <div className="text-yellow-400 text-sm flex gap-0.5">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400" />
                    </div>
                    <div className="text-xs text-muted-foreground">Baseado em 1.243 avaliações</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { stars: 5, percent: 85, color: 'bg-[hsl(160,35%,75%)]' },
                    { stars: 4, percent: 10, color: 'bg-[hsl(206,35%,75%)]' },
                    { stars: 3, percent: 3, color: 'bg-[hsl(45,35%,75%)]' },
                    { stars: 2, percent: 1, color: 'bg-[hsl(25,35%,75%)]' },
                    { stars: 1, percent: 1, color: 'bg-red-200' }
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-3">{item.stars}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                      <span className="w-8 text-right">{item.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[hsl(206,35%,85%)]/30 rounded-xl p-4 border border-[hsl(206,35%,75%)]/50">
                  <div className="text-2xl font-bold text-foreground mb-1">93%</div>
                  <div className="text-xs text-foreground font-medium">Taxa de Abertura</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Média do setor: 22%</div>
                </div>
                <div className="bg-[hsl(280,35%,85%)]/30 rounded-xl p-4 border border-[hsl(280,35%,75%)]/50">
                  <div className="text-2xl font-bold text-foreground mb-1">12min</div>
                  <div className="text-xs text-foreground font-medium">Tempo de Leitura</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Conteúdo aprofundado</div>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-card rounded-xl border border-border p-8 mb-8">
            <h3 className="text-lg font-bold text-foreground mb-6">O que os assinantes dizem</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  rating: 5,
                  text: "A melhor newsletter sobre payments do Brasil. As análises sobre o Pix Automático me ajudaram a redefinir a estratégia do meu produto.",
                  author: "Ricardo M.",
                  role: "Product Manager @ Banco Top",
                  initials: "RM"
                },
                {
                  rating: 5,
                  text: "Conteúdo técnico e direto ao ponto. Vale cada centavo da assinatura premium pelos relatórios de compliance.",
                  author: "Julia L.",
                  role: "Compliance Officer",
                  initials: "JL"
                },
                {
                  rating: 4,
                  text: "Muito bom para se manter atualizado. Só sinto falta de mais estudos de caso de fintechs internacionais.",
                  author: "Felipe P.",
                  role: "Analista de Inovação",
                  initials: "FP"
                }
              ].map((review, index) => (
                <div key={index} className="p-5 bg-muted/50 rounded-xl border border-border">
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400" />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-4 italic">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs">
                      {review.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">{review.author}</div>
                      <div className="text-[10px] text-muted-foreground">{review.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer CTA */}
          <section className="bg-foreground rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/91a0f41bdd-589557109586f9b4801c.png" alt="Background" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-background mb-4">Pronto para liderar a transformação dos pagamentos?</h2>
              <p className="text-muted mb-8">Junte-se a mais de 6.000 profissionais que recebem nossos insights semanalmente.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-3 bg-[hsl(280,35%,85%)] text-foreground rounded-lg font-bold hover:bg-card transition w-full sm:w-auto">
                  Assinar Agora - R$ 49/mês
                </button>
                <button className="px-8 py-3 bg-transparent border border-muted text-background rounded-lg font-medium hover:bg-foreground/90 transition w-full sm:w-auto">
                  Ver Amostra Grátis
                </button>
              </div>
              <p className="text-xs text-muted mt-4">Garantia de 7 dias ou seu dinheiro de volta.</p>
            </div>
          </section>
        </div>
      </main>

      {/* Sheet de Amostra Grátis */}
      <Sheet open={showSampleSheet} onOpenChange={(open) => {
        setShowSampleSheet(open);
        if (!open) setShowChapter(false);
      }}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold text-foreground">
              {showChapter ? 'Capítulo Grátis' : 'Amostra Grátis'}
            </SheetTitle>
          </SheetHeader>
          
          {!showChapter ? (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2">Sobre esta Newsletter</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A newsletter "Revolução dos Pagamentos" é uma publicação semanal que analisa as principais tendências, 
                  inovações e regulamentações do mercado de meios de pagamento no Brasil e no mundo.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">O que você vai encontrar:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Análises aprofundadas sobre PIX, Open Finance e cartões</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Entrevistas exclusivas com líderes do setor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Dados e estatísticas do mercado brasileiro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Tendências globais e casos de sucesso</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-foreground mb-3">Artigo de Amostra</h4>
                <div className="bg-card border border-border rounded-lg p-4">
                  <span className="text-xs text-[hsl(280,35%,65%)] font-medium mb-2 block">EDIÇÃO #47</span>
                  <h5 className="font-bold text-foreground mb-2">O Futuro do PIX: Parcelamento e Crédito</h5>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    O Banco Central anunciou novas funcionalidades para o PIX que prometem revolucionar ainda mais 
                    o mercado de pagamentos brasileiro. Com a chegada do PIX Parcelado e PIX Garantido, consumidores 
                    e comerciantes terão acesso a opções de crédito integradas ao sistema de pagamentos instantâneos...
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    Continue lendo com uma assinatura completa.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setShowChapter(true)}
                className="w-full py-3 bg-[hsl(210,35%,75%)] hover:bg-[hsl(210,35%,70%)] text-[hsl(220,10%,30%)] rounded-xl font-semibold transition transform active:scale-95"
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Ler 1 Capítulo Grátis
              </button>

              <button 
                onClick={() => setShowSampleSheet(false)}
                className="w-full py-3 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-semibold shadow-lg transition transform active:scale-95"
              >
                Assinar Agora
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <button 
                onClick={() => setShowChapter(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Amostra
              </button>

              <div className="border-b border-border pb-4">
                <span className="text-xs text-[hsl(280,35%,65%)] font-medium mb-2 block">EDIÇÃO #47 - CAPÍTULO 1</span>
                <h3 className="text-xl font-bold text-foreground mb-2">O Futuro do PIX: Parcelamento e Crédito</h3>
                <p className="text-xs text-muted-foreground">Por Ana Paula Costa - 15 min de leitura</p>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  O Banco Central anunciou novas funcionalidades para o PIX que prometem revolucionar ainda mais 
                  o mercado de pagamentos brasileiro. Com a chegada do PIX Parcelado e PIX Garantido, consumidores 
                  e comerciantes terão acesso a opções de crédito integradas ao sistema de pagamentos instantâneos.
                </p>

                <h4 className="font-semibold text-foreground mt-6 mb-3">O que é o PIX Parcelado?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  O PIX Parcelado permitirá que consumidores dividam suas compras em parcelas utilizando o sistema 
                  de pagamentos instantâneos. Diferente do cartão de crédito tradicional, o PIX Parcelado oferece 
                  taxas mais competitivas e maior flexibilidade para lojistas e consumidores.
                </p>

                <h4 className="font-semibold text-foreground mt-6 mb-3">Impacto no Mercado</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Especialistas estimam que essa nova modalidade pode capturar até 15% do volume transacionado 
                  em cartões de crédito nos próximos 3 anos. Para as fintechs e bancos digitais, representa uma 
                  oportunidade única de expandir suas ofertas de crédito.
                </p>

                <h4 className="font-semibold text-foreground mt-6 mb-3">Desafios e Oportunidades</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  A implementação do PIX Parcelado traz desafios regulatórios e operacionais. Instituições 
                  financeiras precisarão adaptar seus sistemas de análise de crédito e gestão de risco para 
                  atender a essa nova demanda em tempo real.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border border-border mt-6">
                  <p className="text-sm text-muted-foreground italic">
                    Este é o fim do capítulo gratuito. Assine para continuar lendo e ter acesso a todos os conteúdos exclusivos.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowChapter(false);
                  setShowSampleSheet(false);
                }}
                className="w-full py-3 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-semibold shadow-lg transition transform active:scale-95"
              >
                Assinar Agora
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
