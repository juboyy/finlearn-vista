import { useState, useRef, useMemo } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Filter, Download, CalendarCheck, Award, Clock, Wallet, Search, MapPin, User, CheckCircle, Utensils, Video, FileText, Play, Images, Network, Gift, Star, ChevronDown, Ticket, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ebookCompliance from "@/assets/ebook-compliance.png";
import ebookDerivatives from "@/assets/ebook-derivatives.png";
import eventoWorkshopPagamentos from "@/assets/evento-workshop-pagamentos.png";
import ebookMercadoCapitais from "@/assets/ebook-mercado-capitais.png";
import ebookGestaoRiscos from "@/assets/ebook-gestao-riscos.png";
import eventoConferenciaFintech from "@/assets/evento-conferencia-fintech.png";
import ebookOpenFinance from "@/assets/ebook-open-finance.png";
import eventoTreinamentoRisco from "@/assets/evento-treinamento-risco.png";

interface Certificate {
  title: string;
  date: string;
  image: string;
  id: string;
}

export default function HistoricoIngressos() {
  const navigate = useNavigate();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const verificationUrl = useMemo(() => {
    if (!selectedCertificate) return "";
    return `https://finlearn.com.br/verificar/${selectedCertificate.id}`;
  }, [selectedCertificate]);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current || !selectedCertificate) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`certificado-${selectedCertificate.title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header fixo no topo - padrão do sistema */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/meus-ingressos')}
                className="text-foreground hover:text-foreground/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Histórico de Ingressos</h1>
                <p className="text-sm text-muted-foreground mt-1">Visualize todos os eventos que você participou e seus certificados</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filtrar
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Exportar PDF
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Total de Eventos</span>
                  <CalendarCheck className="text-pastel-purple w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">27</p>
                <span className="text-xs text-slate-400">Desde 2022</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Certificados</span>
                  <Award className="text-pastel-blue w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">23</p>
                <span className="text-xs text-slate-400">Disponíveis</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Horas Totais</span>
                  <Clock className="text-pastel-green w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">142h</p>
                <span className="text-xs text-slate-400">De participação</span>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 text-sm">Investimento</span>
                  <Wallet className="text-pastel-yellow w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">R$ 8.450</p>
                <span className="text-xs text-slate-400">Em capacitação</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar eventos..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200">
                <option>Todos os anos</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200">
                <option>Todos os tipos</option>
                <option>Conferência</option>
                <option>Workshop</option>
                <option>Seminário</option>
                <option>Fórum</option>
              </select>
            </div>
          </div>

          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">2024</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            {/* Ticket History 1 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-20 bg-pastel-pink/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-3xl font-bold text-slate-700">15</span>
                  <span className="text-xs text-slate-500 uppercase">Nov</span>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-pastel-pink text-slate-700 text-xs font-semibold rounded-md">Seminário</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Presencial</span>
                        <span className="text-xs text-slate-400">Pedido #848902</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Regulação do Mercado Financeiro 2024</h3>
                      <p className="text-sm text-slate-600 mb-3">Análise das novas diretrizes regulatórias e impactos no setor financeiro brasileiro.</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Hotel Maksoud Plaza</p>
                            <p className="text-xs text-slate-500">São Paulo, SP</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">09:00 - 18:00</p>
                            <p className="text-xs text-slate-500">8 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Ingresso VIP</p>
                            <p className="text-xs text-slate-500">R$ 850,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <User className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-500 w-4 h-4" />
                          <span className="text-sm text-slate-600">Check-in realizado às 08:47</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Utensils className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Coffee break e almoço inclusos</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition flex items-center gap-2 whitespace-nowrap">
                        <Award className="w-4 h-4" /> Certificado
                      </button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2">
                        <Download className="w-4 h-4" /> Baixar
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500">Palestrantes:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-6 h-6 rounded-full object-cover" alt="speaker" />
                          <span className="text-slate-700 font-medium">Dr. Carlos Mendes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-6 h-6 rounded-full object-cover" alt="speaker" />
                          <span className="text-slate-700 font-medium">Dra. Ana Paula Silva</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="text-slate-400 w-4 h-4" />
                        <span className="text-slate-600">245 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket History 2 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-20 bg-pastel-peach/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-3xl font-bold text-slate-700">02</span>
                  <span className="text-xs text-slate-500 uppercase">Nov</span>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-pastel-peach text-slate-700 text-xs font-semibold rounded-md">Workshop</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Online</span>
                        <span className="text-xs text-slate-400">Pedido #847651</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Workshop Avançado: Derivativos Financeiros</h3>
                      <p className="text-sm text-slate-600 mb-3">Estratégias práticas para operações com derivativos no mercado brasileiro.</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Video className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Plataforma Online</p>
                            <p className="text-xs text-slate-500">Zoom Meeting</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">14:00 - 18:00</p>
                            <p className="text-xs text-slate-500">4 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Ingresso Padrão</p>
                            <p className="text-xs text-slate-500">R$ 420,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <User className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-500 w-4 h-4" />
                          <span className="text-sm text-slate-600">Presença confirmada (100%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Material didático disponível</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition flex items-center gap-2 whitespace-nowrap">
                        <Award className="w-4 h-4" /> Certificado
                      </button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2">
                        <Play className="w-4 h-4" /> Gravação
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500">Instrutor:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-6 h-6 rounded-full object-cover" alt="instructor" />
                          <span className="text-slate-700 font-medium">Prof. Ricardo Almeida</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="text-slate-400 w-4 h-4" />
                        <span className="text-slate-600">87 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket History 3 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-20 bg-pastel-blue/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-3xl font-bold text-slate-700">20</span>
                  <span className="text-xs text-slate-500 uppercase">Out</span>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-pastel-blue text-slate-700 text-xs font-semibold rounded-md">Fórum</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Presencial</span>
                        <span className="text-xs text-slate-400">Pedido #845320</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Fórum Nacional de Meios de Pagamento</h3>
                      <p className="text-sm text-slate-600 mb-3">Discussões sobre inovação, Pix e tendências do setor de pagamentos no Brasil.</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Centro de Convenções</p>
                            <p className="text-xs text-slate-500">Rio de Janeiro, RJ</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">08:00 - 19:00</p>
                            <p className="text-xs text-slate-500">11 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Ingresso Premium</p>
                            <p className="text-xs text-slate-500">R$ 1.200,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <User className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-500 w-4 h-4" />
                          <span className="text-sm text-slate-600">Check-in realizado às 07:52</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gift className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Kit premium recebido</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition flex items-center gap-2 whitespace-nowrap">
                        <Award className="w-4 h-4" /> Certificado
                      </button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2">
                        <Images className="w-4 h-4" /> Fotos
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500">Painelistas:</span>
                        <div className="flex -space-x-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" className="w-6 h-6 rounded-full object-cover border-2 border-white" alt="panelist" />
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" className="w-6 h-6 rounded-full object-cover border-2 border-white" alt="panelist" />
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" className="w-6 h-6 rounded-full object-cover border-2 border-white" alt="panelist" />
                          <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-medium">+5</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="text-slate-400 w-4 h-4" />
                        <span className="text-slate-600">482 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 my-8">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">2023</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            {/* Ticket History 4 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-20 bg-pastel-green/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-3xl font-bold text-slate-700">08</span>
                  <span className="text-xs text-slate-500 uppercase">Dez</span>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-pastel-green text-slate-700 text-xs font-semibold rounded-md">Conferência</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Híbrido</span>
                        <span className="text-xs text-slate-400">Pedido #832145</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Summit de Investimentos 2023</h3>
                      <p className="text-sm text-slate-600 mb-3">Estratégias de investimento e análise de cenários econômicos para 2024.</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">WTC São Paulo</p>
                            <p className="text-xs text-slate-500">São Paulo, SP</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">08:30 - 17:30</p>
                            <p className="text-xs text-slate-500">9 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Ingresso Executivo</p>
                            <p className="text-xs text-slate-500">R$ 950,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <User className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-500 w-4 h-4" />
                          <span className="text-sm text-slate-600">Presença confirmada</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Network className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">15 conexões realizadas</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition flex items-center gap-2 whitespace-nowrap">
                        <Award className="w-4 h-4" /> Certificado
                      </button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2">
                        <Download className="w-4 h-4" /> Material
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500">Keynote Speakers:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" className="w-6 h-6 rounded-full object-cover" alt="speaker" />
                          <span className="text-slate-700 font-medium">Dra. Mariana Costa</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="text-slate-400 w-4 h-4" />
                        <span className="text-slate-600">356 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket History 5 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="flex">
                <div className="w-20 bg-pastel-purple/30 flex flex-col items-center justify-center border-r border-slate-100 flex-shrink-0">
                  <span className="text-3xl font-bold text-slate-700">22</span>
                  <span className="text-xs text-slate-500 uppercase">Set</span>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-pastel-purple text-slate-700 text-xs font-semibold rounded-md">Masterclass</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">Online</span>
                        <span className="text-xs text-slate-400">Pedido #828764</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Masterclass: Compliance e Gestão de Riscos</h3>
                      <p className="text-sm text-slate-600 mb-3">Frameworks modernos para gestão de compliance no mercado financeiro.</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Video className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Transmissão Online</p>
                            <p className="text-xs text-slate-500">Microsoft Teams</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">19:00 - 22:00</p>
                            <p className="text-xs text-slate-500">3 horas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="text-slate-400 w-4 h-4" />
                          <div>
                            <p className="text-sm font-medium text-slate-700">Ingresso Premium</p>
                            <p className="text-xs text-slate-500">R$ 380,00</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <User className="text-slate-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Titular: João Silva</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-500 w-4 h-4" />
                          <span className="text-sm text-slate-600">Participação completa</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="text-amber-400 w-4 h-4" />
                          <span className="text-sm text-slate-600">Avaliação: 5.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition flex items-center gap-2 whitespace-nowrap">
                        <Award className="w-4 h-4" /> Certificado
                      </button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition flex items-center gap-2">
                        <Play className="w-4 h-4" /> Replay
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500">Instrutor:</span>
                        <div className="flex items-center gap-2">
                          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-6 h-6 rounded-full object-cover" alt="instructor" />
                          <span className="text-slate-700 font-medium">Prof. Eduardo Santos</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="text-slate-400 w-4 h-4" />
                        <span className="text-slate-600">124 participantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-center">
            <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition font-medium flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Carregar mais eventos
            </button>
          </div>

          <section className="mt-12 bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Seus Certificados</h2>
                <p className="text-slate-600">Acesse e baixe todos os seus certificados de participação</p>
              </div>
              <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition flex items-center gap-2">
                <Download className="w-4 h-4" /> Baixar Todos
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Regulação do Mercado Financeiro", date: "15 Nov 2024", image: ebookCompliance, id: "CERT-2024-RMF7X9K2L" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={ebookCompliance} 
                    alt="Certificado Regulação do Mercado" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Regulação do Mercado Financeiro</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">15 Nov 2024</p>
              </div>
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Workshop Derivativos", date: "02 Nov 2024", image: ebookDerivatives, id: "CERT-2024-WD3M8N5P" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={ebookDerivatives} 
                    alt="Certificado Derivativos Financeiros" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Workshop Derivativos</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">02 Nov 2024</p>
              </div>
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Fórum de Meios de Pagamento", date: "20 Out 2024", image: eventoWorkshopPagamentos, id: "CERT-2024-FMP4R6T9" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={eventoWorkshopPagamentos} 
                    alt="Certificado Fórum de Pagamentos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Fórum de Meios de Pagamento</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">20 Out 2024</p>
              </div>
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Summit de Investimentos", date: "08 Dez 2023", image: ebookMercadoCapitais, id: "CERT-2023-SI2K7J4H" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={ebookMercadoCapitais} 
                    alt="Certificado Summit de Investimentos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Summit de Investimentos</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">08 Dez 2023</p>
              </div>
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Compliance e Gestão de Riscos", date: "22 Set 2023", image: ebookGestaoRiscos, id: "CERT-2023-CGR9L1M5" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={ebookGestaoRiscos} 
                    alt="Certificado Compliance" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Compliance e Gestão de Riscos</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">22 Set 2023</p>
              </div>
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Fintech Brasil Conference", date: "15 Jun 2023", image: eventoConferenciaFintech, id: "CERT-2023-FBC6P3Q8" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={eventoConferenciaFintech} 
                    alt="Certificado Fintech Conference" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Fintech Brasil Conference</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">15 Jun 2023</p>
              </div>
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Open Finance Brasil", date: "03 Mai 2023", image: ebookOpenFinance, id: "CERT-2023-OFB1W5V2" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={ebookOpenFinance} 
                    alt="Certificado Open Finance" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Open Finance Brasil</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">03 Mai 2023</p>
              </div>
              <div className="group cursor-pointer" onClick={() => setSelectedCertificate({ title: "Gestão de Risco Operacional", date: "18 Mar 2023", image: eventoTreinamentoRisco, id: "CERT-2023-GRO4Z8Y6" })}>
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition mb-3 aspect-[3/4] relative">
                  <img 
                    src={eventoTreinamentoRisco} 
                    alt="Certificado Gestão de Risco" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-xs text-white font-medium">Gestão de Risco Operacional</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 text-center font-medium">18 Mar 2023</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Certificate Popup */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-5">
            <button 
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-200 transition z-10"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
            
            {/* Certificate Design */}
            <div ref={certificateRef} className="bg-white border-4 border-double border-slate-300 rounded-lg p-5 shadow-lg">
              {/* Header */}
              <div className="text-center border-b-2 border-slate-200 pb-4 mb-4">
                <div className="flex justify-center mb-3">
                  <Award className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-xl font-serif font-bold text-slate-800 mb-1">Certificado de Conclusão</h2>
                <p className="text-slate-500 text-xs uppercase tracking-widest">FinLearn Platform</p>
              </div>

              {/* Body */}
              <div className="text-center py-4">
                <p className="text-slate-600 text-sm mb-2">Certificamos que</p>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Maria Silva Santos</h3>
                <p className="text-slate-600 text-sm mb-3">concluiu com êxito o programa</p>
                <h4 className="text-base font-semibold text-slate-800 mb-3 px-4">
                  {selectedCertificate?.title}
                </h4>
                <p className="text-slate-500 text-xs">
                  com carga horária de 40 horas, demonstrando aproveitamento satisfatório em todas as atividades propostas.
                </p>
              </div>

              {/* Footer with QR Code */}
              <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                  <div className="w-24 border-t border-slate-400 mb-1"></div>
                  <p className="text-[10px] text-slate-500">Data de Emissão</p>
                  <p className="text-xs font-medium text-slate-700">{selectedCertificate?.date}</p>
                </div>
                
                {/* QR Code for Verification */}
                <div className="text-center">
                  <div className="bg-white p-1.5 rounded-lg border border-slate-200 mb-1 flex items-center justify-center">
                    <QRCodeSVG 
                      value={verificationUrl} 
                      size={56}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">Escaneie para verificar</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 border-t border-slate-400 mb-1"></div>
                  <p className="text-[10px] text-slate-500">Assinatura</p>
                  <p className="text-xs font-medium text-slate-700 font-serif italic">Dr. Carlos Mendes</p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="mt-4 text-center">
                <p className="text-[10px] text-slate-400">
                  ID: {selectedCertificate?.id}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-sm"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isDownloading ? "Gerando..." : "Baixar PDF"}
              </Button>
              <Button className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 text-white">
                <Award className="w-4 h-4 text-white" /> Compartilhar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
