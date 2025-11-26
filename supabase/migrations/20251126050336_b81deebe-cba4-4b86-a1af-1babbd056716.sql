-- Criar tabela para armazenar explicações de gráficos
CREATE TABLE IF NOT EXISTS public.chart_explanations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chart_data JSONB NOT NULL,
  explanation TEXT NOT NULL,
  summary TEXT,
  attention_points TEXT[],
  recommendations TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índice para buscar explicações por data
CREATE INDEX idx_chart_explanations_created_at ON public.chart_explanations(created_at DESC);

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_chart_explanations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Criar trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_chart_explanations_updated_at
  BEFORE UPDATE ON public.chart_explanations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_chart_explanations_updated_at();