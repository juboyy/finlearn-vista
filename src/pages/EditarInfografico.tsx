import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Bell, Eye, Save, Share2, Download, Edit2, Heading, BarChart3, Table, Palette, Image as ImageIcon, Sliders, X, Sparkles, History, Undo, Redo, Clock, FileDown, FilePen, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { toast } from "sonner";

export default function EditarInfografico() {
  const navigate = useNavigate();
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleEditSection = (sectionName: string) => {
    setActiveSection(sectionName);
    setShowPropertiesPanel(true);
  };

  const handleSave = () => {
    toast.success("Alterações salvas com sucesso!");
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
                    <p className="text-indigo-100 text-sm">Clique nos elementos para editar</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <i className="fa-solid fa-info-circle"></i>
                  <span className="text-sm">Passe o mouse sobre as seções para ver as opções</span>
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
                      <div className="font-semibold text-sm text-foreground">Adicionar Imagens</div>
                      <div className="text-xs text-muted-foreground">Inserir elementos visuais</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Properties Panel */}
              {showPropertiesPanel && (
                <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      Propriedades
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
                      <label className="text-xs font-semibold text-muted-foreground block mb-2">Título da Seção</label>
                      <input type="text" className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-2">Conteúdo</label>
                      <textarea rows={3} className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <button 
                        onClick={() => {
                          toast.success("Alterações aplicadas!");
                          setShowPropertiesPanel(false);
                        }}
                        className="w-full px-4 py-2 text-white rounded-lg text-sm font-medium" 
                        style={{ backgroundColor: 'hsl(var(--pastel-purple-btn))' }}
                      >
                        <CheckCircle className="w-4 h-4 inline mr-2" />Aplicar Alterações
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Assistant */}
              <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-robot"></i>
                  Assistente IA
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg text-sm text-foreground border" style={{
                    backgroundColor: 'hsl(var(--pastel-purple))/20',
                    borderColor: 'hsl(var(--pastel-purple))'
                  }}>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 mt-0.5" style={{ color: 'hsl(var(--pastel-purple-text))' }} />
                      <p>Precisa de ajuda? Descreva o que deseja alterar e eu farei para você!</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <textarea 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ex: Alterar cor do gráfico para azul, adicionar dados de Q2 2025..."
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                  ></textarea>
                  <button 
                    onClick={() => {
                      if (aiPrompt.trim()) {
                        toast.info("Processando sua solicitação...");
                        setAiPrompt("");
                      }
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1.5 text-white rounded-lg text-sm transition-colors" 
                    style={{ backgroundColor: 'hsl(var(--pastel-purple-btn))' }}
                  >
                    <i className="fa-solid fa-paper-plane mr-1"></i>Aplicar
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">SUGESTÕES RÁPIDAS</div>
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
                
                {/* Header Section - Editable */}
                <div className="editable-section relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-10 text-white overflow-hidden group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
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

                {/* Summary Cards - Editable */}
                <div className="editable-section relative px-10 py-8 bg-gradient-to-b from-muted/30 to-card group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
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

                {/* Main Content - Charts and Data */}
                <div className="px-10 py-8 space-y-10">
                  
                  {/* Evolution Chart - Editable */}
                  <div className="editable-section relative p-8 rounded-3xl border group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all" style={{
                    background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--pastel-purple))/10 100%)',
                    borderColor: 'hsl(var(--border))'
                  }}>
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

                  {/* Market Share and Metrics Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Market Share Pie - Editable */}
                    <div className="editable-section relative bg-card p-8 rounded-3xl border border-border shadow-sm group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
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

                    {/* Detailed Metrics - Editable */}
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

                  {/* Growth Rate Chart - Editable */}
                  <div className="editable-section relative p-8 rounded-3xl border group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all" style={{
                    background: 'linear-gradient(135deg, hsl(var(--pastel-purple))/20 0%, hsl(var(--pastel-pink))/20 100%)',
                    borderColor: 'hsl(var(--pastel-purple))'
                  }}>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      <button 
                        onClick={() => handleEditSection('growth')}
                        className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                        style={{ color: 'hsl(var(--pastel-purple-text))' }}
                      >
                        <BarChart3 className="w-3 h-3 inline mr-1" />Editar
                      </button>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Taxa de Crescimento Anual (YoY)</h3>
                    <p className="text-muted-foreground mb-6">Comparação de crescimento percentual 2023 vs 2024</p>
                    <div style={{ height: '400px' }}>
                      <Plot
                        data={[{
                          x: ['Pix', 'Cartão Crédito', 'Cartão Débito', 'Boleto'],
                          y: [45, -8, -2, -15],
                          type: 'bar',
                          marker: {
                            color: ['#BBF7D0', '#FBCFE8', '#FEF08A', '#94a3b8'],
                          },
                          textinfo: 'none',
                          hovertemplate: '<b>%{x}</b><br>%{y}%<extra></extra>'
                        }]}
                        layout={{
                          title: { text: '', font: { size: 16 } },
                          xaxis: { title: { text: '', standoff: 20 } },
                          yaxis: { title: { text: '', standoff: 20 }, gridcolor: 'hsl(var(--border))', zeroline: true, zerolinecolor: 'hsl(var(--muted-foreground))', zerolinewidth: 2 },
                          margin: { t: 40, r: 20, b: 60, l: 60 },
                          plot_bgcolor: 'hsl(var(--card))',
                          paper_bgcolor: 'transparent',
                          showlegend: false,
                          font: { color: 'hsl(var(--foreground))' }
                        }}
                        config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Quarterly Performance Table - Editable */}
                  <div className="editable-section relative bg-card p-8 rounded-3xl border border-border shadow-sm group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all">
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
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="text-left py-4 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Período</th>
                            <th className="text-right py-4 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Pix (R$)</th>
                            <th className="text-right py-4 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Variação</th>
                            <th className="text-right py-4 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Cartão (R$)</th>
                            <th className="text-right py-4 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Variação</th>
                            <th className="text-right py-4 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">Diferença</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-foreground">Q1 2023</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">42.5 Bi</td>
                            <td className="py-4 px-4 text-right"><span className="text-muted-foreground text-sm">—</span></td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">58.2 Bi</td>
                            <td className="py-4 px-4 text-right"><span className="text-muted-foreground text-sm">—</span></td>
                            <td className="py-4 px-4 text-right font-mono text-red-600">-15.7 Bi</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-foreground">Q2 2023</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">48.3 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+13.6%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">56.8 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-2.4%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-red-600">-8.5 Bi</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-foreground">Q3 2023</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">54.7 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+13.3%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">55.1 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-3.0%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-red-600">-0.4 Bi</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-foreground">Q4 2023</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">62.1 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+13.5%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">53.4 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-3.1%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono" style={{ color: 'hsl(var(--pastel-green-text))' }}>+8.7 Bi</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors" style={{ backgroundColor: 'hsl(var(--pastel-blue))/20' }}>
                            <td className="py-4 px-4 font-semibold text-foreground">Q1 2024</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">68.4 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+10.1%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">51.2 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-4.1%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono" style={{ color: 'hsl(var(--pastel-green-text))' }}>+17.2 Bi</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors" style={{ backgroundColor: 'hsl(var(--pastel-blue))/20' }}>
                            <td className="py-4 px-4 font-semibold text-foreground">Q2 2024</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">72.8 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+6.4%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">49.8 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-2.7%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono" style={{ color: 'hsl(var(--pastel-green-text))' }}>+23.0 Bi</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors" style={{ backgroundColor: 'hsl(var(--pastel-blue))/20' }}>
                            <td className="py-4 px-4 font-semibold text-foreground">Q3 2024</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">71.2 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-2.2%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">48.5 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-2.6%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono" style={{ color: 'hsl(var(--pastel-green-text))' }}>+22.7 Bi</td>
                          </tr>
                          <tr className="hover:bg-muted/50 transition-colors" style={{ backgroundColor: 'hsl(var(--pastel-blue))/20' }}>
                            <td className="py-4 px-4 font-semibold text-foreground">Q4 2024</td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">74.6 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+4.8%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-foreground">48.5 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">0.0%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono" style={{ color: 'hsl(var(--pastel-green-text))' }}>+26.1 Bi</td>
                          </tr>
                          <tr className="transition-colors border-t-2" style={{ 
                            backgroundColor: 'hsl(var(--pastel-yellow))/20',
                            borderColor: 'hsl(var(--pastel-yellow))'
                          }}>
                            <td className="py-4 px-4 font-bold text-foreground">
                              <i className="fa-solid fa-chart-line mr-2" style={{ color: 'hsl(var(--pastel-yellow-text))' }}></i>
                              Q1 2025 (Projeção)
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold text-foreground">78.0 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-bold px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+4.6%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold text-foreground">47.2 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-bold px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-2.7%</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold" style={{ color: 'hsl(var(--pastel-green-text))' }}>+30.8 Bi</td>
                          </tr>
                        </tbody>
                        <tfoot className="border-t-2 border-border bg-muted">
                          <tr>
                            <td className="py-4 px-4 font-bold text-foreground">Total 2024</td>
                            <td className="py-4 px-4 text-right font-mono font-bold" style={{ color: 'hsl(var(--pastel-green-text))' }}>287.0 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-bold px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-green-text))',
                                backgroundColor: 'hsl(var(--pastel-green))'
                              }}>+45% YoY</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold" style={{ color: 'hsl(var(--pastel-blue-text))' }}>198.0 Bi</td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-xs font-bold px-2 py-1 rounded" style={{
                                color: 'hsl(var(--pastel-pink-text))',
                                backgroundColor: 'hsl(var(--pastel-pink))'
                              }}>-8% YoY</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold" style={{ color: 'hsl(var(--pastel-green-text))' }}>+89.0 Bi</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Transaction and Ticket Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Transactions Chart - Editable */}
                    <div className="editable-section relative p-8 rounded-3xl border group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary hover:outline-offset-4 transition-all" style={{
                      background: 'linear-gradient(135deg, hsl(var(--pastel-green))/20 0%, hsl(152 70% 80%)/20 100%)',
                      borderColor: 'hsl(var(--pastel-green))'
                    }}>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                        <button 
                          onClick={() => handleEditSection('transactions')}
                          className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg transition-colors" 
                          style={{ color: 'hsl(var(--pastel-purple-text))' }}
                        >
                          <Edit2 className="w-3 h-3 inline mr-1" />Editar
                        </button>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Número de Transações 2024</h3>
                      <p className="text-muted-foreground text-sm mb-6">Volume total de operações por método</p>
                      <div style={{ height: '350px' }}>
                        <Plot
                          data={[{
                            values: [2800, 987, 654, 289],
                            labels: ['Pix', 'Cartão Crédito', 'Cartão Débito', 'Outros'],
                            type: 'pie',
                            hole: 0.5,
                            marker: {
                              colors: ['#BBF7D0', '#BFDBFE', '#E9D5FF', '#FEF08A']
                            },
                            textinfo: 'none',
                            textposition: 'outside',
                            hovertemplate: '<b>%{label}</b><br>%{value}M transações<extra></extra>'
                          }]}
                          layout={{
                            margin: { t: 20, r: 20, b: 20, l: 20 },
                            paper_bgcolor: 'transparent',
                            showlegend: false,
                            annotations: [{
                              text: '4.73Bi<br><span style="font-size:14px">Transações</span>',
                              showarrow: false,
                              font: { size: 24, weight: 'bold', color: 'hsl(var(--foreground))' }
                            }]
                          }}
                          config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>

                    {/* Ticket Chart - Editable */}
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
                      <div style={{ height: '350px' }}>
                        <Plot
                          data={[{
                            x: ['Pix', 'Cartão Débito', 'Cartão Crédito', 'Boleto'],
                            y: [103, 121, 201, 187],
                            type: 'bar',
                            marker: {
                              color: ['#BBF7D0', '#E9D5FF', '#BFDBFE', '#94a3b8'],
                            },
                            textinfo: 'none',
                            hovertemplate: '<b>%{x}</b><br>R$ %{y}<extra></extra>'
                          }]}
                          layout={{
                            title: { text: '', font: { size: 16 } },
                            xaxis: { title: { text: '', standoff: 20 } },
                            yaxis: { title: { text: '', standoff: 20 }, gridcolor: 'hsl(var(--border))' },
                            margin: { t: 40, r: 20, b: 60, l: 60 },
                            plot_bgcolor: 'hsl(var(--card))',
                            paper_bgcolor: 'transparent',
                            showlegend: false,
                            font: { color: 'hsl(var(--foreground))' }
                          }}
                          config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Key Insights - Editable */}
                  <div className="editable-section relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-10 rounded-3xl text-white overflow-hidden group cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-white/50 hover:outline-offset-4 transition-all">
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
                              <p className="text-indigo-100 text-sm leading-relaxed">O Pix ultrapassou o cartão de crédito em Q4 2023 e mantém liderança absoluta com 47% de market share. Crescimento de 45% YoY demonstra consolidação como método preferido.</p>
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
                              <p className="text-indigo-100 text-sm leading-relaxed">Cartão de crédito registra queda de 8% no volume total. Consumidores preferem pagamentos instantâneos e sem juros, impactando o modelo tradicional de parcelamento.</p>
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
                              <p className="text-indigo-100 text-sm leading-relaxed">Modelo de IA projeta R$ 312Bi para Pix no Q1 2025 (+8.7%), enquanto cartão deve manter tendência de queda em -2.7%. Gap aumentará para R$ 30.8Bi.</p>
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
                              <p className="text-indigo-100 text-sm leading-relaxed">Ticket médio Pix (R$ 103) é 49% menor que cartão (R$ 201), mas volume de transações é 184% maior (2.8Bi vs 987M), indicando democratização do acesso.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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
