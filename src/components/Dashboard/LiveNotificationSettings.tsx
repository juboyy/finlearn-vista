import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const LiveNotificationSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    enabled: true,
    notify_minutes_before: 15,
    notify_on_start: true
  });

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('live_notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPreferences({
          enabled: data.enabled,
          notify_minutes_before: data.notify_minutes_before,
          notify_on_start: data.notify_on_start
        });
      }
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data: existing } = await supabase
        .from('live_notification_preferences')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('live_notification_preferences')
          .update({
            enabled: preferences.enabled,
            notify_minutes_before: preferences.notify_minutes_before,
            notify_on_start: preferences.notify_on_start
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('live_notification_preferences')
          .insert({
            user_id: user.id,
            enabled: preferences.enabled,
            notify_minutes_before: preferences.notify_minutes_before,
            notify_on_start: preferences.notify_on_start
          });

        if (error) throw error;
      }

      toast({
        title: "Preferências salvas",
        description: "Suas preferências de notificação de lives foram atualizadas."
      });
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar suas preferências.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="p-5 bg-white rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
            <i className="fas fa-video text-slate-700"></i>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">Notificações de Live</h3>
            <p className="text-xs text-slate-500">Configure alertas sobre lives que você segue</p>
          </div>
        </div>
        <Label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.enabled}
            onChange={(e) => setPreferences(prev => ({ ...prev, enabled: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-purple"></div>
        </Label>
      </div>

      <div className={`space-y-4 ${!preferences.enabled ? 'opacity-50' : ''}`}>
        {/* Notificar minutos antes */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">
            Alertar {preferences.notify_minutes_before} minutos antes
          </Label>
          <Slider
            value={[preferences.notify_minutes_before]}
            onValueChange={(value) => 
              setPreferences(prev => ({ ...prev, notify_minutes_before: value[0] }))
            }
            min={5}
            max={60}
            step={5}
            className="w-full"
            disabled={!preferences.enabled}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>5 min</span>
            <span>60 min</span>
          </div>
        </div>

        {/* Notificar ao iniciar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <Label className="text-sm font-medium text-slate-700 block mb-1">
              Notificar ao iniciar
            </Label>
            <p className="text-xs text-slate-500">
              Alerta quando a live estiver começando (5 min antes)
            </p>
          </div>
          <Label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.notify_on_start}
              onChange={(e) => setPreferences(prev => ({ ...prev, notify_on_start: e.target.checked }))}
              disabled={!preferences.enabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green peer-disabled:opacity-50"></div>
          </Label>
        </div>

        {/* Informações */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-600 mb-2">
            <i className="fas fa-info-circle mr-1 text-pastel-blue"></i>
            Como funciona:
          </p>
          <ul className="space-y-1 text-xs text-slate-500 pl-4">
            <li>• Notificações apenas de lives que você segue</li>
            <li>• Clique em "Ativar Notificação" nas próximas transmissões</li>
            <li>• Alertas aparecem no sino de notificações</li>
          </ul>
        </div>

        {/* Botão Salvar */}
        <button
          onClick={handleSave}
          disabled={saving || !preferences.enabled}
          className="w-full mt-4 px-4 py-2.5 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Salvar Preferências
            </>
          )}
        </button>
      </div>
    </div>
  );
};