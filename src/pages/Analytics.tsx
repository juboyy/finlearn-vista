import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, Download, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Area, AreaChart, Legend } from 'recharts';

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month'>('month');

  const agentData = [
    { name: 'Analista Mercado', value: 1254 },
    { name: 'Compliance', value: 892 },
    { name: 'Esp. Câmbio', value: 654 },
    { name: 'Gestor Risco', value: 540 },
    { name: 'Consultor Portfólio', value: 480 }
  ];

  const barColors = ['#8AAACF', '#AC9CC9', '#8EBC9F', '#C9AF89', '#CC99A9'];

  const pieData = [
    { name: 'Regulação', value: 35 },
    { name: 'Mercado de Capitais', value: 25 },
    { name: 'Meios de Pagamento', value: 20 },
    { name: 'Macroeconomia', value: 15 },
    { name: 'Outros', value: 5 }
  ];

  const pieColors = ['#8AAACF', '#AC9CC9', '#8EBC9F', '#C9AF89', '#F3F4F6'];

  const trendData = [
    { name: 'Seg', value: 1200 },
    { name: 'Ter', value: 1450 },
    { name: 'Qua', value: 1300 },
    { name: 'Qui', value: 1600 },
    { name: 'Sex', value: 1550 },
    { name: 'Sáb', value: 900 },
    { name: 'Dom', value: 850 }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Painel de Analytics</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Monitoramento de dados, consumo de conteúdo e performance.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-hover:text-slate-700 transition-colors" />
              <input
                type="text"
                placeholder="Buscar métricas..."
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 w-64 transition-all shadow-sm text-slate-600 placeholder-slate-400"
              />
            </div>
            <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Botões Rápidos</h2>
              <p className="text-sm text-slate-500 mt-1">Acesso direto às principais áreas de análise</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { icon: 'fa-robot', label: 'AI Agents', color: 'bg-pastel-purple' },
                { icon: 'fa-chart-area', label: 'Consumo', color: 'bg-pastel-green' },
                { icon: 'fa-gauge-high', label: 'Performance', color: 'bg-pastel-blue' },
                { icon: 'fa-file-lines', label: 'Conteúdo', color: 'bg-pastel-peach' },
                { icon: 'fa-user-circle', label: 'Perfil', color: 'bg-pastel-pink' }
              ].map((btn, idx) => (
                <button key={idx} className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-xl ${btn.color} flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform`}>
                    <i className={`fa-solid ${btn.icon} text-2xl`}></i>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{btn.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Resumo Geral</h2>
              <p className="text-sm text-slate-500 mt-1">Principais indicadores de desempenho da plataforma</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total de Consultas', value: '124.5k', icon: 'fa-magnifying-glass-chart', color: 'bg-pastel-blue', trend: '+12%', trendUp: true },
                { title: 'Interações com Agentes', value: '8.2k', icon: 'fa-robot', color: 'bg-pastel-purple', trend: '+5.4%', trendUp: true },
                { title: 'Artigos Lidos', value: '45.9k', icon: 'fa-book-open-reader', color: 'bg-pastel-green', trend: '-2.1%', trendUp: false },
                { title: 'Tempo Médio (Sessão)', value: '14m 22s', icon: 'fa-clock', color: 'bg-pastel-peach', trend: '+8.3%', trendUp: true }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">{kpi.title}</p>
                      <h3 className="text-3xl font-bold text-slate-800 mt-2">{kpi.value}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${kpi.color} flex items-center justify-center text-slate-600`}>
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
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl lg:col-span-2 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Performance dos Agentes</h2>
                  <p className="text-sm text-slate-500 mt-1">Volume de conversas iniciadas por agente especializado</p>
                </div>
                <div className="flex gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100">
                  <button
                    onClick={() => setTimeFilter('week')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      timeFilter === 'week' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Semana
                  </button>
                  <button
                    onClick={() => setTimeFilter('month')}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      timeFilter === 'month' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Mês
                  </button>
                </div>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {agentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Categorias de Conteúdo</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por tema de interesse</p>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pastel-pink flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Termos de Busca</h2>
                    <p className="text-sm text-slate-500">O que os profissionais estão procurando</p>
                  </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-700 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { rank: 1, term: 'Regulação Open Finance', progress: 85, count: '2.4k' },
                  { rank: 2, term: 'Análise de Crédito PJ', progress: 72, count: '1.8k' },
                  { rank: 3, term: 'Indicadores Macroeconômicos', progress: 65, count: '1.5k' },
                  { rank: 4, term: 'Compliance e LGPD', progress: 50, count: '1.1k' },
                  { rank: 5, term: 'Derivativos Agrícolas', progress: 45, count: '980' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between group p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">{item.rank}</div>
                      <span className="text-sm font-semibold text-slate-700">{item.term}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-pastel-pink rounded-full" style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-600 w-8 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pastel-green flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-chart-area"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Tendência de Consumo</h2>
                    <p className="text-sm text-slate-500">Visualizações diárias de artigos</p>
                  </div>
                </div>
              </div>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8EBC9F" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8EBC9F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="value" stroke="#8EBC9F" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Detalhamento por Agente</h2>
                <p className="text-sm text-slate-500 mt-1">Métricas detalhadas de satisfação e engajamento</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
                  <Download size={16} />
                  Exportar CSV
                </button>
                <button className="px-4 py-2 text-sm font-bold text-white bg-slate-800 rounded-lg hover:bg-slate-700 flex items-center gap-2 shadow-sm transition-all">
                  <Filter size={16} />
                  Filtros
                </button>
              </div>
            </div>
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Agente</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Conversas</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Avaliação</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Analista de Mercado', subtitle: 'Análise Técnica', icon: 'fa-chart-simple', color: 'bg-pastel-blue', category: 'Mercados', conversations: '1.254', rating: '4.8', status: 'Ativo', statusColor: 'bg-emerald-100 text-emerald-700' },
                    { name: 'Consultor de Compliance', subtitle: 'Regulamentação', icon: 'fa-scale-balanced', color: 'bg-pastel-purple', category: 'Jurídico', conversations: '892', rating: '4.7', status: 'Ativo', statusColor: 'bg-emerald-100 text-emerald-700' },
                    { name: 'Especialista em Câmbio', subtitle: 'Moedas Estrangeiras', icon: 'fa-coins', color: 'bg-pastel-green', category: 'FX', conversations: '654', rating: '4.9', status: 'Manutenção', statusColor: 'bg-amber-100 text-amber-700' },
                    { name: 'Gestor de Risco', subtitle: 'Análise de Risco', icon: 'fa-shield-halved', color: 'bg-pastel-peach', category: 'Gestão', conversations: '540', rating: '4.6', status: 'Ativo', statusColor: 'bg-emerald-100 text-emerald-700' }
                  ].map((agent, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${agent.color} flex items-center justify-center text-slate-600 text-lg`}>
                            <i className={`fa-solid ${agent.icon}`}></i>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{agent.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{agent.subtitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">{agent.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-600 font-semibold">{agent.conversations}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-sm font-bold text-slate-800">{agent.rating}</span>
                          <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${agent.statusColor}`}>{agent.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className={`px-4 py-1.5 rounded-lg ${agent.color} text-slate-700 text-xs font-bold hover:opacity-90 transition-colors`}>Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-white">
              <span className="text-xs font-medium text-slate-500">Mostrando 1-4 de 12 agentes</span>
              <div className="flex gap-2">
                <button disabled className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 shadow-sm">Anterior</button>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm">Próximo</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Analytics;