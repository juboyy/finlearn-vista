import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { useEbookReadingAgent } from "@/hooks/useEbookReadingAgent";
import ReactMarkdown from "react-markdown";

interface EbookReadingAgentChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ebookTitle: string;
  ebookContent: string;
  currentPage: number;
}

export const EbookReadingAgentChat = ({
  open,
  onOpenChange,
  ebookTitle,
  ebookContent,
  currentPage,
}: EbookReadingAgentChatProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const { messages, isLoading, sendMessage } = useEbookReadingAgent(ebookTitle, ebookContent, currentPage);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isLoading) return;
    sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[500px] flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="text-xl font-semibold text-foreground">
            Agente de Leitura
          </SheetTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {ebookTitle} - Página {currentPage}
          </p>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-pastel-blue/20 flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-pastel-blue" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Como posso ajudar?
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Faça perguntas sobre o conteúdo do e-book, peça explicações ou discuta conceitos do mercado financeiro.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-pastel-blue text-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="p-6 pt-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Faça uma pergunta sobre o e-book..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
