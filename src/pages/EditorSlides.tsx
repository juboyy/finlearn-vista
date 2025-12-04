import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import {
  Plus,
  Trash2,
  Settings,
  MessageSquare,
  Save,
  Sparkles,
  XCircle,
  ChevronLeft,
} from "lucide-react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { PresentationPreviewModal } from "@/components/Dashboard/PresentationPreviewModal";

interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  chartData?: any;
  canvasData?: any;
}

export default function EditorSlides() {
  const { agents } = useUserAgents();
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    description: "",
    targetAudience: "",
  });
  const [showInfoDialog, setShowInfoDialog] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showSlidePreview, setShowSlidePreview] = useState(false);
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
    if (!selectedAgentId) {
      toast.error("Selecione um agente de IA");
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
        ? `\n\nAgente selecionado: ${selectedAgent.agent_name}\nEspecialidade: ${selectedAgent.agent_category}\nDescrição: ${selectedAgent.agent_description}`
        : "";

      const { data, error } = await supabase.functions.invoke("generate-slides-content", {
        body: {
          prompt: `VOCÊ DEVE GERAR EXATAMENTE 10 SLIDES COMPLETOS COM TÍTULO E TEXTO.

Tema: ${projectInfo.title}
Descrição: ${projectInfo.description}
Público-alvo: ${projectInfo.targetAudience}
Contexto: Mercado financeiro brasileiro${agentContext}

ESTRUTURA OBRIGATÓRIA - CRIE TODOS ESTES 10 SLIDES COM CONTEÚDO COMPLETO:

1. SLIDE 1 - Introdução: Título impactante + texto apresentando o tema e sua relevância (3-4 parágrafos)
2. SLIDE 2 - Fundamentos Parte 1: Título claro + texto explicando conceitos básicos essenciais (3-4 parágrafos)
3. SLIDE 3 - Fundamentos Parte 2: Título técnico + texto sobre aspectos técnicos importantes (3-4 parágrafos)
4. SLIDE 4 - Dados de Mercado: Título com dados + texto apresentando estatísticas atuais (3-4 parágrafos)
5. SLIDE 5 - Análise de Tendências: Título analítico + texto sobre comportamentos recentes (3-4 parágrafos)
6. SLIDE 6 - Projeções: Título prospectivo + texto com perspectivas futuras (3-4 parágrafos)
7. SLIDE 7 - Casos Práticos: Título prático + texto com exemplos reais detalhados (3-4 parágrafos)
8. SLIDE 8 - Mercado Brasileiro: Título local + texto sobre particularidades nacionais (3-4 parágrafos)
9. SLIDE 9 - Inovações: Título inovador + texto sobre tecnologias emergentes (3-4 parágrafos)
10. SLIDE 10 - Conclusão: Título conclusivo + texto sintetizando e indicando próximos passos (3-4 parágrafos)

IMPORTANTE: 
- Cada slide DEVE ter um TÍTULO único e específico
- Cada slide DEVE ter um TEXTO completo de 3-4 parágrafos
- O texto deve ser detalhado, informativo e profissional
- Use linguagem do mercado financeiro brasileiro

Retorne EXATAMENTE este JSON com 10 slides:
{
  "slides": [
    {
      "title": "Título específico e impactante do slide 1",
      "content": "Texto completo do slide 1 com 3-4 parágrafos detalhados explicando o tema, contexto e relevância. Cada parágrafo deve ter pelo menos 3-4 frases completas com informações relevantes e específicas sobre o tópico.",
      "imagePrompt": "Prompt detalhado para imagem no estilo ilustração sketch/desenho com cores pastel claras, traços limpos, representando o conceito principal do slide",
      "chartType": "bar",
      "chartPrompt": "Dados específicos e relevantes para o gráfico com valores reais do mercado (bar, line, area, scatter, pie ou donut)"
    },
    ... REPITA PARA TODOS OS 10 SLIDES COM CONTEÚDO ÚNICO ...
  ]
}

ATENÇÃO: 
- Se você retornar menos de 10 slides, sua resposta será REJEITADA
- Cada slide DEVE ter título E texto completo
- O texto de cada slide DEVE ter no mínimo 250 palavras`,
        },
      });

      if (error) throw error;

      if (data?.generatedText) {
        let cleanedText = data.generatedText.trim();
        cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        
        const slidesData = JSON.parse(cleanedText);
        
        if (!slidesData.slides || !Array.isArray(slidesData.slides) || slidesData.slides.length < 10) {
          throw new Error(`A IA gerou apenas ${slidesData.slides?.length || 0} slides. São necessários 10 slides.`);
        }

        const totalSlides = slidesData.slides.length;
        setGenerationProgress({ current: 0, total: totalSlides });
        toast.info(`Gerando ${totalSlides} slides...`);
        
        const generatedSlides: Slide[] = [];
        
        for (let index = 0; index < slidesData.slides.length; index++) {
          const slide = slidesData.slides[index];
          setGenerationProgress({ current: index + 1, total: totalSlides });

          let imageUrl: string | undefined;
          let chartData: any | undefined;

          if (slide.imagePrompt) {
            try {
              const { data: imageData } = await supabase.functions.invoke("generate-slides-content", {
                body: {
                  type: "image",
                  prompt: `${slide.imagePrompt}. ESTILO: Ilustração minimalista, cores pastel claras, traços limpos, estilo flat design, fundo limpo.`,
                },
              });
              if (imageData?.imageUrl) {
                imageUrl = imageData.imageUrl;
              }
            } catch (err) {
              console.error(`Erro ao gerar imagem para slide ${index + 1}:`, err);
            }
          }

          if (slide.chartPrompt && slide.chartType) {
            try {
              const { data: chartDataResponse } = await supabase.functions.invoke("generate-slides-content", {
                body: {
                   prompt: `Baseado em: "${slide.chartPrompt}", gere dados para gráfico ${slide.chartType}.

Retorne JSON:
{
  "type": "${slide.chartType}",
  "title": "Título do gráfico",
  "data": [
    { "name": "Label 1", "value": 123, "color": "hsl(206, 70%, 60%)" },
    { "name": "Label 2", "value": 456, "color": "hsl(226, 70%, 60%)" },
    { "name": "Label 3", "value": 789, "color": "hsl(246, 70%, 60%)" }
  ]
}

TIPOS DE GRÁFICOS DISPONÍVEIS:
- bar: Gráfico de barras verticais
- line: Gráfico de linhas com pontos conectados
- area: Gráfico de área preenchida sob a linha
- scatter: Gráfico de dispersão com pontos individuais
- pie: Gráfico de pizza circular
- donut: Gráfico de rosca (pizza com buraco central)

IMPORTANTE: 
- Escolha o tipo de gráfico mais adequado aos dados
- Inclua cores HSL diferentes para cada item
- Gere pelo menos 4 pontos de dados`,
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

          generatedSlides.push({
            id: `slide-${Date.now()}-${index}`,
            title: slide.title,
            content: slide.content,
            imageUrl,
            chartData,
          });
        }
        
        setSlides(generatedSlides);
        setCurrentSlideIndex(0);
        setGenerationProgress({ current: 0, total: 0 });
        toast.success(`✅ ${generatedSlides.length} slides gerados!`);
      }
    } catch (error: any) {
      console.error("Error generating slides:", error);
      toast.error(error.message || "Erro ao gerar slides");
    } finally {
      setIsGenerating(false);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: `Slide ${slides.length + 1}`,
      content: "",
    };
    const newSlides = [...slides, newSlide];
    setSlides(newSlides);
    setCurrentSlideIndex(newSlides.length - 1);
    toast.success("Novo slide adicionado");
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
    toast.success("Slide removido");
  };

  const updateSlide = useCallback((slideId: string, field: keyof Slide, value: any) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      const slideIndex = newSlides.findIndex(s => s.id === slideId);
      
      if (slideIndex !== -1) {
        newSlides[slideIndex] = {
          ...newSlides[slideIndex],
          [field]: value,
        };
        console.log(`✅ Slide ${slideId} - Campo ${field} salvo automaticamente`);
      } else {
        console.error(`❌ Slide ${slideId} não encontrado para atualizar ${field}`);
      }
      return newSlides;
    });
  }, []);

  const clearAllSlides = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: "Slide 1",
      content: ""
    };
    setSlides([newSlide]);
    setCurrentSlideIndex(0);
    setShowClearDialog(false);
    toast.success("Todos os slides foram removidos");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSlides((items) => {
        const validItems = items.filter(item => item && item.id);
        const oldIndex = validItems.findIndex((item) => item.id === active.id);
        const newIndex = validItems.findIndex((item) => item.id === over.id);
        
        if (oldIndex === -1 || newIndex === -1) return items;
        
        const newSlides = arrayMove(validItems, oldIndex, newIndex);
        
        if (currentSlideIndex === oldIndex) {
          setCurrentSlideIndex(newIndex);
        } else if (currentSlideIndex > oldIndex && currentSlideIndex <= newIndex) {
          setCurrentSlideIndex(currentSlideIndex - 1);
        } else if (currentSlideIndex < oldIndex && currentSlideIndex >= newIndex) {
          setCurrentSlideIndex(currentSlideIndex + 1);
        }
        
        return newSlides;
      });
      
      toast.success("Slides reordenados");
    }
  };

  const savePresentation = async () => {
    try {
      const { data, error } = await supabase
        .from("presentations")
        .insert({
          title: projectInfo.title,
          slides: slides as any,
          is_paid: presentationSettings.isPaid,
          price: presentationSettings.isPaid ? parseFloat(presentationSettings.price) : null,
          payment_methods: presentationSettings.isPaid ? presentationSettings.paymentMethods : null,
        });

      if (error) throw error;
      toast.success("Apresentação salva com sucesso!");
    } catch (error: any) {
      console.error("Error saving presentation:", error);
      toast.error("Erro ao salvar apresentação");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 w-full overflow-hidden">
      <SidebarFix />

      {/* Agent Chat Sheet */}
      <Sheet open={showAgentChat} onOpenChange={setShowAgentChat}>
        <SheetContent side="right" className="w-[500px] sm:w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Chat com Agente de IA</SheetTitle>
          </SheetHeader>
          {selectedAgentId && agents.find(a => a.id === selectedAgentId) && (
            <AgentChat 
              agentName={agents.find(a => a.id === selectedAgentId)!.agent_name}
              agentImage={agents.find(a => a.id === selectedAgentId)!.agent_image}
              onClose={() => setShowAgentChat(false)}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Settings Sheet */}
      <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
        <SheetContent side="right" className="w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Configurações da Apresentação</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label>Resumo</Label>
              <Textarea
                value={presentationSettings.summary}
                onChange={(e) =>
                  setPresentationSettings({ ...presentationSettings, summary: e.target.value })
                }
                placeholder="Breve resumo da apresentação"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="paid-toggle">Apresentação Paga</Label>
              <Switch
                id="paid-toggle"
                checked={presentationSettings.isPaid}
                onCheckedChange={(checked) =>
                  setPresentationSettings({ ...presentationSettings, isPaid: checked })
                }
              />
            </div>

            {presentationSettings.isPaid && (
              <>
                <div className="space-y-2">
                  <Label>Preço (R$)</Label>
                  <Input
                    type="number"
                    value={presentationSettings.price}
                    onChange={(e) =>
                      setPresentationSettings({ ...presentationSettings, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Métodos de Pagamento</Label>
                  <div className="space-y-2">
                    {["Pix", "Cartão de Crédito", "Boleto"].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={method}
                          checked={presentationSettings.paymentMethods.includes(method)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setPresentationSettings({
                                ...presentationSettings,
                                paymentMethods: [...presentationSettings.paymentMethods, method],
                              });
                            } else {
                              setPresentationSettings({
                                ...presentationSettings,
                                paymentMethods: presentationSettings.paymentMethods.filter((m) => m !== method),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={method}>{method}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button onClick={savePresentation} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Salvar Apresentação
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Initial Info Sheet */}
      <Sheet open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <SheetContent side="right" className="w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Nova Apresentação de Slides</SheetTitle>
            <p className="text-sm text-slate-500">
              Preencha as informações abaixo para gerar sua apresentação com IA
            </p>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Selecione o Agente de IA</Label>
              <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um agente especializado" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={agent.agent_image}
                          alt={agent.agent_name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{agent.agent_name}</div>
                          <div className="text-xs text-slate-500">{agent.agent_category}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Título da Apresentação</Label>
              <Input
                value={projectInfo.title}
                onChange={(e) =>
                  setProjectInfo({ ...projectInfo, title: e.target.value })
                }
                placeholder="Ex: Cenário de IPOs no Brasil 2026"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição do Tema</Label>
              <Textarea
                value={projectInfo.description}
                onChange={(e) =>
                  setProjectInfo({ ...projectInfo, description: e.target.value })
                }
                placeholder="Descreva o tema da apresentação em detalhes..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Público-alvo</Label>
              <Input
                value={projectInfo.targetAudience}
                onChange={(e) =>
                  setProjectInfo({ ...projectInfo, targetAudience: e.target.value })
                }
                placeholder="Ex: C-levels de empresas financeiras"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleInfoSubmit} className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Apresentação com IA
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Clear All Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limpar Todos os Slides?</DialogTitle>
            <DialogDescription>
              Esta ação removerá todos os slides. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowClearDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={clearAllSlides}
              className="bg-slate-700 hover:bg-white text-white hover:text-slate-700 border hover:border-slate-700"
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
                className="border-slate-300 text-slate-600 hover:text-red-600"
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
              items={slides.filter(s => s && s.id).map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {slides.filter(s => s && s.id).map((slide, index) => (
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
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/aprendizado')}
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-semibold text-slate-800">
                  {projectInfo.title || "Nova Apresentação"}
                </h1>
              </div>
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
                      toast.error("Selecione um agente primeiro");
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
            {currentSlide ? (
              <div className="w-full p-8 bg-white border border-slate-200 rounded-lg">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Título do Slide
                    </label>
                    <Input
                      value={currentSlide.title || ""}
                      onChange={(e) => updateSlide(currentSlide.id, "title", e.target.value)}
                      className="text-2xl font-bold border-slate-300"
                      placeholder="Título do slide"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Conteúdo Visual
                    </label>
                    <SlideCanvasEditor
                      key={currentSlide.id}
                      initialData={currentSlide.canvasData}
                      onUpdate={(canvasData) => updateSlide(currentSlide.id, "canvasData", canvasData)}
                      slideText={currentSlide.content}
                      slideImage={currentSlide.imageUrl}
                      slideChart={currentSlide.chartData}
                      slideId={currentSlide.id}
                      onViewSlide={() => setShowSlidePreview(true)}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">Nenhum slide selecionado</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            {selectedAgentId && agents.find(a => a.id === selectedAgentId) && (
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={agents.find(a => a.id === selectedAgentId)?.agent_image}
                    alt="Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            )}
            
            <h2 className="text-5xl font-bold text-white tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Pensando
            </h2>
            
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
              <div className="w-4 h-4 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></div>
              <div className="w-4 h-4 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></div>
            </div>
            
            {generationProgress.total > 0 ? (
              <div className="text-white text-xl mt-6 font-semibold">
                <p>Gerando slide {generationProgress.current} de {generationProgress.total}</p>
                <div className="w-64 h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-white text-lg mt-4 opacity-80">Gerando slides...</p>
            )}
          </div>
        </div>
      )}
      
      {/* Presentation Preview Modal */}
      <PresentationPreviewModal
        isOpen={showSlidePreview}
        onClose={() => setShowSlidePreview(false)}
        title={projectInfo.title || "Apresentação"}
        slides={slides.map((slide, index) => ({
          id: index,
          content: slide.title || `Slide ${index + 1}`,
          image: slide.imageUrl,
          canvasData: slide.canvasData,
        }))}
      />
    </div>
  );
}
