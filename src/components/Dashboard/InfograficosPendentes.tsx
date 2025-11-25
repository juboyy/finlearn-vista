import { useState } from "react";
import { Search, Bell, Plus, Filter, Layers, Unlock, Crown, Bookmark, BarChart3, CheckCircle, Building, ThumbsUp, MoreHorizontal, FileCheck, Star } from "lucide-react";
import { Circle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const InfograficosPendentes = () => {
  const [viewType, setViewType] = useState("list");
  const [filterType, setFilterType] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const stats = [
    { icon: BarChart3, label: "Pendentes", value: "34", color: "bg-[#D4C5E8]" },
    { icon: CheckCircle, label: "Visualizados", value: "71", color: "bg-[#C5E8D4]" },
    { icon: Bookmark, label: "Salvos", value: "18", color: "bg-[#E8D4C5]" },
    { icon: Crown, label: "Premium", value: "12", color: "bg-[#E8E0C5]" },
  ];

  const categories = [
    { name: "Todos", count: 34, color: "bg-[#D4C5E8]", dotColor: "text-slate-600" },
    { name: "Pagamentos", count: 11, color: "bg-[#7FA8C9]", dotColor: "text-[#7FA8C9]" },
    { name: "ESG", count: 8, color: "bg-[#8CC99B]", dotColor: "text-[#8CC99B]" },
    { name: "Inovação", count: 7, color: "bg-[#A68CC9]", dotColor: "text-[#A68CC9]" },
    { name: "Mercado", count: 5, color: "bg-[#C9B88C]", dotColor: "text-[#C9B88C]" },
    { name: "Segurança", count: 3, color: "bg-[#C99B8C]", dotColor: "text-[#C99B8C]" },
  ];

  const publishers = [
    { name: "BCG", count: 9 },
    { name: "McKinsey", count: 8 },
    { name: "Deloitte", count: 6 },
    { name: "KPMG", count: 5 },
  ];

  const recentActivity = [
    { type: "add", title: "Novo infográfico adicionado", description: "Panorama Pagamentos 2024", time: "3 horas atrás", bgColor: "bg-[#D4C5E8]" },
    { type: "save", title: "Infográfico salvo", description: "ESG no Setor Financeiro", time: "1 dia atrás", bgColor: "bg-[#E8D4C5]" },
    { type: "complete", title: "Visualização concluída", description: "Open Finance Timeline", time: "2 dias atrás", bgColor: "bg-[#C5E8D4]" },
  ];

  const infographics = [
    {
      id: 1,
      title: "Panorama do Mercado de Pagamentos Digitais 2024",
      category: "Pagamentos",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      publisher: "BCG",
      publishDate: "Jan 2025",
      sections: 12,
      access: "Gratuito",
      accessType: "free",
      saved: true,
      views: 24800,
    },
    {
      id: 2,
      title: "ESG no Setor Financeiro: Métricas e Indicadores",
      category: "ESG",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      publisher: "KPMG",
      publishDate: "Jan 2025",
      sections: 8,
      access: "R$ 89,00",
      accessType: "premium",
      saved: false,
      views: 18200,
    },
    {
      id: 3,
      title: "Open Finance: Jornada de Implementação",
      category: "Inovação",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      publisher: "McKinsey",
      publishDate: "Jan 2025",
      sections: 15,
      access: "Gratuito",
      accessType: "free",
      saved: true,
      views: 32100,
    },
    {
      id: 4,
      title: "Fraudes Financeiras: Estatísticas e Prevenção",
      category: "Segurança",
      categoryColor: "bg-[#C99B8C]",
      iconColor: "bg-[#C99B8C]",
      publisher: "Deloitte",
      publishDate: "Dez 2024",
      sections: 10,
      access: "R$ 129,00",
      accessType: "premium",
      saved: false,
      views: 21500,
    },
    {
      id: 5,
      title: "IA no Crédito: Processo de Análise Automatizada",
      category: "Inovação",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      publisher: "BCG",
      publishDate: "Dez 2024",
      sections: 9,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      views: 19700,
    },
    {
      id: 6,
      title: "Composição de Carteiras de Investimento por Perfil",
      category: "Mercado",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      publisher: "McKinsey",
      publishDate: "Dez 2024",
      sections: 11,
      access: "R$ 149,00",
      accessType: "premium",
      saved: true,
      views: 28300,
    },
    {
      id: 7,
      title: "Regulamentações BACEN: Linha do Tempo 2024",
      category: "Pagamentos",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      publisher: "KPMG",
      publishDate: "Dez 2024",
      sections: 14,
      access: "Gratuito",
      accessType: "free",
      saved: true,
      views: 15800,
    },
    {
      id: 8,
      title: "Comparativo: Bancos Tradicionais vs Fintechs",
      category: "Mercado",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      publisher: "BCG",
      publishDate: "Nov 2024",
      sections: 13,
      access: "R$ 99,00",
      accessType: "premium",
      saved: false,
      views: 22400,
    },
    {
      id: 9,
      title: "Impacto do Pix no Mercado de Pagamentos",
      category: "Pagamentos",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      publisher: "Deloitte",
      publishDate: "Nov 2024",
      sections: 10,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      views: 31200,
    },
    {
      id: 10,
      title: "Critérios ESG em Crédito Bancário",
      category: "ESG",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      publisher: "KPMG",
      publishDate: "Nov 2024",
      sections: 7,
      access: "R$ 79,00",
      accessType: "premium",
      saved: false,
      views: 16900,
    },
  ];

  const featuredInfographics = [
    {
      id: 1,
      title: "Revolução Digital nos Pagamentos",
      category: "Pagamentos",
      categoryColor: "bg-[#7FA8C9]",
      publisher: "BCG",
      sections: 12,
      price: "Grátis",
      accessType: "free",
      rating: 4.9,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c35c9476c0-937d5d5fa79162f25496.png",
    },
    {
      id: 2,
      title: "Sustentabilidade no Setor Financeiro",
      category: "ESG",
      categoryColor: "bg-[#8CC99B]",
      publisher: "McKinsey",
      sections: 9,
      price: "R$ 149",
      accessType: "premium",
      rating: 5.0,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f5deae4fe-f9ff5d8bb77362e3164d.png",
    },
    {
      id: 3,
      title: "Cibersegurança Bancária em Números",
      category: "Segurança",
      categoryColor: "bg-[#C99B8C]",
      publisher: "KPMG",
      sections: 11,
      price: "R$ 129",
      accessType: "premium",
      rating: 4.8,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/232deb1f9e-40babc22c90b2ae4122d.png",
    },
    {
      id: 4,
      title: "Análise do Mercado de Cartões",
      category: "Pagamentos",
      categoryColor: "bg-[#7FA8C9]",
      publisher: "Deloitte",
      sections: 8,
      price: "Grátis",
      accessType: "free",
      rating: 4.7,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6c950fa2ae-4a9ad2779840b213a8a4.png",
    },
    {
      id: 5,
      title: "Transformação Digital em Fintechs",
      category: "Inovação",
      categoryColor: "bg-[#A68CC9]",
      publisher: "BCG",
      sections: 14,
      price: "R$ 99",
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
                    ? "bg-[#D4C5E8] text-slate-800"
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
                <p className="text-xs text-slate-500">22 infográficos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
              <div className="w-8 h-8 bg-[#E8E0C5] rounded-full flex items-center justify-center">
                <Crown className="text-slate-700 w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Premium</p>
                <p className="text-xs text-slate-500">12 infográficos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Editoras */}
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Editoras</h2>
          <div className="space-y-3">
            {publishers.map((publisher) => (
              <div key={publisher.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <Building className="text-slate-600 w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{publisher.name}</p>
                  <p className="text-xs text-slate-500">{publisher.count} infográficos</p>
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
                    viewType === "grid" ? "bg-[#D4C5E8] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <i className="fas fa-th-large"></i>
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 rounded-lg transition ${
                    viewType === "list" ? "bg-[#D4C5E8] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4C5E8] appearance-none pr-8 bg-white text-slate-700">
                  <option>Adicionado recentemente</option>
                  <option>Título (A-Z)</option>
                  <option>Seções (menor-maior)</option>
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

        {/* Tabela de Infográficos */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50">
            <div className="flex items-center py-3 px-6">
              <div className="flex-1 text-xs font-semibold text-slate-700 uppercase tracking-wide">Infográfico</div>
              <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Editora</div>
              <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Publicação</div>
              <div className="w-24 text-xs font-semibold text-slate-700 uppercase tracking-wide">Seções</div>
              <div className="w-28 text-xs font-semibold text-slate-700 uppercase tracking-wide">Visualizações</div>
              <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Acesso</div>
              <div className="w-24 text-xs font-semibold text-slate-700 uppercase tracking-wide"></div>
            </div>
          </div>
          <div className="divide-y divide-slate-200">
            {infographics.map((infographic) => (
              <div key={infographic.id} className="flex items-center py-4 px-6 hover:bg-slate-50 transition group">
                <div className="flex-1 flex items-center gap-4">
                  <div className={`w-10 h-10 ${infographic.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <BarChart3 className="text-slate-700 w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="text-sm font-medium text-slate-800 truncate max-w-md cursor-default">
                          {infographic.title}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{infographic.title}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 ${infographic.categoryColor} rounded-full font-medium text-slate-700`}>
                        {infographic.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-32">
                  <p className="text-sm text-slate-800 font-medium">{infographic.publisher}</p>
                </div>
                <div className="w-32">
                  <p className="text-sm text-slate-600">{infographic.publishDate}</p>
                </div>
                <div className="w-24">
                  <p className="text-sm text-slate-600">{infographic.sections} seções</p>
                </div>
                <div className="w-28">
                  <p className="text-sm text-slate-600">{(infographic.views / 1000).toFixed(1)}k</p>
                </div>
                <div className="w-32">
                  {infographic.accessType === "free" ? (
                    <div className="flex items-center gap-2">
                      <Unlock className="w-4 h-4 text-[#8CC99B]" />
                      <span className="text-sm text-[#8CC99B] font-medium">{infographic.access}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-[#C9B88C]" />
                      <span className="text-sm text-[#C9B88C] font-medium">{infographic.access}</span>
                    </div>
                  )}
                </div>
                <div className="w-24 flex items-center justify-end gap-2">
                  <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                    <Bookmark className={`w-4 h-4 ${infographic.saved ? "fill-current text-[#E8D4C5]" : ""}`} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition opacity-0 group-hover:opacity-100">
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
            {featuredInfographics.slice(0, 3).map((infographic) => (
              <div key={infographic.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                  <img src={infographic.image} alt={infographic.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#C9B88C] fill-current" />
                    <span className="text-xs font-semibold text-slate-800">{infographic.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 ${infographic.categoryColor} rounded-full font-medium text-slate-700`}>
                      {infographic.category}
                    </span>
                    {infographic.accessType === "premium" ? (
                      <Crown className="w-3 h-3 text-[#C9B88C]" />
                    ) : (
                      <Unlock className="w-3 h-3 text-[#8CC99B]" />
                    )}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="text-sm font-semibold text-slate-800 mb-2 line-clamp-2 cursor-default">
                        {infographic.title}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{infographic.title}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{infographic.publisher}</span>
                    <span>{infographic.sections} seções</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                    <span className="text-sm font-semibold text-slate-800">{infographic.price}</span>
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
