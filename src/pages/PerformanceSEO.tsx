import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const PerformanceSEO = () => {
  const navigate = useNavigate();
  const [trendView, setTrendView] = useState<'impressions' | 'clicks' | 'ctr'>('impressions');

  // Data for charts
  const monthlyTrendData = [
    { name: 'Sem 1', impressions: 28500, clicks: 4200, ctr: 14.7 },
    { name: 'Sem 2', impressions: 30200, clicks: 4500, ctr: 14.9 },
    { name: 'Sem 3', impressions: 32800, clicks: 4800, ctr: 14.6 },
    { name: 'Sem 4', impressions: 33300, clicks: 4700, ctr: 14.1 }
  ];

  const categoryData = [
    { name: 'Mercado de Capitais', value: 32 },
    { name: 'Investimentos', value: 26 },
    { name: 'Regulamentação', value: 18 },
    { name: 'Meios de Pagamento', value: 14 },
    { name: 'Educação Financeira', value: 10 }
  ];

  const keywordData = [
    { name: 'mercado capitais', value: 3240 },
    { name: 'investimentos', value: 2890 },
    { name: 'renda variável', value: 2450 },
    { name: 'análise fundamentalista', value: 2180 },
    { name: 'meios pagamento', value: 1920 }
  ];

  const trafficData = [
    { name: 'Busca Orgânica', value: 62 },
    { name: 'Direto', value: 18 },
    { name: 'Redes Sociais', value: 12 },
    { name: 'Referências', value: 5 },
    { name: 'E-mail', value: 3 }
  ];

  const geoData = [
    { name: 'São Paulo', value: 38 },
    { name: 'Rio de Janeiro', value: 22 },
    { name: 'Brasília', value: 14 },
    { name: 'Minas Gerais', value: 10 },
    { name: 'Paraná', value: 8 },
    { name: 'Outros', value: 8 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 56 },
    { name: 'Mobile', value: 37 },
    { name: 'Tablet', value: 7 }
  ];

  const comparisonData = [
    { name: 'Artigos', outubro: 35, novembro: 47 },
    { name: 'Impressões (K)', outubro: 93, novembro: 124.8 },
    { name: 'Cliques (K)', outubro: 14.2, novembro: 18.2 },
    { name: 'CTR (%)', outubro: 15.3, novembro: 14.6 },
    { name: 'Backlinks', outubro: 475, novembro: 542 }
  ];

  const pieColors = ['#8AAACF', '#8EBC9F', '#AC9CC9', '#C9AF89', '#CC99A9'];

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
                  <h1 className="text-2xl font-semibold text-slate-800">Relatório Consolidado SEO - Novembro 2024</h1>
                  <p className="text-sm text-slate-500 mt-1">Visão geral de performance de todos os artigos publicados no mês</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                  <i className="fas fa-calendar text-slate-600"></i>
                  <select className="bg-transparent text-sm font-medium text-slate-700 outline-none">
                    <option>Novembro 2024</option>
                    <option>Outubro 2024</option>
                    <option>Setembro 2024</option>
                  </select>
                </div>
                <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                  <i className="fas fa-sync-alt mr-2"></i>Atualizar
                </button>
                <button className="px-4 py-2 bg-pastel-green text-slate-800 rounded-lg font-medium hover:opacity-90 transition">
                  <i className="fas fa-download mr-2"></i>Exportar
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Monthly Overview Stats */}
          <section className="grid grid-cols-6 gap-6 mb-8">
            {[
              { icon: 'fa-file-alt', title: 'Artigos Publicados', value: '47', change: '+12', color: 'bg-pastel-blue', changeType: 'green' },
              { icon: 'fa-eye', title: 'Total Impressões', value: '124.8K', change: '+34%', color: 'bg-pastel-green', changeType: 'green' },
              { icon: 'fa-mouse-pointer', title: 'Total Cliques', value: '18.2K', change: '+28%', color: 'bg-pastel-purple', changeType: 'green' },
              { icon: 'fa-percentage', title: 'CTR Médio', value: '14.6%', change: '+1.2%', color: 'bg-pastel-yellow', changeType: 'blue' },
              { icon: 'fa-trophy', title: 'Ranking Médio', value: '4.2', change: '↑ 1.8', color: 'bg-pastel-pink', changeType: 'green' },
              { icon: 'fa-link', title: 'Total Backlinks', value: '542', change: '+67', color: 'bg-pastel-peach', changeType: 'green' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <i className={`fas ${stat.icon} text-[hsl(var(--pastel-gray-dark))] text-xl`}></i>
                  </div>
                  <span className={`text-xs font-medium ${stat.changeType === 'green' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'} px-2 py-1 rounded`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-500">{stat.title}</p>
              </div>
            ))}
          </section>

          {/* SEO Scores */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            {[
              { title: 'SEO Score Médio', score: 82, change: '+3 pts', color: '#8EBC9F', textColor: 'text-green-700', bgColor: 'bg-green-50' },
              { title: 'GEO Score Médio', score: 78, change: '+2 pts', color: '#8AAACF', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
              { title: 'Qualidade Conteúdo', score: 88, change: '+5 pts', color: '#AC9CC9', textColor: 'text-purple-700', bgColor: 'bg-purple-50' },
              { title: 'Performance Técnica', score: 85, change: '+4 pts', color: '#C9AF89', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="8" fill="none"></circle>
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        stroke={item.color} 
                        strokeWidth="8" 
                        fill="none" 
                        strokeDasharray="351.86" 
                        strokeDashoffset={351.86 * (1 - item.score / 100)} 
                        strokeLinecap="round"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <div className="text-4xl font-bold text-slate-800">{item.score}</div>
                        <div className="text-xs text-slate-500">de 100</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">{item.title}</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 ${item.bgColor} ${item.textColor} rounded-lg text-sm font-medium`}>
                    <i className="fas fa-arrow-up"></i>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Evolução Mensal</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTrendView('impressions')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${trendView === 'impressions' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Impressões
                  </button>
                  <button 
                    onClick={() => setTrendView('clicks')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${trendView === 'clicks' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Cliques
                  </button>
                  <button 
                    onClick={() => setTrendView('ctr')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${trendView === 'ctr' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    CTR
                  </button>
                </div>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    {trendView === 'impressions' && <Line type="monotone" dataKey="impressions" stroke="#8AAACF" strokeWidth={3} name="Impressões" />}
                    {trendView === 'clicks' && <Line type="monotone" dataKey="clicks" stroke="#8EBC9F" strokeWidth={3} name="Cliques" />}
                    {trendView === 'ctr' && <Line type="monotone" dataKey="ctr" stroke="#AC9CC9" strokeWidth={3} name="CTR %" />}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Distribuição por Categoria</h2>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Performance Metrics */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            {[
              { icon: 'fa-clock', title: 'Tempo Médio de Leitura', value: '5:18', change: '+52s vs mês anterior', color: 'bg-pastel-blue' },
              { icon: 'fa-users', title: 'Visitantes Únicos', value: '89.2K', change: '+31% vs mês anterior', color: 'bg-pastel-green' },
              { icon: 'fa-redo', title: 'Taxa de Rejeição', value: '28.4%', change: '-5.2% vs mês anterior', color: 'bg-pastel-purple' },
              { icon: 'fa-share-alt', title: 'Compartilhamentos', value: '3.8K', change: '+42% vs mês anterior', color: 'bg-pastel-yellow' }
            ].map((metric, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center`}>
                    <i className={`fas ${metric.icon} text-[hsl(var(--pastel-gray-dark))]`}></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{metric.value}</h3>
                <p className="text-sm text-slate-500 mb-3">{metric.title}</p>
                <div className="text-xs text-green-600">{metric.change}</div>
              </div>
            ))}
          </section>

          {/* Top Performing Articles */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Top 5 Artigos do Mês</h2>
            <div className="space-y-4">
              {[
                { rank: 1, title: 'Tendências do Mercado de Capitais Brasileiro em 2024', views: '12.4K', clicks: '2.1K', seo: 85, geo: 80, position: '2.3', color: 'border-pastel-blue', bgColor: 'bg-pastel-blue' },
                { rank: 2, title: 'Análise Fundamentalista: Guia Completo para Investidores', views: '10.8K', clicks: '1.9K', seo: 88, geo: 82, position: '1.8', color: 'border-pastel-green', bgColor: 'bg-pastel-green' },
                { rank: 3, title: 'Regulamentação Financeira: Mudanças para 2024', views: '9.2K', clicks: '1.6K', seo: 81, geo: 77, position: '3.5', color: 'border-pastel-purple', bgColor: 'bg-pastel-purple' },
                { rank: 4, title: 'Estratégias de Diversificação de Portfólio', views: '8.6K', clicks: '1.5K', seo: 79, geo: 75, position: '4.2', color: 'border-pastel-yellow', bgColor: 'bg-pastel-yellow' },
                { rank: 5, title: 'Meios de Pagamento Digital: Evolução e Tendências', views: '7.9K', clicks: '1.3K', seo: 83, geo: 79, position: '3.8', color: 'border-pastel-pink', bgColor: 'bg-pastel-pink' }
              ].map((article) => (
                <div key={article.rank} className={`flex items-center justify-between p-4 bg-slate-50 rounded-lg border-l-4 ${article.color}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 ${article.bgColor} rounded-lg flex items-center justify-center text-lg font-bold text-[hsl(var(--pastel-gray-dark))]`}>
                      {article.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">{article.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span><i className="fas fa-eye mr-1"></i>{article.views} visualizações</span>
                        <span><i className="fas fa-mouse-pointer mr-1"></i>{article.clicks} cliques</span>
                        <span><i className="fas fa-trophy mr-1"></i>SEO: {article.seo}</span>
                        <span><i className="fas fa-map-marker-alt mr-1"></i>GEO: {article.geo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-800">{article.position}</div>
                    <div className="text-xs text-slate-500">Posição</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Keywords and Traffic */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Performance de Palavras-Chave</h2>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={keywordData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} angle={-45} textAnchor="end" height={100} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Impressões', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b7280' } }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value" fill="#8AAACF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Fontes de Tráfego</h2>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Technical Overview */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Visão Geral Técnica</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                {[
                  { label: 'Meta Tags Otimizadas', value: '94%', progress: 94, color: 'bg-pastel-green' },
                  { label: 'Velocidade de Carregamento', value: '2.1s média', progress: 88, color: 'bg-pastel-green' },
                  { label: 'Mobile Responsiveness', value: '98%', progress: 98, color: 'bg-pastel-green' }
                ].map((item, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                {[
                  { label: 'Densidade de Keywords', value: '2.6% média', progress: 87, color: 'bg-pastel-blue' },
                  { label: 'Links Internos', value: '14 média', progress: 78, color: 'bg-pastel-yellow' },
                  { label: 'Alt Text em Imagens', value: '91%', progress: 91, color: 'bg-pastel-green' }
                ].map((item, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                {[
                  { label: 'Estrutura de Headings', value: '96%', progress: 96, color: 'bg-pastel-green' },
                  { label: 'Legibilidade', value: '74/100', progress: 74, color: 'bg-pastel-blue' },
                  { label: 'Tamanho Conteúdo', value: '2.1K palavras', progress: 92, color: 'bg-pastel-green' }
                ].map((item, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Geo, Device, Engagement */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Distribuição Geográfica</h2>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Acessos (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6b7280' } }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="value" fill="#8AAACF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Acessos por Dispositivo</h2>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Métricas de Engajamento</h2>
              <div className="space-y-4">
                {[
                  { icon: 'fa-scroll', title: 'Scroll Depth', subtitle: 'Profundidade média', value: '84%', color: 'bg-pastel-blue' },
                  { icon: 'fa-comments', title: 'Comentários', subtitle: 'Total do mês', value: '1.2K', color: 'bg-pastel-green' },
                  { icon: 'fa-heart', title: 'Reações', subtitle: 'Interações positivas', value: '5.8K', color: 'bg-pastel-pink' },
                  { icon: 'fa-bookmark', title: 'Salvamentos', subtitle: 'Artigos salvos', value: '2.4K', color: 'bg-pastel-purple' }
                ].map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center`}>
                        <i className={`fas ${metric.icon} text-[hsl(var(--pastel-gray-dark))]`}></i>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{metric.title}</div>
                        <div className="text-xs text-slate-500">{metric.subtitle}</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-slate-800">{metric.value}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Comparison Chart */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Comparação com Mês Anterior</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="outubro" fill="#AC9CC9" name="Outubro" />
                  <Bar dataKey="novembro" fill="#8AAACF" name="Novembro" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Insights */}
          <section className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-trophy text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Destaques do Mês</h3>
                  <p className="text-xs text-slate-600 mb-3">
                    Crescimento de 34% em impressões, 12 novos artigos publicados com média de SEO score de 82 pontos. Tempo de leitura aumentou 52 segundos.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Excelente</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">+34%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-lightbulb text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Oportunidades</h3>
                  <p className="text-xs text-slate-600 mb-3">
                    Aumentar links internos para 18-20 por artigo. Explorar mais conteúdo sobre "renda fixa" e "fundos imobiliários" que têm alta demanda.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium">Crescimento</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">Alta demanda</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">Próximos Passos</h3>
                  <p className="text-xs text-slate-600 mb-3">
                    Focar em conteúdos sobre "análise de mercado" e "educação financeira". Implementar schema markup em 100% dos artigos.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Estratégia</span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Otimização</span>
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

export default PerformanceSEO;
