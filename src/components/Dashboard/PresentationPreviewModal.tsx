import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

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

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-slate-800">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-lg p-8 relative">
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full h-full flex items-center justify-center">
              {slides[currentSlide]?.image ? (
                <img 
                  src={slides[currentSlide].image} 
                  alt={`Slide ${currentSlide + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <p className="text-2xl font-semibold text-slate-800 mb-4">
                    Slide {currentSlide + 1}
                  </p>
                  <p className="text-slate-600">{slides[currentSlide]?.content}</p>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-100"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-100"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

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
      </DialogContent>
    </Dialog>
  );
};
