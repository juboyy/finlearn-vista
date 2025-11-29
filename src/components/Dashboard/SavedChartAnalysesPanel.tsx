import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, BarChart3, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSavedChartAnalyses, SavedChartAnalysis } from "@/hooks/useSavedChartAnalyses";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

interface SavedChartAnalysesPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SavedChartAnalysesPanel = ({ open, onOpenChange }: SavedChartAnalysesPanelProps) => {
  const { analyses, isLoading, deleteAnalysis } = useSavedChartAnalyses();

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta análise?")) {
      await deleteAnalysis(id);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Histórico de Análises
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)] mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm text-muted-foreground">Carregando análises...</p>
              </div>
            </div>
          ) : analyses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhuma análise salva
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Quando você salvar análises de gráficos, elas aparecerão aqui para referência futura.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {analyses.map((analysis) => (
                <AnalysisCard
                  key={analysis.id}
                  analysis={analysis}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

interface AnalysisCardProps {
  analysis: SavedChartAnalysis;
  onDelete: (id: string) => void;
}

const AnalysisCard = ({ analysis, onDelete }: AnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border-2 border-slate-700 rounded-xl p-4 space-y-3 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-primary flex-shrink-0" />
            <h3 className="font-semibold text-foreground text-sm truncate">{analysis.chart_title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">
              {format(new Date(analysis.created_at), "dd/MM/yy HH:mm", { locale: ptBR })}
            </span>
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {analysis.metric_type}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(analysis.id)}
          className="hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Selection Area - only when expanded */}
      {isExpanded && analysis.selection_area && (
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 animate-fade-in">
          <span className="font-medium">Área selecionada:</span> {analysis.selection_area}
        </div>
      )}

      {/* Analysis Content - only when expanded */}
      {isExpanded && (
        <div className="prose prose-sm max-w-none animate-fade-in">
          <div className="text-sm text-foreground bg-background/50 rounded-lg p-3 border border-border">
            <ReactMarkdown>{analysis.analysis_content}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Ver mais / Ver menos button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full gap-2 hover:bg-primary/10 hover:text-primary transition-all"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="h-4 w-4" />
            Ver menos
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" />
            Ver mais
          </>
        )}
      </Button>
    </div>
  );
};
