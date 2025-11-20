import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DescobrirNovos = () => {
  const navigate = useNavigate();

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
                <h1 className="text-2xl font-semibold text-slate-800">Descobrir Novos Autores</h1>
                <p className="text-sm text-slate-500 mt-1">Encontre especialistas do mercado financeiro para seguir</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar autores..." 
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
          <section className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
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
                    <option>Mais seguidos</option>
                    <option>Mais ativos</option>
                    <option>Novos autores</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/estatisticas')}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition flex items-center gap-2 font-medium"
                >
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

          <section className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/autores')}
                className="px-6 py-2.5 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
              >
                <i className="fas fa-user-check"></i>
                <span>Seguindo</span>
              </button>
              <button 
                onClick={() => navigate('/seguidores')}
                className="px-6 py-2.5 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
              >
                <i className="fas fa-users"></i>
                <span>Seguidores</span>
              </button>
              <button className="px-6 py-2.5 bg-pastel-purple text-slate-700 rounded-lg font-medium flex items-center gap-2">
                <i className="fas fa-compass"></i>
                <span>Descobrir Novos</span>
              </button>
            </div>
          </section>

          <div className="flex gap-6">
            <aside className="w-80 space-y-6">
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Filtrar por Categoria</h2>
                  <button className="text-xs text-slate-500 hover:text-slate-700">Limpar</button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Análise de Mercado', count: 156, color: '#7FA8C9' },
                    { name: 'Regulamentação', count: 89, color: '#A68CC9' },
                    { name: 'Meios de Pagamento', count: 124, color: '#8CC99B' },
                    { name: 'Investimentos', count: 198, color: '#C9B88C' },
                    { name: 'Banking & Fintech', count: 143, color: '#C99B8C' },
                    { name: 'Cartões', count: 76, color: '#E8C5D8' }
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
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Nível de Expertise</h2>
                <div className="space-y-2">
                  {['Todos os níveis', 'Iniciante', 'Intermediário', 'Especialista'].map((level) => (
                    <label key={level} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="radio" name="expertise" className="w-4 h-4 text-pastel-blue focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{level}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Frequência de Publicação</h2>
                <div className="space-y-2">
                  {[
                    { name: 'Diário', count: 34 },
                    { name: 'Semanal', count: 128 },
                    { name: 'Mensal', count: 245 }
                  ].map((freq) => (
                    <label key={freq.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{freq.name}</span>
                      <span className="text-xs text-slate-500">{freq.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Tipo de Instituição</h2>
                <div className="space-y-2">
                  {[
                    { name: 'Banco', count: 98 },
                    { name: 'Fintech', count: 156 },
                    { name: 'Corretora', count: 67 },
                    { name: 'Regulador', count: 23 },
                    { name: 'Consultoria', count: 89 }
                  ].map((inst) => (
                    <label key={inst.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 text-pastel-blue rounded focus:ring-2 focus:ring-pastel-blue" />
                      <span className="text-sm text-slate-700 flex-1">{inst.name}</span>
                      <span className="text-xs text-slate-500">{inst.count}</span>
                    </label>
                  ))}
                </div>
              </section>
            </aside>

            <div className="flex-1 space-y-6">
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">Autores em Destaque</h2>
                    <p className="text-sm text-slate-500 mt-1">Profissionais mais influentes do mercado</p>
                  </div>
                  <button className="text-sm text-pastel-blue hover:text-slate-700 font-medium">
                    Ver todos <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: 'Beatriz Campos', title: 'CEO - Fintech Payments Pro', avatar: 'avatar-5.jpg', tags: ['PIX', 'Open Finance'], articles: 89, followers: '2.4k' },
                    { name: 'Rafael Torres', title: 'Diretor CVM', avatar: 'avatar-3.jpg', tags: ['CVM', 'Regulação'], articles: 124, followers: '3.8k' },
                    { name: 'Camila Rodrigues', title: 'Head - Banco Digital XYZ', avatar: 'avatar-6.jpg', tags: ['Renda Fixa', 'B3'], articles: 156, followers: '5.2k' }
                  ].map((author, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer border border-slate-100">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <img 
                            src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${author.avatar}`} 
                            alt={author.name} 
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-pastel-yellow rounded-full flex items-center justify-center border-2 border-white">
                            <i className="fas fa-crown text-slate-700 text-xs"></i>
                          </div>
                        </div>
                        <h3 className="font-semibold text-slate-800 mb-1">{author.name}</h3>
                        <p className="text-xs text-slate-500 mb-3">{author.title}</p>
                        <div className="flex items-center gap-2 mb-4">
                          {author.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-pastel-green text-slate-700 rounded text-xs">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mb-4 text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <i className="fas fa-newspaper"></i>
                            <span>{author.articles} artigos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <i className="fas fa-users"></i>
                            <span>{author.followers}</span>
                          </div>
                        </div>
                        <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                          <i className="fas fa-user-plus mr-2"></i>Seguir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">Recomendados para Você</h2>
                    <p className="text-sm text-slate-500 mt-1">Baseado nos seus interesses e leituras</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                      <option>Mais relevantes</option>
                      <option>Mais seguidos</option>
                      <option>Mais ativos</option>
                      <option>Novos autores</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Gustavo Pereira', title: 'VP Tecnologia - Processadora Nacional', avatar: 'avatar-8.jpg', tags: ['PIX', 'APIs', 'Open Banking'], articles: 43, followers: '1.2k', activity: 'Ativo há 2 dias', isNew: true },
                    { name: 'Larissa Monteiro', title: 'Especialista ESG - Asset Management', avatar: 'avatar-7.jpg', tags: ['ESG', 'Sustentabilidade', 'Investimentos'], articles: 67, followers: '2.8k', activity: 'Ativo há 1 dia', isNew: false },
                    { name: 'Thiago Barbosa', title: 'Economista Sênior - Banco Central', avatar: 'avatar-4.jpg', tags: ['BACEN', 'Política Monetária', 'Inflação'], articles: 98, followers: '4.5k', activity: 'Ativo hoje', isCertified: true },
                    { name: 'Renata Cardoso', title: 'Diretora Compliance - Instituição Financeira', avatar: 'avatar-1.jpg', tags: ['Compliance', 'LGPD', 'Auditoria'], articles: 72, followers: '3.1k', activity: 'Ativo há 3 dias', isNew: false },
                    { name: 'Marcelo Tavares', title: 'Fundador - Fintech Cartões Digital', avatar: 'avatar-9.jpg', tags: ['Cartões', 'Adquirência', 'Fintech'], articles: 38, followers: '987', activity: 'Ativo há 1 dia', isNew: true }
                  ].map((author, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <img 
                        src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${author.avatar}`} 
                        alt={author.name} 
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                          {author.name}
                          {author.isNew && <span className="px-2 py-0.5 bg-pastel-green text-slate-700 rounded text-xs font-normal">Novo</span>}
                          {author.isCertified && <i className="fas fa-certificate text-pastel-purple text-xs"></i>}
                        </h3>
                        <p className="text-sm text-slate-500 mb-2">{author.title}</p>
                        <div className="flex items-center gap-2 mb-2">
                          {author.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-pastel-blue text-slate-700 rounded text-xs">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-600">
                          <span><i className="fas fa-newspaper mr-1"></i>{author.articles} artigos</span>
                          <span><i className="fas fa-users mr-1"></i>{author.followers} seguidores</span>
                          <span><i className="fas fa-clock mr-1"></i>{author.activity}</span>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex-shrink-0">
                        <i className="fas fa-user-plus mr-2"></i>Seguir
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">Em Alta Esta Semana</h2>
                    <p className="text-sm text-slate-500 mt-1">Autores com maior engajamento recente</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'André Souza', title: 'Analista - Corretora Premium', avatar: 'avatar-2.jpg', growth: '+340%', followers: '1.8k', rank: 1, badge: 'bg-pastel-yellow' },
                    { name: 'Daniela Costa', title: 'Gestora - Fundo Multimercado', avatar: 'avatar-5.jpg', growth: '+285%', followers: '2.3k', rank: 2, badge: 'bg-slate-300' },
                    { name: 'Felipe Moreira', title: 'Diretor - Open Finance BR', avatar: 'avatar-9.jpg', growth: '+198%', followers: '3.5k', rank: 3, badge: 'bg-amber-600 text-white' },
                    { name: 'Isabela Ramos', title: 'Especialista - Meios de Pagamento', avatar: 'avatar-6.jpg', growth: '+156%', followers: '2.9k', rank: 4, badge: 'bg-slate-400 text-white' }
                  ].map((author, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img 
                            src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${author.avatar}`} 
                            alt={author.name} 
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div className={`absolute -top-1 -left-1 w-6 h-6 ${author.badge} rounded-full flex items-center justify-center border-2 border-white`}>
                            <span className="text-xs font-bold text-slate-700">{author.rank}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 truncate">{author.name}</h3>
                        <p className="text-xs text-slate-500 truncate mb-2">{author.title}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          <span><i className="fas fa-fire text-red-500 mr-1"></i>{author.growth}</span>
                          <span><i className="fas fa-users mr-1"></i>{author.followers}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex-shrink-0">
                        Seguir
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">Novos na Plataforma</h2>
                    <p className="text-sm text-slate-500 mt-1">Profissionais que acabaram de se juntar</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { name: 'Lívia Santos', title: 'Analista - Banco XYZ', avatar: 'avatar-7.jpg', tag: 'Cartões' },
                    { name: 'Bruno Alves', title: 'Consultor - FinConsult', avatar: 'avatar-8.jpg', tag: 'Compliance' },
                    { name: 'Carla Mendes', title: 'Economista - Think Tank', avatar: 'avatar-1.jpg', tag: 'BACEN' },
                    { name: 'Diego Lima', title: 'VP - Fintech Payments', avatar: 'avatar-4.jpg', tag: 'PIX' }
                  ].map((author, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border border-slate-100">
                      <img 
                        src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${author.avatar}`} 
                        alt={author.name} 
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                      />
                      <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate">{author.name}</h3>
                      <p className="text-xs text-slate-500 mb-3 truncate">{author.title}</p>
                      <span className="inline-block px-2 py-1 bg-pastel-green text-slate-700 rounded text-xs mb-3">{author.tag}</span>
                      <button className="w-full px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg text-xs font-medium hover:bg-opacity-80 transition">
                        Seguir
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <ChevronLeft size={16} className="inline mr-2" />
                    Anterior
                  </button>
                  <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium">1</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">2</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">3</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">4</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">5</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    Próximo
                    <ChevronRight size={16} className="inline ml-2" />
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

export default DescobrirNovos;
