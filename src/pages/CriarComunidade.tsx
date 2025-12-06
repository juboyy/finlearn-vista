import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ChevronLeft, 
  Save, 
  Check, 
  Info, 
  Crown, 
  Shield, 
  Gavel, 
  Scale, 
  Sliders, 
  UserPlus, 
  Settings, 
  Image,
  Users,
  MessageSquare,
  ChartLine,
  Lightbulb,
  Rocket,
  Eye,
  Trash2,
  X,
  Plus,
  Search,
  Copy,
  Send,
  FileText,
  Video,
  Mic,
  File,
  Globe,
  Lock,
  EyeOff,
  CheckCircle,
  Clock,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { communitySchema, validateForm, getFirstError } from "@/lib/validations";
const CriarComunidade = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [category, setCategory] = useState("");
  const [communityType, setCommunityType] = useState("Pública");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [ethicsCode, setEthicsCode] = useState("");

  const [rules, setRules] = useState([
    { id: 1, title: "Seja respeitoso com todos os membros", description: "Mantenha discussões civilizadas e respeite opiniões divergentes. Não toleramos ofensas pessoais ou discriminação." },
    { id: 2, title: "Compartilhe conteúdo relevante e de qualidade", description: "Postagens devem estar relacionadas ao mercado financeiro. Evite spam e conteúdo promocional excessivo." },
    { id: 3, title: "Não faça recomendações financeiras diretas", description: "Compartilhe análises e opiniões, mas evite dar conselhos financeiros específicos. Cada membro é responsável por suas decisões." }
  ]);

  const [moderators, setModerators] = useState([
    { id: 1, name: "Carlos Mendes", role: "Analista de Investimentos", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg", permission: "Moderador" },
    { id: 2, name: "Ana Paula Silva", role: "Trader Profissional", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg", permission: "Moderador" }
  ]);

  const [creators, setCreators] = useState([
    { id: 1, name: "Roberto Alves", role: "Especialista em Day Trade", followers: "15.2K", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg", invited: false },
    { id: 2, name: "Juliana Costa", role: "Analista Fundamentalista", followers: "8.7K", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg", invited: false },
    { id: 3, name: "Fernando Lima", role: "Economista Chefe", followers: "22.1K", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg", invited: true },
    { id: 4, name: "Patricia Oliveira", role: "Educadora Financeira", followers: "11.5K", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg", invited: false }
  ]);

  const [contentTypes, setContentTypes] = useState({
    text: true,
    images: true,
    videos: true,
    audio: true,
    files: true
  });

  const [settings, setSettings] = useState({
    allowMemberPosts: true,
    requirePostApproval: false,
    enableNotifications: true
  });

  const mapPrivacyType = (type: string) => {
    switch (type) {
      case "Pública": return "public";
      case "Privada": return "private";
      case "Somente Convidados": return "invite_only";
      default: return "public";
    }
  };

  const saveCommunity = async (status: 'draft' | 'active') => {
    if (!user) {
      toast.error("Voce precisa estar logado para criar uma comunidade");
      return;
    }

    const validation = validateForm(communitySchema, {
      name: communityName,
      description,
      category,
      privacy: mapPrivacyType(communityType),
    });

    if (!validation.success || !validation.data) {
      toast.error(getFirstError(validation.errors));
      return;
    }

    setIsLoading(true);
    try {
      const communityData = validation.data;
      const { error } = await supabase.from('communities').insert({
        user_id: user.id,
        name: communityData.name,
        description: communityData.description,
        category: communityData.category,
        privacy: communityData.privacy,
        rules: rules.map(r => ({ title: r.title, description: r.description })),
        ethics_code: ethicsCode,
        content_types: contentTypes,
        moderators: moderators.map(m => ({ name: m.name, role: m.role, image: m.image, permission: m.permission })),
        invited_creators: creators.filter(c => c.invited).map(c => ({ name: c.name, role: c.role, image: c.image })),
        allow_member_posts: settings.allowMemberPosts,
        require_post_approval: settings.requirePostApproval,
        enable_notifications: settings.enableNotifications,
        status
      });

      if (error) throw error;

      toast.success(status === 'draft' ? "Rascunho salvo com sucesso!" : "Comunidade criada com sucesso!");
      if (status === 'active') {
        navigate("/todas-comunidades");
      }
    } catch (error: any) {
      console.error('Error saving community:', error);
      toast.error("Erro ao salvar comunidade: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => saveCommunity('draft');
  const handleCreateCommunity = () => saveCommunity('active');

  const handleRemoveRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleAddRule = () => {
    const newRule = {
      id: rules.length + 1,
      title: "",
      description: ""
    };
    setRules([...rules, newRule]);
  };

  const handleRemoveModerator = (id: number) => {
    setModerators(moderators.filter(mod => mod.id !== id));
  };

  const handleInviteCreator = (id: number) => {
    setCreators(creators.map(creator => 
      creator.id === id ? { ...creator, invited: true } : creator
    ));
    toast.success("Convite enviado!");
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/todas-comunidades")}
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Criar Nova Comunidade</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Configure sua comunidade e comece a construir sua rede</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="px-4 py-2 border border-input text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Salvar Rascunho
              </Button>
              <Button
                onClick={handleCreateCommunity}
                disabled={isLoading}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                Criar Comunidade
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Main Content - Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Informações Básicas */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(210,35%,75%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5" />
                  </div>
                  Informações Básicas
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Nome da Comunidade *</label>
                    <Input
                      type="text"
                      placeholder="Ex: Investidores Brasileiros"
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Categoria *</label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="investimentos">Investimentos</SelectItem>
                          <SelectItem value="analise">Análise de Mercado</SelectItem>
                          <SelectItem value="educacao">Educação Financeira</SelectItem>
                          <SelectItem value="trading">Trading</SelectItem>
                          <SelectItem value="cripto">Criptomoedas</SelectItem>
                          <SelectItem value="renda-fixa">Renda Fixa</SelectItem>
                          <SelectItem value="renda-variavel">Renda Variável</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Tipo de Comunidade *</label>
                      <Select value={communityType} onValueChange={setCommunityType}>
                        <SelectTrigger className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pública">Pública</SelectItem>
                          <SelectItem value="Privada">Privada</SelectItem>
                          <SelectItem value="Somente Convidados">Somente Convidados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Descrição da Comunidade *</label>
                    <Textarea
                      rows={5}
                      placeholder="Descreva o propósito da comunidade, temas abordados e o que os membros podem esperar..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Tags da Comunidade</label>
                    <Input
                      type="text"
                      placeholder="Ex: investimentos, bolsa, análise técnica, day trade"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Imagem de Capa da Comunidade *</label>
                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Image className="w-12 h-12 text-[hsl(210,35%,75%)] mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">Clique para fazer upload ou arraste a imagem</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP (1200x400px recomendado)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Proprietário da Comunidade */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(270,35%,80%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5" />
                  </div>
                  Proprietário da Comunidade
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg border border-border">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Owner" className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-foreground">Marina Santos</p>
                      <p className="text-sm text-muted-foreground">Criadora de Conteúdo - Especialista em Pagamentos</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-[hsl(45,45%,80%)] text-[hsl(220,10%,40%)] text-xs font-semibold rounded-full flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          Proprietário
                        </span>
                        <span className="px-3 py-1 bg-[hsl(140,30%,75%)] text-[hsl(220,10%,40%)] text-xs font-semibold rounded-full">
                          Admin Total
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/50 border border-border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-[hsl(210,35%,75%)] mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">Sobre a Propriedade</p>
                        <p className="text-xs text-muted-foreground">Como proprietário, você terá controle total sobre a comunidade, incluindo configurações, moderação, e a capacidade de transferir a propriedade para outro membro.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Moderadores */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(140,30%,75%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  Moderadores
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground">Adicione moderadores para ajudar a gerenciar a comunidade</p>
                    <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Adicionar Moderador
                    </button>
                  </div>

                  <div className="space-y-3">
                    {moderators.map((mod) => (
                      <div key={mod.id} className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                        <img src={mod.image} alt={mod.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-foreground">{mod.name}</p>
                          <p className="text-xs text-muted-foreground">{mod.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select defaultValue={mod.permission}>
                            <SelectTrigger className="px-3 py-1.5 bg-background border border-input rounded text-xs w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Moderador">Moderador</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <button 
                            onClick={() => handleRemoveModerator(mod.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button className="w-full py-3 border-2 border-dashed border-input rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Adicionar Novo Moderador
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-accent/50 border border-border rounded-lg">
                    <p className="text-xs font-semibold text-foreground mb-2">Permissões dos Moderadores:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                      <li>- Aprovar e remover postagens</li>
                      <li>- Gerenciar comentários e respostas</li>
                      <li>- Banir ou silenciar membros</li>
                      <li>- Editar regras da comunidade</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Regras da Comunidade */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(25,50%,80%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <Gavel className="w-5 h-5" />
                  </div>
                  Regras da Comunidade
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-accent/50 border border-border rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground">Defina regras claras para manter um ambiente saudável e produtivo</p>
                  </div>

                  <div className="space-y-3">
                    {rules.map((rule, index) => (
                      <div key={rule.id} className="p-4 bg-muted rounded-lg border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="w-6 h-6 bg-[hsl(210,35%,75%)] text-[hsl(220,10%,40%)] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <Input
                              type="text"
                              value={rule.title}
                              onChange={(e) => {
                                const newRules = [...rules];
                                newRules[index].title = e.target.value;
                                setRules(newRules);
                              }}
                              className="flex-1 bg-transparent border-0 p-0 text-sm font-semibold text-foreground focus:outline-none focus-visible:ring-0"
                            />
                          </div>
                          <button 
                            onClick={() => handleRemoveRule(rule.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <Textarea
                          rows={2}
                          value={rule.description}
                          onChange={(e) => {
                            const newRules = [...rules];
                            newRules[index].description = e.target.value;
                            setRules(newRules);
                          }}
                          className="w-full bg-transparent border-0 p-0 text-xs text-muted-foreground focus:outline-none resize-none mt-2 focus-visible:ring-0"
                        />
                      </div>
                    ))}

                    <button 
                      onClick={handleAddRule}
                      className="w-full py-3 border-2 border-dashed border-input rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Nova Regra
                    </button>
                  </div>
                </div>
              </section>

              {/* Princípios de Ética */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(330,40%,80%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  Princípios de Ética
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Código de Conduta *</label>
                    <Textarea
                      rows={6}
                      placeholder="Descreva os valores e princípios éticos que guiam esta comunidade..."
                      value={ethicsCode}
                      onChange={(e) => setEthicsCode(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox defaultChecked className="mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Transparência nas Informações</p>
                        <p className="text-xs text-muted-foreground">Membros devem divulgar conflitos de interesse ao compartilhar análises</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox defaultChecked className="mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Verificação de Fontes</p>
                        <p className="text-xs text-muted-foreground">Incentivo à citação de fontes confiáveis e verificação de informações</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox defaultChecked className="mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Proteção de Dados</p>
                        <p className="text-xs text-muted-foreground">Compromisso com a privacidade e segurança dos dados dos membros</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox defaultChecked className="mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Inclusão e Diversidade</p>
                        <p className="text-xs text-muted-foreground">Ambiente acolhedor para pessoas de diferentes backgrounds e níveis de experiência</p>
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Configurações de Conteúdo */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(45,45%,80%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  Configurações de Conteúdo
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Tipos de Mídia Permitidos</label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <Checkbox defaultChecked className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-[hsl(210,35%,75%)]" />
                            <p className="font-semibold text-sm text-foreground">Postagens de Texto</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Membros podem criar postagens escritas e compartilhar artigos</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <Checkbox defaultChecked className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Image className="w-4 h-4 text-[hsl(270,35%,80%)]" />
                            <p className="font-semibold text-sm text-foreground">Imagens e Gráficos</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Permitir upload de imagens, gráficos e infográficos</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <Checkbox defaultChecked className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Video className="w-4 h-4 text-[hsl(330,40%,80%)]" />
                            <p className="font-semibold text-sm text-foreground">Vídeos como Resposta</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Membros podem responder com vídeos (análises, tutoriais, etc.)</p>
                          <div className="mt-3 pl-6 space-y-2">
                            <label className="flex items-center gap-2 text-xs">
                              <Checkbox className="w-4 h-4" />
                              <span className="text-muted-foreground">Limitar duração máxima (5 minutos)</span>
                            </label>
                            <label className="flex items-center gap-2 text-xs">
                              <Checkbox className="w-4 h-4" />
                              <span className="text-muted-foreground">Requer aprovação de moderador</span>
                            </label>
                          </div>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <Checkbox defaultChecked className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Mic className="w-4 h-4 text-[hsl(25,50%,80%)]" />
                            <p className="font-semibold text-sm text-foreground">Áudio como Resposta</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Membros podem responder com mensagens de áudio</p>
                          <div className="mt-3 pl-6 space-y-2">
                            <label className="flex items-center gap-2 text-xs">
                              <Checkbox className="w-4 h-4" />
                              <span className="text-muted-foreground">Limitar duração máxima (3 minutos)</span>
                            </label>
                            <label className="flex items-center gap-2 text-xs">
                              <Checkbox className="w-4 h-4" />
                              <span className="text-muted-foreground">Requer aprovação de moderador</span>
                            </label>
                          </div>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <Checkbox className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <File className="w-4 h-4 text-[hsl(140,30%,75%)]" />
                            <p className="font-semibold text-sm text-foreground">Documentos e PDFs</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Permitir compartilhamento de documentos e relatórios</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <label className="block text-sm font-semibold text-foreground mb-3">Moderação de Conteúdo</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Aprovar postagens antes de publicar</p>
                          <p className="text-xs text-muted-foreground">Novos membros precisam de aprovação para suas primeiras postagens</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox defaultChecked />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Filtro automático de palavras</p>
                          <p className="text-xs text-muted-foreground">Bloquear automaticamente conteúdo com palavras ofensivas</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox defaultChecked />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Sistema de denúncias</p>
                          <p className="text-xs text-muted-foreground">Membros podem reportar conteúdo inadequado</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Convidar Membros e Creators */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-10 h-10 bg-[hsl(270,35%,80%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    Convidar Membros e Creators
                  </h2>
                  <Button variant="outline" className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    Todos Seguidores
                  </Button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Convidar por Email</label>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="email@exemplo.com"
                        className="flex-1 px-4 py-3 bg-background border border-input rounded-lg text-sm"
                      />
                      <Button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        <Send className="w-4 h-4 mr-2" />
                        Enviar
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">ou</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Pesquisar Creators</label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Buscar por nome ou especialização..."
                        className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {creators.map((creator) => (
                      <div key={creator.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                        <img src={creator.image} alt={creator.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-foreground">{creator.name}</p>
                          <p className="text-xs text-muted-foreground">{creator.role} - {creator.followers} seguidores</p>
                        </div>
                        {creator.invited ? (
                          <Button variant="secondary" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium">
                            <Check className="w-3 h-3 mr-1" />
                            Convidado
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleInviteCreator(creator.id)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                          >
                            Convidar
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <label className="block text-sm font-semibold text-foreground mb-3">Link de Convite</label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value="https://finlearn.ai/invite/inv-123abc"
                        readOnly
                        className="flex-1 px-4 py-3 bg-muted border border-input rounded-lg text-sm"
                      />
                      <Button 
                        variant="secondary"
                        onClick={() => {
                          navigator.clipboard.writeText("https://finlearn.ai/invite/inv-123abc");
                          toast.success("Link copiado!");
                        }}
                        className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Compartilhe este link para convidar pessoas para a comunidade</p>
                  </div>

                  <div className="p-4 bg-accent/50 border border-border rounded-lg">
                    <p className="text-xs font-semibold text-foreground mb-2">Convites Enviados: 12</p>
                    <div className="flex items-center gap-4 text-xs text-black">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-black" />
                        8 Aceitos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-black" />
                        4 Pendentes
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Configurações Adicionais */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(140,30%,75%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  Configurações Adicionais
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Privacidade da Comunidade</label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input type="radio" name="privacy" defaultChecked className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-[hsl(140,30%,75%)]" />
                            <p className="font-semibold text-sm text-foreground">Pública</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Qualquer pessoa pode ver e participar da comunidade</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input type="radio" name="privacy" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Lock className="w-4 h-4 text-[hsl(25,50%,80%)]" />
                            <p className="font-semibold text-sm text-foreground">Privada</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Apenas membros aprovados podem ver e participar</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input type="radio" name="privacy" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <EyeOff className="w-4 h-4 text-[hsl(270,35%,80%)]" />
                            <p className="font-semibold text-sm text-foreground">Secreta</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Invisível para não-membros, apenas por convite</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox defaultChecked />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Permitir membros convidarem outros</p>
                        <p className="text-xs text-muted-foreground">Membros podem gerar links de convite</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox defaultChecked />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Notificações de novos membros</p>
                        <p className="text-xs text-muted-foreground">Avisar moderadores quando alguém entrar</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Limitar número de membros</p>
                        <p className="text-xs text-muted-foreground">Definir capacidade máxima da comunidade</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox defaultChecked />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Exibir comunidade no diretório</p>
                        <p className="text-xs text-muted-foreground">Aparecer nos resultados de busca da plataforma</p>
                      </div>
                    </label>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Pré-visualização */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Pré-visualização</h3>
                <div className="bg-muted rounded-lg overflow-hidden border border-border">
                  <div className="h-32 bg-gradient-to-br from-[hsl(210,35%,75%)] via-[hsl(270,35%,80%)] to-[hsl(330,40%,80%)] flex items-center justify-center">
                    <Users className="w-12 h-12 text-white/50" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-[hsl(220,10%,40%)] bg-[hsl(140,30%,75%)] px-2.5 py-1 rounded-full">
                        {communityType || "Pública"}
                      </span>
                      <span className="text-xs font-semibold text-[hsl(220,10%,40%)] bg-[hsl(210,35%,75%)] px-2.5 py-1 rounded-full">
                        {category || "Investimentos"}
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{communityName || "Nome da Comunidade"}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{description || "Descrição da comunidade aparecerá aqui..."}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        0 membros
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        0 posts
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Owner" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Marina Santos</p>
                        <p className="text-xs text-muted-foreground">Proprietário</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Estatísticas Esperadas */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Estatísticas Esperadas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(210,35%,75%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Membros Est.</p>
                        <p className="text-lg font-bold text-foreground">500+</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(140,30%,75%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Posts/Mês</p>
                        <p className="text-lg font-bold text-foreground">150+</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[hsl(270,35%,80%)] text-[hsl(220,10%,40%)] rounded-lg flex items-center justify-center">
                        <ChartLine className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Engajamento</p>
                        <p className="text-lg font-bold text-foreground">Alto</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">Baseado em comunidades similares</p>
              </section>

              {/* Dicas para Sucesso */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[hsl(45,45%,80%)]" />
                  Dicas para Sucesso
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(140,30%,75%)] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Defina regras claras desde o início</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(140,30%,75%)] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Convide creators relevantes para engajamento inicial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(140,30%,75%)] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Seja ativo e responda aos membros regularmente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(140,30%,75%)] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Organize eventos e discussões temáticas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(140,30%,75%)] mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Reconheça e valorize membros ativos</span>
                  </li>
                </ul>
              </section>

              {/* Action Buttons */}
              <section className="bg-card border border-border rounded-lg shadow-sm p-6">
                <div className="space-y-3">
                  <Button 
                    onClick={handleCreateCommunity}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Criar Comunidade
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={handleSaveDraft}
                    className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Rascunho
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full py-3 border border-input text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Pré-visualizar
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/todas-comunidades")}
                    className="w-full py-3 border border-input text-destructive rounded-lg text-sm font-medium hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Descartar
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CriarComunidade;
