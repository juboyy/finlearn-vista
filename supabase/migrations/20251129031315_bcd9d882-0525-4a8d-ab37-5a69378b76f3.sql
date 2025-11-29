-- Criar tabela para configurações de notificações de live
CREATE TABLE IF NOT EXISTS public.live_notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  notify_minutes_before INTEGER NOT NULL DEFAULT 15,
  notify_on_start BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.live_notification_preferences ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para live_notification_preferences
CREATE POLICY "Usuários podem visualizar suas próprias preferências de notificação"
ON public.live_notification_preferences
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias preferências de notificação"
ON public.live_notification_preferences
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias preferências de notificação"
ON public.live_notification_preferences
FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_live_notification_preferences_updated_at
BEFORE UPDATE ON public.live_notification_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Criar tabela para follows de lives
CREATE TABLE IF NOT EXISTS public.user_followed_lives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  live_id TEXT NOT NULL,
  live_title TEXT NOT NULL,
  live_scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  presenter_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, live_id)
);

-- Habilitar RLS
ALTER TABLE public.user_followed_lives ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para user_followed_lives
CREATE POLICY "Usuários podem visualizar suas próprias lives seguidas"
ON public.user_followed_lives
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem seguir lives"
ON public.user_followed_lives
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem parar de seguir lives"
ON public.user_followed_lives
FOR DELETE
USING (auth.uid() = user_id);

-- Criar tabela para registrar notificações enviadas
CREATE TABLE IF NOT EXISTS public.live_notifications_sent (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  live_id TEXT NOT NULL,
  notification_type TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, live_id, notification_type)
);

-- Habilitar RLS
ALTER TABLE public.live_notifications_sent ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para live_notifications_sent
CREATE POLICY "Sistema pode inserir registros de notificações enviadas"
ON public.live_notifications_sent
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Usuários podem visualizar suas próprias notificações enviadas"
ON public.live_notifications_sent
FOR SELECT
USING (auth.uid() = user_id);

-- Criar índices para performance
CREATE INDEX idx_user_followed_lives_user_id ON public.user_followed_lives(user_id);
CREATE INDEX idx_user_followed_lives_scheduled_time ON public.user_followed_lives(live_scheduled_time);
CREATE INDEX idx_live_notifications_sent_user_live ON public.live_notifications_sent(user_id, live_id);