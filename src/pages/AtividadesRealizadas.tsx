import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, ChevronLeft, ChevronRight, CalendarCheck, Clock, BookOpen, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

interface Activity {
  id: string;
  title: string;
  description: string | null;
  activity_type: string;
  start_time: string;
  end_time: string;
  status: string;
  color: string;
  icon: string | null;
  location: string | null;
}

export default function AtividadesRealizadas() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<"hoje" | "semana" | "mes">("hoje");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [selectedPeriod]);

  const getDateRange = () => {
    const now = new Date();
    
    switch (selectedPeriod) {
      case "hoje":
        return {
          start: startOfDay(now),
          end: endOfDay(now)
        };
      case "semana":
        return {
          start: startOfWeek(now, { weekStartsOn: 0 }),
          end: endOfWeek(now, { weekStartsOn: 0 })
        };
      case "mes":
        return {
          start: startOfMonth(now),
          end: endOfMonth(now)
        };
    }
  };

  const fetchActivities = async () => {
    setLoading(true);
    const { start, end } = getDateRange();

    const { data, error } = await supabase
      .from("agenda_activities")
      .select("*")
      .eq("status", "completed")
      .gte("completed_at", start.toISOString())
      .lte("completed_at", end.toISOString())
      .order("completed_at", { ascending: false });

    if (error) {
      console.error("Error fetching activities:", error);
    } else {
      setActivities(data || []);
    }
    
    setLoading(false);
  };

  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      podcast: "fa-podcast",
      meeting: "fa-users",
      study: "fa-book-open",
      training: "fa-graduation-cap",
      video: "fa-video",
      analysis: "fa-chart-line",
      review: "fa-file-alt"
    };
    return icons[type] || "fa-calendar";
  };

  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${format(new Date(startTime), "HH:mm")} - ${format(new Date(endTime), "HH:mm")}`;
  };

  const calculateTotalHours = () => {
    const totalMinutes = activities.reduce((acc, activity) => {
      const start = new Date(activity.start_time);
      const end = new Date(activity.end_time);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60);
      return acc + diff;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  };

  const countByType = (type: string) => {
    return activities.filter(a => a.activity_type === type).length;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/minha-agenda/dia')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Atividades Realizadas</h1>
                <p className="text-sm text-slate-500 mt-1">Histórico de atividades concluídas</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar esquerda */}
            <aside className="w-80 space-y-6">
              {/* Mini Calendar */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Novembro 2024</h2>
                  <div className="flex gap-2">
                    <button className="p-1 text-slate-600 hover:bg-slate-100 rounded transition">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="p-1 text-slate-600 hover:bg-slate-100 rounded transition">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-600 mb-2">
                  <div className="py-1 font-medium">D</div>
                  <div className="py-1 font-medium">S</div>
                  <div className="py-1 font-medium">T</div>
                  <div className="py-1 font-medium">Q</div>
                  <div className="py-1 font-medium">Q</div>
                  <div className="py-1 font-medium">S</div>
                  <div className="py-1 font-medium">S</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {[27, 28, 29, 30, 31].map(day => (
                    <div key={`prev-${day}`} className="py-1 text-slate-400 text-xs">{day}</div>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                    <div 
                      key={`curr-${day}`}
                      className={`py-1 text-xs cursor-pointer rounded ${
                        day === 19 
                          ? 'bg-pastel-blue text-white font-semibold' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                  {[1, 2, 3, 4, 5, 6, 7].map(day => (
                    <div key={`next-${day}`} className="py-1 text-slate-400 text-xs">{day}</div>
                  ))}
                </div>
              </section>

              {/* Summary Card */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Resumo</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                        <CalendarCheck size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Total Realizadas</span>
                    </div>
                    <span className="font-semibold text-slate-800">{activities.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <Clock size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Horas Totais</span>
                    </div>
                    <span className="font-semibold text-slate-800">{calculateTotalHours()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-rose rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Estudos</span>
                    </div>
                    <span className="font-semibold text-slate-800">{countByType('study') + countByType('training')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Users size={16} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Reuniões</span>
                    </div>
                    <span className="font-semibold text-slate-800">{countByType('meeting')}</span>
                  </div>
                </div>
              </section>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 space-y-6">
              {/* Filtros de Período */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPeriod("hoje")}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                      selectedPeriod === "hoje"
                        ? "bg-pastel-blue text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Hoje
                  </button>
                  <button
                    onClick={() => setSelectedPeriod("semana")}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                      selectedPeriod === "semana"
                        ? "bg-pastel-blue text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Esta Semana
                  </button>
                  <button
                    onClick={() => setSelectedPeriod("mes")}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition ${
                      selectedPeriod === "mes"
                        ? "bg-pastel-blue text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Este Mês
                  </button>
                </div>
              </section>

              {/* Lista de Atividades */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Lista de Atividades</h2>
                  <span className="text-sm text-slate-500">
                    {selectedPeriod === "hoje" && "Atividades de hoje"}
                    {selectedPeriod === "semana" && "Atividades desta semana"}
                    {selectedPeriod === "mes" && "Atividades deste mês"}
                  </span>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                      <p className="mt-4 text-sm text-slate-500">Carregando atividades...</p>
                    </div>
                  ) : activities.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarCheck size={48} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-sm text-slate-500">Nenhuma atividade realizada neste período</p>
                    </div>
                  ) : (
                    activities.map((activity) => (
                      <div 
                        key={activity.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-${activity.color} hover:bg-slate-50 transition cursor-pointer`}
                      >
                        <div className={`w-1 h-16 bg-${activity.color} rounded-full`}></div>
                        <div className={`w-12 h-12 bg-${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <i className={`fas ${activity.icon || getActivityIcon(activity.activity_type)} text-slate-700`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900">{activity.title}</h4>
                          <p className="text-xs text-slate-900 mt-1">
                            {formatTimeRange(activity.start_time, activity.end_time)}
                            {activity.description && ` • ${activity.description}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-pastel-green bg-opacity-20 text-slate-900 text-xs font-medium rounded-full">
                            Concluído
                          </span>
                          <button className="p-2 text-slate-400 hover:text-slate-600">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
