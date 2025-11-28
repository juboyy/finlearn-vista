import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const useEbookReadingAgent = (
  ebookTitle: string,
  ebookContent: string,
  currentPage: number,
  conversationId?: string
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>(conversationId);
  const { toast } = useToast();

  const loadConversation = useCallback(async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from("ebook_reading_messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data) {
        const loadedMessages = data.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }));
        setMessages(loadedMessages);
        setCurrentConversationId(convId);
      }
    } catch (error) {
      console.error("Erro ao carregar conversa:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a conversa.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) return;

      const newUserMessage: Message = { role: "user", content: userMessage };
      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true);

      let assistantContent = "";
      let convId = currentConversationId;

      // Criar nova conversa se não existir
      if (!convId) {
        try {
          const { data: convData, error: convError } = await supabase
            .from("ebook_reading_conversations")
            .insert({
              ebook_id: "ebook-001",
              ebook_title: ebookTitle,
              conversation_title: userMessage.substring(0, 50),
              last_page: currentPage,
            })
            .select()
            .single();

          if (convError) throw convError;
          convId = convData.id;
          setCurrentConversationId(convId);
        } catch (error) {
          console.error("Erro ao criar conversa:", error);
        }
      }

      // Salvar mensagem do usuário
      if (convId) {
        try {
          await supabase.from("ebook_reading_messages").insert({
            conversation_id: convId,
            role: "user",
            content: userMessage,
            page_number: currentPage,
          });
        } catch (error) {
          console.error("Erro ao salvar mensagem:", error);
        }
      }

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

        // Salvar resposta do assistente
        if (convId && assistantContent) {
          try {
            await supabase.from("ebook_reading_messages").insert({
              conversation_id: convId,
              role: "assistant",
              content: assistantContent,
              page_number: currentPage,
            });

            // Atualizar última página da conversa
            await supabase
              .from("ebook_reading_conversations")
              .update({ last_page: currentPage })
              .eq("id", convId);
          } catch (error) {
            console.error("Erro ao salvar resposta:", error);
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
    [messages, ebookTitle, ebookContent, currentPage, currentConversationId, toast]
  );

  return { messages, isLoading, sendMessage, loadConversation, currentConversationId };
};
