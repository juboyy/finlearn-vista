import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { History, MessageSquare, Trash2, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Conversation {
  id: string;
  ebook_id: string;
  ebook_title: string;
  conversation_title: string | null;
  last_page: number | null;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

interface EbookConversationHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ebookId: string;
  onLoadConversation: (conversationId: string) => void;
}

export const EbookConversationHistory = ({
  open,
  onOpenChange,
  ebookId,
  onLoadConversation,
}: EbookConversationHistoryProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadConversations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("ebook_reading_conversations")
        .select("*")
        .eq("ebook_id", ebookId)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Carregar contagem de mensagens para cada conversa
        const conversationsWithCount = await Promise.all(
          data.map(async (conv) => {
            const { count } = await supabase
              .from("ebook_reading_messages")
              .select("*", { count: "exact", head: true })
              .eq("conversation_id", conv.id);

            return { ...conv, message_count: count || 0 };
          })
        );

        setConversations(conversationsWithCount);
      }
    } catch (error) {
      console.error("Erro ao carregar conversas:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o histórico de conversas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from("ebook_reading_conversations")
        .delete()
        .eq("id", conversationId);

      if (error) throw error;

      toast({
        title: "Conversa excluída",
        description: "A conversa foi removida com sucesso.",
      });

      loadConversations();
    } catch (error) {
      console.error("Erro ao excluir conversa:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a conversa.",
        variant: "destructive",
      });
    }
  };

  const handleLoadConversation = (conversationId: string) => {
    onLoadConversation(conversationId);
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      loadConversations();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[600px] flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-pastel-purple/20 flex items-center justify-center">
              <History className="w-6 h-6 text-pastel-purple" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-xl font-semibold text-foreground">
                Histórico de Conversas
              </SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {conversations.length} {conversations.length === 1 ? "conversa" : "conversas"}
              </p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-sm text-muted-foreground">Carregando conversas...</div>
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhuma conversa ainda
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Suas conversas com o Agente de Leitura aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="border border-border rounded-lg p-4 hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate mb-1">
                        {conversation.conversation_title || "Conversa sem título"}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {formatDistanceToNow(new Date(conversation.updated_at), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteConversation(conversation.id)}
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {conversation.message_count} mensagens
                    </Badge>
                    {conversation.last_page && (
                      <Badge variant="outline" className="text-xs">
                        Pág. {conversation.last_page}
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleLoadConversation(conversation.id)}
                  >
                    Retomar conversa
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
