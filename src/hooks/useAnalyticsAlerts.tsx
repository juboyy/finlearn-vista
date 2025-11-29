import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsAlert {
  id: string;
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
  is_read: boolean;
  read_at?: string;
  created_at: string;
  metadata?: any;
}

export function useAnalyticsAlerts(userId: string | null) {
  const [alerts, setAlerts] = useState<AnalyticsAlert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlerts = async () => {
    if (!userId) {
      setAlerts([]);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('analytics_alerts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setAlerts(data || []);
      setUnreadCount((data || []).filter(alert => !alert.is_read).length);
    } catch (error) {
      console.error('Error fetching analytics alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('analytics_alerts')
        .update({ is_read: true })
        .eq('id', alertId);

      if (error) throw error;

      setAlerts(prev =>
        prev.map(alert =>
          alert.id === alertId ? { ...alert, is_read: true, read_at: new Date().toISOString() } : alert
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('analytics_alerts')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw error;

      setAlerts(prev =>
        prev.map(alert => ({ ...alert, is_read: true, read_at: new Date().toISOString() }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all alerts as read:', error);
    }
  };

  const deleteAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('analytics_alerts')
        .delete()
        .eq('id', alertId);

      if (error) throw error;

      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      setUnreadCount(prev => {
        const deletedAlert = alerts.find(a => a.id === alertId);
        return deletedAlert && !deletedAlert.is_read ? Math.max(0, prev - 1) : prev;
      });
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  const triggerAnomalyDetection = async (contentType: string, currentMetrics: any) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase.functions.invoke('detect-analytics-anomalies', {
        body: {
          userId,
          contentType,
          currentMetrics,
        },
      });

      if (error) throw error;

      console.log('Anomaly detection triggered:', data);
      
      // Recarregar alertas após detecção
      await fetchAlerts();
    } catch (error) {
      console.error('Error triggering anomaly detection:', error);
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Subscribe to real-time updates
    if (userId) {
      const channel = supabase
        .channel('analytics-alerts-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'analytics_alerts',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            console.log('New alert received:', payload);
            setAlerts(prev => [payload.new as AnalyticsAlert, ...prev]);
            setUnreadCount(prev => prev + 1);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [userId]);

  return {
    alerts,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteAlert,
    triggerAnomalyDetection,
    refreshAlerts: fetchAlerts,
  };
}