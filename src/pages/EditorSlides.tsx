import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  BarChart3,
  FileText,
  Sparkles,
  Save,
  Eye,
  Download,
  XCircle,
  Star,
  MessageSquare,
  Settings,
  Upload,
  DollarSign,
  CreditCard,
  Smartphone,
  Users,
  Info,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { SlideChart } from "@/components/SlideChart";
import { SlideCanvasEditor } from "@/components/SlideCanvasEditor";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSlideItem } from "@/components/SortableSlideItem";
import { useUserAgents } from "@/hooks/useUserAgents";
import { AgentChat } from "@/components/AgentChat";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Slide {
  id: string;
  title: string;
  content: string;
  canvasData?: any; // Fabric.js canvas JSON data
  imageUrl?: string;
  chartData?: any;
}

export default function EditorSlides() {
  const { agents } = useUserAgents();
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    description: "",
    targetAudience: "",
  });
  const [showInfoDialog, setShowInfoDialog] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([
    { id: "1", title: "Slide 1", content: "" },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [chartPrompt, setChartPrompt] = useState("");
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showChartDialog, setShowChartDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [presentationSettings, setPresentationSettings] = useState({
    isPaid: false,
    price: "",
    paymentMethods: [] as string[],
    coAuthors: [] as string[],
    summary: "",
    coverImage: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentSlide = slides[currentSlideIndex];

  const handleInfoSubmit = () => {
    if (!projectInfo.title || !projectInfo.description) {
      toast.error("Preencha o título e descrição do projeto");
      return;
    }
    setShowInfoDialog(false);
    generateInitialSlides();
  };

  const generateInitialSlides = async () => {
    setIsGenerating(true);
    try {
      const selectedAgent = agents.find(a => a.id === selectedAgentId);
      const agentContext = selectedAgent 
        ? `\nAgente especializado: ${selectedAgent.agent_name} - ${selectedAgent.agent_description}\nCategoria: ${selectedAgent.agent_category}`
        : "";

      // Primeiro, gerar a estrutura dos slides
      const { data, error } = await supabase.functions.invoke("generate-slides-content", {
        body: {
          prompt: `Crie uma apresentação completa e detalhada sobre: ${projectInfo.title}. 
Descrição: ${projectInfo.description}. 
Público-alvo: ${projectInfo.targetAudience}.
Contexto: Mercado financeiro brasileiro.${agentContext}

INSTRUÇÕES CRÍTICAS:
- OBRIGATÓRIO: Crie NO MÍNIMO 10 slides SEPARADOS
- Cada slide deve abordar UM aspecto específico do tema
- DIVIDA o conteúdo em múltiplos slides - NÃO coloque tudo em um único slide
- Cada slide deve ter um título claro e conteúdo COMPLETO e DETALHADO
- O conteúdo de cada slide deve ser estruturado em tópicos ou parágrafos
- Inclua dados, estatísticas e exemplos quando relevante
- Adicione insights e análises específicas do mercado financeiro
- TODOS os slides devem ter uma imagem E um gráfico únicos e específicos

Estrutura sugerida:
1. Slide de introdução/contexto
2-3. Slides sobre aspectos fundamentais
4-6. Slides com análises e dados detalhados
7-8. Slides com exemplos práticos e casos de uso
9. Slide de tendências/futuro
10. Slide de conclusão/próximos passos

Retorne um JSON com MÚLTIPLOS slides neste formato exato:
{
  "slides": [
    {
      "title": "Título do Slide 1",
      "content": "Conteúdo detalhado...",
      "imagePrompt": "Descrição específica e detalhada da imagem para este slide, relacionada ao mercado financeiro",
      "chartType": "bar" ou "line" ou "pie",
      "chartPrompt": "Descrição específica dos dados para o gráfico deste slide"
    }
  ]
}

OBRIGATÓRIO:
- TODOS os slides DEVEM ter "imagePrompt" com descrição específica
- TODOS os slides DEVEM ter "chartType" e "chartPrompt" com dados específicos
- Cada imagem deve ser única e relacionada ao conteúdo específico do slide
- Cada gráfico deve mostrar dados diferentes e relevantes ao conteúdo do slide

LEMBRE-SE: Retorne NO MÍNIMO 10 slides diferentes, cada um com sua própria imagem e gráfico únicos.`,
        },
      });

      if (error) throw error;

      if (data?.generatedText) {
        let cleanedText = data.generatedText.trim();
        cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        
        const slidesData = JSON.parse(cleanedText);
        
        if (!slidesData.slides || slidesData.slides.length < 5) {
          throw new Error("A IA não gerou slides suficientes. Tente novamente.");
        }

        toast.info(`Gerando ${slidesData.slides.length} slides com imagens e gráficos únicos...`);
        
        // Gerar imagens e gráficos para cada slide
        const generatedSlides = await Promise.all(
          slidesData.slides.map(async (slide: any, index: number) => {
            let imageUrl: string | undefined;
            let chartData: any | undefined;

            // Gerar imagem se tiver prompt
            if (slide.imagePrompt) {
              try {
                const { data: imageData } = await supabase.functions.invoke("generate-slides-content", {
                  body: {
                    type: "image",
                    prompt: `${slide.imagePrompt}. ESTILO OBRIGATÓRIO: Ilustração minimalista, cores pastel claras (tons suaves de azul, rosa, verde, roxo), traços limpos e simples, estilo flat design, visual corporativo mas leve, sem detalhes excessivos, fundo limpo ou gradiente suave em pastel.`,
                  },
                });
                
                if (imageData?.imageUrl) {
                  imageUrl = imageData.imageUrl;
                }
              } catch (err) {
                console.error(`Erro ao gerar imagem para slide ${index + 1}:`, err);
              }
            }

            // Gerar dados do gráfico se tiver prompt
            if (slide.chartPrompt && slide.chartType) {
              try {
                const { data: chartDataResponse } = await supabase.functions.invoke("generate-slides-content", {
                  body: {
                    prompt: `Você é um especialista em mercado financeiro. Baseado no prompt: "${slide.chartPrompt}", 
gere dados REALISTAS e FICTÍCIOS para um gráfico ${slide.chartType}.

INSTRUÇÕES:
- Gere entre 5 e 8 pontos de dados relevantes
- Os valores devem ser realistas para o contexto financeiro brasileiro
- Use nomes descritivos e específicos nos labels

Retorne APENAS um JSON válido neste formato exato:
{
  "type": "${slide.chartType}",
  "title": "Título do gráfico",
  "data": [
    { "name": "Label 1", "value": 123 },
    { "name": "Label 2", "value": 456 }
  ]
}`,
                  },
                });

                if (chartDataResponse?.generatedText) {
                  let chartCleanedText = chartDataResponse.generatedText.trim();
                  chartCleanedText = chartCleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
                  chartData = JSON.parse(chartCleanedText);
                }
              } catch (err) {
                console.error(`Erro ao gerar gráfico para slide ${index + 1}:`, err);
              }
            }

            return {
              id: `${index + 1}`,
              title: slide.title,
              content: slide.content,
              imageUrl,
              chartData,
            };
          })
        );
        
        setSlides(generatedSlides);
        toast.success(`${generatedSlides.length} slides gerados com imagens e gráficos únicos!`);
      }
    } catch (error) {
      console.error("Error generating slides:", error);
      toast.error("Erro ao gerar slides iniciais");
    } finally {
      setIsGenerating(false);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: `${slides.length + 1}`,
      title: `Slide ${slides.length + 1}`,
      content: "",
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const deleteSlide = (id: string) => {
    if (slides.length === 1) {
      toast.error("Você precisa ter pelo menos um slide");
      return;
    }
    const newSlides = slides.filter((s) => s.id !== id);
    setSlides(newSlides);
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
  };

  const updateSlide = (field: keyof Slide, value: any) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = {
      ...newSlides[currentSlideIndex],
      [field]: value,
    };
    setSlides(newSlides);
  };

  const generateImage = async () => {
    if (!imagePrompt) {
      toast.error("Digite um prompt para a imagem");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-slides-content", {
        body: {
          type: "image",
          prompt: `${imagePrompt}. ESTILO OBRIGATÓRIO: Ilustração minimalista, cores pastel claras (tons suaves de azul, rosa, verde, roxo), traços limpos e simples, estilo flat design, visual corporativo mas leve, sem detalhes excessivos, fundo limpo ou gradiente suave em pastel.`,
        },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        updateSlide("imageUrl", data.imageUrl);
        toast.success("Imagem gerada com sucesso");
        setShowImageDialog(false);
        setImagePrompt("");
      } else {
        throw new Error("Nenhuma imagem foi gerada");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Erro ao gerar imagem");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateChart = async () => {
    if (!chartPrompt) {
      toast.error("Digite um prompt para o gráfico");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-slides-content", {
        body: {
          prompt: `Você é um especialista em mercado financeiro. Baseado no prompt: "${chartPrompt}", 
gere dados REALISTAS e FICTÍCIOS para um gráfico.

INSTRUÇÕES:
- Determine o tipo de gráfico mais apropriado: bar (barras), line (linha) ou pie (pizza)
- Gere entre 5 e 8 pontos de dados relevantes
- Os valores devem ser realistas para o contexto financeiro brasileiro
- Use nomes descritivos e específicos nos labels

Retorne APENAS um JSON válido neste formato exato:
{
  "type": "bar" ou "line" ou "pie",
  "title": "Título do gráfico",
  "data": [
    { "name": "Label 1", "value": 123 },
    { "name": "Label 2", "value": 456 }
  ]
}

Exemplo para PIX:
{
  "type": "bar",
  "title": "Crescimento de Transações PIX (Bilhões)",
  "data": [
    { "name": "2020", "value": 1.5 },
    { "name": "2021", "value": 15.2 },
    { "name": "2022", "value": 33.8 },
    { "name": "2023", "value": 55.4 },
    { "name": "2024", "value": 78.9 },
    { "name": "2025 (proj)", "value": 102.3 }
  ]
}`,
        },
      });

      if (error) throw error;

      if (data?.generatedText) {
        let cleanedText = data.generatedText.trim();
        cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        
        const chartData = JSON.parse(cleanedText);
        updateSlide("chartData", chartData);
        toast.success("Gráfico gerado com sucesso");
        setShowChartDialog(false);
        setChartPrompt("");
      }
    } catch (error) {
      console.error("Error generating chart:", error);
      toast.error("Erro ao gerar gráfico");
    } finally {
      setIsGenerating(false);
    }
  };

  const savePresentation = async () => {
    if (!projectInfo.title) {
      toast.error("Adicione um título antes de salvar");
      return;
    }

    try {
      const presentationData: any = {
        title: projectInfo.title,
        description: presentationSettings.summary || projectInfo.description || null,
        target_audience: projectInfo.targetAudience || null,
        slides: slides as any,
        status: 'published',
        author_name: presentationSettings.coAuthors.filter(a => a.trim()).join(', ') || 'Usuário',
        topic: 'Geral'
      };

      // Add payment info if applicable
      if (presentationSettings.isPaid) {
        presentationData.is_paid = true;
        presentationData.price = parseFloat(presentationSettings.price) || 0;
        presentationData.payment_methods = presentationSettings.paymentMethods;
      }

      // Add cover image if provided
      if (presentationSettings.coverImage) {
        presentationData.cover_image = presentationSettings.coverImage;
      }

      const { data, error } = await supabase
        .from('presentations')
        .insert(presentationData)
        .select()
        .single();

      if (error) throw error;

      toast.success("Apresentação salva com sucesso!");
    } catch (error) {
      console.error("Error saving presentation:", error);
      toast.error("Erro ao salvar apresentação");
    }
  };

  const clearAllSlides = () => {
    setSlides([{ id: "1", title: "Slide 1", content: "" }]);
    setCurrentSlideIndex(0);
    setShowClearDialog(false);
    toast.success("Todos os slides foram removidos");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSlides((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newSlides = arrayMove(items, oldIndex, newIndex);
        
        // Atualizar o índice atual se o slide selecionado foi movido
        if (currentSlideIndex === oldIndex) {
          setCurrentSlideIndex(newIndex);
        } else if (
          currentSlideIndex > oldIndex &&
          currentSlideIndex <= newIndex
        ) {
          setCurrentSlideIndex(currentSlideIndex - 1);
        } else if (
          currentSlideIndex < oldIndex &&
          currentSlideIndex >= newIndex
        ) {
          setCurrentSlideIndex(currentSlideIndex + 1);
        }
        
        return newSlides;
      });
      
      toast.success("Slides reordenados");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 w-full overflow-hidden">
      <SidebarFix />

      {/* Agent Chat */}
      {showAgentChat && selectedAgentId && (() => {
        const selectedAgent = agents.find(a => a.id === selectedAgentId);
        if (!selectedAgent) return null;
        return (
          <AgentChat
            agentName={selectedAgent.agent_name}
            agentImage={selectedAgent.agent_image}
            onClose={() => setShowAgentChat(false)}
          />
        );
      })()}

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-800">
              Informações da Apresentação
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Conte-nos sobre o assunto da apresentação para que a IA possa te ajudar melhor
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {/* Agent Selection - FIRST */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">
                Escolha um Agente de IA (Opcional)
              </label>
              <div className="flex gap-2">
                <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                  <SelectTrigger className="flex-1 border-2 border-slate-300">
                    <SelectValue placeholder="Escolha um especialista..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-slate-300 z-[60] max-h-[650px] overflow-y-auto">
                    {agents.map((agent) => {
                      // Extract HSL color from bg class
                      const bgColor = agent.agent_bg_color.includes('hsl') 
                        ? agent.agent_bg_color.match(/hsl\([^)]+\)/)?.[0] 
                        : 'hsl(206,35%,85%)';
                      
                      return (
                        <SelectItem 
                          key={agent.id} 
                          value={agent.id}
                          disabled={!agent.is_active}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-3 py-2">
                            <img 
                              src={agent.agent_image} 
                              alt={agent.agent_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-semibold text-slate-800">{agent.agent_name}</div>
                                <div className="flex items-center gap-1.5">
                                  <span 
                                    className="text-xs px-2 py-0.5 rounded-full font-medium text-slate-700"
                                    style={{ backgroundColor: bgColor }}
                                  >
                                    {agent.agent_category}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold bg-[hsl(45,78%,88%)] text-[hsl(45,78%,35%)]">
                                    <Star size={10} fill="currentColor" />
                                    {agent.rating}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-slate-600 line-clamp-1">{agent.agent_description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Título da Apresentação
              </label>
              <Input
                placeholder="Ex: Análise de Mercado de Crédito 2024"
                value={projectInfo.title}
                onChange={(e) =>
                  setProjectInfo({ ...projectInfo, title: e.target.value })
                }
                className="border-slate-300"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Descrição e Objetivos
              </label>
              <Textarea
                placeholder="Descreva o conteúdo que será abordado, principais tópicos e objetivos da apresentação..."
                value={projectInfo.description}
                onChange={(e) =>
                  setProjectInfo({ ...projectInfo, description: e.target.value })
                }
                className="border-slate-300 min-h-[120px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Público-Alvo
              </label>
              <Input
                placeholder="Ex: Executivos C-level, Analistas financeiros, Investidores"
                value={projectInfo.targetAudience}
                onChange={(e) =>
                  setProjectInfo({ ...projectInfo, targetAudience: e.target.value })
                }
                className="border-slate-300"
              />
            </div>

            <Button
              onClick={handleInfoSubmit}
              className="w-full bg-[#7FA8C9] hover:bg-[#6B91B3] text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Começar a Criar com IA
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-slate-800">Gerar Imagem com IA</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Textarea
              placeholder="Descreva a imagem que deseja gerar (ex: gráfico de crescimento do mercado de crédito)"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              className="border-slate-300"
            />
            <Button
              onClick={generateImage}
              disabled={isGenerating}
              className="w-full bg-[#A68CC9] hover:bg-[#8F7AB3] text-white"
            >
              {isGenerating ? "Gerando..." : "Gerar Imagem"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chart Dialog */}
      <Dialog open={showChartDialog} onOpenChange={setShowChartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-slate-800">Gerar Gráfico com IA</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Textarea
              placeholder="Descreva o gráfico que deseja gerar (ex: evolução do PIX nos últimos 3 anos)"
              value={chartPrompt}
              onChange={(e) => setChartPrompt(e.target.value)}
              className="border-slate-300"
            />
            <Button
              onClick={generateChart}
              disabled={isGenerating}
              className="w-full bg-[#8CC99B] hover:bg-[#7AB389] text-white"
            >
              {isGenerating ? "Gerando..." : "Gerar Gráfico"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Sheet */}
      <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
        <SheetContent side="right" className="w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-slate-800">Configurações da Apresentação</SheetTitle>
            <SheetDescription className="text-slate-600">
              Configure informações adicionais sobre sua apresentação
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            {/* Tipo de Acesso - Card destacado */}
            <div className="bg-gradient-to-r from-[#F5C6E3] to-[#E0B0CF] rounded-xl p-4 border-2 border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <Label htmlFor="isPaid" className="text-sm font-semibold text-slate-800 cursor-pointer">
                      Apresentação Paga
                    </Label>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monetize seu conteúdo
                    </p>
                  </div>
                </div>
                <Switch
                  id="isPaid"
                  checked={presentationSettings.isPaid}
                  onCheckedChange={(checked) =>
                    setPresentationSettings({ ...presentationSettings, isPaid: checked })
                  }
                />
              </div>
            </div>

            {/* Campos exibidos apenas se for pago */}
            {presentationSettings.isPaid && (
              <div className="space-y-4 animate-fade-in">
                {/* Valor */}
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(142,35%,75%)] flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-slate-700" />
                    </div>
                    <Label htmlFor="price" className="text-sm font-semibold text-slate-800">
                      Valor da Apresentação
                    </Label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                      R$
                    </span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={presentationSettings.price}
                      onChange={(e) =>
                        setPresentationSettings({ ...presentationSettings, price: e.target.value })
                      }
                      className="pl-12 border-2 border-slate-200 focus:border-[hsl(142,35%,65%)] transition-colors"
                    />
                  </div>
                </div>

                {/* Formas de Pagamento */}
                <div className="bg-white rounded-xl p-4 border-2 border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(206,35%,75%)] flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-slate-700" />
                    </div>
                    <Label className="text-sm font-semibold text-slate-800">
                      Formas de Pagamento
                    </Label>
                  </div>
                  <div className="space-y-3 pl-2">
                    {[
                      { name: "Cartão de Crédito", icon: CreditCard },
                      { name: "PIX", icon: Smartphone },
                      { name: "Boleto", icon: FileText }
                    ].map(({ name, icon: Icon }) => (
                      <div key={name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <Checkbox
                          id={name}
                          checked={presentationSettings.paymentMethods.includes(name)}
                          onCheckedChange={(checked) => {
                            const methods = checked
                              ? [...presentationSettings.paymentMethods, name]
                              : presentationSettings.paymentMethods.filter((m) => m !== name);
                            setPresentationSettings({ ...presentationSettings, paymentMethods: methods });
                          }}
                        />
                        <Icon className="h-4 w-4 text-slate-600" />
                        <Label htmlFor={name} className="text-sm text-slate-700 cursor-pointer flex-1">
                          {name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Co-autores */}
            <div className="bg-white rounded-xl p-4 border-2 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[hsl(280,35%,75%)] flex items-center justify-center">
                    <Users className="h-4 w-4 text-slate-700" />
                  </div>
                  <Label className="text-sm font-semibold text-slate-800">
                    Co-autores
                  </Label>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setPresentationSettings({
                      ...presentationSettings,
                      coAuthors: [...presentationSettings.coAuthors, ""]
                    });
                  }}
                  className="bg-[hsl(280,35%,65%)] hover:bg-[hsl(280,35%,55%)] text-slate-800 h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {presentationSettings.coAuthors.length === 0 ? (
                <p className="text-xs text-slate-500 flex items-center gap-1 py-2">
                  <Info className="h-3 w-3" />
                  Clique no botão + para adicionar colaboradores
                </p>
              ) : (
                <div className="space-y-2">
                  {presentationSettings.coAuthors.map((coAuthor, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Nome do co-autor ${index + 1}`}
                        value={coAuthor}
                        onChange={(e) => {
                          const newCoAuthors = [...presentationSettings.coAuthors];
                          newCoAuthors[index] = e.target.value;
                          setPresentationSettings({ ...presentationSettings, coAuthors: newCoAuthors });
                        }}
                        className="border-2 border-slate-200 focus:border-[hsl(280,35%,65%)] transition-colors flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const newCoAuthors = presentationSettings.coAuthors.filter((_, i) => i !== index);
                          setPresentationSettings({ ...presentationSettings, coAuthors: newCoAuthors });
                        }}
                        className="text-slate-600 hover:text-red-600 hover:bg-red-50 h-9 w-9 p-0"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumo */}
            <div className="bg-white rounded-xl p-4 border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[hsl(44,35%,75%)] flex items-center justify-center">
                  <FileText className="h-4 w-4 text-slate-700" />
                </div>
                <Label htmlFor="summary" className="text-sm font-semibold text-slate-800">
                  Resumo da Apresentação
                </Label>
              </div>
              <Textarea
                id="summary"
                placeholder="Descreva o conteúdo e objetivos da apresentação..."
                value={presentationSettings.summary}
                onChange={(e) =>
                  setPresentationSettings({ ...presentationSettings, summary: e.target.value })
                }
                className="border-2 border-slate-200 focus:border-[hsl(44,35%,65%)] transition-colors min-h-[100px] resize-none"
              />
              <p className="text-xs text-slate-500">
                {presentationSettings.summary.length} caracteres
              </p>
            </div>

            {/* Imagem de Capa */}
            <div className="bg-white rounded-xl p-4 border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[hsl(322,35%,75%)] flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-slate-700" />
                </div>
                <Label htmlFor="coverImage" className="text-sm font-semibold text-slate-800">
                  Imagem de Capa
                </Label>
              </div>
              <Input
                id="coverImage"
                placeholder="Cole a URL da imagem..."
                value={presentationSettings.coverImage}
                onChange={(e) =>
                  setPresentationSettings({ ...presentationSettings, coverImage: e.target.value })
                }
                className="border-2 border-slate-200 focus:border-[hsl(322,35%,65%)] transition-colors"
              />
              {presentationSettings.coverImage && (
                <div className="relative group">
                  <img
                    src={presentationSettings.coverImage}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border-2 border-slate-200 transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 rounded-lg transition-colors flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )}
            </div>

            {/* Botão Salvar */}
            <Button
              onClick={() => {
                setShowSettingsSheet(false);
                toast.success("Configurações salvas");
              }}
              className="w-full bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-800 font-semibold h-12 text-base shadow-md hover:shadow-lg transition-all"
            >
              <Save className="h-5 w-5 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Clear Confirmation Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-slate-800">Limpar Todos os Slides?</DialogTitle>
            <DialogDescription className="text-slate-600">
              Esta ação removerá todos os slides da apresentação. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowClearDialog(false)}
              className="border-slate-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={clearAllSlides}
              className="bg-red-500 hover:bg-red-600 text-slate-700"
            >
              Limpar Tudo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 flex w-full">
        {/* Slides Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 p-4 overflow-y-auto flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Slides</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowClearDialog(true)}
                size="sm"
                variant="outline"
                className="border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-400"
                title="Limpar todos os slides"
              >
                <XCircle className="w-4 h-4" />
              </Button>
              <Button
                onClick={addSlide}
                size="sm"
                className="bg-[#C5E8D4] hover:bg-[#B0D4C0] text-slate-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={slides.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {slides.map((slide, index) => (
                  <SortableSlideItem
                    key={slide.id}
                    slide={slide}
                    index={index}
                    isActive={index === currentSlideIndex}
                    onSelect={() => setCurrentSlideIndex(index)}
                    onDelete={deleteSlide}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col w-full">
          {/* Toolbar */}
          <div className="bg-white border-b border-slate-200 p-4 w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold text-slate-800">
                {projectInfo.title || "Nova Apresentação"}
              </h1>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowSettingsSheet(true)}
                  size="icon"
                  className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => {
                    if (!selectedAgentId) {
                      toast.error("Selecione um agente primeiro no diálogo inicial");
                      return;
                    }
                    setShowAgentChat(true);
                  }}
                  className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chamar Agente
                </Button>
                <Button
                  onClick={() => setShowImageDialog(true)}
                  className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gerar Imagem
                </Button>
                <Button
                  onClick={() => setShowChartDialog(true)}
                  className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Gerar Gráfico
                </Button>
                <Button
                  onClick={savePresentation}
                  className="bg-[#F5C6E3] hover:bg-[#E0B0CF] text-slate-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </div>
          </div>

          {/* Slide Editor */}
          <div className="flex-1 p-8 overflow-y-auto w-full">
            <div className="w-full p-8 bg-white border border-slate-200 rounded-lg">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Título do Slide
                  </label>
                  <Input
                    value={currentSlide?.title || ""}
                    onChange={(e) => updateSlide("title", e.target.value)}
                    className="text-2xl font-bold border-slate-300"
                    placeholder="Título do slide"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Conteúdo Visual
                  </label>
                  <SlideCanvasEditor
                    initialData={currentSlide?.canvasData}
                    onUpdate={(canvasData) => updateSlide("canvasData", canvasData)}
                    onAddChart={() => setShowChartDialog(true)}
                    slideText={currentSlide?.content}
                    slideImage={currentSlide?.imageUrl}
                    slideChart={currentSlide?.chartData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            {/* Agent Profile Image */}
            {selectedAgentId && agents.find(a => a.id === selectedAgentId) && (
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={agents.find(a => a.id === selectedAgentId)?.agent_image || "/placeholder.svg"}
                    alt="Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            )}
            
            {/* Pensando text */}
            <h2 className="text-5xl font-bold text-white tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Pensando
            </h2>
            
            {/* Animated dots */}
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full bg-white animate-bounce"
                style={{ animationDelay: '0ms', animationDuration: '1s' }}
              ></div>
              <div 
                className="w-4 h-4 rounded-full bg-white animate-bounce"
                style={{ animationDelay: '150ms', animationDuration: '1s' }}
              ></div>
              <div 
                className="w-4 h-4 rounded-full bg-white animate-bounce"
                style={{ animationDelay: '300ms', animationDuration: '1s' }}
              ></div>
            </div>
            
            <p className="text-white text-lg mt-4 opacity-80">Gerando slides, imagens e gráficos...</p>
          </div>
        </div>
      )}
    </div>
  );
}
