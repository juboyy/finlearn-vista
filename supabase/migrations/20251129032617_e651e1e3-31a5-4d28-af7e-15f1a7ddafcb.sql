-- Adicionar filtros globais padrão para o chat
-- Palavras ofensivas comuns (exemplo básico)
INSERT INTO public.live_chat_filters (filter_type, filter_value, action, is_global)
VALUES 
  ('link', 'http', 'block', true),
  ('link', 'https', 'block', true),
  ('link', 'www\.', 'block', true)
ON CONFLICT DO NOTHING;

-- Criar índice para busca rápida de mensagens deletadas
CREATE INDEX IF NOT EXISTS idx_live_chat_deleted_messages_message_id 
ON public.live_chat_deleted_messages(message_id);

-- Adicionar trigger para atualizar realtime quando mensagem for deletada
CREATE OR REPLACE FUNCTION notify_message_deletion()
RETURNS TRIGGER AS $$
BEGIN
  -- Registrar no deleted_messages já é suficiente
  -- O frontend deve escutar ambas as tabelas
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Comentário: As políticas RLS já permitem que moderadores façam as operações necessárias