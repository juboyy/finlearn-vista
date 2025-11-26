-- Create contract_summaries table to store generated summaries
CREATE TABLE public.contract_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  summary_type TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  summary_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contract_summaries ENABLE ROW LEVEL SECURITY;

-- Create policies for contract_summaries
CREATE POLICY "Anyone can view contract summaries" 
ON public.contract_summaries 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create contract summaries" 
ON public.contract_summaries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can delete contract summaries" 
ON public.contract_summaries 
FOR DELETE 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_contract_summaries_created_at ON public.contract_summaries(created_at DESC);