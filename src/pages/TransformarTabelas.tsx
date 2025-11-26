import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Upload, FileText, Loader2, Download, ChartLine, Landmark, Bitcoin, GraduationCap, TrendingUp, CreditCard, Database, Settings, BarChart3, PieChart, LineChart } from "lucide-react";
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
  const { toast } = useToast();

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
  };

  const handleRemoveFile = () => {
    setFile(null);
    setChartData([]);
    setDataKeys([]);
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

      toast({
        title: "Gráfico gerado com sucesso",
        description: `Processadas ${jsonData.length} linhas de dados com ${keys.length} colunas.`,
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

    setIsProcessing(true);

    try {
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
    } catch (error: any) {
      console.error("Error reading file:", error);
      toast({
        title: "Erro ao processar arquivo",
        description: error.message || "Ocorreu um erro ao processar o arquivo.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const renderChart = () => {
    if (chartData.length === 0 || dataKeys.length === 0) {
      return (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 text-sm">
            Faça upload de um arquivo e clique em "Gerar Gráfico"
          </p>
        </div>
      );
    }

    // Primeira coluna é usada como label/categoria
    const labelKey = dataKeys[0];
    // Demais colunas são valores numéricos
    const valueKeys = dataKeys.slice(1).filter(key => {
      // Verificar se a coluna contém valores numéricos
      return chartData.some(row => typeof row[key] === "number" || !isNaN(Number(row[key])));
    });

    if (valueKeys.length === 0) {
      return (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 text-sm">
            Não foram encontradas colunas numéricas nos dados.
          </p>
        </div>
      );
    }

    // Para gráfico de pizza, usar apenas a primeira coluna numérica
    if (chartType === "pie") {
      const pieData = chartData.map((row, index) => ({
        name: String(row[labelKey]),
        value: Number(row[valueKeys[0]]) || 0,
        fill: CHART_COLORS[index % CHART_COLORS.length],
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
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsLineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
            <XAxis 
              dataKey={labelKey} 
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
            {valueKeys.map((key, index) => (
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
      );
    }

    // Bar chart (default)
    return (
      <ResponsiveContainer width="100%" height={400}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 85%)" />
          <XAxis 
            dataKey={labelKey} 
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
          {valueKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    );
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center border-2 border-slate-300">
                      <Upload className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Upload da Tabela</h2>
                      <p className="text-sm text-slate-600">Envie seu arquivo com dados</p>
                    </div>
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
                </div>

                <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(322,48%,75%)] flex items-center justify-center">
                      <i className="fas fa-robot text-slate-700"></i>
                    </div>
                    <h3 className="font-bold text-slate-800">Agente IA</h3>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
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
                  disabled={!file || isProcessing}
                  className="w-full bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-white font-semibold py-6 text-base"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Gerar Gráfico
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
