import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Trash2, MessageSquare, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentChat } from "@/hooks/useAgentChat";
import { useSavedChartAnalyses } from "@/hooks/useSavedChartAnalyses";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface MetricsAgentChatProps {
  metricType: 'MRR' | 'Churn' | 'Retention' | 'Others';
  onClose: () => void;
  initialContext?: {
    chartTitle?: string;
    chartData?: any[];
    selectionArea?: string;
  };
}

const agentConfig = {
  MRR: {
    name: "Especialista em MRR",
    description: "Análise de Receita Recorrente Mensal",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
    suggestions: [
      "Como interpretar a variação do MRR?",
      "Qual é um bom crescimento de MRR?",
      "Como calcular expansão vs contração?",
      "Estratégias para aumentar o MRR"
    ]
  },
  Churn: {
    name: "Especialista em Churn",
    description: "Análise de Cancelamentos e Retenção",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
    suggestions: [
      "Qual é uma taxa de churn saudável?",
      "Como reduzir o churn rapidamente?",
      "O que fazer com churn involuntário?",
      "Como analisar motivos de cancelamento?"
    ]
  },
  Retention: {
    name: "Especialista em Retenção",
    description: "Análise de Engajamento e Lealdade",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
    suggestions: [
      "Como melhorar a retenção de clientes?",
      "O que é uma boa taxa de retenção?",
      "Como analisar cohorts de retenção?",
      "Estratégias para aumentar lifetime value"
    ]
  },
  Others: {
    name: "Especialista em Métricas",
    description: "Análise de Métricas Complementares",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
    suggestions: [
      "Como calcular CAC vs LTV?",
      "Quais métricas acompanhar primeiro?",
      "Como interpretar correlações entre métricas?",
      "Benchmarks importantes para SaaS"
    ]
  }
};

export const MetricsAgentChat = ({ metricType, onClose, initialContext }: MetricsAgentChatProps) => {
  const [input, setInput] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const agent = agentConfig[metricType];
  const { messages, sendMessage, isLoading, clearMessages } = useAgentChat(agent.name);
  const { saveAnalysis } = useSavedChartAnalyses();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [contextSent, setContextSent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (initialContext && !contextSent && !isLoading) {
      setContextSent(true);
      const contextPrompt = `Analise os seguintes dados do gráfico "${initialContext.chartTitle || 'selecionado'}":

Dados: ${JSON.stringify(initialContext.chartData, null, 2)}

Por favor, forneça:
1. Resumo dos padrões identificados na área selecionada
2. Principais insights e tendências
3. Pontos de atenção ou anomalias
4. Recomendações baseadas nos dados`;

      sendMessage("Análise automática dos dados selecionados", contextPrompt);
    }
  }, [initialContext, contextSent, isLoading, sendMessage]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveAnalysis = async () => {
    console.log("handleSaveAnalysis called");
    console.log("initialContext:", initialContext);
    console.log("messages:", messages);
    
    if (!initialContext || messages.length === 0) {
      toast({
        title: "Nenhuma análise para salvar",
        description: "Aguarde a análise do gráfico ser gerada.",
        variant: "destructive",
      });
      return;
    }
    
    // Find the last assistant message (the analysis)
    const lastAssistantMessage = [...messages].reverse().find(m => m.role === "assistant");
    if (!lastAssistantMessage) {
      toast({
        title: "Nenhuma análise disponível",
        description: "Aguarde a resposta do agente para salvar.",
        variant: "destructive",
      });
      return;
    }

    console.log("Last assistant message:", lastAssistantMessage.content);

    setIsSaving(true);
    try {
      await saveAnalysis(
        initialContext.chartTitle || "Gráfico sem título",
        initialContext.chartData,
        initialContext.selectionArea || null,
        metricType,
        lastAssistantMessage.content
      );
    } catch (error) {
      console.error("Error saving analysis:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className={`bg-gradient-to-br from-card via-card to-card/95 border-2 border-slate-700 rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}>
        {/* Header com gradiente */}
        <div className="relative flex items-center gap-4 p-6 border-b-2 border-slate-700 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 shadow-lg">
              <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{agent.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
          </div>
          <div className="flex gap-2">
            {initialContext && messages.some(m => m.role === "assistant") && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSaveAnalysis}
                disabled={isSaving}
                title="Salvar análise"
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Bookmark size={20} />}
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearMessages}
              title="Limpar histórico"
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Trash2 size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClose}
              className="hover:bg-muted transition-colors"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-background/50 to-background" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-primary" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-2">Olá! Sou o {agent.name}</p>
                <p className="text-sm text-muted-foreground">Como posso ajudar com suas análises de métricas?</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {msg.role === "assistant" && (
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 shadow-sm">
                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm border-2 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-slate-600"
                      : "bg-muted/80 text-foreground border-slate-600"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 shadow-sm">
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-muted/80 rounded-2xl px-5 py-3 flex items-center gap-2 border-2 border-slate-600">
                  <Loader2 className="animate-spin text-primary" size={16} />
                  <span className="text-sm text-muted-foreground">Analisando...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-6 border-t-2 border-slate-700 bg-gradient-to-t from-background/50 to-transparent space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mb-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {agent.suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(suggestion)}
                  className="text-xs px-4 py-2.5 rounded-full bg-primary/5 hover:bg-primary/10 text-foreground border-2 border-slate-600 hover:border-slate-500 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta sobre as métricas..."
              disabled={isLoading}
              className="flex-1 h-12 rounded-xl bg-background/50 border-2 border-slate-600 focus:border-slate-500 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
