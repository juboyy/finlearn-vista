import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Highlighter, MessageSquare, ChevronLeft, ChevronRight, Search, X, Edit2, Trash2, Save, ArrowUpDown, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEbookAnnotations } from "@/hooks/useEbookAnnotations";
import { supabase } from "@/integrations/supabase/client";
import ebookGestaoRiscos from "@/assets/ebook-gestao-riscos.png";
import { EbookReadingAgentChat } from "@/components/Dashboard/EbookReadingAgentChat";

const LerEbook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [highlightMenuPosition, setHighlightMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState("rgba(255, 235, 59, 0.6)");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [editingAnnotationId, setEditingAnnotationId] = useState<string | null>(null);
  const [editingAnnotationContent, setEditingAnnotationContent] = useState("");
  const [editingBookmarkId, setEditingBookmarkId] = useState<string | null>(null);
  const [editingBookmarkName, setEditingBookmarkName] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "page" | "type">("date");
  const [hoveredAnnotationId, setHoveredAnnotationId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bookmarks" | "highlights" | "notes">("bookmarks");
  const [renderKey, setRenderKey] = useState(0);
  const [previewRange, setPreviewRange] = useState<Range | null>(null);
  const [highlightName, setHighlightName] = useState("");
  const [showReadingAgent, setShowReadingAgent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    annotations,
    bookmarks,
    createAnnotation,
    createBookmark,
    updateAnnotation,
    deleteAnnotation,
    deleteBookmark,
  } = useEbookAnnotations(id || "ebook-001", "Guia Completo de Gestão de Riscos");

  const totalPages = 312;

  // Mock ebook data
  const ebookData = {
    id: id || "ebook-001",
    title: "Guia Completo de Gestão de Riscos",
    coverImage: ebookGestaoRiscos,
    author: "Ricardo Almeida",
    coAuthors: ["Maria Santos", "João Silva"],
    chapters: [
      { id: 1, title: "Introdução ao Mercado Financeiro", page: 1 },
      { id: 2, title: "Tipos de Risco Financeiro", page: 15 },
      { id: 3, title: "Análise Quantitativa de Riscos", page: 45 },
      { id: 4, title: "Modelos de Precificação", page: 78 },
      { id: 5, title: "Gestão de Carteiras", page: 112 },
      { id: 6, title: "Regulação e Compliance", page: 156 },
      { id: 7, title: "Tecnologias em Gestão de Riscos", page: 198 },
      { id: 8, title: "Casos Práticos", page: 245 },
    ],
    content: `
      <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 2rem; color: hsl(var(--foreground)); line-height: 1.2;">Capítulo 1: Introdução ao Mercado Financeiro</h1>
      
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground));">
        O mercado financeiro é um sistema complexo e dinâmico que desempenha um papel fundamental na economia global. 
        Compreender seus mecanismos, participantes e instrumentos é essencial para qualquer profissional que atue 
        neste setor ou que busque tomar decisões financeiras informadas.
      </p>

      <h2 style="font-size: 1.75rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.5rem; color: hsl(var(--foreground));">1.1 Estrutura do Mercado Financeiro</h2>
      
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground));">
        O mercado financeiro pode ser dividido em diversos segmentos, cada um com características e funções específicas:
      </p>

      <ul style="margin-bottom: 1.5rem; margin-left: 2rem; line-height: 1.8; color: hsl(var(--foreground));">
        <li style="margin-bottom: 0.75rem;"><strong>Mercado Monetário:</strong> Operações de curto prazo, focadas na liquidez e no controle da oferta monetária</li>
        <li style="margin-bottom: 0.75rem;"><strong>Mercado de Crédito:</strong> Intermediação de recursos entre poupadores e tomadores de empréstimos</li>
        <li style="margin-bottom: 0.75rem;"><strong>Mercado de Capitais:</strong> Negociação de títulos e valores mobiliários de médio e longo prazo</li>
        <li style="margin-bottom: 0.75rem;"><strong>Mercado de Câmbio:</strong> Transações envolvendo moedas estrangeiras</li>
      </ul>

      <h2 style="font-size: 1.75rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.5rem; color: hsl(var(--foreground));">1.2 Participantes do Mercado</h2>
      
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground));">
        Diversos agentes atuam no mercado financeiro, cada um desempenhando papéis específicos. Entre os principais 
        participantes, destacam-se:
      </p>

      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground));">
        <strong>Instituições Financeiras:</strong> Bancos comerciais, bancos de investimento, corretoras e distribuidoras 
        de valores mobiliários atuam como intermediários, facilitando as transações e oferecendo produtos e serviços 
        financeiros aos seus clientes.
      </p>

      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground));">
        <strong>Investidores:</strong> Pessoas físicas e jurídicas que aplicam recursos em busca de retorno financeiro, 
        assumindo diferentes níveis de risco de acordo com seu perfil e objetivos.
      </p>

      <h2 style="font-size: 1.75rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.5rem; color: hsl(var(--foreground));">1.3 Instrumentos Financeiros</h2>
      
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground));">
        O mercado oferece uma ampla variedade de instrumentos financeiros, desde os mais simples até os mais complexos 
        e sofisticados. Compreender as características de cada um é fundamental para uma gestão de riscos eficaz.
      </p>

      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: hsl(var(--foreground));">
        Entre os principais instrumentos, podemos citar ações, títulos de renda fixa, derivativos (futuros, opções, 
        swaps), fundos de investimento e produtos estruturados. Cada instrumento apresenta diferentes perfis de risco 
        e retorno, adequando-se a diferentes estratégias de investimento.
      </p>
    `,
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      if (rect && range) {
        setSelectedText(text);
        setPreviewRange(range.cloneRange());
        setHighlightMenuPosition({ x: rect.left, y: rect.top - 60 });
        setShowHighlightMenu(true);
        applyPreviewHighlight(range.cloneRange(), selectedColor);
      }
    } else {
      setShowHighlightMenu(false);
      setHighlightName("");
      removePreviewHighlight();
      setPreviewRange(null);
    }
  };

  // Apply preview highlight effect
  const applyPreviewHighlight = (range: Range, color: string) => {
    removePreviewHighlight();
    
    const span = document.createElement('span');
    span.setAttribute('data-preview-highlight', 'true');
    span.style.backgroundColor = color;
    span.style.padding = '3px 2px';
    span.style.borderRadius = '3px';
    span.style.transition = 'background-color 0.2s';
    
    try {
      range.surroundContents(span);
    } catch (e) {
      // If surroundContents fails (e.g., partial element selection), use a different approach
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    }
  };

  // Remove preview highlight
  const removePreviewHighlight = () => {
    const previewElements = document.querySelectorAll('[data-preview-highlight="true"]');
    previewElements.forEach((element) => {
      const parent = element.parentNode;
      if (parent) {
        while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
        }
        parent.removeChild(element);
      }
    });
  };

  // Update preview color when color selection changes
  useEffect(() => {
    if (showHighlightMenu && previewRange) {
      applyPreviewHighlight(previewRange.cloneRange(), selectedColor);
    }
  }, [selectedColor]);

  // Cleanup preview on page change
  useEffect(() => {
    removePreviewHighlight();
    setShowHighlightMenu(false);
    setHighlightName("");
    setPreviewRange(null);
  }, [currentPage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removePreviewHighlight();
    };
  }, []);

  const handleHighlight = async () => {
    if (selectedText) {
      // Remove preview first
      removePreviewHighlight();
      
      await createAnnotation(
        "highlight",
        selectedText,
        0,
        selectedText.length,
        selectedColor,
        undefined,
        currentPage,
        undefined,
        highlightName.trim() || undefined
      );
      
      // Force re-render to show the highlight immediately
      setRenderKey(prev => prev + 1);
      setShowHighlightMenu(false);
      setShowNoteInput(false);
      setHighlightName("");
      setPreviewRange(null);
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleAddBookmarkFromSelection = () => {
    const chapter = ebookData.chapters.find(ch => ch.page <= currentPage);
    removePreviewHighlight();
    createBookmark(
      currentPage,
      undefined,
      chapter?.title,
      selectedText.substring(0, 100)
    );
    setShowHighlightMenu(false);
    setShowNoteInput(false);
    setHighlightName("");
    setPreviewRange(null);
    window.getSelection()?.removeAllRanges();
  };

  const handleAddNote = async () => {
    if (selectedText && noteContent.trim()) {
      removePreviewHighlight();
      
      await createAnnotation(
        "note",
        selectedText,
        0,
        selectedText.length,
        "#fef3c7",
        noteContent,
        currentPage
      );
      
      setShowHighlightMenu(false);
      setShowNoteInput(false);
      setNoteContent("");
      setHighlightName("");
      setPreviewRange(null);
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleShowNoteInput = () => {
    setShowNoteInput(true);
  };

  const handleStartEditAnnotation = (annotationId: string, currentContent: string) => {
    setEditingAnnotationId(annotationId);
    setEditingAnnotationContent(currentContent);
  };

  const handleSaveAnnotationEdit = async () => {
    if (editingAnnotationId && editingAnnotationContent.trim()) {
      await updateAnnotation(editingAnnotationId, {
        annotation_content: editingAnnotationContent,
      });
      setEditingAnnotationId(null);
      setEditingAnnotationContent("");
    }
  };

  const handleCancelAnnotationEdit = () => {
    setEditingAnnotationId(null);
    setEditingAnnotationContent("");
  };

  const handleDeleteAnnotation = async (annotationId: string) => {
    if (confirm("Tem certeza que deseja excluir esta anotação?")) {
      await deleteAnnotation(annotationId);
    }
  };

  const handleStartEditBookmark = (bookmarkId: string, currentName: string) => {
    setEditingBookmarkId(bookmarkId);
    setEditingBookmarkName(currentName);
  };

  const handleSaveBookmarkEdit = async () => {
    if (editingBookmarkId) {
      const { error } = await supabase
        .from("ebook_bookmarks")
        .update({ bookmark_name: editingBookmarkName })
        .eq("id", editingBookmarkId);
      
      if (!error) {
        setEditingBookmarkId(null);
        setEditingBookmarkName("");
      }
    }
  };

  const handleCancelBookmarkEdit = () => {
    setEditingBookmarkId(null);
    setEditingBookmarkName("");
  };

  const handleDeleteBookmark = async (bookmarkId: string) => {
    if (confirm("Tem certeza que deseja excluir este marcador?")) {
      await deleteBookmark(bookmarkId);
    }
  };

  // Sort annotations and bookmarks
  const getSortedAnnotations = () => {
    const filtered = annotations.filter(a => a.annotation_type === "highlight" || a.annotation_type === "note");
    
    switch (sortBy) {
      case "date":
        return [...filtered].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "page":
        return [...filtered].sort((a, b) => 
          (a.page_number || 0) - (b.page_number || 0)
        );
      case "type":
        return [...filtered].sort((a, b) => 
          a.annotation_type.localeCompare(b.annotation_type)
        );
      default:
        return filtered;
    }
  };

  const getSortedBookmarks = () => {
    switch (sortBy) {
      case "date":
        return [...bookmarks].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "page":
        return [...bookmarks].sort((a, b) => 
          a.page_number - b.page_number
        );
      default:
        return bookmarks;
    }
  };

  const sortedAnnotations = getSortedAnnotations();
  const sortedHighlights = sortedAnnotations.filter(a => a.annotation_type === "highlight");
  const sortedNotes = sortedAnnotations.filter(a => a.annotation_type === "note");
  const sortedBookmarks = getSortedBookmarks();

  const handleAddBookmark = () => {
    const chapter = ebookData.chapters.find(ch => ch.page <= currentPage);
    createBookmark(
      currentPage,
      undefined,
      chapter?.title
    );
  };

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim() || !contentRef.current) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    const content = contentRef.current.innerText;
    const query = searchQuery.toLowerCase();
    const results: number[] = [];
    let index = content.toLowerCase().indexOf(query);
    
    while (index !== -1) {
      results.push(index);
      index = content.toLowerCase().indexOf(query, index + 1);
    }
    
    setSearchResults(results);
    setCurrentSearchIndex(0);
  }, [searchQuery]);

  // Scroll to current search result
  useEffect(() => {
    if (searchResults.length > 0 && contentRef.current) {
      const marks = contentRef.current.querySelectorAll('mark[data-search-result]');
      if (marks[currentSearchIndex]) {
        marks[currentSearchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSearchIndex, searchResults]);

  // Highlight search results in content
  const getContentWithSearchHighlights = () => {
    if (!searchQuery.trim()) {
      return ebookData.content;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(ebookData.content, 'text/html');
    const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    
    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    const query = searchQuery.toLowerCase();
    textNodes.forEach((textNode) => {
      const text = textNode.textContent || '';
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes(query)) {
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let index = lowerText.indexOf(query);
        
        while (index !== -1) {
          if (index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, index)));
          }
          
          const mark = document.createElement('mark');
          mark.setAttribute('data-search-result', 'true');
          mark.style.backgroundColor = 'hsl(48, 75%, 70%)';
          mark.style.padding = '2px 0';
          mark.style.borderRadius = '2px';
          mark.textContent = text.substring(index, index + query.length);
          fragment.appendChild(mark);
          
          lastIndex = index + query.length;
          index = lowerText.indexOf(query, lastIndex);
        }
        
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        
        textNode.parentNode?.replaceChild(fragment, textNode);
      }
    });

    return doc.body.innerHTML;
  };

  // Apply annotations to content
  const getContentWithAnnotations = () => {
    let content = ebookData.content;
    
    // Apply search highlights first if there's a search query
    if (searchQuery.trim()) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      
      const textNodes: Text[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      const query = searchQuery.toLowerCase();
      textNodes.forEach((textNode) => {
        const text = textNode.textContent || '';
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes(query)) {
          const fragment = document.createDocumentFragment();
          let lastIndex = 0;
          let index = lowerText.indexOf(query);
          
          while (index !== -1) {
            if (index > lastIndex) {
              fragment.appendChild(document.createTextNode(text.substring(lastIndex, index)));
            }
            
            const mark = document.createElement('mark');
            mark.setAttribute('data-search-result', 'true');
            mark.style.backgroundColor = 'hsl(48, 75%, 70%)';
            mark.style.padding = '2px 0';
            mark.style.borderRadius = '2px';
            mark.textContent = text.substring(index, index + query.length);
            fragment.appendChild(mark);
            
            lastIndex = index + query.length;
            index = lowerText.indexOf(query, lastIndex);
          }
          
          if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
          }
          
          textNode.parentNode?.replaceChild(fragment, textNode);
        }
      });
      
      content = doc.body.innerHTML;
    }
    
    // Get annotations for current page
    const pageAnnotations = annotations.filter(a => a.page_number === currentPage);
    const pageBookmarks = bookmarks.filter(b => b.page_number === currentPage);
    
    // Create a temporary DOM to work with
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const bodyText = doc.body.innerText;
    
    // Sort annotations by position to avoid overlapping issues
    const sortedAnnotations = [...pageAnnotations].sort((a, b) => 
      bodyText.indexOf(a.selected_text) - bodyText.indexOf(b.selected_text)
    );
    
    // Apply each annotation
    sortedAnnotations.forEach((annotation) => {
      const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let node;
      
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }
      
      textNodes.forEach((textNode) => {
        const text = textNode.textContent || '';
        const index = text.indexOf(annotation.selected_text);
        
        if (index !== -1) {
          const fragment = document.createDocumentFragment();
          
          // Text before annotation
          if (index > 0) {
            fragment.appendChild(document.createTextNode(text.substring(0, index)));
          }
          
          // Create annotation element
          const span = document.createElement('span');
          span.setAttribute('data-annotation-id', annotation.id);
          span.setAttribute('data-annotation-type', annotation.annotation_type);
          span.setAttribute('data-annotation-color', annotation.highlight_color || '');
          span.setAttribute('data-annotation-content', annotation.annotation_content || '');
          span.setAttribute('data-annotation-text', annotation.selected_text);
          span.setAttribute('data-annotation-page', String(annotation.page_number || 0));
          span.style.padding = '3px 2px';
          span.style.borderRadius = '3px';
          span.style.cursor = 'pointer';
          span.style.transition = 'all 0.2s';
          span.style.position = 'relative';
          
          if (annotation.annotation_type === 'highlight') {
            const bgColor = annotation.highlight_color || 'rgba(255, 235, 59, 0.6)';
            span.style.backgroundColor = bgColor;
            span.title = 'Destaque';
            span.textContent = annotation.selected_text;
          } else if (annotation.annotation_type === 'note') {
            span.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            span.style.borderBottom = '2px solid rgba(59, 130, 246, 0.6)';
            span.title = `Anotação: ${annotation.annotation_content}`;
            
            // Add note icon
            const icon = document.createElement('sup');
            icon.innerHTML = '📝';
            icon.style.fontSize = '0.7em';
            icon.style.marginLeft = '2px';
            span.appendChild(document.createTextNode(annotation.selected_text));
            span.appendChild(icon);
          }
          
          fragment.appendChild(span);
          
          // Text after annotation
          const afterText = text.substring(index + annotation.selected_text.length);
          if (afterText) {
            fragment.appendChild(document.createTextNode(afterText));
          }
          
          textNode.parentNode?.replaceChild(fragment, textNode);
        }
      });
    });
    
    // Apply bookmark indicators
    if (pageBookmarks.length > 0) {
      const bookmarkIndicator = document.createElement('div');
      bookmarkIndicator.style.position = 'absolute';
      bookmarkIndicator.style.top = '0';
      bookmarkIndicator.style.right = '0';
      bookmarkIndicator.style.backgroundColor = 'hsl(var(--primary))';
      bookmarkIndicator.style.color = 'white';
      bookmarkIndicator.style.padding = '4px 8px';
      bookmarkIndicator.style.borderRadius = '0 0 0 8px';
      bookmarkIndicator.style.fontSize = '12px';
      bookmarkIndicator.style.fontWeight = '600';
      bookmarkIndicator.innerHTML = `🔖 ${pageBookmarks.length} marcador${pageBookmarks.length > 1 ? 'es' : ''}`;
      doc.body.style.position = 'relative';
      doc.body.insertBefore(bookmarkIndicator, doc.body.firstChild);
    }
    
    // Add event listeners for hover effects
    setTimeout(() => {
      const annotationElements = document.querySelectorAll('[data-annotation-id]');
      annotationElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const annotationId = htmlElement.getAttribute('data-annotation-id');
        
        htmlElement.addEventListener('mouseenter', () => {
          if (annotationId) {
            setHoveredAnnotationId(annotationId);
          }
        });
        
        htmlElement.addEventListener('mouseleave', () => {
          setTimeout(() => setHoveredAnnotationId(null), 200);
        });
      });
    }, 100);
    
    return doc.body.innerHTML;
  };
  
  const handleQuickDelete = (annotationId: string) => {
    handleDeleteAnnotation(annotationId);
    setHoveredAnnotationId(null);
  };
  
  const handleQuickEdit = (annotationId: string, currentContent: string) => {
    handleStartEditAnnotation(annotationId, currentContent);
    setHoveredAnnotationId(null);
  };
  
  const handleQuickColorChange = async (annotationId: string, newColor: string) => {
    await updateAnnotation(annotationId, { highlight_color: newColor });
    setHoveredAnnotationId(null);
  };

  const handleNextSearchResult = () => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prev) => (prev + 1) % searchResults.length);
    }
  };

  const handlePreviousSearchResult = () => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setCurrentSearchIndex(0);
    setShowSearch(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar - Chapters */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Voltar
          </Button>
          <h2 className="text-lg font-semibold text-foreground">Capítulos</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {ebookData.chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => setCurrentPage(chapter.page)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentPage >= chapter.page &&
                  (ebookData.chapters[chapter.id] ? currentPage < ebookData.chapters[chapter.id].page : true)
                    ? "bg-pastel-blue text-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <div className="font-medium text-sm">{chapter.title}</div>
                <div className="text-xs opacity-70 mt-1">Página {chapter.page}</div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Center Content - Reading Area */}
      <div className="flex-1 flex flex-col">
        {/* Header with Cover and Authors */}
        <div className="bg-card border-b border-border">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={ebookData.coverImage}
                alt={ebookData.title}
                className="w-18 h-24 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground mb-1.5">{ebookData.title}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Autor:</span> {ebookData.author}
                  </div>
                  {ebookData.coAuthors.length > 0 && (
                    <div>
                      <span className="font-medium">Co-autores:</span> {ebookData.coAuthors.join(", ")}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowSearch(!showSearch)}
                    className={showSearch ? "bg-pastel-blue" : ""}
                  >
                    <Search size={16} className="mr-2" />
                    Buscar
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleAddBookmark}>
                    <Bookmark size={16} className="mr-2" />
                    Marcar Página
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setShowReadingAgent(true)}
                >
                  <Bot size={16} className="mr-2" />
                  Agente de Leitura
                </Button>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          {showSearch && (
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar texto no ebook..."
                    className="pl-10 pr-10"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                {searchResults.length > 0 && (
                  <>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {currentSearchIndex + 1} de {searchResults.length}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handlePreviousSearchResult}
                        disabled={searchResults.length === 0}
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleNextSearchResult}
                        disabled={searchResults.length === 0}
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reading Content */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto p-12 relative">
            <div
              ref={contentRef}
              key={`content-${annotations.length}-${currentPage}-${renderKey}`}
              className="prose prose-slate dark:prose-invert max-w-none"
              onMouseUp={handleTextSelection}
              dangerouslySetInnerHTML={{ __html: getContentWithAnnotations() }}
            />
            
            {/* Hover Popover for Annotations */}
            {hoveredAnnotationId && (() => {
              const annotation = annotations.find(a => a.id === hoveredAnnotationId);
              if (!annotation) return null;
              
              const element = document.querySelector(`[data-annotation-id="${hoveredAnnotationId}"]`);
              if (!element) return null;
              
              const rect = element.getBoundingClientRect();
              const scrollContainer = document.querySelector('.scroll-area-viewport');
              const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
              
              return (
                <div
                  className="fixed z-50 bg-background border border-border rounded-lg shadow-lg p-3 min-w-[280px] max-w-[320px]"
                  style={{
                    top: `${rect.bottom + scrollTop + 8}px`,
                    left: `${rect.left}px`,
                  }}
                  onMouseEnter={() => setHoveredAnnotationId(hoveredAnnotationId)}
                  onMouseLeave={() => setHoveredAnnotationId(null)}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                       <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs" style={{ backgroundColor: 'hsl(var(--accent) / 0.2)', color: 'hsl(var(--foreground))', borderColor: 'hsl(var(--border))' }}>
                            {annotation.annotation_type === 'highlight' ? 'Destaque' : 'Anotação'}
                          </Badge>
                          {annotation.page_number && (
                            <span className="text-xs text-muted-foreground">
                              Pág. {annotation.page_number}
                            </span>
                          )}
                        </div>
                        {annotation.highlight_name && (
                          <p className="text-sm font-semibold mb-1 text-foreground">
                            {annotation.highlight_name}
                          </p>
                        )}
                        <p className="text-sm font-medium line-clamp-2 mb-1 text-foreground">
                          {annotation.selected_text}
                        </p>
                        {annotation.annotation_content && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {annotation.annotation_content}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleQuickEdit(annotation.id, annotation.annotation_content || '')}
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      
                      {annotation.annotation_type === 'highlight' && (
                        <div className="flex items-center gap-1">
                          {['#fef08a', '#bfdbfe', '#d9f99d', '#fecaca', '#e9d5ff'].map((color) => (
                            <button
                              key={color}
                              className="w-5 h-5 rounded-full border border-border hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                              onClick={() => handleQuickColorChange(annotation.id, color)}
                            />
                          ))}
                        </div>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
                        onClick={() => handleQuickDelete(annotation.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </ScrollArea>

        {/* Page Navigation */}
        <div className="bg-card border-t border-border p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} className="mr-2" />
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Próxima
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Bookmarks & Annotations */}
      <div className="w-80 bg-card border-l border-border flex flex-col">
        <div className="border-b border-border">
          {/* Tab Buttons */}
          <TooltipProvider>
            <div className="flex items-center justify-around p-4 gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "bookmarks" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setActiveTab("bookmarks")}
                    className="relative"
                  >
                    <Bookmark size={18} />
                    {sortedBookmarks.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {sortedBookmarks.length}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Marcadores</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "highlights" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setActiveTab("highlights")}
                    className="relative"
                  >
                    <Highlighter size={18} />
                    {sortedHighlights.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {sortedHighlights.length}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Destaques</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "notes" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setActiveTab("notes")}
                    className="relative"
                  >
                    <MessageSquare size={18} />
                    {sortedNotes.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {sortedNotes.length}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Anotações</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          
          {/* Sort Options */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value: "date" | "page" | "type") => setSortBy(value)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Ordenar por Data</SelectItem>
                  <SelectItem value="page">Ordenar por Página</SelectItem>
                  <SelectItem value="type">Ordenar por Tipo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* Bookmarks Tab Content */}
            {activeTab === "bookmarks" && (
              <div className="space-y-2">
                {sortedBookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="p-3 bg-muted rounded-lg group"
                  >
                    {editingBookmarkId === bookmark.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editingBookmarkName}
                          onChange={(e) => setEditingBookmarkName(e.target.value)}
                          placeholder="Nome do marcador..."
                          className="text-sm"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveBookmarkEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelBookmarkEdit();
                            }
                          }}
                        />
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={handleSaveBookmarkEdit}
                            className="flex-1 h-7 text-xs"
                          >
                            <Save size={12} className="mr-1" />
                            Salvar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelBookmarkEdit}
                            className="flex-1 h-7 text-xs"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="cursor-pointer"
                          onClick={() => setCurrentPage(bookmark.page_number)}
                        >
                          <div className="text-sm font-medium text-foreground">
                            {bookmark.bookmark_name || bookmark.chapter_name || "Sem título"}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Página {bookmark.page_number}
                          </div>
                          {bookmark.preview_text && (
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              "{bookmark.preview_text}"
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartEditBookmark(bookmark.id, bookmark.bookmark_name || "")}
                            className="h-6 px-2 text-xs"
                          >
                            <Edit2 size={12} className="mr-1" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteBookmark(bookmark.id)}
                            className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                          >
                            <Trash2 size={12} className="mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {sortedBookmarks.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">Nenhum marcador ainda</p>
                )}
              </div>
            )}

            {/* Highlights Tab Content */}
            {activeTab === "highlights" && (
              <div className="space-y-2">
                {sortedHighlights.map((annotation) => (
                  <div
                    key={annotation.id}
                    className="p-3 bg-muted rounded-lg group"
                  >
                    {annotation.highlight_name && (
                      <div className="text-sm font-medium text-foreground mb-2">
                        {annotation.highlight_name}
                      </div>
                    )}
                    <div
                      className="text-sm text-foreground mb-2 p-2 rounded cursor-pointer"
                      style={{ backgroundColor: annotation.highlight_color || undefined }}
                      onClick={() => annotation.page_number && setCurrentPage(annotation.page_number)}
                    >
                      "{annotation.selected_text}"
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Página {annotation.page_number}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteAnnotation(annotation.id)}
                        className="h-6 px-2 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} className="mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
                {sortedHighlights.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">Nenhum destaque ainda</p>
                )}
              </div>
            )}

            {/* Notes Tab Content */}
            {activeTab === "notes" && (
              <div className="space-y-2">
                {sortedNotes.map((annotation) => (
                  <div
                    key={annotation.id}
                    className="p-3 bg-muted rounded-lg group"
                  >
                    {editingAnnotationId === annotation.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editingAnnotationContent}
                          onChange={(e) => setEditingAnnotationContent(e.target.value)}
                          placeholder="Conteúdo da anotação..."
                          className="text-sm"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSaveAnnotationEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelAnnotationEdit();
                            }
                          }}
                        />
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={handleSaveAnnotationEdit}
                            className="flex-1 h-7 text-xs"
                          >
                            <Save size={12} className="mr-1" />
                            Salvar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelAnnotationEdit}
                            className="flex-1 h-7 text-xs"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="text-sm text-foreground mb-2 cursor-pointer"
                          onClick={() => annotation.page_number && setCurrentPage(annotation.page_number)}
                        >
                          {annotation.annotation_content}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2 italic">
                          "{annotation.selected_text}"
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Página {annotation.page_number}
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStartEditAnnotation(annotation.id, annotation.annotation_content || "")}
                              className="h-6 px-2 text-xs"
                            >
                              <Edit2 size={12} className="mr-1" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteAnnotation(annotation.id)}
                              className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                            >
                              <Trash2 size={12} className="mr-1" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {sortedNotes.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">Nenhuma anotação ainda</p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Selection Menu */}
      {showHighlightMenu && (
        <div
          className="fixed z-50 bg-card border border-border rounded-lg shadow-lg p-3"
          style={{ 
            left: highlightMenuPosition.x, 
            top: highlightMenuPosition.y,
            minWidth: showNoteInput ? '400px' : 'auto'
          }}
        >
          {!showNoteInput ? (
            <div className="space-y-2">
              {/* Name Input */}
              <div className="pb-2 border-b border-border">
                <Input
                  value={highlightName}
                  onChange={(e) => setHighlightName(e.target.value)}
                  placeholder="Nome do destaque (opcional)"
                  className="w-full text-sm"
                />
              </div>

              {/* Color Selection */}
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="text-xs text-muted-foreground mr-1">Cor:</span>
                <div className="flex gap-1">
                  {[
                    { color: "rgba(255, 235, 59, 0.6)", label: "Amarelo" },
                    { color: "rgba(76, 175, 80, 0.6)", label: "Verde" },
                    { color: "rgba(33, 150, 243, 0.6)", label: "Azul" },
                    { color: "rgba(255, 152, 0, 0.6)", label: "Laranja" },
                    { color: "rgba(156, 39, 176, 0.6)", label: "Roxo" },
                  ].map((colorOption) => (
                    <button
                      key={colorOption.color}
                      onClick={() => setSelectedColor(colorOption.color)}
                      className={`w-7 h-7 rounded border-2 ${
                        selectedColor === colorOption.color ? "border-foreground" : "border-transparent"
                      }`}
                      style={{ backgroundColor: colorOption.color }}
                      title={colorOption.label}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleHighlight} 
                  className="flex-1"
                  style={{ backgroundColor: selectedColor, color: 'hsl(var(--foreground))' }}
                >
                  <Highlighter size={14} className="mr-2" />
                  Destacar
                </Button>
                <Button size="sm" variant="outline" onClick={handleAddBookmarkFromSelection} className="flex-1">
                  <Bookmark size={14} className="mr-2" />
                  Marcador
                </Button>
                <Button size="sm" variant="outline" onClick={handleShowNoteInput} className="flex-1">
                  <MessageSquare size={14} className="mr-2" />
                  Anotar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground mb-2">Adicionar Anotação</div>
              <Input
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Digite sua anotação..."
                className="w-full"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddNote();
                  }
                }}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddNote} disabled={!noteContent.trim()} className="flex-1">
                  Salvar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    removePreviewHighlight();
                    setShowNoteInput(false);
                    setNoteContent("");
                    setShowHighlightMenu(false);
                    setHighlightName("");
                    setPreviewRange(null);
                    window.getSelection()?.removeAllRanges();
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Agente de Leitura Chat */}
      <EbookReadingAgentChat
        open={showReadingAgent}
        onOpenChange={setShowReadingAgent}
        ebookTitle={ebookData.title}
        ebookContent={ebookData.content}
        currentPage={currentPage}
      />
    </div>
  );
};

export default LerEbook;
