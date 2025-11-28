import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Eye, LineChart, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const AnalisesAnalytics = () => {
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
        x: ['Análise 1', 'Análise 2', 'Análise 3', 'Análise 4', 'Análise 5', 'Análise 6'],
        y: [6420, 7850, 5240, 6980, 8120, 6340],
        marker: { color: pastelGreen, opacity: 0.9 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Visualizações', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('accuracy-chart', [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        y: [82, 84, 86, 88, 87, 89],
        line: { color: pastelGreen, width: 3 },
        marker: { color: pastelGreen, size: 8 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: '% Acurácia', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('types-chart', [{
        type: 'pie',
        labels: ['Técnica', 'Fundamentalista', 'Setorial', 'Macroeconômica', 'Quantitativa'],
        values: [32, 28, 22, 12, 6],
        marker: { colors: [pastelBlue, pastelOrange, pastelPink, pastelGreen, pastelPurple] },
        hole: 0.4
      }] as any, {
        margin: { t: 0, r: 0, b: 60, l: 0 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: { orientation: 'h', y: -0.1, font: { color: textColor, size: 11 } }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('downloads-chart', [{
        type: 'bar',
        x: ['Análise 1', 'Análise 2', 'Análise 3', 'Análise 4', 'Análise 5', 'Análise 6'],
        y: [1240, 1580, 980, 1420, 1720, 1180],
        marker: { color: pastelPurple, opacity: 0.9 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Downloads', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('growth-chart', [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        y: [38000, 40200, 42800, 43600, 44400, 45200],
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

  const topAnalises = [
    { title: 'Análise Técnica: IBOV para 2025', views: 8120, accuracy: '89%', downloads: 1720 },
    { title: 'Fundamentalista: Setor Bancário', views: 7850, accuracy: '87%', downloads: 1580 },
    { title: 'Análise Setorial: Fintechs', views: 6980, accuracy: '88%', downloads: 1420 },
    { title: 'Técnica: Padrões Gráficos Emergentes', views: 6420, accuracy: '86%', downloads: 1240 },
    { title: 'Macroeconômica: Taxa SELIC 2025', views: 6340, accuracy: '90%', downloads: 1180 }
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
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Análises Técnicas</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Métricas de performance e acurácia das análises.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input type="text" placeholder="Buscar análises..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 w-64 shadow-sm text-slate-600" />
              </div>
              <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative shadow-sm">
                <Bell size={20} />
                <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Análises</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">120</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 8 este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600"><LineChart size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Visualizações</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">45.2k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Eye size={12} /> 18% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600"><Eye size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Acurácia</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">89%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 3% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600"><TrendingUp size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Downloads Totais</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">8.1k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Users size={12} /> 12% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(270,35%,78%)] flex items-center justify-center text-slate-600"><Users size={20} /></div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Visualizações por Análise</h2>
                  <p className="text-sm text-slate-500 mt-1">Total de views por relatório</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2"><Download size={14} />Exportar</button>
              </div>
              <div id="views-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Evolução da Acurácia</h2>
                <p className="text-sm text-slate-500 mt-1">% de assertividade das previsões</p>
              </div>
              <div id="accuracy-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Tipos de Análise</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por metodologia</p>
              </div>
              <div id="types-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Downloads por Análise</h2>
              <div id="downloads-chart" className="h-[280px] w-full"></div>
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
              <h2 className="text-xl font-bold text-slate-800">Análises Mais Acessadas</h2>
              <p className="text-sm text-slate-500 mt-1">Ranking das análises com maior audiência</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Posição</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Título</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Visualizações</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Acurácia</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Downloads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topAnalises.map((analise, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4"><div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(142,35%,75%)] text-slate-700 font-bold text-sm">{idx + 1}</div></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{analise.title}</p></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{analise.views.toLocaleString()}</p></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                            <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: analise.accuracy }}></div>
                          </div>
                          <span className="text-sm font-bold text-slate-800 w-12">{analise.accuracy}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-sm text-slate-600">{analise.downloads}</p></td>
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

export default AnalisesAnalytics;
