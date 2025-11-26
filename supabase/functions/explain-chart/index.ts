import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chartData, chartType } = await req.json();

    if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
      throw new Error('Dados do gráfico inválidos');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY não configurada');
    }

    // Preparar o contexto dos dados para a IA
    const dataContext = JSON.stringify(chartData, null, 2);
    const columns = Object.keys(chartData[0]);
    const rows = chartData.length;

    const prompt = `Analise os seguintes dados tabulares e forneça uma explicação detalhada:

**Tipo de gráfico:** ${chartType || 'Não especificado'}
**Colunas:** ${columns.join(', ')}
**Total de linhas:** ${rows}

**Dados:**
\`\`\`json
${dataContext}
\`\`\`

Por favor, forneça uma análise estruturada com:

1. **Resumo:** Uma visão geral do que o gráfico mostra (2-3 frases)
2. **Representação:** O que esses dados representam e seu significado (2-3 frases)
3. **Pontos de Atenção:** Lista de 3-5 pontos importantes ou preocupações identificadas nos dados
4. **Recomendações:** Lista de 3-5 ações ou decisões recomendadas com base nos insights dos dados

Formate sua resposta como JSON válido seguindo esta estrutura:
{
  "summary": "texto do resumo",
  "representation": "texto da representação",
  "attention_points": ["ponto 1", "ponto 2", "ponto 3"],
  "recommendations": ["recomendação 1", "recomendação 2", "recomendação 3"]
}`;

    console.log('Chamando Lovable AI para explicação do gráfico...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'Você é um analista de dados financeiros especializado em interpretar gráficos e dados tabulares. Forneça análises claras, objetivas e acionáveis sempre em português.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na API Lovable:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Limite de taxa excedido. Tente novamente mais tarde.');
      }
      if (response.status === 402) {
        throw new Error('Pagamento necessário. Adicione créditos ao seu workspace Lovable AI.');
      }
      throw new Error(`Erro na API: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Resposta da IA vazia');
    }

    console.log('Resposta da IA recebida:', content);

    // Tentar extrair JSON da resposta
    let parsedContent;
    try {
      // Procurar por JSON na resposta (pode estar dentro de markdown code blocks)
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                       content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        parsedContent = JSON.parse(jsonStr);
      } else {
        throw new Error('JSON não encontrado na resposta');
      }
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      // Fallback: criar estrutura básica com o conteúdo como texto
      parsedContent = {
        summary: content.substring(0, 200),
        representation: 'Análise gerada pela IA',
        attention_points: ['Análise detalhada disponível no resumo'],
        recommendations: ['Revise os dados cuidadosamente']
      };
    }

    // Inicializar cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Salvar explicação no banco de dados
    const { data: savedExplanation, error: dbError } = await supabase
      .from('chart_explanations')
      .insert({
        chart_data: chartData,
        explanation: content,
        summary: parsedContent.summary,
        attention_points: parsedContent.attention_points,
        recommendations: parsedContent.recommendations,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
      throw new Error('Erro ao salvar explicação no banco de dados');
    }

    console.log('Explicação salva no banco com sucesso:', savedExplanation.id);

    return new Response(
      JSON.stringify({
        id: savedExplanation.id,
        ...parsedContent,
        full_explanation: content,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Erro em explain-chart:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});