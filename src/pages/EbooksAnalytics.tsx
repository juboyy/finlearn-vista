import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Users, Eye, BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const EbooksAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pastelBlue = '#8AAACF';
    const pastelGreen = '#8EBC9F';
    const pastelPurple = '#AC9CC9';
    const pastelPink = '#CC99A9';
    const pastelOrange = '#C9AF89';

    const gridColor = '#f3f4f6';
    const textColor = '#6b7280';

    // Chart 1: Downloads por E-book
    try {
      const downloadsData = [{
        type: 'bar',
        x: ['E-book 1', 'E-book 2', 'E-book 3', 'E-book 4', 'E-book 5', 'E-book 6'],
        y: [2840, 3150, 2420, 2980, 3540, 2750],
        marker: { color: pastelOrange, opacity: 0.9 }
      }];

      Plotly.newPlot('downloads-chart', downloadsData as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor, family: 'Inter' } },
        yaxis: { title: 'Downloads', gridcolor: gridColor, tickfont: { color: textColor, family: 'Inter' }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    // Chart 2: Páginas Lidas
    try {
      const pagesData = [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Cap 1', 'Cap 2', 'Cap 3', 'Cap 4', 'Cap 5', 'Cap 6'],
        y: [100, 88, 76, 62, 48, 32],
        line: { color: pastelGreen, width: 3, shape: 'spline' },
        marker: { color: pastelGreen, size: 8 }
      }];

      Plotly.newPlot('pages-chart', pagesData as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor, family: 'Inter' } },
        yaxis: { title: '% Leitores', gridcolor: gridColor, tickfont: { color: textColor, family: 'Inter' }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    // Chart 3: Perfil de Leitores
    try {
      Plotly.newPlot('profile-chart', [{
        type: 'pie',
        labels: ['Analistas', 'Gestores', 'Diretores', 'Consultores', 'Outros'],
        values: [34, 28, 18, 13, 7],
        marker: { colors: [pastelBlue, pastelOrange, pastelPink, pastelGreen, pastelPurple] },
        hole: 0.4
      }] as any, {
        margin: { t: 0, r: 0, b: 60, l: 0 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: { orientation: 'h', y: -0.1, font: { color: textColor, size: 11, family: 'Inter' } }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    // Chart 4: Tempo de Leitura
    try {
      Plotly.newPlot('time-chart', [{
        type: 'bar',
        x: ['E-book 1', 'E-book 2', 'E-book 3', 'E-book 4', 'E-book 5', 'E-book 6'],
        y: [42, 38, 55, 48, 52, 45],
        marker: { color: pastelPurple, opacity: 0.9 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor, family: 'Inter' } },
        yaxis: { title: 'Minutos', gridcolor: gridColor, tickfont: { color: textColor, family: 'Inter' }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}

    // Chart 5: Crescimento
    try {
      Plotly.newPlot('growth-chart', [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        y: [14200, 15800, 16900, 17400, 18200, 18900],
        line: { color: pastelBlue, width: 3 },
        marker: { color: pastelBlue, size: 10 }
      }] as any, {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: { gridcolor: 'transparent', tickfont: { color: textColor, family: 'Inter' } },
        yaxis: { title: 'Downloads', gridcolor: gridColor, tickfont: { color: textColor, family: 'Inter' }, zeroline: false }
      } as any, { responsive: true, displayModeBar: false });
    } catch (e) {}
  }, []);

  const topEbooks = [
    { title: 'Gestão de Riscos Financeiros', downloads: 3540, completion: 76, avgTime: '52min' },
    { title: 'Open Finance na Prática', downloads: 3150, completion: 72, avgTime: '38min' },
    { title: 'Compliance Bancário 2025', downloads: 2980, completion: 84, avgTime: '48min' },
    { title: 'Análise de Crédito', downloads: 2840, completion: 68, avgTime: '42min' },
    { title: 'ESG no Mercado Financeiro', downloads: 2750, completion: 74, avgTime: '45min' }
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
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de E-books</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise detalhada de downloads e leituras.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input type="text" placeholder="Buscar e-books..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 w-64 shadow-sm text-slate-600 placeholder-slate-400" />
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
                <p className="text-sm font-semibold text-slate-500">Total de E-books</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">32</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 4 este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(35,35%,75%)] flex items-center justify-center text-slate-600"><BookOpen size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Downloads</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">18.9k</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Eye size={12} /> 2% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600"><Eye size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Conclusão</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">74%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp size={12} /> 8% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600"><TrendingUp size={20} /></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Tempo Médio</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">47min</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1"><Clock size={12} /> 5% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(24,42%,75%)] flex items-center justify-center text-slate-600"><Clock size={20} /></div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Downloads por E-book</h2>
                  <p className="text-sm text-slate-500 mt-1">Total de downloads por título</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2"><Download size={14} />Exportar</button>
              </div>
              <div id="downloads-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Progressão de Leitura</h2>
                <p className="text-sm text-slate-500 mt-1">% que avançam pelos capítulos</p>
              </div>
              <div id="pages-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Perfil de Leitores</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por profissional</p>
              </div>
              <div id="profile-chart" className="h-[280px] w-full"></div>
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
              <h2 className="text-xl font-bold text-slate-800">E-books Mais Baixados</h2>
              <p className="text-sm text-slate-500 mt-1">Ranking dos títulos mais populares</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Posição</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Título</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Downloads</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Taxa de Conclusão</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase">Tempo Médio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topEbooks.map((ebook, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4"><div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(35,35%,75%)] text-slate-700 font-bold text-sm">{idx + 1}</div></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{ebook.title}</p></td>
                      <td className="px-6 py-4"><p className="text-sm font-bold text-slate-800">{ebook.downloads.toLocaleString()}</p></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                            <div className="h-full bg-[hsl(142,35%,65%)] rounded-full" style={{ width: `${ebook.completion}%` }}></div>
                          </div>
                          <span className="text-sm font-bold text-slate-800 w-12">{ebook.completion}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><p className="text-sm text-slate-600">{ebook.avgTime}</p></td>
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

export default EbooksAnalytics;
