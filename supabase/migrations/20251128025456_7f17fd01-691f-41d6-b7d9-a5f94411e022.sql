-- Create storage bucket for event attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-attachments', 'event-attachments', true);

-- Create RLS policies for event attachments bucket
CREATE POLICY "Anyone can view event attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-attachments');

CREATE POLICY "Anyone can upload event attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'event-attachments');

CREATE POLICY "Anyone can update their event attachments"
ON storage.objects FOR UPDATE
USING (bucket_id = 'event-attachments');

CREATE POLICY "Anyone can delete event attachments"
ON storage.objects FOR DELETE
USING (bucket_id = 'event-attachments');

-- Add attachments column to agenda_activities table
ALTER TABLE agenda_activities
ADD COLUMN IF NOT EXISTS attachments jsonb DEFAULT '[]'::jsonb;