import { useState, useCallback } from 'react';
import { toast } from 'sonner';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export const useInfographicChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou seu especialista em mercado de pagamentos. Posso gerar infográficos detalhados sobre tendências, volumes de transação (Pix, Cartões, Boletos) e comparativos de taxas.\n\nO que você gostaria de visualizar hoje?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const streamChat = async (
    userMessage: string,
    onDelta: (deltaText: string) => void,
    onDone: () => void
  ) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-infografico`;

    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ 
        messages: [
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage }
        ] 
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        toast.error('Limite de requisições excedido. Tente novamente mais tarde.');
        throw new Error('Rate limit exceeded');
      }
      if (resp.status === 402) {
        toast.error('Créditos insuficientes. Por favor, adicione créditos ao seu workspace.');
        throw new Error('Payment required');
      }
      throw new Error('Failed to start stream');
    }

    if (!resp.body) throw new Error('No response body');

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split('\n')) {
        if (!raw) continue;
        if (raw.endsWith('\r')) raw = raw.slice(0, -1);
        if (raw.startsWith(':') || raw.trim() === '') continue;
        if (!raw.startsWith('data: ')) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          /* ignore partial leftovers */
        }
      }
    }

    onDone();
  };

  const sendMessage = useCallback(
    async (input: string) => {
      if (!input.trim() || isLoading) return;

      const userMsg: Message = {
        role: 'user',
        content: input,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      let assistantSoFar = '';
      const upsertAssistant = (nextChunk: string) => {
        assistantSoFar += nextChunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
            );
          }
          return [...prev, { role: 'assistant', content: assistantSoFar, timestamp: new Date() }];
        });
      };

      try {
        await streamChat(
          input,
          (chunk) => upsertAssistant(chunk),
          () => setIsLoading(false)
        );
      } catch (e) {
        console.error('Chat error:', e);
        setIsLoading(false);
        toast.error('Erro ao enviar mensagem. Tente novamente.');
      }
    },
    [messages, isLoading]
  );

  return { messages, sendMessage, isLoading };
};
