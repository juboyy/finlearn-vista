import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, Bell, Eye, Save, Camera, MapPin, Building2, Calendar,
  Link2, Upload, Loader2
} from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

export default function PerfilSocial() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg");
  
  // Form states
  const [displayName, setDisplayName] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [institution, setInstitution] = useState("");
  const [memberSince, setMemberSince] = useState("2024");
  
  // Social links
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Formato invalido",
        description: "Por favor, selecione uma imagem JPG, PNG ou WebP.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O tamanho maximo permitido e 5MB.",
      });
      return;
    }

    setIsUploadingAvatar(true);
    
    // Simulate upload
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setIsUploadingAvatar(false);
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    }, 1000);
  };

  const handleSave = () => {
    toast({
      title: "Perfil salvo",
      description: "Suas informacoes foram salvas com sucesso.",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarFix />
      
      <div className="flex-1 overflow-y-auto">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
          <div className="px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/minha-conta')} 
                className="p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Perfil Social</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Configure seu perfil publico de criador</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPreviewOpen(true)}
                className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
              >
                <Eye size={16} />
                Preview do Perfil
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
              >
                <Save size={16} />
                Salvar
              </button>
              <button className="relative p-2 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Photo Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Camera size={20} className="text-pastel-blue" />
                Foto do Perfil
              </h2>
              
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img 
                    src={avatarUrl} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-xl object-cover border-4 border-slate-100"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center hover:bg-opacity-80 transition disabled:opacity-50"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="text-slate-700 animate-spin" size={20} />
                    ) : (
                      <Camera className="text-slate-700" size={20} />
                    )}
                  </button>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    Sua foto ajuda outras pessoas a reconhecer voce na plataforma. 
                    Formatos aceitos: JPG, PNG. Tamanho maximo: 5MB.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition disabled:opacity-50 flex items-center"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="inline mr-2 animate-spin" size={16} />
                    ) : (
                      <Upload className="inline mr-2" size={16} />
                    )}
                    {isUploadingAvatar ? 'Carregando...' : 'Carregar Foto'}
                  </button>
                </div>
              </div>
            </section>

            {/* Basic Info Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Informacoes Basicas</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="displayName" className="text-sm font-medium text-slate-700">
                    Nome de Exibicao
                  </Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex: Ana Costa"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="professionalTitle" className="text-sm font-medium text-slate-700">
                    Titulo Profissional
                  </Label>
                  <Input
                    id="professionalTitle"
                    value={professionalTitle}
                    onChange={(e) => setProfessionalTitle(e.target.value)}
                    placeholder="Ex: Especialista em Pagamentos"
                    className="mt-1"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="subtitle" className="text-sm font-medium text-slate-700">
                    Subtitulo
                  </Label>
                  <Input
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Ex: Especialista em Pagamentos e Sistemas Financeiros"
                    className="mt-1"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-slate-700">
                    Biografia
                  </Label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Conte um pouco sobre voce, sua experiencia e areas de atuacao..."
                    rows={5}
                    className="mt-1 w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  />
                </div>
              </div>
            </section>

            {/* Location & Institution Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Localizacao e Instituicao</h2>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MapPin size={14} />
                    Localizacao
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ex: Sao Paulo, Brasil"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="institution" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Building2 size={14} />
                    Instituicao
                  </Label>
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ex: Banco Central do Brasil"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="memberSince" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Calendar size={14} />
                    Membro desde
                  </Label>
                  <Input
                    id="memberSince"
                    value={memberSince}
                    onChange={(e) => setMemberSince(e.target.value)}
                    placeholder="Ex: 2020"
                    className="mt-1"
                  />
                </div>
              </div>
            </section>

            {/* Social Links Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Link2 size={20} className="text-pastel-purple" />
                Redes Sociais
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="twitter" className="text-sm font-medium text-slate-700">
                    Twitter/X
                  </Label>
                  <Input
                    id="twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="@usuario"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram" className="text-sm font-medium text-slate-700">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@usuario"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="youtube" className="text-sm font-medium text-slate-700">
                    YouTube
                  </Label>
                  <Input
                    id="youtube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="@canal"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="linkedin" className="text-sm font-medium text-slate-700">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="linkedin.com/in/usuario"
                    className="mt-1"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="portfolio" className="text-sm font-medium text-slate-700">
                    Portfolio/Site Pessoal
                  </Label>
                  <Input
                    id="portfolio"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://seusite.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => navigate('/minha-conta')}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-3 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
              >
                <Save size={18} />
                Salvar Perfil Social
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Preview Sheet */}
      <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <SheetContent className="w-[700px] sm:max-w-[700px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Preview do Perfil</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Profile Preview Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-6">
                <img 
                  src={avatarUrl} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground">
                    {displayName || "Seu Nome"}
                  </h2>
                  <p className="text-lg text-muted-foreground font-medium">
                    {subtitle || "Seu titulo profissional"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                    {location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {location}
                      </span>
                    )}
                    {institution && (
                      <span className="flex items-center gap-1">
                        <Building2 size={14} />
                        {institution}
                      </span>
                    )}
                    {memberSince && (
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Membro desde {memberSince}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {bio && (
                <p className="text-foreground/80 leading-relaxed mt-4 pt-4 border-t border-border">
                  {bio}
                </p>
              )}
            </div>

            {/* Social Links Preview */}
            {(twitter || instagram || youtube || linkedin || portfolio) && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Redes Sociais</h3>
                <div className="flex flex-wrap gap-3">
                  {twitter && (
                    <span className="px-3 py-1.5 bg-pastel-blue/50 rounded-full text-sm text-slate-700">
                      Twitter: {twitter}
                    </span>
                  )}
                  {instagram && (
                    <span className="px-3 py-1.5 bg-pastel-pink/50 rounded-full text-sm text-slate-700">
                      Instagram: {instagram}
                    </span>
                  )}
                  {youtube && (
                    <span className="px-3 py-1.5 bg-pastel-red/50 rounded-full text-sm text-slate-700">
                      YouTube: {youtube}
                    </span>
                  )}
                  {linkedin && (
                    <span className="px-3 py-1.5 bg-pastel-blue/50 rounded-full text-sm text-slate-700">
                      LinkedIn: {linkedin}
                    </span>
                  )}
                  {portfolio && (
                    <span className="px-3 py-1.5 bg-pastel-green/50 rounded-full text-sm text-slate-700">
                      Site: {portfolio}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Stats Preview (mock) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-pastel-blue/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-pastel-dark-gray">0</p>
                <p className="text-sm text-muted-foreground mt-1">Conteudos</p>
              </div>
              <div className="bg-pastel-purple/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-pastel-dark-gray">0</p>
                <p className="text-sm text-muted-foreground mt-1">Seguidores</p>
              </div>
              <div className="bg-pastel-green/50 border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-pastel-dark-gray">0</p>
                <p className="text-sm text-muted-foreground mt-1">Vendas</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
