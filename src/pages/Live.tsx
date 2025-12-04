import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { LiveChatPanel } from "@/components/Dashboard/LiveChatPanel";
import { useState } from "react";
import { Bell, PlayCircle, Eye, X, Bookmark, BookmarkCheck } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSaveForLater } from "@/hooks/useSaveForLater";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live' | 'entrevistas' | 'insights' | 'graficos';

interface LiveCardProps {
  id: string;
  title: string;
  description: string;
  onWatch: () => void;
}

const LiveSaveButton = ({ id, title }: { id: string; title: string }) => {
  const { isSaved, isLoading, toggleSave } = useSaveForLater({
    itemId: id,
    itemTitle: title,
    itemType: 'live',
    itemDescription: 'Transmissão ao vivo',
    itemUrl: `/live/${id}`
  });

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); toggleSave(); }}
      disabled={isLoading}
      className={`p-2 rounded-lg transition flex items-center gap-1 ${
        isSaved 
          ? 'bg-pastel-purple/40 text-slate-700' 
          : 'bg-white/90 backdrop-blur text-slate-700 hover:bg-white'
      }`}
      title={isSaved ? 'Remover de Assistir Depois' : 'Assistir Depois'}
    >
      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-slate-700" /> : <Bookmark className="w-4 h-4" />}
    </button>
  );
};

export default function Live() {
  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [selectedLive, setSelectedLive] = useState<string | null>(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Transmissões ao Vivo</h1>
                <p className="text-sm text-slate-500 mt-1">Participe de lives interativas e sessões em tempo real</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Minha Agenda
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
          {/* Live Now Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-800">Ao Vivo Agora</h2>
                <span className="px-3 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full font-medium flex items-center gap-1.5">
                  <i className="fas fa-circle text-slate-700 text-[6px] animate-pulse"></i>
                  3 transmissões ao vivo
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border-2 border-pastel-purple overflow-hidden hover:shadow-xl transition flex flex-col">
                <div className="h-64 bg-pastel-yellow overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/195dbdee1c-92ffceb5d806533c0810.png" alt="Live ao vivo" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                      <i className="fas fa-circle text-[6px] animate-pulse"></i>
                      AO VIVO
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <LiveSaveButton id="live-1" title="Análise do Mercado em Tempo Real" />
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1.5">
                      <i className="fas fa-users text-xs"></i>
                      2.1k assistindo
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full">Mercado em Tempo Real</span>
                    <span className="text-xs text-slate-500">• Começou há 8 min</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Análise do Mercado em Tempo Real</h3>
                  <p className="text-sm text-slate-600 mb-4">Acompanhe os principais movimentos do pregão com análise técnica e fundamentalista ao vivo. Participe com perguntas e comentários.</p>
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" alt="Apresentador" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-slate-800">Dr. Carlos Mendes</p>
                      <p className="text-xs text-slate-500">Analista Sênior de Mercado</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-comment"></i>
                      <span>348 comentários</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-heart"></i>
                      <span>1.8k curtidas</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLive("live-1")}
                    className="w-full px-6 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto"
                  >
                    <i className="fas fa-play"></i>
                    Assistir Agora
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-pastel-purple overflow-hidden hover:shadow-xl transition flex flex-col">
                <div className="h-64 bg-pastel-green overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/27ff2e3c2c-afb908f73c455f98a798.png" alt="Live ao vivo" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                      <i className="fas fa-circle text-[6px] animate-pulse"></i>
                      AO VIVO
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <LiveSaveButton id="live-2" title="Perguntas e Respostas: Investimentos 2025" />
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1.5">
                      <i className="fas fa-users text-xs"></i>
                      1.5k assistindo
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Q&A Interativo</span>
                    <span className="text-xs text-slate-500">• Começou há 22 min</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Perguntas e Respostas: Investimentos 2025</h3>
                  <p className="text-sm text-slate-600 mb-4">Sessão interativa de perguntas sobre estratégias de investimento, diversificação e tendências para 2025. Tire suas dúvidas ao vivo.</p>
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" alt="Apresentador" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-slate-800">Prof. Roberto Lima</p>
                      <p className="text-xs text-slate-500">Especialista em Investimentos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-comment"></i>
                      <span>287 comentários</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-heart"></i>
                      <span>1.3k curtidas</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLive("live-2")}
                    className="w-full px-6 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center justify-center gap-2 mt-auto"
                  >
                    <i className="fas fa-play"></i>
                    Assistir Agora
                  </button>
                </div>
              </div>
            </div>

            {/* Live Viewer Modal with Chat */}
            <Dialog open={!!selectedLive} onOpenChange={() => setSelectedLive(null)}>
              <DialogContent className="max-w-7xl h-[90vh] p-0">
                <div className="flex h-full">
                  {/* Video Player Area */}
                  <div className="flex-1 flex flex-col bg-slate-900">
                    <div className="flex items-center justify-between p-4 border-b border-slate-700">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                          <span className="w-2 h-2 bg-slate-700 rounded-full animate-pulse"></span>
                          AO VIVO
                        </span>
                        <div className="flex items-center gap-2 text-white">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {selectedLive === "live-1" ? "2.1k" : selectedLive === "live-2" ? "1.5k" : "892"} assistindo
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedLive(null)}
                        className="text-white hover:text-slate-300 transition"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center bg-slate-800">
                      <div className="text-center text-white">
                        <PlayCircle className="w-24 h-24 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Player de vídeo ao vivo</p>
                        <p className="text-sm text-slate-400 mt-2">Transmissão em tempo real</p>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-700">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {selectedLive === "live-1" 
                          ? "Análise do Mercado em Tempo Real"
                          : selectedLive === "live-2"
                          ? "Perguntas e Respostas: Investimentos 2025"
                          : "Lançamento: Nova Plataforma Open Finance"
                        }
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <img 
                            src={selectedLive === "live-1"
                              ? "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png"
                              : selectedLive === "live-2"
                              ? "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png"
                              : "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png"
                            }
                            alt="Palestrante" 
                            className="w-8 h-8 rounded-full"
                          />
                          <span>
                            {selectedLive === "live-1" 
                              ? "Dr. Carlos Mendes" 
                              : selectedLive === "live-2"
                              ? "Prof. Roberto Lima"
                              : "Fintech XYZ"
                            }
                          </span>
                        </div>
                        <span>•</span>
                        <span>
                          {selectedLive === "live-1" 
                            ? "Mercado em Tempo Real" 
                            : selectedLive === "live-2"
                            ? "Q&A Interativo"
                            : "Lançamento de Produto"
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Panel */}
                  <div className="w-96 border-l border-border">
                    <LiveChatPanel liveId={selectedLive || ""} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Third Live */}
            <div className="mt-6">
              <div className="bg-white rounded-xl border-2 border-pastel-purple overflow-hidden hover:shadow-xl transition">
                <div className="flex">
                  <div className="w-1/3 h-56 bg-pastel-blue overflow-hidden relative">
                    <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png" alt="Live ao vivo" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-pastel-purple text-slate-700 text-sm font-medium rounded-full flex items-center gap-2">
                        <i className="fas fa-circle text-[6px] animate-pulse"></i>
                        AO VIVO
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <LiveSaveButton id="live-3" title="Lançamento: Nova Plataforma Open Finance" />
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-slate-700 text-sm font-medium rounded-full flex items-center gap-1.5">
                        <i className="fas fa-users text-xs"></i>
                        892 assistindo
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Lançamento de Produto</span>
                      <span className="text-xs text-slate-500">• Começou há 45 min</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">Lançamento: Nova Plataforma Open Finance</h3>
                    <p className="text-sm text-slate-600 mb-4">Apresentação ao vivo da nova plataforma de Open Finance com demonstração de recursos, benefícios e casos de uso práticos.</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-db60e1b43d477718b599.png" alt="Apresentador" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-slate-800">Fintech XYZ</p>
                          <p className="text-xs text-slate-500">Empresa de Tecnologia Financeira</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <i className="fas fa-comment"></i>
                            <span>156</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <i className="fas fa-heart"></i>
                            <span>645</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedLive("live-3")}
                          className="px-6 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2"
                        >
                          <i className="fas fa-play"></i>
                          Assistir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Lives Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Próximas Transmissões</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver agenda completa</a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Upcoming 1 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-blue overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png" alt="Live" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      <i className="fas fa-bell mr-1"></i>
                      428 notificações
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-blue rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">HOJE</span>
                      <span className="text-xl text-slate-800 font-bold">18:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Trading</span>
                      <p className="text-xs text-slate-500 mt-1">Duração estimada: 1.5h</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Estratégias de Day Trade</h3>
                  <p className="text-sm text-slate-600 mb-4">Análise de setups e entrada em operações</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Lucas Ferreira</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Ativar Notificação
                  </button>
                </div>
              </div>

              {/* Upcoming 2 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-purple overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d51e1f0edd-ac69efab786c3927349b.png" alt="Live" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      <i className="fas fa-bell mr-1"></i>
                      1.2k notificações
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-purple rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">HOJE</span>
                      <span className="text-xl text-slate-800 font-bold">20:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">Criptomoedas</span>
                      <p className="text-xs text-slate-500 mt-1">Duração estimada: 2h</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Altcoins: Oportunidades 2025</h3>
                  <p className="text-sm text-slate-600 mb-4">Análise de projetos promissores no mercado cripto</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Ana Paula Costa</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Ativar Notificação
                  </button>
                </div>
              </div>

              {/* Upcoming 3 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-pink overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0da9896c42-46e32d6de31b8ba9ed03.png" alt="Live" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      <i className="fas fa-bell mr-1"></i>
                      856 notificações
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-pink rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">NOV</span>
                      <span className="text-xl text-slate-800 font-bold">20</span>
                      <span className="text-xs text-slate-600">15:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">Fundos</span>
                      <p className="text-xs text-slate-500 mt-1">Duração estimada: 1h</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">FIIs em Alta: Análise Completa</h3>
                  <p className="text-sm text-slate-600 mb-4">Fundos imobiliários com melhor desempenho</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Patricia Oliveira</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Ativar Notificação
                  </button>
                </div>
              </div>

              {/* Upcoming 4 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-peach overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a513b1e75b-99ed197352844b43fc8f.png" alt="Live" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      <i className="fas fa-bell mr-1"></i>
                      623 notificações
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-peach rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">NOV</span>
                      <span className="text-xl text-slate-800 font-bold">22</span>
                      <span className="text-xs text-slate-600">16:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-peach text-slate-700 text-xs rounded-full">Educação</span>
                      <p className="text-xs text-slate-500 mt-1">Duração estimada: 2h</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Como Começar a Investir do Zero</h3>
                  <p className="text-sm text-slate-600 mb-4">Guia completo para iniciantes no mercado</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Marina Costa</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-peach text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Ativar Notificação
                  </button>
                </div>
              </div>

              {/* Upcoming 5 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-green overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4a5f932c82-768ee5a79c92adb47abd.png" alt="Live" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      <i className="fas fa-bell mr-1"></i>
                      1.5k notificações
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-green rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">NOV</span>
                      <span className="text-xl text-slate-800 font-bold">25</span>
                      <span className="text-xs text-slate-600">14:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Ações</span>
                      <p className="text-xs text-slate-500 mt-1">Duração estimada: 1.5h</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Small Caps Promissoras 2025</h3>
                  <p className="text-sm text-slate-600 mb-4">Empresas com potencial de valorização</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Dr. Fernando Alves</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Ativar Notificação
                  </button>
                </div>
              </div>

              {/* Upcoming 6 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-pastel-yellow overflow-hidden relative">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bc3c006ebc-81d26431dd42a47d7715.png" alt="Live" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-slate-700 text-xs font-medium rounded-full">
                      <i className="fas fa-bell mr-1"></i>
                      978 notificações
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-pastel-yellow rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-600 font-medium">NOV</span>
                      <span className="text-xl text-slate-800 font-bold">28</span>
                      <span className="text-xs text-slate-600">19:00</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="px-2 py-1 bg-pastel-yellow text-slate-700 text-xs rounded-full">Internacional</span>
                      <p className="text-xs text-slate-500 mt-1">Duração estimada: 2h</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Investindo em Ações dos EUA</h3>
                  <p className="text-sm text-slate-600 mb-4">Como diversificar globalmente sua carteira</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <i className="fas fa-user-tie"></i>
                    <span>Dr. Roberto Lima</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-pastel-yellow text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Ativar Notificação
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Recorded Lives Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Gravações de Lives Anteriores</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todas</a>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {/* Recorded 1 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-blue overflow-hidden relative group cursor-pointer">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5213464580-c5bc017767ff44227057.png" alt="Gravação" />
                  <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <i className="fas fa-play text-slate-800 ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 bg-slate-900/70 backdrop-blur text-white text-xs rounded">1:42:30</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-pastel-blue text-slate-700 text-xs rounded-full">Renda Fixa</span>
                  <h3 className="font-semibold text-slate-800 mt-2 mb-1 text-sm">CDBs e Tesouro: Melhor Momento</h3>
                  <p className="text-xs text-slate-500 mb-2">3 dias atrás • 5.2k visualizações</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <i className="fas fa-user-circle"></i>
                    <span>Juliana Matos</span>
                  </div>
                </div>
              </div>

              {/* Recorded 2 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-purple overflow-hidden relative group cursor-pointer">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d51e1f0edd-ac69efab786c3927349b.png" alt="Gravação" />
                  <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <i className="fas fa-play text-slate-800 ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 bg-slate-900/70 backdrop-blur text-white text-xs rounded">2:15:45</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-pastel-purple text-slate-700 text-xs rounded-full">Macroeconomia</span>
                  <h3 className="font-semibold text-slate-800 mt-2 mb-1 text-sm">Selic e Inflação: Análise 2025</h3>
                  <p className="text-xs text-slate-500 mb-2">5 dias atrás • 8.4k visualizações</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <i className="fas fa-user-circle"></i>
                    <span>Dr. Roberto Lima</span>
                  </div>
                </div>
              </div>

              {/* Recorded 3 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-pink overflow-hidden relative group cursor-pointer">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0da9896c42-46e32d6de31b8ba9ed03.png" alt="Gravação" />
                  <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <i className="fas fa-play text-slate-800 ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 bg-slate-900/70 backdrop-blur text-white text-xs rounded">1:28:12</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">Compliance</span>
                  <h3 className="font-semibold text-slate-800 mt-2 mb-1 text-sm">LGPD e Open Finance</h3>
                  <p className="text-xs text-slate-500 mb-2">1 semana atrás • 3.8k visualizações</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <i className="fas fa-user-circle"></i>
                    <span>Juliana Matos</span>
                  </div>
                </div>
              </div>

              {/* Recorded 4 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-pastel-green overflow-hidden relative group cursor-pointer">
                  <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4a5f932c82-768ee5a79c92adb47abd.png" alt="Gravação" />
                  <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <i className="fas fa-play text-slate-800 ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 bg-slate-900/70 backdrop-blur text-white text-xs rounded">1:55:20</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Bancos</span>
                  <h3 className="font-semibold text-slate-800 mt-2 mb-1 text-sm">Bancos vs Fintechs: O Futuro</h3>
                  <p className="text-xs text-slate-500 mb-2">1 semana atrás • 6.7k visualizações</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <i className="fas fa-user-circle"></i>
                    <span>Prof. Ricardo Souza</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
