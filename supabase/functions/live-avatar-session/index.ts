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
      console.error('[LiveAvatar] AVATAR_API_KEY not configured');
      throw new Error('AVATAR_API_KEY is not configured');
    }

    const body = await req.json();
    const { action, sessionToken } = body;
    console.log('[LiveAvatar] Action:', action);

    // Create session token (FULL mode)
    if (action === 'token') {
      console.log('[LiveAvatar] Creating session token...');
      
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

      const responseText = await response.text();
      console.log('[LiveAvatar] Token response status:', response.status);
      console.log('[LiveAvatar] Token response:', responseText);

      if (!response.ok) {
        throw new Error(`Token creation failed: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      
      // LiveAvatar API returns { code, data: { session_id, session_token }, message }
      const sessionId = data.data?.session_id || data.session_id;
      const extractedToken = data.data?.session_token || data.session_token;
      
      console.log('[LiveAvatar] Extracted session_id:', sessionId);
      console.log('[LiveAvatar] Extracted session_token:', extractedToken ? 'present' : 'missing');

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
      console.log('[LiveAvatar] Starting session...');
      
      const response = await fetch(`${LIVEAVATAR_API_URL}/sessions/start`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const responseText = await response.text();
      console.log('[LiveAvatar] Start response status:', response.status);
      console.log('[LiveAvatar] Start response:', responseText);

      if (!response.ok) {
        // Pass-through vendor error details so the frontend can show the real cause
        try {
          const parsed = JSON.parse(responseText);
          const vendorCode = parsed?.code;
          const vendorMessage = parsed?.message;

          let errorType: 'no_credits' | 'concurrency_limit' | 'vendor_error' = 'vendor_error';
          if (response.status === 403 && vendorCode === 4003) {
            const msg = String(vendorMessage || '');
            if (/no\s+credits/i.test(msg)) errorType = 'no_credits';
            else if (/concurr/i.test(msg)) errorType = 'concurrency_limit';
          }

          return new Response(
            JSON.stringify({
              success: false,
              code: vendorCode ?? response.status,
              error_type: errorType,
              vendor_message: vendorMessage ?? responseText,
              error: vendorMessage ?? responseText,
            }),
            {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        } catch {
          // ignore JSON parse errors
        }

        throw new Error(`Start session failed: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('[LiveAvatar] Start data keys:', Object.keys(data));
      if (data.data) {
        console.log('[LiveAvatar] Start data.data keys:', Object.keys(data.data));
      }

      // LiveAvatar API returns LiveKit credentials
      const livekitUrl =
        data.data?.livekit_server_url ||
        data.data?.livekit_url ||
        data.livekit_server_url ||
        data.livekit_url ||
        data.url;

      const livekitToken =
        data.data?.livekit_client_token ||
        data.data?.livekit_token ||
        data.livekit_client_token ||
        data.livekit_token ||
        data.token;

      console.log('[LiveAvatar] LiveKit URL:', livekitUrl ? 'present' : 'missing');
      console.log('[LiveAvatar] LiveKit Token:', livekitToken ? 'present' : 'missing');

      if (!livekitUrl || !livekitToken) {
        console.error('[LiveAvatar] Missing LiveKit credentials in response');
        return new Response(
          JSON.stringify({
            success: false,
            error: 'LiveKit credentials not received from LiveAvatar API',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('[LiveAvatar] Session started successfully');

      return new Response(
        JSON.stringify({
          success: true,
          livekit_url: livekitUrl,
          livekit_token: livekitToken,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Stop session
    if (action === 'stop' && sessionToken) {
      console.log('[LiveAvatar] Stopping session...');
      
      const response = await fetch(`${LIVEAVATAR_API_URL}/sessions/stop`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn('[LiveAvatar] Stop warning:', errorText);
      } else {
        console.log('[LiveAvatar] Session stopped');
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.error('[LiveAvatar] Invalid action:', action);
    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[LiveAvatar] Error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
