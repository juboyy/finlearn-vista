-- Create live_polls table
CREATE TABLE IF NOT EXISTS public.live_polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_id TEXT NOT NULL,
  created_by UUID NOT NULL,
  question TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  allow_multiple_votes BOOLEAN DEFAULT false,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create live_poll_options table
CREATE TABLE IF NOT EXISTS public.live_poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES public.live_polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create live_poll_votes table
CREATE TABLE IF NOT EXISTS public.live_poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID NOT NULL REFERENCES public.live_polls(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES public.live_poll_options(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(poll_id, user_id, option_id)
);

-- Enable Row Level Security
ALTER TABLE public.live_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_poll_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for live_polls
CREATE POLICY "Qualquer um pode visualizar enquetes"
  ON public.live_polls FOR SELECT
  USING (true);

CREATE POLICY "Moderadores podem criar enquetes"
  ON public.live_polls FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Criador pode atualizar sua enquete"
  ON public.live_polls FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Criador pode deletar sua enquete"
  ON public.live_polls FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for live_poll_options
CREATE POLICY "Qualquer um pode visualizar opções"
  ON public.live_poll_options FOR SELECT
  USING (true);

CREATE POLICY "Sistema pode criar opções"
  ON public.live_poll_options FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar opções"
  ON public.live_poll_options FOR UPDATE
  USING (true);

CREATE POLICY "Sistema pode deletar opções"
  ON public.live_poll_options FOR DELETE
  USING (true);

-- RLS Policies for live_poll_votes
CREATE POLICY "Qualquer um pode visualizar votos"
  ON public.live_poll_votes FOR SELECT
  USING (true);

CREATE POLICY "Usuários podem votar"
  ON public.live_poll_votes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar seus votos"
  ON public.live_poll_votes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus votos"
  ON public.live_poll_votes FOR DELETE
  USING (auth.uid() = user_id);

-- Add realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_polls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_poll_options;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_poll_votes;