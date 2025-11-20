import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, Plus, Users, UserCheck, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Seguidores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Seus Seguidores</h1>
              <p className="text-sm text-slate-500 mt-1">Gerencie e acompanhe quem está seguindo você</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar seguidores..." 
                  className="w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            <aside className="w-80 space-y-6">
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-users text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Total Seguidores</span>
                    </div>
                    <span className="font-semibold text-slate-800">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-user-plus text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Novos Esta Semana</span>
                    </div>
                    <span className="font-semibold text-slate-800">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fas fa-eye text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Visualizações</span>
                    </div>
                    <span className="font-semibold text-slate-800">1.2k</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <i className="fas fa-heart text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Engajamento</span>
                    </div>
                    <span className="font-semibold text-slate-800">94%</span>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
                  <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-pastel-green text-slate-800 cursor-pointer">
                    <i className="fas fa-circle text-[8px] text-slate-600 flex-shrink-0"></i>
                    <span className="text-sm font-medium flex-1">Todos</span>
                    <span className="text-xs bg-white px-2 py-1 rounded-full flex-shrink-0">127</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#8CC99B] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Profissionais</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">45</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#7FA8C9] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Estudantes</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">38</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#A68CC9] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Empresas</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">28</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#C9B88C] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Criadores</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">16</span>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Segmentos</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" defaultChecked />
                    <span className="text-sm text-slate-700 flex-1">Mercado de Capitais</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">42</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" defaultChecked />
                    <span className="text-sm text-slate-700 flex-1">Banking</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">35</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Pagamentos</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">28</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Seguros</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">15</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Compliance</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">7</span>
                  </label>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Tags Populares</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Investimentos</span>
                  <span className="px-3 py-1 bg-pastel-green text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Banking</span>
                  <span className="px-3 py-1 bg-pastel-purple text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Fintech</span>
                  <span className="px-3 py-1 bg-pastel-yellow text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">PIX</span>
                  <span className="px-3 py-1 bg-pastel-peach text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Open Finance</span>
                  <span className="px-3 py-1 bg-pastel-pink text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">CVM</span>
                  <span className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Regulação</span>
                  <span className="px-3 py-1 bg-pastel-green text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">B3</span>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Atividade Recente</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pastel-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-user-plus text-slate-700 text-xs"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800">Novo seguidor</p>
                      <p className="text-xs text-slate-500">Carlos Silva começou a seguir você</p>
                      <p className="text-xs text-slate-400">1 hora atrás</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pastel-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-heart text-slate-700 text-xs"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800">Curtida</p>
                      <p className="text-xs text-slate-500">3 seguidores curtiram seu post</p>
                      <p className="text-xs text-slate-400">3 horas atrás</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pastel-purple rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-comment text-slate-700 text-xs"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800">Comentário</p>
                      <p className="text-xs text-slate-500">Ana Costa comentou no seu artigo</p>
                      <p className="text-xs text-slate-400">Ontem</p>
                    </div>
                  </div>
                </div>
              </section>
            </aside>

            <div className="flex-1 space-y-6">
              <section className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">Visualizar:</span>
                      <button className="p-2 bg-pastel-green text-slate-700 rounded-lg transition">
                        <i className="fas fa-th-large"></i>
                      </button>
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                        <i className="fas fa-list"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue appearance-none pr-8 bg-white">
                        <option>Nome (A-Z)</option>
                        <option>Seguidor mais recente</option>
                        <option>Mais engajamento</option>
                        <option>Mais relevantes</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                      <i className="fas fa-chart-bar"></i>
                      <span>Estatísticas</span>
                    </button>
                    <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                      <i className="fas fa-layer-group"></i>
                      <span>Todos</span>
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                      <i className="far fa-star"></i>
                      <span>Destacados</span>
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                      <i className="far fa-bell"></i>
                      <span>Com Notificação</span>
                    </button>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                    <div className="col-span-4">Seguidor</div>
                    <div className="col-span-2">Atividade</div>
                    <div className="col-span-2">Engajamento</div>
                    <div className="col-span-2">Seguindo desde</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>
                </div>

                <div className="divide-y divide-slate-200">
                  {[
                    {
                      name: "Carlos Silva",
                      role: "Analista de Mercado",
                      company: "XP Investimentos",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
                      activity: "Muito Ativo",
                      engagement: "Alta",
                      since: "Jan 2024",
                      isFollowing: true
                    },
                    {
                      name: "Ana Costa",
                      role: "Gerente de Compliance",
                      company: "Banco Safra",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
                      activity: "Ativo",
                      engagement: "Média",
                      since: "Dez 2023",
                      isFollowing: false
                    },
                    {
                      name: "Roberto Almeida",
                      role: "Diretor Financeiro",
                      company: "BTG Pactual",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
                      activity: "Moderado",
                      engagement: "Alta",
                      since: "Nov 2023",
                      isFollowing: true
                    },
                    {
                      name: "Juliana Martins",
                      role: "Especialista em PIX",
                      company: "Nubank",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
                      activity: "Muito Ativo",
                      engagement: "Alta",
                      since: "Out 2023",
                      isFollowing: false
                    },
                    {
                      name: "Fernando Santos",
                      role: "Consultor de Investimentos",
                      company: "Itaú",
                      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
                      activity: "Ativo",
                      engagement: "Média",
                      since: "Set 2023",
                      isFollowing: true
                    }
                  ].map((follower, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition cursor-pointer">
                      <div className="col-span-4 flex items-center gap-3">
                        <img 
                          src={follower.avatar} 
                          alt={follower.name} 
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 truncate">{follower.name}</p>
                          <p className="text-sm text-slate-500 truncate">{follower.role} • {follower.company}</p>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          follower.activity === "Muito Ativo" ? "bg-pastel-green text-slate-700" :
                          follower.activity === "Ativo" ? "bg-pastel-blue text-slate-700" :
                          "bg-pastel-yellow text-slate-700"
                        }`}>
                          {follower.activity}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          follower.engagement === "Alta" ? "bg-pastel-purple text-slate-700" :
                          "bg-pastel-peach text-slate-700"
                        }`}>
                          {follower.engagement}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="text-sm text-slate-600">{follower.since}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button 
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                            follower.isFollowing 
                              ? "bg-pastel-blue text-slate-700 hover:bg-opacity-80" 
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          <i className={`fas ${follower.isFollowing ? 'fa-user-check' : 'fa-user-plus'} mr-1.5`}></i>
                          {follower.isFollowing ? 'Seguindo' : 'Seguir'}
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <i className="fas fa-ellipsis-v text-sm"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Mostrando 5 de 127 seguidores</p>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">1</button>
                  <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">2</button>
                  <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">3</button>
                  <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">...</button>
                  <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">26</button>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Seguidores;
