import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Bookmark, Heart, MessageCircle, Flame, Crown, ChevronLeft, ChevronRight, SlidersHorizontal, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const getCategoryColor = (category: string | null) => {
  const colors: Record<string, string> = {
    'Criptomoedas': 'secondary',
    'Investimentos': 'accent',
    'Tecnologia': 'success',
    'Entrevista': 'primary',
    'Compliance': 'secondary',
    'Mercado': 'primary',
    'Fintech': 'accent',
  };
  return colors[category || ''] || 'primary';
};

const trendingTopics = [
  { title: "Nova Regulação do Banco Central para Pagamentos Instantâneos", views: "2.4K", color: "primary" },
  { title: "Criptoativos: Impacto das Novas Regras da CVM", views: "1.8K", color: "secondary" },
  { title: "Open Finance: Oportunidades para Fintechs em 2024", views: "1.6K", color: "accent" },
  { title: "ESG no Mercado Financeiro: Tendências e Desafios", views: "1.3K", color: "success" },
  { title: "Tokenização de Ativos: O Futuro dos Investimentos", views: "1.1K", color: "warning" },
];

const featuredAuthors = [
  { name: "Marina Santos", articles: 45, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" },
  { name: "Ricardo Alves", articles: 38, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" },
  { name: "Ana Costa", articles: 32, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" },
];

const Conteudo = () => {
  const navigate = useNavigate();
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b border-border sticky top-0 z-10">
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full"></span>
              </Button>
              <Button>
                <Bookmark size={16} className="mr-2" />
                Salvos
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Hero Featured Article */}
          <section className="bg-card border border-border rounded-xl overflow-hidden mb-8 h-[480px]">
            <div className="grid grid-cols-2 h-full">
              <div className="h-full overflow-hidden">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0d3363a785-f5c72d5f4fe6d83cfc81.png" 
                  alt="Destaque" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 px-3 py-1 rounded-full">
                    Destaque da Semana
                  </span>
                  <span className="text-xs font-medium text-warning bg-warning/10 px-3 py-1 rounded-full">
                    <Crown size={12} className="inline mr-1" />
                    Premium
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                  O Futuro dos Pagamentos Digitais no Brasil
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Análise profunda sobre as tendências do mercado de pagamentos, impacto do PIX e novas tecnologias que estão moldando o setor financeiro brasileiro.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                      alt="Author" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm text-foreground">Marina Santos</div>
                      <div className="text-xs text-muted-foreground">Especialista em Fintech</div>
                    </div>
                  </div>
                  <span className="text-border">•</span>
                  <span className="text-sm text-muted-foreground">15 min de leitura</span>
                  <span className="text-border">•</span>
                  <span className="text-sm text-muted-foreground">12 Mar 2024</span>
                </div>
                <Link to="/artigo/1">
                  <Button size="lg" className="w-fit">
                    Ler Artigo Completo
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <Button variant="default">Todos</Button>
                <Button variant="outline">Artigos</Button>
                <Button variant="outline">Entrevistas</Button>
                <Button variant="outline">Análises</Button>
                <Button variant="outline">Notícias</Button>
                <Button variant="outline">Preferências</Button>
                <Button variant="outline">Sugestões</Button>
                <Button 
                  className="bg-accent hover:bg-success text-accent-foreground hover:text-success-foreground transition-all duration-300"
                  onClick={() => navigate("/conteudo/filtros")}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Main Articles */}
            <section className="col-span-2 space-y-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => {
                  const categoryColor = getCategoryColor(post.category);
                  const isPremium = post.visibility === 'premium';
                  const formattedDate = post.published_at 
                    ? new Date(post.published_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                    : '';
                  
                  return (
                    <article key={post.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {post.category && (
                            <span className={`text-xs font-medium px-2 py-1 rounded ${
                              categoryColor === 'primary' ? 'text-primary bg-primary/10' :
                              categoryColor === 'secondary' ? 'text-secondary bg-secondary/10' :
                              categoryColor === 'accent' ? 'text-accent bg-accent/10' :
                              categoryColor === 'success' ? 'text-success bg-success/10' :
                              'text-primary bg-primary/10'
                            }`}>
                              {post.category}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{post.read_time || '5 min'} de leitura</span>
                          {isPremium && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded">
                                <Crown size={10} className="inline mr-1" />
                                Premium
                              </span>
                            </>
                          )}
                        </div>
                        <Link to={`/artigo/${post.id}`}>
                          <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary cursor-pointer">
                            {post.title}
                          </h3>
                        </Link>
                        {post.description && (
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">
                                {post.author_name?.charAt(0) || 'A'}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-sm text-foreground">{post.author_name || 'Autor'}</div>
                              <div className="text-xs text-muted-foreground">{formattedDate}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="hover:text-primary transition">
                              <Heart size={16} className="inline mr-1" />
                              {post.likes || 0}
                            </button>
                            <button className="hover:text-primary transition">
                              <MessageCircle size={16} className="inline mr-1" />
                              {post.comments || 0}
                            </button>
                            <button className="hover:text-primary transition">
                              <Bookmark size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhum artigo encontrado
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Trending Topics</h3>
                  <Flame className="text-accent" size={20} />
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => {
                    const bgClass = 
                      topic.color === 'primary' ? 'bg-primary/5 hover:bg-primary/10' :
                      topic.color === 'secondary' ? 'bg-secondary/5 hover:bg-secondary/10' :
                      topic.color === 'accent' ? 'bg-accent/5 hover:bg-accent/10' :
                      topic.color === 'success' ? 'bg-success/5 hover:bg-success/10' :
                      topic.color === 'warning' ? 'bg-warning/5 hover:bg-warning/10' :
                      'bg-primary/5 hover:bg-primary/10';
                    
                    const badgeClass = 
                      topic.color === 'primary' ? 'bg-primary' :
                      topic.color === 'secondary' ? 'bg-secondary' :
                      topic.color === 'accent' ? 'bg-accent' :
                      topic.color === 'success' ? 'bg-success' :
                      topic.color === 'warning' ? 'bg-warning' :
                      'bg-primary';

                    return (
                      <div 
                        key={index} 
                        className={`flex gap-3 p-3 ${bgClass} rounded-lg transition cursor-pointer`}
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 ${badgeClass} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground line-clamp-2">{topic.title}</p>
                          <span className="text-xs text-muted-foreground mt-1 block">{topic.views} visualizações</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Featured Authors */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Autores em Destaque</h3>
                <div className="space-y-4">
                  {featuredAuthors.map((author, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-foreground">{author.name}</div>
                        <div className="text-xs text-muted-foreground">{author.articles} artigos publicados</div>
                      </div>
                      <Button variant="outline" size="sm">Seguir</Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Access */}
              <div className="bg-card border border-primary rounded-xl p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="text-warning" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Acesso Premium</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Desbloqueie artigos exclusivos e entrevistas com especialistas
                  </p>
                  <Button className="w-full">Assinar Agora</Button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">Receba os melhores conteúdos semanalmente</p>
                <Input type="email" placeholder="Seu e-mail" className="mb-3" />
                <Button className="w-full">Inscrever-se</Button>
              </div>
            </aside>
          </div>

          {/* Pagination */}
          <section className="flex items-center justify-center gap-2 py-8">
            <Button variant="outline" size="icon">
              <ChevronLeft size={18} />
            </Button>
            <Button>1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">4</Button>
            <span className="px-2 text-muted-foreground">...</span>
            <Button variant="outline">12</Button>
            <Button variant="outline" size="icon">
              <ChevronRight size={18} />
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Conteudo;
