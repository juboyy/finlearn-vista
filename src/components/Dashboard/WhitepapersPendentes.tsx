import { useState } from "react";
import { Search, Bell, Plus, Filter, Layers, Unlock, Crown, Bookmark, FileText, CheckCircle, Building, ThumbsUp, MoreHorizontal, FileCheck, Star } from "lucide-react";
import { Circle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const WhitepapersPendentes = () => {
  const [viewType, setViewType] = useState("list");
  const [filterType, setFilterType] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const stats = [
    { icon: FileText, label: "Pendentes", value: "28", color: "bg-[#B8D4E8]" },
    { icon: CheckCircle, label: "Lidos", value: "52", color: "bg-[#C5E8D4]" },
    { icon: Bookmark, label: "Salvos", value: "15", color: "bg-[#D4C5E8]" },
    { icon: Crown, label: "Premium", value: "10", color: "bg-[#E8E0C5]" },
  ];

  const categories = [
    { name: "Todos", count: 28, color: "bg-[#B8D4E8]", dotColor: "text-slate-600" },
    { name: "Blockchain", count: 9, color: "bg-[#7FA8C9]", dotColor: "text-[#7FA8C9]" },
    { name: "RegTech", count: 7, color: "bg-[#A68CC9]", dotColor: "text-[#A68CC9]" },
    { name: "FinTech", count: 6, color: "bg-[#8CC99B]", dotColor: "text-[#8CC99B]" },
    { name: "Open Banking", count: 4, color: "bg-[#C9B88C]", dotColor: "text-[#C9B88C]" },
    { name: "Cibersegurança", count: 2, color: "bg-[#C99B8C]", dotColor: "text-[#C99B8C]" },
  ];

  const publishers = [
    { name: "Deloitte", count: 8 },
    { name: "PwC", count: 7 },
    { name: "EY", count: 6 },
    { name: "Accenture", count: 5 },
  ];

  const recentActivity = [
    { type: "add", title: "Novo whitepaper adicionado", description: "Blockchain em Pagamentos", time: "2 horas atrás", bgColor: "bg-[#B8D4E8]" },
    { type: "save", title: "Whitepaper salvo", description: "RegTech no Brasil 2024", time: "1 dia atrás", bgColor: "bg-[#D4C5E8]" },
    { type: "complete", title: "Leitura concluída", description: "Open Banking Framework", time: "3 dias atrás", bgColor: "bg-[#C5E8D4]" },
  ];

  const whitepapers = [
    {
      id: 1,
      title: "Blockchain e Distributed Ledger Technology no Setor Financeiro",
      category: "Blockchain",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      publisher: "Deloitte",
      publishDate: "Dez 2024",
      pages: 84,
      access: "Gratuito",
      accessType: "free",
      saved: true,
      downloads: 5200,
    },
    {
      id: 2,
      title: "RegTech: Automatização de Compliance e Gestão de Riscos",
      category: "RegTech",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      publisher: "PwC",
      publishDate: "Dez 2024",
      pages: 96,
      access: "R$ 199,00",
      accessType: "premium",
      saved: false,
      downloads: 4100,
    },
    {
      id: 3,
      title: "Open Banking no Brasil: Implementação e Perspectivas Futuras",
      category: "Open Banking",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      publisher: "EY",
      publishDate: "Nov 2024",
      pages: 72,
      access: "Gratuito",
      accessType: "free",
      saved: true,
      downloads: 6800,
    },
    {
      id: 4,
      title: "Cibersegurança em Instituições Financeiras: Framework Completo",
      category: "Cibersegurança",
      categoryColor: "bg-[#C99B8C]",
      iconColor: "bg-[#C99B8C]",
      publisher: "Accenture",
      publishDate: "Nov 2024",
      pages: 108,
      access: "R$ 249,00",
      accessType: "premium",
      saved: false,
      downloads: 3900,
    },
    {
      id: 5,
      title: "FinTech Revolution: Tendências e Oportunidades para 2025",
      category: "FinTech",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      publisher: "Deloitte",
      publishDate: "Out 2024",
      pages: 64,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      downloads: 7300,
    },
    {
      id: 6,
      title: "Tokenização de Ativos e Digital Assets no Mercado Brasileiro",
      category: "Blockchain",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      publisher: "PwC",
      publishDate: "Out 2024",
      pages: 89,
      access: "R$ 179,00",
      accessType: "premium",
      saved: true,
      downloads: 4700,
    },
    {
      id: 7,
      title: "API Banking e Arquitetura de Serviços Financeiros Digitais",
      category: "Open Banking",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      publisher: "EY",
      publishDate: "Set 2024",
      pages: 76,
      access: "Gratuito",
      accessType: "free",
      saved: true,
      downloads: 5500,
    },
    {
      id: 8,
      title: "Machine Learning aplicado à Detecção de Fraudes Financeiras",
      category: "FinTech",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      publisher: "Accenture",
      publishDate: "Set 2024",
      pages: 94,
      access: "R$ 219,00",
      accessType: "premium",
      saved: false,
      downloads: 4200,
    },
    {
      id: 9,
      title: "KYC e AML: Tecnologias Emergentes para Compliance",
      category: "RegTech",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      publisher: "Deloitte",
      publishDate: "Ago 2024",
      pages: 82,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      downloads: 6100,
    },
    {
      id: 10,
      title: "Zero Trust Architecture para Sistemas Bancários",
      category: "Cibersegurança",
      categoryColor: "bg-[#C99B8C]",
      iconColor: "bg-[#C99B8C]",
      publisher: "PwC",
      publishDate: "Ago 2024",
      pages: 71,
      access: "R$ 189,00",
      accessType: "premium",
      saved: false,
      downloads: 3600,
    },
  ];

  const featuredWhitepapers = [
    {
      id: 1,
      title: "Smart Contracts no Sistema Financeiro",
      category: "Blockchain",
      categoryColor: "bg-[#7FA8C9]",
      publisher: "Deloitte",
      pages: 88,
      price: "Grátis",
      accessType: "free",
      rating: 4.9,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c35c9476c0-937d5d5fa79162f25496.png",
    },
    {
      id: 2,
      title: "RegTech: O Futuro do Compliance",
      category: "RegTech",
      categoryColor: "bg-[#A68CC9]",
      publisher: "PwC",
      pages: 102,
      price: "R$ 249",
      accessType: "premium",
      rating: 5.0,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f5deae4fe-f9ff5d8bb77362e3164d.png",
    },
    {
      id: 3,
      title: "Ecossistema FinTech Brasileiro",
      category: "FinTech",
      categoryColor: "bg-[#8CC99B]",
      publisher: "EY",
      pages: 95,
      price: "R$ 199",
      accessType: "premium",
      rating: 4.8,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/232deb1f9e-40babc22c90b2ae4122d.png",
    },
    {
      id: 4,
      title: "Open Banking API Standards",
      category: "Open Banking",
      categoryColor: "bg-[#C9B88C]",
      publisher: "Accenture",
      pages: 67,
      price: "Grátis",
      accessType: "free",
      rating: 4.7,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6c950fa2ae-4a9ad2779840b213a8a4.png",
    },
    {
      id: 5,
      title: "Segurança em Aplicações Bancárias",
      category: "Cibersegurança",
      categoryColor: "bg-[#C99B8C]",
      publisher: "Deloitte",
      pages: 114,
      price: "R$ 279",
      accessType: "premium",
      rating: 4.9,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/893c0ad640-4d33c43cd08bfc73ce6a.png",
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-80 space-y-6">
          {/* Estatísticas */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="text-slate-700 w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-700">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-slate-800">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Categorias */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
              <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                    selectedCategory === cat.name
                      ? "bg-[#B8D4E8] text-slate-800"
                      : "hover:bg-slate-100"
                  }`}
                >
                  <Circle className={`w-2 h-2 ${cat.dotColor} fill-current`} />
                  <span className="text-sm font-medium flex-1">{cat.name}</span>
                  <span className={`text-xs ${selectedCategory === cat.name ? "bg-white px-2 py-1 rounded-full" : "text-slate-500"}`}>
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Tipo de Acesso */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Tipo de Acesso</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                <div className="w-8 h-8 bg-[#C5E8D4] rounded-full flex items-center justify-center">
                  <Unlock className="text-slate-700 w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Gratuitos</p>
                  <p className="text-xs text-slate-500">18 whitepapers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                <div className="w-8 h-8 bg-[#E8E0C5] rounded-full flex items-center justify-center">
                  <Crown className="text-slate-700 w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Premium</p>
                  <p className="text-xs text-slate-500">10 whitepapers</p>
                </div>
              </div>
            </div>
          </section>

          {/* Autores */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Autores</h2>
            <div className="space-y-3">
              {publishers.map((publisher) => (
                <div key={publisher.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <Building className="text-slate-600 w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{publisher.name}</p>
                    <p className="text-xs text-slate-500">{publisher.count} whitepapers</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Atividade Recente */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Atividade Recente</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-6 h-6 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                    {activity.type === "add" && <Plus className="text-slate-700 w-3 h-3" />}
                    {activity.type === "save" && <Bookmark className="text-slate-700 w-3 h-3" />}
                    {activity.type === "complete" && <FileCheck className="text-slate-700 w-3 h-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800">{activity.title}</p>
                    <p className="text-xs text-slate-500">{activity.description}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Toolbar */}
          <section className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Visualizar:</span>
                  <button
                    onClick={() => setViewType("grid")}
                    className={`p-2 rounded-lg transition ${
                      viewType === "grid" ? "bg-[#B8D4E8] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <i className="fas fa-th-large"></i>
                  </button>
                  <button
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-lg transition ${
                      viewType === "list" ? "bg-[#B8D4E8] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] appearance-none pr-8 bg-white text-slate-700">
                    <option>Adicionado recentemente</option>
                    <option>Título (A-Z)</option>
                    <option>Páginas (menor-maior)</option>
                    <option>Data de publicação</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFilterType("Todos")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                    filterType === "Todos" ? "bg-[#C5E8D4] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Todos</span>
                </button>
                <button
                  onClick={() => setFilterType("Gratuitos")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                    filterType === "Gratuitos" ? "bg-[#C5E8D4] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Unlock className="w-4 h-4" />
                  <span>Gratuitos</span>
                </button>
                <button
                  onClick={() => setFilterType("Premium")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                    filterType === "Premium" ? "bg-[#C5E8D4] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  <span>Premium</span>
                </button>
                <button
                  onClick={() => setFilterType("Salvos")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${
                    filterType === "Salvos" ? "bg-[#C5E8D4] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Salvos</span>
                </button>
              </div>
            </div>
          </section>

          {/* Tabela de Whitepapers */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50">
              <div className="flex items-center py-3 px-6">
                <div className="flex-1 text-xs font-semibold text-slate-700 uppercase tracking-wide">Whitepaper</div>
                <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Autora</div>
                <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Publicação</div>
                <div className="w-24 text-xs font-semibold text-slate-700 uppercase tracking-wide">Páginas</div>
                <div className="w-28 text-xs font-semibold text-slate-700 uppercase tracking-wide">Downloads</div>
                <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Acesso</div>
                <div className="w-24 text-xs font-semibold text-slate-700 uppercase tracking-wide"></div>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {whitepapers.map((whitepaper) => (
                <div key={whitepaper.id} className="flex items-center py-4 px-6 hover:bg-slate-50 transition group">
                  <div className="flex-1 flex items-center gap-4">
                    <div className={`w-10 h-10 ${whitepaper.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <FileText className="text-slate-700 w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="text-sm font-medium text-slate-800 cursor-default">
                            {whitepaper.title.length > 40 
                              ? whitepaper.title.substring(0, 40) + "..." 
                              : whitepaper.title}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{whitepaper.title}</p>
                        </TooltipContent>
                      </Tooltip>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 ${whitepaper.categoryColor} rounded-full font-medium text-slate-700`}>
                          {whitepaper.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-32">
                    <a 
                      href="#" 
                      className="text-sm text-slate-800 font-medium hover:text-[#7FA8C9] hover:underline transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {whitepaper.publisher}
                    </a>
                  </div>
                  <div className="w-32">
                    <p className="text-sm text-slate-600">{whitepaper.publishDate}</p>
                  </div>
                  <div className="w-24">
                    <p className="text-sm text-slate-600">{whitepaper.pages} págs</p>
                  </div>
                  <div className="w-28">
                    <p className="text-sm text-slate-600">{(whitepaper.downloads / 1000).toFixed(1)}k</p>
                  </div>
                  <div className="w-32">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                      whitepaper.accessType === "free" ? "bg-[#C5E8D4]" : "bg-[#E8E0C5]"
                    }`}>
                      {whitepaper.accessType === "free" ? (
                        <Unlock className="text-slate-700 w-3 h-3" />
                      ) : (
                        <Crown className="text-slate-700 w-3 h-3" />
                      )}
                      <span className="text-xs font-medium text-slate-700">{whitepaper.access}</span>
                    </div>
                  </div>
                  <div className="w-24 flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
                      <Bookmark className={`w-4 h-4 ${whitepaper.saved ? "fill-current text-[#D4C5E8]" : ""}`} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Em Destaque */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Em Destaque</h2>
              <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {featuredWhitepapers.slice(0, 3).map((whitepaper) => (
                <div key={whitepaper.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    <img src={whitepaper.image} alt={whitepaper.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#C9B88C] fill-current" />
                      <span className="text-xs font-semibold text-slate-800">{whitepaper.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 ${whitepaper.categoryColor} rounded-full font-medium text-slate-700`}>
                        {whitepaper.category}
                      </span>
                      {whitepaper.accessType === "premium" ? (
                        <Crown className="w-3 h-3 text-[#C9B88C]" />
                      ) : (
                        <Unlock className="w-3 h-3 text-[#8CC99B]" />
                      )}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="text-sm font-semibold text-slate-800 mb-2 line-clamp-2 cursor-default">
                          {whitepaper.title}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{whitepaper.title}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>{whitepaper.publisher}</span>
                      <span>{whitepaper.pages} págs</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                      <span className="text-sm font-semibold text-slate-800">{whitepaper.price}</span>
                      <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver detalhes</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
};
