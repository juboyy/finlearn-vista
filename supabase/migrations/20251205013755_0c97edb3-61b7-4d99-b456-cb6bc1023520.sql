-- Create company_profiles table for company page configuration
CREATE TABLE public.company_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT,
  tagline TEXT,
  description TEXT,
  location TEXT,
  founded_year TEXT,
  employees TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  logo_url TEXT,
  cover_url TEXT,
  primary_color TEXT DEFAULT '#F5D5B8',
  stat1_label TEXT DEFAULT 'Clientes',
  stat1_value TEXT,
  stat2_label TEXT DEFAULT 'Presença',
  stat2_value TEXT,
  stat3_label TEXT DEFAULT 'Ativos',
  stat3_value TEXT,
  stat4_label TEXT DEFAULT 'Países',
  stat4_value TEXT,
  tags TEXT[] DEFAULT '{}',
  areas_atuacao JSONB DEFAULT '[]'::jsonb,
  certificados JSONB DEFAULT '[]'::jsonb,
  redes_sociais JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own company profile"
ON public.company_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own company profile"
ON public.company_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company profile"
ON public.company_profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own company profile"
ON public.company_profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_company_profiles_updated_at
BEFORE UPDATE ON public.company_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();