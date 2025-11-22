import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const AgentesAnalytics = () => {
  const navigate = useNavigate();
  const [trendView, setTrendView] = useState<'daily' | 'weekly'>('daily');
  const [comparativeView, setComparativeView] = useState<'performance' | 'efficiency' | 'satisfaction'>('performance');

  // Data for charts
  const interactionsData = [
    { name: 'Seg', value: 142 },
    { name: 'Ter', value: 168 },
    { name: 'Qua', value: 195 },
    { name: 'Qui', value: 187 },
    { name: 'Sex', value: 203 },
    { name: 'Sáb', value: 98 },
    { name: 'Dom', value: 76 }
  ];

  const agentsDistributionData = [
    { name: 'Analista de Mercado', value: 487 },
    { name: 'Compliance', value: 312 },
    { name: 'Consultor de Investimentos', value: 298 },
    { name: 'Calculadora Financeira', value: 150 }
  ];

  const categoryData = [
    { name: 'Análise de Ativos', value: 187 },
    { name: 'Compliance', value: 156 },
    { name: 'Estratégias', value: 143 },
    { name: 'Cálculos', value: 128 },
    { name: 'Tributação', value: 115 },
    { name: 'Educação', value: 92 }
  ];

  const interactionTypeData = [
    { name: 'Texto', value: 65 },
    { name: 'Voz', value: 22 },
    { name: 'Vídeo com Avatar', value: 13 }
  ];

  const peakHoursData = [
    { name: '6h', value: 12 },
    { name: '8h', value: 45 },
    { name: '10h', value: 78 },
    { name: '12h', value: 95 },
    { name: '14h', value: 142 },
    { name: '16h', value: 118 },
    { name: '18h', value: 87 },
    { name: '20h', value: 54 },
    { name: '22h', value: 28 }
  ];

  const satisfactionTrendData = [
    { name: 'Sem 1', value: 92 },
    { name: 'Sem 2', value: 94 },
    { name: 'Sem 3', value: 95 },
    { name: 'Sem 4', value: 96 }
  ];

  const engagementTrendData = [
    { name: 'Sem 1', value: 72 },
    { name: 'Sem 2', value: 75 },
    { name: 'Sem 3', value: 76 },
    { name: 'Sem 4', value: 78 }
  ];

  const comparativeChartData = [
    { name: 'Analista de Mercado', interactions: 487, time: 3.2, satisfaction: 98 },
    { name: 'Compliance', interactions: 312, time: 4.5, satisfaction: 95 },
    { name: 'Consultor', interactions: 298, time: 5.1, satisfaction: 97 },
    { name: 'Calculadora', interactions: 150, time: 2.1, satisfaction: 92 }
  ];

  const pieColors = ['#8AAACF', '#8EBC9F', '#AC9CC9', '#C9AF89', '#CC99A9', '#D4A89A'];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/analytics')}
                  className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[hsl(var(--pastel-gray-dark))] hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-slate-800">Analytics de Agentes IA</h1>
                  <p className="text-sm text-slate-500 mt-1">Análise detalhada de uso e performance dos assistentes inteligentes</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Últimos 30 dias</option>
                  <option>Últimos 7 dias</option>
                  <option>Últimos 90 dias</option>
                  <option>Este ano</option>
                </select>
                <button className="px-4 py-2 bg-pastel-purple text-slate-800 rounded-lg font-medium hover:opacity-90 transition">
                  <i className="fas fa-download mr-2"></i>Exportar Relatório
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Overview KPIs */}
          <section className="grid grid-cols-5 gap-6 mb-8">
            {[
              { icon: 'fa-comments', title: 'Total de Interações', value: '1,247', change: '+32%', color: 'bg-pastel-blue', changeType: 'green' },
              { icon: 'fa-clock', title: 'Tempo Total de Uso', value: '42.5h', change: '+18%', color: 'bg-pastel-green', changeType: 'green' },
              { icon: 'fa-star', title: 'Taxa de Satisfação', value: '96%', change: '4.8/5', color: 'bg-pastel-yellow', changeType: 'slate' },
              { icon: 'fa-brain', title: 'Precisão das Respostas', value: '89%', change: '+15%', color: 'bg-pastel-pink', changeType: 'blue' },
              { icon: 'fa-users', title: 'Usuários Ativos', value: '324', change: '+8', color: 'bg-pastel-purple', changeType: 'green' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <i className={`fas ${stat.icon} text-[hsl(var(--pastel-gray-dark))] text-xl`}></i>
                  </div>
                  <span className={`text-xs font-medium ${stat.changeType === 'green' ? 'text-green-600 bg-green-50' : stat.changeType === 'blue' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 bg-slate-50'} px-2 py-1 rounded`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-500">{stat.title}</p>
              </div>
            ))}
          </section>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Interações ao Longo do Tempo</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTrendView('daily')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${trendView === 'daily' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Diário
                  </button>
                  <button 
                    onClick={() => setTrendView('weekly')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${trendView === 'weekly' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Semanal
                  </button>
                </div>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={interactionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="value" stroke="#8AAACF" strokeWidth={3} name="Interações" fill="#8AAACF" fillOpacity={0.1} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Distribuição de Uso por Agente</h2>
                <span className="text-sm text-slate-500">Participação %</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={agentsDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {agentsDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        fontSize: '12px',
                        padding: '8px 12px'
                      }} 
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Performance Individual dos Agentes */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Performance Individual dos Agentes</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { name: 'Analista de Mercado', desc: 'Análise técnica e fundamentalista', icon: 'fa-chart-line', color: 'bg-pastel-blue', interactions: 487, time: '3.2 min', satisfaction: '98%', usage: 39 },
                { name: 'Especialista em Compliance', desc: 'Regulamentações e normas', icon: 'fa-balance-scale', color: 'bg-pastel-green', interactions: 312, time: '4.5 min', satisfaction: '95%', usage: 25 },
                { name: 'Consultor de Investimentos', desc: 'Estratégias e alocação', icon: 'fa-briefcase', color: 'bg-pastel-purple', interactions: 298, time: '5.1 min', satisfaction: '97%', usage: 24 },
                { name: 'Calculadora Financeira', desc: 'Cálculos e simulações', icon: 'fa-calculator', color: 'bg-pastel-yellow', interactions: 150, time: '2.1 min', satisfaction: '92%', usage: 12 },
                { name: 'Especialista em Cartões', desc: 'Produtos e bandeiras', icon: 'fa-credit-card', color: 'bg-pastel-pink', interactions: 243, time: '3.8 min', satisfaction: '96%', usage: 19 },
                { name: 'Especialista em SCD', desc: 'Sistema de Crédito Direto', icon: 'fa-file-invoice-dollar', color: 'bg-pastel-peach', interactions: 187, time: '4.2 min', satisfaction: '94%', usage: 15 }
              ].map((agent, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${agent.color} rounded-full flex items-center justify-center`}>
                        <i className={`fas ${agent.icon} text-[hsl(var(--pastel-gray-dark))] text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">{agent.name}</h3>
                        <p className="text-xs text-slate-500">{agent.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Interações</span>
                      <span className="text-sm font-bold text-slate-800">{agent.interactions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Tempo médio</span>
                      <span className="text-sm font-bold text-slate-800">{agent.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Satisfação</span>
                      <span className="text-sm font-bold text-green-600">{agent.satisfaction}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                      <div className={`${agent.color} h-2 rounded-full`} style={{ width: `${agent.usage}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500 text-center">{agent.usage}% do uso total</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Uso por Categoria e Tipo de Interação */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Uso por Categoria</h2>
                <span className="text-sm text-slate-500">Finalidade das consultas</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} angle={-45} textAnchor="end" height={100} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Tipo de Interação</h2>
                <span className="text-sm text-slate-500">Formato de comunicação</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={interactionTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {interactionTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        fontSize: '12px',
                        padding: '8px 12px'
                      }} 
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Horários de Pico, Tempo de Resposta e Satisfação */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Horários de Pico</h2>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value" fill="#8AAACF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Tempo de Resposta</h2>
              <div className="space-y-4">
                <div className="p-4 bg-pastel-blue rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Média Geral</span>
                    <span className="text-2xl font-bold text-slate-800">1.8s</span>
                  </div>
                  <p className="text-xs text-slate-600">Tempo médio de resposta dos agentes</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">Consultas Simples</span>
                      <span className="text-sm font-medium text-slate-800">0.9s</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-pastel-green h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">Consultas Médias</span>
                      <span className="text-sm font-medium text-slate-800">1.8s</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-pastel-yellow h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">Consultas Complexas</span>
                      <span className="text-sm font-medium text-slate-800">3.2s</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-pastel-pink h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-600">
                    <i className="fas fa-info-circle text-pastel-blue mr-1"></i>
                    92% das respostas em menos de 3 segundos
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Tendência de Satisfação</h2>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={satisfactionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} domain={[85, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="value" stroke="#8EBC9F" strokeWidth={3} name="Satisfação %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Consultas Mais Frequentes e Métricas de Engajamento */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Consultas Mais Frequentes</h2>
              <div className="space-y-4">
                {[
                  { rank: 1, title: 'Análise de ativos de renda variável', queries: 187, percent: '15%', color: 'bg-pastel-blue' },
                  { rank: 2, title: 'Regulamentações CVM', queries: 156, percent: '12.5%', color: 'bg-pastel-green' },
                  { rank: 3, title: 'Estratégias de diversificação', queries: 143, percent: '11.5%', color: 'bg-pastel-purple' },
                  { rank: 4, title: 'Cálculo de rentabilidade', queries: 128, percent: '10.3%', color: 'bg-pastel-yellow' },
                  { rank: 5, title: 'Tributação de investimentos', queries: 115, percent: '9.2%', color: 'bg-pastel-pink' },
                  { rank: 6, title: 'Análise de fundos imobiliários', queries: 98, percent: '7.9%', color: 'bg-pastel-peach' }
                ].map((item) => (
                  <div key={item.rank} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-sm font-bold text-[hsl(var(--pastel-gray-dark))]">{item.rank}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.queries} consultas</p>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.percent}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Métricas de Engajamento</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-pastel-blue rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-redo text-[hsl(var(--pastel-gray-dark))]"></i>
                      <span className="text-xs font-medium text-slate-600">Taxa de Retorno</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">78%</p>
                    <p className="text-xs text-slate-600 mt-1">Usuários que retornam</p>
                  </div>

                  <div className="p-4 bg-pastel-green rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-exchange-alt text-[hsl(var(--pastel-gray-dark))]"></i>
                      <span className="text-xs font-medium text-slate-600">Sessões Médias</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">4.2</p>
                    <p className="text-xs text-slate-600 mt-1">Por usuário/dia</p>
                  </div>

                  <div className="p-4 bg-pastel-purple rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-comments text-[hsl(var(--pastel-gray-dark))]"></i>
                      <span className="text-xs font-medium text-slate-600">Mensagens/Sessão</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">8.5</p>
                    <p className="text-xs text-slate-600 mt-1">Interações médias</p>
                  </div>

                  <div className="p-4 bg-pastel-yellow rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-check-circle text-[hsl(var(--pastel-gray-dark))]"></i>
                      <span className="text-xs font-medium text-slate-600">Resolução</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">94%</p>
                    <p className="text-xs text-slate-600 mt-1">Consultas resolvidas</p>
                  </div>
                </div>

                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} domain={[65, 85]} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                      <Line type="monotone" dataKey="value" stroke="#AC9CC9" strokeWidth={2} fill="#AC9CC9" fillOpacity={0.1} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          </div>

          {/* Análise Comparativa */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Análise Comparativa de Agentes</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setComparativeView('performance')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${comparativeView === 'performance' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Performance
                </button>
                <button 
                  onClick={() => setComparativeView('efficiency')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${comparativeView === 'efficiency' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Eficiência
                </button>
                <button 
                  onClick={() => setComparativeView('satisfaction')}
                  className={`px-3 py-1 text-sm font-medium rounded-lg ${comparativeView === 'satisfaction' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Satisfação
                </button>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="interactions" fill="#8AAACF" name="Interações" />
                  <Bar dataKey="time" fill="#8EBC9F" name="Tempo Médio (min)" />
                  <Bar dataKey="satisfaction" fill="#AC9CC9" name="Satisfação (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Insights e Recomendações */}
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Insights e Recomendações</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-4">Principais Insights</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-pastel-blue">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-lightbulb text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Pico de uso às 14h</p>
                        <p className="text-xs text-slate-600">Horário de maior demanda por análises de mercado</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-pastel-green">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-chart-line text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Crescimento de 32%</p>
                        <p className="text-xs text-slate-600">Aumento nas interações comparado ao mês anterior</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-pastel-purple">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-star text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Alta satisfação</p>
                        <p className="text-xs text-slate-600">96% dos usuários avaliam positivamente os agentes</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-pastel-yellow">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-users text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Retenção elevada</p>
                        <p className="text-xs text-slate-600">78% dos usuários retornam regularmente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-4">Recomendações</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-pastel-blue bg-pastel-blue bg-opacity-20">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-arrow-up text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Expandir capacidade</p>
                        <p className="text-xs text-slate-600">Aumentar recursos no horário de pico para melhor performance</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-pastel-green bg-pastel-green bg-opacity-20">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-plus-circle text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Novo agente especializado</p>
                        <p className="text-xs text-slate-600">Considere criar agente focado em fundos imobiliários</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-pastel-purple bg-pastel-purple bg-opacity-20">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-graduation-cap text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Treinamento adicional</p>
                        <p className="text-xs text-slate-600">Melhorar respostas sobre tributação e compliance</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-pastel-pink bg-pastel-pink bg-opacity-20">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-video text-[hsl(var(--pastel-gray-dark))] mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Integração de vídeo</p>
                        <p className="text-xs text-slate-600">Implementar respostas com avatar para maior engajamento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AgentesAnalytics;
