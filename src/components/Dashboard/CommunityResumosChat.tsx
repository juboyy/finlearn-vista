import { useState } from "react";
import { X, Loader2, MessagesSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";
import auxiliarDodia from "@/assets/auxiliar-do-dia-avatar.png";

interface CommunityResumosChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommunityResumosChat = ({ open, onOpenChange }: CommunityResumosChatProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [summary, setSummary] = useState<string>("");

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    try {
      // Simulate AI response for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSummaries: Record<string, string> = {
        todas: `# Resumo Geral das Discussões

**Principais Tópicos em Destaque:**

- **Análise de Mercado**: Discussões sobre volatilidade e interpretação de indicadores macroeconômicos dominam as conversas, com 24 respostas ativas.

- **Investimentos**: Estratégias de diversificação para 2025 são altamente debatidas, especialmente considerando o cenário econômico atual.

- **Compliance & Regulação**: Novidades sobre Pix e Open Finance geram grande engajamento da comunidade.

**Tendências Identificadas:**

Os membros estão focados em adaptar suas estratégias ao cenário de incerteza econômica, buscando metodologias mais robustas de análise e diversificação.`,
        
        "analise-mercado": `# Resumo: Análise de Mercado

**Discussões Mais Relevantes:**

1. "Como interpretar indicadores macroeconômicos em cenário de alta volatilidade?"
   - 24 respostas | 312 visualizações
   - Principais insights: Uso de médias móveis e análise comparativa de períodos históricos similares

**Consensos da Comunidade:**

A metodologia híbrida (combinando análise técnica e fundamentalista) está sendo amplamente recomendada para períodos de incerteza.`,
        
        investimentos: `# Resumo: Investimentos

**Destaques:**

- Estratégias de diversificação são o tema central
- Discussões sobre alocação em renda variável vs renda fixa
- Análise de setores resilientes para 2025

**Recomendações Populares:**

Manter 30-40% em ativos defensivos e aumentar exposição gradual conforme o mercado se estabiliza.`,
        
        "compliance-regulacao": `# Resumo: Compliance & Regulação

**Tópicos Quentes:**

- Impactos das mudanças regulatórias no Pix
- Preparação para Open Finance 2.0
- Adequação às novas normas do Banco Central

**Ações Recomendadas:**

Revisão de processos internos e treinamento de equipes para as novas exigências regulatórias.`,
        
        carreira: `# Resumo: Carreira & Networking

**Discussões Principais:**

- Transição de carreira no mercado financeiro
- Certificações mais valorizadas em 2025
- Networking estratégico no setor

**Insights da Comunidade:**

Certificações CFA e CPA-20 continuam sendo as mais demandadas, enquanto habilidades em análise de dados ganham relevância.`
      };
      
      setSummary(mockSummaries[selectedCategory] || mockSummaries.todas);
    } catch (error) {
      console.error("Error generating summary:", error);
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
              <Avatar className="w-12 h-12 flex-shrink-0">
                <AvatarImage src={auxiliarDodia} alt="Assistente de Resumos" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <SheetTitle className="text-xl font-semibold text-foreground">
                  Resumos da Comunidade
                </SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Assistente especializado em sínteses
                </p>
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
            {!summary && !isLoading && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-pastel-blue/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={32} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Resumos Inteligentes
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Selecione uma categoria ou escolha "Todas" para um resumo geral das discussões
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tipo de Discussão
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas as Discussões</SelectItem>
                        <SelectItem value="analise-mercado">Análise de Mercado</SelectItem>
                        <SelectItem value="investimentos">Investimentos</SelectItem>
                        <SelectItem value="compliance-regulacao">Compliance & Regulação</SelectItem>
                        <SelectItem value="carreira">Carreira & Networking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerateSummary}
                    className="w-full bg-pastel-blue hover:bg-pastel-pink text-foreground"
                  >
                    <MessagesSquare className="mr-2" size={18} />
                    Gerar Resumo
                  </Button>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <Loader2 className="animate-spin mx-auto mb-4 text-pastel-purple" size={48} />
                <p className="text-sm text-muted-foreground">
                  Analisando discussões...
                </p>
              </div>
            )}

            {summary && !isLoading && (
              <div className="space-y-6">
                <div className="bg-pastel-blue/10 border border-pastel-blue/30 rounded-lg p-4">
                  <div className="prose prose-sm max-w-none text-foreground">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerateSummary}
                    variant="outline"
                    className="flex-1"
                  >
                    Atualizar Resumo
                  </Button>
                  <Button
                    onClick={() => {
                      setSummary("");
                      setSelectedCategory("todas");
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Nova Consulta
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
