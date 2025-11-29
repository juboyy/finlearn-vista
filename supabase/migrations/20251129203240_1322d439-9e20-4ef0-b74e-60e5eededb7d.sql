-- Criar tabela para preferências de alertas
CREATE TABLE public.analytics_alert_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  threshold_type TEXT NOT NULL DEFAULT 'percentage', -- 'percentage', 'absolute', 'time_based'
  threshold_value NUMERIC NOT NULL,
  threshold_direction TEXT NOT NULL DEFAULT 'both', -- 'increase', 'decrease', 'both'
  alert_frequency TEXT NOT NULL DEFAULT 'immediate', -- 'immediate', 'daily', 'weekly'
  severity_override TEXT, -- 'low', 'medium', 'high', 'critical' (null = auto-detect)
  notification_channels JSONB DEFAULT '["in_app"]'::jsonb, -- ['in_app', 'email', 'push']
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, content_type, metric_name)
);

-- Habilitar RLS
ALTER TABLE public.analytics_alert_preferences ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Usuários podem visualizar suas próprias preferências"
  ON public.analytics_alert_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias preferências"
  ON public.analytics_alert_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias preferências"
  ON public.analytics_alert_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias preferências"
  ON public.analytics_alert_preferences
  FOR DELETE
  USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_alert_preferences_user_id ON public.analytics_alert_preferences(user_id);
CREATE INDEX idx_alert_preferences_content_type ON public.analytics_alert_preferences(content_type);
CREATE INDEX idx_alert_preferences_enabled ON public.analytics_alert_preferences(is_enabled) WHERE is_enabled = true;

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_alert_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trigger_update_alert_preferences_updated_at
  BEFORE UPDATE ON public.analytics_alert_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_alert_preferences_updated_at();

-- Criar preferências padrão para novos usuários (função auxiliar)
CREATE OR REPLACE FUNCTION public.create_default_alert_preferences(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Preferências padrão para podcasts
  INSERT INTO public.analytics_alert_preferences (user_id, content_type, metric_name, threshold_value, threshold_direction)
  VALUES 
    (p_user_id, 'podcast', 'total_consumed', 50, 'both'),
    (p_user_id, 'podcast', 'weekly_consumption', 40, 'decrease');
    
  -- Preferências padrão para e-books
  INSERT INTO public.analytics_alert_preferences (user_id, content_type, metric_name, threshold_value, threshold_direction)
  VALUES 
    (p_user_id, 'ebook', 'completion_rate', 30, 'decrease'),
    (p_user_id, 'ebook', 'avg_time', 40, 'both');
    
  -- Preferências padrão para cursos
  INSERT INTO public.analytics_alert_preferences (user_id, content_type, metric_name, threshold_value, threshold_direction)
  VALUES 
    (p_user_id, 'curso', 'completion_rate', 25, 'decrease'),
    (p_user_id, 'curso', 'weekly_consumption', 35, 'decrease');
END;
$$ LANGUAGE plpgsql SET search_path = public;