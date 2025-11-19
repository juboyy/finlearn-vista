import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserAgent {
  id: string;
  user_id: string;
  agent_key: string;
  agent_name: string;
  agent_description: string;
  agent_category: string;
  agent_image: string;
  agent_bg_color: string;
  rating: string;
  credits: number;
  max_credits: number;
  is_active: boolean;
  last_interaction: string;
  created_at: string;
  updated_at: string;
}

const DEFAULT_AGENTS = [
  {
    agent_key: "ana-analista-tecnica",
    agent_name: "Ana - Analista Técnica",
    agent_description: "Especialista em análise técnica, padrões gráficos e estratégias de trading. Fornece insights detalhados sobre movimentos de mercado.",
    agent_category: "Análise Técnica",
    agent_image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
    agent_bg_color: "bg-[hsl(206,35%,85%)]",
    rating: "4.9",
    credits: 750,
    max_credits: 1000,
    is_active: true
  },
  {
    agent_key: "ricardo-renda-fixa",
    agent_name: "Ricardo - Especialista em Renda Fixa",
    agent_description: "Expert em títulos públicos, CDBs, LCIs e estratégias conservadoras. Ajuda na construção de carteiras de renda fixa eficientes.",
    agent_category: "Renda Fixa",
    agent_image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
    agent_bg_color: "bg-[hsl(280,35%,85%)]",
    rating: "4.8",
    credits: 420,
    max_credits: 1000,
    is_active: true
  },
  {
    agent_key: "marina-mercado-capitais",
    agent_name: "Marina - Mercado de Capitais",
    agent_description: "Especialista em IPOs, ofertas públicas, estruturação de operações e regulação do mercado de capitais brasileiro.",
    agent_category: "Mercado de Capitais",
    agent_image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
    agent_bg_color: "bg-[hsl(340,35%,85%)]",
    rating: "4.7",
    credits: 890,
    max_credits: 1000,
    is_active: true
  },
  {
    agent_key: "joao-educador",
    agent_name: "Professor João - Educador",
    agent_description: "Educador financeiro com foco em fundamentos e teoria econômica. Explica conceitos complexos de forma didática.",
    agent_category: "Educação",
    agent_image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png",
    agent_bg_color: "bg-[hsl(160,35%,85%)]",
    rating: "4.9",
    credits: 950,
    max_credits: 1000,
    is_active: false
  }
];

export const useUserAgents = () => {
  const [agents, setAgents] = useState<UserAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const initializeDefaultAgents = async (userId: string) => {
    const { error } = await supabase
      .from('user_agents')
      .insert(
        DEFAULT_AGENTS.map(agent => ({
          ...agent,
          user_id: userId
        }))
      );

    if (error) {
      console.error('Error initializing default agents:', error);
      toast({
        title: "Erro ao criar agentes padrão",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setAgents([]);
        return;
      }

      const { data, error } = await supabase
        .from('user_agents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // If no agents exist, initialize with defaults
      if (!data || data.length === 0) {
        await initializeDefaultAgents(user.id);
        await fetchAgents(); // Fetch again after initialization
        return;
      }

      setAgents(data);
    } catch (error: any) {
      console.error('Error fetching agents:', error);
      toast({
        title: "Erro ao carregar agentes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAgentStatus = async (agentId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('user_agents')
        .update({ is_active: !currentStatus })
        .eq('id', agentId);

      if (error) throw error;

      // Update local state
      setAgents(prev => 
        prev.map(agent => 
          agent.id === agentId 
            ? { ...agent, is_active: !currentStatus }
            : agent
        )
      );

      toast({
        title: currentStatus ? "Agente desativado" : "Agente ativado",
        description: currentStatus 
          ? "O agente foi desativado com sucesso." 
          : "O agente foi ativado com sucesso.",
      });
    } catch (error: any) {
      console.error('Error toggling agent status:', error);
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateAgentCredits = async (agentId: string, newCredits: number) => {
    try {
      const { error } = await supabase
        .from('user_agents')
        .update({ credits: newCredits })
        .eq('id', agentId);

      if (error) throw error;

      setAgents(prev => 
        prev.map(agent => 
          agent.id === agentId 
            ? { ...agent, credits: newCredits }
            : agent
        )
      );
    } catch (error: any) {
      console.error('Error updating agent credits:', error);
      toast({
        title: "Erro ao atualizar créditos",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAgents();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('user_agents_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_agents'
        },
        () => {
          fetchAgents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    agents,
    loading,
    toggleAgentStatus,
    updateAgentCredits,
    refetch: fetchAgents
  };
};
