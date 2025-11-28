import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Eye, FileText, Clock, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const ArtigosAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pastelBlue = '#8AAACF';
    const pastelGreen = '#8EBC9F';
    const pastelPurple = '#AC9CC9';
    const pastelPink = '#CC99A9';
    const pastelOrange = '#C9AF89';

    const gridColor = '#f3f4f6';
    const textColor = '#6b7280';

    try {
      Plotly.newPlot('views-chart', [{
        type: 'bar',
        x: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
        y: [24500, 26800, 28200, 31400, 29600, 33800, 35200, 32400],
        marker: { color: pastelBlue, opacity: 0.9 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Visualizações', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('reading-chart', [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Início', '25%', '50%', '75%', 'Fim'],
        y: [100, 78, 62, 48, 38],
        line: { color: pastelGreen, width: 3 },
        marker: { color: pastelGreen, size: 8 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: '% Leitores', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('categories-chart', [{
        type: 'pie',
        labels: ['Mercado Capitais', 'Compliance', 'Open Finance', 'ESG', 'Crédito', 'Outros'],
        values: [28, 24, 18, 15, 10, 5],
        marker: { colors: [pastelBlue, pastelOrange, pastelPink, pastelGreen, pastelPurple, '#E6D595'] },
        hole: 0.4
      }] as any, {
        margin: { t: 0, r: 0, b: 60, l: 0 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: { orientation: 'h', y: -0.1, font: { color: textColor, size: 11 } }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('engagement-chart', [{
        type: 'bar',
        x: ['Comentários', 'Compartilh.', 'Favoritos', 'Citações'],
        y: [3240, 1850, 2680, 840],
        marker: { color: pastelPink, opacity: 0.9 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Interações', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('growth-chart', [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        y: [178000, 188000, 195000, 202000, 207000, 210000],
        line: { color: pastelOrange, width: 3 },
        marker: { color: pastelOrange, size: 10 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Visualizações', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}
  }, []);

  const topArtigos = [
    { title: 'Open Finance: O Futuro do Sistema Bancário', views: 8240, readRate: '72%', avgTime: '4m 24s' },
    { title: 'Compliance em Tempos de Transformação Digital', views: 7850, readRate: '68%', avgTime: '5m 12s' },
    { title: 'ESG: Como Implementar na Prática', views: 7420, readRate: '81%', avgTime: '6m 45s' },
    { title: 'Análise de Crédito com IA', views: 6980, readRate: '65%', avgTime: '3m 52s' },
    { title: 'Gestão de Riscos no Mercado de Capitais', views: 6540, readRate: '74%', avgTime: '5m 38s' }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/conteudo-analytics')} className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm">
                <ChevronLeft size={18} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Artigos</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise de visualizações e engajamento de artigos.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input type="text" placeholder="Buscar artigos..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 w-64 shadow-sm text-slate-600" />
              </div>
              <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative shadow-sm">
                <Bell size={20} />
                <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="py-8 px-4 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Artigos</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">842</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 24 este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600"><FileText size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Visualizações</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">210k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Eye size={12} /> 5% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(270,35%,78%)] flex items-center justify-center text-slate-600"><Eye size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Leitura</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">38%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 4% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600"><TrendingUp size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Tempo Médio</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">4m 52s</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Clock size={12} /> 8% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(24,42%,75%)] flex items-center justify-center text-slate-600"><Clock size={20} /></div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Visualizações Semanais</h2>
                  <p className="text-sm text-slate-500 mt-1">Total de views nas últimas semanas</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2"><Download size={14} />Exportar</button>
              </div>
              <div id="views-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Progressão de Leitura</h2>
                <p className="text-sm text-slate-500 mt-1">% que lêem até o final</p>
              </div>
              <div id="reading-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Distribuição por Categoria</h2>
                <p className="text-sm text-slate-500 mt-1">Artigos por tema</p>
              </div>
              <div id="categories-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Métricas de Engajamento</h2>
              <div id="engagement-chart" className="h-[280px] w-full"></div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Crescimento de Visualizações</h2>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2"><Download size={14} />Exportar</button>
            </div>
            <div id="growth-chart" className="h-[300px] w-full"></div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Artigos Mais Lidos</h2>
              <p className="text-sm text-slate-500 mt-1">Ranking dos artigos mais visualizados</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Posição</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Título</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Visualizações</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Taxa de Leitura</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Tempo Médio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topArtigos.map((artigo, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4"><div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(206,35%,75%)] text-slate-700 font-bold text-sm">{idx + 1}</div></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{artigo.title}</p></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{artigo.views.toLocaleString()}</p></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                            <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: artigo.readRate }}></div>
                          </div>
                          <span className="text-sm font-bold text-slate-800 w-12">{artigo.readRate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-sm text-slate-600">{artigo.avgTime}</p></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ArtigosAnalytics;
