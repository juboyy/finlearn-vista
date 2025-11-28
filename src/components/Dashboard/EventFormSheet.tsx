import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(200, "Título muito longo"),
  description: z.string().max(500, "Descrição muito longa").optional(),
  activity_type: z.string().min(1, "Tipo é obrigatório"),
  start_time: z.string().min(1, "Data/hora inicial é obrigatória"),
  end_time: z.string().min(1, "Data/hora final é obrigatória"),
  location: z.string().max(200, "Local muito longo").optional(),
  color: z.string(),
});

interface Invitation {
  email: string;
  name: string;
}

interface EventFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId?: string | null;
  onSave: () => void;
}

export function EventFormSheet({ open, onOpenChange, eventId, onSave }: EventFormSheetProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    activity_type: "meeting",
    start_time: "",
    end_time: "",
    location: "",
    color: "pastel-blue",
  });
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newInvitee, setNewInvitee] = useState({ email: "", name: "" });

  useEffect(() => {
    if (open && eventId) {
      loadEvent();
    } else if (open && !eventId) {
      resetForm();
    }
  }, [open, eventId]);

  const loadEvent = async () => {
    if (!eventId) return;

    const { data, error } = await supabase
      .from("agenda_activities")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) {
      toast({ title: "Erro ao carregar evento", variant: "destructive" });
      return;
    }

    if (data) {
      setFormData({
        title: data.title,
        description: data.description || "",
        activity_type: data.activity_type,
        start_time: data.start_time.slice(0, 16),
        end_time: data.end_time.slice(0, 16),
        location: data.location || "",
        color: data.color,
      });

      // Load invitations
      const { data: invData } = await supabase
        .from("agenda_activity_invitations")
        .select("invitee_email, invitee_name")
        .eq("activity_id", eventId);

      if (invData) {
        setInvitations(invData.map(inv => ({ email: inv.invitee_email, name: inv.invitee_name || "" })));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      activity_type: "meeting",
      start_time: "",
      end_time: "",
      location: "",
      color: "pastel-blue",
    });
    setInvitations([]);
    setNewInvitee({ email: "", name: "" });
  };

  const handleSave = async () => {
    try {
      eventSchema.parse(formData);

      if (new Date(formData.end_time) <= new Date(formData.start_time)) {
        toast({ title: "Data/hora final deve ser posterior à inicial", variant: "destructive" });
        return;
      }

      setLoading(true);

      if (eventId) {
        // Update existing event
        const { error } = await supabase
          .from("agenda_activities")
          .update({
            ...formData,
            start_time: new Date(formData.start_time).toISOString(),
            end_time: new Date(formData.end_time).toISOString(),
          })
          .eq("id", eventId);

        if (error) throw error;

        // Update invitations
        await supabase.from("agenda_activity_invitations").delete().eq("activity_id", eventId);
        
        if (invitations.length > 0) {
          const invData = invitations.map(inv => ({
            activity_id: eventId,
            invitee_email: inv.email,
            invitee_name: inv.name || null,
          }));
          await supabase.from("agenda_activity_invitations").insert(invData);
        }

        toast({ title: "Evento atualizado com sucesso!" });
      } else {
        // Create new event
        const { data, error } = await supabase
          .from("agenda_activities")
          .insert({
            ...formData,
            start_time: new Date(formData.start_time).toISOString(),
            end_time: new Date(formData.end_time).toISOString(),
            status: "pending",
          })
          .select()
          .single();

        if (error) throw error;

        // Add invitations
        if (invitations.length > 0 && data) {
          const invData = invitations.map(inv => ({
            activity_id: data.id,
            invitee_email: inv.email,
            invitee_name: inv.name || null,
          }));
          await supabase.from("agenda_activity_invitations").insert(invData);
        }

        toast({ title: "Evento criado com sucesso!" });
      }

      onSave();
      onOpenChange(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Erro ao salvar evento", variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;
    if (!confirm("Deseja realmente excluir este evento?")) return;

    setLoading(true);
    const { error } = await supabase
      .from("agenda_activities")
      .delete()
      .eq("id", eventId);

    if (error) {
      toast({ title: "Erro ao excluir evento", variant: "destructive" });
    } else {
      toast({ title: "Evento excluído com sucesso!" });
      onSave();
      onOpenChange(false);
    }
    setLoading(false);
  };

  const addInvitation = () => {
    if (!newInvitee.email.trim()) {
      toast({ title: "Email é obrigatório", variant: "destructive" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newInvitee.email)) {
      toast({ title: "Email inválido", variant: "destructive" });
      return;
    }

    setInvitations([...invitations, newInvitee]);
    setNewInvitee({ email: "", name: "" });
  };

  const removeInvitation = (index: number) => {
    setInvitations(invitations.filter((_, i) => i !== index));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-slate-800">
            {eventId ? "Editar Evento" : "Novo Evento"}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
              Título *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Reunião com cliente"
              className="border-slate-300"
            />
          </div>

          {/* Type and Color */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-semibold text-slate-700">
                Tipo *
              </Label>
              <Select
                value={formData.activity_type}
                onValueChange={(value) => setFormData({ ...formData, activity_type: value })}
              >
                <SelectTrigger className="border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Reunião</SelectItem>
                  <SelectItem value="study">Estudo</SelectItem>
                  <SelectItem value="training">Treinamento</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="video">Vídeo</SelectItem>
                  <SelectItem value="analysis">Análise</SelectItem>
                  <SelectItem value="review">Revisão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color" className="text-sm font-semibold text-slate-700">
                Cor
              </Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger className="border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pastel-blue">Azul</SelectItem>
                  <SelectItem value="pastel-green">Verde</SelectItem>
                  <SelectItem value="pastel-rose">Rosa</SelectItem>
                  <SelectItem value="pastel-purple">Roxo</SelectItem>
                  <SelectItem value="pastel-peach">Pêssego</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time" className="text-sm font-semibold text-slate-700">
                Início *
              </Label>
              <Input
                id="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_time" className="text-sm font-semibold text-slate-700">
                Término *
              </Label>
              <Input
                id="end_time"
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                className="border-slate-300"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold text-slate-700">
              Local
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ex: Sala de reuniões 2"
              className="border-slate-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Adicione detalhes sobre o evento..."
              rows={4}
              className="border-slate-300 resize-none"
            />
          </div>

          {/* Invitations */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-slate-700">Convidar Pessoas</Label>
            
            <div className="flex gap-2">
              <Input
                placeholder="Email"
                value={newInvitee.email}
                onChange={(e) => setNewInvitee({ ...newInvitee, email: e.target.value })}
                className="flex-1 border-slate-300"
              />
              <Input
                placeholder="Nome (opcional)"
                value={newInvitee.name}
                onChange={(e) => setNewInvitee({ ...newInvitee, name: e.target.value })}
                className="flex-1 border-slate-300"
              />
              <Button
                type="button"
                onClick={addInvitation}
                className="bg-pastel-green hover:bg-pastel-green/90"
              >
                <Plus size={16} />
              </Button>
            </div>

            {invitations.length > 0 && (
              <div className="space-y-2">
                {invitations.map((inv, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{inv.email}</p>
                      {inv.name && <p className="text-xs text-slate-500">{inv.name}</p>}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInvitation(index)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            {eventId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                disabled={loading}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-2" />
                Excluir
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-pastel-green hover:bg-pastel-green/90 text-slate-700"
            >
              {loading ? "Salvando..." : eventId ? "Atualizar" : "Criar Evento"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
