-- Create saved_items table for user saved content
CREATE TABLE public.saved_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_title TEXT NOT NULL,
  item_image TEXT,
  item_description TEXT,
  item_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_id, item_type)
);

-- Enable RLS
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own saved items"
ON public.saved_items FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved items"
ON public.saved_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved items"
ON public.saved_items FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_saved_items_updated_at
BEFORE UPDATE ON public.saved_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();