import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LIVEAVATAR_API_URL = 'https://api.liveavatar.com/v1';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const AVATAR_API_KEY = Deno.env.get('AVATAR_API_KEY');
    if (!AVATAR_API_KEY) {
      throw new Error('AVATAR_API_KEY is not configured');
    }

    const body = await req.json();
    const { action, sessionToken } = body;

    // Create session token (FULL mode)
    if (action === 'token') {
      console.log('Creating LiveAvatar session token (FULL mode)...');
      
      const response = await fetch(`${LIVEAVATAR_API_URL}/sessions/token`, {
        method: 'POST',
        headers: {
          'X-API-KEY': AVATAR_API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'FULL',
          avatar_id: body.avatarId || 'default',
          avatar_persona: {
            voice_id: body.voiceId || 'default',
            language: body.language || 'pt-BR',
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token creation error:', errorText);
        throw new Error(`Failed to create token: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Session token created:', data.session_id);

      return new Response(JSON.stringify({
        success: true,
        session_id: data.session_id,
        session_token: data.session_token,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Start session
    if (action === 'start' && sessionToken) {
      console.log('Starting LiveAvatar session...');
      
      const response = await fetch(`${LIVEAVATAR_API_URL}/sessions/start`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Start session error:', errorText);
        throw new Error(`Failed to start session: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Session started, LiveKit URL received');

      return new Response(JSON.stringify({
        success: true,
        livekit_url: data.livekit_url,
        livekit_token: data.livekit_client_token,
        room_name: data.room_name,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Stop session
    if (action === 'stop' && sessionToken) {
      console.log('Stopping LiveAvatar session...');
      
      const response = await fetch(`${LIVEAVATAR_API_URL}/sessions/stop`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      // Don't throw on stop errors, just log
      if (!response.ok) {
        const errorText = await response.text();
        console.warn('Stop session warning:', errorText);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send command to avatar (speak, stop_listening, etc.)
    if (action === 'command' && sessionToken) {
      const { command, payload } = body;
      console.log('Sending command to avatar:', command);
      
      const response = await fetch(`${LIVEAVATAR_API_URL}/sessions/command`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          ...payload,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Command error:', errorText);
        throw new Error(`Failed to send command: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return new Response(JSON.stringify({
        success: true,
        data,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('LiveAvatar Session error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
