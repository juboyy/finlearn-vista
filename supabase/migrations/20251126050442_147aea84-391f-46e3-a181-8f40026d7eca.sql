-- Habilitar RLS na tabela chart_explanations
ALTER TABLE public.chart_explanations ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir acesso completo (já que não há autenticação de usuário nesta feature)
-- Esta tabela armazena apenas explicações geradas pela IA e pode ser acessada publicamente
CREATE POLICY "Permitir acesso completo às explicações de gráficos"
  ON public.chart_explanations
  FOR ALL
  USING (true)
  WITH CHECK (true);