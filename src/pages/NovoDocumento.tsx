import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Upload, Mic, Video, Camera, Play, Trash2, Copy, Edit, Plus, Save, Eye, Share2, X, Paperclip, Image as ImageIcon, FileText, Link as LinkIcon, Bold, Italic, Underline, List, ListOrdered, Lightbulb, ChartLine, Book, SpellCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function NovoDocumento() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex-none sticky top-0 z-10">
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Link to="/criar-conteudo" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <input 
                type="text" 
                placeholder="Título do documento..." 
                className="text-2xl font-semibold text-foreground bg-transparent border-none focus:outline-none focus:ring-0 placeholder-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Pré-visualizar
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
              <button className="px-4 py-2 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-80 transition text-sm flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-5xl mx-auto">
              
              {/* AI Assistant Section */}
              <section className="mb-8">
                <div className="bg-card rounded-2xl border-2 border-border p-8 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[hsl(var(--pastel-blue))] rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border">
                      <i className="fas fa-robot text-[hsl(var(--pastel-gray-dark))] text-2xl"></i>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-2">Assistente de Criação com IA</h2>
                      <p className="text-foreground mb-6">Deixe nossos agentes de IA criarem conteúdo profissional para você. Basta fornecer o tema e escolher o tipo de conteúdo.</p>
                      
                      <div className="bg-muted/50 rounded-xl border-2 border-border p-6">
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-foreground mb-3">Selecione o agente especializado:</label>
                          <div className="grid grid-cols-3 gap-3">
                            <button className="p-4 bg-[hsl(var(--pastel-blue))] rounded-lg border-2 border-border hover:bg-opacity-70 transition text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <ChartLine className="w-4 h-4 text-[hsl(var(--pastel-gray-dark))]" />
                                <span className="font-semibold text-[hsl(var(--pastel-gray-dark))] text-sm">Análise</span>
                              </div>
                              <p className="text-xs text-[hsl(var(--pastel-gray-dark))]/80">Relatórios e análises de mercado</p>
                            </button>

                            <button className="p-4 bg-[hsl(var(--pastel-green))] rounded-lg border-2 border-border hover:bg-opacity-70 transition text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-balance-scale text-[hsl(var(--pastel-gray-dark))]"></i>
                                <span className="font-semibold text-[hsl(var(--pastel-gray-dark))] text-sm">Compliance</span>
                              </div>
                              <p className="text-xs text-[hsl(var(--pastel-gray-dark))]/80">Documentos regulatórios</p>
                            </button>

                            <button className="p-4 bg-[hsl(var(--pastel-purple))] rounded-lg border-2 border-border hover:bg-opacity-70 transition text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-graduation-cap text-[hsl(var(--pastel-gray-dark))]"></i>
                                <span className="font-semibold text-[hsl(var(--pastel-gray-dark))] text-sm">Educacional</span>
                              </div>
                              <p className="text-xs text-[hsl(var(--pastel-gray-dark))]/80">Conteúdo didático</p>
                            </button>

                            <button className="p-4 bg-[hsl(var(--pastel-yellow))] rounded-lg border-2 border-border hover:bg-opacity-70 transition text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4 text-[hsl(var(--pastel-gray-dark))]" />
                                <span className="font-semibold text-[hsl(var(--pastel-gray-dark))] text-sm">Estratégia</span>
                              </div>
                              <p className="text-xs text-[hsl(var(--pastel-gray-dark))]/80">Planejamento e insights</p>
                            </button>

                            <button className="p-4 bg-[hsl(var(--pastel-pink))] rounded-lg border-2 border-border hover:bg-opacity-70 transition text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-file-contract text-[hsl(var(--pastel-gray-dark))]"></i>
                                <span className="font-semibold text-[hsl(var(--pastel-gray-dark))] text-sm">Jurídico</span>
                              </div>
                              <p className="text-xs text-[hsl(var(--pastel-gray-dark))]/80">Documentos legais</p>
                            </button>

                            <button className="p-4 bg-[hsl(var(--pastel-peach))] rounded-lg border-2 border-border hover:bg-opacity-70 transition text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-comments text-[hsl(var(--pastel-gray-dark))]"></i>
                                <span className="font-semibold text-[hsl(var(--pastel-gray-dark))] text-sm">Comunicação</span>
                              </div>
                              <p className="text-xs text-[hsl(var(--pastel-gray-dark))]/80">Relatórios executivos</p>
                            </button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-foreground mb-3">Escolha um agente específico (opcional):</label>
                          <select className="w-full px-4 py-3 bg-card border-2 border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]">
                            <option value="">Selecione um agente...</option>
                            <optgroup label="Análise de Mercado">
                              <option value="analista-acoes">Analista de Ações - Especialista em renda variável</option>
                              <option value="analista-renda-fixa">Analista de Renda Fixa - Títulos e bonds</option>
                              <option value="analista-macro">Analista Macroeconômico - Cenários e tendências</option>
                            </optgroup>
                            <optgroup label="Compliance e Regulatório">
                              <option value="compliance-cvm">Especialista CVM - Normas e regulamentações</option>
                              <option value="compliance-bacen">Especialista BACEN - Regulação bancária</option>
                              <option value="compliance-anbima">Especialista ANBIMA - Certificações e normas</option>
                            </optgroup>
                            <optgroup label="Educacional">
                              <option value="professor-financas">Professor de Finanças - Conceitos fundamentais</option>
                              <option value="instrutor-investimentos">Instrutor de Investimentos - Produtos financeiros</option>
                              <option value="mentor-certificacoes">Mentor de Certificações - Preparação para provas</option>
                            </optgroup>
                            <optgroup label="Estratégia">
                              <option value="estrategista-fundos">Estrategista de Fundos - Gestão de carteiras</option>
                              <option value="planejador-financeiro">Planejador Financeiro - Alocação de ativos</option>
                              <option value="consultor-risco">Consultor de Risco - Gestão e mitigação</option>
                            </optgroup>
                            <optgroup label="Jurídico">
                              <option value="advogado-mercado-capitais">Advogado Mercado de Capitais - Operações estruturadas</option>
                              <option value="especialista-contratos">Especialista em Contratos - Documentação legal</option>
                            </optgroup>
                            <optgroup label="Comunicação">
                              <option value="redator-relatorios">Redator de Relatórios - Comunicação executiva</option>
                              <option value="analista-ri">Analista de RI - Relações com investidores</option>
                            </optgroup>
                          </select>
                          <p className="text-xs text-muted-foreground mt-2">Ao selecionar um agente específico, o conteúdo será personalizado com a expertise dele</p>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-foreground mb-3">Sobre o que você quer escrever?</label>
                          <div className="relative">
                            <textarea 
                              placeholder="Ex: Análise das novas regulamentações da CVM sobre fundos de investimento..." 
                              className="w-full px-4 py-3 pb-14 bg-card border-2 border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] focus:border-transparent resize-none" 
                              rows={4}
                            />
                            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                              <button className="px-3 py-1.5 bg-card border-2 border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2 text-sm">
                                <Paperclip className="w-4 h-4" />
                                <span>Anexar</span>
                              </button>
                              <button className="px-3 py-1.5 bg-card border-2 border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2 text-sm">
                                <ImageIcon className="w-4 h-4" />
                              </button>
                              <button className="px-3 py-1.5 bg-card border-2 border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2 text-sm">
                                <i className="fas fa-file-pdf"></i>
                              </button>
                              <button className="px-3 py-1.5 bg-card border-2 border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2 text-sm">
                                <i className="fas fa-file-word"></i>
                              </button>
                              <button className="px-3 py-1.5 bg-card border-2 border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2 text-sm">
                                <i className="fas fa-file-excel"></i>
                              </button>
                              <div className="flex-1"></div>
                              <span className="text-xs text-muted-foreground">0/4000</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border-2 border-border">
                              <i className="fas fa-file-pdf text-foreground text-sm"></i>
                              <span className="text-xs text-foreground font-medium">relatorio-cvm-2024.pdf</span>
                              <span className="text-xs text-muted-foreground">2.3 MB</span>
                              <button className="ml-1 text-muted-foreground hover:text-foreground">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border-2 border-border">
                              <i className="fas fa-file-excel text-foreground text-sm"></i>
                              <span className="text-xs text-foreground font-medium">dados-mercado-q4.xlsx</span>
                              <span className="text-xs text-muted-foreground">1.8 MB</span>
                              <button className="ml-1 text-muted-foreground hover:text-foreground">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-foreground mb-3">Configurações adicionais:</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-muted-foreground mb-2 block">Tom de voz</label>
                              <select className="w-full px-3 py-2 bg-card border-2 border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]">
                                <option>Profissional</option>
                                <option>Técnico</option>
                                <option>Conversacional</option>
                                <option>Formal</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground mb-2 block">Tamanho do conteúdo</label>
                              <select className="w-full px-3 py-2 bg-card border-2 border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]">
                                <option>Curto (500 palavras)</option>
                                <option>Médio (1000 palavras)</option>
                                <option>Longo (2000+ palavras)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <button className="w-full py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition flex items-center justify-center gap-2">
                          <i className="fas fa-wand-magic-sparkles"></i>
                          <span>Gerar Conteúdo com IA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Media Upload Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Adicionar Mídia</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-card rounded-xl border-2 border-border p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[hsl(var(--pastel-purple))] rounded-lg flex items-center justify-center border-2 border-border">
                        <Mic className="text-[hsl(var(--pastel-gray-dark))] w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Adicionar Áudio</h3>
                        <p className="text-xs text-muted-foreground">MP3, WAV, até 50MB</p>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4 hover:border-[hsl(var(--pastel-purple))] hover:bg-[hsl(var(--pastel-purple))]/20 transition cursor-pointer">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">Clique para fazer upload</p>
                      <p className="text-xs text-muted-foreground">ou arraste e solte o arquivo aqui</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-4 py-2 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-border flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Gravar Áudio
                      </button>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border-2 border-border p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[hsl(var(--pastel-pink))] rounded-lg flex items-center justify-center border-2 border-border">
                        <Video className="text-[hsl(var(--pastel-gray-dark))] w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Adicionar Vídeo</h3>
                        <p className="text-xs text-muted-foreground">MP4, MOV, até 200MB</p>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4 hover:border-[hsl(var(--pastel-pink))] hover:bg-[hsl(var(--pastel-pink))]/20 transition cursor-pointer">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">Clique para fazer upload</p>
                      <p className="text-xs text-muted-foreground">ou arraste e solte o arquivo aqui</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-4 py-2 bg-[hsl(var(--pastel-pink))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-border flex items-center justify-center gap-2">
                        <Camera className="w-4 h-4" />
                        Gravar Vídeo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-card rounded-xl border-2 border-border p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[hsl(var(--pastel-purple))] rounded-lg flex items-center justify-center border-2 border-border flex-shrink-0">
                        <i className="fas fa-music text-[hsl(var(--pastel-gray-dark))] text-2xl"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">apresentacao-mercado-financeiro.mp3</h4>
                        <p className="text-xs text-muted-foreground">3.2 MB • 4:35 min</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[hsl(var(--pastel-purple))] rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition">
                          <Play className="text-foreground w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition">
                          <Trash2 className="text-foreground w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border-2 border-border p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[hsl(var(--pastel-pink))] rounded-lg flex items-center justify-center border-2 border-border flex-shrink-0 overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ff41e4caec-1b18587179ee85a084be.png" alt="financial market video thumbnail" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">analise-tecnica-acoes.mp4</h4>
                        <p className="text-xs text-muted-foreground">15.8 MB • 8:22 min</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[hsl(var(--pastel-pink))] rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">100%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition">
                          <Play className="text-foreground w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition">
                          <Trash2 className="text-foreground w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Transcription Section */}
              <section className="mb-8">
                <div className="bg-card rounded-xl border-2 border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] rounded-lg flex items-center justify-center border-2 border-border">
                        <FileText className="text-[hsl(var(--pastel-gray-dark))] w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Transcrição Automática</h3>
                        <p className="text-xs text-muted-foreground">Converta áudio e vídeo em texto</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[hsl(var(--pastel-green))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-border flex items-center gap-2">
                      <i className="fas fa-magic"></i>
                      Transcrever Mídia
                    </button>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 border-2 border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <i className="fas fa-quote-left text-muted-foreground text-sm mt-1"></i>
                      <div className="flex-1">
                        <p className="text-sm text-foreground leading-relaxed mb-2">
                          Olá a todos, bem-vindos à nossa apresentação sobre as tendências do mercado financeiro para 2025. Hoje vamos abordar os principais indicadores macroeconômicos que impactam o setor...
                        </p>
                        <p className="text-xs text-muted-foreground">Transcrição de: apresentacao-mercado-financeiro.mp3 • 00:00 - 00:15</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-muted transition border border-border flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        Copiar
                      </button>
                      <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-muted transition border border-border flex items-center gap-1">
                        <Edit className="w-3 h-3" />
                        Editar
                      </button>
                      <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-muted transition border border-border flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        Inserir no Documento
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Editor Section */}
              <section className="mb-8">
                <div className="bg-card rounded-xl border-2 border-border overflow-hidden">
                  <div className="px-6 py-3 border-b-2 border-border flex items-center gap-2 bg-muted/50">
                    <div className="flex items-center gap-1 border-r-2 border-border pr-3">
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Negrito">
                        <Bold className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Itálico">
                        <Italic className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Sublinhado">
                        <Underline className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 border-r-2 border-border pr-3">
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Título 1">
                        <span className="text-sm font-semibold">H1</span>
                      </button>
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Título 2">
                        <span className="text-sm font-semibold">H2</span>
                      </button>
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Título 3">
                        <span className="text-sm font-semibold">H3</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1 border-r-2 border-border pr-3">
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Lista com marcadores">
                        <List className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 text-muted-foreground hover:bg-muted rounded flex items-center justify-center transition" title="Lista numerada">
                        <ListOrdered className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="px-3 py-1.5 text-muted-foreground hover:bg-muted rounded flex items-center gap-2 text-sm font-medium transition" title="Adicionar imagem">
                        <ImageIcon className="w-4 h-4" />
                        <span>Imagem</span>
                      </button>
                      <button className="px-3 py-1.5 text-muted-foreground hover:bg-muted rounded flex items-center gap-2 text-sm font-medium transition" title="Adicionar link">
                        <LinkIcon className="w-4 h-4" />
                        <span>Link</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-8 min-h-[400px]">
                    <div className="prose prose-slate max-w-none">
                      <p className="text-muted-foreground italic">Comece a escrever ou use a IA para gerar conteúdo automaticamente...</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* AI Suggestions */}
              <section className="mb-8">
                <div className="bg-card rounded-xl border-2 border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[hsl(var(--pastel-yellow))] rounded-lg flex items-center justify-center border-2 border-border">
                      <Lightbulb className="text-[hsl(var(--pastel-gray-dark))] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Sugestões da IA</h3>
                      <p className="text-xs text-muted-foreground">Melhorias e complementos para seu documento</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[hsl(var(--pastel-yellow))]/30 rounded-lg p-4 border-2 border-border">
                      <div className="flex items-start gap-3">
                        <ChartLine className="text-foreground w-5 h-5 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground font-medium mb-1">Adicionar gráfico comparativo</p>
                          <p className="text-xs text-muted-foreground">Que tal incluir um gráfico mostrando a evolução dos índices mencionados?</p>
                        </div>
                        <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-muted transition border border-border">
                          Adicionar
                        </button>
                      </div>
                    </div>

                    <div className="bg-[hsl(var(--pastel-blue))]/30 rounded-lg p-4 border-2 border-border">
                      <div className="flex items-start gap-3">
                        <Book className="text-foreground w-5 h-5 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground font-medium mb-1">Adicionar referências</p>
                          <p className="text-xs text-muted-foreground">Encontramos 3 artigos relevantes da CVM que podem enriquecer seu conteúdo.</p>
                        </div>
                        <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-muted transition border border-border">
                          Ver
                        </button>
                      </div>
                    </div>

                    <div className="bg-[hsl(var(--pastel-green))]/30 rounded-lg p-4 border-2 border-border">
                      <div className="flex items-start gap-3">
                        <SpellCheck className="text-foreground w-5 h-5 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground font-medium mb-1">Revisar ortografia e gramática</p>
                          <p className="text-xs text-muted-foreground">Detectamos 2 possíveis melhorias no texto.</p>
                        </div>
                        <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-muted transition border border-border">
                          Revisar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Document Settings */}
              <section className="mb-8">
                <div className="bg-card rounded-xl border-2 border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Configurações do Documento</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
                      <select className="w-full px-4 py-2 bg-muted/50 border-2 border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]">
                        <option>Análise de Mercado</option>
                        <option>Relatório de Compliance</option>
                        <option>Estratégia de Investimentos</option>
                        <option>Educacional</option>
                        <option>Notas de Reunião</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Visibilidade</label>
                      <select className="w-full px-4 py-2 bg-muted/50 border-2 border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]">
                        <option>Privado</option>
                        <option>Compartilhado com equipe</option>
                        <option>Público</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-3 py-1 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-full text-xs font-medium border-2 border-border flex items-center gap-2">
                          Mercado Financeiro
                          <X className="w-3 h-3 cursor-pointer hover:text-foreground" />
                        </span>
                        <span className="px-3 py-1 bg-[hsl(var(--pastel-green))] text-[hsl(var(--pastel-gray-dark))] rounded-full text-xs font-medium border-2 border-border flex items-center gap-2">
                          CVM
                          <X className="w-3 h-3 cursor-pointer hover:text-foreground" />
                        </span>
                        <span className="px-3 py-1 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-full text-xs font-medium border-2 border-border flex items-center gap-2">
                          2025
                          <X className="w-3 h-3 cursor-pointer hover:text-foreground" />
                        </span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Adicionar tag..." 
                        className="w-full px-4 py-2 bg-muted/50 border-2 border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
