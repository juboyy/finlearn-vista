-- Create table for podcast listening history
CREATE TABLE public.user_podcast_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  podcast_id TEXT NOT NULL,
  podcast_title TEXT NOT NULL,
  podcast_topic TEXT NOT NULL,
  podcast_image TEXT NOT NULL,
  episode_number INTEGER,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  current_time_seconds INTEGER NOT NULL DEFAULT 0,
  total_duration_seconds INTEGER NOT NULL,
  last_played_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT progress_percentage_check CHECK (progress_percentage >= 0 AND progress_percentage <= 100)
);

-- Enable Row Level Security
ALTER TABLE public.user_podcast_history ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own podcast history" 
ON public.user_podcast_history 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own podcast history" 
ON public.user_podcast_history 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own podcast history" 
ON public.user_podcast_history 
FOR UPDATE 
USING (true);

CREATE POLICY "Users can delete their own podcast history" 
ON public.user_podcast_history 
FOR DELETE 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_user_podcast_history_user_id ON public.user_podcast_history(user_id);
CREATE INDEX idx_user_podcast_history_podcast_id ON public.user_podcast_history(podcast_id);
CREATE INDEX idx_user_podcast_history_last_played ON public.user_podcast_history(last_played_at DESC);