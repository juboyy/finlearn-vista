import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Bookmark, X, FileText, Headphones, Play, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
                  <h3 className="font-semibold text-foreground mb-4">Tipo de Conteúdo</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="artigos" defaultChecked />
                      <Label htmlFor="artigos" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-foreground">Artigos</span>
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="podcasts" defaultChecked />
                      <Label htmlFor="podcasts" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <Headphones className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-foreground">Podcasts</span>
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="videos" defaultChecked />
                      <Label htmlFor="videos" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                          <Play className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-foreground">Vídeos Avatar</span>
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="block font-semibold text-foreground mb-2">Categoria</Label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                    <option>Todas as categorias</option>
                    <option>Mercado de Capitais</option>
                    <option>Meios de Pagamento</option>
                    <option>Tecnologia Financeira</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Nível de Dificuldade</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="difficulty" className="text-primary focus:ring-primary" />
                      <span className="text-sm text-muted-foreground">Iniciante</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="difficulty" className="text-primary focus:ring-primary" defaultChecked />
                      <span className="text-sm text-muted-foreground">Intermediário</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="difficulty" className="text-primary focus:ring-primary" />
                      <span className="text-sm text-muted-foreground">Avançado</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Duração</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="dur1" />
                      <Label htmlFor="dur1" className="text-sm text-muted-foreground cursor-pointer">Até 5 min</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dur2" defaultChecked />
                      <Label htmlFor="dur2" className="text-sm text-muted-foreground cursor-pointer">5-15 min</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dur3" />
                      <Label htmlFor="dur3" className="text-sm text-muted-foreground cursor-pointer">15-30 min</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dur4" />
                      <Label htmlFor="dur4" className="text-sm text-muted-foreground cursor-pointer">Mais de 30 min</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="block font-semibold text-foreground mb-2">Área</Label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                    <option>Contabilidade</option>
                    <option>Jurídico</option>
                    <option>Financeiro</option>
                  </select>
                </div>

                <div>
                  <Label className="block font-semibold text-foreground mb-2">Período</Label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 15 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Este ano</option>
                  </select>
                </div>

                <div>
                  <Label className="block font-semibold text-foreground mb-2">Autor</Label>
                  <Input type="text" placeholder="Buscar autor..." className="w-full" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Avaliação Mínima</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 text-gray-300" />
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Aplicar Filtros
                </Button>
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
                          <span className={`text-xs font-medium bg-${article.categoryColor}/10 text-${article.categoryColor} px-2 py-1 rounded`}>
                            {article.category}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                          {article.isPremium && (
                            <>
                              <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded">Premium</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3 hover:text-primary cursor-pointer">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <div className="font-medium text-sm text-foreground">{article.author}</div>
                              <div className="text-xs text-muted-foreground">{article.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="hover:text-primary transition">
                              ❤️ {article.likes}
                            </button>
                            <button className="hover:text-primary transition">
                              💬 {article.comments}
                            </button>
                            <button className="hover:text-primary transition">
                              🔖
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
