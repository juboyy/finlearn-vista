import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Eye, Newspaper, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NewspaperAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pastelPink = '#CC99A9';
    const pastelGreen = '#8EBC9F';
    const pastelBlue = '#8AAACF';
    const textColor = '#6b7280';
    const gridColor = '#f3f4f6';

    try {
      Plotly.newPlot('editions-chart', [{ type: 'bar', x: ['Ed 1', 'Ed 2', 'Ed 3', 'Ed 4', 'Ed 5'], y: [1240, 1580, 980, 1420, 1650], marker: { color: pastelPink, opacity: 0.9 } }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 }, plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Leitores', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });

      Plotly.newPlot('sections-chart', [{ type: 'pie', labels: ['Mercado', 'Regulação', 'Tecnologia', 'Opinião', 'Outros'], values: [35, 28, 18, 12, 7], marker: { colors: ['#8AAACF', '#C9AF89', '#CC99A9', '#8EBC9F', '#AC9CC9'] }, hole: 0.4 }] as any, {
        margin: { t: 0, r: 0, b: 60, l: 0 }, paper_bgcolor: 'rgba(0,0,0,0)', showlegend: true, legend: { orientation: 'h', y: -0.1, font: { color: textColor, size: 11 } }
      } as any, { responsive: true, displayModeBar: false });

      Plotly.newPlot('growth-chart', [{ type: 'scatter', mode: 'lines+markers', x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], y: [7200, 7800, 8200, 8600, 8800, 8900], line: { color: pastelBlue, width: 3 }, marker: { color: pastelBlue, size: 10 } }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 }, plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Leitores', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}
  }, []);

  const topEditions = [
    { title: 'Edição Especial: Reforma Tributária', readers: 1650, engagement: '78%', avgTime: '8m 30s' },
    { title: 'Panorama Semanal do Mercado', readers: 1580, engagement: '72%', avgTime: '7m 15s' },
    { title: 'Open Finance: Atualizações Regulatórias', readers: 1420, engagement: '85%', avgTime: '9m 20s' },
    { title: 'Edição 310: Análise de Crédito', readers: 1240, engagement: '68%', avgTime: '6m 45s' },
    { title: 'Panorama ESG no Brasil', readers: 980, engagement: '74%', avgTime: '7m 50s' }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/conteudo-analytics')} className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"><ChevronLeft size={18} /></button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Newspaper</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise de leitores e engajamento das edições.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input type="text" placeholder="Buscar edições..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 w-64 shadow-sm text-slate-600" />
              </div>
              <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative shadow-sm">
                <Bell size={20} />
                <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="py-8 px-4 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Edições</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">312</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 12 este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(340,35%,78%)] flex items-center justify-center text-slate-600"><Newspaper size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Leitores</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">8.9k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Eye size={12} /> 5% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600"><Eye size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Engajamento</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">74%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 8% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600"><TrendingUp size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Tempo Médio</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">7m 48s</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Clock size={12} /> 4% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(24,42%,75%)] flex items-center justify-center text-slate-600"><Clock size={20} /></div>
            </div>
            
            {/* Creators Mais Lidos */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-500">Creators Mais Lidos</p>
                <i className="fas fa-users text-slate-400"></i>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[hsl(206,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">FT</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">FinTech Brasil</p>
                    <p className="text-xs text-slate-500">124 edições lidas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[hsl(142,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">BC</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">BACEN Insights</p>
                    <p className="text-xs text-slate-500">98 edições lidas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[hsl(280,35%,75%)] flex items-center justify-center text-xs font-bold text-slate-700">MF</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">Mercado Financeiro</p>
                    <p className="text-xs text-slate-500">87 edições lidas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progresso de Meta do Mês */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-500">Meta do Mês</p>
                <i className="fas fa-target text-slate-400"></i>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-slate-800">48 de 60 edições</p>
                    <p className="text-xs font-bold text-slate-600">80%</p>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Faltam 12 edições para atingir sua meta mensal</p>
                <div className="flex items-center gap-2 pt-2">
                  <i className="fas fa-fire text-orange-500 text-sm"></i>
                  <p className="text-xs font-bold text-slate-700">Sequência de 14 dias!</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Leitores por Edição</h2>
              <div id="editions-chart" className="h-[280px] w-full"></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Seções Mais Lidas</h2>
              <div id="sections-chart" className="h-[280px] w-full"></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Crescimento de Leitores</h2>
              <div id="growth-chart" className="h-[280px] w-full"></div>
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Edições Mais Lidas</h2>
              <p className="text-sm text-slate-500 mt-1">Ranking das edições com maior audiência</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Posição</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Título</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Leitores</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Engajamento</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Tempo Médio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topEditions.map((edition, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4"><div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(340,35%,78%)] text-slate-700 font-bold text-sm">{idx + 1}</div></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{edition.title}</p></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{edition.readers}</p></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                            <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: edition.engagement }}></div>
                          </div>
                          <span className="text-sm font-bold text-slate-800 w-12">{edition.engagement}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-sm text-slate-600">{edition.avgTime}</p></td>
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

export default NewspaperAnalytics;
