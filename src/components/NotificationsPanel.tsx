import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, Check, CheckCheck, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
}

export const NotificationsPanel = ({ open, onOpenChange, userId }: NotificationsPanelProps) => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications(userId);

  const handleNotificationClick = (notification: any) => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
    
    if (notification.action_url) {
      navigate(notification.action_url);
      onOpenChange(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'promotion':
        return <Tag className="w-5 h-5 text-pastel-pink" />;
      case 'recommendation':
        return <Bell className="w-5 h-5 text-pastel-blue" />;
      default:
        return <Bell className="w-5 h-5 text-pastel-purple" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:max-w-[500px] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="border-b border-border p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pastel-purple/20 rounded-lg flex items-center justify-center">
                  <Bell className="text-foreground" size={20} />
                </div>
                <div>
                  <SheetTitle className="text-xl font-semibold text-foreground">
                    Notificações
                  </SheetTitle>
                  {unreadCount > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {unreadCount} não {unreadCount === 1 ? 'lida' : 'lidas'}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    <CheckCheck size={16} className="mr-1" />
                    Marcar todas
                  </Button>
                )}
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="ghost"
                  size="icon"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="p-6 text-center">
                <p className="text-sm text-muted-foreground">Carregando notificações...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-pastel-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhuma notificação
                </h3>
                <p className="text-sm text-muted-foreground">
                  Você não tem notificações no momento
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition cursor-pointer group ${
                      !notification.is_read ? 'bg-pastel-blue/5' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.notification_type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-semibold ${
                            !notification.is_read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.is_read && (
                            <div className="w-2 h-2 bg-pastel-pink rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {notification.message}
                        </p>

                        {notification.metadata?.discount_percentage && (
                          <Badge 
                            variant="outline" 
                            className="bg-pastel-pink/20 text-foreground border-pastel-pink/30 mb-2"
                          >
                            {notification.metadata.discount_percentage}% OFF
                          </Badge>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.created_at), {
                              addSuffix: true,
                              locale: ptBR
                            })}
                          </span>
                          
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                            {!notification.is_read && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Check size={14} />
                              </Button>
                            )}
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
