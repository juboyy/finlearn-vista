import { useState, useRef, useEffect, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Plot from 'react-plotly.js';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  BarChart3, 
  Table as TableIcon, 
  Quote, 
  Lightbulb,
  Type,
  Image as ImageIcon,
  Code,
  Wand2,
  Search,
  Network,
  Video,
  Bot,
  Settings,
  Eye,
  Upload,
  FileSpreadsheet,
  CheckCircle
} from "lucide-react";

interface CommandMenuOption {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  action: () => void;
}

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [commandMenuPosition, setCommandMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const [editingChart, setEditingChart] = useState<{ id: string; title: string; data: any } | null>(null);
  const [chartTitle, setChartTitle] = useState("");
  const [chartLabels, setChartLabels] = useState("");
  const [chartValues, setChartValues] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commandMenuRef = useRef<HTMLDivElement>(null);

  // Schema de validação para dados do arquivo
  const fileDataSchema = z.object({
    labels: z.array(z.string()).min(1, "Arquivo deve conter pelo menos um label"),
    values: z.array(z.number()).min(1, "Arquivo deve conter pelo menos um valor")
  });

  // Dados dos gráficos disponíveis
  const chartData: Record<string, any> = {
    bar: {
      data: [{
        type: 'bar',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 35, 30, 45, 40],
        marker: { color: '#B8D4E8' }
      }],
      title: 'Gráfico de Barras'
    },
    line: {
      data: [{
        type: 'scatter',
        mode: 'lines',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 35, 30, 45, 40],
        line: { color: '#C5E8D4', width: 2 }
      }],
      title: 'Gráfico de Linha'
    },
    pie: {
      data: [{
        type: 'pie',
        values: [30, 25, 20, 15, 10],
        labels: ['A', 'B', 'C', 'D', 'E'],
        marker: { 
          colors: ['#D4C5E8', '#B8D4E8', '#C5E8D4', '#E8E0C5', '#E8C5D8']
        }
      }],
      title: 'Gráfico de Pizza'
    },
    area: {
      data: [{
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 35, 30, 45, 40],
        fillcolor: 'rgba(232, 224, 197, 0.5)',
        line: { color: '#E8E0C5', width: 2 }
      }],
      title: 'Gráfico de Área'
    },
    scatter: {
      data: [{
        type: 'scatter',
        mode: 'markers',
        x: [1, 2, 3, 4, 5, 6, 7],
        y: [10, 15, 13, 17, 20, 18, 25],
        marker: { 
          color: '#E8C5D8',
          size: 8
        }
      }],
      title: 'Gráfico de Dispersão'
    },
    trend: {
      data: [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 28, 35, 42, 48],
        line: { color: '#A8C8D8', width: 3, shape: 'spline' },
        marker: { color: '#A8C8D8', size: 6 }
      }],
      title: 'Gráfico de Tendência'
    }
  };

  const insertContent = (content: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    // Remove the "/" that triggered the command
    const beforeSlash = text.substring(0, start - 1);
    const afterSlash = text.substring(end);
    
    const newValue = beforeSlash + content + afterSlash;
    onChange(newValue);
    
    // Set cursor position after inserted content
    setTimeout(() => {
      const newPosition = beforeSlash.length + content.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const commandOptions: CommandMenuOption[] = [
    {
      id: "chart",
      label: "Criar Gráfico",
      icon: BarChart3,
      description: "Adicionar um gráfico interativo",
      action: () => {
        insertContent("\n\n```chart\n{\n  \"type\": \"bar\",\n  \"title\": \"Título do Gráfico\",\n  \"data\": []\n}\n```\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "table",
      label: "Criar Tabela",
      icon: TableIcon,
      description: "Inserir uma tabela markdown",
      action: () => {
        insertContent("\n\n| Coluna 1 | Coluna 2 | Coluna 3 |\n|----------|----------|----------|\n| Dado 1   | Dado 2   | Dado 3   |\n| Dado 4   | Dado 5   | Dado 6   |\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "quote",
      label: "Criar Citação",
      icon: Quote,
      description: "Adicionar um bloco de citação",
      action: () => {
        insertContent("\n\n> Sua citação aqui\n> Pode ter múltiplas linhas\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "insights",
      label: "Insights",
      icon: Lightbulb,
      description: "Gerar insights com IA",
      action: () => {
        insertContent("\n\n💡 **Insights Gerados:**\n- Insight 1\n- Insight 2\n- Insight 3\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "heading",
      label: "Título",
      icon: Type,
      description: "Adicionar um título",
      action: () => {
        insertContent("\n\n## Título\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "image",
      label: "Imagem",
      icon: ImageIcon,
      description: "Inserir uma imagem",
      action: () => {
        insertContent("\n\n![Descrição da imagem](url-da-imagem)\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "code",
      label: "Código",
      icon: Code,
      description: "Bloco de código",
      action: () => {
        insertContent("\n\n```javascript\n// Seu código aqui\n```\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "continue",
      label: "Continuação de texto",
      icon: Wand2,
      description: "Continuar escrevendo com IA",
      action: () => {
        insertContent("\n\n[Continuação gerada por IA...]\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "search",
      label: "Buscar dados",
      icon: Search,
      description: "Buscar informações externas",
      action: () => {
        insertContent("\n\n🔍 **Dados Buscados:**\n- Resultado 1\n- Resultado 2\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "correlate",
      label: "Correlacionar conteúdo",
      icon: Network,
      description: "Criar correlações entre dados",
      action: () => {
        insertContent("\n\n🔗 **Correlações:**\n- Correlação 1\n- Correlação 2\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "video",
      label: "Adicionar Vídeo",
      icon: Video,
      description: "Inserir um vídeo",
      action: () => {
        insertContent("\n\n[![Vídeo](thumbnail-url)](url-do-video)\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "agent",
      label: "Adicionar Agente",
      icon: Bot,
      description: "Inserir um agente IA",
      action: () => {
        insertContent("\n\n🤖 **Agente IA:**\n- Nome: [nome do agente]\n- Função: [descrição]\n\n");
        setShowCommandMenu(false);
      }
    }
  ];

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Navigate command menu with arrow keys
    if (showCommandMenu) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => 
          prev < commandOptions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        commandOptions[selectedCommandIndex].action();
      } else if (e.key === "Escape") {
        setShowCommandMenu(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = newValue.substring(0, cursorPosition);
    
    onChange(newValue);
    
    // Show command menu if "/" was just typed
    if (textBeforeCursor.endsWith("/") && !showCommandMenu) {
      const textarea = e.target;
      const lines = textBeforeCursor.split("\n");
      const currentLineNumber = lines.length;
      const lineHeight = 24;
      const top = Math.min(currentLineNumber * lineHeight, 300);
      
      setCommandMenuPosition({ top, left: 20 });
      setShowCommandMenu(true);
      setSelectedCommandIndex(0);
    }
    
    // Hide command menu if "/" is deleted or user typed something else
    if (!textBeforeCursor.endsWith("/") && showCommandMenu) {
      setShowCommandMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        commandMenuRef.current &&
        !commandMenuRef.current.contains(e.target as Node) &&
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        setShowCommandMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditChart = (chartId: string, chartData: any) => {
    setEditingChart({ id: chartId, title: chartData.title, data: chartData.data });
    
    // Extrai dados do gráfico para o formulário
    const firstDataset = chartData.data[0];
    if (firstDataset) {
      setChartTitle(chartData.title || "");
      
      if (firstDataset.x) {
        setChartLabels(Array.isArray(firstDataset.x) ? firstDataset.x.join(", ") : "");
      } else if (firstDataset.labels) {
        setChartLabels(Array.isArray(firstDataset.labels) ? firstDataset.labels.join(", ") : "");
      }
      
      if (firstDataset.y) {
        setChartValues(Array.isArray(firstDataset.y) ? firstDataset.y.join(", ") : "");
      } else if (firstDataset.values) {
        setChartValues(Array.isArray(firstDataset.values) ? firstDataset.values.join(", ") : "");
      }
    }
  };

  const handleSaveChart = () => {
    if (!editingChart) return;
    
    // Atualiza o markdown com o novo título
    const oldPattern = new RegExp(`!\\[.*?\\]\\(chart:${editingChart.id}\\)`, 'g');
    const newMarkdown = value.replace(oldPattern, `![${chartTitle}](chart:${editingChart.id})`);
    onChange(newMarkdown);
    
    setEditingChart(null);
    setUploadedFileName("");
  };

  const processCSV = (text: string): { labels: string[]; values: number[] } => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) throw new Error("CSV deve ter pelo menos 2 linhas (cabeçalho e dados)");
    
    const labels: string[] = [];
    const values: number[] = [];
    
    // Ignora a primeira linha (cabeçalho)
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',').map(col => col.trim());
      if (columns.length >= 2) {
        labels.push(columns[0]);
        const value = parseFloat(columns[1]);
        if (!isNaN(value)) {
          values.push(value);
        }
      }
    }
    
    return { labels, values };
  };

  const processExcel = (arrayBuffer: ArrayBuffer): { labels: string[]; values: number[] } => {
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][];
    
    if (jsonData.length < 2) throw new Error("Excel deve ter pelo menos 2 linhas (cabeçalho e dados)");
    
    const labels: string[] = [];
    const values: number[] = [];
    
    // Ignora a primeira linha (cabeçalho)
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      if (row.length >= 2) {
        labels.push(String(row[0] || '').trim());
        const value = parseFloat(String(row[1] || '0'));
        if (!isNaN(value)) {
          values.push(value);
        }
      }
    }
    
    return { labels, values };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validação de tamanho (máx 20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert('Arquivo muito grande. O tamanho máximo é 20MB.');
      return;
    }

    setIsProcessing(true);
    setUploadedFileName(file.name);

    try {
      let processedData: { labels: string[]; values: number[] };

      if (file.name.endsWith('.csv')) {
        const text = await file.text();
        processedData = processCSV(text);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const arrayBuffer = await file.arrayBuffer();
        processedData = processExcel(arrayBuffer);
      } else if (file.name.endsWith('.json')) {
        const text = await file.text();
        const jsonData = JSON.parse(text);
        
        if (Array.isArray(jsonData)) {
          processedData = {
            labels: jsonData.map(item => String(item.label || item.name || item.x || '')),
            values: jsonData.map(item => parseFloat(String(item.value || item.y || 0)))
          };
        } else {
          throw new Error("JSON deve ser um array de objetos");
        }
      } else {
        throw new Error("Formato de arquivo não suportado");
      }

      // Valida os dados processados
      const validatedData = fileDataSchema.parse(processedData);

      // Atualiza os campos
      setChartLabels(validatedData.labels.join(', '));
      setChartValues(validatedData.values.join(', '));

    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      alert(`Erro ao processar arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setUploadedFileName("");
    } finally {
      setIsProcessing(false);
      // Limpa o input para permitir upload do mesmo arquivo novamente
      event.target.value = '';
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Content Area */}
      <div className="relative flex-1 grid grid-cols-2 gap-4">
        {/* Editor Column */}
        <div className="relative border-r border-border">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Digite '/' para ver os comandos disponíveis..."
          className="w-full h-full min-h-[600px] p-8 bg-transparent border-none focus:outline-none resize-none font-mono text-foreground leading-relaxed"
          style={{ 
            fontSize: '15px',
            lineHeight: '24px'
          }}
        />
        
            {showCommandMenu && (
              <div
                ref={commandMenuRef}
                className="absolute bg-card border border-border rounded-lg shadow-2xl z-50 w-80 overflow-hidden"
                style={{
                  top: `${commandMenuPosition.top}px`,
                  left: `${commandMenuPosition.left}px`,
                }}
              >
                <div className="py-2">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase border-b border-border">
                    Comandos Disponíveis
                  </div>
                  {commandOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={option.action}
                        className={`w-full px-3 py-2.5 text-left hover:bg-muted transition flex items-start gap-3 ${
                          index === selectedCommandIndex ? 'bg-muted' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 ${
                          index === selectedCommandIndex 
                            ? 'bg-[hsl(206,35%,75%)]' 
                            : 'bg-[hsl(206,35%,85%)]'
                        } rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="text-[hsl(220,15%,30%)]" size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        {/* Preview Column */}
        <div className="relative overflow-y-auto p-8">
            <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase border-b border-border pb-2">
              Preview
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {value.split(/(\!\[.*?\]\(chart:.*?\))/g).map((part, index) => {
                // Verifica se é um marcador de gráfico
                const chartMatch = part.match(/\!\[(.*?)\]\(chart:(.*?)\)/);
                
                if (chartMatch) {
                  const chartTitle = chartMatch[1];
                  const chartId = chartMatch[2];
                  const chart = chartData[chartId];
                  
                  if (chart) {
                    return (
                      <div 
                        key={index} 
                        className="my-6 bg-card rounded-lg border border-border p-4 not-prose relative group cursor-pointer hover:border-primary transition"
                        onClick={() => handleEditChart(chartId, chart)}
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-primary/10 rounded-lg p-2">
                          <Settings size={16} className="text-primary" />
                        </div>
                        <Plot
                          data={chart.data}
                          layout={{
                            title: chartTitle || chart.title,
                            margin: { t: 40, r: 20, b: 60, l: 60 },
                            plot_bgcolor: 'transparent',
                            paper_bgcolor: 'transparent',
                            font: { family: 'Inter, sans-serif', color: '#64748b' },
                            height: 400,
                            xaxis: { showgrid: false },
                            yaxis: { showgrid: true, gridcolor: '#e2e8f0' }
                          }}
                          config={{ responsive: true, displayModeBar: false }}
                          style={{ width: '100%' }}
                        />
                      </div>
                    );
                  }
                }
                
                // Renderiza o markdown normal
                return part ? (
                  <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
                    {part}
                  </ReactMarkdown>
                ) : null;
              })}
              
              {!value && <p className="text-muted-foreground italic">Comece a escrever para ver o preview...</p>}
            </div>
          </div>
      </div>

      {/* Chart Edit Dialog */}
      <Dialog open={!!editingChart} onOpenChange={(open) => !open && setEditingChart(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                <BarChart3 size={24} className="text-slate-700" />
              </div>
              <div>
                <DialogTitle className="text-xl">Editar Gráfico</DialogTitle>
                <DialogDescription>
                  Personalize o título, dados e importe arquivos para o gráfico
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            {/* Título do Gráfico */}
            <div className="rounded-lg p-4 border border-border" style={{ backgroundColor: '#F8F9FA' }}>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Type size={16} />
                Título do Gráfico
              </label>
              <input
                type="text"
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                placeholder="Digite o título do gráfico"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] bg-white text-slate-800 font-medium"
              />
            </div>

            {/* Dados do Gráfico */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg p-4 border border-border" style={{ backgroundColor: '#F8F9FA' }}>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <TableIcon size={16} />
                  Labels
                </label>
                <input
                  type="text"
                  value={chartLabels}
                  onChange={(e) => setChartLabels(e.target.value)}
                  placeholder="Ex: Jan, Fev, Mar, Abr, Mai"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] bg-white text-slate-800"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Separados por vírgula
                </p>
              </div>

              <div className="rounded-lg p-4 border border-border" style={{ backgroundColor: '#F8F9FA' }}>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <BarChart3 size={16} />
                  Valores
                </label>
                <input
                  type="text"
                  value={chartValues}
                  onChange={(e) => setChartValues(e.target.value)}
                  placeholder="Ex: 20, 35, 30, 45, 40"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)] bg-white text-slate-800"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Números separados por vírgula
                </p>
              </div>
            </div>

            {/* Upload de Arquivo */}
            <div className="rounded-lg border-2 border-dashed transition" style={{ 
              backgroundColor: uploadedFileName ? '#E8F5E9' : '#FAFBFC',
              borderColor: uploadedFileName ? '#81C784' : '#CBD5E0'
            }}>
              <input
                type="file"
                id="chart-file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls,.json"
                onChange={handleFileUpload}
                disabled={isProcessing}
              />
              <label htmlFor="chart-file-upload" className="cursor-pointer block p-6">
                <div className="flex flex-col items-center gap-3">
                  {isProcessing ? (
                    <>
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center animate-pulse" style={{ backgroundColor: '#B8D4E8' }}>
                        <Upload size={24} className="text-slate-700 animate-bounce" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        Processando arquivo...
                      </p>
                    </>
                  ) : uploadedFileName ? (
                    <>
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                        <CheckCircle size={24} className="text-slate-700" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-slate-700 mb-1">
                          Arquivo carregado com sucesso
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 justify-center">
                          <FileSpreadsheet size={12} />
                          {uploadedFileName}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 transition hover:opacity-80"
                        style={{ backgroundColor: '#B8D4E8' }}
                      >
                        Carregar outro arquivo
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                        <Upload size={24} className="text-slate-700" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-slate-700 mb-1">
                          Upload de arquivo de dados
                        </p>
                        <p className="text-xs text-slate-500">
                          CSV, Excel ou JSON - máx 20MB
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          Formato esperado: Label, Valor
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 transition hover:opacity-80"
                        style={{ backgroundColor: '#C5E8D4' }}
                      >
                        Escolher arquivo
                      </button>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Preview do Gráfico */}
            {editingChart && (
              <div className="rounded-lg p-4 border border-border" style={{ backgroundColor: '#F8F9FA' }}>
                <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Eye size={16} />
                  Preview
                </h4>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <Plot
                    data={editingChart.data}
                    layout={{
                      title: chartTitle || editingChart.title,
                      margin: { t: 40, r: 20, b: 60, l: 60 },
                      plot_bgcolor: 'transparent',
                      paper_bgcolor: 'transparent',
                      font: { family: 'Inter, sans-serif', color: '#64748b' },
                      height: 300,
                      xaxis: { showgrid: false },
                      yaxis: { showgrid: true, gridcolor: '#e2e8f0' }
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setEditingChart(null)}
                className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveChart}
                className="px-5 py-2.5 text-slate-700 rounded-lg hover:opacity-90 transition font-medium"
                style={{ backgroundColor: '#B8D4E8' }}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
