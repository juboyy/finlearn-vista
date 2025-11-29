import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseLiveModerationProps {
  liveId: string;
  userId?: string;
}

export const useLiveModeration = ({ liveId, userId }: UseLiveModerationProps) => {
  const [isModerator, setIsModerator] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [filters, setFilters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (liveId && userId) {
      checkModerationStatus();
      loadFilters();
    }
  }, [liveId, userId]);

  const checkModerationStatus = async () => {
    if (!userId) return;

    try {
      // Verificar se é moderador
      const { data: modData } = await supabase
        .from("live_moderators")
        .select("id")
        .eq("live_id", liveId)
        .eq("user_id", userId)
        .single();

      setIsModerator(!!modData);

      // Verificar se está banido
      const { data: banData } = await supabase
        .from("live_banned_users")
        .select("id, ban_type, ban_expires_at")
        .eq("live_id", liveId)
        .eq("user_id", userId)
        .single();

      if (banData) {
        // Verificar se o ban temporário expirou
        if (banData.ban_type === "temporary" && banData.ban_expires_at) {
          const expireDate = new Date(banData.ban_expires_at);
          if (expireDate < new Date()) {
            // Ban expirou, remover
            await supabase
              .from("live_banned_users")
              .delete()
              .eq("id", banData.id);
            setIsBanned(false);
          } else {
            setIsBanned(true);
          }
        } else {
          setIsBanned(true);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Erro ao verificar status de moderação:", error);
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const { data } = await supabase
        .from("live_chat_filters")
        .select("*")
        .or(`live_id.eq.${liveId},is_global.eq.true`);

      if (data) {
        setFilters(data);
      }
    } catch (error) {
      console.error("Erro ao carregar filtros:", error);
    }
  };

  const checkMessageAgainstFilters = (message: string): { blocked: boolean; reason?: string } => {
    for (const filter of filters) {
      if (filter.filter_type === "word") {
        const regex = new RegExp(`\\b${filter.filter_value}\\b`, "gi");
        if (regex.test(message)) {
          return { blocked: true, reason: `Palavra bloqueada: ${filter.filter_value}` };
        }
      } else if (filter.filter_type === "regex") {
        try {
          const regex = new RegExp(filter.filter_value, "gi");
          if (regex.test(message)) {
            return { blocked: true, reason: "Conteúdo bloqueado por filtro" };
          }
        } catch (error) {
          console.error("Erro ao aplicar regex:", error);
        }
      } else if (filter.filter_type === "link") {
        const urlRegex = /(https?:\/\/[^\s]+)/gi;
        if (urlRegex.test(message)) {
          return { blocked: true, reason: "Links não são permitidos no chat" };
        }
      }
    }

    return { blocked: false };
  };

  const deleteMessage = async (messageId: string, messageContent: string, messageUserId: string, messageUserName: string, reason?: string) => {
    if (!isModerator) return { success: false, error: "Sem permissão" };

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { success: false, error: "Não autenticado" };

      // Registrar mensagem deletada
      await supabase.from("live_chat_deleted_messages").insert({
        message_id: messageId,
        live_id: liveId,
        user_id: messageUserId,
        user_name: messageUserName,
        message_content: messageContent,
        deleted_by: user.id,
        deletion_reason: reason,
      });

      // Deletar mensagem
      const { error } = await supabase
        .from("live_chat_messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar mensagem:", error);
      return { success: false, error: "Erro ao deletar mensagem" };
    }
  };

  return {
    isModerator,
    isBanned,
    loading,
    checkMessageAgainstFilters,
    deleteMessage,
    refreshStatus: checkModerationStatus,
  };
};