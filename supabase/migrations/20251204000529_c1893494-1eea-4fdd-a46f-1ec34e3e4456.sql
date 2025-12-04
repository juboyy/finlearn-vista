-- Adicionar colunas para tipos de produto e canais de distribuição
ALTER TABLE public.newsletters 
ADD COLUMN IF NOT EXISTS product_types text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS distribution_channels text[] DEFAULT '{}';