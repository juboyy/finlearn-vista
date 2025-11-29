-- Criar tabela para armazenar alertas de analytics
CREATE TABLE public.analytics_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL, -- 'anomaly', 'threshold', 'trend', 'milestone'
  content_type TEXT NOT NULL, -- 'podcast', 'ebook', 'curso', 'webinar', etc.
  metric_name TEXT NOT NULL, -- 'total_consumed', 'avg_time', 'completion_rate', etc.
  current_value NUMERIC NOT NULL,
  previous_value NUMERIC,
  change_percentage NUMERIC,
  severity TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Habilitar RLS
ALTER TABLE public.analytics_alerts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Usuários podem visualizar seus próprios alertas"
  ON public.analytics_alerts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Sistema pode criar alertas"
  ON public.analytics_alerts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar seus próprios alertas"
  ON public.analytics_alerts
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios alertas"
  ON public.analytics_alerts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_analytics_alerts_user_id ON public.analytics_alerts(user_id);
CREATE INDEX idx_analytics_alerts_created_at ON public.analytics_alerts(created_at DESC);
CREATE INDEX idx_analytics_alerts_is_read ON public.analytics_alerts(is_read) WHERE is_read = false;
CREATE INDEX idx_analytics_alerts_content_type ON public.analytics_alerts(content_type);

-- Trigger para atualizar read_at
CREATE OR REPLACE FUNCTION public.update_analytics_alert_read_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_read = true AND OLD.is_read = false THEN
    NEW.read_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trigger_update_analytics_alert_read_at
  BEFORE UPDATE ON public.analytics_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_analytics_alert_read_at();