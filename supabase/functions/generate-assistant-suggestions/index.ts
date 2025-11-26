import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase configuration is missing");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log("Generating assistant suggestions...");
    
    // Prompt para o AI gerar sugestões
    const systemPrompt = `Você é o Auxiliar do dia, um especialista em mercado financeiro, pagamentos e mercado de capitais.
    
Gere 4 sugestões personalizadas e relevantes para profissionais do mercado financeiro seguindo estas diretrizes:
1. Uma notícia importante do mercado (tendências, regulamentações, eventos)
2. Uma oportunidade de aprendizado (curso, webinar, material)
3. Um insight ou análise de dados do mercado
4. Um lembrete ou ação recomendada

Para cada sugestão, forneça:
- Título curto e atrativo (máximo 80 caracteres)
- Conteúdo detalhado e informativo (2-3 frases)
- Tipo (news, learning, insights, reminders)
- Prioridade (low, medium, high)
- Metadados relevantes (autor, data, link, etc) em formato JSON

Retorne as sugestões em formato JSON array com esta estrutura:
[
  {
    "title": "string",
    "content": "string",
    "suggestion_type": "news|learning|insights|reminders",
    "priority": "low|medium|high",
    "metadata": {}
  }
]`;

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
          { role: "user", content: "Gere 4 sugestões relevantes para hoje baseadas no mercado financeiro brasileiro." }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate suggestions");
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content;
    
    console.log("AI response received:", aiContent);

    // Parse JSON do response
    let suggestions;
    try {
      // Extrair JSON do response (pode vir entre ```json e ```)
      const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      } else {
        suggestions = JSON.parse(aiContent);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Invalid AI response format");
    }

    // Inserir sugestões no banco
    const { data: insertedSuggestions, error: insertError } = await supabase
      .from("assistant_suggestions")
      .insert(suggestions)
      .select();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw insertError;
    }

    console.log("Successfully created", insertedSuggestions?.length, "suggestions");

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: insertedSuggestions?.length,
        suggestions: insertedSuggestions 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("generate-assistant-suggestions error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
