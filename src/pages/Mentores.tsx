import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Bell, 
  CalendarPlus, 
  CalendarCheck, 
  CheckCircle, 
  Clock, 
  Users, 
  Circle,
  Grid3x3,
  List,
  LayersIcon,
  Star,
  Trophy,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  UserCheck,
  Info,
  Calendar,
  Check,
  FileText,
  Download
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const Mentores = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeFilter, setActiveFilter] = useState<"todos" | "favoritos" | "top-rated">("todos");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("individual");
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [scheduleStep, setScheduleStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [showNewCardForm, setShowNewCardForm] = useState<boolean>(false);
  const [selectedSavedCard, setSelectedSavedCard] = useState<number | null>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

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
      brand: "Rod",
      holderName: "JOÃO SILVA",
      expiry: "08/27"
    }
  ];

  useEffect(() => {
    if (scheduleStep === 2 && sheetContentRef.current) {
      sheetContentRef.current.scrollTop = 0;
    }
  }, [scheduleStep]);

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;
    
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`recibo-mentoria-${new Date().getTime()}.pdf`);
  };

  const mentores = [
    {
      id: 1,
      name: "Dra. Ana Beatriz Costa",
      title: "Diretora de Compliance - Banco Central",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      tags: ["Compliance", "Regulação", "CVM"],
      mentorias: 156,
      experiencia: "15 anos experiência",
      rating: 5.0,
      reviews: 128,
      score: 98,
      scoreLabel: "Excelente",
      scoreColor: "hsl(270, 35%, 65%)",
      favorite: true
    },
    {
      id: 2,
      name: "Carlos Eduardo Silva",
      title: "Head de Produtos Digitais - Fintech Líder",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      tags: ["Banking Digital", "Inovação", "Produto"],
      mentorias: 142,
      experiencia: "12 anos experiência",
      rating: 4.9,
      reviews: 115,
      score: 95,
      scoreLabel: "Excelente",
      scoreColor: "hsl(207, 35%, 65%)",
      favorite: false
    },
    {
      id: 3,
      name: "Mariana Oliveira Santos",
      title: "Sócia-Diretora - Gestora de Investimentos",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      tags: ["Mercado de Capitais", "Renda Fixa", "B3"],
      mentorias: 189,
      experiencia: "18 anos experiência",
      rating: 5.0,
      reviews: 156,
      score: 100,
      scoreLabel: "Excepcional",
      scoreColor: "hsl(142, 35%, 65%)",
      favorite: true
    },
    {
      id: 4,
      name: "Roberto Mendes Almeida",
      title: "VP de Operações - Processadora Pagamentos",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      tags: ["Pagamentos", "PIX", "Cartões"],
      mentorias: 124,
      experiencia: "14 anos experiência",
      rating: 4.8,
      reviews: 98,
      score: 92,
      scoreLabel: "Muito Bom",
      scoreColor: "hsl(42, 35%, 65%)",
      favorite: false
    },
    {
      id: 5,
      name: "Juliana Carvalho Mendes",
      title: "CFO - Banco Digital",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      tags: ["Finanças Corporativas", "Estratégia", "M&A"],
      mentorias: 167,
      experiencia: "16 anos experiência",
      rating: 4.9,
      reviews: 134,
      score: 96,
      scoreLabel: "Excelente",
      scoreColor: "hsl(330, 35%, 65%)",
      favorite: false
    },
    {
      id: 6,
      name: "Fernando Lima Rodrigues",
      title: "Economista Chefe - Instituição Financeira",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      tags: ["Análise Econômica", "Macroeconomia", "Política Monetária"],
      mentorias: 176,
      experiencia: "20 anos experiência",
      rating: 5.0,
      reviews: 142,
      score: 99,
      scoreLabel: "Excepcional",
      scoreColor: "hsl(30, 35%, 65%)",
      favorite: true
    },
    {
      id: 7,
      name: "Ricardo Almeida Costa",
      title: "CTO - Fintech de Pagamentos",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      tags: ["Tecnologia", "Open Finance", "APIs"],
      mentorias: 95,
      experiencia: "11 anos experiência",
      rating: 4.7,
      reviews: 76,
      score: 89,
      scoreLabel: "Muito Bom",
      scoreColor: "hsl(207, 35%, 65%)",
      favorite: false
    },
    {
      id: 8,
      name: "Patricia Rocha Martins",
      title: "Superintendente - CVM",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      tags: ["Regulação", "CVM", "Compliance"],
      mentorias: 134,
      experiencia: "17 anos experiência",
      rating: 4.9,
      reviews: 108,
      score: 94,
      scoreLabel: "Excelente",
      scoreColor: "hsl(142, 35%, 65%)",
      favorite: false
    },
    {
      id: 9,
      name: "Eduardo Ferreira Lima",
      title: "Gestor de Fundos - Asset Management",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      tags: ["Investimentos", "Fundos", "Renda Variável"],
      mentorias: 118,
      experiencia: "13 anos experiência",
      rating: 4.8,
      reviews: 94,
      score: 91,
      scoreLabel: "Muito Bom",
      scoreColor: "hsl(42, 35%, 65%)",
      favorite: false
    },
    {
      id: 10,
      name: "Lucas Martins Souza",
      title: "Diretor Comercial - Adquirente",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      tags: ["Cartões", "Adquirência", "Vendas"],
      mentorias: 102,
      experiencia: "10 anos experiência",
      rating: 4.9,
      reviews: 85,
      score: 93,
      scoreLabel: "Excelente",
      scoreColor: "hsl(330, 35%, 65%)",
      favorite: true
    }
  ];

  const especialidades = [
    { name: "Todos", count: 32, color: "text-slate-600" },
    { name: "Mercado de Capitais", count: 9, color: "text-[hsl(270,35%,55%)]" },
    { name: "Banking Digital", count: 7, color: "text-[hsl(207,35%,55%)]" },
    { name: "Pagamentos", count: 8, color: "text-[hsl(142,35%,55%)]" },
    { name: "Compliance", count: 5, color: "text-[hsl(42,35%,55%)]" },
    { name: "Gestão de Riscos", count: 3, color: "text-[hsl(30,35%,55%)]" }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">{/* Header */}
        <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Mentores Especializados</h1>
              <p className="text-sm text-slate-500 mt-1">Conecte-se com especialistas do mercado financeiro para acelerar sua carreira</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar mentores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)] focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Button 
                onClick={() => setShowRequestModal(true)}
                className="px-4 py-2 bg-[hsl(270,35%,65%)] hover:bg-[hsl(270,35%,60%)] text-slate-700 rounded-lg font-medium transition"
              >
                <CalendarPlus className="mr-2" size={18} />
                Solicitar Mentoria
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar Filtros */}
            <aside className="w-80 space-y-6 flex-shrink-0">
              {/* Suas Mentorias */}
              <section className="bg-white rounded-xl p-6 border-2 border-slate-300">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Suas Mentorias</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[hsl(270,35%,65%)] rounded-lg flex items-center justify-center">
                        <CalendarCheck className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Agendadas</span>
                    </div>
                    <span className="font-semibold text-slate-800">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[hsl(142,35%,65%)] rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Concluídas</span>
                    </div>
                    <span className="font-semibold text-slate-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[hsl(207,35%,65%)] rounded-lg flex items-center justify-center">
                        <Clock className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Horas Totais</span>
                    </div>
                    <span className="font-semibold text-slate-800">18h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[hsl(42,35%,65%)] rounded-lg flex items-center justify-center">
                        <Users className="text-slate-700" size={16} />
                      </div>
                      <span className="text-sm text-slate-700">Mentores Ativos</span>
                    </div>
                    <span className="font-semibold text-slate-800">5</span>
                  </div>
                </div>
              </section>

              {/* Especialidades */}
              <section className="bg-white rounded-xl p-6 border-2 border-slate-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Especialidades</h2>
                  <button 
                    onClick={() => setSelectedExpertise("Todos")}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Limpar
                  </button>
                </div>
                <div className="space-y-2">
                  {especialidades.map((esp) => (
                    <div
                      key={esp.name}
                      onClick={() => setSelectedExpertise(esp.name)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                        selectedExpertise === esp.name
                          ? "bg-[hsl(270,35%,65%)] text-slate-800"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      <Circle className={`text-[8px] flex-shrink-0 ${esp.color}`} size={8} fill="currentColor" />
                      <span className={`text-sm flex-1 ${selectedExpertise === esp.name ? "font-medium" : "text-slate-700"}`}>
                        {esp.name}
                      </span>
                      <span className={`text-xs flex-shrink-0 ${
                        selectedExpertise === esp.name 
                          ? "bg-white px-2 py-1 rounded-full" 
                          : "text-slate-500"
                      }`}>
                        {esp.count}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Avaliação */}
              <section className="bg-white rounded-xl p-6 border-2 border-slate-300">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Avaliação</h2>
                <div className="space-y-2">
                  {[
                    { stars: 5, count: 15 },
                    { stars: 4, count: 12 },
                    { stars: 3, count: 5 }
                  ].map((rating) => (
                    <label key={rating.stars} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <Checkbox className="flex-shrink-0" />
                      <div className="flex items-center gap-2 flex-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < rating.stars ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 flex-shrink-0">{rating.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Nível de Experiência */}
              <section className="bg-white rounded-xl p-6 border-2 border-slate-300">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Nível de Experiência</h2>
                <div className="space-y-2">
                  {[
                    { label: "Senior (10+ anos)", count: 18, checked: true },
                    { label: "Pleno (5-10 anos)", count: 10, checked: true },
                    { label: "Júnior (2-5 anos)", count: 4, checked: false }
                  ].map((level) => (
                    <label key={level.label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <Checkbox defaultChecked={level.checked} className="flex-shrink-0" />
                      <span className="text-sm text-slate-700 flex-1">{level.label}</span>
                      <span className="text-xs text-slate-500 flex-shrink-0">{level.count}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Disponibilidade */}
              <section className="bg-white rounded-xl p-6 border-2 border-slate-300">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Disponibilidade</h2>
                <div className="space-y-2">
                  {[
                    { label: "Esta Semana", count: 8, highlight: true },
                    { label: "Próximos 15 Dias", count: 24, highlight: false },
                    { label: "Próximo Mês", count: 32, highlight: false }
                  ].map((disp) => (
                    <label key={disp.label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                      <Checkbox className="flex-shrink-0" />
                      <span className="text-sm text-slate-700 flex-1">{disp.label}</span>
                      <span className={`text-xs flex-shrink-0 ${
                        disp.highlight 
                          ? "bg-[hsl(142,35%,65%)] text-slate-700 px-2 py-1 rounded-full" 
                          : "text-slate-500"
                      }`}>
                        {disp.count}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Toolbar */}
              <section className="bg-white rounded-xl p-4 border-2 border-slate-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">Visualizar:</span>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition ${
                          viewMode === "grid"
                            ? "bg-[hsl(270,35%,65%)] text-slate-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Grid3x3 size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition ${
                          viewMode === "list"
                            ? "bg-[hsl(270,35%,65%)] text-slate-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <List size={18} />
                      </button>
                    </div>
                    <Select defaultValue="pontuacao">
                      <SelectTrigger className="w-[180px] text-sm border-2 border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pontuacao">Maior Pontuação</SelectItem>
                        <SelectItem value="mentorias">Mais Mentorias</SelectItem>
                        <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
                        <SelectItem value="recentes">Mais Recentes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setActiveFilter("todos")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        activeFilter === "todos"
                          ? "bg-[hsl(142,35%,65%)] text-slate-700"
                          : "bg-transparent text-slate-600 hover:bg-slate-100 border-2 border-transparent"
                      }`}
                    >
                      <LayersIcon size={16} />
                      <span>Todos</span>
                    </Button>
                    <Button
                      onClick={() => setActiveFilter("favoritos")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        activeFilter === "favoritos"
                          ? "bg-[hsl(142,35%,65%)] text-slate-700"
                          : "bg-transparent text-slate-600 hover:bg-slate-100 border-2 border-transparent"
                      }`}
                    >
                      <Star size={16} />
                      <span>Favoritos</span>
                    </Button>
                    <Button
                      onClick={() => setActiveFilter("top-rated")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        activeFilter === "top-rated"
                          ? "bg-[hsl(142,35%,65%)] text-slate-700"
                          : "bg-transparent text-slate-600 hover:bg-slate-100 border-2 border-transparent"
                      }`}
                    >
                      <Trophy size={16} />
                      <span>Top Rated</span>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Navigation Tabs */}
              <section className="bg-white rounded-xl p-4 border-2 border-slate-300">
                <div className="flex items-center gap-3">
                  <button 
                    className="px-6 py-2.5 bg-[hsl(142,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <GraduationCap size={18} />
                    Mentores
                  </button>
                  <button 
                    onClick={() => navigate("/autores")}
                    className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <UserCheck size={18} />
                    Seguindo
                  </button>
                  <button 
                    onClick={() => navigate("/seguidores")}
                    className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <Users size={18} />
                    Seguidores
                  </button>
                  <button 
                    onClick={() => navigate("/descobrir-novos")}
                    className="px-6 py-2.5 bg-[hsl(207,35%,65%)] hover:bg-[hsl(330,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
                  >
                    <Search size={18} />
                    Descobrir Novos
                  </button>
                </div>
              </section>

              {/* Toggle Section - REMOVIDO */}

              {/* Mentors List */}
              <section className="bg-white rounded-xl border-2 border-slate-300 overflow-hidden">
                {/* Table Header */}
                <div className="border-b-2 border-slate-300 bg-slate-50">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                    <div className="col-span-4">Mentor</div>
                    <div className="col-span-2">Mentorias</div>
                    <div className="col-span-2">Avaliação</div>
                    <div className="col-span-2">Pontuação</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>
                </div>

                {/* Table Rows */}
                {mentores.map((mentor, index) => (
                  <div
                    key={mentor.id}
                    className={`${
                      index !== mentores.length - 1 ? "border-b border-slate-200" : ""
                    } hover:bg-slate-50 transition-colors cursor-pointer`}
                    onClick={() => navigate("/perfil-mentor")}
                  >
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                      {/* Mentor Info */}
                      <div className="col-span-4 flex items-center gap-4">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-slate-300"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                            {mentor.name}
                            <Award className="text-[hsl(270,35%,65%)]" size={14} />
                          </h3>
                          <p className="text-xs text-slate-500 truncate">{mentor.title}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {mentor.tags.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 bg-slate-400 text-white rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Mentorias */}
                      <div className="col-span-2">
                        <div className="text-sm font-semibold text-slate-700">{mentor.mentorias} mentorias</div>
                        <div className="text-xs text-slate-500">{mentor.experiencia}</div>
                      </div>

                      {/* Rating */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-1 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < Math.floor(mentor.rating) ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-slate-500">{mentor.rating.toFixed(1)} ({mentor.reviews} avaliações)</div>
                      </div>

                      {/* Score */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ width: `${mentor.score}%`, backgroundColor: mentor.scoreColor }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{mentor.score}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{mentor.scoreLabel}</div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button 
                          className={`p-2 transition-colors ${
                            mentor.favorite 
                              ? "text-yellow-600 hover:text-yellow-700" 
                              : "text-slate-400 hover:text-yellow-600"
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Star size={18} fill={mentor.favorite ? "currentColor" : "none"} />
                        </button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMentor(mentor.id);
                            setShowRequestModal(true);
                          }}
                          className="px-3 py-1.5 bg-[hsl(270,35%,65%)] hover:bg-[hsl(270,35%,60%)] text-slate-700 rounded-lg text-sm font-medium transition"
                        >
                          <CalendarCheck className="mr-1" size={14} />
                          Agendar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Pagination */}
              <section className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <Button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition border-2 border-transparent">
                    <ChevronLeft className="mr-2" size={16} />
                    Anterior
                  </Button>
                  <Button className="px-4 py-2 bg-[hsl(270,35%,65%)] text-slate-700 rounded-lg font-medium">1</Button>
                  <Button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition">2</Button>
                  <Button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition">3</Button>
                  <Button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition">4</Button>
                  <Button className="px-4 py-2 text-slate-600 hover:bg-slate-100 bg-transparent rounded-lg transition border-2 border-transparent">
                    Próximo
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Schedule Sheet */}
      <Sheet open={showRequestModal} onOpenChange={(open) => {
        setShowRequestModal(open);
        if (!open) {
          setScheduleStep(1);
          setSelectedDate(undefined);
          setSelectedTimes([]);
          setSelectedMentor(null);
          setCardNumber("");
          setCardName("");
          setCardExpiry("");
          setCardCvv("");
          setShowNewCardForm(false);
          setSelectedSavedCard(1);
          setIsProcessingPayment(false);
          setPaymentSuccess(false);
          setShowReceipt(false);
        }
      }}>
        <SheetContent ref={sheetContentRef} className="w-[500px] sm:w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-slate-800">
              {showReceipt ? "Recibo de Pagamento" : paymentSuccess ? "Pagamento Aprovado" : scheduleStep === 1 ? "Agendar Mentoria" : "Pagamento e Confirmação"}
            </SheetTitle>
            <SheetDescription>
              {showReceipt 
                ? "Detalhes da transação e comprovante"
                : paymentSuccess 
                  ? "Sua mentoria foi agendada com sucesso" 
                  : scheduleStep === 1 
                    ? "Escolha a data, horário e tipo de consultoria" 
                    : "Complete os dados de pagamento para finalizar"}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {showReceipt ? (
              <>
                {/* Recibo */}
                <div ref={receiptRef} className="bg-white space-y-6">
                  {/* Cabeçalho do Recibo */}
                  <div className="text-center border-b-2 border-slate-300 pb-6 px-6 pt-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">RECIBO DE PAGAMENTO</h2>
                    <p className="text-sm text-slate-600">Comprovante de Agendamento de Mentoria</p>
                  </div>

                  {/* Informações da Empresa */}
                  <div className="border-2 border-slate-300 rounded-lg p-4 bg-slate-50">
                    <h3 className="font-semibold text-slate-800 mb-2">FinLearn - Plataforma de Educação Financeira</h3>
                    <p className="text-sm text-slate-600">CNPJ: 12.345.678/0001-90</p>
                    <p className="text-sm text-slate-600">Endereço: Av. Paulista, 1000 - São Paulo, SP</p>
                    <p className="text-sm text-slate-600">contato@finlearn.com</p>
                  </div>

                  {/* Dados do Cliente */}
                  <div className="border-2 border-slate-300 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-800 mb-3">Dados do Cliente</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Nome:</span> João Silva</p>
                      <p><span className="font-medium">CPF:</span> 123.456.789-00</p>
                      <p><span className="font-medium">Email:</span> joao.silva@email.com</p>
                    </div>
                  </div>

                  {/* Detalhes da Transação */}
                  <div className="border-2 border-slate-300 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-800 mb-3">Detalhes da Transação</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Nº do Recibo:</span>
                        <span className="font-mono font-medium text-slate-800">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Data da Transação:</span>
                        <span className="font-medium text-slate-800">{new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Forma de Pagamento:</span>
                        <span className="font-medium text-slate-800">
                          {paymentMethod === "credit" && "Cartão de Crédito"}
                          {paymentMethod === "pix" && "PIX"}
                          {paymentMethod === "boleto" && "Boleto Bancário"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Status:</span>
                        <span className="font-medium text-[#C5E8D4]">APROVADO</span>
                      </div>
                    </div>
                  </div>

                  {/* Serviço Contratado */}
                  <div className="border-2 border-slate-300 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-800 mb-3">Serviço Contratado</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Serviço:</span>
                        <span className="font-medium text-slate-800">Mentoria Individual</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Mentor:</span>
                        <span className="font-medium text-slate-800">{mentores.find(m => m.id === selectedMentor)?.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Data Agendada:</span>
                        <span className="font-medium text-slate-800">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Horários:</span>
                        <span className="font-medium text-slate-800">{selectedTimes.join(', ')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Quantidade de Sessões:</span>
                        <span className="font-medium text-slate-800">{selectedTimes.length}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Valores */}
                  <div className="border-2 border-slate-300 rounded-lg p-4 bg-slate-50">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Valor unitário:</span>
                        <span className="text-slate-800">
                          {selectedType === "individual" && "R$ 450,00"}
                          {selectedType === "pacote" && "R$ 405,00"}
                          {selectedType === "grupo" && "R$ 180,00"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Quantidade:</span>
                        <span className="text-slate-800">{selectedTimes.length}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t-2 border-slate-300">
                        <span className="font-bold text-slate-800">VALOR TOTAL:</span>
                        <span className="font-bold text-slate-800 text-lg">
                          {selectedType === "individual" && `R$ ${(450 * selectedTimes.length).toFixed(2).replace('.', ',')}`}
                          {selectedType === "pacote" && "R$ 2.025,00"}
                          {selectedType === "grupo" && `R$ ${(180 * selectedTimes.length).toFixed(2).replace('.', ',')}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Observações */}
                  <div className="border-2 border-slate-300 rounded-lg p-4 text-xs text-slate-600">
                    <p className="mb-2"><strong>Observações:</strong></p>
                    <p>- Este recibo é válido como comprovante de pagamento.</p>
                    <p>- Você receberá um email com o link para a sessão 24h antes do horário agendado.</p>
                    <p>- Cancelamentos devem ser realizados com até 24h de antecedência.</p>
                    <p>- Em caso de dúvidas, entre em contato pelo email: suporte@finlearn.com</p>
                  </div>

                  {/* Assinatura Digital */}
                  <div className="text-center pt-4 border-t-2 border-slate-300 px-6 pb-6">
                    <p className="text-xs text-slate-500">Documento gerado eletronicamente em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
                    <p className="text-xs text-slate-500 mt-1">FinLearn - Todos os direitos reservados</p>
                  </div>
                </div>

                {/* Botões do Recibo */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowReceipt(false)}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    ← Voltar
                  </button>
                  <button 
                    onClick={handleDownloadReceipt}
                    className="flex-1 px-6 py-3 bg-[hsl(270,35%,65%)] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                  >
                    <Download size={16} className="inline mr-2" />
                    Baixar PDF
                  </button>
                </div>
              </>
            ) : paymentSuccess ? (
              <>
                {/* Tela de Sucesso */}
                <div className="flex flex-col items-center justify-center py-8 space-y-6">
                  <div className="w-24 h-24 bg-[#C5E8D4] border-2 border-slate-300 rounded-full flex items-center justify-center">
                    <Check size={48} className="text-slate-700" />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800">Transação Aprovada!</h3>
                    <p className="text-slate-600">Seu pagamento foi processado com sucesso</p>
                  </div>

                  <div className="w-full p-4 bg-slate-50 border-2 border-slate-300 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Mentor:</span>
                      <span className="font-medium text-slate-800">{mentores.find(m => m.id === selectedMentor)?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Data:</span>
                      <span className="font-medium text-slate-800">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Horários:</span>
                      <span className="font-medium text-slate-800">{selectedTimes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-300">
                      <span className="font-semibold text-slate-700">Total pago:</span>
                      <span className="font-bold text-slate-800">
                        {selectedType === "individual" && `R$ ${(450 * selectedTimes.length).toFixed(2).replace('.', ',')}`}
                        {selectedType === "pacote" && "R$ 2.025,00"}
                        {selectedType === "grupo" && `R$ ${(180 * selectedTimes.length).toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#E8E0C5] border-2 border-slate-300 rounded-lg w-full">
                    <div className="flex items-start gap-3">
                      <Info size={20} className="text-slate-700 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-700">
                        Você receberá um email de confirmação com o link para a sessão em breve.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowRequestModal(false)}
                    className="w-full px-4 py-2 border-2 border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition"
                  >
                    Fechar
                  </button>
                  <button 
                    onClick={() => setShowReceipt(true)}
                    className="w-full px-6 py-3 bg-[hsl(270,35%,65%)] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                  >
                    <FileText size={16} className="inline mr-2" />
                    Ver Recibo
                  </button>
                </div>
              </>
            ) : scheduleStep === 1 ? (
              <>
                {/* Step 1: Seleção de Consultoria */}
                {/* Mentor Info */}
                {selectedMentor && (() => {
                  const mentor = mentores.find(m => m.id === selectedMentor);
                  if (!mentor) return null;
                  
                  return (
                    <div className="flex items-center gap-4 p-4 bg-slate-50 border-2 border-slate-300 rounded-lg">
                      <img 
                        src={mentor.image} 
                        alt={mentor.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-800">{mentor.name}</h4>
                        <p className="text-sm text-slate-600">{mentor.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star size={12} className="fill-yellow-500 text-yellow-500" />
                          <span className="text-sm text-slate-600">{mentor.rating.toFixed(1)} ({mentor.reviews} avaliações)</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Tipo de Consultoria */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Tipo de Consultoria</label>
                  <div className="space-y-2">
                    <label 
                      className={cn(
                        "flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition",
                        selectedType === "individual" 
                          ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)]/10" 
                          : "border-slate-300 hover:border-[hsl(270,35%,65%)]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="type" 
                          value="individual"
                          checked={selectedType === "individual"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-[hsl(270,35%,65%)]" 
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
                          ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)]/10" 
                          : "border-slate-300 hover:border-[hsl(270,35%,65%)]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="type" 
                          value="pacote"
                          checked={selectedType === "pacote"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-[hsl(270,35%,65%)]" 
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
                          ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)]/10" 
                          : "border-slate-300 hover:border-[hsl(270,35%,65%)]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="type" 
                          value="grupo"
                          checked={selectedType === "grupo"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-[hsl(270,35%,65%)]" 
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
                              ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)] text-slate-700"
                              : "border-slate-300 text-slate-700 hover:border-[hsl(270,35%,65%)]"
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
                <div className="p-4 bg-[hsl(42,35%,75%)] border-2 border-slate-300 rounded-lg">
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
                    className="flex-1 px-6 py-3 bg-[hsl(270,35%,65%)] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calendar size={16} className="inline mr-2" />
                    Continuar para Pagamento
                  </button>
                  <button 
                    onClick={() => setShowRequestModal(false)}
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
                      <span className="font-medium text-slate-800">
                        {selectedMentor && mentores.find(m => m.id === selectedMentor)?.name}
                      </span>
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
                        className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Telefone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
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
                          ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)]/10" 
                          : "border-slate-300 hover:border-[hsl(270,35%,65%)]"
                      )}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="credit"
                        checked={paymentMethod === "credit"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[hsl(270,35%,65%)]" 
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
                          ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)]/10" 
                          : "border-slate-300 hover:border-[hsl(270,35%,65%)]"
                      )}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="pix"
                        checked={paymentMethod === "pix"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[hsl(270,35%,65%)]" 
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
                          ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)]/10" 
                          : "border-slate-300 hover:border-[hsl(270,35%,65%)]"
                      )}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value="boleto"
                        checked={paymentMethod === "boleto"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[hsl(270,35%,65%)]" 
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
                              ? "border-[hsl(270,35%,65%)] bg-[hsl(270,35%,65%)]/10"
                              : "border-slate-300 hover:border-[hsl(270,35%,65%)]"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="savedCard"
                              value={card.id}
                              checked={selectedSavedCard === card.id}
                              onChange={() => setSelectedSavedCard(card.id)}
                              className="w-4 h-4 text-[hsl(270,35%,65%)]"
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
                      className="w-full px-4 py-3 border-2 border-dashed border-slate-300 text-slate-600 rounded-lg font-medium hover:border-[hsl(270,35%,65%)] hover:text-[hsl(270,35%,65%)] transition"
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
                          className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
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
                            className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
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
                            className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
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
                          className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
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
                    onClick={async () => {
                      setIsProcessingPayment(true);
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      setIsProcessingPayment(false);
                      setPaymentSuccess(true);
                      if (sheetContentRef.current) {
                        sheetContentRef.current.scrollTop = 0;
                      }
                    }}
                    disabled={isProcessingPayment}
                    className="flex-1 px-6 py-3 bg-[hsl(270,35%,65%)] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessingPayment ? (
                      <>
                        <svg className="inline mr-2 w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </>
                    ) : (
                      <>
                        <Check size={16} className="inline mr-2" />
                        Confirmar e Pagar
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Mentores;
