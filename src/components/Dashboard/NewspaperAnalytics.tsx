import Plot from 'react-plotly.js';
import { Download } from 'lucide-react';

export const NewspaperAnalytics = () => {
  // Dados para gráficos
  const readingPerformanceData = [{
    x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    y: [42, 38, 45, 32, 28, 18, 12],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Artigos Lidos',
    marker: { color: '#B8D4E8', size: 10 },
    line: { color: '#B8D4E8', width: 3 },
    fill: 'tozeroy'
  }, {
    x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    y: [50, 45, 48, 40, 35, 25, 20],
    type: 'scatter',
    mode: 'lines',
    name: 'Meta',
    line: { color: '#D4C5E8', width: 2, dash: 'dash' }
  }];

  const contentTypesData = [{
    labels: ['Notícias', 'Análises', 'Regulamentação', 'Entrevistas', 'Opinião', 'Relatórios'],
    values: [342, 248, 186, 124, 98, 72],
    type: 'pie',
    marker: { colors: ['#B8D4E8', '#C5E8D4', '#D4C5E8', '#E8E0C5', '#E8C5D8', '#E8D4C5'] }
  }];

  const completionRateData = [{
    x: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    y: [65, 68, 70, 71],
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: '#B8D4E8', size: 10 },
    line: { color: '#B8D4E8', width: 3 },
    fill: 'tozeroy'
  }];

  const hourlyDistributionData = [{
    x: ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h'],
    y: [8, 42, 28, 12, 18, 15, 8, 5],
    type: 'bar',
    marker: { color: '#B8D4E8' }
  }];

  const monthlyComparisonData = [
    {
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [724, 812, 956, 1089, 1156, 1247],
      type: 'bar',
      name: 'Artigos Lidos',
      marker: { color: '#B8D4E8' }
    },
    {
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      y: [24.8, 27.2, 30.4, 31.8, 32.1, 32.6],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Tempo (horas)',
      yaxis: 'y2',
      marker: { color: '#C5E8D4', size: 10 },
      line: { color: '#C5E8D4', width: 3 }
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Analytics de Newspaper</h1>
            <p className="text-sm text-slate-500 mt-1">Análise completa do seu consumo de notícias e artigos do mercado financeiro</p>
          </div>
          <div className="flex items-center gap-4">
            <select className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
              <option>Últimos 30 dias</option>
              <option>Últimos 7 dias</option>
              <option>Últimos 90 dias</option>
              <option>Este ano</option>
            </select>
            <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
              <Download className="w-4 h-4 inline mr-2" />
              Exportar Relatório
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* KPIs Overview */}
        <section className="grid grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                <i className="fas fa-newspaper text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+8</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">47</h3>
            <p className="text-sm text-slate-500">Artigos Hoje</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">32</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-week text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+42</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">284</h3>
            <p className="text-sm text-slate-500">Artigos Semana</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">198</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-alt text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">+156</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">1,247</h3>
            <p className="text-sm text-slate-500">Artigos Mês</p>
            <p className="text-xs text-slate-600 mt-2">Lidos: <span className="font-semibold">892</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                <i className="fas fa-clock text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+1.2h</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">8.4h</h3>
            <p className="text-sm text-slate-500">Tempo Semana</p>
            <p className="text-xs text-slate-600 mt-2">Média: <span className="font-semibold">1.2h/dia</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                <i className="fas fa-hourglass-half text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+4.8h</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">32.6h</h3>
            <p className="text-sm text-slate-500">Tempo Mês</p>
            <p className="text-xs text-slate-600 mt-2">Média: <span className="font-semibold">1.1h/dia</span></p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center">
                <i className="fas fa-check-circle text-slate-700 text-xl"></i>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+6%</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">71%</h3>
            <p className="text-sm text-slate-500">Taxa Conclusão</p>
            <p className="text-xs text-slate-600 mt-2">Média mensal</p>
          </div>
        </section>

        {/* Desempenho de Leitura e Sites Mais Lidos */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Desempenho de Leitura</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">Semanal</button>
                <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Mensal</button>
              </div>
            </div>
            <Plot
              data={readingPerformanceData as any}
              layout={{
                xaxis: { title: '' },
                yaxis: { title: 'Número de Artigos' },
                margin: { t: 20, r: 20, b: 60, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: true,
                legend: { orientation: 'h', y: -0.2 },
                height: 320
              }}
              config={{ responsive: true, displayModeBar: false, displaylogo: false }}
              className="w-full"
            />
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Sites Mais Lidos</h2>
              <span className="text-sm text-slate-500">Últimos 30 dias</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Valor Econômico', articles: 248, percent: 32, color: 'pastel-blue', width: 'w-[32%]' },
                { name: 'InfoMoney', articles: 186, percent: 24, color: 'pastel-green', width: 'w-[24%]' },
                { name: 'Bloomberg Brasil', articles: 142, percent: 18, color: 'pastel-purple', width: 'w-[18%]' },
                { name: 'Estadão Economia', articles: 98, percent: 13, color: 'pastel-yellow', width: 'w-[13%]' },
                { name: 'CVM Notícias', articles: 72, percent: 9, color: 'pastel-pink', width: 'w-[9%]' },
                { name: 'Outros', articles: 46, percent: 4, color: 'pastel-peach', width: 'w-[4%]' }
              ].map((site, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${site.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <i className="fas fa-globe text-slate-700"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-800">{site.name}</span>
                      <span className="text-sm font-bold text-slate-800">{site.articles} artigos</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`bg-${site.color} h-2 rounded-full ${site.width}`}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{site.percent}% do total lido</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Ações de Leitura, Tipos de Conteúdo e Distribuição de Tempo */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Ações de Leitura</h2>
            <div className="space-y-4">
              {[
                { label: 'Favoritados', value: 124, change: '+18 esta semana', color: 'pastel-blue', icon: 'bookmark' },
                { label: 'Ler Mais Tarde', value: 67, change: '+12 hoje', color: 'pastel-green', icon: 'clock' },
                { label: 'Compartilhados', value: 43, change: '+7 esta semana', color: 'pastel-purple', icon: 'share' },
                { label: 'Comentados', value: 89, change: '+14 esta semana', color: 'pastel-yellow', icon: 'comment' }
              ].map((action, idx) => (
                <div key={idx} className={`p-4 bg-${action.color} rounded-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <i className={`fas fa-${action.icon} text-slate-700 text-lg`}></i>
                      <span className="text-sm font-medium text-slate-700">{action.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800">{action.value}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="text-green-600 font-medium">{action.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Tipos de Conteúdo Lidos</h2>
            <Plot
              data={contentTypesData as any}
              layout={{
                margin: { t: 20, r: 20, b: 20, l: 20 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: true,
                legend: { orientation: 'v', x: 1, y: 0.5 },
                height: 320
              }}
              config={{ responsive: true, displayModeBar: false, displaylogo: false }}
              className="w-full"
            />
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Distribuição de Tempo</h2>
            <div className="space-y-5">
              {[
                { day: 'Segunda', time: '1.8h', width: 'w-[90%]', color: 'pastel-blue' },
                { day: 'Terça', time: '1.4h', width: 'w-[70%]', color: 'pastel-green' },
                { day: 'Quarta', time: '1.6h', width: 'w-[80%]', color: 'pastel-purple' },
                { day: 'Quinta', time: '1.2h', width: 'w-[60%]', color: 'pastel-yellow' },
                { day: 'Sexta', time: '1.0h', width: 'w-[50%]', color: 'pastel-pink' },
                { day: 'Sábado', time: '0.8h', width: 'w-[40%]', color: 'pastel-peach' },
                { day: 'Domingo', time: '0.6h', width: 'w-[30%]', color: 'slate-300' }
              ].map((day, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">{day.day}</span>
                    <span className="text-sm font-medium text-slate-800">{day.time}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`bg-${day.color} h-2 rounded-full ${day.width}`}></div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Total Semanal</span>
                  <span className="text-2xl font-bold text-slate-800">8.4h</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Temas Mais Lidos */}
        <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Temas Mais Lidos</h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { title: 'Mercado de Capitais', articles: 187, time: '8.2h', percent: 28, color: 'pastel-blue', icon: 'chart-line', badge: 'Top 1', badgeColor: 'green' },
              { title: 'Regulamentação', articles: 142, time: '6.8h', percent: 21, color: 'pastel-green', icon: 'balance-scale', badge: 'Top 2', badgeColor: 'blue' },
              { title: 'Payments', articles: 128, time: '5.4h', percent: 19, color: 'pastel-purple', icon: 'credit-card', badge: 'Top 3', badgeColor: 'purple' },
              { title: 'Banking', articles: 96, time: '4.2h', percent: 14, color: 'pastel-yellow', icon: 'building', badge: 'Top 4', badgeColor: 'slate' },
              { title: 'Economia', articles: 84, time: '3.8h', percent: 12, color: 'pastel-pink', icon: 'money-bill-wave', badge: 'Top 5', badgeColor: 'slate' }
            ].map((topic, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${topic.color} rounded-full flex items-center justify-center`}>
                    <i className={`fas fa-${topic.icon} text-slate-700 text-lg`}></i>
                  </div>
                  <span className={`text-xs font-medium text-${topic.badgeColor}-600 bg-${topic.badgeColor}-50 px-2 py-1 rounded`}>{topic.badge}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">{topic.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Artigos</span>
                    <span className="text-sm font-bold text-slate-800">{topic.articles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Tempo</span>
                    <span className="text-sm font-bold text-slate-800">{topic.time}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                    <div className={`bg-${topic.color} h-2 rounded-full`} style={{ width: `${topic.percent}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Taxa de Conclusão e Hábitos de Leitura */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Análise de Taxa de Conclusão</h2>
            <Plot
              data={completionRateData as any}
              layout={{
                xaxis: { title: '' },
                yaxis: { title: 'Taxa de Conclusão (%)', range: [60, 75] },
                margin: { t: 20, r: 20, b: 60, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: false,
                height: 320
              }}
              config={{ responsive: true, displayModeBar: false, displaylogo: false }}
              className="w-full"
            />
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Hábitos de Leitura</h2>
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Horário Preferido</span>
                  <span className="text-lg font-bold text-slate-800">08:00 - 10:00</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-clock"></i>
                  <span>42% das leituras acontecem neste período</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Tempo Médio por Artigo</span>
                  <span className="text-lg font-bold text-slate-800">4.2 min</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-stopwatch"></i>
                  <span>12% mais rápido que a média geral</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Artigos por Sessão</span>
                  <span className="text-lg font-bold text-slate-800">6.8</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-list"></i>
                  <span>Média de artigos lidos por sessão</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Frequência Semanal</span>
                  <span className="text-lg font-bold text-slate-800">5.6 dias</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-calendar-check"></i>
                  <span>Dias ativos de leitura por semana</span>
                </div>
              </div>
              <Plot
                data={hourlyDistributionData as any}
                layout={{
                  xaxis: { title: 'Horário' },
                  yaxis: { title: 'Artigos (%)' },
                  margin: { t: 10, r: 20, b: 40, l: 50 },
                  plot_bgcolor: '#ffffff',
                  paper_bgcolor: '#ffffff',
                  showlegend: false,
                  height: 160
                }}
                config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                className="w-full"
              />
            </div>
          </section>
        </div>

        {/* Comparação Mensal */}
        <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Comparação Mensal</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">Artigos</button>
              <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Tempo</button>
              <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Conclusão</button>
            </div>
          </div>
          <Plot
            data={monthlyComparisonData as any}
            layout={{
              xaxis: { title: '' },
              yaxis: { title: 'Artigos Lidos', side: 'left' },
              yaxis2: { title: 'Tempo (horas)', overlaying: 'y', side: 'right', showgrid: false },
              margin: { t: 40, r: 80, b: 80, l: 60 },
              plot_bgcolor: '#ffffff',
              paper_bgcolor: '#ffffff',
              showlegend: true,
              legend: { orientation: 'h', y: -0.2 },
              height: 400
            }}
            config={{ responsive: true, displayModeBar: false, displaylogo: false }}
            className="w-full"
          />
        </section>

        {/* Artigos em Destaque e Insights */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Artigos em Destaque Esta Semana</h2>
            <div className="space-y-4">
              {[
                { rank: 1, title: 'Nova regulamentação da CVM para fundos de investimento', views: '2.4K', time: '5 min', source: 'Valor Econômico', color: 'pastel-blue' },
                { rank: 2, title: 'PIX ultrapassa 200 milhões de transações diárias', views: '1.8K', time: '4 min', source: 'InfoMoney', color: 'pastel-green' },
                { rank: 3, title: 'Análise: Cenário macroeconômico para 2024', views: '1.6K', time: '8 min', source: 'Bloomberg Brasil', color: 'pastel-purple' },
                { rank: 4, title: 'Open Finance: novas funcionalidades disponíveis', views: '1.4K', time: '6 min', source: 'Estadão Economia', color: 'pastel-yellow' },
                { rank: 5, title: 'Compliance: principais mudanças na legislação', views: '1.2K', time: '7 min', source: 'CVM Notícias', color: 'pastel-pink' }
              ].map((article, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition">
                  <div className={`w-10 h-10 bg-${article.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-bold text-slate-700">{article.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 mb-1">{article.title}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span><i className="fas fa-eye mr-1"></i>{article.views} leituras</span>
                      <span><i className="fas fa-clock mr-1"></i>{article.time}</span>
                      <span className={`text-${article.color} font-medium`}>{article.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Insights e Recomendações</h2>
            <div className="space-y-4">
              {[
                { title: 'Pico de produtividade', text: 'Você lê 35% mais rápido pela manhã. Aproveite este horário para artigos mais complexos.', color: 'pastel-blue', icon: 'lightbulb' },
                { title: 'Meta alcançada', text: 'Você superou sua meta semanal de 6 horas de leitura! Continue assim.', color: 'pastel-green', icon: 'trophy' },
                { title: 'Lista acumulada', text: 'Você tem 67 artigos para ler mais tarde. Que tal dedicar 30 min hoje?', color: 'pastel-purple', icon: 'bookmark' },
                { title: 'Tendência positiva', text: 'Sua taxa de conclusão aumentou 8% este mês. Excelente progresso!', color: 'pastel-yellow', icon: 'chart-line' },
                { title: 'Explore novos temas', text: 'Considere ler sobre Fintech e Inovação Financeira para diversificar.', color: 'pastel-pink', icon: 'plus-circle', border: true },
                { title: 'Consistência é a chave', text: 'Você manteve uma rotina de leitura por 23 dias consecutivos!', color: 'pastel-peach', icon: 'star', border: true }
              ].map((insight, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${insight.border ? `border border-${insight.color} bg-${insight.color} bg-opacity-20` : `bg-${insight.color}`}`}>
                  <div className="flex items-start gap-3">
                    <i className={`fas fa-${insight.icon} text-slate-700 mt-1`}></i>
                    <div>
                      <p className="text-sm font-medium text-slate-800 mb-1">{insight.title}</p>
                      <p className="text-xs text-slate-600">{insight.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Metas de Leitura */}
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Metas de Leitura</h2>
            <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
              <i className="fas fa-plus mr-2"></i>
              Adicionar Meta
            </button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[
              { title: 'Meta Diária', progress: '32/30', label: 'artigos lidos hoje', percent: 100, color: 'pastel-blue', icon: 'calendar-day', status: 'Atingida' },
              { title: 'Meta Semanal', progress: '198/180', label: 'artigos esta semana', percent: 100, color: 'pastel-green', icon: 'calendar-week', status: 'Atingida' },
              { title: 'Tempo Semanal', progress: '8.4/10h', label: 'horas de leitura', percent: 84, color: 'pastel-purple', icon: 'clock', status: 'Em andamento' },
              { title: 'Taxa de Conclusão', progress: '71/75%', label: 'meta mensal', percent: 95, color: 'pastel-yellow', icon: 'check-circle', status: 'Em andamento' }
            ].map((goal, idx) => (
              <div key={idx} className="p-5 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${goal.color} rounded-lg flex items-center justify-center`}>
                    <i className={`fas fa-${goal.icon} text-slate-700`}></i>
                  </div>
                  <span className={`text-xs font-medium ${goal.status === 'Atingida' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'} px-2 py-1 rounded`}>{goal.status}</span>
                </div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">{goal.title}</h3>
                <p className="text-2xl font-bold text-slate-800 mb-1">{goal.progress}</p>
                <p className="text-xs text-slate-600 mb-3">{goal.label}</p>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`bg-${goal.color} h-2 rounded-full`} style={{ width: `${goal.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
