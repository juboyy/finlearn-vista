import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAlertPreferences, CreateAlertPreference } from '@/hooks/useAlertPreferences';
import { Settings, Plus, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface AlertPreferencesSettingsProps {
  userId: string | null;
}

export function AlertPreferencesSettings({ userId }: AlertPreferencesSettingsProps) {
  const {
    preferences,
    isLoading,
    createPreference,
    updatePreference,
    deletePreference,
    togglePreference,
    createDefaultPreferences,
  } = useAlertPreferences(userId);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPreference, setNewPreference] = useState<CreateAlertPreference>({
    content_type: 'podcast',
    metric_name: 'total_consumed',
    threshold_value: 30,
    threshold_direction: 'both',
    threshold_type: 'percentage',
    alert_frequency: 'immediate',
    notification_channels: ['in_app'],
  });

  const contentTypes = [
    { value: 'podcast', label: 'Podcasts' },
    { value: 'ebook', label: 'E-books' },
    { value: 'curso', label: 'Cursos' },
    { value: 'webinar', label: 'Webinars' },
    { value: 'artigo', label: 'Artigos' },
    { value: 'analise', label: 'Análises' },
    { value: 'relatorio', label: 'Relatórios' },
    { value: 'live', label: 'Lives' },
  ];

  const metricOptions = [
    { value: 'total_consumed', label: 'Total Consumido' },
    { value: 'weekly_consumption', label: 'Consumo Semanal' },
    { value: 'completion_rate', label: 'Taxa de Conclusão' },
    { value: 'avg_time', label: 'Tempo Médio' },
    { value: 'engagement_rate', label: 'Taxa de Engajamento' },
    { value: 'monthly_growth', label: 'Crescimento Mensal' },
  ];

  const handleCreatePreference = async () => {
    if (!userId) return;

    const result = await createPreference(newPreference);
    if (result) {
      toast.success('Preferência de alerta criada com sucesso!');
      setIsAddDialogOpen(false);
      setNewPreference({
        content_type: 'podcast',
        metric_name: 'total_consumed',
        threshold_value: 30,
        threshold_direction: 'both',
        threshold_type: 'percentage',
        alert_frequency: 'immediate',
        notification_channels: ['in_app'],
      });
    } else {
      toast.error('Erro ao criar preferência de alerta');
    }
  };

  const handleDeletePreference = async (id: string) => {
    await deletePreference(id);
    toast.success('Preferência removida');
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    await togglePreference(id, enabled);
    toast.success(enabled ? 'Alerta ativado' : 'Alerta desativado');
  };

  const handleInitializeDefaults = async () => {
    await createDefaultPreferences();
    toast.success('Preferências padrão criadas!');
  };

  const getDirectionIcon = (direction: string) => {
    if (direction === 'increase') return <TrendingUp className="h-4 w-4" />;
    if (direction === 'decrease') return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getDirectionLabel = (direction: string) => {
    const labels: { [key: string]: string } = {
      increase: 'Aumento',
      decrease: 'Redução',
      both: 'Ambos',
    };
    return labels[direction] || direction;
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: { [key: string]: string } = {
      immediate: 'Imediato',
      daily: 'Diário',
      weekly: 'Semanal',
    };
    return labels[frequency] || frequency;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5" style={{ color: 'hsl(210, 35%, 65%)' }} />
            Preferências de Alertas
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure quais métricas monitorar e defina limites personalizados
          </p>
        </div>

        <div className="flex items-center gap-2">
          {preferences.length === 0 && !isLoading && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleInitializeDefaults}
            >
              Criar Padrões
            </Button>
          )}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-pastel-blue hover:bg-pastel-blue/80">
                <Plus className="h-4 w-4 mr-1" />
                Novo Alerta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Nova Preferência de Alerta</DialogTitle>
                <DialogDescription>
                  Configure uma nova métrica para monitorar
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Tipo de Conteúdo</Label>
                  <Select
                    value={newPreference.content_type}
                    onValueChange={(value) =>
                      setNewPreference({ ...newPreference, content_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Métrica</Label>
                  <Select
                    value={newPreference.metric_name}
                    onValueChange={(value) =>
                      setNewPreference({ ...newPreference, metric_name: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {metricOptions.map((metric) => (
                        <SelectItem key={metric.value} value={metric.value}>
                          {metric.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Limite (%)</Label>
                  <Input
                    type="number"
                    value={newPreference.threshold_value}
                    onChange={(e) =>
                      setNewPreference({
                        ...newPreference,
                        threshold_value: Number(e.target.value),
                      })
                    }
                    min={1}
                    max={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    Alertar quando a mudança ultrapassar este valor
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Direção da Mudança</Label>
                  <Select
                    value={newPreference.threshold_direction}
                    onValueChange={(value) =>
                      setNewPreference({ ...newPreference, threshold_direction: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="increase">Apenas Aumentos</SelectItem>
                      <SelectItem value="decrease">Apenas Reduções</SelectItem>
                      <SelectItem value="both">Ambas as Direções</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Frequência de Alertas</Label>
                  <Select
                    value={newPreference.alert_frequency}
                    onValueChange={(value) =>
                      setNewPreference({ ...newPreference, alert_frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Imediato</SelectItem>
                      <SelectItem value="daily">Resumo Diário</SelectItem>
                      <SelectItem value="weekly">Resumo Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleCreatePreference}
                  className="w-full bg-pastel-blue hover:bg-pastel-blue/80"
                >
                  Criar Preferência
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : preferences.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <Settings className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-muted-foreground mb-4">
            Nenhuma preferência de alerta configurada
          </p>
          <Button
            onClick={handleInitializeDefaults}
            variant="outline"
          >
            Criar Preferências Padrão
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {preferences.map((pref) => (
              <div
                key={pref.id}
                className="border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: 'hsl(210, 35%, 65%)',
                          color: 'hsl(210, 35%, 65%)',
                        }}
                      >
                        {contentTypes.find((t) => t.value === pref.content_type)?.label}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">
                        {metricOptions.find((m) => m.value === pref.metric_name)?.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {getDirectionIcon(pref.threshold_direction)}
                        <span>{getDirectionLabel(pref.threshold_direction)}</span>
                      </div>
                      <div>
                        Limite: <span className="font-medium">{pref.threshold_value}%</span>
                      </div>
                      <div>
                        {getFrequencyLabel(pref.alert_frequency)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={pref.is_enabled}
                      onCheckedChange={(checked) => handleToggle(pref.id, checked)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeletePreference(pref.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}