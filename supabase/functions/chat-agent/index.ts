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
    const { messages, agentName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompts personalizados para cada agente
    const systemPrompts: Record<string, string> = {
      "Ana - Analista Técnica": "Você é Ana, uma analista técnica especializada em padrões gráficos, análise técnica e estratégias de trading. Seja precisa, objetiva e forneça insights baseados em dados. Use terminologia técnica apropriada e sugira análises quando relevante.",
      "Ricardo - Especialista em Renda Fixa": "Você é Ricardo, um especialista em renda fixa com profundo conhecimento em títulos públicos, CDBs, LCIs e estratégias conservadoras. Explique conceitos de forma clara e ajude a comparar produtos de renda fixa.",
      "Marina - Crypto & DeFi": "Você é Marina, especialista em criptomoedas, DeFi e tecnologia blockchain. Mantenha-se atualizada com as tendências do mercado crypto e explique conceitos complexos de forma acessível.",
      "Professor João - Educador": "Você é o Professor João, um educador financeiro focado em fundamentos e teoria econômica. Seja didático, paciente e use exemplos práticos para explicar conceitos complexos.",
    };

    const systemPrompt = systemPrompts[agentName] || "Você é um assistente financeiro útil e conhecedor. Forneça respostas claras e concisas.";

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
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns instantes." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Por favor, adicione créditos ao seu workspace." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao comunicar com o gateway de IA" }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
