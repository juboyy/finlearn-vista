import { useState } from "react";
import { ArrowLeft, Users, Eye, Clock, TrendingUp, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/conteudo-analytics")}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics de Lives</h1>
                <p className="text-sm text-muted-foreground">
                  Análise detalhada de performance das suas transmissões ao vivo
                </p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar Relatório
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="p-6 border-border">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${kpi.color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: kpi.color }} />
                  </div>
                  <span className="text-sm font-medium text-pastel-green">
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {kpi.title}
                </h3>
                <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
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
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
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
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
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
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
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
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
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
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
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
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Top 5 Lives com Melhor Performance
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Lives com maior engajamento e retenção de audiência
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {topLives.map((live, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pastel-blue via-pastel-purple to-pastel-pink" />
                
                <div className="p-6 pl-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pastel-blue/20 text-pastel-blue font-bold text-lg flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-foreground group-hover:text-pastel-blue transition-colors">
                            {live.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Transmitido em {live.date}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-pastel-purple/20 flex items-center justify-center flex-shrink-0">
                            <Eye className="w-5 h-5 text-pastel-purple" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Espectadores</p>
                            <p className="text-lg font-bold text-foreground">{live.views}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-pastel-green/20 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-pastel-green" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Retenção</p>
                            <p className="text-lg font-bold text-foreground">{live.retention}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-pastel-pink/20 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-pastel-pink" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium">Tempo Médio</p>
                            <p className="text-lg font-bold text-foreground">{live.avgTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {index === 0 && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-pastel-yellow to-pastel-orange text-foreground px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md animate-pulse">
                      <Users className="w-3.5 h-3.5" />
                      Melhor Performance
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
