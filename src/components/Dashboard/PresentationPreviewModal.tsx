import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Maximize } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface Slide {
  id: number;
  content: string;
  image?: string;
}

interface PresentationPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slides: Slide[];
}

export const PresentationPreviewModal = ({
  isOpen,
  onClose,
  title,
  slides,
}: PresentationPreviewModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
        toast.success("Modo apresentação ativado");
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        toast.info("Modo apresentação desativado");
      }
    } catch (error) {
      toast.error("Não foi possível ativar o modo fullscreen");
      console.error("Fullscreen error:", error);
    }
  };

  // Detectar saída do fullscreen (ESC ou botão do navegador)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-slate-800">{title}</DialogTitle>
          <Button
            onClick={toggleFullscreen}
            size="sm"
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <Maximize className="w-4 h-4 mr-2" />
            Modo Apresentação
          </Button>
        </DialogHeader>
        
        <div 
          ref={containerRef}
          className={`flex-1 flex flex-col items-center justify-center rounded-lg p-8 relative ${
            isFullscreen ? 'bg-black' : 'bg-slate-50'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className={`rounded-lg shadow-lg p-8 w-full h-full flex items-center justify-center ${
              isFullscreen ? 'bg-black' : 'bg-white'
            }`}>
              {slides[currentSlide]?.image ? (
                <img 
                  src={slides[currentSlide].image} 
                  alt={`Slide ${currentSlide + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <p className={`text-2xl font-semibold mb-4 ${
                    isFullscreen ? 'text-white' : 'text-slate-800'
                  }`}>
                    Slide {currentSlide + 1}
                  </p>
                  <p className={isFullscreen ? 'text-slate-300' : 'text-slate-600'}>
                    {slides[currentSlide]?.content}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              isFullscreen 
                ? 'bg-slate-900/50 hover:bg-slate-900/70 text-white border-slate-700' 
                : 'bg-white hover:bg-slate-100'
            }`}
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${
              isFullscreen 
                ? 'bg-slate-900/50 hover:bg-slate-900/70 text-white border-slate-700' 
                : 'bg-white hover:bg-slate-100'
            }`}
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {!isFullscreen && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-slate-600">
              Slide {currentSlide + 1} de {slides.length}
            </div>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-[#C5A8E8]"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {isFullscreen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 px-6 py-3 rounded-full">
            <div className="text-sm text-white">
              Slide {currentSlide + 1} de {slides.length}
            </div>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-[#C5A8E8]"
                      : "bg-slate-400 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
