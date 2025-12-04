import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronLeft,
  Upload,
  FileSpreadsheet,
  BarChart3,
  LineChart,
  PieChart,
  Table,
  Settings,
  Save,
  Download,
  RefreshCw,
  Columns,
  Rows,
  Link2,
  Eye,
  Activity,
  Target,
  Radar,
  LayoutGrid,
  FolderOpen,
  Trash2,
  Clock,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar as RadarComponent,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap,
} from "recharts";
import * as XLSX from "xlsx";

interface DataRow {
  [key: string]: string | number;
}

interface ChartConfig {
  type: "bar" | "line" | "pie" | "area" | "scatter" | "radar" | "treemap";
  xAxis: string;
  yAxis: string[];
  title: string;
}

interface SavedChart {
  id: string;
  name: string;
  chart_type: string;
  chart_data: {
    data: DataRow[];
    columns: string[];
    config: ChartConfig;
  };
  created_at: string;
}

const CHART_COLORS = [
  "hsl(207, 35%, 55%)",
  "hsl(142, 35%, 55%)",
  "hsl(350, 35%, 55%)",
  "hsl(44, 35%, 55%)",
  "hsl(280, 35%, 55%)",
  "hsl(20, 35%, 55%)",
];

export default function CriarGraficos() {
  const navigate = useNavigate();
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: "bar",
    xAxis: "",
    yAxis: [],
    title: "Novo Gráfico",
  });
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingSavedCharts, setLoadingSavedCharts] = useState(false);

  // Load saved charts on mount
  useEffect(() => {
    loadSavedCharts();
  }, []);

  const loadSavedCharts = async () => {
    setLoadingSavedCharts(true);
    try {
      const { data: charts, error } = await supabase
        .from("saved_charts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const typedCharts = (charts || []).map(chart => ({
        ...chart,
        chart_data: chart.chart_data as unknown as SavedChart["chart_data"]
      }));
      
      setSavedCharts(typedCharts);
    } catch (error) {
      console.error("Error loading saved charts:", error);
    } finally {
      setLoadingSavedCharts(false);
    }
  };

  const handleLoadChart = (chart: SavedChart) => {
    try {
      const chartData = chart.chart_data;
      setData(chartData.data || []);
      setColumns(chartData.columns || []);
      setChartConfig(chartData.config || {
        type: chart.chart_type as ChartConfig["type"],
        xAxis: "",
        yAxis: [],
        title: chart.name,
      });
      setActiveTab("config");
      toast.success(`Gráfico "${chart.name}" carregado`);
    } catch (error) {
      toast.error("Erro ao carregar gráfico");
    }
  };

  const handleDeleteChart = async (chartId: string) => {
    try {
      const { error } = await supabase
        .from("saved_charts")
        .delete()
        .eq("id", chartId);

      if (error) throw error;
      
      setSavedCharts(prev => prev.filter(c => c.id !== chartId));
      toast.success("Gráfico excluído");
    } catch (error) {
      toast.error("Erro ao excluir gráfico");
    }
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<DataRow>(worksheet);

        if (jsonData.length > 0) {
          const cols = Object.keys(jsonData[0]);
          setColumns(cols);
          setData(jsonData);
          setChartConfig(prev => ({ ...prev, xAxis: cols[0], yAxis: [cols[1] || cols[0]] }));
          toast.success("Arquivo importado com sucesso");
        }
      } catch (error) {
        toast.error("Erro ao processar arquivo");
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const handleGoogleSheetsConnect = async () => {
    if (!googleSheetUrl) {
      toast.error("Insira a URL do Google Sheets");
      return;
    }

    setIsLoading(true);
    // Simulated Google Sheets integration
    setTimeout(() => {
      const mockData = [
        { Mes: "Janeiro", Vendas: 4500, Custos: 2800, Lucro: 1700 },
        { Mes: "Fevereiro", Vendas: 5200, Custos: 3100, Lucro: 2100 },
        { Mes: "Março", Vendas: 4800, Custos: 2900, Lucro: 1900 },
        { Mes: "Abril", Vendas: 6100, Custos: 3500, Lucro: 2600 },
        { Mes: "Maio", Vendas: 5800, Custos: 3300, Lucro: 2500 },
        { Mes: "Junho", Vendas: 6500, Custos: 3700, Lucro: 2800 },
      ];
      const cols = Object.keys(mockData[0]);
      setColumns(cols);
      setData(mockData);
      setChartConfig(prev => ({ ...prev, xAxis: cols[0], yAxis: [cols[1]] }));
      setIsLoading(false);
      toast.success("Google Sheets conectado com sucesso");
    }, 1500);
  };

  const toggleColumnSelection = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const toggleYAxisColumn = (column: string) => {
    setChartConfig(prev => ({
      ...prev,
      yAxis: prev.yAxis.includes(column)
        ? prev.yAxis.filter(c => c !== column)
        : [...prev.yAxis, column],
    }));
  };

  const getChartData = () => {
    if (selectedColumns.length === 0) return data;
    return data.map(row => {
      const filteredRow: DataRow = {};
      selectedColumns.forEach(col => {
        filteredRow[col] = row[col];
      });
      return filteredRow;
    });
  };

  const renderChart = () => {
    const chartData = getChartData();
    if (chartData.length === 0) return null;

    switch (chartConfig.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
              <XAxis
                dataKey={chartConfig.xAxis}
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(215, 20%, 85%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {chartConfig.yAxis.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
              <XAxis
                dataKey={chartConfig.xAxis}
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(215, 20%, 85%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {chartConfig.yAxis.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS[index % CHART_COLORS.length], r: 4 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case "pie":
        const pieData = chartData.map((row, index) => ({
          name: String(row[chartConfig.xAxis]),
          value: Number(row[chartConfig.yAxis[0]]) || 0,
        }));
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
              <XAxis
                dataKey={chartConfig.xAxis}
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(215, 20%, 85%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {chartConfig.yAxis.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
              <XAxis
                dataKey={chartConfig.xAxis}
                type="number"
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
                name={chartConfig.xAxis}
              />
              <YAxis
                dataKey={chartConfig.yAxis[0]}
                type="number"
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
                name={chartConfig.yAxis[0]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(215, 20%, 85%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Scatter
                name={chartConfig.yAxis[0]}
                data={chartData}
                fill={CHART_COLORS[0]}
              />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case "radar":
        const radarData = chartData.map(row => ({
          subject: String(row[chartConfig.xAxis]),
          ...chartConfig.yAxis.reduce((acc, key) => ({
            ...acc,
            [key]: Number(row[key]) || 0,
          }), {}),
        }));
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="hsl(215, 20%, 85%)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 11 }}
              />
              <PolarRadiusAxis tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 10 }} />
              {chartConfig.yAxis.map((key, index) => (
                <RadarComponent
                  key={key}
                  name={key}
                  dataKey={key}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  fillOpacity={0.3}
                />
              ))}
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "treemap":
        const treemapData = chartData.map((row, index) => ({
          name: String(row[chartConfig.xAxis]),
          size: Number(row[chartConfig.yAxis[0]]) || 0,
          fill: CHART_COLORS[index % CHART_COLORS.length],
        }));
        return (
          <ResponsiveContainer width="100%" height={400}>
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="hsl(215, 20%, 95%)"
              fill="hsl(207, 35%, 55%)"
            >
              {treemapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(215, 20%, 85%)",
                  borderRadius: "8px",
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const handleSave = async () => {
    if (data.length === 0) {
      toast.error("Importe dados antes de salvar o gráfico");
      return;
    }

    if (!chartConfig.title.trim()) {
      toast.error("Adicione um título ao gráfico");
      return;
    }

    setIsSaving(true);
    try {
      const chartData = {
        data,
        columns,
        config: chartConfig,
      };

      const { error } = await supabase.from("saved_charts").insert([{
        name: chartConfig.title,
        chart_type: chartConfig.type,
        chart_data: JSON.parse(JSON.stringify(chartData)),
      }]);

      if (error) throw error;

      toast.success("Gráfico salvo com sucesso");
      loadSavedCharts();
    } catch (error) {
      console.error("Error saving chart:", error);
      toast.error("Erro ao salvar gráfico");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    toast.success("Gráfico exportado");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/criar-conteudo")}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Editor de Gráficos</h1>
                <p className="text-sm text-muted-foreground">Importe dados e crie visualizações</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-primary-foreground">
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Data Source & Configuration */}
          <div className="w-80 border-r border-border bg-card flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start px-4 pt-4 bg-transparent flex-wrap gap-1">
                <TabsTrigger value="upload" className="text-xs">
                  <Upload className="h-3 w-3 mr-1" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="sheets" className="text-xs">
                  <FileSpreadsheet className="h-3 w-3 mr-1" />
                  Sheets
                </TabsTrigger>
                <TabsTrigger value="config" className="text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Config
                </TabsTrigger>
                <TabsTrigger value="saved" className="text-xs">
                  <FolderOpen className="h-3 w-3 mr-1" />
                  Salvos
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1 p-4">
                <TabsContent value="upload" className="mt-0 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Importar CSV/Excel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Arraste ou clique para upload
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          CSV, XLSX, XLS
                        </span>
                        <Input
                          id="file-upload"
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </Label>
                    </CardContent>
                  </Card>

                  {data.length > 0 && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Table className="h-4 w-4" />
                          Dados Carregados
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {data.length} linhas, {columns.length} colunas
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="sheets" className="mt-0 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Link2 className="h-4 w-4" />
                        Google Sheets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-xs">URL da Planilha</Label>
                        <Input
                          placeholder="https://docs.google.com/spreadsheets/..."
                          value={googleSheetUrl}
                          onChange={(e) => setGoogleSheetUrl(e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <Button
                        onClick={handleGoogleSheetsConnect}
                        disabled={isLoading}
                        className="w-full"
                        size="sm"
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                        )}
                        Conectar
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="config" className="mt-0 space-y-4">
                  <Card className="border-pastel-blue/30 bg-gradient-to-br from-white to-pastel-blue/5">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-pastel-gray-dark">
                        <div className="p-1.5 rounded-lg bg-pastel-purple/20">
                          <BarChart3 className="h-4 w-4 text-pastel-purple" />
                        </div>
                        Tipo de Grafico
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { type: "bar" as const, icon: BarChart3, label: "Barras", bgActive: "bg-pastel-blue/20", borderActive: "border-pastel-blue", iconBgActive: "bg-pastel-blue/30", iconActive: "text-pastel-blue", hoverBorder: "hover:border-pastel-blue/50", hoverBg: "hover:bg-pastel-blue/10" },
                          { type: "line" as const, icon: LineChart, label: "Linha", bgActive: "bg-pastel-green/20", borderActive: "border-pastel-green", iconBgActive: "bg-pastel-green/30", iconActive: "text-pastel-green", hoverBorder: "hover:border-pastel-green/50", hoverBg: "hover:bg-pastel-green/10" },
                          { type: "pie" as const, icon: PieChart, label: "Pizza", bgActive: "bg-pastel-pink/20", borderActive: "border-pastel-pink", iconBgActive: "bg-pastel-pink/30", iconActive: "text-pastel-pink", hoverBorder: "hover:border-pastel-pink/50", hoverBg: "hover:bg-pastel-pink/10" },
                          { type: "area" as const, icon: Activity, label: "Area", bgActive: "bg-pastel-purple/20", borderActive: "border-pastel-purple", iconBgActive: "bg-pastel-purple/30", iconActive: "text-pastel-purple", hoverBorder: "hover:border-pastel-purple/50", hoverBg: "hover:bg-pastel-purple/10" },
                        ].map(({ type, icon: Icon, label, bgActive, borderActive, iconBgActive, iconActive, hoverBorder, hoverBg }) => (
                          <button
                            key={type}
                            className={`flex flex-col items-center justify-center h-20 rounded-xl text-xs font-medium transition-all duration-200 border-2 ${
                              chartConfig.type === type 
                                ? `${bgActive} ${borderActive} text-pastel-gray-dark shadow-md scale-105` 
                                : `bg-white border-pastel-gray/20 text-pastel-gray ${hoverBorder} ${hoverBg}`
                            }`}
                            onClick={() => setChartConfig(prev => ({ ...prev, type }))}
                          >
                            <div className={`p-2.5 rounded-lg mb-1.5 ${
                              chartConfig.type === type ? iconBgActive : 'bg-pastel-gray/10'
                            }`}>
                              <Icon className={`h-5 w-5 ${chartConfig.type === type ? iconActive : 'text-pastel-gray'}`} />
                            </div>
                            {label}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { type: "scatter" as const, icon: Target, label: "Scatter", bgActive: "bg-pastel-orange/20", borderActive: "border-pastel-orange", iconBgActive: "bg-pastel-orange/30", iconActive: "text-pastel-orange", hoverBorder: "hover:border-pastel-orange/50", hoverBg: "hover:bg-pastel-orange/10" },
                          { type: "radar" as const, icon: Radar, label: "Radar", bgActive: "bg-pastel-blue/20", borderActive: "border-pastel-blue", iconBgActive: "bg-pastel-blue/30", iconActive: "text-pastel-blue", hoverBorder: "hover:border-pastel-blue/50", hoverBg: "hover:bg-pastel-blue/10" },
                          { type: "treemap" as const, icon: LayoutGrid, label: "Treemap", bgActive: "bg-pastel-green/20", borderActive: "border-pastel-green", iconBgActive: "bg-pastel-green/30", iconActive: "text-pastel-green", hoverBorder: "hover:border-pastel-green/50", hoverBg: "hover:bg-pastel-green/10" },
                        ].map(({ type, icon: Icon, label, bgActive, borderActive, iconBgActive, iconActive, hoverBorder, hoverBg }) => (
                          <button
                            key={type}
                            className={`flex flex-col items-center justify-center h-20 rounded-xl text-xs font-medium transition-all duration-200 border-2 ${
                              chartConfig.type === type 
                                ? `${bgActive} ${borderActive} text-pastel-gray-dark shadow-md scale-105` 
                                : `bg-white border-pastel-gray/20 text-pastel-gray ${hoverBorder} ${hoverBg}`
                            }`}
                            onClick={() => setChartConfig(prev => ({ ...prev, type }))}
                          >
                            <div className={`p-2.5 rounded-lg mb-1.5 ${
                              chartConfig.type === type ? iconBgActive : 'bg-pastel-gray/10'
                            }`}>
                              <Icon className={`h-5 w-5 ${chartConfig.type === type ? iconActive : 'text-pastel-gray'}`} />
                            </div>
                            {label}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {columns.length > 0 && (
                    <>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Columns className="h-4 w-4" />
                            Eixo X (Categorias)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Select
                            value={chartConfig.xAxis}
                            onValueChange={(value) =>
                              setChartConfig(prev => ({ ...prev, xAxis: value }))
                            }
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder="Selecione coluna" />
                            </SelectTrigger>
                            <SelectContent>
                              {columns.map(col => (
                                <SelectItem key={col} value={col}>
                                  {col}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Rows className="h-4 w-4" />
                            Eixo Y (Valores)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {columns
                            .filter(col => col !== chartConfig.xAxis)
                            .map(col => (
                              <div key={col} className="flex items-center gap-2">
                                <Checkbox
                                  id={`y-${col}`}
                                  checked={chartConfig.yAxis.includes(col)}
                                  onCheckedChange={() => toggleYAxisColumn(col)}
                                />
                                <Label htmlFor={`y-${col}`} className="text-sm cursor-pointer">
                                  {col}
                                </Label>
                              </div>
                            ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Filtrar Colunas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {columns.map(col => (
                            <div key={col} className="flex items-center gap-2">
                              <Checkbox
                                id={`filter-${col}`}
                                checked={selectedColumns.length === 0 || selectedColumns.includes(col)}
                                onCheckedChange={() => toggleColumnSelection(col)}
                              />
                              <Label htmlFor={`filter-${col}`} className="text-sm cursor-pointer">
                                {col}
                              </Label>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="saved" className="mt-0 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        Gráficos Salvos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingSavedCharts ? (
                        <div className="flex items-center justify-center py-8">
                          <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : savedCharts.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Nenhum gráfico salvo
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {savedCharts.map((chart) => (
                            <div
                              key={chart.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                            >
                              <div
                                className="flex-1 cursor-pointer"
                                onClick={() => handleLoadChart(chart)}
                              >
                                <p className="text-sm font-medium text-foreground">
                                  {chart.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {chart.chart_type}
                                  </span>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(chart.created_at).toLocaleDateString("pt-BR")}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteChart(chart.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Center - Chart Preview */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Input
                    value={chartConfig.title}
                    onChange={(e) => setChartConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="font-semibold text-lg border-none bg-transparent p-0 h-auto focus-visible:ring-0"
                    placeholder="Título do Gráfico"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              {data.length > 0 ? (
                <Card className="h-full">
                  <CardContent className="p-6 h-full flex items-center justify-center">
                    {renderChart()}
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Importe seus dados
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Faça upload de um arquivo CSV/Excel ou conecte uma planilha do Google Sheets
                      para começar a criar seu gráfico.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Data Table Preview */}
          {data.length > 0 && (
            <div className="w-96 border-l border-border bg-card flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  Prévia dos Dados
                </h3>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border">
                          {columns.map(col => (
                            <th
                              key={col}
                              className="text-left p-2 font-medium text-muted-foreground"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.slice(0, 20).map((row, index) => (
                          <tr key={index} className="border-b border-border/50">
                            {columns.map(col => (
                              <td key={col} className="p-2 text-foreground">
                                {String(row[col])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {data.length > 20 && (
                      <p className="text-xs text-muted-foreground text-center mt-3">
                        Mostrando 20 de {data.length} linhas
                      </p>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
