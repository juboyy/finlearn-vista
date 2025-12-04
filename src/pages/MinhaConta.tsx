import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Camera, IdCard, Edit, Briefcase, Plus, Star, Crown, GraduationCap, 
  Award, CheckCircle, CreditCard, Rocket, Shield, Eye, TrendingUp, 
  Download, FileText, AlertTriangle, XCircle, X, Bell, User, Building2,
  Upload, Loader2, Landmark, ChevronDown
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// Brazilian banks with logos
const BRAZILIAN_BANKS = [
  { code: "001", name: "Banco do Brasil", logo: "https://logo.clearbit.com/bb.com.br" },
  { code: "104", name: "Caixa Econômica Federal", logo: "https://logo.clearbit.com/caixa.gov.br" },
  { code: "237", name: "Bradesco", logo: "https://logo.clearbit.com/bradesco.com.br" },
  { code: "341", name: "Itaú Unibanco", logo: "https://logo.clearbit.com/itau.com.br" },
  { code: "033", name: "Santander", logo: "https://logo.clearbit.com/santander.com.br" },
  { code: "260", name: "Nubank", logo: "https://logo.clearbit.com/nubank.com.br" },
  { code: "077", name: "Inter", logo: "https://logo.clearbit.com/bancointer.com.br" },
  { code: "212", name: "Banco Original", logo: "https://logo.clearbit.com/original.com.br" },
  { code: "756", name: "Sicoob", logo: "https://logo.clearbit.com/sicoob.com.br" },
  { code: "748", name: "Sicredi", logo: "https://logo.clearbit.com/sicredi.com.br" },
  { code: "336", name: "C6 Bank", logo: "https://logo.clearbit.com/c6bank.com.br" },
  { code: "290", name: "PagBank", logo: "https://logo.clearbit.com/pagseguro.com.br" },
  { code: "380", name: "PicPay", logo: "https://logo.clearbit.com/picpay.com" },
  { code: "422", name: "Safra", logo: "https://logo.clearbit.com/safra.com.br" },
  { code: "655", name: "Votorantim", logo: "https://logo.clearbit.com/bancovotorantim.com.br" },
  { code: "070", name: "BRB", logo: "https://logo.clearbit.com/brb.com.br" },
  { code: "389", name: "Mercantil do Brasil", logo: "https://logo.clearbit.com/mercantildobrasil.com.br" },
  { code: "746", name: "Modal", logo: "https://logo.clearbit.com/modalmais.com.br" },
  { code: "208", name: "BTG Pactual", logo: "https://logo.clearbit.com/btgpactual.com" },
  { code: "218", name: "BS2", logo: "https://logo.clearbit.com/bs2.com" },
];

export default function MinhaConta() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("perfil");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [isBankDialogOpen, setIsBankDialogOpen] = useState(false);
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);
  const [isSavingBank, setIsSavingBank] = useState(false);
  const [editingBankId, setEditingBankId] = useState<string | null>(null);
  const [bankForm, setBankForm] = useState({
    bank_name: '',
    agency: '',
    account_number: '',
    account_type: 'corrente',
    holder_name: '',
    holder_document: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const perfilRef = useRef<HTMLElement>(null);
  const pessoalRef = useRef<HTMLElement>(null);
  const profissionalRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLElement>(null);
  const assinaturaRef = useRef<HTMLElement>(null);
  const privacidadeRef = useRef<HTMLElement>(null);
  const documentosRef = useRef<HTMLElement>(null);
  const bancariosRef = useRef<HTMLElement>(null);
  const perigoRef = useRef<HTMLElement>(null);

  // Fade-in animations
  const fadePerfilRef = useFadeInOnScroll<HTMLElement>();
  const fadePessoalRef = useFadeInOnScroll<HTMLElement>();
  const fadeProfissionalRef = useFadeInOnScroll<HTMLElement>();
  const fadeStatusRef = useFadeInOnScroll<HTMLElement>();
  const fadeAssinaturaRef = useFadeInOnScroll<HTMLElement>();
  const fadePrivacidadeRef = useFadeInOnScroll<HTMLElement>();
  const fadeDocumentosRef = useFadeInOnScroll<HTMLElement>();
  const fadeBancariosRef = useFadeInOnScroll<HTMLElement>();
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

  // Load user avatar on mount
  useEffect(() => {
    const loadAvatar = async () => {
      if (!user?.id) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();
      
      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    };
    
    loadAvatar();
  }, [user?.id]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Formato inválido",
        description: "Por favor, selecione uma imagem JPG, PNG ou WebP.",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
      });
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Delete old avatar if exists
      await supabase.storage.from('avatars').remove([fileName]);

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar foto",
        description: "Não foi possível atualizar sua foto. Tente novamente.",
      });
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user?.id) return;

    setIsUploadingAvatar(true);

    try {
      // Remove from storage
      const { data: files } = await supabase.storage
        .from('avatars')
        .list(user.id);

      if (files && files.length > 0) {
        const filesToRemove = files.map(f => `${user.id}/${f.name}`);
        await supabase.storage.from('avatars').remove(filesToRemove);
      }

      // Update profile
      await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);

      setAvatarUrl(null);
      toast({
        title: "Foto removida",
        description: "Sua foto de perfil foi removida.",
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        variant: "destructive",
        title: "Erro ao remover foto",
        description: "Não foi possível remover sua foto. Tente novamente.",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Load bank accounts
  useEffect(() => {
    const loadBankAccounts = async () => {
      if (!user?.id) return;
      
      setIsLoadingBanks(true);
      try {
        const { data, error } = await supabase
          .from('bank_accounts')
          .select('*')
          .eq('user_id', user.id)
          .order('is_primary', { ascending: false });
        
        if (error) throw error;
        setBankAccounts(data || []);
      } catch (error) {
        console.error('Error loading bank accounts:', error);
      } finally {
        setIsLoadingBanks(false);
      }
    };
    
    loadBankAccounts();
  }, [user?.id]);

  const handleOpenBankDialog = (account?: any) => {
    if (account) {
      setEditingBankId(account.id);
      setBankForm({
        bank_name: account.bank_name,
        agency: account.agency,
        account_number: account.account_number,
        account_type: account.account_type,
        holder_name: account.holder_name,
        holder_document: account.holder_document,
      });
    } else {
      setEditingBankId(null);
      setBankForm({
        bank_name: '',
        agency: '',
        account_number: '',
        account_type: 'corrente',
        holder_name: '',
        holder_document: '',
      });
    }
    setIsBankDialogOpen(true);
  };

  const handleSaveBankAccount = async () => {
    if (!user?.id) return;
    
    if (!bankForm.bank_name || !bankForm.agency || !bankForm.account_number || !bankForm.holder_name || !bankForm.holder_document) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    setIsSavingBank(true);
    try {
      if (editingBankId) {
        const { error } = await supabase
          .from('bank_accounts')
          .update(bankForm)
          .eq('id', editingBankId);
        
        if (error) throw error;
        
        setBankAccounts(prev => prev.map(acc => 
          acc.id === editingBankId ? { ...acc, ...bankForm } : acc
        ));
        
        toast({
          title: "Conta atualizada",
          description: "Dados bancários atualizados com sucesso.",
        });
      } else {
        const isPrimary = bankAccounts.length === 0;
        const { data, error } = await supabase
          .from('bank_accounts')
          .insert({
            ...bankForm,
            user_id: user.id,
            is_primary: isPrimary,
          })
          .select()
          .single();
        
        if (error) throw error;
        
        setBankAccounts(prev => [...prev, data]);
        
        toast({
          title: "Conta adicionada",
          description: "Nova conta bancária cadastrada com sucesso.",
        });
      }
      
      setIsBankDialogOpen(false);
    } catch (error) {
      console.error('Error saving bank account:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar a conta bancária.",
      });
    } finally {
      setIsSavingBank(false);
    }
  };

  const handleSetPrimaryBank = async (accountId: string) => {
    if (!user?.id) return;
    
    try {
      await supabase
        .from('bank_accounts')
        .update({ is_primary: false })
        .eq('user_id', user.id);
      
      await supabase
        .from('bank_accounts')
        .update({ is_primary: true })
        .eq('id', accountId);
      
      setBankAccounts(prev => prev.map(acc => ({
        ...acc,
        is_primary: acc.id === accountId
      })));
      
      toast({
        title: "Conta principal definida",
        description: "A conta foi definida como principal.",
      });
    } catch (error) {
      console.error('Error setting primary bank:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível definir a conta como principal.",
      });
    }
  };

  const handleDeleteBank = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('bank_accounts')
        .delete()
        .eq('id', accountId);
      
      if (error) throw error;
      
      setBankAccounts(prev => prev.filter(acc => acc.id !== accountId));
      
      toast({
        title: "Conta removida",
        description: "Conta bancária removida com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting bank:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível remover a conta bancária.",
      });
    }
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
      bancarios: bancariosRef,
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
        { id: "bancarios", ref: bancariosRef },
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
                  onClick={() => scrollToSection("bancarios")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === "bancarios" 
                      ? "bg-pastel-blue text-slate-800 font-medium" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Landmark size={20} />
                  <span>Dados Bancários</span>
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
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                      <Camera className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">Foto do Perfil</h2>
                      <p className="text-sm text-slate-500">Atualize sua foto de perfil</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate("/conta-empresarial")}
                    className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                  >
                    <Building2 className="inline mr-2" size={16} />
                    Conta Empresarial
                  </button>
                </div>

                <div className="flex items-start gap-6">
                  <div className="relative">
                    <img 
                      src={avatarUrl || "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-slate-100"
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
                    <p className="text-sm text-slate-600 mb-4">Sua foto ajuda outras pessoas a reconhecer você na plataforma. Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB.</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <div className="flex gap-3">
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
                      <button 
                        onClick={handleRemoveAvatar}
                        disabled={isUploadingAvatar || !avatarUrl}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition disabled:opacity-50"
                      >
                        Remover
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

              <section ref={combineRefs(bancariosRef, fadeBancariosRef)} className="bg-white rounded-xl border border-slate-200 p-6 scroll-mt-24 opacity-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                      <Landmark className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">Dados Bancários</h2>
                      <p className="text-sm text-slate-500">Gerencie suas contas para recebimento</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleOpenBankDialog()}
                    className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                  >
                    <Plus className="inline mr-2" size={16} />
                    Nova Conta
                  </button>
                </div>

                <div className="space-y-4">
                  {isLoadingBanks ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin text-slate-400" size={32} />
                    </div>
                  ) : bankAccounts.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <Landmark className="mx-auto mb-3 text-slate-300" size={48} />
                      <p>Nenhuma conta bancária cadastrada</p>
                      <p className="text-sm mt-1">Clique em "Nova Conta" para adicionar</p>
                    </div>
                  ) : (
                    bankAccounts.map((account) => (
                      <div 
                        key={account.id}
                        className={`p-4 rounded-lg ${account.is_primary ? 'border-2 border-pastel-green bg-pastel-green bg-opacity-10' : 'border border-slate-200'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${account.is_primary ? 'bg-white' : 'bg-slate-50'} rounded-lg flex items-center justify-center border border-slate-200 overflow-hidden`}>
                              {BRAZILIAN_BANKS.find(b => b.name === account.bank_name)?.logo ? (
                                <img 
                                  src={BRAZILIAN_BANKS.find(b => b.name === account.bank_name)?.logo} 
                                  alt={account.bank_name}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <Landmark className={`text-slate-600 ${BRAZILIAN_BANKS.find(b => b.name === account.bank_name)?.logo ? 'hidden' : ''}`} size={24} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-slate-800">{account.bank_name}</p>
                                {account.is_primary && (
                                  <span className="px-2 py-0.5 bg-pastel-green text-slate-700 text-xs rounded-full font-medium">Principal</span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">
                                Ag. {account.agency} | {account.account_type === 'corrente' ? 'C/C' : 'Poupança'} •••• {account.account_number.slice(-4)}
                              </p>
                              <p className="text-xs text-slate-500">{account.holder_name} - {account.holder_document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '•••.•••.$3-$4')}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!account.is_primary && (
                              <button 
                                onClick={() => handleSetPrimaryBank(account.id)}
                                className="px-3 py-1.5 bg-pastel-blue text-slate-700 rounded-lg text-sm hover:bg-opacity-80 transition"
                              >
                                Tornar Principal
                              </button>
                            )}
                            <button 
                              onClick={() => handleOpenBankDialog(account)}
                              className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition"
                            >
                              <Edit className="inline mr-1" size={14} />
                              Editar
                            </button>
                            <button 
                              onClick={() => handleDeleteBank(account.id)}
                              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition"
                            >
                              <X className="inline" size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  <div className="p-4 rounded-lg border border-slate-200 bg-pastel-yellow bg-opacity-20">
                    <div className="flex items-start gap-3">
                      <Shield className="text-slate-700 mt-0.5" size={20} />
                      <div>
                        <h3 className="font-medium text-slate-800 mb-1">Segurança dos seus dados</h3>
                        <p className="text-sm text-slate-600">Seus dados bancários são criptografados e armazenados com segurança. Nunca compartilhamos suas informações com terceiros.</p>
                      </div>
                    </div>
                  </div>
                </div>
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

      {/* Bank Account Sheet (Right Panel) */}
      <Sheet open={isBankDialogOpen} onOpenChange={setIsBankDialogOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[480px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-2">
              <Landmark className="text-pastel-purple" size={24} />
              {editingBankId ? 'Editar Conta Bancária' : 'Nova Conta Bancária'}
            </SheetTitle>
            <SheetDescription>
              Preencha os dados da sua conta bancária para recebimento.
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-5">
            <div>
              <Label htmlFor="bank_name">Banco *</Label>
              <Select
                value={bankForm.bank_name}
                onValueChange={(value) => setBankForm(prev => ({ ...prev, bank_name: value }))}
              >
                <SelectTrigger className="mt-1.5 w-full h-12">
                  <SelectValue placeholder="Selecione o banco">
                    {bankForm.bank_name && (
                      <div className="flex items-center gap-3">
                        <img 
                          src={BRAZILIAN_BANKS.find(b => b.name === bankForm.bank_name)?.logo} 
                          alt={bankForm.bank_name}
                          className="w-6 h-6 rounded object-contain bg-white"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span>{bankForm.bank_name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white max-h-[300px]">
                  {BRAZILIAN_BANKS.map((bank) => (
                    <SelectItem key={bank.code} value={bank.name} className="py-2.5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={bank.logo} 
                          alt={bank.name}
                          className="w-6 h-6 rounded object-contain bg-white"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236b7280"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>';
                          }}
                        />
                        <span className="text-slate-700">{bank.name}</span>
                        <span className="text-xs text-slate-400 ml-auto">{bank.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agency">Agencia *</Label>
                <Input
                  id="agency"
                  value={bankForm.agency}
                  onChange={(e) => setBankForm(prev => ({ ...prev, agency: e.target.value }))}
                  placeholder="0000-0"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="account_number">Numero da Conta *</Label>
                <Input
                  id="account_number"
                  value={bankForm.account_number}
                  onChange={(e) => setBankForm(prev => ({ ...prev, account_number: e.target.value }))}
                  placeholder="00000-0"
                  className="mt-1.5"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="account_type">Tipo de Conta *</Label>
              <Select
                value={bankForm.account_type}
                onValueChange={(value) => setBankForm(prev => ({ ...prev, account_type: value }))}
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="corrente">Conta Corrente</SelectItem>
                  <SelectItem value="poupanca">Conta Poupanca</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="holder_name">Nome do Titular *</Label>
              <Input
                id="holder_name"
                value={bankForm.holder_name}
                onChange={(e) => setBankForm(prev => ({ ...prev, holder_name: e.target.value }))}
                placeholder="Nome completo conforme documento"
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="holder_document">CPF/CNPJ do Titular *</Label>
              <Input
                id="holder_document"
                value={bankForm.holder_document}
                onChange={(e) => setBankForm(prev => ({ ...prev, holder_document: e.target.value }))}
                placeholder="000.000.000-00"
                className="mt-1.5"
              />
            </div>
            
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsBankDialogOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveBankAccount}
                disabled={isSavingBank}
                className="flex-1 px-4 py-2.5 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSavingBank && <Loader2 className="animate-spin" size={16} />}
                {isSavingBank ? 'Salvando...' : (editingBankId ? 'Atualizar' : 'Cadastrar')}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

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
