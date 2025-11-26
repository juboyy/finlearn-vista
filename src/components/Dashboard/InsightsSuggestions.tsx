import { useState } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AssistantSuggestionCard } from "@/components/Dashboard/AssistantSuggestionCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface InsightsSuggestionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data - insights do Auxiliar do dia
const mockInsights = [
  {
    id: "1",
    user_id: "mock-user",
    title: "Nova tendência em Open Banking",
    content: "O setor de pagamentos digitais está crescendo 45% ao ano. Considere explorar este tema nos seus próximos conteúdos.",
    suggestion_type: "insights" as const,
    priority: "high" as const,
    is_read: false,
    metadata: {},
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user",
    title: "Marina Costa publicou: Análise de DeFi Q1 2025",
    content: "Marina Costa, especialista em cripto que você segue, acaba de publicar um artigo sobre 'Protocolos DeFi e suas aplicações no mercado brasileiro'. Tema alinhado aos seus interesses em blockchain e inovação financeira.",
    suggestion_type: "insights" as const,
    priority: "high" as const,
    is_read: false,
    metadata: { showAuthor: true, authorName: "Marina Costa", articleTitle: "Protocolos DeFi no Brasil" },
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user",
    title: "Continue postando sobre Análise Técnica!",
    content: "Seus últimos 5 posts sobre Análise Técnica geraram uma taxa de engajamento de 78% - 23% acima da sua média. Seu público está altamente interessado neste tema. Continue compartilhando insights sobre padrões gráficos e indicadores técnicos.",
    suggestion_type: "insights" as const,
    priority: "high" as const,
    is_read: false,
    metadata: { showProgress: true, progressValue: 78, progressLabel: "Taxa de engajamento" },
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    user_id: "mock-user",
    title: "Oportunidade: Curso de DeFi",
    content: "Você já completou 80% do curso 'Fundamentos de Finanças Descentralizadas'. Finalize para obter sua certificação!",
    suggestion_type: "learning" as const,
    priority: "medium" as const,
    is_read: false,
    metadata: {},
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    user_id: "mock-user",
    title: "Bacen divulga nova regulamentação PIX",
    content: "O Banco Central anunciou novas regras para o PIX que entram em vigor em 30 dias. Veja o resumo completo no artigo destacado.",
    suggestion_type: "news" as const,
    priority: "high" as const,
    is_read: false,
    metadata: {},
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    user_id: "mock-user",
    title: "Lembrete: Webinar hoje às 15h",
    content: "Não perca o webinar 'Estratégias de Investimento em Renda Fixa' com Ricardo Silva. Começa em 3 horas.",
    suggestion_type: "reminders" as const,
    priority: "high" as const,
    is_read: false,
    metadata: {},
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    user_id: "mock-user",
    title: "Meta de estudos atingida!",
    content: "Parabéns! Você completou sua meta semanal de 12 horas de estudo. Continue assim!",
    suggestion_type: "insights" as const,
    priority: "low" as const,
    is_read: true,
    metadata: {},
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    user_id: "mock-user",
    title: "Artigo em alta: Análise Técnica Avançada",
    content: "O artigo sobre padrões candlestick que você salvou está entre os mais lidos da semana. Ótima escolha!",
    suggestion_type: "insights" as const,
    priority: "low" as const,
    is_read: true,
    metadata: {},
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
];

export const InsightsSuggestions = ({ open, onOpenChange }: InsightsSuggestionsProps) => {
  const [activeTab, setActiveTab] = useState("todas");
  const [insights, setInsights] = useState(mockInsights);

  const unreadCount = insights.filter(i => !i.is_read).length;

  const filteredInsights = activeTab === "nao-lidas" 
    ? insights.filter(s => !s.is_read)
    : activeTab === "insights"
    ? insights.filter(s => s.suggestion_type === "insights")
    : activeTab === "lembretes"
    ? insights.filter(s => s.suggestion_type === "reminders")
    : insights;

  const handleMarkAsRead = (id: string) => {
    setInsights(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
  };

  const handleMarkAllAsRead = () => {
    setInsights(prev => prev.map(i => ({ ...i, is_read: true })));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0">
        <SheetHeader className="border-b border-border p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-foreground">
              Insights do Dia
            </SheetTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-sm text-pastel-blue hover:text-pastel-purple"
              >
                Marcar todas como lidas
              </Button>
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={activeTab === "todas" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("todas")}
              className={activeTab === "todas" ? "bg-pastel-blue hover:bg-pastel-purple" : ""}
            >
              Todas
            </Button>
            <Button
              variant={activeTab === "nao-lidas" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("nao-lidas")}
              className={activeTab === "nao-lidas" ? "bg-pastel-blue hover:bg-pastel-purple" : ""}
            >
              Não lidas {unreadCount > 0 && `(${unreadCount})`}
            </Button>
            <Button
              variant={activeTab === "insights" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("insights")}
              className={activeTab === "insights" ? "bg-pastel-blue hover:bg-pastel-purple" : ""}
            >
              Insights
            </Button>
            <Button
              variant={activeTab === "lembretes" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("lembretes")}
              className={activeTab === "lembretes" ? "bg-pastel-blue hover:bg-pastel-purple" : ""}
            >
              Lembretes
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] px-6 py-4">
          {filteredInsights.length > 0 ? (
            <div className="space-y-4">
              {filteredInsights.map((suggestion) => (
                <AssistantSuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum insight disponível no momento.</p>
              <p className="text-sm mt-2">Volte mais tarde para ver novas sugestões!</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
