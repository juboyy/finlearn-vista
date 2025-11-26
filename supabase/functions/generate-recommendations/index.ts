import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch user browsing history (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: browsingHistory } = await supabase
      .from('user_browsing_history')
      .select('*')
      .eq('user_id', userId)
      .gte('viewed_at', thirtyDaysAgo.toISOString())
      .order('viewed_at', { ascending: false })
      .limit(50);

    // Fetch user purchases
    const { data: purchases } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false })
      .limit(20);

    // Fetch user preferences
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Build user profile summary
    const userProfile = {
      browsingHistory: browsingHistory || [],
      purchases: purchases || [],
      preferences: preferences || {
        preferred_categories: [],
        preferred_content_types: [],
        skill_level: 'intermediario',
        interests: []
      }
    };

    // Extract patterns
    const viewedCategories = browsingHistory?.map(h => h.product_category).filter(Boolean) || [];
    const viewedTypes = browsingHistory?.map(h => h.product_type).filter(Boolean) || [];
    const purchasedCategories = purchases?.map(p => p.product_category).filter(Boolean) || [];
    const purchasedTypes = purchases?.map(p => p.product_type).filter(Boolean) || [];

    // Available products catalog (mock data - in production this would come from a products table)
    const availableProducts = [
      {
        id: 'ebook-001',
        type: 'ebook',
        title: 'Gestão de Riscos Financeiros',
        author: 'Ana Silva',
        category: 'Gestão de Riscos',
        tags: ['risco', 'gestão', 'financeiro', 'análise'],
        price: 89,
        rating: 4.9,
        description: 'Aprenda técnicas avançadas de gestão de riscos aplicadas ao mercado financeiro'
      },
      {
        id: 'curso-001',
        type: 'curso',
        title: 'Análise Técnica Avançada',
        author: 'Pedro Santos',
        category: 'Análise de Mercado',
        tags: ['análise técnica', 'mercado', 'trading', 'gráficos'],
        price: 197,
        rating: 4.8,
        description: 'Domine as principais ferramentas de análise técnica para tomar decisões estratégicas'
      },
      {
        id: 'ebook-002',
        type: 'ebook',
        title: 'Compliance e Regulação Bancária',
        author: 'Julia Ferreira',
        category: 'Compliance',
        tags: ['compliance', 'regulação', 'bancário', 'normas'],
        price: 69,
        rating: 4.7,
        description: 'Entenda as principais regulações do setor bancário e como implementar compliance'
      },
      {
        id: 'curso-002',
        type: 'curso',
        title: 'Open Finance na Prática',
        author: 'Roberto Lima',
        category: 'Tecnologia Financeira',
        tags: ['open finance', 'fintech', 'tecnologia', 'inovação'],
        price: 149,
        rating: 4.9,
        description: 'Aprenda a implementar e aproveitar as oportunidades do Open Finance'
      },
      {
        id: 'ebook-003',
        type: 'ebook',
        title: 'Estratégias de Investimento',
        author: 'Marcos Oliveira',
        category: 'Investimentos',
        tags: ['investimento', 'estratégia', 'portfólio', 'alocação'],
        price: 79,
        rating: 4.6,
        description: 'Descubra estratégias comprovadas para otimizar seu portfólio de investimentos'
      },
      {
        id: 'curso-003',
        type: 'curso',
        title: 'Análise Fundamentalista Completa',
        author: 'Carla Mendes',
        category: 'Análise de Mercado',
        tags: ['fundamentalista', 'valuation', 'empresas', 'análise'],
        price: 297,
        rating: 4.9,
        description: 'Aprenda a avaliar empresas de forma profissional e identificar oportunidades'
      }
    ];

    // Use Lovable AI to generate personalized recommendations
    const systemPrompt = `Você é um especialista em sistemas de recomendação para conteúdos educacionais do mercado financeiro.

Analise o perfil do usuário e o catálogo de produtos disponíveis para gerar recomendações personalizadas.

Considere:
1. Histórico de navegação e categorias mais visualizadas
2. Compras anteriores e padrões de consumo
3. Preferências declaradas pelo usuário
4. Nível de habilidade (iniciante, intermediário, avançado)
5. Complementaridade entre produtos já adquiridos e novos conteúdos

Para cada produto recomendado, forneça:
- match_score: porcentagem de 0-100 indicando compatibilidade
- reason: motivo conciso da recomendação (máximo 2 linhas)

Retorne em formato JSON com esta estrutura:
{
  "recommendations": [
    {
      "product_id": "id do produto",
      "match_score": 95,
      "reason": "motivo da recomendação"
    }
  ]
}`;

    const userPrompt = `Perfil do usuário:
- Categorias mais visualizadas: ${[...new Set(viewedCategories)].join(', ') || 'Nenhuma'}
- Tipos de conteúdo visualizados: ${[...new Set(viewedTypes)].join(', ') || 'Nenhum'}
- Categorias compradas: ${[...new Set(purchasedCategories)].join(', ') || 'Nenhuma'}
- Tipos de conteúdo comprados: ${[...new Set(purchasedTypes)].join(', ') || 'Nenhum'}
- Nível de habilidade: ${preferences?.skill_level || 'intermediario'}
- Interesses: ${preferences?.interests?.join(', ') || 'Não especificado'}

Produtos disponíveis no catálogo:
${JSON.stringify(availableProducts, null, 2)}

Gere 4 recomendações priorizando produtos que:
1. Complementam o que o usuário já consome
2. Estão alinhados com suas preferências
3. São apropriados para seu nível de habilidade
4. Têm alta qualidade (rating alto)`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_recommendations",
              description: "Gera recomendações personalizadas de produtos",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        product_id: { type: "string" },
                        match_score: { type: "number" },
                        reason: { type: "string" }
                      },
                      required: ["product_id", "match_score", "reason"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["recommendations"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_recommendations" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente mais tarde.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Por favor, adicione créditos ao workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const toolCall = aiData.choices[0].message.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call in AI response');
    }

    const aiRecommendations = JSON.parse(toolCall.function.arguments);
    
    // Enrich recommendations with product details
    const enrichedRecommendations = aiRecommendations.recommendations.map((rec: any) => {
      const product = availableProducts.find(p => p.id === rec.product_id);
      if (!product) return null;
      
      return {
        ...product,
        match_score: rec.match_score,
        reason: rec.reason
      };
    }).filter(Boolean);

    return new Response(
      JSON.stringify({ 
        success: true,
        recommendations: enrichedRecommendations 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error generating recommendations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao gerar recomendações';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
