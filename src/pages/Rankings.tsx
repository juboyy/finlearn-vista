import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  Heart, 
  Trophy, 
  ArrowUp, 
  Flame, 
  Star, 
  Crown, 
  UserPlus, 
  Check 
} from "lucide-react";

const Rankings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      
      <div className="flex-1">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Rankings & Comunidade</h1>
              <p className="text-sm text-muted-foreground mt-1">Veja sua posição e conecte-se com outros profissionais</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar usuários..." 
                  className="w-80 pl-10 pr-4 py-2 bg-muted border border-transparent rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card focus:border-border"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
              
              <button className="relative w-10 h-10 flex items-center justify-center text-muted-foreground hover:bg-muted rounded-md transition">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-warning rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          <section className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-primary-light rounded-md flex items-center justify-center">
                  <TrendingUp className="text-muted-foreground" size={20} />
                </div>
                <span className="text-xs font-semibold text-success-foreground bg-success-light px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ArrowUp size={12} /> 12
                </span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">#47</div>
              <div className="text-sm text-muted-foreground">Sua Posição Global</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-secondary-light rounded-md flex items-center justify-center">
                  <Users className="text-muted-foreground" size={20} />
                </div>
                <span className="text-xs font-semibold text-success-foreground bg-success-light px-2 py-0.5 rounded-full">+8</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">342</div>
              <div className="text-sm text-muted-foreground">Seguidores</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-accent-light rounded-md flex items-center justify-center">
                  <Heart className="text-muted-foreground" size={20} />
                </div>
                <span className="text-xs font-semibold text-success-foreground bg-success-light px-2 py-0.5 rounded-full">+23</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Curtidas Recebidas</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-success-light rounded-md flex items-center justify-center">
                  <Trophy className="text-muted-foreground" size={20} />
                </div>
                <span className="text-xs font-semibold text-warning-foreground bg-warning-light px-2 py-0.5 rounded-full">Top 5%</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">2,456</div>
              <div className="text-sm text-muted-foreground">Pontos XP</div>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Ranking Global</h2>
                <div className="flex gap-1 p-1 bg-muted rounded-md">
                  <button className="px-3 py-1 text-sm font-medium text-foreground bg-card rounded shadow-sm">Semanal</button>
                  <button className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Mensal</button>
                  <button className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Geral</button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-3 bg-warning-light border border-warning rounded-md">
                  <div className="flex-shrink-0 text-center w-8">
                    <Crown className="text-warning-foreground mx-auto" size={24} />
                  </div>
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Marina Santos</div>
                    <div className="text-xs text-muted-foreground">Analista Senior • 4,892 XP</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">128</div>
                      <div className="text-xs text-muted-foreground">Seguidores</div>
                    </div>
                    <button className="px-4 h-10 bg-primary text-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition">
                      <UserPlus size={16} className="inline mr-2" />Seguir
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-md transition-colors">
                  <div className="flex-shrink-0 text-center w-8">
                    <div className="text-xl font-bold text-muted-foreground">2</div>
                  </div>
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Ricardo Alves</div>
                    <div className="text-xs text-muted-foreground">Trader • 4,567 XP</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">95</div>
                      <div className="text-xs text-muted-foreground">Seguidores</div>
                    </div>
                    <button className="px-4 h-10 bg-primary text-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition">
                      <UserPlus size={16} className="inline mr-2" />Seguir
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-md transition-colors">
                  <div className="flex-shrink-0 text-center w-8">
                    <div className="text-xl font-bold text-muted-foreground">3</div>
                  </div>
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Ana Costa</div>
                    <div className="text-xs text-muted-foreground">Gestora de Fundos • 4,321 XP</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">87</div>
                      <div className="text-xs text-muted-foreground">Seguidores</div>
                    </div>
                    <button className="px-4 h-10 border border-border bg-card text-muted-foreground rounded-md text-sm font-medium hover:bg-muted transition">
                      <Check size={16} className="inline mr-2" />Seguindo
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-md transition-colors">
                  <div className="flex-shrink-0 text-center w-8">
                    <div className="text-lg font-semibold text-muted-foreground">4</div>
                  </div>
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Pedro Lima</div>
                    <div className="text-xs text-muted-foreground">Consultor Financeiro • 3,987 XP</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">76</div>
                      <div className="text-xs text-muted-foreground">Seguidores</div>
                    </div>
                    <button className="px-4 h-10 bg-primary text-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition">
                      <UserPlus size={16} className="inline mr-2" />Seguir
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 hover:bg-muted rounded-md transition-colors">
                  <div className="flex-shrink-0 text-center w-8">
                    <div className="text-lg font-semibold text-muted-foreground">5</div>
                  </div>
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Juliana Ferreira</div>
                    <div className="text-xs text-muted-foreground">Economista • 3,654 XP</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">68</div>
                      <div className="text-xs text-muted-foreground">Seguidores</div>
                    </div>
                    <button className="px-4 h-10 bg-primary text-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition">
                      <UserPlus size={16} className="inline mr-2" />Seguir
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary-light ring-2 ring-primary rounded-md">
                  <div className="flex-shrink-0 text-center w-8">
                    <div className="text-lg font-bold text-foreground">47</div>
                  </div>
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Carlos Silva (Você)</div>
                    <div className="text-xs text-muted-foreground">Investidor • 2,456 XP</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">342</div>
                      <div className="text-xs text-muted-foreground">Seguidores</div>
                    </div>
                    <button className="px-4 h-10 border border-primary bg-card text-foreground rounded-md text-sm font-medium hover:bg-primary-light transition">
                      Ver Perfil
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-6">Conquistas</h2>
              
              <div className="space-y-5">
                <div className="p-4 bg-warning-light border border-warning/50 rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                      <Flame className="text-warning-foreground" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Sequência de Fogo</div>
                      <div className="text-xs text-muted-foreground">12 dias consecutivos</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-warning/20 rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">12/15</span>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-success-light rounded-full flex items-center justify-center">
                      <Star className="text-success-foreground" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Expert</div>
                      <div className="text-xs text-muted-foreground">Complete 50 cursos</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: '48%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">24/50</span>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center">
                      <Users className="text-secondary-foreground" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Influenciador</div>
                      <div className="text-xs text-muted-foreground">500 seguidores</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">342/500</span>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
                      <Heart className="text-accent-foreground" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Amado pela Comunidade</div>
                      <div className="text-xs text-muted-foreground">2000 curtidas</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">1247/2000</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 h-10 border border-border bg-card text-foreground rounded-md text-sm font-medium hover:bg-muted transition">
                Ver Todas as Conquistas
              </button>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Top Contribuidores</h2>
                <a href="#" className="text-sm text-foreground font-medium hover:underline">Ver todos</a>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Beatriz Souza</div>
                    <div className="text-xs text-muted-foreground">Especialista em Renda Fixa</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Fernando Rocha</div>
                    <div className="text-xs text-muted-foreground">Analista de Mercados</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Camila Dias</div>
                    <div className="text-xs text-muted-foreground">Coach Financeiro</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Lucas Martins</div>
                    <div className="text-xs text-muted-foreground">Trader Profissional</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Patricia Oliveira</div>
                    <div className="text-xs text-muted-foreground">Consultora de Investimentos</div>
                  </div>
                  <button className="px-3 h-8 border border-border bg-card text-muted-foreground rounded-md text-xs font-medium hover:bg-muted transition">
                    Seguindo
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Perfis em Alta</h2>
                <a href="#" className="text-sm text-foreground font-medium hover:underline">Explorar</a>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Beatriz Souza</div>
                    <div className="text-xs text-muted-foreground">Especialista em Renda Fixa</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Fernando Rocha</div>
                    <div className="text-xs text-muted-foreground">Analista de Mercados</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Camila Dias</div>
                    <div className="text-xs text-muted-foreground">Coach Financeiro</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Lucas Martins</div>
                    <div className="text-xs text-muted-foreground">Trader Profissional</div>
                  </div>
                  <button className="px-3 h-8 bg-primary text-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition">
                    Seguir
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-2 hover:bg-muted rounded-md transition">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">Patricia Oliveira</div>
                    <div className="text-xs text-muted-foreground">Consultora de Investimentos</div>
                  </div>
                  <button className="px-3 h-8 border border-border bg-card text-muted-foreground rounded-md text-xs font-medium hover:bg-muted transition">
                    Seguindo
                  </button>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Atividade Recente da Comunidade</h2>
              <div className="flex gap-1 p-1 bg-muted rounded-md">
                <button className="px-3 py-1 text-sm font-medium text-foreground bg-card rounded shadow-sm">Todos</button>
                <button className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground">Seguindo</button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 border-b border-border last:border-b-0">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    <a href="#" className="font-semibold text-foreground hover:underline">Marina Santos</a>
                    {' '}completou o curso{' '}
                    <a href="#" className="font-semibold text-primary hover:underline">Análise Técnica Avançada</a>.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>há 15 minutos</span>
                    <div className="flex items-center gap-1.5">
                      <Heart className="text-red-400" size={14} fill="currentColor" />
                      <span>24</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Heart className="text-muted-foreground" size={14} />
                      <span>5</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 border-b border-border last:border-b-0">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    <a href="#" className="font-semibold text-foreground hover:underline">Ricardo Alves</a>
                    {' '}publicou um novo artigo{' '}
                    <a href="#" className="font-semibold text-primary hover:underline">Tendências do Mercado 2024</a>.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>há 1 hora</span>
                    <div className="flex items-center gap-1.5">
                      <Heart className="text-red-400" size={14} fill="currentColor" />
                      <span>87</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Heart className="text-muted-foreground" size={14} />
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 p-4">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User" className="w-11 h-11 rounded-full object-cover flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    <a href="#" className="font-semibold text-foreground hover:underline">Ana Costa</a>
                    {' '}alcançou a conquista{' '}
                    <span className="font-semibold text-warning-foreground">Expert em Fundos</span>.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>há 2 horas</span>
                    <div className="flex items-center gap-1.5">
                      <Heart className="text-red-400" size={14} fill="currentColor" />
                      <span>56</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Heart className="text-muted-foreground" size={14} />
                      <span>8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 h-10 border border-border text-foreground rounded-md text-sm font-medium hover:bg-muted transition">
              Carregar Mais Atividades
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Rankings;
