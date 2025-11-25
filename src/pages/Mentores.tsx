import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Check
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
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("individual");
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [scheduleStep, setScheduleStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit");

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
          setSelectedTime("");
          setSelectedMentor(null);
        }
      }}>
        <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
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
                    <label className="block text-sm font-medium text-slate-700 mb-3">Horários disponíveis</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "px-4 py-3 border-2 rounded-lg text-sm font-medium transition",
                            selectedTime === time
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
                    disabled={!selectedDate || !selectedTime}
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
                      <span className="text-slate-600">Horário:</span>
                      <span className="font-medium text-slate-800">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-300">
                      <span className="font-semibold text-slate-700">Total:</span>
                      <span className="font-bold text-slate-800">
                        {selectedType === "individual" && "R$ 450,00"}
                        {selectedType === "pacote" && "R$ 2.025,00"}
                        {selectedType === "grupo" && "R$ 180,00"}
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

                {/* Dados do Cartão (se cartão selecionado) */}
                {paymentMethod === "credit" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Número do Cartão</label>
                      <input 
                        type="text" 
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
                          className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">CVV</label>
                        <input 
                          type="text" 
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
                        className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(270,35%,65%)]"
                        placeholder="Nome como está no cartão"
                      />
                    </div>
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
                    className="flex-1 px-6 py-3 bg-[hsl(270,35%,65%)] border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
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
    </div>
  );
};

export default Mentores;
