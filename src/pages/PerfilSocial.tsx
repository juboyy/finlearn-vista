import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, Bell, Eye, Save, Camera, MapPin, Building2, Calendar,
  Link2, Loader2, Plus, X, Image, Briefcase, GraduationCap,
  Twitter, Instagram, Youtube, Linkedin, Github, Facebook, MessageCircle, Globe, Send, Phone,
  Video, Mail, AlertCircle
} from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSocialProfile } from "@/hooks/useSocialProfile";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SocialNetwork {
  key: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}

export default function PerfilSocial() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const {
    profile,
    isLoading,
    isSaving,
    validationErrors,
    updateProfile,
    updateSocialLink,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    saveProfile,
    getCompletionPercentage,
  } = useSocialProfile();

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
    
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      updateProfile({ avatar_url: url });
      setIsUploadingAvatar(false);
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    }, 1000);
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O tamanho maximo permitido e 10MB.",
      });
      return;
    }

    setIsUploadingCover(true);
    
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      updateProfile({ cover_url: url });
      setIsUploadingCover(false);
      toast({
        title: "Capa atualizada",
        description: "Sua foto de capa foi atualizada com sucesso.",
      });
    }, 1000);
  };

  const socialNetworks: SocialNetwork[] = [
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/usuario', icon: <Linkedin size={18} /> },
    { key: 'twitter', label: 'Twitter/X', placeholder: '@usuario', icon: <Twitter size={18} /> },
    { key: 'instagram', label: 'Instagram', placeholder: '@usuario', icon: <Instagram size={18} /> },
    { key: 'youtube', label: 'YouTube', placeholder: '@canal', icon: <Youtube size={18} /> },
    { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/usuario', icon: <Facebook size={18} /> },
    { key: 'github', label: 'GitHub', placeholder: 'github.com/usuario', icon: <Github size={18} /> },
    { key: 'tiktok', label: 'TikTok', placeholder: '@usuario', icon: <MessageCircle size={18} /> },
    { key: 'threads', label: 'Threads', placeholder: '@usuario', icon: <MessageCircle size={18} /> },
    { key: 'medium', label: 'Medium', placeholder: '@usuario', icon: <MessageCircle size={18} /> },
    { key: 'telegram', label: 'Telegram', placeholder: '@usuario', icon: <Send size={18} /> },
    { key: 'whatsapp', label: 'WhatsApp', placeholder: '+55 11 99999-9999', icon: <Phone size={18} /> },
    { key: 'portfolio', label: 'Portfolio/Site', placeholder: 'https://seusite.com', icon: <Globe size={18} /> },
  ];

  const completionPercentage = getCompletionPercentage();
  const hasErrors = Object.keys(validationErrors).length > 0;

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <SidebarFix />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" size={40} />
        </div>
      </div>
    );
  }

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
              <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-lg">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pastel-green transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{completionPercentage}%</span>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(true)}
                className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
              >
                <Eye size={16} />
                Preview do Perfil
              </button>
              <button 
                onClick={() => saveProfile()}
                disabled={isSaving}
                className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
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
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Validation Alert */}
            {hasErrors && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Por favor, preencha os campos obrigatorios marcados em vermelho antes de salvar.
                </AlertDescription>
              </Alert>
            )}

            {/* Cover Photo Section */}
            <section className="bg-card border border-border rounded-xl overflow-hidden">
              <div 
                className="relative h-48 bg-gradient-to-br from-pastel-blue/30 via-pastel-purple/20 to-pastel-pink/30"
                style={profile.cover_url ? { backgroundImage: `url(${profile.cover_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                <div className="absolute inset-0 bg-black/10" />
                <button 
                  onClick={() => coverInputRef.current?.click()}
                  disabled={isUploadingCover}
                  className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-lg font-medium hover:bg-white transition flex items-center gap-2 shadow-sm"
                >
                  {isUploadingCover ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Image size={16} />
                  )}
                  {profile.cover_url ? 'Alterar Capa' : 'Adicionar Capa'}
                </button>
                {profile.cover_url && (
                  <button 
                    onClick={() => updateProfile({ cover_url: '' })}
                    className="absolute top-4 right-40 px-3 py-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg font-medium hover:bg-white transition flex items-center gap-2 shadow-sm"
                  >
                    <X size={16} />
                    Remover
                  </button>
                )}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </div>
              
              <div className="p-6 pt-0 -mt-16 relative z-10">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-card shadow-lg"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center hover:bg-opacity-80 transition disabled:opacity-50 shadow-md"
                    >
                      {isUploadingAvatar ? (
                        <Loader2 className="text-slate-700 animate-spin" size={18} />
                      ) : (
                        <Camera className="text-slate-700" size={18} />
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm text-muted-foreground">
                      Foto de perfil e capa ajudam outras pessoas a reconhecer voce na plataforma.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Perfil: JPG, PNG ou WebP ate 5MB | Capa: ate 10MB (recomendado: 1500x500px)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Basic Info Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-pastel-purple flex items-center justify-center">
                  <GraduationCap size={18} className="text-slate-600" />
                </span>
                Informacoes Basicas
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="displayName" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    Nome de Exibicao
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="displayName"
                    value={profile.display_name}
                    onChange={(e) => updateProfile({ display_name: e.target.value })}
                    placeholder="Ex: Ana Costa"
                    className={`mt-1 ${validationErrors.display_name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {validationErrors.display_name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationErrors.display_name}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="professionalTitle" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    Titulo Profissional
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="professionalTitle"
                    value={profile.professional_title}
                    onChange={(e) => updateProfile({ professional_title: e.target.value })}
                    placeholder="Ex: Especialista em Pagamentos"
                    className={`mt-1 ${validationErrors.professional_title ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {validationErrors.professional_title && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {validationErrors.professional_title}
                    </p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="subtitle" className="text-sm font-medium text-slate-700">
                    Subtitulo / Headline
                  </Label>
                  <Input
                    id="subtitle"
                    value={profile.subtitle}
                    onChange={(e) => updateProfile({ subtitle: e.target.value })}
                    placeholder="Ex: Especialista em Pagamentos e Sistemas Financeiros"
                    className="mt-1"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    Biografia
                    <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
                    placeholder="Conte um pouco sobre voce, sua experiencia e areas de atuacao..."
                    rows={5}
                    className={`mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-background resize-none ${
                      validationErrors.bio ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-ring'
                    }`}
                  />
                  <div className="flex justify-between mt-1">
                    {validationErrors.bio ? (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {validationErrors.bio}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p className={`text-xs ${profile.bio.length > 500 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {profile.bio.length}/500 caracteres
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Location & Institution Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-pastel-green flex items-center justify-center">
                  <MapPin size={18} className="text-slate-600" />
                </span>
                Localizacao e Instituicao Atual
              </h2>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MapPin size={14} />
                    Localizacao
                  </Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    placeholder="Ex: Sao Paulo, Brasil"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="institution" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Building2 size={14} />
                    Instituicao Atual
                  </Label>
                  <Input
                    id="institution"
                    value={profile.institution}
                    onChange={(e) => updateProfile({ institution: e.target.value })}
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
                    value={profile.member_since}
                    onChange={(e) => updateProfile({ member_since: e.target.value })}
                    placeholder="Ex: 2020"
                    className="mt-1"
                  />
                </div>
              </div>
            </section>

            {/* Work Experience Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-pastel-orange flex items-center justify-center">
                    <Briefcase size={18} className="text-slate-600" />
                  </span>
                  Experiencia Profissional
                </h2>
                <button
                  onClick={addWorkExperience}
                  className="px-4 py-2 bg-pastel-blue/50 text-slate-700 rounded-lg font-medium hover:bg-pastel-blue/70 transition flex items-center gap-2 text-sm"
                >
                  <Plus size={16} />
                  Adicionar Experiencia
                </button>
              </div>
              
              {profile.work_experiences.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                  <Briefcase className="mx-auto text-muted-foreground mb-3" size={40} />
                  <p className="text-muted-foreground mb-2">Nenhuma experiencia adicionada</p>
                  <p className="text-sm text-muted-foreground">Adicione seus locais de trabalho anteriores</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.work_experiences.map((exp) => (
                    <div key={exp.id} className="bg-accent/30 border border-border rounded-xl p-5 relative">
                      <button
                        onClick={() => removeWorkExperience(exp.id)}
                        className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <X size={18} />
                      </button>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-slate-700">Empresa/Instituicao</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                            placeholder="Ex: Banco Itau"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700">Cargo/Funcao</Label>
                          <Input
                            value={exp.role}
                            onChange={(e) => updateWorkExperience(exp.id, 'role', e.target.value)}
                            placeholder="Ex: Analista de Pagamentos"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-700">Localizacao</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                            placeholder="Ex: Sao Paulo, SP"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm font-medium text-slate-700">Inicio</Label>
                            <Input
                              value={exp.startYear}
                              onChange={(e) => updateWorkExperience(exp.id, 'startYear', e.target.value)}
                              placeholder="2020"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-700">Fim</Label>
                            <Input
                              value={exp.endYear}
                              onChange={(e) => updateWorkExperience(exp.id, 'endYear', e.target.value)}
                              placeholder="2023"
                              disabled={exp.current}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      <label className="flex items-center gap-2 mt-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                          className="w-4 h-4 rounded border-border text-pastel-blue focus:ring-pastel-blue"
                        />
                        <span className="text-sm text-muted-foreground">Trabalho atual</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Social Links Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-pastel-pink flex items-center justify-center">
                  <Link2 size={18} className="text-slate-600" />
                </span>
                Redes Sociais e Links
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {socialNetworks.map((social) => (
                  <div key={social.key} className="group">
                    <Label htmlFor={social.key} className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-1.5">
                      <span className="text-slate-500">{social.icon}</span>
                      {social.label}
                    </Label>
                    <Input
                      id={social.key}
                      value={profile.social_links[social.key as keyof typeof profile.social_links] || ''}
                      onChange={(e) => updateSocialLink(social.key, e.target.value)}
                      placeholder={social.placeholder}
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Options Section */}
            <section className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-pastel-blue flex items-center justify-center">
                  <MessageCircle size={18} className="text-slate-600" />
                </span>
                Formas de Contato Direto
              </h2>
              
              <p className="text-sm text-muted-foreground mb-4">
                Selecione quais formas de contato voce deseja disponibilizar no seu perfil publico.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="flex items-center gap-3 p-4 bg-accent/30 border border-border rounded-xl cursor-pointer hover:bg-accent/50 transition">
                  <input 
                    type="checkbox" 
                    checked={profile.contact_message}
                    onChange={(e) => updateProfile({ contact_message: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-pastel-blue focus:ring-pastel-blue" 
                  />
                  <MessageCircle size={20} className="text-slate-600" />
                  <span className="font-medium text-foreground">Mensagem</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 bg-accent/30 border border-border rounded-xl cursor-pointer hover:bg-accent/50 transition">
                  <input 
                    type="checkbox"
                    checked={profile.contact_audio}
                    onChange={(e) => updateProfile({ contact_audio: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-pastel-blue focus:ring-pastel-blue" 
                  />
                  <Phone size={20} className="text-slate-600" />
                  <span className="font-medium text-foreground">Audio</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 bg-accent/30 border border-border rounded-xl cursor-pointer hover:bg-accent/50 transition">
                  <input 
                    type="checkbox"
                    checked={profile.contact_video}
                    onChange={(e) => updateProfile({ contact_video: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-pastel-blue focus:ring-pastel-blue" 
                  />
                  <Video size={20} className="text-slate-600" />
                  <span className="font-medium text-foreground">Video</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 bg-accent/30 border border-border rounded-xl cursor-pointer hover:bg-accent/50 transition">
                  <input 
                    type="checkbox"
                    checked={profile.contact_email_enabled}
                    onChange={(e) => updateProfile({ contact_email_enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-pastel-blue focus:ring-pastel-blue" 
                  />
                  <Mail size={20} className="text-slate-600" />
                  <span className="font-medium text-foreground">E-mail</span>
                </label>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail" className="text-sm font-medium text-slate-700">
                    E-mail para Contato
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={profile.contact_email}
                    onChange={(e) => updateProfile({ contact_email: e.target.value })}
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone" className="text-sm font-medium text-slate-700">
                    Telefone para Contato
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={profile.contact_phone}
                    onChange={(e) => updateProfile({ contact_phone: e.target.value })}
                    placeholder="+55 11 99999-9999"
                    className="mt-1"
                  />
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end gap-4 pb-8">
              <button 
                onClick={() => navigate('/minha-conta')}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={() => saveProfile()}
                disabled={isSaving}
                className="px-6 py-3 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
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
            {/* Cover + Profile Preview */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div 
                className="h-32 bg-gradient-to-br from-pastel-blue/30 via-pastel-purple/20 to-pastel-pink/30"
                style={profile.cover_url ? { backgroundImage: `url(${profile.cover_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              />
              <div className="px-6 pb-6 -mt-12 relative">
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-xl object-cover border-4 border-card shadow-lg"
                />
                <div className="mt-3">
                  <h2 className="text-xl font-bold text-foreground">
                    {profile.display_name || "Seu Nome"}
                  </h2>
                  <p className="text-muted-foreground font-medium">
                    {profile.subtitle || "Seu titulo profissional"}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                    {profile.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {profile.location}
                      </span>
                    )}
                    {profile.institution && (
                      <span className="flex items-center gap-1">
                        <Building2 size={14} />
                        {profile.institution}
                      </span>
                    )}
                    {profile.member_since && (
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Desde {profile.member_since}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {profile.bio && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-foreground/80 leading-relaxed border-t border-border pt-4">
                    {profile.bio}
                  </p>
                </div>
              )}
            </div>

            {/* Work Experience Preview */}
            {profile.work_experiences.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4 flex items-center gap-2">
                  <Briefcase size={16} />
                  Experiencia Profissional
                </h3>
                <div className="space-y-3">
                  {profile.work_experiences.map((exp) => (
                    <div key={exp.id} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                      <div className="w-10 h-10 bg-pastel-blue/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 size={18} className="text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{exp.role || "Cargo"}</p>
                        <p className="text-sm text-muted-foreground">{exp.company || "Empresa"}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {exp.location && `${exp.location} • `}
                          {exp.startYear} - {exp.current ? "Atual" : exp.endYear}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links Preview */}
            {Object.values(profile.social_links).some(v => v) && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Redes Sociais</h3>
                <div className="grid grid-cols-2 gap-2">
                  {socialNetworks.filter(s => profile.social_links[s.key as keyof typeof profile.social_links]).map((social) => (
                    <div 
                      key={social.key} 
                      className="flex items-center gap-2 px-3 py-2 bg-accent/50 rounded-lg"
                    >
                      <span className="text-slate-500">{social.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{social.label}</p>
                        <p className="text-sm text-slate-700 truncate">
                          {profile.social_links[social.key as keyof typeof profile.social_links]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Preview (mock) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-pastel-blue border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-slate-600">0</p>
                <p className="text-sm text-slate-500 mt-1">Conteudos</p>
              </div>
              <div className="bg-pastel-purple border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-slate-600">0</p>
                <p className="text-sm text-slate-500 mt-1">Seguidores</p>
              </div>
              <div className="bg-pastel-green border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-slate-600">0</p>
                <p className="text-sm text-slate-500 mt-1">Vendas</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
