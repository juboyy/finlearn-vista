-- Criar tabela de moderadores das lives
CREATE TABLE IF NOT EXISTS public.live_moderators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  assigned_by UUID NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  permissions JSONB DEFAULT '{"can_delete_messages": true, "can_timeout_users": true, "can_ban_users": true}'::jsonb,
  UNIQUE(live_id, user_id)
);

-- Criar tabela de usuários banidos
CREATE TABLE IF NOT EXISTS public.live_banned_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  banned_by UUID NOT NULL,
  banned_at TIMESTAMPTZ DEFAULT now(),
  ban_reason TEXT,
  ban_type TEXT CHECK (ban_type IN ('temporary', 'permanent')) DEFAULT 'permanent',
  ban_expires_at TIMESTAMPTZ,
  UNIQUE(live_id, user_id)
);

-- Criar tabela de filtros de chat
CREATE TABLE IF NOT EXISTS public.live_chat_filters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_id TEXT,
  filter_type TEXT CHECK (filter_type IN ('word', 'regex', 'link')) NOT NULL,
  filter_value TEXT NOT NULL,
  action TEXT CHECK (action IN ('block', 'warn', 'flag')) DEFAULT 'block',
  is_global BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Criar tabela de mensagens deletadas (histórico)
CREATE TABLE IF NOT EXISTS public.live_chat_deleted_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL,
  live_id TEXT NOT NULL,
  user_id TEXT,
  user_name TEXT NOT NULL,
  message_content TEXT NOT NULL,
  deleted_by UUID NOT NULL,
  deleted_at TIMESTAMPTZ DEFAULT now(),
  deletion_reason TEXT
);

-- Habilitar RLS
ALTER TABLE public.live_moderators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_banned_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_chat_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_chat_deleted_messages ENABLE ROW LEVEL SECURITY;

-- Políticas para live_moderators
CREATE POLICY "Qualquer um pode visualizar moderadores"
ON public.live_moderators FOR SELECT USING (true);

CREATE POLICY "Apresentadores podem adicionar moderadores"
ON public.live_moderators FOR INSERT
WITH CHECK (auth.uid() = assigned_by);

CREATE POLICY "Apresentadores podem remover moderadores"
ON public.live_moderators FOR DELETE
USING (auth.uid() = assigned_by);

-- Políticas para live_banned_users
CREATE POLICY "Moderadores e apresentadores podem visualizar banidos"
ON public.live_banned_users FOR SELECT USING (true);

CREATE POLICY "Moderadores podem banir usuários"
ON public.live_banned_users FOR INSERT
WITH CHECK (true);

CREATE POLICY "Moderadores podem desbanir usuários"
ON public.live_banned_users FOR DELETE
USING (true);

-- Políticas para live_chat_filters
CREATE POLICY "Qualquer um pode visualizar filtros"
ON public.live_chat_filters FOR SELECT USING (true);

CREATE POLICY "Moderadores podem criar filtros"
ON public.live_chat_filters FOR INSERT
WITH CHECK (true);

CREATE POLICY "Moderadores podem atualizar filtros"
ON public.live_chat_filters FOR UPDATE USING (true);

CREATE POLICY "Moderadores podem deletar filtros"
ON public.live_chat_filters FOR DELETE USING (true);

-- Políticas para live_chat_deleted_messages
CREATE POLICY "Moderadores podem visualizar mensagens deletadas"
ON public.live_chat_deleted_messages FOR SELECT USING (true);

CREATE POLICY "Moderadores podem registrar mensagens deletadas"
ON public.live_chat_deleted_messages FOR INSERT
WITH CHECK (true);

-- Criar índices para performance
CREATE INDEX idx_live_moderators_live_id ON public.live_moderators(live_id);
CREATE INDEX idx_live_moderators_user_id ON public.live_moderators(user_id);
CREATE INDEX idx_live_banned_users_live_id ON public.live_banned_users(live_id);
CREATE INDEX idx_live_banned_users_user_id ON public.live_banned_users(user_id);
CREATE INDEX idx_live_chat_filters_live_id ON public.live_chat_filters(live_id);
CREATE INDEX idx_live_chat_deleted_messages_live_id ON public.live_chat_deleted_messages(live_id);

-- Adicionar tabelas ao realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_moderators;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_banned_users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_chat_deleted_messages;