import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Heart, ThumbsUp, Flame, Rocket, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface LiveChatMessage {
  id: string;
  live_id: string;
  user_id: string | null;
  user_name: string;
  user_avatar: string | null;
  message: string;
  created_at: string;
}

interface LiveChatPanelProps {
  liveId: string;
}

const reactions = [
  { type: "like", icon: ThumbsUp, color: "hsl(207, 35%, 55%)", label: "Curtir" },
  { type: "love", icon: Heart, color: "hsl(350, 40%, 60%)", label: "Amar" },
  { type: "clap", icon: Sparkles, color: "hsl(142, 35%, 60%)", label: "Aplaudir" },
  { type: "fire", icon: Flame, color: "hsl(25, 45%, 60%)", label: "Incrível" },
  { type: "rocket", icon: Rocket, color: "hsl(270, 35%, 60%)", label: "Top" },
  { type: "star", icon: Star, color: "hsl(44, 40%, 65%)", label: "Favorito" },
];

export const LiveChatPanel = ({ liveId }: LiveChatPanelProps) => {
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Load existing messages
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("live_chat_messages")
        .select("*")
        .eq("live_id", liveId)
        .order("created_at", { ascending: true })
        .limit(100);

      if (error) {
        console.error("Error loading messages:", error);
        return;
      }

      if (data) {
        setMessages(data);
        setTimeout(scrollToBottom, 100);
      }
    };

    loadMessages();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`live-chat-${liveId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "live_chat_messages",
          filter: `live_id=eq.${liveId}`,
        },
        (payload) => {
          const newMsg = payload.new as LiveChatMessage;
          setMessages((prev) => [...prev, newMsg]);
          setTimeout(scrollToBottom, 100);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [liveId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);

    try {
      const { error } = await supabase.from("live_chat_messages").insert({
        live_id: liveId,
        user_name: "Usuário",
        user_avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        message: newMessage.trim(),
      });

      if (error) throw error;

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendReaction = async (reactionType: string) => {
    try {
      const { error } = await supabase.from("live_chat_reactions").insert({
        live_id: liveId,
        user_name: "Usuário",
        user_avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        reaction_type: reactionType,
      });

      if (error) throw error;

      setIsReactionOpen(false);
      
      toast({
        title: "Reação enviada",
        description: "Sua reação foi compartilhada com todos.",
      });
    } catch (error) {
      console.error("Error sending reaction:", error);
      toast({
        title: "Erro ao enviar reação",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Chat ao Vivo</h3>
        <p className="text-sm text-muted-foreground">{messages.length} mensagens</p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <img
                src={msg.user_avatar || "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png"}
                alt={msg.user_name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">{msg.user_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground break-words">{msg.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending}
            className="flex-1"
          />
          <Popover open={isReactionOpen} onOpenChange={setIsReactionOpen}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="flex-shrink-0 hover:bg-accent/20"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="flex gap-2">
                {reactions.map((reaction) => {
                  const Icon = reaction.icon;
                  return (
                    <Button
                      key={reaction.type}
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform"
                      onClick={() => sendReaction(reaction.type)}
                      title={reaction.label}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: reaction.color }}
                        fill={reaction.color}
                      />
                    </Button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={isSending || !newMessage.trim()}
            className="flex-shrink-0 bg-pastel-purple hover:bg-pastel-purple/80 text-slate-700"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Pressione Enter para enviar
        </p>
      </div>
    </div>
  );
};
