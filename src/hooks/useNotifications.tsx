import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  notification_type: string;
  title: string;
  message: string;
  action_url?: string;
  metadata?: any;
  is_read: boolean;
  created_at: string;
  read_at?: string;
}

export const useNotifications = (userId: string | null) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchNotifications = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.is_read).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: 'Erro ao carregar notificações',
        description: 'Não foi possível carregar suas notificações.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .eq('id', notificationId)
        .eq('user_id', userId);

      if (error) throw error;

      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId 
            ? { ...n, is_read: true, read_at: new Date().toISOString() }
            : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!userId) return;

    try {
      const unreadIds = notifications
        .filter(n => !n.is_read)
        .map(n => n.id);

      if (unreadIds.length === 0) return;

      const { error } = await supabase
        .from('user_notifications')
        .update({ 
          is_read: true,
          read_at: new Date().toISOString()
        })
        .in('id', unreadIds)
        .eq('user_id', userId);

      if (error) throw error;

      // Update local state
      setNotifications(prev => 
        prev.map(n => ({ 
          ...n, 
          is_read: true,
          read_at: new Date().toISOString()
        }))
      );
      setUnreadCount(0);

      toast({
        title: 'Notificações marcadas como lidas',
        description: `${unreadIds.length} notificações foram marcadas como lidas.`,
      });
    } catch (error) {
      console.error('Error marking all as read:', error);
      toast({
        title: 'Erro ao marcar como lidas',
        description: 'Não foi possível marcar as notificações.',
        variant: 'destructive',
      });
    }
  };

  const deleteNotification = async (notificationId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_notifications')
        .delete()
        .eq('id', notificationId)
        .eq('user_id', userId);

      if (error) throw error;

      // Update local state
      const deletedNotif = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      
      if (deletedNotif && !deletedNotif.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir a notificação.',
        variant: 'destructive',
      });
    }
  };

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!userId) return;

    fetchNotifications();

    // Set up real-time subscription for new notifications
    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('New notification received:', payload);
          const newNotification = payload.new as Notification;
          
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);

          // Show toast for promotion notifications
          if (newNotification.notification_type === 'promotion') {
            toast({
              title: newNotification.title,
              description: newNotification.message,
              duration: 5000,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
};
