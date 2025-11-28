import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { EventFormSheet } from "@/components/Dashboard/EventFormSheet";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function MinhaAgenda() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    loadActivities();
  }, [selectedDate]);

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
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto bg-background">
        <header className="bg-background border-b-2 border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Minha Agenda</h1>
              <p className="text-sm text-muted-foreground mt-1">{formatDate(selectedDate)}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:bg-accent rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
              <button 
                onClick={handleNewEvent}
                className="flex items-center gap-2 px-4 py-2 bg-[hsl(142,35%,65%)] text-[hsl(142,35%,15%)] rounded-lg font-medium hover:bg-[hsl(142,35%,55%)] transition"
              >
                <Plus size={18} />
                <span>Novo Evento</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Calendário */}
          <section className="bg-card rounded-xl p-6 border-2 border-border mb-6">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className={cn("pointer-events-auto")}
              />
            </div>
          </section>

          {/* Atividades do Dia por Hora */}
          <section className="bg-card rounded-xl border-2 border-border overflow-hidden">
            <div className="p-6 border-b-2 border-border">
              <h2 className="text-xl font-semibold text-foreground">
                Atividades do Dia
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {activities.length} {activities.length === 1 ? 'atividade agendada' : 'atividades agendadas'}
              </p>
            </div>

            <div className="flex">
              {/* Time Column */}
              <div className="w-24 border-r-2 border-border bg-muted/20">
                <div className="h-16 border-b-2 border-border"></div>
                {Array.from({ length: 14 }, (_, i) => i + 6).map((hour) => (
                  <div key={hour} className="h-20 border-b border-border flex items-start justify-end pr-3 pt-2">
                    <span className="text-xs text-muted-foreground font-medium">
                      {String(hour).padStart(2, '0')}:00
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Events Column */}
              <div className="flex-1 relative">
                <div className="h-16 border-b-2 border-border flex items-center px-4 bg-muted/20">
                  <span className="text-sm font-semibold text-foreground">
                    {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
                  </span>
                </div>
                
                <div className="relative">
                  {Array.from({ length: 14 }, (_, i) => (
                    <div key={i} className="h-20 border-b border-border"></div>
                  ))}
                  
                  {/* Render Activities */}
                  {activities.map((activity, index) => {
                    const startDate = new Date(activity.start_time);
                    const endDate = new Date(activity.end_time);
                    const startHour = startDate.getHours();
                    const startMinute = startDate.getMinutes();
                    const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60); // duration in minutes
                    
                    // Calculate position (6am = 0, each hour = 80px)
                    const topOffset = ((startHour - 6) * 80) + (startMinute / 60 * 80);
                    const height = Math.max((duration / 60) * 80, 60); // minimum 60px height
                    
                    return (
                      <div
                        key={activity.id}
                        onClick={() => handleEditEvent(activity.id)}
                        className="absolute left-3 right-3 rounded-lg px-4 py-3 shadow-sm border-2 border-border cursor-pointer hover:shadow-md transition flex items-center"
                        style={{
                          top: `${topOffset + 16}px`, // +16 for header offset
                          height: `${height}px`,
                          backgroundColor: getColorForType(activity.activity_type),
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-foreground">
                                {formatTime(activity.start_time)} - {formatTime(activity.end_time)}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-foreground mb-0.5 leading-tight truncate">
                              {activity.title}
                            </h4>
                            {activity.location && (
                              <p className="text-xs text-muted-foreground leading-tight truncate">
                                {activity.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {activities.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">
                        Nenhuma atividade agendada para este dia
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <EventFormSheet
        open={showAddEventModal}
        onOpenChange={setShowAddEventModal}
        eventId={selectedEventId}
        onSave={loadActivities}
      />
    </div>
  );
}
