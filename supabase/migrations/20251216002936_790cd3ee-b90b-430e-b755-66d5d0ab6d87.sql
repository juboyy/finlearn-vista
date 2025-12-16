-- Adicionar campos à tabela posts
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS author_name text,
ADD COLUMN IF NOT EXISTS read_time text DEFAULT '5 min',
ADD COLUMN IF NOT EXISTS likes integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS comments integer DEFAULT 0;

-- Criar índice para busca por categoria
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);

-- Criar índice para ordenação por data
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

-- Habilitar RLS se ainda não estiver habilitado
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública de posts publicados
DROP POLICY IF EXISTS "Posts publicados são visíveis para todos" ON public.posts;
CREATE POLICY "Posts publicados são visíveis para todos"
ON public.posts
FOR SELECT
USING (visibility = 'public' OR visibility IS NULL);