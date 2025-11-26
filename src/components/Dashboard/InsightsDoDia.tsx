import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Newspaper, BookOpen, Video, Target, Headphones, Award, Sparkles, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAgentChat } from "@/hooks/useAgentChat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Progress } from "@/components/ui/progress";
import auxiliarAvatar from "@/assets/auxiliar-do-dia-avatar.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface InsightsDoDiaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickActions = [
  { label: "Notícias do dia", icon: Newspaper, color: "bg-pastel-blue", prompt: "Mostre as principais notícias do mercado financeiro brasileiro hoje, formatadas com títulos, destaques importantes em negrito e links relevantes." },
  { label: "Novos Materiais", icon: BookOpen, color: "bg-pastel-green", prompt: "Liste os novos materiais educacionais disponíveis sobre mercado financeiro, organizados por categoria com descrições breves e links." },
  { label: "Webinars de hoje", icon: Video, color: "bg-pastel-purple", prompt: "Mostre os webinars agendados para hoje sobre mercado financeiro, com horários, tópicos e links para inscrição." },
  { label: "Focar nas Metas", icon: Target, color: "bg-pastel-yellow", prompt: "Mostre meu progresso nas metas da semana com progress bars, destaque o que falta completar e sugira próximas ações prioritárias." },
  { label: "Podcasts rolando", icon: Headphones, color: "bg-pastel-pink", prompt: "Recomende os podcasts mais relevantes sobre mercado financeiro e pagamentos esta semana, com descrição e links formatados com ícone de podcast." },
  { label: "Completar Cursos", icon: Award, color: "bg-pastel-peach", prompt: "Mostre meus cursos em andamento com progress bars de conclusão, destaque o próximo módulo e tempo estimado para finalizar." },
];

export const InsightsDoDia = ({ open, onOpenChange }: InsightsDoDiaProps) => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { messages, sendMessage, isLoading, clearMessages } = useAgentChat("Auxiliar do dia");
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (message?: string) => {
    const messageToSend = message || input;
    if (!messageToSend.trim() || isLoading) return;
    if (!message) setInput("");
    await sendMessage(messageToSend);
  };

  const handleQuickAction = async (action: typeof quickActions[0]) => {
    if (isLoading) return;
    await sendMessage(action.prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleGenerateSuggestions = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-assistant-suggestions');
      
      if (error) throw error;
      
      toast({
        title: "Sugestões geradas!",
        description: `${data.count} novas sugestões foram criadas. Confira em Notificações.`,
      });
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        title: "Erro ao gerar sugestões",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    clearMessages();
    toast({
      title: "Conversa limpa",
      description: "O histórico de mensagens foi removido.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[900px] sm:max-w-[900px] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar Lateral */}
          <div className="w-64 border-r border-border bg-muted/30 p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                O que deseja saber
              </h3>
              <h3 className="text-sm font-semibold text-foreground">
                e fazer hoje?
              </h3>
            </div>
            
            <div className="flex flex-col gap-3 flex-1">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  onClick={() => handleQuickAction(action)}
                  className={`${action.color} hover:bg-pastel-pink text-foreground justify-start h-auto py-3 px-4 transition-colors`}
                  disabled={isLoading}
                >
                  <action.icon size={18} className="mr-3 flex-shrink-0" />
                  <span className="text-sm text-left">{action.label}</span>
                </Button>
              ))}
              
              <Button
                onClick={handleClearChat}
                disabled={messages.length === 0}
                variant="outline"
                className="justify-start h-auto py-3 px-4 mt-2"
              >
                <Trash2 size={18} className="mr-3 flex-shrink-0" />
                <span className="text-sm text-left">Limpar Conversa</span>
              </Button>
            </div>
          </div>

          {/* Área do Chat */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <SheetHeader className="border-b border-border p-6 pb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage 
                    src={auxiliarAvatar} 
                    alt="Auxiliar do dia"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-pastel-purple text-foreground">AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <SheetTitle className="text-xl font-semibold text-foreground">
                    Agente de IA - Auxiliar do dia
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground">Chat em tempo real</p>
                </div>
                <Button
                  onClick={handleGenerateSuggestions}
                  disabled={isGenerating}
                  className="bg-pastel-purple hover:bg-pastel-pink text-foreground"
                  size="sm"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={16} />
                      Gerar Sugestões
                    </>
                  )}
                </Button>
              </div>
            </SheetHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Olá! Sou seu Auxiliar do dia.</p>
                    <p className="text-sm mt-2">Como posso ajudá-lo hoje?</p>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage 
                          src={auxiliarAvatar} 
                          alt="Auxiliar do dia"
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-pastel-purple text-foreground text-xs">AD</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-pastel-purple text-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="prose prose-sm max-w-none dark:prose-invert chat-markdown">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => <h1 className="text-2xl font-bold text-foreground mb-4 mt-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-semibold text-foreground mb-3 mt-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-medium text-foreground mb-2 mt-2">{children}</h3>,
                            p: ({ children }) => <p className="text-sm text-foreground mb-2 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                            strong: ({ children }) => <strong className="font-semibold text-pastel-blue">{children}</strong>,
                            em: ({ children }) => <em className="italic text-pastel-purple">{children}</em>,
                            a: ({ href, children }) => {
                              // Detect podcast links
                              if (href?.includes('podcast') || href?.includes('audio')) {
                                return (
                                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 my-1 bg-pastel-pink rounded-lg hover:bg-pastel-purple transition-colors text-foreground no-underline">
                                    <Headphones size={16} />
                                    <span className="text-sm font-medium">{children}</span>
                                    <ExternalLink size={14} />
                                  </a>
                                );
                              }
                              return (
                                <a href={href} target="_blank" rel="noopener noreferrer" className="text-pastel-blue hover:text-pastel-purple underline inline-flex items-center gap-1">
                                  {children}
                                  <ExternalLink size={12} />
                                </a>
                              );
                            },
                            img: ({ src, alt }) => (
                              <img src={src} alt={alt} className="rounded-lg my-3 max-w-full h-auto border-2 border-pastel-purple/30" />
                            ),
                            code: ({ children, className }) => {
                              // Progress bar syntax: ```progress:75```
                              if (className === 'language-progress') {
                                const value = parseInt(String(children).replace('%', ''));
                                return (
                                  <div className="my-3 space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>Progresso da Meta</span>
                                      <span>{value}%</span>
                                    </div>
                                    <Progress value={value} className="h-3" />
                                  </div>
                                );
                              }
                              return <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{children}</code>;
                            },
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage 
                        src={auxiliarAvatar} 
                        alt="Auxiliar do dia"
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-pastel-purple text-foreground text-xs">AD</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-sm text-muted-foreground">Pensando...</span>
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
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};