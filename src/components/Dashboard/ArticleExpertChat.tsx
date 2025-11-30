import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ArticleExpertChatProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  articleContext: string;
}

export function ArticleExpertChat({ isOpen, onClose, articleTitle, articleContext }: ArticleExpertChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Olá! Sou Sócrates, especialista em ${articleTitle}. Li o artigo completo e estou aqui para esclarecer qualquer dúvida que você tenha sobre o texto. Há algo específico que você gostaria de entender melhor?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const agentAvatar = "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg";

  const quickQuestions = [
    "Quais são as principais modalidades de crédito imobiliário?",
    "Como funciona o Sistema de Amortização Price (SAC)?",
    "Quais documentos são necessários para solicitar financiamento?",
    "Qual a diferença entre taxa fixa e taxa variável?",
    "Como funciona o uso do FGTS no financiamento imobiliário?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setShowQuickActions(false);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("article-expert-chat", {
        body: {
          messages: [...messages, userMessage],
          articleContext: articleContext,
          articleTitle: articleTitle
        }
      });

      if (error) {
        if (error.message?.includes("429")) {
          toast({
            title: "Limite de requisições excedido",
            description: "Por favor, aguarde um momento antes de tentar novamente.",
            variant: "destructive"
          });
        } else if (error.message?.includes("402")) {
          toast({
            title: "Créditos insuficientes",
            description: "Por favor, adicione créditos à sua conta para continuar.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        setIsLoading(false);
        return;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao processar sua mensagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-full md:w-96 bg-card border-l border-border shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-pastel-blue/70">
            <AvatarImage src={agentAvatar} alt="Sócrates" />
            <AvatarFallback className="bg-pastel-blue/60">
              <Bot className="w-5 h-5 text-slate-700" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              Sócrates
              <span className="px-2 py-0.5 bg-pastel-blue/60 border border-pastel-blue/70 text-slate-700 text-xs rounded-full">
                Especialista
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">{articleTitle}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-muted"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <Avatar className="w-8 h-8 border-2 border-pastel-blue/70 flex-shrink-0">
                  <AvatarImage src={agentAvatar} alt="Sócrates" />
                  <AvatarFallback className="bg-pastel-blue/60">
                    <Bot className="w-4 h-4 text-slate-700" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-slate-800 text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Quick Action Buttons */}
          {showQuickActions && messages.length === 1 && !isLoading && (
            <div className="space-y-2 mt-4">
              <p className="text-xs text-muted-foreground font-medium mb-3">Perguntas sugeridas sobre o artigo:</p>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-3 text-sm bg-card border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 border-2 border-pastel-blue/70 flex-shrink-0">
                <AvatarImage src={agentAvatar} alt="Sócrates" />
                <AvatarFallback className="bg-pastel-blue/60">
                  <Bot className="w-4 h-4 text-slate-700" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
