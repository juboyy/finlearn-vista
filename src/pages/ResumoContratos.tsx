import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Upload, FileText, Loader2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const agents = [
  {
    id: "juridico",
    nome: "Jurídico",
    descricao: "Especialista em análise legal de contratos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juridico&backgroundColor=b6e3f4",
  },
  {
    id: "compliance",
    nome: "Compliance",
    descricao: "Focado em conformidade e regulamentação",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=compliance&backgroundColor=c0aede",
  },
  {
    id: "estrategia",
    nome: "Estratégia",
    descricao: "Análise estratégica de termos contratuais",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=estrategia&backgroundColor=ffd8be",
  },
];

export default function ResumoContratos() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [summaryType, setSummaryType] = useState<"short" | "medium" | "extensive">("medium");
  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState("");
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, envie um arquivo PDF, DOC, DOCX ou TXT.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 20MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(file);
    setSummary("");
  };

  const handleRemoveFile = () => {
    setFile(null);
    setSummary("");
  };

  const handleGenerateSummary = async () => {
    if (!file) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo para processar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setSummary("");

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Content = e.target?.result as string;
        
        const { data, error } = await supabase.functions.invoke("resumir-contrato", {
          body: {
            fileName: file.name,
            fileContent: base64Content.split(",")[1],
            summaryType,
            agent: selectedAgent,
          },
        });

        if (error) throw error;

        setSummary(data.summary);
        toast({
          title: "Resumo gerado com sucesso",
          description: "O resumo do contrato foi gerado pela IA.",
        });
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error("Error generating summary:", error);
      toast({
        title: "Erro ao gerar resumo",
        description: error.message || "Ocorreu um erro ao processar o documento.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/ferramentas" className="p-2 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[hsl(142,35%,75%)]">
                  <FileText className="h-5 w-5 text-slate-700" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-800">Resumo de Contratos</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4">Upload do Documento</h2>
                  
                  {!file ? (
                    <label
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`
                        block border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
                        transition-all duration-200
                        ${isDragging 
                          ? "border-[hsl(142,35%,65%)] bg-[hsl(142,35%,95%)]" 
                          : "border-slate-300 hover:border-[hsl(142,35%,65%)] hover:bg-slate-50"
                        }
                      `}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-[hsl(142,35%,55%)]' : 'text-slate-400'}`} />
                      <p className="text-base font-medium text-slate-700 mb-1">
                        {isDragging ? "Solte o arquivo aqui" : "Clique para fazer upload"}
                      </p>
                      <p className="text-sm text-slate-500">ou arraste e solte o arquivo</p>
                      <p className="text-xs text-slate-400 mt-2">PDF, DOC, DOCX ou TXT (máx. 20MB)</p>
                    </label>
                  ) : (
                    <div className="border-2 border-[hsl(142,35%,75%)] bg-[hsl(142,35%,95%)] rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-[hsl(142,35%,75%)] flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-slate-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 truncate">{file.name}</p>
                            <p className="text-sm text-slate-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveFile}
                          className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {summary && (
                  <div className="bg-white rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-slate-800">Resumo Gerado</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(summary);
                          toast({
                            title: "Copiado",
                            description: "Resumo copiado para a área de transferência.",
                          });
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <div className="prose prose-slate max-w-none">
                      <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {summary}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-base font-semibold text-slate-800 mb-4">Tipo de Resumo</h3>
                  <RadioGroup value={summaryType} onValueChange={(value: any) => setSummaryType(value)}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <RadioGroupItem value="short" id="short" />
                        <Label htmlFor="short" className="cursor-pointer flex-1">
                          <div className="font-medium text-slate-800">Curto</div>
                          <div className="text-xs text-slate-500">Resumo executivo breve</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="cursor-pointer flex-1">
                          <div className="font-medium text-slate-800">Médio</div>
                          <div className="text-xs text-slate-500">Resumo detalhado balanceado</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <RadioGroupItem value="extensive" id="extensive" />
                        <Label htmlFor="extensive" className="cursor-pointer flex-1">
                          <div className="font-medium text-slate-800">Extenso</div>
                          <div className="text-xs text-slate-500">Análise completa e profunda</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <h3 className="text-base font-semibold text-slate-800 mb-4">Selecionar Agente</h3>
                  <div className="space-y-3">
                    {agents.map((agent) => (
                      <div
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        className={`
                          p-3 rounded-lg border-2 cursor-pointer transition-all
                          ${selectedAgent === agent.id 
                            ? "border-[hsl(142,35%,65%)] bg-[hsl(142,35%,95%)]" 
                            : "border-slate-200 hover:border-[hsl(206,50%,72%)] hover:bg-slate-50"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={agent.avatar}
                            alt={agent.nome}
                            className="w-10 h-10 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-800">{agent.nome}</div>
                            <div className="text-xs text-slate-600">{agent.descricao}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateSummary}
                  disabled={!file || isProcessing}
                  className="w-full bg-[hsl(142,35%,65%)] hover:bg-[hsl(142,35%,55%)] text-slate-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Gerar Resumo"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
