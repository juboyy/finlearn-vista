import { useState, useEffect } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, FileText, Download, Eye, Trash2, Search, Filter, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HistorySummary {
  id: string;
  file_name: string;
  file_size: number;
  summary_type: string;
  agent_id: string;
  agent_name: string;
  summary_content: string;
  created_at: string;
}

export default function HistoricoResumos() {
  const [history, setHistory] = useState<HistorySummary[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistorySummary[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistorySummary | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAgent, setFilterAgent] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterResults();
  }, [history, searchTerm, filterAgent, filterType]);

  const loadHistory = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contract_summaries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading history:", error);
      toast({
        title: "Erro ao carregar histórico",
        description: "Não foi possível carregar os resumos.",
        variant: "destructive",
      });
    } else {
      setHistory(data || []);
    }
    setIsLoading(false);
  };

  const filterResults = () => {
    let filtered = [...history];

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.file_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterAgent !== "all") {
      filtered = filtered.filter((item) => item.agent_id === filterAgent);
    }

    if (filterType !== "all") {
      filtered = filtered.filter((item) => item.summary_type === filterType);
    }

    setFilteredHistory(filtered);
  };

  const handleDeleteHistory = async (id: string) => {
    const { error } = await supabase
      .from("contract_summaries")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao deletar",
        description: "Não foi possível deletar o resumo.",
        variant: "destructive",
      });
    } else {
      loadHistory();
      toast({
        title: "Resumo deletado",
        description: "O resumo foi removido do histórico.",
      });
    }
  };

  const handleViewHistory = (item: HistorySummary) => {
    setSelectedHistoryItem(item);
    setShowDialog(true);
  };

  const handleDownloadHistory = (item: HistorySummary) => {
    const blob = new Blob([item.summary_content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resumo-${item.file_name}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download iniciado",
      description: "O resumo está sendo baixado.",
    });
  };

  const uniqueAgents = Array.from(new Set(history.map((item) => item.agent_name)));

  const getSummaryTypeLabel = (type: string) => {
    switch (type) {
      case "short":
        return "Curto";
      case "medium":
        return "Médio";
      case "extensive":
        return "Extenso";
      default:
        return type;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/resumo-contratos" className="p-2 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Histórico de Resumos</h1>
                <p className="text-sm text-slate-500 mt-1">
                  {filteredHistory.length} {filteredHistory.length === 1 ? "resumo encontrado" : "resumos encontrados"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Filtros e Busca */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[hsl(322,48%,75%)] flex items-center justify-center">
                  <Filter className="h-5 w-5 text-slate-700" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Filtros e Busca</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por nome do arquivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-slate-200 focus:border-[hsl(206,35%,65%)]"
                  />
                </div>

                <Select value={filterAgent} onValueChange={setFilterAgent}>
                  <SelectTrigger className="border-2 border-slate-200">
                    <SelectValue placeholder="Filtrar por agente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os agentes</SelectItem>
                    {uniqueAgents.map((agent) => (
                      <SelectItem key={agent} value={agent}>
                        {agent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-2 border-slate-200">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="short">Curto</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="extensive">Extenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Resumos */}
            {isLoading ? (
              <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-600">Carregando histórico...</p>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-10 w-10 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium mb-2">Nenhum resumo encontrado</p>
                <p className="text-sm text-slate-500">
                  {searchTerm || filterAgent !== "all" || filterType !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Comece gerando seu primeiro resumo"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center flex-shrink-0 border-2 border-slate-300">
                          <FileText className="h-7 w-7 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-800 text-lg mb-2 truncate">
                            {item.file_name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <FileText className="h-4 w-4" />
                              <span>{(item.file_size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                            <span className="text-slate-400">•</span>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <i className="fas fa-robot"></i>
                              <span>{item.agent_name}</span>
                            </div>
                            <span className="text-slate-400">•</span>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(item.created_at).toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className="inline-block px-3 py-1 bg-[hsl(206,35%,85%)] text-slate-700 text-xs font-medium rounded-full">
                              {getSummaryTypeLabel(item.summary_type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewHistory(item)}
                          className="text-slate-600 hover:text-[hsl(206,50%,55%)] hover:bg-[hsl(206,50%,95%)]"
                          title="Visualizar"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadHistory(item)}
                          className="text-slate-600 hover:text-[hsl(142,35%,55%)] hover:bg-[hsl(142,35%,95%)]"
                          title="Baixar"
                        >
                          <Download className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteHistory(item.id)}
                          className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                          title="Deletar"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Dialog para visualizar resumo */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-slate-800">
              {selectedHistoryItem?.file_name}
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Gerado em{" "}
              {selectedHistoryItem &&
                new Date(selectedHistoryItem.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              por {selectedHistoryItem?.agent_name}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-6 bg-slate-50 rounded-lg border-2 border-slate-200">
            <style>{`
              .markdown-content h1 {
                color: hsl(206, 50%, 45%);
                font-size: 1.75rem;
                font-weight: 700;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                border-bottom: 2px solid hsl(206, 35%, 85%);
                padding-bottom: 0.5rem;
              }
              .markdown-content h2 {
                color: hsl(322, 48%, 45%);
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
              }
              .markdown-content h3 {
                color: hsl(142, 35%, 40%);
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 1.25rem;
                margin-bottom: 0.75rem;
              }
              .markdown-content p {
                color: hsl(215, 16%, 25%);
                line-height: 1.8;
                margin-bottom: 1rem;
              }
              .markdown-content ul, .markdown-content ol {
                margin-bottom: 1.5rem;
                padding-left: 1.5rem;
              }
              .markdown-content li {
                color: hsl(215, 16%, 30%);
                line-height: 1.7;
                margin-bottom: 0.5rem;
              }
              .markdown-content li::marker {
                color: hsl(206, 50%, 55%);
                font-weight: 600;
              }
              .markdown-content strong {
                color: hsl(215, 16%, 20%);
                font-weight: 700;
              }
              .markdown-content em {
                color: hsl(322, 48%, 45%);
              }
              .markdown-content code {
                background-color: hsl(206, 35%, 95%);
                color: hsl(206, 50%, 40%);
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-size: 0.9em;
              }
              .markdown-content blockquote {
                border-left: 4px solid hsl(142, 35%, 65%);
                padding-left: 1rem;
                margin: 1.5rem 0;
                color: hsl(215, 16%, 35%);
                font-style: italic;
              }
              .markdown-content hr {
                border: none;
                border-top: 2px solid hsl(206, 35%, 85%);
                margin: 2rem 0;
              }
            `}</style>
            <div className="prose prose-slate max-w-none markdown-content">
              <ReactMarkdown>{selectedHistoryItem?.summary_content || ""}</ReactMarkdown>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => selectedHistoryItem && handleDownloadHistory(selectedHistoryItem)}
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
            <Button onClick={() => setShowDialog(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
