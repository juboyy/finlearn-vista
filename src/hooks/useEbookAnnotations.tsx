import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface EbookAnnotation {
  id: string;
  user_id: string;
  ebook_id: string;
  ebook_title: string;
  annotation_type: "highlight" | "note" | "underline";
  selected_text: string;
  annotation_content?: string;
  highlight_color: string;
  highlight_name?: string;
  page_number?: number;
  chapter_name?: string;
  position_start: number;
  position_end: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface EbookBookmark {
  id: string;
  user_id: string;
  ebook_id: string;
  ebook_title: string;
  bookmark_name?: string;
  page_number: number;
  chapter_name?: string;
  preview_text?: string;
  created_at: string;
  updated_at: string;
}

export const useEbookAnnotations = (ebookId: string, ebookTitle: string) => {
  const [annotations, setAnnotations] = useState<EbookAnnotation[]>([]);
  const [bookmarks, setBookmarks] = useState<EbookBookmark[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch annotations
  const fetchAnnotations = async () => {
    try {
      const { data, error } = await supabase
        .from("ebook_annotations")
        .select("*")
        .eq("ebook_id", ebookId)
        .eq("is_deleted", false)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setAnnotations((data || []) as EbookAnnotation[]);
    } catch (error) {
      console.error("Error fetching annotations:", error);
      toast.error("Erro ao carregar anotações");
    }
  };

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from("ebook_bookmarks")
        .select("*")
        .eq("ebook_id", ebookId)
        .order("page_number", { ascending: true });

      if (error) throw error;
      setBookmarks((data || []) as EbookBookmark[]);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      toast.error("Erro ao carregar marcadores");
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAnnotations(), fetchBookmarks()]);
      setLoading(false);
    };
    loadData();
  }, [ebookId]);

  // Real-time sync for annotations
  useEffect(() => {
    const annotationsChannel = supabase
      .channel(`ebook_annotations:${ebookId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ebook_annotations",
          filter: `ebook_id=eq.${ebookId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // Only add if not already in state (avoid duplicates from optimistic update)
            setAnnotations((prev) => {
              const exists = prev.some(ann => ann.id === payload.new.id);
              if (exists) return prev;
              return [...prev, payload.new as EbookAnnotation];
            });
          } else if (payload.eventType === "UPDATE") {
            setAnnotations((prev) =>
              prev.map((ann) =>
                ann.id === payload.new.id ? (payload.new as EbookAnnotation) : ann
              )
            );
          } else if (payload.eventType === "DELETE") {
            setAnnotations((prev) => prev.filter((ann) => ann.id !== payload.old.id));
            toast.success("Anotação removida");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(annotationsChannel);
    };
  }, [ebookId]);

  // Real-time sync for bookmarks
  useEffect(() => {
    const bookmarksChannel = supabase
      .channel(`ebook_bookmarks:${ebookId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ebook_bookmarks",
          filter: `ebook_id=eq.${ebookId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [...prev, payload.new as EbookBookmark]);
            toast.success("Marcador sincronizado");
          } else if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((bm) =>
                bm.id === payload.new.id ? (payload.new as EbookBookmark) : bm
              )
            );
          } else if (payload.eventType === "DELETE") {
            setBookmarks((prev) => prev.filter((bm) => bm.id !== payload.old.id));
            toast.success("Marcador removido");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookmarksChannel);
    };
  }, [ebookId]);

  // Create annotation
  const createAnnotation = async (
    type: "highlight" | "note" | "underline",
    selectedText: string,
    positionStart: number,
    positionEnd: number,
    color: string = "#fef3c7",
    content?: string,
    pageNumber?: number,
    chapterName?: string,
    highlightName?: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("ebook_annotations")
        .insert({
          ebook_id: ebookId,
          ebook_title: ebookTitle,
          annotation_type: type,
          selected_text: selectedText,
          annotation_content: content,
          highlight_color: color,
          highlight_name: highlightName,
          position_start: positionStart,
          position_end: positionEnd,
          page_number: pageNumber,
          chapter_name: chapterName,
        })
        .select()
        .single();

      if (error) throw error;
      
      // Add to local state immediately for instant feedback
      if (data) {
        setAnnotations((prev) => [...prev, data as EbookAnnotation]);
      }
      
      toast.success(
        type === "highlight" ? "Texto destacado" : 
        type === "note" ? "Nota adicionada" : "Texto sublinhado"
      );
      
      return data;
    } catch (error) {
      console.error("Error creating annotation:", error);
      toast.error("Erro ao criar anotação");
      return null;
    }
  };

  // Update annotation
  const updateAnnotation = async (id: string, updates: Partial<EbookAnnotation>) => {
    try {
      const { error } = await supabase
        .from("ebook_annotations")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      toast.success("Anotação atualizada");
    } catch (error) {
      console.error("Error updating annotation:", error);
      toast.error("Erro ao atualizar anotação");
    }
  };

  // Delete annotation
  const deleteAnnotation = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ebook_annotations")
        .update({ is_deleted: true })
        .eq("id", id);

      if (error) throw error;
      toast.success("Anotação removida");
    } catch (error) {
      console.error("Error deleting annotation:", error);
      toast.error("Erro ao remover anotação");
    }
  };

  // Create bookmark
  const createBookmark = async (
    pageNumber: number,
    bookmarkName?: string,
    chapterName?: string,
    previewText?: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("ebook_bookmarks")
        .insert({
          ebook_id: ebookId,
          ebook_title: ebookTitle,
          bookmark_name: bookmarkName,
          page_number: pageNumber,
          chapter_name: chapterName,
          preview_text: previewText,
        })
        .select()
        .single();

      if (error) throw error;
      toast.success("Marcador adicionado");
      return data;
    } catch (error) {
      console.error("Error creating bookmark:", error);
      toast.error("Erro ao criar marcador");
      return null;
    }
  };

  // Delete bookmark
  const deleteBookmark = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ebook_bookmarks")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Marcador removido");
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("Erro ao remover marcador");
    }
  };

  return {
    annotations,
    bookmarks,
    loading,
    createAnnotation,
    updateAnnotation,
    deleteAnnotation,
    createBookmark,
    deleteBookmark,
  };
};
