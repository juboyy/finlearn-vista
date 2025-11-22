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

    const systemPrompt = `Você é um analista comportamental especializado em padrões de consumo de conteúdo financeiro e educacional. 
    Sua expertise está em identificar insights profundos baseados em dados de leitura e uso de plataformas.
    
    INSTRUÇÕES:
    - Analise os dados fornecidos e identifique 4-6 insights específicos e acionáveis
    - Cada insight deve ter um título marcante e uma explicação de 2-3 frases
    - Correlacione os dados entre si (ex: taxa de conclusão vs horários, temas vs tempo de leitura)
    - Identifique padrões positivos E oportunidades de melhoria
    - Use linguagem profissional mas acessível
    - Inclua recomendações práticas quando relevante
    
    FORMATO DE RESPOSTA:
    Use marcadores (•) para cada insight, com o título em negrito seguido da explicação.
    
    Exemplo:
    • **Excelente engajamento matinal**: O pico de 42% das leituras entre 08:00-10:00 demonstra...
    • **Oportunidade em finais de semana**: A queda para 0.6h aos domingos sugere...`;

    const userPrompt = `Analise profundamente estes dados de comportamento de leitura:

📊 TAXA DE CONCLUSÃO (Gráfico Principal):
- 0-25% concluído: 45 artigos (6% do total)
- 26-50% concluído: 89 artigos (11% do total)  
- 51-75% concluído: 156 artigos (20% do total)
- 76-100% concluído: 498 artigos (63% do total)
Taxa média de conclusão: 71%

📈 MÉTRICAS GERAIS:
- Artigos hoje: 47 (32 lidos)
- Artigos na semana: 284 (198 lidos)
- Artigos no mês: 1,247 (892 lidos)
- Tempo semanal: 8.4h (média 1.2h/dia)
- Tempo mensal: 32.6h (média 1.1h/dia)

⏰ PADRÕES TEMPORAIS:
- Horário preferido: 08:00-10:00 (42% das leituras)
- Tempo médio por artigo: 4.2 min (12% mais rápido que média da plataforma)
- Artigos por sessão: 6.8
- Streak de leitura: 23 dias consecutivos

📚 DISTRIBUIÇÃO SEMANAL:
- Segunda: 1.8h (90% da meta)
- Terça: 1.4h (70%)
- Quarta: 1.6h (80%)
- Quinta: 1.2h (60%)
- Sexta: 1.0h (50%)
- Sábado: 0.8h (40%)
- Domingo: 0.6h (30%)

🎯 TEMAS MAIS LIDOS:
1. Mercado de Capitais: 187 artigos, 8.2h (28% do total)
2. Regulamentação: 142 artigos, 6.8h (21%)
3. Payments: 128 artigos, 5.4h (19%)
4. Banking: 96 artigos, 4.2h (14%)
5. Economia: 84 artigos, 3.8h (12%)

📱 AÇÕES DE LEITURA:
- Favoritados: 124 artigos (+18 esta semana)
- Ler mais tarde: 67 artigos (+12 hoje)
- Compartilhados: 43 artigos (+7 esta semana)
- Comentados: 89 artigos (+14 esta semana)

🌐 FONTES PRINCIPAIS:
1. Valor Econômico: 248 artigos (32%)
2. InfoMoney: 186 artigos (24%)
3. Bloomberg Brasil: 142 artigos (18%)
4. Estadão Economia: 98 artigos (13%)
5. CVM Notícias: 72 artigos (9%)

Gere insights comportamentais detalhados correlacionando estes dados. Identifique padrões, forças, oportunidades e recomendações específicas.`;

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
        temperature: 0.7,
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