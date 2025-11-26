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
    const { promotionId } = await req.json();
    
    if (!promotionId) {
      return new Response(
        JSON.stringify({ error: 'promotionId é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Processing promotion notification for:', promotionId);

    // Get the promotion details
    const { data: promotion, error: promotionError } = await supabase
      .from('product_promotions')
      .select('*')
      .eq('id', promotionId)
      .single();

    if (promotionError || !promotion) {
      throw new Error('Promoção não encontrada');
    }

    console.log('Promotion found:', promotion.product_title);

    // Find users who viewed similar products
    // Similar = same category OR overlapping tags
    const { data: browsingHistory, error: historyError } = await supabase
      .from('user_browsing_history')
      .select('user_id, product_category, product_tags')
      .or(`product_category.eq.${promotion.product_category},product_tags.ov.{${promotion.product_tags?.join(',') || ''}}`);

    if (historyError) {
      console.error('Error fetching browsing history:', historyError);
      throw historyError;
    }

    // Get unique users who viewed similar products (excluding the exact product on promotion)
    const interestedUsers = new Map<string, { category?: string; tags?: string[] }>();
    
    browsingHistory?.forEach((history) => {
      if (!interestedUsers.has(history.user_id)) {
        interestedUsers.set(history.user_id, {
          category: history.product_category,
          tags: history.product_tags
        });
      }
    });

    console.log(`Found ${interestedUsers.size} interested users`);

    // Create notifications for interested users
    const notifications = Array.from(interestedUsers.entries()).map(([userId, userInterests]) => {
      // Determine similarity reason
      let similarityReason = '';
      if (userInterests.category === promotion.product_category) {
        similarityReason = `categoria "${promotion.product_category}"`;
      } else if (userInterests.tags && promotion.product_tags) {
        const commonTags = userInterests.tags.filter(tag => 
          promotion.product_tags?.includes(tag)
        );
        if (commonTags.length > 0) {
          similarityReason = `interesse em ${commonTags.join(', ')}`;
        }
      }

      return {
        user_id: userId,
        notification_type: 'promotion',
        title: `🎉 Promoção em ${promotion.product_type === 'ebook' ? 'eBook' : 'Curso'}!`,
        message: `${promotion.product_title} está com ${promotion.discount_percentage}% de desconto! De R$ ${promotion.original_price} por R$ ${promotion.promotional_price}. ${similarityReason ? `Recomendado pela sua ${similarityReason}.` : ''}`,
        action_url: `/${promotion.product_type}/${promotion.product_id}`,
        metadata: {
          promotion_id: promotionId,
          product_id: promotion.product_id,
          product_type: promotion.product_type,
          original_price: promotion.original_price,
          promotional_price: promotion.promotional_price,
          discount_percentage: promotion.discount_percentage,
          similarity_reason: similarityReason
        }
      };
    });

    if (notifications.length === 0) {
      console.log('No interested users found');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Nenhum usuário interessado encontrado',
          notified_count: 0 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert notifications in batches
    const batchSize = 100;
    let totalInserted = 0;

    for (let i = 0; i < notifications.length; i += batchSize) {
      const batch = notifications.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('user_notifications')
        .insert(batch);

      if (insertError) {
        console.error('Error inserting notification batch:', insertError);
        throw insertError;
      }

      totalInserted += batch.length;
      console.log(`Inserted ${batch.length} notifications (total: ${totalInserted})`);
    }

    console.log(`Successfully created ${totalInserted} notifications`);

    return new Response(
      JSON.stringify({ 
        success: true,
        notified_count: totalInserted,
        promotion: {
          id: promotion.id,
          title: promotion.product_title,
          discount: promotion.discount_percentage
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in notify-similar-promotions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao notificar usuários';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
