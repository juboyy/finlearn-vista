import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Bell, FileText, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Plot from "react-plotly.js";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

const EstudosAcademicosAnalytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30d");

  const kpiData = [
    {
      title: "Total de Estudos",
      value: "342",
      change: "+18%",
      icon: FileText,
      color: "hsl(142, 35%, 65%)",
      bgColor: "hsl(142, 35%, 95%)",
    },
    {
      title: "Citações Totais",
      value: "2.847",
      change: "+24%",
      icon: Award,
      color: "hsl(207, 35%, 65%)",
      bgColor: "hsl(207, 35%, 95%)",
    },
    {
      title: "Pesquisadores Ativos",
      value: "89",
      change: "+12%",
      icon: Users,
      color: "hsl(280, 35%, 65%)",
      bgColor: "hsl(280, 35%, 95%)",
    },
    {
      title: "Índice H Médio",
      value: "12.8",
      change: "+8%",
      icon: TrendingUp,
      color: "hsl(340, 35%, 65%)",
      bgColor: "hsl(340, 35%, 95%)",
    },
  ];

  const citationsPerStudyData = {
    x: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    y: [156, 189, 213, 198, 245, 267, 289, 312, 298, 334, 356, 378],
    type: "bar" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Citações",
  };

  const impactFactorData = {
    x: [1.2, 1.8, 2.3, 2.8, 3.1, 3.5, 3.9, 4.2, 4.6, 4.8, 5.1, 5.4, 5.7, 6.0],
    y: [12, 18, 25, 32, 38, 45, 52, 58, 65, 71, 78, 84, 89, 95],
    mode: "markers" as const,
    type: "scatter" as const,
    marker: { size: 10, color: "hsl(207, 35%, 65%)" },
    name: "Fator de Impacto",
  };

  const researchAreasData = {
    values: [145, 98, 67, 32],
    labels: ["Finanças Quantitativas", "Risco de Crédito", "Mercado de Capitais", "Regulação Financeira"],
    type: "pie" as const,
    marker: {
      colors: ["hsl(142, 35%, 65%)", "hsl(207, 35%, 65%)", "hsl(280, 35%, 65%)", "hsl(340, 35%, 65%)"],
    },
    textinfo: "none" as const,
    hovertemplate: "<b>%{label}</b><br>%{value} estudos<br>%{percent}<extra></extra>",
  };

  const publicationsPerYearData = {
    x: ["2019", "2020", "2021", "2022", "2023", "2024"],
    y: [45, 58, 72, 89, 124, 156],
    type: "bar" as const,
    marker: { color: "hsl(280, 35%, 65%)" },
    name: "Publicações",
    orientation: "v" as const,
  };

  const collaborationNetworkData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [23, 28, 32, 38, 45, 52, 58, 64, 71, 76, 83, 89],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(340, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(340, 35%, 65%)" },
    name: "Colaborações",
  };

  const journalRankingData = {
    y: ["Journal A", "Journal B", "Journal C", "Journal D", "Journal E"],
    x: [45, 38, 32, 28, 23],
    type: "bar" as const,
    orientation: "h" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Publicações por Journal",
  };

  const topStudies = [
    {
      id: 1,
      title: "Machine Learning em Análise de Risco de Crédito",
      author: "Dr. Roberto Silva",
      citations: 156,
      impactFactor: 5.8,
      date: "15/03/2024",
    },
    {
      id: 2,
      title: "Blockchain e Sistemas Financeiros Descentralizados",
      author: "Dra. Ana Oliveira",
      citations: 142,
      impactFactor: 5.4,
      date: "22/02/2024",
    },
    {
      id: 3,
      title: "Modelos Preditivos para Mercado de Capitais",
      author: "Dr. Carlos Mendes",
      citations: 128,
      impactFactor: 5.1,
      date: "10/01/2024",
    },
    {
      id: 4,
      title: "Regulação Financeira no Brasil: Perspectivas 2024",
      author: "Dra. Mariana Costa",
      citations: 115,
      impactFactor: 4.9,
      date: "05/12/2023",
    },
    {
      id: 5,
      title: "Finanças Quantitativas e Big Data",
      author: "Dr. Paulo Santos",
      citations: 103,
      impactFactor: 4.6,
      date: "18/11/2023",
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
              <h1 className="text-2xl font-bold text-slate-900">Analytics de Estudos Acadêmicos</h1>
              <p className="text-sm text-slate-500">Análise detalhada de pesquisas e publicações</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar estudos..."
                className="pl-10 w-64 bg-slate-50 border-slate-200"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </Button>
          </div>
        </header>

        <main className="flex-1 py-8 px-4">
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Citações por Mês</h3>
              <Plot
                data={[citationsPerStudyData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Citações" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Fator de Impacto vs Citações</h3>
              <Plot
                data={[impactFactorData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Fator de Impacto" },
                  yaxis: { title: "Número de Citações" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Áreas de Pesquisa</h3>
              <Plot
                data={[researchAreasData]}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Publicações por Ano</h3>
              <Plot
                data={[publicationsPerYearData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Ano" },
                  yaxis: { title: "Publicações" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Rede de Colaboração</h3>
              <Plot
                data={[collaborationNetworkData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Colaborações" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Ranking de Journals</h3>
              <Plot
                data={[journalRankingData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 120, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Publicações" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Estudos Mais Citados</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Título</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Autor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Citações</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Fator de Impacto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {topStudies.map((study, index) => (
                    <tr key={study.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-slate-900">{study.title}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{study.author}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(study.citations / 156) * 100}%`,
                                backgroundColor: "hsl(142, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{study.citations}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(study.impactFactor / 5.8) * 100}%`,
                                backgroundColor: "hsl(340, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{study.impactFactor}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{study.date}</span>
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

export default EstudosAcademicosAnalytics;
