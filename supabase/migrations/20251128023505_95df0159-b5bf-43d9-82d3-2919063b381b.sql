-- Create table for event invitations
CREATE TABLE public.agenda_activity_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id UUID NOT NULL REFERENCES public.agenda_activities(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  invitee_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
  invited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.agenda_activity_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for invitations
CREATE POLICY "Users can view invitations for their activities" 
ON public.agenda_activity_invitations 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.agenda_activities 
    WHERE id = activity_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create invitations for their activities" 
ON public.agenda_activity_invitations 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.agenda_activities 
    WHERE id = activity_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update invitations for their activities" 
ON public.agenda_activity_invitations 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.agenda_activities 
    WHERE id = activity_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete invitations for their activities" 
ON public.agenda_activity_invitations 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.agenda_activities 
    WHERE id = activity_id AND user_id = auth.uid()
  )
);

-- Create index for better query performance
CREATE INDEX idx_activity_invitations_activity_id ON public.agenda_activity_invitations(activity_id);
CREATE INDEX idx_activity_invitations_email ON public.agenda_activity_invitations(invitee_email);