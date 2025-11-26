import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Upload, FileText, Loader2, Download, ChartLine, Landmark, Bitcoin, GraduationCap, TrendingUp, CreditCard, Database, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

const specializedAgents = [
  {
    id: "analista-tecnica",
    name: "Ana - Analista Técnica",
    description: "Especialista em análise técnica, padrões gráficos e estratégias de trading",
    icon: ChartLine,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
    category: "Análise",
    rating: "4.9"
  },
  {
    id: "renda-fixa",
    name: "Ricardo - Especialista em Renda Fixa",
    description: "Expert em títulos públicos, CDBs, LCIs e estratégias conservadoras",
    icon: Landmark,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
    category: "Renda Fixa",
    rating: "4.8"
  },
  {
    id: "crypto-defi",
    name: "Marina - Crypto & DeFi",
    description: "Especialista em criptomoedas, DeFi e tecnologia blockchain",
    icon: Bitcoin,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/521bb99722-72b06772970c6fd465e6.png",
    category: "Crypto",
    rating: "4.7"
  },
  {
    id: "educador-financeiro",
    name: "Professor João - Educador",
    description: "Educador financeiro com foco em fundamentos e teoria econômica",
    icon: GraduationCap,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4450be57c6-3f9f4c9c029e3c4d7519.png",
    category: "Educação",
    rating: "4.9"
  },
  {
    id: "mercado-financeiro",
    name: "Especialista em Mercado Financeiro",
    description: "Expert em análise de mercados, ações e tendências econômicas",
    icon: TrendingUp,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
    category: "Mercados",
    rating: "4.8"
  },
  {
    id: "pagamentos",
    name: "Especialista em Pagamentos",
    description: "Conhecimento em sistemas de pagamento, fintechs e transações digitais",
    icon: CreditCard,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-13cb55de72175bb27fe6.png",
    category: "Fintechs",
    rating: "4.6"
  },
  {
    id: "capitais",
    name: "Especialista em Mercado de Capitais",
    description: "Especialista em IPOs, ofertas públicas e estruturação de operações",
    icon: Database,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
    category: "Capitais",
    rating: "4.7"
  },
  {
    id: "esg-investing",
    name: "Julia - ESG & Investimentos Sustentáveis",
    description: "Especialista em investimentos ESG e sustentabilidade corporativa",
    icon: TrendingUp,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-22a909d28eba94674e80.png",
    category: "ESG",
    rating: "4.5"
  },
  {
    id: "compliance",
    name: "Fernanda - Compliance & Regulação",
    description: "Expert em compliance, regulamentação CVM e aspectos legais do mercado",
    icon: Settings,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-d3b919a60e4b8021bd1b.png",
    category: "Compliance",
    rating: "4.8"
  },
  {
    id: "valuation",
    name: "Pedro - Valuation & M&A",
    description: "Especialista em avaliação de empresas, fusões e aquisições",
    icon: Landmark,
    bgColor: "hsl(142,35%,75%)",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a93432ae23-74fa07dc19664888168d.png",
    category: "Valuation",
    rating: "4.6"
  },
];

export default function ResumoContratos() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [summaryType, setSummaryType] = useState<"short" | "medium" | "extensive">("medium");
  const [selectedAgent, setSelectedAgent] = useState(specializedAgents[0].id);
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
          <div className="max-w-6xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Resumos Gerados</span>
                  <FileText className="h-5 w-5 text-[hsl(206,50%,65%)]" />
                </div>
                <p className="text-3xl font-bold text-slate-800">127</p>
                <p className="text-xs text-slate-500 mt-1">Este mês</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Tempo Médio</span>
                  <i className="fas fa-clock text-[hsl(322,48%,65%)]"></i>
                </div>
                <p className="text-3xl font-bold text-slate-800">2.3min</p>
                <p className="text-xs text-slate-500 mt-1">Por documento</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 text-sm font-medium">Taxa de Precisão</span>
                  <i className="fas fa-check-circle text-[hsl(152,48%,65%)]"></i>
                </div>
                <p className="text-3xl font-bold text-slate-800">98.5%</p>
                <p className="text-xs text-slate-500 mt-1">Avaliação dos usuários</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border-2 border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(142,35%,75%)] flex items-center justify-center border-2 border-slate-300">
                      <Upload className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Upload do Documento</h2>
                      <p className="text-sm text-slate-600">Envie seu contrato para análise</p>
                    </div>
                  </div>
                  
                  {!file ? (
                    <label
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`
                        block border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
                        transition-all duration-300
                        ${isDragging 
                          ? "border-[hsl(142,35%,65%)] bg-[hsl(142,35%,95%)] scale-[1.02]" 
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

                {/* Área do Resumo - Sempre Visível */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(152,48%,75%)] flex items-center justify-center border-2 border-slate-300">
                      <i className="fas fa-file-alt text-slate-700 text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-slate-800">Resumo do Contrato</h2>
                      <p className="text-sm text-slate-600">
                        {summary ? "Análise completa do documento" : "O resumo aparecerá aqui após o processamento"}
                      </p>
                    </div>
                    {summary && (
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
                    )}
                  </div>
                  
                  <div className="min-h-[300px] rounded-lg border-2 border-slate-200 bg-slate-50 p-6">
                    {summary ? (
                      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                        <ReactMarkdown>
                          {summary}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                          <FileText className="h-10 w-10 text-slate-400" />
                        </div>
                        <p className="text-slate-500 font-medium mb-2">Nenhum resumo gerado ainda</p>
                        <p className="text-sm text-slate-400 max-w-md">
                          Selecione um agente, escolha o tipo de resumo e clique em "Gerar Resumo" para começar
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Seletor de Agente - Primeira Opção */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(206,50%,75%)] flex items-center justify-center border-2 border-slate-300">
                      <i className="fas fa-robot text-slate-700"></i>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Selecionar Agente de IA</h3>
                  </div>
                  
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {specializedAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        style={{ 
                          backgroundColor: selectedAgent === agent.id 
                            ? "hsl(322, 48%, 75%)" 
                            : agent.bgColor 
                        }}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedAgent === agent.id 
                            ? 'border-slate-400 shadow-lg scale-[1.02]' 
                            : 'border-slate-300 hover:border-slate-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img 
                            src={agent.image} 
                            alt={agent.name}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-800 text-sm">{agent.name}</span>
                              <div className="flex items-center gap-1">
                                <i className="fas fa-star text-yellow-500 text-xs"></i>
                                <span className="text-xs text-slate-600">{agent.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 leading-tight mb-1">{agent.description}</p>
                            <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-700 text-xs rounded-full">
                              {agent.category}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tipo de Resumo - Segunda Opção */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(322,48%,75%)] flex items-center justify-center border-2 border-slate-300">
                      <i className="fas fa-sliders-h text-slate-700"></i>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Tipo de Resumo</h3>
                  </div>
                  <RadioGroup value={summaryType} onValueChange={(value: any) => setSummaryType(value)}>
                    <div className="space-y-3">
                      <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${summaryType === 'short' ? 'border-[hsl(206,50%,65%)] bg-[hsl(206,50%,95%)]' : 'border-slate-200 hover:border-[hsl(206,50%,75%)] hover:bg-slate-50'}`}>
                        <RadioGroupItem value="short" id="short" />
                        <Label htmlFor="short" className="cursor-pointer flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <i className="fas fa-file text-[hsl(206,50%,65%)]"></i>
                            <span className="font-semibold text-slate-800">Curto</span>
                          </div>
                          <div className="text-xs text-slate-600">Resumo executivo breve (2-3 parágrafos)</div>
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${summaryType === 'medium' ? 'border-[hsl(322,48%,65%)] bg-[hsl(322,48%,95%)]' : 'border-slate-200 hover:border-[hsl(322,48%,75%)] hover:bg-slate-50'}`}>
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="cursor-pointer flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <i className="fas fa-file-alt text-[hsl(322,48%,65%)]"></i>
                            <span className="font-semibold text-slate-800">Médio</span>
                          </div>
                          <div className="text-xs text-slate-600">Resumo detalhado balanceado (4-6 parágrafos)</div>
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${summaryType === 'extensive' ? 'border-[hsl(152,48%,65%)] bg-[hsl(152,48%,95%)]' : 'border-slate-200 hover:border-[hsl(152,48%,75%)] hover:bg-slate-50'}`}>
                        <RadioGroupItem value="extensive" id="extensive" />
                        <Label htmlFor="extensive" className="cursor-pointer flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <i className="fas fa-file-invoice text-[hsl(152,48%,65%)]"></i>
                            <span className="font-semibold text-slate-800">Extenso</span>
                          </div>
                          <div className="text-xs text-slate-600">Análise completa e profunda (8-10 parágrafos)</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleGenerateSummary}
                  disabled={!file || isProcessing}
                  className="w-full bg-[hsl(152,48%,65%)] hover:bg-[hsl(152,48%,55%)] text-slate-700 font-semibold py-6 text-base border-2 border-slate-300 shadow-md hover:shadow-lg transition-all"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processando Documento...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic mr-2"></i>
                      Gerar Resumo com IA
                    </>
                  )}
                </Button>
                
                <div className="bg-gradient-to-br from-[hsl(206,50%,95%)] to-[hsl(322,48%,95%)] rounded-xl border-2 border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-lightbulb text-[hsl(44,70%,55%)] text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-1">Dica Profissional</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Para resumos mais precisos, escolha o agente específico que melhor se alinha com o tipo de contrato que você está analisando.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
