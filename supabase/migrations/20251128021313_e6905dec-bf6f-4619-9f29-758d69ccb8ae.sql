-- Create table for markdown documents
CREATE TABLE public.markdown_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.markdown_documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own documents"
ON public.markdown_documents
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents"
ON public.markdown_documents
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
ON public.markdown_documents
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
ON public.markdown_documents
FOR DELETE
USING (auth.uid() = user_id);

-- Create table for document chapters
CREATE TABLE public.markdown_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.markdown_documents(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  position integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.markdown_chapters ENABLE ROW LEVEL SECURITY;

-- Create policies for chapters
CREATE POLICY "Users can view chapters of their documents"
ON public.markdown_chapters
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.markdown_documents
    WHERE id = markdown_chapters.document_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create chapters in their documents"
ON public.markdown_chapters
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.markdown_documents
    WHERE id = markdown_chapters.document_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update chapters in their documents"
ON public.markdown_chapters
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.markdown_documents
    WHERE id = markdown_chapters.document_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete chapters from their documents"
ON public.markdown_chapters
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.markdown_documents
    WHERE id = markdown_chapters.document_id
    AND user_id = auth.uid()
  )
);

-- Create trigger for updated_at on markdown_documents
CREATE TRIGGER update_markdown_documents_updated_at
BEFORE UPDATE ON public.markdown_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on markdown_chapters
CREATE TRIGGER update_markdown_chapters_updated_at
BEFORE UPDATE ON public.markdown_chapters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();