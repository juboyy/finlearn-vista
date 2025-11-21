import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, Plus, Search, Video, Mic, MessageSquare, ChevronLeft, ChevronRight, Coins, Star, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const agents = [
  {
    id: 1,
    name: "Prof. Ana Santos",
    role: "Especialista Sênior",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
    specialty: "Derivativos",
    specialtyColor: "bg-pastel-blue",
    rating: 4.9,
    reviews: "1.2k",
    interactions: "3.4k conversas",
    status: "online",
  },
  {
    id: 2,
    name: "Dr. Roberto Lima",
    role: "Expert Principal",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
    specialty: "Macroeconomia",
    specialtyColor: "bg-pastel-green",
    rating: 4.8,
    reviews: "980",
    interactions: "2.8k conversas",
    status: "online",
  },
  {
    id: 3,
    name: "Profa. Marina Costa",
    role: "Consultora Especialista",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
    specialty: "ESG & Sustentabilidade",
    specialtyColor: "bg-pastel-purple",
    rating: 5.0,
    reviews: "756",
    interactions: "1.9k conversas",
    status: "online",
  },
  {
    id: 4,
    name: "Dr. Fernando Alves",
    role: "Analista Sênior",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
    specialty: "Análise Técnica",
    specialtyColor: "bg-pastel-pink",
    rating: 4.7,
    reviews: "1.5k",
    interactions: "4.2k conversas",
    status: "ausente",
  },
  {
    id: 5,
    name: "Dra. Juliana Matos",
    role: "Consultora Principal",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
    specialty: "Compliance",
    specialtyColor: "bg-pastel-yellow",
    rating: 4.8,
    reviews: "890",
    interactions: "2.3k conversas",
    status: "online",
  },
  {
    id: 6,
    name: "Prof. Ricardo Souza",
    role: "Especialista Sênior",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
    specialty: "Gestão de Riscos",
    specialtyColor: "bg-pastel-peach",
    rating: 4.9,
    reviews: "1.1k",
    interactions: "3.1k conversas",
    status: "online",
  },
  {
    id: 7,
    name: "Dra. Camila Rodrigues",
    role: "Analista Principal",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
    specialty: "Mercado de Capitais",
    specialtyColor: "bg-pastel-blue",
    rating: 4.8,
    reviews: "1.3k",
    interactions: "3.8k conversas",
    status: "online",
  },
  {
    id: 8,
    name: "Prof. Eduardo Martins",
    role: "Consultor Especialista",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
    specialty: "Meios de Pagamento",
    specialtyColor: "bg-pastel-green",
    rating: 4.7,
    reviews: "645",
    interactions: "1.6k conversas",
    status: "ausente",
  },
];

const recentConversations = [
  {
    id: 1,
    agent: "Prof. Ana Santos",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png",
    time: "Há 2 horas",
    type: "video",
    typeColor: "bg-pastel-purple/30",
    description: "Discussão sobre estratégias de hedge utilizando opções de índice...",
    duration: "23 min de conversa",
    credits: "230 créditos",
  },
  {
    id: 2,
    agent: "Dr. Roberto Lima",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png",
    time: "Ontem",
    type: "text",
    typeColor: "bg-pastel-green/30",
    description: "Análise do impacto das decisões do Fed na economia brasileira...",
    duration: "15 mensagens",
    credits: "30 créditos",
  },
  {
    id: 3,
    agent: "Profa. Marina Costa",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png",
    time: "2 dias atrás",
    type: "audio",
    typeColor: "bg-pastel-blue/30",
    description: "Consultoria sobre implementação de práticas ESG em fundos...",
    duration: "18 min de conversa",
    credits: "90 créditos",
  },
];

const MeusAgentesIA = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("Todas especialidades");

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Meus Agentes IA</h1>
              <p className="text-sm text-slate-500 mt-1">
                Interaja com especialistas virtuais por voz, texto ou vídeo
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <Plus className="w-4 h-4 inline mr-2" />
                Novo Agente
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
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
                    <div className="bg-pastel-yellow h-2 rounded-full" style={{ width: "49%" }}></div>
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
                    <MessageSquare className="text-slate-700" size={20} />
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

          <section>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Agentes Disponíveis</h2>
                  <p className="text-sm text-slate-500 mt-1">8 agentes especializados</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Buscar agente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-blue bg-white"
                  >
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
                    {agents.map((agent) => (
                      <TableRow key={agent.id} className="hover:bg-slate-50 transition">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                              <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-full h-full object-cover"
                              />
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
                          {agent.status === "online" ? (
                            <Badge className="bg-green-100 text-green-700 border-0 font-medium">
                              <Circle className="text-green-500 fill-green-500 mr-1" size={6} />
                              Online
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700 border-0 font-medium">
                              <Circle className="text-slate-400 fill-slate-400 mr-1" size={6} />
                              Ausente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 bg-pastel-purple hover:bg-opacity-80 text-slate-700 rounded-lg transition"
                              title="Conversar por Vídeo"
                            >
                              <Video size={16} />
                            </button>
                            <button
                              className="p-2 bg-pastel-blue hover:bg-opacity-80 text-slate-700 rounded-lg transition"
                              title="Conversar por Voz"
                            >
                              <Mic size={16} />
                            </button>
                            <button
                              className="p-2 bg-pastel-green hover:bg-opacity-80 text-slate-700 rounded-lg transition"
                              title="Conversar por Texto"
                            >
                              <MessageSquare size={16} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <p className="text-sm text-slate-600">Mostrando 8 de 8 agentes</p>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    <ChevronLeft size={16} className="inline mr-1" />
                    Anterior
                  </button>
                  <button className="px-3 py-2 bg-pastel-blue text-slate-800 rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Próximo
                    <ChevronRight size={16} className="inline ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Conversas Recentes</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                Ver histórico completo
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {recentConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={conversation.avatar}
                          alt={conversation.agent}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{conversation.agent}</p>
                        <p className="text-xs text-slate-500">{conversation.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 ${conversation.typeColor} rounded-full`}>
                      {conversation.type === "video" && (
                        <Video className="text-slate-700" size={14} />
                      )}
                      {conversation.type === "text" && (
                        <MessageSquare className="text-slate-700" size={14} />
                      )}
                      {conversation.type === "audio" && (
                        <Mic className="text-slate-700" size={14} />
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {conversation.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{conversation.duration}</span>
                    <span>{conversation.credits}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MeusAgentesIA;
