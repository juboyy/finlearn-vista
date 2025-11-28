import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Bell, FileText, Download, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Plot from "react-plotly.js";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

const WhitepaperAnalytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30d");

  const kpiData = [
    {
      title: "Total de Whitepapers",
      value: "87",
      change: "+15%",
      icon: FileText,
      color: "hsl(142, 35%, 65%)",
      bgColor: "hsl(142, 35%, 95%)",
    },
    {
      title: "Downloads Totais",
      value: "18.9K",
      change: "+29%",
      icon: Download,
      color: "hsl(207, 35%, 65%)",
      bgColor: "hsl(207, 35%, 95%)",
    },
    {
      title: "Leituras Completas",
      value: "12.3K",
      change: "+22%",
      icon: Eye,
      color: "hsl(280, 35%, 65%)",
      bgColor: "hsl(280, 35%, 95%)",
    },
    {
      title: "Tempo Médio de Leitura",
      value: "28min",
      change: "+6%",
      icon: Clock,
      color: "hsl(340, 35%, 65%)",
      bgColor: "hsl(340, 35%, 95%)",
    },
  ];

  const downloadsPerMonthData = {
    x: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    y: [1234, 1456, 1678, 1892, 2045, 2234, 2456, 2678, 2845, 2989, 3123, 3267],
    type: "bar" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Downloads",
  };

  const completionRateData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [58, 61, 64, 67, 70, 73, 76, 78, 81, 83, 85, 87],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(207, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(207, 35%, 65%)" },
    name: "Taxa de Conclusão (%)",
  };

  const topicDistributionData = {
    values: [28, 24, 19, 16],
    labels: ["Blockchain & DeFi", "Regulação", "Open Finance", "Sustentabilidade"],
    type: "pie" as const,
    marker: {
      colors: ["hsl(142, 35%, 65%)", "hsl(207, 35%, 65%)", "hsl(280, 35%, 65%)", "hsl(340, 35%, 65%)"],
    },
    textinfo: "none" as const,
    hovertemplate: "<b>%{label}</b><br>%{value} whitepapers<br>%{percent}<extra></extra>",
  };

  const readerEngagementData = {
    x: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"],
    y: [4234, 4678, 5012, 5456, 5892, 6234, 6678, 7012],
    type: "bar" as const,
    marker: { color: "hsl(280, 35%, 65%)" },
    name: "Leitores Ativos",
    orientation: "v" as const,
  };

  const citationGrowthData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [345, 389, 434, 478, 523, 567, 612, 656, 701, 745, 789, 834],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(340, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(340, 35%, 65%)" },
    name: "Citações Acadêmicas",
  };

  const industryReachData = {
    y: ["Bancos", "Fintechs", "Consultorias", "Reguladores", "Academia"],
    x: [45, 38, 32, 28, 24],
    type: "bar" as const,
    orientation: "h" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Downloads por Setor",
  };

  const topWhitepapers = [
    {
      id: 1,
      title: "O Futuro das Finanças Descentralizadas: Uma Análise Profunda",
      author: "Dr. Roberto Silva",
      downloads: 4567,
      completionRate: 89.5,
      citations: 156,
      date: "15/03/2024",
    },
    {
      id: 2,
      title: "Open Finance no Brasil: Oportunidades e Desafios",
      author: "Dra. Ana Oliveira",
      downloads: 3892,
      completionRate: 85.2,
      citations: 142,
      date: "08/03/2024",
    },
    {
      id: 3,
      title: "ESG e Investimentos Sustentáveis: Novo Paradigma",
      author: "Carlos Mendes",
      downloads: 3456,
      completionRate: 81.8,
      citations: 128,
      date: "01/03/2024",
    },
    {
      id: 4,
      title: "Regulação de Criptoativos: Perspectiva Global",
      author: "Mariana Costa",
      downloads: 3012,
      completionRate: 78.4,
      citations: 115,
      date: "23/02/2024",
    },
    {
      id: 5,
      title: "Inteligência Artificial no Mercado Financeiro",
      author: "Paulo Santos",
      downloads: 2789,
      completionRate: 75.1,
      citations: 103,
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
              <h1 className="text-2xl font-bold text-slate-900">Analytics de Whitepapers</h1>
              <p className="text-sm text-slate-500">Análise detalhada de leituras e engajamento</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar whitepapers..."
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Downloads por Mês</h3>
              <Plot
                data={[downloadsPerMonthData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Downloads" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Taxa de Conclusão de Leitura</h3>
              <Plot
                data={[completionRateData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Conclusão (%)" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribuição por Tópicos</h3>
              <Plot
                data={[topicDistributionData]}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Engajamento de Leitores</h3>
              <Plot
                data={[readerEngagementData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Semana" },
                  yaxis: { title: "Leitores Ativos" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Crescimento de Citações</h3>
              <Plot
                data={[citationGrowthData]}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Alcance por Setor</h3>
              <Plot
                data={[industryReachData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 100, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Downloads (%)" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Whitepapers Mais Baixados</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Título</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Autor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Downloads</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Taxa de Conclusão</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Citações</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {topWhitepapers.map((whitepaper, index) => (
                    <tr key={whitepaper.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-slate-900">{whitepaper.title}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{whitepaper.author}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(whitepaper.downloads / 4567) * 100}%`,
                                backgroundColor: "hsl(142, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{whitepaper.downloads}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(whitepaper.completionRate / 89.5) * 100}%`,
                                backgroundColor: "hsl(280, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{whitepaper.completionRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(whitepaper.citations / 156) * 100}%`,
                                backgroundColor: "hsl(340, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{whitepaper.citations}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{whitepaper.date}</span>
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

export default WhitepaperAnalytics;
