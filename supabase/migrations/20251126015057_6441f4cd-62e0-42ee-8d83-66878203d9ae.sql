-- Add new columns to contract_summaries table for enhanced tracking
ALTER TABLE contract_summaries
ADD COLUMN last_accessed_at timestamp with time zone DEFAULT now(),
ADD COLUMN processing_time_seconds numeric DEFAULT 0,
ADD COLUMN summary_length_type text DEFAULT 'medium' CHECK (summary_length_type IN ('short', 'medium', 'extensive'));

-- Create index for better query performance
CREATE INDEX idx_contract_summaries_last_accessed ON contract_summaries(last_accessed_at DESC);

-- Create function to update last_accessed_at
CREATE OR REPLACE FUNCTION update_contract_summary_last_accessed()
RETURNS trigger AS $$
BEGIN
  NEW.last_accessed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update last_accessed_at when summary is viewed
CREATE TRIGGER trigger_update_last_accessed
BEFORE UPDATE ON contract_summaries
FOR EACH ROW
WHEN (OLD.summary_content IS DISTINCT FROM NEW.summary_content OR OLD.* IS DISTINCT FROM NEW.*)
EXECUTE FUNCTION update_contract_summary_last_accessed();