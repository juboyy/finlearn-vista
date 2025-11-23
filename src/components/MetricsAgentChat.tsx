import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentChat } from "@/hooks/useAgentChat";

interface MetricsAgentChatProps {
  metricType: 'MRR' | 'Churn' | 'Retention' | 'Others';
  onClose: () => void;
}

const agentConfig = {
  MRR: {
    name: "Especialista em MRR",
    description: "Análise de Receita Recorrente Mensal",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
  },
  Churn: {
    name: "Especialista em Churn",
    description: "Análise de Cancelamentos e Retenção",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
  },
  Retention: {
    name: "Especialista em Retenção",
    description: "Análise de Engajamento e Lealdade",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
  },
  Others: {
    name: "Especialista em Métricas",
    description: "Análise de Métricas Complementares",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
  }
};

export const MetricsAgentChat = ({ metricType, onClose }: MetricsAgentChatProps) => {
  const [input, setInput] = useState("");
  const agent = agentConfig[metricType];
  const { messages, sendMessage, isLoading, clearMessages } = useAgentChat(agent.name);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">{agent.name}</h2>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearMessages}
            title="Limpar histórico"
          >
            <Trash2 size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p>Olá! Sou o {agent.name}.</p>
                <p className="text-sm mt-2">Como posso ajudar com suas análises de {metricType}?</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span className="text-sm text-muted-foreground">Analisando...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-6 border-t border-border">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta sobre as métricas..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
