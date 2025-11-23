import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Eye, 
  Share2, 
  Save, 
  ChevronDown,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  CheckSquare,
  Link as LinkIcon,
  Code,
  BarChart3,
  Table as TableIcon,
  Heart,
  Download,
  ChartLine,
  Shield,
  Lightbulb,
  AlertTriangle,
  Pen,
  TrendingUp,
  PieChart,
  AreaChart,
  ScatterChart,
  LineChart
} from "lucide-react";
import { useState, useEffect } from "react";
import Plot from 'react-plotly.js';
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function NovoDocumento() {
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
  const [isNewDocument, setIsNewDocument] = useState(true); // Inicia como true para mostrar o editor
  const [editorContent, setEditorContent] = useState("# Novo Documento\n\nComece a escrever aqui...\n\n");
  const [chartDrawerOpen, setChartDrawerOpen] = useState(false);
  const [draggedChart, setDraggedChart] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState({
    name: "Agente Analista",
    description: "Especialista em análise de mercado",
    icon: ChartLine,
    color: "bg-[hsl(206,35%,85%)]"
  });

  const chartTypes = [
    {
      id: 'bar',
      name: 'Gráfico de Barras',
      description: 'Para comparar valores entre categorias',
      icon: BarChart3,
      color: 'bg-[hsl(206,35%,85%)]',
      previewData: [{
        type: 'bar',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 35, 30, 45, 40],
        marker: { color: '#B8D4E8' }
      }]
    },
    {
      id: 'line',
      name: 'Gráfico de Linha',
      description: 'Para mostrar tendências ao longo do tempo',
      icon: LineChart,
      color: 'bg-[hsl(160,35%,85%)]',
      previewData: [{
        type: 'scatter',
        mode: 'lines',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 35, 30, 45, 40],
        line: { color: '#C5E8D4', width: 2 }
      }]
    },
    {
      id: 'pie',
      name: 'Gráfico de Pizza',
      description: 'Para mostrar proporções de um todo',
      icon: PieChart,
      color: 'bg-[hsl(280,35%,85%)]',
      previewData: [{
        type: 'pie',
        values: [30, 25, 20, 15, 10],
        labels: ['A', 'B', 'C', 'D', 'E'],
        marker: { 
          colors: ['#D4C5E8', '#B8D4E8', '#C5E8D4', '#E8E0C5', '#E8C5D8']
        }
      }]
    },
    {
      id: 'area',
      name: 'Gráfico de Área',
      description: 'Para mostrar volume ao longo do tempo',
      icon: AreaChart,
      color: 'bg-[hsl(45,35%,85%)]',
      previewData: [{
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 35, 30, 45, 40],
        fillcolor: 'rgba(232, 224, 197, 0.5)',
        line: { color: '#E8E0C5', width: 2 }
      }]
    },
    {
      id: 'scatter',
      name: 'Gráfico de Dispersão',
      description: 'Para mostrar correlação entre variáveis',
      icon: ScatterChart,
      color: 'bg-[hsl(340,35%,85%)]',
      previewData: [{
        type: 'scatter',
        mode: 'markers',
        x: [1, 2, 3, 4, 5, 6, 7],
        y: [10, 15, 13, 17, 20, 18, 25],
        marker: { 
          color: '#E8C5D8',
          size: 8
        }
      }]
    },
    {
      id: 'trend',
      name: 'Gráfico de Tendência',
      description: 'Para análise de tendências e projeções',
      icon: TrendingUp,
      color: 'bg-[hsl(190,35%,85%)]',
      previewData: [{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        y: [20, 28, 35, 42, 48],
        line: { color: '#A8C8D8', width: 3, shape: 'spline' },
        marker: { color: '#A8C8D8', size: 6 }
      }]
    }
  ];

  const agents = [
    {
      name: "Agente Analista",
      description: "Especialista em análise de mercado",
      icon: ChartLine,
      color: "bg-[hsl(206,35%,85%)]"
    },
    {
      name: "Agente Compliance",
      description: "Especialista em conformidade regulatória",
      icon: Shield,
      color: "bg-[hsl(160,35%,85%)]"
    },
    {
      name: "Agente Estrategista",
      description: "Especialista em estratégia de investimentos",
      icon: Lightbulb,
      color: "bg-[hsl(280,35%,85%)]"
    },
    {
      name: "Agente Risco",
      description: "Especialista em gestão de riscos",
      icon: AlertTriangle,
      color: "bg-[hsl(45,35%,85%)]"
    },
    {
      name: "Agente Escritor",
      description: "Especialista em redação financeira",
      icon: Pen,
      color: "bg-[hsl(340,35%,85%)]"
    }
  ];

  const documents = [
    {
      title: "Análise de Mercado Q4 2024",
      lastEdited: "há 2 horas",
      hasCharts: true,
      hasTables: true,
      chartsCount: 3,
      tablesCount: 2,
      isActive: true
    },
    {
      title: "Relatório de Compliance",
      lastEdited: "ontem",
      hasTables: true,
      tablesCount: 5,
      isActive: false
    },
    {
      title: "Estratégia de Investimentos 2025",
      lastEdited: "há 3 dias",
      hasCharts: true,
      chartsCount: 6,
      isActive: false
    },
    {
      title: "Notas de Reunião - CVM",
      lastEdited: "há 1 semana",
      isActive: false
    },
    {
      title: "Análise Técnica - IBOV",
      lastEdited: "há 2 semanas",
      hasCharts: true,
      chartsCount: 4,
      isActive: false
    }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.agent-dropdown-container')) {
        setAgentDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Funções helper para manipulação do markdown
  const insertMarkdown = (before: string, after: string = '') => {
    if (!isNewDocument) return;
    
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) {
      setEditorContent(prev => prev + before + after);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorContent.substring(start, end);
    
    const newContent = 
      editorContent.substring(0, start) +
      before +
      selectedText +
      after +
      editorContent.substring(end);
    
    setEditorContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleBold = () => insertMarkdown('**', '**');
  const handleItalic = () => insertMarkdown('*', '*');
  const handleUnderline = () => insertMarkdown('<u>', '</u>');
  const handleH1 = () => insertMarkdown('\n# ', '\n');
  const handleH2 = () => insertMarkdown('\n## ', '\n');
  const handleH3 = () => insertMarkdown('\n### ', '\n');
  const handleBulletList = () => insertMarkdown('\n- ', '\n');
  const handleNumberedList = () => insertMarkdown('\n1. ', '\n');
  const handleChecklist = () => insertMarkdown('\n- [ ] ', '\n');
  const handleLink = () => insertMarkdown('[', '](url)');
  const handleCode = () => insertMarkdown('```\n', '\n```');
  const handleTable = () => {
    const tableMarkdown = '\n\n| Coluna 1 | Coluna 2 | Coluna 3 |\n|----------|----------|----------|\n| Dado 1   | Dado 2   | Dado 3   |\n| Dado 4   | Dado 5   | Dado 6   |\n\n';
    insertMarkdown(tableMarkdown);
  };

  const handleDragStart = (chartId: string) => {
    setDraggedChart(chartId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggedChart(null);
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (draggedChart) {
      const chart = chartTypes.find(c => c.id === draggedChart);
      if (chart) {
        if (isNewDocument) {
          // Insere o marcador do gráfico no markdown
          const chartMarkdown = `\n\n### ${chart.name}\n\n![${chart.name}](chart:${chart.id})\n\n*${chart.description}*\n\n`;
          setEditorContent(prev => prev + chartMarkdown);
        }
        // Fecha o drawer e mostra mensagem de sucesso
        setChartDrawerOpen(false);
        alert(`${chart.name} foi adicionado ao documento!`);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Data for Plotly charts
  const indicesData = [
    {
      type: 'bar',
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
      y: [115200, 117800, 119500, 121300, 118900, 122400, 124100, 123500, 125800, 126900, 127458],
      name: 'IBOVESPA',
      marker: { color: '#B8D4E8' }
    },
    {
      type: 'bar',
      x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
      y: [4100, 4150, 4220, 4280, 4190, 4310, 4380, 4420, 4490, 4540, 4589],
      name: 'S&P 500',
      marker: { color: '#C5E8D4' }
    }
  ];

  const sectorData = [
    {
      type: 'bar',
      x: ['Tecnologia', 'Financeiro', 'Saúde', 'Energia', 'Consumo', 'Indústria'],
      y: [18.5, 12.3, 8.7, 5.2, 9.8, 6.4],
      marker: {
        color: ['#B8D4E8', '#C5E8D4', '#D4C5E8', '#E8E0C5', '#E8C5D8', '#E8D4C5']
      }
    }
  ];

  const riskData = [
    {
      type: 'heatmap',
      z: [[8, 6, 4, 7], [5, 9, 3, 6], [4, 5, 8, 5], [7, 4, 6, 9]],
      x: ['América do Norte', 'Europa', 'Ásia-Pacífico', 'América Latina'],
      y: ['Político', 'Econômico', 'Operacional', 'Regulatório'],
      colorscale: [
        [0, '#C5E8D4'],
        [0.5, '#E8E0C5'],
        [1, '#E8C5D8']
      ],
      showscale: true,
      hovertemplate: '%{y}<br>%{x}<br>Risco: %{z}<extra></extra>'
    }
  ];

  const chartLayout = {
    margin: { t: 40, r: 20, b: 60, l: 60 },
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
    font: { family: 'Inter, sans-serif' }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      {/* Documents Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Meus Documentos</h2>
            <button 
              onClick={() => {
                setIsNewDocument(true);
                setEditorContent("# Novo Documento\n\nComece a escrever aqui...\n\n");
              }}
              className="w-8 h-8 bg-[hsl(206,35%,85%)] text-[hsl(220,15%,30%)] rounded-lg flex items-center justify-center hover:bg-opacity-80 transition shadow-sm"
              title="Criar novo documento"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar documentos..." 
              className="w-full px-4 py-2 pl-10 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(206,35%,75%)]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          </div>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 text-xs">
            <button className="px-3 py-1.5 bg-[hsl(206,35%,85%)] text-[hsl(220,15%,30%)] rounded-lg font-medium">Todos</button>
            <button className="px-3 py-1.5 text-muted-foreground hover:bg-muted rounded-lg font-medium">Recentes</button>
            <button className="px-3 py-1.5 text-muted-foreground hover:bg-muted rounded-lg font-medium">Favoritos</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {documents.map((doc, index) => (
            <div 
              key={index} 
              onClick={() => {
                setIsNewDocument(false);
              }}
              className={`p-3 rounded-lg border border-border cursor-pointer transition ${
                doc.isActive && !isNewDocument ? 'bg-[hsl(206,35%,85%)]' : 'bg-card hover:bg-muted'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm truncate ${doc.isActive ? 'font-semibold' : 'font-medium'} text-foreground`}>
                    {doc.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{doc.lastEdited}</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreVertical size={14} />
                </button>
              </div>
              {(doc.hasCharts || doc.hasTables) && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {doc.hasCharts && (
                    <>
                      <BarChart3 size={12} />
                      <span>{doc.chartsCount} gráficos</span>
                    </>
                  )}
                  {doc.hasCharts && doc.hasTables && <span>•</span>}
                  {doc.hasTables && (
                    <>
                      <TableIcon size={12} />
                      <span>{doc.tablesCount} tabelas</span>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <input 
                type="text" 
                defaultValue="Análise de Mercado Q4 2024" 
                className="text-2xl font-semibold text-foreground bg-transparent border-none focus:outline-none focus:ring-0 min-w-0 flex-1"
              />
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-2 whitespace-nowrap">
                <Eye size={16} />
                <span className="hidden sm:inline">Pré-visualizar</span>
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-2 whitespace-nowrap">
                <Share2 size={16} />
                <span className="hidden sm:inline">Compartilhar</span>
              </button>
              <button className="px-4 py-2 bg-[hsl(206,35%,85%)] text-[hsl(220,15%,30%)] rounded-lg font-medium hover:bg-opacity-80 transition text-sm flex items-center gap-2 whitespace-nowrap">
                <Save size={16} />
                <span className="hidden sm:inline">Salvar</span>
              </button>
            </div>
          </div>

          {/* AI Agent Section */}
          <div className="px-8 py-3 border-t border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Assistido por:</span>
              <div className="relative agent-dropdown-container">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setAgentDropdownOpen(!agentDropdownOpen);
                  }}
                  className="px-4 py-2 bg-card hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-3 border border-border"
                >
                  <div className={`w-7 h-7 ${selectedAgent.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <selectedAgent.icon className="text-[hsl(220,15%,30%)]" size={14} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-foreground font-medium">{selectedAgent.name}</span>
                    <span className="text-xs text-muted-foreground">{selectedAgent.description}</span>
                  </div>
                  <ChevronDown className="text-muted-foreground ml-2" size={14} />
                </button>
                
                {agentDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Escolher Agente de IA</div>
                      {agents.map((agent, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedAgent(agent);
                            setAgentDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition flex items-start gap-3`}
                        >
                          <div className={`w-8 h-8 ${agent.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <agent.icon className="text-[hsl(220,15%,30%)]" size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground text-sm">{agent.name}</div>
                            <div className="text-xs text-muted-foreground">{agent.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Toolbar */}
          <div className="px-8 py-3 border-t border-border flex items-center gap-2">
            <div className="flex items-center gap-1 border-r border-border pr-3">
              <button 
                onClick={handleBold}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Negrito (Ctrl+B)"
              >
                <Bold size={16} />
              </button>
              <button 
                onClick={handleItalic}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Itálico (Ctrl+I)"
              >
                <Italic size={16} />
              </button>
              <button 
                onClick={handleUnderline}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Sublinhado"
              >
                <Underline size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-border pr-3">
              <button 
                onClick={handleH1}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Título 1"
              >
                <span className="text-sm font-semibold">H1</span>
              </button>
              <button 
                onClick={handleH2}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Título 2"
              >
                <span className="text-sm font-semibold">H2</span>
              </button>
              <button 
                onClick={handleH3}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Título 3"
              >
                <span className="text-sm font-semibold">H3</span>
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-border pr-3">
              <button 
                onClick={handleBulletList}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Lista com marcadores"
              >
                <List size={16} />
              </button>
              <button 
                onClick={handleNumberedList}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Lista numerada"
              >
                <ListOrdered size={16} />
              </button>
              <button 
                onClick={handleChecklist}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Checklist"
              >
                <CheckSquare size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1 border-r border-border pr-3">
              <button 
                onClick={handleLink}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Adicionar link"
              >
                <LinkIcon size={16} />
              </button>
              <button 
                onClick={handleCode}
                className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" 
                title="Bloco de código"
              >
                <Code size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setChartDrawerOpen(true)}
                className="px-3 py-1.5 text-muted-foreground hover:bg-muted rounded flex items-center gap-2 text-sm font-medium transition" 
                title="Adicionar gráfico"
              >
                <BarChart3 size={16} />
                <span>Gráfico</span>
              </button>
              <button 
                onClick={handleTable}
                className="px-3 py-1.5 text-muted-foreground hover:bg-muted rounded flex items-center gap-2 text-sm font-medium transition" 
                title="Adicionar tabela"
              >
                <TableIcon size={16} />
                <span>Tabela</span>
              </button>
            </div>
          </div>
        </header>

        {/* Document Content */}
        <div 
          className="p-8 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Drop Zone Overlay */}
          {isDragging && (
            <div className="fixed inset-0 z-40 pointer-events-none">
              <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm animate-fade-in" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-card border-2 border-dashed border-primary rounded-xl p-8 shadow-lg animate-scale-in">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <BarChart3 className="text-primary" size={32} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground mb-1">Solte o gráfico aqui</h3>
                      <p className="text-sm text-muted-foreground">O gráfico será inserido no documento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className={`max-w-4xl mx-auto transition-opacity ${isDragging ? 'opacity-30' : 'opacity-100'}`}>
            {isNewDocument ? (
              <div className="bg-card border border-border rounded-xl min-h-[600px]">
                <MarkdownEditor 
                  value={editorContent} 
                  onChange={setEditorContent}
                />
              </div>
            ) : (
              <article className="prose prose-slate max-w-none">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Análise de Mercado Q4 2024</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Última edição: 15 de novembro de 2024, 14:32</span>
                  <span>•</span>
                  <span>Por João Silva</span>
                </div>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Resumo Executivo</h2>
                <p className="text-foreground leading-relaxed mb-4">
                  O quarto trimestre de 2024 apresentou um cenário de volatilidade moderada nos mercados financeiros globais, impulsionado principalmente por decisões de política monetária dos principais bancos centrais e tensões geopolíticas pontuais.
                </p>
                <p className="text-foreground leading-relaxed mb-4">
                  Neste relatório, analisamos os principais indicadores macroeconômicos, o desempenho dos ativos de renda variável e fixa, além de apresentar projeções para o primeiro trimestre de 2025.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Principais Indicadores</h2>
                
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Desempenho dos Índices Principais</h3>
                  <Plot
                    data={indicesData as any}
                    layout={{
                      ...chartLayout,
                      xaxis: { title: 'Mês' },
                      yaxis: { title: 'Pontos' },
                      showlegend: true,
                      legend: { orientation: 'h', y: -0.2 },
                      barmode: 'group',
                      height: 400
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Comparativo de Ativos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Ativo</th>
                          <th className="text-right py-3 px-4 font-semibold text-foreground">Valor Atual</th>
                          <th className="text-right py-3 px-4 font-semibold text-foreground">Variação Mensal</th>
                          <th className="text-right py-3 px-4 font-semibold text-foreground">Variação Anual</th>
                          <th className="text-right py-3 px-4 font-semibold text-foreground">Volume (Mi)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-muted">
                          <td className="py-3 px-4 font-medium text-foreground">IBOVESPA</td>
                          <td className="py-3 px-4 text-right text-foreground">127.458</td>
                          <td className="py-3 px-4 text-right text-green-600">+3.2%</td>
                          <td className="py-3 px-4 text-right text-green-600">+12.5%</td>
                          <td className="py-3 px-4 text-right text-foreground">R$ 18.542</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted">
                          <td className="py-3 px-4 font-medium text-foreground">S&P 500</td>
                          <td className="py-3 px-4 text-right text-foreground">4.589</td>
                          <td className="py-3 px-4 text-right text-green-600">+2.8%</td>
                          <td className="py-3 px-4 text-right text-green-600">+18.3%</td>
                          <td className="py-3 px-4 text-right text-foreground">$ 245.320</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted">
                          <td className="py-3 px-4 font-medium text-foreground">FTSE 100</td>
                          <td className="py-3 px-4 text-right text-foreground">7.842</td>
                          <td className="py-3 px-4 text-right text-green-600">+1.5%</td>
                          <td className="py-3 px-4 text-right text-green-600">+8.7%</td>
                          <td className="py-3 px-4 text-right text-foreground">£ 89.456</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted">
                          <td className="py-3 px-4 font-medium text-foreground">DAX</td>
                          <td className="py-3 px-4 text-right text-foreground">16.254</td>
                          <td className="py-3 px-4 text-right text-red-600">-0.8%</td>
                          <td className="py-3 px-4 text-right text-green-600">+15.2%</td>
                          <td className="py-3 px-4 text-right text-foreground">€ 124.789</td>
                        </tr>
                        <tr className="hover:bg-muted">
                          <td className="py-3 px-4 font-medium text-foreground">Nikkei 225</td>
                          <td className="py-3 px-4 text-right text-foreground">32.145</td>
                          <td className="py-3 px-4 text-right text-green-600">+4.1%</td>
                          <td className="py-3 px-4 text-right text-green-600">+22.8%</td>
                          <td className="py-3 px-4 text-right text-foreground">¥ 2.456.789</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Análise Setorial</h2>
                
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Desempenho por Setor</h3>
                  <Plot
                    data={sectorData as any}
                    layout={{
                      ...chartLayout,
                      xaxis: { title: 'Setor' },
                      yaxis: { title: 'Variação (%)' },
                      showlegend: false,
                      height: 400
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="space-y-4">
                  <div className="bg-[hsl(206,35%,85%)] rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Tecnologia</h4>
                    <p className="text-sm text-foreground leading-relaxed">
                      O setor de tecnologia manteve sua trajetória de crescimento, impulsionado pela adoção de soluções de IA e computação em nuvem. Destaque para empresas de software empresarial e cibersegurança.
                    </p>
                  </div>

                  <div className="bg-[hsl(160,35%,85%)] rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Financeiro</h4>
                    <p className="text-sm text-foreground leading-relaxed">
                      Bancos e instituições financeiras apresentaram resultados sólidos, beneficiados pela normalização das taxas de juros e expansão do crédito corporativo.
                    </p>
                  </div>

                  <div className="bg-[hsl(45,35%,85%)] rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Energia</h4>
                    <p className="text-sm text-foreground leading-relaxed">
                      Volatilidade moderada no setor energético, com destaque para empresas de energia renovável que continuam atraindo investimentos significativos.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Análise de Risco</h2>
                
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Matriz de Risco por Região</h3>
                  <Plot
                    data={riskData as any}
                    layout={{
                      ...chartLayout,
                      xaxis: { title: 'Região' },
                      yaxis: { title: 'Tipo de Risco' },
                      height: 400
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%' }}
                  />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">Principais Riscos Identificados</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-xs">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Risco Geopolítico</h4>
                      <p className="text-sm text-foreground">Tensões comerciais entre grandes economias podem impactar cadeias de suprimento globais.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-600 text-xs">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Risco de Inflação</h4>
                      <p className="text-sm text-foreground">Pressões inflacionárias persistentes podem levar a ajustes mais agressivos nas taxas de juros.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs">i</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Risco Tecnológico</h4>
                      <p className="text-sm text-foreground">Vulnerabilidades cibernéticas e regulamentação de IA podem afetar empresas de tecnologia.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Recomendações</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-card rounded-xl border border-border p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[hsl(160,35%,85%)] rounded-lg flex items-center justify-center">
                        <span className="text-[hsl(220,15%,30%)]">↑</span>
                      </div>
                      <h3 className="font-semibold text-foreground">Compra</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Ações de tecnologia com foco em IA</li>
                      <li>• Títulos de renda fixa de longo prazo</li>
                      <li>• ETFs de energia renovável</li>
                    </ul>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[hsl(45,35%,85%)] rounded-lg flex items-center justify-center">
                        <span className="text-[hsl(220,15%,30%)]">−</span>
                      </div>
                      <h3 className="font-semibold text-foreground">Manter</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Ações do setor financeiro</li>
                      <li>• Fundos imobiliários</li>
                      <li>• Commodities agrícolas</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Conclusão</h2>
                <p className="text-foreground leading-relaxed mb-4">
                  O cenário para o primeiro trimestre de 2025 permanece construtivo, com oportunidades em setores específicos e necessidade de gestão ativa de riscos. A diversificação continua sendo fundamental para navegação em um ambiente de incertezas globais.
                </p>
                <p className="text-foreground leading-relaxed">
                  Recomendamos monitoramento contínuo dos indicadores macroeconômicos e ajustes táticos conforme necessário, mantendo uma visão de longo prazo alinhada aos objetivos estratégicos.
                </p>
              </section>

              <div className="border-t border-border pt-6 mt-8">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Tags:</span>
                    <span className="ml-2">Análise de Mercado, Q4 2024, Investimentos, Risco</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Heart size={14} />
                      <span>Favoritar</span>
                    </button>
                    <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <Download size={14} />
                      <span>Exportar PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
            )}
          </div>
        </div>
      </main>

      {/* Chart Drawer */}
      <Sheet open={chartDrawerOpen} onOpenChange={setChartDrawerOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto z-[100]">
          <SheetHeader>
            <SheetTitle>Adicionar Gráfico</SheetTitle>
            <SheetDescription>
              Arraste e solte o tipo de gráfico desejado no documento ou clique duas vezes para adicionar
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-8 space-y-4">
            {chartTypes.map((chart) => (
              <div
                key={chart.id}
                draggable
                onDragStart={() => handleDragStart(chart.id)}
                onDragEnd={handleDragEnd}
                onDoubleClick={() => {
                  if (isNewDocument) {
                    const chartMarkdown = `\n\n### ${chart.name}\n\n![${chart.name}](chart:${chart.id})\n\n*${chart.description}*\n\n`;
                    setEditorContent(prev => prev + chartMarkdown);
                  }
                  setChartDrawerOpen(false);
                  alert(`${chart.name} foi adicionado ao documento!`);
                }}
                className={`rounded-lg border-2 transition-all cursor-move overflow-hidden ${
                  draggedChart === chart.id 
                    ? 'opacity-30 scale-95 border-primary' 
                    : 'border-border hover:border-primary hover:shadow-md'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-12 h-12 ${chart.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <chart.icon className="text-[hsl(220,15%,30%)]" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{chart.name}</h3>
                      <p className="text-sm text-muted-foreground">{chart.description}</p>
                    </div>
                  </div>
                  
                  {/* Preview do Gráfico */}
                  <div className="bg-muted/30 rounded-lg p-3 border border-border">
                    <Plot
                      data={chart.previewData as any}
                      layout={{
                        margin: { t: 10, r: 10, b: 30, l: 30 },
                        height: 150,
                        plot_bgcolor: 'transparent',
                        paper_bgcolor: 'transparent',
                        font: { 
                          family: 'Inter, sans-serif',
                          size: 9,
                          color: '#64748b'
                        },
                        xaxis: { 
                          showgrid: false,
                          zeroline: false
                        },
                        yaxis: { 
                          showgrid: true,
                          gridcolor: '#e2e8f0',
                          zeroline: false
                        },
                        showlegend: false
                      }}
                      config={{ 
                        displayModeBar: false,
                        staticPlot: true
                      }}
                      style={{ width: '100%', height: '150px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-primary" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Dica</h4>
                <p className="text-xs text-muted-foreground">
                  Arraste o tipo de gráfico para a área do documento onde deseja inseri-lo. Você poderá configurar os dados depois.
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}