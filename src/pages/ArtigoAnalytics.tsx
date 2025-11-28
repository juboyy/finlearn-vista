import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, RefreshCw, Download, FileText, Calendar, Clock, Eye, Link as LinkIcon, Check, AlertTriangle, Lightbulb, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import Plot from "react-plotly.js";

export default function ArtigoAnalytics() {
  const performanceData = [
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Impressões',
      x: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29'],
      y: [82, 95, 88, 102, 115, 108, 125, 118, 132, 145, 138, 152, 165, 158, 172],
      line: { color: '#B8D4E8', width: 3 },
      yaxis: 'y'
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Cliques',
      x: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29'],
      y: [12, 15, 14, 18, 21, 19, 23, 22, 26, 28, 26, 30, 32, 31, 35],
      line: { color: '#C5E8D4', width: 3 },
      yaxis: 'y2'
    }
  ];

  const geoData = [
    {
      type: 'bar',
      x: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Minas Gerais', 'Paraná', 'Outros'],
      y: [42, 18, 12, 9, 7, 12],
      marker: { color: '#B8D4E8' }
    }
  ];

  const deviceData = [
    {
      type: 'pie',
      labels: ['Desktop', 'Mobile', 'Tablet'],
      values: [58, 35, 7],
      marker: {
        colors: ['#B8D4E8', '#D4C5E8', '#C5E8D4']
      },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>%{value} visualizações<br>%{percent}<extra></extra>',
      hole: 0.4
    }
  ];

  const radarData = [
    {
      type: 'scatterpolar',
      r: [85, 90, 88, 92, 87, 85],
      theta: ['SEO', 'Conteúdo', 'Técnico', 'UX', 'Mobile', 'Velocidade'],
      fill: 'toself',
      name: 'Seu Artigo',
      marker: { color: '#B8D4E8' }
    },
    {
      type: 'scatterpolar',
      r: [72, 75, 70, 78, 73, 71],
      theta: ['SEO', 'Conteúdo', 'Técnico', 'UX', 'Mobile', 'Velocidade'],
      fill: 'toself',
      name: 'Média Geral',
      marker: { color: '#D4C5E8' }
    }
  ];

  const bounceData = [
    {
      type: 'indicator',
      mode: 'gauge+number+delta',
      value: 32,
      delta: { reference: 45, increasing: { color: '#10b981' } },
      gauge: {
        axis: { range: [null, 100] },
        bar: { color: '#C5E8D4' },
        steps: [
          { range: [0, 30], color: '#f1f5f9' },
          { range: [30, 60], color: '#e2e8f0' },
          { range: [60, 100], color: '#cbd5e1' }
        ],
        threshold: {
          line: { color: 'red', width: 4 },
          thickness: 0.75,
          value: 45
        }
      }
    }
  ];

  const engagementData = [
    {
      type: 'bar',
      x: ['0-1min', '1-2min', '2-3min', '3-4min', '4-5min', '5min+'],
      y: [8, 15, 22, 28, 18, 9],
      marker: { color: '#D4C5E8' }
    }
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 flex items-center gap-4">
                <Link to="/meus-conteudos" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">SEO Analytics - Artigo</h1>
                  <p className="text-sm text-muted-foreground mt-1">Análise completa de performance SEO e GEO</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Atualizar
                </button>
                <button className="px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-accent/10 transition flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#B8D4E8] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#475569]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-foreground mb-1">Tendências do Mercado de Capitais Brasileiro em 2024</h2>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Publicado: 15 Nov 2024</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Última atualização: 18 Nov 2024</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />2.847 visualizações</span>
                    <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" />finlearn.com.br/artigos/tendencias-mercado-capitais-2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Overall Score Section */}
            <section className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke="#C5E8D4" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="52.78" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <div className="text-4xl font-bold text-foreground">85</div>
                        <div className="text-xs text-muted-foreground">de 100</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">SEO Score Geral</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Excelente
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke="#B8D4E8" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="70.37" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <div className="text-4xl font-bold text-foreground">80</div>
                        <div className="text-xs text-muted-foreground">de 100</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">GEO Score</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Muito Bom
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
                      <circle cx="64" cy="64" r="56" stroke="#D4C5E8" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="35.19" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <div className="text-4xl font-bold text-foreground">90</div>
                        <div className="text-xs text-muted-foreground">de 100</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Content Quality</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Excepcional
                  </div>
                </div>
              </div>
            </section>

            {/* SEO KPIs */}
            <section className="grid grid-cols-6 gap-6 mb-8">
              {[
                { label: 'Impressões', value: '2.847', change: '+24%', icon: '🔍', bg: '#B8D4E8' },
                { label: 'Cliques', value: '487', change: '+18%', icon: '🖱️', bg: '#C5E8D4' },
                { label: 'CTR', value: '17.1%', change: '+3%', icon: '📊', bg: '#D4C5E8' },
                { label: 'Posição Média', value: '3.2', change: '↑ 2', icon: '🏆', bg: '#E8E0C5' },
                { label: 'Tempo Médio', value: '4:32', change: '+45s', icon: '⏱️', bg: '#E8C5D8' },
                { label: 'Backlinks', value: '23', change: '+5', icon: '🔗', bg: '#E8D4C5' },
              ].map((kpi, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: kpi.bg }}>
                      {kpi.icon}
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{kpi.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                </div>
              ))}
            </section>

            {/* Performance Chart + SEO Checklist */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <section className="col-span-2 bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Performance nos Últimos 30 Dias</h2>
                <Plot
                  data={performanceData}
                  layout={{
                    margin: { t: 20, r: 60, b: 40, l: 60 },
                    showlegend: true,
                    legend: { orientation: 'h', y: -0.15 },
                    xaxis: { showgrid: false, title: 'Dia' },
                    yaxis: { showgrid: true, gridcolor: '#f1f5f9', title: 'Impressões' },
                    yaxis2: { title: 'Cliques', overlaying: 'y', side: 'right' },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    height: 320
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  className="w-full"
                />
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Checklist SEO</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Meta Title', score: '100%', status: 'check' },
                    { label: 'Meta Description', score: '95%', status: 'check' },
                    { label: 'Heading Tags', score: '90%', status: 'check' },
                    { label: 'Alt Text', score: '85%', status: 'check' },
                    { label: 'Internal Links', score: '70%', status: 'warning' },
                    { label: 'URL Structure', score: '100%', status: 'check' },
                    { label: 'Mobile Friendly', score: '100%', status: 'check' },
                    { label: 'Page Speed', score: '88%', status: 'check' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.status === 'check' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                          {item.status === 'check' ? <Check className="w-4 h-4 text-green-600" /> : <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                        </div>
                        <span className="text-sm text-foreground">{item.label}</span>
                      </div>
                      <span className={`text-xs font-medium ${item.status === 'check' ? 'text-green-600' : 'text-yellow-600'}`}>{item.score}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Keyword Performance */}
            <section className="bg-card rounded-xl p-6 border border-border mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-6">Performance por Palavra-Chave</h2>
              <div className="space-y-4">
                {[
                  { rank: 1, keyword: 'mercado de capitais brasil', impressions: '1.240', clicks: '187', ctr: '15.1%', position: '2.3', change: '↑ 1.2', bg: '#B8D4E8' },
                  { rank: 2, keyword: 'tendências mercado financeiro 2024', impressions: '892', clicks: '156', ctr: '17.5%', position: '3.1', change: '↑ 0.8', bg: '#C5E8D4' },
                  { rank: 3, keyword: 'investimentos renda variável', impressions: '715', clicks: '144', ctr: '20.1%', position: '4.8', change: '↑ 2.3', bg: '#D4C5E8' },
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-[#475569]" style={{ backgroundColor: item.bg }}>
                        {item.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground mb-1">{item.keyword}</h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>🔍 {item.impressions} impressões</span>
                          <span>🖱️ {item.clicks} cliques</span>
                          <span>📊 {item.ctr} CTR</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xl font-bold text-foreground">{item.position}</div>
                        <div className="text-xs text-muted-foreground">Posição</div>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Geo Distribution + Device Breakdown */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Distribuição Geográfica</h2>
                <Plot
                  data={geoData}
                  layout={{
                    margin: { t: 20, r: 20, b: 60, l: 40 },
                    showlegend: false,
                    xaxis: { showgrid: false },
                    yaxis: { showgrid: true, gridcolor: '#f1f5f9', title: 'Visualizações (%)' },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    height: 350
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  className="w-full"
                />
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Distribuição por Dispositivo</h2>
                <Plot
                  data={deviceData}
                  layout={{
                    margin: { t: 20, r: 20, b: 20, l: 20 },
                    showlegend: true,
                    legend: { orientation: 'v', x: 1, y: 0.5 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    height: 350
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  className="w-full"
                />
              </section>
            </div>

            {/* Technical SEO Analysis */}
            <section className="bg-card rounded-xl p-6 border border-border mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-6">Análise Técnica de SEO</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  {[
                    { label: 'Meta Title Length', value: '58 caracteres', progress: 97, color: '#C5E8D4' },
                    { label: 'Meta Description Length', value: '152 caracteres', progress: 95, color: '#C5E8D4' },
                    { label: 'Keyword Density', value: '2.8%', progress: 93, color: '#B8D4E8' },
                    { label: 'Content Length', value: '2.450 palavras', progress: 98, color: '#C5E8D4' },
                  ].map((item, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <span className="text-sm font-semibold text-foreground">{item.value}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${item.progress}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  {[
                    { label: 'Readability Score', value: '72/100', progress: 72, color: '#B8D4E8' },
                    { label: 'Internal Links', value: '12 links', progress: 70, color: '#E8E0C5' },
                    { label: 'External Links', value: '8 links', progress: 88, color: '#C5E8D4' },
                    { label: 'Image Optimization', value: '6/7 otimizadas', progress: 86, color: '#C5E8D4' },
                  ].map((item, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <span className="text-sm font-semibold text-foreground">{item.value}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${item.progress}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Comparison Charts */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Comparação com Média</h2>
                <Plot
                  data={radarData}
                  layout={{
                    margin: { t: 20, r: 60, b: 20, l: 60 },
                    showlegend: true,
                    legend: { orientation: 'h', y: -0.15 },
                    polar: {
                      radialaxis: {
                        visible: true,
                        range: [0, 100]
                      }
                    },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    height: 280
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  className="w-full"
                />
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Taxa de Rejeição</h2>
                <Plot
                  data={bounceData}
                  layout={{
                    margin: { t: 20, r: 20, b: 20, l: 20 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    height: 280
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  className="w-full"
                />
              </section>

              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-6">Tempo de Engajamento</h2>
                <Plot
                  data={engagementData}
                  layout={{
                    margin: { t: 20, r: 20, b: 60, l: 40 },
                    showlegend: false,
                    xaxis: { showgrid: false },
                    yaxis: { showgrid: true, gridcolor: '#f1f5f9', title: 'Usuários (%)' },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    height: 280
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  className="w-full"
                />
              </section>
            </div>

            {/* Recommendations */}
            <section className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Pontos Fortes</h3>
                    <p className="text-xs text-muted-foreground mb-3">Excelente estrutura de headings (H1-H6), meta tags otimizadas e boa densidade de palavras-chave. Conteúdo extenso e bem formatado.</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Otimizado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Melhorias Sugeridas</h3>
                    <p className="text-xs text-muted-foreground mb-3">Aumentar número de links internos para 15-20. Adicionar schema markup para artigos. Melhorar alt text em 1 imagem.</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium">Atenção</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Oportunidades</h3>
                    <p className="text-xs text-muted-foreground mb-3">Criar conteúdo relacionado sobre "análise fundamentalista" e "renda fixa". Potencial para featured snippet na posição #1.</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Crescimento</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Competitor Comparison */}
            <section className="bg-card rounded-xl p-6 border border-border mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-6">Comparação com Concorrentes</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-4">Performance Comparativa</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Seu Artigo', score: 85, color: '#B8D4E8' },
                      { label: 'Concorrente A', score: 78, color: '#D4C5E8' },
                      { label: 'Concorrente B', score: 72, color: '#C5E8D4' },
                      { label: 'Média do Setor', score: 68, color: '#E8E0C5' },
                    ].map((item, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                          <span className="text-xs font-semibold text-foreground">{item.score} pts</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-4">Métricas Detalhadas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Backlinks', value: '23', comparison: 'vs 31 (A)', direction: 'down' },
                      { label: 'Tráfego', value: '2.8K', comparison: 'vs 3.2K (A)', direction: 'down' },
                      { label: 'Engajamento', value: '4.5', comparison: 'vs 3.8 (A)', direction: 'up' },
                      { label: 'Velocidade', value: '1.8s', comparison: 'vs 2.3s (A)', direction: 'up' },
                    ].map((item, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
                        <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                        <div className="flex items-center justify-center gap-1">
                          {item.direction === 'up' ? (
                            <ArrowUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <ArrowDown className="w-3 h-3 text-red-600" />
                          )}
                          <span className={`text-xs ${item.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>{item.comparison}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#B8D4E8] rounded-lg flex items-center justify-center flex-shrink-0">
                        📈
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">Posição no Ranking</p>
                        <p className="text-xs text-muted-foreground">Você está <span className="font-semibold text-foreground">25% acima</span> da média do setor em performance SEO geral</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Metrics */}
            <section className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">Métricas Detalhadas</h2>
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'Backlinks', value: '23', detail: '+5 este mês', color: 'green' },
                  { label: 'Domain Authority', value: '68', detail: 'Muito bom', color: 'blue' },
                  { label: 'Page Load Time', value: '1.8s', detail: 'Excelente', color: 'green' },
                  { label: 'Mobile Score', value: '94', detail: 'Otimizado', color: 'green' },
                  { label: 'Taxa de Rejeição', value: '32%', detail: 'Abaixo da média', color: 'green' },
                  { label: 'Páginas/Sessão', value: '4.8', detail: 'Alto engajamento', color: 'green' },
                  { label: 'Scroll Depth', value: '87%', detail: 'Conteúdo relevante', color: 'green' },
                  { label: 'Social Shares', value: '156', detail: 'Boa viralização', color: 'blue' },
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-3xl font-bold text-foreground mb-2">{item.value}</div>
                    <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                    <div className={`text-xs ${item.color === 'green' ? 'text-green-600' : 'text-blue-600'}`}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
