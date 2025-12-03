import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { StatCard } from "@/components/Dashboard/StatCard";
import { CourseCard } from "@/components/Dashboard/CourseCard";
import { QuickActionCard } from "@/components/Dashboard/QuickActionCard";
import { EventCard } from "@/components/Dashboard/EventCard";
import { ContentCard } from "@/components/Dashboard/ContentCard";
import { ProgressBar } from "@/components/Dashboard/ProgressBar";
import { LearningProgressChart } from "@/components/Dashboard/LearningProgressChart";
import { ContentDistributionChart } from "@/components/Dashboard/ContentDistributionChart";
import { InsightsSuggestions } from "@/components/Dashboard/InsightsSuggestions";
import { InsightsDoDia } from "@/components/Dashboard/InsightsDoDia";
import { ExplainChartChat } from "@/components/Dashboard/ExplainChartChat";
import { EventDetailsSheet } from "@/components/Dashboard/EventDetailsSheet";
import { PodcastPanel } from "@/components/Dashboard/PodcastPanel";
import { EbookPanel } from "@/components/Dashboard/EbookPanel";
import { AgendaPanel } from "@/components/Dashboard/AgendaPanel";
import { AnalyticsAlertsPanel } from "@/components/Dashboard/AnalyticsAlertsPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, Award, Clock, Flame, TrendingUp, Coins, Scale, Bot, Mic, Video, BookMarked, Bell, Plus, Clock as ClockIcon, Headphones, Play, Lightbulb, HelpCircle, Calendar, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserAgents } from "@/hooks/useUserAgents";
import { useAnalyticsAlerts } from "@/hooks/useAnalyticsAlerts";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();
  const [podcastPanelOpen, setPodcastPanelOpen] = useState(false);
  const [ebookPanelOpen, setEbookPanelOpen] = useState(false);
  const [agendaPanelOpen, setAgendaPanelOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [explainChartOpen, setExplainChartOpen] = useState(false);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [alertsPanelOpen, setAlertsPanelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { agents } = useUserAgents();
  const { unreadCount } = useAnalyticsAlerts(user?.id || null);

  // Automatically open chat when entering dashboard with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock event data - in production, this would come from an API
  const events = [
    {
      id: "1",
      type: "webinar" as const,
      title: "Webinar: Mercado de Capitais 2025",
      date: "18 de Novembro de 2024",
      time: "14:00 - 16:00",
      duration: "2 horas",
      description: "Discussão aprofundada sobre as tendências e perspectivas do mercado de capitais para 2025. Abordaremos tópicos como regulamentação, novos produtos financeiros, tecnologia no mercado de capitais e estratégias de investimento.",
      isPaid: true,
      price: 149.90,
      presenters: [
        {
          id: "1",
          name: "Ana Clara Silva",
          role: "Especialista em Mercado de Capitais",
          image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
          profileUrl: "/perfil-autor/ana-clara"
        },
        {
          id: "2",
          name: "Ricardo Santos",
          role: "Analista de Investimentos",
          image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
          profileUrl: "/perfil-autor/ricardo-santos"
        }
      ],
      confirmedAttendees: 127,
      capacity: 200
    },
    {
      id: "2",
      type: "live" as const,
      title: "Live: Análise de Ações Tech",
      date: "20 de Novembro de 2024",
      time: "19:00 - 20:30",
      duration: "1h 30min",
      description: "Live exclusiva analisando as principais ações do setor de tecnologia. Vamos avaliar resultados recentes, tendências do setor e oportunidades de investimento em empresas de tecnologia nacionais e internacionais.",
      isPaid: false,
      presenters: [
        {
          id: "3",
          name: "Marina Costa",
          role: "Analista de Tecnologia",
          image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
          profileUrl: "/perfil-autor/marina-costa"
        }
      ],
      confirmedAttendees: 342
    },
    {
      id: "3",
      type: "workshop" as const,
      title: "Workshop: Trading Algorítmico",
      date: "22 de Novembro de 2024",
      time: "10:00 - 12:00",
      duration: "2 horas",
      description: "Workshop prático sobre trading algorítmico. Aprenda a desenvolver, testar e implementar algoritmos de trading. Inclui exemplos práticos, análise de estratégias e sessão de perguntas e respostas.",
      isPaid: true,
      price: 299.90,
      presenters: [
        {
          id: "4",
          name: "João Pedro Lima",
          role: "Especialista em Trading Algorítmico",
          image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
          profileUrl: "/perfil-autor/joao-pedro"
        },
        {
          id: "5",
          name: "Sofia Rodrigues",
          role: "Desenvolvedora Quantitativa",
          image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
          profileUrl: "/perfil-autor/sofia-rodrigues"
        }
      ],
      confirmedAttendees: 89,
      capacity: 100
    }
  ];

  const handleEventClick = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+I or Cmd+I for Insights
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        setInsightsOpen(true);
      }
      // Ctrl+K or Cmd+K for Chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setChatOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const anaAgent = agents.find(a => a.agent_key === "ana-analista-tecnica");
  const ricardoAgent = agents.find(a => a.agent_key === "ricardo-renda-fixa");
  const marinaAgent = agents.find(a => a.agent_key === "marina-mercado-capitais");
  const joaoAgent = agents.find(a => a.agent_key === "joao-educador");
  
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Bem-vindo, João</h1>
              <p className="text-sm text-muted-foreground mt-1">Terça-feira, 16 de Novembro de 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/notificacoes">
                <button className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </Link>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => setAlertsPanelOpen(true)}
                      className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <AlertTriangle size={20} style={{ color: 'hsl(44, 35%, 65%)' }} />
                      {unreadCount > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          style={{ 
                            backgroundColor: 'hsl(0, 35%, 65%)',
                            color: 'white',
                          }}
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alertas Inteligentes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button 
                onClick={() => setInsightsOpen(true)}
                className="bg-pastel-blue hover:bg-pastel-pink text-foreground"
              >
                <Lightbulb size={18} className="mr-2" />
                Insights do Dia
              </Button>
              <Button className="bg-pastel-purple hover:bg-pastel-purple/80 text-foreground">
                <Plus size={18} className="mr-2" />
                Novo Conteúdo
              </Button>
            </div>
          </div>
        </header>
        
        <div className="p-8">
          <section className="grid grid-cols-4 gap-4 mb-8">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <StatCard
                icon={BookOpen}
                value="24"
                label="Cursos em Progresso"
                trend="+12%"
                bgColor="bg-pastel-blue"
                agentImage={anaAgent?.agent_image}
                agentName={anaAgent?.agent_name}
                explanation="Este número representa a quantidade total de cursos que você iniciou e está atualmente estudando na plataforma. Incluem cursos de análise técnica, mercado de capitais, e outros tópicos financeiros."
                insight="Com 24 cursos em progresso e um crescimento de 12% no último período, você está demonstrando grande comprometimento com o aprendizado contínuo. Isso coloca você acima da média de 18 cursos por usuário ativo."
                note="Recomendamos focar em concluir 2-3 cursos por vez para maximizar a retenção de conhecimento e obter certificações mais rapidamente."
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <StatCard
                icon={Award}
                value="8"
                label="Certificados Obtidos"
                trend="+3"
                bgColor="bg-pastel-green"
                agentImage={ricardoAgent?.agent_image}
                agentName={ricardoAgent?.agent_name}
                explanation="Total de certificações que você conquistou ao completar cursos na plataforma. Cada certificado valida seu conhecimento em áreas específicas do mercado financeiro e pode ser compartilhado em seu perfil profissional."
                insight="Você conquistou 3 novos certificados recentemente! Essa evolução demonstra seu progresso consistente. Profissionais com 10+ certificados têm 40% mais visibilidade no mercado."
                note="Certificados em Compliance e Regulação são os mais valorizados atualmente. Considere priorizar cursos nessas áreas para fortalecer seu perfil."
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <StatCard
                icon={Clock}
                value="12.5h"
                label="Tempo de Estudo"
                trend="Esta semana"
                trendType="neutral"
                bgColor="bg-pastel-yellow"
                agentImage={marinaAgent?.agent_image}
                agentName={marinaAgent?.agent_name}
                explanation="Soma das horas dedicadas ao estudo e consumo de conteúdo educacional na última semana. Inclui aulas, leituras, podcasts e webinars assistidos na plataforma."
                insight="Suas 12.5 horas semanais estão perfeitamente alinhadas com o ritmo ideal de aprendizado. Estudos mostram que 10-15 horas semanais proporcionam melhor absorção de conteúdo sem sobrecarga."
                note="Manter consistência é mais importante que volume. Continue com esse ritmo para obter resultados sustentáveis a longo prazo."
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <StatCard
                icon={Flame}
                value="15"
                label="Dias Consecutivos"
                trend="Sequência"
                trendType="neutral"
                bgColor="bg-pastel-pink"
                agentImage={joaoAgent?.agent_image}
                agentName={joaoAgent?.agent_name}
                explanation="Número de dias seguidos em que você acessou a plataforma e realizou alguma atividade de aprendizado. Manter uma sequência demonstra disciplina e cria o hábito de estudo contínuo."
                insight="Parabéns por manter 15 dias consecutivos de estudo! Sequências acima de 14 dias aumentam a probabilidade de conclusão de cursos em 3x. Você está construindo um hábito sólido."
                note="Para manter a sequência, tente estudar no mesmo horário todos os dias. Mesmo 15 minutos diários são suficientes para manter o streak ativo."
              />
            </div>
          </section>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-card rounded-xl p-6 border border-border animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Progresso de Aprendizado</h2>
                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => setExplainChartOpen(true)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-pastel-purple/20"
                        >
                          <HelpCircle size={18} className="text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Me explique esse gráfico</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <select className="text-sm text-foreground border border-border rounded-lg px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Últimos 90 dias</option>
                  </select>
                </div>
              </div>
              <LearningProgressChart />
            </section>
            
            <section className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">Acesso Rápido</h2>
              <div className="space-y-3">
                <QuickActionCard
                  icon={Bot}
                  title="Chat com IA"
                  description="Tire suas dúvidas"
                  bgColor="bg-pastel-blue"
                  onClick={() => setChatOpen(true)}
                />
                <QuickActionCard
                  icon={Mic}
                  title="Podcast"
                  description="Ouça enquanto trabalha"
                  bgColor="bg-pastel-green"
                  onClick={() => setPodcastPanelOpen(true)}
                />
                <QuickActionCard
                  icon={Calendar}
                  title="Minha Agenda"
                  description="Seus compromissos"
                  bgColor="bg-pastel-pink"
                  onClick={() => setAgendaPanelOpen(true)}
                />
                <QuickActionCard
                  icon={BookMarked}
                  title="eBooks"
                  description="Material complementar"
                  bgColor="bg-pastel-peach"
                  onClick={() => setEbookPanelOpen(true)}
                />
              </div>
            </section>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Cursos em Andamento</h2>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground font-medium">Ver todos</a>
              </div>
              <div className="space-y-4">
                <CourseCard
                  icon={TrendingUp}
                  title="Análise Técnica Avançada"
                  progress={67}
                  completedLessons={12}
                  totalLessons={18}
                  bgColor="bg-pastel-blue"
                />
                <CourseCard
                  icon={Coins}
                  title="Fundamentos de Criptomoedas"
                  progress={33}
                  completedLessons={5}
                  totalLessons={15}
                  bgColor="bg-pastel-green"
                />
                <CourseCard
                  icon={Scale}
                  title="Compliance no Mercado Financeiro"
                  progress={80}
                  completedLessons={8}
                  totalLessons={10}
                  bgColor="bg-pastel-purpleDark"
                />
              </div>
            </section>
            
            <section className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Próximos Eventos</h2>
              </div>
              <div className="space-y-4">
                <EventCard
                  day="18"
                  month="NOV"
                  title="Webinar: Mercado de Capitais 2025"
                  time="14:00 - 16:00"
                  bgColor="bg-pastel-yellow"
                  onClick={() => handleEventClick("1")}
                />
                <EventCard
                  day="20"
                  month="NOV"
                  title="Live: Análise de Ações Tech"
                  time="19:00 - 20:30"
                  bgColor="bg-pastel-pink"
                  onClick={() => handleEventClick("2")}
                />
                <EventCard
                  day="22"
                  month="NOV"
                  title="Workshop: Trading Algorítmico"
                  time="10:00 - 12:00"
                  bgColor="bg-pastel-peach"
                  onClick={() => handleEventClick("3")}
                />
              </div>
            </section>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Progresso por Tópico</h2>
              <div className="space-y-4">
                <ProgressBar label="Mercado de Capitais" progress={75} barColor="bg-pastel-blue" />
                <ProgressBar label="Meios de Pagamento" progress={60} barColor="bg-pastel-peach" />
                <ProgressBar label="Blockchain & DeFi" progress={45} barColor="bg-pastel-pink" />
                <ProgressBar label="Regulamentação & Compliance" progress={85} barColor="bg-pastel-green" />
              </div>
            </section>
            
            <section className="col-span-1 bg-card rounded-xl p-6 border border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-lg font-semibold text-foreground mb-4">Distribuição de Conteúdo</h2>
              <ContentDistributionChart />
            </section>
          </div>
          
          <section className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Conteúdo Recomendado para Você</h2>
              <div className="flex gap-2">
                <Button variant="secondary" className="bg-pastel-blue text-foreground">Todos</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Artigos</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Podcasts</Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Vídeos</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <ContentCard
                type="Artigo"
                title="Tendências do Mercado Financeiro para 2025"
                description="Análise completa das principais tendências que irão moldar o mercado financeiro no próximo ano."
                author="Ana Clara"
                authorImage="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                tags={["#Finanças", "#Mercado"]}
                duration="8 min de leitura"
                durationIcon={<ClockIcon size={12} />}
                image="https://storage.googleapis.com/uxpilot-auth.appspot.com/b8bc545c0e-55fe421d08b90c0ee2d9.png"
                badgeColor="bg-pastel-blue text-foreground"
              />
              <ContentCard
                type="Podcast"
                title="Estratégias de Investimento em Tempos Incertos"
                description="Conversamos com especialistas sobre como proteger seu portfólio durante períodos de volatilidade."
                author="Marcos Borges"
                authorImage="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                tags={["#Investimentos"]}
                duration="45 min"
                durationIcon={<Headphones size={12} />}
                image="https://storage.googleapis.com/uxpilot-auth.appspot.com/733059b1b5-0aee1b308141ce005fdc.png"
                badgeColor="bg-pastel-green text-foreground"
              />
              <ContentCard
                type="Vídeo"
                title="Introdução ao Mercado de Derivativos"
                description="Aprenda os conceitos fundamentais sobre opções, futuros e outros derivativos financeiros."
                author="Sofia Lima"
                authorImage="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                tags={["#Derivativos", "#Avançado"]}
                duration="32 min"
                durationIcon={<Play size={12} />}
                image="https://storage.googleapis.com/uxpilot-auth.appspot.com/9dc38647cf-736f132f165b91980e51.png"
                badgeColor="bg-pastel-purple text-foreground"
              />
            </div>
          </section>
        </div>
      </main>
      
      <InsightsSuggestions open={insightsOpen} onOpenChange={setInsightsOpen} />
      <InsightsDoDia open={chatOpen} onOpenChange={setChatOpen} />
      <ExplainChartChat 
        open={explainChartOpen} 
        onOpenChange={setExplainChartOpen}
        chartData={[
          { day: "Seg", hours: 1.5 },
          { day: "Ter", hours: 2 },
          { day: "Qua", hours: 1.8 },
          { day: "Qui", hours: 2.2 },
          { day: "Sex", hours: 2.5 },
          { day: "Sáb", hours: 1.5 },
          { day: "Dom", hours: 1 }
        ]}
        chartType="line"
      />
      <EventDetailsSheet 
        open={eventDetailsOpen} 
        onOpenChange={setEventDetailsOpen}
        event={selectedEvent}
      />
      <PodcastPanel 
        open={podcastPanelOpen} 
        onOpenChange={setPodcastPanelOpen}
      />
      <EbookPanel 
        open={ebookPanelOpen} 
        onOpenChange={setEbookPanelOpen}
      />
      <AgendaPanel 
        open={agendaPanelOpen} 
        onOpenChange={setAgendaPanelOpen}
      />
      <AnalyticsAlertsPanel 
        open={alertsPanelOpen} 
        onOpenChange={setAlertsPanelOpen}
        userId={user?.id || null}
      />
    </div>
  );
};

export default Index;
