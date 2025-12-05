import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Headphones, 
  GraduationCap, 
  Video, 
  BookOpen, 
  FileText, 
  BarChart3, 
  FileSpreadsheet, 
  Newspaper, 
  BookMarked,
  Image,
  FileCheck,
  Presentation,
  Radio,
  MessageSquare,
  Bot,
  Users,
  Mic,
  Film,
  TrendingUp,
  Clock,
  Calendar,
  ChevronRight,
  CalendarIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConsumptionHistorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const contentTypes = [
  { id: 'podcast', name: 'Podcasts', icon: Headphones, consumed: 47, totalTime: '24h 35min', color: 'hsl(var(--pastel-blue))' },
  { id: 'curso', name: 'Cursos', icon: GraduationCap, consumed: 12, totalTime: '86h 20min', color: 'hsl(var(--pastel-purple))' },
  { id: 'webinar', name: 'Webinars', icon: Video, consumed: 23, totalTime: '18h 45min', color: 'hsl(var(--pastel-pink))' },
  { id: 'ebook', name: 'E-books', icon: BookOpen, consumed: 31, totalTime: '45h 10min', color: 'hsl(var(--pastel-green))' },
  { id: 'artigo', name: 'Artigos', icon: FileText, consumed: 156, totalTime: '32h 15min', color: 'hsl(var(--pastel-yellow))' },
  { id: 'analise', name: 'Analises', icon: BarChart3, consumed: 89, totalTime: '28h 40min', color: 'hsl(var(--pastel-blue))' },
  { id: 'relatorio', name: 'Relatorios', icon: FileSpreadsheet, consumed: 34, totalTime: '15h 30min', color: 'hsl(var(--pastel-purple))' },
  { id: 'newspaper', name: 'Newspapers', icon: Newspaper, consumed: 67, totalTime: '12h 55min', color: 'hsl(var(--pastel-pink))' },
  { id: 'estudo', name: 'Estudos Academicos', icon: BookMarked, consumed: 18, totalTime: '42h 10min', color: 'hsl(var(--pastel-green))' },
  { id: 'infografico', name: 'Infograficos', icon: Image, consumed: 45, totalTime: '3h 20min', color: 'hsl(var(--pastel-yellow))' },
  { id: 'whitepaper', name: 'Whitepapers', icon: FileCheck, consumed: 22, totalTime: '38h 45min', color: 'hsl(var(--pastel-blue))' },
  { id: 'apresentacao', name: 'Apresentacoes', icon: Presentation, consumed: 28, totalTime: '8h 15min', color: 'hsl(var(--pastel-purple))' },
  { id: 'live', name: 'Lives', icon: Radio, consumed: 15, totalTime: '22h 30min', color: 'hsl(var(--pastel-pink))' },
  { id: 'entrevista', name: 'Entrevistas', icon: MessageSquare, consumed: 36, totalTime: '14h 50min', color: 'hsl(var(--pastel-green))' },
  { id: 'avatar', name: 'Avatar IA', icon: Bot, consumed: 52, totalTime: '6h 40min', color: 'hsl(var(--pastel-yellow))' },
  { id: 'comunidade', name: 'Comunidades', icon: Users, consumed: 8, totalTime: '45h 20min', color: 'hsl(var(--pastel-blue))' },
  { id: 'audio', name: 'Audios', icon: Mic, consumed: 29, totalTime: '9h 15min', color: 'hsl(var(--pastel-purple))' },
  { id: 'video', name: 'Videos', icon: Film, consumed: 41, totalTime: '35h 40min', color: 'hsl(var(--pastel-pink))' },
  { id: 'newsletter', name: 'Newsletters', icon: FileText, consumed: 78, totalTime: '5h 30min', color: 'hsl(var(--pastel-green))' },
  { id: 'template', name: 'Templates', icon: FileSpreadsheet, consumed: 19, totalTime: '2h 10min', color: 'hsl(var(--pastel-yellow))' },
  { id: 'planilha', name: 'Planilhas', icon: FileSpreadsheet, consumed: 14, totalTime: '4h 25min', color: 'hsl(var(--pastel-blue))' },
  { id: 'grafico', name: 'Graficos', icon: TrendingUp, consumed: 63, totalTime: '1h 45min', color: 'hsl(var(--pastel-purple))' },
];

const timelineEvents = [
  { date: '05 Dez 2024', time: '14:32', type: 'Podcast', title: 'Tendencias Financeiras 2025', duration: '45min' },
  { date: '05 Dez 2024', time: '11:15', type: 'Artigo', title: 'Analise de Mercado Q4', duration: '12min' },
  { date: '04 Dez 2024', time: '16:48', type: 'Curso', title: 'Gestao de Riscos Avancada', duration: '2h 30min' },
  { date: '04 Dez 2024', time: '09:20', type: 'E-book', title: 'Open Finance no Brasil', duration: '1h 15min' },
  { date: '03 Dez 2024', time: '15:05', type: 'Webinar', title: 'PIX e Pagamentos Instantaneos', duration: '1h 00min' },
  { date: '03 Dez 2024', time: '10:30', type: 'Analise', title: 'Balanco Setorial Bancario', duration: '25min' },
  { date: '02 Dez 2024', time: '17:22', type: 'Live', title: 'Debate sobre Regulacao BACEN', duration: '1h 45min' },
  { date: '02 Dez 2024', time: '08:45', type: 'Newsletter', title: 'Resumo Semanal de Mercado', duration: '8min' },
];

export function ConsumptionHistorySheet({ open, onOpenChange }: ConsumptionHistorySheetProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const totalConsumed = contentTypes.reduce((acc, type) => acc + type.consumed, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0 bg-slate-50">
        <SheetHeader className="p-6 bg-white border-b border-slate-200">
          <SheetTitle className="text-xl font-semibold text-slate-800">Historico de Consumo</SheetTitle>
          <p className="text-sm text-slate-500">Acompanhe seu consumo em todos os tipos de conteudo</p>
          
          {/* Filtro de Data */}
          <div className="flex items-center gap-3 mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[160px] justify-start text-left font-normal text-sm",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Data inicial"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <span className="text-slate-400">ate</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[160px] justify-start text-left font-normal text-sm",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Data final"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {(startDate || endDate) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => { setStartDate(undefined); setEndDate(undefined); }}
                className="text-slate-500 text-xs"
              >
                Limpar
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Resumo Geral */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Resumo Geral</h3>
                <Badge variant="secondary" className="bg-[hsl(var(--pastel-green)/0.3)] text-slate-700">
                  {totalConsumed} itens consumidos
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.3)' }}>
                  <p className="text-2xl font-bold text-slate-800">{totalConsumed}</p>
                  <p className="text-xs text-slate-600">Total Consumido</p>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.3)' }}>
                  <p className="text-2xl font-bold text-slate-800">482h</p>
                  <p className="text-xs text-slate-600">Tempo Total</p>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.3)' }}>
                  <p className="text-2xl font-bold text-slate-800">22</p>
                  <p className="text-xs text-slate-600">Tipos de Conteudo</p>
                </div>
              </div>
            </div>

            {/* Consumo por Tipo */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4">Consumo por Tipo de Conteudo</h3>
              <div className="space-y-2">
                {contentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <div 
                      key={type.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                      onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: type.color }}
                        >
                          <IconComponent className="w-4 h-4 text-slate-700" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{type.name}</p>
                          <p className="text-xs text-slate-500">{type.totalTime} de consumo</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 text-xs">
                          {type.consumed} itens
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Linha do Tempo */}
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-slate-600" />
                <h3 className="font-semibold text-slate-800">Linha do Tempo de Consumo</h3>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="relative pl-10">
                      <div 
                        className="absolute left-2 top-2 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                        style={{ backgroundColor: 'hsl(var(--pastel-blue))' }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500">{event.date} - {event.time}</span>
                          </div>
                          <Badge variant="secondary" className="bg-[hsl(var(--pastel-purple)/0.3)] text-slate-700 text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="font-medium text-slate-800 text-sm">{event.title}</p>
                        <p className="text-xs text-slate-500 mt-1">Duracao: {event.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
