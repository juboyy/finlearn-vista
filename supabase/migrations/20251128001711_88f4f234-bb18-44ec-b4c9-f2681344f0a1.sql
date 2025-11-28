-- Create ebook_annotations table for user highlights and notes
CREATE TABLE IF NOT EXISTS public.ebook_annotations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  ebook_id TEXT NOT NULL,
  ebook_title TEXT NOT NULL,
  annotation_type TEXT NOT NULL CHECK (annotation_type IN ('highlight', 'note', 'underline')),
  selected_text TEXT NOT NULL,
  annotation_content TEXT,
  highlight_color TEXT DEFAULT '#fef3c7',
  page_number INTEGER,
  chapter_name TEXT,
  position_start INTEGER NOT NULL,
  position_end INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_deleted BOOLEAN DEFAULT false
);

-- Create ebook_bookmarks table for page markers
CREATE TABLE IF NOT EXISTS public.ebook_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT gen_random_uuid(),
  ebook_id TEXT NOT NULL,
  ebook_title TEXT NOT NULL,
  bookmark_name TEXT,
  page_number INTEGER NOT NULL,
  chapter_name TEXT,
  preview_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ebook_annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebook_bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ebook_annotations
CREATE POLICY "Users can view their own annotations"
  ON public.ebook_annotations
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own annotations"
  ON public.ebook_annotations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own annotations"
  ON public.ebook_annotations
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own annotations"
  ON public.ebook_annotations
  FOR DELETE
  USING (true);

-- RLS Policies for ebook_bookmarks
CREATE POLICY "Users can view their own bookmarks"
  ON public.ebook_bookmarks
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own bookmarks"
  ON public.ebook_bookmarks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own bookmarks"
  ON public.ebook_bookmarks
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.ebook_bookmarks
  FOR DELETE
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_ebook_annotations_user_ebook ON public.ebook_annotations(user_id, ebook_id);
CREATE INDEX idx_ebook_annotations_created_at ON public.ebook_annotations(created_at DESC);
CREATE INDEX idx_ebook_bookmarks_user_ebook ON public.ebook_bookmarks(user_id, ebook_id);
CREATE INDEX idx_ebook_bookmarks_page ON public.ebook_bookmarks(page_number);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_ebook_annotations_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_ebook_bookmarks_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_ebook_annotations_updated_at
  BEFORE UPDATE ON public.ebook_annotations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ebook_annotations_updated_at();

CREATE TRIGGER update_ebook_bookmarks_updated_at
  BEFORE UPDATE ON public.ebook_bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_ebook_bookmarks_updated_at();

-- Enable realtime for live sync across devices
ALTER TABLE public.ebook_annotations REPLICA IDENTITY FULL;
ALTER TABLE public.ebook_bookmarks REPLICA IDENTITY FULL;