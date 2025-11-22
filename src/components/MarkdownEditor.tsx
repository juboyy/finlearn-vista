import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { 
  BarChart3, 
  Table as TableIcon, 
  Quote, 
  Lightbulb,
  Type,
  Image as ImageIcon,
  Code
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

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [commandMenuPosition, setCommandMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
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
    }
  ];

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    
    // Check if "/" was just typed
    if (e.key === "/" && !showCommandMenu) {
      // Get cursor position for menu placement
      const lines = textBeforeCursor.split("\n");
      const currentLineNumber = lines.length;
      const lineHeight = 24; // Approximate line height
      const top = currentLineNumber * lineHeight;
      
      setCommandMenuPosition({ top, left: 20 });
      setShowCommandMenu(true);
      setSelectedCommandIndex(0);
    }
    
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
    onChange(e.target.value);
    
    // Hide command menu if "/" is deleted
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = e.target.value.substring(0, cursorPosition);
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
    <div className="relative w-full h-full">
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
  );
}
