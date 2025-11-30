import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Search, Filter, ArrowUpDown, Star, MapPin, Users, UserPlus, MessageCircle, MoreHorizontal, BadgeCheck, Mic, Gavel, TrendingUp, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ParticipantesConfirmados() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("todos");

  const featuredAttendees = [
    {
      id: 1,
      name: "Carlos Mendes",
      role: "CEO na FutureBank",
      location: "São Paulo, SP",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      followers: "2.4k",
      mutualFriends: "432",
      tags: ["Palestrante", "Inovação"],
      icon: Mic,
      iconBg: "bg-pastel-blue/60",
      borderColor: "border-pastel-purple/70",
      isFollowing: true,
    },
    {
      id: 2,
      name: "Ana Paula Souza",
      role: "Diretora na CVM",
      location: "Rio de Janeiro, RJ",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      followers: "5.1k",
      mutualFriends: "89",
      tags: ["Palestrante", "Regulação"],
      icon: Gavel,
      iconBg: "bg-pastel-purple/60",
      borderColor: "border-pastel-blue/70",
      isFollowing: false,
    },
    {
      id: 3,
      name: "Roberto Chang",
      role: "Head de Renda Fixa",
      location: "São Paulo, SP",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      followers: "3.8k",
      mutualFriends: "201",
      tags: ["Palestrante", "Mercados"],
      icon: TrendingUp,
      iconBg: "bg-pastel-yellow/60",
      borderColor: "border-pastel-green/70",
      isFollowing: false,
    },
  ];

  const allAttendees = [
    {
      id: 1,
      name: "Mariana Costa",
      role: "Economista Chefe na Macro Insights",
      location: "São Paulo, SP",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      followers: "1.2k",
      mutualFriends: "45",
      verified: true,
      isFollowing: false,
    },
    {
      id: 2,
      name: "Fernando Ribeiro",
      role: "Diretor de Investimentos na Capital Assets",
      location: "Rio de Janeiro, RJ",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      followers: "890",
      mutualFriends: "12",
      verified: false,
      isFollowing: true,
    },
    {
      id: 3,
      name: "Juliana Santos",
      role: "Gerente de Compliance na Banco XYZ",
      location: "Brasília, DF",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      followers: "654",
      mutualFriends: "8",
      verified: true,
      isFollowing: false,
    },
    {
      id: 4,
      name: "Pedro Almeida",
      role: "Analista Sênior de Mercado de Capitais",
      location: "São Paulo, SP",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      followers: "432",
      mutualFriends: "23",
      verified: false,
      isFollowing: true,
    },
    {
      id: 5,
      name: "Camila Ferreira",
      role: "CFO na TechFin Solutions",
      location: "Curitiba, PR",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      followers: "2.1k",
      mutualFriends: "67",
      verified: true,
      isFollowing: false,
    },
    {
      id: 6,
      name: "Ricardo Moura",
      role: "Gestor de Portfólio na Investimentos BR",
      location: "Porto Alegre, RS",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      followers: "1.5k",
      mutualFriends: "34",
      verified: false,
      isFollowing: false,
    },
    {
      id: 7,
      name: "Beatriz Lima",
      role: "Head de Risco Operacional na FinCorp",
      location: "Belo Horizonte, MG",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      followers: "987",
      mutualFriends: "19",
      verified: true,
      isFollowing: true,
    },
    {
      id: 8,
      name: "Gustavo Oliveira",
      role: "Especialista em Derivativos na Trading Plus",
      location: "São Paulo, SP",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      followers: "723",
      mutualFriends: "5",
      verified: false,
      isFollowing: false,
    },
  ];

  const filters = [
    { id: "todos", label: "Todos", count: "1.847" },
    { id: "seguindo", label: "Seguindo", count: "143" },
    { id: "palestrantes", label: "Palestrantes", count: "45" },
    { id: "gestores", label: "Gestores", count: "287" },
    { id: "analistas", label: "Analistas", count: "512" },
    { id: "reguladores", label: "Reguladores", count: "34" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {/* Header padrão do sistema */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/checkout-ingresso')}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-accent transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Participantes Confirmados</h1>
                  <p className="text-sm text-muted-foreground mt-1">Summit Mercado de Capitais 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-pastel-purple/60 border border-pastel-purple/70 px-4 py-2 rounded-lg">
                  <span className="text-sm font-bold text-slate-700">1.847</span>
                  <span className="text-xs text-slate-700 ml-1">confirmados</span>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex-1 min-w-[300px] max-w-md relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  type="text"
                  placeholder="Buscar por nome, empresa ou cargo..."
                  className="pl-11 border-border"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Ordenar</span>
                </Button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    activeFilter === filter.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Featured Attendees */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Star className="text-pastel-yellow w-5 h-5" />
                Participantes em Destaque
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredAttendees.map((attendee) => {
                const IconComponent = attendee.icon;
                return (
                  <div key={attendee.id} className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img 
                          src={attendee.avatar} 
                          alt={attendee.name}
                          className={`w-16 h-16 rounded-full object-cover border-2 ${attendee.borderColor}`}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${attendee.iconBg} border border-pastel-purple/70 rounded-full border-2 border-white flex items-center justify-center`}>
                          <IconComponent className="text-slate-700 w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 truncate">{attendee.name}</h3>
                        <p className="text-sm text-slate-600 truncate">{attendee.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="text-slate-400 w-3 h-3" />
                          <span className="text-xs text-slate-500">{attendee.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {attendee.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          className={`${
                            tag === "Palestrante" 
                              ? "bg-pastel-purple/60 border-pastel-purple/70" 
                              : tag === "Inovação"
                              ? "bg-pastel-blue/60 border-pastel-blue/70"
                              : tag === "Regulação"
                              ? "bg-pastel-green/60 border-pastel-green/70"
                              : "bg-pastel-peach/60 border-pastel-peach/70"
                          } text-slate-700`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{attendee.followers} seguidores</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{attendee.mutualFriends} mútuos</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className={`flex-1 ${
                          attendee.isFollowing 
                            ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        {attendee.isFollowing ? (
                          <>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Seguindo
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Seguir
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="w-10 h-10"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Attendees */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold text-slate-800">Todos os Participantes</h2>
            </div>

            <div className="divide-y divide-slate-100">
              {allAttendees.map((attendee) => (
                <div key={attendee.id} className="p-6 hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <img 
                      src={attendee.avatar}
                      alt={attendee.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-800">{attendee.name}</h3>
                        {attendee.verified && (
                          <BadgeCheck className="text-pastel-blue w-4 h-4" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{attendee.role}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {attendee.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {attendee.followers} seguidores
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {attendee.mutualFriends} mútuos
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        className={
                          attendee.isFollowing
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-slate-800 text-white hover:bg-slate-700'
                        }
                      >
                        {attendee.isFollowing ? (
                          <>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Seguindo
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Seguir
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline"
                        size="icon"
                        className="w-10 h-10"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border flex items-center justify-center">
              <Button variant="outline">
                Carregar mais participantes
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
