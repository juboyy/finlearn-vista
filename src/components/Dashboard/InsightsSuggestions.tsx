import { useState } from "react";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAssistantSuggestions } from "@/hooks/useAssistantSuggestions";
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

export const InsightsSuggestions = ({ open, onOpenChange }: InsightsSuggestionsProps) => {
  const [activeTab, setActiveTab] = useState("todas");
  const { suggestions, loading, unreadCount, markAsRead, markAllAsRead } = useAssistantSuggestions();

  const filteredSuggestions = activeTab === "nao-lidas" 
    ? suggestions.filter(s => !s.is_read)
    : activeTab === "insights"
    ? suggestions.filter(s => s.suggestion_type === "insights")
    : activeTab === "lembretes"
    ? suggestions.filter(s => s.suggestion_type === "reminders")
    : suggestions;

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
                onClick={markAllAsRead}
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
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Carregando insights...
            </div>
          ) : filteredSuggestions.length > 0 ? (
            <div className="space-y-4">
              {filteredSuggestions.map((suggestion) => (
                <AssistantSuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onMarkAsRead={markAsRead}
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
