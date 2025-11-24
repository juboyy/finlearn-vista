import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { 
  ArrowLeft, Save, Eye, Share2, Download, Settings, FileText,
  ChevronRight, Plus, X
} from "lucide-react";

export default function NovoDocumento() {
  const navigate = useNavigate();
  const [documentTitle, setDocumentTitle] = useState("Documento sem título");
  const [markdownContent, setMarkdownContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState("Análise de Mercado");
  const [visibility, setVisibility] = useState("Privado");

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleSave = () => {
    console.log("Documento salvo:", { documentTitle, markdownContent, tags, category, visibility });
    // Aqui você pode adicionar lógica para salvar no backend
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b-2 border-border h-16 flex-none sticky top-0 z-10">
          <div className="h-full px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-muted rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Biblioteca</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">Novo Documento</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Visualizar
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
              <button className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-lg font-medium hover:bg-opacity-80 transition text-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>
        </header>

        {/* Sub-header with document title */}
        <div className="bg-card border-b border-border px-8 py-6">
          <input 
            type="text" 
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="text-3xl font-bold text-foreground bg-transparent border-none focus:outline-none focus:ring-0 w-full placeholder-muted-foreground"
            placeholder="Título do documento..."
          />
          
          {/* Tags */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-full text-sm"
              >
                {tag}
                <button 
                  onClick={() => removeTag(tag)}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <div className="flex items-center gap-2">
              <input 
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Adicionar tag..."
                className="px-3 py-1 bg-muted border border-border rounded-full text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--pastel-blue))]"
              />
              <button 
                onClick={addTag}
                className="p-1 hover:bg-muted rounded-full transition"
              >
                <Plus className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Document settings */}
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent border-none text-foreground focus:outline-none cursor-pointer"
              >
                <option>Análise de Mercado</option>
                <option>Compliance</option>
                <option>Relatório</option>
                <option>Estudo</option>
                <option>Paper</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <select 
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="bg-transparent border-none text-foreground focus:outline-none cursor-pointer"
              >
                <option>Privado</option>
                <option>Público</option>
                <option>Compartilhado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content - Markdown Editor */}
        <main className="flex-1 overflow-hidden">
          <MarkdownEditor 
            value={markdownContent}
            onChange={setMarkdownContent}
          />
        </main>
      </div>
    </div>
  );
}
