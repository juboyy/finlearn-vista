-- Create saved_charts table
CREATE TABLE public.saved_charts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  chart_type TEXT NOT NULL,
  chart_data JSONB NOT NULL,
  explanation_id UUID REFERENCES public.chart_explanations(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.saved_charts ENABLE ROW LEVEL SECURITY;

-- Create policy for full access
CREATE POLICY "Permitir acesso completo aos gráficos salvos"
ON public.saved_charts
FOR ALL
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_saved_charts_updated_at
BEFORE UPDATE ON public.saved_charts
FOR EACH ROW
EXECUTE FUNCTION public.update_chart_explanations_updated_at();