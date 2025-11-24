import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Building2, MapPin, Phone, Mail, FileText, Users, CreditCard, 
  Briefcase, Save, X, CheckCircle, AlertCircle, Building
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function ContaEmpresarial() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mainRef = useRef<HTMLElement>(null);

  // Form states
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
  
  // Endereço
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  
  // Contato
  const [telefoneComercial, setTelefoneComercial] = useState("");
  const [emailComercial, setEmailComercial] = useState("");
  const [website, setWebsite] = useState("");
  
  // Responsável Legal
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [cpfResponsavel, setCpfResponsavel] = useState("");
  const [cargoResponsavel, setCargoResponsavel] = useState("");
  const [emailResponsavel, setEmailResponsavel] = useState("");
  const [telefoneResponsavel, setTelefoneResponsavel] = useState("");
  
  // Informações Comerciais
  const [ramoAtividade, setRamoAtividade] = useState("");
  const [numeroFuncionarios, setNumeroFuncionarios] = useState("");
  const [faturamentoAnual, setFaturamentoAnual] = useState("");
  
  // Dados Bancários
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [contaCorrente, setContaCorrente] = useState("");
  const [tipoConta, setTipoConta] = useState("Conta Corrente");

  const [activeSection, setActiveSection] = useState("empresa");

  const empresaRef = useRef<HTMLElement>(null);
  const enderecoRef = useRef<HTMLElement>(null);
  const contatoRef = useRef<HTMLElement>(null);
  const responsavelRef = useRef<HTMLElement>(null);
  const comercialRef = useRef<HTMLElement>(null);
  const bancarioRef = useRef<HTMLElement>(null);

  const fadeEmpresaRef = useFadeInOnScroll<HTMLElement>();
  const fadeEnderecoRef = useFadeInOnScroll<HTMLElement>();
  const fadeContatoRef = useFadeInOnScroll<HTMLElement>();
  const fadeResponsavelRef = useFadeInOnScroll<HTMLElement>();
  const fadeComercialRef = useFadeInOnScroll<HTMLElement>();
  const fadeBancarioRef = useFadeInOnScroll<HTMLElement>();

  const combineRefs = (scrollRef: React.RefObject<HTMLElement>, fadeRef: React.RefObject<HTMLElement>) => 
    (element: HTMLElement | null) => {
      if (scrollRef) (scrollRef as React.MutableRefObject<HTMLElement | null>).current = element;
      if (fadeRef) (fadeRef as React.MutableRefObject<HTMLElement | null>).current = element;
    };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;

      const sections = [
        { name: 'empresa', ref: empresaRef },
        { name: 'endereco', ref: enderecoRef },
        { name: 'contato', ref: contatoRef },
        { name: 'responsavel', ref: responsavelRef },
        { name: 'comercial', ref: comercialRef },
        { name: 'bancario', ref: bancarioRef },
      ];

      const scrollPosition = mainRef.current.scrollTop + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.name);
          break;
        }
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLElement> } = {
      empresa: empresaRef,
      endereco: enderecoRef,
      contato: contatoRef,
      responsavel: responsavelRef,
      comercial: comercialRef,
      bancario: bancarioRef,
    };

    const targetRef = refs[section];
    if (targetRef?.current && mainRef.current) {
      const headerHeight = 80;
      const targetPosition = targetRef.current.offsetTop - headerHeight;
      
      mainRef.current.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(section);
  };

  const handleSave = () => {
    toast({
      title: "Conta Empresarial Criada",
      description: "Os dados da sua empresa foram salvos com sucesso.",
    });
  };

  const handleCancel = () => {
    navigate("/minha-conta");
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#B8D4E8] rounded-xl flex items-center justify-center border-2 border-slate-300">
                  <Building2 className="text-slate-700" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">Criar Conta Empresarial</h1>
                  <p className="text-slate-600">Preencha os dados da sua empresa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCancel}
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition"
                >
                  <X size={18} className="inline mr-2" />
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#C5E8D4] border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-opacity-70 transition"
                >
                  <Save size={18} className="inline mr-2" />
                  Salvar Conta Empresarial
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-6">
              {/* Sidebar Navigation */}
              <aside className="w-80 sticky top-[104px] h-fit">
                <div className="bg-white rounded-xl border-2 border-slate-300 p-6">
                  <nav className="space-y-2">
                    <button
                      onClick={() => scrollToSection("empresa")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition border-2 ${
                        activeSection === "empresa"
                          ? "bg-[#B8D4E8] border-slate-300 text-slate-800 font-semibold"
                          : "border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Building2 size={20} />
                      <div>
                        <div className="font-medium">Dados da Empresa</div>
                        <div className="text-xs text-slate-500">Razão social e CNPJ</div>
                      </div>
                    </button>

                    <button
                      onClick={() => scrollToSection("endereco")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition border-2 ${
                        activeSection === "endereco"
                          ? "bg-[#B8D4E8] border-slate-300 text-slate-800 font-semibold"
                          : "border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <MapPin size={20} />
                      <div>
                        <div className="font-medium">Endereço</div>
                        <div className="text-xs text-slate-500">Localização da empresa</div>
                      </div>
                    </button>

                    <button
                      onClick={() => scrollToSection("contato")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition border-2 ${
                        activeSection === "contato"
                          ? "bg-[#B8D4E8] border-slate-300 text-slate-800 font-semibold"
                          : "border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Phone size={20} />
                      <div>
                        <div className="font-medium">Contato Comercial</div>
                        <div className="text-xs text-slate-500">Telefone e email</div>
                      </div>
                    </button>

                    <button
                      onClick={() => scrollToSection("responsavel")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition border-2 ${
                        activeSection === "responsavel"
                          ? "bg-[#B8D4E8] border-slate-300 text-slate-800 font-semibold"
                          : "border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Users size={20} />
                      <div>
                        <div className="font-medium">Responsável Legal</div>
                        <div className="text-xs text-slate-500">Dados do representante</div>
                      </div>
                    </button>

                    <button
                      onClick={() => scrollToSection("comercial")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition border-2 ${
                        activeSection === "comercial"
                          ? "bg-[#B8D4E8] border-slate-300 text-slate-800 font-semibold"
                          : "border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Briefcase size={20} />
                      <div>
                        <div className="font-medium">Informações Comerciais</div>
                        <div className="text-xs text-slate-500">Atividade e faturamento</div>
                      </div>
                    </button>

                    <button
                      onClick={() => scrollToSection("bancario")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition border-2 ${
                        activeSection === "bancario"
                          ? "bg-[#B8D4E8] border-slate-300 text-slate-800 font-semibold"
                          : "border-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <CreditCard size={20} />
                      <div>
                        <div className="font-medium">Dados Bancários</div>
                        <div className="text-xs text-slate-500">Conta para pagamentos</div>
                      </div>
                    </button>
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 space-y-6 pb-8">
                {/* Dados da Empresa */}
                <section
                  ref={combineRefs(empresaRef, fadeEmpresaRef)}
                  className="bg-white rounded-2xl border-2 border-slate-300 p-8 opacity-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#D4C5E8] rounded-xl flex items-center justify-center border-2 border-slate-300">
                      <Building2 className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Dados da Empresa</h2>
                      <p className="text-slate-600">Informações legais e documentação</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Razão Social <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={razaoSocial}
                          onChange={(e) => setRazaoSocial(e.target.value)}
                          placeholder="Nome jurídico da empresa"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Nome Fantasia
                        </label>
                        <input
                          type="text"
                          value={nomeFantasia}
                          onChange={(e) => setNomeFantasia(e.target.value)}
                          placeholder="Nome comercial da empresa"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          CNPJ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cnpj}
                          onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                          placeholder="00.000.000/0000-00"
                          maxLength={18}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Inscrição Estadual
                        </label>
                        <input
                          type="text"
                          value={inscricaoEstadual}
                          onChange={(e) => setInscricaoEstadual(e.target.value)}
                          placeholder="000.000.000.000"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Inscrição Municipal
                        </label>
                        <input
                          type="text"
                          value={inscricaoMunicipal}
                          onChange={(e) => setInscricaoMunicipal(e.target.value)}
                          placeholder="000000000"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Endereço */}
                <section
                  ref={combineRefs(enderecoRef, fadeEnderecoRef)}
                  className="bg-white rounded-2xl border-2 border-slate-300 p-8 opacity-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#E8C5D8] rounded-xl flex items-center justify-center border-2 border-slate-300">
                      <MapPin className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Endereço</h2>
                      <p className="text-slate-600">Localização física da empresa</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          CEP <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cep}
                          onChange={(e) => setCep(formatCEP(e.target.value))}
                          placeholder="00000-000"
                          maxLength={9}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Endereço <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={endereco}
                          onChange={(e) => setEndereco(e.target.value)}
                          placeholder="Rua, Avenida, etc."
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Número <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                          placeholder="123"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Complemento
                        </label>
                        <input
                          type="text"
                          value={complemento}
                          onChange={(e) => setComplemento(e.target.value)}
                          placeholder="Sala, Andar, etc."
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Bairro <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bairro}
                          onChange={(e) => setBairro(e.target.value)}
                          placeholder="Nome do bairro"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Cidade <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cidade}
                          onChange={(e) => setCidade(e.target.value)}
                          placeholder="Nome da cidade"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="w-1/3">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Estado <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                      >
                        <option value="">Selecione...</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Contato Comercial */}
                <section
                  ref={combineRefs(contatoRef, fadeContatoRef)}
                  className="bg-white rounded-2xl border-2 border-slate-300 p-8 opacity-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#E8E0C5] rounded-xl flex items-center justify-center border-2 border-slate-300">
                      <Phone className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Contato Comercial</h2>
                      <p className="text-slate-600">Informações para contato da empresa</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Telefone Comercial <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={telefoneComercial}
                          onChange={(e) => setTelefoneComercial(e.target.value)}
                          placeholder="(00) 0000-0000"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Comercial <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={emailComercial}
                          onChange={(e) => setEmailComercial(e.target.value)}
                          placeholder="contato@empresa.com.br"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Website
                      </label>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="www.empresa.com.br"
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                      />
                    </div>
                  </div>
                </section>

                {/* Responsável Legal */}
                <section
                  ref={combineRefs(responsavelRef, fadeResponsavelRef)}
                  className="bg-white rounded-2xl border-2 border-slate-300 p-8 opacity-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#C5E8D4] rounded-xl flex items-center justify-center border-2 border-slate-300">
                      <Users className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Responsável Legal</h2>
                      <p className="text-slate-600">Dados do representante da empresa</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Nome Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={nomeResponsavel}
                          onChange={(e) => setNomeResponsavel(e.target.value)}
                          placeholder="Nome completo do responsável"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          CPF <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cpfResponsavel}
                          onChange={(e) => setCpfResponsavel(formatCPF(e.target.value))}
                          placeholder="000.000.000-00"
                          maxLength={14}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Cargo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cargoResponsavel}
                          onChange={(e) => setCargoResponsavel(e.target.value)}
                          placeholder="Diretor, Sócio, etc."
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={emailResponsavel}
                          onChange={(e) => setEmailResponsavel(e.target.value)}
                          placeholder="responsavel@empresa.com.br"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Telefone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={telefoneResponsavel}
                          onChange={(e) => setTelefoneResponsavel(e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Informações Comerciais */}
                <section
                  ref={combineRefs(comercialRef, fadeComercialRef)}
                  className="bg-white rounded-2xl border-2 border-slate-300 p-8 opacity-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#E8D4C5] rounded-xl flex items-center justify-center border-2 border-slate-300">
                      <Briefcase className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Informações Comerciais</h2>
                      <p className="text-slate-600">Dados sobre a atividade da empresa</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Ramo de Atividade <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={ramoAtividade}
                        onChange={(e) => setRamoAtividade(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                      >
                        <option value="">Selecione...</option>
                        <option value="financeiro">Serviços Financeiros</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="consultoria">Consultoria</option>
                        <option value="educacao">Educação</option>
                        <option value="comercio">Comércio</option>
                        <option value="industria">Indústria</option>
                        <option value="servicos">Prestação de Serviços</option>
                        <option value="saude">Saúde</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Número de Funcionários
                        </label>
                        <select
                          value={numeroFuncionarios}
                          onChange={(e) => setNumeroFuncionarios(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        >
                          <option value="">Selecione...</option>
                          <option value="1-10">1-10 funcionários</option>
                          <option value="11-50">11-50 funcionários</option>
                          <option value="51-200">51-200 funcionários</option>
                          <option value="201-500">201-500 funcionários</option>
                          <option value="500+">Mais de 500 funcionários</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Faturamento Anual
                        </label>
                        <select
                          value={faturamentoAnual}
                          onChange={(e) => setFaturamentoAnual(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        >
                          <option value="">Selecione...</option>
                          <option value="ate-360k">Até R$ 360 mil</option>
                          <option value="360k-4.8mi">R$ 360 mil - R$ 4,8 milhões</option>
                          <option value="4.8mi-300mi">R$ 4,8 milhões - R$ 300 milhões</option>
                          <option value="acima-300mi">Acima de R$ 300 milhões</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Dados Bancários */}
                <section
                  ref={combineRefs(bancarioRef, fadeBancarioRef)}
                  className="bg-white rounded-2xl border-2 border-slate-300 p-8 opacity-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#B8D4E8] rounded-xl flex items-center justify-center border-2 border-slate-300">
                      <CreditCard className="text-slate-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Dados Bancários</h2>
                      <p className="text-slate-600">Informações para pagamentos e recebimentos</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Banco <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={banco}
                          onChange={(e) => setBanco(e.target.value)}
                          placeholder="Nome do banco"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Tipo de Conta <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={tipoConta}
                          onChange={(e) => setTipoConta(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        >
                          <option value="Conta Corrente">Conta Corrente</option>
                          <option value="Conta Poupança">Conta Poupança</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Agência <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={agencia}
                          onChange={(e) => setAgencia(e.target.value)}
                          placeholder="0000"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Conta Corrente <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={contaCorrente}
                          onChange={(e) => setContaCorrente(e.target.value)}
                          placeholder="00000-0"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8D4E8] text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="bg-[#E8E0C5] bg-opacity-30 border-2 border-slate-300 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-slate-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="text-sm font-semibold text-slate-700 mb-1">
                            Informações Importantes
                          </p>
                          <p className="text-sm text-slate-600">
                            Os dados bancários serão utilizados para processar pagamentos e recebimentos relacionados à sua conta empresarial. Certifique-se de que as informações estão corretas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4">
                  <button 
                    onClick={handleCancel}
                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-8 py-4 bg-[#C5E8D4] border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-opacity-70 transition"
                  >
                    <CheckCircle size={18} className="inline mr-2" />
                    Criar Conta Empresarial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
