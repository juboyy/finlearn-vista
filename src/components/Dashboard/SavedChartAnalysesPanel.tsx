import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, BarChart3, FileText, ChevronDown, ChevronUp, Copy, Download } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSavedChartAnalyses, SavedChartAnalysis } from "@/hooks/useSavedChartAnalyses";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

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
  const { toast } = useToast();

  const handleCopy = () => {
    const textToCopy = `${analysis.chart_title}\n\nTipo de Métrica: ${analysis.metric_type}\n\n${analysis.selection_area ? `Área Selecionada: ${analysis.selection_area}\n\n` : ''}${analysis.analysis_content}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Análise copiada",
        description: "O conteúdo foi copiado para a área de transferência",
      });
    });
  };

  const handleExportPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Título do documento
      pdf.setFontSize(20);
      pdf.setTextColor(71, 85, 105); // slate-600
      pdf.text("Análise de Gráfico", margin, yPosition);
      yPosition += 15;

      // Linha separadora
      pdf.setDrawColor(203, 213, 225); // slate-300
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // Metadados
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139); // slate-500
      pdf.text(`Data: ${format(new Date(analysis.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, margin, yPosition);
      yPosition += 7;
      pdf.text(`Tipo de Métrica: ${analysis.metric_type}`, margin, yPosition);
      yPosition += 12;

      // Título da análise
      pdf.setFontSize(16);
      pdf.setTextColor(30, 41, 59); // slate-800
      const titleLines = pdf.splitTextToSize(analysis.chart_title, maxWidth);
      pdf.text(titleLines, margin, yPosition);
      yPosition += (titleLines.length * 8) + 10;

      // Área selecionada (se houver)
      if (analysis.selection_area) {
        pdf.setFontSize(11);
        pdf.setTextColor(71, 85, 105);
        pdf.text("Área Selecionada:", margin, yPosition);
        yPosition += 7;
        pdf.setFontSize(10);
        pdf.setTextColor(100, 116, 139);
        const areaLines = pdf.splitTextToSize(analysis.selection_area, maxWidth);
        pdf.text(areaLines, margin, yPosition);
        yPosition += (areaLines.length * 6) + 10;
      }

      // Conteúdo da análise
      pdf.setFontSize(11);
      pdf.setTextColor(71, 85, 105);
      pdf.text("Análise:", margin, yPosition);
      yPosition += 7;

      // Processar o conteúdo markdown para texto simples
      const cleanContent = analysis.analysis_content
        .replace(/#{1,6}\s/g, '') // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Remove links

      pdf.setFontSize(10);
      pdf.setTextColor(30, 41, 59);
      const contentLines = pdf.splitTextToSize(cleanContent, maxWidth);
      
      // Adicionar conteúdo com paginação
      contentLines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 6;
      });

      // Rodapé
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184); // slate-400
        pdf.text(
          `Página ${i} de ${totalPages} | Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }

      // Salvar PDF
      const fileName = `analise-${analysis.metric_type.toLowerCase().replace(/\s/g, '-')}-${format(new Date(analysis.created_at), 'dd-MM-yyyy')}.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF exportado com sucesso",
        description: `O arquivo ${fileName} foi baixado`,
      });
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      toast({
        title: "Erro ao exportar PDF",
        description: "Ocorreu um erro ao gerar o arquivo PDF",
        variant: "destructive",
      });
    }
  };

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
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExportPDF}
            className="hover:bg-green-500/10 hover:text-green-600"
            title="Exportar PDF"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-primary/10 hover:text-primary"
            title="Copiar análise"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(analysis.id)}
            className="hover:bg-destructive/10 hover:text-destructive"
            title="Excluir análise"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
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
