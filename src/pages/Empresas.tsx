import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, ChevronRight, GraduationCap, UserCheck, Users, Building2, Star, MapPin, Globe, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Empresas = () => {
  const navigate = useNavigate();

  const empresas = [
    {
      id: 1,
      name: "Nubank",
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop",
      category: "Banco Digital",
      location: "São Paulo, SP",
      employees: "5000+",
      rating: 4.8,
      reviews: 1234,
      description: "Líder em serviços financeiros digitais na América Latina",
      tags: ["Fintech", "Banking", "Cartões"],
      website: "nubank.com.br",
      followers: 45600
    },
    {
      id: 2,
      name: "Stone",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      category: "Adquirente",
      location: "Rio de Janeiro, RJ",
      employees: "3000+",
      rating: 4.6,
      reviews: 892,
      description: "Soluções de pagamento e serviços financeiros para empresas",
      tags: ["Pagamentos", "Maquininhas", "POS"],
      website: "stone.com.br",
      followers: 32400
    },
    {
      id: 3,
      name: "PagSeguro",
      logo: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=100&h=100&fit=crop",
      category: "Fintech",
      location: "São Paulo, SP",
      employees: "2500+",
      rating: 4.5,
      reviews: 756,
      description: "Plataforma completa de pagamentos e serviços financeiros",
      tags: ["Pagamentos", "E-commerce", "Banking"],
      website: "pagseguro.com.br",
      followers: 28900
    },
    {
      id: 4,
      name: "Mercado Pago",
      logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&h=100&fit=crop",
      category: "Fintech",
      location: "São Paulo, SP",
      employees: "4000+",
      rating: 4.7,
      reviews: 1089,
      description: "Solução de pagamentos do Mercado Livre",
      tags: ["Pagamentos", "Wallet", "E-commerce"],
      website: "mercadopago.com.br",
      followers: 52300
    },
    {
      id: 5,
      name: "Banco Inter",
      logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop",
      category: "Banco Digital",
      location: "Belo Horizonte, MG",
      employees: "3500+",
      rating: 4.4,
      reviews: 645,
      description: "Banco digital com conta corrente sem tarifas",
      tags: ["Banking", "Investimentos", "Digital"],
      website: "bancointer.com.br",
      followers: 38700
    },
    {
      id: 6,
      name: "Creditas",
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
      category: "Fintech de Crédito",
      location: "São Paulo, SP",
      employees: "1800+",
      rating: 4.3,
      reviews: 523,
      description: "Plataforma de crédito com garantia",
      tags: ["Crédito", "Empréstimos", "Financiamento"],
      website: "creditas.com",
      followers: 24500
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-pastel-gray-dark hover:bg-slate-200 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Empresas do Setor Financeiro</h1>
                <p className="text-sm text-slate-500 mt-1">Conheça as principais empresas e instituições do mercado</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar empresas..." 
                  className="w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <i className="fas fa-filter mr-2"></i>
                Filtros
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            <aside className="w-80 space-y-6">
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Filtrar por Setor</h2>
                  <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Bancos Digitais', count: 45, color: '#7FA8C9' },
                    { name: 'Fintechs', count: 178, color: '#A68CC9' },
                    { name: 'Adquirentes', count: 32, color: '#8CC99B' },
                    { name: 'Processadoras', count: 28, color: '#C9B88C' },
                    { name: 'Instituições de Crédito', count: 56, color: '#C99B8C' },
                    { name: 'Seguradoras', count: 67, color: '#E8C5D8' }
                  ].map((category) => (
                    <label key={category.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <i className="fas fa-circle" style={{ fontSize: '8px', color: category.color }}></i>
                      <span className="text-sm text-slate-700 flex-1">{category.name}</span>
                      <span className="text-xs text-slate-500">{category.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Porte da Empresa</h2>
                <div className="space-y-2">
                  {[
                    { name: 'Startup (1-50)', count: 89 },
                    { name: 'Pequeno Porte (51-200)', count: 134 },
                    { name: 'Médio Porte (201-1000)', count: 78 },
                    { name: 'Grande Porte (1000+)', count: 45 }
                  ].map((size) => (
                    <label key={size.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{size.name}</span>
                      <span className="text-xs text-slate-500">{size.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Localização</h2>
                <div className="space-y-2">
                  {[
                    { name: 'São Paulo, SP', count: 234 },
                    { name: 'Rio de Janeiro, RJ', count: 89 },
                    { name: 'Belo Horizonte, MG', count: 56 },
                    { name: 'Brasília, DF', count: 43 },
                    { name: 'Curitiba, PR', count: 38 }
                  ].map((location) => (
                    <label key={location.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{location.name}</span>
                      <span className="text-xs text-slate-500">{location.count}</span>
                    </label>
                  ))}
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
                        <option>Mais seguidas</option>
                        <option>Melhor avaliadas</option>
                        <option>Maior crescimento</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2">
                      <i className="fas fa-layer-group"></i>
                      <span>Todas</span>
                    </button>
                    <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium">
                      <Star size={16} />
                      <span>Favoritas</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Navigation Tabs */}
              <section className="bg-white rounded-xl p-4 border-2 border-slate-300">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate("/mentores")}
                    className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <GraduationCap size={18} />
                    Mentores
                  </button>
                  <button 
                    onClick={() => navigate("/autores")}
                    className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <UserCheck size={18} />
                    Seguindo
                  </button>
                  <button 
                    onClick={() => navigate("/seguidores")}
                    className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <Users size={18} />
                    Seguidores
                  </button>
                  <button 
                    onClick={() => navigate("/descobrir-novos")}
                    className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <Search size={18} />
                    Descobrir Novos
                  </button>
                  <button 
                    className="px-6 py-2.5 bg-[hsl(142,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <Building2 size={18} />
                    Empresas
                  </button>
                </div>
              </section>

              {/* Company List */}
              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-200">
                  {empresas.map((empresa) => (
                    <div key={empresa.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex gap-6">
                        <img 
                          src={empresa.logo} 
                          alt={empresa.name}
                          className="w-24 h-24 rounded-xl object-cover border-2 border-slate-300 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-800 mb-1">{empresa.name}</h3>
                              <p className="text-sm text-slate-600">{empresa.category}</p>
                            </div>
                            <button className="px-4 py-2 bg-pastel-blue hover:bg-pastel-pink text-slate-700 rounded-lg text-sm font-medium transition">
                              <Star size={14} className="inline mr-1" />
                              Seguir
                            </button>
                          </div>
                          
                          <p className="text-sm text-slate-600 mb-3">{empresa.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-slate-600 mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{empresa.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{empresa.employees} funcionários</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Globe size={14} />
                              <span>{empresa.website}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {empresa.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-slate-400 text-white rounded-full text-xs font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={i < Math.floor(empresa.rating) ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-semibold text-slate-700 ml-1">{empresa.rating}</span>
                                <span className="text-xs text-slate-500">({empresa.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-slate-600">
                                <TrendingUp size={14} className="text-pastel-green" />
                                <span>{empresa.followers.toLocaleString()} seguidores</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pagination */}
              <section className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition border-2 border-transparent">
                    <ChevronLeft className="mr-2" size={16} />
                    Anterior
                  </button>
                  <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium">1</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition">2</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition">3</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition">4</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition border-2 border-transparent">
                    Próximo
                    <ChevronRight className="ml-2" size={16} />
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

export default Empresas;
