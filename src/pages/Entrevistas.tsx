import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { useState } from "react";
import { Bell, Video, Headphones, FileText, User, Building2, Bot, Play, Eye, Clock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live' | 'entrevistas' | 'insights' | 'graficos';
type MediaType = 'todos' | 'video' | 'audio' | 'escrita';

export default function Entrevistas() {
  const [activeTab, setActiveTab] = useState<TabType>('entrevistas');
  const [mediaFilter, setMediaFilter] = useState<MediaType>('todos');
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);

  const interviews = [
    {
      id: "1",
      title: "O Futuro do Open Banking no Brasil",
      mediaType: "video" as const,
      interviewer: {
        name: "Ana Paula Silva",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        role: "Jornalista Especializada"
      },
      interviewee: {
        name: "Roberto Campos",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
        role: "CTO - Fintech XYZ"
      },
      subject: "Open Banking e Inovação",
      sessions: 4,
      duration: "1h 25min",
      views: 12500,
      date: "15/01/2025",
      thumbnail: "https://storage.googleapis.com/uxpilot-auth.appspot.com/195dbdee1c-92ffceb5d806533c0810.png"
    },
    {
      id: "2",
      title: "Estratégias de Compliance em Pagamentos Digitais",
      mediaType: "audio" as const,
      interviewer: {
        name: "Podcast FinTech Brasil",
        type: "empresa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
        role: "Produtora de Conteúdo"
      },
      interviewee: {
        name: "Dra. Mariana Costa",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
        role: "Head de Compliance"
      },
      subject: "Compliance e Regulação",
      sessions: 3,
      duration: "58min",
      views: 8700,
      date: "12/01/2025",
      thumbnail: "https://storage.googleapis.com/uxpilot-auth.appspot.com/27ff2e3c2c-afb908f73c455f98a798.png"
    },
    {
      id: "3",
      title: "Análise Semanal: Mercado de Criptomoedas",
      mediaType: "escrita" as const,
      interviewer: {
        name: "Assistente IA Financeiro",
        type: "bot" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png",
        role: "Agente de IA Especializado"
      },
      interviewee: {
        name: "Pedro Almeida",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        role: "Analista de Criptoativos"
      },
      subject: "Criptomoedas e Blockchain",
      sessions: 5,
      duration: "15min leitura",
      views: 15200,
      date: "10/01/2025",
      thumbnail: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png"
    },
    {
      id: "4",
      title: "ESG no Setor Financeiro: Desafios e Oportunidades",
      mediaType: "video" as const,
      interviewer: {
        name: "Banco Sustentável",
        type: "empresa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
        role: "Instituição Financeira"
      },
      interviewee: {
        name: "Carla Mendes",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
        role: "Diretora de Sustentabilidade"
      },
      subject: "ESG e Finanças Sustentáveis",
      sessions: 6,
      duration: "1h 48min",
      views: 9800,
      date: "08/01/2025",
      thumbnail: "https://storage.googleapis.com/uxpilot-auth.appspot.com/195dbdee1c-92ffceb5d806533c0810.png"
    },
    {
      id: "5",
      title: "Machine Learning em Detecção de Fraudes",
      mediaType: "audio" as const,
      interviewer: {
        name: "IA Entrevistador",
        type: "bot" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png",
        role: "Bot de Entrevistas"
      },
      interviewee: {
        name: "Tech Security Solutions",
        type: "empresa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
        role: "Empresa de Segurança"
      },
      subject: "Segurança e Tecnologia",
      sessions: 3,
      duration: "42min",
      views: 11400,
      date: "05/01/2025",
      thumbnail: "https://storage.googleapis.com/uxpilot-auth.appspot.com/27ff2e3c2c-afb908f73c455f98a798.png"
    },
    {
      id: "6",
      title: "Tendências do Mercado de Pagamentos em 2025",
      mediaType: "escrita" as const,
      interviewer: {
        name: "Lucas Santos",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        role: "Editor Chefe"
      },
      interviewee: {
        name: "Associação Brasileira de Pagamentos",
        type: "empresa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
        role: "Organização Setorial"
      },
      subject: "Pagamentos e Inovação",
      sessions: 8,
      duration: "22min leitura",
      views: 18900,
      date: "03/01/2025",
      thumbnail: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png"
    }
  ];

  const filteredInterviews = mediaFilter === 'todos' 
    ? interviews 
    : interviews.filter(i => i.mediaType === mediaFilter);

  const getMediaIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'escrita': return <FileText className="w-4 h-4" />;
      default: return null;
    }
  };

  const getParticipantIcon = (type: string) => {
    switch(type) {
      case 'pessoa': return <User className="w-4 h-4" />;
      case 'empresa': return <Building2 className="w-4 h-4" />;
      case 'bot': return <Bot className="w-4 h-4" />;
      default: return null;
    }
  };

  const getMediaColor = (type: string) => {
    switch(type) {
      case 'video': return 'bg-pastel-purple';
      case 'audio': return 'bg-pastel-blue';
      case 'escrita': return 'bg-pastel-green';
      default: return 'bg-pastel-pink';
    }
  };

  const getMediaTypeLabel = (type: string) => {
    switch(type) {
      case 'video': return 'Vídeo';
      case 'audio': return 'Áudio';
      case 'escrita': return 'Escrita';
      default: return type;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Entrevistas Financeiras</h1>
                <p className="text-sm text-slate-500 mt-1">Conversas exclusivas com especialistas do mercado financeiro</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-plus mr-2"></i>
                  Nova Entrevista
                </button>
              </div>
            </div>
          </div>
        </header>

        <MenutabbarFix 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />

        <div className="p-8">
          {/* Media Type Filters */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Filtrar por tipo:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setMediaFilter('todos')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  mediaFilter === 'todos' 
                    ? 'bg-pastel-pink text-slate-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setMediaFilter('video')}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  mediaFilter === 'video' 
                    ? 'bg-pastel-purple text-slate-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Video className="w-4 h-4" />
                Vídeo
              </button>
              <button 
                onClick={() => setMediaFilter('audio')}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  mediaFilter === 'audio' 
                    ? 'bg-pastel-blue text-slate-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Headphones className="w-4 h-4" />
                Áudio
              </button>
              <button 
                onClick={() => setMediaFilter('escrita')}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  mediaFilter === 'escrita' 
                    ? 'bg-pastel-green text-slate-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                Escrita
              </button>
            </div>
          </div>

          {/* Interviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInterviews.map((interview) => (
              <div 
                key={interview.id}
                className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-xl transition flex flex-col ${
                  interview.mediaType === 'video' ? 'border-pastel-purple' :
                  interview.mediaType === 'audio' ? 'border-pastel-blue' :
                  'border-pastel-green'
                }`}
              >
                {/* Thumbnail */}
                <div className={`h-56 overflow-hidden relative ${getMediaColor(interview.mediaType)}`}>
                  <img 
                    className="w-full h-full object-cover" 
                    src={interview.thumbnail} 
                    alt={interview.title} 
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 ${getMediaColor(interview.mediaType)} text-slate-700 text-sm font-medium rounded-full flex items-center gap-2 backdrop-blur bg-white/90`}>
                      {getMediaIcon(interview.mediaType)}
                      {getMediaTypeLabel(interview.mediaType)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs rounded-full font-medium">
                      {interview.sessions} sessões
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 ${getMediaColor(interview.mediaType)} text-slate-700 text-xs rounded-full`}>
                      {interview.subject}
                    </span>
                    <span className="text-xs text-slate-500">• {interview.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">{interview.title}</h3>
                  
                  {/* Interviewer */}
                  <div className="mb-3 pb-3 border-b border-slate-200">
                    <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                      Entrevistador
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={interview.interviewer.avatar} 
                        alt={interview.interviewer.name} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-800 text-sm">{interview.interviewer.name}</p>
                          <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${
                            interview.interviewer.type === 'pessoa' ? 'bg-pastel-blue' :
                            interview.interviewer.type === 'empresa' ? 'bg-pastel-purple' :
                            'bg-pastel-green'
                          } text-slate-700`}>
                            {getParticipantIcon(interview.interviewer.type)}
                            {interview.interviewer.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{interview.interviewer.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interviewee */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                      Entrevistado
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={interview.interviewee.avatar} 
                        alt={interview.interviewee.name} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-800 text-sm">{interview.interviewee.name}</p>
                          <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${
                            interview.interviewee.type === 'pessoa' ? 'bg-pastel-blue' :
                            interview.interviewee.type === 'empresa' ? 'bg-pastel-purple' :
                            'bg-pastel-green'
                          } text-slate-700`}>
                            {getParticipantIcon(interview.interviewee.type)}
                            {interview.interviewee.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{interview.interviewee.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{interview.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{interview.views.toLocaleString()} views</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => setSelectedInterview(interview.id)}
                    className={`w-full px-6 py-3 ${getMediaColor(interview.mediaType)} text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto`}
                  >
                    <Play className="w-4 h-4" />
                    {interview.mediaType === 'escrita' ? 'Ler Entrevista' : 
                     interview.mediaType === 'audio' ? 'Ouvir Agora' : 
                     'Assistir Agora'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interview Player Modal */}
          <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
            <DialogContent className="max-w-4xl">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Reprodutor de Entrevista
                </h3>
                <div className="bg-slate-100 rounded-lg p-8 text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600">O player de conteúdo será exibido aqui</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
