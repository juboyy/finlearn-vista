import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SavedChartAnalysis {
  id: string;
  user_id: string;
  chart_title: string;
  chart_data: any;
  selection_area: string | null;
  metric_type: string;
  analysis_content: string;
  created_at: string;
  updated_at: string;
}

export const useSavedChartAnalyses = () => {
  const [analyses, setAnalyses] = useState<SavedChartAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchAnalyses = async () => {
    setIsLoading(true);
    try {
      // Try to filter by user if authenticated, otherwise show all (for demo purposes)
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from("saved_chart_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      // Only filter by user if authenticated
      if (user) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAnalyses(data || []);
    } catch (error) {
      console.error("Error fetching saved analyses:", error);
      toast({
        title: "Erro ao carregar análises",
        description: "Não foi possível carregar o histórico de análises.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnalysis = async (
    chartTitle: string,
    chartData: any,
    selectionArea: string | null,
    metricType: string,
    analysisContent: string
  ) => {
    try {
      console.log("Saving analysis with data:", { chartTitle, selectionArea, metricType });
      
      // Try to get the authenticated user, but don't require it for this demo
      const { data: { user } } = await supabase.auth.getUser();
      
      // Generate a valid UUID if not authenticated
      const userId = user?.id || crypto.randomUUID();

      const insertData = {
        user_id: userId,
        chart_title: chartTitle,
        chart_data: chartData,
        selection_area: selectionArea,
        metric_type: metricType,
        analysis_content: analysisContent,
      };

      console.log("Inserting data:", insertData);

      const { data, error } = await supabase
        .from("saved_chart_analyses")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Analysis saved successfully:", data);
      setAnalyses((prev) => [data, ...prev]);
      
      toast({
        title: "Análise salva",
        description: "A análise foi salva com sucesso no seu histórico.",
      });

      return data;
    } catch (error: any) {
      console.error("Error saving analysis:", error);
      toast({
        title: "Erro ao salvar análise",
        description: error?.message || "Não foi possível salvar a análise.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteAnalysis = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_chart_analyses")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      
      toast({
        title: "Análise excluída",
        description: "A análise foi removida do histórico.",
      });
    } catch (error) {
      console.error("Error deleting analysis:", error);
      toast({
        title: "Erro ao excluir análise",
        description: "Não foi possível excluir a análise.",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  return {
    analyses,
    isLoading,
    saveAnalysis,
    deleteAnalysis,
    refetch: fetchAnalyses,
  };
};
