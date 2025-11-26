-- Fix security warning: Set search_path for function
CREATE OR REPLACE FUNCTION update_contract_summary_last_accessed()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.last_accessed_at = now();
  RETURN NEW;
END;
$$;