import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, Textbox, util } from "fabric";
import { Button } from "@/components/ui/button";
import { ImageIcon, BarChart3, Type, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

interface SlideCanvasEditorProps {
  initialData?: any;
  onUpdate: (canvasData: any) => void;
  onAddChart?: () => void;
  slideText?: string;
  slideImage?: string;
  slideChart?: any;
}

export const SlideCanvasEditor = ({ initialData, onUpdate, onAddChart, slideText, slideImage, slideChart }: SlideCanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1000,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);

    // Load initial data if provided
    if (initialData) {
      canvas.loadFromJSON(initialData, () => {
        canvas.renderAll();
      });
    }

    // Setup autosave
    const handleModified = () => {
      const json = canvas.toJSON();
      onUpdate(json);
    };

    canvas.on("object:modified", handleModified);
    canvas.on("object:added", handleModified);
    canvas.on("object:removed", handleModified);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Adicionar conteúdo gerado pela IA automaticamente ao canvas
  useEffect(() => {
    if (!fabricCanvas || isContentLoaded) return;

    const addGeneratedContent = async () => {
      // Limpar canvas antes de adicionar novo conteúdo
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = "#ffffff";

      let yPosition = 50;

      // Adicionar texto gerado
      if (slideText) {
        const textBox = new Textbox(slideText, {
          left: 50,
          top: yPosition,
          width: 500,
          fontSize: 16,
          fill: "#1e293b",
          fontFamily: "Arial",
          selectable: true,
          editable: true,
        });
        fabricCanvas.add(textBox);
        yPosition += 200;
      }

      // Adicionar imagem gerada
      if (slideImage) {
        try {
          const img = await FabricImage.fromURL(slideImage);
          img.scaleToWidth(300);
          img.set({
            left: 50,
            top: yPosition,
            selectable: true,
          });
          fabricCanvas.add(img);
        } catch (error) {
          console.error("Erro ao adicionar imagem ao canvas:", error);
        }
      }

      // Adicionar gráfico (como imagem ou placeholder)
      if (slideChart) {
        const chartText = new Textbox(`Gráfico: ${slideChart.title || 'Sem título'}`, {
          left: 550,
          top: yPosition,
          width: 400,
          fontSize: 14,
          fill: "#475569",
          fontFamily: "Arial",
          fontStyle: "italic",
          selectable: true,
          editable: true,
        });
        fabricCanvas.add(chartText);
      }

      fabricCanvas.renderAll();
      setIsContentLoaded(true);
    };

    if (slideText || slideImage || slideChart) {
      addGeneratedContent();
    }
  }, [fabricCanvas, slideText, slideImage, slideChart, isContentLoaded]);

  // Reset content loaded when slide changes
  useEffect(() => {
    setIsContentLoaded(false);
  }, [slideText, slideImage, slideChart]);

  // Adicionar atalhos de teclado para deletar
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete ou Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObjects = fabricCanvas.getActiveObjects();
        if (activeObjects.length > 0) {
          e.preventDefault(); // Prevenir navegação do browser no Backspace
          activeObjects.forEach((obj) => {
            fabricCanvas.remove(obj);
          });
          fabricCanvas.discardActiveObject();
          fabricCanvas.renderAll();
          toast.success("Elemento(s) excluído(s)");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fabricCanvas]);

  const handleAddText = () => {
    if (!fabricCanvas) return;

    const text = new Textbox("Digite o texto aqui", {
      left: 100,
      top: 100,
      width: 300,
      fontSize: 24,
      fill: "#1e293b",
      fontFamily: "Arial",
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
    toast.success("Caixa de texto adicionada");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      
      FabricImage.fromURL(imgUrl).then((img) => {
        img.scaleToWidth(400);
        img.set({
          left: 100,
          top: 100,
        });
        
        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
        toast.success("Imagem adicionada ao canvas");
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteSelected = () => {
    if (!fabricCanvas) return;
    
    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length === 0) {
      toast.error("Selecione um elemento para excluir");
      return;
    }

    activeObjects.forEach((obj) => {
      fabricCanvas.remove(obj);
    });
    
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
    toast.success("Elemento(s) excluído(s)");
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast.success("Canvas limpo");
  };

  const handleExportImage = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.download = "slide.png";
    link.href = dataURL;
    link.click();
    
    toast.success("Slide exportado como imagem");
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-white border-2 border-slate-200 rounded-lg">
        <Button
          type="button"
          size="sm"
          onClick={handleAddText}
          className="bg-[hsl(206,35%,75%)] hover:bg-[hsl(206,35%,65%)] text-slate-800"
        >
          <Type className="h-4 w-4 mr-2" />
          Adicionar Texto
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="bg-[hsl(322,35%,75%)] hover:bg-[hsl(322,35%,65%)] text-slate-800"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Adicionar Imagem
        </Button>

        {onAddChart && (
          <Button
            type="button"
            size="sm"
            onClick={onAddChart}
            className="bg-[hsl(142,35%,75%)] hover:bg-[hsl(142,35%,65%)] text-slate-800"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Adicionar Gráfico
          </Button>
        )}

        <div className="flex-1" />

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleDeleteSelected}
          className="text-slate-600 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Excluir Selecionado
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleExportImage}
          className="text-slate-600 hover:text-slate-800"
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar PNG
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleClear}
          className="text-slate-600 hover:text-red-600 hover:bg-red-50"
        >
          Limpar Tudo
        </Button>
      </div>

      {/* Canvas Area */}
      <div className="border-2 border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Instructions */}
      <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
        <p className="font-medium mb-1">Instruções:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Clique nos botões acima para adicionar texto, imagens ou gráficos</li>
          <li>Arraste elementos para reposicioná-los no canvas</li>
          <li>Redimensione elementos arrastando os cantos</li>
          <li>Selecione um elemento e clique em "Excluir Selecionado" para removê-lo</li>
          <li>Use "Exportar PNG" para salvar o slide como imagem</li>
        </ul>
      </div>
    </div>
  );
};
