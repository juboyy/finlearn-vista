import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Search, Bell, Share2, UserPlus, MessageCircle, Phone, Video, Calendar, Clock, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const PerfilAutor = () => {
  const navigate = useNavigate();
  const engagementChartRef = useRef<HTMLDivElement>(null);
  const followerChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Plotly charts
    const loadCharts = async () => {
      // @ts-ignore
      if (typeof window.Plotly !== 'undefined') {
        const commonConfig = { responsive: true, displayModeBar: false, displaylogo: false };
        const commonLayout = {
          plot_bgcolor: '#ffffff',
          paper_bgcolor: '#ffffff',
          font: { family: 'Inter, sans-serif', color: 'hsl(215.4 16.3% 46.9%)' },
          xaxis: { gridcolor: 'hsl(214 32% 91%)' },
          yaxis: { gridcolor: 'hsl(214 32% 91%)' }
        };

        try {
          const engagementData = [
            {
              x: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
              y: [12, 18, 24, 20, 28, 32, 25, 35, 42],
              type: 'bar',
              name: 'Visualizações (k)',
              marker: { color: 'hsl(210, 35%, 85%)' }
            },
            {
              x: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
              y: [8, 12, 16, 14, 20, 24, 18, 28, 35],
              type: 'scatter',
              mode: 'lines',
              name: 'Engajamento (k)',
              line: { color: 'hsl(210, 35%, 60%)', width: 3 }
            }
          ];
          const engagementLayout = {
            ...commonLayout,
            title: { text: '', font: { size: 16 } },
            margin: { t: 20, r: 20, b: 40, l: 50 },
            barmode: 'group',
            showlegend: true,
            legend: { x: 0, y: 1.1, orientation: 'h' },
            yaxis: { title: 'Milhares' }
          };
          // @ts-ignore
          window.Plotly.newPlot(engagementChartRef.current, engagementData, engagementLayout, commonConfig);
        } catch(e) {
          console.error('Error loading engagement chart:', e);
        }

        try {
          const followerData = [{
            x: ['Dez', 'Jan', 'Fev', 'Mar'],
            y: [9.8, 10.5, 11.2, 12.4],
            type: 'scatter',
            mode: 'lines',
            fill: 'tozeroy',
            fillcolor: 'hsla(210, 35%, 60%, 0.1)',
            line: { color: 'hsl(210, 35%, 60%)', width: 2.5 }
          }];
          const followerLayout = {
            ...commonLayout,
            margin: { t: 10, r: 10, b: 30, l: 40 },
            xaxis: { visible: true, showgrid: false },
            yaxis: { title: 'Seguidores (k)' }
          };
          // @ts-ignore
          window.Plotly.newPlot(followerChartRef.current, followerData, followerLayout, commonConfig);
        } catch(e) {
          console.error('Error loading follower chart:', e);
        }
      }
    };

    // Load Plotly script if not already loaded
    if (!(window as any).Plotly) {
      const script = document.createElement('script');
      script.src = 'https://cdn.plot.ly/plotly-3.1.1.min.js';
      script.async = true;
      script.onload = loadCharts;
      document.head.appendChild(script);
    } else {
      loadCharts();
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarFix />
      
      <div className="flex-1 overflow-y-auto">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/autores')}
                className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft className="text-lg" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Perfil do Criador</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Portfólio e análise de desempenho de Marina Santos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="w-72 pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
              
              <button className="relative w-10 h-10 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
                <Bell className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
              
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                <UserPlus size={16} className="inline mr-2 text-primary-foreground" />
                Seguir Criador
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          <section className="bg-card border border-border rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-start gap-8">
              <div className="relative flex-shrink-0">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                  alt="Marina Santos" 
                  className="w-36 h-36 rounded-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-pastel-green text-pastel-dark-gray px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-border">
                  <i className="fa-solid fa-trophy text-pastel-dark-gray"></i>
                  <span>#1</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-extrabold text-foreground mb-1.5">Marina Santos</h1>
                    <p className="text-lg text-muted-foreground font-medium">Especialista em Pagamentos e Sistemas Financeiros</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mt-3">
                      <span><i className="fa-solid fa-map-marker-alt mr-2"></i>São Paulo, Brasil</span>
                      <span><i className="fa-solid fa-building-columns mr-2"></i>Banco Central do Brasil</span>
                      <span><i className="fa-solid fa-calendar-alt mr-2"></i>Membro desde 2020</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="h-10 px-4 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                      <Share2 size={16} className="inline mr-2" />Compartilhar
                    </button>
                    <button className="h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      <UserPlus size={16} className="inline mr-2 text-primary-foreground" />Seguir
                    </button>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed max-w-3xl">
                  Analista Sênior no Banco Central do Brasil com mais de 15 anos de experiência em meios de pagamento e sistemas financeiros. Especialista em PIX, Open Finance e regulação de pagamentos instantâneos. Graduada em Economia pela USP e Mestre em Finanças pela FGV. Atua diretamente na formulação de políticas públicas relacionadas ao sistema de pagamentos brasileiro e é referência nacional em temas relacionados à modernização dos meios de pagamento e inclusão financeira.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-8 space-y-8">
            <div>
              <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Contato Direto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-card border border-border rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-accent transition-colors">
                  <MessageCircle className="text-pastel-blue" />
                  <span className="font-medium text-foreground">Mensagem</span>
                </button>
                <button className="bg-card border border-border rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-accent transition-colors">
                  <Phone className="text-pastel-green" />
                  <span className="font-medium text-foreground">Áudio</span>
                </button>
                <button className="bg-card border border-border rounded-lg p-4 flex items-center justify-center gap-3 hover:bg-accent transition-colors">
                  <Video className="text-pastel-purple" />
                  <span className="font-medium text-foreground">Vídeo</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-pastel-blue/50 border border-border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-pastel-dark-gray">89</p>
                <p className="text-sm text-muted-foreground mt-1">Vídeos</p>
              </div>
              <div className="bg-pastel-purple/50 border border-border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-pastel-dark-gray">156</p>
                <p className="text-sm text-muted-foreground mt-1">Artigos</p>
              </div>
              <div className="bg-pastel-pink/50 border border-border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-pastel-dark-gray">34</p>
                <p className="text-sm text-muted-foreground mt-1">Podcasts</p>
              </div>
              <div className="bg-pastel-green/50 border border-border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-pastel-dark-gray">12</p>
                <p className="text-sm text-muted-foreground mt-1">E-books</p>
              </div>
              <div className="bg-pastel-yellow/50 border border-border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-pastel-dark-gray">2.4k</p>
                <p className="text-sm text-muted-foreground mt-1">Vendas</p>
              </div>
              <div className="bg-pastel-orange/50 border border-border rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-pastel-dark-gray">12.4k</p>
                <p className="text-sm text-muted-foreground mt-1">Seguidores</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center" style={{ backgroundColor: 'hsl(210, 35%, 95%)', borderColor: 'hsl(210, 35%, 85%)' }}>
              <p className="text-sm font-semibold uppercase text-muted-foreground">Social Selling Score</p>
              <h2 className="text-7xl font-extrabold text-pastel-dark-gray my-2">94<span className="text-5xl text-muted-foreground">/100</span></h2>
              <p className="font-medium text-pastel-dark-gray">Desempenho Excepcional</p>
              <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t" style={{ borderColor: 'hsl(210, 35%, 85%)' }}>
                <div className="text-sm">
                  <span className="font-bold text-pastel-dark-gray">4.9/5</span>
                  <span className="text-muted-foreground ml-1">Avaliação</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-pastel-dark-gray">89%</span>
                  <span className="text-muted-foreground ml-1">Conclusão</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-pastel-dark-gray">24</span>
                  <span className="text-muted-foreground ml-1">Certificações</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <section className="bg-card border border-border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Métricas de Engajamento</h2>
              <div ref={engagementChartRef} style={{ height: '300px' }}></div>
            </section>

            <section className="bg-card border border-border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Crescimento de Seguidores</h2>
              <div ref={followerChartRef} style={{ height: '300px' }}></div>
            </section>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <div className="bg-gradient-to-r from-pastel-blue/30 to-pastel-purple/30 border border-border rounded-lg p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="inline-block bg-pastel-green px-3 py-1 rounded-full text-xs font-bold text-pastel-dark-gray mb-3">
                      Oferta Especial
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Tenha acesso completo ao conhecimento de Marina Santos
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Mais de 3.200 profissionais já transformaram suas carreiras com nossos conteúdos exclusivos sobre PIX, Open Finance e Sistemas de Pagamento.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pastel-blue rounded-full flex items-center justify-center">
                          <i className="fa-solid fa-graduation-cap text-pastel-dark-gray text-xs"></i>
                        </div>
                        <span className="text-foreground font-medium">89 Cursos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pastel-purple rounded-full flex items-center justify-center">
                          <i className="fa-solid fa-file-alt text-pastel-dark-gray text-xs"></i>
                        </div>
                        <span className="text-foreground font-medium">156 Artigos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-pastel-green rounded-full flex items-center justify-center">
                          <i className="fa-solid fa-certificate text-pastel-dark-gray text-xs"></i>
                        </div>
                        <span className="text-foreground font-medium">24 Certificações</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-8 text-center">
                    <div className="text-4xl font-extrabold text-pastel-dark-gray mb-2">4.9/5</div>
                    <div className="flex gap-0.5 mb-2">
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      <i className="fa-solid fa-star text-yellow-400"></i>
                      <i className="fa-solid fa-star text-yellow-400"></i>
                    </div>
                    <p className="text-xs text-muted-foreground">Baseado em 1.234 avaliações</p>
                  </div>
                </div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Planos de Assinatura</h2>
                    <p className="text-muted-foreground mt-1">Escolha o plano ideal para acessar conteúdos exclusivos</p>
                  </div>
                  <div className="flex gap-1 p-1 bg-muted rounded-lg border border-border">
                    <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card rounded-md">Mensal</button>
                    <button className="px-4 py-1.5 text-sm font-semibold text-primary-foreground bg-primary rounded-md">Anual</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-foreground">Gratuito</h3>
                    <p className="text-3xl font-extrabold text-foreground my-4">R$ 0<span className="text-base font-medium text-muted-foreground">/mês</span></p>
                    <button className="w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors mb-6">Seguir Gratuitamente</button>
                    <ul className="space-y-3 text-sm flex-1">
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Acesso a artigos públicos</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Newsletter semanal</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Notificações de novos posts</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Comentários em artigos</span></li>
                      <li className="flex items-center gap-3"><X className="text-red-500" size={16} /><span className="text-muted-foreground">Artigos premium</span></li>
                      <li className="flex items-center gap-3"><X className="text-red-500" size={16} /><span className="text-muted-foreground">Webinars exclusivos</span></li>
                    </ul>
                  </div>

                  <div className="bg-card border-2 border-primary rounded-lg p-6 flex flex-col relative">
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Mais Popular</div>
                    <h3 className="text-lg font-bold text-foreground">Premium</h3>
                    <p className="text-3xl font-extrabold text-foreground my-4">R$ 49<span className="text-base font-medium text-muted-foreground">/mês</span></p>
                    <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors mb-6">Assinar Premium</button>
                    <ul className="space-y-3 text-sm flex-1">
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Tudo do plano Gratuito</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Acesso a todos os artigos premium</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Webinars mensais ao vivo</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Biblioteca de recursos exclusivos</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Grupo privado no Telegram</span></li>
                      <li className="flex items-center gap-3"><X className="text-red-500" size={16} /><span className="text-muted-foreground">Consultoria individual</span></li>
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-foreground">VIP</h3>
                    <p className="text-3xl font-extrabold text-foreground my-4">R$ 149<span className="text-base font-medium text-muted-foreground">/mês</span></p>
                    <button className="w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors mb-6">Assinar VIP</button>
                    <ul className="space-y-3 text-sm flex-1">
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Tudo do plano Premium</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Consultoria individual mensal (1h)</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Acesso antecipado a conteúdos</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Networking exclusivo</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Material didático personalizado</span></li>
                      <li className="flex items-center gap-3"><Check className="text-pastel-green" size={16} /><span>Certificado de conclusão</span></li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-lg p-6 flex flex-col h-full">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                    <i className="fa-solid fa-video text-pastel-dark-gray"></i>
                    <span>Próximo Webinar</span>
                  </h3>
                  <p className="font-semibold text-foreground">PIX Internacional: Oportunidades e Desafios</p>
                  <p className="text-sm text-muted-foreground mt-2 mb-5 flex-1">
                    Discussão sobre a expansão do PIX para transações internacionais e seu impacto no mercado.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <p className="flex items-center gap-2.5"><Calendar size={16} className="text-pastel-dark-gray" /><span>28 de Maio, 2024</span></p>
                    <p className="flex items-center gap-2.5"><Clock size={16} className="text-pastel-dark-gray" /><span>19:00 - 20:30 (BRT)</span></p>
                  </div>
                  <button className="w-full py-2.5 bg-pastel-purple text-pastel-dark-gray rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors mt-auto">
                    Reservar Vaga
                  </button>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col">
                  <h3 className="text-lg font-bold text-foreground mb-5">Autores Similares</h3>
                  <ul className="space-y-4 flex-1">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Fernando Lima" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Fernando Lima</p>
                          <p className="text-xs text-muted-foreground">Economista Chefe</p>
                        </div>
                      </div>
                      <button className="px-4 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors">Seguir</button>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Juliana Santos" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Juliana Santos</p>
                          <p className="text-xs text-muted-foreground">Especialista em ESG</p>
                        </div>
                      </div>
                      <button className="px-4 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors">Seguir</button>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Ricardo Almeida" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Ricardo Almeida</p>
                          <p className="text-xs text-muted-foreground">VP de Produtos</p>
                        </div>
                      </div>
                      <button className="px-4 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors">Seguir</button>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
                
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Estatísticas</h2>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-pastel-blue rounded-md"><i className="fa-solid fa-file-alt text-pastel-dark-gray"></i></div>
                      <span className="text-sm text-muted-foreground">Total de Artigos</span>
                    </div>
                    <span className="font-bold text-foreground">156</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-pastel-green rounded-md"><i className="fa-solid fa-users text-pastel-dark-gray"></i></div>
                      <span className="text-sm text-muted-foreground">Assinantes</span>
                    </div>
                    <span className="font-bold text-foreground">3.2K</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-pastel-purple rounded-md"><i className="fa-solid fa-video text-pastel-dark-gray"></i></div>
                      <span className="text-sm text-muted-foreground">Webinars Realizados</span>
                    </div>
                    <span className="font-bold text-foreground">24</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-pastel-yellow rounded-md"><i className="fa-solid fa-comments text-pastel-dark-gray"></i></div>
                      <span className="text-sm text-muted-foreground">Comentários</span>
                    </div>
                    <span className="font-bold text-foreground">1.8K</span>
                  </li>
                </ul>
              </section>

              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-5">Áreas de Expertise</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">PIX e Pagamentos Instantâneos</span>
                      <span className="text-sm font-medium text-muted-foreground">95%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2"><div className="bg-pastel-blue h-2 rounded-full" style={{ width: '95%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">Open Finance</span>
                      <span className="text-sm font-medium text-muted-foreground">88%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2"><div className="bg-pastel-green h-2 rounded-full" style={{ width: '88%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">Regulação Financeira</span>
                      <span className="text-sm font-medium text-muted-foreground">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2"><div className="bg-pastel-purple h-2 rounded-full" style={{ width: '92%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">Sistemas de Pagamento</span>
                      <span className="text-sm font-medium text-muted-foreground">90%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2"><div className="bg-gray-400 h-2 rounded-full" style={{ width: '90%' }}></div></div>
                  </div>
                </div>
              </section>
              
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Redes Sociais</h2>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-md" style={{ backgroundColor: 'hsl(210, 35%, 90%)' }}><i className="fa-brands fa-linkedin-in" style={{ color: 'hsl(210, 35%, 55%)' }}></i></div>
                        <span className="text-sm font-medium text-foreground">@marinasantos</span>
                      </div>
                      <i className="fa-solid fa-external-link-alt text-muted-foreground"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-md" style={{ backgroundColor: 'hsl(197, 50%, 90%)' }}><i className="fa-brands fa-twitter" style={{ color: 'hsl(197, 50%, 60%)' }}></i></div>
                        <span className="text-sm font-medium text-foreground">@marinasantos_fin</span>
                      </div>
                      <i className="fa-solid fa-external-link-alt text-muted-foreground"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-md" style={{ backgroundColor: 'hsl(0, 50%, 90%)' }}><i className="fa-brands fa-youtube" style={{ color: 'hsl(0, 50%, 60%)' }}></i></div>
                        <span className="text-sm font-medium text-foreground">@marinasantos</span>
                      </div>
                      <i className="fa-solid fa-external-link-alt text-muted-foreground"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-md" style={{ backgroundColor: 'hsl(140, 30%, 90%)' }}><i className="fa-solid fa-globe" style={{ color: 'hsl(140, 30%, 60%)' }}></i></div>
                        <span className="text-sm font-medium text-foreground">marinasantos.com.br</span>
                      </div>
                      <i className="fa-solid fa-external-link-alt text-muted-foreground"></i>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <section className="mt-8">
            <div className="flex items-center gap-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground">Portfólio de Conteúdo</h2>
              <div className="flex gap-2 p-1 bg-muted rounded-lg border border-border">
                <button className="px-4 py-1.5 text-sm font-semibold text-primary-foreground bg-primary rounded-md">Todos</button>
                <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">Cursos</button>
                <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">Artigos</button>
                <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">Webinars</button>
                <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">E-books</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/eda0925961-80939e36794de1df1ffc.png" alt="Análise Fundamentalista" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-pastel-dark-gray bg-pastel-blue px-2.5 py-1 rounded-full border border-border">Curso</span>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                      <span className="text-sm font-medium text-foreground">4.9 <span className="text-muted-foreground font-normal">(234)</span></span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2 truncate">Análise Fundamentalista Completa</h3>
                  <p className="text-sm text-muted-foreground mb-4 h-10">Curso completo sobre valuation e análise de empresas de capital aberto.</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                    <span><i className="fa-solid fa-video mr-1.5"></i>24 aulas</span>
                    <span><i className="fa-solid fa-clock mr-1.5"></i>12h</span>
                    <span><i className="fa-solid fa-users mr-1.5"></i>1.2k alunos</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-foreground">R$ 299,90</span>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Ver Curso</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ea6a1b81f2-a23c2a5bd702df19345d.png" alt="Guia de Investimentos" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-pastel-dark-gray bg-pastel-purple px-2.5 py-1 rounded-full border border-border">E-book</span>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                      <span className="text-sm font-medium text-foreground">4.8 <span className="text-muted-foreground font-normal">(89)</span></span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2 truncate">Guia de Investimentos em Valor</h3>
                  <p className="text-sm text-muted-foreground mb-4 h-10">Estratégias práticas e eficientes para investimentos em ações de valor.</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                    <span><i className="fa-solid fa-file-pdf mr-1.5"></i>156 páginas</span>
                    <span><i className="fa-solid fa-download mr-1.5"></i>456 downloads</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-foreground">R$ 49,90</span>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Comprar</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ea6a1b81f2-06ae6a3f7b926cf3b85a.png" alt="Análise Setorial" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-pastel-dark-gray bg-pastel-orange px-2.5 py-1 rounded-full border border-border">Webinar</span>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                      <span className="text-sm font-medium text-foreground">4.7 <span className="text-muted-foreground font-normal">(156)</span></span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2 truncate">Análise Setorial: Bancos 2025</h3>
                  <p className="text-sm text-muted-foreground mb-4 h-10">Perspectivas e oportunidades de investimento no setor bancário para o próximo ano.</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                    <span><i className="fa-solid fa-play mr-1.5"></i>1h 30min</span>
                    <span><i className="fa-solid fa-users mr-1.5"></i>892 part.</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-pastel-green">Gratuito</span>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Assistir</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button className="px-6 py-3 border border-input rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors">
                Carregar Mais Conteúdos
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <section className="bg-card border border-border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Atividade Recente</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pastel-blue text-pastel-dark-gray rounded-lg flex items-center justify-center flex-shrink-0 border border-border"><i className="fa-solid fa-file-alt"></i></div>
                  <div>
                    <p className="text-sm text-foreground font-medium">Publicou o artigo <span className="font-bold text-pastel-dark-gray">&quot;Tendências do Mercado para 2025&quot;</span></p>
                    <p className="text-xs text-muted-foreground mt-1">há 2 dias</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pastel-purple text-pastel-dark-gray rounded-lg flex items-center justify-center flex-shrink-0 border border-border"><i className="fa-solid fa-video"></i></div>
                  <div>
                    <p className="text-sm text-foreground font-medium">Realizou o webinar ao vivo <span className="font-bold text-pastel-dark-gray">&quot;Análise Setorial: Bancos&quot;</span></p>
                    <p className="text-xs text-muted-foreground mt-1">há 5 dias</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pastel-orange text-pastel-dark-gray rounded-lg flex items-center justify-center flex-shrink-0 border border-border"><i className="fa-solid fa-graduation-cap"></i></div>
                  <div>
                    <p className="text-sm text-foreground font-medium">Lançou o novo curso <span className="font-bold text-pastel-dark-gray">&quot;Valuation Avançado&quot;</span></p>
                    <p className="text-xs text-muted-foreground mt-1">há 1 semana</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pastel-green text-pastel-dark-gray rounded-lg flex items-center justify-center flex-shrink-0 border border-border"><i className="fa-solid fa-users"></i></div>
                  <div>
                    <p className="text-sm text-foreground font-medium">Atingiu a marca de <span className="font-bold text-pastel-dark-gray">12 mil seguidores</span></p>
                    <p className="text-xs text-muted-foreground mt-1">há 2 semanas</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Depoimentos de Alunos</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">João Silva</p>
                        <p className="text-xs text-muted-foreground">Curso de Análise Fund.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      <i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 italic">&quot;Excelente didática e conteúdo muito prático. A Marina consegue simplificar temas complexos, o que foi fundamental para o meu aprendizado. Recomendo!&quot;</p>
                </div>
                <div className="p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="User" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Ana Costa</p>
                        <p className="text-xs text-muted-foreground">E-book de Investimentos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      <i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i><i className="fa-solid fa-star text-xs"></i>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 italic">&quot;Conteúdo de altíssima qualidade, muito bem estruturado e direto ao ponto. Um dos melhores materiais que já adquiri sobre o tema.&quot;</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilAutor;
