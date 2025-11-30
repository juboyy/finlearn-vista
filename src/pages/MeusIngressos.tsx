import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Info, Plus, Share2, MapPin, Users, Ticket, QrCode, Headphones, ArrowRight, RefreshCw, Award, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTicketsCache } from "@/hooks/useTicketsCache";
import { Skeleton } from "@/components/ui/skeleton";
import ticketBackgroundPattern from "@/assets/ticket-background-pattern.png";
import ticketIllustration from "@/assets/ticket-illustration.png";
import eventThumbnail from "@/assets/event-thumbnail.png";

// Mock function para simular fetch de dados
const fetchTicketsData = async () => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    proximos: [
      {
        id: 1,
        title: "Open Finance Brasil 2024",
        date: "12 Dezembro",
        time: "Quinta-feira • 08:00",
        location: "Centro de Convenções",
        address: "Av. das Américas, 3500 - RJ",
        type: "Conferência",
        ticketType: "Ingresso VIP",
        status: "confirmado",
        orderId: "#849302",
      },
      {
        id: 2,
        title: "Estratégias em Renda Fixa",
        date: "05 Dezembro",
        time: "Quinta-feira • 09:00",
        location: "Auditório Paulista",
        address: "Av. Paulista, 1000 - SP",
        type: "Workshop",
        ticketType: "Entrada Padrão",
        status: "confirmado",
        orderId: "#849155",
      },
    ],
    historico: Array.from({ length: 5 }, (_, i) => ({
      id: i + 3,
      title: `Evento Passado ${i + 1}`,
      date: `${10 + i} Nov 2024`,
      location: "Online",
      type: "Webinar",
    })),
  };
};

export default function MeusIngressos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"proximos" | "historico" | "cancelados">("proximos");
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const { data: ticketsData, loading } = useTicketsCache(fetchTicketsData, {
    cacheKey: 'user-tickets-data',
    ttl: 5 * 60 * 1000, // 5 minutos
  });

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header fixo no topo - padrão do sistema */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/eventos-presenciais" className="text-foreground hover:text-foreground/80">
                <ArrowLeft className="w-5 h-5" />
              </a>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Meus Ingressos</h1>
                <p className="text-sm text-muted-foreground mt-1">Gerencie seus ingressos para eventos presenciais e online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate('/historico-ingressos')}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Info className="w-4 h-4" /> Ver detalhes
              </Button>
              <Button className="bg-pastel-yellow hover:bg-pastel-yellow/80 text-slate-700 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Explorar Novos Eventos
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="border-b border-slate-200 mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("proximos")}
                className={`pb-4 border-b-2 font-medium px-2 transition ${
                  activeTab === "proximos"
                    ? "border-slate-800 text-slate-800"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Próximos (2)
              </button>
                <button
                  onClick={() => setActiveTab("historico")}
                  className={`pb-4 border-b-2 font-medium px-2 transition ${
                    activeTab === "historico"
                      ? "border-slate-800 text-slate-800"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Histórico (5)
                </button>
                <button
                  onClick={() => setActiveTab("cancelados")}
                  className={`pb-4 border-b-2 font-medium px-2 transition ${
                    activeTab === "cancelados"
                      ? "border-slate-800 text-slate-800"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Cancelados (0)
              </button>
            </div>
          </div>

          {/* Active Tickets Section - Renderizado condicionalmente */}
          {activeTab === "proximos" && (
            <section className="space-y-6 mb-12">
            {loading ? (
              // Loading skeletons
              <>
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-8">
                    <div className="flex gap-6">
                      <Skeleton className="w-72 h-48 flex-shrink-0" />
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="flex gap-4 mt-6">
                          <Skeleton className="h-10 flex-1" />
                          <Skeleton className="h-10 w-32" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              ticketsData?.proximos.map((ticket, idx) => (
            <div key={ticket.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row">
              {/* Left: Image & Date */}
              <div className={`w-full md:w-72 ${idx === 0 ? 'bg-pastel-purple/20' : 'bg-pastel-blue/20'} relative flex-shrink-0 border-r border-slate-100`}>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-bold rounded-full uppercase tracking-wide border border-slate-100">
                    Confirmado
                  </span>
                </div>
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <span className="text-3xl font-bold text-slate-700">{ticket.date.split(' ')[0]}</span>
                  </div>
                  <span className="text-xl font-medium text-slate-800">{ticket.date.split(' ')[1]}</span>
                  <span className="text-slate-500">{ticket.time}</span>
                </div>
                {/* Decorative background image overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img 
                    src={ticketBackgroundPattern} 
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      loadedImages.has(`bg-${ticket.id}`) ? 'blur-0 scale-100' : 'blur-md scale-105'
                    }`}
                    alt="background pattern"
                    loading="lazy"
                    onLoad={() => handleImageLoad(`bg-${ticket.id}`)}
                  />
                </div>
              </div>

              {/* Middle: Event Details */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 ${idx === 0 ? 'bg-pastel-purple' : 'bg-pastel-blue'} text-slate-700 text-xs font-semibold rounded-md`}>{ticket.type}</span>
                        <span className="text-xs text-slate-400">Pedido {ticket.orderId}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">{ticket.title}</h2>
                      <p className="text-slate-600 mb-4 line-clamp-2">O maior encontro sobre o ecossistema financeiro aberto. Palestras exclusivas sobre regulação, APIs e novos modelos de negócios.</p>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{ticket.location}</p>
                        <p className="text-xs text-slate-500">{ticket.address}</p>
                        <a href="#" className="text-xs text-indigo-600 hover:underline mt-0.5 block">Ver no mapa</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-500">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{ticket.ticketType}</p>
                        <p className="text-xs text-slate-500">Acesso área VIP + Almoço</p>
                        <p className="text-xs text-slate-500">Titular: João Silva</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                  <button className="flex-1 bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2 shadow-sm">
                    <QrCode className="w-4 h-4" />
                    Ver QR Code
                  </button>
                  <Button variant="outline">Gerenciar</Button>
                </div>
              </div>

              {/* Right: Illustration */}
              <div className="hidden xl:flex xl:w-64 bg-slate-50 p-6 items-center justify-center border-l border-slate-100">
                <div className="w-full h-48 relative">
                  <img 
                    className={`w-full h-full object-contain transition-all duration-700 ${
                      loadedImages.has(`illustration-${ticket.id}`) ? 'blur-0 scale-100' : 'blur-lg scale-95'
                    }`}
                    src={ticketIllustration} 
                    alt="illustration of a simple ticket icon with a qr code, pastel purple tones, outlined style, 2d flat design, thick strokes, white background"
                    loading="lazy"
                    onLoad={() => handleImageLoad(`illustration-${ticket.id}`)}
                  />
                </div>
              </div>
            </div>
              ))
            )}
          </section>
          )}

          {/* Information Grid - Renderizado condicionalmente */}
          {activeTab === "proximos" && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Need Help */}
            <div className="bg-pastel-yellow/30 rounded-xl p-6 border border-pastel-yellow relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm text-slate-700">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Precisa de ajuda?</h3>
                <p className="text-sm text-slate-600 mb-4">Problemas com seu ingresso ou dúvidas sobre o evento? Nosso suporte está disponível.</p>
                <a href="#" className="text-sm font-medium text-slate-800 hover:text-slate-600 flex items-center gap-2">
                  Falar com Suporte <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 transform group-hover:scale-110 transition duration-500">
                <Headphones className="w-36 h-36" />
              </div>
            </div>

            {/* Transfer Ticket */}
            <div className="bg-pastel-green/30 rounded-xl p-6 border border-pastel-green relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <RefreshCw className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Transferir Ingresso</h3>
                <p className="text-sm text-slate-600 mb-4">Não poderá comparecer? Você pode transferir seu ingresso para outra pessoa até 24h antes.</p>
                <a href="#" className="text-sm font-medium text-slate-800 hover:text-slate-600 flex items-center gap-2">
                  Iniciar Transferência <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 transform group-hover:scale-110 transition duration-500">
                <Ticket className="w-36 h-36" />
              </div>
            </div>

            {/* Certificate Info */}
            <div className="bg-pastel-blue/30 rounded-xl p-6 border border-pastel-blue relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <Award className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Certificados</h3>
                <p className="text-sm text-slate-600 mb-4">Seus certificados de participação estarão disponíveis aqui 48h após o término do evento.</p>
                <a href="#" className="text-sm font-medium text-slate-800 hover:text-slate-600 flex items-center gap-2">
                  Ver Meus Certificados <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 transform group-hover:scale-110 transition duration-500">
                <Award className="w-36 h-36" />
              </div>
            </div>
          </section>
          )}

          {/* Past Events History - Renderizado condicionalmente */}
          {activeTab === "historico" && (
            <section>
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" /> Histórico Recente
            </h2>
            {loading ? (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border-b">
                      <Skeleton className="h-20 w-32 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                    <th className="px-6 py-4">Evento</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Local</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded bg-pastel-pink flex-shrink-0 overflow-hidden">
                           <img 
                             src={eventThumbnail} 
                             className={`w-full h-full object-cover grayscale opacity-80 transition-all duration-700 ${
                               loadedImages.has('event-1') ? 'blur-0 scale-100' : 'blur-md scale-110'
                             }`}
                             alt="event thumb"
                             loading="lazy"
                             onLoad={() => handleImageLoad('event-1')}
                           />
                         </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">Regulação do Mercado</p>
                          <p className="text-xs text-slate-500">Seminário</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">15 Nov 2024</td>
                    <td className="px-6 py-4 text-sm text-slate-600">São Paulo, SP</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        Concluído
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Ver Certificado</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded bg-pastel-peach flex-shrink-0 overflow-hidden">
                           <img 
                             src={eventThumbnail} 
                             className={`w-full h-full object-cover grayscale opacity-80 transition-all duration-700 ${
                               loadedImages.has('event-2') ? 'blur-0 scale-100' : 'blur-md scale-110'
                             }`}
                             alt="event thumb"
                             loading="lazy"
                             onLoad={() => handleImageLoad('event-2')}
                           />
                         </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">Workshop Derivativos</p>
                          <p className="text-xs text-slate-500">Workshop</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">02 Nov 2024</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Online</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        Concluído
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Ver Certificado</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded bg-pastel-blue flex-shrink-0 overflow-hidden">
                           <img 
                             src={eventThumbnail} 
                             className={`w-full h-full object-cover grayscale opacity-80 transition-all duration-700 ${
                               loadedImages.has('event-3') ? 'blur-0 scale-100' : 'blur-md scale-110'
                             }`}
                             alt="event thumb"
                             loading="lazy"
                             onLoad={() => handleImageLoad('event-3')}
                           />
                         </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">Fórum Meios de Pagamento</p>
                          <p className="text-xs text-slate-500">Fórum</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">20 Out 2024</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Rio de Janeiro, RJ</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        Concluído
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Ver Certificado</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-center">
                <button className="text-sm text-slate-500 hover:text-slate-700 font-medium">Carregar mais eventos</button>
              </div>
            </div>
            )}
          </section>
          )}

          {/* Cancelled Events - Renderizado condicionalmente */}
          {activeTab === "cancelados" && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum ingresso cancelado</h3>
              <p className="text-slate-600">Você não possui ingressos cancelados no momento</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}