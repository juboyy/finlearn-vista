import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Newspaper, BookOpen, Video, Target, Headphones, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentChat } from "@/hooks/useAgentChat";
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
  { label: "Notícias do dia", icon: Newspaper, color: "bg-pastel-blue" },
  { label: "Novos Materiais", icon: BookOpen, color: "bg-pastel-green" },
  { label: "Webinars de hoje", icon: Video, color: "bg-pastel-purple" },
  { label: "Focar nas Metas", icon: Target, color: "bg-pastel-yellow" },
  { label: "Podcasts rolando", icon: Headphones, color: "bg-pastel-pink" },
  { label: "Completar Cursos", icon: Award, color: "bg-pastel-peach" },
];

export const InsightsDoDia = ({ open, onOpenChange }: InsightsDoDiaProps) => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = useAgentChat("Auxiliar do dia");
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
                  onClick={() => handleSend(action.label)}
                  className={`${action.color} hover:bg-pastel-pink text-foreground justify-start h-auto py-3 px-4 transition-colors`}
                  disabled={isLoading}
                >
                  <action.icon size={18} className="mr-3 flex-shrink-0" />
                  <span className="text-sm text-left">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Área do Chat */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <SheetHeader className="border-b border-border p-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-pastel-purple">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" 
                    alt="Auxiliar do dia" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <SheetTitle className="text-xl font-semibold text-foreground">
                    Agente de IA - Auxiliar do dia
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground">Chat em tempo real</p>
                </div>
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
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-pastel-purple">
                        <img 
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" 
                          alt="Auxiliar do dia" 
                          className="w-full h-full object-cover" 
                        />
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
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-pastel-purple">
                      <img 
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" 
                        alt="Auxiliar do dia" 
                        className="w-full h-full object-cover" 
                      />
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