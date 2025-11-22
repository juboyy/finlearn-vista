import { useState } from "react";
import { Search, Bell, Plus, Filter, Layers, Unlock, Crown, Bookmark, FileText, CheckCircle, Building, ThumbsUp, MoreHorizontal, FileCheck, Star } from "lucide-react";
import { Circle } from "lucide-react";
import relatorioBiDashboard from "@/assets/relatorio-bi-dashboard.png";

export const RelatoriosPendentes = () => {
  const [viewType, setViewType] = useState("list");
  const [filterType, setFilterType] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { icon: FileText, label: "Pendentes", value: "47", color: "bg-[#B8D4E8]" },
    { icon: CheckCircle, label: "Concluídos", value: "89", color: "bg-[#C5E8D4]" },
    { icon: Bookmark, label: "Salvos", value: "23", color: "bg-[#D4C5E8]" },
    { icon: Crown, label: "Premium", value: "18", color: "bg-[#E8E0C5]" },
  ];

  const categories = [
    { name: "Todos", count: 47, color: "bg-[#B8D4E8]", dotColor: "text-slate-600" },
    { name: "Análise Setorial", count: 15, color: "bg-[#7FA8C9]", dotColor: "text-[#7FA8C9]" },
    { name: "Compliance", count: 11, color: "bg-[#A68CC9]", dotColor: "text-[#A68CC9]" },
    { name: "Meios de Pagamento", count: 9, color: "bg-[#8CC99B]", dotColor: "text-[#8CC99B]" },
    { name: "Mercado de Capitais", count: 8, color: "bg-[#C9B88C]", dotColor: "text-[#C9B88C]" },
    { name: "Risco e Governança", count: 4, color: "bg-[#C99B8C]", dotColor: "text-[#C99B8C]" },
  ];

  const publishers = [
    { name: "BCG", count: 12 },
    { name: "McKinsey", count: 10 },
    { name: "KPMG", count: 8 },
    { name: "Deloitte", count: 7 },
  ];

  const recentActivity = [
    { type: "add", title: "Novo relatório adicionado", description: "Tendências FinTech 2024", time: "2 horas atrás", bgColor: "bg-[#B8D4E8]" },
    { type: "save", title: "Relatório salvo", description: "Análise Mercado Financeiro", time: "1 dia atrás", bgColor: "bg-[#E8E0C5]" },
    { type: "complete", title: "Leitura concluída", description: "Análise Setor Bancário Q3", time: "2 dias atrás", bgColor: "bg-[#C5E8D4]" },
  ];

  const reports = [
    {
      id: 1,
      title: "Panorama do Mercado Financeiro Brasileiro 2024",
      category: "Análise Setorial",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      publisher: "BCG",
      publishDate: "Nov 2024",
      pages: 78,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      reads: 234,
    },
    {
      id: 2,
      title: "Compliance e Gestão de Riscos em Instituições Financeiras",
      category: "Compliance",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      publisher: "KPMG",
      publishDate: "Out 2024",
      pages: 124,
      access: "R$ 149,00",
      accessType: "premium",
      saved: true,
      reads: 189,
    },
    {
      id: 3,
      title: "Inovações em Meios de Pagamento: Pix e Open Finance",
      category: "Meios de Pagamento",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      publisher: "McKinsey",
      publishDate: "Nov 2024",
      pages: 56,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      reads: 412,
    },
    {
      id: 4,
      title: "Mercado de Capitais: Tendências e Oportunidades 2024",
      category: "Mercado de Capitais",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      publisher: "Deloitte",
      publishDate: "Set 2024",
      pages: 92,
      access: "R$ 199,00",
      accessType: "premium",
      saved: false,
      reads: 156,
    },
    {
      id: 5,
      title: "Gestão de Riscos Operacionais em Fintechs",
      category: "Risco e Governança",
      categoryColor: "bg-[#C99B8C]",
      iconColor: "bg-[#C99B8C]",
      publisher: "BCG",
      publishDate: "Out 2024",
      pages: 68,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      reads: 298,
    },
    {
      id: 6,
      title: "Transformação Digital no Setor Bancário",
      category: "Análise Setorial",
      categoryColor: "bg-[#7FA8C9]",
      iconColor: "bg-[#7FA8C9]",
      publisher: "McKinsey",
      publishDate: "Nov 2024",
      pages: 145,
      access: "R$ 249,00",
      accessType: "premium",
      saved: true,
      reads: 523,
    },
    {
      id: 7,
      title: "Regulamentação Financeira: Novas Diretrizes do Bacen",
      category: "Compliance",
      categoryColor: "bg-[#A68CC9]",
      iconColor: "bg-[#A68CC9]",
      publisher: "KPMG",
      publishDate: "Set 2024",
      pages: 84,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      reads: 367,
    },
    {
      id: 8,
      title: "Cartões de Crédito: Análise do Mercado Nacional",
      category: "Meios de Pagamento",
      categoryColor: "bg-[#8CC99B]",
      iconColor: "bg-[#8CC99B]",
      publisher: "BCG",
      publishDate: "Ago 2024",
      pages: 102,
      access: "R$ 179,00",
      accessType: "premium",
      saved: false,
      reads: 445,
    },
    {
      id: 9,
      title: "IPOs e Ofertas Públicas: Perspectivas 2024-2025",
      category: "Mercado de Capitais",
      categoryColor: "bg-[#C9B88C]",
      iconColor: "bg-[#C9B88C]",
      publisher: "Deloitte",
      publishDate: "Out 2024",
      pages: 118,
      access: "Gratuito",
      accessType: "free",
      saved: false,
      reads: 291,
    },
    {
      id: 10,
      title: "Framework de Gestão de Riscos Operacionais",
      category: "Risco e Governança",
      categoryColor: "bg-[#C99B8C]",
      iconColor: "bg-[#C99B8C]",
      publisher: "KPMG",
      publishDate: "Set 2024",
      pages: 96,
      access: "R$ 169,00",
      accessType: "premium",
      saved: false,
      reads: 178,
    },
  ];

  const featuredReports = [
    {
      id: 2,
      title: "ESG e Sustentabilidade no Setor Financeiro",
      category: "Risco e Governança",
      categoryColor: "bg-[#C99B8C]",
      publisher: "BCG",
      pages: 98,
      price: "Grátis",
      accessType: "free",
      rating: 4.7,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c35c9476c0-937d5d5fa79162f25496.png",
    },
    {
      id: 3,
      title: "Estratégias de Investimento para 2025",
      category: "Mercado de Capitais",
      categoryColor: "bg-[#C9B88C]",
      publisher: "Deloitte",
      pages: 134,
      price: "R$ 349",
      accessType: "premium",
      rating: 5.0,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f5deae4fe-f9ff5d8bb77362e3164d.png",
    },
    {
      id: 4,
      title: "Guia Completo de Compliance Bancário 2024",
      category: "Compliance",
      categoryColor: "bg-[#A68CC9]",
      publisher: "KPMG",
      pages: 187,
      price: "R$ 399",
      accessType: "premium",
      rating: 4.8,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/232deb1f9e-40babc22c90b2ae4122d.png",
    },
    {
      id: 5,
      title: "Revolução dos Cartões de Crédito no Brasil",
      category: "Meios de Pagamento",
      categoryColor: "bg-[#8CC99B]",
      publisher: "BCG",
      pages: 72,
      price: "Grátis",
      accessType: "free",
      rating: 4.6,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6c950fa2ae-4a9ad2779840b213a8a4.png",
    },
    {
      id: 6,
      title: "Transformação Digital em Bancos Tradicionais",
      category: "Análise Setorial",
      categoryColor: "bg-[#7FA8C9]",
      publisher: "McKinsey",
      pages: 142,
      price: "R$ 279",
      accessType: "premium",
      rating: 4.9,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/893c0ad640-4d33c43cd08bfc73ce6a.png",
    },
    {
      id: 7,
      title: "Business Intelligence e Análise de Dados Financeiros",
      category: "Análise Setorial",
      categoryColor: "bg-[#7FA8C9]",
      publisher: "BCG",
      pages: 164,
      price: "R$ 329",
      accessType: "premium",
      rating: 4.8,
      image: relatorioBiDashboard,
    },
  ];

  return (
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
                <p className="text-xs text-slate-500">29 relatórios</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
              <div className="w-8 h-8 bg-[#E8E0C5] rounded-full flex items-center justify-center">
                <Crown className="text-slate-700 w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Premium</p>
                <p className="text-xs text-slate-500">18 relatórios</p>
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
                  <p className="text-xs text-slate-500">{publisher.count} relatórios</p>
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

        {/* Tabela de Relatórios */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
              <div className="col-span-4">Relatório</div>
              <div className="col-span-3 ml-3">Categoria</div>
              <div className="col-span-1">Páginas</div>
              <div className="col-span-1">Leituras</div>
              <div className="col-span-2">Acesso</div>
              <div className="col-span-1 text-right">Ações</div>
            </div>
          </div>

          {reports.map((report) => (
            <div
              key={report.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                <div className="col-span-4 flex items-center gap-4">
                  <div className={`w-10 h-10 ${report.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <FileText className="text-slate-600 w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                      {report.title}
                      {report.saved && <Bookmark className="text-yellow-500 w-3 h-3 fill-current" />}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-2">
                        <Building className="text-slate-400 w-3 h-3" />
                        <span className="text-xs text-slate-500">{report.publisher}</span>
                      </div>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">Publicado em {report.publishDate}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 ml-3">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 ${report.categoryColor} text-slate-700 rounded-full text-xs font-medium whitespace-nowrap`}>
                    <Circle className="w-1.5 h-1.5 fill-current" />
                    {report.category}
                  </span>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-file-pdf text-slate-400 text-sm"></i>
                    <span className="text-sm font-medium text-slate-700">{report.pages}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-eye text-slate-400 text-sm"></i>
                    <span className="text-sm font-medium text-slate-700">{report.reads}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                      report.accessType === "free" ? "bg-[#C5E8D4]" : "bg-[#E8E0C5]"
                    }`}>
                      {report.accessType === "free" ? (
                        <Unlock className="text-slate-700 w-3 h-3" />
                      ) : (
                        <Crown className="text-slate-700 w-3 h-3" />
                      )}
                      <span className="text-xs font-medium text-slate-700">{report.access}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button className={`p-2 transition-colors ${
                    report.saved ? "text-yellow-600 hover:text-yellow-700" : "text-slate-400 hover:text-yellow-600"
                  }`}>
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Relatórios em Destaque */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">Relatórios em Destaque</h2>
            <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover" src={report.image} alt={report.title} />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 ${report.categoryColor} text-slate-700 rounded-full text-xs font-medium`}>
                      <Circle className="w-1.5 h-1.5 fill-current" />
                      {report.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-slate-700 ${
                      report.accessType === "free" ? "bg-[#C5E8D4]" : "bg-[#E8E0C5]"
                    }`}>
                      {report.accessType === "free" ? (
                        <Unlock className="w-3 h-3" />
                      ) : (
                        <Crown className="w-3 h-3" />
                      )}
                      {report.accessType === "free" ? "Gratuito" : "Premium"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">{report.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="text-slate-400 w-3 h-3" />
                    <span className="text-sm text-slate-600">{report.publisher}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-sm text-slate-600">{report.pages} páginas</span>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(report.rating) ? "text-yellow-400 fill-current" : "text-slate-300"}`} />
                    ))}
                    <span className="text-sm text-slate-600 ml-2">({report.rating})</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-2xl font-bold text-slate-800">{report.price}</span>
                    <button className="px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Adicionar Relatório</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">URL ou Arquivo</label>
                <input type="url" placeholder="https://exemplo.com/relatorio.pdf" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]">
                  <option>Análise Setorial</option>
                  <option>Compliance</option>
                  <option>Meios de Pagamento</option>
                  <option>Mercado de Capitais</option>
                  <option>Risco e Governança</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Acesso</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]">
                  <option>Gratuito</option>
                  <option>Premium</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Adicionar
                </button>
                <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
