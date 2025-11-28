-- Fix user_id default for agenda_activities table
ALTER TABLE agenda_activities 
ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Also fix for agenda_activity_invitations if needed
-- The invitations table doesn't have user_id, so it's fine