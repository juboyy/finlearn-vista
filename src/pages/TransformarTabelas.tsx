import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Upload, FileText, Loader2, Download, ChartLine, Landmark, Bitcoin, GraduationCap, TrendingUp, CreditCard, Database, Settings, BarChart3, PieChart, LineChart, GripVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { SortableChartItem } from "@/components/SortableChartItem";

const specializedAgents = [
  {
    id: "analista-tecnica",
    name: "Ana - Analista Técnica",
    description: "Especialista em análise técnica, padrões gráficos e estratégias de trading",
    icon: ChartLine,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
    category: "Análise",
    rating: "4.9"
  },
  {
    id: "renda-fixa",
    name: "Ricardo - Especialista em Renda Fixa",
    description: "Expert em títulos públicos, CDBs, LCIs e estratégias conservadoras",
    icon: Landmark,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
    category: "Renda Fixa",
    rating: "4.8"
  },
  {
    id: "crypto-defi",
    name: "Marina - Crypto & DeFi",
    description: "Especialista em criptomoedas, DeFi e tecnologia blockchain",
    icon: Bitcoin,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
    category: "Crypto",
    rating: "4.7"
  },
  {
    id: "educador-financeiro",
    name: "Professor João - Educador",
    description: "Educador financeiro com foco em fundamentos e teoria econômica",
    icon: GraduationCap,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png",
    category: "Educação",
    rating: "4.9"
  },
  {
    id: "mercado-financeiro",
    name: "Especialista em Mercado Financeiro",
    description: "Expert em análise de mercados, ações e tendências econômicas",
    icon: TrendingUp,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
    category: "Mercados",
    rating: "4.8"
  },
  {
    id: "pagamentos",
    name: "Especialista em Pagamentos",
    description: "Conhecimento em sistemas de pagamento, fintechs e transações digitais",
    icon: CreditCard,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-13cb55de72175bb27fe6.png",
    category: "Fintechs",
    rating: "4.6"
  },
  {
    id: "capitais",
    name: "Especialista em Mercado de Capitais",
    description: "Especialista em IPOs, ofertas públicas e estruturação de operações",
    icon: Database,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
    category: "Capitais",
    rating: "4.7"
  },
  {
    id: "esg-investing",
    name: "Julia - ESG & Investimentos Sustentáveis",
    description: "Especialista em investimentos ESG e sustentabilidade corporativa",
    icon: TrendingUp,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-22a909d28eba94674e80.png",
    category: "ESG",
    rating: "4.5"
  },
  {
    id: "compliance",
    name: "Fernanda - Compliance & Regulação",
    description: "Expert em compliance, regulamentação CVM e aspectos legais do mercado",
    icon: Settings,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
    category: "Compliance",
    rating: "4.8"
  },
  {
    id: "valuation",
    name: "Pedro - Valuation & M&A",
    description: "Especialista em avaliação de empresas, fusões e aquisições",
    icon: Landmark,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
    category: "Valuation",
    rating: "4.6"
  },
];

interface ChartData {
  [key: string]: string | number;
}

interface CustomChart {
  id: string;
  title: string;
  columns: string[];
  type: "bar" | "line" | "pie";
}

const CHART_COLORS = [
  "hsl(207, 50%, 65%)",
  "hsl(142, 50%, 65%)",
  "hsl(322, 50%, 65%)",
  "hsl(280, 50%, 65%)",
  "hsl(45, 50%, 65%)",
  "hsl(15, 50%, 65%)",
];

export default function TransformarTabelas() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [selectedAgent, setSelectedAgent] = useState(specializedAgents[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [dataKeys, setDataKeys] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [labelColumn, setLabelColumn] = useState<string>("");
  const [columnsPerChart, setColumnsPerChart] = useState<number>(2);
  const [customCharts, setCustomCharts] = useState<CustomChart[]>([]);
  const [showChartBuilder, setShowChartBuilder] = useState(false);
  const [currentChart, setCurrentChart] = useState<CustomChart | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, envie um arquivo Excel (.xlsx, .xls) ou CSV.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(file);
    
    // Processar arquivo automaticamente após seleção
    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      processExcelFile(arrayBuffer);
      setIsProcessing(false);
    };

    reader.onerror = () => {
      toast({
        title: "Erro ao ler arquivo",
        description: "Não foi possível ler o arquivo selecionado.",
        variant: "destructive",
      });
      setIsProcessing(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setChartData([]);
    setDataKeys([]);
    setSelectedColumns([]);
    setLabelColumn("");
    setCustomCharts([]);
    setShowChartBuilder(false);
  };

  const processExcelFile = (arrayBuffer: ArrayBuffer) => {
    try {
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as ChartData[];

      if (jsonData.length === 0) {
        throw new Error("O arquivo está vazio ou não contém dados válidos.");
      }

      // Extrair as chaves (colunas) dos dados
      const keys = Object.keys(jsonData[0]).filter(key => key !== "");
      
      setChartData(jsonData);
      setDataKeys(keys);
      
      // Definir automaticamente a primeira coluna como label e todas as colunas como selecionadas
      if (keys.length > 0) {
        setLabelColumn(keys[0]);
        setSelectedColumns(keys);
      }

      console.log('Arquivo processado:', { keys, selectedColumns: keys });

      toast({
        title: "Arquivo carregado com sucesso",
        description: `Processadas ${jsonData.length} linhas de dados com ${keys.length} colunas. Selecione as colunas desejadas.`,
      });
    } catch (error: any) {
      console.error("Error processing file:", error);
      toast({
        title: "Erro ao processar arquivo",
        description: error.message || "Não foi possível processar o arquivo.",
        variant: "destructive",
      });
      setChartData([]);
      setDataKeys([]);
    }
  };

  const handleGenerateChart = async () => {
    if (!file) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo para processar.",
        variant: "destructive",
      });
      return;
    }

    if (selectedColumns.length === 0) {
      toast({
        title: "Nenhuma coluna selecionada",
        description: "Por favor, selecione pelo menos uma coluna para visualizar.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gráfico atualizado",
      description: "Visualização gerada com sucesso.",
    });
  };

  const toggleColumnSelection = (column: string) => {
    console.log('Toggle column:', column, 'Current selected:', selectedColumns);
    
    if (currentChart) {
      setCurrentChart(prev => prev ? {
        ...prev,
        columns: prev.columns.includes(column)
          ? prev.columns.filter(c => c !== column)
          : [...prev.columns, column]
      } : null);
    } else {
      setSelectedColumns(prev => {
        const newSelection = prev.includes(column) 
          ? prev.filter(c => c !== column)
          : [...prev, column];
        console.log('New selection:', newSelection);
        return newSelection;
      });
    }
  };

  const createNewChart = () => {
    setCurrentChart({
      id: Date.now().toString(),
      title: `Gráfico ${customCharts.length + 1}`,
      columns: [],
      type: "bar"
    });
    setShowChartBuilder(true);
  };

  const saveCurrentChart = () => {
    if (!currentChart) return;
    
    if (currentChart.columns.length === 0) {
      toast({
        title: "Nenhuma coluna selecionada",
        description: "Selecione pelo menos uma coluna para o gráfico.",
        variant: "destructive",
      });
      return;
    }

    const existingIndex = customCharts.findIndex(c => c.id === currentChart.id);
    if (existingIndex >= 0) {
      const updated = [...customCharts];
      updated[existingIndex] = currentChart;
      setCustomCharts(updated);
    } else {
      setCustomCharts([...customCharts, currentChart]);
    }

    setCurrentChart(null);
    setShowChartBuilder(false);
    
    toast({
      title: "Gráfico salvo",
      description: "Gráfico personalizado criado com sucesso.",
    });
  };

  const editChart = (chart: CustomChart) => {
    setCurrentChart(chart);
    setShowChartBuilder(true);
  };

  const deleteChart = (chartId: string) => {
    setCustomCharts(customCharts.filter(c => c.id !== chartId));
    toast({
      title: "Gráfico removido",
      description: "Gráfico personalizado excluído.",
    });
  };

  const cancelChartBuilder = () => {
    setCurrentChart(null);
    setShowChartBuilder(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCustomCharts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });

      toast({
        title: "Gráfico reordenado",
        description: "A ordem dos gráficos foi atualizada.",
      });
    }
  };

  const renderSingleChart = (columns: string[], chartTitle?: string, chartTypeOverride?: "bar" | "line" | "pie") => {
    if (!labelColumn) return null;

    const type = chartTypeOverride || chartType;
    
    // Filtrar a labelColumn das colunas de dados para não renderizar a mesma coluna no eixo X e como série
    const dataColumns = columns.filter(col => col !== labelColumn);
    
    // Se não houver colunas de dados após filtrar, retornar mensagem
    if (dataColumns.length === 0) {
      return (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 text-sm">
            Selecione colunas diferentes da coluna do eixo X para visualizar
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {chartTitle && (
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{chartTitle}</h3>
        )}
        
        {type === "pie" ? (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={chartData.map((row, index) => ({
                  name: String(row[labelColumn]),
                  value: Number(row[dataColumns[0]]) || 0,
                  fill: CHART_COLORS[index % CHART_COLORS.length],
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        ) : type === "line" ? (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
              <XAxis 
                dataKey={labelColumn} 
                tick={{ fill: "hsl(215, 20%, 40%)" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: "hsl(215, 20%, 40%)" }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  border: "2px solid hsl(215, 20%, 85%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {dataColumns.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
              <XAxis 
                dataKey={labelColumn} 
                tick={{ fill: "hsl(215, 20%, 40%)" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: "hsl(215, 20%, 40%)" }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  border: "2px solid hsl(215, 20%, 85%)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {dataColumns.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  };

  const renderChart = () => {
    if (chartData.length === 0 || dataKeys.length === 0) {
      return (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 text-sm">
            Faça upload de um arquivo e selecione as colunas
          </p>
        </div>
      );
    }

    // Se existem gráficos personalizados, renderizar eles
    if (customCharts.length > 0) {
      return (
        <div className="space-y-8">
          {customCharts.map((chart) => (
            <div key={chart.id} className="relative border-2 border-slate-200 rounded-lg p-4">
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => editChart(chart)}
                  className="h-8 px-2"
                >
                  <i className="fas fa-edit text-slate-600"></i>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteChart(chart.id)}
                  className="h-8 px-2 hover:bg-red-50 hover:text-red-600"
                >
                  <i className="fas fa-trash text-slate-600"></i>
                </Button>
              </div>
              {renderSingleChart(chart.columns, chart.title, chart.type)}
            </div>
          ))}
        </div>
      );
    }

    if (selectedColumns.length === 0) {
      return (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 text-sm">
            Selecione pelo menos uma coluna para visualizar
          </p>
        </div>
      );
    }
    
    // Verificar se há colunas de dados diferentes da labelColumn
    const dataColumns = selectedColumns.filter(col => col !== labelColumn);
    if (dataColumns.length === 0) {
      return (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 text-sm">
            Selecione colunas diferentes da coluna do eixo X para visualizar
          </p>
        </div>
      );
    }

    // Renderizar todas as colunas selecionadas no mesmo gráfico compartilhando o eixo X
    return renderSingleChart(selectedColumns);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/ferramentas" className="p-2 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Transformar Tabelas em Gráficos</h1>
                <p className="text-sm text-slate-500 mt-1">Conversão automática de dados tabulares em visualizações gráficas</p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Gráficos Gerados</span>
                  <BarChart3 className="h-5 w-5 text-[hsl(206,50%,65%)]" />
                </div>
                <p className="text-3xl font-bold text-slate-800">84</p>
                <p className="text-xs text-slate-500 mt-1">Este mês</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Tempo Médio</span>
                  <i className="fas fa-clock text-[hsl(322,48%,65%)]"></i>
                </div>
                <p className="text-3xl font-bold text-slate-800">1.8min</p>
                <p className="text-xs text-slate-500 mt-1">Por conversão</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Tipos Suportados</span>
                  <i className="fas fa-chart-pie text-[hsl(152,48%,65%)]"></i>
                </div>
                <p className="text-3xl font-bold text-slate-800">8+</p>
                <p className="text-xs text-slate-500 mt-1">Visualizações</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border-2 border-slate-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center border-2 border-slate-300">
                        <Upload className="h-6 w-6 text-slate-700" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-800">Upload da Tabela</h2>
                        <p className="text-sm text-slate-600">Envie seu arquivo com dados</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-slate-700 font-medium border-2 border-[hsl(142,35%,65%)]"
                    >
                      Explicar Gráfico
                    </Button>
                  </div>
                  
                  {!file ? (
                    <label
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`
                        block border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
                        transition-all duration-300
                        ${isDragging 
                          ? "border-[hsl(142,35%,65%)] bg-[hsl(142,35%,95%)] scale-[1.02]" 
                          : "border-slate-300 hover:border-[hsl(142,35%,65%)] hover:bg-slate-50"
                        }
                      `}
                    >
                      <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-[hsl(142,35%,55%)]' : 'text-slate-400'}`} />
                      <p className="text-base font-medium text-slate-700 mb-1">
                        {isDragging ? "Solte o arquivo aqui" : "Clique para fazer upload"}
                      </p>
                      <p className="text-sm text-slate-500">ou arraste e solte o arquivo</p>
                      <p className="text-xs text-slate-400 mt-2">Excel (.xlsx, .xls) ou CSV (máx. 10MB)</p>
                    </label>
                  ) : (
                    <div className="border-2 border-[hsl(142,35%,75%)] bg-[hsl(142,35%,95%)] rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-[hsl(142,35%,75%)] flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-slate-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 truncate">{file.name}</p>
                            <p className="text-sm text-slate-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveFile}
                          className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {showChartBuilder && currentChart && (
                  <div className="bg-white rounded-xl border-2 border-[hsl(142,35%,75%)] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[hsl(142,35%,75%)] flex items-center justify-center">
                          <i className="fas fa-chart-bar text-slate-700"></i>
                        </div>
                        <h3 className="font-bold text-slate-800">Configurar Gráfico</h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                          Título do Gráfico
                        </Label>
                        <input
                          type="text"
                          value={currentChart.title}
                          onChange={(e) => setCurrentChart({ ...currentChart, title: e.target.value })}
                          className="w-full p-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(142,35%,75%)]"
                          placeholder="Nome do gráfico"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                          Tipo de Gráfico
                        </Label>
                        <select
                          value={currentChart.type}
                          onChange={(e) => setCurrentChart({ ...currentChart, type: e.target.value as "bar" | "line" | "pie" })}
                          className="w-full p-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(142,35%,75%)]"
                        >
                          <option value="bar">Gráfico de Barras</option>
                          <option value="line">Gráfico de Linha</option>
                          <option value="pie">Gráfico de Pizza</option>
                        </select>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                          Selecionar Colunas para Cruzar
                        </Label>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                          {dataKeys.map((key) => (
                            <label
                              key={key}
                              className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 hover:border-[hsl(142,35%,75%)] transition-colors cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={currentChart.columns.includes(key)}
                                onChange={() => toggleColumnSelection(key)}
                                className="w-4 h-4 text-[hsl(142,35%,65%)] focus:ring-[hsl(142,35%,75%)] border-slate-300 rounded"
                              />
                              <span className="text-sm font-medium text-slate-700 flex-1">
                                {key}
                              </span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          {currentChart.columns.length} coluna(s) selecionada(s)
                        </p>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          onClick={saveCurrentChart}
                          className="flex-1 bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-white"
                        >
                          Salvar Gráfico
                        </Button>
                        <Button
                          onClick={cancelChartBuilder}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Área de Visualização */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(152,48%,75%)] flex items-center justify-center border-2 border-slate-300">
                      <BarChart3 className="text-slate-700 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-800">Visualização Gerada</h2>
                      <p className="text-sm text-slate-600">Seu gráfico aparecerá aqui</p>
                    </div>
                  </div>

                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Loader2 className="h-16 w-16 text-[hsl(142,35%,65%)] animate-spin mb-4" />
                      <p className="text-slate-600 font-medium">Processando dados...</p>
                      <p className="text-sm text-slate-500 mt-2">Lendo e analisando arquivo</p>
                    </div>
                  ) : (
                    renderChart()
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(280,35%,75%)] flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-slate-700" />
                    </div>
                    <h3 className="font-bold text-slate-800">Tipo de Gráfico</h3>
                  </div>

                  <RadioGroup value={chartType} onValueChange={(value: any) => setChartType(value)} className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-slate-200 hover:border-[hsl(142,35%,75%)] transition-colors cursor-pointer">
                      <RadioGroupItem value="bar" id="bar" />
                      <Label htmlFor="bar" className="flex-1 cursor-pointer flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">Gráfico de Barras</span>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-slate-200 hover:border-[hsl(142,35%,75%)] transition-colors cursor-pointer">
                      <RadioGroupItem value="line" id="line" />
                      <Label htmlFor="line" className="flex-1 cursor-pointer flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">Gráfico de Linha</span>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-slate-200 hover:border-[hsl(142,35%,75%)] transition-colors cursor-pointer">
                      <RadioGroupItem value="pie" id="pie" />
                      <Label htmlFor="pie" className="flex-1 cursor-pointer flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">Gráfico de Pizza</span>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {selectedColumns.length > 3 && (
                    <div className="mt-6 pt-6 border-t-2 border-slate-200">
                      <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                        Colunas por Gráfico
                      </Label>
                      <select
                        value={columnsPerChart}
                        onChange={(e) => setColumnsPerChart(Number(e.target.value))}
                        className="w-full p-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(142,35%,75%)]"
                      >
                        <option value={1}>1 coluna</option>
                        <option value={2}>2 colunas</option>
                        <option value={3}>3 colunas</option>
                        <option value={4}>4 colunas</option>
                        <option value={5}>5 colunas</option>
                      </select>
                      <p className="text-xs text-slate-500 mt-2">
                        Serão criados {Math.ceil(selectedColumns.length / columnsPerChart)} gráfico(s)
                      </p>
                    </div>
                  )}
                </div>

{dataKeys.length > 0 && !showChartBuilder && (
                  <>
                    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[hsl(207,50%,75%)] flex items-center justify-center">
                            <i className="fas fa-layer-group text-slate-700"></i>
                          </div>
                          <h3 className="font-bold text-slate-800">Gráficos Personalizados</h3>
                        </div>
                        <Button
                          onClick={createNewChart}
                          size="sm"
                          className="bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-white"
                        >
                          <i className="fas fa-plus mr-2"></i>
                          Novo Gráfico
                        </Button>
                      </div>

                      {customCharts.length > 0 ? (
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={customCharts.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            <div className="space-y-2">
                              {customCharts.map((chart) => (
                                <SortableChartItem
                                  key={chart.id}
                                  chart={chart}
                                  onEdit={editChart}
                                  onDelete={deleteChart}
                                />
                              ))}
                            </div>
                          </SortableContext>
                        </DndContext>
                      ) : (
                        <p className="text-sm text-slate-500 text-center py-4">
                          Nenhum gráfico personalizado criado ainda
                        </p>
                      )}
                    </div>

                    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(207,50%,75%)] flex items-center justify-center">
                        <i className="fas fa-columns text-slate-700"></i>
                      </div>
                      <h3 className="font-bold text-slate-800">Seleção de Colunas</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                          Coluna de Rótulos (Eixo X)
                        </Label>
                        <select
                          value={labelColumn}
                          onChange={(e) => setLabelColumn(e.target.value)}
                          className="w-full p-2 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(142,35%,75%)]"
                        >
                          {dataKeys.map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                          Colunas de Dados (Valores)
                        </Label>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                          {dataKeys.map((key) => (
                            <label
                              key={key}
                              className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 hover:border-[hsl(142,35%,75%)] transition-colors cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedColumns.includes(key)}
                                onChange={() => toggleColumnSelection(key)}
                                className="w-4 h-4 text-[hsl(142,35%,65%)] focus:ring-[hsl(142,35%,75%)] border-slate-300 rounded"
                              />
                              <span className="text-sm font-medium text-slate-700 flex-1">
                                {key}
                              </span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          {selectedColumns.length} coluna(s) selecionada(s)
                        </p>
                      </div>
                    </div>
                  </div>
                  </>
                )}

                <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(322,48%,75%)] flex items-center justify-center">
                      <i className="fas fa-robot text-slate-700"></i>
                    </div>
                    <h3 className="font-bold text-slate-800">Agente IA</h3>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {specializedAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        className={`
                          w-full text-left p-3 rounded-lg border-2 transition-all
                          ${selectedAgent === agent.id 
                            ? 'border-[hsl(142,35%,75%)] bg-[hsl(142,35%,95%)]' 
                            : 'border-slate-200 hover:border-[hsl(142,35%,75%)] hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <img 
                            src={agent.image} 
                            alt={agent.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm text-slate-800 truncate">{agent.name}</p>
                              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: agent.bgColor, color: 'hsl(215, 20%, 30%)' }}>
                                {agent.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">{agent.description}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <i className="fas fa-star text-yellow-500 text-xs"></i>
                              <span className="text-xs font-medium text-slate-700">{agent.rating}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateChart}
                  disabled={!file || isProcessing || selectedColumns.length === 0}
                  className="w-full bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Atualizar Visualização
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
