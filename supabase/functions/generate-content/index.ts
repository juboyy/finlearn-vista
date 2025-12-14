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

  const { prompt, agentType, specificAgent, tone, contentSize } = body as Record<string, unknown>;

  if (typeof prompt !== "string" || prompt.length === 0 || prompt.length > 10000) {
    return { valid: false, error: "prompt must be a string between 1 and 10000 characters" };
  }

  const validAgentTypes = ["analise", "compliance", "educacional", "estrategia", "juridico", "comunicacao"];
  if (agentType !== undefined && (typeof agentType !== "string" || !validAgentTypes.includes(agentType))) {
    return { valid: false, error: `agentType must be one of: ${validAgentTypes.join(", ")}` };
  }

  if (specificAgent !== undefined && (typeof specificAgent !== "string" || specificAgent.length > 200)) {
    return { valid: false, error: "specificAgent must be a string with max 200 characters" };
  }

  const validTones = ["Profissional", "Técnico", "Conversacional", "Formal"];
  if (tone !== undefined && (typeof tone !== "string" || !validTones.includes(tone))) {
    return { valid: false, error: `tone must be one of: ${validTones.join(", ")}` };
  }

  const validSizes = ["Curto (500 palavras)", "Médio (1000 palavras)", "Longo (2000+ palavras)"];
  if (contentSize !== undefined && (typeof contentSize !== "string" || !validSizes.includes(contentSize))) {
    return { valid: false, error: `contentSize must be one of: ${validSizes.join(", ")}` };
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

    const { prompt, agentType, specificAgent, tone, contentSize } = body;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt based on agent type and specific agent
    let systemPrompt = "Você é um assistente de criação de conteúdo profissional para o mercado financeiro brasileiro.";
    
    if (specificAgent) {
      systemPrompt += ` Você está atuando como: ${specificAgent}.`;
    } else if (agentType) {
      const agentPrompts: Record<string, string> = {
        'analise': 'Você é especializado em análises de mercado e relatórios financeiros.',
        'compliance': 'Você é especializado em documentos regulatórios e compliance.',
        'educacional': 'Você é especializado em conteúdo didático e educacional.',
        'estrategia': 'Você é especializado em planejamento e insights estratégicos.',
        'juridico': 'Você é especializado em documentos legais e contratuais.',
        'comunicacao': 'Você é especializado em relatórios executivos e comunicação corporativa.'
      };
      systemPrompt += ` ${agentPrompts[agentType] || ''}`;
    }

    // Add tone and size instructions
    const toneMap: Record<string, string> = {
      'Profissional': 'Use um tom profissional e formal.',
      'Técnico': 'Use linguagem técnica e especializada.',
      'Conversacional': 'Use um tom mais conversacional e acessível.',
      'Formal': 'Use um tom estritamente formal e corporativo.'
    };
    
    systemPrompt += ` ${toneMap[tone] || ''}`;
    
    const sizeMap: Record<string, string> = {
      'Curto (500 palavras)': 'Escreva aproximadamente 500 palavras.',
      'Médio (1000 palavras)': 'Escreva aproximadamente 1000 palavras.',
      'Longo (2000+ palavras)': 'Escreva um conteúdo extenso com mais de 2000 palavras.'
    };
    
    systemPrompt += ` ${sizeMap[contentSize] || ''}`;
    systemPrompt += ' Formate o conteúdo em markdown com títulos, subtítulos e estrutura clara.';

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
          { role: "user", content: prompt }
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
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao seu workspace Lovable AI." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao conectar com o gateway de IA" }), 
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
    console.error("generate-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
