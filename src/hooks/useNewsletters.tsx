import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ContentTypeConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  frequency: string;
  days: string;
  time: string;
  isActive: boolean;
}

export interface Newsletter {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  color: string;
  status: string;
  subscribers_count: number;
  open_rate: number;
  discount_percentage: number;
  sent_count: number;
  frequency: string | null;
  last_sent_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[];
  product_types: string[];
  distribution_channels: string[];
  content_types_config: ContentTypeConfig[];
}

export const useNewsletters = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchNewsletters = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("newsletters")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      // Cast the data to Newsletter type, handling content_types_config
      const newsletters = (data || []).map(item => ({
        ...item,
        content_types_config: (item.content_types_config as unknown as ContentTypeConfig[]) || []
      })) as Newsletter[];
      setNewsletters(newsletters);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      toast({
        title: "Erro ao carregar newsletters",
        description: "Não foi possível carregar as newsletters.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewsletter = async (
    title: string,
    description: string,
    frequency: string,
    color: string,
    tags: string[] = [],
    productTypes: string[] = [],
    distributionChannels: string[] = [],
    contentTypesConfig: ContentTypeConfig[] = []
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || crypto.randomUUID();

      const { data, error } = await supabase
        .from("newsletters")
        .insert({
          user_id: userId,
          title,
          description,
          frequency,
          color,
          status: "draft",
          tags,
          product_types: productTypes,
          distribution_channels: distributionChannels,
          content_types_config: contentTypesConfig as unknown as any,
        })
        .select()
        .single();

      if (error) throw error;

      const newNewsletter = {
        ...data,
        content_types_config: (data.content_types_config as unknown as ContentTypeConfig[]) || []
      } as Newsletter;
      setNewsletters((prev) => [newNewsletter, ...prev]);
      
      toast({
        title: "Newsletter criada",
        description: "Sua newsletter foi criada com sucesso.",
      });

      return newNewsletter;
    } catch (error: any) {
      console.error("Error creating newsletter:", error);
      toast({
        title: "Erro ao criar newsletter",
        description: error?.message || "Não foi possível criar a newsletter.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateNewsletter = async (id: string, updates: Partial<Omit<Newsletter, 'content_types_config'>> & { content_types_config?: ContentTypeConfig[] }) => {
    try {
      const { data, error } = await supabase
        .from("newsletters")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      const updatedNewsletter = {
        ...data,
        content_types_config: (data.content_types_config as unknown as ContentTypeConfig[]) || []
      } as Newsletter;
      
      setNewsletters((prev) =>
        prev.map((n) => (n.id === id ? updatedNewsletter : n))
      );

      toast({
        title: "Newsletter atualizada",
        description: "As alterações foram salvas.",
      });

      return updatedNewsletter;
    } catch (error: any) {
      console.error("Error updating newsletter:", error);
      toast({
        title: "Erro ao atualizar newsletter",
        description: error?.message || "Não foi possível atualizar a newsletter.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteNewsletter = async (id: string) => {
    try {
      const { error } = await supabase
        .from("newsletters")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setNewsletters((prev) => prev.filter((n) => n.id !== id));

      toast({
        title: "Newsletter excluída",
        description: "A newsletter foi removida.",
      });
    } catch (error: any) {
      console.error("Error deleting newsletter:", error);
      toast({
        title: "Erro ao excluir newsletter",
        description: error?.message || "Não foi possível excluir a newsletter.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  return {
    newsletters,
    isLoading,
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    refetch: fetchNewsletters,
  };
};
