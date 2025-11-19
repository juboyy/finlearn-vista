import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Rocket, Info, ImageIcon, Briefcase, Brain, Mic, AlertCircle, Upload, Play, Bold, Italic, Link as LinkIcon, List, Hash, FileCode, MessageSquare, Clock, ChartLine, Target, Shield, GraduationCap, Newspaper, Bell, FileText, Sparkles, Heart, Users, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

const CriarAgente = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(["analysis", "portfolio", "risk", "education", "reports"]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(["friendly", "patient", "technical", "empathetic"]);
  const [voiceSpeed, setVoiceSpeed] = useState([100]);
  const [responseFormat, setResponseFormat] = useState("structured");
  const [responseSize, setResponseSize] = useState("medium");
  const [vocabulary, setVocabulary] = useState("intermediate");
  const [useBold, setUseBold] = useState(true);
  const [useItalic, setUseItalic] = useState(false);
  const [useLinks, setUseLinks] = useState(true);
  const [useLists, setUseLists] = useState(true);

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities(prev => prev.includes(capability) ? prev.filter(c => c !== capability) : [...prev, capability]);
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]);
  };

  const capabilities = [
    { id: "analysis", label: "Análise de Mercado", desc: "Tendências e insights do mercado financeiro", icon: ChartLine, color: "bg-pastel-blue" },
    { id: "portfolio", label: "Gestão de Portfólio", desc: "Otimização e rebalanceamento de ativos", icon: Target, color: "bg-pastel-green" },
    { id: "risk", label: "Análise de Risco", desc: "Avaliação e mitigação de riscos", icon: Shield, color: "bg-pastel-pink" },
    { id: "prediction", label: "Previsões", desc: "Modelos preditivos e forecasting", icon: Brain, color: "bg-pastel-purple" },
    { id: "education", label: "Educação Financeira", desc: "Tutoriais e explicações didáticas", icon: GraduationCap, color: "bg-pastel-purple" },
    { id: "news", label: "Notícias", desc: "Resumo de eventos e notícias", icon: Newspaper, color: "bg-pastel-peach" },
    { id: "alerts", label: "Alertas", desc: "Notificações personalizadas", icon: Bell, color: "bg-pastel-pink" },
    { id: "reports", label: "Relatórios", desc: "Geração automática de relatórios", icon: FileText, color: "bg-pastel-peach" },
  ];

  const traits = [
    { id: "friendly", label: "Amigável", icon: MessageSquare, color: "bg-pastel-blue" },
    { id: "professional", label: "Profissional", icon: Briefcase, color: "bg-pastel-purple" },
    { id: "patient", label: "Paciente", icon: Clock, color: "bg-pastel-green" },
    { id: "technical", label: "Técnico", icon: FileCode, color: "bg-pastel-pink" },
    { id: "motivational", label: "Motivador", icon: Target, color: "bg-pastel-peach" },
    { id: "empathetic", label: "Empático", icon: Heart, color: "bg-pastel-pink" },
    { id: "analytical", label: "Analítico", icon: ChartLine, color: "bg-pastel-blue" },
    { id: "creative", label: "Criativo", icon: Sparkles, color: "bg-pastel-yellow" },
  ];

  const steps = [
    { number: 1, label: "Informações Básicas" },
    { number: 2, label: "Configuração" },
    { number: 3, label: "Personalização" },
    { number: 4, label: "Revisão" }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />
      
      <main className="flex-1">
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon" className="rounded-xl" onClick={() => navigate("/meus-agentes")}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-2xl font-bold">Criar Novo Agente IA</h2>
                  <p className="text-sm text-muted-foreground mt-1">Configure seu assistente inteligente personalizado</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="rounded-xl">
                  <Save className="h-5 w-5 mr-2" />
                  Salvar Rascunho
                </Button>
                <Button className="rounded-xl">
                  <Rocket className="h-5 w-5 mr-2" />
                  Publicar Agente
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-6 border-b border-border bg-card">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-colors ${
                    currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-secondary/20 text-muted-foreground'
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

        <div className="px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2 space-y-8">
              
              {/* Informações Básicas */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Informações Básicas</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Nome do Agente</Label>
                    <Input placeholder="Ex: Assistente Financeiro Pro" className="rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Descrição Curta</Label>
                    <Textarea placeholder="Descreva brevemente o propósito do seu agente..." className="rounded-xl min-h-[120px]" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Palavras-chave</Label>
                    <Input placeholder="Ex: finanças, investimentos, análise" className="rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Avatar do Agente */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Avatar do Agente</h3>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" className="rounded-xl">
                      <Upload className="h-4 w-4 mr-2" />
                      Fazer Upload
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">PNG, JPG até 2MB. Recomendado: 400x400px</p>
                  </div>
                </div>
              </div>

              {/* Área & Segmento */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-green flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Área & Segmento</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Área Principal</Label>
                    <Select defaultValue="finance">
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Finanças</SelectItem>
                        <SelectItem value="tech">Tecnologia</SelectItem>
                        <SelectItem value="health">Saúde</SelectItem>
                        <SelectItem value="education">Educação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Segmento Específico</Label>
                    <Select defaultValue="investment">
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="investment">Investimentos</SelectItem>
                        <SelectItem value="crypto">Criptomoedas</SelectItem>
                        <SelectItem value="stocks">Ações</SelectItem>
                        <SelectItem value="funds">Fundos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Base de Conhecimento */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-pink flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Base de Conhecimento</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Upload de Documentos</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Arraste arquivos ou clique para fazer upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT até 10MB</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Instruções Personalizadas</Label>
                    <Textarea 
                      placeholder="Adicione instruções específicas sobre como o agente deve se comportar..."
                      className="rounded-xl min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              {/* Capacidades Especializadas */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Capacidades Especializadas</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Selecione as habilidades principais do seu agente</p>
                <div className="grid grid-cols-2 gap-4">
                  {capabilities.map((cap) => {
                    const Icon = cap.icon;
                    const isSelected = selectedCapabilities.includes(cap.id);
                    return (
                      <button
                        key={cap.id}
                        onClick={() => toggleCapability(cap.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${cap.color}`}>
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1">{cap.label}</h4>
                            <p className="text-xs text-muted-foreground">{cap.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Configurações de Voz */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-purple flex items-center justify-center">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Configurações de Voz</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Voz</Label>
                    <Select defaultValue="voice1">
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="voice1">Voz Feminina - Profissional</SelectItem>
                        <SelectItem value="voice2">Voz Masculina - Formal</SelectItem>
                        <SelectItem value="voice3">Voz Feminina - Amigável</SelectItem>
                        <SelectItem value="voice4">Voz Masculina - Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-semibold">Velocidade da Fala</Label>
                      <span className="text-sm text-muted-foreground">{voiceSpeed[0]}%</span>
                    </div>
                    <Slider
                      value={voiceSpeed}
                      onValueChange={setVoiceSpeed}
                      min={50}
                      max={150}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Lenta</span>
                      <span>Normal</span>
                      <span>Rápida</span>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" className="rounded-xl">
                      <Play className="h-4 w-4 mr-2" />
                      Testar Voz
                    </Button>
                  </div>
                </div>
              </div>

              {/* Estilo de Resposta */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-green flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Estilo de Resposta</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Formato de Resposta</Label>
                    <RadioGroup value={responseFormat} onValueChange={setResponseFormat}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="structured" id="structured" />
                          <Label htmlFor="structured" className="flex-1 cursor-pointer">
                            <span className="font-medium">Estruturado</span>
                            <p className="text-xs text-muted-foreground mt-1">Respostas organizadas em tópicos e seções</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="conversational" id="conversational" />
                          <Label htmlFor="conversational" className="flex-1 cursor-pointer">
                            <span className="font-medium">Conversacional</span>
                            <p className="text-xs text-muted-foreground mt-1">Respostas naturais e fluidas</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="concise" id="concise" />
                          <Label htmlFor="concise" className="flex-1 cursor-pointer">
                            <span className="font-medium">Conciso</span>
                            <p className="text-xs text-muted-foreground mt-1">Respostas diretas e objetivas</p>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Tamanho da Resposta</Label>
                    <div className="flex gap-3">
                      <Button
                        variant={responseSize === "short" ? "default" : "outline"}
                        onClick={() => setResponseSize("short")}
                        className="flex-1 rounded-xl"
                      >
                        Curta
                      </Button>
                      <Button
                        variant={responseSize === "medium" ? "default" : "outline"}
                        onClick={() => setResponseSize("medium")}
                        className="flex-1 rounded-xl"
                      >
                        Média
                      </Button>
                      <Button
                        variant={responseSize === "long" ? "default" : "outline"}
                        onClick={() => setResponseSize("long")}
                        className="flex-1 rounded-xl"
                      >
                        Longa
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estilo de Escrita */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-peach flex items-center justify-center">
                    <FileCode className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Estilo de Escrita</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Nível de Vocabulário</Label>
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
                    <Label className="text-sm font-semibold mb-3 block">Formatação de Texto</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-blue flex items-center justify-center">
                            <Bold className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Negrito para ênfase</span>
                        </div>
                        <Switch checked={useBold} onCheckedChange={setUseBold} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-purple flex items-center justify-center">
                            <Italic className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Itálico para citações</span>
                        </div>
                        <Switch checked={useItalic} onCheckedChange={setUseItalic} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-green flex items-center justify-center">
                            <LinkIcon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Links para referências</span>
                        </div>
                        <Switch checked={useLinks} onCheckedChange={setUseLinks} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-pastel-pink flex items-center justify-center">
                            <List className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">Listas estruturadas</span>
                        </div>
                        <Switch checked={useLists} onCheckedChange={setUseLists} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traços de Personalidade */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-yellow flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Traços de Personalidade</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Defina a personalidade do seu agente</p>
                <div className="grid grid-cols-2 gap-4">
                  {traits.map((trait) => {
                    const Icon = trait.icon;
                    const isSelected = selectedTraits.includes(trait.id);
                    return (
                      <button
                        key={trait.id}
                        onClick={() => toggleTrait(trait.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${trait.color}`}>
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-semibold text-sm">{trait.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Preview Lateral */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Preview do Agente</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border mb-4">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h4 className="font-bold text-lg">Assistente Financeiro</h4>
                    <p className="text-sm text-muted-foreground mt-1">Seu assistente inteligente</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-3">CAPACIDADES</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCapabilities.map((capId) => {
                        const cap = capabilities.find(c => c.id === capId);
                        if (!cap) return null;
                        return (
                          <span key={capId} className="px-3 py-1 rounded-full bg-muted text-xs font-medium border border-border">
                            {cap.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-3">PERSONALIDADE</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedTraits.map((traitId) => {
                        const trait = traits.find(t => t.id === traitId);
                        if (!trait) return null;
                        return (
                          <span key={traitId} className="px-3 py-1 rounded-full bg-muted text-xs font-medium border border-border">
                            {trait.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-2">CONFIGURAÇÕES</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Formato:</span>
                        <span className="font-medium capitalize">{responseFormat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tamanho:</span>
                        <span className="font-medium capitalize">{responseSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vocabulário:</span>
                        <span className="font-medium capitalize">{vocabulary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Velocidade:</span>
                        <span className="font-medium">{voiceSpeed[0]}%</span>
                      </div>
                    </div>
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
