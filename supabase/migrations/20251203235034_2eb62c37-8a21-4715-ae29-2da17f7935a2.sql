-- Add tags column to newsletters table
ALTER TABLE public.newsletters 
ADD COLUMN tags text[] DEFAULT '{}'::text[];