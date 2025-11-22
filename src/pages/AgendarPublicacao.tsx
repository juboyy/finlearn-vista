import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Calendar as CalendarIcon, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function AgendarPublicacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const { newsletterId, newsletterTitle } = location.state || {};
  
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleTime, setScheduleTime] = useState("08:00");
  const [selectedContent, setSelectedContent] = useState<number[]>([]);

  const availableContent = [
    {
      id: 1,
      title: "Guia Completo de Compliance Bancário 2024",
      type: "Artigo",
      createdDate: "2024-01-10",
      author: "Maria Silva"
    },
    {
      id: 2,
      title: "Análise de Mercado: Tendências PIX",
      type: "Relatório",
      createdDate: "2024-01-12",
      author: "João Santos"
    },
    {
      id: 3,
      title: "Workshop: Open Finance na Prática",
      type: "Webinar",
      createdDate: "2024-01-08",
      author: "Ana Costa"
    },
    {
      id: 4,
      title: "E-book: Gestão de Risco em Fintechs",
      type: "E-book",
      createdDate: "2024-01-05",
      author: "Pedro Oliveira"
    },
    {
      id: 5,
      title: "Checklist: Conformidade LGPD",
      type: "Documento",
      createdDate: "2024-01-15",
      author: "Carla Souza"
    },
    {
      id: 6,
      title: "Relatório: Tendências Open Banking",
      type: "Relatório",
      createdDate: "2024-01-11",
      author: "Roberto Lima"
    },
    {
      id: 7,
      title: "Guia: Segurança em Pagamentos Digitais",
      type: "Artigo",
      createdDate: "2024-01-09",
      author: "Julia Mendes"
    },
    {
      id: 8,
      title: "Análise: Impacto do PIX no Varejo",
      type: "Relatório",
      createdDate: "2024-01-13",
      author: "Carlos Silva"
    }
  ];

  const handleScheduleSubmit = () => {
    if (!scheduleDate || selectedContent.length === 0) {
      return;
    }
    console.log("Agendamento:", {
      newsletterId,
      date: scheduleDate,
      time: scheduleTime,
      content: selectedContent
    });
    navigate('/criar-newsletter');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/criar-newsletter')}
                  className="w-10 h-10 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center justify-center"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-800">Agendar Nova Publicação</h1>
                  <p className="text-sm text-slate-500 mt-1">
                    {newsletterTitle || "Selecione os conteúdos e defina a data de envio"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Date and Time Selection */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Data e Horário do Envio</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Data de Envio</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !scheduleDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduleDate ? format(scheduleDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={scheduleDate}
                        onSelect={setScheduleDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Horário de Envio</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C5E8D4]"
                  />
                </div>
              </div>
            </div>

            {/* Content Selection */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Conteúdos Disponíveis</h2>
              <p className="text-sm text-slate-500 mb-4">
                Selecione os conteúdos que deseja incluir nesta publicação
              </p>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {availableContent.map((content) => (
                  <div
                    key={content.id}
                    className="p-4 hover:bg-slate-50 transition flex items-start gap-3"
                  >
                    <Checkbox
                      id={`content-${content.id}`}
                      checked={selectedContent.includes(content.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedContent([...selectedContent, content.id]);
                        } else {
                          setSelectedContent(selectedContent.filter(id => id !== content.id));
                        }
                      }}
                      className="mt-1"
                    />
                    <label
                      htmlFor={`content-${content.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-slate-800">{content.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {content.type} • {content.author} • {new Date(content.createdDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <span
                          className="text-xs px-2 py-1 rounded text-slate-700 flex-shrink-0"
                          style={{ backgroundColor: '#E8E0C5' }}
                        >
                          {content.type}
                        </span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            {(selectedContent.length > 0 || scheduleDate) && (
              <div
                className="p-6 rounded-xl border"
                style={{ backgroundColor: '#B8D4E8', borderColor: '#9AB8CC' }}
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText size={20} />
                  Resumo do Agendamento
                </h3>
                <div className="space-y-2 text-sm text-slate-700">
                  {newsletterTitle && (
                    <p>
                      <strong>Newsletter:</strong> {newsletterTitle}
                    </p>
                  )}
                  <p>
                    <strong>Conteúdos selecionados:</strong> {selectedContent.length} {selectedContent.length === 1 ? 'item' : 'itens'}
                  </p>
                  {scheduleDate && (
                    <p>
                      <strong>Data de envio:</strong> {format(scheduleDate, "PPP", { locale: ptBR })} às {scheduleTime}
                    </p>
                  )}
                  {selectedContent.length === 0 && (
                    <p className="text-slate-600 italic">Nenhum conteúdo selecionado ainda</p>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/criar-newsletter')}
                className="px-6"
              >
                Cancelar
              </Button>
              <Button
                disabled={!scheduleDate || selectedContent.length === 0}
                onClick={handleScheduleSubmit}
                className="text-slate-700 hover:opacity-90 px-6"
                style={{ backgroundColor: '#C5E8D4' }}
              >
                <Clock size={16} className="mr-2" />
                Agendar Publicação
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
