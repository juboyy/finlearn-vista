import { Link } from "react-router-dom";
import { 
  Home,
  ChevronRight,
  Search,
  Bell,
  Plus,
  MessageSquare,
  Mic,
  Video,
  Pen,
  MoreVertical,
  Star,
  Clock,
  ChartLine,
  Landmark,
  Building2,
  GraduationCap,
  ArrowUp,
  Store,
  History,
  Settings as SettingsIcon,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

export default function MeusAgentes() {
  const myAgents = [
    {
      id: 1,
      name: "Ana - Analista Técnica",
      description: "Especialista em análise técnica, padrões gráficos e estratégias de trading. Fornece insights detalhados sobre movimentos de mercado.",
      category: "Análise Técnica",
      icon: ChartLine,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
      bgColor: "bg-[hsl(206,35%,85%)]",
      rating: "4.9",
      lastInteraction: "há 2 horas",
      credits: 750,
      maxCredits: 1000,
      isActive: true
    },
    {
      id: 2,
      name: "Ricardo - Especialista em Renda Fixa",
      description: "Expert em títulos públicos, CDBs, LCIs e estratégias conservadoras. Ajuda na construção de carteiras de renda fixa eficientes.",
      category: "Renda Fixa",
      icon: Landmark,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
      bgColor: "bg-[hsl(280,35%,85%)]",
      rating: "4.8",
      lastInteraction: "ontem",
      credits: 420,
      maxCredits: 1000,
      isActive: true
    },
    {
      id: 3,
      name: "Marina - Mercado de Capitais",
      description: "Especialista em IPOs, ofertas públicas, estruturação de operações e regulação do mercado de capitais brasileiro.",
      category: "Mercado de Capitais",
      icon: Building2,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
      bgColor: "bg-[hsl(340,35%,85%)]",
      rating: "4.7",
      lastInteraction: "há 3 dias",
      credits: 890,
      maxCredits: 1000,
      isActive: true
    },
    {
      id: 4,
      name: "Professor João - Educador",
      description: "Educador financeiro com foco em fundamentos e teoria econômica. Explica conceitos complexos de forma didática.",
      category: "Educação",
      icon: GraduationCap,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png",
      bgColor: "bg-[hsl(160,35%,85%)]",
      rating: "4.9",
      lastInteraction: "há 1 semana",
      credits: 950,
      maxCredits: 1000,
      isActive: false
    }
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage > 70) return "bg-[hsl(206,35%,75%)]";
    if (percentage > 40) return "bg-[hsl(45,35%,75%)]";
    return "bg-[hsl(0,35%,75%)]";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Meus Agentes de IA</h1>
            <p className="text-sm text-muted-foreground mt-1">Gerencie e interaja com seus assistentes especializados</p>
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
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[hsl(45,35%,75%)] rounded-full"></span>
            </Button>
            <Button className="bg-[hsl(160,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(160,35%,65%)]">
              <Plus size={16} className="mr-2" />
              Criar Novo Agente
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
          <Link to="/agentes" className="hover:text-foreground transition">
            <span>Agentes de IA</span>
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground font-medium">Meus Agentes</span>
        </div>
      </div>

      <main className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Agent List */}
          <section className="col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Os Meus Agentes</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{myAgents.filter(a => a.isActive).length} agentes ativos</span>
              </div>
            </div>

            <div className="space-y-4">
              {myAgents.map((agent) => {
                const percentage = (agent.credits / agent.maxCredits) * 100;
                const progressColor = getProgressColor(percentage);
                
                return (
                  <div 
                    key={agent.id} 
                    className={`bg-card border border-border rounded-xl p-6 hover:shadow-md transition ${!agent.isActive ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-24 h-24 rounded-xl ${agent.bgColor} flex items-center justify-center flex-shrink-0 overflow-hidden ${!agent.isActive ? 'grayscale' : ''}`}>
                        <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`text-lg font-semibold ${agent.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {agent.name}
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md ${
                                agent.isActive 
                                  ? 'bg-[hsl(160,35%,85%)] text-[hsl(220,15%,30%)]' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${agent.isActive ? 'bg-[hsl(160,35%,55%)]' : 'bg-muted-foreground'}`}></span>
                                {agent.isActive ? 'Ativo' : 'Inativo'}
                              </span>
                            </div>
                            <p className={`text-sm mb-3 ${agent.isActive ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                              {agent.description}
                            </p>
                            <div className={`flex items-center gap-4 text-xs ${agent.isActive ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                              <span className="flex items-center gap-1">
                                <agent.icon size={14} />
                                {agent.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                Última interação: {agent.lastInteraction}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star size={14} className="text-[hsl(45,35%,65%)]" />
                                {agent.rating}
                              </span>
                            </div>
                          </div>
                          <Switch checked={agent.isActive} />
                        </div>
                        
                        <div className={`rounded-lg p-4 mb-4 ${agent.isActive ? 'bg-muted' : 'bg-muted/50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${agent.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                              Créditos Disponíveis
                            </span>
                            <span className={`text-sm font-semibold ${agent.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {agent.credits} / {agent.maxCredits}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${agent.isActive ? progressColor : 'bg-muted-foreground/30'} rounded-full transition-all`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Renova em 12 dias</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button 
                            className="flex-1 bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(206,35%,65%)]"
                            disabled={!agent.isActive}
                          >
                            <MessageSquare size={16} className="mr-2" />
                            Conversar
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.isActive}>
                            <Mic size={16} />
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.isActive}>
                            <Video size={16} />
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.isActive}>
                            <Pen size={16} />
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.isActive}>
                            <MoreVertical size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Usage Summary */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Resumo de Uso</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Créditos Totais</span>
                    <span className="text-sm font-semibold text-foreground">3.010 / 4.000</span>
                  </div>
                  <Progress value={75.25} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Renova em 12 dias</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Uso por Tipo</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={14} className="text-[hsl(206,35%,65%)]" />
                        <span className="text-sm text-muted-foreground">Texto</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">520</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mic size={14} className="text-[hsl(280,35%,65%)]" />
                        <span className="text-sm text-muted-foreground">Áudio</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">320</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video size={14} className="text-[hsl(340,35%,65%)]" />
                        <span className="text-sm text-muted-foreground">Vídeo</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">150</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full bg-[hsl(206,35%,85%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(206,35%,75%)]">
                    <ArrowUp size={16} className="mr-2" />
                    Fazer Upgrade
                  </Button>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition text-left">
                  <div className="w-8 h-8 bg-[hsl(206,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Plus size={14} className="text-[hsl(206,35%,45%)]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Criar Agente</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition text-left">
                  <div className="w-8 h-8 bg-[hsl(280,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Store size={14} className="text-[hsl(280,35%,45%)]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Marketplace</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition text-left">
                  <div className="w-8 h-8 bg-[hsl(340,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <History size={14} className="text-[hsl(340,35%,45%)]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Histórico</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition text-left">
                  <div className="w-8 h-8 bg-[hsl(160,35%,85%)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <SettingsIcon size={14} className="text-[hsl(160,35%,45%)]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Configurações</span>
                </button>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} className="text-[hsl(45,35%,65%)]" />
                <h2 className="text-lg font-semibold text-foreground">Dica</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Use comandos de voz para interações mais rápidas com seus agentes. Experimente o modo áudio!
              </p>
              <button className="text-sm text-[hsl(206,35%,55%)] font-medium hover:underline">
                Saiba mais
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
