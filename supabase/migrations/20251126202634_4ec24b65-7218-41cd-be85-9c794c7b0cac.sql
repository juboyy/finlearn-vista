-- Add fields for Step 2 (Content and Files) to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
ADD COLUMN IF NOT EXISTS main_file_url TEXT,
ADD COLUMN IF NOT EXISTS preview_file_url TEXT,
ADD COLUMN IF NOT EXISTS additional_materials JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS content_samples JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS presentation_video_url TEXT,
ADD COLUMN IF NOT EXISTS drm_protection BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS digital_watermark BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS allow_printing BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS allow_text_copy BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]';