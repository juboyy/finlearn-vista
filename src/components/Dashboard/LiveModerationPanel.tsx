import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, UserX, Filter, Trash2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Moderator {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  assigned_at: string;
}

interface BannedUser {
  id: string;
  user_id: string;
  user_name: string;
  ban_reason: string | null;
  ban_type: string;
  banned_at: string;
  ban_expires_at: string | null;
}

interface ChatFilter {
  id: string;
  filter_type: string;
  filter_value: string;
  action: string;
  is_global: boolean;
}

interface LiveModerationPanelProps {
  liveId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveModerationPanel = ({ liveId, isOpen, onClose }: LiveModerationPanelProps) => {
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [filters, setFilters] = useState<ChatFilter[]>([]);
  const [newModeratorName, setNewModeratorName] = useState("");
  const [banUserId, setBanUserId] = useState("");
  const [banUserName, setBanUserName] = useState("");
  const [banReason, setBanReason] = useState("");
  const [banType, setBanType] = useState<"temporary" | "permanent">("permanent");
  const [newFilterValue, setNewFilterValue] = useState("");
  const [newFilterType, setNewFilterType] = useState<"word" | "regex" | "link">("word");
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadModerationData();
    }
  }, [isOpen, liveId]);

  const loadModerationData = async () => {
    // Carregar moderadores
    const { data: modsData } = await supabase
      .from("live_moderators")
      .select("*")
      .eq("live_id", liveId)
      .order("assigned_at", { ascending: false });

    if (modsData) setModerators(modsData);

    // Carregar usuários banidos
    const { data: bannedData } = await supabase
      .from("live_banned_users")
      .select("*")
      .eq("live_id", liveId)
      .order("banned_at", { ascending: false });

    if (bannedData) setBannedUsers(bannedData);

    // Carregar filtros
    const { data: filtersData } = await supabase
      .from("live_chat_filters")
      .select("*")
      .or(`live_id.eq.${liveId},is_global.eq.true`)
      .order("created_at", { ascending: false });

    if (filtersData) setFilters(filtersData);
  };

  const addModerator = async () => {
    if (!newModeratorName.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("live_moderators").insert({
        live_id: liveId,
        user_id: user.id,
        user_name: newModeratorName,
        assigned_by: user.id,
      });

      if (error) throw error;

      toast({
        title: "Moderador adicionado",
        description: `${newModeratorName} agora é moderador desta live.`,
      });

      setNewModeratorName("");
      loadModerationData();
    } catch (error) {
      console.error("Erro ao adicionar moderador:", error);
      toast({
        title: "Erro ao adicionar moderador",
        variant: "destructive",
      });
    }
  };

  const removeModerator = async (moderatorId: string) => {
    try {
      const { error } = await supabase
        .from("live_moderators")
        .delete()
        .eq("id", moderatorId);

      if (error) throw error;

      toast({
        title: "Moderador removido",
        description: "Moderador foi removido desta live.",
      });

      loadModerationData();
    } catch (error) {
      console.error("Erro ao remover moderador:", error);
      toast({
        title: "Erro ao remover moderador",
        variant: "destructive",
      });
    }
  };

  const banUser = async () => {
    if (!banUserId || !banUserName.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("live_banned_users").insert({
        live_id: liveId,
        user_id: banUserId,
        user_name: banUserName,
        banned_by: user.id,
        ban_reason: banReason || null,
        ban_type: banType,
        ban_expires_at: banType === "temporary" ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null,
      });

      if (error) throw error;

      toast({
        title: "Usuário banido",
        description: `${banUserName} foi banido do chat.`,
      });

      setBanUserId("");
      setBanUserName("");
      setBanReason("");
      loadModerationData();
    } catch (error) {
      console.error("Erro ao banir usuário:", error);
      toast({
        title: "Erro ao banir usuário",
        variant: "destructive",
      });
    }
  };

  const unbanUser = async (banId: string) => {
    try {
      const { error } = await supabase
        .from("live_banned_users")
        .delete()
        .eq("id", banId);

      if (error) throw error;

      toast({
        title: "Usuário desbanido",
        description: "Usuário pode voltar a participar do chat.",
      });

      loadModerationData();
    } catch (error) {
      console.error("Erro ao desbanir usuário:", error);
      toast({
        title: "Erro ao desbanir usuário",
        variant: "destructive",
      });
    }
  };

  const addFilter = async () => {
    if (!newFilterValue.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("live_chat_filters").insert({
        live_id: liveId,
        filter_type: newFilterType,
        filter_value: newFilterValue,
        action: "block",
        created_by: user.id,
      });

      if (error) throw error;

      toast({
        title: "Filtro adicionado",
        description: "Novo filtro foi aplicado ao chat.",
      });

      setNewFilterValue("");
      loadModerationData();
    } catch (error) {
      console.error("Erro ao adicionar filtro:", error);
      toast({
        title: "Erro ao adicionar filtro",
        variant: "destructive",
      });
    }
  };

  const removeFilter = async (filterId: string) => {
    try {
      const { error } = await supabase
        .from("live_chat_filters")
        .delete()
        .eq("id", filterId);

      if (error) throw error;

      toast({
        title: "Filtro removido",
      });

      loadModerationData();
    } catch (error) {
      console.error("Erro ao remover filtro:", error);
      toast({
        title: "Erro ao remover filtro",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Painel de Moderação
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="moderators" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="moderators">Moderadores</TabsTrigger>
            <TabsTrigger value="banned">Banidos</TabsTrigger>
            <TabsTrigger value="filters">Filtros</TabsTrigger>
          </TabsList>

          <TabsContent value="moderators" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nome do novo moderador"
                value={newModeratorName}
                onChange={(e) => setNewModeratorName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addModerator()}
              />
              <Button onClick={addModerator} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <ScrollArea className="h-[300px] border rounded-lg p-4">
              {moderators.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum moderador designado
                </p>
              ) : (
                <div className="space-y-2">
                  {moderators.map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-center justify-between p-3 bg-accent/20 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={mod.user_avatar || "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png"}
                          alt={mod.user_name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{mod.user_name}</p>
                          <p className="text-xs text-muted-foreground">
                            Desde {new Date(mod.assigned_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeModerator(mod.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="banned" className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="ID do usuário"
                value={banUserId}
                onChange={(e) => setBanUserId(e.target.value)}
              />
              <Input
                placeholder="Nome do usuário"
                value={banUserName}
                onChange={(e) => setBanUserName(e.target.value)}
              />
              <Textarea
                placeholder="Motivo do banimento (opcional)"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2">
                <Select value={banType} onValueChange={(val) => setBanType(val as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temporary">Temporário (24h)</SelectItem>
                    <SelectItem value="permanent">Permanente</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={banUser} className="w-32">
                  <UserX className="w-4 h-4 mr-2" />
                  Banir
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[200px] border rounded-lg p-4">
              {bannedUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum usuário banido
                </p>
              ) : (
                <div className="space-y-2">
                  {bannedUsers.map((banned) => (
                    <div
                      key={banned.id}
                      className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{banned.user_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {banned.ban_reason || "Sem motivo especificado"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {banned.ban_type === "temporary" ? "Temporário" : "Permanente"}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => unbanUser(banned.id)}
                      >
                        Desbanir
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4">
            <div className="flex gap-2">
              <Select value={newFilterType} onValueChange={(val) => setNewFilterType(val as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="word">Palavra</SelectItem>
                  <SelectItem value="regex">Regex</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Valor do filtro"
                value={newFilterValue}
                onChange={(e) => setNewFilterValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addFilter()}
              />
              <Button onClick={addFilter} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <ScrollArea className="h-[300px] border rounded-lg p-4">
              {filters.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum filtro configurado
                </p>
              ) : (
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <div
                      key={filter.id}
                      className="flex items-center justify-between p-3 bg-accent/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{filter.filter_value}</p>
                        <p className="text-xs text-muted-foreground">
                          Tipo: {filter.filter_type} • Ação: {filter.action}
                          {filter.is_global && " • Global"}
                        </p>
                      </div>
                      {!filter.is_global && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFilter(filter.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};