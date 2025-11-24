import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useState } from "react";
import { 
  ChartLine, Scale, GraduationCap, Lightbulb, FileCheck2, MessageSquare,
  Paperclip, Image as ImageIcon, FileText, FileSpreadsheet, X, Music, Video, 
  Play, Trash2, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
  Eye, Share2, Save, Wand2, Camera, CloudUpload, FileCheck, Book, SpellCheck,
  Plus, Copy, Edit, TrendingUp, Landmark, Award, Target, BadgeCheck, Megaphone
} from "lucide-react";

function NovoDocumento() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedSpecificAgent, setSelectedSpecificAgent] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState("Profissional");
  const [contentSize, setContentSize] = useState("Médio (1000 palavras)");
  const [category, setCategory] = useState("Análise de Mercado");
  const [visibility, setVisibility] = useState("Privado");
  const [tags, setTags] = useState(["Mercado Financeiro", "CVM", "2025"]);
  const [newTag, setNewTag] = useState("");
  const [attachedFiles] = useState([
    { name: "relatorio-cvm-2024.pdf", size: "2.3 MB", type: "pdf" },
    { name: "dados-mercado-q4.xlsx", size: "1.8 MB", type: "excel" }
  ]);
  const [uploadedMedia] = useState([
    { 
      name: "apresentacao-mercado-financeiro.mp3", 
      size: "3.2 MB", 
      duration: "4:35 min", 
      type: "audio",
      progress: 45
    },
    { 
      name: "analise-tecnica-acoes.mp4", 
      size: "15.8 MB", 
      duration: "8:22 min", 
      type: "video",
      progress: 100,
      thumbnail: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ff41e4caec-1b18587179ee85a084be.png"
    }
  ]);

  const agentTypes = [
    { name: "Análise", icon: ChartLine, color: "pastel-blue", description: "Relatórios e análises de mercado" },
    { name: "Compliance", icon: Scale, color: "pastel-green", description: "Documentos regulatórios" },
    { name: "Educacional", icon: GraduationCap, color: "pastel-purple", description: "Conteúdo didático" },
    { name: "Estratégia", icon: Lightbulb, color: "pastel-yellow", description: "Planejamento e insights" },
    { name: "Jurídico", icon: FileCheck2, color: "pastel-pink", description: "Documentos legais" },
    { name: "Comunicação", icon: MessageSquare, color: "pastel-peach", description: "Relatórios executivos" }
  ];

  const specificAgents = [
    { group: "Análise de Mercado", agents: [
      { value: "analista-acoes", name: "Analista de Ações - Especialista em renda variável", icon: TrendingUp },
      { value: "analista-renda-fixa", name: "Analista de Renda Fixa - Títulos e bonds", icon: ChartLine },
      { value: "analista-macro", name: "Analista Macroeconômico - Cenários e tendências", icon: TrendingUp }
    ]},
    { group: "Compliance e Regulatório", agents: [
      { value: "compliance-cvm", name: "Especialista CVM - Normas e regulamentações", icon: Scale },
      { value: "compliance-bacen", name: "Especialista BACEN - Regulação bancária", icon: Landmark },
      { value: "compliance-anbima", name: "Especialista ANBIMA - Certificações e normas", icon: Award }
    ]},
    { group: "Educacional", agents: [
      { value: "professor-financas", name: "Professor de Finanças - Conceitos fundamentais", icon: GraduationCap },
      { value: "instrutor-investimentos", name: "Instrutor de Investimentos - Produtos financeiros", icon: Book },
      { value: "mentor-certificacoes", name: "Mentor de Certificações - Preparação para provas", icon: Award }
    ]},
    { group: "Estratégia", agents: [
      { value: "estrategista-fundos", name: "Estrategista de Fundos - Gestão de carteiras", icon: Target },
      { value: "planejador-financeiro", name: "Planejador Financeiro - Alocação de ativos", icon: ChartLine },
      { value: "consultor-risco", name: "Consultor de Risco - Gestão e mitigação", icon: Scale }
    ]},
    { group: "Jurídico", agents: [
      { value: "advogado-mercado-capitais", name: "Advogado Mercado de Capitais - Operações estruturadas", icon: FileCheck2 },
      { value: "especialista-contratos", name: "Especialista em Contratos - Documentação legal", icon: FileText }
    ]},
    { group: "Comunicação", agents: [
      { value: "redator-relatorios", name: "Redator de Relatórios - Comunicação executiva", icon: Edit },
      { value: "analista-ri", name: "Analista de RI - Relações com investidores", icon: Megaphone }
    ]}
  ];

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b-2 border-border h-16 flex-none sticky top-0 z-10">
          <div className="h-full px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <input 
                type="text" 
                placeholder="Título do documento..." 
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
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
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* AI Assistant Section */}
            <section>
              <div className="bg-card rounded-2xl border-2 border-border p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[hsl(var(--pastel-blue))] rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border">
                    <i className="fas fa-robot text-[hsl(var(--pastel-gray-dark))] text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Assistente de Criação com IA</h2>
                    <p className="text-foreground mb-6">Deixe nossos agentes de IA criarem conteúdo profissional para você. Basta fornecer o tema e escolher o tipo de conteúdo.</p>
                    
                    <div className="bg-muted rounded-xl border-2 border-border p-6 space-y-6">
                      {/* Agent Type Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Selecione o agente especializado:</label>
                        <div className="grid grid-cols-3 gap-3">
                          {agentTypes.map((agent) => (
                            <button
                              key={agent.name}
                              onClick={() => setSelectedAgent(agent.name)}
                              className={`p-4 bg-[hsl(var(--${agent.color}))] rounded-lg border-2 border-border hover:bg-opacity-70 transition text-left ${
                                selectedAgent === agent.name ? 'ring-2 ring-[hsl(var(--pastel-gray-dark))]' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <agent.icon className="w-4 h-4 text-[hsl(var(--pastel-gray-dark))]" />
                                <span className="font-semibold text-foreground text-sm">{agent.name}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{agent.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Specific Agent Dropdown */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Escolha um agente específico (opcional):</label>
                        <div className="relative">
                          <select 
                            value={selectedSpecificAgent}
                            onChange={(e) => setSelectedSpecificAgent(e.target.value)}
                            className="w-full px-4 py-3 bg-card border-2 border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))] appearance-none cursor-pointer"
                          >
                            <option value="">Selecione um agente...</option>
                            {specificAgents.map((group) => (
                              <optgroup key={group.group} label={group.group}>
                                {group.agents.map((agent) => (
                                  <option key={agent.value} value={agent.value}>
                                    {agent.name}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          {selectedSpecificAgent && (
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              {specificAgents.flatMap(g => g.agents).find(a => a.value === selectedSpecificAgent)?.icon && 
                                (() => {
                                  const SelectedIcon = specificAgents.flatMap(g => g.agents).find(a => a.value === selectedSpecificAgent)!.icon;
                                  return <SelectedIcon className="w-4 h-4 text-[hsl(var(--pastel-gray-dark))]" />;
                                })()
                              }
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Ao selecionar um agente específico, o conteúdo será personalizado com a expertise dele</p>
                      </div>

                      {/* Content Prompt */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Sobre o que você quer escrever?</label>
                        <div className="relative">
                          <textarea 
                            placeholder="Ex: Análise das novas regulamentações da CVM sobre fundos de investimento..."
                            value={contentPrompt}
                            onChange={(e) => setContentPrompt(e.target.value)}
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
                              <FileText className="w-4 h-4" />
                            </button>
                            <button className="px-3 py-1.5 bg-card border-2 border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2 text-sm">
                              <FileText className="w-4 h-4" />
                            </button>
                            <button className="px-3 py-1.5 bg-card border-2 border-border rounded-lg text-foreground hover:bg-muted transition flex items-center gap-2 text-sm">
                              <FileSpreadsheet className="w-4 h-4" />
                            </button>
                            <div className="flex-1"></div>
                            <span className="text-xs text-muted-foreground">{contentPrompt.length}/4000</span>
                          </div>
                        </div>
                        
                        {/* Attached Files */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {attachedFiles.map((file, index) => (
                            <div key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border-2 border-border">
                              <FileText className="w-4 h-4 text-foreground" />
                              <span className="text-xs text-foreground font-medium">{file.name}</span>
                              <span className="text-xs text-muted-foreground">{file.size}</span>
                              <button className="ml-1 text-muted-foreground hover:text-foreground">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Settings */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Configurações adicionais:</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-muted-foreground mb-2 block">Tom de voz</label>
                            <select 
                              value={toneOfVoice}
                              onChange={(e) => setToneOfVoice(e.target.value)}
                              className="w-full px-3 py-2 bg-card border-2 border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]"
                            >
                              <option>Profissional</option>
                              <option>Técnico</option>
                              <option>Conversacional</option>
                              <option>Formal</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground mb-2 block">Tamanho do conteúdo</label>
                            <select 
                              value={contentSize}
                              onChange={(e) => setContentSize(e.target.value)}
                              className="w-full px-3 py-2 bg-card border-2 border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]"
                            >
                              <option>Curto (500 palavras)</option>
                              <option>Médio (1000 palavras)</option>
                              <option>Longo (2000+ palavras)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <button className="w-full py-3 bg-[hsl(var(--pastel-gray-dark))] text-white rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2">
                        <Wand2 className="w-5 h-5" />
                        <span>Gerar Conteúdo com IA</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Media Upload Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Adicionar Mídia</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Audio Upload */}
                <div className="bg-card rounded-xl border-2 border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[hsl(var(--pastel-purple))] rounded-lg flex items-center justify-center border-2 border-border">
                      <i className="fas fa-microphone text-[hsl(var(--pastel-gray-dark))] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Adicionar Áudio</h3>
                      <p className="text-xs text-muted-foreground">MP3, WAV, até 50MB</p>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4 hover:border-[hsl(var(--pastel-purple))] hover:bg-[hsl(var(--pastel-purple))]/20 transition cursor-pointer">
                    <CloudUpload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">Clique para fazer upload</p>
                    <p className="text-xs text-muted-foreground">ou arraste e solte o arquivo aqui</p>
                  </div>

                  <button className="w-full px-4 py-2 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-border flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Gravar Áudio
                  </button>
                </div>

                {/* Video Upload */}
                <div className="bg-card rounded-xl border-2 border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[hsl(var(--pastel-pink))] rounded-lg flex items-center justify-center border-2 border-border">
                      <Video className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Adicionar Vídeo</h3>
                      <p className="text-xs text-muted-foreground">MP4, MOV, até 200MB</p>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4 hover:border-[hsl(var(--pastel-pink))] hover:bg-[hsl(var(--pastel-pink))]/20 transition cursor-pointer">
                    <CloudUpload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">Clique para fazer upload</p>
                    <p className="text-xs text-muted-foreground">ou arraste e solte o arquivo aqui</p>
                  </div>

                  <button className="w-full px-4 py-2 bg-[hsl(var(--pastel-pink))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-border flex items-center justify-center gap-2">
                    <Camera className="w-4 h-4" />
                    Gravar Vídeo
                  </button>
                </div>
              </div>

              {/* Uploaded Media List */}
              <div className="space-y-4">
                {uploadedMedia.map((media, index) => (
                  <div key={index} className="bg-card rounded-xl border-2 border-border p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[hsl(var(--pastel-purple))] rounded-lg flex items-center justify-center border-2 border-border flex-shrink-0 overflow-hidden">
                        {media.type === 'audio' ? (
                          <Music className="w-8 h-8 text-[hsl(var(--pastel-gray-dark))]" />
                        ) : (
                          <img src={media.thumbnail} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{media.name}</h4>
                        <p className="text-xs text-muted-foreground">{media.size} • {media.duration}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${media.type === 'audio' ? 'bg-[hsl(var(--pastel-purple))]' : 'bg-[hsl(var(--pastel-pink))]'} rounded-full`}
                              style={{ width: `${media.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground font-medium">{media.progress}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition">
                          <Play className="w-4 h-4 text-foreground" />
                        </button>
                        <button className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition">
                          <Trash2 className="w-4 h-4 text-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Transcription Section */}
            <section>
              <div className="bg-card rounded-xl border-2 border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] rounded-lg flex items-center justify-center border-2 border-border">
                      <FileCheck className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Transcrição Automática</h3>
                      <p className="text-xs text-muted-foreground">Converta áudio e vídeo em texto</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[hsl(var(--pastel-green))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-border flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    Transcrever Mídia
                  </button>
                </div>

                <div className="bg-muted rounded-lg p-4 border-2 border-border">
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
                    <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-card/80 transition border border-border flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      Copiar
                    </button>
                    <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-card/80 transition border border-border flex items-center gap-1">
                      <Edit className="w-3 h-3" />
                      Editar
                    </button>
                    <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-card/80 transition border border-border flex items-center gap-1">
                      <Plus className="w-3 h-3" />
                      Inserir no Documento
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Editor Section */}
            <section>
              <div className="bg-card rounded-xl border-2 border-border overflow-hidden">
                <div className="px-6 py-3 border-b-2 border-border flex items-center gap-2 bg-muted">
                  <div className="flex items-center gap-1 border-r-2 border-border pr-3">
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Negrito">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Itálico">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Sublinhado">
                      <Underline className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 border-r-2 border-border pr-3">
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Título 1">
                      <span className="text-sm font-semibold">H1</span>
                    </button>
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Título 2">
                      <span className="text-sm font-semibold">H2</span>
                    </button>
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Título 3">
                      <span className="text-sm font-semibold">H3</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 border-r-2 border-border pr-3">
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Lista com marcadores">
                      <List className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center justify-center transition" title="Lista numerada">
                      <ListOrdered className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1.5 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center gap-2 text-sm font-medium transition" title="Adicionar imagem">
                      <ImageIcon className="w-4 h-4" />
                      <span>Imagem</span>
                    </button>
                    <button className="px-3 py-1.5 text-muted-foreground hover:bg-muted-foreground/20 rounded flex items-center gap-2 text-sm font-medium transition" title="Adicionar link">
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
            <section>
              <div className="bg-card rounded-xl border-2 border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-yellow))] rounded-lg flex items-center justify-center border-2 border-border">
                    <Lightbulb className="w-5 h-5 text-[hsl(var(--pastel-gray-dark))]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Sugestões da IA</h3>
                    <p className="text-xs text-muted-foreground">Melhorias e complementos para seu documento</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-[hsl(var(--pastel-yellow))]/30 rounded-lg p-4 border-2 border-border">
                    <div className="flex items-start gap-3">
                      <ChartLine className="w-5 h-5 text-foreground mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium mb-1">Adicionar gráfico comparativo</p>
                        <p className="text-xs text-muted-foreground">Que tal incluir um gráfico mostrando a evolução dos índices mencionados?</p>
                      </div>
                      <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-card/80 transition border border-border">
                        Adicionar
                      </button>
                    </div>
                  </div>

                  <div className="bg-[hsl(var(--pastel-blue))]/30 rounded-lg p-4 border-2 border-border">
                    <div className="flex items-start gap-3">
                      <Book className="w-5 h-5 text-foreground mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium mb-1">Adicionar referências</p>
                        <p className="text-xs text-muted-foreground">Encontramos 3 artigos relevantes da CVM que podem enriquecer seu conteúdo.</p>
                      </div>
                      <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-card/80 transition border border-border">
                        Ver
                      </button>
                    </div>
                  </div>

                  <div className="bg-[hsl(var(--pastel-green))]/30 rounded-lg p-4 border-2 border-border">
                    <div className="flex items-start gap-3">
                      <SpellCheck className="w-5 h-5 text-foreground mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium mb-1">Revisar ortografia e gramática</p>
                        <p className="text-xs text-muted-foreground">Detectamos 2 possíveis melhorias no texto.</p>
                      </div>
                      <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-xs font-medium hover:bg-card/80 transition border border-border">
                        Revisar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Document Settings */}
            <section>
              <div className="bg-card rounded-xl border-2 border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Configurações do Documento</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-muted border-2 border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]"
                    >
                      <option>Análise de Mercado</option>
                      <option>Relatório de Compliance</option>
                      <option>Estratégia de Investimentos</option>
                      <option>Educacional</option>
                      <option>Notas de Reunião</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Visibilidade</label>
                    <select 
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full px-4 py-2 bg-muted border-2 border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]"
                    >
                      <option>Privado</option>
                      <option>Compartilhado com equipe</option>
                      <option>Público</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-full text-xs font-medium border-2 border-border flex items-center gap-2"
                        >
                          {tag}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-foreground" 
                            onClick={() => removeTag(tag)}
                          />
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Adicionar tag..." 
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1 px-4 py-2 bg-muted border-2 border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]"
                      />
                      <button 
                        onClick={addTag}
                        className="px-4 py-2 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-border"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

export default NovoDocumento;