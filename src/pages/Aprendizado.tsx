import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { HistoricoDocumentos } from "@/components/Dashboard/HistoricoDocumentos";
import { RelatoriosPendentes } from "@/components/Dashboard/RelatoriosPendentes";
import { InfograficosPendentes } from "@/components/Dashboard/InfograficosPendentes";
import { WhitepapersPendentes } from "@/components/Dashboard/WhitepapersPendentes";
import { ApresentacoesPendentes } from "@/components/Dashboard/ApresentacoesPendentes";
import { NewspapersNaoLidas } from "@/components/Dashboard/NewspapersNaoLidas";
import { LiveContent } from "@/components/Dashboard/LiveContent";
import { EntrevistasContent } from "@/components/Dashboard/EntrevistasContent";
import { NewspaperAnalytics } from "@/components/Dashboard/NewspaperAnalytics";
import { PodcastsAnalytics } from "@/components/Dashboard/PodcastsAnalytics";
import { CursosAnalytics } from "@/components/Dashboard/CursosAnalytics";
import { WebinarsAnalyticsConsumption } from "@/components/Dashboard/WebinarsAnalyticsConsumption";
import { EbooksAnalyticsConsumption } from "@/components/Dashboard/EbooksAnalyticsConsumption";
import { ArtigosAnalyticsConsumption } from "@/components/Dashboard/ArtigosAnalyticsConsumption";
import { AnalisesAnalyticsConsumption } from "@/components/Dashboard/AnalisesAnalyticsConsumption";
import { RelatoriosAnalyticsConsumption } from "@/components/Dashboard/RelatoriosAnalyticsConsumption";
import { EstudosAnalyticsConsumption } from "@/components/Dashboard/EstudosAnalyticsConsumption";
import { InfograficosAnalyticsConsumption } from "@/components/Dashboard/InfograficosAnalyticsConsumption";
import { WhitepaperAnalyticsConsumption } from "@/components/Dashboard/WhitepaperAnalyticsConsumption";
import { ApresentacoesAnalyticsConsumption } from "@/components/Dashboard/ApresentacoesAnalyticsConsumption";
import { LiveAnalyticsConsumption } from "@/components/Dashboard/LiveAnalyticsConsumption";
import { EntrevistasAnalyticsConsumption } from "@/components/Dashboard/EntrevistasAnalyticsConsumption";
import { AvatarIAAnalyticsConsumption } from "@/components/Dashboard/AvatarIAAnalyticsConsumption";
import { Bell, Play, Clock, BookOpen, TrendingUp, Headphones, Calendar, Users, MessageCircle, Star, BookMarked, Video, Award, Heart, CheckCircle, PlayCircle, Trophy, ChartLine, Shield, Bitcoin, Gavel, PieChart, Repeat, Globe, Leaf, Plus, BookOpenCheck, CreditCard, FileText, Bookmark, Quote, Download, Share2, Bot, Eye, Percent, DollarSign, Lightbulb, AlertTriangle, Coins, Mic, Search, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ebookRiskManagementPink from "@/assets/ebook-risk-management-pink.png";
import cursoAnaliseTecnicaIllustration from "@/assets/curso-analise-tecnica-illustration.png";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VideoCallModal } from "@/components/VideoCallModal";
type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live' | 'entrevistas';
const agents = [{
  id: 1,
  name: "Prof. Ana Santos",
  role: "Especialista Sênior",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
  specialty: "Derivativos",
  specialtyColor: "bg-pastel-blue",
  rating: 4.9,
  reviews: "1.2k",
  interactions: "3.4k conversas",
  status: "online"
}, {
  id: 2,
  name: "Dr. Roberto Lima",
  role: "Expert Principal",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
  specialty: "Macroeconomia",
  specialtyColor: "bg-pastel-green",
  rating: 4.8,
  reviews: "980",
  interactions: "2.8k conversas",
  status: "online"
}, {
  id: 3,
  name: "Profa. Marina Costa",
  role: "Consultora Especialista",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
  specialty: "ESG & Sustentabilidade",
  specialtyColor: "bg-pastel-purple",
  rating: 5.0,
  reviews: "756",
  interactions: "1.9k conversas",
  status: "online"
}, {
  id: 4,
  name: "Dr. Fernando Alves",
  role: "Analista Sênior",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
  specialty: "Análise Técnica",
  specialtyColor: "bg-pastel-pink",
  rating: 4.7,
  reviews: "1.5k",
  interactions: "4.2k conversas",
  status: "ausente"
}, {
  id: 5,
  name: "Dra. Juliana Matos",
  role: "Consultora Principal",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
  specialty: "Compliance",
  specialtyColor: "bg-pastel-yellow",
  rating: 4.8,
  reviews: "890",
  interactions: "2.3k conversas",
  status: "online"
}, {
  id: 6,
  name: "Prof. Ricardo Souza",
  role: "Especialista Sênior",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
  specialty: "Gestão de Riscos",
  specialtyColor: "bg-pastel-peach",
  rating: 4.9,
  reviews: "1.1k",
  interactions: "3.1k conversas",
  status: "online"
}, {
  id: 7,
  name: "Dra. Camila Rodrigues",
  role: "Analista Principal",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
  specialty: "Mercado de Capitais",
  specialtyColor: "bg-pastel-blue",
  rating: 4.8,
  reviews: "1.3k",
  interactions: "3.8k conversas",
  status: "online"
}, {
  id: 8,
  name: "Prof. Eduardo Martins",
  role: "Consultor Especialista",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
  specialty: "Meios de Pagamento",
  specialtyColor: "bg-pastel-green",
  rating: 4.7,
  reviews: "645",
  interactions: "1.6k conversas",
  status: "ausente"
}];
const recentConversations = [{
  id: 1,
  agent: "Prof. Ana Santos",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
  time: "Há 2 horas",
  type: "video",
  typeColor: "bg-pastel-purple/30",
  description: "Discussão sobre estratégias de hedge utilizando opções de índice...",
  duration: "23 min de conversa",
  credits: "230 créditos"
}, {
  id: 2,
  agent: "Dr. Roberto Lima",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
  time: "Ontem",
  type: "text",
  typeColor: "bg-pastel-green/30",
  description: "Análise do impacto das decisões do Fed na economia brasileira...",
  duration: "15 mensagens",
  credits: "30 créditos"
}, {
  id: 3,
  agent: "Profa. Marina Costa",
  avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
  time: "2 dias atrás",
  type: "audio",
  typeColor: "bg-pastel-blue/30",
  description: "Consultoria sobre implementação de práticas ESG em fundos...",
  duration: "18 min de conversa",
  credits: "90 créditos"
}];
const Aprendizado = () => {
  const [activeTab, setActiveTab] = useState<TabType>('todos');
  const [citationValue, setCitationValue] = useState(0);
  const [yearValue, setYearValue] = useState(2024);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("Todas especialidades");
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<{
    name: string;
    avatar: string;
  } | null>(null);
  const [showHistorico, setShowHistorico] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const navigate = useNavigate();
  const handleVideoCall = (agentName: string, agentAvatar: string) => {
    setSelectedAgent({
      name: agentName,
      avatar: agentAvatar
    });
    setVideoCallOpen(true);
  };
  const sectorData = [{
    name: 'Financeiro',
    value: 5.8
  }, {
    name: 'Tecnologia',
    value: 8.2
  }, {
    name: 'Energia',
    value: -2.1
  }, {
    name: 'Consumo',
    value: 3.4
  }, {
    name: 'Saúde',
    value: 6.7
  }, {
    name: 'Industrial',
    value: 1.9
  }];
  const volumeData = [{
    name: 'Seg',
    value: 18.5
  }, {
    name: 'Ter',
    value: 22.3
  }, {
    name: 'Qua',
    value: 19.8
  }, {
    name: 'Qui',
    value: 25.6
  }, {
    name: 'Sex',
    value: 28.4
  }, {
    name: 'Sáb',
    value: 15.2
  }, {
    name: 'Dom',
    value: 12.8
  }];
  const selicData = [{
    name: 'Fev',
    value: 13.75
  }, {
    name: 'Mar',
    value: 13.75
  }, {
    name: 'Abr',
    value: 13.25
  }, {
    name: 'Mai',
    value: 12.75
  }, {
    name: 'Jun',
    value: 12.25
  }, {
    name: 'Jul',
    value: 11.75
  }, {
    name: 'Ago',
    value: 11.25
  }, {
    name: 'Set',
    value: 10.75
  }, {
    name: 'Out',
    value: 10.75
  }, {
    name: 'Nov',
    value: 10.75
  }, {
    name: 'Dez',
    value: 10.75
  }, {
    name: 'Jan',
    value: 10.75
  }];
  const inflationData = [{
    name: 'Fev',
    value: 0.83
  }, {
    name: 'Mar',
    value: 0.71
  }, {
    name: 'Abr',
    value: 0.38
  }, {
    name: 'Mai',
    value: 0.46
  }, {
    name: 'Jun',
    value: 0.21
  }, {
    name: 'Jul',
    value: 0.38
  }, {
    name: 'Ago',
    value: -0.02
  }, {
    name: 'Set',
    value: 0.26
  }, {
    name: 'Out',
    value: 0.56
  }, {
    name: 'Nov',
    value: 0.62
  }, {
    name: 'Dez',
    value: 0.56
  }, {
    name: 'Jan',
    value: 0.42
  }];
  const pixData = [{
    name: '2020',
    value: 1.2
  }, {
    name: '2021',
    value: 15.4
  }, {
    name: '2022',
    value: 24.8
  }, {
    name: '2023',
    value: 32.6
  }, {
    name: '2024',
    value: 38.9
  }, {
    name: '2025',
    value: 42.3
  }];
  const creditCardData = [{
    name: '2018',
    value: 185
  }, {
    name: '2019',
    value: 198
  }, {
    name: '2020',
    value: 172
  }, {
    name: '2021',
    value: 215
  }, {
    name: '2022',
    value: 238
  }, {
    name: '2023',
    value: 256
  }, {
    name: '2024',
    value: 268
  }, {
    name: '2025',
    value: 275
  }];
  return <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Hub de Aprendizado</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Explore cursos, webinars, podcasts e aulas com avatares IA
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button onClick={() => navigate('/meus-conteudos')} className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Criar Conteúdo
                </button>
              </div>
            </div>
          </div>
        </header>

        <MenutabbarFix activeTab={activeTab} setActiveTab={tab => {
        setActiveTab(tab);
        setShowHistorico(false);
        setShowAnalytics(false);
      }} onHistoricoClick={() => {
        if (activeTab === 'documentos') {
          setShowHistorico(!showHistorico);
          setShowAnalytics(false);
        }
      }} onAnalyticsClick={() => {
        setShowAnalytics(!showAnalytics);
        setShowHistorico(false);
      }} showHistoricoButton={activeTab === 'documentos'} showAnalyticsButton={true} isHistoricoActive={showHistorico} isAnalyticsActive={showAnalytics} />

        {showAnalytics ? (
          activeTab === 'documentos' ? <NewspaperAnalytics /> :
          activeTab === 'podcasts' ? <PodcastsAnalytics /> :
          activeTab === 'cursos' ? <CursosAnalytics /> :
          activeTab === 'webinars' ? <WebinarsAnalyticsConsumption /> :
          activeTab === 'ebooks' ? <EbooksAnalyticsConsumption /> :
          activeTab === 'artigos' ? <ArtigosAnalyticsConsumption /> :
          activeTab === 'analises' ? <AnalisesAnalyticsConsumption /> :
          activeTab === 'relatorios' ? <RelatoriosAnalyticsConsumption /> :
          activeTab === 'estudos' ? <EstudosAnalyticsConsumption /> :
          activeTab === 'infograficos' ? <InfograficosAnalyticsConsumption /> :
          activeTab === 'whitepaper' ? <WhitepaperAnalyticsConsumption /> :
          activeTab === 'apresentacoes' ? <ApresentacoesAnalyticsConsumption /> :
          activeTab === 'live' ? <LiveAnalyticsConsumption /> :
          activeTab === 'entrevistas' ? <EntrevistasAnalyticsConsumption /> :
          activeTab === 'avatar-ia' ? <AvatarIAAnalyticsConsumption /> :
          <NewspaperAnalytics /> // Default fallback
        ) : activeTab !== 'documentos' ? <div className="flex-1 p-8 pb-32">
          {activeTab === 'todos' && <>

              <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="h-80 bg-pastel-blue overflow-hidden relative">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/deacdd849a-af7a052b4fb4b857dbcf.png" alt="illustration of a financial professional studying market analysis on multiple screens, modern office environment, pastel colors, outlined style" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white text-slate-800 text-sm font-medium rounded-full">
                    Destaque
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">
                    Curso Completo
                  </span>
                  <span className="text-xs text-slate-500">24 aulas • 18h de conteúdo</span>
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                  Mestrado em Análise de Mercado Financeiro
                </h2>
                <p className="text-slate-600 mb-4">
                  Domine técnicas avançadas de análise técnica e fundamentalista, com estudos de
                  caso reais e interação com avatares IA especializados.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span className="font-medium">4.9</span>
                      <span>(1.2k avaliações)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <i className="fas fa-users"></i>
                      <span>3.4k alunos</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-pastel-blue text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Começar Agora
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                    <i className="fas fa-trophy text-slate-600 text-xl"></i>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">Este mês</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">8</h3>
                <p className="text-sm text-slate-500 mb-3">Certificados Conquistados</p>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Análise Técnica</span>
                    <span className="text-slate-500 font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Gestão de Risco</span>
                    <span className="text-slate-500 font-bold">2</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Outros</span>
                    <span className="text-slate-500 font-bold">3</span>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                  Ver Certificados
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-slate-600 text-xl"></i>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">Últimos 30 dias</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">127h</h3>
                <p className="text-sm text-slate-500 mb-3">Tempo Total de Estudo</p>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Vídeo-aulas</span>
                    <span className="text-slate-500 font-bold">82h</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Podcasts</span>
                    <span className="text-slate-500 font-bold">28h</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Leitura</span>
                    <span className="text-slate-500 font-bold">17h</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <i className="fas fa-arrow-up text-green-600"></i>
                  <span>+12% esta semana</span>
                </div>
              </div>
            </section>
          </div>

          <section className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Continue de Onde Parou</h2>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                  Ver tudo
                </a>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 transition hover:shadow-md">
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={cursoAnaliseTecnicaIllustration} alt="illustration of dual monitors displaying complex financial stock market charts, pastel colors, outlined style" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-pastel-purple font-medium">Curso</p>
                        <h3 className="font-semibold text-slate-800 truncate">
                          Análise Técnica Avançada
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          Aula 12: Padrões de Candlestick
                        </p>
                      </div>
                      <button className="w-10 h-10 bg-pastel-blue text-slate-700 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-opacity-80 transition">
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-pastel-purple h-1.5 rounded-full" style={{
                          width: "50%"
                        }}></div>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">50%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 transition hover:shadow-md">
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8627363c2b-a72824be4bec8ab72346.png" alt="illustration of a professional podcast recording studio with a microphone, pastel colors, outlined style" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-pastel-green font-medium">Podcast</p>
                        <h3 className="font-semibold text-slate-800 truncate">
                          Estratégias de Diversificação
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          Episódio 03: Ativos Internacionais
                        </p>
                      </div>
                      <button className="w-10 h-10 bg-pastel-green text-slate-700 rounded-full flex-shrink-0 flex items-center justify-center hover:bg-opacity-80 transition">
                        <i className="fas fa-play"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div className="bg-pastel-green h-1.5 rounded-full" style={{
                          width: "71%"
                        }}></div>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">32:15 / 45:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Meu Progresso</h2>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Meta Semanal</span>
                      <span className="font-medium text-slate-800">12h / 15h</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pastel-blue h-2 rounded-full" style={{
                        width: "80%"
                      }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Cursos Concluídos</span>
                      <span className="font-medium text-slate-800">5</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pastel-purple h-2 rounded-full" style={{
                        width: "50%"
                      }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Certificados</span>
                      <span className="font-medium text-slate-800">2</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-pastel-green h-2 rounded-full" style={{
                        width: "30%"
                      }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-base font-semibold text-slate-800 mb-3">Conquistas</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                      <i className="fas fa-trophy text-slate-600 text-xl"></i>
                    </div>
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                      <i className="fas fa-medal text-slate-600 text-xl"></i>
                    </div>
                    <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                      <i className="fas fa-fire text-slate-600 text-xl"></i>
                    </div>
                    <button className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                      <i className="fas fa-plus text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Cursos em Destaque</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver todos os cursos
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-purple overflow-hidden relative">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f689e1e456-5ddba08158dda1d273b0.png" alt="illustration of cryptocurrency trading charts and digital assets, like bitcoin and ethereum coins, pastel colors, outlined style" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
                    Novo
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">
                      Curso
                    </span>
                    <span className="text-xs text-slate-500">16 aulas</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Criptomoedas e Blockchain
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    Entenda o funcionamento das criptomoedas, blockchain e o futuro das finanças
                    descentralizadas.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500 text-xs"></i>
                      <span className="font-medium">4.8</span>
                    </div>
                    <span className="text-sm text-slate-500">12h</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-pink overflow-hidden relative">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/efca16cd3f-1beea736c47851f428f1.png" alt="illustration of compliance documents and a gavel, representing legal framework for financial markets, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">
                      Curso
                    </span>
                    <span className="text-xs text-slate-500">22 aulas</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Compliance Financeiro Avançado
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    Aprenda sobre regulamentação, lavagem de dinheiro, e melhores práticas de
                    compliance no setor financeiro.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500 text-xs"></i>
                      <span className="font-medium">4.7</span>
                    </div>
                    <span className="text-sm text-slate-500">18h</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-green overflow-hidden relative">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/43ade140cc-54e09b01d95bfda73dc2.png" alt="illustration of a financial risk management dashboard with charts and a shield icon, pastel colors, outlined style" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
                    Popular
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">
                      Curso
                    </span>
                    <span className="text-xs text-slate-500">20 aulas</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Gestão de Riscos Financeiros
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    Técnicas e ferramentas para identificar, medir e gerenciar riscos em operações
                    financeiras complexas.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <i className="fas fa-star text-yellow-500 text-xs"></i>
                      <span className="font-medium">4.9</span>
                    </div>
                    <span className="text-sm text-slate-500">15h</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Webinars Ao Vivo e Gravados</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver agenda completa
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-pastel-yellow rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-600 font-medium">NOV</span>
                    <span className="text-2xl text-slate-800 font-bold">20</span>
                    <span className="text-xs text-slate-600">14:00</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        <i className="fas fa-circle text-red-500 text-[6px] mr-1"></i>Ao Vivo
                      </span>
                      <span className="text-xs text-slate-500">2h de duração</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Cenário Macroeconômico 2025: O que esperar?
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Análise detalhada das tendências econômicas globais e seus impactos nos
                      mercados financeiros.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-user-tie"></i>
                        <span>Dr. Carlos Mendes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fas fa-users"></i>
                        <span>842 inscritos</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Inscrever-se Agora
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-pastel-peach rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-600 font-medium">NOV</span>
                    <span className="text-2xl text-slate-800 font-bold">22</span>
                    <span className="text-xs text-slate-600">19:00</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                        Gravado
                      </span>
                      <span className="text-xs text-slate-500">1.5h de duração</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      IA no Trading: Estratégias Algorítmicas
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Como utilizar inteligência artificial para desenvolver estratégias de trading
                      mais eficientes.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <i className="fas fa-user-tie"></i>
                        <span>Ana Paula Costa</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="fas fa-play"></i>
                        <span>2.1k visualizações</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-pastel-peach text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Assistir Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Podcasts Recomendados</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver biblioteca completa
              </a>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div onClick={() => navigate('/podcast/mercados-em-foco')} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition cursor-pointer">
                <div className="h-40 bg-pastel-blue overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="illustration of a microphone with sound waves for a podcast cover, financial market theme, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">Mercados em Foco</h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #142 • 45 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-green overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="illustration of a brain with a lightbulb for an investment strategies podcast cover, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">
                    Investidor Inteligente
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #89 • 52 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-purple overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="illustration of a robot and gears for a fintech podcast cover, technology and finance blend, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">FinTech Brasil</h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #67 • 38 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-pink overflow-hidden">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/84f47f0351-d5b7ae096302eba637e5.png" alt="illustration of a globe with financial charts for an economic analysis podcast cover, pastel colors, outlined style" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-800 mb-2 line-clamp-2">Economia Global</h3>
                  <p className="text-xs text-slate-500 mb-3">Episódio #201 • 41 min</p>
                  <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2">
                    <i className="fas fa-play"></i>
                    Reproduzir
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Aulas com Avatar IA</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Explorar todos avatares
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Classical marble bust of a woman with intelligent features, representing a finance expert. Soft pastel blue background, studio lighting, detailed sculpture." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Prof. Ana Santos</h3>
                    <p className="text-sm text-slate-500">Especialista em Derivativos</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Aulas interativas sobre opções, futuros e estratégias de hedge com feedback em
                  tempo real.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                    <span className="font-medium">4.9</span>
                  </div>
                  <span className="text-xs text-slate-500">12 aulas disponíveis</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Aula
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Classical marble bust of a wise, bearded man, representing a macroeconomics expert. Soft pastel green background, studio lighting, detailed sculpture." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Dr. Roberto Lima</h3>
                    <p className="text-sm text-slate-500">Expert em Macroeconomia</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Discussões aprofundadas sobre política monetária, inflação e ciclos econômicos
                  globais.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                    <span className="font-medium">4.8</span>
                  </div>
                  <span className="text-xs text-slate-500">18 aulas disponíveis</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Aula
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="Classical marble bust of a woman with a serene and professional expression, representing an ESG consultant. Soft pastel purple background, studio lighting, detailed sculpture." className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Profa. Marina Costa</h3>
                    <p className="text-sm text-slate-500">Consultora de ESG</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Aprenda sobre investimentos sustentáveis, critérios ESG e finanças responsáveis à nível global.        
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                    <span className="font-medium">5.0</span>
                  </div>
                  <span className="text-xs text-slate-500">9 aulas disponíveis</span>
                </div>
                <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Aula
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Trilhas de Aprendizagem Populares
              </h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver todas
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-slate-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Analista de Mercado</h3>
                        <p className="text-sm text-slate-500">Análise técnica e fundamentalista</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                      Popular
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-layer-group"></i>
                      <span>12 Cursos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Ações
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Análise Técnica
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Indicadores
                    </span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-pastel-blue text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Trilha
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                        <i className="fas fa-coins text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Especialista em Cripto</h3>
                        <p className="text-sm text-slate-500">Criptomoedas, blockchain e DeFi</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      Novo
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-layer-group"></i>
                      <span>8 Cursos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Bitcoin
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      DeFi
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      NFTs
                    </span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-pastel-green text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Trilha
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <i className="fas fa-gavel text-slate-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Consultor de Compliance</h3>
                        <p className="text-sm text-slate-500">Regulamentação e conformidade</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-layer-group"></i>
                      <span>15 Cursos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span>4.7</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Regulação
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      AML
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                      Ética
                    </span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-pastel-purple text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                  Iniciar Trilha
                </button>
              </div>
            </div>
          </section>
            </>}

          {activeTab === 'podcasts' && <>
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Continue Ouvindo</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</a>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div onClick={() => navigate('/podcast/mercados-em-foco')} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-blue">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-1">Mercados em Foco</p>
                        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Análise Semanal: Volatilidade e Oportunidades</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">28 min restantes</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                          <div className="bg-pastel-blue h-1 rounded-full" style={{
                        width: '65%'
                      }}></div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-800">
                          <i className="fas fa-play-circle text-2xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-green">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-1">Investidor Inteligente</p>
                        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Diversificação de Carteira em 2024</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">15 min restantes</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                          <div className="bg-pastel-green h-1 rounded-full" style={{
                        width: '82%'
                      }}></div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-800">
                          <i className="fas fa-play-circle text-2xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-purple">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-1">FinTech Brasil</p>
                        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">Inovações em Meios de Pagamento</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">22 min restantes</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1 mb-2">
                          <div className="bg-pastel-purple h-1 rounded-full" style={{
                        width: '45%'
                      }}></div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-800">
                          <i className="fas fa-play-circle text-2xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Explorar por Categoria</h2>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-pastel-blue rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-chart-line text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Análise de Mercado</h3>
                    <p className="text-sm text-black font-bold">48 episódios</p>
                  </div>
                  <div className="bg-pastel-green rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-piggy-bank text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Investimentos</h3>
                    <p className="text-sm text-black font-bold">67 episódios</p>
                  </div>
                  <div className="bg-pastel-purple rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-landmark text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Regulação Bancária</h3>
                    <p className="text-sm text-black font-bold">32 episódios</p>
                  </div>
                  <div className="bg-pastel-pink rounded-xl p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <i className="fas fa-gavel text-2xl text-slate-700"></i>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">Compliance</h3>
                    <p className="text-sm text-black font-bold">29 episódios</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Podcasts em Destaque</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</a>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div onClick={() => navigate('/podcast/mercados-em-foco')} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition cursor-pointer">
                    <div className="h-48 bg-pastel-blue overflow-hidden relative">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="podcast cover" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Análise de Mercado</span>
                        <span className="text-xs text-slate-500">• Semanal</span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Mercados em Foco</h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">Análise profunda dos principais movimentos do mercado financeiro</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <i className="fas fa-star text-yellow-500 text-xs"></i>
                          <span className="font-medium">4.9</span>
                        </div>
                        <span className="text-sm text-slate-500">42 episódios</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Seguir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-green overflow-hidden relative">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="podcast cover" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Investimentos</span>
                        <span className="text-xs text-slate-500">• Bi-semanal</span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Investidor Inteligente</h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">Estratégias de investimento para construir riqueza de longo prazo</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <i className="fas fa-star text-yellow-500 text-xs"></i>
                          <span className="font-medium">4.8</span>
                        </div>
                        <span className="text-sm text-slate-500">38 episódios</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Seguir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-purple overflow-hidden relative">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="podcast cover" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">FinTech</span>
                        <span className="text-xs text-slate-500">• Semanal</span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">FinTech Brasil</h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">Inovações tecnológicas transformando o setor financeiro</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <i className="fas fa-star text-yellow-500 text-xs"></i>
                          <span className="font-medium">4.7</span>
                        </div>
                        <span className="text-sm text-slate-500">29 episódios</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Seguir
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Novos Episódios</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</a>
                </div>
                <div className="space-y-4">
                  <div onClick={() => navigate('/podcast/mercados-em-foco')} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-pink">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 mb-1">Mercados em Foco</p>
                            <h3 className="font-semibold text-slate-800 mb-1">Ep. 42: Tendências Econômicas para 2025</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-slate-500">45 min</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500">Há 2 dias</span>
                            </div>
                          </div>
                          <button className="text-pastel-blue hover:text-blue-600 ml-4">
                            <i className="fas fa-play-circle text-3xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-yellow">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 mb-1">Investidor Inteligente</p>
                            <h3 className="font-semibold text-slate-800 mb-1">Ep. 38: Fundos Imobiliários - Vale a Pena?</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-slate-500">52 min</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500">Há 3 dias</span>
                            </div>
                          </div>
                          <button className="text-pastel-green hover:text-green-600 ml-4">
                            <i className="fas fa-play-circle text-3xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-pastel-peach">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="podcast cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <p className="text-xs text-slate-500 mb-1">FinTech Brasil</p>
                            <h3 className="font-semibold text-slate-800 mb-1">Ep. 29: Open Finance e suas Oportunidades</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-slate-500">38 min</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500">Há 5 dias</span>
                            </div>
                          </div>
                          <button className="text-pastel-purple hover:text-purple-600 ml-4">
                            <i className="fas fa-play-circle text-3xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Trending Podcasts</h2>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-pastel-blue">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="podcast" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-slate-800 mb-1 text-sm">Economia Real</h3>
                    <p className="text-xs text-slate-500 mb-2">24 episódios</p>
                    <div className="flex items-center gap-1 text-xs">
                      <i className="fas fa-fire text-orange-500"></i>
                      <span className="text-slate-600">8.2k ouvintes</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-pastel-green">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cf142f2fa8-3e14b0bb9b96f766efe7.png" alt="podcast" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-slate-800 mb-1 text-sm">Bolsa de Valores</h3>
                    <p className="text-xs text-slate-500 mb-2">31 episódios</p>
                    <div className="flex items-center gap-1 text-xs">
                      <i className="fas fa-fire text-orange-500"></i>
                      <span className="text-slate-600">6.5k ouvintes</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-pastel-purple">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/270689fe5d-6ce96dde7db22c1b8808.png" alt="podcast" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-slate-800 mb-1 text-sm">Mundo Cripto</h3>
                    <p className="text-xs text-slate-500 mb-2">19 episódios</p>
                    <div className="flex items-center gap-1 text-xs">
                      <i className="fas fa-fire text-orange-500"></i>
                      <span className="text-slate-600">5.8k ouvintes</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-pastel-pink">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="podcast" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-slate-800 mb-1 text-sm">Finanças Pessoais</h3>
                    <p className="text-xs text-slate-500 mb-2">45 episódios</p>
                    <div className="flex items-center gap-1 text-xs">
                      <i className="fas fa-fire text-orange-500"></i>
                      <span className="text-slate-600">9.1k ouvintes</span>
                    </div>
                  </div>
                </div>
              </section>
            </>}

          {activeTab === 'cursos' && <div className="space-y-8">
              {/* Hero Section */}
              <section>
                <div className="bg-pastel-purple rounded-xl border border-border overflow-hidden">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="p-10 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 bg-background text-foreground text-sm font-medium rounded-full mb-4 w-fit">Lançamento</span>
                      <h2 className="text-3xl font-bold text-foreground mb-4">Domine o Mercado de Capitais em 2025</h2>
                      <p className="text-foreground mb-6">Curso completo com certificação internacional. Aprenda estratégias avançadas de investimento, análise de risco e gestão de portfólio com especialistas do mercado.</p>
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Video className="w-4 h-4" />
                          <span>42 aulas</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Clock className="w-4 h-4" />
                          <span>28h de conteúdo</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Award className="w-4 h-4" />
                          <span>Certificado</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/curso-detalhes')} className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-80 transition">
                          Inscrever-se Agora
                        </button>
                        <div className="flex flex-col">
                          <span className="text-xs text-foreground line-through">R$ 1.497,00</span>
                          <span className="text-2xl font-bold text-foreground">R$ 997,00</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-96 bg-background overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3929cb5102-dd5639ec44a1354faa46.png" alt="Financial professional analyzing data" />
                    </div>
                  </div>
                </div>
              </section>

              {/* User Statistics */}
              <section>
                <div className="grid grid-cols-5 gap-4">
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <CheckCircle className="text-foreground" size={24} />
                      </div>
                      <span className="text-xs text-green-600 font-medium">+2 este mês</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">12</p>
                    <p className="text-sm text-muted-foreground">Cursos Concluídos</p>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <PlayCircle className="text-foreground" size={24} />
                      </div>
                      <span className="text-xs text-blue-600 font-medium">Em progresso</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">5</p>
                    <p className="text-sm text-muted-foreground">Cursos em Andamento</p>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Clock className="text-foreground" size={24} />
                      </div>
                      <span className="text-xs text-purple-600 font-medium">342h total</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">127</p>
                    <p className="text-sm text-muted-foreground">Horas Assistidas</p>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                        <Award className="text-foreground" size={24} />
                      </div>
                      <span className="text-xs text-green-600 font-medium">Verificados</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">12</p>
                    <p className="text-sm text-muted-foreground">Certificados Obtidos</p>
                  </div>

                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                        <Trophy className="text-foreground" size={24} />
                      </div>
                      <span className="text-xs text-yellow-600 font-medium">Top 5%</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">8.9</p>
                    <p className="text-sm text-muted-foreground">Média de Desempenho</p>
                  </div>
                </div>

                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">Cursos por Segmento</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                            <ChartLine className="text-foreground" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Análise de Mercado</p>
                            <p className="text-xs text-muted-foreground">4 cursos concluídos</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="text-pastel-blue" size={16} />
                          <span className="text-sm font-medium text-foreground">4</span>
                        </div>
                      </div>
                      <div className="w-full bg-pastel-orange rounded-full h-2">
                        <div className="bg-pastel-blue h-2 rounded-full" style={{
                      width: '80%'
                    }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                            <Shield className="text-foreground" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Gestão de Risco</p>
                            <p className="text-xs text-muted-foreground">3 cursos concluídos</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="text-pastel-green" size={16} />
                          <span className="text-sm font-medium text-foreground">3</span>
                        </div>
                      </div>
                      <div className="w-full bg-pastel-orange rounded-full h-2">
                        <div className="bg-pastel-green h-2 rounded-full" style={{
                      width: '60%'
                    }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                            <Bitcoin className="text-foreground" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Criptomoedas</p>
                            <p className="text-xs text-muted-foreground">2 cursos concluídos</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="text-pastel-purple" size={16} />
                          <span className="text-sm font-medium text-foreground">2</span>
                        </div>
                      </div>
                      <div className="w-full bg-pastel-orange rounded-full h-2">
                        <div className="bg-pastel-purple h-2 rounded-full" style={{
                      width: '40%'
                    }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pastel-pink rounded-lg flex items-center justify-center">
                            <Gavel className="text-foreground" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Compliance</p>
                            <p className="text-xs text-muted-foreground">2 cursos concluídos</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="text-pastel-pink" size={16} />
                          <span className="text-sm font-medium text-foreground">2</span>
                        </div>
                      </div>
                      <div className="w-full bg-pastel-orange rounded-full h-2">
                        <div className="bg-pastel-pink h-2 rounded-full" style={{
                      width: '40%'
                    }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pastel-peach rounded-lg flex items-center justify-center">
                            <Repeat className="text-foreground" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Derivativos</p>
                            <p className="text-xs text-muted-foreground">1 curso concluído</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="text-pastel-peach" size={16} />
                          <span className="text-sm font-medium text-foreground">1</span>
                        </div>
                      </div>
                      <div className="w-full bg-pastel-orange rounded-full h-2">
                        <div className="bg-pastel-peach h-2 rounded-full" style={{
                      width: '20%'
                    }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Filter Section */}
              <section>
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>Todas as categorias</option>
                        <option>Análise Técnica</option>
                        <option>Derivativos</option>
                        <option>Compliance</option>
                        <option>Criptomoedas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nível</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>Todos os níveis</option>
                        <option>Iniciante</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Duração</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>Qualquer duração</option>
                        <option>Até 10h</option>
                        <option>10h - 20h</option>
                        <option>Mais de 20h</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Preço</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>Todos os preços</option>
                        <option>Gratuito</option>
                        <option>Até R$ 500</option>
                        <option>R$ 500 - R$ 1000</option>
                        <option>Acima de R$ 1000</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Ordenar por</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                        <option>Mais populares</option>
                        <option>Mais recentes</option>
                        <option>Melhor avaliados</option>
                        <option>Menor preço</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Courses - Primeira linha com 3 cursos */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Cursos em Destaque</h2>
                  <span className="text-sm text-muted-foreground">124 cursos disponíveis</span>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <div className="h-48 bg-pastel-blue overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f689e1e456-5ddba08158dda1d273b0.png" alt="Cryptocurrency trading" />
                      </div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Bestseller</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-pastel-orange transition">
                          <Heart className="text-muted-foreground" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-blue text-foreground text-xs rounded-full">Criptomoedas</span>
                        <span className="text-xs text-muted-foreground">Intermediário</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">Criptomoedas e Blockchain: Do Básico ao Avançado</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Domine o universo das criptomoedas, DeFi e NFTs com estratégias práticas de investimento.</p>
                      <div className="flex items-center gap-2 mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="instructor" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-muted-foreground">Prof. Carlos Mendes</span>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={12} />
                            <span className="font-medium">4.8</span>
                            <span className="text-muted-foreground">(2.4k)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video size={12} />
                            <span>32 aulas</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">R$ 897,00</span>
                          <span className="text-xl font-bold text-foreground">R$ 597,00</span>
                        </div>
                        <button className="px-4 py-2 bg-pastel-blue text-foreground rounded-lg font-medium hover:opacity-80 transition text-sm">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <div className="h-48 bg-pastel-green overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/43ade140cc-54e09b01d95bfda73dc2.png" alt="Risk management" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-pastel-orange transition">
                          <Heart className="text-muted-foreground" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-green text-foreground text-xs rounded-full">Gestão de Risco</span>
                        <span className="text-xs text-muted-foreground">Avançado</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">Gestão de Riscos Financeiros Avançada</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Aprenda técnicas sofisticadas de identificação, mensuração e mitigação de riscos financeiros.</p>
                      <div className="flex items-center gap-2 mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="instructor" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-muted-foreground">Dra. Ana Santos</span>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={12} />
                            <span className="font-medium">4.9</span>
                            <span className="text-muted-foreground">(1.8k)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video size={12} />
                            <span>28 aulas</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">R$ 1.297,00</span>
                          <span className="text-xl font-bold text-foreground">R$ 897,00</span>
                        </div>
                        <button className="px-4 py-2 bg-pastel-green text-foreground rounded-lg font-medium hover:opacity-80 transition text-sm">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <div className="h-48 bg-pastel-purple overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3929cb5102-534943598219603fe6bd.png" alt="Technical analysis" />
                      </div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Novo</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-pastel-orange transition">
                          <Heart className="text-muted-foreground" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-purple text-foreground text-xs rounded-full">Análise Técnica</span>
                        <span className="text-xs text-muted-foreground">Intermediário</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">Análise Técnica Profissional: Padrões e Estratégias</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Domine padrões gráficos, indicadores técnicos e desenvolva estratégias vencedoras de trading.</p>
                      <div className="flex items-center gap-2 mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="instructor" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-muted-foreground">Prof. Roberto Lima</span>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={12} />
                            <span className="font-medium">4.7</span>
                            <span className="text-muted-foreground">(3.1k)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video size={12} />
                            <span>38 aulas</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">R$ 797,00</span>
                          <span className="text-xl font-bold text-foreground">R$ 497,00</span>
                        </div>
                        <button className="px-4 py-2 bg-pastel-purple text-foreground rounded-lg font-medium hover:opacity-80 transition text-sm">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segunda linha com 3 cursos */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <div className="h-48 bg-pastel-pink overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/efca16cd3f-1beea736c47851f428f1.png" alt="Compliance" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-pastel-orange transition">
                          <Heart className="text-muted-foreground" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-pink text-foreground text-xs rounded-full">Compliance</span>
                        <span className="text-xs text-muted-foreground">Avançado</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">Compliance Financeiro: Regulamentação e Prática</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Entenda a regulamentação do mercado financeiro, prevenção à lavagem de dinheiro e ética profissional.</p>
                      <div className="flex items-center gap-2 mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="instructor" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-muted-foreground">Dra. Marina Costa</span>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={12} />
                            <span className="font-medium">4.8</span>
                            <span className="text-muted-foreground">(1.5k)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video size={12} />
                            <span>24 aulas</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">R$ 997,00</span>
                          <span className="text-xl font-bold text-foreground">R$ 697,00</span>
                        </div>
                        <button className="px-4 py-2 bg-pastel-pink text-foreground rounded-lg font-medium hover:opacity-80 transition text-sm">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <div className="h-48 bg-pastel-yellow overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8627363c2b-a72824be4bec8ab72346.png" alt="Investments" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-pastel-orange transition">
                          <Heart className="text-muted-foreground" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-yellow text-foreground text-xs rounded-full">Investimentos</span>
                        <span className="text-xs text-muted-foreground">Iniciante</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">Fundamentos de Investimentos para Iniciantes</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Comece sua jornada no mercado financeiro com bases sólidas em renda fixa, variável e fundos.</p>
                      <div className="flex items-center gap-2 mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="instructor" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-muted-foreground">Prof. Fernando Silva</span>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={12} />
                            <span className="font-medium">4.9</span>
                            <span className="text-muted-foreground">(4.2k)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video size={12} />
                            <span>20 aulas</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">R$ 497,00</span>
                          <span className="text-xl font-bold text-foreground">R$ 297,00</span>
                        </div>
                        <button className="px-4 py-2 bg-pastel-yellow text-foreground rounded-lg font-medium hover:opacity-80 transition text-sm">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <div className="h-48 bg-pastel-peach overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5db95ca3fc-e18dc1c9625044bac903.png" alt="Derivatives" />
                      </div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Bestseller</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-pastel-orange transition">
                          <Heart className="text-muted-foreground" size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-pastel-peach text-foreground text-xs rounded-full">Derivativos</span>
                        <span className="text-xs text-muted-foreground">Avançado</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">Derivativos: Opções, Futuros e Estratégias</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Domine o mercado de derivativos com estratégias avançadas de hedge e especulação.</p>
                      <div className="flex items-center gap-2 mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="instructor" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-muted-foreground">Prof. Paulo Andrade</span>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={12} />
                            <span className="font-medium">5.0</span>
                            <span className="text-muted-foreground">(987)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video size={12} />
                            <span>36 aulas</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">R$ 1.497,00</span>
                          <span className="text-xl font-bold text-foreground">R$ 997,00</span>
                        </div>
                        <button className="px-4 py-2 bg-pastel-peach text-foreground rounded-lg font-medium hover:opacity-80 transition text-sm">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Categories Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Explorar por Categoria</h2>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center mb-4">
                      <ChartLine className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Análise de Mercado</h3>
                    <p className="text-sm text-muted-foreground">24 cursos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mb-4">
                      <Shield className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Gestão de Risco</h3>
                    <p className="text-sm text-muted-foreground">18 cursos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center mb-4">
                      <Bitcoin className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Criptomoedas</h3>
                    <p className="text-sm text-muted-foreground">12 cursos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center mb-4">
                      <Gavel className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Compliance</h3>
                    <p className="text-sm text-muted-foreground">16 cursos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center mb-4">
                      <PieChart className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Investimentos</h3>
                    <p className="text-sm text-muted-foreground">32 cursos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center mb-4">
                      <Repeat className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Derivativos</h3>
                    <p className="text-sm text-muted-foreground">14 cursos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center mb-4">
                      <Globe className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Macroeconomia</h3>
                    <p className="text-sm text-muted-foreground">10 cursos</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mb-4">
                      <Leaf className="text-foreground" size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">ESG & Sustentabilidade</h3>
                    <p className="text-sm text-muted-foreground">8 cursos</p>
                  </div>
                </div>
              </section>

              {/* Instructors Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Instrutores em Destaque</h2>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground font-medium">Ver todos</a>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="instructor" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">Prof. Carlos Mendes</h3>
                    <p className="text-sm text-muted-foreground mb-4">Especialista em Criptomoedas</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={12} />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>12.4k</span>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-blue text-foreground rounded-lg text-sm font-medium hover:opacity-80 transition">
                      Ver Perfil
                    </button>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="instructor" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">Dra. Ana Santos</h3>
                    <p className="text-sm text-muted-foreground mb-4">Expert em Gestão de Risco</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={12} />
                        <span>5.0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>8.7k</span>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-green text-foreground rounded-lg text-sm font-medium hover:opacity-80 transition">
                      Ver Perfil
                    </button>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="instructor" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">Prof. Roberto Lima</h3>
                    <p className="text-sm text-muted-foreground mb-4">Especialista em Análise Técnica</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={12} />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>15.2k</span>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-purple text-foreground rounded-lg text-sm font-medium hover:opacity-80 transition">
                      Ver Perfil
                    </button>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="instructor" className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">Dra. Marina Costa</h3>
                    <p className="text-sm text-muted-foreground mb-4">Consultora de ESG</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={12} />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>6.3k</span>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-pink text-foreground rounded-lg text-sm font-medium hover:opacity-80 transition">
                      Ver Perfil
                    </button>
                  </div>
                </div>
              </section>

              {/* Testimonials Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">O Que Dizem Nossos Alunos</h2>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-500 fill-yellow-500" size={14} />)}
                    </div>
                    <p className="text-muted-foreground mb-4">O curso de Análise Técnica mudou completamente minha forma de operar no mercado. Conteúdo excepcional e professor muito didático.</p>
                    <div className="flex items-center gap-3">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="student" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Lucas Ferreira</p>
                        <p className="text-xs text-muted-foreground">Trader Profissional</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-500 fill-yellow-500" size={14} />)}
                    </div>
                    <p className="text-muted-foreground mb-4">Melhor investimento que fiz na minha carreira. Os cursos são completos e com certificação reconhecida pelo mercado.</p>
                    <div className="flex items-center gap-3">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="student" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Juliana Oliveira</p>
                        <p className="text-xs text-muted-foreground">Analista de Investimentos</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-500 fill-yellow-500" size={14} />)}
                    </div>
                    <p className="text-muted-foreground mb-4">Plataforma excelente com conteúdo atualizado. As aulas com avatares IA são inovadoras e facilitam muito o aprendizado.</p>
                    <div className="flex items-center gap-3">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="student" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Rafael Santos</p>
                        <p className="text-xs text-muted-foreground">Gestor de Fundos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section>
                <div className="bg-gradient-to-r from-pastel-blue to-pastel-purple rounded-xl p-12 text-center">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Pronto para Transformar sua Carreira?</h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Junte-se a mais de 50 mil profissionais que já transformaram suas carreiras com nossos cursos. Certificação reconhecida pelo mercado e acesso vitalício.</p>
                  <div className="flex items-center justify-center gap-4">
                    <button className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:opacity-90 transition shadow-lg">
                      Explorar Todos os Cursos
                    </button>
                    <button className="px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition">
                      Falar com Consultor
                    </button>
                  </div>
                </div>
              </section>
            </div>}

          {activeTab === 'avatar-ia' && <>
            <section className="mb-8">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-pastel-yellow rounded-xl flex items-center justify-center">
                      <Coins className="text-slate-700" size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Créditos Disponíveis</h3>
                      <p className="text-sm text-slate-500">Renova em 15 dias</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-slate-800">2.450</span>
                      <span className="text-lg text-slate-500">/ 5.000</span>
                    </div>
                    <div className="w-64 bg-slate-200 rounded-full h-2 mt-3">
                      <div className="bg-pastel-yellow h-2 rounded-full" style={{
                      width: "49%"
                    }}></div>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-pastel-yellow text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition">
                    <Plus className="w-4 h-4 inline mr-2" />
                    Adicionar Créditos
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                      <Mic className="text-slate-700" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Voz</p>
                      <p className="text-xs text-slate-500">5 créditos/min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center">
                      <MessageCircle className="text-slate-700" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Texto</p>
                      <p className="text-xs text-slate-500">2 créditos/msg</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center">
                      <Video className="text-slate-700" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Vídeo</p>
                      <p className="text-xs text-slate-500">10 créditos/min</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">Agentes Disponíveis</h2>
                    <p className="text-sm text-slate-500 mt-1">8 agentes especializados</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Input type="text" placeholder="Buscar agente..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 w-64" />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    </div>
                    <select value={filterSpecialty} onChange={e => setFilterSpecialty(e.target.value)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-blue bg-white">
                      <option>Todas especialidades</option>
                      <option>Análise de Mercado</option>
                      <option>Compliance</option>
                      <option>Derivativos</option>
                      <option>Macroeconomia</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Agente
                        </TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Especialidade
                        </TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Avaliação
                        </TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Interações
                        </TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Status
                        </TableHead>
                        <TableHead className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Ações
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agents.map(agent => <TableRow key={agent.id} className="hover:bg-slate-50 transition">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-800">{agent.name}</p>
                                <p className="text-xs text-slate-500">{agent.role}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${agent.specialtyColor} text-slate-700 border-0`}>
                              {agent.specialty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-500 fill-yellow-500" size={14} />
                              <span className="text-sm font-medium text-slate-800">{agent.rating}</span>
                              <span className="text-xs text-slate-500">({agent.reviews})</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-slate-600">{agent.interactions}</span>
                          </TableCell>
                          <TableCell>
                            {agent.status === "online" ? <Badge className="bg-green-100 text-green-700 border-0 font-medium">
                                <Circle className="text-green-500 fill-green-500 mr-1" size={6} />
                                Online
                              </Badge> : <Badge className="bg-slate-100 text-slate-700 border-0 font-medium">
                                <Circle className="text-slate-400 fill-slate-400 mr-1" size={6} />
                                Ausente
                              </Badge>}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleVideoCall(agent.name, agent.avatar)} className="p-2 bg-pastel-purple hover:bg-opacity-80 text-slate-700 rounded-lg transition" title="Conversar por Vídeo">
                                <Video size={16} />
                              </button>
                              <button className="p-2 bg-pastel-blue hover:bg-opacity-80 text-slate-700 rounded-lg transition" title="Conversar por Voz">
                                <Mic size={16} />
                              </button>
                              <button className="p-2 bg-pastel-green hover:bg-opacity-80 text-slate-700 rounded-lg transition" title="Conversar por Texto">
                                <MessageCircle size={16} />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </div>

                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-sm text-slate-600">Mostrando 8 de 8 agentes</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      <ChevronLeft size={16} className="inline mr-1" />
                      Anterior
                    </button>
                    <button className="px-3 py-2 bg-pastel-blue text-slate-800 rounded-lg text-sm font-medium">
                      1
                    </button>
                    <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      Próximo
                      <ChevronRight size={16} className="inline ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Conversas Recentes</h2>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                  Ver histórico completo
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {recentConversations.map(conversation => <div key={conversation.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={conversation.avatar} alt={conversation.agent} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{conversation.agent}</p>
                          <p className="text-xs text-slate-500">{conversation.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 ${conversation.typeColor} rounded-full`}>
                        {conversation.type === "video" && <Video className="text-slate-700" size={14} />}
                        {conversation.type === "text" && <MessageCircle className="text-slate-700" size={14} />}
                        {conversation.type === "audio" && <Mic className="text-slate-700" size={14} />}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {conversation.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{conversation.duration}</span>
                      <span>{conversation.credits}</span>
                    </div>
                  </div>)}
              </div>
            </section>
          </>}

          {activeTab === 'ebooks' && <>
              {/* Stats Overview */}
              <section className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                      <BookOpen className="text-foreground" size={24} />
                    </div>
                    <span className="text-xs text-green-600 font-medium">+3 este mês</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">24</p>
                  <p className="text-sm text-muted-foreground">eBooks Comprados</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                      <BookOpenCheck className="text-foreground" size={24} />
                    </div>
                    <span className="text-xs text-blue-600 font-medium">Em progresso</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">5</p>
                  <p className="text-sm text-muted-foreground">Lendo Agora</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-foreground" size={24} />
                    </div>
                    <span className="text-xs text-purple-600 font-medium">100%</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">12</p>
                  <p className="text-sm text-muted-foreground">Concluídos</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                      <Clock className="text-foreground" size={24} />
                    </div>
                    <span className="text-xs text-orange-600 font-medium">Média</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">8h</p>
                  <p className="text-sm text-muted-foreground">Tempo de Leitura</p>
                </div>
              </section>

              {/* Currently Reading */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Lendo Agora</h2>
                    <p className="text-sm text-muted-foreground mt-1">Continue de onde parou</p>
                  </div>
                  <button className="text-sm text-muted-foreground hover:text-foreground font-medium">Ver Todos</button>
                </div>

                <div className="grid grid-cols-5 gap-6">
                  {/* Reading Card 1 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-purple">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/de72874cc5-bcb1610580017fd3cfe5.png" alt="Pastel drawing of stock market analysis book cover" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-2.5">
                        <div className="h-full bg-emerald-600 relative" style={{
                      width: '68%'
                    }}>
                          <span className="absolute -top-8 right-0 text-xs font-semibold text-white bg-slate-800 px-2 py-1 rounded shadow-lg">68%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-sm">Guia Completo de Análise de Ações</h3>
                      <p className="text-xs text-muted-foreground mb-3">Carlos Mendes</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">68% concluído</span>
                        <button className="text-pastel-blue hover:text-blue-600 font-medium">Continuar</button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Card 2 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-pink">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/de72874cc5-2efb8363a6121e6b0540.png" alt="Pastel drawing of fixed income investment book" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-2.5">
                        <div className="h-full bg-emerald-600 relative" style={{
                      width: '42%'
                    }}>
                          <span className="absolute -top-8 right-0 text-xs font-semibold text-white bg-slate-800 px-2 py-1 rounded shadow-lg">42%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-sm">Renda Fixa Estratégica para 2025</h3>
                      <p className="text-xs text-muted-foreground mb-3">Ricardo Alves</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">42% concluído</span>
                        <button className="text-pastel-blue hover:text-blue-600 font-medium">Continuar</button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Card 3 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-blue">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/de72874cc5-43745d045cd52ba18a30.png" alt="Pastel drawing of financial compliance book cover" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-2.5">
                        <div className="h-full bg-emerald-600 relative" style={{
                      width: '85%'
                    }}>
                          <span className="absolute -top-8 right-0 text-xs font-semibold text-white bg-slate-800 px-2 py-1 rounded shadow-lg">85%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-sm">Compliance no Mercado Financeiro</h3>
                      <p className="text-xs text-muted-foreground mb-3">Mariana Santos</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">85% concluído</span>
                        <button className="text-pastel-blue hover:text-blue-600 font-medium">Continuar</button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Card 4 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-peach">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e7b331f4e1-9ee7cde295eba8fd33f7.png" alt="Pastel drawing of derivatives book" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-2.5">
                        <div className="h-full bg-emerald-700 relative" style={{
                      width: '23%'
                    }}>
                          <span className="absolute -top-8 right-0 text-xs font-semibold text-white bg-slate-800 px-2 py-1 rounded shadow-lg">23%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-sm">Mercado de Derivativos Brasileiro</h3>
                      <p className="text-xs text-muted-foreground mb-3">Eduardo Costa</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">23% concluído</span>
                        <button className="text-pastel-blue hover:text-blue-600 font-medium">Continuar</button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Card 5 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-pink">
                        <img className="w-full h-full object-cover" src={ebookRiskManagementPink} alt="Pastel drawing of risk management book" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-100 h-2.5">
                        <div className="h-full bg-emerald-700 relative" style={{
                      width: '56%'
                    }}>
                          <span className="absolute -top-8 right-0 text-xs font-semibold text-white bg-slate-800 px-2 py-1 rounded shadow-lg">56%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-sm">Gestão de Risco em Investimentos</h3>
                      <p className="text-xs text-muted-foreground mb-3">Patricia Lima</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">56% concluído</span>
                        <button className="text-pastel-blue hover:text-blue-600 font-medium">Continuar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Purchased eBooks */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Meus eBooks</h2>
                    <p className="text-sm text-muted-foreground mt-1">Todos os seus materiais adquiridos</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select className="px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                      <option>Todos</option>
                      <option>Não Iniciados</option>
                      <option>Em Progresso</option>
                      <option>Concluídos</option>
                    </select>
                    <button className="text-sm text-muted-foreground hover:text-foreground font-medium">Ver Todos</button>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  {/* Purchased Card 1 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-purple">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/042d318ea8-038a8379a9999c4c8508.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Guia Completo de Análise de Ações</h3>
                      <p className="text-xs text-muted-foreground">Carlos Mendes</p>
                    </div>
                  </div>

                  {/* Purchased Card 2 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-pink">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8cc96e1dc0-98edd1ecb348d831557d.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Renda Fixa Estratégica para 2025</h3>
                      <p className="text-xs text-muted-foreground">Ricardo Alves</p>
                    </div>
                  </div>

                  {/* Purchased Card 3 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-blue">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2d8e805716-5c852de99d3d9a89bcd0.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Compliance no Mercado Financeiro</h3>
                      <p className="text-xs text-muted-foreground">Mariana Santos</p>
                    </div>
                  </div>

                  {/* Purchased Card 4 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-peach">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/85e861ac01-1fed7f0d2f29155ea174.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Mercado de Derivativos Brasileiro</h3>
                      <p className="text-xs text-muted-foreground">Eduardo Costa</p>
                    </div>
                  </div>

                  {/* Purchased Card 5 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-yellow">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/18bc726af4-46206345b92f949ccdc7.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Gestão de Risco em Investimentos</h3>
                      <p className="text-xs text-muted-foreground">Patricia Lima</p>
                    </div>
                  </div>

                  {/* Purchased Card 6 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-green">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f7f68a06ae-1340dfd72f9be05837d7.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Gestão de Carteiras de Investimento</h3>
                      <p className="text-xs text-muted-foreground">Paulo Rodrigues</p>
                    </div>
                  </div>

                  {/* Purchased Card 7 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-purple">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2d8e805716-5b1f4777a9f32d253a79.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Valuation de Empresas na Prática</h3>
                      <p className="text-xs text-muted-foreground">Roberto Campos</p>
                    </div>
                  </div>

                  {/* Purchased Card 8 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-blue">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/455b4fafc0-6655a5505b3ec5a272ed.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Macroeconomia para Investidores</h3>
                      <p className="text-xs text-muted-foreground">Juliana Martins</p>
                    </div>
                  </div>

                  {/* Purchased Card 9 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-pink">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f7f68a06ae-fea791a8ec413e4c2bca.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Planejamento Financeiro Pessoal</h3>
                      <p className="text-xs text-muted-foreground">Fernanda Souza</p>
                    </div>
                  </div>

                  {/* Purchased Card 10 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-peach">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8cc96e1dc0-506c79d177bf7c1a2cfc.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Finanças Comportamentais</h3>
                      <p className="text-xs text-muted-foreground">André Silva</p>
                    </div>
                  </div>

                  {/* Purchased Card 11 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-yellow">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/30e5166efa-14fdc8bed447c1e0521c.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Fundos de Investimento no Brasil</h3>
                      <p className="text-xs text-muted-foreground">Lucas Ferreira</p>
                    </div>
                  </div>

                  {/* Purchased Card 12 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition group">
                    <div className="relative">
                      <div className="h-48 overflow-hidden bg-pastel-green">
                        <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2d8e805716-5a628280367d13a7b79d.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 transition">
                        <i className="fas fa-ellipsis-v text-xs"></i>
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-foreground text-xs line-clamp-2 mb-1">Mercado de Capitais Brasileiro</h3>
                      <p className="text-xs text-muted-foreground">Beatriz Oliveira</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recommendations */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Recomendados Para Você</h2>
                    <p className="text-sm text-muted-foreground mt-1">Baseado no seu histórico de leitura</p>
                  </div>
                  <button className="text-sm text-muted-foreground hover:text-foreground font-medium">Ver Mais</button>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {/* Recommendation Card 1 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-purple">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/15f8c44c25-dc04946d7359a29b2971.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                        <Heart className="w-4 h-4" />
                      </button>
                      <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-green text-foreground text-xs font-medium rounded-full">eBook</span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-white drop-shadow">4.9</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-6 h-6 rounded-full object-cover" alt="Author" />
                        <span className="text-xs text-muted-foreground">Thiago Barbosa</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 h-12">Estratégias com Opções: Do Básico ao Avançado</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">Domine as principais estratégias de opções utilizadas por traders profissionais</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-foreground">R$ 149</span>
                        </div>
                        <button onClick={() => navigate('/ebook/1')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                          Ver Mais
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Card 2 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-blue">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5376158848-00fdf895539585de4b28.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                        <Heart className="w-4 h-4" />
                      </button>
                      <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-green text-foreground text-xs font-medium rounded-full">eBook</span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-white drop-shadow">4.7</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" className="w-6 h-6 rounded-full object-cover" alt="Author" />
                        <span className="text-xs text-muted-foreground">Camila Ribeiro</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 h-12">Análise Quantitativa para Investimentos</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">Aprenda a utilizar modelos matemáticos na tomada de decisão de investimentos</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-foreground">R$ 189</span>
                        </div>
                        <button onClick={() => navigate('/ebook/2')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                          Ver Mais
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Card 3 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-pink">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/30e5166efa-02d068c099ac82da15a0.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                        <Heart className="w-4 h-4" />
                      </button>
                      <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-green text-foreground text-xs font-medium rounded-full">eBook</span>
                      <span className="absolute top-3 right-14 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">-25%</span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-white drop-shadow">5.0</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-6 h-6 rounded-full object-cover" alt="Author" />
                        <span className="text-xs text-muted-foreground">Gabriel Mendes</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 h-12">Investindo em Mercados Internacionais</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">Diversifique sua carteira com investimentos no exterior de forma segura</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-foreground">R$ 112</span>
                          <span className="text-slate-400 line-through ml-2 text-sm">R$ 149</span>
                        </div>
                        <button onClick={() => navigate('/ebook/3')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                          Ver Mais
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Card 4 */}
                  <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition group">
                    <div className="relative">
                      <div className="h-56 overflow-hidden bg-pastel-peach">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bef6bed79a-85b9c79bd0b0a53a216f.png" alt="Book cover" />
                      </div>
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition">
                        <Heart className="w-4 h-4" />
                      </button>
                      <span className="absolute top-3 left-3 px-3 py-1 bg-pastel-green text-foreground text-xs font-medium rounded-full">eBook</span>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-white drop-shadow">4.8</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-6 h-6 rounded-full object-cover" alt="Author" />
                        <span className="text-xs text-muted-foreground">Isabela Carvalho</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 h-12">Investimentos ESG: Futuro Sustentável</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">Como incorporar critérios ambientais e sociais em suas decisões de investimento</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-foreground">R$ 99</span>
                        </div>
                        <button onClick={() => navigate('/ebook/4')} className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg font-medium hover:bg-slate-700 transition">
                          Ver Mais
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Explore More Section */}
              <section className="bg-gradient-to-br from-pastel-blue to-pastel-purple rounded-xl p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Explore Mais Conteúdos</h2>
                    <p className="text-muted-foreground mb-6">Descubra milhares de eBooks e cursos no marketplace</p>
                    <button className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition">
                      Ir para Marketplace
                    </button>
                  </div>
                  <div className="w-80 h-48 flex items-center justify-center">
                    <img className="w-full h-full object-contain" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f7f68a06ae-13a5d5f0a2baf2d0c91a.png" alt="Person reading digital books" />
                  </div>
                </div>
              </section>
            </>}

          {activeTab === 'webinars' && <>
              {/* Live Webinars Section */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-800">Ao Vivo Agora</h2>
                    <span className="px-3 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full font-medium flex items-center gap-1.5">
                      <i className="fas fa-circle text-slate-700 text-[6px]"></i>
                      2 webinars ao vivo
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border-2 border-pastel-purple overflow-hidden hover:shadow-xl transition flex flex-col">
                    <div className="h-64 bg-pastel-yellow overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/195dbdee1c-92ffceb5d806533c0810.png" alt="Webinar ao vivo" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                          <i className="fas fa-circle text-[6px] animate-pulse"></i>
                          AO VIVO
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1.5">
                          <i className="fas fa-users text-xs"></i>
                          1.2k assistindo
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full">Análise de Mercado</span>
                        <span className="text-xs text-slate-500">• Começou há 15 min</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Análise Semanal do Mercado: Oportunidades e Riscos</h3>
                      <p className="text-sm text-slate-600 mb-4">Discussão em tempo real sobre os principais movimentos do mercado financeiro nesta semana com análise de ações, índices e commodities.</p>
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Palestrante" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-slate-800">Dr. Carlos Mendes</p>
                          <p className="text-xs text-slate-500">Analista Sênior de Mercado</p>
                        </div>
                      </div>
                      <button className="w-full px-6 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto">
                        <i className="fas fa-play"></i>
                        Assistir Agora
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-pastel-purple overflow-hidden hover:shadow-xl transition flex flex-col">
                    <div className="h-64 bg-pastel-green overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/27ff2e3c2c-afb908f73c455f98a798.png" alt="Webinar ao vivo" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                          <i className="fas fa-circle text-[6px] animate-pulse"></i>
                          AO VIVO
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1.5">
                          <i className="fas fa-users text-xs"></i>
                          842 assistindo
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Criptomoedas</span>
                        <span className="text-xs text-slate-500">• Começou há 32 min</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Bitcoin e Altcoins: Tendências para 2025</h3>
                      <p className="text-sm text-slate-600 mb-4">Análise técnica e fundamentalista do mercado cripto com foco em Bitcoin, Ethereum e principais altcoins promissoras.</p>
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Palestrante" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-slate-800">Ana Paula Costa</p>
                          <p className="text-xs text-slate-500">Especialista em Blockchain</p>
                        </div>
                      </div>
                      <button className="w-full px-6 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto">
                        <i className="fas fa-play"></i>
                        Assistir Agora
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Próximos Webinars */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Próximos Webinars</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver calendário completo</a>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-blue overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png" alt="Webinar" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-pastel-blue rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs text-slate-600 font-medium">NOV</span>
                          <span className="text-xl text-slate-800 font-bold">20</span>
                          <span className="text-xs text-slate-600">14:00</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Macroeconomia</span>
                          <p className="text-xs text-slate-500 mt-1">2h de duração</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Cenário Macroeconômico 2025</h3>
                      <p className="text-sm text-slate-600 mb-4">O que esperar dos mercados globais</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <i className="fas fa-user-tie"></i>
                        <span>Dr. Roberto Lima</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Inscrever-se
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-purple overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d51e1f0edd-ac69efab786c3927349b.png" alt="Webinar" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-pastel-purple rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs text-slate-600 font-medium">NOV</span>
                          <span className="text-xl text-slate-800 font-bold">22</span>
                          <span className="text-xs text-slate-600">19:00</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">Tecnologia</span>
                          <p className="text-xs text-slate-500 mt-1">1.5h de duração</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">IA no Trading Algorítmico</h3>
                      <p className="text-sm text-slate-600 mb-4">Estratégias automatizadas de sucesso</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <i className="fas fa-user-tie"></i>
                        <span>Prof. Ana Santos</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Inscrever-se
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-pink overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0da9896c42-46e32d6de31b8ba9ed03.png" alt="Webinar" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-pastel-pink rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-xs text-slate-600 font-medium">NOV</span>
                          <span className="text-xl text-slate-800 font-bold">25</span>
                          <span className="text-xs text-slate-600">10:00</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">ESG</span>
                          <p className="text-xs text-slate-500 mt-1">2h de duração</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Investimentos Sustentáveis</h3>
                      <p className="text-sm text-slate-600 mb-4">ESG e o futuro das finanças</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <i className="fas fa-user-tie"></i>
                        <span>Profa. Marina Costa</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        Inscrever-se
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Webinars Gravados */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Webinars Gravados</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver biblioteca completa</a>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-blue overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a195223fa7-44607092c4e1194c081e.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Análise Técnica</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Padrões Gráficos Avançados</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>1h 45min</span>
                        <span>•</span>
                        <span>2.1k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-purple overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/439b549209-084dc01db5f1c86775de.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">DeFi</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Finanças Descentralizadas</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>2h 15min</span>
                        <span>•</span>
                        <span>1.8k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-pink overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fe841e9543-0d4633567d0a2f089401.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">Gestão de Risco</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Proteção de Carteiras</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>1h 30min</span>
                        <span>•</span>
                        <span>3.2k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-pink text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-36 bg-pastel-green overflow-hidden relative">
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/90085a1f92-3b2f9afbdad1bed10b3b.png" alt="Webinar gravado" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-play text-slate-700 text-lg ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Value Investing</span>
                      <h3 className="font-medium text-slate-800 mt-3 mb-2 line-clamp-2">Análise Fundamentalista</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <i className="fas fa-clock"></i>
                        <span>2h 00min</span>
                        <span>•</span>
                        <span>2.7k views</span>
                      </div>
                      <button className="w-full px-3 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                        Assistir
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>}

          {activeTab === 'live' && <LiveContent />}

          {activeTab === 'entrevistas' && <EntrevistasContent />}

          {activeTab === 'artigos' && <div className="text-center py-16">
              <div className="w-20 h-20 bg-pastel-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-newspaper text-3xl text-slate-700"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Artigos</h3>
              <p className="text-slate-600">Leia artigos aprofundados sobre o mercado financeiro</p>
            </div>}

          {activeTab === 'analises'}

          {activeTab === 'relatorios' && <RelatoriosPendentes />}

          {activeTab === 'infograficos' && <InfograficosPendentes />}

          {activeTab === 'whitepaper' && <WhitepapersPendentes />}

          {activeTab === 'apresentacoes' && <ApresentacoesPendentes />}

          {activeTab === 'estudos' && <>
              <div className="grid grid-cols-4 gap-6 mb-8">
                <section className="col-span-4 grid grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                        <FileText size={24} className="text-slate-700" />
                      </div>
                      <span className="text-xs text-green-600 font-medium">+12%</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">1,247</h3>
                    <p className="text-sm text-slate-500">Papers Disponíveis</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center">
                        <Bookmark size={24} className="text-slate-700" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">34</h3>
                    <p className="text-sm text-slate-500">Salvos para Ler</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <Quote size={24} className="text-slate-700" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">156</h3>
                    <p className="text-sm text-slate-500">Citações Coletadas</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                        <Users size={24} className="text-slate-700" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">89</h3>
                    <p className="text-sm text-slate-500">Autores Seguidos</p>
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <section className="col-span-1">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Filtros Avançados</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Período de Publicação</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" placeholder="De" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                          <input type="text" placeholder="Até" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Área de Pesquisa</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" defaultChecked />
                            <span>Mercado de Capitais</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Finanças Corporativas</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Economia Monetária</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Fintech & Inovação</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Regulação Financeira</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Gestão de Riscos</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Banking & Crédito</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Tipo de Publicação</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Journal Articles</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Working Papers</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Dissertações</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Teses</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Conference Papers</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Impacto do Journal</label>
                        <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                          <option>Todos</option>
                          <option>Alto Impacto (Q1)</option>
                          <option>Médio-Alto Impacto (Q2)</option>
                          <option>Médio Impacto (Q3)</option>
                          <option>Baixo Impacto (Q4)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-3 block">Número de Citações</label>
                        <div className="px-2">
                          <input type="range" min="0" max="1000" value={citationValue} onChange={e => setCitationValue(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-purple" />
                          <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>0</span>
                            <span>{citationValue === 0 ? 'Todas' : `${citationValue}+`}</span>
                            <span>1000+</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Idioma</label>
                        <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                          <option>Todos os idiomas</option>
                          <option>Português</option>
                          <option>Inglês</option>
                          <option>Espanhol</option>
                          <option>Francês</option>
                          <option>Alemão</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">País/Região</label>
                        <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                          <option>Todos os países</option>
                          <option>Brasil</option>
                          <option>Estados Unidos</option>
                          <option>Reino Unido</option>
                          <option>Europa</option>
                          <option>América Latina</option>
                          <option>Ásia</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Acesso</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="radio" name="access" className="w-4 h-4 border-slate-300 text-pastel-purple focus:ring-pastel-purple" defaultChecked />
                            <span>Todos</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="radio" name="access" className="w-4 h-4 border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Acesso Aberto</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="radio" name="access" className="w-4 h-4 border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Acesso Restrito</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Metodologia</label>
                        <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                          <option>Todas</option>
                          <option>Quantitativa</option>
                          <option>Qualitativa</option>
                          <option>Mista</option>
                          <option>Revisão Sistemática</option>
                          <option>Meta-análise</option>
                          <option>Estudo de Caso</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-3 block">Ano de Publicação</label>
                        <div className="px-2">
                          <input type="range" min="2000" max="2024" value={yearValue} onChange={e => setYearValue(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-purple" />
                          <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>2000</span>
                            <span>{yearValue}</span>
                            <span>2024</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Instituição</label>
                        <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                          <option>Todas as instituições</option>
                          <option>Universidades Top 50</option>
                          <option>Instituições Brasileiras</option>
                          <option>Business Schools</option>
                          <option>Bancos Centrais</option>
                          <option>Organizações Internacionais</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Relevância Prática</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Com recomendações práticas</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Com dados públicos</span>
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-pastel-purple focus:ring-pastel-purple" />
                            <span>Com código disponível</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-slate-200">
                        <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          Limpar Filtros
                        </button>
                        <button className="flex-1 px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                          Aplicar Filtros
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Tópicos em Alta</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-pastel-blue text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">ESG</span>
                      <span className="px-3 py-1.5 bg-pastel-green text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">DeFi</span>
                      <span className="px-3 py-1.5 bg-pastel-yellow text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Machine Learning</span>
                      <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Risk Management</span>
                      <span className="px-3 py-1.5 bg-pastel-pink text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Blockchain</span>
                      <span className="px-3 py-1.5 bg-pastel-peach text-slate-700 text-xs rounded-full cursor-pointer hover:bg-opacity-80 transition">Behavioral Finance</span>
                    </div>
                  </div>
                </section>

                <section className="col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-semibold text-slate-800">Resultados</h2>
                      <span className="text-sm text-slate-500">847 artigos encontrados</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600">Ordenar por:</span>
                      <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-purple">
                        <option>Mais Relevante</option>
                        <option>Mais Recente</option>
                        <option>Mais Citado</option>
                        <option>Maior Impacto</option>
                      </select>
                      <button onClick={() => navigate('/criar-paper')} className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2">
                        <i className="fas fa-pen-fancy"></i>
                        <span>Criar Paper</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full font-medium">Q1 Journal</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Acesso Aberto</span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <Bookmark size={20} />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">Machine Learning Applications in High-Frequency Trading: A Systematic Review</h3>
                      <p className="text-sm text-slate-600 mb-3">Este estudo revisa sistematicamente as aplicações de machine learning em trading de alta frequência, analisando 127 artigos publicados entre 2018-2024...</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <span><i className="fas fa-user mr-1"></i>Chen, L. et al.</span>
                        <span><i className="fas fa-calendar mr-1"></i>2024</span>
                        <span><i className="fas fa-quote-right mr-1"></i>342 citações</span>
                        <span><i className="fas fa-book mr-1"></i>Journal of Financial Markets</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Machine Learning</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">HFT</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Algorithmic Trading</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                          <Download size={16} className="inline mr-2" />Download PDF
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          Ver Detalhes
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </article>

                    <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full font-medium">Q2 Journal</span>
                        </div>
                        <button className="text-pastel-purple">
                          <Bookmark size={20} />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">ESG Integration in Portfolio Management: Evidence from Emerging Markets</h3>
                      <p className="text-sm text-slate-600 mb-3">Análise empírica do impacto da integração de critérios ESG na performance de portfólios em mercados emergentes, com foco em América Latina e Ásia...</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <span><i className="fas fa-user mr-1"></i>Silva, M. & Costa, R.</span>
                        <span><i className="fas fa-calendar mr-1"></i>2024</span>
                        <span><i className="fas fa-quote-right mr-1"></i>87 citações</span>
                        <span><i className="fas fa-book mr-1"></i>Emerging Markets Review</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">ESG</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Portfolio Management</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Emerging Markets</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                          <Download size={16} className="inline mr-2" />Download PDF
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          Ver Detalhes
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </article>

                    <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full font-medium">Working Paper</span>
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Novo</span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <Bookmark size={20} />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">Central Bank Digital Currencies: Implications for Monetary Policy and Financial Stability</h3>
                      <p className="text-sm text-slate-600 mb-3">Investigação teórica e empírica sobre os efeitos das CBDCs na transmissão de política monetária e na estabilidade do sistema financeiro...</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <span><i className="fas fa-user mr-1"></i>Thompson, J. et al.</span>
                        <span><i className="fas fa-calendar mr-1"></i>2024</span>
                        <span><i className="fas fa-quote-right mr-1"></i>23 citações</span>
                        <span><i className="fas fa-building mr-1"></i>IMF Working Papers</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">CBDC</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Monetary Policy</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Financial Stability</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                          <Download size={16} className="inline mr-2" />Download PDF
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          Ver Detalhes
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </article>

                    <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full font-medium">Q1 Journal</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Acesso Aberto</span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <Bookmark size={20} />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">DeFi Protocols and Traditional Finance: A Comparative Analysis of Risk Profiles</h3>
                      <p className="text-sm text-slate-600 mb-3">Comparação sistemática entre protocolos DeFi e produtos financeiros tradicionais, focando em perfis de risco, liquidez e retornos ajustados...</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <span><i className="fas fa-user mr-1"></i>Park, S. & Kim, H.</span>
                        <span><i className="fas fa-calendar mr-1"></i>2023</span>
                        <span><i className="fas fa-quote-right mr-1"></i>198 citações</span>
                        <span><i className="fas fa-book mr-1"></i>Journal of Financial Economics</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">DeFi</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Risk Analysis</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Blockchain</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                          <Download size={16} className="inline mr-2" />Download PDF
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          Ver Detalhes
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </article>

                    <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-peach text-slate-700 text-xs rounded-full font-medium">Q2 Journal</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Acesso Aberto</span>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <Bookmark size={20} />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 hover:text-pastel-purple cursor-pointer">Behavioral Biases in Credit Risk Assessment: Evidence from Brazilian Banks</h3>
                      <p className="text-sm text-slate-600 mb-3">Investigação sobre vieses comportamentais na avaliação de risco de crédito em bancos brasileiros, utilizando dados de 500 mil operações de crédito...</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <span><i className="fas fa-user mr-1"></i>Oliveira, P. & Mendes, A.</span>
                        <span><i className="fas fa-calendar mr-1"></i>2023</span>
                        <span><i className="fas fa-quote-right mr-1"></i>145 citações</span>
                        <span><i className="fas fa-book mr-1"></i>Journal of Banking & Finance</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Behavioral Finance</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Credit Risk</span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">Brazilian Market</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                          <Download size={16} className="inline mr-2" />Download PDF
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          Ver Detalhes
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </article>
                  </div>
                </section>
              </div>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Coleções Recomendadas</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Explorar mais</a>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-landmark text-slate-700 text-xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Finanças Sustentáveis</h3>
                    <p className="text-sm text-slate-600 mb-4">Pesquisas sobre ESG, investimentos verdes e finanças climáticas</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span><i className="fas fa-file-alt mr-1"></i>124 artigos</span>
                      <span><i className="fas fa-users mr-1"></i>4.2k seguidores</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Explorar Coleção
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-robot text-slate-700 text-xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">IA em Finanças</h3>
                    <p className="text-sm text-slate-600 mb-4">Machine learning, deep learning e aplicações em trading e análise de risco</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span><i className="fas fa-file-alt mr-1"></i>63 artigos</span>
                      <span><i className="fas fa-users mr-1"></i>2.8k seguidores</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Explorar Coleção
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-pastel-green rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-coins text-slate-700 text-xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Criptoeconomia</h3>
                    <p className="text-sm text-slate-600 mb-4">Estudos sobre blockchain, criptomoedas, DeFi e tokenização de ativos</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span><i className="fas fa-file-alt mr-1"></i>89 artigos</span>
                      <span><i className="fas fa-users mr-1"></i>3.4k seguidores</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Explorar Coleção
                    </button>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Autores Mais Citados</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver ranking completo</a>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Dr. Maria Santos" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="font-semibold text-slate-800 mb-1">Dr. Maria Santos</h3>
                    <p className="text-xs text-slate-500 mb-3">MIT Sloan School</p>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                      <span><i className="fas fa-file-alt mr-1"></i>127</span>
                      <span><i className="fas fa-quote-right mr-1"></i>8.9k</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      Seguir
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Prof. John Chen" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="font-semibold text-slate-800 mb-1">Prof. John Chen</h3>
                    <p className="text-xs text-slate-500 mb-3">Stanford GSB</p>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                      <span><i className="fas fa-file-alt mr-1"></i>94</span>
                      <span><i className="fas fa-quote-right mr-1"></i>7.2k</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      Seguir
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="Dr. Anna Weber" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="font-semibold text-slate-800 mb-1">Dr. Anna Weber</h3>
                    <p className="text-xs text-slate-500 mb-3">LSE Economics</p>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                      <span><i className="fas fa-file-alt mr-1"></i>156</span>
                      <span><i className="fas fa-quote-right mr-1"></i>11.3k</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                      Seguindo
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" alt="Prof. Roberto Lima" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="font-semibold text-slate-800 mb-1">Prof. Roberto Lima</h3>
                    <p className="text-xs text-slate-500 mb-3">FGV EAESP</p>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-4">
                      <span><i className="fas fa-file-alt mr-1"></i>83</span>
                      <span><i className="fas fa-quote-right mr-1"></i>5.6k</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      Seguir
                    </button>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Ferramentas de Pesquisa</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-pastel-yellow rounded-lg flex items-center justify-center">
                        <i className="fas fa-search-plus text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Busca Semântica</h3>
                        <p className="text-xs text-slate-500">Powered by IA</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Encontre papers relacionados por conceitos e significado, não apenas palavras-chave</p>
                    <button className="w-full px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      Experimentar
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-pastel-peach rounded-lg flex items-center justify-center">
                        <i className="fas fa-project-diagram text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Mapa de Citações</h3>
                        <p className="text-xs text-slate-500">Visualização interativa</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Explore conexões entre papers e identifique trabalhos fundamentais na área</p>
                    <button className="w-full px-4 py-2 bg-pastel-peach text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      Ver Mapa
                    </button>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center">
                        <i className="fas fa-brain text-slate-700 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Resumo por IA</h3>
                        <p className="text-xs text-slate-500">Compreensão rápida</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Gere resumos automáticos e identifique insights principais de qualquer paper</p>
                    <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition">
                      Ativar IA
                    </button>
                  </div>
                </div>
              </section>
            </>}

          {activeTab === 'analises' && <>
              <section className="mb-8">
                <div className="bg-pastel-purple/80 rounded-xl border border-slate-200 p-8">
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <Bot className="text-slate-700" size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700">Análise Gerada por IA</span>
                            <span className="text-xs text-slate-600">Agente: Análise de Macro Economia</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button title="Favoritar" className="p-2 text-slate-600 hover:text-yellow-500 transition">
                            <Star size={20} />
                          </button>
                          <button title="Salvar" className="p-2 text-slate-600 hover:text-blue-500 transition">
                            <Bookmark size={20} />
                          </button>
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">Panorama do Mercado Brasileiro</h2>
                      <p className="text-slate-700 mb-6">Análise completa dos principais indicadores econômicos, tendências de mercado e oportunidades nos setores de renda fixa, renda variável e meios de pagamento.</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Clock size={16} />
                          <span>Atualizado há 2 horas</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Eye size={16} />
                          <span>1.2k visualizações</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-64 bg-white rounded-xl overflow-hidden">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7fcb40b8c2-0d96ecc5a72548820724.png" alt="illustration of financial market analysis dashboard with charts graphs and data visualization" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Visão Geral do Mercado</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-green/80 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-slate-700" size={24} />
                      </div>
                      <span className="text-xs text-green-600 font-medium">+2.4%</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800 mb-1">118.245</p>
                    <p className="text-sm text-slate-600">Ibovespa</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-blue/80 rounded-lg flex items-center justify-center">
                        <Percent className="text-slate-700" size={24} />
                      </div>
                      <span className="text-xs text-blue-600 font-medium">-0.25%</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800 mb-1">10.75%</p>
                    <p className="text-sm text-slate-600">Taxa Selic</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-yellow/80 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-slate-700" size={24} />
                      </div>
                      <span className="text-xs text-red-600 font-medium">+0.8%</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800 mb-1">R$ 5.12</p>
                    <p className="text-sm text-slate-600">Dólar USD</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pastel-pink/80 rounded-lg flex items-center justify-center">
                        <PieChart className="text-slate-700" size={24} />
                      </div>
                      <span className="text-xs text-purple-600 font-medium">+5.2%</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800 mb-1">4.89%</p>
                    <p className="text-sm text-slate-600">IPCA (ano)</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Análises em Destaque</h2>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Todas</button>
                    <button className="px-4 py-2 text-sm bg-pastel-blue/80 text-slate-700 rounded-lg font-medium">Renda Fixa</button>
                    <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Renda Variável</button>
                    <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition">Fundos</button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-blue/80 overflow-hidden">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/27d7c99831-964c4d3004b99cb9421c.png" alt="illustration of fixed income bonds and treasury securities" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-blue/80 text-slate-700 text-xs rounded-full">Renda Fixa</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Alta Confiança</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                          <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Títulos Públicos: Oportunidades em 2025</h3>
                      <p className="text-sm text-slate-600 mb-4">Análise detalhada sobre a curva de juros e as melhores estratégias para alocação em títulos do Tesouro Direto.</p>
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Renda Fixa</span></div>
                        <span>há 3 horas</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-blue/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">Ver Análise Completa</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-green/80 overflow-hidden">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/15c1b70a0a-1efcc7f9f1aafe24a989.png" alt="illustration of payment processing systems with credit cards" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-green/80 text-slate-700 text-xs rounded-full">Meios de Pagamento</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Tendência</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                          <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Pix: Impacto no Mercado de Meios de Pagamento</h3>
                      <p className="text-sm text-slate-600 mb-4">Como o crescimento do Pix está transformando o ecossistema de pagamentos e criando novas oportunidades.</p>
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Pagamentos</span></div>
                        <span>há 5 horas</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-green/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">Ver Análise Completa</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 bg-pastel-purple/80 overflow-hidden">
                      <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/df884dff45-9688d032fd8d112bc1ec.png" alt="illustration of stock market trading with bull and bear symbols" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-pastel-purple/80 text-slate-700 text-xs rounded-full">Renda Variável</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Popular</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                          <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">Setores em Alta na B3 e Novos IPOs em 2026</h3>
                      <p className="text-sm text-slate-600 mb-4">Análise dos setores com melhor desempenho e perspectivas para o próximo trimestre na bolsa brasileira.</p>
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Ações</span></div>
                        <span>há 1 dia</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-pastel-purple/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">Ver Análise Completa</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Análise por Setor</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Desempenho Setorial - Último Mês</h3>
                        <p className="text-sm text-slate-500">Variação percentual por setor</p>
                      </div>
                      <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={sectorData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <YAxis stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <Tooltip contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} labelStyle={{
                      color: '#1e293b',
                      fontWeight: 600
                    }} />
                        <Bar dataKey="value" fill="#8BBAA5" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Volume de Negociação</h3>
                        <p className="text-sm text-slate-500">Últimos 7 dias (em bilhões)</p>
                      </div>
                      <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={volumeData}>
                        <defs>
                          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7FA8BF" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#7FA8BF" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <YAxis stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <Tooltip contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} labelStyle={{
                      color: '#1e293b',
                      fontWeight: 600
                    }} />
                        <Area type="monotone" dataKey="value" stroke="#7FA8BF" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Análises Detalhadas</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-pastel-yellow/80 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e767b1e35f-e1497fa60b2545ea746a.png" alt="illustration of banking sector" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-pastel-yellow/80 text-slate-700 text-xs rounded-full">Setor Bancário</span>
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Recomendação: Compra</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Bancos Digitais: Crescimento Sustentável</h3>
                            <p className="text-sm text-slate-600 mb-3">Análise profunda sobre o crescimento dos bancos digitais no Brasil e seu impacto no sistema financeiro tradicional. Perspectivas de rentabilidade e market share.</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                            <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Setor Financeiro</span></div>
                            <div className="flex items-center gap-2"><Clock size={16} /><span>há 6 horas</span></div>
                            <div className="flex items-center gap-2"><Eye size={16} /><span>842 visualizações</span></div>
                          </div>
                          <button className="px-4 py-2 bg-pastel-yellow/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">Ler Mais</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-pastel-pink/80 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ba28b58ea8-8cb1869b77ea31def56f.png" alt="illustration of real estate investment" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-pastel-pink/80 text-slate-700 text-xs rounded-full">Fundos Imobiliários</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Recomendação: Manter</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">FIIs: Dividendos e Valorização</h3>
                            <p className="text-sm text-slate-600 mb-3">Panorama completo dos fundos imobiliários brasileiros, análise de dividend yield, vacância e tendências do mercado imobiliário corporativo.</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                            <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Imobiliário</span></div>
                            <div className="flex items-center gap-2"><Clock size={16} /><span>há 8 horas</span></div>
                            <div className="flex items-center gap-2"><Eye size={16} /><span>1.1k visualizações</span></div>
                          </div>
                          <button className="px-4 py-2 bg-pastel-pink/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">Ler Mais</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-pastel-peach/80 rounded-lg flex-shrink-0 overflow-hidden">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ee21125d96-93cb76472c018e2b9a5f.png" alt="illustration of commodities trading" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-pastel-peach/80 text-slate-700 text-xs rounded-full">Commodities</span>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Recomendação: Atenção</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Commodities: Volatilidade e Oportunidades</h3>
                            <p className="text-sm text-slate-600 mb-3">Análise do mercado de commodities agrícolas e minerais, impacto das políticas internacionais e projeções para exportações brasileiras.</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button title="Favoritar" className="p-2 text-slate-400 hover:text-yellow-500 transition"><Star size={16} /></button>
                            <button title="Salvar" className="p-2 text-slate-400 hover:text-blue-500 transition"><Bookmark size={16} /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2"><Bot size={16} /><span>Agente IA: Commodities</span></div>
                            <div className="flex items-center gap-2"><Clock size={16} /><span>há 12 horas</span></div>
                            <div className="flex items-center gap-2"><Eye size={16} /><span>673 visualizações</span></div>
                          </div>
                          <button className="px-4 py-2 bg-pastel-peach/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">Ler Mais</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Indicadores Macroeconômicos</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Evolução da Taxa Selic</h3>
                        <p className="text-sm text-slate-500">Últimos 12 meses (%)</p>
                      </div>
                      <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={selicData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <YAxis stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <Tooltip contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} labelStyle={{
                      color: '#1e293b',
                      fontWeight: 600
                    }} />
                        <Line type="monotone" dataKey="value" stroke="#C4B88A" strokeWidth={3} dot={{
                      fill: '#C4B88A',
                      r: 4
                    }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Inflação Acumulada</h3>
                        <p className="text-sm text-slate-500">IPCA - Últimos 12 meses (%)</p>
                      </div>
                      <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={inflationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <YAxis stroke="#64748b" style={{
                      fontSize: '12px'
                    }} domain={[-0.1, 'auto']} />
                        <Tooltip contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} labelStyle={{
                      color: '#1e293b',
                      fontWeight: 600
                    }} />
                        <Bar dataKey="value" fill="#C48BA5" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Evolução dos Meios de Pagamento</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Evolução do PIX</h3>
                        <p className="text-sm text-slate-500">Transações mensais (em bilhões)</p>
                      </div>
                      <button className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">Ver Detalhes</button>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={pixData}>
                        <defs>
                          <linearGradient id="colorPix" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8BBAA5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#8BBAA5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <YAxis stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <Tooltip contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} labelStyle={{
                      color: '#1e293b',
                      fontWeight: 600
                    }} />
                        <Area type="monotone" dataKey="value" stroke="#8BBAA5" strokeWidth={3} fillOpacity={1} fill="url(#colorPix)" dot={{
                      fill: '#8BBAA5',
                      r: 5
                    }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">Evolução do Cartão de Crédito</h3>
                        <p className="text-sm text-slate-500">Volume transacionado (R$ bilhões/mês)</p>
                      </div>
                      <button onClick={() => navigate('/evolucao-cartao-credito')} className="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                        Ver Detalhes
                      </button>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={creditCardData}>
                        <defs>
                          <linearGradient id="colorCard" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9A8BBF" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#9A8BBF" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <YAxis stroke="#64748b" style={{
                      fontSize: '12px'
                    }} />
                        <Tooltip contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} labelStyle={{
                      color: '#1e293b',
                      fontWeight: 600
                    }} />
                        <Area type="monotone" dataKey="value" stroke="#9A8BBF" strokeWidth={3} fillOpacity={1} fill="url(#colorCard)" dot={{
                      fill: '#9A8BBF',
                      r: 5
                    }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Insights da IA</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-pastel-blue/80 rounded-lg flex items-center justify-center">
                        <Lightbulb className="text-slate-700" size={20} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Oportunidade Identificada</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Títulos Prefixados</h3>
                    <p className="text-sm text-slate-600 mb-4">Com a expectativa de queda na Selic, títulos prefixados longos apresentam boa relação risco-retorno.</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Confiança: 87%</span>
                      <button className="text-pastel-blue hover:text-slate-800 font-medium">Ver Detalhes →</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-pastel-yellow/80 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="text-slate-700" size={20} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Alerta de Risco</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Volatilidade Cambial</h3>
                    <p className="text-sm text-slate-600 mb-4">Aumento da volatilidade cambial devido a incertezas políticas internacionais. Considere hedge.</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Confiança: 92%</span>
                      <button className="text-pastel-yellow hover:text-slate-800 font-medium">Ver Detalhes →</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-pastel-green/80 rounded-lg flex items-center justify-center">
                        <ChartLine className="text-slate-700" size={20} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Tendência Positiva</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Setor de Tecnologia</h3>
                    <p className="text-sm text-slate-600 mb-4">Empresas de tecnologia financeira mostram crescimento consistente e bons fundamentos.</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Confiança: 84%</span>
                      <button className="text-pastel-green hover:text-slate-800 font-medium">Ver Detalhes →</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Relatórios Recentes</h2>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos relatórios</a>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pastel-purple/80 rounded-lg flex items-center justify-center">
                          <FileText className="text-slate-700" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">Relatório Mensal - Janeiro 2025</h3>
                          <p className="text-sm text-slate-500">Análise completa do mercado financeiro brasileiro</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">42 páginas</span>
                        <button className="px-4 py-2 bg-pastel-purple/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                          <Download size={16} className="inline mr-2" />Baixar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pastel-blue/80 rounded-lg flex items-center justify-center">
                          <FileText className="text-slate-700" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">Análise Setorial - Tecnologia</h3>
                          <p className="text-sm text-slate-500">Panorama do setor de tecnologia e fintechs</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">28 páginas</span>
                        <button className="px-4 py-2 bg-pastel-blue/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                          <Download size={16} className="inline mr-2" />Baixar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pastel-green/80 rounded-lg flex items-center justify-center">
                          <FileText className="text-slate-700" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">Projeções Macroeconômicas 2025</h3>
                          <p className="text-sm text-slate-500">Expectativas para PIB, inflação e taxa de juros</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">35 páginas</span>
                        <button className="px-4 py-2 bg-pastel-green/80 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                          <Download size={16} className="inline mr-2" />Baixar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="bg-pastel-blue/80 rounded-xl p-12 text-center">
                  <div className="max-w-3xl mx-auto">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <Bot className="text-slate-700" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Análises Personalizadas com IA</h2>
                    <p className="text-slate-600 mb-8">Nossos agentes de IA geram análises customizadas baseadas no seu perfil de investimento e objetivos financeiros.</p>
                    <div className="flex items-center justify-center gap-4">
                      <button className="px-8 py-4 bg-white text-slate-800 rounded-lg font-semibold hover:bg-slate-50 transition shadow-lg">Criar Análise Personalizada</button>
                      <button className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition">Falar com Especialista</button>
                    </div>
                  </div>
                </div>
              </section>
            </>}
          </div> : null}

        {activeTab === 'documentos' && !showHistorico && !showAnalytics && <NewspapersNaoLidas />}

        {activeTab === 'documentos' && showHistorico && !showAnalytics && <HistoricoDocumentos />}
      </main>

      {selectedAgent && <VideoCallModal open={videoCallOpen} onOpenChange={setVideoCallOpen} agentName={selectedAgent.name} agentAvatar={selectedAgent.avatar} />}
    </div>;
};
export default Aprendizado;