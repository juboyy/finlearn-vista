import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, Legend 
} from 'recharts';

const PerfilAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState<'6months' | 'year' | 'all'>('year');

  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  const visitsData = months.map((month, i) => ({
    name: month,
    value: [12400, 13200, 14800, 15600, 16900, 17200, 18100, 17800, 18400, 19200, 19800, 18400][i]
  }));

  const followersData = months.map((month, i) => ({
    name: month,
    value: [180, 210, 245, 280, 295, 310, 325, 315, 330, 342, 355, 347][i]
  }));

  const newFollowersData = months.map((month, i) => ({
    name: month,
    value: [180, 210, 245, 280, 295, 310, 325, 315, 330, 342, 355, 347][i]
  }));

  const readingRateData = months.map((month, i) => ({
    name: month,
    views: [3200, 3400, 3800, 3950, 4100, 4250, 4400, 4300, 4500, 4650, 4800, 4700][i],
    rate: [62, 65, 64, 67, 66, 68, 69, 67, 68, 70, 71, 68][i]
  }));

  const readersFollowersData = months.map((month, i) => ({
    name: month,
    nonFollowers: [850, 920, 1050, 1100, 1150, 1180, 1220, 1200, 1250, 1280, 1300, 1240][i],
    followers: [1400, 1520, 1680, 1750, 1820, 1900, 1950, 1920, 1980, 2050, 2100, 2080][i]
  }));

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics do Perfil Creator</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Acompanhe o desempenho do seu perfil e engajamento com seu público</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--pastel-gray-dark))] w-4 h-4 group-hover:text-slate-700 transition-colors" />
              <input
                type="text"
                placeholder="Buscar métricas..."
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 w-64 transition-all shadow-sm text-slate-600 placeholder-slate-400"
              />
            </div>
            <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[hsl(var(--pastel-gray-dark))] hover:bg-slate-50 hover:text-slate-700 transition-colors relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <section className="glass-card bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-start gap-6">
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                alt="Perfil"
                className="w-24 h-24 rounded-xl object-cover border-2 border-slate-100 shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Carlos Mendes</h2>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Analista de Mercado de Capitais | Especialista em Regulação Financeira</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-users text-[hsl(var(--pastel-gray-dark))] text-sm"></i>
                        <span className="text-sm font-bold text-slate-700">2.847 seguidores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-newspaper text-[hsl(var(--pastel-gray-dark))] text-sm"></i>
                        <span className="text-sm font-bold text-slate-700">124 artigos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-envelope text-[hsl(var(--pastel-gray-dark))] text-sm"></i>
                        <span className="text-sm font-bold text-slate-700">1.523 inscritos</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-pastel-pinkBtn text-white text-sm font-bold rounded-lg hover:opacity-90 transition-all shadow-sm">
                    <i className="fa-solid fa-pen text-xs mr-2"></i>Editar Perfil
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Desempenho Mensal</h2>
              <p className="text-sm text-slate-500 mt-1">Análise detalhada do seu crescimento e engajamento</p>
            </div>
            <div className="flex gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100">
              <button
                onClick={() => setTimeFilter('6months')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                  timeFilter === '6months' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-white'
                }`}
              >
                Últimos 6 meses
              </button>
              <button
                onClick={() => setTimeFilter('year')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                  timeFilter === 'year' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-white'
                }`}
              >
                Último ano
              </button>
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                  timeFilter === 'all' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-white'
                }`}
              >
                Todo período
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Visitas ao Perfil', value: '18.4k', icon: 'fa-eye', color: 'bg-pastel-blue', trend: '+23%', trendUp: true },
              { title: 'Novos Seguidores', value: '347', icon: 'fa-user-plus', color: 'bg-pastel-green', trend: '+18%', trendUp: true },
              { title: 'Leitores Não-Seguidores', value: '1.2k', icon: 'fa-user-check', color: 'bg-pastel-purple', trend: '+15%', trendUp: true },
              { title: 'Taxa de Conversão Newsletter', value: '53.5%', icon: 'fa-envelope-open-text', color: 'bg-pastel-orange', trend: '+7%', trendUp: true }
            ].map((kpi, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start z-10">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{kpi.title}</p>
                    <h3 className="text-3xl font-bold text-slate-800 mt-2">{kpi.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${kpi.color} flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]`}>
                    <i className={`fa-solid ${kpi.icon} text-lg`}></i>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto z-10">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${kpi.trendUp ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
                    <i className={`fa-solid ${kpi.trendUp ? 'fa-arrow-up' : 'fa-arrow-down'} text-[10px]`}></i> {kpi.trend}
                  </span>
                  <span className="text-xs font-medium text-slate-400">vs. mês anterior</span>
                </div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Visitas ao Perfil</h2>
                <p className="text-sm text-slate-500 mt-1">Evolução mensal de visualizações do seu perfil</p>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitsData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8AAACF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8AAACF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="value" stroke="#8AAACF" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Novos Seguidores</h2>
                <p className="text-sm text-slate-500 mt-1">Crescimento mensal da sua base de seguidores</p>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={followersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value" fill="#8EBC9F" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Pessoas que Começaram a Seguir</h2>
                <p className="text-sm text-slate-500 mt-1">Novos seguidores ao longo do tempo</p>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={newFollowersData}>
                    <defs>
                      <linearGradient id="colorNewFollowers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#CC99A9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#CC99A9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="value" stroke="#CC99A9" strokeWidth={3} fillOpacity={1} fill="url(#colorNewFollowers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Taxa de Leitura de Artigos</h2>
                <p className="text-sm text-slate-500 mt-1">Artigos lidos vs visualizações por mês</p>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={readingRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar yAxisId="left" dataKey="views" fill="#AC9CC9" name="Visualizações" radius={[8, 8, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#C9AF89" strokeWidth={3} name="Taxa (%)" dot={{ fill: '#C9AF89', r: 4 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Leitores vs Seguidores</h2>
                  <p className="text-sm text-slate-500">Potencial de conversão de leitores em seguidores</p>
                </div>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={readersFollowersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="nonFollowers" fill="#AC9CC9" name="Leitores Não-Seguidores" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="followers" fill="#8EBC9F" name="Seguidores que Leram" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-pastel-orange flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Inscritos na Newsletter</h2>
                  <p className="text-sm text-slate-500">Quantos seguidores assinam sua newsletter</p>
                </div>
              </div>
              <div className="space-y-6 mt-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">Seguidores Inscritos</span>
                    <span className="text-sm font-bold text-slate-800">1.523 / 2.847</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-pastel-orangeBtn rounded-full" style={{ width: '53.5%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">53.5% dos seus seguidores assinam sua newsletter</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-check-circle text-emerald-600 text-sm"></i>
                      <span className="text-xs font-semibold text-slate-500">Inscritos Ativos</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">1.523</p>
                    <p className="text-xs text-slate-500 mt-1">Recebem emails</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-user-minus text-[hsl(var(--pastel-gray-dark))] text-sm"></i>
                      <span className="text-xs font-semibold text-slate-500">Não Inscritos</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">1.324</p>
                    <p className="text-xs text-slate-500 mt-1">Potencial de conversão</p>
                  </div>
                </div>

                <div className="p-4 bg-pastel-orange/10 rounded-xl border border-pastel-orange/20">
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-lightbulb text-pastel-orangeText mt-0.5"></i>
                    <div>
                      <p className="text-sm font-bold text-pastel-orangeText">Dica de Crescimento</p>
                      <p className="text-xs text-slate-600 mt-1">Você tem 1.324 seguidores que ainda não assinam sua newsletter. Crie conteúdo exclusivo para incentivar inscrições!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Artigos Mais Lidos</h2>
                <p className="text-sm text-slate-500 mt-1">Seu conteúdo com melhor performance no último mês</p>
              </div>
              <button className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
                <i className="fa-solid fa-arrow-right text-[hsl(var(--pastel-gray-dark))]"></i> Ver Todos
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Análise Completa: Nova Regulação do Open Finance no Brasil', days: '5 dias', views: '3.2k', reads: '2.1k', rate: '65%', color: 'bg-pastel-blue' },
                { title: 'Guia Prático: Como Avaliar Risco de Crédito para Empresas', days: '12 dias', views: '2.8k', reads: '1.9k', rate: '68%', color: 'bg-pastel-green' },
                { title: 'Tendências de Mercado: O Futuro dos Meios de Pagamento em 2024', days: '18 dias', views: '2.5k', reads: '1.6k', rate: '64%', color: 'bg-pastel-purple' },
                { title: 'Compliance Financeiro: Principais Mudanças na LGPD para 2024', days: '25 dias', views: '2.2k', reads: '1.4k', rate: '63%', color: 'bg-pastel-pink' }
              ].map((article, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg ${article.color} flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]`}>
                      <i className="fa-solid fa-newspaper text-lg"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 truncate">{article.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">Publicado há {article.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-slate-500">Visualizações</p>
                      <p className="text-lg font-bold text-slate-800">{article.views}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-slate-500">Leituras</p>
                      <p className="text-lg font-bold text-slate-800">{article.reads}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-slate-500">Taxa</p>
                      <p className="text-lg font-bold text-emerald-700">{article.rate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-slate-200 p-6 rounded-xl">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">Insights do Público</h2>
              <p className="text-sm text-slate-500 mt-1">Entenda melhor quem está lendo seu conteúdo</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pastel-blue flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Principais Setores</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Bancos e Fintechs', value: '42%' },
                    { label: 'Consultorias', value: '28%' },
                    { label: 'Reguladores', value: '18%' },
                    { label: 'Outros', value: '12%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <span className="text-sm font-bold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pastel-green flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Nível de Senioridade</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Sênior/C-Level', value: '35%' },
                    { label: 'Pleno', value: '38%' },
                    { label: 'Júnior', value: '20%' },
                    { label: 'Estudantes', value: '7%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <span className="text-sm font-bold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pastel-purple flex items-center justify-center text-[hsl(var(--pastel-gray-dark))]">
                    <i className="fa-solid fa-map-marker-alt"></i>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Principais Regiões</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'São Paulo', value: '48%' },
                    { label: 'Rio de Janeiro', value: '22%' },
                    { label: 'Brasília', value: '15%' },
                    { label: 'Outras', value: '15%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <span className="text-sm font-bold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PerfilAnalytics;