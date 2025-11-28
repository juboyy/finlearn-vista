import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Bell, 
  Plus, 
  MessageSquare, 
  Mic, 
  Video,
  Star,
  Users,
  ChevronRight,
  Brain,
  Database,
  FileDown,
  GraduationCap,
  ChartLine,
  Landmark,
  Bitcoin,
  Settings,
  Home,
  CreditCard,
  TrendingUp,
  X,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentChat } from "@/components/AgentChat";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Agentes() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [chatAgent, setChatAgent] = useState<{ name: string; image: string } | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [promptText, setPromptText] = useState("");

  useEffect(() => {
    setShowWelcomeModal(true);
  }, []);

  const specializedAgents = [
    {
      id: "analista-tecnica",
      name: "Ana - Analista Técnica",
      description: "Especialista em análise técnica, padrões gráficos e estratégias de trading",
      icon: ChartLine,
      bgColor: "bg-[hsl(206,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
      category: "Análise",
      rating: "4.9"
    },
    {
      id: "renda-fixa",
      name: "Ricardo - Especialista em Renda Fixa",
      description: "Expert em títulos públicos, CDBs, LCIs e estratégias conservadoras",
      icon: Landmark,
      bgColor: "bg-[hsl(280,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
      category: "Renda Fixa",
      rating: "4.8"
    },
    {
      id: "crypto-defi",
      name: "Marina - Crypto & DeFi",
      description: "Especialista em criptomoedas, DeFi e tecnologia blockchain",
      icon: Bitcoin,
      bgColor: "bg-[hsl(340,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
      category: "Crypto",
      rating: "4.7"
    },
    {
      id: "educador-financeiro",
      name: "Professor João - Educador",
      description: "Educador financeiro com foco em fundamentos e teoria econômica",
      icon: GraduationCap,
      bgColor: "bg-[hsl(160,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png",
      category: "Educação",
      rating: "4.9"
    },
    {
      id: "mercado-financeiro",
      name: "Especialista em Mercado Financeiro",
      description: "Expert em análise de mercados, ações e tendências econômicas",
      icon: TrendingUp,
      bgColor: "bg-[hsl(206,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
      category: "Mercados",
      rating: "4.8"
    },
    {
      id: "pagamentos",
      name: "Especialista em Pagamentos",
      description: "Conhecimento em sistemas de pagamento, fintechs e transações digitais",
      icon: CreditCard,
      bgColor: "bg-[hsl(280,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-13cb55de72175bb27fe6.png",
      category: "Fintechs",
      rating: "4.6"
    },
    {
      id: "capitais",
      name: "Especialista em Mercado de Capitais",
      description: "Especialista em IPOs, ofertas públicas e estruturação de operações",
      icon: Database,
      bgColor: "bg-[hsl(340,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
      category: "Capitais",
      rating: "4.7"
    },
    {
      id: "esg-investing",
      name: "Julia - ESG & Investimentos Sustentáveis",
      description: "Especialista em investimentos ESG e sustentabilidade corporativa",
      icon: TrendingUp,
      bgColor: "bg-[hsl(160,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-22a909d28eba94674e80.png",
      category: "ESG",
      rating: "4.5"
    },
    {
      id: "compliance",
      name: "Fernanda - Compliance & Regulação",
      description: "Expert em compliance, regulamentação CVM e aspectos legais do mercado",
      icon: Settings,
      bgColor: "bg-[hsl(340,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
      category: "Compliance",
      rating: "4.8"
    },
    {
      id: "valuation",
      name: "Pedro - Valuation & M&A",
      description: "Especialista em avaliação de empresas, fusões e aquisições",
      icon: Landmark,
      bgColor: "bg-[hsl(206,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
      category: "Valuation",
      rating: "4.6"
    },
    {
      id: "private-equity",
      name: "Lucas - Private Equity & VC",
      description: "Expert em capital de risco, private equity e investimentos alternativos",
      icon: CreditCard,
      bgColor: "bg-[hsl(280,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-13cb55de72175bb27fe6.png",
      category: "Investimentos",
      rating: "4.7"
    },
    {
      id: "gestao-risco",
      name: "Carla - Gestão de Riscos",
      description: "Especialista em análise e gestão de riscos financeiros e operacionais",
      icon: Star,
      bgColor: "bg-[hsl(340,35%,75%)]",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
      category: "Riscos",
      rating: "4.8"
    }
  ];

  const handleStartChat = () => {
    if (selectedAgent && promptText) {
      const agent = specializedAgents.find(a => a.id === selectedAgent);
      if (agent) {
        setChatAgent({ 
          name: agent.name, 
          image: agent.image
        });
        setShowWelcomeModal(false);
        setPromptText("");
      }
    }
  };

  const filters = ["Todos", "Análise", "Mentoria", "Educação", "Pesquisa"];

  const mainAgents = [
    {
      name: "Ana - Analista Técnica",
      description: "Especialista em análise técnica, padrões gráficos e estratégias de trading",
      category: "Análise Técnica",
      conversations: "1.2k",
      rating: "4.9",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
      bgColor: "bg-[hsl(206,35%,75%)]",
      icon: ChartLine
    },
    {
      name: "Ricardo - Especialista em Renda Fixa",
      description: "Expert em títulos públicos, CDBs, LCIs e estratégias conservadoras",
      category: "Renda Fixa",
      conversations: "890",
      rating: "4.8",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
      bgColor: "bg-[hsl(280,35%,75%)]",
      icon: Landmark
    },
    {
      name: "Marina - Crypto & DeFi",
      description: "Especialista em criptomoedas, DeFi e tecnologia blockchain",
      category: "Crypto",
      conversations: "654",
      rating: "4.7",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
      bgColor: "bg-[hsl(340,35%,75%)]",
      icon: Bitcoin
    },
    {
      name: "Professor João - Educador",
      description: "Educador financeiro com foco em fundamentos e teoria econômica",
      category: "Educação",
      conversations: "2.1k",
      rating: "4.9",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png",
      bgColor: "bg-[hsl(160,35%,75%)]",
      icon: GraduationCap
    }
  ];

  const communityAgents = [
    {
      name: "Análise M&A",
      description: "Expert em fusões e aquisições",
      users: "234",
      rating: "4.6",
      creator: "Lucas M.",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-675b560473e7a67a36de.png",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-13cb55de72175bb27fe6.png",
      bgColor: "bg-[hsl(280,35%,85%)]"
    },
    {
      name: "Regulação CVM",
      description: "Especialista em compliance",
      users: "567",
      rating: "4.8",
      creator: "Fernanda S.",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-25fae75b5cd936a046c7.png",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
      bgColor: "bg-[hsl(340,35%,85%)]"
    },
    {
      name: "Valuation",
      description: "Avaliação de empresas",
      users: "412",
      rating: "4.7",
      creator: "Pedro A.",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-484dedc717ca4e3b2884.png",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
      bgColor: "bg-[hsl(206,35%,85%)]"
    },
    {
      name: "ESG Investing",
      description: "Investimentos sustentáveis",
      users: "328",
      rating: "4.5",
      creator: "Julia R.",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-01e9ab9b045b400dcda9.png",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-22a909d28eba94674e80.png",
      bgColor: "bg-[hsl(160,35%,85%)]"
    }
  ];

  const recentConversations = [
    {
      agent: "Ana - Analista Técnica",
      preview: "Análise do padrão de reversão no IBOV...",
      time: "há 2 horas",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-00bef39a8a52d7771b30.png",
      hasNew: true
    },
    {
      agent: "Ricardo - Renda Fixa",
      preview: "Comparação entre CDB e Tesouro Direto...",
      time: "ontem",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-a82dc663d00f9c32fd55.png",
      hasNew: false
    },
    {
      agent: "Marina - Crypto & DeFi",
      preview: "Estratégias de yield farming em 2024...",
      time: "3 dias",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-681c12c78efb2f1334ef.png",
      hasNew: false
    }
  ];

  const features = [
    {
      title: "Memória Persistente",
      description: "Lembram do contexto de conversas anteriores",
      icon: Brain,
      bgColor: "bg-[hsl(206,35%,75%)]/20"
    },
    {
      title: "Dados em Tempo Real",
      description: "Acesso a informações atualizadas do mercado",
      icon: Database,
      bgColor: "bg-[hsl(280,35%,75%)]/20"
    },
    {
      title: "Exportar Conversas",
      description: "Salve análises em PDF ou áudio",
      icon: FileDown,
      bgColor: "bg-[hsl(340,35%,75%)]/20"
    },
    {
      title: "Modo Educativo",
      description: "Explicações detalhadas para aprendizado",
      icon: GraduationCap,
      bgColor: "bg-[hsl(160,35%,75%)]/20"
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      <div className="flex-1">
        {chatAgent && (
          <AgentChat
            agentName={chatAgent.name}
            agentImage={chatAgent.image}
            onClose={() => setChatAgent(null)}
          />
        )}

        {/* Welcome Modal */}
        {showWelcomeModal && !chatAgent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-2xl max-w-2xl w-full shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Bem-vindo aos Agentes de IA</h2>
                  <p className="text-sm text-muted-foreground mt-1">Escolha um especialista e comece sua conversa</p>
                </div>
                <button 
                  onClick={() => setShowWelcomeModal(false)}
                  className="text-muted-foreground hover:text-foreground transition p-2 hover:bg-muted rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Selecione um Agente Especializado
                  </label>
                  <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                    <SelectTrigger className="w-full h-16">
                      <SelectValue placeholder="Escolha um especialista..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-[60] max-h-[480px]">
                      {specializedAgents.map((agent) => (
                        <SelectItem 
                          key={agent.id} 
                          value={agent.id}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-3 py-2">
                            <img 
                              src={agent.image} 
                              alt={agent.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-foreground">{agent.name}</div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'hsl(206,35%,85%)', color: 'hsl(206,35%,35%)' }}>
                                    {agent.category}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'hsl(45,78%,88%)', color: 'hsl(45,78%,35%)' }}>
                                    <Star size={10} fill="currentColor" />
                                    {agent.rating}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1">{agent.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    O que vamos fazer hoje?
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Digite sua pergunta ou objetivo..."
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleStartChat();
                        }
                      }}
                      className="w-full min-h-[140px] p-4 pr-14 bg-background border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)]"
                    />
                    <button
                      onClick={handleStartChat}
                      disabled={!selectedAgent || !promptText}
                      className={`absolute right-3 bottom-3 p-2 rounded-lg transition ${
                        selectedAgent && promptText
                          ? 'bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(206,35%,65%)]'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Pressione Shift + Enter para nova linha ou Enter para iniciar
                  </p>
                </div>
              </div>

              <div className="p-6 bg-muted/30 rounded-b-2xl border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Brain size={14} />
                    <span>Assistentes com memória e contexto</span>
                  </div>
                  <Button
                    onClick={handleStartChat}
                    disabled={!selectedAgent || !promptText}
                    className="bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(206,35%,65%)]"
                  >
                    Iniciar Conversa
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Agentes de IA</h1>
            <p className="text-sm text-muted-foreground mt-1">Escolha um assistente especializado para suas necessidades</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Buscar agente..." 
                className="w-80 pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
            <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-lg transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[hsl(45,35%,75%)] rounded-full" />
            </button>
            <Button variant="outline" asChild>
              <Link to="/consumo-analytics">
                <ChartLine size={16} className="mr-2" />
                Consumo
              </Link>
            </Button>
            <Button>
              <Plus size={16} className="mr-2" />
              Nova Conversa
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-8 py-3 bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition flex items-center gap-1">
            <Home size={16} />
            <span>Dashboard</span>
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground font-medium">Agentes de IA</span>
        </div>
      </div>

      <main className="p-8">
        {/* Interaction Modes */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
              <div className="w-16 h-16 bg-[hsl(280,35%,85%)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-opacity-80 transition">
                <MessageSquare className="text-[hsl(220,15%,30%)]" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Conversa por Texto</h3>
              <p className="text-sm text-muted-foreground mb-4">Interaja através de mensagens escritas para análises detalhadas e pesquisas</p>
              <div className="flex items-center text-sm text-[hsl(220,15%,30%)] font-medium">
                <span>Iniciar chat</span>
                <ChevronRight size={16} className="ml-2" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
              <div className="w-16 h-16 bg-[hsl(340,35%,85%)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-opacity-80 transition">
                <Mic className="text-[hsl(220,15%,30%)]" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Conversa por Áudio</h3>
              <p className="text-sm text-muted-foreground mb-4">Fale naturalmente e receba respostas em áudio para maior praticidade</p>
              <div className="flex items-center text-sm text-[hsl(220,15%,30%)] font-medium">
                <span>Iniciar áudio</span>
                <ChevronRight size={16} className="ml-2" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
              <div className="w-16 h-16 bg-[hsl(45,35%,85%)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-opacity-80 transition">
                <Video className="text-[hsl(220,15%,30%)]" size={24} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Conversa por Vídeo</h3>
              <p className="text-sm text-muted-foreground mb-4">Interaja face a face com avatares especializados em tempo real</p>
              <div className="flex items-center text-sm text-[hsl(220,15%,30%)] font-medium">
                <span>Iniciar vídeo</span>
                <ChevronRight size={16} className="ml-2" />
              </div>
            </div>
          </div>
        </section>

        {/* Agent Categories */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Especialistas por Área</h2>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)]"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {filter}
                </button>
              ))}
              <Button 
                variant="outline" 
                className="bg-[hsl(45,35%,75%)] text-[hsl(220,15%,30%)] border-[hsl(45,35%,65%)] hover:bg-[hsl(45,35%,65%)]"
                asChild
              >
                <Link to="/meus-agentes">
                  <Settings size={16} className="mr-2" />
                  Ver Agentes
                </Link>
              </Button>
              <Button className="bg-[hsl(160,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(160,35%,65%)]">
                <Plus size={16} className="mr-2" />
                Criar Novo Agente
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {mainAgents.map((agent, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 rounded-xl ${agent.bgColor} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{agent.name}</h3>
                      <span className="w-3 h-3 bg-[hsl(160,35%,75%)] rounded-full" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <agent.icon size={14} />
                        {agent.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {agent.conversations} conversas
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={14} />
                        {agent.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => setChatAgent({ name: agent.name, image: agent.image })}
                      >
                        <MessageSquare size={16} className="mr-2" />
                        Chat
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mic size={16} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Video size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Agents */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Agentes da Comunidade</h2>
              <p className="text-sm text-muted-foreground mt-1">Agentes criados e compartilhados por outros profissionais</p>
            </div>
            <button className="text-sm text-primary font-medium hover:underline">Ver todos</button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {communityAgents.map((agent, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition cursor-pointer">
                <div className={`w-16 h-16 rounded-xl ${agent.bgColor} flex items-center justify-center mx-auto mb-4 overflow-hidden`}>
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <h3 className="font-semibold text-foreground text-center mb-2">{agent.name}</h3>
                <p className="text-xs text-muted-foreground text-center mb-3">{agent.description}</p>
                <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {agent.users}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} />
                    {agent.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center mb-3">
                  <img src={agent.creatorAvatar} alt={agent.creator} className="w-5 h-5 rounded-full object-cover" />
                  <span>por {agent.creator}</span>
                </div>
                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={() => setChatAgent({ name: agent.name, image: agent.image })}
                >
                  <MessageSquare size={14} className="mr-1" />
                  Usar Agente
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Conversations */}
          <section className="col-span-2 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Conversas Recentes</h2>
              <button className="text-sm text-primary font-medium hover:underline">Ver todas</button>
            </div>
            <div className="space-y-4">
              {recentConversations.map((conv, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted transition cursor-pointer">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img src={conv.image} alt={conv.agent} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground text-sm">{conv.agent}</h3>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{conv.preview}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {conv.hasNew && <span className="w-2 h-2 bg-primary rounded-full" />}
                    <ChevronRight className="text-muted-foreground" size={16} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-dashed">
              <Plus size={16} className="mr-2" />
              Iniciar nova conversa
            </Button>
          </section>

          {/* Agent Features */}
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Recursos dos Agentes</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="text-[hsl(220,15%,30%)]" size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-foreground text-sm mb-3">Sua Cota Mensal</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">65%</span>
              </div>
              <p className="text-xs text-muted-foreground">650/1000 interações utilizadas</p>
            </div>
          </section>
        </div>
      </main>
      </div>
    </div>
  );
}
