import { useState } from "react";
import { Search, Bell, Plus, History, FileText, Calendar, Clock, Star, Eye, Bookmark, MoreHorizontal, Building, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import newspaperRiskManagement from "@/assets/newspaper-risk-management.png";
import newspaperFinancialStability from "@/assets/newspaper-financial-stability.png";
import newspaperOpenFinance from "@/assets/newspaper-open-finance.png";

export const NewspapersNaoLidas = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const navigate = useNavigate();

  const stats = [
    { icon: FileText, label: "Não Lidos", value: "47", color: "bg-[#D4C5E8]" },
    { icon: Calendar, label: "Esta Semana", value: "12", color: "bg-[#C5E8D4]" },
    { icon: Clock, label: "Tempo Médio", value: "18 min", color: "bg-[#B8D4E8]" },
    { icon: Star, label: "Prioritários", value: "8", color: "bg-[#E8E0C5]" },
  ];

  const categories = [
    { name: "Todas", count: 47, color: "#D4C5E8" },
    { name: "Normativos", count: 15, color: "#A68CC9" },
    { name: "Relatórios", count: 12, color: "#7FA8C9" },
    { name: "White Papers", count: 9, color: "#C9B88C" },
    { name: "Guias", count: 7, color: "#8CC99B" },
    { name: "Pesquisas", count: 4, color: "#C99B8C" },
  ];

  const sources = [
    { name: "Banco Central", count: 14 },
    { name: "CVM", count: 11 },
    { name: "ANBIMA", count: 8 },
    { name: "FEBRABAN", count: 6 },
  ];

  const priorities = [
    { name: "Alta", count: 8, color: "bg-red-100", iconColor: "text-red-600", icon: "!" },
    { name: "Média", count: 23, color: "bg-yellow-100", iconColor: "text-yellow-600", icon: "–" },
    { name: "Baixa", count: 16, color: "bg-green-100", iconColor: "text-green-600", icon: "↓" },
  ];

  const featuredNewspapers = [
    {
      id: 1,
      title: "Resolução BCB nº 312 - Gestão de Riscos",
      category: "Normativos",
      categoryColor: "bg-[#A68CC9]",
      description: "Nova resolução do Banco Central estabelece diretrizes atualizadas para gestão de riscos operacionais em instituições financeiras, com foco em controles internos e governança.",
      date: "15/11/2024",
      readTime: "25 min",
      views: 284,
      image: newspaperRiskManagement,
      isNew: true,
    },
    {
      id: 2,
      title: "Relatório de Estabilidade Financeira - Q3 2024",
      category: "Relatórios",
      categoryColor: "bg-[#7FA8C9]",
      description: "Análise completa do sistema financeiro brasileiro no terceiro trimestre, incluindo avaliação de riscos sistêmicos e indicadores de solidez das instituições.",
      date: "14/11/2024",
      readTime: "42 min",
      views: 156,
      image: newspaperFinancialStability,
      isNew: false,
    },
    {
      id: 3,
      title: "Open Finance: Implementação e Melhores Práticas",
      category: "White Papers",
      categoryColor: "bg-[#C9B88C]",
      description: "Guia completo sobre implementação de Open Finance no Brasil, incluindo aspectos técnicos, regulatórios e casos de uso práticos para instituições financeiras.",
      date: "13/11/2024",
      readTime: "35 min",
      views: 412,
      image: newspaperOpenFinance,
      isNew: false,
      isFavorite: true,
    },
  ];

  const documents = [
    {
      id: 1,
      title: "Resolução BCB nº 312 - Gestão de Riscos",
      category: "Normativos",
      categoryColor: "bg-[#A68CC9]",
      source: "Banco Central",
      date: "15/11/2024",
      dateRelative: "há 2 dias",
      readTime: "25 min",
      fileSize: "2.4 MB",
      fileType: "PDF",
      readers: 284,
      isNew: true,
      isFavorite: false,
      icon: FileText,
    },
    {
      id: 2,
      title: "Relatório de Estabilidade Financeira - Q3 2024",
      category: "Relatórios",
      categoryColor: "bg-[#7FA8C9]",
      source: "Banco Central",
      date: "14/11/2024",
      dateRelative: "há 3 dias",
      readTime: "42 min",
      fileSize: "5.8 MB",
      fileType: "PDF",
      readers: 156,
      isNew: false,
      isFavorite: false,
      icon: FileText,
    },
    {
      id: 3,
      title: "Open Finance: Implementação e Melhores Práticas",
      category: "White Papers",
      categoryColor: "bg-[#C9B88C]",
      source: "FEBRABAN",
      date: "13/11/2024",
      dateRelative: "há 4 dias",
      readTime: "35 min",
      fileSize: "3.2 MB",
      fileType: "PDF",
      readers: 412,
      isNew: false,
      isFavorite: true,
      icon: FileText,
    },
    {
      id: 4,
      title: "Guia Completo de Prevenção à Lavagem de Dinheiro",
      category: "Guias",
      categoryColor: "bg-[#8CC99B]",
      source: "ANBIMA",
      date: "12/11/2024",
      dateRelative: "há 5 dias",
      readTime: "28 min",
      fileSize: "4.1 MB",
      fileType: "PDF",
      readers: 328,
      isNew: false,
      isFavorite: false,
      icon: FileText,
    },
    {
      id: 5,
      title: "Circular CVM 3.987 - Fundos de Investimento",
      category: "Normativos",
      categoryColor: "bg-[#A68CC9]",
      source: "CVM",
      date: "11/11/2024",
      dateRelative: "há 6 dias",
      readTime: "18 min",
      fileSize: "1.8 MB",
      fileType: "PDF",
      readers: 197,
      isNew: true,
      isFavorite: false,
      icon: FileText,
    },
    {
      id: 6,
      title: "Pesquisa Anual: Tendências do Mercado de Capitais",
      category: "Pesquisas",
      categoryColor: "bg-[#C99B8C]",
      source: "ANBIMA",
      date: "10/11/2024",
      dateRelative: "há 1 semana",
      readTime: "52 min",
      fileSize: "6.5 MB",
      fileType: "PDF",
      readers: 89,
      isNew: false,
      isFavorite: false,
      icon: FileText,
    },
    {
      id: 7,
      title: "Relatório Anual de Meios de Pagamento 2024",
      category: "Relatórios",
      categoryColor: "bg-[#7FA8C9]",
      source: "Banco Central",
      date: "08/11/2024",
      dateRelative: "há 1 semana",
      readTime: "38 min",
      fileSize: "7.2 MB",
      fileType: "PDF",
      readers: 543,
      isNew: false,
      isFavorite: false,
      icon: FileText,
    },
    {
      id: 8,
      title: "ESG no Setor Financeiro: Diretrizes 2025",
      category: "White Papers",
      categoryColor: "bg-[#C9B88C]",
      source: "ANBIMA",
      date: "07/11/2024",
      dateRelative: "há 1 semana",
      readTime: "45 min",
      fileSize: "4.7 MB",
      fileType: "PDF",
      readers: 267,
      isNew: false,
      isFavorite: false,
      icon: FileText,
    },
  ];

  const handlePrevCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev > 0 ? prev - 1 : featuredNewspapers.length - 1));
  };

  const handleNextCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev < featuredNewspapers.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex-1 p-8 pb-32">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 space-y-6">
          {/* Estatísticas */}
          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-base font-semibold text-slate-800 mb-3">Estatísticas</h2>
            <div className="space-y-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="text-slate-700 w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-slate-700">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Categorias */}
          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-slate-800">Categorias</h2>
              <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
            </div>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                    selectedCategory === cat.name
                      ? "bg-[#D4C5E8] text-slate-800"
                      : "hover:bg-slate-100"
                  }`}
                >
                  <Circle className="w-1.5 h-1.5 text-slate-600 fill-current" />
                  <span className="text-xs font-medium flex-1">{cat.name}</span>
                  <span className={`text-xs ${selectedCategory === cat.name ? "bg-white px-1.5 py-0.5 rounded-full" : "text-slate-500"}`}>
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Fontes */}
          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-base font-semibold text-slate-800 mb-3">Fontes</h2>
            <div className="space-y-2">
              {sources.map((source) => (
                <div key={source.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                  <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center">
                    <Building className="text-slate-600 w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 truncate">{source.name}</p>
                    <p className="text-[10px] text-slate-500">{source.count} documentos</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Prioridade */}
          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-base font-semibold text-slate-800 mb-3">Prioridade</h2>
            <div className="space-y-1.5">
              {priorities.map((priority) => (
                <div key={priority.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                  <div className={`w-6 h-6 ${priority.color} rounded-full flex items-center justify-center`}>
                    <span className={`text-[10px] ${priority.iconColor} font-bold`}>{priority.icon}</span>
                  </div>
                  <span className="text-xs text-slate-700 flex-1">{priority.name}</span>
                  <span className="text-xs text-slate-500">{priority.count}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Featured Newspapers Carousel */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Newspapers em Destaque</h2>
                <p className="text-xs text-slate-500 mt-0.5">Documentos mais relevantes da semana</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCarousel}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextCarousel}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
              >
                {featuredNewspapers.map((newspaper) => (
                  <div key={newspaper.id} className="min-w-full px-6 py-6">
                    <div className="flex gap-6">
                      <div className="w-1/3">
                        <div className="h-48 bg-gradient-to-br from-pastel-blue to-pastel-purple rounded-lg overflow-hidden">
                          <img className="w-full h-full object-cover" src={newspaper.image} alt={newspaper.title} />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${newspaper.categoryColor} text-slate-700 text-xs`}>
                              <Circle className="w-1.5 h-1.5 mr-1.5 fill-current" />
                              {newspaper.category}
                            </Badge>
                            {newspaper.isNew && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-medium rounded-full">NOVO</span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2">{newspaper.title}</h3>
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{newspaper.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {newspaper.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {newspaper.readTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" /> {newspaper.views} leituras
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-4">
                          <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                            Ler Agora
                          </button>
                          <button className={`p-2 transition ${newspaper.isFavorite ? "text-yellow-600" : "text-slate-400 hover:text-yellow-600"}`}>
                            <Star className="w-4 h-4" fill={newspaper.isFavorite ? "currentColor" : "none"} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center justify-center gap-2">
              {featuredNewspapers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarouselIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentCarouselIndex === index ? "bg-pastel-purple" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </section>

          {/* Documents Toolbar */}
          <section className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Visualizar:</span>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <i className="fas fa-th-large"></i>
                  </button>
                  <button className="p-2 bg-pastel-purple text-slate-700 rounded-lg">
                    <i className="fas fa-list"></i>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-purple appearance-none pr-8 bg-white">
                    <option>Publicado recentemente</option>
                    <option>Mais lidos</option>
                    <option>Título (A-Z)</option>
                    <option>Prioridade</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <i className="fas fa-layer-group"></i>
                  <span>Todos</span>
                </button>
                <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                  <Star className="w-4 h-4" />
                  <span>Prioritários</span>
                </button>
                <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                  <Bookmark className="w-4 h-4" />
                  <span>Salvos</span>
                </button>
              </div>
            </div>
          </section>

          {/* Documents List */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                <div className="col-span-4">Documento</div>
                <div className="col-span-2">Categoria</div>
                <div className="col-span-2">Publicado em</div>
                <div className="col-span-1"></div>
                <div className="col-span-1">Tempo</div>
                <div className="col-span-1">Leitores</div>
                <div className="col-span-1 text-right">Ações</div>
              </div>
            </div>
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <div key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <div className={`w-10 h-10 ${doc.categoryColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="text-slate-600 w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                          {doc.title}
                          {doc.isNew && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-medium rounded-full">NOVO</span>
                          )}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-500">{doc.fileType} • {doc.fileSize}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{doc.source}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge className={`${doc.categoryColor} text-slate-700 text-xs`}>
                        <Circle className="w-1.5 h-1.5 mr-1.5 fill-current" />
                        {doc.category}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">{doc.date}</div>
                      <div className="text-xs text-slate-500">{doc.dateRelative}</div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <Clock className="text-slate-400 w-3.5 h-3.5" />
                        <span className="text-sm text-slate-700">{doc.readTime}</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          <img
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                            alt=""
                            className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          />
                          <img
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                            alt=""
                            className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          />
                        </div>
                        <span className="text-xs text-slate-600 whitespace-nowrap">+{doc.readers}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-end gap-2">
                      <button className={`p-2 transition-colors ${doc.isFavorite ? "text-yellow-600" : "text-slate-400 hover:text-yellow-600"}`}>
                        <Star className="w-4 h-4" fill={doc.isFavorite ? "currentColor" : "none"} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
};
