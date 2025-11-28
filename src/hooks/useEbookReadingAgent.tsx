import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const useEbookReadingAgent = (ebookTitle: string, ebookContent: string, currentPage: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) return;

      const newUserMessage: Message = { role: "user", content: userMessage };
      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true);

      let assistantContent = "";
      
      try {
        const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ebook-reading-agent`;
        
        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, newUserMessage],
            ebookTitle,
            ebookContent,
            currentPage,
          }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            toast({
              title: "Limite excedido",
              description: "Muitas requisições. Tente novamente em alguns instantes.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
          if (response.status === 402) {
            toast({
              title: "Créditos insuficientes",
              description: "Adicione créditos ao seu workspace para continuar.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
          throw new Error("Falha ao iniciar stream");
        }

        if (!response.body) throw new Error("Sem corpo de resposta");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";
        let streamDone = false;

        const updateAssistantMessage = (content: string) => {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") {
              return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m));
            }
            return [...prev, { role: "assistant", content }];
          });
        };

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;
          
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") {
              streamDone = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                assistantContent += content;
                updateAssistantMessage(assistantContent);
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        toast({
          title: "Erro",
          description: "Falha ao processar mensagem. Tente novamente.",
          variant: "destructive",
        });
        setMessages((prev) => prev.slice(0, -1));
        setIsLoading(false);
      }
    },
    [messages, ebookTitle, ebookContent, currentPage, toast]
  );

  return { messages, isLoading, sendMessage };
};
