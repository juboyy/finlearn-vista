import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Bell, RotateCw, Paperclip, Send, Eye, Download, Save, Lightbulb, Brain, TrendingUp, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function CriarInsights() {
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou seu assistente especializado em insights estratégicos do mercado financeiro. Posso ajudá-lo a identificar tendências, padrões e oportunidades. Sobre qual tema você gostaria de desenvolver insights hoje?',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage: Message = {
        role: 'user',
        content: inputValue,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: 'Analisando os dados do mercado, identifiquei alguns insights relevantes sobre o tema. Vou estruturar as descobertas em categorias: tendências de crescimento, pontos de atenção e oportunidades estratégicas. Posso detalhar algum aspecto específico?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
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

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <SidebarFix />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <Link to="/criar-conteudo" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <nav className="hidden sm:flex items-center text-sm text-muted-foreground">
              <Link to="/meus-agentes" className="hover:text-foreground transition-colors">Agentes</Link>
              <i className="fa-solid fa-chevron-right text-xs mx-3 text-slate-300"></i>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-foreground font-medium">Chat Ativo: Especialista em Insights</span>
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-muted-foreground">
              <i className="fa-solid fa-coins" style={{ color: 'hsl(var(--pastel-yellow))' }}></i>
              <span>1,240 Creditos</span>
            </div>
            <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-card"></span>
            </button>
          </div>
        </header>

        {/* Main Workspace */}
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-4rem)]">
          
          {/* Chat / Interaction Area (Left Side - Fixed) */}
          <section className="flex flex-col w-full max-w-xl bg-card border-r border-border relative z-10 shadow-xl h-full">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg" style={{ 
                    background: `linear-gradient(135deg, hsl(55,55%,65%), hsl(45,60%,55%))` 
                  }}>
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-card" title="Online"></div>
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">Especialista em Insights</h2>
                  <p className="text-xs text-muted-foreground">IA treinada em analise estrategica</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 transition-colors">
                <RotateCw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>

            {/* Chat Messages Scroll Area */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-muted/30">
              
              {messages.map((message, index) => (
                message.role === 'assistant' ? (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ 
                      backgroundColor: 'hsl(55,55%,65%)',
                      borderColor: 'hsl(45,60%,55%)',
                      color: 'hsl(var(--pastel-gray-dark))'
                    }}>
                      <Brain className="w-5 h-5" />
                    </div>
                    <div className="max-w-[85%]">
                      <div className="text-xs text-muted-foreground mb-1 ml-1">Agente - {formatTime(message.timestamp)}</div>
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
                      <div className="text-xs text-muted-foreground mb-1 mr-1 text-right">Voce - {formatTime(message.timestamp)}</div>
                      <div className="p-4 rounded-2xl rounded-tr-none shadow-sm text-sm border relative chat-bubble-right whitespace-pre-wrap" style={{
                        backgroundColor: 'hsl(55,55%,65%)',
                        borderColor: 'hsl(45,60%,55%)',
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
                    backgroundColor: 'hsl(55,55%,65%)',
                    borderColor: 'hsl(45,60%,55%)',
                    color: 'hsl(var(--pastel-gray-dark))'
                  }}>
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="max-w-[85%]">
                    <div className="text-xs text-muted-foreground mb-1 ml-1">Agente - Agora</div>
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
              <div className="relative flex items-end gap-2 bg-muted border rounded-xl p-2 focus-within:ring-2 focus-within:border-transparent transition-shadow shadow-inner focus-within:ring-[hsl(55,55%,65%)]">
                <button className="p-2 text-muted-foreground hover:bg-muted-foreground/10 rounded-lg transition-colors" title="Anexar arquivo" style={{
                  color: 'hsl(45,60%,45%)'
                }}>
                  <Paperclip className="w-4 h-4" />
                </button>
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite sua mensagem para gerar insights..." 
                  className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm text-foreground max-h-32 py-2.5 focus:outline-none placeholder:text-muted-foreground" 
                  rows={1}
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2 text-white rounded-lg transition-colors shadow-sm mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{
                    backgroundColor: 'hsl(45,60%,55%)'
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-2">A IA pode cometer erros. Verifique informacoes importantes.</p>
            </div>
          </section>

          {/* Result / Insights Panel (Right Side) */}
          <section className="hidden lg:flex flex-col flex-1 bg-muted/30 border-l border-border overflow-hidden relative">
            
            {/* Toolbar */}
            <div className="h-[80px] bg-card border-b border-border flex items-center justify-between px-6 shadow-sm z-10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span className="font-medium">Visualizacao de Insights</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground font-medium">
                  <Download className="w-4 h-4 inline mr-2" /> Exportar PDF
                </button>
                <button className="px-5 py-2.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground font-medium">
                  <Save className="w-4 h-4 inline mr-2" /> Salvar Projeto
                </button>
                <button className="px-5 py-2.5 text-sm text-white rounded-lg transition-colors font-medium shadow-sm" style={{
                  backgroundColor: 'hsl(45,60%,55%)'
                }}>
                  Publicar <ArrowLeft className="w-4 h-4 inline ml-2 rotate-180" />
                </button>
              </div>
            </div>

            {/* Insights Display */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="bg-card rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border">
                
                {/* Insights Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-muted">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'hsl(55,55%,85%)' }}>
                    <Lightbulb className="w-4 h-4" style={{ color: 'hsl(45,60%,45%)' }} />
                    <span className="text-sm font-medium" style={{ color: 'hsl(45,60%,35%)' }}>Insights Estrategicos</span>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Tendencias do Mercado de Pagamentos</h1>
                  <p className="text-muted-foreground text-sm">Analise Q1 2025 - Oportunidades e Desafios</p>
                  <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span><i className="fa-solid fa-database mr-1"></i> Fonte: BACEN, ABECS</span>
                    <span><i className="fa-solid fa-calendar mr-1"></i> Atualizado em Jan/2025</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-muted/50 rounded-xl p-4 text-center border border-border">
                    <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'hsl(150,45%,75%)' }}>
                      <TrendingUp className="w-5 h-5" style={{ color: 'hsl(150,45%,35%)' }} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">+32%</p>
                    <p className="text-xs text-muted-foreground">Crescimento Pix</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center border border-border">
                    <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'hsl(210,50%,75%)' }}>
                      <Target className="w-5 h-5" style={{ color: 'hsl(210,50%,35%)' }} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">R$ 2.1T</p>
                    <p className="text-xs text-muted-foreground">Volume Projetado</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center border border-border">
                    <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'hsl(55,55%,75%)' }}>
                      <Zap className="w-5 h-5" style={{ color: 'hsl(55,55%,35%)' }} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">145M</p>
                    <p className="text-xs text-muted-foreground">Usuarios Ativos</p>
                  </div>
                </div>

                {/* Main Chart */}
                <div className="mb-8" style={{ height: '300px' }}>
                  <Plot
                    data={[
                      {
                        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                        y: [85, 92, 98, 105, 115, 125],
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Transacoes Pix (Bi)',
                        line: { color: 'hsl(55,55%,55%)', width: 3 },
                        marker: { size: 8, color: 'hsl(55,55%,55%)' }
                      },
                      {
                        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                        y: [45, 47, 48, 50, 52, 55],
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Cartao de Credito (Bi)',
                        line: { color: 'hsl(210,50%,65%)', width: 3 },
                        marker: { size: 8, color: 'hsl(210,50%,65%)' }
                      }
                    ]}
                    layout={{
                      title: {
                        text: 'Evolucao de Transacoes - 2025',
                        font: { size: 16, color: 'hsl(var(--foreground))' }
                      },
                      paper_bgcolor: 'transparent',
                      plot_bgcolor: 'transparent',
                      font: { color: 'hsl(var(--muted-foreground))' },
                      xaxis: { 
                        gridcolor: 'hsl(var(--border))',
                        tickfont: { color: 'hsl(var(--muted-foreground))' }
                      },
                      yaxis: { 
                        gridcolor: 'hsl(var(--border))',
                        tickfont: { color: 'hsl(var(--muted-foreground))' }
                      },
                      legend: {
                        orientation: 'h',
                        y: -0.2
                      },
                      margin: { t: 50, b: 80, l: 50, r: 30 }
                    }}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/* Key Insights Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-muted/30 rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(150,45%,75%)' }}>
                        <TrendingUp className="w-4 h-4" style={{ color: 'hsl(150,45%,35%)' }} />
                      </div>
                      <h3 className="font-semibold text-foreground">Tendencia de Alta</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">O Pix continua ganhando participacao no mercado, com crescimento acelerado em transacoes de baixo valor.</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(340,50%,80%)' }}>
                        <Target className="w-4 h-4" style={{ color: 'hsl(340,50%,40%)' }} />
                      </div>
                      <h3 className="font-semibold text-foreground">Ponto de Atencao</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Fraudes em transacoes Pix aumentaram 15% - necessidade de investimento em seguranca.</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(55,55%,75%)' }}>
                        <Lightbulb className="w-4 h-4" style={{ color: 'hsl(55,55%,35%)' }} />
                      </div>
                      <h3 className="font-semibold text-foreground">Oportunidade</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Pix parcelado deve movimentar R$ 50Bi em 2025, abrindo espaco para novos produtos.</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(210,50%,75%)' }}>
                        <Zap className="w-4 h-4" style={{ color: 'hsl(210,50%,35%)' }} />
                      </div>
                      <h3 className="font-semibold text-foreground">Acao Recomendada</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Integrar Pix como opcao principal de checkout pode aumentar conversao em 25%.</p>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="bg-muted/50 rounded-xl p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 mt-0.5" style={{ color: 'hsl(55,55%,45%)' }} />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Insight Principal</h4>
                      <p className="text-sm text-muted-foreground">
                        A convergencia entre Pix e cartao de credito atraves do Pix parcelado representa a maior oportunidade de inovacao no setor de pagamentos brasileiro para 2025.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .chat-bubble-left::before {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid hsl(var(--card));
        }
        .chat-bubble-right::before {
          content: '';
          position: absolute;
          top: 0;
          right: -8px;
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid hsl(55,55%,65%);
        }
        .typing-dot {
          animation: typingAnimation 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typingAnimation {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted-foreground)); }
      `}</style>
    </div>
  );
}
