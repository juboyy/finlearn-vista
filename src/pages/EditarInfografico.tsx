import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Bell, Eye, Save, Share2, Download, Edit2, Heading, BarChart3, Table, Palette, Image as ImageIcon, Sliders, X, Sparkles, History, Undo, Redo, Clock, FileDown, FilePen, CheckCircle, GripVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Plot from "react-plotly.js";
import { toast } from "sonner";

type SectionType = 'header' | 'summary' | 'chart-evolution' | 'marketshare-metrics' | 'table' | 'transactions-ticket' | 'insights';

export default function EditarInfografico() {
  const navigate = useNavigate();
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [sectionOrder, setSectionOrder] = useState<SectionType[]>([
    'header', 'summary', 'chart-evolution', 'marketshare-metrics', 'table', 'transactions-ticket', 'insights'
  ]);
  const [draggedSection, setDraggedSection] = useState<SectionType | null>(null);
  const [dragOverSection, setDragOverSection] = useState<SectionType | null>(null);

  const handleEditSection = (sectionName: string) => {
    setActiveSection(sectionName);
    setShowPropertiesPanel(true);
  };

  const handleSave = () => {
    toast.success("Alterações salvas com sucesso!");
  };

  const handleDragStart = (section: SectionType) => {
    setDraggedSection(section);
  };

  const handleDragOver = (e: React.DragEvent, section: SectionType) => {
    e.preventDefault();
    if (draggedSection && draggedSection !== section) {
      setDragOverSection(section);
    }
  };

  const handleDrop = (section: SectionType) => {
    if (draggedSection && dragOverSection && draggedSection !== dragOverSection) {
      const newOrder = [...sectionOrder];
      const draggedIndex = newOrder.indexOf(draggedSection);
      const targetIndex = newOrder.indexOf(dragOverSection);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedSection);
      
      setSectionOrder(newOrder);
      toast.success("Seção reordenada com sucesso!");
    }
    setDraggedSection(null);
    setDragOverSection(null);
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
    setDragOverSection(null);
  };

  const renderSection = (sectionType: SectionType) => {
    const isDragging = draggedSection === sectionType;
    const isOver = dragOverSection === sectionType;

    const sectionWrapperClass = `
      transition-all duration-200
      ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
      ${isOver ? 'scale-102' : ''}
    `;

    const DragHandle = () => (
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 cursor-move">
        <div className="bg-white/90 backdrop-blur px-2 py-1.5 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1" style={{ color: 'hsl(var(--pastel-purple-text))' }}>
          <GripVertical className="w-4 h-4" />
          <span>Arrastar</span>
        </div>
      </div>
    );

    switch (sectionType) {
      case 'header':
        return (
          <div
            key="header"
            draggable
            onDragStart={() => handleDragStart('header')}
            onDragOver={(e) => handleDragOver(e, 'header')}
            onDrop={() => handleDrop('header')}
            onDragEnd={handleDragEnd}
            className={sectionWrapperClass}
          >
            <div className="editable-section relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-10 text-white overflow-hidden group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
              <DragHandle />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <button 
                  onClick={() => handleEditSection('header')}
                  className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                  style={{ color: 'hsl(var(--pastel-purple-text))' }}
                >
                  <Edit2 className="w-3 h-3 inline mr-1" />Editar Cabeçalho
                </button>
              </div>
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                <i className="fa-solid fa-chart-line text-9xl"></i>
              </div>
              <div className="absolute bottom-0 left-0 opacity-5 transform -translate-x-10 translate-y-10">
                <i className="fa-brands fa-pix text-9xl"></i>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Relatório Estratégico 2024</span>
                    <span className="text-sm opacity-90"><i className="fa-regular fa-calendar mr-2"></i>Gerado em 24 Nov, 2024 • 10:45 AM</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <i className="fa-solid fa-shield-halved" style={{ color: 'hsl(var(--pastel-green))' }}></i>
                    <span className="text-xs font-medium">Dados Verificados</span>
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-3 leading-tight">A Revolução dos Pagamentos Digitais no Brasil</h2>
                <p className="text-indigo-200 text-lg max-w-3xl leading-relaxed">Análise profunda do comportamento de pagamentos no e-commerce brasileiro: Pix vs Cartão de Crédito • Volume financeiro, tendências e projeções para 2025.</p>
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div
            key="summary"
            draggable
            onDragStart={() => handleDragStart('summary')}
            onDragOver={(e) => handleDragOver(e, 'summary')}
            onDrop={() => handleDrop('summary')}
            onDragEnd={handleDragEnd}
            className={sectionWrapperClass}
          >
            <div className="editable-section relative px-10 py-8 bg-gradient-to-b from-muted/30 to-card group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
              <DragHandle />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <button 
                  onClick={() => handleEditSection('summary')}
                  className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                  style={{ color: 'hsl(var(--pastel-purple-text))' }}
                >
                  <Edit2 className="w-3 h-3 inline mr-1" />Editar Métricas
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                <div className="bg-card p-6 rounded-2xl border-2 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'hsl(var(--pastel-green))' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-green))' }}>
                      <i className="fa-brands fa-pix text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                      color: 'hsl(var(--pastel-green-text))',
                      backgroundColor: 'hsl(var(--pastel-green))'
                    }}>
                      <i className="fa-solid fa-arrow-up mr-1"></i>+45%
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Volume Pix 2024</div>
                  <div className="text-3xl font-bold text-foreground mb-1">R$ 287Bi</div>
                  <div className="text-xs text-muted-foreground">+12% vs Q3 2024</div>
                </div>

                <div className="bg-card p-6 rounded-2xl border-2 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'hsl(var(--pastel-blue))' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-blue))' }}>
                      <i className="fa-solid fa-credit-card text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                      color: 'hsl(var(--pastel-blue-text))',
                      backgroundColor: 'hsl(var(--pastel-blue))'
                    }}>
                      <i className="fa-solid fa-minus mr-1"></i>-8%
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Cartão Crédito</div>
                  <div className="text-3xl font-bold text-foreground mb-1">R$ 198Bi</div>
                  <div className="text-xs text-muted-foreground">Market Share: 32%</div>
                </div>

                <div className="bg-card p-6 rounded-2xl border-2 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'hsl(var(--pastel-purple))' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}>
                      <i className="fa-solid fa-chart-pie text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                      color: 'hsl(var(--pastel-purple-text))',
                      backgroundColor: 'hsl(var(--pastel-purple))'
                    }}>47%</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Share Total Pix</div>
                  <div className="text-3xl font-bold text-foreground mb-1">47%</div>
                  <div className="text-xs text-muted-foreground">Líder em e-commerce</div>
                </div>

                <div className="bg-card p-6 rounded-2xl border-2 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'hsl(var(--pastel-yellow))' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-yellow))' }}>
                      <i className="fa-solid fa-rocket text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                      color: 'hsl(var(--pastel-yellow-text))',
                      backgroundColor: 'hsl(var(--pastel-yellow))'
                    }}>Q1 2025</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Projeção Pix</div>
                  <div className="text-3xl font-bold text-foreground mb-1">R$ 312Bi</div>
                  <div className="text-xs text-muted-foreground">+8.7% crescimento</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chart-evolution':
        return (
          <div
            key="chart-evolution"
            draggable
            onDragStart={() => handleDragStart('chart-evolution')}
            onDragOver={(e) => handleDragOver(e, 'chart-evolution')}
            onDrop={() => handleDrop('chart-evolution')}
            onDragEnd={handleDragEnd}
            className={sectionWrapperClass}
          >
            <div className="editable-section relative p-8 rounded-3xl border group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all" style={{
              background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--pastel-purple))/10 100%)',
              borderColor: 'hsl(var(--border))'
            }}>
              <DragHandle />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <button 
                  onClick={() => handleEditSection('chart-evolution')}
                  className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                  style={{ color: 'hsl(var(--pastel-purple-text))' }}
                >
                  <BarChart3 className="w-3 h-3 inline mr-1" />Editar Gráfico
                </button>
              </div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Evolução Comparativa de Volume Financeiro</h3>
                  <p className="text-muted-foreground">Análise trimestral 2023-2024 e projeção Q1 2025 (em bilhões R$)</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-2" style={{
                    backgroundColor: 'hsl(var(--pastel-green))',
                    color: 'hsl(var(--pastel-gray-dark))'
                  }}>
                    <i className="fa-brands fa-pix"></i>Pix
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-2" style={{
                    backgroundColor: 'hsl(var(--pastel-blue))',
                    color: 'hsl(var(--pastel-gray-dark))'
                  }}>
                    <i className="fa-solid fa-credit-card"></i>Cartão
                  </span>
                </div>
              </div>
              <div style={{ height: '450px' }}>
                <Plot
                  data={[
                    {
                      x: ['Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25*'],
                      y: [42.5, 48.3, 54.7, 62.1, 68.4, 72.8, 71.2, 74.6, 78.0],
                      type: 'scatter',
                      mode: 'lines+markers',
                      name: 'Pix',
                      line: { color: '#BBF7D0', width: 4 },
                      marker: { size: 10, color: '#BBF7D0' },
                      fill: 'tozeroy',
                      fillcolor: 'rgba(187, 247, 208, 0.1)'
                    },
                    {
                      x: ['Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25*'],
                      y: [58.2, 56.8, 55.1, 53.4, 51.2, 49.8, 48.5, 48.5, 47.2],
                      type: 'scatter',
                      mode: 'lines+markers',
                      name: 'Cartão Crédito',
                      line: { color: '#BFDBFE', width: 4 },
                      marker: { size: 10, color: '#BFDBFE' },
                      fill: 'tozeroy',
                      fillcolor: 'rgba(191, 219, 254, 0.1)'
                    }
                  ]}
                  layout={{
                    title: { text: '', font: { size: 16 } },
                    xaxis: { title: { text: '', standoff: 20 }, gridcolor: 'hsl(var(--border))' },
                    yaxis: { title: { text: '', standoff: 20 }, gridcolor: 'hsl(var(--border))' },
                    margin: { t: 20, r: 20, b: 60, l: 70 },
                    plot_bgcolor: 'hsl(var(--card))',
                    paper_bgcolor: 'transparent',
                    showlegend: false,
                    hovermode: 'x unified',
                    font: { color: 'hsl(var(--foreground))' }
                  }}
                  config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        );

      case 'marketshare-metrics':
        return (
          <div
            key="marketshare-metrics"
            draggable
            onDragStart={() => handleDragStart('marketshare-metrics')}
            onDragOver={(e) => handleDragOver(e, 'marketshare-metrics')}
            onDrop={() => handleDrop('marketshare-metrics')}
            onDragEnd={handleDragEnd}
            className={sectionWrapperClass}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Market Share Pie */}
              <div className="editable-section relative bg-card p-8 rounded-3xl border border-border shadow-sm group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
                <DragHandle />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button 
                    onClick={() => handleEditSection('marketshare')}
                    className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                    style={{ color: 'hsl(var(--pastel-purple-text))' }}
                  >
                    <Edit2 className="w-3 h-3 inline mr-1" />Editar
                  </button>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Distribuição de Market Share 2024</h3>
                <p className="text-muted-foreground text-sm mb-6">Participação por método de pagamento no e-commerce</p>
                <div style={{ height: '380px' }}>
                  <Plot
                    data={[{
                      values: [47, 32, 13, 8],
                      labels: ['Pix', 'Cartão Crédito', 'Cartão Débito', 'Outros'],
                      type: 'pie',
                      marker: {
                        colors: ['#BBF7D0', '#BFDBFE', '#E9D5FF', '#FEF08A']
                      },
                      textinfo: 'none',
                      textposition: 'inside',
                      hovertemplate: '<b>%{label}</b><br>%{percent}<br>%{value}% do mercado<extra></extra>'
                    }]}
                    layout={{
                      margin: { t: 20, r: 20, b: 20, l: 20 },
                      paper_bgcolor: 'transparent',
                      showlegend: false,
                      font: { color: 'hsl(var(--pastel-gray-dark))' }
                    }}
                    config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-green))' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#BBF7D0]"></div>
                      <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>PIX</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>47%</div>
                    <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>R$ 287 Bilhões</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-blue))' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#BFDBFE]"></div>
                      <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Cartão Crédito</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>32%</div>
                    <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>R$ 198 Bilhões</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#E9D5FF]"></div>
                      <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Cartão Débito</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>13%</div>
                    <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>R$ 79 Bilhões</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-yellow))' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#FEF08A]"></div>
                      <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Outros</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>8%</div>
                    <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>R$ 48 Bilhões</div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="editable-section relative bg-card p-8 rounded-3xl border border-border shadow-sm group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button 
                    onClick={() => handleEditSection('metrics')}
                    className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                    style={{ color: 'hsl(var(--pastel-purple-text))' }}
                  >
                    <Table className="w-3 h-3 inline mr-1" />Editar
                  </button>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Métricas Detalhadas por Método</h3>
                <p className="text-muted-foreground text-sm mb-6">Comparativo de performance e crescimento</p>
                
                <div className="space-y-4">
                  <div className="border rounded-xl p-5" style={{
                    borderColor: 'hsl(var(--pastel-green))',
                    backgroundColor: 'hsl(var(--pastel-green))/20'
                  }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-green))' }}>
                          <i className="fa-brands fa-pix text-lg" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                        </div>
                        <div>
                          <div className="font-bold text-foreground">PIX</div>
                          <div className="text-xs text-muted-foreground">Pagamento Instantâneo</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{
                        backgroundColor: 'hsl(var(--pastel-green))',
                        color: 'hsl(var(--pastel-green-text))'
                      }}>
                        <i className="fa-solid fa-arrow-trend-up"></i>
                        <span>+45%</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Volume</div>
                        <div className="text-lg font-bold text-foreground">R$ 287Bi</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Transações</div>
                        <div className="text-lg font-bold text-foreground">2.8Bi</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Ticket Médio</div>
                        <div className="text-lg font-bold text-foreground">R$ 103</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-xl p-5" style={{
                    borderColor: 'hsl(var(--pastel-blue))',
                    backgroundColor: 'hsl(var(--pastel-blue))/20'
                  }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-blue))' }}>
                          <i className="fa-solid fa-credit-card text-lg" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                        </div>
                        <div>
                          <div className="font-bold text-foreground">Cartão Crédito</div>
                          <div className="text-xs text-muted-foreground">Parcelado</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{
                        backgroundColor: 'hsl(var(--pastel-pink))',
                        color: 'hsl(var(--pastel-pink-text))'
                      }}>
                        <i className="fa-solid fa-arrow-trend-down"></i>
                        <span>-8%</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Volume</div>
                        <div className="text-lg font-bold text-foreground">R$ 198Bi</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Transações</div>
                        <div className="text-lg font-bold text-foreground">987M</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Ticket Médio</div>
                        <div className="text-lg font-bold text-foreground">R$ 201</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-xl p-5" style={{
                    borderColor: 'hsl(var(--pastel-purple))',
                    backgroundColor: 'hsl(var(--pastel-purple))/20'
                  }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}>
                          <i className="fa-solid fa-wallet text-lg" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                        </div>
                        <div>
                          <div className="font-bold text-foreground">Cartão Débito</div>
                          <div className="text-xs text-muted-foreground">À Vista</div>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap bg-muted text-muted-foreground">
                        <i className="fa-solid fa-minus"></i>
                        <span>-2%</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Volume</div>
                        <div className="text-lg font-bold text-foreground">R$ 79Bi</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Transações</div>
                        <div className="text-lg font-bold text-foreground">654M</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Ticket Médio</div>
                        <div className="text-lg font-bold text-foreground">R$ 121</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div
            key="table"
            draggable
            onDragStart={() => handleDragStart('table')}
            onDragOver={(e) => handleDragOver(e, 'table')}
            onDrop={() => handleDrop('table')}
            onDragEnd={handleDragEnd}
            className={sectionWrapperClass}
          >
            <div className="editable-section relative bg-card p-8 rounded-3xl border border-border shadow-sm group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
              <DragHandle />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <button 
                  onClick={() => handleEditSection('table')}
                  className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                  style={{ color: 'hsl(var(--pastel-purple-text))' }}
                >
                  <Table className="w-3 h-3 inline mr-1" />Editar Tabela
                </button>
              </div>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Performance Trimestral Detalhada</h3>
                  <p className="text-muted-foreground">Evolução de volume financeiro por trimestre (em bilhões R$)</p>
                </div>
                <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors">
                  <Download className="w-3 h-3 inline mr-2" />Exportar CSV
                </button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                [Tabela completa aqui - mantida por brevidade]
              </div>
            </div>
          </div>
        );

      case 'transactions-ticket':
        return (
          <div
            key="transactions-ticket"
            draggable
            onDragStart={() => handleDragStart('transactions-ticket')}
            onDragOver={(e) => handleDragOver(e, 'transactions-ticket')}
            onDrop={() => handleDrop('transactions-ticket')}
            onDragEnd={handleDragEnd}
            className={sectionWrapperClass}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="editable-section relative p-8 rounded-3xl border group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all" style={{
                background: 'linear-gradient(135deg, hsl(var(--pastel-green))/20 0%, hsl(152 70% 80%)/20 100%)',
                borderColor: 'hsl(var(--pastel-green))'
              }}>
                <DragHandle />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button 
                    onClick={() => handleEditSection('transactions')}
                    className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                    style={{ color: 'hsl(var(--pastel-purple-text))' }}
                  >
                    <BarChart3 className="w-3 h-3 inline mr-1" />Editar
                  </button>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Número de Transações 2024</h3>
                <p className="text-muted-foreground text-sm mb-6">Volume total de operações por método</p>
                <div style={{ height: '280px' }}>
                  <Plot
                    data={[
                      {
                        x: ['Pix', 'Cartão<br>de Crédito', 'Cartão<br>de Débito', 'Boleto'],
                        y: [2.78, 0.92, 0.45, 0.31],
                        type: 'bar',
                        marker: { 
                          color: ['#BBF7D0', '#BFDBFE', '#DDD6FE', '#FED7AA'],
                        },
                        text: ['2.78Bi', '0.92Bi', '0.45Bi', '0.31Bi'],
                        textposition: 'outside',
                        hovertemplate: '<b>%{x}</b><br>%{y:.2f} bilhões<extra></extra>'
                      }
                    ]}
                    layout={{
                      xaxis: { 
                        title: { text: '' },
                        tickangle: 0,
                        gridcolor: 'hsl(var(--border))'
                      },
                      yaxis: { 
                        title: { text: 'Bilhões', standoff: 20 },
                        gridcolor: 'hsl(var(--border))'
                      },
                      margin: { t: 20, r: 20, b: 60, l: 60 },
                      plot_bgcolor: 'transparent',
                      paper_bgcolor: 'transparent',
                      font: { color: 'hsl(var(--foreground))', size: 11 },
                      showlegend: false
                    }}
                    config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>

              <div className="editable-section relative p-8 rounded-3xl border group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all" style={{
                background: 'linear-gradient(135deg, hsl(var(--pastel-blue))/20 0%, hsl(217 91% 70%)/20 100%)',
                borderColor: 'hsl(var(--pastel-blue))'
              }}>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <button 
                    onClick={() => handleEditSection('ticket')}
                    className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                    style={{ color: 'hsl(var(--pastel-purple-text))' }}
                  >
                    <BarChart3 className="w-3 h-3 inline mr-1" />Editar
                  </button>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Ticket Médio por Método</h3>
                <p className="text-muted-foreground text-sm mb-6">Valor médio por transação em R$</p>
                <div style={{ height: '280px' }}>
                  <Plot
                    data={[
                      {
                        x: ['Cartão<br>de Crédito', 'Cartão<br>de Débito', 'Pix', 'Boleto'],
                        y: [215, 142, 103, 187],
                        type: 'bar',
                        marker: { 
                          color: ['#BFDBFE', '#DDD6FE', '#BBF7D0', '#FED7AA'],
                        },
                        text: ['R$ 215', 'R$ 142', 'R$ 103', 'R$ 187'],
                        textposition: 'outside',
                        hovertemplate: '<b>%{x}</b><br>R$ %{y}<extra></extra>'
                      }
                    ]}
                    layout={{
                      xaxis: { 
                        title: { text: '' },
                        tickangle: 0,
                        gridcolor: 'hsl(var(--border))'
                      },
                      yaxis: { 
                        title: { text: 'Reais (R$)', standoff: 20 },
                        gridcolor: 'hsl(var(--border))'
                      },
                      margin: { t: 20, r: 20, b: 60, l: 60 },
                      plot_bgcolor: 'transparent',
                      paper_bgcolor: 'transparent',
                      font: { color: 'hsl(var(--foreground))', size: 11 },
                      showlegend: false
                    }}
                    config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'insights':
        return (
          <div
            key="insights"
            draggable
            onDragStart={() => handleDragStart('insights')}
            onDragOver={(e) => handleDragOver(e, 'insights')}
            onDrop={() => handleDrop('insights')}
            onDragEnd={handleDragEnd}
            className={sectionWrapperClass}
          >
            <div className="editable-section relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-10 rounded-3xl text-white overflow-hidden group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-white/50 hover:outline-offset-4 transition-all">
              <DragHandle />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <button 
                  onClick={() => handleEditSection('insights')}
                  className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                  style={{ color: 'hsl(var(--pastel-purple-text))' }}
                >
                  <Edit2 className="w-3 h-3 inline mr-1" />Editar Insights
                </button>
              </div>
              <div className="absolute top-0 right-0 opacity-10 text-9xl">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <i className="fa-solid fa-brain"></i>
                  Insights Estratégicos da IA
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(var(--pastel-green))' }}>
                        <i className="fa-solid fa-trophy text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Pix Domina o Mercado</h4>
                        <p className="text-indigo-100 text-sm leading-relaxed">O Pix ultrapassou o cartão de crédito em Q4 2023 e mantém liderança absoluta com 47% de market share.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(var(--pastel-pink))' }}>
                        <i className="fa-solid fa-arrow-trend-down text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Declínio do Cartão</h4>
                        <p className="text-indigo-100 text-sm leading-relaxed">Cartão de crédito registra queda de 8% no volume total.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(var(--pastel-yellow))' }}>
                        <i className="fa-solid fa-rocket text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Projeção Otimista 2025</h4>
                        <p className="text-indigo-100 text-sm leading-relaxed">Modelo de IA projeta R$ 312Bi para Pix no Q1 2025 (+8.7%).</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}>
                        <i className="fa-solid fa-chart-line text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">Mudança de Comportamento</h4>
                        <p className="text-indigo-100 text-sm leading-relaxed">Ticket médio Pix (R$ 103) é 49% menor que cartão, mas volume é 184% maior.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <SidebarFix />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <Link to="/infografico-revisao" className="text-muted-foreground hover:text-foreground transition-colors md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <nav className="hidden sm:flex items-center text-sm text-muted-foreground">
              <Link to="/meus-agentes" className="hover:text-foreground transition-colors">Agentes</Link>
              <i className="fa-solid fa-chevron-right text-xs mx-2 text-slate-300"></i>
              <Link to="/criar-infografico" className="hover:text-foreground transition-colors">Especialista em Pagamentos</Link>
              <i className="fa-solid fa-chevron-right text-xs mx-2 text-slate-300"></i>
              <span className="text-foreground font-medium">Editor de Infográfico</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm" 
              style={{ backgroundColor: 'hsl(var(--pastel-purple-btn))' }}
            >
              <Save className="w-4 h-4 inline mr-2" />Salvar Alterações
            </button>
            <button 
              onClick={() => navigate('/infografico-revisao')}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors" 
              style={{
                color: 'hsl(var(--pastel-purple-text))',
                backgroundColor: 'hsl(var(--pastel-purple))'
              }}
            >
              <Eye className="w-4 h-4 inline mr-2" />Visualizar
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors relative">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Editor Panel - Left */}
            <section className="lg:col-span-4 space-y-6">
              
              {/* Edit Mode Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Modo de Edição</h2>
                    <p className="text-indigo-100 text-sm">Arraste as seções para reordenar</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <i className="fa-solid fa-info-circle"></i>
                  <span className="text-sm">Use o ícone de arrastar para mover seções</span>
                </div>
              </div>

              {/* Edit Tools */}
              <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-layer-group"></i>
                  Ferramentas de Edição
                </h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-muted hover:bg-primary/10 rounded-lg transition-colors text-left group">
                    <div className="w-10 h-10 bg-card group-hover:bg-primary/10 rounded-lg flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                      <Heading className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">Editar Títulos</div>
                      <div className="text-xs text-muted-foreground">Alterar textos principais</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-muted hover:bg-primary/10 rounded-lg transition-colors text-left group">
                    <div className="w-10 h-10 bg-card group-hover:bg-primary/10 rounded-lg flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                      <BarChart3 className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">Editar Gráficos</div>
                      <div className="text-xs text-muted-foreground">Modificar dados e cores</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-muted hover:bg-primary/10 rounded-lg transition-colors text-left group">
                    <div className="w-10 h-10 bg-card group-hover:bg-primary/10 rounded-lg flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                      <Table className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">Editar Tabelas</div>
                      <div className="text-xs text-muted-foreground">Atualizar valores e métricas</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-muted hover:bg-primary/10 rounded-lg transition-colors text-left group">
                    <div className="w-10 h-10 bg-card group-hover:bg-primary/10 rounded-lg flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                      <Palette className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">Cores e Estilos</div>
                      <div className="text-xs text-muted-foreground">Personalizar aparência</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-muted hover:bg-primary/10 rounded-lg transition-colors text-left group">
                    <div className="w-10 h-10 bg-card group-hover:bg-primary/10 rounded-lg flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                      <ImageIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">Imagens</div>
                      <div className="text-xs text-muted-foreground">Adicionar ou substituir</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-muted hover:bg-primary/10 rounded-lg transition-colors text-left group">
                    <div className="w-10 h-10 bg-card group-hover:bg-primary/10 rounded-lg flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                      <Sliders className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">Layout</div>
                      <div className="text-xs text-muted-foreground">Reorganizar seções</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Properties Panel */}
              {showPropertiesPanel && (
                <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      Propriedades: {activeSection}
                    </h3>
                    <button 
                      onClick={() => setShowPropertiesPanel(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Cor de Fundo</label>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg border-2 border-border" style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}></button>
                        <button className="w-8 h-8 rounded-lg border-2 border-border" style={{ backgroundColor: 'hsl(var(--pastel-blue))' }}></button>
                        <button className="w-8 h-8 rounded-lg border-2 border-border" style={{ backgroundColor: 'hsl(var(--pastel-green))' }}></button>
                        <button className="w-8 h-8 rounded-lg border-2 border-border" style={{ backgroundColor: 'hsl(var(--pastel-yellow))' }}></button>
                        <button className="w-8 h-8 rounded-lg border-2 border-border" style={{ backgroundColor: 'hsl(var(--pastel-pink))' }}></button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Tamanho do Texto</label>
                      <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm">
                        <option>Pequeno</option>
                        <option>Médio</option>
                        <option>Grande</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">Alinhamento</label>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs">
                          <i className="fa-solid fa-align-left"></i>
                        </button>
                        <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs">
                          <i className="fa-solid fa-align-center"></i>
                        </button>
                        <button className="flex-1 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs">
                          <i className="fa-solid fa-align-right"></i>
                        </button>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 text-white rounded-lg text-sm font-medium transition-all" style={{
                      backgroundColor: 'hsl(var(--pastel-purple-btn))'
                    }}>
                      <CheckCircle className="w-4 h-4 inline mr-2" />Aplicar Alterações
                    </button>
                  </div>
                </div>
              )}

              {/* AI Assistant */}
              <div className="rounded-2xl p-5 border" style={{
                backgroundColor: 'hsl(var(--pastel-purple))/20',
                borderColor: 'hsl(var(--pastel-purple))'
              }}>
                <div className="flex items-start gap-3 mb-4">
                  <Sparkles className="w-5 h-5 mt-0.5" style={{ color: 'hsl(var(--pastel-purple-text))' }} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Assistente IA</h3>
                    <p className="text-sm text-muted-foreground">Peça ajuda para editar seu infográfico</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <textarea 
                    placeholder="Ex: Alterar cor do gráfico para azul..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                  <button className="w-full px-4 py-2 text-white rounded-lg text-sm font-medium transition-all" style={{
                    backgroundColor: 'hsl(var(--pastel-purple-btn))'
                  }}>
                    <Sparkles className="w-4 h-4 inline mr-2" />Aplicar com IA
                  </button>
                  
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Sugestões rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs text-foreground transition-colors">
                        Adicionar Q2 2025
                      </button>
                      <button className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs text-foreground transition-colors">
                        Mudar cores
                      </button>
                      <button className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-xs text-foreground transition-colors">
                        Adicionar seção
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* History Panel */}
              <div className="rounded-2xl p-5 border" style={{
                backgroundColor: 'hsl(var(--pastel-yellow))/20',
                borderColor: 'hsl(var(--pastel-yellow))'
              }}>
                <div className="flex items-start gap-3">
                  <History className="w-5 h-5 mt-0.5" style={{ color: 'hsl(var(--pastel-yellow-text))' }} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Histórico de Alterações</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>3 alterações não salvas</span>
                        <button className="font-medium text-xs" style={{ color: 'hsl(var(--pastel-purple-text))' }}>Ver todas</button>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 px-3 py-2 bg-card hover:bg-muted rounded-lg text-xs font-medium transition-colors border border-border">
                          <Undo className="w-3 h-3 inline mr-1" />Desfazer
                        </button>
                        <button className="flex-1 px-3 py-2 bg-card hover:bg-muted rounded-lg text-xs font-medium transition-colors border border-border">
                          <Redo className="w-3 h-3 inline mr-1" />Refazer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </section>

            {/* Infographic Preview - Right */}
            <section className="lg:col-span-8">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <FilePen className="w-6 h-6" style={{ color: 'hsl(var(--pastel-purple-text))' }} />
                  Editando Infográfico
                </h1>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-muted shadow-sm transition-all">
                    <Clock className="w-3 h-3 inline mr-2" />Versões
                  </button>
                  <button className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-muted shadow-sm transition-all">
                    <Share2 className="w-3 h-3 inline mr-2" />Compartilhar
                  </button>
                  <button className="px-3 py-1.5 text-white rounded-lg text-sm shadow-sm transition-all" style={{
                    backgroundColor: 'hsl(var(--pastel-purple-btn))'
                  }}>
                    <FileDown className="w-3 h-3 inline mr-2" />Exportar
                  </button>
                </div>
              </div>

              {/* Infographic Canvas */}
              <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
                <div className="space-y-0">
                  {sectionOrder.map(section => (
                    <div key={section}>
                      {renderSection(section)}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-slate-900 text-white px-10 py-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple-btn))' }}>
                        <i className="fa-solid fa-brain"></i>
                      </div>
                      <div>
                        <div className="font-bold">FinAI Agent</div>
                        <div className="text-xs text-slate-400">Powered by Advanced ML Models</div>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="text-sm text-slate-300 mb-1">Relatório gerado em 24 de Novembro, 2024 às 10:45 AM</div>
                      <div className="text-xs text-slate-500">ID do Relatório: #INF-2024-1124-0001 • Versão 1.0</div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </div>

      <style>{`
        .editable-section {
          position: relative;
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
}
