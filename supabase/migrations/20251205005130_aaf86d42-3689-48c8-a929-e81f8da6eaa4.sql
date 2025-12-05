-- Create podcasts table
CREATE TABLE public.podcasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  duration_estimate TEXT,
  tags TEXT[] DEFAULT '{}',
  audio_url TEXT,
  cover_image_url TEXT,
  hosts JSONB DEFAULT '[]',
  guests JSONB DEFAULT '[]',
  publication_date DATE,
  publication_time TIME,
  publication_type TEXT DEFAULT 'draft',
  allow_download BOOLEAN DEFAULT false,
  allow_comments BOOLEAN DEFAULT true,
  notify_followers BOOLEAN DEFAULT true,
  access_type TEXT DEFAULT 'free',
  price NUMERIC DEFAULT 0,
  max_listeners INTEGER,
  slug TEXT,
  meta_description TEXT,
  seo_keywords TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all podcasts" 
ON public.podcasts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own podcasts" 
ON public.podcasts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own podcasts" 
ON public.podcasts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own podcasts" 
ON public.podcasts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_podcasts_updated_at
BEFORE UPDATE ON public.podcasts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for podcast files
INSERT INTO storage.buckets (id, name, public) VALUES ('podcast-files', 'podcast-files', true);

-- Storage policies for podcast files
CREATE POLICY "Anyone can view podcast files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'podcast-files');

CREATE POLICY "Authenticated users can upload podcast files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'podcast-files' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their podcast files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'podcast-files' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their podcast files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'podcast-files' AND auth.role() = 'authenticated');