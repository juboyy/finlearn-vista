import { useState } from "react";
import { PlayCircle, Eye, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LiveChatPanel } from "./LiveChatPanel";
import liveRecording1 from "@/assets/live-recording-1.png";
import liveRecording2 from "@/assets/live-recording-2.png";
import liveRecording3 from "@/assets/live-recording-3.png";
import liveRecording4 from "@/assets/live-recording-4.png";

export const LiveContent = () => {
  const [selectedLive, setSelectedLive] = useState<string | null>(null);

  return (
    <>
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
                <div className="absolute top-4 right-4">
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
                  <span className="text-xs text-slate-600 font-medium">AMANHÃ</span>
                  <span className="text-xl text-slate-800 font-bold">15:00</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="px-2 py-1 bg-pastel-pink text-slate-700 text-xs rounded-full">ESG</span>
                  <p className="text-xs text-slate-500 mt-1">Duração estimada: 1h</p>
                </div>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Investimentos Sustentáveis</h3>
              <p className="text-sm text-slate-600 mb-4">ESG e o futuro das finanças</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <i className="fas fa-user-tie"></i>
                <span>Profa. Marina Costa</span>
              </div>
              <button className="w-full px-4 py-2 bg-pastel-pink text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                Ativar Notificação
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Recordings Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Gravações de Lives Anteriores</h2>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todas</a>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              id: 1,
              title: "Mercado de Ações: Oportunidades em Setores",
              date: "01 Dez 2024",
              duration: "1:58:22",
              views: "5.4k",
              image: liveRecording1,
              bgColor: "bg-pastel-blue"
            },
            {
              id: 2,
              title: "Workshop: Construindo Portfólios Sólidos",
              date: "29 Nov 2024",
              duration: "2:12:45",
              views: "3.7k",
              image: liveRecording2,
              bgColor: "bg-pastel-green"
            },
            {
              id: 3,
              title: "Bitcoin e Blockchain: Fundamentos",
              date: "27 Nov 2024",
              duration: "1:35:18",
              views: "4.9k",
              image: liveRecording3,
              bgColor: "bg-pastel-purple"
            },
            {
              id: 4,
              title: "Transformação Digital no Setor Bancário",
              date: "25 Nov 2024",
              duration: "1:42:33",
              views: "2.6k",
              image: liveRecording4,
              bgColor: "bg-pastel-pink"
            }
          ].map((recording) => (
            <div key={recording.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
              <div className={`h-40 ${recording.bgColor} overflow-hidden relative`}>
                <img className="w-full h-full object-cover" src={recording.image} alt={recording.title} />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-slate-900/80 text-white text-xs rounded">
                  {recording.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2">{recording.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{recording.date}</p>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span><i className="fas fa-eye mr-1"></i>{recording.views} views</span>
                  <button className="text-pastel-purple hover:text-pastel-purple/80 font-medium">
                    Assistir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
    </>
  );
};
