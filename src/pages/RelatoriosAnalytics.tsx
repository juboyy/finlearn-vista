import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Eye, FileCheck, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const RelatoriosAnalytics = () => {
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
      Plotly.newPlot('downloads-chart', [{
        type: 'bar',
        x: ['Rel 1', 'Rel 2', 'Rel 3', 'Rel 4', 'Rel 5', 'Rel 6'],
        y: [1840, 2150, 1620, 1980, 2340, 1950],
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
      Plotly.newPlot('completion-chart', [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Seção 1', 'Seção 2', 'Seção 3', 'Seção 4', 'Seção 5'],
        y: [100, 82, 68, 54, 42],
        line: { color: pastelGreen, width: 3 },
        marker: { color: pastelGreen, size: 8 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: '% Leitura', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('types-chart', [{
        type: 'pie',
        labels: ['Financeiro', 'Operacional', 'Executivo', 'Técnico', 'Compliance'],
        values: [30, 26, 20, 15, 9],
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
      Plotly.newPlot('time-chart', [{
        type: 'bar',
        x: ['Rel 1', 'Rel 2', 'Rel 3', 'Rel 4', 'Rel 5', 'Rel 6'],
        y: [22, 28, 18, 24, 32, 25],
        marker: { color: pastelOrange, opacity: 0.9 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Minutos', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    try {
      Plotly.newPlot('growth-chart', [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        y: [10200, 10800, 11200, 11600, 11900, 12100],
        line: { color: pastelPink, width: 3 },
        marker: { color: pastelPink, size: 10 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor } },
        yaxis: { title: 'Downloads', gridcolor: gridColor, tickfont: { color: textColor }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}
  }, []);

  const topRelatorios = [
    { title: 'Relatório Financeiro Q4 2024', downloads: 2340, completion: '64%', avgTime: '32min' },
    { title: 'Análise de Mercado 2025', downloads: 2150, completion: '58%', avgTime: '28min' },
    { title: 'Compliance Anual 2024', downloads: 1980, completion: '72%', avgTime: '24min' },
    { title: 'Performance Operacional', downloads: 1950, completion: '56%', avgTime: '25min' },
    { title: 'Gestão de Riscos Trimestral', downloads: 1840, completion: '68%', avgTime: '22min' }
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
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Relatórios</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise de downloads e leitura de relatórios.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input type="text" placeholder="Buscar relatórios..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 w-64 shadow-sm text-slate-600" />
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
                <p className="text-sm font-semibold text-slate-500">Total de Relatórios</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">64</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 5 este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(270,35%,78%)] flex items-center justify-center text-slate-600"><FileCheck size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Downloads</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">12.1k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Eye size={12} /> 4% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600"><Eye size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Leitura</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">42%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 6% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600"><TrendingUp size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Tempo Médio</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">26min</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Clock size={12} /> 8% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(24,42%,75%)] flex items-center justify-center text-slate-600"><Clock size={20} /></div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Downloads por Relatório</h2>
                  <p className="text-sm text-slate-500 mt-1">Total de downloads por documento</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2"><Download size={14} />Exportar</button>
              </div>
              <div id="downloads-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Taxa de Conclusão</h2>
                <p className="text-sm text-slate-500 mt-1">% que lêem até o final</p>
              </div>
              <div id="completion-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Tipos de Relatório</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por categoria</p>
              </div>
              <div id="types-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Tempo Médio de Leitura</h2>
              <div id="time-chart" className="h-[280px] w-full"></div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Crescimento de Downloads</h2>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2"><Download size={14} />Exportar</button>
            </div>
            <div id="growth-chart" className="h-[300px] w-full"></div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Relatórios Mais Baixados</h2>
              <p className="text-sm text-slate-500 mt-1">Ranking dos documentos mais acessados</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Posição</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Título</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Downloads</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Taxa de Leitura</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Tempo Médio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topRelatorios.map((relatorio, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4"><div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(270,35%,78%)] text-slate-700 font-bold text-sm">{idx + 1}</div></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{relatorio.title}</p></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{relatorio.downloads}</p></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                            <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: relatorio.completion }}></div>
                          </div>
                          <span className="text-sm font-bold text-slate-800 w-12">{relatorio.completion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-sm text-slate-600">{relatorio.avgTime}</p></td>
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

export default RelatoriosAnalytics;
