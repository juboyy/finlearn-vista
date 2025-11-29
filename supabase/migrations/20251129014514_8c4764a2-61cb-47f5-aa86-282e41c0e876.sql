-- Create table for live chat messages
CREATE TABLE public.live_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  live_id TEXT NOT NULL,
  user_id UUID,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.live_chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for live chat messages
CREATE POLICY "Anyone can view live chat messages" 
ON public.live_chat_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can send messages" 
ON public.live_chat_messages 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_live_chat_messages_live_id ON public.live_chat_messages(live_id);
CREATE INDEX idx_live_chat_messages_created_at ON public.live_chat_messages(created_at DESC);

-- Enable realtime for live chat
ALTER TABLE public.live_chat_messages REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_chat_messages;