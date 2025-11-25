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
} from "lucide-react";
import { Card } from "@/components/ui/card";
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

interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  chartData?: any;
}

export default function EditorSlides() {
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    description: "",
    targetAudience: "",
  });
  const [selectedAgent, setSelectedAgent] = useState("");
  const [specificAgent, setSpecificAgent] = useState("");
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

  const agentTypes = [
    { id: "analise", name: "Análise", icon: "📊", color: "bg-[#B8D4E8]", description: "Relatórios e análises de mercado" },
    { id: "compliance", name: "Compliance", icon: "⚖️", color: "bg-[#C5E8D4]", description: "Documentos regulatórios" },
    { id: "educacional", name: "Educacional", icon: "🎓", color: "bg-[#D4C5E8]", description: "Conteúdo didático" },
    { id: "estrategia", name: "Estratégia", icon: "💡", color: "bg-[#E8E0C5]", description: "Planejamento e insights" },
    { id: "juridico", name: "Jurídico", icon: "📄", color: "bg-[#E8C5D8]", description: "Documentos legais" },
    { id: "comunicacao", name: "Comunicação", icon: "💬", color: "bg-[#E8D4C5]", description: "Relatórios executivos" }
  ];

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
      const { data, error } = await supabase.functions.invoke("generate-slides-content", {
        body: {
          prompt: `Crie uma apresentação completa e detalhada sobre: ${projectInfo.title}. 
Descrição: ${projectInfo.description}. 
Público-alvo: ${projectInfo.targetAudience}.
Contexto: Mercado financeiro brasileiro.

INSTRUÇÕES CRÍTICAS:
- OBRIGATÓRIO: Crie NO MÍNIMO 10 slides SEPARADOS
- Cada slide deve abordar UM aspecto específico do tema
- DIVIDA o conteúdo em múltiplos slides - NÃO coloque tudo em um único slide
- Cada slide deve ter um título claro e conteúdo COMPLETO e DETALHADO
- O conteúdo de cada slide deve ser estruturado em tópicos ou parágrafos
- Inclua dados, estatísticas e exemplos quando relevante
- Adicione insights e análises específicas do mercado financeiro
- SUGIRA automaticamente onde adicionar imagens e gráficos

Estrutura sugerida:
1. Slide de introdução/contexto
2-3. Slides sobre aspectos fundamentais
4-6. Slides com análises e dados detalhados (sugerir gráficos)
7-8. Slides com exemplos práticos e casos de uso (sugerir imagens)
9. Slide de tendências/futuro
10. Slide de conclusão/próximos passos

Retorne um JSON com MÚLTIPLOS slides neste formato exato:
{
  "slides": [
    {
      "title": "Título do Slide 1",
      "content": "Conteúdo detalhado...",
      "suggestedImagePrompt": "Descrição da imagem sugerida para este slide" (opcional),
      "suggestedChartType": "bar" ou "line" ou "pie" (opcional),
      "suggestedChartPrompt": "Descrição dos dados para o gráfico" (opcional)
    }
  ]
}

IMPORTANTE SOBRE SUGESTÕES:
- Sugira imagens para slides com conceitos visuais, exemplos práticos, casos de uso
- Sugira gráficos para slides com dados, estatísticas, comparações, tendências
- Não coloque imagens e gráficos em todos os slides - seja estratégico
- Use "suggestedImagePrompt" para descrever que tipo de imagem seria ideal
- Use "suggestedChartType" e "suggestedChartPrompt" para gráficos relevantes

LEMBRE-SE: Retorne NO MÍNIMO 10 slides diferentes, cada um focado em um aspecto específico.`,
        },
      });

      if (error) throw error;

      if (data?.generatedText) {
        // Remove markdown code blocks if present
        let cleanedText = data.generatedText.trim();
        cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        
        const slidesData = JSON.parse(cleanedText);
        
        // Validar que múltiplos slides foram gerados
        if (!slidesData.slides || slidesData.slides.length < 5) {
          throw new Error("A IA não gerou slides suficientes. Tente novamente.");
        }
        
        // Imagens padrão do sistema
        const systemImages = [
          "/src/assets/relatorio-analise-dados.png",
          "/src/assets/relatorio-bi-dashboard.png",
          "/src/assets/credito-rural-2025.png",
          "/src/assets/curso-analise-tecnica-illustration.png",
        ];
        
        const newSlides = slidesData.slides.map((slide: any, index: number) => {
          // Se a IA sugeriu uma imagem, adicionar uma imagem do sistema
          const imageUrl = slide.suggestedImagePrompt 
            ? systemImages[Math.floor(Math.random() * systemImages.length)]
            : undefined;
          
          // Se a IA sugeriu um gráfico, criar dados de placeholder
          const chartData = slide.suggestedChartType ? {
            type: slide.suggestedChartType,
            description: slide.suggestedChartPrompt || "Gráfico sugerido pela IA"
          } : undefined;
          
          return {
            id: `${index + 1}`,
            title: slide.title,
            content: slide.content,
            imageUrl,
            chartData,
          };
        });
        
        setSlides(newSlides);
        toast.success(`${newSlides.length} slides gerados com sugestões de mídia`);
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
          prompt: `Gere uma imagem sobre: ${imagePrompt}. Contexto: Mercado financeiro, gráficos, dados, análises.`,
        },
      });

      if (error) throw error;

      // Placeholder - em produção, você integraria com API de geração de imagens
      updateSlide("imageUrl", "https://placehold.co/800x450/7FA8C9/white?text=Imagem+Gerada");
      toast.success("Imagem gerada com sucesso");
      setShowImageDialog(false);
      setImagePrompt("");
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

  const savePresentation = () => {
    toast.success("Apresentação salva com sucesso");
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

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-800">
              Informações da Apresentação
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Conte-nos sobre o assunto da apresentação para que a IA possa te ajudar melhor
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
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
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">
                Escolha o tipo de agente de IA:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {agentTypes.map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedAgent === agent.id
                        ? 'border-[#7FA8C9] bg-[#7FA8C9]/10'
                        : 'border-slate-200 hover:border-[#7FA8C9]/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{agent.icon}</div>
                    <div className="text-sm font-semibold text-slate-700">{agent.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{agent.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Escolha um agente específico (opcional):
              </label>
              <select
                value={specificAgent}
                onChange={(e) => setSpecificAgent(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7FA8C9]"
              >
                <option value="">Selecione um agente...</option>
                <optgroup label="Análise de Mercado">
                  <option value="analista-acoes">📊 Analista de Ações - Especialista em renda variável</option>
                  <option value="analista-renda-fixa">📈 Analista de Renda Fixa - Títulos e bonds</option>
                  <option value="analista-macro">🌍 Analista Macroeconômico - Cenários e tendências</option>
                </optgroup>
                <optgroup label="Compliance e Regulatório">
                  <option value="compliance-cvm">⚖️ Especialista CVM - Normas e regulamentações</option>
                  <option value="compliance-bacen">🏦 Especialista BACEN - Regulação bancária</option>
                  <option value="compliance-anbima">📋 Especialista ANBIMA - Certificações e normas</option>
                </optgroup>
                <optgroup label="Educacional">
                  <option value="professor-financas">🎓 Professor de Finanças - Conceitos fundamentais</option>
                  <option value="instrutor-investimentos">💼 Instrutor de Investimentos - Produtos financeiros</option>
                  <option value="mentor-certificacoes">📚 Mentor de Certificações - Preparação para provas</option>
                </optgroup>
                <optgroup label="Estratégia">
                  <option value="estrategista-fundos">💡 Estrategista de Fundos - Gestão de carteiras</option>
                  <option value="planejador-financeiro">📊 Planejador Financeiro - Alocação de ativos</option>
                  <option value="consultor-risco">⚠️ Consultor de Risco - Gestão e mitigação</option>
                </optgroup>
                <optgroup label="Jurídico">
                  <option value="advogado-mercado-capitais">⚖️ Advogado Mercado de Capitais - Operações estruturadas</option>
                  <option value="especialista-contratos">📄 Especialista em Contratos - Documentação legal</option>
                </optgroup>
                <optgroup label="Comunicação">
                  <option value="redator-relatorios">✍️ Redator de Relatórios - Comunicação executiva</option>
                  <option value="analista-ri">📢 Analista de RI - Relações com investidores</option>
                </optgroup>
              </select>
              <p className="text-xs text-slate-500 mt-2">
                Ao selecionar um agente específico, o conteúdo será personalizado com a expertise dele
              </p>
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
              className="bg-red-500 hover:bg-red-600 text-white"
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
                  onClick={() => setShowImageDialog(true)}
                  className="bg-[#A68CC9] hover:bg-[#8F7AB3] text-white"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gerar Imagem
                </Button>
                <Button
                  onClick={() => setShowChartDialog(true)}
                  className="bg-[#8CC99B] hover:bg-[#7AB389] text-white"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Gerar Gráfico
                </Button>
                <Button
                  onClick={savePresentation}
                  className="bg-[#7FA8C9] hover:bg-[#6B91B3] text-white"
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
                    Conteúdo
                  </label>
                  <Textarea
                    value={currentSlide?.content || ""}
                    onChange={(e) => updateSlide("content", e.target.value)}
                    className="min-h-[400px] border-slate-300 font-normal text-base leading-relaxed"
                    placeholder="Digite o conteúdo do slide..."
                  />
                </div>

                {currentSlide?.imageUrl && (
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Imagem
                    </label>
                    <div className="relative">
                      <img
                        src={currentSlide.imageUrl}
                        alt="Slide"
                        className="w-full rounded-lg border border-slate-200"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateSlide("imageUrl", undefined)}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                )}

                {currentSlide?.chartData && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">
                        Gráfico
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateSlide("chartData", undefined)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <SlideChart
                      type={currentSlide.chartData.type}
                      data={currentSlide.chartData.data}
                      title={currentSlide.chartData.title}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
