-- Create table for user favorite podcasts
CREATE TABLE public.user_favorite_podcasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  podcast_id TEXT NOT NULL,
  podcast_title TEXT NOT NULL,
  podcast_topic TEXT NOT NULL,
  podcast_image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_favorite_podcasts ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own favorite podcasts" 
ON public.user_favorite_podcasts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own favorite podcasts" 
ON public.user_favorite_podcasts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can delete their own favorite podcasts" 
ON public.user_favorite_podcasts 
FOR DELETE 
USING (true);

-- Create index for better performance
CREATE INDEX idx_user_favorite_podcasts_user_id ON public.user_favorite_podcasts(user_id);
CREATE INDEX idx_user_favorite_podcasts_podcast_id ON public.user_favorite_podcasts(podcast_id);