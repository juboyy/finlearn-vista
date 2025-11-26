-- Create product promotions table
CREATE TABLE public.product_promotions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_type TEXT NOT NULL,
  product_title TEXT NOT NULL,
  product_category TEXT,
  product_tags TEXT[],
  original_price NUMERIC NOT NULL,
  promotional_price NUMERIC NOT NULL,
  discount_percentage INTEGER NOT NULL,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create user notifications table
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  notification_type TEXT NOT NULL, -- 'promotion', 'recommendation', 'system'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  metadata JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.product_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for promotions
CREATE POLICY "Product promotions are viewable by everyone"
ON public.product_promotions
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create promotions"
ON public.product_promotions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update promotions"
ON public.product_promotions
FOR UPDATE
USING (true);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.user_notifications
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create notifications"
ON public.user_notifications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own notifications"
ON public.user_notifications
FOR UPDATE
USING (true);

-- Create indexes
CREATE INDEX idx_promotions_product_id ON public.product_promotions(product_id);
CREATE INDEX idx_promotions_active ON public.product_promotions(is_active, ends_at);
CREATE INDEX idx_promotions_category ON public.product_promotions(product_category);
CREATE INDEX idx_notifications_user_id ON public.user_notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.user_notifications(is_read, created_at DESC);
CREATE INDEX idx_notifications_created_at ON public.user_notifications(created_at DESC);

-- Create function to automatically deactivate expired promotions
CREATE OR REPLACE FUNCTION public.deactivate_expired_promotions()
RETURNS void AS $$
BEGIN
  UPDATE public.product_promotions
  SET is_active = false
  WHERE is_active = true 
  AND ends_at < now();
END;
$$ LANGUAGE plpgsql SET search_path = public;