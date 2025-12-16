import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const HEYGEN_API_KEY = Deno.env.get('HEYGEN_API_KEY');
    if (!HEYGEN_API_KEY) {
      throw new Error('HEYGEN_API_KEY is not configured');
    }

    const { action, sessionId, text, taskId } = await req.json();

    // Create new streaming session
    if (action === 'create_session') {
      console.log('Creating HeyGen streaming session...');
      
      // First, get an access token
      const tokenResponse = await fetch('https://api.heygen.com/v1/streaming.create_token', {
        method: 'POST',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('Token creation error:', errorText);
        throw new Error(`Failed to create token: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      console.log('Token created successfully');

      // Create a new streaming session
      const sessionResponse = await fetch('https://api.heygen.com/v1/streaming.new', {
        method: 'POST',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quality: 'high',
          avatar_name: 'Wayne_20240711', // Default professional avatar
          voice: {
            voice_id: 'en-US-JennyNeural', // Professional voice
          },
        }),
      });

      if (!sessionResponse.ok) {
        const errorText = await sessionResponse.text();
        console.error('Session creation error:', errorText);
        throw new Error(`Failed to create session: ${sessionResponse.status}`);
      }

      const sessionData = await sessionResponse.json();
      console.log('Session created:', sessionData);

      return new Response(JSON.stringify({
        success: true,
        token: tokenData.data?.token,
        session_id: sessionData.data?.session_id,
        sdp: sessionData.data?.sdp,
        ice_servers: sessionData.data?.ice_servers2 || sessionData.data?.ice_servers,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Start the session
    if (action === 'start_session' && sessionId) {
      console.log('Starting HeyGen session:', sessionId);
      
      const { sdp: clientSdp } = await req.json();
      
      const startResponse = await fetch('https://api.heygen.com/v1/streaming.start', {
        method: 'POST',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          sdp: clientSdp,
        }),
      });

      if (!startResponse.ok) {
        const errorText = await startResponse.text();
        console.error('Start session error:', errorText);
        throw new Error(`Failed to start session: ${startResponse.status}`);
      }

      const startData = await startResponse.json();
      console.log('Session started:', startData);

      return new Response(JSON.stringify({
        success: true,
        sdp: startData.data?.sdp,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send text for avatar to speak
    if (action === 'speak' && sessionId && text) {
      console.log('Sending speak command:', text.substring(0, 50));
      
      const speakResponse = await fetch('https://api.heygen.com/v1/streaming.task', {
        method: 'POST',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          text: text,
          task_type: 'talk',
        }),
      });

      if (!speakResponse.ok) {
        const errorText = await speakResponse.text();
        console.error('Speak error:', errorText);
        throw new Error(`Failed to send speak command: ${speakResponse.status}`);
      }

      const speakData = await speakResponse.json();
      console.log('Speak task created:', speakData);

      return new Response(JSON.stringify({
        success: true,
        task_id: speakData.data?.task_id,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Stop the session
    if (action === 'stop_session' && sessionId) {
      console.log('Stopping HeyGen session:', sessionId);
      
      const stopResponse = await fetch('https://api.heygen.com/v1/streaming.stop', {
        method: 'POST',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
        }),
      });

      if (!stopResponse.ok) {
        const errorText = await stopResponse.text();
        console.error('Stop session error:', errorText);
        // Don't throw, just log - session might already be stopped
      }

      return new Response(JSON.stringify({
        success: true,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // List available avatars
    if (action === 'list_avatars') {
      console.log('Listing available avatars...');
      
      const avatarsResponse = await fetch('https://api.heygen.com/v1/streaming.list', {
        method: 'GET',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
        },
      });

      if (!avatarsResponse.ok) {
        const errorText = await avatarsResponse.text();
        console.error('List avatars error:', errorText);
        throw new Error(`Failed to list avatars: ${avatarsResponse.status}`);
      }

      const avatarsData = await avatarsResponse.json();
      console.log('Avatars listed:', avatarsData);

      return new Response(JSON.stringify({
        success: true,
        avatars: avatarsData.data?.streaming_avatar_list || [],
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('HeyGen Avatar Session error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
