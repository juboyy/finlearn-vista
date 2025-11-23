import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  ArrowLeft, 
  Bookmark, 
  Heart, 
  Flame, 
  Star, 
  Users, 
  MailOpen,
  Crown,
  TrendingUp,
  CreditCard,
  Scale,
  Building2,
  Globe,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

export default function NovaAssinatura() {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState("mercado-capitais");
  const [activeTab, setActiveTab] = useState("todas");

  const trendingNewsletters = [
    {
      id: 1,
      title: "Insights do Mercado de Capitais",
      author: "Carlos Mendes",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      description: "Análise profunda sobre tendências, IPOs, M&A e movimentos estratégicos do mercado de capitais brasileiro e internacional.",
      illustration: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-cc3eeac0dc56bb648ccb.png",
      subscribers: "8.2K",
      rating: "4.9",
      openRate: "96%",
      price: "R$ 59/mês",
      priceYear: "ou R$ 590/ano",
      type: "Premium",
      frequency: "Semanal",
      trending: "#1 Trending",
      growth: "+847 esta semana",
      bgColor: "bg-[hsl(206,35%,85%)]",
      buttonColor: "bg-[hsl(206,35%,75%)]",
      isFavorite: true,
      isBookmarked: true
    },
    {
      id: 2,
      title: "Revolução dos Pagamentos",
      author: "Ana Paula Costa",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      description: "Tudo sobre PIX, Open Finance, carteiras digitais, fintechs e a transformação do ecossistema de pagamentos no Brasil.",
      illustration: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-640177462dea5e4389d0.png",
      subscribers: "6.8K",
      rating: "4.8",
      openRate: "93%",
      price: "R$ 49/mês",
      priceYear: "ou R$ 490/ano",
      type: "Premium",
      frequency: "Bi-semanal",
      trending: "#2 Trending",
      growth: "+623 esta semana",
      bgColor: "bg-[hsl(280,35%,85%)]",
      buttonColor: "bg-[hsl(280,35%,75%)]",
      isFavorite: false,
      isBookmarked: false
    },
    {
      id: 3,
      title: "Compliance & Regulação",
      author: "Roberto Almeida",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      description: "Atualizações sobre mudanças regulatórias, normas da CVM, Bacen e melhores práticas de compliance para o setor financeiro.",
      illustration: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-dbb8223ec5d2a88ce637.png",
      subscribers: "12.1K",
      rating: "4.7",
      openRate: "89%",
      price: "Gratuita",
      priceYear: "100% free",
      type: "Gratuita",
      frequency: "Mensal",
      trending: "#3 Trending",
      growth: "+512 esta semana",
      bgColor: "bg-[hsl(160,35%,85%)]",
      buttonColor: "bg-[hsl(160,35%,75%)]",
      isFavorite: false,
      isBookmarked: true
    }
  ];

  const tableNewsletters = [
    {
      title: "Análise de Mercado",
      subtitle: "Insights sobre IPOs, M&A e tendências",
      author: "Carlos Mendes",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      frequency: "Semanal",
      subscribers: "8.2K",
      rating: "4.9",
      reviews: "342",
      price: "R$ 59/mês",
      iconBg: "bg-[hsl(206,35%,75%)]",
      badgeBg: "bg-[hsl(160,35%,75%)]",
      buttonBg: "bg-[hsl(206,35%,75%)]",
      isFavorite: true,
      isBookmarked: true
    },
    {
      title: "Renda Fixa Inteligente",
      subtitle: "Estratégias e oportunidades em RF",
      author: "Marcos Silva",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      frequency: "Quinzenal",
      subscribers: "5.4K",
      rating: "4.8",
      reviews: "218",
      price: "R$ 39/mês",
      iconBg: "bg-[hsl(280,35%,75%)]",
      badgeBg: "bg-[hsl(45,35%,75%)]",
      buttonBg: "bg-[hsl(280,35%,75%)]",
      isFavorite: false,
      isBookmarked: false
    },
    {
      title: "Fundos de Investimento",
      subtitle: "FIIs, FIAs e fundos multimercado",
      author: "Juliana Santos",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      frequency: "Semanal",
      subscribers: "7.1K",
      rating: "4.9",
      reviews: "289",
      price: "Gratuita",
      iconBg: "bg-[hsl(160,35%,75%)]",
      badgeBg: "bg-[hsl(340,35%,75%)]",
      buttonBg: "bg-[hsl(160,35%,75%)]",
      isFavorite: true,
      isBookmarked: false
    },
    {
      title: "Ações & Dividendos",
      subtitle: "Análise de empresas e proventos",
      author: "Pedro Oliveira",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      frequency: "Bi-semanal",
      subscribers: "9.8K",
      rating: "4.7",
      reviews: "412",
      price: "R$ 69/mês",
      iconBg: "bg-[hsl(45,35%,75%)]",
      badgeBg: "bg-[hsl(206,35%,75%)]",
      buttonBg: "bg-[hsl(45,35%,75%)]",
      isFavorite: false,
      isBookmarked: true
    },
    {
      title: "Private Banking",
      subtitle: "Estratégias para grandes patrimônios",
      author: "Fernanda Lima",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      frequency: "Mensal",
      subscribers: "3.2K",
      rating: "5.0",
      reviews: "156",
      price: "R$ 99/mês",
      iconBg: "bg-[hsl(25,35%,75%)]",
      badgeBg: "bg-[hsl(280,35%,75%)]",
      buttonBg: "bg-[hsl(25,35%,75%)]",
      isFavorite: false,
      isBookmarked: false
    },
    {
      title: "Investimentos Internacionais",
      subtitle: "Mercados globais e diversificação",
      author: "Ricardo Fernandes",
      authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      frequency: "Semanal",
      subscribers: "6.5K",
      rating: "4.8",
      reviews: "274",
      price: "R$ 79/mês",
      iconBg: "bg-[hsl(340,35%,75%)]",
      badgeBg: "bg-[hsl(160,35%,75%)]",
      buttonBg: "bg-[hsl(340,35%,75%)]",
      isFavorite: true,
      isBookmarked: true
    }
  ];

  const popularAuthors = [
    {
      name: "Carlos Mendes",
      specialty: "Especialista em Mercado de Capitais",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      newsletters: "3",
      followers: "12.5K",
      buttonBg: "bg-[hsl(206,35%,75%)]"
    },
    {
      name: "Ana Paula Costa",
      specialty: "Especialista em Payments",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      newsletters: "2",
      followers: "9.8K",
      buttonBg: "bg-[hsl(280,35%,75%)]"
    },
    {
      name: "Roberto Almeida",
      specialty: "Especialista em Compliance",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      newsletters: "4",
      followers: "15.2K",
      buttonBg: "bg-[hsl(160,35%,75%)]"
    },
    {
      name: "Juliana Santos",
      specialty: "Especialista em Fundos",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      newsletters: "2",
      followers: "11.3K",
      buttonBg: "bg-[hsl(45,35%,75%)]"
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b-2 border-slate-700 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Nova Assinatura</h1>
              <p className="text-sm text-muted-foreground mt-1">Explore e assine newsletters especializadas do mercado financeiro</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/newsletter')} className="border-2 border-slate-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </header>

        <div className="p-8">
          <section className="mb-8">
            <div className="bg-card rounded-xl p-6 border-2 border-slate-700">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Buscar newsletters por nome, autor ou tema..." 
                      className="pl-12 border-2 border-slate-600"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <Select defaultValue="todos">
                    <SelectTrigger className="border-2 border-slate-600">
                      <SelectValue placeholder="Segmentos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os segmentos</SelectItem>
                      <SelectItem value="capitais">Mercado de Capitais</SelectItem>
                      <SelectItem value="regulacao">Regulamentação</SelectItem>
                      <SelectItem value="payments">Payments</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="economia">Economia Global</SelectItem>
                      <SelectItem value="inovacao">Inovação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Select defaultValue="tipo">
                    <SelectTrigger className="border-2 border-slate-600">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tipo">Tipo de assinatura</SelectItem>
                      <SelectItem value="gratis">Gratuitas</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Select defaultValue="ordenar">
                    <SelectTrigger className="border-2 border-slate-600">
                      <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ordenar">Ordenar por</SelectItem>
                      <SelectItem value="populares">Mais populares</SelectItem>
                      <SelectItem value="recentes">Mais recentes</SelectItem>
                      <SelectItem value="avaliadas">Melhor avaliadas</SelectItem>
                      <SelectItem value="menor">Preço: menor</SelectItem>
                      <SelectItem value="maior">Preço: maior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <button 
                  onClick={() => setActiveTab("todas")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeTab === "todas" 
                      ? "bg-[hsl(206,35%,75%)] text-slate-700" 
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Star className="inline-block mr-1 h-3 w-3" /> Todas
                </button>
                <button 
                  onClick={() => setActiveTab("salvas")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeTab === "salvas" 
                      ? "bg-[hsl(206,35%,75%)] text-slate-700" 
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Bookmark className="inline-block mr-1 h-3 w-3" /> Salvas (12)
                </button>
                <button 
                  onClick={() => setActiveTab("favoritas")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeTab === "favoritas" 
                      ? "bg-[hsl(206,35%,75%)] text-slate-700" 
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Heart className="inline-block mr-1 h-3 w-3" /> Favoritas (8)
                </button>
                <button 
                  onClick={() => setActiveTab("tendencias")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeTab === "tendencias" 
                      ? "bg-[hsl(206,35%,75%)] text-slate-700" 
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Flame className="inline-block mr-1 h-3 w-3" /> Tendências
                </button>
                <button 
                  onClick={() => setActiveTab("premium")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeTab === "premium" 
                      ? "bg-[hsl(206,35%,75%)] text-slate-700" 
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Crown className="inline-block mr-1 h-3 w-3" /> Premium
                </button>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Em Alta Esta Semana</h2>
                <p className="text-sm text-muted-foreground mt-1">Newsletters com maior crescimento de assinantes</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {trendingNewsletters.map((newsletter, idx) => (
                <div 
                  key={newsletter.id} 
                  className={`bg-card rounded-xl overflow-hidden hover:shadow-xl transition ${
                    idx === 0 ? 'border-2 border-[hsl(206,35%,75%)]' : 'border-2 border-slate-700'
                  }`}
                >
                  <div className="relative">
                    <div className={`h-40 overflow-hidden ${newsletter.bgColor}/20 p-4 flex items-center justify-center`}>
                      <img 
                        className="w-full h-full object-contain" 
                        src={newsletter.illustration} 
                        alt={newsletter.title} 
                      />
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition border-2 border-slate-600">
                        {newsletter.isBookmarked ? (
                          <Bookmark className="h-4 w-4 text-foreground fill-current" />
                        ) : (
                          <Bookmark className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                      <button className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition border-2 border-slate-600">
                        {newsletter.isFavorite ? (
                          <Heart className="h-4 w-4 text-red-500 fill-current" />
                        ) : (
                          <Heart className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={`${
                        idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                      } text-white border-0 text-xs font-bold`}>
                        <Flame className="h-3 w-3 mr-1" /> {newsletter.trending}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge className={`${newsletter.buttonColor} text-slate-700 border-0`}>
                        {newsletter.type}
                      </Badge>
                      <Badge className="bg-[hsl(160,35%,75%)] text-slate-700 border-0">
                        {newsletter.frequency}
                      </Badge>
                      <Badge className="bg-orange-100 text-orange-700 border-0">
                        {newsletter.growth}
                      </Badge>
                    </div>
                    
                    <h3 className="text-base font-semibold text-foreground mb-2">{newsletter.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <img 
                        src={newsletter.authorImage} 
                        className="w-6 h-6 rounded-full object-cover" 
                        alt={newsletter.author} 
                      />
                      <span className="text-xs text-muted-foreground">
                        Por <span className="font-medium text-foreground">{newsletter.author}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {newsletter.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{newsletter.subscribers} assinantes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="font-medium text-foreground">{newsletter.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MailOpen className="h-3 w-3" />
                        <span>{newsletter.openRate} abertura</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-foreground">
                        {newsletter.price}
                      </div>
                      <span className="text-xs text-muted-foreground">{newsletter.priceYear}</span>
                    </div>
                    
                    <Button className={`w-full ${newsletter.buttonColor} text-slate-700 hover:opacity-80 border-0`}>
                      Assinar Agora
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Explorar por Segmento</h2>
                <p className="text-sm text-muted-foreground mt-1">Encontre newsletters especializadas por área de interesse</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border-2 border-slate-700 overflow-hidden">
              <div className="border-b-2 border-slate-700">
                <div className="flex items-center gap-1 p-2">
                  <button 
                    onClick={() => setActiveSegment("mercado-capitais")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeSegment === "mercado-capitais"
                        ? "bg-[hsl(206,35%,75%)] text-slate-700"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <TrendingUp className="inline-block mr-2 h-4 w-4" />
                    Mercado de Capitais
                  </button>
                  <button 
                    onClick={() => setActiveSegment("payments")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeSegment === "payments"
                        ? "bg-[hsl(206,35%,75%)] text-slate-700"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <CreditCard className="inline-block mr-2 h-4 w-4" />
                    Payments
                  </button>
                  <button 
                    onClick={() => setActiveSegment("regulacao")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeSegment === "regulacao"
                        ? "bg-[hsl(206,35%,75%)] text-slate-700"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Scale className="inline-block mr-2 h-4 w-4" />
                    Regulamentação
                  </button>
                  <button 
                    onClick={() => setActiveSegment("banking")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeSegment === "banking"
                        ? "bg-[hsl(206,35%,75%)] text-slate-700"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Building2 className="inline-block mr-2 h-4 w-4" />
                    Banking
                  </button>
                  <button 
                    onClick={() => setActiveSegment("economia")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeSegment === "economia"
                        ? "bg-[hsl(206,35%,75%)] text-slate-700"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Globe className="inline-block mr-2 h-4 w-4" />
                    Economia Global
                  </button>
                  <button 
                    onClick={() => setActiveSegment("inovacao")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeSegment === "inovacao"
                        ? "bg-[hsl(206,35%,75%)] text-slate-700"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Lightbulb className="inline-block mr-2 h-4 w-4" />
                    Inovação
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Newsletter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Autor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Frequência
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Assinantes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Avaliação
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {tableNewsletters.map((newsletter, idx) => (
                      <tr key={idx} className="hover:bg-muted/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${newsletter.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <TrendingUp className="h-5 w-5 text-slate-700" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-foreground">{newsletter.title}</div>
                              <div className="text-xs text-muted-foreground">{newsletter.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <img 
                              src={newsletter.authorImage} 
                              className="w-8 h-8 rounded-full object-cover" 
                              alt={newsletter.author} 
                            />
                            <span className="text-sm text-foreground">{newsletter.author}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`${newsletter.badgeBg} text-slate-700 border-0`}>
                            {newsletter.frequency}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{newsletter.subscribers}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-foreground">{newsletter.rating}</span>
                            <span className="text-xs text-muted-foreground">({newsletter.reviews})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm font-bold ${newsletter.price === "Gratuita" ? "text-green-600" : "text-foreground"}`}>
                            {newsletter.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className={`w-8 h-8 transition ${
                              newsletter.isFavorite 
                                ? "text-red-500 hover:text-red-600" 
                                : "text-muted-foreground hover:text-red-500"
                            }`}>
                              <Heart className={`h-4 w-4 ${newsletter.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button className={`w-8 h-8 transition ${
                              newsletter.isBookmarked 
                                ? "text-foreground hover:text-slate-900" 
                                : "text-muted-foreground hover:text-foreground"
                            }`}>
                              <Bookmark className={`h-4 w-4 ${newsletter.isBookmarked ? 'fill-current' : ''}`} />
                            </button>
                            <Button 
                              size="sm" 
                              className={`${newsletter.buttonBg} text-slate-700 hover:opacity-80 border-0`}
                            >
                              Assinar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 border-t-2 border-slate-700 flex items-center justify-between bg-muted/50">
                <div className="text-sm text-muted-foreground">
                  Mostrando <span className="font-medium text-foreground">1-6</span> de <span className="font-medium text-foreground">24</span> newsletters
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled className="border-2 border-slate-600">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-[hsl(206,35%,75%)] text-slate-700 hover:opacity-80 border-0">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-slate-600">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-slate-600">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-slate-600">
                    4
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-slate-600">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Autores Populares</h2>
                <p className="text-sm text-muted-foreground mt-1">Siga especialistas reconhecidos do mercado financeiro</p>
              </div>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground font-medium transition">
                Ver todos <ArrowRight className="inline-block ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              {popularAuthors.map((author, idx) => (
                <div 
                  key={idx} 
                  className="bg-card rounded-xl border-2 border-slate-700 p-5 hover:shadow-lg transition text-center"
                >
                  <img 
                    src={author.image} 
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-slate-600" 
                    alt={author.name} 
                  />
                  <h3 className="text-base font-semibold text-foreground mb-1">{author.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{author.specialty}</p>
                  <div className="flex items-center justify-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div>
                      <span className="font-semibold text-foreground">{author.newsletters}</span> newsletters
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">{author.followers}</span> seguidores
                    </div>
                  </div>
                  <Button className={`w-full ${author.buttonBg} text-slate-700 hover:opacity-80 border-0`}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Seguir
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
