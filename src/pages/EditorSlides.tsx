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
} from "@/components/ui/dialog";

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
          prompt: `Gere dados para um gráfico sobre: ${chartPrompt}. 
Retorne um JSON com: type (bar/line/pie), labels (array), datasets (array de objetos com label e data).
Contexto: Mercado financeiro brasileiro.`,
        },
      });

      if (error) throw error;

      if (data?.generatedText) {
        const chartData = JSON.parse(data.generatedText);
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

  return (
    <div className="flex h-screen bg-slate-50 w-full">
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

      {/* Main Content */}
      <div className="flex-1 flex ml-64 w-full">
        {/* Slides Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 p-4 overflow-y-auto flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Slides</h2>
            <Button
              onClick={addSlide}
              size="sm"
              className="bg-[#C5E8D4] hover:bg-[#B0D4C0] text-slate-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <Card
                key={slide.id}
                className={`p-3 cursor-pointer transition ${
                  index === currentSlideIndex
                    ? "bg-[#E8D4C5] border-[#C9B88C]"
                    : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setCurrentSlideIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {slide.title}
                    </p>
                    <p className="text-xs text-slate-500">Slide {index + 1}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlide(slide.id);
                    }}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">
                      Conteúdo
                    </label>
                    <Button
                      onClick={async () => {
                        if (!currentSlide?.title) {
                          toast.error("Adicione um título primeiro");
                          return;
                        }
                        setIsGenerating(true);
                        try {
                          const { data, error } = await supabase.functions.invoke("generate-slides-content", {
                            body: {
                              prompt: `Crie conteúdo detalhado para um slide sobre: "${currentSlide.title}"

Contexto da apresentação: ${projectInfo.title}
Descrição: ${projectInfo.description}

IMPORTANTE:
- Crie conteúdo COMPLETO e DETALHADO
- Use bullet points (•) quando apropriado
- Inclua dados, estatísticas e exemplos do mercado financeiro brasileiro
- Estruture em parágrafos claros quando necessário

Retorne apenas o texto do conteúdo, sem JSON, sem formatação markdown.`,
                            },
                          });

                          if (error) throw error;

                          if (data?.generatedText) {
                            updateSlide("content", data.generatedText.trim());
                            toast.success("Conteúdo gerado com sucesso");
                          }
                        } catch (error) {
                          console.error("Error generating content:", error);
                          toast.error("Erro ao gerar conteúdo");
                        } finally {
                          setIsGenerating(false);
                        }
                      }}
                      disabled={isGenerating}
                      size="sm"
                      className="bg-[#7FA8C9] hover:bg-[#6B91B3] text-white"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGenerating ? "Gerando..." : "Gerar com IA"}
                    </Button>
                  </div>
                  <Textarea
                    value={currentSlide?.content || ""}
                    onChange={(e) => updateSlide("content", e.target.value)}
                    className="min-h-[400px] border-slate-300 font-normal text-base leading-relaxed"
                    placeholder="Digite o conteúdo do slide ou use a IA para gerar..."
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Dica: Use bullet points (•) ou parágrafos para estruturar o conteúdo
                  </p>
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
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Gráfico
                    </label>
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-center h-64">
                        <BarChart3 className="w-16 h-16 text-slate-400" />
                        <p className="ml-4 text-slate-600">
                          Gráfico: {currentSlide.chartData.type}
                        </p>
                      </div>
                    </div>
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
