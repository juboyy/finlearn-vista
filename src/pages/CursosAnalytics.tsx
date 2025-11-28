import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Search, ChevronLeft, Download, TrendingUp, Users, Eye, GraduationCap, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Plotly from 'plotly.js-dist';

const CursosAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pastelBlue = '#8AAACF';
    const pastelGreen = '#8EBC9F';
    const pastelPurple = '#AC9CC9';
    const pastelPink = '#CC99A9';
    const pastelOrange = '#C9AF89';
    const pastelYellow = '#E6D595';

    const gridColor = '#f3f4f6';
    const textColor = '#6b7280';

    // Chart 1: Alunos por Curso
    try {
      const studentsData = [
        {
          type: 'bar',
          x: ['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4', 'Curso 5', 'Curso 6'],
          y: [480, 620, 385, 540, 295, 410],
          name: 'Alunos',
          marker: {
            color: pastelBlue,
            opacity: 0.9
          }
        }
      ];

      const studentsLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' },
          tickangle: 0
        },
        yaxis: {
          title: 'Número de Alunos',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('students-chart', studentsData as any, studentsLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Students Chart Error:", e);
    }

    // Chart 2: Taxa de Conclusão
    try {
      const completionData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5', 'Módulo 6'],
          y: [100, 92, 85, 76, 68, 54],
          name: '% Conclusão',
          line: { color: pastelGreen, width: 3, shape: 'spline' },
          marker: { color: pastelGreen, size: 8, line: { color: '#fff', width: 2 } }
        }
      ];

      const completionLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' },
          tickangle: 0
        },
        yaxis: {
          title: 'Taxa de Conclusão (%)',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('completion-chart', completionData as any, completionLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Completion Chart Error:", e);
    }

    // Chart 3: Perfil de Alunos
    try {
      const profileData = [
        {
          type: 'pie',
          labels: ['Analistas', 'Gestores', 'Diretores', 'Consultores', 'Outros'],
          values: [38, 24, 16, 15, 7],
          marker: {
            colors: [pastelBlue, pastelOrange, pastelPink, pastelGreen, pastelPurple]
          },
          textinfo: 'none',
          textposition: 'inside',
          hoverinfo: 'label+percent+value',
          hole: 0.4
        }
      ];

      const profileLayout = {
        margin: { t: 0, r: 0, b: 60, l: 0 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: true,
        legend: {
          orientation: 'h',
          y: -0.1,
          font: { color: textColor, size: 11, family: 'Inter' }
        }
      };

      Plotly.newPlot('profile-chart', profileData as any, profileLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Profile Chart Error:", e);
    }

    // Chart 4: Tempo Médio por Módulo
    try {
      const timeData = [
        {
          type: 'bar',
          x: ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5', 'Módulo 6'],
          y: [45, 52, 38, 48, 55, 42],
          name: 'Tempo (min)',
          marker: { color: pastelOrange, opacity: 0.9 }
        }
      ];

      const timeLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' },
          tickangle: 0
        },
        yaxis: {
          title: 'Minutos',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('time-chart', timeData as any, timeLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Time Chart Error:", e);
    }

    // Chart 5: Evolução de Matrículas
    try {
      const enrollmentData = [
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          y: [280, 340, 420, 480, 560, 640],
          name: 'Matrículas',
          line: { color: pastelPurple, width: 3, shape: 'spline' },
          marker: { color: pastelPurple, size: 10 }
        }
      ];

      const enrollmentLayout = {
        margin: { t: 20, r: 40, b: 60, l: 60 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
          gridcolor: 'transparent',
          tickfont: { color: textColor, family: 'Inter' }
        },
        yaxis: {
          title: 'Novas Matrículas',
          gridcolor: gridColor,
          tickfont: { color: textColor, family: 'Inter' },
          zeroline: false
        }
      };

      Plotly.newPlot('enrollment-chart', enrollmentData as any, enrollmentLayout as any, {
        responsive: true,
        displayModeBar: false
      });
    } catch (e) {
      console.error("Enrollment Chart Error:", e);
    }

  }, []);

  const topCourses = [
    { title: 'Análise Técnica Avançada', students: 620, completion: 84, avgTime: '3h 24m' },
    { title: 'Gestão de Riscos Financeiros', students: 540, completion: 78, avgTime: '4h 12m' },
    { title: 'Mercado de Capitais', students: 480, completion: 72, avgTime: '3h 45m' },
    { title: 'Compliance Bancário', students: 410, completion: 88, avgTime: '2h 52m' },
    { title: 'Fundamentos de Open Finance', students: 385, completion: 81, avgTime: '2h 38m' }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/conteudo-analytics')}
                className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Cursos</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Análise detalhada de matrículas e engajamento dos alunos.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-hover:text-slate-700 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 w-64 transition-all shadow-sm text-slate-600 placeholder-slate-400"
                />
              </div>
              <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors relative shadow-sm">
                <Bell size={20} />
                <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Cursos</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">12</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 2 este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(48,40%,75%)] flex items-center justify-center text-slate-600">
                <GraduationCap size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Total de Alunos</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">2.730</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Users size={12} /> 18% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600">
                <Users size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Taxa de Conclusão</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">54%</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> 8% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center text-slate-600">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-500">Tempo Médio</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">3h 15m</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Clock size={12} /> 12% este mês
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[hsl(24,42%,75%)] flex items-center justify-center text-slate-600">
                <Clock size={20} />
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Alunos por Curso</h2>
                  <p className="text-sm text-slate-500 mt-1">Distribuição de alunos matriculados</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2">
                  <Download size={14} />
                  Exportar
                </button>
              </div>
              <div id="students-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Taxa de Conclusão por Módulo</h2>
                <p className="text-sm text-slate-500 mt-1">% de alunos que completam cada módulo</p>
              </div>
              <div id="completion-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Perfil de Alunos</h2>
                <p className="text-sm text-slate-500 mt-1">Distribuição por tipo de profissional</p>
              </div>
              <div id="profile-chart" className="h-[280px] w-full"></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Tempo Médio por Módulo</h2>
                  <p className="text-sm text-slate-500 mt-1">Duração média em minutos por módulo</p>
                </div>
              </div>
              <div id="time-chart" className="h-[280px] w-full"></div>
            </div>
          </section>

          {/* Enrollment Chart */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Evolução de Matrículas</h2>
                <p className="text-sm text-slate-500 mt-1">Novas matrículas nos últimos 6 meses</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Download size={14} />
                Exportar
              </button>
            </div>
            <div id="enrollment-chart" className="h-[300px] w-full"></div>
          </section>

          {/* Top Courses Table */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Cursos Mais Procurados</h2>
                <p className="text-sm text-slate-500 mt-1">Ranking dos cursos com maior número de alunos</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Posição
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Título do Curso
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Alunos
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Taxa de Conclusão
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Tempo Médio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topCourses.map((course, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(48,40%,75%)] text-slate-700 font-bold text-sm">
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{course.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{course.students}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                              <div 
                                className="h-full bg-[hsl(142,35%,65%)] rounded-full"
                                style={{ width: `${course.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-800 w-12">{course.completion}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{course.avgTime}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CursosAnalytics;
