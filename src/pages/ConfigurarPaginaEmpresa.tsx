import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Upload, 
  Building, 
  Image as ImageIcon,
  Save,
  Eye,
  MapPin,
  Calendar,
  Users,
  Globe,
  FileText,
  Video,
  Book,
  Mic,
  Plus,
  Trash2,
  Edit,
  GripVertical,
  Settings,
  Palette,
  Type,
  Link as LinkIcon,
  Phone,
  Mail,
  BadgeCheck,
  X,
  Award,
  Tag,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ContentItem {
  id: string;
  type: 'artigo' | 'webinar' | 'ebook' | 'podcast';
  title: string;
  views: number;
  date: string;
}

interface AreaAtuacao {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Certificado {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface RedeSocial {
  id: string;
  platform: string;
  url: string;
}

export default function ConfigurarPaginaEmpresa() {
  const navigate = useNavigate();
  
  // Company Info
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [employees, setEmployees] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Images
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#F5D5B8");
  
  // Stats
  const [stat1Label, setStat1Label] = useState("Clientes");
  const [stat1Value, setStat1Value] = useState("");
  const [stat2Label, setStat2Label] = useState("Presença");
  const [stat2Value, setStat2Value] = useState("");
  const [stat3Label, setStat3Label] = useState("Ativos");
  const [stat3Value, setStat3Value] = useState("");
  const [stat4Label, setStat4Label] = useState("Países");
  const [stat4Value, setStat4Value] = useState("");
  
  // Content
  const [contents, setContents] = useState<ContentItem[]>([
    { id: '1', type: 'artigo', title: 'Tendências do Open Banking no Brasil', views: 8500, date: '2024-01-15' },
    { id: '2', type: 'webinar', title: 'Estratégias de Investimento 2024', views: 2300, date: '2024-01-12' },
    { id: '3', type: 'ebook', title: 'Guia Completo de Meios de Pagamento', views: 4100, date: '2024-01-08' },
  ]);

  // Tags/Especialidades
  const [tags, setTags] = useState<string[]>(["Banking", "Investimentos", "Seguros", "Cartões", "PIX"]);
  const [newTag, setNewTag] = useState("");

  // Áreas de Atuação
  const [areasAtuacao, setAreasAtuacao] = useState<AreaAtuacao[]>([
    { id: '1', name: 'Banking', description: 'Serviços bancários completos para pessoas físicas e jurídicas', icon: 'building' },
    { id: '2', name: 'Investimentos', description: 'Gestão de ativos e wealth management', icon: 'chart' },
  ]);
  const [newAreaName, setNewAreaName] = useState("");
  const [newAreaDesc, setNewAreaDesc] = useState("");

  // Certificados e Prêmios
  const [certificados, setCertificados] = useState<Certificado[]>([
    { id: '1', name: 'Banco Mais Valioso da América Latina', issuer: 'Brand Finance', year: '2024' },
    { id: '2', name: 'Melhor Banco Digital', issuer: 'Época Negócios', year: '2024' },
  ]);
  const [newCertName, setNewCertName] = useState("");
  const [newCertIssuer, setNewCertIssuer] = useState("");
  const [newCertYear, setNewCertYear] = useState("");

  // Redes Sociais
  const [redesSociais, setRedesSociais] = useState<RedeSocial[]>([
    { id: '1', platform: 'linkedin', url: 'linkedin.com/company/example' },
    { id: '2', platform: 'twitter', url: '@example' },
  ]);
  const [newRedePlatform, setNewRedePlatform] = useState("linkedin");
  const [newRedeUrl, setNewRedeUrl] = useState("");

  // Helper functions
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addArea = () => {
    if (newAreaName.trim()) {
      setAreasAtuacao([...areasAtuacao, {
        id: Date.now().toString(),
        name: newAreaName.trim(),
        description: newAreaDesc.trim(),
        icon: 'briefcase'
      }]);
      setNewAreaName("");
      setNewAreaDesc("");
    }
  };

  const removeArea = (id: string) => {
    setAreasAtuacao(areasAtuacao.filter(a => a.id !== id));
  };

  const addCertificado = () => {
    if (newCertName.trim()) {
      setCertificados([...certificados, {
        id: Date.now().toString(),
        name: newCertName.trim(),
        issuer: newCertIssuer.trim(),
        year: newCertYear.trim()
      }]);
      setNewCertName("");
      setNewCertIssuer("");
      setNewCertYear("");
    }
  };

  const removeCertificado = (id: string) => {
    setCertificados(certificados.filter(c => c.id !== id));
  };

  const addRedeSocial = () => {
    if (newRedeUrl.trim()) {
      setRedesSociais([...redesSociais, {
        id: Date.now().toString(),
        platform: newRedePlatform,
        url: newRedeUrl.trim()
      }]);
      setNewRedeUrl("");
    }
  };

  const removeRedeSocial = (id: string) => {
    setRedesSociais(redesSociais.filter(r => r.id !== id));
  };

  const getSocialIcon = (platform: string) => {
    switch(platform) {
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    toast.success("Página da empresa salva com sucesso!");
  };
  
  const handlePreview = () => {
    navigate("/perfil-empresa/preview");
  };
  
  const getContentIcon = (type: string) => {
    switch(type) {
      case 'artigo': return <FileText className="w-5 h-5" />;
      case 'webinar': return <Video className="w-5 h-5" />;
      case 'ebook': return <Book className="w-5 h-5" />;
      case 'podcast': return <Mic className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };
  
  const getContentColor = (type: string) => {
    switch(type) {
      case 'artigo': return 'bg-[hsl(var(--pastel-orange))]';
      case 'webinar': return 'bg-[hsl(var(--pastel-blue))]';
      case 'ebook': return 'bg-[hsl(var(--pastel-green))]';
      case 'podcast': return 'bg-[hsl(var(--pastel-purple))]';
      default: return 'bg-[hsl(var(--pastel-blue))]';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/conta-empresarial")}
                className="p-1.5 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-base font-semibold text-foreground">Configurar Página da Empresa</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="border-input"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-primary text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left Column - Form */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Cover & Logo Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[hsl(var(--pastel-blue))]" />
                  Imagens da Página
                </h2>
                
                {/* Cover Image */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Imagem de Capa
                  </label>
                  <div 
                    className="relative h-48 rounded-lg border-2 border-dashed border-border overflow-hidden cursor-pointer hover:border-primary/50 transition"
                    style={{ backgroundColor: coverPreview ? 'transparent' : primaryColor }}
                  >
                    {coverPreview ? (
                      <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-sm font-medium">Clique para enviar imagem de capa</span>
                        <span className="text-xs text-slate-500">Recomendado: 1920x480px</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Logo */}
                <div className="flex items-start gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Logo da Empresa
                    </label>
                    <div className="relative w-32 h-32 rounded-xl border-2 border-dashed border-border bg-white overflow-hidden cursor-pointer hover:border-primary/50 transition">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                          <Building className="w-8 h-8 mb-1" />
                          <span className="text-xs">Logo</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Cor Principal da Página
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border border-border"
                      />
                      <div className="flex gap-2">
                        {['#F5D5B8', '#B8D4E8', '#C5E8D4', '#D4C5E8', '#E8E0C5'].map(color => (
                          <button
                            key={color}
                            onClick={() => setPrimaryColor(color)}
                            className={`w-8 h-8 rounded-lg border-2 transition ${primaryColor === color ? 'border-slate-800' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Company Info Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[hsl(var(--pastel-green))]" />
                  Informações da Empresa
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nome da Empresa
                      </label>
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ex: Itaú Unibanco"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Slogan / Tagline
                      </label>
                      <Input
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="Ex: Maior banco privado da América Latina"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Descrição da Empresa
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva sua empresa, história, missão e valores..."
                      rows={5}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Localização
                      </label>
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ex: São Paulo, SP"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Ano de Fundação
                      </label>
                      <Input
                        value={foundedYear}
                        onChange={(e) => setFoundedYear(e.target.value)}
                        placeholder="Ex: 1945"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Número de Colaboradores
                      </label>
                      <Input
                        value={employees}
                        onChange={(e) => setEmployees(e.target.value)}
                        placeholder="Ex: 95.000+"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        Website
                      </label>
                      <Input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Ex: www.itau.com.br"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Telefone
                      </label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (11) 1234-5678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        E-mail de Contato
                      </label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: contato@empresa.com"
                      />
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Stats Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Type className="w-5 h-5 text-[hsl(var(--pastel-purple))]" />
                  Estatísticas em Destaque
                </h2>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Input
                      value={stat1Value}
                      onChange={(e) => setStat1Value(e.target.value)}
                      placeholder="60M+"
                      className="text-center font-bold"
                    />
                    <Input
                      value={stat1Label}
                      onChange={(e) => setStat1Label(e.target.value)}
                      placeholder="Clientes"
                      className="text-center text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={stat2Value}
                      onChange={(e) => setStat2Value(e.target.value)}
                      placeholder="4.800+"
                      className="text-center font-bold"
                    />
                    <Input
                      value={stat2Label}
                      onChange={(e) => setStat2Label(e.target.value)}
                      placeholder="Agências"
                      className="text-center text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={stat3Value}
                      onChange={(e) => setStat3Value(e.target.value)}
                      placeholder="R$ 2,3T"
                      className="text-center font-bold"
                    />
                    <Input
                      value={stat3Label}
                      onChange={(e) => setStat3Label(e.target.value)}
                      placeholder="Ativos"
                      className="text-center text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={stat4Value}
                      onChange={(e) => setStat4Value(e.target.value)}
                      placeholder="18"
                      className="text-center font-bold"
                    />
                    <Input
                      value={stat4Label}
                      onChange={(e) => setStat4Label(e.target.value)}
                      placeholder="Países"
                      className="text-center text-sm"
                    />
                  </div>
                </div>
              </section>
              
              {/* Content Management Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[hsl(var(--pastel-orange))]" />
                    Gerenciar Conteúdos
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/criar-conteudo")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Conteúdo
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {contents.map((content) => (
                    <div 
                      key={content.id}
                      className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary/30 transition"
                    >
                      <div className="cursor-move text-muted-foreground">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div className={`w-12 h-12 ${getContentColor(content.type)} rounded-lg flex items-center justify-center text-slate-700`}>
                        {getContentIcon(content.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm truncate">{content.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="capitalize">{content.type}</span>
                          <span>•</span>
                          <span>{content.views.toLocaleString()} visualizações</span>
                          <span>•</span>
                          <span>{new Date(content.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {contents.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">Nenhum conteúdo adicionado</p>
                    <p className="text-sm">Adicione artigos, webinars, e-books ou podcasts</p>
                  </div>
                )}
              </section>

              {/* Especialidades/Tags Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[hsl(var(--pastel-purple))]" />
                  Especialidades
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-[hsl(var(--pastel-gray-dark))]/20 text-[hsl(var(--pastel-gray-dark))] px-3 py-1.5 flex items-center gap-2"
                    >
                      {tag}
                      <button 
                        onClick={() => removeTag(tag)}
                        className="hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nova especialidade..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button 
                    variant="outline" 
                    onClick={addTag}
                    className="border-[hsl(var(--pastel-purple))]/30"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </section>

              {/* Áreas de Atuação Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[hsl(var(--pastel-blue))]" />
                  Áreas de Atuação
                </h2>
                
                <div className="space-y-3 mb-4">
                  {areasAtuacao.map((area) => (
                    <div 
                      key={area.id}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/30"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[hsl(var(--pastel-blue))]/20 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-[hsl(var(--pastel-blue))]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm">{area.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{area.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeArea(area.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 p-4 border border-dashed border-border rounded-lg bg-muted/20">
                  <Input
                    value={newAreaName}
                    onChange={(e) => setNewAreaName(e.target.value)}
                    placeholder="Nome da área..."
                  />
                  <Textarea
                    value={newAreaDesc}
                    onChange={(e) => setNewAreaDesc(e.target.value)}
                    placeholder="Descrição da área..."
                    className="min-h-[60px]"
                  />
                  <Button 
                    variant="outline" 
                    onClick={addArea}
                    className="w-full border-[hsl(var(--pastel-blue))]/30"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Área
                  </Button>
                </div>
              </section>

              {/* Certificados e Prêmios Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[hsl(var(--pastel-orange))]" />
                  Certificações e Prêmios
                </h2>
                
                <div className="space-y-3 mb-4">
                  {certificados.map((cert) => (
                    <div 
                      key={cert.id}
                      className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/30"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[hsl(var(--pastel-orange))]/20 flex items-center justify-center">
                        <Award className="w-4 h-4 text-[hsl(var(--pastel-orange))]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeCertificado(cert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 p-4 border border-dashed border-border rounded-lg bg-muted/20">
                  <Input
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                    placeholder="Nome do certificado/prêmio..."
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      value={newCertIssuer}
                      onChange={(e) => setNewCertIssuer(e.target.value)}
                      placeholder="Instituição..."
                    />
                    <Input
                      value={newCertYear}
                      onChange={(e) => setNewCertYear(e.target.value)}
                      placeholder="Ano..."
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={addCertificado}
                    className="w-full border-[hsl(var(--pastel-orange))]/30"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Certificado
                  </Button>
                </div>
              </section>

              {/* Redes Sociais Section */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[hsl(var(--pastel-green))]" />
                  Redes Sociais
                </h2>
                
                <div className="space-y-3 mb-4">
                  {redesSociais.map((rede) => (
                    <div 
                      key={rede.id}
                      className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/30"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[hsl(var(--pastel-green))]/20 flex items-center justify-center text-[hsl(var(--pastel-green))]">
                        {getSocialIcon(rede.platform)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm capitalize">{rede.platform}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          {rede.url}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeRedeSocial(rede.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 p-4 border border-dashed border-border rounded-lg bg-muted/20">
                  <select
                    value={newRedePlatform}
                    onChange={(e) => setNewRedePlatform(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="website">Website</option>
                  </select>
                  <Input
                    value={newRedeUrl}
                    onChange={(e) => setNewRedeUrl(e.target.value)}
                    placeholder="URL ou @usuario..."
                  />
                  <Button 
                    variant="outline" 
                    onClick={addRedeSocial}
                    className="w-full border-[hsl(var(--pastel-green))]/30"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Rede Social
                  </Button>
                </div>
              </section>
            </div>
            
            {/* Right Column - Preview */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Preview Card */}
              <section className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Pré-visualização
                  </h3>
                </div>
                
                <div className="bg-muted">
                  {/* Mini Preview */}
                  <div 
                    className="h-24"
                    style={{ backgroundColor: coverPreview ? 'transparent' : primaryColor }}
                  >
                    {coverPreview && (
                      <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-start gap-3 -mt-6">
                      <div className="w-16 h-16 bg-white rounded-xl border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <Building className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-foreground text-sm">
                          {companyName || "Nome da Empresa"}
                        </h4>
                        <BadgeCheck className="w-4 h-4" style={{ color: primaryColor }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {tagline || "Slogan da empresa"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {description || "Descrição da empresa aparecerá aqui..."}
                      </p>
                    </div>
                    
                    {/* Stats Preview */}
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      <div className="text-center p-2 rounded-lg" style={{ backgroundColor: primaryColor + '40' }}>
                        <div className="text-xs font-bold text-foreground">{stat1Value || "--"}</div>
                        <div className="text-[10px] text-muted-foreground">{stat1Label}</div>
                      </div>
                      <div className="text-center p-2 bg-[hsl(var(--pastel-blue))]/40 rounded-lg">
                        <div className="text-xs font-bold text-foreground">{stat2Value || "--"}</div>
                        <div className="text-[10px] text-muted-foreground">{stat2Label}</div>
                      </div>
                      <div className="text-center p-2 bg-[hsl(var(--pastel-green))]/40 rounded-lg">
                        <div className="text-xs font-bold text-foreground">{stat3Value || "--"}</div>
                        <div className="text-[10px] text-muted-foreground">{stat3Label}</div>
                      </div>
                      <div className="text-center p-2 bg-[hsl(var(--pastel-purple))]/40 rounded-lg">
                        <div className="text-xs font-bold text-foreground">{stat4Value || "--"}</div>
                        <div className="text-[10px] text-muted-foreground">{stat4Label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Tips Card */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[hsl(var(--pastel-blue))]" />
                  Dicas
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--pastel-green))] mt-2 flex-shrink-0" />
                    Use uma imagem de capa de alta qualidade (1920x480px)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--pastel-blue))] mt-2 flex-shrink-0" />
                    O logo deve estar em formato quadrado (PNG ou JPG)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--pastel-orange))] mt-2 flex-shrink-0" />
                    Escreva uma descrição clara e objetiva
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--pastel-purple))] mt-2 flex-shrink-0" />
                    Mantenha suas estatísticas atualizadas
                  </li>
                </ul>
              </section>
              
              {/* Actions Card */}
              <section className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">Ações</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handlePreview}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar Página Completa
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/gerenciar-conteudos-empresa")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Gerenciar Todos os Conteúdos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/perfil-empresa/1/estatisticas")}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Ver Estatísticas da Página
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
