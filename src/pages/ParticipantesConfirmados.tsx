import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Bell, UserPlus, Check, Users, Circle, UserCheck, UserMinus, Mail } from "lucide-react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ParticipantesConfirmados = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [sortBy, setSortBy] = useState("ordenar");
  const [activeTab, setActiveTab] = useState("seguindo");

  const members = [
    {
      id: 1,
      name: "Ricardo Almeida",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      bio: "15 anos de experiência em meios de pagamento",
      role: "Especialista em Pagamentos",
      badges: [
        { label: "Moderador", color: "bg-[hsl(270,35%,75%)]" },
        { label: "Especialista", color: "bg-[hsl(44,40%,75%)]" }
      ],
      posts: 124,
      followers: "2.3k",
      online: true,
      relationship: "Mútuo",
      isFollowing: true
    },
    {
      id: 2,
      name: "Ana Paula Santos",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      bio: "Especialista em regulação financeira e compliance",
      role: "Analista de Compliance",
      badges: [
        { label: "Moderadora", color: "bg-[hsl(270,35%,75%)]" }
      ],
      posts: 98,
      followers: "1.8k",
      online: true,
      relationship: "Mútuo",
      isFollowing: true
    },
    {
      id: 3,
      name: "Carlos Mendes",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      bio: "Product Manager focado em pagamento instantâneo",
      role: "Gerente de Produtos",
      badges: [
        { label: "Ativo", color: "bg-[hsl(142,35%,75%)]" }
      ],
      posts: 87,
      followers: "1.5k",
      online: true,
      relationship: "Não segue você",
      isFollowing: true
    },
    {
      id: 4,
      name: "Fernando Costa",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      bio: "Desenvolvedor especializado em APIs financeiras",
      role: "Desenvolvedor Sênior",
      badges: [
        { label: "Tech Lead", color: "bg-[hsl(22,35%,75%)]" }
      ],
      posts: 76,
      followers: "892",
      online: false,
      relationship: "Segue você",
      isFollowing: false
    },
    {
      id: 5,
      name: "Juliana Rodrigues",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      bio: "Designer focada em experiência do usuário",
      role: "UX Designer",
      badges: [
        { label: "Design", color: "bg-[hsl(338,35%,75%)]" }
      ],
      posts: 65,
      followers: "1.1k",
      online: true,
      relationship: "Mútuo",
      isFollowing: true
    },
    {
      id: 6,
      name: "Pedro Oliveira",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      bio: "Analista focado em estratégia e inovação",
      role: "Analista de Negócios",
      badges: [
        { label: "Estratégia", color: "bg-[hsl(207,35%,75%)]" }
      ],
      posts: 54,
      followers: "678",
      online: false,
      relationship: "Não segue você",
      isFollowing: false
    },
    {
      id: 7,
      name: "Mariana Silva",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      bio: "Especialista em gestão de riscos e prevenção à fraude",
      role: "Gerente de Riscos",
      badges: [
        { label: "Compliance", color: "bg-[hsl(44,40%,75%)]" }
      ],
      posts: 48,
      followers: "945",
      online: true,
      relationship: "Não segue você",
      isFollowing: true
    },
    {
      id: 8,
      name: "Roberto Ferreira",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      bio: "Arquiteto especializado em soluções de pagamento",
      role: "Arquiteto de Soluções",
      badges: [
        { label: "Tecnologia", color: "bg-[hsl(22,35%,75%)]" }
      ],
      posts: 42,
      followers: "567",
      online: false,
      relationship: "Segue você",
      isFollowing: false
    },
    {
      id: 9,
      name: "Beatriz Martins",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      bio: "Consultora especializada em transformação digital",
      role: "Consultora Financeira",
      badges: [
        { label: "Consultoria", color: "bg-[hsl(142,35%,75%)]" }
      ],
      posts: 38,
      followers: "823",
      online: true,
      relationship: "Não segue você",
      isFollowing: false
    },
    {
      id: 10,
      name: "Lucas Andrade",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      bio: "Cientista de dados focado em análise preditiva",
      role: "Data Scientist",
      badges: [
        { label: "Dados", color: "bg-[hsl(270,35%,75%)]" }
      ],
      posts: 35,
      followers: "712",
      online: true,
      relationship: "Mútuo",
      isFollowing: true
    },
    {
      id: 11,
      name: "Gabriel Souza",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      bio: "Engenheiro especializado em desenvolvimento de APIs",
      role: "Engenheiro de Software",
      badges: [
        { label: "Backend", color: "bg-[hsl(22,35%,75%)]" }
      ],
      posts: 31,
      followers: "534",
      online: false,
      relationship: "Não segue você",
      isFollowing: false
    },
    {
      id: 12,
      name: "Camila Torres",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      bio: "Especialista em marketing digital para fintechs",
      role: "Gerente de Marketing",
      badges: [
        { label: "Marketing", color: "bg-[hsl(338,35%,75%)]" }
      ],
      posts: 28,
      followers: "1.4k",
      online: true,
      relationship: "Segue você",
      isFollowing: false
    }
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border flex-shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/discussao")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[hsl(207,35%,75%)] overflow-hidden flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c7751f850a-69a10e658ef483c7546c.png" 
                    alt="community icon" 
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Inovação em Pagamentos</h1>
                  <p className="text-sm text-muted-foreground">12.5k membros • 150 online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="outline" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Convidar
              </Button>
              <Button className="gap-2 bg-[hsl(142,35%,75%)] bg-opacity-30 text-foreground hover:bg-opacity-100">
                <Check className="h-4 w-4" />
                Seguindo
              </Button>
            </div>
          </div>
          
          <div className="px-6 py-3 bg-muted/30 border-b border-border flex items-center gap-6 overflow-x-auto">
            <button 
              onClick={() => navigate("/discussao")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap"
            >
              Discussões
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap">Sobre</button>
            <button className="text-sm font-medium text-foreground border-b-2 border-[hsl(207,50%,60%)] pb-3 -mb-3.5 whitespace-nowrap">Membros</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap">Eventos</button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 -mb-3.5 transition whitespace-nowrap">Recursos</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Members Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Membros da Comunidade</h2>
                <p className="text-sm text-muted-foreground">Conecte-se com profissionais do mercado financeiro</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setActiveTab("seguindo")}
                  className={`px-5 py-2.5 rounded-lg font-medium transition ${
                    activeTab === "seguindo"
                      ? "bg-[hsl(270,35%,75%)] text-foreground hover:bg-opacity-80"
                      : "bg-[hsl(142,35%,75%)] text-foreground hover:bg-opacity-80"
                  }`}
                >
                  Seguindo
                </Button>
                <Button
                  onClick={() => setActiveTab("seguidores")}
                  className={`px-5 py-2.5 rounded-lg font-medium transition ${
                    activeTab === "seguidores"
                      ? "bg-[hsl(270,35%,75%)] text-foreground hover:bg-opacity-80"
                      : "bg-[hsl(142,35%,75%)] text-foreground hover:bg-opacity-80"
                  }`}
                >
                  Seguidores
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Buscar membros..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os membros</SelectItem>
                  <SelectItem value="moderadores">Moderadores</SelectItem>
                  <SelectItem value="especialistas">Especialistas</SelectItem>
                  <SelectItem value="novos">Novos membros</SelectItem>
                  <SelectItem value="ativos">Mais ativos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ordenar">Ordenar por</SelectItem>
                  <SelectItem value="nome">Nome A-Z</SelectItem>
                  <SelectItem value="recentes">Mais recentes</SelectItem>
                  <SelectItem value="posts">Mais posts</SelectItem>
                  <SelectItem value="seguidores">Mais seguidores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[hsl(207,35%,75%)] bg-opacity-30 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12.5k</p>
                  <p className="text-xs text-muted-foreground">Total de Membros</p>
                </div>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[hsl(142,35%,75%)] bg-opacity-30 rounded-lg flex items-center justify-center">
                  <Circle className="h-3 w-3 text-slate-600 fill-current" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">150</p>
                  <p className="text-xs text-muted-foreground">Online Agora</p>
                </div>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[hsl(270,35%,75%)] bg-opacity-30 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">847</p>
                  <p className="text-xs text-muted-foreground">Você Segue</p>
                </div>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[hsl(338,35%,75%)] bg-opacity-30 rounded-lg flex items-center justify-center">
                  <UserMinus className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1.2k</p>
                  <p className="text-xs text-muted-foreground">Seus Seguidores</p>
                </div>
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-background border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Membro</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Cargo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Categoria</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Posts</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Seguidores</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Status</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Relacionamento</th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-muted/30 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={member.avatar} 
                              alt={member.name} 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className={`absolute bottom-0 right-0 w-3 h-3 ${member.online ? 'bg-green-500' : 'bg-slate-300'} border-2 border-white rounded-full`}></span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{member.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{member.bio}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-foreground">{member.role}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {member.badges.map((badge, idx) => (
                            <span 
                              key={idx}
                              className={`${badge.color} text-foreground text-xs px-2 py-1 rounded font-medium`}
                            >
                              {badge.label}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-foreground font-medium">{member.posts}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-sm text-foreground font-medium">{member.followers}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${member.online ? 'text-green-600' : 'text-slate-400'}`}>
                          <Circle className="h-1.5 w-1.5 fill-current" />
                          {member.online ? 'Online' : 'Offline'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-1">
                          {member.relationship === "Mútuo" ? (
                            <span className="bg-[hsl(142,35%,75%)] bg-opacity-30 text-foreground text-xs px-2 py-1 rounded font-medium">
                              Mútuo
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">{member.relationship}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          {member.isFollowing ? (
                            <Button 
                              size="sm"
                              className="bg-[hsl(207,35%,75%)] bg-opacity-30 text-foreground hover:bg-opacity-100 gap-1"
                            >
                              <UserCheck className="h-3 w-3" />
                              Seguindo
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              variant="outline"
                              className="gap-1"
                            >
                              <UserPlus className="h-3 w-3" />
                              Seguir
                            </Button>
                          )}
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Load More Button */}
          <div className="mt-8 flex items-center justify-center">
            <Button variant="outline" className="gap-2">
              <span>Carregar mais membros</span>
              <ChevronLeft className="h-4 w-4 rotate-[-90deg]" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantesConfirmados;
