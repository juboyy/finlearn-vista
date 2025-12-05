-- Create social_profiles table for user social profile data
CREATE TABLE public.social_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  
  -- Basic Info (required fields)
  display_name TEXT,
  professional_title TEXT,
  subtitle TEXT,
  bio TEXT,
  
  -- Location & Institution
  location TEXT,
  institution TEXT,
  member_since TEXT DEFAULT '2024',
  
  -- Images
  avatar_url TEXT,
  cover_url TEXT,
  
  -- Social Links (JSON for flexibility)
  social_links JSONB DEFAULT '{}'::jsonb,
  
  -- Work Experience (JSON array)
  work_experiences JSONB DEFAULT '[]'::jsonb,
  
  -- Contact Options
  contact_message BOOLEAN DEFAULT false,
  contact_audio BOOLEAN DEFAULT false,
  contact_video BOOLEAN DEFAULT false,
  contact_email_enabled BOOLEAN DEFAULT false,
  contact_email TEXT,
  contact_phone TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.social_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own social profile"
ON public.social_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own social profile"
ON public.social_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social profile"
ON public.social_profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social profile"
ON public.social_profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Public profiles can be viewed by anyone
CREATE POLICY "Public profiles are viewable by everyone"
ON public.social_profiles
FOR SELECT
USING (display_name IS NOT NULL AND professional_title IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_social_profiles_updated_at
BEFORE UPDATE ON public.social_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();