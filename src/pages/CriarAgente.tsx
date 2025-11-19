import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Save, Rocket, Info, Image, Briefcase, Brain, 
  Mic, Volume2, Users, AlertCircle, Check, Circle,
  ChartLine, Target, Shield, GraduationCap, 
  Newspaper, Bell, FileText, Clock, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const CriarAgente = () => {
  const navigate = useNavigate();
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    "analysis", "portfolio", "risk", "education", "reports"
  ]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([
    "friendly", "patient", "technical", "empathetic"
  ]);
  const [voiceSpeed, setVoiceSpeed] = useState([100]);
  const [complexity, setComplexity] = useState([60]);

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities(prev => 
      prev.includes(capability) 
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    );
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => 
      prev.includes(trait) 
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  const capabilities = [
    { id: "analysis", label: "Análise de Mercado", desc: "Tendências e insights", icon: ChartLine, color: "blue" },
    { id: "portfolio", label: "Gestão de Portfólio", desc: "Otimização e rebalanceamento", icon: Target, color: "green" },
    { id: "risk", label: "Análise de Risco", desc: "Avaliação e mitigação", icon: Shield, color: "pink" },
    { id: "prediction", label: "Previsões", desc: "Modelos preditivos", icon: Brain, color: "purple" },
    { id: "education", label: "Educação Financeira", desc: "Tutoriais e explicações", icon: GraduationCap, color: "purple" },
    { id: "news", label: "Notícias", desc: "Resumo de eventos", icon: Newspaper, color: "orange" },
    { id: "alerts", label: "Alertas", desc: "Notificações personalizadas", icon: Bell, color: "pink" },
    { id: "reports", label: "Relatórios", desc: "Geração automática", icon: FileText, color: "orange" },
  ];

  const traits = [
    { id: "friendly", label: "Amigável", icon: "😊" },
    { id: "professional", label: "Profissional", icon: "💼" },
    { id: "patient", label: "Paciente", icon: "⏱️" },
    { id: "technical", label: "Técnico", icon: "🔧" },
    { id: "motivational", label: "Motivador", icon: "🎯" },
    { id: "empathetic", label: "Empático", icon: "❤️" },
    { id: "analytical", label: "Analítico", icon: "📊" },
    { id: "creative", label: "Criativo", icon: "✨" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1">
        <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="icon" className="rounded-xl" onClick={() => navigate("/meus-agentes")}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
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
                <Button className="rounded-xl bg-[hsl(217,91%,85%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(217,91%,75%)]">
                  <Rocket className="h-4 w-4 mr-2" />
                  Publicar Agente
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-4 bg-card/50">
          <div className="flex items-center justify-between max-w-5xl">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[hsl(217,91%,85%)] flex items-center justify-center">
                <Check className="h-4 w-4 text-[hsl(220,15%,30%)]" />
              </div>
              <span className="text-sm font-medium text-foreground">Informações Básicas</span>
            </div>
            <div className="flex-1 h-0.5 bg-[hsl(217,91%,85%)] mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[hsl(217,91%,85%)] flex items-center justify-center">
                <span className="text-[hsl(220,15%,30%)] text-xs font-bold">2</span>
              </div>
              <span className="text-sm font-medium text-foreground">Especialização</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-secondary border-2 border-border flex items-center justify-center">
                <span className="text-muted-foreground text-xs font-bold">3</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">Personalidade</span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-secondary border-2 border-border flex items-center justify-center">
                <span className="text-muted-foreground text-xs font-bold">4</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">Finalização</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(270,60%,85%)] flex items-center justify-center">
                  <Info className="h-5 w-5 text-[hsl(270,60%,60%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Informações Básicas</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Nome do Agente</Label>
                  <Input type="text" placeholder="Ex: Assistente Financeiro Pro" className="w-full rounded-xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Função Principal</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultor">Consultor Financeiro</SelectItem>
                        <SelectItem value="analista">Analista de Investimentos</SelectItem>
                        <SelectItem value="gestor">Gestor de Portfólio</SelectItem>
                        <SelectItem value="educador">Educador Financeiro</SelectItem>
                        <SelectItem value="trading">Assistente de Trading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="block text-sm font-semibold text-foreground mb-2">Nível de Experiência</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iniciante">Iniciante</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                        <SelectItem value="especialista">Especialista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Descrição Curta</Label>
                  <Textarea rows={3} placeholder="Descreva brevemente o propósito e as capacidades do agente..." className="w-full rounded-xl resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(213,94%,88%)] flex items-center justify-center">
                  <Image className="h-5 w-5 text-[hsl(213,94%,60%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Avatar do Agente</h3>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <div className="w-full h-48 bg-secondary rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-[hsl(217,91%,85%)] transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-[hsl(213,94%,88%)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-10 w-10 text-[hsl(213,94%,60%)]" />
                    </div>
                    <p className="text-sm text-muted-foreground">Clique para fazer upload</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">PNG, JPG até 5MB</p>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-3">Estilo do Avatar</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="default" size="sm" className="rounded-lg bg-[hsl(270,60%,85%)] text-[hsl(270,60%,60%)] hover:bg-[hsl(270,60%,75%)] text-xs">
                      👔 Profissional
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs">
                      😊 Amigável
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs">
                      🤖 Futurista
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs">
                      ✨ Criativo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(350,89%,90%)] flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-[hsl(350,89%,70%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Área & Segmento</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Área de Atuação</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investimentos">Investimentos</SelectItem>
                      <SelectItem value="planejamento">Planejamento Financeiro</SelectItem>
                      <SelectItem value="educacao">Educação Financeira</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-3">Segmentos de Mercado</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1.5 bg-[hsl(213,94%,88%)] text-[hsl(220,15%,30%)] border-0">
                      Ações <button className="ml-2">×</button>
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1.5 bg-[hsl(142,71%,88%)] text-[hsl(220,15%,30%)] border-0">
                      Fundos <button className="ml-2">×</button>
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1.5 bg-[hsl(270,60%,85%)] text-[hsl(220,15%,30%)] border-0">
                      Renda Fixa <button className="ml-2">×</button>
                    </Badge>
                    <Button variant="outline" size="sm" className="rounded-full h-8 px-3">+ Adicionar</Button>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Público-Alvo</Label>
                  <Textarea rows={3} placeholder="Descreva o perfil do público que este agente irá atender..." className="rounded-xl resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(142,71%,88%)] flex items-center justify-center">
                  <Brain className="h-5 w-5 text-[hsl(142,71%,60%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Base de Conhecimento</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-3">Fontes de Dados</Label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 bg-secondary rounded-xl border border-border">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-[hsl(142,71%,60%)]" />
                        <span className="text-sm text-foreground">Dados históricos de mercado</span>
                      </div>
                      <Switch defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-secondary rounded-xl border border-border">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-[hsl(142,71%,60%)]" />
                        <span className="text-sm text-foreground">Análises de especialistas</span>
                      </div>
                      <Switch defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-secondary rounded-xl border border-border">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-foreground">Notícias em tempo real</span>
                      </div>
                      <Switch />
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-3">Documentos Personalizados</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-[hsl(217,91%,85%)] transition-all duration-300">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Arraste arquivos ou clique para fazer upload</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">PDF, DOC, TXT até 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[hsl(213,94%,88%)] flex items-center justify-center">
                <Target className="h-5 w-5 text-[hsl(213,94%,60%)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Capacidades Especializadas</h3>
                <p className="text-sm text-muted-foreground">Selecione as funcionalidades que o agente deve possuir</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {capabilities.map((cap) => {
                const isActive = selectedCapabilities.includes(cap.id);
                const Icon = cap.icon;
                const colorMap: Record<string, string> = {
                  blue: "hsl(213,94%,88%)", green: "hsl(142,71%,88%)", pink: "hsl(350,89%,90%)",
                  purple: "hsl(270,60%,85%)", orange: "hsl(25,95%,88%)"
                };
                const fgColorMap: Record<string, string> = {
                  blue: "hsl(213,94%,60%)", green: "hsl(142,71%,60%)", pink: "hsl(350,89%,70%)",
                  purple: "hsl(270,60%,60%)", orange: "hsl(25,95%,60%)"
                };

                return (
                  <div key={cap.id} onClick={() => toggleCapability(cap.id)} className="cursor-pointer">
                    <div className={`p-4 bg-secondary rounded-xl border-2 transition-all duration-300 ${isActive ? "border-[hsl(217,91%,85%)]" : "border-border hover:border-[hsl(217,91%,85%)]"}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: isActive ? colorMap[cap.color] : "hsl(var(--muted))" }}>
                          <Icon className="h-5 w-5" style={{ color: isActive ? fgColorMap[cap.color] : "hsl(var(--muted-foreground))" }} />
                        </div>
                        {isActive ? <CheckCircle className="h-5 w-5 text-[hsl(220,15%,30%)]" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <h4 className={`text-sm font-bold mb-1 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{cap.label}</h4>
                      <p className="text-xs text-muted-foreground">{cap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(270,60%,85%)] flex items-center justify-center">
                  <Mic className="h-5 w-5 text-[hsl(270,60%,60%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Configurações de Voz</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Tipo de Voz</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-secondary border-2 border-[hsl(217,91%,85%)] rounded-xl text-left transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="h-5 w-5 text-[hsl(220,15%,30%)]" />
                        <span className="text-sm font-bold text-foreground">Masculina</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Tom grave e profissional</p>
                    </button>
                    <button className="p-4 bg-secondary border-2 border-border rounded-xl text-left hover:border-[hsl(217,91%,85%)] transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-bold text-muted-foreground">Feminina</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Tom agudo e claro</p>
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Idioma Principal</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">🇧🇷 Português (BR)</SelectItem>
                      <SelectItem value="en-us">🇺🇸 English (US)</SelectItem>
                      <SelectItem value="es">🇪🇸 Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-semibold text-foreground">Velocidade da Fala</Label>
                    <span className="text-xs text-muted-foreground">{voiceSpeed[0]}%</span>
                  </div>
                  <Slider value={voiceSpeed} onValueChange={setVoiceSpeed} min={50} max={150} step={10} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Lento</span><span>Normal</span><span>Rápido</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(25,95%,88%)] flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-[hsl(25,95%,60%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Estilo de Resposta</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Tamanho das Respostas</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concisas (2-3 frases)</SelectItem>
                      <SelectItem value="balanced">Balanceadas (1 parágrafo)</SelectItem>
                      <SelectItem value="detailed">Detalhadas (múltiplos parágrafos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-semibold text-foreground">Complexidade Técnica</Label>
                    <span className="text-xs text-muted-foreground">{complexity[0]}%</span>
                  </div>
                  <Slider value={complexity} onValueChange={setComplexity} min={0} max={100} step={10} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Simples</span><span>Intermediário</span><span>Avançado</span>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-3">Recursos de Formatação</Label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 bg-secondary rounded-xl border border-border">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-foreground font-bold">B</span>
                        <span className="text-sm text-foreground">Negrito para ênfase</span>
                      </div>
                      <Switch defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-secondary rounded-xl border border-border">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-foreground">•</span>
                        <span className="text-sm text-foreground">Listas e bullets</span>
                      </div>
                      <Switch defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-secondary rounded-xl border border-border">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-foreground">⊞</span>
                        <span className="text-sm text-foreground">Tabelas de dados</span>
                      </div>
                      <Switch />
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">Exemplo de Texto Gerado</Label>
                  <div className="p-4 bg-secondary rounded-xl border border-border">
                    <p className="text-sm text-foreground leading-relaxed">
                      "Olá! Analisei seu portfólio e identifiquei <strong>3 oportunidades</strong> de otimização. Com base no seu perfil de risco <span className="text-[hsl(217,91%,85%)]">moderado</span>, recomendo diversificar em fundos imobiliários para equilibrar a exposição em renda variável."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[hsl(350,89%,90%)] flex items-center justify-center">
                <Users className="h-5 w-5 text-[hsl(350,89%,70%)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Traços de Personalidade</h3>
                <p className="text-sm text-muted-foreground">Defina como o agente deve se comportar e interagir</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {traits.map((trait) => {
                const isActive = selectedTraits.includes(trait.id);
                return (
                  <div key={trait.id} onClick={() => toggleTrait(trait.id)} className="cursor-pointer">
                    <div className={`p-4 bg-secondary rounded-xl border-2 transition-all duration-300 text-center ${isActive ? "border-[hsl(217,91%,85%)]" : "border-border hover:border-[hsl(217,91%,85%)]"}`}>
                      <div className="text-3xl mb-2">{trait.icon}</div>
                      <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{trait.label}</span>
                      <div className="mt-2">
                        {isActive ? <CheckCircle className="h-5 w-5 text-[hsl(220,15%,30%)] mx-auto" /> : <Circle className="h-5 w-5 text-muted-foreground mx-auto" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(142,71%,88%)] flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-[hsl(142,71%,60%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Preview do Agente</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-secondary rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[hsl(213,94%,88%)] flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-[hsl(213,94%,60%)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-bold text-foreground">Assistente Financeiro Pro</h4>
                      <Badge variant="secondary" className="rounded-full text-xs bg-[hsl(142,71%,88%)] text-[hsl(142,71%,40%)] border-0">Online</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Olá! Sou seu assistente financeiro especializado. Como posso ajudá-lo hoje?</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="rounded-full text-xs">Analisar Portfólio</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-xs">Recomendar Investimentos</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-xs">Avaliar Riscos</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-[hsl(213,94%,60%)]" />
                      <span className="text-sm font-medium text-foreground">Capacidades Ativas</span>
                    </div>
                    <Badge variant="secondary" className="rounded-full bg-[hsl(213,94%,88%)] text-[hsl(220,15%,30%)] border-0">{selectedCapabilities.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-[hsl(350,89%,70%)]" />
                      <span className="text-sm font-medium text-foreground">Traços de Personalidade</span>
                    </div>
                    <Badge variant="secondary" className="rounded-full bg-[hsl(350,89%,90%)] text-[hsl(220,15%,30%)] border-0">{selectedTraits.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-[hsl(25,95%,60%)]" />
                      <span className="text-sm font-medium text-foreground">Tempo de Resposta</span>
                    </div>
                    <Badge variant="secondary" className="rounded-full bg-[hsl(25,95%,88%)] text-[hsl(220,15%,30%)] border-0">~2s</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(213,94%,88%)] flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-[hsl(213,94%,60%)]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Informações</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[hsl(142,71%,88%)]/30 rounded-xl border border-[hsl(142,71%,88%)]">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-[hsl(142,71%,60%)]" />
                    <span className="text-xs font-bold text-foreground">Campos Obrigatórios</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Todos preenchidos</p>
                </div>

                <div className="p-4 bg-[hsl(213,94%,88%)]/30 rounded-xl border border-[hsl(213,94%,88%)]">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-4 w-4 text-[hsl(213,94%,60%)]" />
                    <span className="text-xs font-bold text-foreground">Modelo de IA</span>
                  </div>
                  <p className="text-xs text-muted-foreground">GPT-4 Turbo</p>
                </div>

                <div className="p-4 bg-[hsl(25,95%,88%)]/30 rounded-xl border border-[hsl(25,95%,88%)]">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-[hsl(25,95%,60%)]" />
                    <span className="text-xs font-bold text-foreground">Estimativa de Custo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">~R$ 0,50/consulta</p>
                </div>

                <div className="bg-[hsl(213,94%,88%)]/50 rounded-2xl border border-[hsl(213,94%,88%)] p-5">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl">✨</span>
                    <h4 className="text-sm font-bold text-foreground">Status do Agente</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Seu agente está pronto para ser publicado!</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[hsl(217,91%,85%)] rounded-full"></div>
                    </div>
                    <span className="text-xs text-foreground font-bold">100%</span>
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
