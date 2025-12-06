-- Criar tabela para conteúdos de assinatura
CREATE TABLE public.subscription_contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  date TEXT,
  time_duration TEXT,
  status TEXT NOT NULL DEFAULT 'nao-lido',
  image_url TEXT,
  category_bg TEXT DEFAULT '#B8D4E8',
  badge TEXT,
  favorited BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.subscription_contents ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view their own contents" 
ON public.subscription_contents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contents" 
ON public.subscription_contents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contents" 
ON public.subscription_contents 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contents" 
ON public.subscription_contents 
FOR DELETE 
USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_subscription_contents_updated_at
BEFORE UPDATE ON public.subscription_contents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Criar índices para performance
CREATE INDEX idx_subscription_contents_user_id ON public.subscription_contents(user_id);
CREATE INDEX idx_subscription_contents_content_type ON public.subscription_contents(content_type);
CREATE INDEX idx_subscription_contents_status ON public.subscription_contents(status);