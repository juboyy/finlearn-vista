import { useEffect } from "react";
import { 
  Newspaper, 
  CalendarDays, 
  Calendar, 
  Clock, 
  HourglassIcon, 
  CheckCircle,
  Globe,
  Bookmark,
  Share,
  MessageSquare,
  ChartLine,
  Scale,
  CreditCard,
  Building,
  TrendingUp,
  Lightbulb,
  Trophy,
  Star,
  Plus,
  Download,
  PlusCircle
} from "lucide-react";
import Plot from "react-plotly.js";

export const NewspaperAnalytics = () => {
  const stats = [
    { icon: Newspaper, label: "Artigos Hoje", value: "47", lidos: "32", change: "+8", color: "bg-[#B8D4E8]" },
    { icon: CalendarDays, label: "Artigos Semana", value: "284", lidos: "198", change: "+42", color: "bg-[#C5E8D4]" },
    { icon: Calendar, label: "Artigos Mês", value: "1,247", lidos: "892", change: "+156", color: "bg-[#E8E0C5]", changeColor: "text-blue-600 bg-blue-50" },
    { icon: Clock, label: "Tempo Semana", value: "8.4h", media: "1.2h/dia", change: "+1.2h", color: "bg-[#E8C5D8]" },
    { icon: HourglassIcon, label: "Tempo Mês", value: "32.6h", media: "1.1h/dia", change: "+4.8h", color: "bg-[#D4C5E8]" },
    { icon: CheckCircle, label: "Taxa Conclusão", value: "71%", media: "Média mensal", change: "+6%", color: "bg-[#E8D4C5]" },
  ];

  const topSources = [
    { name: "Valor Econômico", articles: "248", percentage: 32, color: "bg-[#B8D4E8]", icon: "bg-[#B8D4E8]" },
    { name: "InfoMoney", articles: "186", percentage: 24, color: "bg-[#C5E8D4]", icon: "bg-[#C5E8D4]" },
    { name: "Bloomberg Brasil", articles: "142", percentage: 18, color: "bg-[#D4C5E8]", icon: "bg-[#D4C5E8]" },
    { name: "Estadão Economia", articles: "98", percentage: 13, color: "bg-[#E8E0C5]", icon: "bg-[#E8E0C5]" },
    { name: "CVM Notícias", articles: "72", percentage: 9, color: "bg-[#E8C5D8]", icon: "bg-[#E8C5D8]" },
    { name: "Outros", articles: "46", percentage: 4, color: "bg-[#E8D4C5]", icon: "bg-[#E8D4C5]" },
  ];

  const readingActions = [
    { icon: Bookmark, label: "Favoritados", value: "124", change: "+18 esta semana", color: "bg-[#B8D4E8]" },
    { icon: Clock, label: "Ler Mais Tarde", value: "67", change: "+12 hoje", color: "bg-[#C5E8D4]", changeColor: "text-blue-600" },
    { icon: Share, label: "Compartilhados", value: "43", change: "+7 esta semana", color: "bg-[#D4C5E8]" },
    { icon: MessageSquare, label: "Comentados", value: "89", change: "+14 esta semana", color: "bg-[#E8E0C5]" },
  ];

  const weekDistribution = [
    { day: "Segunda", hours: "1.8h", percentage: 90, color: "bg-[#B8D4E8]" },
    { day: "Terça", hours: "1.4h", percentage: 70, color: "bg-[#C5E8D4]" },
    { day: "Quarta", hours: "1.6h", percentage: 80, color: "bg-[#D4C5E8]" },
    { day: "Quinta", hours: "1.2h", percentage: 60, color: "bg-[#E8E0C5]" },
    { day: "Sexta", hours: "1.0h", percentage: 50, color: "bg-[#E8C5D8]" },
    { day: "Sábado", hours: "0.8h", percentage: 40, color: "bg-[#E8D4C5]" },
    { day: "Domingo", hours: "0.6h", percentage: 30, color: "bg-slate-300" },
  ];

  const topicCards = [
    { icon: ChartLine, title: "Mercado de Capitais", articles: "187", time: "8.2h", percentage: 28, color: "bg-[#B8D4E8]", badge: "Top 1", badgeColor: "text-green-600 bg-green-50" },
    { icon: Scale, title: "Regulamentação", articles: "142", time: "6.8h", percentage: 21, color: "bg-[#C5E8D4]", badge: "Top 2", badgeColor: "text-blue-600 bg-blue-50" },
    { icon: CreditCard, title: "Payments", articles: "128", time: "5.4h", percentage: 19, color: "bg-[#D4C5E8]", badge: "Top 3", badgeColor: "text-purple-600 bg-purple-50" },
    { icon: Building, title: "Banking", articles: "96", time: "4.1h", percentage: 14, color: "bg-[#E8E0C5]", badge: "Top 4", badgeColor: "text-slate-600 bg-slate-50" },
    { icon: TrendingUp, title: "Fintech", articles: "84", time: "3.8h", percentage: 12, color: "bg-[#E8C5D8]", badge: "Top 5", badgeColor: "text-slate-600 bg-slate-50" },
  ];

  const trendingArticles = [
    { rank: 1, title: "Nova regulamentação da CVM para fundos de investimento", reads: "2.4K", time: "5 min", source: "Valor Econômico", color: "bg-[#B8D4E8]" },
    { rank: 2, title: "PIX ultrapassa 200 milhões de transações diárias", reads: "1.8K", time: "4 min", source: "InfoMoney", color: "bg-[#C5E8D4]" },
    { rank: 3, title: "Análise: Cenário macroeconômico para 2024", reads: "1.6K", time: "8 min", source: "Bloomberg Brasil", color: "bg-[#D4C5E8]" },
    { rank: 4, title: "Open Finance: novas funcionalidades disponíveis", reads: "1.4K", time: "6 min", source: "Estadão Economia", color: "bg-[#E8E0C5]" },
    { rank: 5, title: "Compliance: principais mudanças na legislação", reads: "1.2K", time: "7 min", source: "CVM Notícias", color: "bg-[#E8C5D8]" },
  ];

  const insights = [
    { icon: Lightbulb, title: "Pico de produtividade", text: "Você lê 35% mais rápido pela manhã. Aproveite este horário para artigos mais complexos.", color: "bg-[#B8D4E8]" },
    { icon: Trophy, title: "Meta alcançada", text: "Você superou sua meta semanal de 6 horas de leitura! Continue assim.", color: "bg-[#C5E8D4]" },
    { icon: Bookmark, title: "Lista acumulada", text: "Você tem 67 artigos para ler mais tarde. Que tal dedicar 30 min hoje?", color: "bg-[#D4C5E8]" },
    { icon: ChartLine, title: "Tendência positiva", text: "Sua taxa de conclusão aumentou 8% este mês. Excelente progresso!", color: "bg-[#E8E0C5]" },
    { icon: PlusCircle, title: "Explore novos temas", text: "Considere ler sobre Fintech e Inovação Financeira para diversificar.", color: "border border-[#E8C5D8] bg-[#E8C5D8] bg-opacity-20" },
    { icon: Star, title: "Consistência é a chave", text: "Você manteve uma rotina de leitura por 23 dias consecutivos!", color: "border border-[#E8D4C5] bg-[#E8D4C5] bg-opacity-20" },
  ];

  const goals = [
    { icon: CalendarDays, title: "Meta Diária", value: "32/30", label: "artigos lidos hoje", percentage: 100, color: "bg-[#B8D4E8]", badge: "Atingida", badgeColor: "text-green-600 bg-green-50" },
    { icon: CalendarDays, title: "Meta Semanal", value: "198/180", label: "artigos esta semana", percentage: 100, color: "bg-[#C5E8D4]", badge: "Atingida", badgeColor: "text-green-600 bg-green-50" },
    { icon: Clock, title: "Tempo Semanal", value: "8.4/10h", label: "horas de leitura", percentage: 84, color: "bg-[#D4C5E8]", badge: "Em andamento", badgeColor: "text-blue-600 bg-blue-50" },
    { icon: CheckCircle, title: "Taxa de Conclusão", value: "71/75%", label: "meta mensal", percentage: 95, color: "bg-[#E8E0C5]", badge: "Em andamento", badgeColor: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 -mx-8 -mt-8 mb-8 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Analytics de Newspaper</h1>
          <p className="text-sm text-slate-500 mt-1">Análise completa do seu consumo de notícias e artigos do mercado financeiro</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="text-sm text-slate-600 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]">
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Últimos 90 dias</option>
            <option>Este ano</option>
          </select>
          <button className="px-4 py-2 bg-[#D4C5E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
            <Download className="w-4 h-4 inline mr-2" />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* KPIs */}
      <section className="grid grid-cols-6 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-slate-700 w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${stat.changeColor || 'text-green-600 bg-green-50'} px-2 py-1 rounded`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="text-xs text-slate-600 mt-2">
                {stat.lidos ? `Lidos: ` : stat.media ? 'Média: ' : ''}<span className="font-semibold">{stat.lidos || stat.media}</span>
              </p>
            </div>
          );
        })}
      </section>

      {/* Reading Performance & Top Sources */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Desempenho de Leitura</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#B8D4E8] text-slate-700 rounded-lg text-sm font-medium">Semanal</button>
              <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Mensal</button>
            </div>
          </div>
          <Plot
            data={[
              {
                x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                y: [42, 38, 45, 32, 28, 18, 12],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Artigos Lidos',
                marker: { color: '#B8D4E8', size: 10 },
                line: { color: '#B8D4E8', width: 3 },
                fill: 'tozeroy'
              },
              {
                x: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                y: [50, 45, 48, 40, 35, 25, 20],
                type: 'scatter',
                mode: 'lines',
                name: 'Meta',
                line: { color: '#D4C5E8', width: 2, dash: 'dash' }
              }
            ]}
            layout={{
              autosize: true,
              height: 320,
              xaxis: { title: '' },
              yaxis: { title: 'Número de Artigos' },
              margin: { t: 20, r: 20, b: 60, l: 60 },
              plot_bgcolor: '#ffffff',
              paper_bgcolor: '#ffffff',
              showlegend: true,
              legend: { orientation: 'h', y: -0.2 }
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
            {topSources.map((source, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-12 h-12 ${source.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Globe className="text-slate-700 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">{source.name}</span>
                    <span className="text-sm font-bold text-slate-800">{source.articles} artigos</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`${source.color} h-2 rounded-full`} style={{ width: `${source.percentage}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{source.percentage}% do total lido</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Reading Actions, Content Types & Time Distribution */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Ações de Leitura</h2>
          <div className="space-y-4">
            {readingActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className={`p-4 ${action.color} rounded-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="text-slate-700 w-5 h-5" />
                      <span className="text-sm font-medium text-slate-700">{action.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800">{action.value}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className={`${action.changeColor || 'text-green-600'} font-medium`}>{action.change}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Tipos de Conteúdo Lidos</h2>
          <Plot
            data={[
              {
                labels: ['Notícias', 'Análises', 'Regulamentação', 'Entrevistas', 'Opinião'],
                values: [35, 28, 20, 10, 7],
                type: 'pie',
                marker: {
                  colors: ['#B8D4E8', '#C5E8D4', '#D4C5E8', '#E8E0C5', '#E8C5D8']
                },
                textinfo: 'label+percent',
                textposition: 'inside',
                hole: 0.4
              }
            ]}
            layout={{
              autosize: true,
              height: 320,
              margin: { t: 20, r: 20, b: 20, l: 20 },
              paper_bgcolor: '#ffffff',
              showlegend: false
            }}
            config={{ responsive: true, displayModeBar: false, displaylogo: false }}
            className="w-full"
          />
        </section>

        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Distribuição de Tempo</h2>
          <div className="space-y-5">
            {weekDistribution.map((day, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">{day.day}</span>
                  <span className="text-sm font-medium text-slate-800">{day.hours}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${day.color} h-2 rounded-full`} style={{ width: `${day.percentage}%` }}></div>
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

      {/* Reading Topics */}
      <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Temas Mais Lidos</h2>
        <div className="grid grid-cols-5 gap-4">
          {topicCards.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div key={index} className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${topic.color} rounded-full flex items-center justify-center`}>
                    <Icon className="text-slate-700 w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${topic.badgeColor} px-2 py-1 rounded`}>{topic.badge}</span>
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
                    <div className={`${topic.color} h-2 rounded-full`} style={{ width: `${topic.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Completion Rate & Reading Behavior */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Taxa de Conclusão</h2>
          <Plot
            data={[
              {
                x: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                y: [65, 68, 70, 71],
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#B8D4E8', size: 10 },
                line: { color: '#B8D4E8', width: 3 },
                fill: 'tozeroy'
              }
            ]}
            layout={{
              autosize: true,
              height: 320,
              xaxis: { title: '' },
              yaxis: { title: 'Taxa de Conclusão (%)', range: [60, 75] },
              margin: { t: 20, r: 20, b: 60, l: 60 },
              plot_bgcolor: '#ffffff',
              paper_bgcolor: '#ffffff',
              showlegend: false
            }}
            config={{ responsive: true, displayModeBar: false, displaylogo: false }}
            className="w-full"
          />
        </section>

        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Comportamento de Leitura</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">Tempo Médio</span>
                <span className="text-lg font-bold text-slate-800">6.2 min</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-3 h-3" />
                <span>12% mais rápido que a média geral</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">Artigos por Sessão</span>
                <span className="text-lg font-bold text-slate-800">6.8</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Newspaper className="w-3 h-3" />
                <span>Média de artigos lidos por sessão</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">Frequência Semanal</span>
                <span className="text-lg font-bold text-slate-800">5.6 dias</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CalendarDays className="w-3 h-3" />
                <span>Dias ativos de leitura por semana</span>
              </div>
            </div>
            <Plot
              data={[
                {
                  x: ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h'],
                  y: [8, 42, 28, 12, 18, 15, 8, 5],
                  type: 'bar',
                  marker: { color: '#B8D4E8' }
                }
              ]}
              layout={{
                autosize: true,
                height: 160,
                xaxis: { title: 'Horário' },
                yaxis: { title: 'Artigos (%)' },
                margin: { t: 10, r: 20, b: 40, l: 50 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: false
              }}
              config={{ responsive: true, displayModeBar: false, displaylogo: false }}
              className="w-full"
            />
          </div>
        </section>
      </div>

      {/* Monthly Comparison */}
      <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Comparação Mensal</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#B8D4E8] text-slate-700 rounded-lg text-sm font-medium">Artigos</button>
            <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Tempo</button>
            <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition">Conclusão</button>
          </div>
        </div>
        <Plot
          data={[
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
          ]}
          layout={{
            autosize: true,
            height: 400,
            xaxis: { title: '' },
            yaxis: { title: 'Artigos Lidos', side: 'left' },
            yaxis2: { title: 'Tempo (horas)', overlaying: 'y', side: 'right', showgrid: false },
            margin: { t: 40, r: 80, b: 80, l: 60 },
            plot_bgcolor: '#ffffff',
            paper_bgcolor: '#ffffff',
            showlegend: true,
            legend: { orientation: 'h', y: -0.2 }
          }}
          config={{ responsive: true, displayModeBar: false, displaylogo: false }}
          className="w-full"
        />
      </section>

      {/* Trending Articles & Insights */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Artigos em Destaque Esta Semana</h2>
          <div className="space-y-4">
            {trendingArticles.map((article) => (
              <div key={article.rank} className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                <div className={`w-10 h-10 ${article.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-sm font-bold text-slate-700">{article.rank}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 mb-1">{article.title}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-eye"></i>
                      {article.reads} leituras
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.time}
                    </span>
                    <span className="font-medium" style={{ color: article.color.replace('bg-', '') }}>{article.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Insights e Recomendações</h2>
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className={`p-4 rounded-lg ${insight.color}`}>
                  <div className="flex items-start gap-3">
                    <Icon className="text-slate-700 w-4 h-4 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-800 mb-1">{insight.title}</p>
                      <p className="text-xs text-slate-600">{insight.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Reading Goals */}
      <section className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-800">Metas de Leitura</h2>
          <button className="px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
            <Plus className="w-4 h-4 inline mr-2" />
            Adicionar Meta
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div key={index} className="p-5 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${goal.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-slate-700 w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${goal.badgeColor} px-2 py-1 rounded`}>{goal.badge}</span>
                </div>
                <h3 className="text-sm font-medium text-slate-700 mb-2">{goal.title}</h3>
                <p className="text-2xl font-bold text-slate-800 mb-1">{goal.value}</p>
                <p className="text-xs text-slate-600 mb-3">{goal.label}</p>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${goal.color} h-2 rounded-full`} style={{ width: `${goal.percentage}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};