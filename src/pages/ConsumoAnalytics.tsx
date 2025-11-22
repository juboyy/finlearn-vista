import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, Download } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div 
        className="px-3 py-2 rounded-lg border shadow-sm"
        style={{ 
          backgroundColor: data.payload.fill || data.fill,
          borderColor: 'white'
        }}
      >
        <p className="text-sm font-bold text-white">{data.name}</p>
        <p className="text-sm text-white">{data.value}</p>
      </div>
    );
  }
  return null;
};

const ConsumoAnalytics = () => {
  const navigate = useNavigate();
  const [studyView, setStudyView] = useState<'daily' | 'weekly'>('daily');
  const [marketView, setMarketView] = useState<'stocks' | 'funds' | 'commodities'>('stocks');

  const studyTimeData = [
    { name: 'Seg', hours: 2.5 },
    { name: 'Ter', hours: 3.2 },
    { name: 'Qua', hours: 1.8 },
    { name: 'Qui', hours: 4.1 },
    { name: 'Sex', hours: 2.9 },
    { name: 'Sáb', hours: 1.5 },
    { name: 'Dom', hours: 1.2 }
  ];

  const completionData = [
    { name: 'Análise Técnica', value: 25 },
    { name: 'Renda Fixa', value: 20 },
    { name: 'Derivativos', value: 15 },
    { name: 'Fundos', value: 10 },
    { name: 'Compliance', value: 30 }
  ];

  const pieColors = ['#8AAACF', '#8EBC9F', '#AC9CC9', '#C9AF89', '#CC99A9'];

  const engagementData = [
    { name: 'Jan', artigos: 45, webinars: 12, agente: 8 },
    { name: 'Fev', artigos: 52, webinars: 18, agente: 10 },
    { name: 'Mar', artigos: 48, webinars: 15, agente: 12 },
    { name: 'Abr', artigos: 65, webinars: 22, agente: 15 },
    { name: 'Mai', artigos: 58, webinars: 28, agente: 18 },
    { name: 'Jun', artigos: 72, webinars: 25, agente: 20 }
  ];

  const velocityData = [
    { name: 'Sem 1', value: 8 },
    { name: 'Sem 2', value: 12 },
    { name: 'Sem 3', value: 10 },
    { name: 'Sem 4', value: 15 },
    { name: 'Sem 5', value: 18 },
    { name: 'Sem 6', value: 16 }
  ];

  const contentTypeData = [
    { name: 'Vídeos', value: 40, fill: '#8AAACF' },
    { name: 'Artigos', value: 25, fill: '#8EBC9F' },
    { name: 'E-books', value: 15, fill: '#AC9CC9' },
    { name: 'Webinars', value: 12, fill: '#C9AF89' },
    { name: 'Podcasts', value: 8, fill: '#CC99A9' }
  ];

  const comparisonData = [
    { category: 'Tempo de Estudo', voce: 87, media: 65 },
    { category: 'Cursos Concluídos', voce: 92, media: 70 },
    { category: 'Engajamento', voce: 78, media: 62 },
    { category: 'Certificações', voce: 85, media: 68 },
    { category: 'Participação', voce: 90, media: 72 }
  ];

  const marketData = [
    { name: 'Jan', ibov: 100, petr4: 50 },
    { name: 'Fev', ibov: 105, petr4: 52 },
    { name: 'Mar', ibov: 98, petr4: 48 },
    { name: 'Abr', ibov: 110, petr4: 55 },
    { name: 'Mai', ibov: 115, petr4: 58 },
    { name: 'Jun', ibov: 108, petr4: 54 }
  ];

  const metasConsumoData = [
    { name: 'Jan', atingidas: 8, naoAtingidas: 3 },
    { name: 'Fev', atingidas: 10, naoAtingidas: 2 },
    { name: 'Mar', atingidas: 7, naoAtingidas: 4 },
    { name: 'Abr', atingidas: 12, naoAtingidas: 1 },
    { name: 'Mai', atingidas: 11, naoAtingidas: 2 },
    { name: 'Jun', atingidas: 9, naoAtingidas: 3 }
  ];

  const metasPorCategoriaData = [
    { categoria: 'Vídeos', meta: 20, realizado: 18 },
    { categoria: 'Artigos', meta: 15, realizado: 17 },
    { categoria: 'E-books', meta: 5, realizado: 4 },
    { categoria: 'Webinars', meta: 8, realizado: 10 },
    { categoria: 'Cursos', meta: 3, realizado: 3 }
  ];

  const knowledgeAreas = [
    { name: 'Análise Técnica', percentage: 85, color: 'bg-pastel-blue' },
    { name: 'Renda Fixa', percentage: 72, color: 'bg-pastel-green' },
    { name: 'Derivativos', percentage: 68, color: 'bg-pastel-purple' },
    { name: 'Fundos de Investimento', percentage: 78, color: 'bg-pastel-yellow' },
    { name: 'Compliance', percentage: 91, color: 'bg-pastel-pink' }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/analytics')}
                className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[hsl(var(--pastel-gray-dark))] hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Analytics & Progresso de Estudo</h1>
                <p className="text-sm text-slate-500 mt-1">Acompanhe seu desempenho e evolução</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200">
                <option>Últimos 30 dias</option>
                <option>Últimos 7 dias</option>
                <option>Últimos 90 dias</option>
                <option>Este ano</option>
              </select>
              <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:opacity-90 transition shadow-sm">
                <Download size={16} className="inline mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <section className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-book-reader text-[hsl(var(--pastel-gray-dark))] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+18%</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">87%</h3>
              <p className="text-sm text-slate-500">Taxa de Retenção</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-[hsl(var(--pastel-gray-dark))] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+25</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">342</h3>
              <p className="text-sm text-slate-500">Pontos XP</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                  <i className="fas fa-bullseye text-[hsl(var(--pastel-gray-dark))] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded">Meta</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">92%</h3>
              <p className="text-sm text-slate-500">Objetivos Atingidos</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                  <i className="fas fa-ranking-star text-[hsl(var(--pastel-gray-dark))] text-xl"></i>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Ranking</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">#23</h3>
              <p className="text-sm text-slate-500">Posição Geral</p>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Tempo de Estudo</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStudyView('daily')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      studyView === 'daily' ? 'bg-pastel-blue text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Diário
                  </button>
                  <button
                    onClick={() => setStudyView('weekly')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      studyView === 'weekly' ? 'bg-pastel-blue text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Semanal
                  </button>
                </div>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studyTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Horas', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b7280' } }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="hours" fill="#8AAACF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Conclusão de Cursos</h2>
                <span className="text-sm text-slate-500">Por categoria</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={completionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {completionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Engajamento Mensal</h2>
                <span className="text-sm text-slate-500">Interações por tipo</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="artigos" stroke="#8AAACF" strokeWidth={3} name="Artigos" />
                    <Line type="monotone" dataKey="webinars" stroke="#8EBC9F" strokeWidth={3} name="Webinars" />
                    <Line type="monotone" dataKey="agente" stroke="#AC9CC9" strokeWidth={3} name="Agente IA" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Velocidade de Aprendizado</h2>
                <span className="text-sm text-slate-500">Conteúdos por semana</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={velocityData}>
                    <defs>
                      <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#CC99A9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#CC99A9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="value" stroke="#CC99A9" strokeWidth={3} fillOpacity={1} fill="url(#colorVelocity)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Conhecimento de Mercado</h2>
              <div className="space-y-4">
                {knowledgeAreas.map((area, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{area.name}</span>
                      <span className="text-sm font-bold text-slate-800">{area.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div className={`${area.color} h-3 rounded-full`} style={{ width: `${area.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Metas Semanais</h2>
                <button className="px-3 py-1.5 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:opacity-90 transition">
                  <i className="fas fa-plus mr-1"></i>
                  Adicionar Metas
                </button>
              </div>
              <div className="space-y-5">
                {[
                  { icon: 'fa-check', text: 'Completar 3 cursos', progress: '3/3 concluídos', bg: 'bg-pastel-blue', completed: true },
                  { icon: 'fa-check', text: '15 horas de estudo', progress: '18.5/15 horas', bg: 'bg-pastel-green', completed: true },
                  { text: 'Interagir com 5 artigos', progress: '2/5 interações', bg: 'bg-slate-100', badge: '2/5', completed: false },
                  { text: 'Participar de webinars', progress: '1/3 webinars', bg: 'bg-slate-100', badge: '1/3', completed: false }
                ].map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${goal.bg} rounded-full flex items-center justify-center`}>
                      {goal.completed ? (
                        <i className={`fas ${goal.icon} text-[hsl(var(--pastel-gray-dark))] text-sm`}></i>
                      ) : (
                        <span className="text-slate-600 text-sm font-bold">{goal.badge}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{goal.text}</p>
                      <p className="text-xs text-slate-500">{goal.progress}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-pastel-yellow rounded-lg">
                  <p className="text-sm font-medium text-slate-800 mb-1">Progresso da Semana</p>
                  <div className="w-full bg-white rounded-full h-2 mb-2">
                    <div className="bg-slate-800 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-slate-800">75% das metas concluídas</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Conquistas Recentes</h2>
              <div className="space-y-4">
                {[
                  { icon: 'fa-medal', text: 'Especialista em Análise', desc: 'Completou curso avançado', bg: 'bg-pastel-yellow', iconColor: 'text-yellow-600' },
                  { icon: 'fa-fire', text: 'Sequência de 15 dias', desc: 'Estudou todos os dias', bg: 'bg-pastel-green', iconColor: 'text-orange-600' },
                  { icon: 'fa-star', text: 'Top 10% da Turma', desc: 'Ranking de desempenho', bg: 'bg-pastel-purple', iconColor: 'text-purple-600' },
                  { icon: 'fa-comments', text: 'Participação Ativa', desc: '50+ comentários na comunidade', bg: 'bg-pastel-pink', iconColor: 'text-pink-600' }
                ].map((achievement, idx) => (
                  <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg ${achievement.bg}`}>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <i className={`fas ${achievement.icon} ${achievement.iconColor} text-xl`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{achievement.text}</p>
                      <p className="text-xs text-slate-600">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Consumo de Conteúdo</h2>
                <span className="text-sm text-slate-500">Formato preferido</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      innerRadius={50}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Comparação de Performance</h2>
                <span className="text-sm text-slate-500">Você vs. Média</span>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 10 }} angle={-90} textAnchor="end" height={100} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Performance (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b7280' } }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="voce" fill="#8AAACF" name="Você" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="media" fill="#C9AF89" name="Média da Plataforma" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center">
                    <i className="fas fa-bullseye text-[hsl(var(--pastel-gray-dark))]"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Metas de Consumo Mensal</h2>
                    <p className="text-sm text-slate-500">Atingidas vs. Não Atingidas</p>
                  </div>
                </div>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metasConsumoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Quantidade', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b7280' } }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="atingidas" fill="#8EBC9F" name="Metas Atingidas" stackId="a" />
                    <Bar dataKey="naoAtingidas" fill="#CC99A9" name="Não Atingidas" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <i className="fas fa-chart-line text-[hsl(var(--pastel-gray-dark))]"></i>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Progresso por Categoria</h2>
                    <p className="text-sm text-slate-500">Meta vs. Realizado</p>
                  </div>
                </div>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metasPorCategoriaData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis dataKey="categoria" type="category" tick={{ fill: '#6b7280', fontSize: 11 }} width={80} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="meta" fill="#C9AF89" name="Meta" radius={[0, 8, 8, 0]} />
                    <Bar dataKey="realizado" fill="#8AAACF" name="Realizado" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Dados de Mercado - Acompanhamento</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setMarketView('stocks')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    marketView === 'stocks' ? 'bg-pastel-blue text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Ações
                </button>
                <button
                  onClick={() => setMarketView('funds')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    marketView === 'funds' ? 'bg-pastel-blue text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Fundos
                </button>
                <button
                  onClick={() => setMarketView('commodities')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    marketView === 'commodities' ? 'bg-pastel-blue text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Commodities
                </button>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Variação (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b7280' } }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="ibov" stroke="#8AAACF" strokeWidth={3} name="IBOV" />
                  <Line type="monotone" dataKey="petr4" stroke="#8EBC9F" strokeWidth={3} name="PETR4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Insights de Aprendizado</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-4">Padrões de Estudo</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Melhor horário', value: '14h - 16h' },
                    { label: 'Tipo preferido', value: 'Vídeos' },
                    { label: 'Duração média', value: '45 min' }
                  ].map((pattern, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                      <span className="text-sm text-slate-600">{pattern.label}</span>
                      <span className="text-sm font-medium text-slate-800">{pattern.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-4">Recomendações</h3>
                <div className="space-y-3">
                  {[
                    { text: 'Foque mais em derivativos para equilibrar seu portfólio de conhecimento', bg: 'bg-pastel-blue' },
                    { text: 'Considere participar de mais webinars ao vivo para networking', bg: 'bg-pastel-green' },
                    { text: 'Sua consistência está excelente - continue assim!', bg: 'bg-pastel-purple' }
                  ].map((rec, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${rec.bg}`}>
                      <p className="text-sm text-slate-700">{rec.text}</p>
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

export default ConsumoAnalytics;