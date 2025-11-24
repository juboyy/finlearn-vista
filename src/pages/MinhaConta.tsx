import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Camera, IdCard, Edit, Briefcase, Plus, Star, Crown, GraduationCap, 
  Award, CheckCircle, CreditCard, Rocket, Shield, Eye, TrendingUp, 
  Download, FileText, AlertTriangle, XCircle, X, Bell, User, Building2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function MinhaConta() {
  const [activeSection, setActiveSection] = useState("perfil");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const perfilRef = useRef<HTMLElement>(null);
  const pessoalRef = useRef<HTMLElement>(null);
  const profissionalRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLElement>(null);
  const assinaturaRef = useRef<HTMLElement>(null);
  const privacidadeRef = useRef<HTMLElement>(null);
  const documentosRef = useRef<HTMLElement>(null);
  const perigoRef = useRef<HTMLElement>(null);

  // Fade-in animations
  const fadePerfilRef = useFadeInOnScroll<HTMLElement>();
  const fadePessoalRef = useFadeInOnScroll<HTMLElement>();
  const fadeProfissionalRef = useFadeInOnScroll<HTMLElement>();
  const fadeStatusRef = useFadeInOnScroll<HTMLElement>();
  const fadeAssinaturaRef = useFadeInOnScroll<HTMLElement>();
  const fadePrivacidadeRef = useFadeInOnScroll<HTMLElement>();
  const fadeDocumentosRef = useFadeInOnScroll<HTMLElement>();
  const fadePerigoRef = useFadeInOnScroll<HTMLElement>();

  // Combine refs for each section
  const combineRefs = (scrollRef: React.RefObject<HTMLElement>, fadeRef: React.RefObject<HTMLElement>) => 
    (element: HTMLElement | null) => {
      if (scrollRef) (scrollRef as React.MutableRefObject<HTMLElement | null>).current = element;
      if (fadeRef) (fadeRef as React.MutableRefObject<HTMLElement | null>).current = element;
    };

  const handleDeleteAccount = () => {
    if (!passwordConfirmation.trim()) {
      toast({
        variant: "destructive",
        title: "Senha necessária",
        description: "Por favor, digite sua senha para confirmar a exclusão da conta.",
      });
      return;
    }

    setIsDeleting(true);

    // Simular validação de senha e exclusão
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setPasswordConfirmation("");
      
      toast({
        variant: "destructive",
        title: "Conta excluída",
        description: "Sua conta foi permanentemente excluída do sistema.",
      });
      
      // Aqui você implementaria a lógica real de exclusão
      // Por exemplo: signOut e redirect para home
    }, 2000);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPasswordConfirmation("");
  };

  const scrollToSection = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLElement> } = {
      perfil: perfilRef,
      pessoal: pessoalRef,
      profissional: profissionalRef,
      status: statusRef,
      assinatura: assinaturaRef,
      privacidade: privacidadeRef,
      documentos: documentosRef,
      perigo: perigoRef,
    };

    const ref = refs[section];
    const mainElement = mainRef.current;
    
    if (ref?.current && mainElement) {
      const offset = 100;
      const elementTop = ref.current.offsetTop;
      const scrollPosition = elementTop - offset;

      mainElement.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
      setActiveSection(section);
    }
  };

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      const sections = [
        { id: "perfil", ref: perfilRef },
        { id: "pessoal", ref: pessoalRef },
        { id: "profissional", ref: profissionalRef },
        { id: "status", ref: statusRef },
        { id: "assinatura", ref: assinaturaRef },
        { id: "privacidade", ref: privacidadeRef },
        { id: "documentos", ref: documentosRef },
        { id: "perigo", ref: perigoRef },
      ];

      const scrollPosition = mainElement.scrollTop + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Minha Conta</h1>
              <p className="text-sm text-slate-500 mt-1">Gerencie suas informações pessoais e preferências</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="text-lg" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-4 h-fit sticky top-24">
              <nav className="space-y-1">
                <button 
                  onClick={() => scrollToSection("perfil")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "perfil" 
                      ? "bg-pastel-blue text-slate-800 font-medium" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <User size={20} />
                  <span>Perfil</span>
                </button>
                <button 
                  onClick={() => scrollToSection("profissional")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "profissional" 
                      ? "bg-pastel-blue text-slate-800 font-medium" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Briefcase size={20} />
                  <span>Profissional</span>
                </button>
                <button 
                  onClick={() => scrollToSection("assinatura")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "assinatura" 
                      ? "bg-pastel-blue text-slate-800 font-medium" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <CreditCard size={20} />
                  <span>Assinatura</span>
                </button>
                <button 
                  onClick={() => scrollToSection("privacidade")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "privacidade" 
                      ? "bg-pastel-blue text-slate-800 font-medium" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Shield size={20} />
                  <span>Privacidade</span>
                </button>
                <button 
                  onClick={() => scrollToSection("documentos")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "documentos" 
                      ? "bg-pastel-blue text-slate-800 font-medium" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <FileText size={20} />
                  <span>Documentos</span>
                </button>
                <button 
                  onClick={() => scrollToSection("perigo")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "perigo" 
                      ? "bg-pastel-blue text-slate-800 font-medium" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <AlertTriangle size={20} />
                  <span>Zona de Perigo</span>
                </button>
              </nav>
            </div>

            <div className="col-span-3 space-y-6">
              <section ref={combineRefs(perfilRef, fadePerfilRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <Camera className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Foto do Perfil</h2>
                    <p className="text-sm text-slate-500">Atualize sua foto de perfil</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="relative">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-slate-100"
                    />
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center hover:bg-opacity-80 transition">
                      <Camera className="text-slate-700" size={20} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-4">Sua foto ajuda outras pessoas a reconhecer você na plataforma. Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB.</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        <Download className="inline mr-2" size={16} />
                        Carregar Foto
                      </button>
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                        Remover
                      </button>
                      <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        <Building2 className="inline mr-2" size={16} />
                        Conta Empresarial
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section ref={combineRefs(pessoalRef, fadePessoalRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                      <IdCard className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">Dados Pessoais</h2>
                      <p className="text-sm text-slate-500">Informações básicas da sua conta</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    <Edit className="inline mr-2" size={16} />
                    Editar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      defaultValue="João Silva Santos" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue="joao.silva@email.com" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                    <input 
                      type="tel" 
                      defaultValue="+55 11 98765-4321" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">CPF</label>
                    <input 
                      type="text" 
                      defaultValue="123.456.789-00" 
                      disabled 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Data de Nascimento</label>
                    <input 
                      type="date" 
                      defaultValue="1990-05-15" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gênero</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                      <option>Masculino</option>
                      <option>Feminino</option>
                      <option>Outro</option>
                      <option>Prefiro não informar</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                    Cancelar
                  </button>
                  <button className="px-6 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Salvar Alterações
                  </button>
                </div>
              </section>

              <section ref={combineRefs(profissionalRef, fadeProfissionalRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <Briefcase className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Informações Profissionais</h2>
                    <p className="text-sm text-slate-500">Dados sobre sua carreira no mercado financeiro</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Empresa</label>
                    <input 
                      type="text" 
                      defaultValue="Banco XYZ S.A." 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Cargo</label>
                    <input 
                      type="text" 
                      defaultValue="Analista de Investimentos Sr." 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Departamento</label>
                    <input 
                      type="text" 
                      defaultValue="Gestão de Ativos" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tempo de Experiência</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pastel-blue focus:border-transparent">
                      <option>Menos de 1 ano</option>
                      <option>1-3 anos</option>
                      <option>3-5 anos</option>
                      <option selected>5-10 anos</option>
                      <option>Mais de 10 anos</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Certificações</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-3 py-1 bg-pastel-green rounded-full text-sm text-slate-700 flex items-center gap-2">
                        CPA-20
                        <button className="hover:text-red-600"><X size={12} /></button>
                      </span>
                      <span className="px-3 py-1 bg-pastel-green rounded-full text-sm text-slate-700 flex items-center gap-2">
                        CEA
                        <button className="hover:text-red-600"><X size={12} /></button>
                      </span>
                      <span className="px-3 py-1 bg-pastel-green rounded-full text-sm text-slate-700 flex items-center gap-2">
                        CFP
                        <button className="hover:text-red-600"><X size={12} /></button>
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition text-sm">
                      <Plus className="inline mr-2" size={16} />
                      Adicionar Certificação
                    </button>
                  </div>
                </div>
              </section>

              <section ref={combineRefs(statusRef, fadeStatusRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <Star className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Status da Conta</h2>
                    <p className="text-sm text-slate-500">Informações sobre seu plano e benefícios</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg border-2 border-pastel-yellow bg-pastel-yellow bg-opacity-10">
                    <div className="flex items-center gap-3 mb-2">
                      <Crown className="text-slate-700" size={24} />
                      <span className="px-2 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full font-medium">ATIVO</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Plano Premium</h3>
                    <p className="text-sm text-slate-500">Renovação em 15/12/2024</p>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="text-slate-700" size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">24 Cursos</h3>
                    <p className="text-sm text-slate-500">18 concluídos</p>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="text-slate-700" size={24} />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">18 Certificados</h3>
                    <p className="text-sm text-slate-500">Emitidos pela plataforma</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-slate-800">Benefícios Ativos</h3>
                    <button className="text-sm text-pastel-blue hover:underline">Ver todos</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="text-pastel-green" size={16} />
                      <span>Acesso ilimitado a conteúdos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="text-pastel-green" size={16} />
                      <span>Webinars exclusivos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="text-pastel-green" size={16} />
                      <span>Suporte prioritário</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="text-pastel-green" size={16} />
                      <span>Downloads offline</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="text-pastel-green" size={16} />
                      <span>Certificados digitais</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="text-pastel-green" size={16} />
                      <span>Comunidade exclusiva</span>
                    </div>
                  </div>
                </div>
              </section>

              <section ref={combineRefs(assinaturaRef, fadeAssinaturaRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center">
                    <CreditCard className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Assinatura e Pagamento</h2>
                    <p className="text-sm text-slate-500">Gerencie seu plano e método de pagamento</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-800">Método de Pagamento</h3>
                      <button className="text-sm text-pastel-blue hover:underline">Alterar</button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                        <CreditCard className="text-slate-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">•••• •••• •••• 4532</p>
                        <p className="text-xs text-slate-500">Expira em 12/2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-800">Histórico de Pagamentos</h3>
                      <button className="text-sm text-pastel-blue hover:underline">Ver todos</button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Plano Premium - Mensal</p>
                          <p className="text-xs text-slate-500">15/11/2024</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">R$ 99,90</p>
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Plano Premium - Mensal</p>
                          <p className="text-xs text-slate-500">15/10/2024</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">R$ 99,90</p>
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-slate-800">Plano Premium - Mensal</p>
                          <p className="text-xs text-slate-500">15/09/2024</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">R$ 99,90</p>
                          <span className="px-2 py-0.5 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-pastel-purple bg-pastel-purple bg-opacity-10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Rocket className="text-slate-700 mt-1" size={24} />
                        <div>
                          <h3 className="font-semibold text-slate-800 mb-1">Upgrade para Plano Anual</h3>
                          <p className="text-sm text-slate-600 mb-3">Economize 20% com o plano anual. De R$ 1.198,80 por apenas R$ 959,00/ano</p>
                          <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                            Fazer Upgrade
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section ref={combineRefs(privacidadeRef, fadePrivacidadeRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                    <Shield className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Privacidade e Dados</h2>
                    <p className="text-sm text-slate-500">Controle suas informações e privacidade</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <Eye className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Perfil Público</h3>
                        <p className="text-sm text-slate-500">Outros usuários podem ver seu perfil</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Rastreamento de Atividades</h3>
                        <p className="text-sm text-slate-500">Permite análise de uso para melhorar experiência</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pastel-green"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <Download className="text-slate-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">Baixar Meus Dados</h3>
                        <p className="text-sm text-slate-500">Solicite uma cópia de todos os seus dados</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                      Solicitar
                    </button>
                  </div>
                </div>
              </section>

              <section ref={combineRefs(documentosRef, fadeDocumentosRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <FileText className="text-slate-700" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Documentos e Certificados</h2>
                    <p className="text-sm text-slate-500">Acesse seus certificados e documentos</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="text-slate-700" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 truncate">Certificado - Análise Fundamentalista</h3>
                        <p className="text-xs text-slate-500 mb-2">Emitido em 10/11/2024</p>
                        <button className="text-xs text-pastel-blue hover:underline">
                          <Download className="inline mr-1" size={12} />
                          Baixar PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="text-slate-700" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 truncate">Certificado - Derivativos Financeiros</h3>
                        <p className="text-xs text-slate-500 mb-2">Emitido em 05/10/2024</p>
                        <button className="text-xs text-pastel-blue hover:underline">
                          <Download className="inline mr-1" size={12} />
                          Baixar PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="text-slate-700" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 truncate">Certificado - Gestão de Riscos</h3>
                        <p className="text-xs text-slate-500 mb-2">Emitido em 20/09/2024</p>
                        <button className="text-xs text-pastel-blue hover:underline">
                          <Download className="inline mr-1" size={12} />
                          Baixar PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 hover:border-pastel-blue transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-pastel-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="text-slate-700" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 truncate">Certificado - Compliance</h3>
                        <p className="text-xs text-slate-500 mb-2">Emitido em 15/08/2024</p>
                        <button className="text-xs text-pastel-blue hover:underline">
                          <Download className="inline mr-1" size={12} />
                          Baixar PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                  Ver Todos os Certificados
                </button>
              </section>

              <section ref={combineRefs(perigoRef, fadePerigoRef)} className="bg-white rounded-xl border-2 border-red-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-red-600">Zona de Perigo</h2>
                    <p className="text-sm text-slate-500">Ações irreversíveis que afetam sua conta</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 mb-1">Desativar Conta</h3>
                        <p className="text-sm text-slate-600 mb-3">Sua conta será temporariamente desativada. Você pode reativá-la a qualquer momento fazendo login novamente.</p>
                        <button className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition text-sm">
                          Desativar Temporariamente
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border-2 border-red-300 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-red-600 mb-1">Excluir Conta Permanentemente</h3>
                        <p className="text-sm text-slate-600 mb-2">Esta ação é irreversível. Todos os seus dados, cursos, certificados e progresso serão permanentemente excluídos.</p>
                        <div className="bg-white p-3 rounded border border-red-200 mb-3">
                          <p className="text-xs text-slate-600 mb-2 font-medium">O que será excluído:</p>
                          <ul className="text-xs text-slate-600 space-y-1">
                            <li className="flex items-center gap-2">
                              <XCircle className="text-red-500" size={14} />
                              Todos os dados pessoais e profissionais
                            </li>
                            <li className="flex items-center gap-2">
                              <XCircle className="text-red-500" size={14} />
                              Histórico de cursos e progresso de aprendizado
                            </li>
                            <li className="flex items-center gap-2">
                              <XCircle className="text-red-500" size={14} />
                              Certificados emitidos pela plataforma
                            </li>
                            <li className="flex items-center gap-2">
                              <XCircle className="text-red-500" size={14} />
                              Interações na comunidade e comentários
                            </li>
                            <li className="flex items-center gap-2">
                              <XCircle className="text-red-500" size={14} />
                              Assinatura e histórico de pagamentos
                            </li>
                          </ul>
                        </div>
                        <button 
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition text-sm"
                        >
                          Excluir Conta Permanentemente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isDeleteModalOpen} onOpenChange={handleCloseDeleteModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle size={24} />
              Excluir Conta Permanentemente
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-3">
              <p className="font-semibold text-slate-800">Esta ação não pode ser desfeita!</p>
              <p className="text-sm text-slate-600">
                Ao confirmar, todos os seus dados serão permanentemente excluídos, incluindo:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 pl-4">
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                  <span>Dados pessoais e profissionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                  <span>Histórico de cursos e progresso</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                  <span>Certificados emitidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                  <span>Interações na comunidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                  <span>Assinatura e histórico de pagamentos</span>
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="password-confirm" className="text-sm font-medium text-slate-700">
              Digite sua senha para confirmar
            </Label>
            <Input
              id="password-confirm"
              type="password"
              placeholder="Sua senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="mt-2"
              disabled={isDeleting}
            />
          </div>

          <DialogFooter className="flex gap-2 sm:gap-2">
            <button
              onClick={handleCloseDeleteModal}
              disabled={isDeleting}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting || !passwordConfirmation.trim()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
