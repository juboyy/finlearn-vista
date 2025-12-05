import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ChevronLeft, 
  Search, 
  MessageSquare, 
  Mic, 
  Trash2, 
  Calendar,
  Clock,
  Bot,
  Filter
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Conversation {
  id: string;
  agent_name: string;
  agent_image: string | null;
  title: string | null;
  messages: Array<{ role: string; content: string }>;
  created_at: string;
  updated_at: string;
}

const HistoricoConversas = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "text" | "voice">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const fetchConversations = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("agent_conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      const parsed = (data || []).map((conv) => ({
        ...conv,
        messages: Array.isArray(conv.messages) 
          ? conv.messages as Array<{ role: string; content: string }>
          : []
      }));

      setConversations(parsed);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Erro ao carregar conversas");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("agent_conversations")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== deleteId));
      if (selectedConversation?.id === deleteId) {
        setSelectedConversation(null);
      }
      toast.success("Conversa excluída com sucesso");
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Erro ao excluir conversa");
    } finally {
      setDeleteId(null);
    }
  };

  const isVoiceConversation = (conv: Conversation) => {
    return conv.title?.includes("[Voz]") || false;
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.agent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages.some(m => m.content.toLowerCase().includes(searchTerm.toLowerCase()));

    const isVoice = isVoiceConversation(conv);
    const matchesType = 
      filterType === "all" || 
      (filterType === "voice" && isVoice) ||
      (filterType === "text" && !isVoice);

    return matchesSearch && matchesType;
  });

  const getConversationPreview = (conv: Conversation) => {
    const lastUserMessage = [...conv.messages].reverse().find(m => m.role === "user");
    return lastUserMessage?.content.substring(0, 100) + (lastUserMessage?.content.length > 100 ? "..." : "") || "Sem mensagens";
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/meus-agentes")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Historico de Conversas</h1>
                <p className="text-sm text-muted-foreground">
                  {conversations.length} conversa{conversations.length !== 1 ? "s" : ""} salva{conversations.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="voice">Voz</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-border bg-card">
            <ScrollArea className="h-full">
              {isLoading ? (
                <div className="divide-y divide-border">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-12 rounded-full" />
                          </div>
                          <Skeleton className="h-3 w-full" />
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm">Nenhuma conversa encontrada</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                        selectedConversation?.id === conv.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          {conv.agent_image ? (
                            <img
                              src={conv.agent_image}
                              alt={conv.agent_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-pastel-blue/30 flex items-center justify-center">
                              <Bot className="h-5 w-5 text-pastel-blue" />
                            </div>
                          )}
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                            isVoiceConversation(conv) ? "bg-pastel-pink/30" : "bg-pastel-green/30"
                          }`}>
                            {isVoiceConversation(conv) ? (
                              <Mic className="h-3 w-3 text-pastel-pink" />
                            ) : (
                              <MessageSquare className="h-3 w-3 text-pastel-green" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground truncate">
                              {conv.agent_name}
                            </span>
                            <Badge variant="outline" className="text-xs bg-pastel-gray-light/30 text-pastel-gray-dark">
                              {isVoiceConversation(conv) ? "Voz" : "Texto"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conv.title?.replace("[Voz] ", "") || getConversationPreview(conv)}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {format(new Date(conv.updated_at), "dd MMM yyyy", { locale: ptBR })}
                            </span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>
                              {format(new Date(conv.updated_at), "HH:mm")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Conversation Detail */}
          <div className="flex-1 bg-background">
            {selectedConversation ? (
              <div className="flex flex-col h-full">
                {/* Detail Header */}
                <div className="border-b border-border px-6 py-4 bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedConversation.agent_image ? (
                        <img
                          src={selectedConversation.agent_image}
                          alt={selectedConversation.agent_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-pastel-blue/30 flex items-center justify-center">
                          <Bot className="h-6 w-6 text-pastel-blue" />
                        </div>
                      )}
                      <div>
                        <h2 className="font-semibold text-foreground">
                          {selectedConversation.agent_name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.title?.replace("[Voz] ", "") || "Conversa salva"}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(selectedConversation.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {selectedConversation.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border border-border text-foreground"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t border-border px-6 py-3 bg-card">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {selectedConversation.messages.length} mensagen{selectedConversation.messages.length !== 1 ? "s" : ""}
                    </span>
                    <span>
                      Criada em {format(new Date(selectedConversation.created_at), "dd/MM/yyyy 'as' HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MessageSquare className="h-16 w-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">Selecione uma conversa</p>
                <p className="text-sm">Escolha uma conversa da lista para visualizar</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conversa?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acao nao pode ser desfeita. A conversa sera permanentemente removida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HistoricoConversas;
