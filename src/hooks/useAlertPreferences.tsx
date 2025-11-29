import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AlertPreference {
  id: string;
  user_id: string;
  content_type: string;
  metric_name: string;
  is_enabled: boolean;
  threshold_type: string;
  threshold_value: number;
  threshold_direction: string;
  alert_frequency: string;
  severity_override?: string;
  notification_channels: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateAlertPreference {
  content_type: string;
  metric_name: string;
  is_enabled?: boolean;
  threshold_type?: string;
  threshold_value: number;
  threshold_direction?: string;
  alert_frequency?: string;
  severity_override?: string;
  notification_channels?: string[];
}

export function useAlertPreferences(userId: string | null) {
  const [preferences, setPreferences] = useState<AlertPreference[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPreferences = async () => {
    if (!userId) {
      setPreferences([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('analytics_alert_preferences')
        .select('*')
        .eq('user_id', userId)
        .order('content_type', { ascending: true })
        .order('metric_name', { ascending: true });

      if (error) throw error;

      // Transform notification_channels from Json to string[]
      const transformedData = (data || []).map(pref => ({
        ...pref,
        notification_channels: Array.isArray(pref.notification_channels) 
          ? pref.notification_channels 
          : ['in_app'],
      })) as AlertPreference[];

      setPreferences(transformedData);
    } catch (error) {
      console.error('Error fetching alert preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPreference = async (preference: CreateAlertPreference) => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('analytics_alert_preferences')
        .insert({
          user_id: userId,
          ...preference,
        })
        .select()
        .single();

      if (error) throw error;

      const transformedData = {
        ...data,
        notification_channels: Array.isArray(data.notification_channels) 
          ? data.notification_channels 
          : ['in_app'],
      } as AlertPreference;

      setPreferences(prev => [...prev, transformedData]);
      return transformedData;
    } catch (error) {
      console.error('Error creating alert preference:', error);
      return null;
    }
  };

  const updatePreference = async (id: string, updates: Partial<AlertPreference>) => {
    try {
      const { data, error } = await supabase
        .from('analytics_alert_preferences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const transformedData = {
        ...data,
        notification_channels: Array.isArray(data.notification_channels) 
          ? data.notification_channels 
          : ['in_app'],
      } as AlertPreference;

      setPreferences(prev =>
        prev.map(pref => (pref.id === id ? transformedData : pref))
      );
      return transformedData;
    } catch (error) {
      console.error('Error updating alert preference:', error);
      return null;
    }
  };

  const deletePreference = async (id: string) => {
    try {
      const { error } = await supabase
        .from('analytics_alert_preferences')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPreferences(prev => prev.filter(pref => pref.id !== id));
    } catch (error) {
      console.error('Error deleting alert preference:', error);
    }
  };

  const togglePreference = async (id: string, enabled: boolean) => {
    return updatePreference(id, { is_enabled: enabled });
  };

  const createDefaultPreferences = async () => {
    if (!userId) return;

    try {
      const { error } = await supabase.rpc('create_default_alert_preferences', {
        p_user_id: userId,
      });

      if (error) throw error;

      await fetchPreferences();
    } catch (error) {
      console.error('Error creating default preferences:', error);
    }
  };

  useEffect(() => {
    fetchPreferences();

    // Subscribe to real-time updates
    if (userId) {
      const channel = supabase
        .channel('alert-preferences-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'analytics_alert_preferences',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            console.log('Preference changed:', payload);
            fetchPreferences();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [userId]);

  return {
    preferences,
    isLoading,
    createPreference,
    updatePreference,
    deletePreference,
    togglePreference,
    createDefaultPreferences,
    refreshPreferences: fetchPreferences,
  };
}