import { useState, useRef, ReactNode, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface SelectableChartWrapperProps {
  children: ReactNode;
  onAskAgent?: (selectionData: SelectionData) => void;
  chartTitle?: string;
  chartData?: any[];
}

interface SelectionData {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  chartTitle?: string;
  chartData?: any[];
}

export const SelectableChartWrapper = ({ 
  children, 
  onAskAgent,
  chartTitle,
  chartData 
}: SelectableChartWrapperProps) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsSelecting(true);
    setSelectionStart({ x, y });
    setSelectionEnd({ x, y });
    setShowButton(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSelectionEnd({ x, y });
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    
    setIsSelecting(false);
    
    // Verificar se houve uma seleção significativa (mais de 20px em qualquer direção)
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    
    if (width > 20 || height > 20) {
      setShowButton(true);
    }
  };

  const handleAskAgent = () => {
    if (onAskAgent) {
      const selectionData: SelectionData = {
        startX: Math.min(selectionStart.x, selectionEnd.x),
        endX: Math.max(selectionStart.x, selectionEnd.x),
        startY: Math.min(selectionStart.y, selectionEnd.y),
        endY: Math.max(selectionStart.y, selectionEnd.y),
        chartTitle,
        chartData
      };
      onAskAgent(selectionData);
    }
    setShowButton(false);
  };

  const handleClearSelection = () => {
    setShowButton(false);
  };

  const getSelectionRect = () => {
    const x = Math.min(selectionStart.x, selectionEnd.x);
    const y = Math.min(selectionStart.y, selectionEnd.y);
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    
    return { x, y, width, height };
  };

  const selectionRect = getSelectionRect();
  const buttonX = selectionRect.x + selectionRect.width / 2;
  const buttonY = selectionRect.y + selectionRect.height + 12;

  return (
    <div
      ref={containerRef}
      className="relative cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        if (isSelecting) {
          setIsSelecting(false);
        }
      }}
      style={{ userSelect: 'none' }}
    >
      {children}
      
      {/* Área de seleção visual */}
      {(isSelecting || showButton) && (
        <>
          <div
            className="absolute pointer-events-none border-2 border-primary/60 bg-primary/10 animate-in fade-in-0 zoom-in-95 duration-200"
            style={{
              left: selectionRect.x,
              top: selectionRect.y,
              width: selectionRect.width,
              height: selectionRect.height,
            }}
          />
          
          {/* Overlay escurecido fora da seleção */}
          <div className="absolute inset-0 pointer-events-none bg-background/40 animate-in fade-in-0 duration-200" 
               style={{ 
                 clipPath: `polygon(
                   0% 0%, 
                   0% 100%, 
                   ${selectionRect.x}px 100%, 
                   ${selectionRect.x}px ${selectionRect.y}px, 
                   ${selectionRect.x + selectionRect.width}px ${selectionRect.y}px, 
                   ${selectionRect.x + selectionRect.width}px ${selectionRect.y + selectionRect.height}px, 
                   ${selectionRect.x}px ${selectionRect.y + selectionRect.height}px, 
                   ${selectionRect.x}px 100%, 
                   100% 100%, 
                   100% 0%
                 )`
               }}
          />
        </>
      )}
      
      {/* Botão flutuante */}
      {showButton && (
        <div
          className="absolute z-10 flex gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
          style={{
            left: buttonX,
            top: buttonY,
            transform: 'translateX(-50%)',
          }}
        >
          <Button
            size="sm"
            onClick={handleAskAgent}
            className="shadow-lg gap-2 font-medium transition-all hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Bot className="h-4 w-4" />
            Pergunte ao Agente
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleClearSelection}
            className="shadow-lg transition-all hover:scale-105"
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};
