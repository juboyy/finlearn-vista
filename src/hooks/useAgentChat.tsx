import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type Message = { role: "user" | "assistant"; content: string };

export const useAgentChat = (agentName: string) => {
  const storageKey = `agent-chat-history-${agentName}`;
  
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages, storageKey]);

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-agent`;

  const sendMessage = useCallback(async (input: string, contextPrompt?: string) => {
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    
    try {
      // Use contextPrompt if provided, otherwise use input
      const messageToSend = contextPrompt || input;
      const messageForBackend: Message = { role: "user", content: messageToSend };
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, messageForBackend],
          agentName 
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        
        if (resp.status === 429) {
          toast({
            title: "Limite excedido",
            description: errorData.error || "Muitas requisições. Aguarde um momento.",
            variant: "destructive",
          });
          setMessages(prev => prev.slice(0, -1));
          setIsLoading(false);
          return;
        }
        
        if (resp.status === 402) {
          toast({
            title: "Créditos insuficientes",
            description: errorData.error || "Por favor, adicione créditos ao seu workspace.",
            variant: "destructive",
          });
          setMessages(prev => prev.slice(0, -1));
          setIsLoading(false);
          return;
        }
        
        throw new Error("Falha ao iniciar stream");
      }

      if (!resp.body) throw new Error("Sem resposta do servidor");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      const upsertAssistant = (nextChunk: string) => {
        assistantSoFar += nextChunk;
        console.log("🔄 Stream chunk received:", nextChunk);
        console.log("📊 Total content so far:", assistantSoFar.length, "chars");
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
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
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Flush final buffer
      console.log("🏁 Stream ended. Final content length:", assistantSoFar.length);
      console.log("📄 Final message preview:", assistantSoFar.substring(0, 300));
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch { /* ignore */ }
        }
      }

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setMessages(prev => prev.slice(0, -1));
      toast({
        title: "Erro",
        description: "Falha ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  }, [messages, agentName, CHAT_URL, toast]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Failed to clear chat history:", error);
    }
  }, [storageKey]);

  return { messages, sendMessage, isLoading, clearMessages };
};
