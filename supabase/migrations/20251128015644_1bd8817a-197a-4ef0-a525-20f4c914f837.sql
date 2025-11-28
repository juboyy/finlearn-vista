-- Criar função para atualizar updated_at se não existir
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Tabela para armazenar conversas do Agente de Leitura
CREATE TABLE public.ebook_reading_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  ebook_id TEXT NOT NULL,
  ebook_title TEXT NOT NULL,
  conversation_title TEXT,
  last_page INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para armazenar mensagens das conversas
CREATE TABLE public.ebook_reading_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.ebook_reading_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  page_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_ebook_conversations_user_id ON public.ebook_reading_conversations(user_id);
CREATE INDEX idx_ebook_conversations_ebook_id ON public.ebook_reading_conversations(ebook_id);
CREATE INDEX idx_ebook_messages_conversation_id ON public.ebook_reading_messages(conversation_id);

-- Habilitar RLS
ALTER TABLE public.ebook_reading_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebook_reading_messages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para conversas
CREATE POLICY "Users can view their own conversations"
  ON public.ebook_reading_conversations
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own conversations"
  ON public.ebook_reading_conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own conversations"
  ON public.ebook_reading_conversations
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own conversations"
  ON public.ebook_reading_conversations
  FOR DELETE
  USING (true);

-- Políticas RLS para mensagens
CREATE POLICY "Users can view messages from their conversations"
  ON public.ebook_reading_messages
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create messages in their conversations"
  ON public.ebook_reading_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own messages"
  ON public.ebook_reading_messages
  FOR DELETE
  USING (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_ebook_conversations_updated_at
  BEFORE UPDATE ON public.ebook_reading_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();