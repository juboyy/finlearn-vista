import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import {
  Bell,
  Upload,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import marketplaceEbookImage from "@/assets/marketplace-card-ebook-1.png";

const Marketplace = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const { recommendations, isLoading } = useRecommendations(userId);
  const { unreadCount } = useNotifications(userId);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Marketplace</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Descubra eBooks e cursos para acelerar seu aprendizado
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setNotificationsOpen(true)}
                  className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 px-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Vender Conteúdo
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar eBooks, cursos, autores..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              </div>
              <button className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </button>
              <button className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-pink rounded-full flex items-center justify-center text-xs font-medium text-slate-700">
                  3
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Featured Banner */}
          <section className="mb-8">
            <div
              className="bg-pastel-blue rounded-xl p-8 flex items-center gap-8 overflow-hidden"
              style={{ minHeight: "320px" }}
            >
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-white text-slate-700 text-sm font-medium rounded-full mb-3">
                  Destaque da Semana
                </span>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">
                  Análise Fundamentalista Completa
                </h2>
                <p className="text-white mb-6 text-lg">
                  Aprenda a avaliar empresas como um profissional. Mais de 500 alunos já
                  transformaram seus investimentos.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        alt="User"
                      />
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        alt="User"
                      />
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        alt="User"
                      />
                    </div>
                    <span className="text-sm text-white font-medium">+500 alunos</span>
                  </div>
                  <div className="flex items-center gap-1 text-white">
                    <i className="fas fa-star text-yellow-500"></i>
                    <span className="font-semibold">4.9</span>
                    <span className="text-white/80">(234)</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/ebook/1')} className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition">
                    Ver Curso
                  </button>
                  <div className="text-white">
                    <span className="text-2xl font-bold">R$ 297</span>
                    <span className="text-white/70 line-through ml-2">R$ 497</span>
                  </div>
                </div>
              </div>
              <div className="w-80 flex-shrink-0 flex items-center justify-center" style={{ height: "280px" }}>
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-contain"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/aa9b09b858-0994d5433f7f20c4839e.png"
                    alt="Pastel color drawing of a financial analyst studying charts. Minimalist, clean, soft colors, inspired by shadcn design system."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Recomendadas para o seu perfil */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-pastel-purple" />
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Recomendadas para o seu perfil</h2>
                  <p className="text-sm text-slate-500 mt-1">Conteúdos selecionados com base nos seus interesses e aprendizado</p>
                </div>
              </div>
              <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver todas
              </button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-4 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-6 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-4 gap-5">
                {recommendations.map((product, index) => {
                  const ebookImages = [
                    marketplaceEbookImage,
                    "https://storage.googleapis.com/uxpilot-auth.appspot.com/de72874cc5-bcb1610580017fd3cfe5.png"
                  ];
                  const courseImages = [
                    "https://storage.googleapis.com/uxpilot-auth.appspot.com/aa9b09b858-0994d5433f7f20c4839e.png",
                    marketplaceEbookImage
                  ];
                  const imageIndex = index % 2;
                  const imageSrc = product.type === 'ebook' 
                    ? ebookImages[imageIndex] 
                    : courseImages[imageIndex];
                  
                  return (
                  <div 
                    key={product.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group cursor-pointer" 
                    onClick={() => navigate(`/${product.type}/${product.id}`)}
                  >
                    <div className="relative">
                      <div className={`h-40 overflow-hidden ${
                        product.type === 'ebook' ? 'bg-pastel-blue' : 'bg-pastel-green'
                      }`}>
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          src={imageSrc}
                          alt={product.title}
                        />
                      </div>
                      <span className={`absolute top-3 left-3 px-3 py-1 ${
                        product.type === 'ebook' ? 'bg-pastel-purple/90' : 'bg-pastel-yellow/90'
                      } text-slate-700 text-xs font-medium rounded-full`}>
                        {product.type === 'ebook' ? 'eBook' : 'Curso'}
                      </span>
                      <div className="absolute top-3 right-3 w-8 h-8 bg-pastel-green/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-slate-700" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-pastel-blue flex items-center justify-center text-xs font-medium text-slate-700">
                          {product.author.charAt(0)}
                        </div>
                        <span className="text-xs text-slate-500">{product.author}</span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2 text-sm line-clamp-2 h-10">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 text-xs">
                          <i className="fas fa-star text-yellow-500"></i>
                          <span className="font-medium text-slate-700">{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <span className="px-2 py-0.5 bg-pastel-blue/30 text-slate-700 text-xs rounded-full font-medium">
                          {product.match_score}% Match
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-800">R$ {product.price}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{product.reason}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-pastel-blue/10 rounded-xl p-8 text-center">
                <Sparkles className="w-12 h-12 text-pastel-purple mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Explore mais para receber recomendações
                </h3>
                <p className="text-sm text-slate-600">
                  Navegue pelos produtos e compre conteúdos para receber recomendações personalizadas
                </p>
              </div>
            )}
          </section>

          {/* Category Tabs */}
          <section className="mb-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button className="px-5 py-2 bg-slate-800 text-white rounded-lg font-medium whitespace-nowrap">
                Todos
              </button>
              <button className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium whitespace-nowrap transition">
                eBooks
              </button>
              <button className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium whitespace-nowrap transition">
                Cursos
              </button>
              <button className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium whitespace-nowrap transition">
                Dados de Mercado
              </button>
            </div>
          </section>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className="w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 border border-slate-200 sticky top-24">
                <h3 className="font-semibold text-slate-800 mb-4">Filtros</h3>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Tipo de Conteúdo</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">eBooks</span>
                      <span className="ml-auto text-xs text-slate-400">(127)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">Cursos</span>
                      <span className="ml-auto text-xs text-slate-400">(89)</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Faixa de Preço</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        className="w-4 h-4 border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">Gratuito</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        className="w-4 h-4 border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">Até R$ 100</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        className="w-4 h-4 border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">R$ 100 - R$ 300</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        className="w-4 h-4 border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">Acima de R$ 300</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Avaliação</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <div className="flex items-center gap-1 text-sm">
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                      </div>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <div className="flex items-center gap-1 text-sm">
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <i className="fas fa-star text-yellow-500 text-xs"></i>
                        <span className="text-slate-400">e acima</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Nível</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">Iniciante</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">Intermediário</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-pastel-blue"
                      />
                      <span className="text-sm text-slate-600">Avançado</span>
                    </label>
                  </div>
                </div>

                <button className="w-full mt-6 px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium">
                  Limpar Filtros
                </button>
              </div>
            </aside>

            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-600">
                  Mostrando <span className="font-semibold text-slate-800">216</span> resultados
                </p>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Mais Relevantes</option>
                  <option>Mais Vendidos</option>
                  <option>Melhor Avaliados</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                  <option>Mais Recentes</option>
                </select>
              </div>

              {/* Products Grid */}
              <section className="grid grid-cols-3 gap-6 mb-8">
                {/* Product Card 1 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                  <div className="relative">
                    <div className="h-48 overflow-hidden bg-pastel-purple">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/de72874cc5-bcb1610580017fd3cfe5.png"
                        alt="Pastel color drawing of an ebook cover about stock market analysis. Minimalist, clean, soft colors."
                      />
                    </div>
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                      <i className="far fa-heart"></i>
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-green text-slate-700 text-xs font-medium rounded-full">
                      eBook
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Author"
                      />
                      <span className="text-xs text-slate-500">Carlos Mendes</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 h-12">
                      Guia Completo dos Cartões de Crédito
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <i className="fas fa-star text-yellow-500"></i>
                        <span className="font-medium text-slate-700">4.8</span>
                        <span className="text-slate-400">(156)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">892 vendas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">R$ 79</span>
                      </div>
                      <button onClick={() => navigate('/ebook/1')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 2 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                  <div className="relative">
                    <div className="h-48 overflow-hidden bg-pastel-blue">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c7cca3ca63-694685dae0ab26db02cf.png"
                        alt="Pastel color drawing of an online course thumbnail about cryptocurrency trading. Minimalist, clean, soft colors."
                      />
                    </div>
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                      <i className="far fa-heart"></i>
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-yellow text-slate-700 text-xs font-medium rounded-full">
                      Curso
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Author"
                      />
                      <span className="text-xs text-slate-500">Ana Paula Costa</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 h-12">
                      Trading de Criptomoedas do Zero
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <i className="fas fa-star text-yellow-500"></i>
                        <span className="font-medium text-slate-700">4.9</span>
                        <span className="text-slate-400">(423)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">1.2k alunos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">R$ 247</span>
                      </div>
                      <button onClick={() => navigate('/ebook/2')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 3 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                  <div className="relative">
                    <div className="h-48 overflow-hidden bg-pastel-pink">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/de72874cc5-2efb8363a6121e6b0540.png"
                        alt="Pastel color drawing of an ebook cover about fixed income investments. Minimalist, clean, soft colors."
                      />
                    </div>
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition">
                      <i className="fas fa-heart"></i>
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-green text-slate-700 text-xs font-medium rounded-full">
                      eBook
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Author"
                      />
                      <span className="text-xs text-slate-500">Ricardo Alves</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 h-12">
                      Renda Fixa Estratégica para 2025
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <i className="fas fa-star text-yellow-500"></i>
                        <span className="font-medium text-slate-700">5.0</span>
                        <span className="text-slate-400">(89)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">543 vendas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">R$ 49</span>
                      </div>
                      <button onClick={() => navigate('/ebook/3')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 4 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                  <div className="relative">
                    <div className="h-48 overflow-hidden bg-pastel-peach">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c7cca3ca63-897bea6104c60c2e388e.png"
                        alt="Pastel color drawing of an online course thumbnail about technical analysis with charts. Minimalist, clean, soft colors."
                      />
                    </div>
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                      <i className="far fa-heart"></i>
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-yellow text-slate-700 text-xs font-medium rounded-full">
                      Curso
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                      -40%
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Author"
                      />
                      <span className="text-xs text-slate-500">Fernando Lima</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 h-12">
                      Análise Técnica Avançada
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <i className="fas fa-star text-yellow-500"></i>
                        <span className="font-medium text-slate-700">4.7</span>
                        <span className="text-slate-400">(312)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">876 alunos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">R$ 179</span>
                        <span className="text-slate-400 line-through ml-2 text-sm">R$ 299</span>
                      </div>
                      <button onClick={() => navigate('/ebook/4')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 5 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                  <div className="relative">
                    <div className="h-48 overflow-hidden bg-pastel-purple">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/de72874cc5-43745d045cd52ba18a30.png"
                        alt="Pastel color drawing of an ebook cover about financial compliance. Minimalist, clean, soft colors."
                      />
                    </div>
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                      <i className="far fa-heart"></i>
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-green text-slate-700 text-xs font-medium rounded-full">
                      eBook
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Author"
                      />
                      <span className="text-xs text-slate-500">Mariana Santos</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 h-12">
                      Compliance no Mercado Financeiro
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <i className="fas fa-star text-yellow-500"></i>
                        <span className="font-medium text-slate-700">4.6</span>
                        <span className="text-slate-400">(198)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">421 vendas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">R$ 129</span>
                      </div>
                      <button onClick={() => navigate('/ebook/5')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Card 6 */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                  <div className="relative">
                    <div className="h-48 overflow-hidden bg-pastel-blue">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c7cca3ca63-1ec35d421b4607c5118c.png"
                        alt="Pastel color drawing of an online course thumbnail about investment portfolio management. Minimalist, clean, soft colors."
                      />
                    </div>
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                      <i className="far fa-heart"></i>
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-yellow text-slate-700 text-xs font-medium rounded-full">
                      Curso
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Author"
                      />
                      <span className="text-xs text-slate-500">Paulo Rodrigues</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 h-12">
                      Gestão de Carteiras de Investimento
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <i className="fas fa-star text-yellow-500"></i>
                        <span className="font-medium text-slate-700">4.8</span>
                        <span className="text-slate-400">(267)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">654 alunos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">R$ 197</span>
                      </div>
                      <button onClick={() => navigate('/ebook/6')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-100 transition">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-lg font-medium">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition">
                  3
                </button>
                <span className="text-slate-400">...</span>
                <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition">
                  12
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NotificationsPanel 
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        userId={userId}
      />
    </div>
  );
};

export default Marketplace;
