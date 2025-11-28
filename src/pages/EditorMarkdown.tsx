import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link2, Image, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useToast } from "@/hooks/use-toast";

const EditorMarkdown = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newContent = 
      content.substring(0, start) + 
      before + textToInsert + after + 
      content.substring(end);
    
    setContent(newContent);
    
    // Set cursor position after insertion
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
    const beforeCursor = content.substring(0, start);
    const lineStart = beforeCursor.lastIndexOf('\n') + 1;
    
    const newContent = 
      content.substring(0, lineStart) + 
      prefix + 
      content.substring(lineStart);
    
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="w-full justify-start"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Informações do Documento
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Palavras:</span>{" "}
                  {content.split(/\s+/).filter(Boolean).length}
                </div>
                <div>
                  <span className="font-medium">Caracteres:</span>{" "}
                  {content.length}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Formatação Markdown
              </h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div># Título 1</div>
                <div>## Título 2</div>
                <div>### Título 3</div>
                <div>**negrito**</div>
                <div>*itálico*</div>
                <div>- Lista</div>
                <div>1. Lista numerada</div>
                <div>[Link](url)</div>
                <div>![Imagem](url)</div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
            
            {content && (
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
                      {content}
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
