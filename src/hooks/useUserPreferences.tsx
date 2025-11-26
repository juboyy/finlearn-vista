import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserPreferences {
  id: string;
  user_id: string;
  preferred_categories: string[] | null;
  preferred_content_types: string[] | null;
  price_range_min: number | null;
  price_range_max: number | null;
  skill_level: string | null;
  interests: string[] | null;
}

export const useUserPreferences = (userIdProp?: string | null) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(userIdProp || null);
  const { toast } = useToast();

  // Get current user if userId not provided
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!userIdProp) {
        const { data: { user } } = await supabase.auth.getUser();
        setUserId(user?.id || null);
      }
    };
    getCurrentUser();
  }, [userIdProp]);

  const fetchPreferences = async () => {
    if (!userId) {
      setPreferences(null);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setPreferences(data);
      } else {
        // Create default preferences if none exist
        const { data: newPrefs, error: insertError } = await supabase
          .from('user_preferences')
          .insert({
            user_id: userId,
            preferred_categories: [],
            preferred_content_types: [],
            price_range_min: 0,
            price_range_max: 1000,
            skill_level: 'intermediario',
            interests: []
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setPreferences(newPrefs);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast({
        title: 'Erro ao carregar preferências',
        description: 'Não foi possível carregar suas preferências.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async (updates: Partial<Omit<UserPreferences, 'id' | 'user_id'>>) => {
    if (!userId || !preferences) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', userId);

      if (error) throw error;

      setPreferences({ ...preferences, ...updates });
      
      toast({
        title: 'Preferências salvas',
        description: 'Suas preferências foram atualizadas com sucesso.',
      });

      return true;
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: 'Erro ao salvar preferências',
        description: 'Não foi possível salvar suas preferências.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [userId]);

  return {
    preferences,
    isLoading,
    isSaving,
    savePreferences,
    refreshPreferences: fetchPreferences,
  };
};
