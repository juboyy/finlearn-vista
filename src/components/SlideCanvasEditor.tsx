import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, Textbox, util, Line, Circle, Group, Path, Polygon } from "fabric";
import { Button } from "@/components/ui/button";
import { ImageIcon, BarChart3, Type, Trash2, Download, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartData {
  type: "bar" | "line" | "pie" | "donut" | "area" | "scatter";
  title: string;
  data: Array<{ name: string; value: number; color?: string }>;
}

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
              lastSaveRef.current = JSON.stringify(fabricCanvas.toJSON());
            });
          } else {
            console.log(`Slide ${slideId} vazio - pronto para edição`);
            isInitializedRef.current = true;
            lastSaveRef.current = JSON.stringify(fabricCanvas.toJSON());
            fabricCanvas.renderAll();
          }
        }
      } catch (error) {
        console.error("Erro ao trocar slide:", error);
      }
    }
  }, [fabricCanvas, slideId, initialData]);

  // Função para renderizar gráfico nativo no canvas
  const renderNativeChart = (chartData: ChartData, left: number, top: number) => {
    if (!fabricCanvas) return;

    const chartWidth = 350;
    const chartHeight = 200;
    const elements: any[] = [];

    // Título do gráfico
    const titleText = new Textbox(chartData.title, {
      left: 0,
      top: 0,
      width: chartWidth,
      fontSize: 14,
      fill: "#1e293b",
      fontFamily: "Arial",
      fontWeight: "bold",
      textAlign: "center",
      selectable: false,
    });
    elements.push(titleText);

    if (chartData.type === "bar") {
      // Gráfico de Barras
      const maxValue = Math.max(...chartData.data.map(d => d.value));
      const barWidth = (chartWidth - 40) / chartData.data.length - 10;
      const graphHeight = chartHeight - 60;
      const startX = 20;
      const startY = 35;

      chartData.data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * graphHeight;
        const x = startX + (index * (barWidth + 10));
        const y = startY + graphHeight - barHeight;

        // Barra
        const bar = new Rect({
          left: x,
          top: y,
          width: barWidth,
          height: barHeight,
          fill: item.color || `hsl(${206 + index * 40}, 70%, 60%)`,
          selectable: false,
          rx: 4,
          ry: 4,
        });
        elements.push(bar);

        // Label do valor
        const valueLabel = new Textbox(item.value.toString(), {
          left: x,
          top: y - 18,
          width: barWidth,
          fontSize: 10,
          fill: "#475569",
          fontFamily: "Arial",
          textAlign: "center",
          selectable: false,
        });
        elements.push(valueLabel);

        // Label do nome
        const nameLabel = new Textbox(item.name, {
          left: x,
          top: startY + graphHeight + 5,
          width: barWidth,
          fontSize: 9,
          fill: "#475569",
          fontFamily: "Arial",
          textAlign: "center",
          selectable: false,
        });
        elements.push(nameLabel);
      });

    } else if (chartData.type === "line") {
      // Gráfico de Linhas
      const maxValue = Math.max(...chartData.data.map(d => d.value));
      const pointSpacing = (chartWidth - 60) / (chartData.data.length - 1);
      const graphHeight = chartHeight - 60;
      const startX = 30;
      const startY = 35;

      const points: { x: number; y: number }[] = [];
      
      chartData.data.forEach((item, index) => {
        const x = startX + (index * pointSpacing);
        const normalizedValue = (item.value / maxValue) * graphHeight;
        const y = startY + graphHeight - normalizedValue;
        points.push({ x, y });

        // Ponto
        const circle = new Circle({
          left: x - 4,
          top: y - 4,
          radius: 4,
          fill: item.color || `hsl(206, 70%, 60%)`,
          selectable: false,
        });
        elements.push(circle);

        // Label do valor
        const valueLabel = new Textbox(item.value.toString(), {
          left: x - 15,
          top: y - 25,
          width: 30,
          fontSize: 9,
          fill: "#475569",
          fontFamily: "Arial",
          textAlign: "center",
          selectable: false,
        });
        elements.push(valueLabel);

        // Label do nome
        const nameLabel = new Textbox(item.name, {
          left: x - 20,
          top: startY + graphHeight + 5,
          width: 40,
          fontSize: 9,
          fill: "#475569",
          fontFamily: "Arial",
          textAlign: "center",
          selectable: false,
        });
        elements.push(nameLabel);
      });

      // Linhas conectando os pontos
      for (let i = 0; i < points.length - 1; i++) {
        const line = new Line(
          [points[i].x, points[i].y, points[i + 1].x, points[i + 1].y],
          {
            stroke: `hsl(206, 70%, 60%)`,
            strokeWidth: 2,
            selectable: false,
          }
        );
        elements.push(line);
      }
    } else if (chartData.type === "area") {
      // Gráfico de Área
      const maxValue = Math.max(...chartData.data.map(d => d.value));
      const pointSpacing = (chartWidth - 60) / (chartData.data.length - 1);
      const graphHeight = chartHeight - 60;
      const startX = 30;
      const startY = 35;
      const baseY = startY + graphHeight;

      const points: { x: number; y: number }[] = [];
      
      chartData.data.forEach((item, index) => {
        const x = startX + (index * pointSpacing);
        const normalizedValue = (item.value / maxValue) * graphHeight;
        const y = startY + graphHeight - normalizedValue;
        points.push({ x, y });
      });

      // Criar polígono da área
      const areaPoints = [
        ...points,
        { x: points[points.length - 1].x, y: baseY },
        { x: points[0].x, y: baseY }
      ];

      const pathString = areaPoints.map((p, i) => 
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
      ).join(' ') + ' Z';

      const areaPath = new Path(pathString, {
        fill: 'hsla(206, 70%, 60%, 0.3)',
        stroke: 'hsl(206, 70%, 60%)',
        strokeWidth: 2,
        selectable: false,
      });
      elements.push(areaPath);

      // Pontos e labels
      chartData.data.forEach((item, index) => {
        const x = points[index].x;
        const y = points[index].y;

        // Ponto
        const circle = new Circle({
          left: x - 3,
          top: y - 3,
          radius: 3,
          fill: item.color || 'hsl(206, 70%, 60%)',
          selectable: false,
        });
        elements.push(circle);

        // Label do valor
        const valueLabel = new Textbox(item.value.toString(), {
          left: x - 15,
          top: y - 20,
          width: 30,
          fontSize: 9,
          fill: "#475569",
          fontFamily: "Arial",
          textAlign: "center",
          selectable: false,
        });
        elements.push(valueLabel);

        // Label do nome
        const nameLabel = new Textbox(item.name, {
          left: x - 20,
          top: baseY + 5,
          width: 40,
          fontSize: 9,
          fill: "#475569",
          fontFamily: "Arial",
          textAlign: "center",
          selectable: false,
        });
        elements.push(nameLabel);
      });

    } else if (chartData.type === "scatter") {
      // Gráfico de Dispersão
      const maxValue = Math.max(...chartData.data.map(d => d.value));
      const pointSpacing = (chartWidth - 60) / (chartData.data.length - 1);
      const graphHeight = chartHeight - 60;
      const startX = 30;
      const startY = 35;

      chartData.data.forEach((item, index) => {
        const x = startX + (index * pointSpacing);
        const normalizedValue = (item.value / maxValue) * graphHeight;
        const y = startY + graphHeight - normalizedValue;

        // Ponto maior para scatter
        const circle = new Circle({
          left: x - 6,
          top: y - 6,
          radius: 6,
          fill: item.color || `hsl(${206 + index * 40}, 70%, 60%)`,
          opacity: 0.7,
          selectable: false,
        });
        elements.push(circle);

        // Label do valor dentro do ponto
        const valueLabel = new Textbox(item.value.toString(), {
          left: x - 12,
          top: y - 20,
          width: 24,
          fontSize: 8,
          fill: "#1e293b",
          fontFamily: "Arial",
          fontWeight: "bold",
          textAlign: "center",
          selectable: false,
        });
        elements.push(valueLabel);

        // Label do nome
        const nameLabel = new Textbox(item.name, {
          left: x - 20,
          top: startY + graphHeight + 5,
          width: 40,
          fontSize: 9,
          fill: "#475569",
          fontFamily: "Arial",
          textAlign: "center",
          selectable: false,
        });
        elements.push(nameLabel);
      });

    } else if (chartData.type === "pie" || chartData.type === "donut") {
      // Gráfico de Pizza ou Donut
      const total = chartData.data.reduce((sum, item) => sum + item.value, 0);
      const centerX = chartWidth / 2;
      const centerY = (chartHeight + 20) / 2;
      const radius = Math.min(chartWidth, chartHeight - 40) / 2.5;
      const innerRadius = chartData.type === "donut" ? radius * 0.5 : 0;

      let currentAngle = -90; // Começar do topo

      chartData.data.forEach((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const color = item.color || `hsl(${index * (360 / chartData.data.length)}, 70%, 60%)`;

        // Criar fatia como Path
        const startAngle = currentAngle * Math.PI / 180;
        const endAngle = (currentAngle + angle) * Math.PI / 180;

        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        let pathStr: string;
        
        if (chartData.type === "donut") {
          const x1Inner = centerX + innerRadius * Math.cos(startAngle);
          const y1Inner = centerY + innerRadius * Math.sin(startAngle);
          const x2Inner = centerX + innerRadius * Math.cos(endAngle);
          const y2Inner = centerY + innerRadius * Math.sin(endAngle);

          pathStr = `M ${x1Inner} ${y1Inner} L ${x1} ${y1} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 ${angle > 180 ? 1 : 0} 0 ${x1Inner} ${y1Inner} Z`;
        } else {
          pathStr = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
        }

        const slice = new Path(pathStr, {
          fill: color,
          stroke: '#ffffff',
          strokeWidth: 2,
          selectable: false,
        });
        elements.push(slice);

        // Label com nome e percentual
        const labelAngle = (currentAngle + angle / 2) * Math.PI / 180;
        const labelRadius = chartData.type === "donut" ? (radius + innerRadius) / 2 : radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const label = new Textbox(`${item.name}\n${percentage.toFixed(1)}%`, {
          left: labelX - 30,
          top: labelY - 15,
          width: 60,
          fontSize: 9,
          fill: "#ffffff",
          fontFamily: "Arial",
          fontWeight: "bold",
          textAlign: "center",
          selectable: false,
        });
        elements.push(label);

        currentAngle += angle;
      });
    }

    // Criar grupo com todos os elementos do gráfico
    const group = new Group(elements, {
      left: left,
      top: top,
      selectable: true,
    });

    fabricCanvas.add(group);
    fabricCanvas.renderAll();
    
    return group;
  };
  const handleViewSlide = () => {
    if (!fabricCanvas) return;
    
    const objects = fabricCanvas.getObjects();
    
    if (objects.length === 0) {
      toast.info("Este slide está vazio. Clique em 'Adicionar Texto' para começar.");
      return;
    }
    
    // Resetar viewport e zoom
    fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    
    // Desmarcar qualquer seleção
    fabricCanvas.discardActiveObject();
    
    // Forçar re-renderização completa
    fabricCanvas.renderAll();
    
    // Contagem de elementos
    const textCount = objects.filter(obj => obj.type === 'textbox').length;
    const imageCount = objects.filter(obj => obj.type === 'image').length;
    const otherCount = objects.length - textCount - imageCount;
    
    let message = `Visualizando slide completo:`;
    if (textCount > 0) message += ` ${textCount} texto(s)`;
    if (imageCount > 0) message += `, ${imageCount} imagem(s)`;
    if (otherCount > 0) message += `, ${otherCount} outro(s)`;
    
    toast.success(message);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 960,
      height: 540,
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

    // Setup autosave - detectar mudanças
    const handleModified = () => {
      const json = canvas.toJSON();
      const jsonString = JSON.stringify(json);
      
      // Verificar se realmente houve mudança
      if (jsonString === lastSaveRef.current) {
        return;
      }
      
      console.log(`🔄 Alteração detectada no canvas`);
      setSaveStatus("saving");
      
      // Limpar timeout anterior
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Salvar automaticamente após 1 segundo sem mudanças
      saveTimeoutRef.current = setTimeout(() => {
        console.log(`💾 Salvando automaticamente...`);
        onUpdate(json);
        lastSaveRef.current = jsonString;
        setSaveStatus("saved");
        toast.success("Alterações salvas automaticamente");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }, 1000);
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

  // Adicionar conteúdo gerado pela IA ao carregar o slide
  useEffect(() => {
    if (!fabricCanvas || !isInitializedRef.current || !slideId) return;
    
    // Se já tem dados salvos no canvas, não sobrescrever
    const hasCanvasData = initialData && Object.keys(initialData).length > 0;
    if (hasCanvasData) {
      console.log("Slide já tem dados salvos, carregando do cache");
      return;
    }
    
    // Se não há conteúdo gerado pela IA, não fazer nada
    if (!slideText && !slideImage && !slideChart) {
      console.log("Sem conteúdo gerado pela IA para adicionar");
      return;
    }

    console.log("🎨 Adicionando conteúdo gerado pela IA ao slide automaticamente");
    console.log(`📝 Texto: ${slideText ? 'SIM (' + slideText.substring(0, 50) + '...)' : 'NÃO'}`);
    console.log(`🖼️ Imagem: ${slideImage ? 'SIM' : 'NÃO'}`);
    console.log(`📊 Gráfico: ${slideChart ? 'SIM' : 'NÃO'}`);
    const addGeneratedContent = async () => {
      try {
        // Limpar canvas antes de adicionar novo conteúdo
        fabricCanvas.clear();
        fabricCanvas.backgroundColor = "#ffffff";
        
        let yPosition = 40;

      // Adicionar texto gerado com formatação otimizada
      if (slideText) {
        const textBox = new Textbox(slideText, {
          left: 40,
          top: yPosition,
          width: 880,
          fontSize: 13,
          fill: "#1e293b",
          fontFamily: "Arial",
          selectable: true,
          editable: true,
          lineHeight: 1.5,
        });
        fabricCanvas.add(textBox);
        // Limitar altura do texto para caber imagem/gráfico
        yPosition = Math.min(textBox.top + textBox.height! + 15, 320);
      }

      // Adicionar imagem e gráfico lado a lado na parte inferior
      const contentWidth = 350;
      const contentSpacing = 40;
      const imageChartYPosition = Math.max(yPosition, 280);
      
      if (slideImage && slideChart) {
        // Imagem à esquerda
        try {
          const img = await FabricImage.fromURL(slideImage);
          const maxHeight = 240;
          const scale = Math.min(contentWidth / img.width!, maxHeight / img.height!);
          img.scale(scale);
          img.set({
            left: 40,
            top: imageChartYPosition,
            selectable: true,
          });
          fabricCanvas.add(img);
        } catch (error) {
          console.error("Erro ao adicionar imagem ao canvas:", error);
        }

        // Gráfico nativo à direita
        if (slideChart.type && slideChart.data) {
          renderNativeChart(slideChart, 40 + contentWidth + contentSpacing, imageChartYPosition);
        }
      } else if (slideImage) {
        // Apenas imagem (centralizada e otimizada)
        try {
          const img = await FabricImage.fromURL(slideImage);
          const maxWidth = 740;
          const maxHeight = 240;
          const scale = Math.min(maxWidth / img.width!, maxHeight / img.height!);
          img.scale(scale);
          img.set({
            left: (960 - img.getScaledWidth()) / 2,
            top: imageChartYPosition,
            selectable: true,
          });
          fabricCanvas.add(img);
        } catch (error) {
          console.error("Erro ao adicionar imagem ao canvas:", error);
        }
      } else if (slideChart) {
        // Apenas gráfico nativo (centralizado)
        if (slideChart.type && slideChart.data) {
          renderNativeChart(slideChart, (960 - 350) / 2, imageChartYPosition);
        }
      }

      fabricCanvas.renderAll();
      
      // Salvar o conteúdo inicial automaticamente
      const json = fabricCanvas.toJSON();
      lastSaveRef.current = JSON.stringify(json);
      onUpdate(json);
      console.log("✅ Conteúdo do slide salvo automaticamente");
      console.log(`📦 Total de objetos no canvas: ${fabricCanvas.getObjects().length}`);
    } catch (error) {
      console.error("Erro ao adicionar conteúdo ao canvas:", error);
    }
    };

    addGeneratedContent();
  }, [fabricCanvas, slideId, slideText, slideImage, slideChart, initialData]);

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
      left: 80,
      top: 80,
      width: 250,
      fontSize: 20,
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
        img.scaleToWidth(350);
        img.set({
          left: 80,
          top: 80,
        });
        
        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
        toast.success("Imagem adicionada ao canvas");
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddChart = async (chartType: ChartData["type"]) => {
    if (!fabricCanvas) return;

    const chartNames = {
      bar: "de Barras",
      line: "de Linhas",
      area: "de Área",
      scatter: "de Dispersão",
      pie: "de Pizza",
      donut: "Donut"
    };

    // Dados de exemplo para o gráfico
    const chartData: ChartData = {
      type: chartType,
      title: `Gráfico ${chartNames[chartType]}`,
      data: [
        { name: "A", value: 450, color: "hsl(206, 70%, 60%)" },
        { name: "B", value: 680, color: "hsl(226, 70%, 60%)" },
        { name: "C", value: 520, color: "hsl(246, 70%, 60%)" },
        { name: "D", value: 790, color: "hsl(266, 70%, 60%)" },
      ]
    };

    renderNativeChart(chartData, 350, 40);
    toast.success(`Gráfico ${chartNames[chartType]} adicionado`);
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                onClick={handleViewSlide}
                className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700 border-none w-10 h-10"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ver Slide</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="w-px h-6 bg-slate-300" />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                onClick={handleAddText}
                className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700 border-none w-10 h-10"
              >
                <Type className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar Texto</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700 border-none w-10 h-10"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar Imagem</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {onAddChart && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="sm"
                className="bg-[hsl(142,35%,75%)] hover:bg-[hsl(142,35%,65%)] text-slate-800"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Adicionar Gráfico
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-slate-800 z-50">
              <DropdownMenuLabel>Escolha o tipo de gráfico</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleAddChart("bar")}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Gráfico de Barras</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAddChart("line")}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <span>Gráfico de Linhas</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAddChart("area")}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2l2-4 3 6 3-6 3 4 2-2v6H3v-4z" opacity="0.5"/>
                  <path d="M3 13l2-4 2 4 3-6 3 6 3-4 2 2" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Gráfico de Área</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAddChart("scatter")}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="6" cy="8" r="2"/>
                  <circle cx="10" cy="14" r="2"/>
                  <circle cx="14" cy="10" r="2"/>
                  <circle cx="18" cy="16" r="2"/>
                </svg>
                <span>Gráfico de Dispersão</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAddChart("pie")}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2v10l8.66 5A10 10 0 1 1 12 2z" opacity="0.5"/>
                  <path d="M12 2a10 10 0 0 1 8.66 15L12 12V2z"/>
                </svg>
                <span>Gráfico de Pizza</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAddChart("donut")}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="5" strokeWidth="2"/>
                  <path d="M12 3v4M12 17v4" strokeWidth="2"/>
                </svg>
                <span>Gráfico Donut</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="flex-1" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                onClick={handleDeleteSelected}
                className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700 border-none w-10 h-10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Excluir Selecionado</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                onClick={handleExportImage}
                className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700 border-none w-10 h-10"
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exportar PNG</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
