import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronRight, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function CriarAgente() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mainFunction: "",
    experienceLevel: "",
    shortDescription: "",
    avatarStyle: "professional",
    area: "",
    segments: [] as string[],
    targetAudience: [] as string[],
    technicalKnowledge: [] as string[],
    certifications: [] as string[],
    experienceYears: 5,
    personalityTraits: "professional",
    communicationTone: "",
    formality: 50,
    empathy: 50,
    assertiveness: 50,
    responseFormat: "structured",
    responseSize: "medium",
    useEmojis: false,
    includeExamples: false,
    addAnalogies: false,
    voiceType: "masculine",
    language: "pt-BR",
    speechSpeed: 1.0,
    voiceTone: "grave",
    vocabularyComplexity: "intermediate",
    useBold: false,
    useLists: false,
    useTables: false,
  });

  const steps = [
    { number: 1, title: "Informações Básicas" },
    { number: 2, title: "Especialização" },
    { number: 3, title: "Personalidade" },
    { number: 4, title: "Finalização" },
  ];

  const handleSaveDraft = () => {
    toast.success("Rascunho salvo com sucesso!");
  };

  const handlePublish = () => {
    toast.success("Agente publicado com sucesso!");
    navigate("/meus-agentes");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Nome do Agente</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Assistente Financeiro Pro"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="mainFunction">Função Principal</Label>
              <Select
                value={formData.mainFunction}
                onValueChange={(value) => setFormData({ ...formData, mainFunction: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultor">Consultor Financeiro</SelectItem>
                  <SelectItem value="analista">Analista de Investimentos</SelectItem>
                  <SelectItem value="gestor">Gestor de Portfólio</SelectItem>
                  <SelectItem value="educador">Educador Financeiro</SelectItem>
                  <SelectItem value="trader">Assistente de Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experienceLevel">Nível de Experiência</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                  <SelectItem value="especialista">Especialista</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Descrição Curta</Label>
              <Textarea
                id="description"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Descreva brevemente o propósito do agente..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label>Estilo do Avatar</Label>
              <RadioGroup
                value={formData.avatarStyle}
                onValueChange={(value) => setFormData({ ...formData, avatarStyle: value })}
                className="mt-2 space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="font-normal cursor-pointer">Profissional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly" className="font-normal cursor-pointer">Amigável</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="futuristic" id="futuristic" />
                  <Label htmlFor="futuristic" className="font-normal cursor-pointer">Futurista</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="area">Área de Atuação</Label>
              <Select
                value={formData.area}
                onValueChange={(value) => setFormData({ ...formData, area: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mercado">Mercado Financeiro</SelectItem>
                  <SelectItem value="pagamentos">Meios de Pagamento</SelectItem>
                  <SelectItem value="patrimonial">Planejamento Patrimonial</SelectItem>
                  <SelectItem value="educacao">Educação Financeira</SelectItem>
                  <SelectItem value="credito">Análise de Crédito</SelectItem>
                  <SelectItem value="riscos">Gestão de Riscos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Segmentos de Especialização</Label>
              <div className="mt-2 space-y-2">
                {["Ações & Renda Variável", "Fundos de Investimento", "Renda Fixa", "Derivativos"].map((segment) => (
                  <div key={segment} className="flex items-center space-x-2">
                    <Checkbox
                      id={segment}
                      checked={formData.segments.includes(segment)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, segments: [...formData.segments, segment] });
                        } else {
                          setFormData({ ...formData, segments: formData.segments.filter((s) => s !== segment) });
                        }
                      }}
                    />
                    <Label htmlFor={segment} className="font-normal cursor-pointer">{segment}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Público-Alvo</Label>
              <div className="mt-2 space-y-2">
                {["Investidores Iniciantes", "Investidores Intermediários", "Investidores Avançados", "Traders Profissionais"].map((audience) => (
                  <div key={audience} className="flex items-center space-x-2">
                    <Checkbox
                      id={audience}
                      checked={formData.targetAudience.includes(audience)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, targetAudience: [...formData.targetAudience, audience] });
                        } else {
                          setFormData({ ...formData, targetAudience: formData.targetAudience.filter((a) => a !== audience) });
                        }
                      }}
                    />
                    <Label htmlFor={audience} className="font-normal cursor-pointer">{audience}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Conhecimentos Principais</Label>
              <div className="mt-2 space-y-2">
                {["Análise Fundamentalista", "Análise Técnica", "Análise Quantitativa", "Gestão de Risco", "Macroeconomia", "Finanças Comportamentais"].map((knowledge) => (
                  <div key={knowledge} className="flex items-center space-x-2">
                    <Checkbox
                      id={knowledge}
                      checked={formData.technicalKnowledge.includes(knowledge)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, technicalKnowledge: [...formData.technicalKnowledge, knowledge] });
                        } else {
                          setFormData({ ...formData, technicalKnowledge: formData.technicalKnowledge.filter((k) => k !== knowledge) });
                        }
                      }}
                    />
                    <Label htmlFor={knowledge} className="font-normal cursor-pointer">{knowledge}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Anos de Experiência Simulada: {formData.experienceYears} anos</Label>
              <Slider
                value={[formData.experienceYears]}
                onValueChange={(value) => setFormData({ ...formData, experienceYears: value[0] })}
                min={1}
                max={30}
                step={1}
                className="mt-4"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Traços de Personalidade</Label>
              <RadioGroup
                value={formData.personalityTraits}
                onValueChange={(value) => setFormData({ ...formData, personalityTraits: value })}
                className="mt-2 space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="professional" id="trait-professional" />
                  <div>
                    <Label htmlFor="trait-professional" className="font-normal cursor-pointer">Profissional</Label>
                    <p className="text-sm text-muted-foreground">Formal, objetivo e focado em resultados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="friendly" id="trait-friendly" />
                  <div>
                    <Label htmlFor="trait-friendly" className="font-normal cursor-pointer">Amigável</Label>
                    <p className="text-sm text-muted-foreground">Caloroso, acessível e empático</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="analytical" id="trait-analytical" />
                  <div>
                    <Label htmlFor="trait-analytical" className="font-normal cursor-pointer">Analítico</Label>
                    <p className="text-sm text-muted-foreground">Detalhista, lógico e baseado em dados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="creative" id="trait-creative" />
                  <div>
                    <Label htmlFor="trait-creative" className="font-normal cursor-pointer">Criativo</Label>
                    <p className="text-sm text-muted-foreground">Inovador, flexível e visionário</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="communicationTone">Tom de Comunicação</Label>
              <Select
                value={formData.communicationTone}
                onValueChange={(value) => setFormData({ ...formData, communicationTone: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o tom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal e Técnico</SelectItem>
                  <SelectItem value="professional">Profissional mas Acessível</SelectItem>
                  <SelectItem value="casual">Casual e Conversacional</SelectItem>
                  <SelectItem value="educational">Educativo e Didático</SelectItem>
                  <SelectItem value="motivational">Motivacional e Inspirador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Formalidade</Label>
              <div className="flex items-center justify-between mt-2 mb-2">
                <span className="text-sm text-muted-foreground">Casual</span>
                <span className="text-sm text-muted-foreground">Formal</span>
              </div>
              <Slider
                value={[formData.formality]}
                onValueChange={(value) => setFormData({ ...formData, formality: value[0] })}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div>
              <Label>Empatia</Label>
              <div className="flex items-center justify-between mt-2 mb-2">
                <span className="text-sm text-muted-foreground">Baixa</span>
                <span className="text-sm text-muted-foreground">Alta</span>
              </div>
              <Slider
                value={[formData.empathy]}
                onValueChange={(value) => setFormData({ ...formData, empathy: value[0] })}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div>
              <Label>Assertividade</Label>
              <div className="flex items-center justify-between mt-2 mb-2">
                <span className="text-sm text-muted-foreground">Suave</span>
                <span className="text-sm text-muted-foreground">Direta</span>
              </div>
              <Slider
                value={[formData.assertiveness]}
                onValueChange={(value) => setFormData({ ...formData, assertiveness: value[0] })}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div>
              <Label>Formato de Resposta</Label>
              <RadioGroup
                value={formData.responseFormat}
                onValueChange={(value) => setFormData({ ...formData, responseFormat: value })}
                className="mt-2 space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="structured" id="structured" />
                  <div>
                    <Label htmlFor="structured" className="font-normal cursor-pointer">Estruturado</Label>
                    <p className="text-sm text-muted-foreground">Tópicos, listas e seções</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="narrative" id="narrative" />
                  <div>
                    <Label htmlFor="narrative" className="font-normal cursor-pointer">Narrativo</Label>
                    <p className="text-sm text-muted-foreground">Fluxo contínuo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <div>
                    <Label htmlFor="mixed" className="font-normal cursor-pointer">Misto</Label>
                    <p className="text-sm text-muted-foreground">Adaptável ao contexto</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Tamanho das Respostas</Label>
              <RadioGroup
                value={formData.responseSize}
                onValueChange={(value) => setFormData({ ...formData, responseSize: value })}
                className="mt-2 flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="concise" id="concise" />
                  <Label htmlFor="concise" className="font-normal cursor-pointer">Concisa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="font-normal cursor-pointer">Média</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="detailed" id="detailed" />
                  <Label htmlFor="detailed" className="font-normal cursor-pointer">Detalhada</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Recursos Adicionais</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useEmojis"
                    checked={formData.useEmojis}
                    onCheckedChange={(checked) => setFormData({ ...formData, useEmojis: checked as boolean })}
                  />
                  <Label htmlFor="useEmojis" className="font-normal cursor-pointer">Usar emojis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeExamples"
                    checked={formData.includeExamples}
                    onCheckedChange={(checked) => setFormData({ ...formData, includeExamples: checked as boolean })}
                  />
                  <Label htmlFor="includeExamples" className="font-normal cursor-pointer">Incluir exemplos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="addAnalogies"
                    checked={formData.addAnalogies}
                    onCheckedChange={(checked) => setFormData({ ...formData, addAnalogies: checked as boolean })}
                  />
                  <Label htmlFor="addAnalogies" className="font-normal cursor-pointer">Adicionar analogias</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Tipo de Voz</Label>
              <RadioGroup
                value={formData.voiceType}
                onValueChange={(value) => setFormData({ ...formData, voiceType: value })}
                className="mt-2 space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="masculine" id="masculine" />
                  <div>
                    <Label htmlFor="masculine" className="font-normal cursor-pointer">Masculina</Label>
                    <p className="text-sm text-muted-foreground">Tom grave e profissional</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="feminine" id="feminine" />
                  <div>
                    <Label htmlFor="feminine" className="font-normal cursor-pointer">Feminina</Label>
                    <p className="text-sm text-muted-foreground">Tom agudo e claro</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="language">Idioma Principal</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="pt-PT">Português (Portugal)</SelectItem>
                  <SelectItem value="en-US">Inglês (EUA)</SelectItem>
                  <SelectItem value="en-UK">Inglês (UK)</SelectItem>
                  <SelectItem value="es">Espanhol</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Velocidade da Fala: {formData.speechSpeed}x</Label>
              <Slider
                value={[formData.speechSpeed]}
                onValueChange={(value) => setFormData({ ...formData, speechSpeed: value[0] })}
                min={0.5}
                max={2.0}
                step={0.1}
                className="mt-4"
              />
            </div>

            <div>
              <Label htmlFor="vocabularyComplexity">Complexidade do Vocabulário</Label>
              <RadioGroup
                value={formData.vocabularyComplexity}
                onValueChange={(value) => setFormData({ ...formData, vocabularyComplexity: value })}
                className="mt-2 space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="simple" id="simple" />
                  <div>
                    <Label htmlFor="simple" className="font-normal cursor-pointer">Simples</Label>
                    <p className="text-sm text-muted-foreground">Linguagem acessível e direta</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <div>
                    <Label htmlFor="intermediate" className="font-normal cursor-pointer">Intermediário</Label>
                    <p className="text-sm text-muted-foreground">Equilibrado e profissional</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <div>
                    <Label htmlFor="advanced" className="font-normal cursor-pointer">Avançado</Label>
                    <p className="text-sm text-muted-foreground">Técnico e especializado</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Recursos de Formatação</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useBold"
                    checked={formData.useBold}
                    onCheckedChange={(checked) => setFormData({ ...formData, useBold: checked as boolean })}
                  />
                  <Label htmlFor="useBold" className="font-normal cursor-pointer">Negrito para ênfase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useLists"
                    checked={formData.useLists}
                    onCheckedChange={(checked) => setFormData({ ...formData, useLists: checked as boolean })}
                  />
                  <Label htmlFor="useLists" className="font-normal cursor-pointer">Listas e bullets</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useTables"
                    checked={formData.useTables}
                    onCheckedChange={(checked) => setFormData({ ...formData, useTables: checked as boolean })}
                  />
                  <Label htmlFor="useTables" className="font-normal cursor-pointer">Tabelas de dados</Label>
                </div>
              </div>
            </div>

            <Card className="bg-muted">
              <CardContent className="pt-6">
                <Label className="text-base">Preview do Agente</Label>
                <div className="mt-4 p-4 bg-background rounded-lg border">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[hsl(206,35%,75%)] flex items-center justify-center text-[hsl(220,15%,30%)] font-semibold">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : "A"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{formData.name || "Nome do Agente"}</h3>
                        <p className="text-sm text-muted-foreground">{formData.mainFunction || "Função"}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formData.shortDescription || "Descrição do agente aparecerá aqui..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Criar Novo Agente IA</h1>
            <p className="text-sm text-muted-foreground mt-1">Configure seu assistente inteligente personalizado</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save size={16} className="mr-2" />
              Salvar Rascunho
            </Button>
            <Button className="bg-[hsl(160,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(160,35%,65%)]" onClick={handlePublish}>
              <Send size={16} className="mr-2" />
              Publicar Agente
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-8 pt-6 pb-3 bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition flex items-center gap-1">
            <Home size={16} />
            <span>Dashboard</span>
          </Link>
          <ChevronRight size={16} />
          <Link to="/meus-agentes" className="hover:text-foreground transition">
            Meus Agentes
          </Link>
          <ChevronRight size={16} />
          <span className="text-foreground">Criar Novo Agente</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="px-8 py-6 bg-background">
        <div className="flex items-center justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step.number
                      ? "bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-4 rounded transition-colors ${
                    currentStep > step.number ? "bg-[hsl(206,35%,75%)]" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-8 pb-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              {currentStep < steps.length ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                  className="bg-[hsl(206,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(206,35%,65%)]"
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={handlePublish}
                  className="bg-[hsl(160,35%,75%)] text-[hsl(220,15%,30%)] hover:bg-[hsl(160,35%,65%)]"
                >
                  Finalizar e Publicar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
