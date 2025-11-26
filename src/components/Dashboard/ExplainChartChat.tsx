import { useState } from "react";
import { X, Loader2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ExplainChartChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chartData: any[];
  chartType?: string;
}

export const ExplainChartChat = ({ open, onOpenChange, chartData, chartType }: ExplainChartChatProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<{
    summary: string;
    representation: string;
    attention_points: string[];
    recommendations: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleExplainChart = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('explain-chart', {
        body: { chartData, chartType }
      });
      
      if (error) throw error;
      
      setExplanation({
        summary: data.summary,
        representation: data.representation,
        attention_points: data.attention_points,
        recommendations: data.recommendations,
      });
    } catch (error) {
      console.error("Error explaining chart:", error);
      toast({
        title: "Erro ao explicar gráfico",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="border-b border-border p-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="text-foreground" size={24} />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-xl font-semibold text-foreground">
                  Explicação do Gráfico
                </SheetTitle>
                <p className="text-sm text-muted-foreground">Análise detalhada dos dados</p>
              </div>
              <Button
                onClick={() => onOpenChange(false)}
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
              >
                <X size={20} />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 p-6">
            {!explanation && !isLoading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 size={32} className="text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Entenda seus dados
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Clique no botão abaixo para gerar uma análise detalhada do gráfico
                </p>
                <Button
                  onClick={handleExplainChart}
                  className="bg-pastel-purple hover:bg-pastel-pink text-foreground"
                >
                  <BarChart3 className="mr-2" size={18} />
                  Explicar Gráfico
                </Button>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <Loader2 className="animate-spin mx-auto mb-4 text-pastel-purple" size={48} />
                <p className="text-sm text-muted-foreground">
                  Analisando seus dados...
                </p>
              </div>
            )}

            {explanation && !isLoading && (
              <div className="space-y-6">
                <div className="bg-pastel-blue/20 border border-pastel-blue/30 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BarChart3 size={16} />
                    Resumo
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {explanation.summary}
                  </p>
                </div>

                <div className="bg-pastel-purple/20 border border-pastel-purple/30 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Representação dos Dados
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {explanation.representation}
                  </p>
                </div>

                <div className="bg-pastel-yellow/20 border border-pastel-yellow/30 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Pontos de Atenção
                  </h3>
                  <ul className="space-y-2">
                    {explanation.attention_points.map((point, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-pastel-yellow rounded-full mt-1.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-pastel-green/20 border border-pastel-green/30 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Recomendações
                  </h3>
                  <ul className="space-y-2">
                    {explanation.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-pastel-green rounded-full mt-1.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={handleExplainChart}
                  variant="outline"
                  className="w-full"
                >
                  Gerar Nova Análise
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
