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

function validateAgentName(agentName: unknown): string | null {
  if (typeof agentName !== "string") {
    return "agentName must be a string";
  }
  if (agentName.length === 0 || agentName.length > 100) {
    return "agentName must be between 1 and 100 characters";
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
    const { messages, agentName, useReasoning } = body;
    
    // Select model based on reasoning mode
    const model = useReasoning ? "google/gemini-2.5-pro" : "google/gemini-2.5-flash-lite";
    
    // Validate input
    const messagesError = validateMessages(messages);
    if (messagesError) {
      return new Response(
        JSON.stringify({ error: messagesError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const agentNameError = validateAgentName(agentName);
    if (agentNameError) {
      return new Response(
        JSON.stringify({ error: agentNameError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Chat request received for agent:", agentName, "with", messages.length, "messages");
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not found");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompts personalizados para cada agente
    const systemPrompts: Record<string, string> = {
      "Athena - Analista Técnica": "Você é Athena, uma analista técnica especializada em padrões gráficos, análise técnica e estratégias de trading. Seja precisa, objetiva e forneça insights baseados em dados. Use terminologia técnica apropriada e sugira análises quando relevante.",
      "Aristóteles - Especialista em Renda Fixa": "Você é Aristóteles, um especialista em renda fixa com profundo conhecimento em títulos públicos, CDBs, LCIs e estratégias conservadoras. Explique conceitos de forma clara e ajude a comparar produtos de renda fixa.",
      "Afrodite - Crypto & DeFi": "Você é Afrodite, especialista em criptomoedas, DeFi e tecnologia blockchain. Mantenha-se atualizada com as tendências do mercado crypto e explique conceitos complexos de forma acessível.",
      "Sócrates - Educador": "Você é Sócrates, um educador financeiro focado em fundamentos e teoria econômica. Seja didático, paciente e use exemplos práticos para explicar conceitos complexos.",
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
- **Itálico**: Use *itálico* para nuances e observações (será mostrado em cinza escuro)
- **Listas**: Use - ou 1. para criar listas organizadas
- **Links**: Formate links como [texto](url) - links com 'audio' serão exibidos como players
- **Progresso de Metas**: Para mostrar progresso, use:
  \`\`\`progress
  75
  \`\`\`
- **Players de Áudio**: Para adicionar player de podcast, use:
  \`\`\`audio
  https://example.com/audio.mp3
  \`\`\`
- **Players de Vídeo**: Para adicionar player de vídeo de curso, use:
  \`\`\`video
  https://example.com/video.mp4
  \`\`\`
- **Gráficos**: Para adicionar gráficos, use:
  \`\`\`chart-bar
  {"data":[{"name":"Jan","value":10},{"name":"Fev","value":20}],"dataKey":"value","xKey":"name"}
  \`\`\`
  Tipos disponíveis: chart-bar, chart-line, chart-pie
- **Imagens**: Use ![descrição](IMAGE_GENERATE:prompt detalhado) para gerar imagens no estilo da plataforma
- **Espaçamento**: Use parágrafos separados para melhor legibilidade

Mantenha suas respostas focadas, práticas e orientadas a ação. Use dados do mercado brasileiro quando relevante.

IMPORTANTE SOBRE IMAGENS: 
- SEMPRE use a sintaxe exata de markdown para imagens: ![alt text](IMAGE_GENERATE:prompt)
- Exemplo correto: ![Financial news](IMAGE_GENERATE:Financial market news illustration, 2D sketch style, light pastel colors)
- NUNCA esqueça de colocar IMAGE_GENERATE: no src da imagem
- O sistema detectará IMAGE_GENERATE: e gerará imagens reais no estilo da plataforma
- Sempre descreva bem o contexto em inglês após IMAGE_GENERATE:
- CRÍTICO: Use exatamente esta sintaxe: ![descrição](IMAGE_GENERATE:prompt detalhado em inglês)`,
    };

    const systemPrompt = systemPrompts[agentName] || "Você é um assistente financeiro útil e conhecedor. Forneça respostas claras e concisas.";
    console.log("Using system prompt for agent:", agentName, "| Model:", model);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
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
