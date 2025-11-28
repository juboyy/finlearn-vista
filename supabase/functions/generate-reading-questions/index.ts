import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { ebookTitle, ebookContent, currentPage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é um assistente especializado em gerar perguntas contextuais sobre conteúdo de e-books do mercado financeiro.

Analise o conteúdo fornecido e gere exatamente 4 perguntas relevantes e interessantes que um leitor poderia fazer sobre este conteúdo.

As perguntas devem:
- Ser específicas ao conteúdo da página
- Estimular a compreensão profunda do material
- Cobrir diferentes aspectos (conceitos, aplicações práticas, exemplos, implicações)
- Ser claras e diretas
- Ter entre 8 e 15 palavras

Retorne APENAS um array JSON com as 4 perguntas, sem texto adicional.
Formato: ["Pergunta 1?", "Pergunta 2?", "Pergunta 3?", "Pergunta 4?"]`;

    const userPrompt = `E-book: ${ebookTitle}
Página: ${currentPage}

Conteúdo:
${ebookContent.substring(0, 2000)}

Gere 4 perguntas contextuais sobre este conteúdo.`;

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
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido, tente novamente mais tarde." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Pagamento necessário, adicione créditos ao seu workspace Lovable AI." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro no gateway de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const questionsText = data.choices[0].message.content;
    
    try {
      const questions = JSON.parse(questionsText);
      return new Response(JSON.stringify({ questions }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (parseError) {
      console.error("Error parsing questions:", parseError, questionsText);
      // Fallback: create default questions
      const fallbackQuestions = [
        "Quais são os conceitos principais desta página?",
        "Como posso aplicar isso na prática?",
        "Quais são os principais riscos mencionados?",
        "Pode dar exemplos relacionados a este tópico?"
      ];
      return new Response(JSON.stringify({ questions: fallbackQuestions }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("generate-reading-questions error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
