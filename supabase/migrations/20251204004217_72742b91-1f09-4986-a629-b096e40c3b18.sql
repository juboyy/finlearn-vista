-- Add monthly_price column to newsletters table
ALTER TABLE public.newsletters 
ADD COLUMN monthly_price numeric DEFAULT 0;