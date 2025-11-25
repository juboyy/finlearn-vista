import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, Share2, ArrowLeft, MapPin, Briefcase, Users, Star, Video, Mic, 
  MessageCircle, UsersRound, BookOpen, FileText, Calendar, Clock, Trophy, 
  Bot, Check, Mail, Linkedin, Globe, Award, X, Send, Info
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const PerfilMentor = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"mentores" | "seguindo" | "seguidores" | "descobrir">("mentores");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("individual");
  const [scheduleStep, setScheduleStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [showNewCardForm, setShowNewCardForm] = useState<boolean>(false);
  const [selectedSavedCard, setSelectedSavedCard] = useState<number | null>(1);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const savedCards = [
    {
      id: 1,
      lastDigits: "4532",
      brand: "VISA",
      holderName: "JOÃO SILVA",
      expiry: "12/26"
    },
    {
      id: 2,
      lastDigits: "8765",
      brand: "MASTERCARD",
      holderName: "JOÃO SILVA",
      expiry: "08/27"
    }
  ];

  useEffect(() => {
    if (scheduleStep === 2 && sheetContentRef.current) {
      sheetContentRef.current.scrollTop = 0;
    }
  }, [scheduleStep]);

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
                <h1 className="text-2xl font-semibold text-slate-800">Perfil do Mentor</h1>
                <p className="text-sm text-slate-500 mt-1">Informações profissionais e serviços disponíveis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Hero Section */}
          <section className="bg-white rounded-2xl border-2 border-slate-300 overflow-hidden mb-6">
            <div className="h-48 bg-[#D4C5E8]"></div>
            <div className="px-8 pb-8">
              <div className="flex items-start gap-6 -mt-16">
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                  alt="Dra. Ana Beatriz Costa" 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div className="flex-1 pt-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-slate-800">Dra. Ana Beatriz Costa</h2>
                        <Award className="text-[#D4C5E8]" size={24} />
                        <span className="px-3 py-1 bg-[#C5E8D4] text-slate-700 rounded-full text-sm font-medium border-2 border-slate-300">
                          Disponível
                        </span>
                      </div>
                      <p className="text-lg text-slate-600 mb-3">Diretora de Compliance - Banco Central</p>
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" />
                          <span>São Paulo, SP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} className="text-slate-400" />
                          <span>15 anos de experiência</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-slate-400" />
                          <span>156 mentorias realizadas</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                        <Star size={16} className="inline mr-2" />
                        Favoritar
                      </button>
                      <button 
                        onClick={() => setIsScheduleModalOpen(true)}
                        className="px-6 py-3 bg-[#D4C5E8] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                      >
                        <Calendar size={16} className="inline mr-2" />
                        Agendar Mentoria
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="col-span-2 space-y-6">
              {/* About Section */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-slate-600" />
                  Sobre o Mentor
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Profissional com mais de 15 anos de experiência em Compliance e Regulação no mercado financeiro brasileiro. Atualmente, atua como Diretora de Compliance no Banco Central do Brasil, onde lidera iniciativas estratégicas de governança e conformidade regulatória.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Especialista em normas CVM, BACEN e regulamentações do Sistema Financeiro Nacional. Possui ampla experiência em implementação de programas de compliance, gestão de riscos regulatórios e relacionamento com órgãos reguladores. Mestre em Direito Econômico e Financeiro pela USP e certificações CPA-20, CEA e CNPI.
                </p>
              </section>

              {/* Professional Experience */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Briefcase size={20} className="text-slate-600" />
                  Experiência Profissional
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#D4C5E8] border-2 border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase size={20} className="text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">Diretora de Compliance</h4>
                          <p className="text-lg font-bold text-slate-800">Banco Central do Brasil</p>
                        </div>
                        <span className="text-sm text-slate-500">2019 - Atual</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Liderança de equipe multidisciplinar responsável pela governança e conformidade regulatória. Implementação de políticas de compliance alinhadas às diretrizes do CMN e CVM.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#B8D4E8] border-2 border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase size={20} className="text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">Gerente Sênior de Compliance</h4>
                          <p className="text-lg font-bold text-slate-800">Itaú Unibanco</p>
                        </div>
                        <span className="text-sm text-slate-500">2015 - 2019</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Gestão de processos de compliance para produtos de investimentos e mercado de capitais. Relacionamento com CVM e B3.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#C5E8D4] border-2 border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase size={20} className="text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">Analista de Compliance Pleno</h4>
                          <p className="text-lg font-bold text-slate-800">Bradesco S.A.</p>
                        </div>
                        <span className="text-sm text-slate-500">2012 - 2015</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Análise de conformidade regulatória de produtos financeiros. Elaboração de pareceres técnicos e suporte a auditorias.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#E8E0C5] border-2 border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase size={20} className="text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-800">Analista Júnior</h4>
                          <p className="text-lg font-bold text-slate-800">CVM - Comissão de Valores Mobiliários</p>
                        </div>
                        <span className="text-sm text-slate-500">2009 - 2012</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Análise de processos regulatórios e fiscalização de instituições financeiras. Suporte técnico em normatização.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mentoring Channels */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <MessageCircle size={20} className="text-slate-600" />
                  Canais de Mentoria Disponíveis
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-slate-300 rounded-lg hover:border-[#D4C5E8] transition cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#D4C5E8] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Video size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Videoconferência</h4>
                        <p className="text-xs text-slate-500">Sessões ao vivo</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Mentorias individuais por vídeo com compartilhamento de tela</p>
                  </div>

                  <div className="p-4 border-2 border-slate-300 rounded-lg hover:border-[#B8D4E8] transition cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#B8D4E8] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Mic size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Áudio</h4>
                        <p className="text-xs text-slate-500">Chamadas de voz</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Sessões por áudio para discussões focadas</p>
                  </div>

                  <div className="p-4 border-2 border-slate-300 rounded-lg hover:border-[#C5E8D4] transition cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#C5E8D4] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <MessageCircle size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Chat</h4>
                        <p className="text-xs text-slate-500">Mensagens de texto</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Suporte assíncrono via mensagens</p>
                  </div>

                  <div className="p-4 border-2 border-slate-300 rounded-lg hover:border-[#E8E0C5] transition cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#E8E0C5] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <UsersRound size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Grupo</h4>
                        <p className="text-xs text-slate-500">Sessões coletivas</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Mentorias em grupo com até 5 pessoas</p>
                  </div>
                </div>
              </section>

              {/* Published Content */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <BookOpen size={20} className="text-slate-600" />
                    Conteúdos Publicados
                  </h3>
                  <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</button>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-[#D4C5E8] border-2 border-slate-300 rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">48</div>
                    <div className="text-xs text-slate-600">Artigos</div>
                  </div>
                  <div className="text-center p-4 bg-[#B8D4E8] border-2 border-slate-300 rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">12</div>
                    <div className="text-xs text-slate-600">Webinars</div>
                  </div>
                  <div className="text-center p-4 bg-[#C5E8D4] border-2 border-slate-300 rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">5</div>
                    <div className="text-xs text-slate-600">E-books</div>
                  </div>
                  <div className="text-center p-4 bg-[#E8E0C5] border-2 border-slate-300 rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">23</div>
                    <div className="text-xs text-slate-600">Podcasts</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 border-2 border-slate-300 rounded-lg hover:border-[#D4C5E8] transition cursor-pointer">
                    <div className="w-16 h-16 bg-[#D4C5E8] border-2 border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={24} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">Novas Diretrizes CVM para Gestoras</h4>
                      <p className="text-sm text-slate-600 truncate">Análise das mudanças regulatórias de 2024</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500">Há 2 dias</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">1.2k visualizações</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 border-2 border-slate-300 rounded-lg hover:border-[#B8D4E8] transition cursor-pointer">
                    <div className="w-16 h-16 bg-[#B8D4E8] border-2 border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video size={24} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">Webinar: Compliance em Pagamentos Instantâneos</h4>
                      <p className="text-sm text-slate-600 truncate">Desafios e oportunidades do PIX para instituições</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500">Há 1 semana</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">856 participantes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 border-2 border-slate-300 rounded-lg hover:border-[#C5E8D4] transition cursor-pointer">
                    <div className="w-16 h-16 bg-[#C5E8D4] border-2 border-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen size={24} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">E-book: Guia Completo de Compliance Bancário</h4>
                      <p className="text-sm text-slate-600 truncate">Manual prático para profissionais do setor</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-500">Há 2 semanas</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">645 downloads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Testimonials */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <MessageCircle size={20} className="text-slate-600" />
                  Avaliações de Mentorados
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                          alt="Carlos Eduardo" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm">Carlos Eduardo Silva</h4>
                          <p className="text-xs text-slate-500">Analista de Compliance - BTG Pactual</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Mentoria excepcional! A Dra. Ana tem um conhecimento profundo sobre regulamentação e conseguiu me ajudar a estruturar todo o programa de compliance da nossa área. Recomendo fortemente!
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Há 3 dias</p>
                  </div>

                  <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" 
                          alt="Mariana Santos" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm">Mariana Santos</h4>
                          <p className="text-xs text-slate-500">Gerente de Riscos - Santander</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Profissional extremamente competente e didática. As sessões foram fundamentais para minha transição de carreira para a área de compliance.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Há 1 semana</p>
                  </div>

                  <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" 
                          alt="Fernando Lima" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm">Fernando Lima</h4>
                          <p className="text-xs text-slate-500">Coordenador - Banco do Brasil</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Excelente mentora! Me ajudou muito na preparação para certificações e no entendimento prático das normas CVM.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Há 2 semanas</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Statistics */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#D4C5E8] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Users size={20} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Mentorados</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">156</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#B8D4E8] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Clock size={20} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Horas Totais</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">234h</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#C5E8D4] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Star size={20} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Avaliação</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">5.0</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#E8E0C5] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                        <Trophy size={20} className="text-slate-700" />
                      </div>
                      <span className="text-sm text-slate-700">Pontuação</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800">98/100</span>
                  </div>
                </div>
              </section>

              {/* AI Avatar */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#D4C5E8] border-2 border-slate-300 rounded-lg flex items-center justify-center">
                    <Bot size={24} className="text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">Avatar IA Disponível</h3>
                    <span className="inline-block px-2 py-0.5 bg-[#C5E8D4] border border-slate-300 text-slate-700 rounded text-xs font-medium">
                      24/7 Disponível
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Consulte o avatar digital da Dra. Ana a qualquer momento. Obtenha respostas instantâneas sobre compliance, regulação e melhores práticas.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Check size={16} className="text-[#C5E8D4]" />
                    <span>Respostas baseadas na expertise real</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Check size={16} className="text-[#C5E8D4]" />
                    <span>Disponível 24 horas por dia</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Check size={16} className="text-[#C5E8D4]" />
                    <span>Histórico de conversas salvo</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="w-full px-4 py-2 bg-[#D4C5E8] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition mb-3"
                >
                  <MessageCircle size={16} className="inline mr-2" />
                  Testar Avatar Gratuitamente
                </button>
                <div className="p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                  <div className="text-xs text-slate-500 mb-2">Planos de Acesso:</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Por Crédito</span>
                      <span className="text-sm font-semibold text-slate-800">R$ 15/consulta</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Mensal Ilimitado</span>
                      <span className="text-sm font-semibold text-slate-800">R$ 149/mês</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Specialties */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {["Compliance", "Regulação CVM", "BACEN", "Governança", "Gestão de Riscos", "Auditoria", "Controles Internos", "PLD/FT"].map((specialty) => (
                    <span key={specialty} className="px-3 py-1.5 bg-slate-400 text-white rounded-full text-sm border-2 border-slate-300">
                      {specialty}
                    </span>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Certificações</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <Award className="text-[#D4C5E8]" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">CPA-20</p>
                      <p className="text-xs text-slate-500">ANBIMA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <Award className="text-[#B8D4E8]" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">CEA</p>
                      <p className="text-xs text-slate-500">ANBIMA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <Award className="text-[#C5E8D4]" size={20} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">CNPI</p>
                      <p className="text-xs text-slate-500">APIMEC</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Availability */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Disponibilidade</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <span className="text-sm text-slate-700">Próxima vaga</span>
                    <span className="text-sm font-semibold text-slate-800">15/12/2024</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <span className="text-sm text-slate-700">Horário preferencial</span>
                    <span className="text-sm font-semibold text-slate-800">14h - 18h</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-300 rounded-lg">
                    <span className="text-sm text-slate-700">Duração sessão</span>
                    <span className="text-sm font-semibold text-slate-800">60 minutos</span>
                  </div>
                </div>
              </section>

              {/* Pricing */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Investimento</h3>
                <div className="space-y-3">
                  <div className="p-4 border-2 border-[#D4C5E8] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Sessão Individual</span>
                      <span className="text-xs bg-[#D4C5E8] text-slate-700 px-2 py-1 rounded-full border border-slate-300">Popular</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">R$ 450</div>
                    <p className="text-xs text-slate-500">por hora</p>
                  </div>
                  <div className="p-4 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Pacote 5 Sessões</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">R$ 2.025</div>
                    <p className="text-xs text-slate-500">R$ 405/hora - Economia de 10%</p>
                  </div>
                  <div className="p-4 border-2 border-slate-300 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Mentoria em Grupo</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">R$ 180</div>
                    <p className="text-xs text-slate-500">por pessoa/hora (até 5 pessoas)</p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-white rounded-2xl p-6 border-2 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Contato</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition">
                    <Mail size={16} className="text-slate-600" />
                    <span className="text-sm text-slate-700">ana.costa@finlearn.com</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition">
                    <Linkedin size={16} className="text-slate-600" />
                    <span className="text-sm text-slate-700">linkedin.com/in/anabcosta</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition">
                    <Globe size={16} className="text-slate-600" />
                    <span className="text-sm text-slate-700">anabcosta.com.br</span>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Schedule Sheet */}
      <Sheet open={isScheduleModalOpen} onOpenChange={(open) => {
        setIsScheduleModalOpen(open);
        if (!open) {
          setScheduleStep(1);
          setSelectedDate(undefined);
          setSelectedTimes([]);
          setCardNumber("");
          setCardName("");
          setCardExpiry("");
          setCardCvv("");
          setShowNewCardForm(false);
          setSelectedSavedCard(1);
        }
      }}>
        <SheetContent ref={sheetContentRef} className="w-[500px] sm:w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-slate-800">
              {scheduleStep === 1 ? "Agendar Mentoria" : "Pagamento e Confirmação"}
            </SheetTitle>
            <SheetDescription>
              {scheduleStep === 1 
                ? "Escolha a data, horário e tipo de consultoria" 
                : "Complete os dados de pagamento para finalizar"}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {scheduleStep === 1 ? (
              <>
                {/* Step 1: Seleção de Consultoria */}
                {/* Mentor Info */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                  <img 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" 
                    alt="Dra. Ana Beatriz Costa" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800">Dra. Ana Beatriz Costa</h4>
                    <p className="text-sm text-slate-600">Diretora de Compliance - Banco Central</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-sm text-slate-600">5.0 (128 avaliações)</span>
                    </div>
                  </div>
                </div>

                {/* Tipo de Consultoria */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Tipo de Consultoria</label>
                  <div className="space-y-2">
                    <label 
                      className={cn(
                        "flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition",
                        selectedType === "individual" 
                          ? "border-[#D4C5E8] bg-[#D4C5E8]/10" 
                          : "border-slate-300 hover:border-[#D4C5E8]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="type" 
                          value="individual"
                          checked={selectedType === "individual"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-[#D4C5E8]" 
                        />
                        <div>
                          <div className="font-medium text-slate-800">Sessão Individual</div>
                          <div className="text-xs text-slate-500">60 minutos</div>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-700">R$ 450</span>
                    </label>

                    <label 
                      className={cn(
                        "flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition",
                        selectedType === "pacote" 
                          ? "border-[#D4C5E8] bg-[#D4C5E8]/10" 
                          : "border-slate-300 hover:border-[#D4C5E8]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="type" 
                          value="pacote"
                          checked={selectedType === "pacote"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-[#D4C5E8]" 
                        />
                        <div>
                          <div className="font-medium text-slate-800">Pacote 5 Sessões</div>
                          <div className="text-xs text-slate-500">5x 60 minutos (10% desconto)</div>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-700">R$ 2.025</span>
                    </label>

                    <label 
                      className={cn(
                        "flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition",
                        selectedType === "grupo" 
                          ? "border-[#D4C5E8] bg-[#D4C5E8]/10" 
                          : "border-slate-300 hover:border-[#D4C5E8]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="type" 
                          value="grupo"
                          checked={selectedType === "grupo"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-[#D4C5E8]" 
                        />
                        <div>
                          <div className="font-medium text-slate-800">Mentoria em Grupo</div>
                          <div className="text-xs text-slate-500">90 minutos (máx 6 pessoas)</div>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-700">R$ 180</span>
                    </label>
                  </div>
                </div>

                {/* Calendário */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Selecione uma data</label>
                  <div className="flex justify-center border-2 border-slate-300 rounded-lg p-4 bg-white">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      className={cn("pointer-events-auto")}
                    />
                  </div>
                </div>

                {/* Horários Disponíveis */}
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Horários disponíveis {selectedTimes.length > 0 && `(${selectedTimes.length} selecionado${selectedTimes.length > 1 ? 's' : ''})`}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedTimes(prev => 
                              prev.includes(time) 
                                ? prev.filter(t => t !== time)
                                : [...prev, time]
                            );
                          }}
                          className={cn(
                            "px-4 py-3 border-2 rounded-lg text-sm font-medium transition",
                            selectedTimes.includes(time)
                              ? "border-[#D4C5E8] bg-[#D4C5E8] text-slate-700"
                              : "border-slate-300 text-slate-700 hover:border-[#D4C5E8]"
                          )}
                        >
                          <Clock size={14} className="inline mr-1" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Informação */}
                <div className="p-4 bg-[#E8E0C5] border-2 border-slate-300 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-slate-700 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-slate-700">
                      <p className="font-medium mb-1">Importante:</p>
                      <p>Você receberá um email de confirmação com o link para a sessão. Cancelamentos devem ser feitos com até 24h de antecedência.</p>
                    </div>
                  </div>
                </div>

                {/* Botões Step 1 */}
                <div className="flex gap-3 pt-4">
                  <button 
                    disabled={!selectedDate || selectedTimes.length === 0}
                    onClick={() => setScheduleStep(2)}
                    className="flex-1 px-6 py-3 bg-[#D4C5E8] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calendar size={16} className="inline mr-2" />
                    Continuar para Pagamento
                  </button>
                  <button 
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Pagamento e Dados Finais */}
                {/* Resumo do Agendamento */}
                <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-3">Resumo do Agendamento</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Mentor:</span>
                      <span className="font-medium text-slate-800">Dra. Ana Beatriz Costa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tipo:</span>
                      <span className="font-medium text-slate-800">
                        {selectedType === "individual" && "Sessão Individual"}
                        {selectedType === "pacote" && "Pacote 5 Sessões"}
                        {selectedType === "grupo" && "Mentoria em Grupo"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Data:</span>
                      <span className="font-medium text-slate-800">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Horários:</span>
                      <span className="font-medium text-slate-800">{selectedTimes.join(', ')}</span>
                    </div>
                    {selectedTimes.length > 1 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Quantidade de sessões:</span>
                        <span className="text-slate-600">{selectedTimes.length}x</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-slate-300">
                      <span className="font-semibold text-slate-700">Total:</span>
                      <span className="font-bold text-slate-800">
                        {selectedType === "individual" && `R$ ${(450 * selectedTimes.length).toFixed(2).replace('.', ',')}`}
                        {selectedType === "pacote" && "R$ 2.025,00"}
                        {selectedType === "grupo" && `R$ ${(180 * selectedTimes.length).toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dados Pessoais */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Dados Pessoais</label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8]"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8]"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Telefone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8]"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>

                {/* Forma de Pagamento */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Forma de Pagamento</label>
                  <div className="space-y-2">
                    <label 
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition",
                        paymentMethod === "credit" 
                          ? "border-[#D4C5E8] bg-[#D4C5E8]/10" 
                          : "border-slate-300 hover:border-[#D4C5E8]"
                      )}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="credit"
                        checked={paymentMethod === "credit"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#D4C5E8]" 
                      />
                      <div>
                        <div className="font-medium text-slate-800">Cartão de Crédito</div>
                        <div className="text-xs text-slate-500">Visa, Mastercard, Elo, Amex</div>
                      </div>
                    </label>

                    <label 
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition",
                        paymentMethod === "pix" 
                          ? "border-[#D4C5E8] bg-[#D4C5E8]/10" 
                          : "border-slate-300 hover:border-[#D4C5E8]"
                      )}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="pix"
                        checked={paymentMethod === "pix"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#D4C5E8]" 
                      />
                      <div>
                        <div className="font-medium text-slate-800">PIX</div>
                        <div className="text-xs text-slate-500">Pagamento instantâneo</div>
                      </div>
                    </label>

                    <label 
                      className={cn(
                        "flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition",
                        paymentMethod === "boleto" 
                          ? "border-[#D4C5E8] bg-[#D4C5E8]/10" 
                          : "border-slate-300 hover:border-[#D4C5E8]"
                      )}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="boleto"
                        checked={paymentMethod === "boleto"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#D4C5E8]" 
                      />
                      <div>
                        <div className="font-medium text-slate-800">Boleto Bancário</div>
                        <div className="text-xs text-slate-500">Vencimento em 3 dias úteis</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Cartões Salvos e Novo Cartão */}
                {paymentMethod === "credit" && !showNewCardForm && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">Cartões Salvos</label>
                    <div className="space-y-3">
                      {savedCards.map((card) => (
                        <label
                          key={card.id}
                          className={cn(
                            "flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition",
                            selectedSavedCard === card.id
                              ? "border-[#D4C5E8] bg-[#D4C5E8]/10"
                              : "border-slate-300 hover:border-[#D4C5E8]"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="savedCard"
                              value={card.id}
                              checked={selectedSavedCard === card.id}
                              onChange={() => setSelectedSavedCard(card.id)}
                              className="w-4 h-4 text-[#D4C5E8]"
                            />
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-8 bg-gradient-to-br from-[#B5A0D4] to-[#9580B8] rounded flex items-center justify-center text-white text-xs font-bold border border-slate-300">
                                {card.brand}
                              </div>
                              <div>
                                <div className="font-medium text-slate-800">•••• •••• •••• {card.lastDigits}</div>
                                <div className="text-xs text-slate-500">{card.holderName} - Vence em {card.expiry}</div>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowNewCardForm(true)}
                      className="w-full px-4 py-3 border-2 border-dashed border-slate-300 text-slate-600 rounded-lg font-medium hover:border-[#D4C5E8] hover:text-[#D4C5E8] transition"
                    >
                      + Adicionar Novo Cartão
                    </button>
                  </div>
                )}

                {/* Formulário de Novo Cartão */}
                {paymentMethod === "credit" && showNewCardForm && (
                  <div className="space-y-4">
                    {/* Cartão Visual */}
                    <div className="relative h-48 bg-gradient-to-br from-[#B5A0D4] to-[#9580B8] rounded-2xl p-6 border-2 border-slate-300 shadow-lg">
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-10 bg-yellow-400 rounded opacity-80"></div>
                          <div className="text-white text-sm font-medium">VISA</div>
                        </div>
                        <div>
                          <div className="text-white text-xl tracking-wider font-mono mb-4">
                            {cardNumber || "•••• •••• •••• ••••"}
                          </div>
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-white text-xs opacity-70 mb-1">Nome do Titular</div>
                              <div className="text-white text-sm font-medium uppercase">
                                {cardName || "SEU NOME"}
                              </div>
                            </div>
                            <div>
                              <div className="text-white text-xs opacity-70 mb-1">Validade</div>
                              <div className="text-white text-sm font-medium">
                                {cardExpiry || "MM/AA"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campos de Entrada */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Número do Cartão</label>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '');
                            const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                            setCardNumber(formatted);
                          }}
                          className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8]"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-600 mb-1">Validade</label>
                          <input 
                            type="text" 
                            value={cardExpiry}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value;
                              setCardExpiry(formatted);
                            }}
                            className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8]"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1">CVV</label>
                          <input 
                            type="text" 
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8]"
                            placeholder="000"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Nome no Cartão</label>
                        <input 
                          type="text" 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8]"
                          placeholder="Nome como está no cartão"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNewCardForm(false)}
                      className="w-full px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium transition"
                    >
                      ← Voltar para cartões salvos
                    </button>
                  </div>
                )}

                {/* Botões Step 2 */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setScheduleStep(1)}
                    className="px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    Voltar
                  </button>
                  <button 
                    className="flex-1 px-6 py-3 bg-[#D4C5E8] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                  >
                    <Check size={16} className="inline mr-2" />
                    Confirmar e Pagar
                  </button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Avatar Test Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsAvatarModalOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 border-2 border-slate-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Testar Avatar IA</h3>
              <button onClick={() => setIsAvatarModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-[#D4C5E8] border-2 border-slate-300 rounded-lg">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Bot size={32} className="text-[#D4C5E8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Avatar da Dra. Ana</h4>
                  <p className="text-sm text-slate-700">Disponível agora para consultas</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                <p className="text-sm text-slate-700 mb-3">
                  <strong>Teste gratuito:</strong> Faça até 3 perguntas sem custo para conhecer o avatar.
                </p>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-[#C5E8D4]" />
                    <span>Respostas instantâneas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-[#C5E8D4]" />
                    <span>Baseado em conhecimento real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-[#C5E8D4]" />
                    <span>Sem compromisso</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sua primeira pergunta:</label>
                <textarea 
                  rows={3} 
                  placeholder="Ex: Quais são as principais mudanças na regulamentação CVM para 2024?" 
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4C5E8] resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-[#D4C5E8] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <Send size={16} className="inline mr-2" />
                  Iniciar Conversa
                </button>
                <button 
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilMentor;
