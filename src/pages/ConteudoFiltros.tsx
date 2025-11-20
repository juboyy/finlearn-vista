import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Bookmark, X, FileText, Headphones, Play, Star, Heart, MessageCircle, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getCategoryBadgeStyle = (categoryColor: string) => {
  const styles = {
    secondary: { color: '#9b7ab7', backgroundColor: 'rgba(212, 181, 212, 0.15)' },
    accent: { color: '#d9956b', backgroundColor: 'rgba(245, 198, 165, 0.15)' },
    success: { color: '#7fb07f', backgroundColor: 'rgba(184, 212, 184, 0.15)' },
    primary: { color: '#7a9bc2', backgroundColor: 'rgba(168, 197, 227, 0.15)' }
  };
  return styles[categoryColor as keyof typeof styles] || styles.primary;
};

const articles = [
  {
    id: 1,
    title: "Regulamentação de Criptoativos: O Que Muda em 2024",
    excerpt: "Entenda as novas regras do Banco Central para exchanges e como isso impacta investidores e empresas do setor.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/dca2c71f96-111a0f5fff9941a0ddd5.png",
    author: "Ricardo Alves",
    authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    date: "15 Mar 2024",
    readTime: "8 min de leitura",
    category: "Criptomoedas",
    categoryColor: "secondary",
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    title: "Estratégias de Diversificação para 2024",
    excerpt: "Como montar uma carteira equilibrada considerando renda fixa, ações, fundos imobiliários e investimentos alternativos.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/dca2c71f96-c88cc892b5b8e6a6009d.png",
    author: "Ana Costa",
    authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    date: "14 Mar 2024",
    readTime: "12 min de leitura",
    category: "Investimentos",
    categoryColor: "accent",
    likes: 567,
    comments: 89,
    isPremium: true
  },
  {
    id: 3,
    title: "IA no Trading: Oportunidades e Desafios",
    excerpt: "Como a inteligência artificial está transformando operações financeiras e quais são os principais cuidados ao implementar essas soluções.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/dca2c71f96-4bd2e74b12cf54d5f7f1.png",
    author: "Pedro Lima",
    authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    date: "13 Mar 2024",
    readTime: "10 min de leitura",
    category: "Tecnologia",
    categoryColor: "success",
    likes: 423,
    comments: 67
  },
  {
    id: 4,
    title: "Entrevista Exclusiva: CEO do Banco Digital XYZ",
    excerpt: "Conversamos com o CEO sobre estratégias de crescimento, inovação tecnológica e o futuro do banking digital no Brasil.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/dca2c71f96-cbbc2e565284c1ec69dd.png",
    author: "Juliana Ferreira",
    authorImage: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    date: "12 Mar 2024",
    readTime: "20 min de leitura",
    category: "Entrevista",
    categoryColor: "primary",
    likes: 891,
    comments: 156
  }
];

export function ConteudoFiltros() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />

      <main className="flex-1">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Portal de Conteúdo</h1>
              <p className="text-sm text-muted-foreground mt-1">Artigos, entrevistas e conteúdo premium sobre mercado financeiro</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Buscar artigos, autores..." 
                  className="w-80 pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full"></span>
              </Button>
              <Button>
                <Bookmark className="h-4 w-4 mr-2" />
                Salvos
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <aside className="col-span-3">
              <div className="bg-card border border-border rounded-xl p-6 space-y-6 sticky top-24">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Tipo de Conteúdo</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center text-gray-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-gray-700">Artigos</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                          <Headphones className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-gray-700">Podcasts</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                          <Play className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-gray-700">Vídeos Avatar</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="category-select" className="block font-semibold text-gray-800 mb-2">Categoria</label>
                  <select id="category-select" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Todas as categorias</option>
                    <option>Mercado de Capitais</option>
                    <option>Meios de Pagamento</option>
                    <option>Tecnologia Financeira</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Nível de Dificuldade</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="difficulty" className="text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-600">Iniciante</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="difficulty" className="text-primary focus:ring-primary" defaultChecked />
                      <span className="text-sm text-gray-600">Intermediário</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="difficulty" className="text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-600">Avançado</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Duração</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-600">Até 5 min</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <span className="text-sm text-gray-600">5-15 min</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-600">15-30 min</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-600">Mais de 30 min</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="area-select" className="block font-semibold text-gray-800 mb-2">Área</label>
                  <select id="area-select" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Contabilidade</option>
                    <option>Jurídico</option>
                    <option>Financeiro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="period-select" className="block font-semibold text-gray-800 mb-2">Período</label>
                  <select id="period-select" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 15 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Este ano</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="author-search" className="block font-semibold text-gray-800 mb-2">Autor</label>
                  <input type="text" id="author-search" placeholder="Buscar autor..." className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Avaliação Mínima</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current text-gray-300" />
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition">
                  Aplicar Filtros
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="col-span-9">
              <section className="space-y-6">
                {articles.map((article) => (
                  <article key={article.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition">
                    <div className="grid grid-cols-5">
                      <div className="col-span-2 h-56 overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="col-span-3 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span 
                            className="text-xs font-medium px-2 py-1 rounded"
                            style={getCategoryBadgeStyle(article.categoryColor)}
                          >
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                          {article.isPremium && (
                            <span 
                              className="text-xs font-medium px-2 py-1 rounded"
                              style={{ color: '#c49a4b', backgroundColor: 'rgba(245, 217, 165, 0.15)' }}
                            >
                              <Crown className="h-3 w-3 inline mr-1" />
                              Premium
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-primary cursor-pointer">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <div className="font-medium text-sm text-gray-800">{article.author}</div>
                              <div className="text-xs text-gray-500">{article.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <button className="hover:text-primary transition">
                              <Heart className="h-4 w-4 inline mr-1" />
                              {article.likes}
                            </button>
                            <button className="hover:text-primary transition">
                              <MessageCircle className="h-4 w-4 inline mr-1" />
                              {article.comments}
                            </button>
                            <button className="hover:text-primary transition">
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
