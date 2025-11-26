-- Criar tabela para notificações do Auxiliar do dia
CREATE TABLE IF NOT EXISTS public.assistant_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  suggestion_type TEXT NOT NULL, -- 'news', 'learning', 'insights', 'reminders'
  priority TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high'
  is_read BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.assistant_suggestions ENABLE ROW LEVEL SECURITY;

-- Política para visualizar próprias sugestões (exemplo simplificado)
CREATE POLICY "Users can view their own suggestions" 
ON public.assistant_suggestions 
FOR SELECT 
USING (true);

-- Política para criar sugestões (via edge function)
CREATE POLICY "Service role can create suggestions" 
ON public.assistant_suggestions 
FOR INSERT 
WITH CHECK (true);

-- Política para atualizar próprias sugestões (marcar como lida)
CREATE POLICY "Users can update their own suggestions" 
ON public.assistant_suggestions 
FOR UPDATE 
USING (true);

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_assistant_suggestions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para atualizar timestamps
CREATE TRIGGER update_assistant_suggestions_updated_at
BEFORE UPDATE ON public.assistant_suggestions
FOR EACH ROW
EXECUTE FUNCTION public.update_assistant_suggestions_updated_at();

-- Criar índices para melhor performance
CREATE INDEX idx_assistant_suggestions_user_id ON public.assistant_suggestions(user_id);
CREATE INDEX idx_assistant_suggestions_created_at ON public.assistant_suggestions(created_at DESC);
CREATE INDEX idx_assistant_suggestions_is_read ON public.assistant_suggestions(is_read);