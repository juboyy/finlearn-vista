import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AssistantSuggestion {
  id: string;
  user_id: string;
  title: string;
  content: string;
  suggestion_type: 'news' | 'learning' | 'insights' | 'reminders';
  priority: 'low' | 'medium' | 'high';
  is_read: boolean;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export const useAssistantSuggestions = () => {
  const [suggestions, setSuggestions] = useState<AssistantSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchSuggestions = async () => {
    try {
      const { data, error } = await supabase
        .from("assistant_suggestions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSuggestions((data || []) as AssistantSuggestion[]);
      setUnreadCount(data?.filter(s => !s.is_read).length || 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("assistant_suggestions")
        .update({ is_read: true })
        .eq("id", id);

      if (error) throw error;

      setSuggestions(prev =>
        prev.map(s => (s.id === id ? { ...s, is_read: true } : s))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking suggestion as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from("assistant_suggestions")
        .update({ is_read: true })
        .eq("is_read", false);

      if (error) throw error;

      setSuggestions(prev => prev.map(s => ({ ...s, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return {
    suggestions,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchSuggestions,
  };
};
