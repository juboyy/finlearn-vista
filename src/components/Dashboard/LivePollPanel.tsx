import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, X, Plus, Vote, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LivePollPanelProps {
  liveId: string;
  isModerator: boolean;
  userId: string;
}

interface PollOption {
  id: string;
  option_text: string;
  option_order: number;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  is_active: boolean;
  allow_multiple_votes: boolean;
  ends_at: string | null;
  created_at: string;
  options: PollOption[];
  total_votes: number;
  user_voted: boolean;
}

export const LivePollPanel = ({ liveId, isModerator, userId }: LivePollPanelProps) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);
  const { toast } = useToast();

  useEffect(() => {
    loadPolls();

    // Subscribe to real-time updates
    const pollsChannel = supabase
      .channel(`live-polls-${liveId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "live_polls",
          filter: `live_id=eq.${liveId}`,
        },
        () => loadPolls()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "live_poll_votes",
        },
        () => loadPolls()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(pollsChannel);
    };
  }, [liveId]);

  const loadPolls = async () => {
    const { data: pollsData, error: pollsError } = await supabase
      .from("live_polls")
      .select("*")
      .eq("live_id", liveId)
      .order("created_at", { ascending: false });

    if (pollsError || !pollsData) return;

    const pollsWithOptions = await Promise.all(
      pollsData.map(async (poll) => {
        const { data: optionsData } = await supabase
          .from("live_poll_options")
          .select("*")
          .eq("poll_id", poll.id)
          .order("option_order", { ascending: true });

        const { data: votesData } = await supabase
          .from("live_poll_votes")
          .select("*")
          .eq("poll_id", poll.id);

        const { data: userVotes } = await supabase
          .from("live_poll_votes")
          .select("*")
          .eq("poll_id", poll.id)
          .eq("user_id", userId);

        const optionsWithVotes = (optionsData || []).map((option) => ({
          ...option,
          votes: (votesData || []).filter((v) => v.option_id === option.id).length,
        }));

        return {
          ...poll,
          options: optionsWithVotes,
          total_votes: (votesData || []).length,
          user_voted: (userVotes || []).length > 0,
        };
      })
    );

    setPolls(pollsWithOptions);
  };

  const createPoll = async () => {
    if (!newQuestion.trim() || newOptions.filter((o) => o.trim()).length < 2) {
      toast({
        title: "Erro",
        description: "Adicione uma pergunta e pelo menos 2 opções",
        variant: "destructive",
      });
      return;
    }

    const { data: pollData, error: pollError } = await supabase
      .from("live_polls")
      .insert({
        live_id: liveId,
        created_by: userId,
        question: newQuestion.trim(),
      })
      .select()
      .single();

    if (pollError || !pollData) {
      toast({
        title: "Erro ao criar enquete",
        variant: "destructive",
      });
      return;
    }

    const validOptions = newOptions.filter((o) => o.trim());
    const { error: optionsError } = await supabase.from("live_poll_options").insert(
      validOptions.map((option, index) => ({
        poll_id: pollData.id,
        option_text: option.trim(),
        option_order: index,
      }))
    );

    if (optionsError) {
      toast({
        title: "Erro ao criar opções",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Enquete criada",
      description: "A enquete foi publicada na live",
    });

    setNewQuestion("");
    setNewOptions(["", ""]);
    setIsCreating(false);
  };

  const vote = async (pollId: string, optionId: string) => {
    const poll = polls.find((p) => p.id === pollId);
    if (!poll) return;

    if (poll.user_voted && !poll.allow_multiple_votes) {
      toast({
        title: "Você já votou",
        description: "Não é possível votar novamente nesta enquete",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("live_poll_votes").insert({
      poll_id: pollId,
      option_id: optionId,
      user_id: userId,
      user_name: "Usuário",
    });

    if (error) {
      toast({
        title: "Erro ao votar",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Voto registrado",
      description: "Seu voto foi contabilizado",
    });
  };

  const closePoll = async (pollId: string) => {
    const { error } = await supabase
      .from("live_polls")
      .update({ is_active: false })
      .eq("id", pollId);

    if (error) {
      toast({
        title: "Erro ao encerrar enquete",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Enquete encerrada",
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-pastel-purple" />
            <h3 className="text-lg font-semibold text-foreground">Enquetes</h3>
          </div>
          {isModerator && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2"
            >
              {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isCreating ? "Cancelar" : "Nova Enquete"}
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {isCreating && (
          <Card className="p-4 mb-4 border-pastel-purple bg-accent/10">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Pergunta
                </label>
                <Input
                  placeholder="Digite sua pergunta..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Opções
                </label>
                <div className="space-y-2">
                  {newOptions.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Opção ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updated = [...newOptions];
                          updated[index] = e.target.value;
                          setNewOptions(updated);
                        }}
                      />
                      {index > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setNewOptions(newOptions.filter((_, i) => i !== index));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {newOptions.length < 6 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setNewOptions([...newOptions, ""])}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Opção
                    </Button>
                  )}
                </div>
              </div>
              <Button
                onClick={createPoll}
                className="w-full bg-pastel-purple hover:bg-pastel-purple/80 text-slate-700"
              >
                Publicar Enquete
              </Button>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {polls.map((poll) => (
            <Card key={poll.id} className="p-4 border-border">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{poll.question}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          poll.is_active
                            ? "bg-pastel-green/20 text-slate-700 border-pastel-green"
                            : "bg-pastel-gray/20 text-slate-600 border-pastel-gray"
                        }
                      >
                        {poll.is_active ? "Ativa" : "Encerrada"}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {poll.total_votes} votos
                      </span>
                    </div>
                  </div>
                  {isModerator && poll.is_active && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => closePoll(poll.id)}
                    >
                      Encerrar
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {poll.options.map((option) => {
                    const percentage =
                      poll.total_votes > 0 ? (option.votes / poll.total_votes) * 100 : 0;
                    const isLeading =
                      option.votes > 0 &&
                      option.votes === Math.max(...poll.options.map((o) => o.votes));

                    return (
                      <div key={option.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => vote(poll.id, option.id)}
                            disabled={!poll.is_active || poll.user_voted}
                            className="flex-1 justify-start h-auto py-2 px-3 hover:bg-pastel-blue/20"
                          >
                            <span className="text-sm text-foreground">{option.option_text}</span>
                          </Button>
                          <div className="text-right ml-2 min-w-[60px]">
                            <span
                              className={`text-sm font-medium ${
                                isLeading ? "text-pastel-green" : "text-muted-foreground"
                              }`}
                            >
                              {option.votes}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={percentage}
                          className="h-2"
                          style={
                            {
                              "--progress-background": isLeading
                                ? "hsl(142, 35%, 60%)"
                                : "hsl(207, 35%, 55%)",
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}

          {polls.length === 0 && !isCreating && (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Nenhuma enquete ativa</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
