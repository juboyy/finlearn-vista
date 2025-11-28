import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { EventFormSheet } from "./EventFormSheet";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface AgendaPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgendaPanel({ open, onOpenChange }: AgendaPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      loadActivities();
    }
  }, [open, selectedDate]);

  const loadActivities = async () => {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const { data } = await supabase
      .from("agenda_activities")
      .select("*")
      .gte("start_time", startOfDay.toISOString())
      .lte("start_time", endOfDay.toISOString())
      .order("start_time", { ascending: true });
    
    if (data) {
      setActivities(data);
    }
  };

  const handleEditEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowAddEventModal(true);
  };

  const handleNewEvent = () => {
    setSelectedEventId(null);
    setShowAddEventModal(true);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getColorForType = (type: string) => {
    const colors: Record<string, string> = {
      meeting: 'hsl(206, 35%, 75%)',
      study: 'hsl(44, 35%, 75%)',
      training: 'hsl(270, 35%, 75%)',
      podcast: 'hsl(340, 35%, 75%)',
      video: 'hsl(142, 35%, 75%)',
      analysis: 'hsl(25, 35%, 75%)',
      review: 'hsl(190, 35%, 75%)',
    };
    return colors[type] || 'hsl(206, 35%, 75%)';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[90vw] sm:w-[480px] max-w-[480px] overflow-y-auto">
          <SheetHeader className="border-b-2 border-border pb-4">
            <SheetTitle className="text-2xl text-foreground">Minha Agenda</SheetTitle>
            <p className="text-sm text-muted-foreground mt-1">{formatDate(selectedDate)}</p>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Calendário */}
            <div className="bg-card rounded-xl p-4 border-2 border-border">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className={cn("pointer-events-auto")}
                />
              </div>
            </div>

            {/* Botão Novo Evento */}
            <Button 
              onClick={handleNewEvent}
              className="w-full bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-[hsl(142,35%,15%)]"
            >
              <Plus size={18} className="mr-2" />
              Novo Evento
            </Button>

            {/* Atividades do Dia */}
            <div className="bg-card rounded-xl border-2 border-border">
              <div className="p-4 border-b-2 border-border">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock size={20} />
                  Atividades do Dia
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activities.length} {activities.length === 1 ? 'atividade agendada' : 'atividades agendadas'}
                </p>
              </div>

              <div className="p-4">
                {activities.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">
                      Nenhuma atividade agendada para este dia
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activities.map((activity) => {
                      const startDate = new Date(activity.start_time);
                      const endDate = new Date(activity.end_time);
                      
                      return (
                        <div
                          key={activity.id}
                          onClick={() => handleEditEvent(activity.id)}
                          className="p-4 rounded-lg border-2 border-border cursor-pointer hover:shadow-md transition"
                          style={{
                            backgroundColor: getColorForType(activity.activity_type),
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-foreground">
                                  {formatTime(activity.start_time)} - {formatTime(activity.end_time)}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold text-foreground mb-1 truncate">
                                {activity.title}
                              </h4>
                              {activity.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {activity.description}
                                </p>
                              )}
                              {activity.location && (
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                  📍 {activity.location}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <EventFormSheet
        open={showAddEventModal}
        onOpenChange={setShowAddEventModal}
        eventId={selectedEventId}
        onSave={loadActivities}
      />
    </>
  );
}
