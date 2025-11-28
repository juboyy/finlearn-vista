import { useState } from "react";
import { ArrowLeft, Users, Eye, Clock, TrendingUp, Download, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

export default function LiveAnalytics() {
  const navigate = useNavigate();
  const [dateRange] = useState("30d");

  const kpiData = [
    {
      title: "Total de Lives",
      value: "24",
      change: "+12%",
      icon: Users,
      color: "hsl(206, 45%, 65%)",
    },
    {
      title: "Total de Espectadores",
      value: "3.847",
      change: "+28%",
      icon: Eye,
      color: "hsl(24, 42%, 67%)",
    },
    {
      title: "Taxa de Permanência",
      value: "68%",
      change: "+15%",
      icon: TrendingUp,
      color: "hsl(322, 40%, 68%)",
    },
    {
      title: "Duração Média",
      value: "45min",
      change: "+5%",
      icon: Clock,
      color: "hsl(152, 42%, 65%)",
    },
  ];

  const viewsPerLiveData = {
    x: ["Live 1", "Live 2", "Live 3", "Live 4", "Live 5", "Live 6", "Live 7", "Live 8"],
    y: [245, 312, 428, 387, 295, 456, 502, 389],
    type: "bar" as const,
    marker: {
      color: "hsl(206, 45%, 65%)",
    },
  };

  const retentionRateData = {
    x: ["0-10min", "10-20min", "20-30min", "30-40min", "40-50min", "50-60min", "60+min"],
    y: [100, 92, 84, 76, 68, 52, 38],
    type: "scatter" as const,
    mode: "lines+markers" as const,
    line: {
      color: "hsl(322, 40%, 68%)",
      width: 3,
    },
    marker: {
      size: 8,
      color: "hsl(322, 40%, 68%)",
    },
  };

  const professionalProfileData = {
    labels: ["Analistas", "Gestores", "Diretores", "Consultores", "Outros"],
    values: [35, 28, 18, 12, 7],
    type: "pie" as const,
    marker: {
      colors: [
        "hsl(206, 45%, 65%)",
        "hsl(24, 42%, 67%)",
        "hsl(322, 40%, 68%)",
        "hsl(152, 42%, 65%)",
        "hsl(280, 40%, 65%)",
      ],
    },
    textinfo: "none" as const,
    hovertemplate: "<b>%{label}</b><br>%{value} profissionais<br>%{percent}<extra></extra>",
    hole: 0.4,
  };

  const peakHoursData = {
    x: ["8h", "10h", "12h", "14h", "16h", "18h", "20h"],
    y: [120, 280, 340, 420, 380, 280, 150],
    type: "bar" as const,
    marker: {
      color: "hsl(152, 42%, 65%)",
    },
  };

  const engagementOverTimeData = {
    x: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    y: [3240, 3580, 3920, 4150],
    type: "scatter" as const,
    mode: "lines+markers" as const,
    line: {
      color: "hsl(24, 42%, 67%)",
      width: 3,
    },
    marker: {
      size: 10,
      color: "hsl(24, 42%, 67%)",
    },
  };

  const interactionRateData = {
    x: ["Chat", "Reações", "Perguntas", "Compartilhamentos", "Enquetes"],
    y: [85, 72, 45, 38, 28],
    type: "bar" as const,
    orientation: "h" as const,
    marker: {
      color: "hsl(280, 40%, 65%)",
    },
  };

  const topLives = [
    {
      title: "Tendências do Mercado Financeiro 2025",
      views: 502,
      retention: "72%",
      avgTime: "48min",
      date: "15/11/2025",
    },
    {
      title: "Open Banking: Oportunidades e Desafios",
      views: 456,
      retention: "68%",
      avgTime: "45min",
      date: "08/11/2025",
    },
    {
      title: "Compliance em Instituições Financeiras",
      views: 428,
      retention: "65%",
      avgTime: "42min",
      date: "22/10/2025",
    },
    {
      title: "IA no Setor Financeiro",
      views: 389,
      retention: "70%",
      avgTime: "46min",
      date: "01/11/2025",
    },
    {
      title: "Estratégias de Investimento em Cripto",
      views: 387,
      retention: "64%",
      avgTime: "41min",
      date: "18/10/2025",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto h-full relative bg-slate-50/50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center">
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
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics de Lives</h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">Análise detalhada de performance das suas transmissões ao vivo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4 group-hover:text-slate-700 transition-colors" />
              <input
                type="text"
                placeholder="Buscar lives..."
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 w-64 transition-all shadow-sm text-slate-600 placeholder-slate-400"
              />
            </div>
            <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-700 transition-colors relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <div className="py-8 px-4 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-500">Total de Lives</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">24</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +12% este mês
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[hsl(206,35%,75%)] flex items-center justify-center text-slate-600">
              <Users size={20} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-500">Total de Espectadores</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">3.847</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <Eye size={12} /> +28% este mês
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[hsl(24,42%,75%)] flex items-center justify-center text-slate-600">
              <Eye size={20} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-500">Taxa de Permanência</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">68%</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +15% este mês
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[hsl(322,40%,75%)] flex items-center justify-center text-slate-600">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-500">Duração Média</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">45min</h3>
              <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <Clock size={12} /> +5% este mês
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[hsl(152,42%,75%)] flex items-center justify-center text-slate-600">
              <Clock size={20} />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Espectadores por Live
            </h3>
            <Plot
              data={[viewsPerLiveData]}
              layout={{
                autosize: true,
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "hsl(220, 15%, 35%)" },
                xaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "",
                },
                yaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "Espectadores",
                },
                margin: { l: 50, r: 20, t: 20, b: 40 },
              }}
              config={{ displayModeBar: false }}
              style={{ width: "100%", height: "300px" }}
              useResizeHandler
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Taxa de Retenção ao Longo do Tempo
            </h3>
            <Plot
              data={[retentionRateData]}
              layout={{
                autosize: true,
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "hsl(220, 15%, 35%)" },
                xaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "Tempo de Live",
                },
                yaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "Retenção (%)",
                },
                margin: { l: 50, r: 20, t: 20, b: 60 },
              }}
              config={{ displayModeBar: false }}
              style={{ width: "100%", height: "300px" }}
              useResizeHandler
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Perfil Profissional dos Espectadores
            </h3>
            <Plot
              data={[professionalProfileData]}
              layout={{
                autosize: true,
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "hsl(220, 15%, 35%)" },
                showlegend: true,
                legend: {
                  orientation: "h",
                  y: -0.2,
                },
                margin: { l: 20, r: 20, t: 20, b: 60 },
              }}
              config={{ displayModeBar: false }}
              style={{ width: "100%", height: "300px" }}
              useResizeHandler
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Horários de Pico de Audiência
            </h3>
            <Plot
              data={[peakHoursData]}
              layout={{
                autosize: true,
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "hsl(220, 15%, 35%)" },
                xaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "Horário",
                },
                yaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "Espectadores",
                },
                margin: { l: 50, r: 20, t: 20, b: 60 },
              }}
              config={{ displayModeBar: false }}
              style={{ width: "100%", height: "300px" }}
              useResizeHandler
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Crescimento de Engajamento
            </h3>
            <Plot
              data={[engagementOverTimeData]}
              layout={{
                autosize: true,
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "hsl(220, 15%, 35%)" },
                xaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "",
                },
                yaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "Total de Espectadores",
                },
                margin: { l: 60, r: 20, t: 20, b: 40 },
              }}
              config={{ displayModeBar: false }}
              style={{ width: "100%", height: "300px" }}
              useResizeHandler
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Taxa de Interação por Tipo
            </h3>
            <Plot
              data={[interactionRateData]}
              layout={{
                autosize: true,
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                font: { color: "hsl(220, 15%, 35%)" },
                xaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                  title: "Taxa de Interação (%)",
                },
                yaxis: {
                  gridcolor: "hsl(214, 32%, 91%)",
                },
                margin: { l: 120, r: 20, t: 20, b: 60 },
              }}
              config={{ displayModeBar: false }}
              style={{ width: "100%", height: "300px" }}
              useResizeHandler
            />
          </div>
        </div>

          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Lives Mais Acessadas</h2>
                <p className="text-sm text-slate-500 mt-1">Ranking das lives com maior engajamento</p>
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
                        Título da Live
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Espectadores
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Taxa de Retenção
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Tempo Médio
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topLives.map((live, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(206,35%,75%)] text-slate-700 font-bold text-sm">
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{live.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{live.views}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                              <div 
                                className="h-full bg-[hsl(322,40%,68%)] rounded-full"
                                style={{ width: live.retention }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-800 w-12">{live.retention}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{live.avgTime}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-500">{live.date}</p>
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
}
