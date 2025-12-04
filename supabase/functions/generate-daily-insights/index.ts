import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if insights already exist for today
    const today = new Date().toISOString().split('T')[0];
    const { data: existingInsights, error: checkError } = await supabase
      .from('daily_insights')
      .select('id')
      .eq('generated_date', today)
      .is('user_id', null)
      .limit(1);

    if (checkError) {
      console.error('Error checking existing insights:', checkError);
      throw checkError;
    }

    // If insights already exist for today, return them
    if (existingInsights && existingInsights.length > 0) {
      console.log('Insights already exist for today, fetching existing...');
      const { data: todayInsights } = await supabase
        .from('daily_insights')
        .select('*')
        .eq('generated_date', today)
        .is('user_id', null);

      return new Response(JSON.stringify({ 
        message: 'Insights already generated for today',
        insights: todayInsights,
        generated: false
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating new daily insights with Lovable AI...');

    // Generate insights using Lovable AI
    const systemPrompt = `Você é um especialista em mercado financeiro brasileiro. Gere 3 insights diários relevantes sobre o mercado financeiro.

Para cada insight, forneça:
1. Um título curto e impactante
2. Um conteúdo explicativo de 2-3 frases
3. O tipo do insight (mercado, economia, investimentos, tendencias, educacao)

Responda APENAS com um JSON válido no seguinte formato:
{
  "insights": [
    {
      "title": "Título do Insight",
      "content": "Conteúdo explicativo do insight...",
      "type": "mercado"
    }
  ]
}

Foque em:
- Tendências atuais do mercado brasileiro
- Oportunidades de investimento
- Indicadores econômicos relevantes
- Dicas práticas para investidores`;

    const userPrompt = `Gere 3 insights financeiros para hoje, ${new Date().toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}. Considere o contexto atual do mercado brasileiro.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('AI Response:', content);

    // Parse the JSON response
    let parsedInsights;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedInsights = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback: create a single insight from the raw content
      parsedInsights = {
        insights: [{
          title: 'Insight do Mercado',
          content: content.substring(0, 500),
          type: 'mercado'
        }]
      };
    }

    // Insert insights into database
    const insightsToInsert = parsedInsights.insights.map((insight: any) => ({
      title: insight.title,
      content: insight.content,
      insight_type: insight.type || 'general',
      generated_date: today,
      user_id: null, // Global insights
      metadata: { source: 'lovable-ai', model: 'google/gemini-2.5-flash' }
    }));

    const { data: insertedInsights, error: insertError } = await supabase
      .from('daily_insights')
      .insert(insightsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting insights:', insertError);
      throw insertError;
    }

    console.log('Successfully generated and stored', insertedInsights?.length, 'insights');

    return new Response(JSON.stringify({ 
      message: 'Daily insights generated successfully',
      insights: insertedInsights,
      generated: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-daily-insights:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});