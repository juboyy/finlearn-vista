import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCw, Camera, Video, Eye, Hand, Smile, Palette, Handshake, CheckCircle, Circle, Lightbulb, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";

export function CriarAgentePersonalidade() {
  const navigate = useNavigate();
  
  // State for selected reasoning traits
  const [selectedReasoning, setSelectedReasoning] = useState<string[]>([
    "deep-analysis",
    "structured",
  ]);

  // State for communication tone sliders
  const [formality, setFormality] = useState([70]);
  const [empathy, setEmpathy] = useState([85]);
  const [assertiveness, setAssertiveness] = useState([60]);
  const [enthusiasm, setEnthusiasm] = useState([55]);

  // State for video and visual settings
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [eyeContact, setEyeContact] = useState(true);
  const [handGestures, setHandGestures] = useState(true);
  const [headMovements, setHeadMovements] = useState(true);
  const [facialExpressions, setFacialExpressions] = useState(true);
  const [customBackground, setCustomBackground] = useState(false);

  const reasoningTraits = [
    {
      id: "deep-analysis",
      label: "Análise Profunda",
      desc: "Avalia múltiplos cenários antes de responder",
      color: "pastel-indigo",
      borderColor: "border-indigo-300",
      textColor: "text-indigo-600",
    },
    {
      id: "structured",
      label: "Estruturado",
      desc: "Organiza informações de forma lógica e sequencial",
      color: "pastel-blue",
      borderColor: "border-sky-300",
      textColor: "text-sky-600",
    },
    {
      id: "contextual",
      label: "Contextual",
      desc: "Considera histórico e contexto do mercado",
      color: "pastel-purple",
      borderColor: "border-purple-300",
      textColor: "text-purple-600",
    },
    {
      id: "strategic",
      label: "Estratégico",
      desc: "Foca em objetivos de longo prazo e tem visão holística.",
      color: "pastel-pink",
      borderColor: "border-pink-300",
      textColor: "text-pink-600",
    },
    {
      id: "comparative",
      label: "Comparativo",
      desc: "Compara alternativas e cenários",
      color: "pastel-green",
      borderColor: "border-emerald-300",
      textColor: "text-emerald-600",
    },
    {
      id: "predictive",
      label: "Preditivo",
      desc: "Antecipa tendências e resultados",
      color: "pastel-orange",
      borderColor: "border-orange-300",
      textColor: "text-orange-600",
    },
  ];

  const toggleReasoning = (id: string) => {
    setSelectedReasoning((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarFix />

      <main className="flex-1">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                    onClick={() => navigate("/criar-agente")}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Criar Novo Agente IA
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure seu assistente inteligente personalizado
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="rounded-lg">
                  Salvar Rascunho
                </Button>
                <Button className="rounded-lg bg-primary hover:bg-primary/80">
                  Publicar Agente
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="px-8 py-4 bg-muted/50">
          <div className="flex items-center justify-between max-w-5xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <CheckCircle className="text-primary-foreground" size={16} />
              </div>
              <span className="text-sm font-medium text-foreground">
                Informações Básicas
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-primary mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <CheckCircle className="text-primary-foreground" size={16} />
              </div>
              <span className="text-sm font-medium text-foreground">
                Especialização
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-primary mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">3</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                Personalidade
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                <span className="text-muted-foreground text-xs font-bold">4</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Finalização
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Personality and Tone Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Reasoning Section */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-pastel-purple flex items-center justify-center">
                  <Lightbulb className="text-purple-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Planejamento e Raciocínio
                </h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {reasoningTraits.map((trait) => {
                    const isSelected = selectedReasoning.includes(trait.id);
                    return (
                      <div
                        key={trait.id}
                        onClick={() => toggleReasoning(trait.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all duration-300 ${
                          isSelected
                            ? `bg-${trait.color} ${trait.borderColor}`
                            : "bg-muted border-border hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-sm font-semibold ${
                              isSelected ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {trait.label}
                          </span>
                          {isSelected ? (
                            <CheckCircle className={trait.textColor} size={18} />
                          ) : (
                            <Circle className="text-slate-400" size={18} />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{trait.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="p-4 bg-pastel-yellow rounded-lg border border-amber-200">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="text-amber-600 mt-0.5" size={16} />
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Dica</p>
                      <p className="text-xs text-muted-foreground">
                        Selecione até 3 características de raciocínio que definem como o
                        agente processará e estruturará as informações financeiras.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Tone Section */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-pastel-pink flex items-center justify-center">
                  <Handshake className="text-pink-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Tom de Comunicação</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Estilo de Comunicação
                  </Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal e Técnico</SelectItem>
                      <SelectItem value="professional">
                        Profissional mas Acessível
                      </SelectItem>
                      <SelectItem value="casual">Casual e Conversacional</SelectItem>
                      <SelectItem value="educational">Educativo e Didático</SelectItem>
                      <SelectItem value="motivational">
                        Motivacional e Inspirador
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-3">
                    Parâmetros de Tom
                  </Label>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Formalidade</span>
                        <span className="text-xs font-semibold text-foreground">
                          {formality[0]}%
                        </span>
                      </div>
                      <Slider
                        value={formality}
                        onValueChange={setFormality}
                        max={100}
                        step={1}
                        className="accent-indigo-600"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Casual</span>
                        <span className="text-xs text-muted-foreground">Formal</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Empatia</span>
                        <span className="text-xs font-semibold text-foreground">
                          {empathy[0]}%
                        </span>
                      </div>
                      <Slider
                        value={empathy}
                        onValueChange={setEmpathy}
                        max={100}
                        step={1}
                        className="accent-sky-600"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Objetiva</span>
                        <span className="text-xs text-muted-foreground">Empática</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">
                          Assertividade
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {assertiveness[0]}%
                        </span>
                      </div>
                      <Slider
                        value={assertiveness}
                        onValueChange={setAssertiveness}
                        max={100}
                        step={1}
                        className="accent-pink-600"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Suave</span>
                        <span className="text-xs text-muted-foreground">Direta</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Entusiasmo</span>
                        <span className="text-xs font-semibold text-foreground">
                          {enthusiasm[0]}%
                        </span>
                      </div>
                      <Slider
                        value={enthusiasm}
                        onValueChange={setEnthusiasm}
                        max={100}
                        step={1}
                        className="accent-emerald-600"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Neutro</span>
                        <span className="text-xs text-muted-foreground">
                          Entusiasmado
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Style Section */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Avatar Section */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-pastel-blue flex items-center justify-center">
                  <Eye className="text-sky-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Avatar do Agente</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-pastel-indigo overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/aa9c5553a4-38f116fe94f4340fac8d.png"
                        alt="Avatar do agente"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all duration-300">
                      <Camera className="text-primary-foreground" size={14} />
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Estilo do Avatar
                  </Label>
                  <Select defaultValue="female">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Profissional Masculino</SelectItem>
                      <SelectItem value="female">Profissional Feminino</SelectItem>
                      <SelectItem value="neutral">Neutro Moderno</SelectItem>
                      <SelectItem value="corporate">Ilustração Corporativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Expressão Facial
                  </Label>
                  <Select defaultValue="friendly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Sorriso Amigável</SelectItem>
                      <SelectItem value="neutral">Neutro Profissional</SelectItem>
                      <SelectItem value="confident">Confiante</SelectItem>
                      <SelectItem value="welcoming">Acolhedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-2 border-indigo-300 bg-pastel-indigo hover:bg-indigo-50"
                >
                  Galeria de Avatares
                </Button>
              </div>
            </div>

            {/* Live Video Section */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-pastel-pink flex items-center justify-center">
                  <Video className="text-pink-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Vídeo ao Vivo</h3>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-pastel-pink rounded-lg border-2 border-pink-300 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Video className="text-pink-600" size={20} />
                    <div>
                      <span className="text-sm font-medium text-foreground block">
                        Ativar Vídeo
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Avatar animado em tempo real
                      </span>
                    </div>
                  </div>
                  <Switch checked={videoEnabled} onCheckedChange={setVideoEnabled} />
                </label>
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Qualidade do Vídeo
                  </Label>
                  <Select defaultValue="fullhd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hd">HD (720p)</SelectItem>
                      <SelectItem value="fullhd">Full HD (1080p)</SelectItem>
                      <SelectItem value="4k">4K (2160p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Animação Facial
                  </Label>
                  <Select defaultValue="natural">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subtle">Sutil</SelectItem>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="expressive">Expressiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-3 bg-pastel-yellow rounded-lg border border-amber-200">
                  <div className="flex items-start space-x-2">
                    <Info className="text-amber-600 mt-0.5" size={14} />
                    <p className="text-xs text-muted-foreground">
                      Vídeo ao vivo requer mais recursos computacionais
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Settings Section */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-pastel-purple flex items-center justify-center">
                  <Palette className="text-purple-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Configurações Visuais
                </h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Eye className="text-indigo-600" size={18} />
                    <span className="text-sm text-foreground">Contato visual</span>
                  </div>
                  <Switch checked={eyeContact} onCheckedChange={setEyeContact} />
                </label>
                <label className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Hand className="text-emerald-600" size={18} />
                    <span className="text-sm text-foreground">Gestos manuais</span>
                  </div>
                  <Switch checked={handGestures} onCheckedChange={setHandGestures} />
                </label>
                <label className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Eye className="text-sky-600" size={18} />
                    <span className="text-sm text-foreground">Movimentos de cabeça</span>
                  </div>
                  <Switch
                    checked={headMovements}
                    onCheckedChange={setHeadMovements}
                  />
                </label>
                <label className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Smile className="text-amber-600" size={18} />
                    <span className="text-sm text-foreground">Expressões faciais</span>
                  </div>
                  <Switch
                    checked={facialExpressions}
                    onCheckedChange={setFacialExpressions}
                  />
                </label>
                <label className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Palette className="text-purple-600" size={18} />
                    <span className="text-sm text-foreground">Fundo personalizado</span>
                  </div>
                  <Switch
                    checked={customBackground}
                    onCheckedChange={setCustomBackground}
                  />
                </label>
                <div className="mt-4">
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Cenário de Fundo
                  </Label>
                  <Select defaultValue="office">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Escritório Moderno</SelectItem>
                      <SelectItem value="library">Biblioteca Corporativa</SelectItem>
                      <SelectItem value="meeting">Sala de Reuniões</SelectItem>
                      <SelectItem value="neutral">Fundo Neutro</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Style Section */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-pastel-blue flex items-center justify-center">
                <Handshake className="text-sky-600" size={20} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Estilo de Interação</h3>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Saudação Inicial
                </Label>
                <Select defaultValue="friendly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="friendly">Amigável</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="custom">Personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Uso de Perguntas
                </Label>
                <Select defaultValue="moderate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rare">Raramente</SelectItem>
                    <SelectItem value="moderate">Moderadamente</SelectItem>
                    <SelectItem value="frequent">Frequentemente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Proatividade
                </Label>
                <Select defaultValue="balanced">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reactive">Reativo</SelectItem>
                    <SelectItem value="balanced">Balanceado</SelectItem>
                    <SelectItem value="proactive">Proativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-semibold text-foreground mb-3">
                  Frequência de Sugestões
                </Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-pastel-indigo flex items-center justify-center">
                  <Eye className="text-indigo-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Preview da Personalidade
                </h3>
              </div>
              <Button variant="outline" size="sm">
                <RotateCw className="h-4 w-4 mr-2" />
                Gerar Nova Resposta
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-muted rounded-lg p-5 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-pastel-indigo flex items-center justify-center">
                    <Eye className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Usuário</p>
                    <p className="text-xs text-muted-foreground">Pergunta exemplo</p>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-sm text-foreground">
                    "Como posso diversificar meu portfólio de investimentos de forma
                    segura?"
                  </p>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-5 border border-border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-pastel-blue flex items-center justify-center">
                    <Lightbulb className="text-sky-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Assistente Financeiro Pro
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Resposta com personalidade configurada
                    </p>
                  </div>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-sm text-foreground leading-relaxed mb-3">
                    Olá! Ótima pergunta sobre diversificação. Vou te ajudar a entender
                    as melhores práticas:
                  </p>
                  <p className="text-sm text-foreground leading-relaxed mb-3">
                    <strong>Estratégias principais:</strong>
                  </p>
                  <ul className="space-y-2 text-sm text-foreground ml-4">
                    <li className="flex items-start">
                      <CheckCircle className="text-emerald-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>
                        Distribua seus investimentos entre <strong>renda fixa</strong>{" "}
                        (60-70%) e <strong>renda variável</strong> (30-40%)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-emerald-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>
                        Considere fundos imobiliários para diversificação adicional
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-emerald-600 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>
                        Mantenha uma reserva de emergência equivalente a 6 meses de
                        despesas
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-foreground leading-relaxed mt-3">
                    Gostaria que eu elaborasse um plano personalizado baseado no seu
                    perfil de risco?
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="bg-pastel-indigo rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="text-indigo-600" size={16} />
                  <span className="text-xs font-semibold text-foreground">
                    Formalidade
                  </span>
                </div>
                <p className="text-2xl font-bold text-indigo-600">{formality[0]}%</p>
                <p className="text-xs text-muted-foreground mt-1">Profissional</p>
              </div>
              <div className="bg-pastel-blue rounded-lg p-4 border border-sky-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Smile className="text-sky-600" size={16} />
                  <span className="text-xs font-semibold text-foreground">Empatia</span>
                </div>
                <p className="text-2xl font-bold text-sky-600">{empathy[0]}%</p>
                <p className="text-xs text-muted-foreground mt-1">Alta empatia</p>
              </div>
              <div className="bg-pastel-pink rounded-lg p-4 border border-pink-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Hand className="text-pink-600" size={16} />
                  <span className="text-xs font-semibold text-foreground">
                    Assertividade
                  </span>
                </div>
                <p className="text-2xl font-bold text-pink-600">{assertiveness[0]}%</p>
                <p className="text-xs text-muted-foreground mt-1">Equilibrada</p>
              </div>
              <div className="bg-pastel-green rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="text-emerald-600" size={16} />
                  <span className="text-xs font-semibold text-foreground">
                    Entusiasmo
                  </span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{enthusiasm[0]}%</p>
                <p className="text-xs text-muted-foreground mt-1">Moderado</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/criar-agente")}
              className="rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar: Especialização
            </Button>
            <Button className="rounded-lg bg-primary hover:bg-primary/80">
              Próximo: Finalização
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
