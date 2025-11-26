import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ChatImageRendererProps {
  src: string;
  alt: string;
}

export const ChatImageRenderer = ({ src, alt }: ChatImageRendererProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("ChatImageRenderer: src received:", src);
    // Check if this is an IMAGE_GENERATE: directive
    if (src.startsWith("IMAGE_GENERATE:")) {
      const prompt = src.replace("IMAGE_GENERATE:", "").trim();
      console.log("ChatImageRenderer: Generating image with prompt:", prompt);
      generateImage(prompt);
    } else {
      console.log("ChatImageRenderer: Using direct URL:", src);
      setImageUrl(src);
    }
  }, [src]);

  const generateImage = async (prompt: string) => {
    console.log("ChatImageRenderer: Starting image generation...");
    setIsLoading(true);
    setError(false);
    
    try {
      console.log("ChatImageRenderer: Calling generate-chat-image function");
      const { data, error: genError } = await supabase.functions.invoke('generate-chat-image', {
        body: { prompt }
      });
      
      console.log("ChatImageRenderer: Function response:", { data, error: genError });
      
      if (genError) throw genError;
      
      if (data?.imageUrl) {
        console.log("ChatImageRenderer: Image generated successfully");
        setImageUrl(data.imageUrl);
      } else {
        throw new Error("No image URL returned");
      }
    } catch (err) {
      console.error("ChatImageRenderer: Error generating image:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg my-3 max-w-full h-48 bg-muted flex items-center justify-center border-2 border-pastel-purple/30">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-pastel-purple" size={32} />
          <span className="text-sm text-muted-foreground">Gerando imagem...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg my-3 max-w-full h-48 bg-muted flex items-center justify-center border-2 border-red-300">
        <span className="text-sm text-red-600">Erro ao gerar imagem</span>
      </div>
    );
  }

  if (!imageUrl) return null;

  return (
    <img 
      src={imageUrl} 
      alt={alt} 
      className="rounded-lg my-3 max-w-full h-auto border-2 border-pastel-purple/30 shadow-sm" 
    />
  );
};
