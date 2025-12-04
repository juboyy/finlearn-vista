import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Newspaper, BookOpen, Video, Target, Headphones, Award, Sparkles, Trash2, ExternalLink, Tag, History, Clock, Lightbulb, RefreshCw, TrendingUp, BarChart3, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAgentChat } from "@/hooks/useAgentChat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useDailyInsights } from "@/hooks/useDailyInsights";
import { MessageRenderer } from "@/components/Dashboard/MessageRenderer";
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
  { label: "Teste Completo", icon: Sparkles, color: "bg-pastel-purple", prompt: "Mostre um exemplo completo de TODOS os formatos suportados:\n\n# 🎨 Teste de Formatos\n\n## 1. Imagem Gerada\n![Teste](IMAGE_GENERATE:ilustração 2D de mercado financeiro com gráficos, estilo desenho com cores pastel claras)\n\n## 2. Progress Bar\n```progress\n75\n```\n\n## 3. Player de Áudio\n```audio\nhttps://example.com/test-audio.mp3\n```\n\n## 4. Player de Vídeo\n```video\nhttps://example.com/test-video.mp4\n```\n\n## 5. Gráfico de Barras\n```chart-bar\n{\"data\":[{\"name\":\"Jan\",\"value\":100},{\"name\":\"Fev\",\"value\":150},{\"name\":\"Mar\",\"value\":200}],\"dataKey\":\"value\",\"xKey\":\"name\"}\n```\n\n## 6. Gráfico de Linha\n```chart-line\n{\"data\":[{\"name\":\"Q1\",\"value\":50},{\"name\":\"Q2\",\"value\":80},{\"name\":\"Q3\",\"value\":120}],\"dataKey\":\"value\",\"xKey\":\"name\"}\n```\n\n## 7. Gráfico de Pizza\n```chart-pie\n{\"data\":[{\"name\":\"Ações\",\"value\":40},{\"name\":\"Renda Fixa\",\"value\":35},{\"name\":\"Crypto\",\"value\":25}],\"dataKey\":\"value\",\"xKey\":\"name\"}\n```\n\n**Todos os formatos devem aparecer corretamente!**" },
  { label: "Notícias do dia", icon: Newspaper, color: "bg-pastel-blue", prompt: "Mostre as principais notícias do mercado financeiro brasileiro hoje. Para CADA notícia, inclua:\n\n1. Título em ## (h2)\n2. Imagem gerada: ![Notícia](IMAGE_GENERATE:ilustração 2D estilo desenho com cores pastel claras sobre [tema da notícia])\n3. Breve resumo\n4. Link relevante\n\nFormate com markdown rico: use **negrito** para destaques e organize em seções claras." },
  { label: "Novos Materiais", icon: BookOpen, color: "bg-pastel-green", prompt: "Liste os novos materiais educacionais disponíveis sobre mercado financeiro, organizados por categoria com descrições breves e links." },
  { label: "Webinars de hoje", icon: Video, color: "bg-pastel-orange", prompt: "Mostre os webinars agendados para hoje sobre mercado financeiro, com horários, tópicos e links para inscrição." },
  { label: "Focar nas Metas", icon: Target, color: "bg-pastel-yellow", prompt: "Mostre minhas metas com:\n\n## Meta de Hoje\n```progress\n85\n```\n**Status**: 85% concluída\n\n## Meta do Mês\n```progress\n65\n```\n**Status**: 65% concluída\n\n### Metas em Atraso\n1. **Completar Módulo 3** - há 2 dias\n2. **Revisar Relatório** - ontem" },
  { label: "Podcasts rolando", icon: Headphones, color: "bg-pastel-pink", prompt: "Recomende podcasts desta semana:\n\n## Mercados em Foco - EP142\n![Podcast](IMAGE_GENERATE:capa de podcast sobre mercado financeiro, estilo 2D com cores pastel)\n\n*Duração: 45 min*\n\nAnálise da volatilidade nos mercados.\n\n```audio\nhttps://example.com/podcast-ep142.mp3\n```" },
  { label: "Completar Cursos", icon: Award, color: "bg-pastel-peach", prompt: "Mostre cursos em andamento:\n\n## Análise Técnica Avançada\n```progress\n72\n```\n\n**De onde parou**: Módulo 5\n\n### Próximo Vídeo\n**Aula 5.3**: Ombro-Cabeça-Ombro\n\n```video\nhttps://example.com/curso-video.mp4\n```\n\n**Tempo restante**: ~4 horas" },
  { label: "Promoções", icon: Tag, color: "bg-pastel-blue", prompt: "Mostre as promoções de ebooks disponíveis:\n\n## E-books em Promoção\n\n![Ebook Cartões](IMAGE_GENERATE:ilustração estilo desenho 2D com traços de cartão de crédito e gráficos financeiros, cores pastel claras suaves, fundo minimalista)\n\n**Guia Completo dos Cartões de Crédito**\nAutor: Carlos Mendes\n⭐ 4.8 (892 vendas)\n**R$ 79,00**\n\nAprenda tudo sobre cartões de crédito, cashback, milhas e como maximizar seus benefícios no mercado financeiro.\n\n---\n\n![Ebook Risco](IMAGE_GENERATE:ilustração estilo desenho 2D com traços de escudo protetor e gráficos, cores pastel claras suaves, fundo minimalista)\n\n**Gestão de Risco para Iniciantes**\nAutor: Ana Silva\n⭐ 4.6 (654 vendas)\n**R$ 59,00**\n\nDomine as estratégias essenciais de gestão de risco e proteja seus investimentos no mercado financeiro.\n\n---\n\n**Oferta por tempo limitado!** Aproveite os descontos especiais." },
];

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  messages: Array<{ role: string; content: string }>;
}

export const InsightsDoDia = ({ open, onOpenChange }: InsightsDoDiaProps) => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { insights: dailyInsights, loading: loadingInsights, generating: generatingInsights, generateInsights } = useDailyInsights();
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Análise de Mercado - Terça 16/11",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      messages: [
        { role: "user", content: "Quais foram as principais notícias do mercado hoje?" },
        { role: "assistant", content: "As principais notícias incluem a alta do dólar..." }
      ]
    },
    {
      id: "2",
      title: "Dúvidas sobre DeFi",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      messages: [
        { role: "user", content: "Como funcionam os protocolos DeFi?" },
        { role: "assistant", content: "Os protocolos DeFi são contratos inteligentes..." }
      ]
    },
    {
      id: "3",
      title: "Recomendações de Cursos",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      messages: [
        { role: "user", content: "Quais cursos você recomenda para iniciantes?" },
        { role: "assistant", content: "Para iniciantes, recomendo começar com..." }
      ]
    }
  ]);
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
    // Send label as visible message, but prompt as context for the agent
    await sendMessage(action.label, action.prompt);
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
    // Save current conversation to history before clearing
    if (messages.length > 0) {
      const firstUserMessage = messages.find(m => m.role === "user");
      const newHistory: ChatHistory = {
        id: Date.now().toString(),
        title: firstUserMessage?.content.slice(0, 40) + "..." || "Nova conversa",
        timestamp: new Date(),
        messages: [...messages]
      };
      setChatHistory(prev => [newHistory, ...prev]);
    }
    
    clearMessages();
    toast({
      title: "Conversa salva no histórico",
      description: "A conversa foi arquivada e uma nova foi iniciada.",
    });
  };

  const handleLoadHistory = (history: ChatHistory) => {
    // In a real implementation, this would load the messages into the chat
    toast({
      title: "Histórico carregado",
      description: `Conversa "${history.title}" carregada.`,
    });
    setShowHistory(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[900px] sm:max-w-[900px] p-0 overflow-hidden animate-slide-in-right animate-fade-in">
        <div className="flex h-full">
          {/* Sidebar Lateral */}
          <div className="w-64 border-r border-border bg-muted/30 p-6 flex flex-col overflow-hidden">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                O que deseja saber
              </h3>
              <h3 className="text-sm font-semibold text-foreground">
                e fazer hoje?
              </h3>
            </div>

            {/* Toggle between actions and history */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => setShowHistory(false)}
                variant={!showHistory ? "default" : "outline"}
                size="sm"
                className={!showHistory ? "bg-pastel-blue hover:bg-pastel-purple flex-1" : "flex-1"}
              >
                <Sparkles size={14} className="mr-1" />
                Ações
              </Button>
              <Button
                onClick={() => setShowHistory(true)}
                variant={showHistory ? "default" : "outline"}
                size="sm"
                className={showHistory ? "bg-pastel-blue hover:bg-pastel-purple flex-1" : "flex-1"}
              >
                <History size={14} className="mr-1" />
                Histórico
              </Button>
            </div>
            
            <ScrollArea className="flex-1 -mx-6 px-6">
              {!showHistory ? (
                <div className="flex flex-col gap-3 pb-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      onClick={() => handleQuickAction(action)}
                      className={`${action.color} hover:bg-pastel-pink text-foreground justify-start h-auto py-3 px-4 transition-colors max-w-[200px]`}
                      disabled={isLoading}
                    >
                      <action.icon size={18} className="mr-3 flex-shrink-0" />
                      <span className="text-sm text-left truncate">{action.label}</span>
                    </Button>
                  ))}
                  
                  <Button
                    onClick={handleClearChat}
                    disabled={messages.length === 0}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 mt-2 max-w-[200px]"
                  >
                    <Trash2 size={18} className="mr-3 flex-shrink-0" />
                    <span className="text-sm text-left truncate">Salvar e Nova Conversa</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pb-4">
                  {chatHistory.length > 0 ? (
                    chatHistory.map((history) => (
                      <button
                        key={history.id}
                        onClick={() => handleLoadHistory(history)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <Clock size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            {new Intl.DateTimeFormat('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            }).format(history.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {history.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {history.messages.length} mensagens
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <History size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Nenhum histórico ainda</p>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
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
                  <div className="space-y-6">
                    <div className="text-center text-muted-foreground py-4">
                      <p>Ola! Sou seu Auxiliar do dia.</p>
                      <p className="text-sm mt-2">Confira os insights de hoje ou me pergunte algo!</p>
                    </div>
                    
                    {/* Daily Insights Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Lightbulb size={16} className="text-pastel-yellow" />
                          Insights do Dia
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => generateInsights()}
                          disabled={generatingInsights || loadingInsights}
                          className="h-7 px-2"
                        >
                          {generatingInsights ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <RefreshCw size={14} />
                          )}
                        </Button>
                      </div>
                      
                      {loadingInsights || generatingInsights ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="animate-spin text-muted-foreground" size={24} />
                          <span className="ml-2 text-sm text-muted-foreground">
                            {generatingInsights ? "Gerando insights..." : "Carregando..."}
                          </span>
                        </div>
                      ) : dailyInsights.length > 0 ? (
                        <div className="grid gap-3">
                          {dailyInsights.map((insight) => {
                            const typeConfig: Record<string, { icon: typeof TrendingUp; color: string }> = {
                              mercado: { icon: TrendingUp, color: "bg-pastel-green" },
                              economia: { icon: BarChart3, color: "bg-pastel-blue" },
                              investimentos: { icon: Target, color: "bg-pastel-purple" },
                              tendencias: { icon: Sparkles, color: "bg-pastel-pink" },
                              educacao: { icon: GraduationCap, color: "bg-pastel-orange" },
                              general: { icon: Lightbulb, color: "bg-pastel-yellow" },
                            };
                            const config = typeConfig[insight.insight_type] || typeConfig.general;
                            const IconComponent = config.icon;
                            
                            return (
                              <div
                                key={insight.id}
                                className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={() => sendMessage(`Me conte mais sobre: ${insight.title}`)}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-lg ${config.color}`}>
                                    <IconComponent size={16} className="text-foreground" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-foreground mb-1">
                                      {insight.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      {insight.content}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <Lightbulb size={32} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Nenhum insight disponivel</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateInsights()}
                            className="mt-2"
                          >
                            Gerar Insights
                          </Button>
                        </div>
                      )}
                    </div>
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
                        <MessageRenderer content={msg.content} />
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