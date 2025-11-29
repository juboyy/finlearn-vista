import { useState } from "react";
import { Video, Headphones, FileText, User, Building2, Bot, Play, Eye, Clock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import entrevistaPagamentosDigitais from "@/assets/entrevista-pagamentos-digitais.png";
import entrevistaBankingDigital from "@/assets/entrevista-banking-digital.png";
import entrevistaPixBrasil from "@/assets/entrevista-pix-brasil.png";
import entrevistaOpenBanking from "@/assets/entrevista-open-banking.png";
import entrevistaSegurancaBancaria from "@/assets/entrevista-seguranca-bancaria.png";
import entrevistaPagamentosContactless from "@/assets/entrevista-pagamentos-contactless.png";

type MediaType = 'todos' | 'video' | 'audio' | 'escrita';

export const EntrevistasContent = () => {
  const [mediaFilter, setMediaFilter] = useState<MediaType>('todos');
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);

  const interviews = [
    {
      id: "1",
      title: "Revolução dos Pagamentos Digitais no Varejo",
      mediaType: "video" as const,
      interviewer: {
        name: "Ana Paula Martins",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        role: "Jornalista Especializada"
      },
      interviewee: {
        name: "Roberto Alves",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
        role: "CEO - PayTech Solutions"
      },
      subject: "Meios de Pagamento",
      sessions: 5,
      duration: "1h 15min",
      views: 14200,
      date: "18/01/2025",
      thumbnail: entrevistaPagamentosDigitais
    },
    {
      id: "2",
      title: "Transformação Digital no Setor Bancário",
      mediaType: "video" as const,
      interviewer: {
        name: "Carlos Eduardo Silva",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        role: "Analista Financeiro"
      },
      interviewee: {
        name: "Patricia Costa",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
        role: "CTO - Banco Digital+"
      },
      subject: "Banking Digital",
      sessions: 4,
      duration: "58min",
      views: 11800,
      date: "16/01/2025",
      thumbnail: entrevistaBankingDigital
    },
    {
      id: "3",
      title: "PIX: Impacto e Futuro dos Pagamentos Instantâneos",
      mediaType: "audio" as const,
      interviewer: {
        name: "Podcast Fintech Brasil",
        type: "empresa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
        role: "Mídia Especializada"
      },
      interviewee: {
        name: "Juliana Ferreira",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
        role: "Especialista em Pagamentos - BACEN"
      },
      subject: "PIX e Pagamentos Instantâneos",
      sessions: 3,
      duration: "45min",
      views: 18500,
      date: "14/01/2025",
      thumbnail: entrevistaPixBrasil
    },
    {
      id: "4",
      title: "Open Banking: Oportunidades e Desafios para Fintechs",
      mediaType: "escrita" as const,
      interviewer: {
        name: "Tech Finance Magazine",
        type: "empresa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
        role: "Publicação Especializada"
      },
      interviewee: {
        name: "Marcos Oliveira",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        role: "Head de APIs - StartBank"
      },
      subject: "Open Banking",
      sessions: 6,
      duration: "20min leitura",
      views: 9200,
      date: "12/01/2025",
      thumbnail: entrevistaOpenBanking
    },
    {
      id: "5",
      title: "Cibersegurança e Prevenção de Fraudes Bancárias",
      mediaType: "video" as const,
      interviewer: {
        name: "Assistente IA Security",
        type: "bot" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png",
        role: "Bot Especializado em Segurança"
      },
      interviewee: {
        name: "SecureBank Corp",
        type: "empresa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
        role: "Empresa de Segurança Bancária"
      },
      subject: "Segurança Bancária",
      sessions: 4,
      duration: "1h 05min",
      views: 13600,
      date: "10/01/2025",
      thumbnail: entrevistaSegurancaBancaria
    },
    {
      id: "6",
      title: "Pagamentos Contactless: Tecnologia NFC no Brasil",
      mediaType: "audio" as const,
      interviewer: {
        name: "Ricardo Santos",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
        role: "Host - Tech Payments Podcast"
      },
      interviewee: {
        name: "Fernanda Lima",
        type: "pessoa" as const,
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
        role: "Diretora de Inovação - CardTech"
      },
      subject: "Pagamentos Contactless",
      sessions: 3,
      duration: "38min",
      views: 10400,
      date: "08/01/2025",
      thumbnail: entrevistaPagamentosContactless
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
    <>
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
            <div className={`h-48 overflow-hidden relative ${getMediaColor(interview.mediaType)}`}>
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
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 ${getMediaColor(interview.mediaType)} text-slate-700 text-xs rounded-full`}>
                  {interview.subject}
                </span>
                <span className="text-xs text-slate-500">• {interview.date}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-3">{interview.title}</h3>
              
              {/* Interviewer */}
              <div className="mb-2 pb-2 border-b border-slate-200">
                <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1">
                  Entrevistador
                </p>
                <div className="flex items-center gap-2">
                  <img 
                    src={interview.interviewer.avatar} 
                    alt={interview.interviewer.name} 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-slate-800 text-sm truncate">{interview.interviewer.name}</p>
                      <span className={`px-1.5 py-0.5 text-xs rounded-full flex items-center gap-1 ${
                        interview.interviewer.type === 'pessoa' ? 'bg-pastel-blue' :
                        interview.interviewer.type === 'empresa' ? 'bg-pastel-purple' :
                        'bg-pastel-green'
                      } text-slate-700 flex-shrink-0`}>
                        {getParticipantIcon(interview.interviewer.type)}
                        {interview.interviewer.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interviewee */}
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1">
                  Entrevistado
                </p>
                <div className="flex items-center gap-2">
                  <img 
                    src={interview.interviewee.avatar} 
                    alt={interview.interviewee.name} 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-slate-800 text-sm truncate">{interview.interviewee.name}</p>
                      <span className={`px-1.5 py-0.5 text-xs rounded-full flex items-center gap-1 ${
                        interview.interviewee.type === 'pessoa' ? 'bg-pastel-blue' :
                        interview.interviewee.type === 'empresa' ? 'bg-pastel-purple' :
                        'bg-pastel-green'
                      } text-slate-700 flex-shrink-0`}>
                        {getParticipantIcon(interview.interviewee.type)}
                        {interview.interviewee.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3 text-xs text-slate-600">
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
                className={`w-full px-4 py-2.5 ${getMediaColor(interview.mediaType)} text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto`}
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
    </>
  );
};
