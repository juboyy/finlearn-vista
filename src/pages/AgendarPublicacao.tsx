import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Calendar as CalendarIcon, Clock, FileText, Folder } from "lucide-react";
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
  const [selectedFolder, setSelectedFolder] = useState<string>("all");

  const folders = [
    { id: "all", name: "Todos os Materiais", count: 8, color: "#B8D4E8" },
    { id: "compliance", name: "Compliance", count: 3, color: "#C5E8D4" },
    { id: "market", name: "Análise de Mercado", count: 2, color: "#D4C5E8" },
    { id: "reports", name: "Relatórios", count: 3, color: "#E8E0C5" },
    { id: "guides", name: "Guias e Checklists", count: 2, color: "#E8C5D4" }
  ];

  const availableContent = [
    {
      id: 1,
      title: "Guia Completo de Compliance Bancário 2024",
      type: "Artigo",
      createdDate: "2024-01-10",
      author: "Maria Silva",
      folder: "compliance"
    },
    {
      id: 2,
      title: "Análise de Mercado: Tendências PIX",
      type: "Relatório",
      createdDate: "2024-01-12",
      author: "João Santos",
      folder: "market"
    },
    {
      id: 3,
      title: "Workshop: Open Finance na Prática",
      type: "Webinar",
      createdDate: "2024-01-08",
      author: "Ana Costa",
      folder: "market"
    },
    {
      id: 4,
      title: "E-book: Gestão de Risco em Fintechs",
      type: "E-book",
      createdDate: "2024-01-05",
      author: "Pedro Oliveira",
      folder: "compliance"
    },
    {
      id: 5,
      title: "Checklist: Conformidade LGPD",
      type: "Documento",
      createdDate: "2024-01-15",
      author: "Carla Souza",
      folder: "guides"
    },
    {
      id: 6,
      title: "Relatório: Tendências Open Banking",
      type: "Relatório",
      createdDate: "2024-01-11",
      author: "Roberto Lima",
      folder: "reports"
    },
    {
      id: 7,
      title: "Guia: Segurança em Pagamentos Digitais",
      type: "Artigo",
      createdDate: "2024-01-09",
      author: "Julia Mendes",
      folder: "guides"
    },
    {
      id: 8,
      title: "Análise: Impacto do PIX no Varejo",
      type: "Relatório",
      createdDate: "2024-01-13",
      author: "Carlos Silva",
      folder: "reports"
    },
    {
      id: 9,
      title: "Regulamentação BACEN 2024",
      type: "Artigo",
      createdDate: "2024-01-14",
      author: "Fernando Costa",
      folder: "compliance"
    },
    {
      id: 10,
      title: "Dashboard: Métricas Financeiras",
      type: "Relatório",
      createdDate: "2024-01-07",
      author: "Patricia Lima",
      folder: "reports"
    }
  ];

  const filteredContent = selectedFolder === "all" 
    ? availableContent 
    : availableContent.filter(content => content.folder === selectedFolder);

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

        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="col-span-9 space-y-6">
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
                Selecione os conteúdos que deseja incluir nesta publicação ({filteredContent.length} {filteredContent.length === 1 ? 'item' : 'itens'})
              </p>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {filteredContent.map((content) => (
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
              {filteredContent.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <Folder size={48} className="mx-auto mb-2 text-slate-300" />
                  <p>Nenhum conteúdo nesta pasta</p>
                </div>
              )}
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

          {/* Right Sidebar - Folders */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Pastas</h2>
              <div className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center gap-3 ${
                      selectedFolder === folder.id
                        ? 'text-slate-800'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                    style={selectedFolder === folder.id ? { backgroundColor: folder.color } : {}}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: selectedFolder === folder.id ? 'rgba(255,255,255,0.5)' : folder.color 
                      }}
                    >
                      <Folder size={16} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{folder.name}</p>
                      <p className="text-xs opacity-70">{folder.count} {folder.count === 1 ? 'item' : 'itens'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
