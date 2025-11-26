import { useState, useEffect } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, FileText, Download, Eye, Trash2, Search, Filter, Calendar, Clock, MoreHorizontal } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface HistorySummary {
  id: string;
  file_name: string;
  file_size: number;
  summary_type: string;
  agent_id: string;
  agent_name: string;
  summary_content: string;
  created_at: string;
  last_accessed_at?: string;
  processing_time_seconds?: number;
  summary_length_type?: string;
}

// Dados dos agentes para mapear imagens e informações
const agentsData: Record<string, { image: string; category: string; rating: string }> = {
  "analista-tecnica": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
    category: "Análise Técnica",
    rating: "4.9"
  },
  "renda-fixa": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
    category: "Renda Fixa",
    rating: "4.8"
  },
  "crypto-defi": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
    category: "Crypto & DeFi",
    rating: "4.7"
  },
  "educador-financeiro": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png",
    category: "Educação Financeira",
    rating: "4.9"
  },
  "mercado-financeiro": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
    category: "Mercado Financeiro",
    rating: "4.8"
  },
  "pagamentos": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-13cb55de72175bb27fe6.png",
    category: "Pagamentos",
    rating: "4.6"
  },
  "capitais": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
    category: "Mercado de Capitais",
    rating: "4.7"
  },
  "esg-investing": {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-22a909d28eba94674e80.png",
    category: "ESG & Sustentabilidade",
    rating: "4.5"
  }
};

export default function HistoricoResumos() {
  const [history, setHistory] = useState<HistorySummary[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistorySummary[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistorySummary | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [selectedDetailsItem, setSelectedDetailsItem] = useState<HistorySummary | null>(null);
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

  const handleViewDetails = (item: HistorySummary) => {
    setSelectedDetailsItem(item);
    setShowDetailsSheet(true);
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

  const getSummaryLengthLabel = (type: string | undefined) => {
    const labels: Record<string, string> = {
      short: "Curto",
      medium: "Médio",
      extensive: "Extenso",
    };
    return labels[type || "medium"] || "Médio";
  };

  const formatProcessingTime = (seconds: number | undefined) => {
    if (!seconds) return "N/A";
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getAgentImage = (agentId: string) => {
    return agentsData[agentId]?.image || "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png";
  };

  const getAgentCategory = (agentId: string) => {
    return agentsData[agentId]?.category || "Especialista";
  };

  const getAgentRating = (agentId: string) => {
    return agentsData[agentId]?.rating || "4.5";
  };

  const uniqueAgents = Array.from(new Set(history.map((item) => item.agent_name)));

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

            {/* Tabela de Resumos */}
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
              <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-16">
                        
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Nome do Documento
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-40">
                        Data de Criação
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-40">
                        Último Acesso
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-32">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 rounded-lg bg-[hsl(142,35%,75%)] flex items-center justify-center border-2 border-slate-300">
                            <FileText className="h-5 w-5 text-slate-700" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800">
                            {item.file_name}
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            {(item.file_size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(item.created_at).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                          <div className="text-xs text-slate-500 mt-1">
                            {new Date(item.created_at).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {item.last_accessed_at ? (
                            <>
                              {new Date(item.last_accessed_at).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                              <div className="text-xs text-slate-500 mt-1">
                                {new Date(item.last_accessed_at).toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </>
                          ) : (
                            <span className="text-slate-400">Nunca acessado</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadHistory(item)}
                              className="text-slate-600 hover:text-[hsl(142,35%,55%)] hover:bg-[hsl(142,35%,95%)]"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(item)}
                              className="text-slate-600 hover:text-[hsl(206,50%,55%)] hover:bg-[hsl(206,50%,95%)]"
                              title="Ver Mais"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

      {/* Sheet de Detalhes */}
      <Sheet open={showDetailsSheet} onOpenChange={setShowDetailsSheet}>
        <SheetContent className="w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-slate-800">Detalhes do Resumo</SheetTitle>
            <SheetDescription className="text-slate-600">
              Informações completas sobre o documento e processamento
            </SheetDescription>
          </SheetHeader>
          
          {selectedDetailsItem && (
            <div className="mt-6 space-y-6">
              {/* Informações Básicas */}
              <div className="bg-white rounded-lg border-2 border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                  Informações do Documento
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase">Nome do Arquivo</label>
                    <p className="text-sm text-slate-800 font-medium mt-1">{selectedDetailsItem.file_name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">Tamanho</label>
                      <p className="text-sm text-slate-800 mt-1">
                        {(selectedDetailsItem.file_size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase">Data de Criação</label>
                      <p className="text-sm text-slate-800 mt-1">
                        {new Date(selectedDetailsItem.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase">Último Acesso</label>
                    <p className="text-sm text-slate-800 mt-1">
                      {selectedDetailsItem.last_accessed_at
                        ? new Date(selectedDetailsItem.last_accessed_at).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Nunca acessado"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card do Agente de IA */}
              <div className="bg-white rounded-lg border-2 border-[hsl(215,20%,85%)] p-5 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">
                  Agente de IA Utilizado
                </h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[hsl(206,35%,75%)] flex-shrink-0 ring-2 ring-[hsl(206,35%,85%)]">
                    <img 
                      src={getAgentImage(selectedDetailsItem.agent_id)} 
                      alt={selectedDetailsItem.agent_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base text-slate-800 font-semibold mb-1">{selectedDetailsItem.agent_name}</p>
                    <p className="text-xs text-slate-500 mb-2">{getAgentCategory(selectedDetailsItem.agent_id)}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-600">Avaliação:</span>
                      <span className="text-xs font-medium text-[hsl(48,75%,45%)]">★ {getAgentRating(selectedDetailsItem.agent_id)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card de Tempo de Processamento */}
              <div className="bg-white rounded-lg border-2 border-[hsl(215,20%,85%)] p-5 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[hsl(206,35%,65%)]" />
                  Tempo de Processamento
                </h3>
                
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl text-slate-800 font-bold">
                    {formatProcessingTime(selectedDetailsItem.processing_time_seconds)}
                  </p>
                  <span className="text-xs text-slate-500">segundos</span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Eficiência</span>
                    <span className="font-medium text-slate-800">
                      {selectedDetailsItem.processing_time_seconds && selectedDetailsItem.processing_time_seconds < 30
                        ? "Excelente"
                        : selectedDetailsItem.processing_time_seconds && selectedDetailsItem.processing_time_seconds < 60
                        ? "Boa"
                        : "Normal"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card de Tipo de Resumo */}
              <div className="bg-white rounded-lg border-2 border-[hsl(215,20%,85%)] p-5 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">
                  Tipo de Resumo
                </h3>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(206,35%,75%)] flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-slate-700" />
                  </div>
                  <div>
                    <Badge
                      className="text-sm px-3 py-1 font-medium"
                      style={{ 
                        backgroundColor: 'hsl(206, 35%, 75%)',
                        color: 'hsl(215, 20%, 30%)'
                      }}
                    >
                      {getSummaryLengthLabel(selectedDetailsItem.summary_length_type)}
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedDetailsItem.summary_length_type === 'extensive' && 'Análise completa e detalhada'}
                      {selectedDetailsItem.summary_length_type === 'medium' && 'Resumo balanceado'}
                      {selectedDetailsItem.summary_length_type === 'short' && 'Resumo executivo rápido'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className="bg-white rounded-lg border-2 border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                  Performance
                </h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Velocidade de Processamento</span>
                    <span className="text-xs font-medium text-slate-800">
                      {selectedDetailsItem.processing_time_seconds && selectedDetailsItem.processing_time_seconds > 0
                        ? `${((selectedDetailsItem.file_size / 1024 / 1024) / selectedDetailsItem.processing_time_seconds).toFixed(2)} MB/s`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Eficiência</span>
                    <span className="text-xs font-medium text-slate-800">
                      {selectedDetailsItem.processing_time_seconds && selectedDetailsItem.processing_time_seconds < 30
                        ? "Excelente"
                        : selectedDetailsItem.processing_time_seconds && selectedDetailsItem.processing_time_seconds < 60
                        ? "Boa"
                        : "Normal"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-slate-800"
                  onClick={() => handleDownloadHistory(selectedDetailsItem)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2 border-slate-300"
                  onClick={() => {
                    handleViewHistory(selectedDetailsItem);
                    setShowDetailsSheet(false);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
