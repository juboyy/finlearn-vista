import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Check,
  Info,
  Upload,
  Users,
  Calendar,
  Lock,
  Search,
  Mic,
  Image,
  Plus,
  X,
  Clock,
  Rocket,
  FileText,
  Globe,
  Crown,
  DollarSign,
  Eye,
  Headphones,
  TrendingUp,
  Lightbulb,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function NovoPodcast() {
  const navigate = useNavigate();
  const [publicationType, setPublicationType] = useState<"schedule" | "now" | "draft">("schedule");
  const [accessType, setAccessType] = useState<"free" | "subscribers" | "paid">("free");
  const [allowDownload, setAllowDownload] = useState(false);
  const [allowComments, setAllowComments] = useState(false);
  const [notifyFollowers, setNotifyFollowers] = useState(false);
  const [limitParticipants, setLimitParticipants] = useState(false);

  const handleSaveDraft = () => {
    toast.success("Rascunho salvo com sucesso!");
  };

  const handlePublish = () => {
    toast.success("Podcast publicado com sucesso!");
    navigate("/meus-conteudos");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/criar-conteudo"
                className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Adicionar Novo Podcast</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Preencha as informacoes para criar seu podcast
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="border-input"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Rascunho
              </Button>
              <Button
                onClick={handlePublish}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              >
                <Check className="w-4 h-4 mr-2" />
                Publicar Podcast
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Forms */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Basic Information */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5" />
                  </div>
                  Informacoes Basicas
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Titulo do Podcast *
                    </label>
                    <Input
                      placeholder="Ex: Desvendando o Mercado Financeiro"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Categoria *
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="investimentos">Investimentos</SelectItem>
                          <SelectItem value="economia">Economia</SelectItem>
                          <SelectItem value="mercado">Mercado Financeiro</SelectItem>
                          <SelectItem value="educacao">Educacao Financeira</SelectItem>
                          <SelectItem value="cripto">Criptomoedas</SelectItem>
                          <SelectItem value="empreendedorismo">Empreendedorismo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Duracao Estimada *
                      </label>
                      <Input placeholder="Ex: 45 minutos" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Descricao do Episodio *
                    </label>
                    <Textarea
                      rows={5}
                      placeholder="Descreva sobre o que sera o podcast, topicos abordados e o que os ouvintes podem esperar..."
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Tags (separadas por virgula)
                    </label>
                    <Input placeholder="Ex: investimentos, bolsa de valores, analise tecnica" />
                  </div>
                </div>
              </section>

              {/* Media Upload */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  Midia do Podcast
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Arquivo de Audio *
                    </label>
                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Mic className="w-12 h-12 text-[hsl(var(--pastel-purple))] mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Clique para fazer upload ou arraste o arquivo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP3, WAV ou M4A (max. 500MB)
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Imagem de Capa *
                    </label>
                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Image className="w-12 h-12 text-[hsl(var(--pastel-blue))] mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Clique para fazer upload ou arraste a imagem
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG ou WEBP (1400x1400px recomendado)
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Participants */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  Participantes
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-foreground">
                        Apresentador(es) / Host(s) *
                      </label>
                      <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                        <Plus className="w-4 h-4" />
                        Adicionar Host
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                          alt="Host"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-foreground">Marina Santos</p>
                          <p className="text-xs text-muted-foreground">Especialista em Pagamentos</p>
                        </div>
                        <span className="px-3 py-1 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] text-xs font-semibold rounded-full">
                          Host Principal
                        </span>
                        <button className="text-muted-foreground hover:text-destructive">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-foreground">Convidados</label>
                      <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                        <Plus className="w-4 h-4" />
                        Adicionar Convidado
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                          alt="Guest"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Nome do convidado"
                            defaultValue="Fernando Lima"
                            className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-foreground focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Cargo/Especializacao"
                            defaultValue="Economista Chefe - XP Investimentos"
                            className="w-full bg-transparent border-0 p-0 text-xs text-muted-foreground focus:outline-none mt-1"
                          />
                        </div>
                        <button className="text-muted-foreground hover:text-destructive">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="w-full py-3 border-2 border-dashed border-input rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        <Plus className="w-4 h-4 inline mr-2" />
                        Adicionar Outro Convidado
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Schedule Settings */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-orange))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  Agendamento e Configuracoes
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Data de Publicacao *
                      </label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Horario *
                      </label>
                      <Input type="time" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Tipo de Publicacao *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="publication-type"
                          className="peer sr-only"
                          checked={publicationType === "schedule"}
                          onChange={() => setPublicationType("schedule")}
                        />
                        <div className="p-4 border-2 border-input rounded-lg text-center hover:border-primary transition-colors peer-checked:border-primary peer-checked:bg-primary/5">
                          <Clock className="w-8 h-8 text-[hsl(var(--pastel-orange))] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-foreground">Agendar</p>
                        </div>
                      </label>
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="publication-type"
                          className="peer sr-only"
                          checked={publicationType === "now"}
                          onChange={() => setPublicationType("now")}
                        />
                        <div className="p-4 border-2 border-input rounded-lg text-center hover:border-primary transition-colors peer-checked:border-primary peer-checked:bg-primary/5">
                          <Rocket className="w-8 h-8 text-[hsl(var(--pastel-green))] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-foreground">Publicar Agora</p>
                        </div>
                      </label>
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="publication-type"
                          className="peer sr-only"
                          checked={publicationType === "draft"}
                          onChange={() => setPublicationType("draft")}
                        />
                        <div className="p-4 border-2 border-input rounded-lg text-center hover:border-primary transition-colors peer-checked:border-primary peer-checked:bg-primary/5">
                          <FileText className="w-8 h-8 text-[hsl(var(--pastel-blue))] mx-auto mb-2" />
                          <p className="text-sm font-semibold text-foreground">Rascunho</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={allowDownload}
                        onCheckedChange={(checked) => setAllowDownload(checked as boolean)}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Permitir download do episodio
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Os ouvintes poderao baixar o arquivo de audio
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={allowComments}
                        onCheckedChange={(checked) => setAllowComments(checked as boolean)}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Permitir comentarios
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Os ouvintes poderao comentar e interagir
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={notifyFollowers}
                        onCheckedChange={(checked) => setNotifyFollowers(checked as boolean)}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Notificar seguidores
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Enviar notificacao push e email para seus seguidores
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Access Control */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-pink))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  Controle de Acesso e Monetizacao
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Tipo de Acesso *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input
                          type="radio"
                          name="access-type"
                          className="mt-1"
                          checked={accessType === "free"}
                          onChange={() => setAccessType("free")}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-[hsl(var(--pastel-green))]" />
                            <p className="font-semibold text-sm text-foreground">
                              Gratuito (Publico)
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Qualquer pessoa pode ouvir este podcast
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input
                          type="radio"
                          name="access-type"
                          className="mt-1"
                          checked={accessType === "subscribers"}
                          onChange={() => setAccessType("subscribers")}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Crown className="w-4 h-4 text-[hsl(var(--pastel-yellow))]" />
                            <p className="font-semibold text-sm text-foreground">
                              Apenas Assinantes
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Disponivel apenas para membros Premium e VIP
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input
                          type="radio"
                          name="access-type"
                          className="mt-1"
                          checked={accessType === "paid"}
                          onChange={() => setAccessType("paid")}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-[hsl(var(--pastel-orange))]" />
                            <p className="font-semibold text-sm text-foreground">
                              Pagamento Individual
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Venda este episodio separadamente
                          </p>
                          {accessType === "paid" && (
                            <div className="mt-3 flex items-center gap-3">
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="w-32"
                              />
                              <span className="text-sm text-muted-foreground">BRL</span>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="limit-participants"
                        checked={limitParticipants}
                        onCheckedChange={(checked) => setLimitParticipants(checked as boolean)}
                        className="mt-1 w-5 h-5"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="limit-participants"
                          className="text-sm font-semibold text-foreground cursor-pointer"
                        >
                          Limitar numero de ouvintes ao vivo
                        </label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Defina um limite maximo de participantes simultaneos
                        </p>
                        <div className="flex items-center gap-3">
                          <Input
                            type="number"
                            placeholder="100"
                            className="w-32"
                            disabled={!limitParticipants}
                          />
                          <span className="text-sm text-muted-foreground">participantes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SEO Settings */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-yellow))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  SEO e Metadados
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      URL Personalizada (Slug)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">finlearn.ai/podcast/</span>
                      <Input
                        placeholder="desvendando-mercado-financeiro"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Meta Descricao
                    </label>
                    <Textarea
                      rows={3}
                      placeholder="Descricao otimizada para mecanismos de busca (max. 160 caracteres)"
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">0 / 160 caracteres</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Palavras-chave SEO
                    </label>
                    <Input placeholder="Ex: investimentos, mercado financeiro, economia" />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Preview Card */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Pre-visualizacao</h3>
                <div className="bg-muted rounded-lg overflow-hidden border border-border">
                  <div className="h-48 bg-gradient-to-br from-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-purple))] flex items-center justify-center">
                    <Image className="w-12 h-12 text-white/50" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-[hsl(var(--pastel-gray-dark))] bg-[hsl(var(--pastel-orange))] px-2.5 py-1 rounded-full">
                      Podcast
                    </span>
                    <h4 className="font-bold text-foreground mt-3 mb-2">Titulo do Podcast</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Descricao do episodio aparecera aqui...
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        -- min
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        -- /-- /----
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                        alt="Host"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Marina Santos</p>
                        <p className="text-xs text-muted-foreground">Host</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Tips */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[hsl(var(--pastel-yellow))]" />
                  Dicas Rapidas
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Use titulos claros e descritivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Adicione tags relevantes para melhor descoberta
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Imagens de capa atraem mais ouvintes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Qualidade de audio e fundamental</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Agende para horarios de pico</span>
                  </li>
                </ul>
              </section>

              {/* Analytics Preview */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Estatisticas Esperadas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Alcance Est.</p>
                        <p className="text-lg font-bold text-foreground">12.4K</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ouvintes Est.</p>
                        <p className="text-lg font-bold text-foreground">8.9K</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(var(--pastel-purple))] text-[hsl(var(--pastel-gray-dark))] rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Engajamento</p>
                        <p className="text-lg font-bold text-foreground">Alto</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Baseado no seu historico de podcasts
                </p>
              </section>

              {/* Action Buttons */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <div className="space-y-3">
                  <Button
                    onClick={handlePublish}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Publicar Podcast
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleSaveDraft}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Rascunho
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Pre-visualizar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-destructive border-input hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Descartar
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
