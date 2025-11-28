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
  Lightbulb,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useUserAgents } from "@/hooks/useUserAgents";
import { SidebarMeusAgentes } from "@/components/Dashboard/SidebarMeusAgentes";

export default function MeusAgentes() {
  const { agents, loading, toggleAgentStatus } = useUserAgents();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Análise Técnica":
        return ChartLine;
      case "Renda Fixa":
        return Landmark;
      case "Mercado de Capitais":
        return Building2;
      case "Educação":
        return GraduationCap;
      default:
        return ChartLine;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 70) return "bg-[hsl(206,35%,75%)]";
    if (percentage > 40) return "bg-[hsl(45,35%,75%)]";
    return "bg-[hsl(0,35%,75%)]";
  };

  const calculateLastInteraction = (lastInteraction: string) => {
    const now = new Date();
    const then = new Date(lastInteraction);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "há poucos minutos";
    if (diffInHours < 24) return `há ${diffInHours} horas`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "ontem";
    if (diffInDays < 7) return `há ${diffInDays} dias`;
    return `há ${Math.floor(diffInDays / 7)} semana${Math.floor(diffInDays / 7) > 1 ? 's' : ''}`;
  };

  const totalCredits = agents.reduce((sum, agent) => sum + agent.credits, 0);
  const totalMaxCredits = agents.reduce((sum, agent) => sum + agent.max_credits, 0);
  const totalPercentage = totalMaxCredits > 0 ? (totalCredits / totalMaxCredits) * 100 : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarMeusAgentes />
      <div className="flex-1">
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
            <Button 
              className="bg-[hsl(160,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(160,35%,65%)]"
              onClick={() => window.location.href = "/criar-agente"}
            >
              <Plus size={16} className="mr-2" />
              Criar Novo Agente
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-8 pt-6 pb-3 bg-background">
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
          {/* Agent List */}
          <section className="col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Os Meus Agentes</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{agents.filter(a => a.is_active).length} agentes ativos</span>
              </div>
            </div>

            <div className="space-y-4">
              {agents.map((agent) => {
                const percentage = (agent.credits / agent.max_credits) * 100;
                const progressColor = getProgressColor(percentage);
                const Icon = getCategoryIcon(agent.agent_category);
                
                return (
                  <div 
                    key={agent.id} 
                    className={`bg-card border border-border rounded-xl p-6 hover:shadow-md transition ${!agent.is_active ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-24 h-24 rounded-xl ${agent.agent_bg_color} flex items-center justify-center flex-shrink-0 overflow-hidden ${!agent.is_active ? 'grayscale' : ''}`}>
                        <img src={agent.agent_image} alt={agent.agent_name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`text-lg font-semibold ${agent.is_active ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {agent.agent_name}
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md ${
                                agent.is_active 
                                  ? 'bg-[hsl(160,35%,85%)] text-[hsl(220,15%,30%)]' 
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${agent.is_active ? 'bg-[hsl(160,35%,55%)]' : 'bg-muted-foreground'}`}></span>
                                {agent.is_active ? 'Ativo' : 'Inativo'}
                              </span>
                            </div>
                            <p className={`text-sm mb-3 ${agent.is_active ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                              {agent.agent_description}
                            </p>
                            <div className={`flex items-center gap-4 text-xs ${agent.is_active ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
                              <span className="flex items-center gap-1">
                                <Icon size={14} />
                                {agent.agent_category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                Última interação: {calculateLastInteraction(agent.last_interaction)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star size={14} className="text-[hsl(45,35%,65%)]" />
                                {agent.rating}
                              </span>
                            </div>
                          </div>
                          <Switch 
                            checked={agent.is_active} 
                            onCheckedChange={() => toggleAgentStatus(agent.id, agent.is_active)}
                          />
                        </div>
                        
                        <div className={`rounded-lg p-4 mb-4 ${agent.is_active ? 'bg-muted' : 'bg-muted/50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${agent.is_active ? 'text-foreground' : 'text-muted-foreground'}`}>
                              Créditos Disponíveis
                            </span>
                            <span className={`text-sm font-semibold ${agent.is_active ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {agent.credits} / {agent.max_credits}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${agent.is_active ? progressColor : 'bg-muted-foreground/30'} rounded-full transition-all`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Renova em 12 dias</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button 
                            className="flex-1 bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(206,35%,65%)]"
                            disabled={!agent.is_active}
                          >
                            <MessageSquare size={16} className="mr-2" />
                            Conversar
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.is_active}>
                            <Mic size={16} />
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.is_active}>
                            <Video size={16} />
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.is_active}>
                            <Pen size={16} />
                          </Button>
                          <Button variant="outline" size="icon" disabled={!agent.is_active}>
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
                    <span className="text-sm font-semibold text-foreground">{totalCredits.toLocaleString()} / {totalMaxCredits.toLocaleString()}</span>
                  </div>
                  <Progress value={totalPercentage} className="h-2" />
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
        )}
      </main>
      </div>
    </div>
  );
}
