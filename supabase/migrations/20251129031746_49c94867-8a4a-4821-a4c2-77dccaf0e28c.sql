-- Criar cron job para verificar notificações de live a cada 5 minutos
-- IMPORTANTE: Se você fizer remix deste projeto, precisará recriar este cron job
-- com as credenciais do seu próprio projeto

SELECT cron.schedule(
  'check-live-notifications-every-5min',
  '*/5 * * * *',
  $$
  SELECT
    net.http_post(
        url:='https://kldjajwwyluhvkcubrlg.supabase.co/functions/v1/check-live-notifications',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZGphand3eWx1aHZrY3VicmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDAxNzYsImV4cCI6MjA3OTU3NjE3Nn0.ROuNGBAeVBZ9Cw40phv5rm7z08D0fJOTiClN216eoEI"}'::jsonb,
        body:=concat('{"timestamp": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);