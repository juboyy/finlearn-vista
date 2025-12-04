import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SaveForLaterParams {
  itemId: string;
  itemTitle: string;
  itemType: string;
  itemDescription?: string;
  itemImage?: string;
  itemUrl?: string;
}

export const useSaveForLater = ({ 
  itemId, 
  itemTitle, 
  itemType, 
  itemDescription, 
  itemImage, 
  itemUrl 
}: SaveForLaterParams) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkIfSaved();
  }, [itemId]);

  const checkIfSaved = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('saved_items')
        .select('id')
        .eq('user_id', user.id)
        .eq('item_id', itemId)
        .eq('item_type', 'read_later')
        .maybeSingle();

      setIsSaved(!!data);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const toggleSave = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para salvar conteúdo.",
          variant: "destructive"
        });
        return;
      }

      if (isSaved) {
        const { error } = await supabase
          .from('saved_items')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', itemId)
          .eq('item_type', 'read_later');

        if (error) throw error;

        setIsSaved(false);
        toast({
          title: "Removido",
          description: "Conteúdo removido de Ler Depois."
        });
      } else {
        const { error } = await supabase
          .from('saved_items')
          .insert({
            user_id: user.id,
            item_id: itemId,
            item_type: 'read_later',
            item_title: itemTitle,
            item_description: itemDescription || '',
            item_image: itemImage || '',
            item_url: itemUrl || `/${itemType}/${itemId}`
          });

        if (error) throw error;

        setIsSaved(true);
        toast({
          title: "Salvo",
          description: "Adicionado a Ler Depois."
        });
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o conteúdo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isSaved, isLoading, toggleSave };
};
