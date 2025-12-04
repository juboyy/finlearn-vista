-- Create table for daily insights
CREATE TABLE public.daily_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  insight_type TEXT NOT NULL DEFAULT 'general',
  generated_date DATE NOT NULL DEFAULT CURRENT_DATE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.daily_insights ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own insights or global insights
CREATE POLICY "Users can view insights" 
ON public.daily_insights 
FOR SELECT 
USING (user_id IS NULL OR auth.uid() = user_id);

-- Create policy for inserting insights (service role only via edge function)
CREATE POLICY "Service role can insert insights" 
ON public.daily_insights 
FOR INSERT 
WITH CHECK (true);

-- Create index for efficient daily lookups
CREATE INDEX idx_daily_insights_date ON public.daily_insights(generated_date DESC);
CREATE INDEX idx_daily_insights_user_date ON public.daily_insights(user_id, generated_date DESC);