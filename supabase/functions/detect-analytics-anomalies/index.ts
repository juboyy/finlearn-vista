import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsData {
  userId: string;
  contentType: string;
  metrics: {
    [key: string]: number;
  };
}

interface Alert {
  user_id: string;
  alert_type: string;
  content_type: string;
  metric_name: string;
  current_value: number;
  previous_value?: number;
  change_percentage?: number;
  severity: string;
  title: string;
  message: string;
  metadata?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { userId, contentType, currentMetrics } = await req.json() as {
      userId: string;
      contentType: string;
      currentMetrics: { [key: string]: number };
    };

    console.log('Detecting anomalies for user:', userId, 'content type:', contentType);

    // Buscar preferências de alertas do usuário
    const { data: userPreferences, error: preferencesError } = await supabase
      .from('analytics_alert_preferences')
      .select('*')
      .eq('user_id', userId)
      .eq('content_type', contentType)
      .eq('is_enabled', true);

    if (preferencesError) {
      console.error('Error fetching user preferences:', preferencesError);
    }

    console.log('User preferences:', userPreferences);

    const alerts: Alert[] = [];

    // Buscar métricas históricas do usuário (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Simular análise de anomalias baseado em mudanças percentuais
    const thresholds = {
      total_consumed: { high: 50, critical: 100 },
      avg_time: { high: 30, critical: 60 },
      completion_rate: { high: 20, critical: 40 },
      weekly_consumption: { high: 40, critical: 80 },
    };

    // Exemplo de dados históricos (em produção, viria do banco)
    const historicalMetrics = {
      total_consumed: currentMetrics.total_consumed ? currentMetrics.total_consumed * 0.7 : 0,
      avg_time: currentMetrics.avg_time ? currentMetrics.avg_time * 0.85 : 0,
      completion_rate: currentMetrics.completion_rate ? currentMetrics.completion_rate * 0.9 : 0,
      weekly_consumption: currentMetrics.weekly_consumption ? currentMetrics.weekly_consumption * 0.8 : 0,
    };

    // Detectar anomalias baseado nas preferências do usuário
    for (const [metricName, currentValue] of Object.entries(currentMetrics)) {
      // Buscar preferência do usuário para esta métrica
      const userPref = userPreferences?.find(pref => pref.metric_name === metricName);
      
      const previousValue = historicalMetrics[metricName as keyof typeof historicalMetrics];
      
      if (previousValue && currentValue) {
        const changePercentage = ((currentValue - previousValue) / previousValue) * 100;
        const absChange = Math.abs(changePercentage);
        const isIncrease = changePercentage > 0;

        // Se o usuário tem preferência configurada, usar os limites personalizados
        if (userPref) {
          const meetsThreshold = absChange >= userPref.threshold_value;
          const meetsDirection = 
            userPref.threshold_direction === 'both' ||
            (userPref.threshold_direction === 'increase' && isIncrease) ||
            (userPref.threshold_direction === 'decrease' && !isIncrease);

          if (meetsThreshold && meetsDirection) {
            const severity = userPref.severity_override || 
              (absChange >= 100 ? 'critical' : 
               absChange >= 60 ? 'high' : 
               absChange >= 30 ? 'medium' : 'low');

            const direction = isIncrease ? 'aumento' : 'redução';
            const emoji = isIncrease ? '📈' : '📉';

            alerts.push({
              user_id: userId,
              alert_type: absChange >= 60 ? 'anomaly' : 'trend',
              content_type: contentType,
              metric_name: metricName,
              current_value: currentValue,
              previous_value: previousValue,
              change_percentage: changePercentage,
              severity,
              title: `${emoji} ${direction.charAt(0).toUpperCase() + direction.slice(1)} detectada`,
              message: `Sua métrica "${getMetricLabel(metricName)}" teve ${direction} de ${absChange.toFixed(1)}% em ${contentType}. Valor atual: ${currentValue.toFixed(1)}, valor anterior: ${previousValue.toFixed(1)}.`,
              metadata: {
                metric_label: getMetricLabel(metricName),
                trend: isIncrease ? 'up' : 'down',
                user_preference_id: userPref.id,
              },
            });
          }
        } else {
          // Se não houver preferência, usar thresholds padrão (mais altos para evitar spam)
          const threshold = thresholds[metricName as keyof typeof thresholds];
          if (threshold && absChange >= threshold.high) {
            let severity = 'medium';
            let alertType = 'trend';

            if (absChange >= threshold.critical) {
              severity = 'critical';
              alertType = 'anomaly';
            } else if (absChange >= threshold.high) {
              severity = 'high';
            }

            const direction = isIncrease ? 'aumento' : 'redução';
            const emoji = isIncrease ? '📈' : '📉';

            alerts.push({
              user_id: userId,
              alert_type: alertType,
              content_type: contentType,
              metric_name: metricName,
              current_value: currentValue,
              previous_value: previousValue,
              change_percentage: changePercentage,
              severity,
              title: `${emoji} ${direction.charAt(0).toUpperCase() + direction.slice(1)} significativa detectada`,
              message: `Sua métrica "${getMetricLabel(metricName)}" teve ${direction} de ${absChange.toFixed(1)}% em ${contentType}. Valor atual: ${currentValue.toFixed(1)}, valor anterior: ${previousValue.toFixed(1)}.`,
              metadata: {
                metric_label: getMetricLabel(metricName),
                trend: isIncrease ? 'up' : 'down',
              },
            });
          }
        }

        // Detectar marcos/milestones
        if (currentValue >= 100 && previousValue < 100) {
          alerts.push({
            user_id: userId,
            alert_type: 'milestone',
            content_type: contentType,
            metric_name: metricName,
            current_value: currentValue,
            previous_value: previousValue,
            severity: 'low',
            title: '🎉 Marco alcançado!',
            message: `Parabéns! Você atingiu ${currentValue.toFixed(0)} em ${getMetricLabel(metricName)} para ${contentType}.`,
            metadata: {
              milestone: 100,
            },
          });
        }
      }
    }

    // Inserir alertas no banco de dados
    if (alerts.length > 0) {
      const { error: insertError } = await supabase
        .from('analytics_alerts')
        .insert(alerts);

      if (insertError) {
        console.error('Error inserting alerts:', insertError);
        throw insertError;
      }

      console.log(`Created ${alerts.length} alerts for user ${userId}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        alertsCreated: alerts.length,
        alerts: alerts,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error detecting anomalies:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function getMetricLabel(metricName: string): string {
  const labels: { [key: string]: string } = {
    total_consumed: 'Total Consumido',
    avg_time: 'Tempo Médio',
    completion_rate: 'Taxa de Conclusão',
    weekly_consumption: 'Consumo Semanal',
    monthly_growth: 'Crescimento Mensal',
    engagement_rate: 'Taxa de Engajamento',
  };
  return labels[metricName] || metricName;
}