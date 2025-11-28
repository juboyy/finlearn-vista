import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link2, Image, Quote, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useToast } from "@/hooks/use-toast";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

const EditorMarkdown = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "1", title: "Capítulo 1", content: "" }
  ]);
  const [activeChapterId, setActiveChapterId] = useState("1");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChapter = chapters.find(ch => ch.id === activeChapterId) || chapters[0];

  useEffect(() => {
    const titleParam = searchParams.get("title");
    if (titleParam) {
      setTitle(titleParam);
    }
  }, [searchParams]);

  const handleSave = () => {
    // TODO: Implement save to database
    toast({
      title: "Documento salvo",
      description: "Seu documento foi salvo com sucesso.",
    });
  };

  const addChapter = () => {
    const newId = String(Date.now());
    const newChapter: Chapter = {
      id: newId,
      title: `Capítulo ${chapters.length + 1}`,
      content: ""
    };
    setChapters([...chapters, newChapter]);
    setActiveChapterId(newId);
  };

  const deleteChapter = (id: string) => {
    if (chapters.length === 1) {
      toast({
        title: "Não é possível excluir",
        description: "O documento precisa ter pelo menos um capítulo.",
        variant: "destructive"
      });
      return;
    }
    
    const newChapters = chapters.filter(ch => ch.id !== id);
    setChapters(newChapters);
    
    if (activeChapterId === id) {
      setActiveChapterId(newChapters[0].id);
    }
  };

  const updateChapterTitle = (id: string, newTitle: string) => {
    setChapters(chapters.map(ch => 
      ch.id === id ? { ...ch, title: newTitle } : ch
    ));
  };

  const updateChapterContent = (content: string) => {
    setChapters(chapters.map(ch => 
      ch.id === activeChapterId ? { ...ch, content } : ch
    ));
  };

  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = activeChapter.content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newContent = 
      activeChapter.content.substring(0, start) + 
      before + textToInsert + after + 
      activeChapter.content.substring(end);
    
    updateChapterContent(newContent);
    
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertAtLine = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeCursor = activeChapter.content.substring(0, start);
    const lineStart = beforeCursor.lastIndexOf('\n') + 1;
    
    const newContent = 
      activeChapter.content.substring(0, lineStart) + 
      prefix + 
      activeChapter.content.substring(lineStart);
    
    updateChapterContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Chapters */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="w-full justify-start mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button
            size="sm"
            onClick={addChapter}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Capítulo
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wide">
              Capítulos
            </div>
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`group relative flex items-center gap-2 p-3 rounded-lg mb-1 cursor-pointer transition-colors ${
                  activeChapterId === chapter.id
                    ? "bg-pastel-blue text-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
                onClick={() => setActiveChapterId(chapter.id)}
              >
                <GripVertical className="h-4 w-4 opacity-50" />
                <div className="flex-1 min-w-0">
                  <Input
                    value={chapter.title}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateChapterTitle(chapter.id, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="h-6 px-2 text-sm font-medium border-none bg-transparent focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <div className="text-xs opacity-70 mt-1 px-2">
                    {chapter.content.split(/\s+/).filter(Boolean).length} palavras
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChapter(chapter.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2">
            <div className="flex justify-between mb-1">
              <span>Total de capítulos:</span>
              <span className="font-medium">{chapters.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Palavras totais:</span>
              <span className="font-medium">
                {chapters.reduce((acc, ch) => 
                  acc + ch.content.split(/\s+/).filter(Boolean).length, 0
                )}
              </span>
            </div>
          </div>
          <Button size="sm" onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Salvar Documento
          </Button>
        </div>
      </div>

      {/* Center Content - Live Preview */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do documento..."
            className="text-2xl font-bold border-none focus-visible:ring-0 p-0 h-auto"
          />
        </div>

        {/* Formatting Toolbar */}
        <div className="bg-muted/30 border-b border-border px-4 py-2">
          <div className="flex items-center gap-1 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("**", "**", "negrito")}
              title="Negrito"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("*", "*", "itálico")}
              title="Itálico"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertAtLine("# ")}
              title="Título 1"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertAtLine("## ")}
              title="Título 2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertAtLine("### ")}
              title="Título 3"
            >
              <Heading3 className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertAtLine("- ")}
              title="Lista"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertAtLine("1. ")}
              title="Lista Numerada"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertAtLine("> ")}
              title="Citação"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("[", "](url)", "texto do link")}
              title="Link"
            >
              <Link2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("![", "](url)", "alt text")}
              title="Imagem"
            >
              <Image className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Area with Live Markdown Rendering */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto p-12">
            <Textarea
              ref={textareaRef}
              value={activeChapter.content}
              onChange={(e) => updateChapterContent(e.target.value)}
              placeholder="Comece a escrever em markdown...

# Título 1
## Título 2  
### Título 3

**Texto em negrito**
*Texto em itálico*

- Item de lista
- Outro item

1. Lista numerada
2. Segundo item"
              className="min-h-[800px] resize-none border-none focus-visible:ring-0 text-base leading-relaxed bg-transparent mb-8"
            />
            
            {activeChapter.content && (
              <>
                <div className="h-px bg-border my-8" />
                <div className="bg-muted/20 rounded-lg p-8">
                  <div className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                    Visualização Renderizada
                  </div>
                  <div 
                    className="prose prose-slate dark:prose-invert max-w-none"
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.8'
                    }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {activeChapter.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default EditorMarkdown;
