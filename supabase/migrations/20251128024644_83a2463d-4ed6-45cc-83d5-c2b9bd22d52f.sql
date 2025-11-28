-- Temporarily allow public access to agenda_activities for testing
-- These policies should be updated when authentication is implemented

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can create their own activities" ON agenda_activities;
DROP POLICY IF EXISTS "Users can view their own activities" ON agenda_activities;
DROP POLICY IF EXISTS "Users can update their own activities" ON agenda_activities;
DROP POLICY IF EXISTS "Users can delete their own activities" ON agenda_activities;

-- Create temporary public policies
CREATE POLICY "Temporary: Anyone can create activities"
ON agenda_activities FOR INSERT
WITH CHECK (true);

CREATE POLICY "Temporary: Anyone can view activities"
ON agenda_activities FOR SELECT
USING (true);

CREATE POLICY "Temporary: Anyone can update activities"
ON agenda_activities FOR UPDATE
USING (true);

CREATE POLICY "Temporary: Anyone can delete activities"
ON agenda_activities FOR DELETE
USING (true);

-- Do the same for invitations
DROP POLICY IF EXISTS "Users can create invitations for their activities" ON agenda_activity_invitations;
DROP POLICY IF EXISTS "Users can view invitations for their activities" ON agenda_activity_invitations;
DROP POLICY IF EXISTS "Users can update invitations for their activities" ON agenda_activity_invitations;
DROP POLICY IF EXISTS "Users can delete invitations for their activities" ON agenda_activity_invitations;

CREATE POLICY "Temporary: Anyone can create invitations"
ON agenda_activity_invitations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Temporary: Anyone can view invitations"
ON agenda_activity_invitations FOR SELECT
USING (true);

CREATE POLICY "Temporary: Anyone can update invitations"
ON agenda_activity_invitations FOR UPDATE
USING (true);

CREATE POLICY "Temporary: Anyone can delete invitations"
ON agenda_activity_invitations FOR DELETE
USING (true);

-- Also need to make user_id nullable temporarily since we don't have auth
ALTER TABLE agenda_activities 
ALTER COLUMN user_id DROP NOT NULL,
ALTER COLUMN user_id DROP DEFAULT;