-- Create presentations table
CREATE TABLE public.presentations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  target_audience TEXT,
  slides JSONB NOT NULL DEFAULT '[]'::jsonb,
  author_name TEXT NOT NULL DEFAULT 'Usuário',
  author_type TEXT NOT NULL DEFAULT 'individual' CHECK (author_type IN ('individual', 'company')),
  topic TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_presentations_created_at ON public.presentations(created_at DESC);
CREATE INDEX idx_presentations_status ON public.presentations(status);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_presentations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_presentations_updated_at
BEFORE UPDATE ON public.presentations
FOR EACH ROW
EXECUTE FUNCTION public.update_presentations_updated_at();

-- Enable RLS
ALTER TABLE public.presentations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no authentication is implemented)
CREATE POLICY "Presentations are viewable by everyone"
ON public.presentations
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create presentations"
ON public.presentations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update presentations"
ON public.presentations
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete presentations"
ON public.presentations
FOR DELETE
USING (true);