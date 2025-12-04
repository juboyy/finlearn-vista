import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, ArrowLeft, MapPin, Briefcase, Users, Video, Mic, 
  MessageCircle, UsersRound, Award, Mail, Linkedin, Globe, 
  Plus, Trash2, Save, Camera, Loader2, Clock, Bot, Check
} from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Certification {
  id: string;
  name: string;
  institution: string;
}

const ContaMentoria = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Personal Info
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");

  // Bio
  const [bio, setBio] = useState("");

  // Professional Experience
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: "1", position: "", company: "", startDate: "", endDate: "", description: "" }
  ]);

  // Mentoring Channels
  const [channelVideo, setChannelVideo] = useState(true);
  const [channelAudio, setChannelAudio] = useState(true);
  const [channelChat, setChannelChat] = useState(true);
  const [channelGroup, setChannelGroup] = useState(false);

  // Specialties
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [newSpecialty, setNewSpecialty] = useState("");

  // Certifications
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: "1", name: "", institution: "" }
  ]);

  // Availability
  const [preferredTime, setPreferredTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState("60");

  // Pricing
  const [individualPrice, setIndividualPrice] = useState("");
  const [packageSessions, setPackageSessions] = useState("5");
  const [packagePrice, setPackagePrice] = useState("");
  const [groupPrice, setGroupPrice] = useState("");

  // Contact
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  // Avatar IA
  const [avatarIAEnabled, setAvatarIAEnabled] = useState(false);
  const [avatarIAPerConsultation, setAvatarIAPerConsultation] = useState("");
  const [avatarIAMonthly, setAvatarIAMonthly] = useState("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now().toString(), position: "", company: "", startDate: "", endDate: "", description: "" }
    ]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter(s => s !== specialty));
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { id: Date.now().toString(), name: "", institution: "" }
    ]);
  };

  const removeCertification = (id: string) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter(cert => cert.id !== id));
    }
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const handleSave = async () => {
    if (!name.trim() || !position.trim()) {
      toast({
        variant: "destructive",
        title: "Campos obrigatorios",
        description: "Nome e cargo sao obrigatorios.",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    toast({
      title: "Conta de Mentoria criada",
      description: "Seu perfil de mentor foi cadastrado com sucesso.",
    });
    
    navigate("/minha-conta");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Conta de Mentoria</h1>
                <p className="text-sm text-slate-500 mt-1">Configure seu perfil como mentor</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isSaving ? "Salvando..." : "Salvar Perfil"}
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="col-span-2 space-y-6">
              {/* Photo and Basic Info */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Users size={20} className="text-slate-600" />
                  Informacoes Basicas
                </h3>
                
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-pastel-purple transition overflow-hidden"
                    >
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="text-slate-400" size={32} />
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <p className="text-xs text-slate-500 mt-2 text-center">Foto de perfil</p>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Cargo/Titulo *</Label>
                      <Input
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Ex: Diretor de Compliance"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Nome da empresa"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Localizacao</Label>
                      <div className="relative mt-1">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Cidade, Estado"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="experience">Anos de experiencia</Label>
                      <div className="relative mt-1">
                        <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="experience"
                          value={yearsExperience}
                          onChange={(e) => setYearsExperience(e.target.value)}
                          placeholder="Ex: 15"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="status">Status de disponibilidade</Label>
                  <Select value={availabilityStatus} onValueChange={setAvailabilityStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponivel</SelectItem>
                      <SelectItem value="busy">Ocupado</SelectItem>
                      <SelectItem value="unavailable">Indisponivel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </section>

              {/* Bio */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-slate-600" />
                  Sobre Voce
                </h3>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Descreva sua trajetoria profissional, areas de atuacao e como voce pode ajudar seus mentorados..."
                  className="min-h-[150px]"
                />
              </section>

              {/* Professional Experience */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Briefcase size={20} className="text-slate-600" />
                    Experiencia Profissional
                  </h3>
                  <button
                    onClick={addExperience}
                    className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Adicionar
                  </button>
                </div>
                
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="p-4 border-2 border-slate-200 rounded-lg relative">
                      {experiences.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Cargo</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            placeholder="Ex: Gerente de Compliance"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Empresa</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Nome da empresa"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Data inicio</Label>
                          <Input
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            placeholder="Ex: 2019"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Data fim</Label>
                          <Input
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            placeholder="Ex: Atual"
                            className="mt-1"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Descricao</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="Descreva suas responsabilidades e conquistas..."
                            className="mt-1 min-h-[80px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mentoring Channels */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <MessageCircle size={20} className="text-slate-600" />
                  Canais de Mentoria
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-purple border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Video size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Videoconferencia</p>
                        <p className="text-xs text-slate-500">Sessoes ao vivo</p>
                      </div>
                    </div>
                    <Switch checked={channelVideo} onCheckedChange={setChannelVideo} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-blue border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Mic size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Audio</p>
                        <p className="text-xs text-slate-500">Chamadas de voz</p>
                      </div>
                    </div>
                    <Switch checked={channelAudio} onCheckedChange={setChannelAudio} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-green border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <MessageCircle size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Chat</p>
                        <p className="text-xs text-slate-500">Mensagens de texto</p>
                      </div>
                    </div>
                    <Switch checked={channelChat} onCheckedChange={setChannelChat} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pastel-yellow border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <UsersRound size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Grupo</p>
                        <p className="text-xs text-slate-500">Sessoes coletivas</p>
                      </div>
                    </div>
                    <Switch checked={channelGroup} onCheckedChange={setChannelGroup} />
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Award size={20} className="text-slate-600" />
                    Certificacoes
                  </h3>
                  <button
                    onClick={addCertification}
                    className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Adicionar
                  </button>
                </div>
                
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-4">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <Input
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                          placeholder="Nome da certificacao (Ex: CPA-20)"
                        />
                        <Input
                          value={cert.institution}
                          onChange={(e) => updateCertification(cert.id, "institution", e.target.value)}
                          placeholder="Instituicao (Ex: ANBIMA)"
                        />
                      </div>
                      {certifications.length > 1 && (
                        <button
                          onClick={() => removeCertification(cert.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Specialties */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Especialidades</h3>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Nova especialidade"
                    onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
                  />
                  <button
                    onClick={addSpecialty}
                    className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg hover:bg-opacity-80 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <span 
                      key={specialty} 
                      className="px-3 py-1.5 bg-slate-400 text-white rounded-full text-sm border-2 border-slate-300 flex items-center gap-2"
                    >
                      {specialty}
                      <button onClick={() => removeSpecialty(specialty)} className="hover:text-red-200">
                        <Trash2 size={12} />
                      </button>
                    </span>
                  ))}
                  {specialties.length === 0 && (
                    <p className="text-sm text-slate-500">Nenhuma especialidade adicionada</p>
                  )}
                </div>
              </section>

              {/* Availability */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-slate-600" />
                  Disponibilidade
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Horario preferencial</Label>
                    <Input
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      placeholder="Ex: 14h - 18h"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Duracao da sessao</Label>
                    <Select value={sessionDuration} onValueChange={setSessionDuration}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                        <SelectItem value="120">120 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              {/* Pricing */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Investimento</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Sessao individual (R$/hora)</Label>
                    <Input
                      value={individualPrice}
                      onChange={(e) => setIndividualPrice(e.target.value)}
                      placeholder="Ex: 450"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Pacote de sessoes</Label>
                    <div className="flex gap-3 mt-1">
                      <Select value={packageSessions} onValueChange={setPackageSessions}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Qtd" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 sessoes</SelectItem>
                          <SelectItem value="5">5 sessoes</SelectItem>
                          <SelectItem value="8">8 sessoes</SelectItem>
                          <SelectItem value="10">10 sessoes</SelectItem>
                          <SelectItem value="12">12 sessoes</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={packagePrice}
                        onChange={(e) => setPackagePrice(e.target.value)}
                        placeholder="Valor total (R$)"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Mentoria em grupo (R$/pessoa/hora)</Label>
                    <Input
                      value={groupPrice}
                      onChange={(e) => setGroupPrice(e.target.value)}
                      placeholder="Ex: 180"
                      className="mt-1"
                    />
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Contato</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <div className="relative mt-1">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>LinkedIn</Label>
                    <div className="relative mt-1">
                      <Linkedin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="linkedin.com/in/seuperfil"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Website</Label>
                    <div className="relative mt-1">
                      <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="seusite.com.br"
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Avatar IA */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-purple border-2 border-slate-300 rounded-lg flex items-center justify-center">
                      <Bot size={20} className="text-slate-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Avatar IA</h3>
                  </div>
                  <Switch checked={avatarIAEnabled} onCheckedChange={setAvatarIAEnabled} />
                </div>
                
                <p className="text-sm text-slate-600 mb-4">
                  Permita que mentorados consultem seu avatar digital a qualquer momento.
                </p>
                
                {avatarIAEnabled && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Check size={14} className="text-pastel-green" />
                        <span>Respostas baseadas na sua expertise</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Check size={14} className="text-pastel-green" />
                        <span>Disponivel 24 horas por dia</span>
                      </div>
                    </div>
                    <div>
                      <Label>Preco por consulta (R$)</Label>
                      <Input
                        value={avatarIAPerConsultation}
                        onChange={(e) => setAvatarIAPerConsultation(e.target.value)}
                        placeholder="Ex: 15"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Mensal ilimitado (R$)</Label>
                      <Input
                        value={avatarIAMonthly}
                        onChange={(e) => setAvatarIAMonthly(e.target.value)}
                        placeholder="Ex: 149"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContaMentoria;
