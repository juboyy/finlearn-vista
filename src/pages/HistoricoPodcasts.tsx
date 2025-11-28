import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, Calendar, PlayCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PodcastHistory {
  id: string;
  podcast_id: string;
  podcast_title: string;
  podcast_topic: string;
  podcast_image: string;
  episode_number: number | null;
  progress_percentage: number;
  current_time_seconds: number;
  total_duration_seconds: number;
  last_played_at: string;
  created_at: string;
}

export default function HistoricoPodcasts() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<PodcastHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_podcast_history")
      .select("*")
      .order("last_played_at", { ascending: false });

    if (error) {
      console.error("Error loading podcast history:", error);
      toast.error("Erro ao carregar histórico");
    } else {
      setHistory(data || []);
    }
    setLoading(false);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const deleteHistoryItem = async (id: string) => {
    const { error } = await supabase
      .from("user_podcast_history")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting history item:", error);
      toast.error("Erro ao remover do histórico");
    } else {
      toast.success("Removido do histórico");
      loadHistory();
    }
  };

  const clearAllHistory = async () => {
    const { error } = await supabase
      .from("user_podcast_history")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      console.error("Error clearing history:", error);
      toast.error("Erro ao limpar histórico");
    } else {
      toast.success("Histórico limpo com sucesso");
      loadHistory();
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-10 w-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">
                  Histórico de Podcasts
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Acompanhe seus podcasts ouvidos recentemente
                </p>
              </div>
              {history.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearAllHistory}
                  className="border-2 border-red-500/20 text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Histórico
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Carregando histórico...</div>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <PlayCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum podcast ouvido ainda
              </h3>
              <p className="text-muted-foreground">
                Comece a ouvir podcasts para ver seu histórico aqui
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex gap-6 p-6 rounded-xl border-2 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:border-pastel-purple/50 transition-all duration-300"
                >
                  {/* Podcast Image */}
                  <div className="relative shrink-0">
                    <img
                      src={item.podcast_image}
                      alt={item.podcast_title}
                      className="w-24 h-24 rounded-lg object-cover shadow-md ring-2 ring-pastel-purple/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-pastel-purple/90 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm">
                      <PlayCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
                        {item.podcast_title}
                        {item.episode_number && (
                          <span className="text-muted-foreground ml-2">
                            #{item.episode_number}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.podcast_topic}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progresso: {item.progress_percentage}%</span>
                        <span>
                          {formatDuration(item.current_time_seconds)} /{" "}
                          {formatDuration(item.total_duration_seconds)}
                        </span>
                      </div>
                      <Progress value={item.progress_percentage} className="h-2" />
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          Último acesso:{" "}
                          {format(new Date(item.last_played_at), "dd/MM/yyyy 'às' HH:mm", {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          Adicionado em:{" "}
                          {format(new Date(item.created_at), "dd/MM/yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteHistoryItem(item.id)}
                    className="h-9 w-9 shrink-0 text-muted-foreground hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
