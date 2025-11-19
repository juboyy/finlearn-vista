import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Rocket, Info, ImageIcon, Briefcase, Brain, Mic, AlertCircle, CheckCircle, Circle, ChartLine, Target, Shield, GraduationCap, Newspaper, Bell, FileText, Upload, Play, Bold, Italic, Link, List, Hash, FileCode, MessageSquare, Keyboard, Sparkles, Star, Users, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CriarAgente = () => {
  const navigate = useNavigate();
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(["analysis", "portfolio", "risk", "education", "reports"]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(["friendly", "patient", "technical", "empathetic"]);
  const [voiceSpeed, setVoiceSpeed] = useState([100]);
  const [responseFormat, setResponseFormat] = useState("structured");
  const [responseSize, setResponseSize] = useState("medium");
  const [vocabulary, setVocabulary] = useState("intermediate");

  const toggleCapability = (capability: string) => {
    setSelectedCapabilities(prev => prev.includes(capability) ? prev.filter(c => c !== capability) : [...prev, capability]);
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]);
  };

  const capabilities = [
    { id: "analysis", label: "Análise de Mercado", desc: "Tendências e insights do mercado financeiro", icon: ChartLine, color: "blue" },
    { id: "portfolio", label: "Gestão de Portfólio", desc: "Otimização e rebalanceamento de ativos", icon: Target, color: "green" },
    { id: "risk", label: "Análise de Risco", desc: "Avaliação e mitigação de riscos", icon: Shield, color: "pink" },
    { id: "prediction", label: "Previsões", desc: "Modelos preditivos e forecasting", icon: Brain, color: "purple" },
    { id: "education", label: "Educação Financeira", desc: "Tutoriais e explicações didáticas", icon: GraduationCap, color: "purple" },
    { id: "news", label: "Notícias", desc: "Resumo de eventos e notícias", icon: Newspaper, color: "orange" },
    { id: "alerts", label: "Alertas", desc: "Notificações personalizadas", icon: Bell, color: "pink" },
    { id: "reports", label: "Relatórios", desc: "Geração automática de relatórios", icon: FileText, color: "orange" },
  ];

  const traits = [
    { id: "friendly", label: "Amigável", icon: MessageSquare },
    { id: "professional", label: "Profissional", icon: Briefcase },
    { id: "patient", label: "Paciente", icon: Clock },
    { id: "technical", label: "Técnico", icon: FileCode },
    { id: "motivational", label: "Motivador", icon: Target },
    { id: "empathetic", label: "Empático", icon: Heart },
    { id: "analytical", label: "Analítico", icon: ChartLine },
    { id: "creative", label: "Criativo", icon: Sparkles },
  ];

  return (
    <div className="flex min-h-screen bg-background">
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
                <Button variant="outline" className="rounded-xl"><Save className="h-5 w-5 mr-2" />Salvar Rascunho</Button>
                <Button className="rounded-xl"><Rocket className="h-5 w-5 mr-2" />Publicar Agente</Button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-6 border-b border-border bg-card">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {[1, 2, 3, 4].map((num, idx) => (
              <div key={num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 ${num === 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{num}</div>
                  <span className={`text-sm font-medium ${num === 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {num === 1 ? 'Informações Básicas' : num === 2 ? 'Configuração' : num === 3 ? 'Personalização' : 'Revisão'}
                  </span>
                </div>
                {idx < 3 && <div className="flex-1 h-1 bg-border mx-4 mt-[-20px]"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">Informações Básicas</h3>
                </div>
                <div className="space-y-5">
                  <div><Label className="text-sm font-semibold mb-2 block">Nome do Agente</Label><Input placeholder="Ex: Assistente Financeiro Pro" className="rounded-xl" /></div>
                  <div><Label className="text-sm font-semibold mb-2 block">Descrição Curta</Label><Textarea placeholder="Descreva brevemente..." className="rounded-xl min-h-[120px]" /></div>
                  <div><Label className="text-sm font-semibold mb-2 block">Palavras-chave</Label><Input placeholder="Ex: finanças, investimentos" className="rounded-xl" /></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">Preview do Agente</h3>
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
