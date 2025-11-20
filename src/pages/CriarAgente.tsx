import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Save, Rocket, Info, ImageIcon, Upload, BookOpen, 
  Brain, Mic, Play, MessageSquare, ChartLine, Target, Shield, 
  GraduationCap, Newspaper, Bell, FileText, Users, Settings,
  CheckCircle, Circle, Briefcase, Clock, FileCode, Sparkles,
  Heart, Bold, Italic, Link as LinkIcon, List, Hash, TrendingUp,
  Eye, Bot, UserCircle, Share2, BarChart3, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const CriarAgente = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form states
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(["analysis", "portfolio", "risk", "education"]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(["professional", "friendly"]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>(["fundamental", "technical"]);
  const [voiceSpeed, setVoiceSpeed] = useState([100]);
  const [voiceTone, setVoiceTone] = useState([50]);
  const [responseFormat, setResponseFormat] = useState("structured");
  const [responseSize, setResponseSize] = useState("medium");
  const [vocabulary, setVocabulary] = useState("intermediate");
  const [voiceType, setVoiceType] = useState("male");
  
  // Switches
  const [useBold, setUseBold] = useState(true);
  const [useItalic, setUseItalic] = useState(false);
  const [useLinks, setUseLinks] = useState(true);
  const [useLists, setUseLists] = useState(true);
  const [useCode, setUseCode] = useState(false);

  // Checkboxes
  const [acoesCheck, setAcoesCheck] = useState(true);
  const [fidosCheck, setFidosCheck] = useState(true);
  const [rendaFixaCheck, setRendaFixaCheck] = useState(false);
  const [derivativosCheck, setDerivativosCheck] = useState(false);

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities(prev => 
      prev.includes(capability) ? prev.filter(c => c !== capability) : [...prev, capability]
    );
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => 
      prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]
    );
  };

  const toggleKnowledge = (knowledge: string) => {
    setSelectedKnowledge(prev => 
      prev.includes(knowledge) ? prev.filter(k => k !== knowledge) : [...prev, knowledge]
    );
  };

  const capabilities = [
    { id: "analysis", label: "Análise de Mercado", desc: "Insights e análise de mercado", icon: ChartLine, color: "bg-pastel-blue" },
    { id: "portfolio", label: "Gestão de Portfólio", desc: "Otimização e rebalanceamento", icon: Target, color: "bg-pastel-green" },
    { id: "risk", label: "Análise de Risco", desc: "Avaliação e mitigação", icon: Shield, color: "bg-pastel-pink" },
    { id: "prediction", label: "Previsões", desc: "Modelos preditivos", icon: Brain, color: "bg-pastel-purple" },
    { id: "education", label: "Educação Financeira", desc: "Tutoriais e explicações", icon: GraduationCap, color: "bg-pastel-purple" },
    { id: "news", label: "Notícias", desc: "Resumo de eventos", icon: Newspaper, color: "bg-pastel-peach" },
    { id: "alerts", label: "Alertas", desc: "Notificações personalizadas", icon: Bell, color: "bg-pastel-pink" },
    { id: "reports", label: "Relatórios", desc: "Geração automática", icon: FileText, color: "bg-pastel-peach" },
  ];

  const traits = [
    { id: "professional", label: "Profissional", desc: "Formal, objetivo e focado em resultados" },
    { id: "friendly", label: "Amigável", desc: "Caloroso, acessível e empático" },
    { id: "analytical", label: "Analítico", desc: "Detalhista, lógico e baseado em dados" },
    { id: "creative", label: "Criativo", desc: "Inovador, versátil e inspirador" },
  ];

  const steps = [
    { number: 1, label: "Informações Básicas" },
    { number: 2, label: "Configuração" },
    { number: 3, label: "Personalidade" },
    { number: 4, label: "Finalização" }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Brain className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FinLearn AI</h1>
              <p className="text-xs text-muted-foreground">Plataforma de Agentes</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <TrendingUp size={18} />
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <BookOpen size={18} />
              <span className="font-medium">Conteúdo</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-secondary">
              <Brain size={18} className="text-primary-foreground" />
              <span className="font-medium text-foreground">Agentes IA</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <GraduationCap size={18} />
              <span className="font-medium">Treinamento</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <ChartLine size={18} />
              <span className="font-medium">Análises</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <Users size={18} />
              <span className="font-medium">Equipe</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
              <Settings size={18} />
              <span className="font-medium">Configurações</span>
            </a>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
          <div className="flex items-center space-x-3 px-3 py-3 rounded-xl bg-secondary">
            <div className="relative">
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                alt="User" 
                className="w-10 h-10 rounded-full ring-2 ring-border"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Carlos Silva</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => navigate("/meus-agentes")}
                    className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-all border border-border"
                  >
                    <ArrowLeft className="text-muted-foreground" size={18} />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Criar Novo Agente IA</h2>
                    <p className="text-sm text-muted-foreground mt-1">Configure seu assistente inteligente personalizado</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="rounded-xl">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Rascunho
                </Button>
                <Button className="rounded-xl bg-primary hover:bg-primary/80">
                  <Rocket className="h-4 w-4 mr-2" />
                  Publicar Agente
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Wizard Steps */}
        <div className="px-8 py-6 border-b border-border bg-card">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-colors ${
                    currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {step.number}
                  </div>
                  <span className={`text-sm font-medium ${currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 mt-[-20px] transition-colors ${
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Main Content (2 cols) */}
            <div className="col-span-2 space-y-6">
              
              {/* Informações Básicas */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center">
                    <Info className="text-pastel-purple-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Informações Básicas</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Nome do Agente</Label>
                    <Input 
                      placeholder="Ex: Assistente Financeiro Pro" 
                      className="rounded-xl"
                      defaultValue=""
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-semibold text-foreground mb-2">Função Principal</Label>
                      <Select defaultValue="consultant">
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultant">Consultor de Investimentos</SelectItem>
                          <SelectItem value="educator">Educador Financeiro</SelectItem>
                          <SelectItem value="analyst">Analista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-sm font-semibold text-foreground mb-2">Nível de Experiência</Label>
                      <Select defaultValue="mid">
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Iniciante</SelectItem>
                          <SelectItem value="mid">Intermediário</SelectItem>
                          <SelectItem value="advanced">Avançado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Descrição Curta</Label>
                    <Textarea 
                      placeholder="Descreva brevemente o propósito e as capacidades do agente..."
                      className="rounded-xl min-h-[100px]"
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

              {/* Avatar do Agente */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                      <ImageIcon className="text-pastel-blue-fg" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Avatar do Agente</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="outline" className="rounded-xl w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Fazer Upload
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">PNG, JPG até 2MB. Recomendado: 400x400px</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-pastel-green flex items-center justify-center">
                      <Settings className="text-pastel-green-fg" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Configurações</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                      <span className="text-sm font-medium text-foreground">Ativo</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                      <span className="text-sm font-medium text-foreground">Público</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                      <span className="text-sm font-medium text-foreground">Destaque</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              {/* Área & Segmento */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-pink flex items-center justify-center">
                    <Briefcase className="text-pastel-pink-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Área & Segmento</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Área de Atuação</Label>
                    <Select defaultValue="market">
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Mercado Financeiro</SelectItem>
                        <SelectItem value="crypto">Criptomoedas</SelectItem>
                        <SelectItem value="realestate">Imóveis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Segmento de Especialização</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer hover:border-primary transition-all">
                        <Checkbox 
                          checked={acoesCheck} 
                          onCheckedChange={(checked) => setAcoesCheck(!!checked)}
                        />
                        <span className="text-sm text-foreground">Ações & Renda Variável</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer hover:border-primary transition-all">
                        <Checkbox 
                          checked={fidosCheck} 
                          onCheckedChange={(checked) => setFidosCheck(!!checked)}
                        />
                        <span className="text-sm text-foreground">FIIs de Investimento</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer hover:border-primary transition-all">
                        <Checkbox 
                          checked={rendaFixaCheck} 
                          onCheckedChange={(checked) => setRendaFixaCheck(!!checked)}
                        />
                        <span className="text-sm text-foreground">Renda Fixa</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer hover:border-primary transition-all">
                        <Checkbox 
                          checked={derivativosCheck} 
                          onCheckedChange={(checked) => setDerivativosCheck(!!checked)}
                        />
                        <span className="text-sm text-foreground">Derivativos</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Público-Alvo</Label>
                    <Select defaultValue="iniciantes">
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iniciantes">Investidores Iniciantes</SelectItem>
                        <SelectItem value="intermediarios">Investidores Intermediários</SelectItem>
                        <SelectItem value="avancados">Investidores Avançados</SelectItem>
                        <SelectItem value="traders">Traders Profissionais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Especialidades Técnicas */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-green flex items-center justify-center">
                    <Brain className="text-pastel-green-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Especialidades Técnicas</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-3">Conhecimentos Principais</Label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => toggleKnowledge("fundamental")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedKnowledge.includes("fundamental")
                            ? "bg-pastel-blue text-pastel-blue-fg"
                            : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {selectedKnowledge.includes("fundamental") && <CheckCircle className="inline h-3 w-3 mr-1" />}
                        Análise Fundamentalista
                      </button>
                      <button
                        onClick={() => toggleKnowledge("technical")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedKnowledge.includes("technical")
                            ? "bg-pastel-blue text-pastel-blue-fg"
                            : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {selectedKnowledge.includes("technical") && <CheckCircle className="inline h-3 w-3 mr-1" />}
                        Análise Técnica
                      </button>
                      <button
                        onClick={() => toggleKnowledge("quantitative")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedKnowledge.includes("quantitative")
                            ? "bg-pastel-blue text-pastel-blue-fg"
                            : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {selectedKnowledge.includes("quantitative") ? <CheckCircle className="inline h-3 w-3 mr-1" /> : <Circle className="inline h-3 w-3 mr-1" />}
                        Análise Quantitativa
                      </button>
                      <button
                        onClick={() => toggleKnowledge("macro")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedKnowledge.includes("macro")
                            ? "bg-pastel-blue text-pastel-blue-fg"
                            : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {selectedKnowledge.includes("macro") ? <CheckCircle className="inline h-3 w-3 mr-1" /> : <Circle className="inline h-3 w-3 mr-1" />}
                        Análise Macroeconômica
                      </button>
                      <button
                        onClick={() => toggleKnowledge("risk")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedKnowledge.includes("risk")
                            ? "bg-pastel-blue text-pastel-blue-fg"
                            : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {selectedKnowledge.includes("risk") ? <CheckCircle className="inline h-3 w-3 mr-1" /> : <Circle className="inline h-3 w-3 mr-1" />}
                        Gestão de Risco
                      </button>
                      <button
                        onClick={() => toggleKnowledge("portfolio")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedKnowledge.includes("portfolio")
                            ? "bg-pastel-blue text-pastel-blue-fg"
                            : "bg-secondary border border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {selectedKnowledge.includes("portfolio") ? <CheckCircle className="inline h-3 w-3 mr-1" /> : <Circle className="inline h-3 w-3 mr-1" />}
                        Gestão de Portfólio
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-3">Distribuição e Contexto</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-foreground">Mercado de Ações</span>
                          <span className="text-xs font-bold text-pastel-blue-fg">65%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-pastel-blue-fg h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div className="p-4 bg-secondary rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-foreground">Análise de Risco</span>
                          <span className="text-xs font-bold text-pastel-green-fg">85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-pastel-green-fg h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Área de Experiência Simulada</Label>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-muted-foreground">1 ano</span>
                      <Slider 
                        value={[5]} 
                        min={0} 
                        max={20} 
                        step={1}
                        className="flex-1"
                      />
                      <span className="px-4 py-2 bg-pastel-blue rounded-lg text-pastel-blue-fg font-bold text-sm">5 anos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalidade & Tom de Voz */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center">
                    <MessageSquare className="text-pastel-purple-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Personalidade & Tom de Voz</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-3">Traços de Personalidade</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {traits.map((trait) => {
                        const isSelected = selectedTraits.includes(trait.id);
                        return (
                          <button
                            key={trait.id}
                            onClick={() => toggleTrait(trait.id)}
                            className={`p-4 bg-secondary rounded-xl border-2 cursor-pointer transition-all text-left ${
                              isSelected ? 'border-primary' : 'border-border hover:border-primary'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {trait.label}
                              </span>
                              {isSelected ? (
                                <CheckCircle className="text-primary" size={18} />
                              ) : (
                                <Circle className="text-muted-foreground" size={18} />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{trait.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Tom de Comunicação</Label>
                    <Select defaultValue="formal">
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal e Técnico</SelectItem>
                        <SelectItem value="casual">Casual e Amigável</SelectItem>
                        <SelectItem value="balanced">Equilibrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 bg-secondary rounded-xl border border-border text-center">
                        <div className="text-2xl font-bold text-pastel-blue-fg mb-1">75%</div>
                        <div className="text-xs text-muted-foreground">Formalidade</div>
                      </div>
                      <div className="p-4 bg-secondary rounded-xl border border-border text-center">
                        <div className="text-2xl font-bold text-pastel-green-fg mb-1">60%</div>
                        <div className="text-xs text-muted-foreground">Empatia</div>
                      </div>
                      <div className="p-4 bg-secondary rounded-xl border border-border text-center">
                        <div className="text-2xl font-bold text-pastel-purple-fg mb-1">90%</div>
                        <div className="text-xs text-muted-foreground">Objetividade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estilo de Resposta */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-pink flex items-center justify-center">
                    <MessageSquare className="text-pastel-pink-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Estilo de Resposta</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-3">Formato de Resposta</Label>
                    <RadioGroup value={responseFormat} onValueChange={setResponseFormat}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary border border-border">
                          <RadioGroupItem value="structured" id="structured" />
                          <Label htmlFor="structured" className="flex-1 cursor-pointer">
                            <span className="font-medium text-foreground">Estruturado</span>
                            <p className="text-xs text-muted-foreground mt-1">Respostas bem organizadas e pontuais</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary border border-border">
                          <RadioGroupItem value="narrative" id="narrative" />
                          <Label htmlFor="narrative" className="flex-1 cursor-pointer">
                            <span className="font-medium text-foreground">Narrativo</span>
                            <p className="text-xs text-muted-foreground mt-1">Explicações fluidas e contextualizadas</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary border border-border">
                          <RadioGroupItem value="mixed" id="mixed" />
                          <Label htmlFor="mixed" className="flex-1 cursor-pointer">
                            <span className="font-medium text-foreground">Misto</span>
                            <p className="text-xs text-muted-foreground mt-1">Combina estrutura com narrativa</p>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-3">Tamanho das Respostas</Label>
                    <div className="flex gap-3">
                      <Button
                        variant={responseSize === "short" ? "default" : "outline"}
                        onClick={() => setResponseSize("short")}
                        className="flex-1 rounded-xl"
                      >
                        Curtas
                      </Button>
                      <Button
                        variant={responseSize === "medium" ? "default" : "outline"}
                        onClick={() => setResponseSize("medium")}
                        className="flex-1 rounded-xl"
                      >
                        Médias
                      </Button>
                      <Button
                        variant={responseSize === "long" ? "default" : "outline"}
                        onClick={() => setResponseSize("long")}
                        className="flex-1 rounded-xl"
                      >
                        Longas
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Recursos Adicionais</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer">
                        <Checkbox defaultChecked />
                        <span className="text-sm text-foreground">Usar exemplos</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer">
                        <Checkbox defaultChecked />
                        <span className="text-sm text-foreground">Incluir analogias</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer">
                        <Checkbox />
                        <span className="text-sm text-foreground">Adicionar gráficos</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-secondary rounded-xl border border-border cursor-pointer">
                        <Checkbox />
                        <span className="text-sm text-foreground">Integrar análises</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacidades & Habilidades */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <Brain className="text-pastel-blue-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Capacidades & Habilidades</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {capabilities.map((cap) => {
                    const Icon = cap.icon;
                    const isSelected = selectedCapabilities.includes(cap.id);
                    return (
                      <button
                        key={cap.id}
                        onClick={() => toggleCapability(cap.id)}
                        className={`p-4 bg-secondary rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected ? 'border-primary' : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cap.color}`}>
                            <Icon className={isSelected ? "text-primary" : "text-muted-foreground"} size={18} />
                          </div>
                          {isSelected ? (
                            <CheckCircle className="text-primary" size={20} />
                          ) : (
                            <Circle className="text-muted-foreground" size={20} />
                          )}
                        </div>
                        <h4 className={`text-sm font-bold mb-1 ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {cap.label}
                        </h4>
                        <p className="text-xs text-muted-foreground">{cap.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Configurações de Voz */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center">
                    <Mic className="text-pastel-purple-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Configurações de Voz</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Tipo de Voz</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setVoiceType("male")}
                        className={`p-4 bg-secondary border-2 rounded-xl text-left transition-all ${
                          voiceType === "male" ? 'border-primary' : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Users className={voiceType === "male" ? "text-primary-foreground" : "text-muted-foreground"} size={18} />
                          <span className={`text-sm font-bold ${voiceType === "male" ? 'text-foreground' : 'text-muted-foreground'}`}>
                            Masculina
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Tom grave e profissional</p>
                      </button>
                      <button
                        onClick={() => setVoiceType("female")}
                        className={`p-4 bg-secondary border-2 rounded-xl text-left transition-all ${
                          voiceType === "female" ? 'border-primary' : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Users className={voiceType === "female" ? "text-primary-foreground" : "text-muted-foreground"} size={18} />
                          <span className={`text-sm font-bold ${voiceType === "female" ? 'text-foreground' : 'text-muted-foreground'}`}>
                            Feminina
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Tom agudo e claro</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Idioma Principal</Label>
                    <Select defaultValue="pt-br">
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                        <SelectItem value="pt-pt">Português (Portugal)</SelectItem>
                        <SelectItem value="en-us">Inglês (EUA)</SelectItem>
                        <SelectItem value="en-uk">Inglês (UK)</SelectItem>
                        <SelectItem value="es">Espanhol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Velocidade da Fala</Label>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-muted-foreground">0.5x</span>
                      <Slider 
                        value={voiceSpeed}
                        onValueChange={setVoiceSpeed}
                        min={50}
                        max={150}
                        step={10}
                        className="flex-1"
                      />
                      <span className="px-3 py-1 bg-pastel-blue rounded-lg text-pastel-blue-fg font-bold text-xs">
                        {(voiceSpeed[0] / 100).toFixed(1)}x
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Tom da Voz</Label>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-muted-foreground">Grave</span>
                      <Slider 
                        value={voiceTone}
                        onValueChange={setVoiceTone}
                        min={0}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground">Agudo</span>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-foreground">Preview de Voz</span>
                      <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-all">
                        <Play className="text-primary-foreground" size={16} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 flex items-center space-x-1">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className="flex-1 bg-primary/20 rounded-full" style={{ height: Math.random() * 20 + 10 + 'px' }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estilo de Escrita */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-peach flex items-center justify-center">
                    <FileCode className="text-pastel-peach-fg" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Estilo de Escrita</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-3">Complexidade do Vocabulário</Label>
                    <div className="flex gap-3">
                      <Button
                        variant={vocabulary === "simple" ? "default" : "outline"}
                        onClick={() => setVocabulary("simple")}
                        className="flex-1 rounded-xl"
                      >
                        Simples
                      </Button>
                      <Button
                        variant={vocabulary === "intermediate" ? "default" : "outline"}
                        onClick={() => setVocabulary("intermediate")}
                        className="flex-1 rounded-xl"
                      >
                        Intermediário
                      </Button>
                      <Button
                        variant={vocabulary === "advanced" ? "default" : "outline"}
                        onClick={() => setVocabulary("advanced")}
                        className="flex-1 rounded-xl"
                      >
                        Avançado
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-3">Recursos de Formatação</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-blue flex items-center justify-center">
                            <Bold className="text-pastel-blue-fg" size={16} />
                          </div>
                          <span className="text-sm font-medium text-foreground">Negrito para ênfase</span>
                        </div>
                        <Switch checked={useBold} onCheckedChange={setUseBold} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-purple flex items-center justify-center">
                            <Italic className="text-pastel-purple-fg" size={16} />
                          </div>
                          <span className="text-sm font-medium text-foreground">Itálico para citações</span>
                        </div>
                        <Switch checked={useItalic} onCheckedChange={setUseItalic} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-green flex items-center justify-center">
                            <LinkIcon className="text-pastel-green-fg" size={16} />
                          </div>
                          <span className="text-sm font-medium text-foreground">Links para referências</span>
                        </div>
                        <Switch checked={useLinks} onCheckedChange={setUseLinks} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-pink flex items-center justify-center">
                            <List className="text-pastel-pink-fg" size={16} />
                          </div>
                          <span className="text-sm font-medium text-foreground">Listas estruturadas</span>
                        </div>
                        <Switch checked={useLists} onCheckedChange={setUseLists} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-peach flex items-center justify-center">
                            <Hash className="text-pastel-peach-fg" size={16} />
                          </div>
                          <span className="text-sm font-medium text-foreground">Blocos de código</span>
                        </div>
                        <Switch checked={useCode} onCheckedChange={setUseCode} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Exemplo de Tom Geral</Label>
                    <div className="p-4 bg-secondary rounded-xl border border-border">
                      <p className="text-sm text-foreground italic">
                        "Qual a melhor estratégia para diversificar 3 portfólios?<br/>
                        Recomendo alocar recursos em: <strong>30% renda fixa</strong>, <strong>40% ações blue chip</strong> 
                        e <strong>30% fundos diversificados</strong>, considerando seu perfil de risco moderado."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Preview (1 col) */}
            <div className="col-span-1">
              <div className="space-y-6">
                {/* Preview do Agente - Main Card */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm sticky top-24">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center">
                      <Eye className="text-pastel-purple-fg" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Preview do Agente</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Agent Avatar */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-pastel-blue flex items-center justify-center flex-shrink-0">
                        <Bot className="text-pastel-blue-fg" size={28} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">Assistente Financeiro Pro</h4>
                        <p className="text-sm text-muted-foreground">Consultor Financeiro</p>
                      </div>
                    </div>

                    {/* Chat Preview */}
                    <div className="bg-secondary rounded-xl p-4 space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-pastel-blue flex items-center justify-center flex-shrink-0">
                          <Bot className="text-pastel-blue-fg" size={16} />
                        </div>
                        <div className="flex-1 bg-card rounded-xl p-3 border border-border">
                          <p className="text-sm text-foreground">
                            Olá! Sou seu assistente financeiro especializado. Como posso ajudá-lo hoje com suas decisões de investimento?
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 justify-end">
                        <div className="flex-1 bg-pastel-blue rounded-xl p-3 text-right">
                          <p className="text-sm text-pastel-blue-fg">
                            Quais são as melhores opções de investimento para iniciantes?
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-pastel-green flex items-center justify-center flex-shrink-0">
                          <UserCircle className="text-pastel-green-fg" size={16} />
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-pastel-blue flex items-center justify-center flex-shrink-0">
                          <Bot className="text-pastel-blue-fg" size={16} />
                        </div>
                        <div className="flex-1 bg-card rounded-xl p-3 border border-border">
                          <p className="text-sm text-foreground">
                            Para iniciantes, recomendo começar com fundos de investimento diversificados e renda fixa. Vou explicar cada opção em detalhes...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 px-4 py-2 bg-primary rounded-xl text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-300">
                        <Play className="inline-block mr-2" size={14} />
                        Testar Agente
                      </button>
                      <button className="px-4 py-2 bg-secondary border border-border rounded-xl text-muted-foreground text-sm font-medium hover:bg-accent transition-all duration-300">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Informações do Agente Card */}
                <div className="bg-secondary rounded-2xl border border-border p-5">
                  <h4 className="text-sm font-bold text-foreground mb-4 flex items-center">
                    <Info className="text-pastel-purple-fg mr-2" size={16} />
                    Informações do Agente
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Nome</p>
                      <p className="text-sm text-foreground font-medium">Assistente Financeiro Pro</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Função</p>
                      <p className="text-sm text-foreground font-medium">Consultor Financeiro</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Especialização</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="px-2 py-1 bg-pastel-blue rounded text-pastel-blue-fg text-xs">Ações</span>
                        <span className="px-2 py-1 bg-pastel-green rounded text-pastel-green-fg text-xs">Fundos</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tom de Voz</p>
                      <p className="text-sm text-foreground font-medium">Profissional e Amigável</p>
                    </div>
                  </div>
                </div>

                {/* Estatísticas Card */}
                <div className="bg-secondary rounded-2xl border border-border p-5">
                  <h4 className="text-sm font-bold text-foreground mb-4 flex items-center">
                    <BarChart3 className="text-pastel-blue-fg mr-2" size={16} />
                    Estatísticas
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Tempo de Resposta</span>
                      <span className="text-sm text-foreground font-bold">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Precisão</span>
                      <span className="text-sm text-green-600 font-bold">98.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Satisfação</span>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-yellow-400" size={12} />
                        <span className="text-sm text-foreground font-bold">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status do Agente Card */}
                <div className="bg-pastel-blue/50 rounded-2xl border border-pastel-blue p-5">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="text-pastel-blue-fg" size={16} />
                    <h4 className="text-sm font-bold text-foreground">Status do Agente</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Seu agente está pronto para ser publicado!</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                      <div className="bg-pastel-blue-fg h-full rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="text-xs font-bold text-pastel-blue-fg">95%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CriarAgente;
