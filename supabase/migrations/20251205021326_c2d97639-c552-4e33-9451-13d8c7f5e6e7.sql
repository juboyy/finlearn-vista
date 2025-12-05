-- Create communities table
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  category TEXT,
  privacy TEXT NOT NULL DEFAULT 'public',
  rules JSONB DEFAULT '[]'::jsonb,
  ethics_code TEXT,
  content_types JSONB DEFAULT '[]'::jsonb,
  moderators JSONB DEFAULT '[]'::jsonb,
  invited_creators JSONB DEFAULT '[]'::jsonb,
  allow_member_posts BOOLEAN DEFAULT true,
  require_post_approval BOOLEAN DEFAULT false,
  enable_notifications BOOLEAN DEFAULT true,
  max_members INTEGER,
  status TEXT NOT NULL DEFAULT 'draft',
  members_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view public communities"
ON public.communities
FOR SELECT
USING (privacy = 'public' OR auth.uid() = user_id);

CREATE POLICY "Users can create their own communities"
ON public.communities
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own communities"
ON public.communities
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own communities"
ON public.communities
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_communities_updated_at
BEFORE UPDATE ON public.communities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();