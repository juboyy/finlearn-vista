import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation
function validateMessages(messages: unknown): string | null {
  if (!Array.isArray(messages)) {
    return "messages must be an array";
  }
  if (messages.length === 0 || messages.length > 50) {
    return "messages must have between 1 and 50 items";
  }
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (typeof msg !== "object" || msg === null) {
      return `messages[${i}] must be an object`;
    }
    if (!["user", "assistant", "system"].includes(msg.role)) {
      return `messages[${i}].role must be user, assistant, or system`;
    }
    if (typeof msg.content !== "string" || msg.content.length === 0 || msg.content.length > 10000) {
      return `messages[${i}].content must be a string between 1 and 10000 characters`;
    }
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { messages } = body;
    
    // Validate input
    const messagesError = validateMessages(messages);
    if (messagesError) {
      return new Response(
        JSON.stringify({ error: messagesError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Received messages:", messages.length);
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é um especialista em mercado de pagamentos, treinado em dados do BACEN e ABECS. 
Você ajuda usuários a criar infográficos sobre tendências de pagamento, volumes de transação (Pix, Cartões, Boletos) e comparativos de taxas.
Seja preciso, técnico quando necessário, mas mantenha uma comunicação clara e profissional.
Sempre confirme os detalhes com o usuário antes de gerar visualizações.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from AI");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
    
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
