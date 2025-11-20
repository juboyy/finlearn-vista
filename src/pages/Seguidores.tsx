import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, Download, Grid3x3, List, ChevronDown, UserPlus, Check, MoreHorizontal, ChevronLeft, ChevronRight, Users, ArrowUp, Eye, TrendingUp, Heart, MessageCircle, Share2, Circle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Seguidores = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeTab, setActiveTab] = useState<"seguindo" | "seguidores">("seguidores");

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-pastel-gray-dark hover:bg-slate-200 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Seus Seguidores</h1>
                <p className="text-sm text-muted-foreground mt-1">Profissionais que acompanham seu conteúdo e atividades</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar seguidores..." 
                  className="w-80 pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
              <button className="relative p-2 text-muted-foreground hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                <Download size={16} />
                <span>Exportar Lista</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            <aside className="w-80 space-y-6">
              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                        <Users className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Total Seguidores</span>
                    </div>
                    <span className="font-semibold text-slate-800">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <ArrowUp className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Novos (30 dias)</span>
                    </div>
                    <span className="font-semibold text-slate-800">+84</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Eye className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Visualizações</span>
                    </div>
                    <span className="font-semibold text-slate-800">23.5K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Engajamento</span>
                    </div>
                    <span className="font-semibold text-slate-800">8.4%</span>
                  </div>
                </div>
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Crescimento</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Janeiro</span>
                      <span className="text-xs font-semibold text-slate-700">+124</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-pastel-blue h-2 rounded-full" style={{width: "85%"}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Fevereiro</span>
                      <span className="text-xs font-semibold text-slate-700">+98</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-pastel-green h-2 rounded-full" style={{width: "70%"}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Março</span>
                      <span className="text-xs font-semibold text-slate-700">+156</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-pastel-purple h-2 rounded-full" style={{width: "95%"}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">Abril</span>
                      <span className="text-xs font-semibold text-slate-700">+84</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-pastel-yellow h-2 rounded-full" style={{width: "60%"}}></div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Seguidores por Área</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-pastel-blue">
                    <Circle className="text-slate-600 flex-shrink-0" size={8} fill="currentColor" />
                    <span className="text-sm text-slate-700 flex-1">Banking</span>
                    <span className="text-xs font-semibold text-slate-700">342</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <Circle className="text-[#A68CC9] flex-shrink-0" size={8} fill="currentColor" />
                    <span className="text-sm text-slate-700 flex-1">Mercado de Capitais</span>
                    <span className="text-xs text-slate-500">298</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <Circle className="text-[#8CC99B] flex-shrink-0" size={8} fill="currentColor" />
                    <span className="text-sm text-slate-700 flex-1">Pagamentos</span>
                    <span className="text-xs text-slate-500">267</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <Circle className="text-[#C9B88C] flex-shrink-0" size={8} fill="currentColor" />
                    <span className="text-sm text-slate-700 flex-1">Compliance</span>
                    <span className="text-xs text-slate-500">189</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <Circle className="text-[#C99B8C] flex-shrink-0" size={8} fill="currentColor" />
                    <span className="text-sm text-slate-700 flex-1">Seguros</span>
                    <span className="text-xs text-slate-500">151</span>
                  </div>
                </div>
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Níveis de Engajamento</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" defaultChecked />
                    <span className="text-sm text-slate-700 flex-1">Muito Ativo</span>
                    <span className="text-xs text-slate-500">412</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" defaultChecked />
                    <span className="text-sm text-slate-700 flex-1">Ativo</span>
                    <span className="text-xs text-slate-500">598</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Moderado</span>
                    <span className="text-xs text-slate-500">187</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Inativo</span>
                    <span className="text-xs text-slate-500">50</span>
                  </label>
                </div>
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Principais Interações</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pastel-pink rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="text-slate-700" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 font-medium">Curtidas</p>
                      <p className="text-xs text-slate-500">3,247 este mês</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-slate-700" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 font-medium">Comentários</p>
                      <p className="text-xs text-slate-500">892 este mês</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <Share2 className="text-slate-700" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 font-medium">Compartilhamentos</p>
                      <p className="text-xs text-slate-500">456 este mês</p>
                    </div>
                  </div>
                </div>
              </section>
            </aside>

            <div className="flex-1 space-y-6">
              <section className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">Visualizar:</span>
                      <button 
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-pastel-blue text-slate-700" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        <Grid3x3 size={18} />
                      </button>
                      <button 
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition ${viewMode === "list" ? "bg-pastel-blue text-slate-700" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        <List size={18} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <select className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue appearance-none pr-8 bg-card">
                        <option>Mais recentes</option>
                        <option>Mais antigos</option>
                        <option>Mais ativos</option>
                        <option>Nome (A-Z)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate('/autores')}
                    className="px-6 py-2.5 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
                  >
                    <Check size={18} />
                    <span>Seguindo</span>
                  </button>
                  <button 
                    className="px-6 py-2.5 bg-pastel-green text-slate-700 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Users size={18} />
                    <span>Seguidores</span>
                  </button>
                  <button 
                    onClick={() => navigate('/autores')}
                    className="px-6 py-2.5 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
                  >
                    <Users size={18} />
                    <span>Todos Autores</span>
                  </button>
                </div>
              </section>

              <section className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="border-b border-border bg-slate-50">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                    <div className="col-span-5">Seguidor</div>
                    <div className="col-span-3">Cargo/Empresa</div>
                    <div className="col-span-2">Engajamento</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>
                </div>

                {[
                  { name: "Pedro Henrique", role: "Analista de Investimentos", company: "Banco Investimentos SA", location: "São Paulo, SP", avatar: "avatar-3.jpg", engagement: "Muito Ativo", likes: 142, comments: 28, category: "Banking", following: false },
                  { name: "Beatriz Souza", role: "Gerente de Compliance", company: "Corretora XYZ", location: "Rio de Janeiro, RJ", avatar: "avatar-5.jpg", engagement: "Ativo", likes: 89, comments: 15, category: "Compliance", following: true },
                  { name: "Rafael Costa", role: "Diretor de Produtos", company: "Fintech Inovadora", location: "Belo Horizonte, MG", avatar: "avatar-8.jpg", engagement: "Muito Ativo", likes: 203, comments: 47, category: "Pagamentos", following: false },
                  { name: "Camila Rodrigues", role: "Especialista em Regulação", company: "CVM", location: "Brasília, DF", avatar: "avatar-6.jpg", engagement: "Moderado", likes: 34, comments: 8, category: "Mercado de Capitais", following: true },
                  { name: "Thiago Martins", role: "Head de Tecnologia", company: "Banco Digital 360", location: "São Paulo, SP", avatar: "avatar-4.jpg", engagement: "Ativo", likes: 67, comments: 12, category: "Banking", following: false },
                  { name: "Larissa Almeida", role: "Analista de Riscos", company: "Seguradora Nacional", location: "Curitiba, PR", avatar: "avatar-7.jpg", engagement: "Muito Ativo", likes: 156, comments: 31, category: "Seguros", following: true },
                  { name: "Gustavo Lima", role: "Consultor Financeiro", company: "Consultoria Prime", location: "Porto Alegre, RS", avatar: "avatar-9.jpg", engagement: "Ativo", likes: 78, comments: 19, category: "Mercado de Capitais", following: false },
                  { name: "Fernanda Santos", role: "Gerente de Operações", company: "Processadora Pay+", location: "Recife, PE", avatar: "avatar-1.jpg", engagement: "Moderado", likes: 42, comments: 6, category: "Pagamentos", following: true },
                  { name: "André Oliveira", role: "Economista", company: "Banco Central", location: "Brasília, DF", avatar: "avatar-2.jpg", engagement: "Muito Ativo", likes: 189, comments: 52, category: "Mercado de Capitais", following: false },
                  { name: "Isabela Ferreira", role: "Coordenadora de Produtos", company: "Fintech Crédito+", location: "Salvador, BA", avatar: "avatar-5.jpg", engagement: "Ativo", likes: 95, comments: 23, category: "Banking", following: true },
                ].map((follower, index) => (
                  <div key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer last:border-b-0">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                      <div className="col-span-5 flex items-center gap-4">
                        <img 
                          src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${follower.avatar}`} 
                          alt={follower.name} 
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                            {follower.name}
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              follower.engagement === "Muito Ativo" ? "bg-pastel-green text-slate-700" :
                              follower.engagement === "Ativo" ? "bg-pastel-blue text-slate-700" :
                              "bg-pastel-purple text-slate-700"
                            }`}>
                              {follower.engagement}
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500 truncate">{follower.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-slate-400 text-white rounded text-xs">{follower.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-sm text-slate-700">{follower.company}</div>
                        <div className="text-xs text-slate-500">{follower.location}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className="text-pastel-pink" size={12} />
                          <span className="text-sm text-slate-700">{follower.likes} curtidas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="text-pastel-blue" size={12} />
                          <span className="text-xs text-slate-500">{follower.comments} comentários</span>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button className={`p-2 rounded-lg transition ${
                          follower.following 
                            ? "bg-slate-200 text-slate-600" 
                            : "bg-pastel-blue text-slate-700 hover:bg-opacity-80"
                        }`}>
                          {follower.following ? <Check size={16} /> : <UserPlus size={16} />}
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              <section className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-2">
                    <ChevronLeft size={16} />
                    Anterior
                  </button>
                  <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium">1</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">2</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">3</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">4</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">5</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-2">
                    Próximo
                    <ChevronRight size={16} />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Seguidores;
