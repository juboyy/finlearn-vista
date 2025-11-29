-- Criar tabela para reações em tempo real nas lives
CREATE TABLE IF NOT EXISTS public.live_chat_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_id TEXT NOT NULL,
  user_id TEXT,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'clap', 'fire', 'rocket', 'star')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.live_chat_reactions ENABLE ROW LEVEL SECURITY;

-- Política para visualizar reações (todos podem ver)
CREATE POLICY "Qualquer um pode visualizar reações"
ON public.live_chat_reactions
FOR SELECT
USING (true);

-- Política para inserir reações (usuários autenticados)
CREATE POLICY "Usuários autenticados podem adicionar reações"
ON public.live_chat_reactions
FOR INSERT
WITH CHECK (true);

-- Criar índice para melhor performance nas consultas por live_id
CREATE INDEX idx_live_chat_reactions_live_id ON public.live_chat_reactions(live_id);
CREATE INDEX idx_live_chat_reactions_created_at ON public.live_chat_reactions(created_at DESC);

-- Adicionar tabela ao supabase_realtime para sincronização em tempo real
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_chat_reactions;