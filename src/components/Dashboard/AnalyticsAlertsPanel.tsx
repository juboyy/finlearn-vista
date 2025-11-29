import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalyticsAlerts, AnalyticsAlert } from "@/hooks/useAnalyticsAlerts";
import { AlertPreferencesSettings } from "./AlertPreferencesSettings";
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Bell, 
  BellOff,
  CheckCheck,
  Trash2,
  X,
  Settings,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AnalyticsAlertsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
}

export function AnalyticsAlertsPanel({ open, onOpenChange, userId }: AnalyticsAlertsPanelProps) {
  const {
    alerts,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteAlert,
  } = useAnalyticsAlerts(userId);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'hsl(0, 35%, 65%)'; // Darker pastel red
      case 'high':
        return 'hsl(25, 35%, 65%)'; // Darker pastel orange
      case 'medium':
        return 'hsl(44, 35%, 65%)'; // Darker pastel yellow
      case 'low':
        return 'hsl(142, 35%, 65%)'; // Darker pastel green
      default:
        return 'hsl(210, 35%, 65%)'; // Darker pastel blue
    }
  };

  const getAlertIcon = (alert: AnalyticsAlert) => {
    if (alert.alert_type === 'milestone') {
      return <Award className="h-5 w-5" style={{ color: 'hsl(142, 35%, 65%)' }} />;
    }
    if (alert.alert_type === 'anomaly') {
      return <AlertTriangle className="h-5 w-5" style={{ color: getSeverityColor(alert.severity) }} />;
    }
    if (alert.metadata?.trend === 'up') {
      return <TrendingUp className="h-5 w-5" style={{ color: 'hsl(142, 35%, 65%)' }} />;
    }
    if (alert.metadata?.trend === 'down') {
      return <TrendingDown className="h-5 w-5" style={{ color: 'hsl(0, 35%, 65%)' }} />;
    }
    return <Bell className="h-5 w-5" style={{ color: 'hsl(210, 35%, 65%)' }} />;
  };

  const getSeverityLabel = (severity: string) => {
    const labels: { [key: string]: string } = {
      critical: 'Crítico',
      high: 'Alto',
      medium: 'Médio',
      low: 'Baixo',
    };
    return labels[severity] || severity;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-background border-l border-border">
        <SheetHeader className="space-y-4 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Bell className="h-6 w-6" style={{ color: 'hsl(210, 35%, 65%)' }} />
              Alertas Inteligentes
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="alerts" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alertas
              {unreadCount > 0 && (
                <Badge 
                  className="ml-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  style={{ 
                    backgroundColor: 'hsl(0, 35%, 65%)',
                    color: 'white',
                  }}
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="mt-0">
            {unreadCount > 0 && (
              <div className="flex justify-end mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-sm"
                >
                  <CheckCheck className="h-4 w-4 mr-1" />
                  Marcar todos como lidos
                </Button>
              </div>
            )}

            <ScrollArea className="h-[calc(100vh-240px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BellOff className="h-12 w-12 mb-4 opacity-40" />
              <p className="text-muted-foreground">Nenhum alerta no momento</p>
              <p className="text-sm text-muted-foreground mt-1">
                Você será notificado sobre mudanças importantes
              </p>
            </div>
          ) : (
            <div className="space-y-3 pr-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`relative rounded-lg border transition-all ${
                    !alert.is_read
                      ? 'bg-accent/10 border-accent/30'
                      : 'bg-background border-border'
                  }`}
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: getSeverityColor(alert.severity),
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getAlertIcon(alert)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className={`font-semibold text-sm ${
                            !alert.is_read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {alert.title}
                          </h3>
                          
                          <Badge 
                            variant="outline"
                            className="text-xs flex-shrink-0"
                            style={{ 
                              borderColor: getSeverityColor(alert.severity),
                              color: getSeverityColor(alert.severity),
                            }}
                          >
                            {getSeverityLabel(alert.severity)}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {alert.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(alert.created_at), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {!alert.is_read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(alert.id)}
                                className="h-7 text-xs"
                              >
                                Marcar como lido
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteAlert(alert.id)}
                              className="h-7 w-7"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <AlertPreferencesSettings userId={userId} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}