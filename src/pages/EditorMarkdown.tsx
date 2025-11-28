import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
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

      {/* Center Content - Split View: Editor & Preview */}
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

        {/* Split Content Area */}
        <div className="flex-1 flex">
          {/* Editor Column */}
          <div className="flex-1 border-r border-border">
            <div className="bg-muted/30 px-4 py-2 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">
                Editor Markdown
              </span>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-6">
                <Textarea
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
2. Segundo item

[Link](https://exemplo.com)
![Imagem](url-da-imagem)"
                  className="min-h-[800px] resize-none border-none focus-visible:ring-0 text-base leading-relaxed bg-transparent"
                />
              </div>
            </ScrollArea>
          </div>

          {/* Preview Column */}
          <div className="flex-1">
            <div className="bg-muted/30 px-4 py-2 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground">
                Visualização
              </span>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-12">
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none"
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.8'
                  }}
                >
                  {content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-muted-foreground italic">
                      A visualização do seu conteúdo aparecerá aqui...
                    </p>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorMarkdown;
