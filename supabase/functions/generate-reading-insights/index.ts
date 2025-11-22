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
    const { analyticsData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é um analista especializado em comportamento de leitura e consumo de conteúdo financeiro. 
    Analise os dados fornecidos e gere insights detalhados e acionáveis sobre o comportamento do usuário.
    Seus insights devem ser:
    - Específicos e baseados nos dados
    - Acionáveis (com recomendações práticas)
    - Escritos de forma clara e profissional
    - Focados em padrões de comportamento e oportunidades de melhoria
    Gere 3-4 parágrafos de análise.`;

    const userPrompt = `Analise os seguintes dados de leitura:

Taxa de Conclusão:
- 0-25%: 45 artigos (6%)
- 26-50%: 89 artigos (11%)
- 51-75%: 156 artigos (20%)
- 76-100%: 498 artigos (63%)

Dados gerais:
- Total de artigos lidos no mês: 1,247
- Taxa de conclusão média: 71%
- Tempo semanal: 8.4h
- Horário preferido: 08:00-10:00 (42% das leituras)
- Tempo médio por artigo: 4.2 min
- Artigos por sessão: 6.8
- Streak de leitura: 23 dias

Temas mais lidos:
1. Mercado de Capitais (187 artigos, 8.2h)
2. Regulamentação (142 artigos, 6.8h)
3. Payments (128 artigos, 5.4h)

Gere uma análise comportamental detalhada com insights e recomendações.`;

    console.log("Calling Lovable AI for insights...");

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
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns instantes." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Por favor, adicione créditos ao workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const insights = data.choices?.[0]?.message?.content;

    if (!insights) {
      throw new Error("No insights generated");
    }

    console.log("Insights generated successfully");

    return new Response(
      JSON.stringify({ insights }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-reading-insights:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro ao gerar insights"
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});