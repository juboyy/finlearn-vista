-- Add new fields to presentations table
ALTER TABLE public.presentations
ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_methods JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cover_image TEXT;