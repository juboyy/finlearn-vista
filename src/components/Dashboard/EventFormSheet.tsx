import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Trash2, Users, BookOpen, GraduationCap, Mic, Video, LineChart, FileCheck } from "lucide-react";
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

  const activityTypes = [
    { value: "meeting", label: "Reunião", icon: Users },
    { value: "study", label: "Estudo", icon: BookOpen },
    { value: "training", label: "Treinamento", icon: GraduationCap },
    { value: "podcast", label: "Podcast", icon: Mic },
    { value: "video", label: "Vídeo", icon: Video },
    { value: "analysis", label: "Análise", icon: LineChart },
    { value: "review", label: "Revisão", icon: FileCheck },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[650px] overflow-y-auto bg-background">
        <SheetHeader className="pb-6 border-b border-border">
          <SheetTitle className="text-3xl font-bold text-foreground">
            {eventId ? "Editar Evento" : "Novo Evento"}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base font-semibold text-foreground">
              Título do Evento *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Reunião com cliente"
              className="h-12 text-base border-2 border-border focus:border-primary transition-colors"
            />
          </div>

          {/* Type and Color */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="type" className="text-base font-semibold text-foreground">
                Tipo de Evento *
              </Label>
              <Select
                value={formData.activity_type}
                onValueChange={(value) => setFormData({ ...formData, activity_type: value })}
              >
                <SelectTrigger className="h-12 text-base border-2 border-border focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-3">
                        <type.icon className="w-5 h-5 text-muted-foreground" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="color" className="text-base font-semibold text-foreground">
                Cor de Destaque
              </Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger className="h-12 text-base border-2 border-border focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pastel-blue">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[hsl(206,35%,75%)]" />
                      <span>Azul</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pastel-green">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[hsl(142,35%,75%)]" />
                      <span>Verde</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pastel-rose">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[hsl(350,35%,75%)]" />
                      <span>Rosa</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pastel-purple">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[hsl(270,35%,75%)]" />
                      <span>Roxo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pastel-peach">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[hsl(25,35%,75%)]" />
                      <span>Pêssego</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="p-6 rounded-xl bg-muted/30 border border-border space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Data e Horário</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="start_time" className="text-base font-medium text-foreground">
                  Início *
                </Label>
                <Input
                  id="start_time"
                  type="datetime-local"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  className="h-12 border-2 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="end_time" className="text-base font-medium text-foreground">
                  Término *
                </Label>
                <Input
                  id="end_time"
                  type="datetime-local"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  className="h-12 border-2 border-border focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label htmlFor="location" className="text-base font-semibold text-foreground">
              Local do Evento
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ex: Sala de reuniões 2, Link do Zoom, etc."
              className="h-12 text-base border-2 border-border focus:border-primary"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold text-foreground">
              Descrição do Evento
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Adicione detalhes importantes sobre o evento, agenda, objetivos..."
              rows={5}
              className="text-base border-2 border-border focus:border-primary resize-none"
            />
          </div>

          {/* Invitations */}
          <div className="p-6 rounded-xl bg-muted/30 border border-border space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Convidar Pessoas</h3>
            </div>
            
            <div className="space-y-3">
              <Input
                placeholder="Email do convidado"
                value={newInvitee.email}
                onChange={(e) => setNewInvitee({ ...newInvitee, email: e.target.value })}
                className="w-full h-12 border-2 border-border focus:border-primary"
              />
              <div className="flex gap-3">
                <Input
                  placeholder="Nome (opcional)"
                  value={newInvitee.name}
                  onChange={(e) => setNewInvitee({ ...newInvitee, name: e.target.value })}
                  className="flex-1 h-12 border-2 border-border focus:border-primary"
                />
                <Button
                  type="button"
                  onClick={addInvitation}
                  className="h-12 px-6 bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-[hsl(142,35%,15%)]"
                >
                  <Plus size={20} />
                </Button>
              </div>
            </div>

            {invitations.length > 0 && (
              <div className="space-y-3 mt-4">
                <p className="text-sm font-medium text-muted-foreground">{invitations.length} pessoa(s) convidada(s)</p>
                {invitations.map((inv, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border-2 border-border hover:border-primary transition-colors"
                  >
                    <div>
                      <p className="text-base font-semibold text-foreground">{inv.email}</p>
                      {inv.name && <p className="text-sm text-muted-foreground mt-1">{inv.name}</p>}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInvitation(index)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t-2 border-border mt-8">
            {eventId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                disabled={loading}
                className="h-14 px-6 border-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
              >
                <Trash2 size={20} className="mr-2" />
                Excluir Evento
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1 h-14 text-base border-2 hover:bg-muted"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="flex-1 h-14 text-base font-semibold bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-[hsl(142,35%,15%)]"
            >
              {loading ? "Salvando..." : eventId ? "Atualizar Evento" : "Criar Evento"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
