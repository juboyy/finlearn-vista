import { useState, useEffect } from "react";
import { Search, Bell, Plus, Filter, Layers, Unlock, Crown, Bookmark, Presentation, CheckCircle, Building, ThumbsUp, MoreHorizontal, FileCheck, Star, User } from "lucide-react";
import { Circle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PresentationPreviewModal } from "./PresentationPreviewModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ApresentacoesPendentes = () => {
  const [viewType, setViewType] = useState("list");
  const [filterType, setFilterType] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedPresentation, setSelectedPresentation] = useState<any>(null);
  const [presentations, setPresentations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
    try {
      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match component format
      const transformedData = data?.map((p: any, index: number) => ({
        id: p.id,
        title: p.title,
        category: p.topic || 'Geral',
        categoryColor: getCategoryColor(p.topic),
        iconColor: getCategoryColor(p.topic),
        author: p.author_name,
        authorType: p.author_type,
        publishDate: new Date(p.created_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
        slides: Array.isArray(p.slides) ? p.slides.length : 0,
        access: "Gratuito",
        accessType: "free",
        saved: false,
        views: p.views,
        rating: p.rating || 0,
        slidesList: Array.isArray(p.slides) ? p.slides.map((s: any, i: number) => ({
          id: i + 1,
          content: s.title
        })) : [],
      })) || [];

      setPresentations(transformedData);
    } catch (error) {
      console.error("Error fetching presentations:", error);
      toast.error("Erro ao carregar apresentações");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (topic: string | null) => {
    const colors: Record<string, string> = {
      'Estratégia': 'bg-[#7FA8C9]',
      'Dados & BI': 'bg-[#A68CC9]',
      'Produtos': 'bg-[#8CC99B]',
      'Compliance': 'bg-[#C9B88C]',
      'Tecnologia': 'bg-[#C99B8C]',
      'Geral': 'bg-[#E8D4C5]',
    };
    return colors[topic || 'Geral'] || 'bg-[#E8D4C5]';
  };

  const stats = [
    { icon: Presentation, label: "Pendentes", value: "31", color: "bg-[#E8D4C5]" },
    { icon: CheckCircle, label: "Assistidas", value: "64", color: "bg-[#C5E8D4]" },
    { icon: Bookmark, label: "Salvos", value: "19", color: "bg-[#D4C5E8]" },
    { icon: Crown, label: "Premium", value: "14", color: "bg-[#E8E0C5]" },
  ];

  const categories = [
    { name: "Todos", count: 31, color: "bg-[#E8D4C5]", dotColor: "text-slate-600" },
    { name: "Estratégia", count: 10, color: "bg-[#7FA8C9]", dotColor: "text-[#7FA8C9]" },
    { name: "Dados & BI", count: 8, color: "bg-[#A68CC9]", dotColor: "text-[#A68CC9]" },
    { name: "Produtos", count: 7, color: "bg-[#8CC99B]", dotColor: "text-[#8CC99B]" },
    { name: "Compliance", count: 4, color: "bg-[#C9B88C]", dotColor: "text-[#C9B88C]" },
    { name: "Tecnologia", count: 2, color: "bg-[#C99B8C]", dotColor: "text-[#C99B8C]" },
  ];

  const authors = [
    { name: "Itaú Unibanco", count: 9, type: "company" },
    { name: "Nubank", count: 7, type: "company" },
    { name: "Ana Costa", count: 6, type: "person", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" },
    { name: "Roberto Lima", count: 5, type: "person", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" },
  ];

  const recentActivity = [
    { type: "add", title: "Nova apresentação adicionada", description: "Estratégia Digital 2025", time: "1 hora atrás", bgColor: "bg-[#E8D4C5]" },
    { type: "save", title: "Apresentação salva", description: "Dashboard Executivo BI", time: "2 dias atrás", bgColor: "bg-[#D4C5E8]" },
    { type: "complete", title: "Visualização concluída", description: "Produtos Inovadores", time: "4 dias atrás", bgColor: "bg-[#C5E8D4]" },
  ];

  const featuredPresentations = [
    {
      id: 1,
      title: "Transformação Digital no Setor Bancário",
      category: "Estratégia",
      categoryColor: "bg-[#7FA8C9]",
      author: "Itaú Unibanco",
      authorType: "company",
      slides: 48,
      price: "Grátis",
      accessType: "free",
      rating: 4.9,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c35c9476c0-937d5d5fa79162f25496.png",
    },
    {
      id: 2,
      title: "Business Intelligence e Analytics",
      category: "Dados & BI",
      categoryColor: "bg-[#A68CC9]",
      author: "Ana Costa",
      authorType: "person",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      slides: 36,
      price: "R$ 199",
      accessType: "premium",
      rating: 5.0,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f5deae4fe-f9ff5d8bb77362e3164d.png",
    },
    {
      id: 3,
      title: "Inovação em Produtos Financeiros",
      category: "Produtos",
      categoryColor: "bg-[#8CC99B]",
      author: "Nubank",
      authorType: "company",
      slides: 42,
      price: "R$ 149",
      accessType: "premium",
      rating: 4.8,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/232deb1f9e-40babc22c90b2ae4122d.png",
    },
    {
      id: 4,
      title: "Compliance em Instituições Financeiras",
      category: "Compliance",
      categoryColor: "bg-[#C9B88C]",
      author: "Roberto Lima",
      authorType: "person",
      authorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      slides: 52,
      price: "Grátis",
      accessType: "free",
      rating: 4.7,
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6c950fa2ae-4a9ad2779840b213a8a4.png",
    },
    {
      id: 5,
      title: "Arquitetura Cloud para Bancos Digitais",
      category: "Tecnologia",
      categoryColor: "bg-[#C99B8C]",
      author: "Itaú Unibanco",
      authorType: "company",
      slides: 45,
      price: "R$ 189",
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
                      ? "bg-[#E8D4C5] text-slate-800"
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
                  <p className="text-sm font-medium text-slate-800">Gratuitas</p>
                  <p className="text-xs text-slate-500">17 apresentações</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                <div className="w-8 h-8 bg-[#E8E0C5] rounded-full flex items-center justify-center">
                  <Crown className="text-slate-700 w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Premium</p>
                  <p className="text-xs text-slate-500">14 apresentações</p>
                </div>
              </div>
            </div>
          </section>

          {/* Autores */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Autores</h2>
            <div className="space-y-3">
              {authors.map((author) => (
                <div key={author.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                  {author.type === "person" ? (
                    <img 
                      src={author.avatar} 
                      alt={author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-700">{author.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{author.name}</p>
                    <p className="text-xs text-slate-500">{author.count} apresentações</p>
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
                      viewType === "grid" ? "bg-[#E8D4C5] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <i className="fas fa-th-large"></i>
                  </button>
                  <button
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-lg transition ${
                      viewType === "list" ? "bg-[#E8D4C5] text-slate-700" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <i className="fas fa-list"></i>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8D4C5] appearance-none pr-8 bg-white text-slate-700">
                    <option>Adicionado recentemente</option>
                    <option>Título (A-Z)</option>
                    <option>Slides (menor-maior)</option>
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
                  <span>Gratuitas</span>
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

          {/* Tabela de Apresentações */}
          {loading ? (
            <section className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <p className="text-slate-600">Carregando apresentações...</p>
            </section>
          ) : presentations.length === 0 ? (
            <section className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Presentation className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">Nenhuma apresentação encontrada</p>
              <p className="text-sm text-slate-500">Crie sua primeira apresentação no Editor de Slides</p>
            </section>
          ) : (
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50">
                <div className="flex items-center py-3 px-6">
                  <div className="flex-1 text-xs font-semibold text-slate-700 uppercase tracking-wide">Apresentação</div>
                  <div className="w-40 text-xs font-semibold text-slate-700 uppercase tracking-wide">Autora</div>
                  <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Publicação</div>
                  <div className="w-24 text-xs font-semibold text-slate-700 uppercase tracking-wide">Slides</div>
                  <div className="w-28 text-xs font-semibold text-slate-700 uppercase tracking-wide">Visualizações</div>
                  <div className="w-32 text-xs font-semibold text-slate-700 uppercase tracking-wide">Acesso</div>
                  <div className="w-24 text-xs font-semibold text-slate-700 uppercase tracking-wide"></div>
                </div>
              </div>
              <div className="divide-y divide-slate-200">
                {presentations.map((presentation) => (
                  <div 
                    key={presentation.id} 
                    className="flex items-center py-4 px-6 hover:bg-slate-50 transition group cursor-pointer"
                    onClick={() => {
                      setSelectedPresentation(presentation);
                      setPreviewOpen(true);
                    }}
                  >
                    <div className="flex-1 flex items-center gap-4">
                      <div className={`w-10 h-10 ${presentation.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Presentation className="text-slate-700 w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <h3 className="text-sm font-medium text-slate-800 cursor-default">
                              {presentation.title.length > 40 
                                ? presentation.title.substring(0, 40) + "..." 
                                : presentation.title}
                            </h3>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{presentation.title}</p>
                          </TooltipContent>
                        </Tooltip>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 ${presentation.categoryColor} rounded-full font-medium text-slate-700`}>
                            {presentation.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-40">
                      <div className="flex items-center gap-2">
                        {presentation.authorType === "person" ? (
                          <img 
                            src={presentation.authorAvatar} 
                            alt={presentation.author}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-slate-700">{presentation.author.charAt(0)}</span>
                          </div>
                        )}
                        <a 
                          href="#" 
                          className="text-sm text-slate-800 font-medium hover:text-[#7FA8C9] hover:underline transition-colors truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {presentation.author}
                        </a>
                      </div>
                    </div>
                    <div className="w-32">
                      <p className="text-sm text-slate-600">{presentation.publishDate}</p>
                    </div>
                    <div className="w-24">
                      <p className="text-sm text-slate-600">{presentation.slides} slides</p>
                    </div>
                    <div className="w-28">
                      <p className="text-sm text-slate-600">{(presentation.views / 1000).toFixed(1)}k</p>
                    </div>
                    <div className="w-32">
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                        presentation.accessType === "free" ? "bg-[#C5E8D4]" : "bg-[#E8E0C5]"
                      }`}>
                        {presentation.accessType === "free" ? (
                          <Unlock className="text-slate-700 w-3 h-3" />
                        ) : (
                          <Crown className="text-slate-700 w-3 h-3" />
                        )}
                        <span className="text-xs font-medium text-slate-700">{presentation.access}</span>
                      </div>
                    </div>
                    <div className="w-24 flex items-center justify-end gap-2">
                      <button 
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Bookmark className={`w-4 h-4 ${presentation.saved ? "fill-current text-[#D4C5E8]" : ""}`} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Em Destaque */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Em Destaque</h2>
              <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todas</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {featuredPresentations.slice(0, 3).map((presentation) => (
                <div key={presentation.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    <img src={presentation.image} alt={presentation.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#C9B88C] fill-current" />
                      <span className="text-xs font-semibold text-slate-800">{presentation.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 ${presentation.categoryColor} rounded-full font-medium text-slate-700`}>
                        {presentation.category}
                      </span>
                      {presentation.accessType === "premium" ? (
                        <Crown className="w-3 h-3 text-[#C9B88C]" />
                      ) : (
                        <Unlock className="w-3 h-3 text-[#8CC99B]" />
                      )}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="text-sm font-semibold text-slate-800 mb-2 line-clamp-2 cursor-default">
                          {presentation.title}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{presentation.title}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                      <div className="flex items-center gap-1.5">
                        {presentation.authorType === "person" ? (
                          <img 
                            src={presentation.authorAvatar} 
                            alt={presentation.author}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center">
                            <span className="text-[8px] font-bold text-slate-700">{presentation.author.charAt(0)}</span>
                          </div>
                        )}
                        <span>{presentation.author}</span>
                      </div>
                      <span>{presentation.slides} slides</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <span className="text-sm font-semibold text-slate-800">{presentation.price}</span>
                      <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver detalhes</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {selectedPresentation && (
        <PresentationPreviewModal
          isOpen={previewOpen}
          onClose={() => {
            setPreviewOpen(false);
            setSelectedPresentation(null);
          }}
          title={selectedPresentation.title}
          slides={selectedPresentation.slidesList || []}
        />
      )}
    </TooltipProvider>
  );
};
