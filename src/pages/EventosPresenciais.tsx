import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Filter, Ticket, Calendar, MapPin, Users, Mic, Clock, Tag, Star, ArrowUp, ArrowRight, ChevronLeft, ChevronRight, CalendarCheck, Presentation, GraduationCap, Handshake, Award, Wine, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import eventoConferenciaFintech from "@/assets/evento-conferencia-fintech.png";
import eventoWorkshopPagamentos from "@/assets/evento-workshop-pagamentos.png";
import eventoNetworkingPremium from "@/assets/evento-networking-premium.png";
import eventoTreinamentoRisco from "@/assets/evento-treinamento-risco.png";
import eventoCertificacaoBacen from "@/assets/evento-certificacao-bacen.png";
import eventoMesaRedondaRegulacao from "@/assets/evento-mesa-redonda-regulacao.png";

export default function EventosPresenciais() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const categories = ["Workshop", "Conferência", "Networking", "Certificação", "Treinamento", "Mesa Redonda"];
  const locations = ["São Paulo - SP", "Rio de Janeiro - RJ", "Brasília - DF", "Belo Horizonte - MG", "Curitiba - PR", "Porto Alegre - RS"];
  const speakers = ["Dr. Ricardo Almeida", "Ana Paula Santos", "Carlos Eduardo Mendes", "Dra. Fernanda Lima", "Prof. João Silva", "Marina Costa"];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const handleSpeakerToggle = (speaker: string) => {
    setSelectedSpeakers(prev => 
      prev.includes(speaker) ? prev.filter(s => s !== speaker) : [...prev, speaker]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedSpeakers([]);
    setPriceRange([0, 2000]);
    setDateRange({ start: "", end: "" });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <section className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-slate-800 mb-2">Eventos Presenciais</h1>
                <p className="text-slate-600">Conecte-se pessoalmente com profissionais do mercado financeiro</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFilterOpen(true)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </button>
                <button className="px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Meus Ingressos
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <button className="px-4 py-2 bg-pastel-yellow text-slate-800 rounded-lg font-medium whitespace-nowrap">
                Todos os Eventos
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition whitespace-nowrap">
                Conferências
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition whitespace-nowrap">
                Workshops
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition whitespace-nowrap">
                Networking
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition whitespace-nowrap">
                Certificações
              </button>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-gradient-to-r from-pastel-blue to-pastel-purple rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 gap-8 p-8">
                <div className="flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full w-fit mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Evento em Destaque
                  </span>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">Summit Mercado de Capitais 2025</h2>
                  <p className="text-slate-700 mb-6 leading-relaxed">O maior encontro de profissionais do mercado financeiro do Brasil. Três dias de conteúdo premium, networking de alto nível e insights exclusivos com os principais executivos do setor.</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <Calendar className="text-slate-700 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Data</p>
                        <p className="font-semibold text-slate-800">15-17 Março 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <MapPin className="text-slate-700 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Local</p>
                        <p className="font-semibold text-slate-800">São Paulo - SP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <Users className="text-slate-700 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Participantes</p>
                        <p className="font-semibold text-slate-800">2.500+ esperados</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <Mic className="text-slate-700 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Palestrantes</p>
                        <p className="font-semibold text-slate-800">45+ especialistas</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition">
                      Garantir Ingresso
                    </button>
                    <button className="px-6 py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-96 w-full overflow-hidden rounded-xl bg-pastel-blue/20">
                    <img className="w-full h-full object-cover" src={eventoConferenciaFintech} alt="Conference illustration" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Calendário de Eventos</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700">
                  Dezembro 2024
                </span>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-7 border-b border-slate-200">
                <div className="p-3 text-center text-sm font-medium text-slate-600 border-r border-slate-200">DOM</div>
                <div className="p-3 text-center text-sm font-medium text-slate-600 border-r border-slate-200">SEG</div>
                <div className="p-3 text-center text-sm font-medium text-slate-600 border-r border-slate-200">TER</div>
                <div className="p-3 text-center text-sm font-medium text-slate-600 border-r border-slate-200">QUA</div>
                <div className="p-3 text-center text-sm font-medium text-slate-600 border-r border-slate-200">QUI</div>
                <div className="p-3 text-center text-sm font-medium text-slate-600 border-r border-slate-200">SEX</div>
                <div className="p-3 text-center text-sm font-medium text-slate-600">SÁB</div>
              </div>
              <div className="grid grid-cols-7">
                {[1, 2, 3, 4].map((day) => (
                  <div key={`prev-${day}`} className="p-4 border-r border-b border-slate-200 min-h-24 bg-slate-50">
                    <span className="text-sm text-slate-400">{day}</span>
                  </div>
                ))}
                <div className="p-4 border-r border-b border-slate-200 min-h-24">
                  <span className="text-sm font-medium text-slate-700">5</span>
                  <div className="mt-2">
                    <div className="px-2 py-1 bg-pastel-blue text-xs text-slate-700 rounded mb-1 truncate">
                      Workshop Renda Fixa
                    </div>
                  </div>
                </div>
                {[6, 7, 8, 9, 10, 11].map((day) => (
                  <div key={`day-${day}`} className="p-4 border-r border-b border-slate-200 min-h-24">
                    <span className="text-sm font-medium text-slate-700">{day}</span>
                  </div>
                ))}
                <div className="p-4 border-r border-b border-slate-200 min-h-24">
                  <span className="text-sm font-medium text-slate-700">12</span>
                  <div className="mt-2">
                    <div className="px-2 py-1 bg-pastel-purple text-xs text-slate-700 rounded mb-1 truncate">
                      Conferência Open Finance
                    </div>
                  </div>
                </div>
                {[13, 14, 15, 16, 17].map((day) => (
                  <div key={`mid-${day}`} className="p-4 border-r border-b border-slate-200 min-h-24">
                    <span className="text-sm font-medium text-slate-700">{day}</span>
                  </div>
                ))}
                <div className="p-4 border-r border-b border-slate-200 min-h-24">
                  <span className="text-sm font-medium text-slate-700">18</span>
                  <div className="mt-2">
                    <div className="px-2 py-1 bg-pastel-green text-xs text-slate-700 rounded mb-1 truncate">
                      Networking Investidores
                    </div>
                  </div>
                </div>
                {[19, 20, 21, 22, 23, 24].map((day) => (
                  <div key={`late-${day}`} className="p-4 border-r border-b border-slate-200 min-h-24">
                    <span className="text-sm font-medium text-slate-700">{day}</span>
                  </div>
                ))}
                <div className="p-4 border-r border-slate-200 min-h-24 bg-slate-50">
                  <span className="text-sm text-slate-400">25</span>
                </div>
                {[26, 27, 28, 29, 30, 31].map((day) => (
                  <div key={`end-${day}`} className={`p-4 border-r border-slate-200 min-h-24 ${day > 24 ? '' : 'border-b'}`}>
                    <span className="text-sm font-medium text-slate-700">{day}</span>
                  </div>
                ))}
                {[1, 2, 3, 4].map((day) => (
                  <div key={`next-${day}`} className="p-4 border-slate-200 min-h-24 bg-slate-50">
                    <span className="text-sm text-slate-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Próximos Eventos</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos os eventos</a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-pastel-blue overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={eventoTreinamentoRisco} alt="Workshop" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      5 Dez
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Workshop</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      32 vagas
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Estratégias em Renda Fixa</h3>
                  <p className="text-sm text-slate-600 mb-4">Workshop prático sobre construção de carteiras de renda fixa com foco em gestão de risco e otimização de retornos.</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>09:00 - 13:00 (4 horas)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>Av. Paulista, 1000 - São Paulo</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Tag className="w-4 h-4" />
                      <span>R$ 450,00</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Instrutor" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-medium text-slate-800">Dr. Ricardo Almeida</p>
                      <p className="text-xs text-slate-500">CFA, Gestor de Fundos</p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-pastel-purple overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={eventoMesaRedondaRegulacao} alt="Conference" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      12 Dez
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">Conferência</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      500 vagas
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Open Finance Brasil 2024</h3>
                  <p className="text-sm text-slate-600 mb-4">Grande conferência sobre o ecossistema de Open Finance e suas oportunidades para instituições financeiras e fintechs.</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>08:00 - 18:00 (dia inteiro)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>Centro de Convenções - Rio de Janeiro</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Tag className="w-4 h-4" />
                      <span>R$ 890,00</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
                    <div className="flex -space-x-2">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Speaker" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Speaker" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="Speaker" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-800">15+ palestrantes</p>
                      <p className="text-xs text-slate-500">Executivos e especialistas</p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-pastel-green overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={eventoNetworkingPremium} alt="Networking" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      18 Dez
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Networking</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      80 vagas
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Encontro de Investidores</h3>
                  <p className="text-sm text-slate-600 mb-4">Evento exclusivo de networking para investidores institucionais, gestores de fundos e executivos do mercado financeiro.</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>19:00 - 22:00 (3 horas)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>Hotel Unique - São Paulo</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Tag className="w-4 h-4" />
                      <span>R$ 320,00</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
                    <div className="w-8 h-8 bg-pastel-green rounded-full flex items-center justify-center">
                      <Wine className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-800">Inclui jantar e drinks</p>
                      <p className="text-xs text-slate-500">Dress code: Business</p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Categorias de Eventos</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition cursor-pointer">
                <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center mb-4">
                  <Presentation className="text-slate-700 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Conferências</h3>
                <p className="text-sm text-slate-600 mb-3">Grandes eventos com múltiplos palestrantes</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">12 eventos</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition cursor-pointer">
                <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="text-slate-700 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Workshops</h3>
                <p className="text-sm text-slate-600 mb-3">Treinamentos práticos e interativos</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">8 eventos</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition cursor-pointer">
                <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mb-4">
                  <Handshake className="text-slate-700 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Networking</h3>
                <p className="text-sm text-slate-600 mb-3">Eventos para conexão profissional</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">6 eventos</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition cursor-pointer">
                <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-slate-700 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Certificações</h3>
                <p className="text-sm text-slate-600 mb-3">Cursos com certificado oficial</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">4 eventos</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Eventos Anteriores</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver galeria completa</a>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-32 bg-pastel-pink overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={eventoCertificacaoBacen} alt="Past event" />
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">Nov 2024</span>
                  <h3 className="font-medium text-slate-800 mt-2 mb-2">Regulação do Mercado</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    <span>245 participantes</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-32 bg-pastel-peach overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={eventoWorkshopPagamentos} alt="Past event" />
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">Nov 2024</span>
                  <h3 className="font-medium text-slate-800 mt-2 mb-2">Workshop Derivativos</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    <span>58 participantes</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-32 bg-pastel-blue overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={eventoConferenciaFintech} alt="Past event" />
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">Out 2024</span>
                  <h3 className="font-medium text-slate-800 mt-2 mb-2">Fórum Meios de Pagamento</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    <span>380 participantes</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-32 bg-pastel-purple overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={eventoTreinamentoRisco} alt="Past event" />
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">Out 2024</span>
                  <h3 className="font-medium text-slate-800 mt-2 mb-2">Summit Gestão de Riscos</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    <span>520 participantes</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <CalendarCheck className="text-slate-700 w-6 h-6" />
                  </div>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +12%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">32</h3>
                <p className="text-sm text-slate-600">Eventos este mês</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <Users className="text-slate-700 w-6 h-6" />
                  </div>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +8%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">8.5k</h3>
                <p className="text-sm text-slate-600">Participantes totais</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <MapPin className="text-slate-700 w-6 h-6" />
                  </div>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +3
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">15</h3>
                <p className="text-sm text-slate-600">Cidades diferentes</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <Star className="text-slate-700 w-6 h-6" />
                  </div>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +0.2
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">4.8</h3>
                <p className="text-sm text-slate-600">Avaliação média</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Parceiros e Organizadores</h2>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <div className="grid grid-cols-6 gap-8 items-center">
                {["ANBIMA", "B3", "FEBRABAN", "CVM", "ABECS", "BACEN"].map((partner) => (
                  <div key={partner} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition">
                    <div className="w-24 h-12 bg-slate-100 rounded flex items-center justify-center">
                      <span className="text-xs font-semibold text-slate-600">{partner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-slate-800">Filtros de Eventos</SheetTitle>
            <SheetDescription className="text-slate-600">
              Personalize sua busca por eventos presenciais
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Categoria */}
            <div>
              <Label className="text-sm font-semibold text-slate-800 mb-3 block">Categoria</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm text-slate-700 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Local */}
            <div>
              <Label className="text-sm font-semibold text-slate-800 mb-3 block">Local</Label>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => handleLocationToggle(location)}
                    />
                    <label
                      htmlFor={`location-${location}`}
                      className="text-sm text-slate-700 cursor-pointer"
                    >
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Faixa de Preço */}
            <div>
              <Label className="text-sm font-semibold text-slate-800 mb-3 block">
                Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={2000}
                min={0}
                step={50}
                className="mt-2"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500">R$ 0</span>
                <span className="text-xs text-slate-500">R$ 2.000</span>
              </div>
            </div>

            {/* Data */}
            <div>
              <Label className="text-sm font-semibold text-slate-800 mb-3 block">Período</Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-slate-600 mb-1 block">Data Inicial</Label>
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-600 mb-1 block">Data Final</Label>
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="bg-white border-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Palestrantes */}
            <div>
              <Label className="text-sm font-semibold text-slate-800 mb-3 block">Palestrantes</Label>
              <div className="space-y-2">
                {speakers.map((speaker) => (
                  <div key={speaker} className="flex items-center space-x-2">
                    <Checkbox
                      id={`speaker-${speaker}`}
                      checked={selectedSpeakers.includes(speaker)}
                      onCheckedChange={() => handleSpeakerToggle(speaker)}
                    />
                    <label
                      htmlFor={`speaker-${speaker}`}
                      className="text-sm text-slate-700 cursor-pointer"
                    >
                      {speaker}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Limpar Filtros
              </Button>
              <Button
                onClick={() => setFilterOpen(false)}
                className="flex-1 bg-pastel-blue text-slate-800 hover:bg-pastel-blue/80"
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
