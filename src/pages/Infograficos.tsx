import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, 
  Bell, 
  Search,
  BarChart3,
  Clock,
  Star,
  Bookmark,
  Filter,
  Download,
  List,
  Grid,
  Eye,
  Share2,
  MoreVertical,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Flame,
  Award,
  Users,
  CalendarDays,
  Target,
  Sparkles,
  Edit
} from "lucide-react";

interface Infographic {
  id: number;
  title: string;
  description: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  topic: string;
  topicColor: string;
  views: string;
  date: string;
  rating: number;
  status: "published" | "draft";
  saved: boolean;
  trending?: boolean;
}

export default function Infograficos() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const infographics: Infographic[] = [
    {
      id: 1,
      title: "Panorama do Mercado de Pagamentos Digitais 2024",
      description: "Visualização completa das principais tendências e métricas do mercado brasileiro de pagamentos digitais.",
      author: {
        name: "Ana Paula Vescovi",
        role: "Diretora de Dados",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
      },
      topic: "Pagamentos",
      topicColor: "bg-[hsl(206,35%,75%)] text-[hsl(206,45%,30%)]",
      views: "24.8k",
      date: "18/01/25",
      rating: 4.9,
      status: "published",
      saved: true,
      trending: true
    },
    {
      id: 2,
      title: "ESG no Setor Financeiro: Métricas e Indicadores",
      description: "Infográfico detalhado sobre práticas ESG e seus impactos mensuráveis nas instituições financeiras.",
      author: {
        name: "Claudia Politanski",
        role: "Head ESG",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
      },
      topic: "ESG",
      topicColor: "bg-[hsl(142,35%,75%)] text-[hsl(142,45%,28%)]",
      views: "18.2k",
      date: "15/01/25",
      rating: 5.0,
      status: "published",
      saved: false
    },
    {
      id: 3,
      title: "Open Finance: Jornada de Implementação",
      description: "Linha do tempo visual e marcos importantes da implementação do Open Finance no Brasil.",
      author: {
        name: "Roberto Setubal",
        role: "Diretor",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
      },
      topic: "Inovação",
      topicColor: "bg-[hsl(270,35%,78%)] text-[hsl(270,45%,30%)]",
      views: "32.1k",
      date: "12/01/25",
      rating: 4.8,
      status: "published",
      saved: true,
      trending: true
    },
    {
      id: 4,
      title: "Fraudes Financeiras: Estatísticas e Prevenção",
      description: "Dados visuais sobre os principais tipos de fraudes e estratégias de mitigação no setor bancário.",
      author: {
        name: "Fernando Almeida",
        role: "CISO",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
      },
      topic: "Segurança",
      topicColor: "bg-[hsl(322,35%,78%)] text-[hsl(322,45%,30%)]",
      views: "21.5k",
      date: "10/01/25",
      rating: 4.7,
      status: "published",
      saved: false
    },
    {
      id: 5,
      title: "IA no Crédito: Processo de Análise Automatizada",
      description: "Fluxograma interativo mostrando como a inteligência artificial analisa solicitações de crédito.",
      author: {
        name: "Livia Chanes",
        role: "Head Data Science",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
      },
      topic: "Crédito",
      topicColor: "bg-[hsl(30,40%,78%)] text-[hsl(30,45%,28%)]",
      views: "19.7k",
      date: "08/01/25",
      rating: 4.9,
      status: "draft",
      saved: true
    },
    {
      id: 6,
      title: "Composição de Carteiras de Investimento por Perfil",
      description: "Infográfico comparativo de alocação de ativos para diferentes perfis de investidores.",
      author: {
        name: "Marcelo Kopel",
        role: "VP Produtos",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
      },
      topic: "Investimentos",
      topicColor: "bg-[hsl(44,40%,78%)] text-[hsl(44,45%,28%)]",
      views: "28.3k",
      date: "05/01/25",
      rating: 5.0,
      status: "published",
      saved: false,
      trending: true
    },
    {
      id: 7,
      title: "Regulamentações BACEN: Linha do Tempo 2024",
      description: "Visualização cronológica das principais normas e resoluções do Banco Central em 2024.",
      author: {
        name: "Carlos Mendes",
        role: "Head Compliance",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
      },
      topic: "Regulação",
      topicColor: "bg-[hsl(24,40%,78%)] text-[hsl(24,45%,28%)]",
      views: "15.8k",
      date: "03/01/25",
      rating: 4.6,
      status: "published",
      saved: true
    },
    {
      id: 8,
      title: "Comparativo: Bancos Tradicionais vs Fintechs",
      description: "Análise visual comparativa de indicadores-chave entre bancos tradicionais e fintechs emergentes.",
      author: {
        name: "Ana Paula Vescovi",
        role: "Diretora de Dados",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
      },
      topic: "Mercado",
      topicColor: "bg-[hsl(270,35%,78%)] text-[hsl(270,45%,30%)]",
      views: "22.4k",
      date: "29/12/24",
      rating: 4.8,
      status: "published",
      saved: false
    }
  ];

  const progressPercentage = 45;
  const strokeDasharray = 402.12;
  const strokeDashoffset = strokeDasharray * (1 - progressPercentage / 100);

  const quickFilters = [
    { id: "all", label: "Todos", count: 156, icon: BarChart3 },
    { id: "payments", label: "Pagamentos", count: 42, icon: Target },
    { id: "esg", label: "ESG", count: 28, icon: Sparkles },
    { id: "innovation", label: "Inovação", count: 51, icon: TrendingUp },
    { id: "trending", label: "Em Alta", count: 23, icon: Flame }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-[hsl(215,20%,85%)] flex-shrink-0 z-10">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/aprendizado')}
                className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(270,35%,78%)] to-[hsl(322,35%,78%)] rounded-xl flex items-center justify-center text-slate-700 shadow-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Infográficos</h1>
                  <p className="text-sm text-slate-600 font-medium">156 infográficos disponíveis • 71 visualizados</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar infográficos..." 
                  className="pl-11 pr-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,78%)] focus:border-transparent w-72 bg-slate-50"
                />
              </div>
              <button className="relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(322,35%,78%)] rounded-full ring-2 ring-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Stats Overview */}
          <section className="mb-6 grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[hsl(270,35%,78%)]/30 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(142,45%,28%)] bg-[hsl(142,35%,75%)]/30 px-2.5 py-1 rounded-full">+18%</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">71</p>
              <p className="text-xs text-slate-600 font-semibold">Infográficos Visualizados</p>
            </div>

            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[hsl(206,35%,75%)]/30 rounded-xl flex items-center justify-center">
                  <Eye className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(206,45%,30%)] bg-[hsl(206,35%,75%)]/30 px-2.5 py-1 rounded-full">245k</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">3.5k</p>
              <p className="text-xs text-slate-600 font-semibold">Visualizações Médias</p>
            </div>

            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[hsl(142,35%,75%)]/30 rounded-xl flex items-center justify-center">
                  <Award className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(270,45%,30%)] bg-[hsl(270,35%,78%)]/30 px-2.5 py-1 rounded-full">Top 3%</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">4.9</p>
              <p className="text-xs text-slate-600 font-semibold">Avaliação Média</p>
            </div>

            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[hsl(322,35%,78%)]/30 rounded-xl flex items-center justify-center">
                  <Bookmark className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(30,45%,28%)] bg-[hsl(30,40%,78%)]/30 px-2.5 py-1 rounded-full">+12</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">34</p>
              <p className="text-xs text-slate-600 font-semibold">Infográficos Salvos</p>
            </div>
          </section>

          {/* Quick Filters */}
          <section className="mb-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {quickFilters.map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-slate-800 text-white shadow-lg"
                        : "bg-white text-slate-700 border border-[hsl(215,20%,85%)] hover:border-slate-400 shadow-sm"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-700"}`} />
                    <span>{filter.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Viewing Progress */}
          <section className="mb-6">
            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-800">Seu Progresso de Visualização</h3>
                    <span className="px-3 py-1.5 bg-[hsl(270,35%,78%)]/30 text-[hsl(270,45%,30%)] text-xs font-bold rounded-full">
                      45% completo
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-5">
                    Você visualizou <span className="font-bold text-slate-800">71 de 156</span> infográficos disponíveis
                  </p>
                  
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-700">Progresso Geral</span>
                      <span className="text-xs font-bold text-slate-800">71/156</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[hsl(270,35%,78%)] to-[hsl(322,35%,78%)] rounded-full transition-all duration-500" 
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[hsl(270,35%,78%)] rounded-full shadow-sm"></div>
                      <span className="text-xs font-medium text-slate-600">Visualizados (71)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                      <span className="text-xs font-medium text-slate-600">Não visualizados (85)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[hsl(322,35%,78%)] rounded-full shadow-sm"></div>
                      <span className="text-xs font-medium text-slate-600">Salvos (34)</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative w-36 h-36">
                  <svg className="transform -rotate-90 w-36 h-36">
                    <circle cx="72" cy="72" r="64" stroke="hsl(215,20%,90%)" strokeWidth="12" fill="none"></circle>
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="64" 
                      stroke="url(#gradient)" 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray={strokeDasharray} 
                      strokeDashoffset={strokeDashoffset} 
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    ></circle>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'hsl(270, 35%, 78%)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'hsl(322, 35%, 78%)', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-slate-800">45%</span>
                    <span className="text-xs text-slate-600 font-medium">completo</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filters & View Toggle */}
          <section className="mb-6">
            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-5 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 border border-[hsl(215,20%,85%)] text-slate-700 hover:bg-slate-100 transition-all text-sm font-medium">
                    <Filter className="w-4 h-4" />
                    <span>Filtros</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 border border-[hsl(215,20%,85%)] text-slate-700 hover:bg-slate-100 transition-all text-sm font-medium">
                    <CalendarDays className="w-4 h-4" />
                    <span>Data</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 border border-[hsl(215,20%,85%)] text-slate-700 hover:bg-slate-100 transition-all text-sm font-medium">
                    <Star className="w-4 h-4" />
                    <span>Avaliação</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "list" 
                        ? "bg-white text-slate-800 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "grid" 
                        ? "bg-white text-slate-800 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Infographics Table */}
          {viewMode === "list" && (
            <section className="mb-6">
              <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-[hsl(215,20%,85%)]">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Infográfico</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Autor</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Tópico</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Visualizações</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Data</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(215,20%,85%)]">
                    {infographics.map((infographic) => (
                      <tr 
                        key={infographic.id} 
                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                        onClick={() => navigate(`/infografico-revisao`)}
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 ${infographic.topicColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <BarChart3 className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-[300px]">
                                  {infographic.title.length > 45 ? infographic.title.substring(0, 45) + "..." : infographic.title}
                                </h4>
                                {infographic.trending && (
                                  <Flame className="w-4 h-4 text-[hsl(30,45%,28%)] flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-slate-600 truncate max-w-[350px]">{infographic.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <img 
                              src={infographic.author.avatar} 
                              alt={infographic.author.name} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-slate-800">{infographic.author.name}</p>
                              <p className="text-xs text-slate-600">{infographic.author.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${infographic.topicColor}`}>
                            {infographic.topic}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">{infographic.views}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-sm text-slate-600">{infographic.date}</span>
                        </td>
                        <td className="py-5 px-6">
                          {infographic.status === "published" ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" style={{ color: 'hsl(142, 35%, 50%)' }} />
                              <span className="text-xs font-medium" style={{ color: 'hsl(142, 35%, 50%)' }}>Publicado</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Circle className="w-4 h-4" style={{ color: 'hsl(44, 40%, 55%)' }} />
                              <span className="text-xs font-medium" style={{ color: 'hsl(44, 40%, 55%)' }}>Rascunho</span>
                            </div>
                          )}
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/editar-infografico`);
                              }}
                              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                              title="Baixar"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                              title="Compartilhar"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                              title="Mais opções"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-5">
                {infographics.map((infographic) => (
                  <div 
                    key={infographic.id}
                    onClick={() => navigate(`/infografico-revisao`)}
                    className="bg-white rounded-xl border border-[hsl(215,20%,85%)] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className={`h-40 ${infographic.topicColor} flex items-center justify-center relative`}>
                      <BarChart3 className="w-16 h-16 opacity-30" />
                      {infographic.trending && (
                        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                          <Flame className="w-4 h-4 text-[hsl(30,45%,28%)]" />
                        </div>
                      )}
                      {infographic.saved && (
                        <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md">
                          <Bookmark className="w-4 h-4 text-[hsl(322,35%,78%)]" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${infographic.topicColor}`}>
                          {infographic.topic}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-2 line-clamp-2">
                        {infographic.title}
                      </h3>
                      <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                        {infographic.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[hsl(215,20%,85%)]">
                        <div className="flex items-center gap-2">
                          <img 
                            src={infographic.author.avatar} 
                            alt={infographic.author.name} 
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-medium text-slate-700">{infographic.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[hsl(44,40%,65%)] fill-[hsl(44,40%,65%)]" />
                          <span className="text-xs font-semibold text-slate-700">{infographic.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{infographic.views}</span>
                        </div>
                        <span>{infographic.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pagination */}
          <section className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Mostrando <span className="font-semibold text-slate-800">1-8</span> de <span className="font-semibold text-slate-800">156</span> infográficos
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-lg border border-[hsl(215,20%,85%)] text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-800 text-white font-medium text-sm">1</button>
              <button className="px-4 py-2 rounded-lg border border-[hsl(215,20%,85%)] text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">2</button>
              <button className="px-4 py-2 rounded-lg border border-[hsl(215,20%,85%)] text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">3</button>
              <span className="px-2 text-slate-600">...</span>
              <button className="px-4 py-2 rounded-lg border border-[hsl(215,20%,85%)] text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">20</button>
              <button className="p-2.5 rounded-lg border border-[hsl(215,20%,85%)] text-slate-600 hover:bg-slate-50 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-[hsl(215,20%,85%)] px-8 py-4 flex-shrink-0">
          <p className="text-xs text-slate-600 text-center">
            © 2025 Plataforma de Conhecimento Financeiro. Todos os direitos reservados.
          </p>
        </footer>
      </main>
    </div>
  );
}
