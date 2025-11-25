import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, 
  Bell, 
  Search,
  BookOpen,
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
  Sparkles
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  coAuthor: {
    name: string;
    role: string;
    avatar: string;
  };
  topic: string;
  topicColor: string;
  views: string;
  date: string;
  rating: number;
  status: "read" | "unread";
  saved: boolean;
  readingTime: string;
  trending?: boolean;
}

export default function PerfilEmpresaArtigos() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const articles: Article[] = [
    {
      id: 1,
      title: "O Futuro dos Meios de Pagamento Digitais no Brasil",
      description: "Análise sobre a evolução das transações digitais e o impacto do Pix no mercado financeiro brasileiro.",
      coAuthor: {
        name: "Marcelo Kopel",
        role: "VP Produtos",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
      },
      topic: "Banking",
      topicColor: "bg-[hsl(206,35%,75%)] text-[hsl(206,45%,30%)]",
      views: "12.4k",
      date: "15 Jan 2024",
      rating: 4.8,
      status: "read",
      saved: true,
      readingTime: "8 min",
      trending: true
    },
    {
      id: 2,
      title: "ESG e Sustentabilidade em Instituições Financeiras",
      description: "Como as práticas ESG estão transformando o setor bancário e atraindo novos investidores.",
      coAuthor: {
        name: "Claudia Politanski",
        role: "Head ESG",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
      },
      topic: "ESG",
      topicColor: "bg-[hsl(142,35%,75%)] text-[hsl(142,45%,28%)]",
      views: "8.9k",
      date: "12 Jan 2024",
      rating: 4.9,
      status: "unread",
      saved: false,
      readingTime: "12 min"
    },
    {
      id: 3,
      title: "Open Finance: Oportunidades e Desafios",
      description: "Uma visão completa sobre a implementação do Open Finance no Brasil e seus impactos no setor.",
      coAuthor: {
        name: "Roberto Setubal",
        role: "Diretor",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
      },
      topic: "Inovação",
      topicColor: "bg-[hsl(270,35%,78%)] text-[hsl(270,45%,30%)]",
      views: "15.2k",
      date: "08 Jan 2024",
      rating: 5.0,
      status: "read",
      saved: true,
      readingTime: "10 min",
      trending: true
    },
    {
      id: 4,
      title: "Cibersegurança e Proteção de Dados no Setor Bancário",
      description: "Estratégias para proteger dados sensíveis e prevenir fraudes em ambientes digitais.",
      coAuthor: {
        name: "Fernando Almeida",
        role: "CISO",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
      },
      topic: "Segurança",
      topicColor: "bg-[hsl(322,35%,78%)] text-[hsl(322,45%,30%)]",
      views: "11.7k",
      date: "05 Jan 2024",
      rating: 4.7,
      status: "unread",
      saved: false,
      readingTime: "15 min"
    },
    {
      id: 5,
      title: "Inteligência Artificial Aplicada ao Crédito Bancário",
      description: "Como a IA está revolucionando a análise de crédito e reduzindo inadimplência.",
      coAuthor: {
        name: "Livia Chanes",
        role: "Head Data Science",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
      },
      topic: "Crédito",
      topicColor: "bg-[hsl(30,40%,78%)] text-[hsl(30,45%,28%)]",
      views: "9.3k",
      date: "02 Jan 2024",
      rating: 4.9,
      status: "read",
      saved: true,
      readingTime: "7 min"
    },
    {
      id: 6,
      title: "Estratégias de Investimento para 2024",
      description: "Análise de mercado e recomendações para carteiras de investimento em cenário de alta volatilidade.",
      coAuthor: {
        name: "Ana Paula Vescovi",
        role: "Diretora Investimentos",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
      },
      topic: "Investimentos",
      topicColor: "bg-[hsl(44,40%,78%)] text-[hsl(44,45%,28%)]",
      views: "18.5k",
      date: "28 Dez 2023",
      rating: 5.0,
      status: "unread",
      saved: false,
      readingTime: "20 min",
      trending: true
    },
    {
      id: 7,
      title: "Regulação Bancária e Compliance no Brasil",
      description: "Entenda as principais normas do Banco Central e como se manter em conformidade.",
      coAuthor: {
        name: "Carlos Mendes",
        role: "Head Compliance",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
      },
      topic: "Regulação",
      topicColor: "bg-[hsl(24,40%,78%)] text-[hsl(24,45%,28%)]",
      views: "7.2k",
      date: "25 Dez 2023",
      rating: 4.6,
      status: "read",
      saved: true,
      readingTime: "14 min"
    },
    {
      id: 8,
      title: "Transformação Digital no Atendimento Bancário",
      description: "Como chatbots e IA estão melhorando a experiência do cliente em canais digitais.",
      coAuthor: {
        name: "Marcelo Kopel",
        role: "VP Produtos",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
      },
      topic: "Inovação",
      topicColor: "bg-[hsl(270,35%,78%)] text-[hsl(270,45%,30%)]",
      views: "10.1k",
      date: "22 Dez 2023",
      rating: 4.8,
      status: "unread",
      saved: false,
      readingTime: "11 min"
    }
  ];

  const progressPercentage = 58;
  const strokeDasharray = 402.12;
  const strokeDashoffset = strokeDasharray * (1 - progressPercentage / 100);

  const quickFilters = [
    { id: "all", label: "Todos", count: 324, icon: BookOpen },
    { id: "banking", label: "Banking", count: 87, icon: Target },
    { id: "esg", label: "ESG", count: 56, icon: Sparkles },
    { id: "innovation", label: "Inovação", count: 92, icon: TrendingUp },
    { id: "trending", label: "Em Alta", count: 45, icon: Flame }
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
                onClick={() => navigate('/perfil-empresa/1/materiais')}
                className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(30,40%,78%)] to-[hsl(24,40%,78%)] rounded-xl flex items-center justify-center text-slate-700 font-bold text-xl shadow-sm">
                  I
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Artigos do Itaú Unibanco</h1>
                  <p className="text-sm text-slate-600 font-medium">324 artigos publicados • 187 lidos</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar artigos..." 
                  className="pl-11 pr-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] focus:border-transparent w-72 bg-slate-50"
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
                <div className="w-11 h-11 bg-[hsl(206,35%,75%)]/30 rounded-xl flex items-center justify-center">
                  <BookOpen className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(142,45%,28%)] bg-[hsl(142,35%,75%)]/30 px-2.5 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">187</p>
              <p className="text-xs text-slate-600 font-semibold">Artigos Lidos</p>
            </div>

            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[hsl(270,35%,78%)]/30 rounded-xl flex items-center justify-center">
                  <Clock className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(30,45%,28%)] bg-[hsl(30,40%,78%)]/30 px-2.5 py-1 rounded-full">142h</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">8.5h</p>
              <p className="text-xs text-slate-600 font-semibold">Tempo Médio/Semana</p>
            </div>

            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[hsl(142,35%,75%)]/30 rounded-xl flex items-center justify-center">
                  <Award className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(206,45%,30%)] bg-[hsl(206,35%,75%)]/30 px-2.5 py-1 rounded-full">Top 5%</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">4.8</p>
              <p className="text-xs text-slate-600 font-semibold">Avaliação Média</p>
            </div>

            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[hsl(322,35%,78%)]/30 rounded-xl flex items-center justify-center">
                  <Bookmark className="text-slate-700 w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[hsl(270,45%,30%)] bg-[hsl(270,35%,78%)]/30 px-2.5 py-1 rounded-full">+8</span>
              </div>
              <p className="text-3xl font-bold text-slate-800 mb-1">43</p>
              <p className="text-xs text-slate-600 font-semibold">Artigos Salvos</p>
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

          {/* Reading Progress */}
          <section className="mb-6">
            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-800">Seu Progresso de Leitura</h3>
                    <span className="px-3 py-1.5 bg-[hsl(206,35%,75%)]/30 text-[hsl(206,45%,30%)] text-xs font-bold rounded-full">
                      58% completo
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-5">
                    Você leu <span className="font-bold text-slate-800">187 de 324</span> artigos publicados pelo Itaú Unibanco
                  </p>
                  
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-700">Progresso Geral</span>
                      <span className="text-xs font-bold text-slate-800">187/324</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[hsl(206,35%,75%)] to-[hsl(270,35%,78%)] rounded-full transition-all duration-500" 
                        style={{ width: '58%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[hsl(206,35%,75%)] rounded-full shadow-sm"></div>
                      <span className="text-xs font-medium text-slate-600">Lidos (187)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                      <span className="text-xs font-medium text-slate-600">Não lidos (137)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[hsl(322,35%,78%)] rounded-full shadow-sm"></div>
                      <span className="text-xs font-medium text-slate-600">Salvos (43)</span>
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
                        <stop offset="0%" style={{ stopColor: 'hsl(206, 35%, 75%)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'hsl(270, 35%, 78%)', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-slate-800">58%</span>
                    <span className="text-xs text-slate-600 font-medium">completo</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="mb-6">
            <div className="bg-white rounded-xl border border-[hsl(215,20%,85%)] p-5 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-700 transition-all shadow-sm">
                    <Filter className="w-4 h-4" /> Filtros
                  </button>
                  <select className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] focus:border-transparent bg-slate-50">
                    <option>Todos os Tópicos</option>
                    <option>Banking</option>
                    <option>Investimentos</option>
                    <option>Open Finance</option>
                    <option>ESG</option>
                    <option>Inovação</option>
                  </select>
                  <select className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] focus:border-transparent bg-slate-50">
                    <option>Status: Todos</option>
                    <option>Lidos</option>
                    <option>Não Lidos</option>
                    <option>Salvos</option>
                  </select>
                  <select className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] focus:border-transparent bg-slate-50">
                    <option>Ordenar: Mais Recentes</option>
                    <option>Mais Antigos</option>
                    <option>Mais Visualizados</option>
                    <option>Melhor Avaliados</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 border border-[hsl(215,20%,85%)] rounded-xl transition-all ${viewMode === "list" ? "bg-slate-800 text-white shadow-sm" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 border border-[hsl(215,20%,85%)] rounded-xl transition-all ${viewMode === "grid" ? "bg-slate-800 text-white shadow-sm" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="px-5 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" /> Exportar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Articles Table */}
          <section className="bg-white rounded-xl border border-[hsl(215,20%,85%)] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-[hsl(215,20%,85%)]">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider w-12">
                      <input type="checkbox" className="rounded border-slate-300 text-slate-700 focus:ring-slate-700" />
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider w-[30%]">Título</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Co-Autor</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Tópico</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Tempo</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Views</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Data</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50 transition-all cursor-pointer group">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-slate-300 text-slate-700 focus:ring-slate-700" />
                      </td>
                      <td className="px-6 py-4">
                        {article.status === "read" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[hsl(206,35%,75%)]/30 text-[hsl(206,45%,30%)] rounded-lg text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Lido
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                            <Circle className="w-3.5 h-3.5" /> Não Lido
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-slate-900 transition-colors truncate">
                              {article.title}
                            </h4>
                            <p className="text-xs text-slate-600 line-clamp-1">{article.description}</p>
                          </div>
                          {article.trending && (
                            <Flame className="w-4 h-4 text-[hsl(30,45%,28%)] flex-shrink-0" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <img src={article.coAuthor.avatar} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" alt={article.coAuthor.name} />
                          <div>
                            <p className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">{article.coAuthor.name}</p>
                            <p className="text-xs text-slate-600 truncate max-w-[120px]">{article.coAuthor.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1.5 ${article.topicColor} rounded-lg text-xs font-bold`}>
                          {article.topic}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="text-slate-700 w-3.5 h-3.5" />
                          <span className="text-sm text-slate-700 font-medium">{article.readingTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Eye className="text-slate-700 w-3.5 h-3.5" />
                          <span className="text-sm text-slate-800 font-bold">{article.views}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600 font-medium">{article.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Star className="text-[hsl(44,45%,28%)] w-4 h-4 fill-[hsl(44,40%,78%)]" />
                          <span className="text-sm font-bold text-slate-800">{article.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className={`p-2 rounded-lg transition-all ${article.saved ? "text-[hsl(322,45%,30%)] hover:bg-[hsl(322,35%,78%)]/20" : "text-slate-700 hover:bg-slate-100"}`}>
                            <Bookmark className={`w-4 h-4 ${article.saved ? "fill-[hsl(322,35%,78%)]" : ""}`} />
                          </button>
                          <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-slate-50 border-t border-[hsl(215,20%,85%)] px-6 py-5 flex items-center justify-between">
              <div className="text-sm text-slate-700 font-medium">
                Mostrando <span className="font-bold text-slate-800">1-8</span> de <span className="font-bold text-slate-800">324</span> artigos
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm font-semibold text-slate-400 bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  <ChevronLeft className="w-4 h-4 inline mr-1" /> Anterior
                </button>
                <button className="px-4 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold shadow-sm">1</button>
                <button className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">2</button>
                <button className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">3</button>
                <span className="px-2 text-slate-600 font-medium">...</span>
                <button className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">41</button>
                <button className="px-4 py-2.5 border border-[hsl(215,20%,85%)] rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                  Próxima <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-[hsl(215,20%,85%)] text-center pb-8">
            <p className="text-sm text-slate-600 font-medium">© 2024 Itaú Unibanco S.A. - Todos os direitos reservados. Central de Conteúdo Corporativo.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
