-- Add column to store content types configuration
ALTER TABLE public.newsletters 
ADD COLUMN IF NOT EXISTS content_types_config jsonb DEFAULT '[]'::jsonb;