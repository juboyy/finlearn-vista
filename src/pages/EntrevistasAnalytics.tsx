import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Bell, Mic, Users, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Plot from "react-plotly.js";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

const EntrevistasAnalytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30d");

  const kpiData = [
    {
      title: "Total de Entrevistas",
      value: "127",
      change: "+14%",
      icon: Mic,
      color: "hsl(142, 35%, 65%)",
      bgColor: "hsl(142, 35%, 95%)",
    },
    {
      title: "Total de Entrevistados",
      value: "156",
      change: "+19%",
      icon: Users,
      color: "hsl(207, 35%, 65%)",
      bgColor: "hsl(207, 35%, 95%)",
    },
    {
      title: "Duração Média",
      value: "42min",
      change: "+8%",
      icon: Clock,
      color: "hsl(280, 35%, 65%)",
      bgColor: "hsl(280, 35%, 95%)",
    },
    {
      title: "Engajamento Médio",
      value: "68.5%",
      change: "+12%",
      icon: TrendingUp,
      color: "hsl(340, 35%, 65%)",
      bgColor: "hsl(340, 35%, 95%)",
    },
  ];

  const interviewsPerMonthData = {
    x: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    y: [8, 9, 11, 13, 15, 18, 21, 23, 25, 27, 29, 31],
    type: "bar" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Entrevistas",
  };

  const viewerRetentionData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [92, 88, 85, 82, 78, 75, 72, 68, 65, 62, 58, 55],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(207, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(207, 35%, 65%)" },
    name: "Taxa de Retenção (%)",
  };

  const intervieweeProfilesData = {
    values: [45, 32, 28, 22],
    labels: ["CEOs e Executivos", "Reguladores", "Analistas", "Empreendedores"],
    type: "pie" as const,
    marker: {
      colors: ["hsl(142, 35%, 65%)", "hsl(207, 35%, 65%)", "hsl(280, 35%, 65%)", "hsl(340, 35%, 65%)"],
    },
    textinfo: "none" as const,
    hovertemplate: "<b>%{label}</b><br>%{value} entrevistas<br>%{percent}<extra></extra>",
  };

  const viewsGrowthData = {
    x: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"],
    y: [2345, 2678, 3012, 3456, 3892, 4234, 4678, 5012],
    type: "bar" as const,
    marker: { color: "hsl(280, 35%, 65%)" },
    name: "Visualizações",
    orientation: "v" as const,
  };

  const interactionRateData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [52, 55, 58, 61, 64, 67, 70, 73, 76, 78, 81, 84],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(340, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(340, 35%, 65%)" },
    name: "Taxa de Interação (%)",
  };

  const topicsData = {
    y: ["Regulação", "ESG", "Inovação", "Open Finance", "Criptomoedas"],
    x: [45, 38, 32, 28, 23],
    type: "bar" as const,
    orientation: "h" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Entrevistas por Tema",
  };

  const topInterviews = [
    {
      id: 1,
      title: "O Futuro da Regulação Financeira com Dr. Roberto Silva",
      interviewee: "Dr. Roberto Silva",
      duration: "58min",
      views: 12456,
      engagement: 85.3,
      date: "15/03/2024",
    },
    {
      id: 2,
      title: "ESG e Investimentos: Entrevista com Ana Oliveira",
      interviewee: "Ana Oliveira",
      duration: "45min",
      views: 10892,
      engagement: 78.9,
      date: "08/03/2024",
    },
    {
      id: 3,
      title: "Open Finance: Perspectivas com Carlos Mendes",
      interviewee: "Carlos Mendes",
      duration: "52min",
      views: 9634,
      engagement: 72.5,
      date: "01/03/2024",
    },
    {
      id: 4,
      title: "Inovação em Pagamentos: Conversa com Mariana Costa",
      interviewee: "Mariana Costa",
      duration: "41min",
      views: 8945,
      engagement: 68.7,
      date: "23/02/2024",
    },
    {
      id: 5,
      title: "Blockchain e o Sistema Financeiro com Paulo Santos",
      interviewee: "Paulo Santos",
      duration: "49min",
      views: 8234,
      engagement: 65.2,
      date: "16/02/2024",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/conteudo-analytics")}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Analytics de Entrevistas</h1>
              <p className="text-sm text-slate-500">Análise detalhada de audiência e engajamento</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar entrevistas..."
                className="pl-10 w-64 bg-slate-50 border-slate-200"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: kpi.bgColor }}
                    >
                      <Icon className="h-6 w-6" style={{ color: kpi.color }} />
                    </div>
                    <span
                      className="text-sm font-medium px-2 py-1 rounded"
                      style={{
                        backgroundColor: kpi.bgColor,
                        color: kpi.color,
                      }}
                    >
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="text-slate-600 text-sm font-medium mb-1">{kpi.title}</h3>
                  <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Entrevistas por Mês</h3>
              <Plot
                data={[interviewsPerMonthData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Entrevistas" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Taxa de Retenção de Audiência</h3>
              <Plot
                data={[viewerRetentionData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Minuto" },
                  yaxis: { title: "Retenção (%)" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Perfil dos Entrevistados</h3>
              <Plot
                data={[intervieweeProfilesData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 20, r: 20, t: 20, b: 20 },
                  showlegend: true,
                  legend: { orientation: "v", x: 1, y: 0.5 },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Crescimento de Visualizações</h3>
              <Plot
                data={[viewsGrowthData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Semana" },
                  yaxis: { title: "Visualizações" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Taxa de Interação</h3>
              <Plot
                data={[interactionRateData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Interação (%)" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Temas Mais Abordados</h3>
              <Plot
                data={[topicsData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 100, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Entrevistas" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Entrevistas Mais Assistidas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Título</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Entrevistado</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Duração</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Visualizações</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Engajamento</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {topInterviews.map((interview, index) => (
                    <tr key={interview.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-slate-900">{interview.title}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{interview.interviewee}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{interview.duration}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{interview.views.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(interview.engagement / 85.3) * 100}%`,
                                backgroundColor: "hsl(142, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{interview.engagement}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{interview.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EntrevistasAnalytics;
