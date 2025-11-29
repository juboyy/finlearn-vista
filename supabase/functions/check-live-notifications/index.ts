import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FollowedLive {
  id: string;
  user_id: string;
  live_id: string;
  live_title: string;
  live_scheduled_time: string;
  presenter_name: string;
}

interface NotificationPreference {
  user_id: string;
  enabled: boolean;
  notify_minutes_before: number;
  notify_on_start: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Iniciando verificação de notificações de live...');

    const now = new Date();
    const futureTime = new Date(now.getTime() + 60 * 60 * 1000); // próxima 1 hora

    // Buscar todas as lives seguidas que estão programadas para começar em breve
    const { data: followedLives, error: fetchError } = await supabase
      .from('user_followed_lives')
      .select('*')
      .gte('live_scheduled_time', now.toISOString())
      .lte('live_scheduled_time', futureTime.toISOString());

    if (fetchError) {
      console.error('Erro ao buscar lives seguidas:', fetchError);
      throw fetchError;
    }

    if (!followedLives || followedLives.length === 0) {
      console.log('Nenhuma live programada encontrada para próxima hora');
      return new Response(
        JSON.stringify({ 
          message: 'Nenhuma live programada encontrada',
          notificationsSent: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Encontradas ${followedLives.length} lives seguidas`);

    let notificationsSent = 0;

    // Para cada live seguida, verificar se deve enviar notificação
    for (const live of followedLives as FollowedLive[]) {
      const scheduledTime = new Date(live.live_scheduled_time);
      const minutesUntilStart = Math.floor((scheduledTime.getTime() - now.getTime()) / (1000 * 60));

      console.log(`Live "${live.live_title}" começa em ${minutesUntilStart} minutos`);

      // Buscar preferências de notificação do usuário
      const { data: preferences } = await supabase
        .from('live_notification_preferences')
        .select('*')
        .eq('user_id', live.user_id)
        .single();

      const userPreferences = preferences as NotificationPreference | null;

      // Se usuário não tem preferências, usar padrões
      const enabled = userPreferences?.enabled ?? true;
      const notifyMinutesBefore = userPreferences?.notify_minutes_before ?? 15;
      const notifyOnStart = userPreferences?.notify_on_start ?? true;

      if (!enabled) {
        console.log(`Notificações desabilitadas para usuário ${live.user_id}`);
        continue;
      }

      let shouldNotify = false;
      let notificationType = '';
      let notificationMessage = '';

      // Verificar se deve notificar (X minutos antes)
      if (minutesUntilStart <= notifyMinutesBefore && minutesUntilStart > 5) {
        notificationType = 'before_start';
        notificationMessage = `A live "${live.live_title}" com ${live.presenter_name} começa em ${minutesUntilStart} minutos!`;
        shouldNotify = true;
      }
      // Verificar se deve notificar (ao iniciar - 5 minutos antes)
      else if (notifyOnStart && minutesUntilStart <= 5 && minutesUntilStart >= 0) {
        notificationType = 'on_start';
        notificationMessage = `A live "${live.live_title}" com ${live.presenter_name} está começando agora!`;
        shouldNotify = true;
      }

      if (!shouldNotify) {
        continue;
      }

      // Verificar se já enviamos essa notificação
      const { data: alreadySent } = await supabase
        .from('live_notifications_sent')
        .select('id')
        .eq('user_id', live.user_id)
        .eq('live_id', live.live_id)
        .eq('notification_type', notificationType)
        .single();

      if (alreadySent) {
        console.log(`Notificação já enviada: ${notificationType} para live ${live.live_id}`);
        continue;
      }

      // Criar notificação
      const { error: notificationError } = await supabase
        .from('user_notifications')
        .insert({
          user_id: live.user_id,
          title: 'Live Programada',
          message: notificationMessage,
          notification_type: 'live_reminder',
          action_url: `/live?id=${live.live_id}`,
          metadata: {
            live_id: live.live_id,
            live_title: live.live_title,
            presenter_name: live.presenter_name,
            scheduled_time: live.live_scheduled_time,
            notification_type: notificationType
          }
        });

      if (notificationError) {
        console.error('Erro ao criar notificação:', notificationError);
        continue;
      }

      // Registrar que a notificação foi enviada
      await supabase
        .from('live_notifications_sent')
        .insert({
          user_id: live.user_id,
          live_id: live.live_id,
          notification_type: notificationType
        });

      notificationsSent++;
      console.log(`Notificação enviada: ${notificationType} para live ${live.live_id}`);
    }

    console.log(`Total de notificações enviadas: ${notificationsSent}`);

    return new Response(
      JSON.stringify({ 
        message: `Verificação concluída. ${notificationsSent} notificação(ões) enviada(s)`,
        notificationsSent,
        livesChecked: followedLives.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro na função check-live-notifications:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});