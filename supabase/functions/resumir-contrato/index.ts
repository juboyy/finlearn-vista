import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation
function validateInput(body: unknown): { valid: boolean; error?: string } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be an object" };
  }

  const { fileName, fileContent, summaryType, agent } = body as Record<string, unknown>;

  if (typeof fileName !== "string" || fileName.length === 0 || fileName.length > 500) {
    return { valid: false, error: "fileName must be a string between 1 and 500 characters" };
  }

  if (typeof fileContent !== "string" || fileContent.length === 0) {
    return { valid: false, error: "fileContent must be a non-empty string" };
  }

  // Limit fileContent to prevent abuse (base64 encoded content)
  if (fileContent.length > 500000) {
    return { valid: false, error: "fileContent exceeds maximum size of 500KB" };
  }

  const validSummaryTypes = ["short", "medium", "extensive"];
  if (typeof summaryType !== "string" || !validSummaryTypes.includes(summaryType)) {
    return { valid: false, error: `summaryType must be one of: ${validSummaryTypes.join(", ")}` };
  }

  const validAgents = ["analise", "juridico", "compliance", "estrategia"];
  if (typeof agent !== "string" || !validAgents.includes(agent)) {
    return { valid: false, error: `agent must be one of: ${validAgents.join(", ")}` };
  }

  return { valid: true };
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
    
    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { fileName, fileContent, summaryType, agent } = body;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não está configurada");
    }

    // Decode base64 content with error handling
    let decodedContent: string;
    try {
      decodedContent = atob(fileContent);
    } catch {
      return new Response(
        JSON.stringify({ error: "fileContent must be valid base64 encoded content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Definir prompts baseados no tipo de resumo
    const summaryPrompts = {
      short: "Crie um resumo executivo breve (2-3 parágrafos) destacando apenas os pontos mais críticos.",
      medium: "Crie um resumo detalhado (4-6 parágrafos) abordando pontos principais, cláusulas importantes e recomendações.",
      extensive: "Crie uma análise completa e profunda (8-10 parágrafos) cobrindo todos os aspectos relevantes, riscos, oportunidades e recomendações detalhadas."
    };

    // Definir personalidade do agente
    const agentPersonalities: Record<string, string> = {
      analise: "Você é um especialista em análise de contratos com foco em identificar riscos e oportunidades. Destaque métricas, dados financeiros e implicações estratégicas.",
      juridico: "Você é um especialista jurídico com foco em análise legal de contratos. Destaque aspectos legais, conformidade e riscos jurídicos.",
      compliance: "Você é um especialista em compliance e regulamentação. Foque em conformidade regulatória, requisitos legais e riscos de não conformidade.",
      estrategia: "Você é um analista estratégico de negócios. Analise os termos contratuais sob perspectiva estratégica, identificando oportunidades e riscos para o negócio."
    };

    // Personalidade adicional baseada no agente selecionado
    const systemPrompt = `${agentPersonalities[agent as keyof typeof agentPersonalities]}

${summaryPrompts[summaryType as keyof typeof summaryPrompts]}

Estruture o resumo de forma clara e profissional em formato Markdown, usando:

## Estrutura Obrigatória:
- Use ## para títulos de seções
- Use ### para subtítulos
- Use - para listas e tópicos (SEMPRE use listas para organizar informações)
- Deixe linhas em branco entre parágrafos e seções
- Use **negrito** para termos importantes
- Use *itálico* para ênfases secundárias

## Seções que devem estar no resumo:
1. **Contexto Geral** - Visão geral do contrato
2. **Pontos Principais** - Lista com os aspectos mais importantes
3. **Cláusulas Críticas** - Lista das cláusulas que merecem atenção
4. **Riscos Identificados** - Lista de potenciais riscos
5. **Recomendações** - Lista de ações sugeridas

Use linguagem técnica mas acessível. Seja objetivo e prático. SEMPRE organize em listas com - quando apresentar múltiplos pontos.`;

    const userPrompt = `Analise o seguinte documento contratual (${fileName}) e crie um resumo conforme solicitado:

Conteúdo do documento:
${decodedContent.substring(0, 50000)}`; // Limit content to avoid token limits

    console.log("Gerando resumo com Lovable AI...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na API Lovable AI:", response.status, errorText);
      
      if (response.status === 429) {
        throw new Error("Limite de requisições excedido. Por favor, tente novamente mais tarde.");
      }
      if (response.status === 402) {
        throw new Error("Créditos insuficientes. Por favor, adicione créditos ao seu workspace Lovable AI.");
      }
      
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    const summary = data.choices[0].message.content;

    console.log("Resumo gerado com sucesso");

    return new Response(
      JSON.stringify({ summary }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Erro ao gerar resumo:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro desconhecido ao processar documento" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
