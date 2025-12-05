import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, agentName, messages } = await req.json();
    
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Step 1: Transcribe audio using ElevenLabs Speech-to-Text
    const audioBuffer = Uint8Array.from(atob(audio), c => c.charCodeAt(0));
    const audioBlob = new Blob([audioBuffer], { type: "audio/webm" });
    
    const transcribeFormData = new FormData();
    transcribeFormData.append("file", audioBlob, "audio.webm");
    transcribeFormData.append("model_id", "scribe_v1");

    const transcribeResponse = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: transcribeFormData,
    });

    if (!transcribeResponse.ok) {
      const errorText = await transcribeResponse.text();
      console.error("Transcription error:", errorText);
      throw new Error(`Transcription failed: ${errorText}`);
    }

    const transcribeData = await transcribeResponse.json();
    const userText = transcribeData.text || "";
    
    console.log("Transcribed text:", userText);

    if (!userText.trim()) {
      return new Response(
        JSON.stringify({ error: "No speech detected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Get AI response using Lovable AI
    const systemPrompts: Record<string, string> = {
      "Athena": "Você é Athena, especialista em análise de mercado financeiro. Responda de forma clara, objetiva e profissional. Mantenha respostas concisas, ideais para conversa por voz.",
      "Aristóteles": "Você é Aristóteles, especialista em compliance e regulamentação bancária. Responda de forma clara, objetiva e profissional. Mantenha respostas concisas, ideais para conversa por voz.",
      "Afrodite": "Você é Afrodite, especialista em comunicação e marketing financeiro. Responda de forma clara, objetiva e profissional. Mantenha respostas concisas, ideais para conversa por voz.",
      "Sócrates": "Você é Sócrates, especialista em educação financeira. Responda de forma clara, objetiva e profissional. Mantenha respostas concisas, ideais para conversa por voz.",
    };

    const systemPrompt = systemPrompts[agentName] || 
      `Você é ${agentName}, um assistente especializado em finanças. Responda de forma clara, objetiva e profissional. Mantenha respostas concisas, ideais para conversa por voz.`;

    const chatMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: userText }
    ];

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: chatMessages,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI error:", errorText);
      throw new Error(`AI request failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const assistantText = aiData.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua solicitação.";
    
    console.log("AI response:", assistantText);

    // Step 3: Convert response to speech using ElevenLabs
    const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Sarah voice - professional female
    
    const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: assistantText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text();
      console.error("TTS error:", errorText);
      throw new Error(`Text-to-speech failed: ${errorText}`);
    }

    const audioArrayBuffer = await ttsResponse.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioArrayBuffer)));

    return new Response(
      JSON.stringify({
        userText,
        assistantText,
        audioContent: audioBase64,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Voice chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
