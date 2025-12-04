import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      setNewsletters(data || []);
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
    distributionChannels: string[] = []
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
        })
        .select()
        .single();

      if (error) throw error;

      setNewsletters((prev) => [data, ...prev]);
      
      toast({
        title: "Newsletter criada",
        description: "Sua newsletter foi criada com sucesso.",
      });

      return data;
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

  const updateNewsletter = async (id: string, updates: Partial<Newsletter>) => {
    try {
      const { data, error } = await supabase
        .from("newsletters")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setNewsletters((prev) =>
        prev.map((n) => (n.id === id ? data : n))
      );

      toast({
        title: "Newsletter atualizada",
        description: "As alterações foram salvas.",
      });

      return data;
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
