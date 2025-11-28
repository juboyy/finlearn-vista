import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Bell, Table, Download, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Plot from "react-plotly.js";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

const PlanilhasAnalytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30d");

  const kpiData = [
    {
      title: "Total de Planilhas",
      value: "189",
      change: "+21%",
      icon: Table,
      color: "hsl(142, 35%, 65%)",
      bgColor: "hsl(142, 35%, 95%)",
    },
    {
      title: "Downloads Totais",
      value: "15.8K",
      change: "+32%",
      icon: Download,
      color: "hsl(207, 35%, 65%)",
      bgColor: "hsl(207, 35%, 95%)",
    },
    {
      title: "Visualizações",
      value: "28.4K",
      change: "+18%",
      icon: Eye,
      color: "hsl(280, 35%, 65%)",
      bgColor: "hsl(280, 35%, 95%)",
    },
    {
      title: "Compartilhamentos",
      value: "6.2K",
      change: "+15%",
      icon: Share2,
      color: "hsl(340, 35%, 65%)",
      bgColor: "hsl(340, 35%, 95%)",
    },
  ];

  const downloadsPerMonthData = {
    x: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    y: [982, 1123, 1289, 1456, 1634, 1798, 1945, 2089, 2234, 2378, 2512, 2645],
    type: "bar" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Downloads",
  };

  const usageRateData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [68, 72, 75, 78, 81, 84, 87, 89, 91, 93, 95, 97],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(207, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(207, 35%, 65%)" },
    name: "Taxa de Uso (%)",
  };

  const categoryDistributionData = {
    values: [67, 52, 38, 32],
    labels: ["Análise Financeira", "Gestão de Riscos", "Compliance", "Planejamento"],
    type: "pie" as const,
    marker: {
      colors: ["hsl(142, 35%, 65%)", "hsl(207, 35%, 65%)", "hsl(280, 35%, 65%)", "hsl(340, 35%, 65%)"],
    },
    textinfo: "none" as const,
    hovertemplate: "<b>%{label}</b><br>%{value} planilhas<br>%{percent}<extra></extra>",
  };

  const popularityGrowthData = {
    x: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"],
    y: [3456, 3789, 4123, 4567, 4912, 5234, 5678, 6012],
    type: "bar" as const,
    marker: { color: "hsl(280, 35%, 65%)" },
    name: "Acessos",
    orientation: "v" as const,
  };

  const sharingTrendData = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [412, 467, 523, 578, 634, 689, 745, 801, 856, 912, 967, 1023],
    mode: "lines+markers" as const,
    type: "scatter" as const,
    line: { color: "hsl(340, 35%, 65%)", width: 3 },
    marker: { size: 8, color: "hsl(340, 35%, 65%)" },
    name: "Compartilhamentos",
  };

  const fileTypesData = {
    y: ["Excel (.xlsx)", "Google Sheets", "CSV", "Numbers"],
    x: [89, 56, 32, 12],
    type: "bar" as const,
    orientation: "h" as const,
    marker: { color: "hsl(142, 35%, 65%)" },
    name: "Downloads por Tipo",
  };

  const topSpreadsheets = [
    {
      id: 1,
      title: "Modelo de Análise de Crédito Completo",
      category: "Análise Financeira",
      downloads: 3456,
      views: 8942,
      rating: 4.8,
      date: "15/03/2024",
    },
    {
      id: 2,
      title: "Dashboard de Indicadores de Risco",
      category: "Gestão de Riscos",
      downloads: 2987,
      views: 7654,
      rating: 4.6,
      date: "08/03/2024",
    },
    {
      id: 3,
      title: "Checklist de Compliance Regulatório",
      category: "Compliance",
      downloads: 2634,
      views: 6892,
      rating: 4.5,
      date: "01/03/2024",
    },
    {
      id: 4,
      title: "Planejamento Orçamentário Anual",
      category: "Planejamento",
      downloads: 2345,
      views: 6234,
      rating: 4.4,
      date: "23/02/2024",
    },
    {
      id: 5,
      title: "Calculadora de ROI e Payback",
      category: "Análise Financeira",
      downloads: 2156,
      views: 5678,
      rating: 4.3,
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
              <h1 className="text-2xl font-bold text-slate-900">Analytics de Planilhas</h1>
              <p className="text-sm text-slate-500">Análise detalhada de downloads e utilização</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar planilhas..."
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Taxa de Uso</h3>
              <Plot
                data={[usageRateData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Mês" },
                  yaxis: { title: "Taxa de Uso (%)" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribuição por Categoria</h3>
              <Plot
                data={[categoryDistributionData]}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Crescimento de Popularidade</h3>
              <Plot
                data={[popularityGrowthData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 50, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Semana" },
                  yaxis: { title: "Acessos" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Tendência de Compartilhamentos</h3>
              <Plot
                data={[sharingTrendData]}
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Downloads por Tipo de Arquivo</h3>
              <Plot
                data={[fileTypesData]}
                layout={{
                  autosize: true,
                  height: 300,
                  margin: { l: 120, r: 20, t: 20, b: 50 },
                  xaxis: { title: "Downloads" },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                config={{ displayModeBar: false }}
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Top 5 Planilhas Mais Baixadas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Título</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Categoria</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Downloads</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Visualizações</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Avaliação</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {topSpreadsheets.map((spreadsheet, index) => (
                    <tr key={spreadsheet.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-slate-900">{spreadsheet.title}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{spreadsheet.category}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(spreadsheet.downloads / 3456) * 100}%`,
                                backgroundColor: "hsl(142, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{spreadsheet.downloads}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{spreadsheet.views.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(spreadsheet.rating / 5) * 100}%`,
                                backgroundColor: "hsl(340, 35%, 65%)",
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{spreadsheet.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-600">{spreadsheet.date}</span>
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

export default PlanilhasAnalytics;
