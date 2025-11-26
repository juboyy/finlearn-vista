import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, Textbox, util } from "fabric";
import { Button } from "@/components/ui/button";
import { ImageIcon, BarChart3, Type, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

interface SlideCanvasEditorProps {
  initialData?: any;
  onUpdate: (canvasData: any) => void;
  onAddChart?: () => void;
}

export const SlideCanvasEditor = ({ initialData, onUpdate, onAddChart }: SlideCanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
