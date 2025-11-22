import { useState, useRef, useEffect, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  BarChart3, 
  Table as TableIcon, 
  Quote, 
  Lightbulb,
  Type,
  Image as ImageIcon,
  Code,
  Columns2,
  FileEdit,
  Eye,
  Wand2,
  Search,
  Network,
  Video,
  Bot
} from "lucide-react";

interface CommandMenuOption {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  action: () => void;
}

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

type ViewMode = 'split' | 'editor' | 'preview';

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [commandMenuPosition, setCommandMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commandMenuRef = useRef<HTMLDivElement>(null);

  const insertContent = (content: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    // Remove the "/" that triggered the command
    const beforeSlash = text.substring(0, start - 1);
    const afterSlash = text.substring(end);
    
    const newValue = beforeSlash + content + afterSlash;
    onChange(newValue);
    
    // Set cursor position after inserted content
    setTimeout(() => {
      const newPosition = beforeSlash.length + content.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const commandOptions: CommandMenuOption[] = [
    {
      id: "chart",
      label: "Criar Gráfico",
      icon: BarChart3,
      description: "Adicionar um gráfico interativo",
      action: () => {
        insertContent("\n\n```chart\n{\n  \"type\": \"bar\",\n  \"title\": \"Título do Gráfico\",\n  \"data\": []\n}\n```\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "table",
      label: "Criar Tabela",
      icon: TableIcon,
      description: "Inserir uma tabela markdown",
      action: () => {
        insertContent("\n\n| Coluna 1 | Coluna 2 | Coluna 3 |\n|----------|----------|----------|\n| Dado 1   | Dado 2   | Dado 3   |\n| Dado 4   | Dado 5   | Dado 6   |\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "quote",
      label: "Criar Citação",
      icon: Quote,
      description: "Adicionar um bloco de citação",
      action: () => {
        insertContent("\n\n> Sua citação aqui\n> Pode ter múltiplas linhas\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "insights",
      label: "Insights",
      icon: Lightbulb,
      description: "Gerar insights com IA",
      action: () => {
        insertContent("\n\n💡 **Insights Gerados:**\n- Insight 1\n- Insight 2\n- Insight 3\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "heading",
      label: "Título",
      icon: Type,
      description: "Adicionar um título",
      action: () => {
        insertContent("\n\n## Título\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "image",
      label: "Imagem",
      icon: ImageIcon,
      description: "Inserir uma imagem",
      action: () => {
        insertContent("\n\n![Descrição da imagem](url-da-imagem)\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "code",
      label: "Código",
      icon: Code,
      description: "Bloco de código",
      action: () => {
        insertContent("\n\n```javascript\n// Seu código aqui\n```\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "continue",
      label: "Continuação de texto",
      icon: Wand2,
      description: "Continuar escrevendo com IA",
      action: () => {
        insertContent("\n\n[Continuação gerada por IA...]\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "search",
      label: "Buscar dados",
      icon: Search,
      description: "Buscar informações externas",
      action: () => {
        insertContent("\n\n🔍 **Dados Buscados:**\n- Resultado 1\n- Resultado 2\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "correlate",
      label: "Correlacionar conteúdo",
      icon: Network,
      description: "Criar correlações entre dados",
      action: () => {
        insertContent("\n\n🔗 **Correlações:**\n- Correlação 1\n- Correlação 2\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "video",
      label: "Adicionar Vídeo",
      icon: Video,
      description: "Inserir um vídeo",
      action: () => {
        insertContent("\n\n[![Vídeo](thumbnail-url)](url-do-video)\n\n");
        setShowCommandMenu(false);
      }
    },
    {
      id: "agent",
      label: "Adicionar Agente",
      icon: Bot,
      description: "Inserir um agente IA",
      action: () => {
        insertContent("\n\n🤖 **Agente IA:**\n- Nome: [nome do agente]\n- Função: [descrição]\n\n");
        setShowCommandMenu(false);
      }
    }
  ];

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Navigate command menu with arrow keys
    if (showCommandMenu) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => 
          prev < commandOptions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCommandIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        commandOptions[selectedCommandIndex].action();
      } else if (e.key === "Escape") {
        setShowCommandMenu(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = newValue.substring(0, cursorPosition);
    
    onChange(newValue);
    
    // Show command menu if "/" was just typed
    if (textBeforeCursor.endsWith("/") && !showCommandMenu) {
      const textarea = e.target;
      const lines = textBeforeCursor.split("\n");
      const currentLineNumber = lines.length;
      const lineHeight = 24;
      const top = Math.min(currentLineNumber * lineHeight, 300);
      
      setCommandMenuPosition({ top, left: 20 });
      setShowCommandMenu(true);
      setSelectedCommandIndex(0);
    }
    
    // Hide command menu if "/" is deleted or user typed something else
    if (!textBeforeCursor.endsWith("/") && showCommandMenu) {
      setShowCommandMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        commandMenuRef.current &&
        !commandMenuRef.current.contains(e.target as Node) &&
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        setShowCommandMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* View Mode Toggle Buttons */}
      <div className="flex items-center justify-end gap-2 mb-4 pb-4 border-b border-border">
        <button
          onClick={() => setViewMode('split')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
            viewMode === 'split'
              ? 'bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)]'
              : 'bg-muted text-muted-foreground hover:bg-[hsl(206,35%,85%)]'
          }`}
        >
          <Columns2 size={14} />
          Split
        </button>
        <button
          onClick={() => setViewMode('editor')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
            viewMode === 'editor'
              ? 'bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)]'
              : 'bg-muted text-muted-foreground hover:bg-[hsl(206,35%,85%)]'
          }`}
        >
          <FileEdit size={14} />
          Editor
        </button>
        <button
          onClick={() => setViewMode('preview')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
            viewMode === 'preview'
              ? 'bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)]'
              : 'bg-muted text-muted-foreground hover:bg-[hsl(206,35%,85%)]'
          }`}
        >
          <Eye size={14} />
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div className={`relative flex-1 ${viewMode === 'split' ? 'grid grid-cols-2 gap-4' : ''}`}>
        {/* Editor Column */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <div className={`relative ${viewMode === 'split' ? 'border-r border-border' : ''}`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Digite '/' para ver os comandos disponíveis..."
          className="w-full h-full min-h-[600px] p-8 bg-transparent border-none focus:outline-none resize-none font-mono text-foreground leading-relaxed"
          style={{ 
            fontSize: '15px',
            lineHeight: '24px'
          }}
        />
        
            {showCommandMenu && (
              <div
                ref={commandMenuRef}
                className="absolute bg-card border border-border rounded-lg shadow-2xl z-50 w-80 overflow-hidden"
                style={{
                  top: `${commandMenuPosition.top}px`,
                  left: `${commandMenuPosition.left}px`,
                }}
              >
                <div className="py-2">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase border-b border-border">
                    Comandos Disponíveis
                  </div>
                  {commandOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={option.action}
                        className={`w-full px-3 py-2.5 text-left hover:bg-muted transition flex items-start gap-3 ${
                          index === selectedCommandIndex ? 'bg-muted' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 ${
                          index === selectedCommandIndex 
                            ? 'bg-[hsl(206,35%,75%)]' 
                            : 'bg-[hsl(206,35%,85%)]'
                        } rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="text-[hsl(220,15%,30%)]" size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preview Column */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="relative overflow-y-auto p-8">
            <div className="mb-4 text-xs font-semibold text-muted-foreground uppercase border-b border-border pb-2">
              Preview
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {value || "*Comece a escrever para ver o preview...*"}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
