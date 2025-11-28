import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NovoDocumento() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [documentTitle, setDocumentTitle] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [specificAgent, setSpecificAgent] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState("Profissional");
  const [contentSize, setContentSize] = useState("Médio (1000 palavras)");
  const [category, setCategory] = useState("Análise de Mercado");
  const [visibility, setVisibility] = useState("Privado");
  const [tags, setTags] = useState<string[]>(["Mercado Financeiro", "CVM", "2025"]);
  const [newTag, setNewTag] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Load title from URL params if present
  useEffect(() => {
    const titleParam = searchParams.get("title");
    if (titleParam) {
      setDocumentTitle(titleParam);
    }
  }, [searchParams]);

  const agentTypes = [
    { id: "analise", name: "Análise", icon: "fas fa-chart-line", color: "bg-[#B8D4E8]", description: "Relatórios e análises de mercado" },
    { id: "compliance", name: "Compliance", icon: "fas fa-balance-scale", color: "bg-[#C5E8D4]", description: "Documentos regulatórios" },
    { id: "educacional", name: "Educacional", icon: "fas fa-graduation-cap", color: "bg-[#D4C5E8]", description: "Conteúdo didático" },
    { id: "estrategia", name: "Estratégia", icon: "fas fa-lightbulb", color: "bg-[#E8E0C5]", description: "Planejamento e insights" },
    { id: "juridico", name: "Jurídico", icon: "fas fa-file-contract", color: "bg-[#E8C5D8]", description: "Documentos legais" },
    { id: "comunicacao", name: "Comunicação", icon: "fas fa-comments", color: "bg-[#E8D4C5]", description: "Relatórios executivos" }
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const handleGenerateContent = async () => {
    if (!contentPrompt.trim()) {
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            prompt: contentPrompt,
            agentType: selectedAgent,
            specificAgent: specificAgent,
            tone: toneOfVoice,
            contentSize: contentSize,
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Falha ao gerar conteúdo");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              setGeneratedContent((prev) => prev + content);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              setGeneratedContent((prev) => prev + content);
            }
          } catch {}
        }
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Link to="/biblioteca" className="p-2 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
              <input 
                type="text" 
                placeholder="Título do documento..." 
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="text-2xl font-semibold text-slate-800 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-slate-400 flex-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition text-sm">
                <i className="fas fa-eye mr-2"></i>
                Pré-visualizar
              </button>
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition text-sm">
                <i className="fas fa-share-alt mr-2"></i>
                Compartilhar
              </button>
              <button className="px-4 py-2 bg-[#B8D4E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                <i className="fas fa-save mr-2"></i>
                Salvar
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            {/* AI Assistant Section */}
            <section className="mb-8">
              <div className="bg-white rounded-2xl border-2 border-slate-300 p-8 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#B8D4E8] rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-slate-300">
                    <i className="fas fa-robot text-slate-700 text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Assistente de Criação com IA</h2>
                    <p className="text-slate-700 mb-6">Deixe nossos agentes de IA criarem conteúdo profissional para você. Basta fornecer o tema e escolher o tipo de conteúdo.</p>
                    
                    <div className="bg-slate-50 rounded-xl border-2 border-slate-300 p-6">
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Selecione o agente especializado:</label>
                        <div className="grid grid-cols-3 gap-3">
                          {agentTypes.map((agent) => (
                            <button
                              key={agent.id}
                              onClick={() => setSelectedAgent(agent.id)}
                              className={`p-4 ${agent.color} rounded-lg border-2 border-slate-300 hover:bg-opacity-70 transition text-left`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <i className={`${agent.icon} text-slate-700`}></i>
                                <span className="font-semibold text-slate-800 text-sm">{agent.name}</span>
                              </div>
                              <p className="text-xs text-slate-600">{agent.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Escolha um agente específico (opcional):</label>
                        <select 
                          value={specificAgent}
                          onChange={(e) => setSpecificAgent(e.target.value)}
                          className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                        >
                          <option value="">Selecione um agente...</option>
                          <optgroup label="Análise de Mercado">
                            <option value="analista-acoes">📊 Analista de Ações - Especialista em renda variável</option>
                            <option value="analista-renda-fixa">📈 Analista de Renda Fixa - Títulos e bonds</option>
                            <option value="analista-macro">🌍 Analista Macroeconômico - Cenários e tendências</option>
                          </optgroup>
                          <optgroup label="Compliance e Regulatório">
                            <option value="compliance-cvm">⚖️ Especialista CVM - Normas e regulamentações</option>
                            <option value="compliance-bacen">🏦 Especialista BACEN - Regulação bancária</option>
                            <option value="compliance-anbima">📋 Especialista ANBIMA - Certificações e normas</option>
                          </optgroup>
                          <optgroup label="Educacional">
                            <option value="professor-financas">🎓 Professor de Finanças - Conceitos fundamentais</option>
                            <option value="instrutor-investimentos">💼 Instrutor de Investimentos - Produtos financeiros</option>
                            <option value="mentor-certificacoes">📚 Mentor de Certificações - Preparação para provas</option>
                          </optgroup>
                          <optgroup label="Estratégia">
                            <option value="estrategista-fundos">💡 Estrategista de Fundos - Gestão de carteiras</option>
                            <option value="planejador-financeiro">📊 Planejador Financeiro - Alocação de ativos</option>
                            <option value="consultor-risco">⚠️ Consultor de Risco - Gestão e mitigação</option>
                          </optgroup>
                          <optgroup label="Jurídico">
                            <option value="advogado-mercado-capitais">⚖️ Advogado Mercado de Capitais - Operações estruturadas</option>
                            <option value="especialista-contratos">📄 Especialista em Contratos - Documentação legal</option>
                          </optgroup>
                          <optgroup label="Comunicação">
                            <option value="redator-relatorios">✍️ Redator de Relatórios - Comunicação executiva</option>
                            <option value="analista-ri">📢 Analista de RI - Relações com investidores</option>
                          </optgroup>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">Ao selecionar um agente específico, o conteúdo será personalizado com a expertise dele</p>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Sobre o que você quer escrever?</label>
                        <div className="relative">
                          <textarea 
                            placeholder="Ex: Análise das novas regulamentações da CVM sobre fundos de investimento..."
                            value={contentPrompt}
                            onChange={(e) => setContentPrompt(e.target.value)}
                            className="w-full px-4 py-3 pb-14 bg-white border-2 border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent resize-none" 
                            rows={4}
                          />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-white border-2 border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                              <i className="fas fa-paperclip"></i>
                              <span>Anexar</span>
                            </button>
                            <button className="px-3 py-1.5 bg-white border-2 border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                              <i className="fas fa-image"></i>
                            </button>
                            <button className="px-3 py-1.5 bg-white border-2 border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                              <i className="fas fa-file-pdf"></i>
                            </button>
                            <button className="px-3 py-1.5 bg-white border-2 border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                              <i className="fas fa-file-word"></i>
                            </button>
                            <button className="px-3 py-1.5 bg-white border-2 border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 text-sm">
                              <i className="fas fa-file-excel"></i>
                            </button>
                            <div className="flex-1"></div>
                            <span className="text-xs text-slate-500">{contentPrompt.length}/4000</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap gap-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border-2 border-slate-300">
                            <i className="fas fa-file-pdf text-slate-700 text-sm"></i>
                            <span className="text-xs text-slate-700 font-medium">relatorio-cvm-2024.pdf</span>
                            <span className="text-xs text-slate-500">2.3 MB</span>
                            <button className="ml-1 text-slate-500 hover:text-slate-700">
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border-2 border-slate-300">
                            <i className="fas fa-file-excel text-slate-700 text-sm"></i>
                            <span className="text-xs text-slate-700 font-medium">dados-mercado-q4.xlsx</span>
                            <span className="text-xs text-slate-500">1.8 MB</span>
                            <button className="ml-1 text-slate-500 hover:text-slate-700">
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Configurações adicionais:</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-slate-600 mb-2 block">Tom de voz</label>
                            <select 
                              value={toneOfVoice}
                              onChange={(e) => setToneOfVoice(e.target.value)}
                              className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                            >
                              <option>Profissional</option>
                              <option>Técnico</option>
                              <option>Conversacional</option>
                              <option>Formal</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-600 mb-2 block">Tamanho do conteúdo</label>
                            <select 
                              value={contentSize}
                              onChange={(e) => setContentSize(e.target.value)}
                              className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                            >
                              <option>Curto (500 palavras)</option>
                              <option>Médio (1000 palavras)</option>
                              <option>Longo (2000+ palavras)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                  <button 
                    onClick={handleGenerateContent}
                    disabled={isGenerating || !contentPrompt.trim()}
                    className="w-full py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Gerando conteúdo...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-wand-magic-sparkles"></i>
                        <span>Gerar Conteúdo com IA</span>
                      </>
                    )}
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Media Upload Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Adicionar Mídia</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl border-2 border-slate-300 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D4C5E8] rounded-lg flex items-center justify-center border-2 border-slate-300">
                      <i className="fas fa-microphone text-slate-700 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Adicionar Áudio</h3>
                      <p className="text-xs text-slate-500">MP3, WAV, até 50MB</p>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4 hover:border-[#D4C5E8] hover:bg-[#D4C5E8] hover:bg-opacity-20 transition cursor-pointer">
                    <i className="fas fa-cloud-upload-alt text-4xl text-slate-400 mb-3"></i>
                    <p className="text-sm font-medium text-slate-700 mb-1">Clique para fazer upload</p>
                    <p className="text-xs text-slate-500">ou arraste e solte o arquivo aqui</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-4 py-2 bg-[#D4C5E8] text-slate-700 rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-slate-300">
                      <i className="fas fa-circle mr-2 text-red-500"></i>
                      Gravar Áudio
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-slate-300 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#E8C5D8] rounded-lg flex items-center justify-center border-2 border-slate-300">
                      <i className="fas fa-video text-slate-700 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Adicionar Vídeo</h3>
                      <p className="text-xs text-slate-500">MP4, MOV, até 200MB</p>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center mb-4 hover:border-[#E8C5D8] hover:bg-[#E8C5D8] hover:bg-opacity-20 transition cursor-pointer">
                    <i className="fas fa-cloud-upload-alt text-4xl text-slate-400 mb-3"></i>
                    <p className="text-sm font-medium text-slate-700 mb-1">Clique para fazer upload</p>
                    <p className="text-xs text-slate-500">ou arraste e solte o arquivo aqui</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-4 py-2 bg-[#E8C5D8] text-slate-700 rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-slate-300">
                      <i className="fas fa-camera mr-2"></i>
                      Gravar Vídeo
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border-2 border-slate-300 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#D4C5E8] rounded-lg flex items-center justify-center border-2 border-slate-300 flex-shrink-0">
                      <i className="fas fa-music text-slate-700 text-2xl"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">apresentacao-mercado-financeiro.mp3</h4>
                      <p className="text-xs text-slate-500">3.2 MB • 4:35 min</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4C5E8] rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-xs text-slate-600 font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition">
                        <i className="fas fa-play text-slate-700 text-sm"></i>
                      </button>
                      <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition">
                        <i className="fas fa-trash text-slate-700 text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-slate-300 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#E8C5D8] rounded-lg flex items-center justify-center border-2 border-slate-300 flex-shrink-0 overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ff41e4caec-1b18587179ee85a084be.png" alt="video thumbnail" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">analise-tecnica-acoes.mp4</h4>
                      <p className="text-xs text-slate-500">15.8 MB • 8:22 min</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#E8C5D8] rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <span className="text-xs text-slate-600 font-medium">100%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition">
                        <i className="fas fa-play text-slate-700 text-sm"></i>
                      </button>
                      <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition">
                        <i className="fas fa-trash text-slate-700 text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Transcription Section */}
            <section className="mb-8">
              <div className="bg-white rounded-xl border-2 border-slate-300 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C5E8D4] rounded-lg flex items-center justify-center border-2 border-slate-300">
                      <i className="fas fa-file-alt text-slate-700"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Transcrição Automática</h3>
                      <p className="text-xs text-slate-500">Converta áudio e vídeo em texto</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#C5E8D4] text-slate-700 rounded-lg font-medium hover:bg-opacity-70 transition text-sm border-2 border-slate-300">
                    <i className="fas fa-magic mr-2"></i>
                    Transcrever Mídia
                  </button>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <i className="fas fa-quote-left text-slate-400 text-sm mt-1"></i>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 leading-relaxed mb-2">
                        Olá a todos, bem-vindos à nossa apresentação sobre as tendências do mercado financeiro para 2025. Hoje vamos abordar os principais indicadores macroeconômicos que impactam o setor...
                      </p>
                      <p className="text-xs text-slate-500">Transcrição de: apresentacao-mercado-financeiro.mp3 • 00:00 - 00:15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                    <button className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition border border-slate-200">
                      <i className="fas fa-copy mr-1"></i>
                      Copiar
                    </button>
                    <button className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition border border-slate-200">
                      <i className="fas fa-edit mr-1"></i>
                      Editar
                    </button>
                    <button className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition border border-slate-200">
                      <i className="fas fa-plus mr-1"></i>
                      Inserir no Documento
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Editor Section */}
            <section className="mb-8">
              <div className="bg-white rounded-xl border-2 border-slate-300 overflow-hidden">
                <div className="px-6 py-3 border-b-2 border-slate-300 flex items-center gap-2 bg-slate-50">
                  <div className="flex items-center gap-1 border-r-2 border-slate-200 pr-3">
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Negrito">
                      <i className="fas fa-bold text-sm"></i>
                    </button>
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Itálico">
                      <i className="fas fa-italic text-sm"></i>
                    </button>
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Sublinhado">
                      <i className="fas fa-underline text-sm"></i>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 border-r-2 border-slate-200 pr-3">
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Título 1">
                      <span className="text-sm font-semibold">H1</span>
                    </button>
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Título 2">
                      <span className="text-sm font-semibold">H2</span>
                    </button>
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Título 3">
                      <span className="text-sm font-semibold">H3</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 border-r-2 border-slate-200 pr-3">
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Lista com marcadores">
                      <i className="fas fa-list-ul text-sm"></i>
                    </button>
                    <button className="w-8 h-8 text-slate-600 hover:bg-slate-200 rounded flex items-center justify-center transition" title="Lista numerada">
                      <i className="fas fa-list-ol text-sm"></i>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded flex items-center gap-2 text-sm font-medium transition" title="Adicionar imagem">
                      <i className="fas fa-image"></i>
                      <span>Imagem</span>
                    </button>
                    <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded flex items-center gap-2 text-sm font-medium transition" title="Adicionar link">
                      <i className="fas fa-link"></i>
                      <span>Link</span>
                    </button>
                  </div>
                </div>

                <div className="p-8 min-h-[400px]">
                  <div className="prose prose-slate max-w-none">
                    {generatedContent ? (
                      <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">{generatedContent}</div>
                    ) : (
                      <p className="text-slate-400 italic">Comece a escrever ou use a IA para gerar conteúdo automaticamente...</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* AI Suggestions */}
            <section className="mb-8">
              <div className="bg-white rounded-xl border-2 border-slate-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#E8E0C5] rounded-lg flex items-center justify-center border-2 border-slate-300">
                    <i className="fas fa-lightbulb text-slate-700"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Sugestões da IA</h3>
                    <p className="text-xs text-slate-500">Melhorias e complementos para seu documento</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#E8E0C5] bg-opacity-30 rounded-lg p-4 border-2 border-slate-300">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-chart-line text-slate-700 mt-1"></i>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 font-medium mb-1">Adicionar gráfico comparativo</p>
                        <p className="text-xs text-slate-600">Que tal incluir um gráfico mostrando a evolução dos índices mencionados?</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition border border-slate-200">
                        Adicionar
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#B8D4E8] bg-opacity-30 rounded-lg p-4 border-2 border-slate-300">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-book text-slate-700 mt-1"></i>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 font-medium mb-1">Adicionar referências</p>
                        <p className="text-xs text-slate-600">Encontramos 3 artigos relevantes da CVM que podem enriquecer seu conteúdo.</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition border border-slate-200">
                        Ver
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#C5E8D4] bg-opacity-30 rounded-lg p-4 border-2 border-slate-300">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-spell-check text-slate-700 mt-1"></i>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 font-medium mb-1">Revisar ortografia e gramática</p>
                        <p className="text-xs text-slate-600">Detectamos 2 possíveis melhorias no texto.</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition border border-slate-200">
                        Revisar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Document Settings */}
            <section className="mb-8">
              <div className="bg-white rounded-xl border-2 border-slate-300 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Configurações do Documento</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                    >
                      <option>Análise de Mercado</option>
                      <option>Relatório de Compliance</option>
                      <option>Estratégia de Investimentos</option>
                      <option>Educacional</option>
                      <option>Notas de Reunião</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Visibilidade</label>
                    <select 
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                    >
                      <option>Privado</option>
                      <option>Compartilhado com equipe</option>
                      <option>Público</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 ${index === 0 ? 'bg-[#B8D4E8]' : index === 1 ? 'bg-[#C5E8D4]' : 'bg-[#D4C5E8]'} text-slate-700 rounded-full text-xs font-medium border-2 border-slate-300 flex items-center gap-2`}
                        >
                          {tag}
                          <button onClick={() => removeTag(tag)}>
                            <i className="fas fa-times cursor-pointer hover:text-slate-900"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Adicionar tag..." 
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}