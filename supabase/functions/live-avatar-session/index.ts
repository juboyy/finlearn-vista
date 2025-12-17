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

    // Cleanup: stop an old session if provided
    if (action === 'cleanup' && sessionToken) {
      console.log('Cleaning up old session before creating new one...');
      
      try {
        const stopResponse = await fetch(`${LIVEAVATAR_API_URL}/sessions/stop`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${sessionToken}`,
          },
        });
        
        if (!stopResponse.ok) {
          const errorText = await stopResponse.text();
          console.warn('Cleanup warning (expected if session expired):', errorText);
        } else {
          console.log('Old session cleaned up successfully');
        }
      } catch (e) {
        console.warn('Cleanup error (non-fatal):', e);
      }
      
      // Small delay to ensure LiveAvatar processes the stop
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create session token (FULL mode)
    if (action === 'token') {
      console.log('Creating LiveAvatar session token (FULL mode)...');
      
      // If old token provided, try to clean it up first
      if (body.oldSessionToken) {
        console.log('Stopping old session before creating new token...');
        try {
          await fetch(`${LIVEAVATAR_API_URL}/sessions/stop`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${body.oldSessionToken}`,
            },
          });
          // Wait a bit for cleanup
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (e) {
          console.warn('Old session cleanup failed (non-fatal):', e);
        }
      }
      
      const response = await fetch(`${LIVEAVATAR_API_URL}/sessions/token`, {
        method: 'POST',
        headers: {
          'X-API-KEY': AVATAR_API_KEY,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'FULL',
          avatar_id: body.avatarId || '6e32f90a-f566-45be-9ec7-a5f6999ee606',
          avatar_persona: {
            voice_id: body.voiceId || 'c84af063-5ce2-4370-8ef8-dcd0ef903d43',
            language: body.language || 'pt-BR',
            context_id: body.contextId || '60c358de-c354-4363-bf75-8c7d1662e8d5',
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token creation error:', errorText);
        throw new Error(`Failed to create token: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Full LiveAvatar token response:', JSON.stringify(data));
      
      // Handle different possible response structures from LiveAvatar API
      const sessionId = data.session_id || data.sessionId || data.id || data.data?.session_id;
      const extractedToken = data.session_token || data.sessionToken || data.token || data.access_token || data.data?.session_token || data.data?.token;
      
      console.log('Extracted session_id:', sessionId);
      console.log('Extracted session_token:', extractedToken ? 'present' : 'missing');

      if (!extractedToken) {
        throw new Error('No session token in API response');
      }

      return new Response(JSON.stringify({
        success: true,
        session_id: sessionId,
        session_token: extractedToken,
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

         // Handle vendor-side concurrency limit gracefully (avoid 500)
         try {
           const parsed = JSON.parse(errorText);
           if (response.status === 403 && parsed?.code === 4003) {
             return new Response(
               JSON.stringify({
                 success: false,
                 code: 4003,
                 error: 'Session concurrency limit reached',
               }),
               {
                 // Keep 200 so the client can handle via data.success without throwing a transport error
                 status: 200,
                 headers: { ...corsHeaders, 'Content-Type': 'application/json' },
               }
             );
           }
         } catch {
           // ignore JSON parse errors
         }

         throw new Error(`Failed to start session: ${response.status} - ${errorText}`);
       }

      const data = await response.json();
      console.log('Full LiveAvatar start response:', JSON.stringify(data));

      // Handle different possible response structures from LiveAvatar API
      const livekitUrl =
        data.livekit_url ||
        data.livekitUrl ||
        data.livekit_server_url ||
        data.livekitServerUrl ||
        data.livekit_ws_url ||
        data.livekitWsUrl ||
        data.data?.livekit_url ||
        data.data?.livekitUrl ||
        data.data?.livekit_server_url ||
        data.data?.livekitServerUrl ||
        data.data?.livekit_ws_url ||
        data.data?.livekitWsUrl ||
        data.url ||
        data.data?.url;

      const livekitToken =
        data.livekit_client_token ||
        data.livekitClientToken ||
        data.livekit_token ||
        data.livekitToken ||
        data.data?.livekit_client_token ||
        data.data?.livekitClientToken ||
        data.data?.livekit_token ||
        data.data?.livekitToken;

      const roomName = data.room_name || data.roomName || data.data?.room_name || data.data?.roomName;

      if (!livekitUrl || !livekitToken) {
        console.error('Start session response missing LiveKit info:', JSON.stringify({ livekitUrl, livekitToken, roomName }));

        // Keep 200 so the client can handle via data.success without a transport error
        return new Response(
          JSON.stringify({
            success: false,
            error: 'LiveKit URL/token ausentes na resposta da LiveAvatar. Nao foi possivel conectar.',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Session started, LiveKit URL received');

      return new Response(
        JSON.stringify({
          success: true,
          livekit_url: livekitUrl,
          livekit_token: livekitToken,
          room_name: roomName,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
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
