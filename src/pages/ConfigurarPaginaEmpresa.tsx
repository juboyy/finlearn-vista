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
  BadgeCheck
} from "lucide-react";
import { toast } from "sonner";

interface ContentItem {
  id: string;
  type: 'artigo' | 'webinar' | 'ebook' | 'podcast';
  title: string;
  views: number;
  date: string;
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
          <div className="px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/conta-empresarial")}
                className="p-1.5 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-foreground">Configurar Página da Empresa</h1>
                <p className="text-xs text-muted-foreground">Personalize como sua empresa aparece na plataforma</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="border-input"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
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
                    onClick={() => navigate("/meus-conteudos")}
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
