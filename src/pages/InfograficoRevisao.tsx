import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Bell, Send, Download, Share2, FileText, Bookmark, Edit, CreditCard, User, Check, Brain, RotateCw, Paperclip, Eye, Upload, Image } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import { useInfographicChat } from "@/hooks/useInfographicChat";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export default function InfograficoRevisao() {
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const infographicRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { messages, sendMessage, isLoading } = useInfographicChat();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleDownloadPDF = async () => {
    if (!infographicRef.current) {
      toast.error("Erro ao gerar PDF");
      return;
    }

    setIsGeneratingPDF(true);
    toast.info("Gerando PDF do infográfico...");

    try {
      // Captura o elemento do infográfico
      const canvas = await html2canvas(infographicRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calcula dimensões para o PDF
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Cria o PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      // Adiciona primeira página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Adiciona páginas adicionais se necessário
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Faz o download
      pdf.save('infografico-pagamentos-2024.pdf');
      toast.success("PDF baixado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadPNG = async () => {
    if (!infographicRef.current) {
      toast.error("Erro ao gerar PNG");
      return;
    }

    setIsGeneratingPDF(true);
    toast.info("Gerando PNG em alta resolução...");

    try {
      // Captura o elemento do infográfico com alta resolução
      const canvas = await html2canvas(infographicRef.current, {
        scale: 3, // Alta resolução
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Converte para PNG
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'infografico-pagamentos-2024.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success("PNG baixado com sucesso!");
        }
      }, 'image/png', 1.0); // Qualidade máxima
    } catch (error) {
      console.error("Erro ao gerar PNG:", error);
      toast.error("Erro ao gerar PNG. Tente novamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <SidebarFix />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <Link to="/criar-infografico" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <nav className="hidden sm:flex items-center text-sm text-muted-foreground">
              <Link to="/meus-agentes" className="hover:text-foreground transition-colors">Agentes</Link>
              <i className="fa-solid fa-chevron-right text-xs mx-3 text-slate-300"></i>
              <Link to="/criar-infografico" className="hover:text-foreground transition-colors">Especialista em Pagamentos</Link>
              <i className="fa-solid fa-chevron-right text-xs mx-3 text-slate-300"></i>
              <span className="text-foreground font-medium">Resultado Infográfico</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-muted-foreground">
              <i className="fa-solid fa-coins" style={{ color: 'hsl(var(--pastel-yellow))' }}></i>
              <span>1,240 Créditos</span>
            </div>
            <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-card"></span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-4rem)]">
          
          {/* Chat / Interaction Area (Left Side - Fixed) */}
          <section className="flex flex-col w-full max-w-xl bg-card border-r border-border relative z-10 shadow-xl h-full">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg" style={{ 
                    background: `linear-gradient(135deg, hsl(var(--pastel-purple)), hsl(var(--pastel-purple-btn)))` 
                  }}>
                    <CreditCard className="w-6 h-6" style={{ color: 'hsl(var(--pastel-gray-dark))' }} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-card" title="Online"></div>
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">Especialista em Pagamentos</h2>
                  <p className="text-xs text-muted-foreground">IA treinada em dados do BACEN e ABECS</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 transition-colors">
                <RotateCw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>

            {/* Chat Messages Scroll Area */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-muted/30">
              
              {/* Mensagem 1: Usuário */}
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-border bg-muted">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-full h-full rounded-full object-cover" alt="User" />
                </div>
                <div className="max-w-[85%]">
                  <div className="text-xs text-muted-foreground mb-1 mr-1 text-right">Você • 10:42 AM</div>
                  <div className="p-4 rounded-2xl rounded-tr-none shadow-sm text-sm border relative chat-bubble-right whitespace-pre-wrap" style={{
                    backgroundColor: 'hsl(var(--pastel-purple))',
                    borderColor: 'hsl(var(--pastel-purple-btn))',
                    color: 'hsl(var(--pastel-gray-dark))'
                  }}>
                    Gostaria de um infográfico comparando o crescimento do Pix versus Cartão de Crédito em 2024 para e-commerce.
                  </div>
                </div>
              </div>

              {/* Mensagem 2: Agente perguntando detalhes */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ 
                  backgroundColor: 'hsl(var(--pastel-purple))',
                  borderColor: 'hsl(var(--pastel-purple-btn))',
                  color: 'hsl(var(--pastel-gray-dark))'
                }}>
                  <Brain className="w-5 h-5" />
                </div>
                <div className="max-w-[85%]">
                  <div className="text-xs text-muted-foreground mb-1 ml-1">Agente • 10:42 AM</div>
                  <div className="bg-card p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-foreground border border-border relative chat-bubble-left">
                    <p className="mb-2">Entendido. Para tornar o infográfico mais preciso, preciso de alguns detalhes:</p>
                    <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                      <li>O foco é volume financeiro ou número de transações?</li>
                      <li>Devo incluir projeções para 2025?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mensagem 3: Resposta do usuário */}
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-border bg-muted">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-full h-full rounded-full object-cover" alt="User" />
                </div>
                <div className="max-w-[85%]">
                  <div className="text-xs text-muted-foreground mb-1 mr-1 text-right">Você • 10:44 AM</div>
                  <div className="p-4 rounded-2xl rounded-tr-none shadow-sm text-sm border relative chat-bubble-right whitespace-pre-wrap" style={{
                    backgroundColor: 'hsl(var(--pastel-purple))',
                    borderColor: 'hsl(var(--pastel-purple-btn))',
                    color: 'hsl(var(--pastel-gray-dark))'
                  }}>
                    Foco em volume financeiro (R$) e sim, inclua uma projeção para o Q1 de 2025.
                  </div>
                </div>
              </div>

              {/* Mensagem 4: Sistema confirmando */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ 
                  backgroundColor: 'hsl(var(--pastel-green))',
                  borderColor: 'hsl(144 70% 70%)',
                  color: 'hsl(var(--pastel-gray-dark))'
                }}>
                  <Check className="w-5 h-5" />
                </div>
                <div className="max-w-[85%]">
                  <div className="text-xs text-muted-foreground mb-1 ml-1">Sistema • 10:45 AM</div>
                  <div className="text-sm font-medium" style={{ color: 'hsl(var(--pastel-green-text))' }}>
                    Infográfico gerado com sucesso!
                  </div>
                </div>
              </div>

              {/* Mensagem 5: Opções de ação do agente */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ 
                  backgroundColor: 'hsl(var(--pastel-purple))',
                  borderColor: 'hsl(var(--pastel-purple-btn))',
                  color: 'hsl(var(--pastel-gray-dark))'
                }}>
                  <Brain className="w-5 h-5" />
                </div>
                <div className="max-w-[85%]">
                  <div className="text-xs text-muted-foreground mb-1 ml-1">Agente • 10:45 AM</div>
                  <div className="bg-card p-4 rounded-2xl rounded-tl-none shadow-sm border border-border relative chat-bubble-left">
                    <p className="text-sm font-medium text-foreground mb-3">Como você gostaria de prosseguir com o relatório?</p>
                    <div className="space-y-2">
                      <button 
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium text-foreground transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-3">
                          <FileText className="w-4 h-4" style={{ color: 'hsl(var(--pastel-pink))' }} />
                          <span>{isGeneratingPDF ? "Gerando..." : "Baixar em PDF"}</span>
                        </span>
                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      </button>

                      <button 
                        onClick={handleDownloadPNG}
                        disabled={isGeneratingPDF}
                        className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium text-foreground transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center gap-3">
                          <Image className="w-4 h-4" style={{ color: 'hsl(var(--pastel-blue))' }} />
                          <span>{isGeneratingPDF ? "Gerando..." : "Exportar como PNG"}</span>
                        </span>
                        <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium text-foreground transition-all group">
                        <span className="flex items-center gap-3">
                          <Share2 className="w-4 h-4" style={{ color: 'hsl(var(--pastel-yellow))' }} />
                          <span>Compartilhar Relatório</span>
                        </span>
                        <i className="fa-solid fa-arrow-right text-sm text-muted-foreground group-hover:text-foreground"></i>
                      </button>

                      <button 
                        onClick={() => navigate('/editar-infografico')}
                        className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium text-foreground transition-all group"
                      >
                        <span className="flex items-center gap-3">
                          <Edit className="w-4 h-4" style={{ color: 'hsl(var(--pastel-yellow))' }} />
                          <span>Refinar Análise</span>
                        </span>
                        <i className="fa-solid fa-arrow-right text-sm text-muted-foreground group-hover:text-foreground"></i>
                      </button>

                      <button className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium text-foreground transition-all group">
                        <span className="flex items-center gap-3">
                          <Bookmark className="w-4 h-4" style={{ color: 'hsl(var(--pastel-purple))' }} />
                          <span>Salvar nos Projetos</span>
                        </span>
                        <i className="fa-solid fa-arrow-right text-sm text-muted-foreground group-hover:text-foreground"></i>
                      </button>

                      <button className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium text-foreground transition-all group">
                        <span className="flex items-center gap-3">
                          <Upload className="w-4 h-4" style={{ color: 'hsl(var(--pastel-green))' }} />
                          <span>Publicar na Plataforma</span>
                        </span>
                        <i className="fa-solid fa-arrow-right text-sm text-muted-foreground group-hover:text-foreground"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensagens dinâmicas do chat */}
              {messages.map((message, index) => (
                message.role === 'assistant' ? (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ 
                      backgroundColor: 'hsl(var(--pastel-purple))',
                      borderColor: 'hsl(var(--pastel-purple-btn))',
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                      <Brain className="w-5 h-5" />
                    </div>
                    <div className="max-w-[85%]">
                      <div className="text-xs text-muted-foreground mb-1 ml-1">Agente • {formatTime(message.timestamp)}</div>
                      <div className="bg-card p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-foreground border border-border relative chat-bubble-left whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex gap-4 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-border bg-muted">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-full h-full rounded-full object-cover" alt="User" />
                    </div>
                    <div className="max-w-[85%]">
                      <div className="text-xs text-muted-foreground mb-1 mr-1 text-right">Você • {formatTime(message.timestamp)}</div>
                      <div className="p-4 rounded-2xl rounded-tr-none shadow-sm text-sm border relative chat-bubble-right whitespace-pre-wrap" style={{
                        backgroundColor: 'hsl(var(--pastel-purple))',
                        borderColor: 'hsl(var(--pastel-purple-btn))',
                        color: 'hsl(var(--pastel-gray-dark))'
                      }}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                )
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ 
                    backgroundColor: 'hsl(var(--pastel-purple))',
                    borderColor: 'hsl(var(--pastel-purple-btn))',
                    color: 'hsl(var(--pastel-gray-dark))'
                  }}>
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="max-w-[85%]">
                    <div className="text-xs text-muted-foreground mb-1 ml-1">Agente • Agora</div>
                    <div className="bg-card p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-foreground border border-border relative chat-bubble-left">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full typing-dot" style={{ backgroundColor: 'hsl(var(--muted-foreground))' }}></div>
                          <div className="w-2 h-2 rounded-full typing-dot" style={{ backgroundColor: 'hsl(var(--muted-foreground))' }}></div>
                          <div className="w-2 h-2 rounded-full typing-dot" style={{ backgroundColor: 'hsl(var(--muted-foreground))' }}></div>
                        </div>
                        <span className="text-muted-foreground italic text-xs">Processando...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border shrink-0">
              <div className="relative flex items-end gap-2 bg-muted border rounded-xl p-2 focus-within:ring-2 focus-within:border-transparent transition-shadow shadow-inner focus-within:ring-[hsl(var(--pastel-purple))]">
                <button className="p-2 text-muted-foreground hover:bg-muted-foreground/10 rounded-lg transition-colors" title="Anexar arquivo" style={{
                  color: 'hsl(var(--pastel-purple-text))'
                }}>
                  <Paperclip className="w-4 h-4" />
                </button>
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua mensagem para refinar o infográfico..." 
                  className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm text-foreground max-h-32 py-2.5 focus:outline-none placeholder:text-muted-foreground" 
                  rows={1}
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2 text-white rounded-lg transition-colors shadow-sm mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{
                    backgroundColor: 'hsl(var(--pastel-purple-btn))'
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-2">A IA pode cometer erros. Verifique informações importantes.</p>
            </div>
          </section>

          {/* Result / Infographic Panel (Right Side) */}
          <section className="hidden lg:flex flex-col flex-1 bg-muted/30 border-l border-border overflow-hidden relative">
            
            {/* Toolbar */}
            <div className="h-[80px] bg-card border-b border-border flex items-center justify-between px-6 shadow-sm z-10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span className="font-medium">Visualização</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate('/editar-infografico')}
                  className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-sm text-foreground shadow-sm transition-all"
                >
                  <Edit className="w-3 h-3 inline mr-2" />Editar
                </button>
                <button className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-sm text-foreground shadow-sm transition-all">
                  <Share2 className="w-3 h-3 inline mr-2" />Compartilhar
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="px-3 py-1.5 text-white rounded-lg text-sm hover:opacity-90 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{
                    backgroundColor: 'hsl(var(--pastel-purple-btn))'
                  }}
                >
                  <Download className="w-3 h-3 inline mr-2" />{isGeneratingPDF ? "Gerando..." : "Baixar PDF"}
                </button>
              </div>
            </div>

            {/* Infographic Display */}
            <div className="flex-1 overflow-y-auto p-8">
              <div ref={infographicRef} className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden max-w-6xl mx-auto">
                
                {/* Info Header */}
                <div className="p-10 text-white relative overflow-hidden" style={{
                  background: 'linear-gradient(135deg, hsl(var(--pastel-purple)) 0%, hsl(var(--pastel-purple-btn)) 50%, hsl(var(--pastel-gray-dark)) 100%)'
                }}>
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
                    <p className="text-lg max-w-3xl leading-relaxed opacity-90">Análise profunda do comportamento de pagamentos no e-commerce brasileiro: Pix vs Cartão de Crédito • Volume financeiro, tendências e projeções para 2025.</p>
                  </div>
                </div>

                {/* Executive Summary Cards */}
                <div className="px-10 py-8 bg-gradient-to-b from-muted/30 to-card">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                    <div className="bg-card p-6 rounded-2xl border-2 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'hsl(var(--pastel-green))' }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-green))' }}>
                          <i className="fa-brands fa-pix text-2xl" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                          color: 'hsl(var(--pastel-green-text))',
                          backgroundColor: 'hsl(var(--pastel-green))'
                        }}><i className="fa-solid fa-arrow-up mr-1"></i>+45%</span>
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
                          color: 'hsl(var(--pastel-pink-text))',
                          backgroundColor: 'hsl(var(--pastel-pink))'
                        }}><i className="fa-solid fa-minus mr-1"></i>-8%</span>
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

                {/* Main Content Section */}
                <div className="px-10 py-8 space-y-10">
                  
                  {/* Section 1: Comparative Growth Chart */}
                  <div className="p-8 rounded-3xl border" style={{
                    background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--pastel-purple))/10 100%)',
                    borderColor: 'hsl(var(--border))'
                  }}>
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
                          legend: { x: 0.02, y: 0.98 },
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
                    
                    {/* Market Share Pie */}
                    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
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
                      
                      {/* Legend with values */}
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-green))' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#BBF7D0' }}></div>
                            <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>PIX</span>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>47%</div>
                          <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))/80' }}>R$ 287 Bilhões</div>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-blue))' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#BFDBFE' }}></div>
                            <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Cartão Crédito</span>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>32%</div>
                          <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))/80' }}>R$ 198 Bilhões</div>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-purple))' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E9D5FF' }}></div>
                            <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Cartão Débito</span>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>13%</div>
                          <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))/80' }}>R$ 79 Bilhões</div>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--pastel-yellow))' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FEF08A' }}></div>
                            <span className="text-xs font-semibold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Outros</span>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>8%</div>
                          <div className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))/80' }}>R$ 48 Bilhões</div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Metrics */}
                    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                      <h3 className="text-xl font-bold text-foreground mb-2">Métricas Detalhadas por Método</h3>
                      <p className="text-muted-foreground text-sm mb-6">Comparativo de performance e crescimento</p>
                      
                      <div className="space-y-4">
                        {/* Pix Metrics */}
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
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{
                              backgroundColor: 'hsl(var(--pastel-green))',
                              color: 'hsl(var(--pastel-green-text))'
                            }}>
                              <i className="fa-solid fa-arrow-trend-up mr-1"></i>+45%
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

                        {/* Credit Card Metrics */}
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
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{
                              backgroundColor: 'hsl(var(--pastel-pink))',
                              color: 'hsl(var(--pastel-pink-text))'
                            }}>
                              <i className="fa-solid fa-arrow-trend-down mr-1"></i>-8%
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

                        {/* Debit Card Metrics */}
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
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-muted text-muted-foreground">
                              <i className="fa-solid fa-minus mr-1"></i>-2%
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

                        {/* Private Label Card Metrics */}
                        <div className="border rounded-xl p-5" style={{
                          borderColor: 'hsl(var(--pastel-yellow))',
                          backgroundColor: 'hsl(var(--pastel-yellow))/20'
                        }}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-yellow))' }}>
                                <i className="fa-solid fa-store text-lg" style={{ color: 'hsl(var(--pastel-gray-dark))' }}></i>
                              </div>
                              <div>
                                <div className="font-bold text-foreground">Cartões Private Label</div>
                                <div className="text-xs text-muted-foreground">Marca Própria</div>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{
                              backgroundColor: 'hsl(var(--pastel-green))',
                              color: 'hsl(var(--pastel-green-text))'
                            }}>
                              <i className="fa-solid fa-arrow-trend-up"></i>
                              <span>+12%</span>
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Volume</div>
                              <div className="text-lg font-bold text-foreground">R$ 34Bi</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Transações</div>
                              <div className="text-lg font-bold text-foreground">287M</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Ticket Médio</div>
                              <div className="text-lg font-bold text-foreground">R$ 118</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Growth Rate Comparison */}
                  <div className="p-8 rounded-3xl border" style={{
                    background: 'linear-gradient(135deg, hsl(var(--pastel-purple))/20 0%, hsl(var(--pastel-pink))/20 100%)',
                    borderColor: 'hsl(var(--pastel-purple))'
                  }}>
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
                          text: ['+45%', '-8%', '-2%', '-15%'],
                          textposition: 'outside',
                          textfont: { size: 14, weight: 'bold', color: 'hsl(var(--foreground))' }
                        }]}
                        layout={{
                          title: { text: '', font: { size: 16 } },
                          xaxis: { title: { text: 'Método de Pagamento', standoff: 20 } },
                          yaxis: { title: { text: 'Taxa de Crescimento (%)', standoff: 20 }, gridcolor: 'hsl(var(--border))', zeroline: true, zerolinecolor: 'hsl(var(--muted-foreground))', zerolinewidth: 2 },
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

                {/* Footer Section */}
                <div className="px-10 py-8 text-white" style={{
                  background: 'linear-gradient(135deg, hsl(var(--pastel-gray-dark)) 0%, hsl(var(--pastel-purple-btn)) 100%)'
                }}>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple-btn))' }}>
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold">FinAI Agent</div>
                        <div className="text-xs opacity-80">Powered by Advanced ML Models</div>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="text-sm mb-1 opacity-90">Relatório gerado em 24 de Novembro, 2024 às 10:45 AM</div>
                      <div className="text-xs opacity-70">ID do Relatório: #INF-2024-1124-0001 • Versão 1.0</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      </div>

      <style>{`
        /* Chat Bubble Triangles */
        .chat-bubble-left::after {
          content: '';
          position: absolute;
          left: -8px;
          top: 12px;
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid hsl(var(--card));
        }
        
        .chat-bubble-right::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 12px;
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid hsl(var(--pastel-purple));
        }

        /* Typing Indicator Animation */
        .typing-dot {
          animation: typing 1.4s infinite;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
