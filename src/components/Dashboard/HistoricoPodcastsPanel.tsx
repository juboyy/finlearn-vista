import { useState, useEffect } from "react";
import { Clock, Calendar, PlayCircle, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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

interface HistoricoPodcastsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistoricoPodcastsPanel({ open, onOpenChange }: HistoricoPodcastsPanelProps) {
  const [history, setHistory] = useState<PodcastHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      loadHistory();
    }
  }, [open]);

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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[90vw] sm:w-[636px] max-w-[636px] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-background via-background to-muted/30 backdrop-blur-xl border-l-2 border-pastel-purple/20"
      >
        {/* Animated background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        <SheetHeader className="relative pb-8 border-b-2 border-gradient-to-r from-pastel-purple/30 via-pastel-pink/30 to-pastel-blue/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <SheetTitle className="text-3xl font-black text-foreground">
                Histórico de Podcasts
              </SheetTitle>
              <p className="text-sm text-muted-foreground/90 font-medium">
                Acompanhe seus podcasts ouvidos recentemente
              </p>
            </div>
            {history.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllHistory}
                className="border-2 border-red-500/40 text-red-600 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transition-all duration-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="relative mt-10 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Carregando histórico...</div>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <PlayCircle className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum podcast ouvido ainda
              </h3>
              <p className="text-muted-foreground">
                Comece a ouvir podcasts para ver seu histórico aqui
              </p>
            </div>
          ) : (
            <div className="space-y-4 px-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex gap-4 p-4 rounded-xl border-2 border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:border-pastel-purple/50 transition-all duration-300"
                >
                  {/* Podcast Image */}
                  <div className="relative shrink-0">
                    <img
                      src={item.podcast_image}
                      alt={item.podcast_title}
                      className="w-20 h-20 rounded-lg object-cover shadow-md ring-2 ring-pastel-purple/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pastel-purple/90 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm">
                      <PlayCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">
                        {item.podcast_title}
                        {item.episode_number && (
                          <span className="text-muted-foreground ml-2">
                            #{item.episode_number}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.podcast_topic}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progresso: {item.progress_percentage}%</span>
                        <span>
                          {formatDuration(item.current_time_seconds)} /{" "}
                          {formatDuration(item.total_duration_seconds)}
                        </span>
                      </div>
                      <Progress value={item.progress_percentage} className="h-1.5" />
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {format(new Date(item.last_played_at), "dd/MM/yyyy HH:mm", {
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
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
