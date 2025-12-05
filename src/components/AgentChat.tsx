import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Trash2, Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentChat } from "@/hooks/useAgentChat";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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

interface AgentChatProps {
  agentName: string;
  agentImage: string;
  onClose: () => void;
}

export const AgentChat = ({ agentName, agentImage, onClose }: AgentChatProps) => {
  const [input, setInput] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { messages, sendMessage, isLoading, clearMessages } = useAgentChat(agentName);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleDeleteConversation = () => {
    clearMessages();
    setShowDeleteDialog(false);
    toast({
      title: "Conversa excluída",
      description: "O histórico da conversa foi removido.",
    });
  };

  const handleSaveConversation = () => {
    if (messages.length === 0) {
      toast({
        title: "Nenhuma mensagem",
        description: "Não há mensagens para salvar.",
        variant: "destructive",
      });
      return;
    }

    const conversationData = {
      agentName,
      exportedAt: new Date().toISOString(),
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date().toISOString()
      }))
    };

    const blob = new Blob([JSON.stringify(conversationData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `conversa-${agentName.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Conversa salva",
      description: "O arquivo foi baixado com sucesso.",
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 p-6 border-b border-border">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img src={agentImage} alt={agentName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{agentName}</h2>
              <p className="text-sm text-muted-foreground">Chat em tempo real</p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleSaveConversation} className="cursor-pointer">
                  <Download size={16} className="mr-2" />
                  Salvar conversa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)} 
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 size={16} className="mr-2" />
                  Excluir conversa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p>Inicie uma conversa com {agentName}</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src={agentImage} alt={agentName} className="w-full h-full object-cover" />
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
                    <img src={agentImage} alt={agentName} className="w-full h-full object-cover" />
                  </div>
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
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conversa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita e todo o histórico será perdido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConversation}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
