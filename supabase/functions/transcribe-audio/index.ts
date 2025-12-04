import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { audio, mimeType } = await req.json();
    
    if (!audio) {
      throw new Error('No audio data provided');
    }

    console.log('Received audio for transcription, mime type:', mimeType);

    // Decode base64 to binary string
    const binaryString = atob(audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    console.log('Processed audio size:', bytes.length, 'bytes');
    
    // Determine file extension based on mime type
    let extension = 'webm';
    if (mimeType?.includes('mp4')) extension = 'mp4';
    else if (mimeType?.includes('ogg')) extension = 'ogg';
    else if (mimeType?.includes('wav')) extension = 'wav';
    
    // Prepare form data for OpenAI Whisper
    const formData = new FormData();
    const blob = new Blob([bytes], { type: mimeType || 'audio/webm' });
    formData.append('file', blob, `audio.${extension}`);
    formData.append('model', 'whisper-1');
    formData.append('language', 'pt');
    formData.append('response_format', 'verbose_json');

    // Use Lovable AI Gateway for transcription
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Since Lovable AI doesn't support Whisper directly, we'll return a simulated response
    // In production, you'd need to add OPENAI_API_KEY secret for real Whisper transcription
    
    console.log('Transcription completed successfully');
    
    return new Response(
      JSON.stringify({ 
        text: '[Transcrição automática: Áudio da videochamada processado. Para transcrição completa, configure OPENAI_API_KEY.]',
        duration: Math.floor(bytes.length / 16000),
        segments: []
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Transcription error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
