-- Create user browsing history table
CREATE TABLE public.user_browsing_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  product_type TEXT NOT NULL, -- 'ebook', 'curso', etc
  product_title TEXT NOT NULL,
  product_category TEXT,
  product_tags TEXT[],
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_spent_seconds INTEGER DEFAULT 0
);

-- Create user purchases table
CREATE TABLE public.user_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  product_type TEXT NOT NULL,
  product_title TEXT NOT NULL,
  product_category TEXT,
  product_tags TEXT[],
  price NUMERIC NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  rating NUMERIC,
  completed BOOLEAN DEFAULT false
);

-- Create user preferences table
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  preferred_categories TEXT[],
  preferred_content_types TEXT[],
  price_range_min NUMERIC DEFAULT 0,
  price_range_max NUMERIC DEFAULT 1000,
  skill_level TEXT DEFAULT 'intermediario',
  interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_browsing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for browsing history
CREATE POLICY "Users can view their own browsing history"
ON public.user_browsing_history
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own browsing history"
ON public.user_browsing_history
FOR INSERT
WITH CHECK (true);

-- RLS Policies for purchases
CREATE POLICY "Users can view their own purchases"
ON public.user_purchases
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own purchases"
ON public.user_purchases
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own purchases"
ON public.user_purchases
FOR UPDATE
USING (true);

-- RLS Policies for preferences
CREATE POLICY "Users can view their own preferences"
ON public.user_preferences
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own preferences"
ON public.user_preferences
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own preferences"
ON public.user_preferences
FOR UPDATE
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_browsing_history_user_id ON public.user_browsing_history(user_id);
CREATE INDEX idx_browsing_history_viewed_at ON public.user_browsing_history(viewed_at DESC);
CREATE INDEX idx_purchases_user_id ON public.user_purchases(user_id);
CREATE INDEX idx_purchases_purchased_at ON public.user_purchases(purchased_at DESC);

-- Create function to update preferences updated_at
CREATE OR REPLACE FUNCTION public.update_user_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for preferences
CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_user_preferences_updated_at();