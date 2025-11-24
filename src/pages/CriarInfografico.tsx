import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Bell, RotateCw, Paperclip, Send, Eye, Download, Save, CreditCard, Brain, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { useInfographicChat } from "@/hooks/useInfographicChat";

export default function CriarInfografico() {
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { messages, sendMessage, isLoading } = useInfographicChat();

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
                <span className="text-foreground font-medium">Chat Ativo: Especialista em Pagamentos</span>
              </div>
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

        {/* Main Workspace */}
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
                    <CreditCard className="w-6 h-6" />
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
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground font-medium">
                  <Download className="w-4 h-4 inline mr-2" /> Exportar PNG
                </button>
                <button className="px-5 py-2.5 text-sm text-white rounded-lg transition-colors font-medium shadow-sm" style={{
                  backgroundColor: 'hsl(var(--pastel-purple-btn))'
                }}>
                  <Save className="w-4 h-4 inline mr-2" /> Salvar Projeto
                </button>
              </div>
            </div>

            {/* Infographic Display */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="bg-card rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border">
                
                {/* Infographic Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-muted">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Comparativo: Pix vs Cartão de Crédito</h1>
                  <p className="text-muted-foreground text-sm">E-commerce Brasileiro • Volume Financeiro 2024 + Projeção Q1 2025</p>
                  <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span><i className="fa-solid fa-database mr-1"></i> Fonte: BACEN</span>
                    <span><i className="fa-solid fa-calendar mr-1"></i> Atualizado em Jan/2025</span>
                  </div>
                </div>

                {/* Main Chart */}
                <div className="mb-8" style={{ height: '400px' }}>
                  <Plot
                    data={[
                      {
                        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan 25*'],
                        y: [45, 52, 58, 67, 75, 85, 95, 108, 122, 138, 155, 175, 195],
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Pix',
                        line: { color: 'hsl(var(--pastel-purple-btn))', width: 3 },
                        marker: { size: 8, color: 'hsl(var(--pastel-purple-btn))' }
                      },
                      {
                        x: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan 25*'],
                        y: [320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 378, 385],
                        type: 'scatter',
                        mode: 'lines+markers',
                        name: 'Cartão de Crédito',
                        line: { color: 'hsl(var(--muted-foreground))', width: 3 },
                        marker: { size: 8, color: 'hsl(var(--muted-foreground))' }
                      }
                    ]}
                    layout={{
                      title: { text: 'Volume Financeiro Mensal (R$ Bilhões)', font: { size: 16, color: 'hsl(var(--foreground))' } },
                      xaxis: { title: 'Período 2024-2025', gridcolor: 'hsl(var(--border))' },
                      yaxis: { title: 'Volume (R$ Bilhões)', gridcolor: 'hsl(var(--border))' },
                      margin: { t: 60, r: 40, b: 60, l: 70 },
                      plot_bgcolor: 'hsl(var(--card))',
                      paper_bgcolor: 'hsl(var(--card))',
                      showlegend: true,
                      legend: { x: 0.02, y: 0.98 },
                      autosize: true,
                      font: { color: 'hsl(var(--foreground))' }
                    }}
                    config={{ responsive: true, displayModeBar: false, displaylogo: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/* Key Insights Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-5 rounded-xl border" style={{
                    background: `linear-gradient(135deg, hsl(var(--pastel-purple)) 0%, hsl(var(--pastel-purple-btn)) 100%)`,
                    borderColor: 'hsl(var(--pastel-purple-btn))'
                  }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{
                        backgroundColor: 'hsl(var(--pastel-purple-btn))'
                      }}>
                        <i className="fa-solid fa-bolt"></i>
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Crescimento Pix</h3>
                    </div>
                    <p className="text-3xl font-bold mb-1" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>+127%</p>
                    <p className="text-xs" style={{ color: 'hsl(var(--pastel-gray-dark))' }}>Volume YoY em e-commerce</p>
                  </div>

                  <div className="bg-muted p-5 rounded-xl border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-muted-foreground rounded-lg flex items-center justify-center text-white">
                        <i className="fa-solid fa-credit-card"></i>
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">Cartão de Crédito</h3>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">+18%</p>
                    <p className="text-xs text-muted-foreground">Crescimento moderado YoY</p>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="rounded-lg p-4 text-xs border" style={{
                  backgroundColor: 'hsl(var(--pastel-yellow))',
                  borderColor: 'hsl(44 78% 75%)',
                  color: 'hsl(var(--pastel-gray-dark))'
                }}>
                  <Lightbulb className="w-4 h-4 inline mr-2" />
                  <strong>Insight:</strong> O Pix superou o cartão de crédito como método preferido em transações até R$ 200 no e-commerce.
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
          animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: hsl(var(--muted)); }
        ::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground)); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: hsl(var(--foreground)); }
      `}</style>
    </div>
  );
}
