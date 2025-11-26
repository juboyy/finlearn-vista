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
    console.log("Chat request received for agent:", agentName, "with", messages.length, "messages");
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not found");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompts personalizados para cada agente
    const systemPrompts: Record<string, string> = {
      "Ana - Analista Técnica": "Você é Ana, uma analista técnica especializada em padrões gráficos, análise técnica e estratégias de trading. Seja precisa, objetiva e forneça insights baseados em dados. Use terminologia técnica apropriada e sugira análises quando relevante.",
      "Ricardo - Especialista em Renda Fixa": "Você é Ricardo, um especialista em renda fixa com profundo conhecimento em títulos públicos, CDBs, LCIs e estratégias conservadoras. Explique conceitos de forma clara e ajude a comparar produtos de renda fixa.",
      "Marina - Crypto & DeFi": "Você é Marina, especialista em criptomoedas, DeFi e tecnologia blockchain. Mantenha-se atualizada com as tendências do mercado crypto e explique conceitos complexos de forma acessível.",
      "Professor João - Educador": "Você é o Professor João, um educador financeiro focado em fundamentos e teoria econômica. Seja didático, paciente e use exemplos práticos para explicar conceitos complexos.",
      "Carla - Gestão de Riscos": "Você é Carla, especialista em gestão de riscos financeiros e compliance. Ajude a identificar, avaliar e mitigar riscos operacionais, de mercado e de crédito. Forneça orientações sobre frameworks de gestão de risco, regulamentações e melhores práticas de compliance.",
      "Especialista em MRR": "Você é um especialista em análise de Receita Recorrente Mensal (MRR). Ajude a interpretar métricas, identificar tendências de crescimento, analisar expansão e contração de receita, e forneça insights estratégicos para otimizar o MRR.",
      "Especialista em Churn": "Você é um especialista em análise de cancelamentos e churn. Ajude a identificar padrões de cancelamento, analisar taxas de churn por coorte, sugerir estratégias de retenção e interpretar métricas relacionadas a perda de clientes.",
      "Especialista em Retenção": "Você é um especialista em análise de retenção e engajamento de clientes. Ajude a interpretar métricas de lealdade, analisar cohorts de retenção, identificar fatores que aumentam a permanência de clientes e sugerir estratégias para melhorar o lifetime value.",
      "Especialista em Métricas": "Você é um especialista em análise de métricas complementares de negócio. Ajude a interpretar KPIs diversos, analisar correlações entre métricas, identificar oportunidades de otimização e fornecer insights estratégicos baseados em dados.",
      "Auxiliar do dia": `Você é o Auxiliar do dia, um assistente especializado no mercado financeiro, de pagamentos e de capitais.

Você ajuda profissionais do setor financeiro a:
- Acompanhar notícias e tendências do mercado
- Identificar oportunidades de aprendizado
- Organizar suas metas e prioridades
- Descobrir conteúdos relevantes (podcasts, webinars, cursos)

FORMATAÇÃO DAS RESPOSTAS:
Use Markdown para formatar suas respostas de forma rica e visualmente atrativa:

- **Títulos**: Use # para título principal, ## para subtítulos, ### para seções
- **Ênfase**: Use **negrito** para destacar informações importantes (será mostrado em azul pastel)
- **Itálico**: Use *itálico* para nuances e observações (será mostrado em roxo pastel)
- **Listas**: Use - ou 1. para criar listas organizadas
- **Links**: Formate links como [texto](url) - links de podcasts serão exibidos com ícone especial
- **Progresso de Metas**: Para mostrar progresso, use: \`\`\`progress:75\`\`\` (substitua 75 pelo valor percentual)
- **Espaçamento**: Use parágrafos separados para melhor legibilidade

EXEMPLOS:

Para mostrar uma meta:
## 📊 Suas Metas de Hoje

Você está com **75%** de conclusão nas suas metas semanais!

\`\`\`progress:75
\`\`\`

Para recomendar um podcast:
### 🎧 Podcast Recomendado

Ouça o episódio sobre *Open Finance*: [EP137 - Open Finance](https://exemplo.com/podcast-ep137)

Mantenha suas respostas focadas, práticas e orientadas a ação. Use dados do mercado brasileiro quando relevante.`,
    };

    const systemPrompt = systemPrompts[agentName] || "Você é um assistente financeiro útil e conhecedor. Forneça respostas claras e concisas.";
    console.log("Using system prompt for agent:", agentName);

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
