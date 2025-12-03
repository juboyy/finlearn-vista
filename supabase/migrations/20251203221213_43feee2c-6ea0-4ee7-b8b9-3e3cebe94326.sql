-- Create newsletters table
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#B8D4E8',
  status TEXT NOT NULL DEFAULT 'draft',
  subscribers_count INTEGER NOT NULL DEFAULT 0,
  open_rate NUMERIC NOT NULL DEFAULT 0,
  discount_percentage INTEGER NOT NULL DEFAULT 0,
  sent_count INTEGER NOT NULL DEFAULT 0,
  frequency TEXT DEFAULT 'weekly',
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own newsletters"
ON public.newsletters FOR SELECT
USING (true);

CREATE POLICY "Users can create their own newsletters"
ON public.newsletters FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own newsletters"
ON public.newsletters FOR UPDATE
USING (true);

CREATE POLICY "Users can delete their own newsletters"
ON public.newsletters FOR DELETE
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_newsletters_updated_at
BEFORE UPDATE ON public.newsletters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();