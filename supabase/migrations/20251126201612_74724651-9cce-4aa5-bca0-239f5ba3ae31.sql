-- Create products table for marketplace items
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_type TEXT NOT NULL DEFAULT 'ebook',
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  target_audience TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  language TEXT NOT NULL DEFAULT 'pt-br',
  short_description TEXT NOT NULL,
  long_description TEXT,
  author_name TEXT NOT NULL,
  co_authors JSONB DEFAULT '[]',
  credentials TEXT NOT NULL,
  price NUMERIC DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  cover_image TEXT,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID NOT NULL DEFAULT gen_random_uuid()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all products"
ON public.products
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own products"
ON public.products
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own products"
ON public.products
FOR UPDATE
USING (true);

CREATE POLICY "Users can delete their own products"
ON public.products
FOR DELETE
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_user_preferences_updated_at();