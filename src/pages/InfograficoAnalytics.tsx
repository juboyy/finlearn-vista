import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Bell, BarChart3, Eye, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Plot from "react-plotly.js";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

const InfograficoAnalytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30d");

  const kpiData = [
    {
      title: "Total de Infográficos",
      value: "234",
      change: "+16%",
      icon: BarChart3,
      color: "hsl(142, 35%, 65%)",
      bgColor: "hsl(142, 35%, 95%)",
    },
    {
      title: "Visualizações Totais",
      value: "45.2K",
      change: "+22%",
      icon: Eye,
      color: "hsl(207, 35%, 65%)",
      bgColor: "hsl(207, 35%, 95%)",
    },
    {
      title: "Compartilhamentos",
      value: "8.9K",
      change: "+18%",
      icon: Share2,
      color: "hsl(280, 35%, 65%)",
      bgColor: "hsl(280, 35%, 95%)",
    },
    {
      title: "Downloads Totais",
      value: "12.4K",
      change: "+25%",
      icon: Download,
      color: "hsl(340, 35%, 65%)",
      bgColor: "hsl(340, 35%, 95%)",
    },
  ];

  const viewsPerMonthData = {
    x: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    y: [2845, 3156, 3498, 3782, 4012, 4234, 4456, 4678, 4512, 4234, 4089, 3945],
    type: "bar" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Visualizações",
  };

  const engagementRateData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [42, 45, 48, 52, 55, 58, 61, 64, 67, 69, 71, 73],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(207, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(207, 35%, 65%)" },
    name: "Taxa de Engajamento (%)",
  };

  const topicsDistributionData = {
    values: [89, 67, 45, 33],
    labels: ["Análise de Mercado", "Tendências Financeiras", "Regulação", "Tecnologia"],
    type: "pie" as const,
    marker: {
      colors: ["hsl(142, 35%, 65%)", "hsl(207, 35%, 65%)", "hsl(280, 35%, 65%)", "hsl(340, 35%, 65%)"],
    },
    textinfo: "none" as const,
    hovertemplate: "<b>%{label}</b><br>%{value} infográficos<br>%{percent}<extra></extra>",
  };

  const downloadsOverTimeData = {
    x: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"],
    y: [1234, 1456, 1678, 1892, 2015, 2234, 2456, 2678],
    type: "bar" as const,
    marker: { color: "hsl(280, 35%, 65%)" },
    name: "Downloads",
    orientation: "v" as const,
  };

  const sharingPlatformsData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [567, 612, 689, 734, 789, 845, 892, 934, 976, 1012, 1045, 1089],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(340, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(340, 35%, 65%)" },
    name: "Compartilhamentos",
  };

  const deviceAccessData = {
    y: ["Desktop", "Mobile", "Tablet"],
    x: [12456, 8942, 2345],
    type: "bar" as const,
    orientation: "h" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Acessos por Dispositivo",
  };

  const topInfographics = [
    {
      id: 1,
      title: "Evolução dos Meios de Pagamento no Brasil 2024",
      views: 8942,
      engagement: 78.5,
      downloads: 2345,
      date: "15/03/2024",
    },
    {
      id: 2,
      title: "Open Finance: Impactos no Mercado",
      views: 7654,
      engagement: 72.3,
      downloads: 2012,
      date: "08/03/2024",
    },
    {
      id: 3,
      title: "Análise de Tendências ESG",
      views: 6892,
      engagement: 68.9,
      downloads: 1892,
      date: "01/03/2024",
    },
    {
      id: 4,
      title: "Blockchain e Criptomoedas: Panorama 2024",
      views: 6234,
      engagement: 65.4,
      downloads: 1678,
      date: "23/02/2024",
    },
    {
      id: 5,
      title: "Fintechs vs Bancos Tradicionais",
      views: 5678,
      engagement: 62.1,
      downloads: 1456,
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
              <h1 className="text-2xl font-bold text-slate-900">Analytics de Infográficos</h1>
              <p className="text-sm text-slate-500">Análise detalhada de visualizações e compartilhamentos</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar infográficos..."
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Visualizações por Mês</h3>
              <Plot
                data={[viewsPerMonthData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Visualizações" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Taxa de Engajamento</h3>
              <Plot
                data={[engagementRateData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Engajamento (%)" },
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
                data={[topicsDistributionData]}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Downloads ao Longo do Tempo</h3>
              <Plot
                data={[downloadsOverTimeData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Semana" },
                  yaxis: { title: "Downloads" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Crescimento de Compartilhamentos</h3>
              <Plot
                data={[sharingPlatformsData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Compartilhamentos" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Acessos por Dispositivo</h3>
              <Plot
                data={[deviceAccessData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 80, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Acessos" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Infográficos Mais Visualizados</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Título</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Visualizações</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Engajamento</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Downloads</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {topInfographics.map((infographic, index) => (
                    <tr key={infographic.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-slate-900">{infographic.title}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{infographic.views.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(infographic.engagement / 78.5) * 100}%`,
                                backgroundColor: "hsl(142, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{infographic.engagement}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(infographic.downloads / 2345) * 100}%`,
                                backgroundColor: "hsl(340, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{infographic.downloads}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{infographic.date}</span>
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

export default InfograficoAnalytics;
