import { useState, useRef, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Highlighter,
  StickyNote,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Palette,
  Trash2,
  BookMarked,
  List,
} from "lucide-react";
import { useEbookAnnotations } from "@/hooks/useEbookAnnotations";
import { cn } from "@/lib/utils";

interface EbookReaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ebookId: string;
  ebookTitle: string;
}

export const EbookReader = ({
  open,
  onOpenChange,
  ebookId,
  ebookTitle,
}: EbookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const [showAnnotationMenu, setShowAnnotationMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("#fef3c7");
  const [showSidebar, setShowSidebar] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    annotations,
    bookmarks,
    loading,
    createAnnotation,
    updateAnnotation,
    deleteAnnotation,
    createBookmark,
    deleteBookmark,
  } = useEbookAnnotations(ebookId, ebookTitle);

  // Mock content - In production, load from file/API
  const mockContent = `
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 2rem; color: hsl(var(--foreground)); line-height: 1.2;">Capítulo 1: Introdução ao Mercado Financeiro</h1>

    <p style="margin-bottom: 1.75rem; line-height: 1.8; font-size: 1.0625rem;">O mercado financeiro é um <strong>sistema complexo e dinâmico</strong> que conecta investidores, empresas e instituições financeiras. Neste capítulo, exploraremos os fundamentos essenciais para compreender como o mercado funciona e qual o papel de cada participante.</p>

    <h2 style="font-size: 1.75rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem; color: hsl(var(--foreground)); line-height: 1.3;">1.1 Conceitos Fundamentais</h2>

    <p style="margin-bottom: 1.75rem; line-height: 1.8; font-size: 1.0625rem;">O mercado financeiro pode ser dividido em <strong>diversos segmentos</strong>, cada um com suas características específicas. O <strong>mercado de capitais</strong>, por exemplo, é onde empresas captam recursos através da emissão de ações e títulos de dívida. Já o <strong>mercado monetário</strong> lida com operações de curto prazo e alta liquidez.</p>

    <p style="margin-bottom: 1.75rem; line-height: 1.8; font-size: 1.0625rem;">A <strong>eficiência do mercado</strong> é um conceito fundamental que sugere que os preços dos ativos refletem todas as informações disponíveis. Esta hipótese, proposta por <strong>Eugene Fama</strong>, tem implicações importantes para estratégias de investimento e análise de mercado.</p>

    <h2 style="font-size: 1.75rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem; color: hsl(var(--foreground)); line-height: 1.3;">1.2 Participantes do Mercado</h2>

    <p style="margin-bottom: 1.75rem; line-height: 1.8; font-size: 1.0625rem;">Os principais participantes incluem <strong>investidores institucionais</strong>, como fundos de pensão e gestoras de recursos, <strong>investidores individuais</strong> (pessoas físicas), e <strong>intermediários financeiros</strong>, como corretoras e bancos de investimento.</p>

    <p style="margin-bottom: 1.75rem; line-height: 1.8; font-size: 1.0625rem;">Cada participante tem objetivos e restrições diferentes. Investidores institucionais geralmente possuem horizontes de investimento mais longos e maior tolerância ao risco, enquanto investidores individuais podem ter objetivos mais variados.</p>

    <h2 style="font-size: 1.75rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem; color: hsl(var(--foreground)); line-height: 1.3;">1.3 Regulação e Supervisão</h2>

    <p style="margin-bottom: 1.75rem; line-height: 1.8; font-size: 1.0625rem;">A regulação do mercado financeiro é essencial para garantir sua <strong>integridade</strong> e proteger investidores. No Brasil, a <strong>CVM (Comissão de Valores Mobiliários)</strong> é o principal órgão regulador do mercado de capitais, estabelecendo regras e fiscalizando sua aplicação.</p>

    <p style="margin-bottom: 1.75rem; line-height: 1.8; font-size: 1.0625rem;">A supervisão adequada contribui para a <strong>estabilidade do sistema financeiro</strong> e para a confiança dos investidores, elementos cruciais para o desenvolvimento econômico sustentável.</p>
  `;

  const highlightColors = [
    { name: "Amarelo", color: "#fef3c7" },
    { name: "Verde", color: "#d1fae5" },
    { name: "Rosa", color: "#fce7f3" },
    { name: "Azul", color: "#dbeafe" },
    { name: "Roxo", color: "#e9d5ff" },
  ];

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const text = selection.toString();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Calculate position in content
      const preSelectionRange = range.cloneRange();
      if (contentRef.current) {
        preSelectionRange.selectNodeContents(contentRef.current);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const start = preSelectionRange.toString().length;
        const end = start + text.length;

        setSelectedText(text);
        setSelectionRange({ start, end });
        setMenuPosition({
          top: rect.top - 60,
          left: rect.left + (rect.width / 2)
        });
        setShowAnnotationMenu(true);
      }
    }
  };

  const handleHighlight = async (color: string) => {
    if (selectedText && selectionRange) {
      await createAnnotation(
        "highlight",
        selectedText,
        selectionRange.start,
        selectionRange.end,
        color,
        undefined,
        currentPage
      );
      clearSelection();
    }
  };

  const handleAddNote = () => {
    setShowNoteDialog(true);
    setShowAnnotationMenu(false);
  };

  const handleSaveNote = async () => {
    if (selectedText && selectionRange && noteContent) {
      await createAnnotation(
        "note",
        selectedText,
        selectionRange.start,
        selectionRange.end,
        selectedColor,
        noteContent,
        currentPage
      );
      setNoteContent("");
      setShowNoteDialog(false);
      clearSelection();
    }
  };

  const handleAddBookmark = async () => {
    const previewText = selectedText || mockContent.substring(0, 100);
    await createBookmark(currentPage, `Página ${currentPage}`, "Capítulo 1", previewText);
    clearSelection();
  };

  const clearSelection = () => {
    setSelectedText("");
    setSelectionRange(null);
    setShowAnnotationMenu(false);
    setMenuPosition(null);
    window.getSelection()?.removeAllRanges();
  };

  // Apply highlights to content
  const renderContentWithAnnotations = () => {
    if (annotations.length === 0) return mockContent;

    const parser = new DOMParser();
    const doc = parser.parseFromString(mockContent, 'text/html');
    const contentText = doc.body.textContent || '';
    
    const sortedAnnotations = [...annotations].sort((a, b) => b.position_start - a.position_start);

    let result = mockContent;
    
    sortedAnnotations.forEach((annotation) => {
      if (annotation.annotation_type === "highlight" && !annotation.is_deleted) {
        const textToHighlight = annotation.selected_text;
        const highlightMarkup = `<mark style="background-color: ${annotation.highlight_color}; padding: 2px 4px; border-radius: 3px;" data-annotation-id="${annotation.id}">${textToHighlight}</mark>`;
        
        // Replace first occurrence of the exact text
        const regex = new RegExp(textToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        result = result.replace(regex, highlightMarkup);
      }
    });

    return result;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-0 bg-background border-none flex"
      >
        {/* Main Reader */}
        <div className="flex-1 flex flex-col">
          <SheetHeader className="p-6 pb-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold">{ebookTitle}</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                className="hover:bg-muted"
              >
                <List size={20} />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Badge variant="outline" className="text-xs">
                Página {currentPage}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {annotations.length} anotações
              </Badge>
              <Badge variant="outline" className="text-xs">
                {bookmarks.length} marcadores
              </Badge>
            </div>
          </SheetHeader>

          {/* Reading Area */}
          <ScrollArea className="flex-1">
            <div
              ref={contentRef}
              className="p-12 max-w-4xl mx-auto text-foreground select-text"
              style={{
                fontFamily: "'Georgia', 'Merriweather', serif",
                letterSpacing: '0.01em'
              }}
              onMouseUp={handleTextSelection}
              dangerouslySetInnerHTML={{ __html: renderContentWithAnnotations() }}
            />
          </ScrollArea>

          {/* Annotation Menu Popover */}
          {showAnnotationMenu && menuPosition && (
            <div
              className="fixed z-50 bg-card border-2 border-border rounded-xl shadow-2xl p-2 flex gap-2"
              style={{
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
                transform: "translateX(-50%)",
              }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Highlighter size={16} />
                    Destacar
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                  <div className="flex gap-2">
                    {highlightColors.map((color) => (
                      <button
                        key={color.color}
                        onClick={() => handleHighlight(color.color)}
                        className="w-8 h-8 rounded-full border-2 border-border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Button size="sm" variant="ghost" className="gap-2" onClick={handleAddNote}>
                <StickyNote size={16} />
                Nota
              </Button>

              <Button size="sm" variant="ghost" className="gap-2" onClick={handleAddBookmark}>
                <Bookmark size={16} />
                Marcar
              </Button>

              <Button size="sm" variant="ghost" onClick={clearSelection}>
                ✕
              </Button>
            </div>
          )}

          {/* Note Dialog */}
          {showNoteDialog && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-card border-2 border-border rounded-xl p-6 max-w-md w-full space-y-4">
                <h3 className="text-lg font-semibold">Adicionar Nota</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    "{selectedText.substring(0, 100)}..."
                  </p>
                  <Textarea
                    placeholder="Escreva sua nota aqui..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <span className="text-sm text-muted-foreground">Cor:</span>
                    {highlightColors.map((color) => (
                      <button
                        key={color.color}
                        onClick={() => setSelectedColor(color.color)}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform",
                          selectedColor === color.color ? "border-foreground" : "border-border"
                        )}
                        style={{ backgroundColor: color.color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveNote}>Salvar Nota</Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="p-4 border-t border-border bg-card flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} className="mr-2" />
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">Página {currentPage} de 150</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(150, currentPage + 1))}
              disabled={currentPage === 150}
            >
              Próxima
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Annotations & Bookmarks Sidebar */}
        {showSidebar && (
          <div className="w-80 border-l border-border bg-card overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Annotations Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Highlighter size={16} />
                  Anotações ({annotations.length})
                </h3>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {annotations.map((annotation) => (
                      <div
                        key={annotation.id}
                        className="p-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                        style={{ borderLeftColor: annotation.highlight_color, borderLeftWidth: "4px" }}
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          Página {annotation.page_number}
                        </p>
                        <p className="text-sm font-medium mb-1">"{annotation.selected_text.substring(0, 80)}..."</p>
                        {annotation.annotation_content && (
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            {annotation.annotation_content}
                          </p>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-2 h-6 text-xs"
                          onClick={() => deleteAnnotation(annotation.id)}
                        >
                          <Trash2 size={12} className="mr-1" />
                          Excluir
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Bookmarks Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <BookMarked size={16} />
                  Marcadores ({bookmarks.length})
                </h3>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {bookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="p-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => setCurrentPage(bookmark.page_number)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {bookmark.bookmark_name || `Página ${bookmark.page_number}`}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {bookmark.preview_text?.substring(0, 60)}...
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteBookmark(bookmark.id);
                            }}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
