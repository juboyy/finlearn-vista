import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, Plus, Users, Newspaper, Star, ChevronLeft, ChevronRight, X, UserCheck, Building2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Autores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"mentores" | "seguindo" | "seguidores" | "descobrir">("seguindo");
  const navigate = useNavigate();
  return <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Autores que Você Segue</h1>
              <p className="text-sm text-slate-500 mt-1">Gerencie e organize seus autores favoritos do mercado financeiro</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input type="text" placeholder="Buscar autores..." className="w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <Plus size={16} className="inline mr-2" />
                Seguir Creator
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
                      <div className="w-8 h-8 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-users text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Total Seguindo</span>
                    </div>
                    <span className="font-semibold text-slate-800">48</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-newspaper text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Publicações Lidas</span>
                    </div>
                    <span className="font-semibold text-slate-800">324</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fas fa-bell text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Notificações</span>
                    </div>
                    <span className="font-semibold text-slate-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <i className="fas fa-star text-slate-700 text-sm"></i>
                      </div>
                      <span className="text-sm text-slate-700">Favoritos</span>
                    </div>
                    <span className="font-semibold text-slate-800">15</span>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Categorias</h2>
                  <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-pastel-blue text-slate-800 cursor-pointer">
                    <i className="fas fa-circle text-[8px] text-slate-600 flex-shrink-0"></i>
                    <span className="text-sm font-medium flex-1">Todos</span>
                    <span className="text-xs bg-white px-2 py-1 rounded-full flex-shrink-0">48</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#7FA8C9] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Análise de Mercado</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">12</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#A68CC9] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Regulamentação</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">8</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#8CC99B] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Meios de Pagamento</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">11</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#C9B88C] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Investimentos</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">10</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <i className="fas fa-circle text-[8px] text-[#C99B8C] flex-shrink-0"></i>
                    <span className="text-sm text-slate-700 flex-1">Banking &amp; Fintech</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">7</span>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Segmentos</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" defaultChecked />
                    <span className="text-sm text-slate-700 flex-1">Mercado de Capitais</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">18</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" defaultChecked />
                    <span className="text-sm text-slate-700 flex-1">Banking</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">15</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Pagamentos</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">12</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Seguros</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">8</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                    <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">Compliance</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">6</span>
                  </label>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Tags Populares</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Renda Fixa</span>
                  <span className="px-3 py-1 bg-pastel-green text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">PIX</span>
                  <span className="px-3 py-1 bg-pastel-purple text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">CVM</span>
                  <span className="px-3 py-1 bg-pastel-yellow text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Open Finance</span>
                  <span className="px-3 py-1 bg-pastel-peach text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">ESG</span>
                  <span className="px-3 py-1 bg-pastel-pink text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">Cartões</span>
                  <span className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">B3</span>
                  <span className="px-3 py-1 bg-pastel-green text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-opacity-80 transition">BACEN</span>
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
                      <p className="text-xs text-slate-500">Ana Costa publicou novo artigo</p>
                      <p className="text-xs text-slate-400">2 horas atrás</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pastel-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-newspaper text-slate-700 text-xs"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800">Novo conteúdo</p>
                      <p className="text-xs text-slate-500">5 autores publicaram hoje</p>
                      <p className="text-xs text-slate-400">5 horas atrás</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pastel-purple rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-bell text-slate-700 text-xs"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800">Notificação</p>
                      <p className="text-xs text-slate-500">Carlos Silva mencionou você</p>
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
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                        <i className="fas fa-th-large"></i>
                      </button>
                      <button className="p-2 bg-pastel-blue text-slate-700 rounded-lg transition">
                        <i className="fas fa-list"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue appearance-none pr-8 bg-white">
                        <option>Nome (A-Z)</option>
                        <option>Seguindo recentemente</option>
                        <option>Mais publicações</option>
                        <option>Mais relevantes</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/estatisticas')} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                      <i className="fas fa-chart-bar"></i>
                      <span>Estatísticas</span>
                    </button>
                    <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                      <i className="fas fa-layer-group"></i>
                      <span>Todos</span>
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                      <i className="far fa-star"></i>
                      <span>Favoritos</span>
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                      <i className="far fa-bell"></i>
                      <span>Com Notificação</span>
                    </button>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setActiveTab("mentores");
                      navigate("/mentores");
                    }}
                    className={`px-6 py-2.5 text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
                      activeTab === "mentores"
                        ? "bg-pastel-green"
                        : "bg-pastel-blue hover:bg-pastel-pink"
                    }`}
                  >
                    <i className="fas fa-graduation-cap mr-2"></i>
                    Mentores
                  </button>
                  <button 
                    onClick={() => setActiveTab("seguindo")}
                    className={`px-6 py-2.5 text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
                      activeTab === "seguindo"
                        ? "bg-pastel-green"
                        : "bg-pastel-blue hover:bg-pastel-pink"
                    }`}
                  >
                    <i className="fas fa-user-check mr-2"></i>
                    Seguindo
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab("seguidores");
                      navigate("/seguidores");
                    }}
                    className={`px-6 py-2.5 text-slate-700 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === "seguidores"
                        ? "bg-pastel-green"
                        : "bg-pastel-blue hover:bg-pastel-pink"
                    }`}
                  >
                    <i className="fas fa-users mr-2"></i>
                    Seguidores
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab("descobrir");
                      navigate("/descobrir-novos");
                    }}
                    className={`px-6 py-2.5 text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
                      activeTab === "descobrir"
                        ? "bg-pastel-green"
                        : "bg-pastel-blue hover:bg-pastel-pink"
                    }`}
                  >
                    <i className="fas fa-compass mr-2"></i>
                    Descobrir Novos
                  </button>
                  <button 
                    onClick={() => {
                      navigate("/empresas");
                    }}
                    className="px-6 py-2.5 bg-pastel-blue hover:bg-pastel-pink text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <Building2 size={18} />
                    Empresas
                  </button>
                </div>
              </section>

              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                    <div className="col-span-4">CREATOR</div>
                    <div className="col-span-2">Publicações</div>
                    <div className="col-span-2">Social Selling</div>
                    <div className="col-span-2">Seguindo desde</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>
                </div>

                <div onClick={() => navigate('/perfil-autor/ana-costa')} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Ana Costa" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                          Ana Costa
                          <i className="fas fa-star text-yellow-500 text-xs"></i>
                        </h3>
                        <p className="text-xs text-slate-500 truncate">Analista Senior - Banco Central</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-blue text-slate-700 rounded text-xs">PIX</span>
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs">Open Finance</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">28 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 2 dias</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-green-700">87/100</div>
                      <div className="text-xs text-green-600">Excelente</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">15/03/2023</div>
                      <div className="text-xs text-slate-500">há 1 ano</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors">
                        <i className="fas fa-star"></i>
                      </button>
                      <button className="p-2 text-pastel-blue hover:text-slate-600 transition-colors">
                        <i className="fas fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Carlos Silva" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate">Carlos Silva</h3>
                        <p className="text-xs text-slate-500 truncate">Diretor de Compliance - Banco XYZ</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-purple text-slate-700 rounded text-xs">CVM</span>
                          <span className="px-2 py-0.5 bg-pastel-yellow text-slate-700 rounded text-xs">Compliance</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">42 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 1 dia</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-yellow-700">62/100</div>
                      <div className="text-xs text-yellow-600">Bom</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">22/01/2023</div>
                      <div className="text-xs text-slate-500">há 1 ano</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-yellow-600 transition-colors">
                        <i className="far fa-star"></i>
                      </button>
                      <button className="p-2 text-pastel-blue hover:text-slate-600 transition-colors">
                        <i className="fas fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" alt="Mariana Oliveira" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                          Mariana Oliveira
                          <i className="fas fa-star text-yellow-500 text-xs"></i>
                        </h3>
                        <p className="text-xs text-slate-500 truncate">Head de Research - Corretora ABC</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-blue text-slate-700 rounded text-xs">Renda Fixa</span>
                          <span className="px-2 py-0.5 bg-pastel-peach text-slate-700 rounded text-xs">B3</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">56 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 3 horas</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-green-700">93/100</div>
                      <div className="text-xs text-green-600">Excelente</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">08/05/2022</div>
                      <div className="text-xs text-slate-500">há 2 anos</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors">
                        <i className="fas fa-star"></i>
                      </button>
                      <button className="p-2 text-pastel-blue hover:text-slate-600 transition-colors">
                        <i className="fas fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Roberto Mendes" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate">Roberto Mendes</h3>
                        <p className="text-xs text-slate-500 truncate">Sócio-Fundador - Fintech Pagamentos+</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs">Cartões</span>
                          <span className="px-2 py-0.5 bg-pastel-pink text-slate-700 rounded text-xs">Adquirência</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">34 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 1 semana</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-red-700">45/100</div>
                      <div className="text-xs text-red-600">Regular</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">12/08/2023</div>
                      <div className="text-xs text-slate-500">há 8 meses</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-yellow-600 transition-colors">
                        <i className="far fa-star"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-pastel-blue transition-colors">
                        <i className="far fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="Juliana Santos" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate">Juliana Santos</h3>
                        <p className="text-xs text-slate-500 truncate">Especialista em ESG - Gestora Investimentos</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-peach text-slate-700 rounded text-xs">ESG</span>
                          <span className="px-2 py-0.5 bg-pastel-yellow text-slate-700 rounded text-xs">Sustentabilidade</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">38 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 4 dias</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-green-700">78/100</div>
                      <div className="text-xs text-green-600">Muito bom</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">05/11/2023</div>
                      <div className="text-xs text-slate-500">há 6 meses</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-yellow-600 transition-colors">
                        <i className="far fa-star"></i>
                      </button>
                      <button className="p-2 text-pastel-blue hover:text-slate-600 transition-colors">
                        <i className="fas fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Fernando Lima" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                          Fernando Lima
                          <i className="fas fa-star text-yellow-500 text-xs"></i>
                        </h3>
                        <p className="text-xs text-slate-500 truncate">Economista Chefe - Instituição Financeira</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-blue text-slate-700 rounded text-xs">BACEN</span>
                          <span className="px-2 py-0.5 bg-pastel-purple text-slate-700 rounded text-xs">Política Monetária</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">64 publicações</div>
                      <div className="text-xs text-slate-500">Último: hoje</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-green-700">91/100</div>
                      <div className="text-xs text-green-600">Excelente</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">18/02/2022</div>
                      <div className="text-xs text-slate-500">há 2 anos</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors">
                        <i className="fas fa-star"></i>
                      </button>
                      <button className="p-2 text-pastel-blue hover:text-slate-600 transition-colors">
                        <i className="fas fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" alt="Ricardo Almeida" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate">Ricardo Almeida</h3>
                        <p className="text-xs text-slate-500 truncate">VP de Produtos - Processadora de Pagamentos</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs">PIX</span>
                          <span className="px-2 py-0.5 bg-pastel-pink text-slate-700 rounded text-xs">TED/DOC</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">29 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 5 dias</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-yellow-700">56/100</div>
                      <div className="text-xs text-yellow-600">Bom</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">30/09/2023</div>
                      <div className="text-xs text-slate-500">há 7 meses</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-yellow-600 transition-colors">
                        <i className="far fa-star"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-pastel-blue transition-colors">
                        <i className="far fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Patricia Rocha" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate">Patricia Rocha</h3>
                        <p className="text-xs text-slate-500 truncate">Diretora Jurídica - CVM</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-purple text-slate-700 rounded text-xs">CVM</span>
                          <span className="px-2 py-0.5 bg-pastel-yellow text-slate-700 rounded text-xs">Regulação</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">51 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 2 dias</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-green-700">71/100</div>
                      <div className="text-xs text-green-600">Muito bom</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">14/06/2023</div>
                      <div className="text-xs text-slate-500">há 10 meses</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-yellow-600 transition-colors">
                        <i className="far fa-star"></i>
                      </button>
                      <button className="p-2 text-pastel-blue hover:text-slate-600 transition-colors">
                        <i className="fas fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Eduardo Ferreira" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate">Eduardo Ferreira</h3>
                        <p className="text-xs text-slate-500 truncate">Gestor de Fundos - Asset Management</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-blue text-slate-700 rounded text-xs">Fundos</span>
                          <span className="px-2 py-0.5 bg-pastel-peach text-slate-700 rounded text-xs">Renda Variável</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">47 publicações</div>
                      <div className="text-xs text-slate-500">Último: ontem</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-yellow-700">68/100</div>
                      <div className="text-xs text-yellow-600">Bom</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">27/04/2023</div>
                      <div className="text-xs text-slate-500">há 11 meses</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-yellow-600 transition-colors">
                        <i className="far fa-star"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-pastel-blue transition-colors">
                        <i className="far fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Lucas Martins" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                          Lucas Martins
                          <i className="fas fa-star text-yellow-500 text-xs"></i>
                        </h3>
                        <p className="text-xs text-slate-500 truncate">CTO - Fintech Inovadora</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs">Open Banking</span>
                          <span className="px-2 py-0.5 bg-pastel-pink text-slate-700 rounded text-xs">APIs</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-slate-700">33 publicações</div>
                      <div className="text-xs text-slate-500">Último: há 1 semana</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-green-700">84/100</div>
                      <div className="text-xs text-green-600">Muito bom</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-slate-700">11/10/2023</div>
                      <div className="text-xs text-slate-500">há 7 meses</div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors">
                        <i className="fas fa-star"></i>
                      </button>
                      <button className="p-2 text-pastel-blue hover:text-slate-600 transition-colors">
                        <i className="fas fa-bell"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <ChevronLeft size={16} className="inline mr-2" />Anterior
                  </button>
                  <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium">1</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">2</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">3</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">4</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">5</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    Próximo<ChevronRight size={16} className="inline ml-2" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Seguir Novo Autor</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome do Autor</label>
                <input type="text" placeholder="Digite o nome" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Análise de Mercado</option>
                  <option>Regulamentação</option>
                  <option>Meios de Pagamento</option>
                  <option>Investimentos</option>
                  <option>Banking &amp; Fintech</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                <input type="text" placeholder="Adicione tags separadas por vírgula" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="enable-notifications" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                <label htmlFor="enable-notifications" className="text-sm text-slate-700">Ativar notificações</label>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Seguir
                </button>
                <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default Autores;