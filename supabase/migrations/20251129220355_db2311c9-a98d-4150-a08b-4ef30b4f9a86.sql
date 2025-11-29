-- Temporarily allow anyone to insert saved_chart_analyses for demo purposes
DROP POLICY IF EXISTS "Users can create their own chart analyses" ON saved_chart_analyses;

CREATE POLICY "Anyone can create chart analyses"
ON saved_chart_analyses
FOR INSERT
TO public
WITH CHECK (true);

-- Temporarily allow anyone to view all analyses for demo purposes  
DROP POLICY IF EXISTS "Users can view their own chart analyses" ON saved_chart_analyses;

CREATE POLICY "Anyone can view chart analyses"
ON saved_chart_analyses
FOR SELECT
TO public
USING (true);