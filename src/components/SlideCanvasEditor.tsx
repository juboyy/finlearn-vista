import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, Textbox, util } from "fabric";
import { Button } from "@/components/ui/button";
import { ImageIcon, BarChart3, Type, Trash2, Download, Save } from "lucide-react";
import { toast } from "sonner";

interface SlideCanvasEditorProps {
  initialData?: any;
  onUpdate: (canvasData: any) => void;
  onAddChart?: () => void;
  slideText?: string;
  slideImage?: string;
  slideChart?: any;
  slideId?: string;
}

export const SlideCanvasEditor = ({ initialData, onUpdate, onAddChart, slideText, slideImage, slideChart, slideId }: SlideCanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "idle">("idle");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<string>("");
  const previousSlideIdRef = useRef<string>("");
  const isInitializedRef = useRef(false);

  // Detectar mudança de slide e recarregar canvas corretamente
  useEffect(() => {
    if (!fabricCanvas || !slideId) return;
    
    // Mudança de slide detectada
    const slideChanged = previousSlideIdRef.current !== slideId;
    
    if (slideChanged) {
      console.log(`Trocando de slide: ${previousSlideIdRef.current} -> ${slideId}`);
      previousSlideIdRef.current = slideId;
      isInitializedRef.current = false;
      
      // Limpar canvas
      try {
        if (fabricCanvas.getContext()) {
          fabricCanvas.clear();
          fabricCanvas.backgroundColor = "#ffffff";
          
          // Carregar dados salvos se existirem
          if (initialData && Object.keys(initialData).length > 0) {
            console.log(`Carregando dados salvos para slide ${slideId}`);
            fabricCanvas.loadFromJSON(initialData, () => {
              fabricCanvas.renderAll();
              isInitializedRef.current = true;
            });
          } else {
            console.log(`Slide ${slideId} vazio - pronto para edição`);
            isInitializedRef.current = true;
            fabricCanvas.renderAll();
          }
        }
      } catch (error) {
        console.error("Erro ao trocar slide:", error);
      }
    }
  }, [fabricCanvas, slideId, initialData]);

  // Função de salvamento manual
  const handleManualSave = () => {
    if (!fabricCanvas) return;
    
    const json = fabricCanvas.toJSON();
    const jsonString = JSON.stringify(json);
    
    // Verificar se houve mudanças desde o último save
    if (jsonString === lastSaveRef.current) {
      toast.info("Nenhuma alteração para salvar");
      return;
    }
    
    setSaveStatus("saving");
    onUpdate(json);
    lastSaveRef.current = jsonString;
    
    setTimeout(() => {
      setSaveStatus("saved");
      toast.success("Slide salvo manualmente!");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 200);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1000,
      height: 800,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);
    console.log("Canvas inicializado");

    // Load initial data if provided (dados salvos previamente)
    if (initialData && Object.keys(initialData).length > 0) {
      console.log("Carregando dados iniciais no canvas");
      canvas.loadFromJSON(initialData, () => {
        canvas.renderAll();
        isInitializedRef.current = true;
      });
    } else {
      isInitializedRef.current = true;
    }

    // Setup autosave - salvar imediatamente após cada modificação
    const handleModified = () => {
      const json = canvas.toJSON();
      const jsonString = JSON.stringify(json);
      
      // Verificar se realmente houve mudança
      if (jsonString === lastSaveRef.current) {
        return;
      }
      
      console.log(`🔄 Salvando alterações do canvas automaticamente...`);
      setSaveStatus("saving");
      lastSaveRef.current = jsonString;
      
      // Salvar imediatamente
      onUpdate(json);
      
      // Limpar timeout anterior
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Mostrar feedback de "salvo"
      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus("saved");
        console.log(`✅ Canvas salvo com sucesso`);
        setTimeout(() => setSaveStatus("idle"), 2000);
      }, 100);
    };

    canvas.on("object:modified", handleModified);
    canvas.on("object:added", handleModified);
    canvas.on("object:removed", handleModified);
    canvas.on("text:changed", handleModified);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      isInitializedRef.current = false;
      previousSlideIdRef.current = "";
      canvas.dispose();
    };
  }, []);

  // Adicionar conteúdo gerado pela IA apenas para slides novos que têm conteúdo gerado
  useEffect(() => {
    if (!fabricCanvas || !isInitializedRef.current) return;
    
    // Se já tem dados salvos no canvas, não sobrescrever
    const hasCanvasData = initialData && Object.keys(initialData).length > 0;
    if (hasCanvasData) {
      console.log("Slide já tem dados salvos, não adicionar conteúdo gerado");
      return;
    }
    
    // Se não há conteúdo gerado pela IA, não fazer nada
    if (!slideText && !slideImage && !slideChart) {
      console.log("Sem conteúdo gerado pela IA para adicionar");
      return;
    }

    console.log("Adicionando conteúdo gerado pela IA ao slide");
    const addGeneratedContent = async () => {
      try {
        // Verificar se o canvas está pronto
        if (!fabricCanvas.getContext()) return;
        
        let yPosition = 50;

      // Adicionar texto gerado
      if (slideText) {
        const textBox = new Textbox(slideText, {
          left: 50,
          top: yPosition,
          width: 850,
          fontSize: 18,
          fill: "#1e293b",
          fontFamily: "Arial",
          selectable: true,
          editable: true,
          lineHeight: 1.5,
        });
        fabricCanvas.add(textBox);
        yPosition = textBox.top + textBox.height! + 30;
      }

      // Adicionar imagem e gráfico lado a lado
      const contentWidth = 400;
      const contentSpacing = 50;
      
      if (slideImage && slideChart) {
        // Imagem à esquerda
        try {
          const img = await FabricImage.fromURL(slideImage);
          img.scaleToWidth(contentWidth);
          img.set({
            left: 50,
            top: yPosition,
            selectable: true,
          });
          fabricCanvas.add(img);
        } catch (error) {
          console.error("Erro ao adicionar imagem ao canvas:", error);
        }

        // Gráfico à direita
        const chartText = new Textbox(`📊 ${slideChart.title || 'Gráfico'}\n\n${JSON.stringify(slideChart.data || [], null, 2)}`, {
          left: 50 + contentWidth + contentSpacing,
          top: yPosition,
          width: contentWidth,
          fontSize: 14,
          fill: "#475569",
          fontFamily: "Arial",
          selectable: true,
          editable: true,
          backgroundColor: "#f8fafc",
        });
        fabricCanvas.add(chartText);
      } else if (slideImage) {
        // Apenas imagem (maior)
        try {
          const img = await FabricImage.fromURL(slideImage);
          img.scaleToWidth(contentWidth * 1.5);
          img.set({
            left: 50,
            top: yPosition,
            selectable: true,
          });
          fabricCanvas.add(img);
        } catch (error) {
          console.error("Erro ao adicionar imagem ao canvas:", error);
        }
      } else if (slideChart) {
        // Apenas gráfico (maior)
        const chartText = new Textbox(`📊 ${slideChart.title || 'Gráfico'}\n\n${JSON.stringify(slideChart.data || [], null, 2)}`, {
          left: 50,
          top: yPosition,
          width: contentWidth * 1.5,
          fontSize: 14,
          fill: "#475569",
          fontFamily: "Arial",
          selectable: true,
          editable: true,
          backgroundColor: "#f8fafc",
        });
        fabricCanvas.add(chartText);
      }

      fabricCanvas.renderAll();
    } catch (error) {
      console.error("Erro ao adicionar conteúdo ao canvas:", error);
    }
    };

    addGeneratedContent();
  }, [fabricCanvas, isInitializedRef.current, slideText, slideImage, slideChart, initialData]);

  // Atalho Ctrl+S para salvamento manual
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleManualSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fabricCanvas]);

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

  const handleAddChart = async () => {
    if (!fabricCanvas) return;

    // Criar um gráfico de exemplo pequeno
    const chartData = {
      type: "bar",
      title: "Gráfico de Exemplo",
      data: [
        { name: "A", value: 30 },
        { name: "B", value: 60 },
        { name: "C", value: 45 },
        { name: "D", value: 80 },
      ]
    };

    // Criar um container para o gráfico
    const chartGroup: any[] = [];
    
    // Adicionar título
    const title = new Textbox(chartData.title, {
      left: 0,
      top: 0,
      width: 200,
      fontSize: 12,
      fill: "#1e293b",
      fontFamily: "Arial",
      fontWeight: "bold",
      textAlign: "center",
    });
    chartGroup.push(title);

    // Adicionar barras do gráfico
    const maxValue = Math.max(...chartData.data.map(d => d.value));
    const barWidth = 40;
    const barSpacing = 10;
    const chartHeight = 150;
    const startX = 10;
    const startY = 30;

    chartData.data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = startX + (index * (barWidth + barSpacing));
      const y = startY + chartHeight - barHeight;

      // Barra
      const bar = new Rect({
        left: x,
        top: y,
        width: barWidth,
        height: barHeight,
        fill: `hsl(${206 + index * 30}, 70%, 60%)`,
        selectable: false,
      });
      chartGroup.push(bar);

      // Label
      const label = new Textbox(item.name, {
        left: x,
        top: startY + chartHeight + 5,
        width: barWidth,
        fontSize: 10,
        fill: "#475569",
        fontFamily: "Arial",
        textAlign: "center",
        selectable: false,
      });
      chartGroup.push(label);
    });

    // Adicionar todos os elementos ao canvas em uma posição inicial
    const groupLeft = 400;
    const groupTop = 50;
    
    chartGroup.forEach((obj) => {
      obj.set({
        left: obj.left + groupLeft,
        top: obj.top + groupTop,
      });
      fabricCanvas.add(obj);
    });

    fabricCanvas.renderAll();
    toast.success("Gráfico adicionado ao canvas");
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
      {/* Save Status Indicator */}
      <div className="flex items-center justify-end">
        {saveStatus === "saving" && (
          <div className="flex items-center gap-2 text-sm text-slate-500 animate-pulse">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <span>Salvando...</span>
          </div>
        )}
        {saveStatus === "saved" && (
          <div className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Alterações salvas</span>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-white border-2 border-slate-200 rounded-lg">
        <Button
          type="button"
          size="sm"
          onClick={handleManualSave}
          className="bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-slate-800 font-semibold"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Slide
        </Button>
        
        <div className="w-px h-6 bg-slate-300" />
        
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
            onClick={handleAddChart}
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
          <li><strong>Pressione Ctrl+S (ou Cmd+S no Mac) para salvar manualmente</strong></li>
        </ul>
      </div>
    </div>
  );
};
