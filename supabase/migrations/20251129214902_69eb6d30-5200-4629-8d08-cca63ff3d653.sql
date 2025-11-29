-- Create table for saved chart analyses
CREATE TABLE IF NOT EXISTS public.saved_chart_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  chart_title TEXT NOT NULL,
  chart_data JSONB NOT NULL,
  selection_area TEXT,
  metric_type TEXT NOT NULL,
  analysis_content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.saved_chart_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own chart analyses"
  ON public.saved_chart_analyses
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chart analyses"
  ON public.saved_chart_analyses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chart analyses"
  ON public.saved_chart_analyses
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chart analyses"
  ON public.saved_chart_analyses
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_saved_chart_analyses_user_id ON public.saved_chart_analyses(user_id);
CREATE INDEX idx_saved_chart_analyses_created_at ON public.saved_chart_analyses(created_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_saved_chart_analyses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_saved_chart_analyses_updated_at
  BEFORE UPDATE ON public.saved_chart_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_saved_chart_analyses_updated_at();