import { useEffect, useState } from "react";
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

  // Initialize with default agents from localStorage or defaults
  const initializeAgents = () => {
    const stored = localStorage.getItem('user_agents');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAgents(parsed);
      } catch (error) {
        console.error('Error parsing stored agents:', error);
        createDefaultAgents();
      }
    } else {
      createDefaultAgents();
    }
  };

  const createDefaultAgents = () => {
    const defaultAgents: UserAgent[] = DEFAULT_AGENTS.map((agent, index) => ({
      id: `agent-${index + 1}`,
      user_id: 'local-user',
      agent_key: agent.agent_key,
      agent_name: agent.agent_name,
      agent_description: agent.agent_description,
      agent_category: agent.agent_category,
      agent_image: agent.agent_image,
      agent_bg_color: agent.agent_bg_color,
      rating: agent.rating,
      credits: agent.credits,
      max_credits: agent.max_credits,
      is_active: agent.is_active,
      last_interaction: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    
    setAgents(defaultAgents);
    localStorage.setItem('user_agents', JSON.stringify(defaultAgents));
  };

  const toggleAgentStatus = (agentId: string, currentStatus: boolean) => {
    const updatedAgents = agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, is_active: !currentStatus, updated_at: new Date().toISOString() }
        : agent
    );
    
    setAgents(updatedAgents);
    localStorage.setItem('user_agents', JSON.stringify(updatedAgents));
    
    toast({
      title: currentStatus ? "Agente desativado" : "Agente ativado",
      description: currentStatus 
        ? "O agente foi desativado com sucesso." 
        : "O agente foi ativado com sucesso.",
    });
  };

  const updateAgentCredits = (agentId: string, newCredits: number) => {
    const updatedAgents = agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, credits: newCredits, updated_at: new Date().toISOString() }
        : agent
    );
    
    setAgents(updatedAgents);
    localStorage.setItem('user_agents', JSON.stringify(updatedAgents));
  };

  useEffect(() => {
    setLoading(true);
    initializeAgents();
    setLoading(false);
  }, []);

  return {
    agents,
    loading,
    toggleAgentStatus,
    updateAgentCredits,
    refetch: initializeAgents
  };
};
