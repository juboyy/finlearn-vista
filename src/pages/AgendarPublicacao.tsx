import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Calendar as CalendarIcon, Clock, FileText, Folder, Filter, X, Video, Mic, FileBarChart, BookOpen, MonitorPlay, File, CreditCard, Zap, Bitcoin, Scale, Smartphone, ShieldCheck, Calculator, Laptop, Settings, Megaphone, User, ChevronDown, Mail, MessageSquare, MessageCircle, Image, Hash, Send, DollarSign, Gift, Eye, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";
import ebookRiskManagement from "@/assets/ebook-risk-management-pink.png";
import creditoRural from "@/assets/credito-rural-2025.png";
import newspaperRiskManagement from "@/assets/newspaper-risk-management.png";
import newspaperOpenFinance from "@/assets/newspaper-open-finance.png";
import relatorioAnalise from "@/assets/relatorio-analise-dados.png";
import relatorioBi from "@/assets/relatorio-bi-dashboard.png";
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
  const {
    newsletterId,
    newsletterTitle
  } = location.state || {};
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleTime, setScheduleTime] = useState("08:00");
  const [selectedContent, setSelectedContent] = useState<number[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["email"]);
  const [showPreview, setShowPreview] = useState(false);
  const deliveryChannels = [{
    id: "email",
    label: "Email",
    icon: Mail,
    color: "#B8D4E8"
  }, {
    id: "sms",
    label: "SMS",
    icon: MessageSquare,
    color: "#C5E8D4"
  }, {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    color: "#D4C5E8"
  }, {
    id: "rcs",
    label: "RCS",
    icon: Smartphone,
    color: "#E8E0C5"
  }, {
    id: "mms",
    label: "MMS",
    icon: Image,
    color: "#E8C5D4"
  }, {
    id: "slack",
    label: "Slack",
    icon: Hash,
    color: "#D4B8E8"
  }, {
    id: "telegram",
    label: "Telegram",
    icon: Send,
    color: "#B8E8E0"
  }];
  const folders = [{
    id: "all",
    name: "Todos os Materiais",
    count: 8,
    color: "#B8D4E8"
  }, {
    id: "compliance",
    name: "Compliance",
    count: 3,
    color: "#C5E8D4"
  }, {
    id: "market",
    name: "Análise de Mercado",
    count: 2,
    color: "#D4C5E8"
  }, {
    id: "reports",
    name: "Relatórios",
    count: 3,
    color: "#E8E0C5"
  }, {
    id: "guides",
    name: "Guias e Checklists",
    count: 2,
    color: "#E8C5D4"
  }];
  const contentTypes = [{
    value: "all",
    label: "Todos os Tipos",
    icon: Filter
  }, {
    value: "Artigo",
    label: "Artigo",
    icon: FileText
  }, {
    value: "Vídeo",
    label: "Vídeo",
    icon: Video
  }, {
    value: "Podcast",
    label: "Podcast",
    icon: Mic
  }, {
    value: "Relatório",
    label: "Relatório",
    icon: FileBarChart
  }, {
    value: "E-book",
    label: "E-book",
    icon: BookOpen
  }, {
    value: "Webinar",
    label: "Webinar",
    icon: MonitorPlay
  }, {
    value: "Documento",
    label: "Documento",
    icon: File
  }];
  const themes = [{
    value: "all",
    label: "Todos os Temas",
    icon: Filter
  }, {
    value: "open-banking",
    label: "Open Banking",
    icon: CreditCard
  }, {
    value: "pix",
    label: "PIX",
    icon: Zap
  }, {
    value: "criptomoedas",
    label: "Criptomoedas",
    icon: Bitcoin
  }, {
    value: "regulacao",
    label: "Regulação",
    icon: Scale
  }, {
    value: "fintechs",
    label: "Fintechs",
    icon: Smartphone
  }, {
    value: "gestao-risco",
    label: "Gestão de Risco",
    icon: ShieldCheck
  }];
  const areas = [{
    value: "all",
    label: "Todas as Áreas",
    icon: Filter
  }, {
    value: "contabilidade",
    label: "Contabilidade",
    icon: Calculator
  }, {
    value: "juridico",
    label: "Jurídico",
    icon: Scale
  }, {
    value: "compliance",
    label: "Compliance",
    icon: ShieldCheck
  }, {
    value: "tecnologia",
    label: "Tecnologia",
    icon: Laptop
  }, {
    value: "operacoes",
    label: "Operações",
    icon: Settings
  }, {
    value: "marketing",
    label: "Marketing",
    icon: Megaphone
  }];
  const authors = [{
    value: "all",
    label: "Todos os Autores",
    icon: Filter
  }, {
    value: "maria-silva",
    label: "Maria Silva",
    icon: User
  }, {
    value: "joao-santos",
    label: "João Santos",
    icon: User
  }, {
    value: "ana-costa",
    label: "Ana Costa",
    icon: User
  }, {
    value: "pedro-oliveira",
    label: "Pedro Oliveira",
    icon: User
  }, {
    value: "carla-souza",
    label: "Carla Souza",
    icon: User
  }, {
    value: "roberto-lima",
    label: "Roberto Lima",
    icon: User
  }];
  const availableContent = [{
    id: 1,
    title: "Guia Completo de Compliance Bancário 2024",
    type: "Artigo",
    createdDate: "2024-01-10",
    author: "Maria Silva",
    authorId: "maria-silva",
    folder: "compliance",
    theme: "regulacao",
    area: "compliance",
    isPaid: false
  }, {
    id: 2,
    title: "Análise de Mercado: Tendências PIX",
    type: "Relatório",
    createdDate: "2024-01-12",
    author: "João Santos",
    authorId: "joao-santos",
    folder: "market",
    theme: "pix",
    area: "operacoes",
    isPaid: true
  }, {
    id: 3,
    title: "Workshop: Open Finance na Prática",
    type: "Webinar",
    createdDate: "2024-01-08",
    author: "Ana Costa",
    authorId: "ana-costa",
    folder: "market",
    theme: "open-banking",
    area: "tecnologia",
    isPaid: true
  }, {
    id: 4,
    title: "E-book: Gestão de Risco em Fintechs",
    type: "E-book",
    createdDate: "2024-01-05",
    author: "Pedro Oliveira",
    authorId: "pedro-oliveira",
    folder: "compliance",
    theme: "gestao-risco",
    area: "compliance",
    isPaid: true
  }, {
    id: 5,
    title: "Checklist: Conformidade LGPD",
    type: "Documento",
    createdDate: "2024-01-15",
    author: "Carla Souza",
    authorId: "carla-souza",
    folder: "guides",
    theme: "regulacao",
    area: "juridico",
    isPaid: false
  }, {
    id: 6,
    title: "Relatório: Tendências Open Banking",
    type: "Relatório",
    createdDate: "2024-01-11",
    author: "Roberto Lima",
    authorId: "roberto-lima",
    folder: "reports",
    theme: "open-banking",
    area: "tecnologia",
    isPaid: true
  }, {
    id: 7,
    title: "Guia: Segurança em Pagamentos Digitais",
    type: "Artigo",
    createdDate: "2024-01-09",
    author: "Julia Mendes",
    authorId: "julia-mendes",
    folder: "guides",
    theme: "fintechs",
    area: "tecnologia",
    isPaid: false
  }, {
    id: 8,
    title: "Análise: Impacto do PIX no Varejo",
    type: "Relatório",
    createdDate: "2024-01-13",
    author: "Carlos Silva",
    authorId: "carlos-silva",
    folder: "reports",
    theme: "pix",
    area: "operacoes",
    isPaid: true
  }, {
    id: 9,
    title: "Regulamentação BACEN 2024",
    type: "Artigo",
    createdDate: "2024-01-14",
    author: "Fernando Costa",
    authorId: "fernando-costa",
    folder: "compliance",
    theme: "regulacao",
    area: "juridico",
    isPaid: false
  }, {
    id: 10,
    title: "Dashboard: Métricas Financeiras",
    type: "Relatório",
    createdDate: "2024-01-07",
    author: "Patricia Lima",
    authorId: "patricia-lima",
    folder: "reports",
    theme: "gestao-risco",
    area: "contabilidade",
    isPaid: true
  }, {
    id: 11,
    title: "Vídeo: Introdução ao Open Banking",
    type: "Vídeo",
    createdDate: "2024-01-16",
    author: "Ana Costa",
    authorId: "ana-costa",
    folder: "market",
    theme: "open-banking",
    area: "marketing",
    isPaid: false
  }, {
    id: 12,
    title: "Podcast: O Futuro das Criptomoedas",
    type: "Podcast",
    createdDate: "2024-01-06",
    author: "João Santos",
    authorId: "joao-santos",
    folder: "market",
    theme: "criptomoedas",
    area: "tecnologia",
    isPaid: true
  }];
  const filteredContent = availableContent.filter(content => {
    const matchesFolder = selectedFolder === "all" || content.folder === selectedFolder;
    const matchesType = selectedType === "all" || content.type === selectedType;
    const matchesTheme = selectedTheme === "all" || content.theme === selectedTheme;
    const matchesArea = selectedArea === "all" || content.area === selectedArea;
    const matchesAuthor = selectedAuthor === "all" || content.authorId === selectedAuthor;
    return matchesFolder && matchesType && matchesTheme && matchesArea && matchesAuthor;
  });
  const activeFiltersCount = [selectedType, selectedTheme, selectedArea, selectedAuthor].filter(f => f !== "all").length;
  const clearAllFilters = () => {
    setSelectedType("all");
    setSelectedTheme("all");
    setSelectedArea("all");
    setSelectedAuthor("all");
  };
  const handleScheduleSubmit = () => {
    if (!scheduleDate || selectedContent.length === 0 || selectedChannels.length === 0) {
      return;
    }
    console.log("Agendamento:", {
      newsletterId,
      date: scheduleDate,
      time: scheduleTime,
      content: selectedContent,
      channels: selectedChannels
    });
    navigate('/criar-newsletter');
  };

  // Função para pegar imagem baseada no ID do conteúdo
  const getContentImage = (contentId: number) => {
    const images = [ebookRiskManagement, creditoRural, newspaperRiskManagement, newspaperOpenFinance, relatorioAnalise, relatorioBi];
    return images[contentId % images.length];
  };
  return <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('/criar-newsletter')} className="w-10 h-10 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center justify-center">
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
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !scheduleDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduleDate ? format(scheduleDate, "PPP", {
                          locale: ptBR
                        }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={scheduleDate} onSelect={setScheduleDate} disabled={date => date < new Date()} initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Horário de Envio</label>
                  <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C5E8D4]" />
                </div>
              </div>
            </div>

            {/* Delivery Channels Selection */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Permissão de Canais de Envio</h2>
                  <p className="text-sm text-slate-500 mt-1">Selecione os canais pelos quais permite enviar o conteúdo</p>
                </div>
                <button onClick={() => setShowPreview(true)} className="px-4 py-2 text-slate-700 rounded-lg hover:opacity-90 transition text-sm flex items-center gap-2" style={{
                  backgroundColor: '#D4C5E8'
                }}>
                  <Eye size={16} />
                  Preview
                </button>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {deliveryChannels.map(channel => {
                  const Icon = channel.icon;
                  const isSelected = selectedChannels.includes(channel.id);
                  return <button key={channel.id} onClick={() => {
                    if (isSelected) {
                      setSelectedChannels(selectedChannels.filter(id => id !== channel.id));
                    } else {
                      setSelectedChannels([...selectedChannels, channel.id]);
                    }
                  }} className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${isSelected ? 'border-slate-400 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`} style={isSelected ? {
                    backgroundColor: channel.color
                  } : {}}>
                      <Icon size={24} className={isSelected ? 'text-slate-700' : 'text-slate-400'} />
                      <span className={`text-sm font-medium ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                        {channel.label}
                      </span>
                    </button>;
                })}
              </div>
              {selectedChannels.length === 0 && <p className="text-sm text-orange-600 mt-3">Selecione pelo menos um canal de envio</p>}
            </div>

            {/* Content Selection */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Conteúdos Disponíveis</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {filteredContent.length} {filteredContent.length === 1 ? 'item disponível' : 'itens disponíveis'}
                  </p>
                </div>
                {activeFiltersCount > 0 && <button onClick={clearAllFilters} className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <X size={14} />
                    Limpar Filtros ({activeFiltersCount})
                  </button>}
              </div>

              {/* Filters */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Tipo de Conteúdo</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map(type => {
                        const Icon = type.icon;
                        return <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <Icon size={16} className="text-slate-500" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Tema do Mercado</label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map(theme => {
                        const Icon = theme.icon;
                        return <SelectItem key={theme.value} value={theme.value}>
                            <div className="flex items-center gap-2">
                              <Icon size={16} className="text-slate-500" />
                              <span>{theme.label}</span>
                            </div>
                          </SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Área</label>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map(area => {
                        const Icon = area.icon;
                        return <SelectItem key={area.value} value={area.value}>
                            <div className="flex items-center gap-2">
                              <Icon size={16} className="text-slate-500" />
                              <span>{area.label}</span>
                            </div>
                          </SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">Co-Autor</label>
                  <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map(author => {
                        const Icon = author.icon;
                        return <SelectItem key={author.value} value={author.value}>
                            <div className="flex items-center gap-2">
                              <Icon size={16} className="text-slate-500" />
                              <span>{author.label}</span>
                            </div>
                          </SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {filteredContent.map(content => <div key={content.id} className="p-4 hover:bg-slate-50 transition flex items-start gap-3">
                    <Checkbox id={`content-${content.id}`} checked={selectedContent.includes(content.id)} onCheckedChange={checked => {
                    if (checked) {
                      setSelectedContent([...selectedContent, content.id]);
                    } else {
                      setSelectedContent(selectedContent.filter(id => id !== content.id));
                    }
                  }} className="mt-1" />
                    <label htmlFor={`content-${content.id}`} className="flex-1 cursor-pointer">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-slate-800">{content.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            {content.type} • {content.author} • {new Date(content.createdDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${content.isPaid ? 'text-slate-700' : 'bg-emerald-100 text-emerald-700'}`} style={content.isPaid ? {
                          backgroundColor: '#B8D4E8'
                        } : {}}>
                            {content.isPaid ? <>
                                <DollarSign size={12} />
                                Pago
                              </> : <>
                                <Gift size={12} />
                                Gratuito
                              </>}
                          </span>
                          <span className="text-xs px-2 py-1 rounded text-slate-700 flex-shrink-0" style={{
                          backgroundColor: '#E8E0C5'
                        }}>
                            {content.type}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>)}
              </div>
              {filteredContent.length === 0 && <div className="text-center py-12 text-slate-500">
                  <Folder size={48} className="mx-auto mb-2 text-slate-300" />
                  <p>Nenhum conteúdo nesta pasta</p>
                </div>}
            </div>

            {/* Summary */}
            {(selectedContent.length > 0 || scheduleDate) && <div className="p-6 rounded-xl border" style={{
              backgroundColor: '#B8D4E8',
              borderColor: '#9AB8CC'
            }}>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText size={20} />
                  Resumo do Agendamento
                </h3>
                <div className="space-y-2 text-sm text-slate-700">
                  {newsletterTitle && <p>
                      <strong>Newsletter:</strong> {newsletterTitle}
                    </p>}
                  <p>
                    <strong>Conteúdos selecionados:</strong> {selectedContent.length} {selectedContent.length === 1 ? 'item' : 'itens'}
                  </p>
                  {scheduleDate && <p>
                      <strong>Data de envio:</strong> {format(scheduleDate, "PPP", {
                    locale: ptBR
                  })} às {scheduleTime}
                    </p>}
                  {selectedChannels.length > 0 && <p>
                      <strong>Canais de envio:</strong> {selectedChannels.map(id => deliveryChannels.find(ch => ch.id === id)?.label).join(", ")}
                    </p>}
                  {selectedContent.length === 0 && <p className="text-slate-600 italic">Nenhum conteúdo selecionado ainda</p>}
                </div>
              </div>}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => navigate('/criar-newsletter')} className="px-6">
                Cancelar
              </Button>
              <Button disabled={!scheduleDate || selectedContent.length === 0 || selectedChannels.length === 0} onClick={handleScheduleSubmit} className="text-slate-700 hover:opacity-90 px-6" style={{
                backgroundColor: '#C5E8D4'
              }}>
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
                {folders.map(folder => <button key={folder.id} onClick={() => setSelectedFolder(folder.id)} className={`w-full text-left p-3 rounded-lg transition flex items-center gap-3 ${selectedFolder === folder.id ? 'text-slate-800' : 'hover:bg-slate-50 text-slate-600'}`} style={selectedFolder === folder.id ? {
                  backgroundColor: folder.color
                } : {}}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                    backgroundColor: selectedFolder === folder.id ? 'rgba(255,255,255,0.5)' : folder.color
                  }}>
                      <Folder size={16} className="text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{folder.name}</p>
                      <p className="text-xs opacity-70">{folder.count} {folder.count === 1 ? 'item' : 'itens'}</p>
                    </div>
                  </button>)}
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Preview das Mensagens</DialogTitle>
          </DialogHeader>

          {/* Selected Channels Display */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Canais Selecionados</h3>
            <div className="flex flex-wrap gap-2">
              {selectedChannels.map(channelId => {
              const channel = deliveryChannels.find(c => c.id === channelId);
              if (!channel) return null;
              const Icon = channel.icon;
              return <div key={channelId} className="px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm text-slate-700" style={{
                backgroundColor: channel.color
              }}>
                    <Icon size={14} />
                    {channel.label}
                  </div>;
            })}
            </div>
          </div>

          {/* Preview Content */}
          <div className="space-y-6">
            {/* Email Preview */}
            {selectedChannels.includes("email") && <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <Mail size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Email</span>
                </div>
                
                {/* Email Container - Professional Style */}
                <div className="bg-slate-50 p-8">
                  <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Email Header with Branding */}
                    <div className="px-8 pt-8 pb-6" style={{
                  backgroundColor: '#B8D4E8'
                }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                            <FileText size={20} className="text-slate-700" />
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-slate-800">Newsletter</h1>
                            <p className="text-xs text-slate-600">Conteúdos Selecionados</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">{new Date().toLocaleDateString('pt-BR')}</p>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        Seus Conteúdos Desta Semana
                      </h2>
                      <p className="text-sm text-slate-700">
                        Confira os artigos selecionados especialmente para você
                      </p>
                    </div>

                    {/* Email Content */}
                    <div className="px-8 py-6">
                      <div className="space-y-6">
                        {filteredContent.slice(0, 3).map((content, idx) => <div key={content.id} className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition">
                            <div className="flex gap-0">
                              <div className="w-48 flex-shrink-0">
                                <img src={getContentImage(content.id)} alt={content.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <span className="text-xs px-2 py-1 rounded font-medium" style={{
                              backgroundColor: content.isPaid ? '#B8D4E8' : '#C5E8D4',
                              color: '#334155'
                            }}>
                                    {content.type}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    {new Date(content.createdDate).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2 text-base leading-tight">
                                  {content.title}
                                </h3>
                                <p className="text-sm text-slate-600 mb-3">
                                  Por {content.author}
                                </p>
                                <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                                  Ler artigo completo <ExternalLink size={14} />
                                </a>
                              </div>
                            </div>
                          </div>)}
                      </div>

                      {/* CTA Button */}
                      <div className="mt-8 text-center">
                        <a href="#" className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition hover:opacity-90" style={{
                      backgroundColor: '#B8D4E8',
                      color: '#334155'
                    }}>
                          Ver Todos os Conteúdos
                        </a>
                      </div>
                    </div>

                    {/* Email Footer */}
                    <div className="px-8 py-6 bg-slate-100 border-t border-slate-200">
                      <div className="text-center space-y-3">
                        <p className="text-xs text-slate-600">
                          Você está recebendo este email porque se inscreveu em nossa newsletter
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs">
                          <a href="#" className="text-slate-600 hover:text-slate-800">Preferências</a>
                          <span className="text-slate-400">•</span>
                          <a href="#" className="text-slate-600 hover:text-slate-800">Cancelar inscrição</a>
                        </div>
                        <p className="text-xs text-slate-500 mt-4">
                          © 2024 Newsletter Platform. Todos os direitos reservados.
                        </p>
                        <p className="text-xs text-slate-400">
                          Rua Exemplo, 123 - São Paulo, SP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

            {/* SMS Preview */}
            {selectedChannels.includes("sms") && <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <MessageSquare size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">SMS</span>
                </div>
                <div className="p-6 bg-white">
                  <div className="max-w-md mx-auto bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm text-slate-800 mb-2">
                      <strong>Novos conteúdos!</strong>
                    </p>
                    {filteredContent.slice(0, 3).map((content, idx) => <p key={content.id} className="text-sm text-slate-700 mb-1">
                        {idx + 1}. {content.title}
                      </p>)}
                    <p className="text-sm text-blue-600 mt-3">
                      Acesse: lovable.app/content
                    </p>
                  </div>
                </div>
              </div>}

            {/* WhatsApp Preview */}
            {selectedChannels.includes("whatsapp") && <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <MessageCircle size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">WhatsApp</span>
                </div>
                <div className="p-6" style={{
              backgroundColor: '#E5DDD5'
            }}>
                  <div className="max-w-md ml-auto">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-2">
                      <p className="text-sm font-semibold text-slate-800 mb-2">📚 Seus Conteúdos da Semana</p>
                      {filteredContent.slice(0, 3).map(content => <div key={content.id} className="mb-3 pb-3 border-b border-slate-100 last:border-0">
                          <img src={getContentImage(content.id)} alt={content.title} className="w-full h-32 object-cover rounded mb-2" />
                          <p className="text-sm font-medium text-slate-800">{content.title}</p>
                          <p className="text-xs text-slate-600 mt-1">{content.author}</p>
                        </div>)}
                      <button className="w-full mt-2 py-2 bg-green-500 text-white rounded text-sm font-medium">
                        Ver Todos os Artigos
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 text-right">Agora</p>
                  </div>
                </div>
              </div>}

            {/* RCS Preview */}
            {selectedChannels.includes("rcs") && <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <Smartphone size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">RCS</span>
                </div>
                <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
                  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-800">Conteúdos em Destaque</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {filteredContent.slice(0, 3).map(content => <div key={content.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                          <img src={getContentImage(content.id)} alt={content.title} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800 line-clamp-2">{content.title}</p>
                            <p className="text-xs text-slate-600 mt-1">{content.type}</p>
                          </div>
                        </div>)}
                    </div>
                    <div className="p-4 border-t border-slate-200">
                      <button className="w-full py-2 bg-blue-600 text-white rounded font-medium text-sm">
                        Acessar Conteúdos
                      </button>
                    </div>
                  </div>
                </div>
              </div>}

            {/* MMS Preview */}
            {selectedChannels.includes("mms") && <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <Image size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">MMS</span>
                </div>
                <div className="p-6 bg-white">
                  <div className="max-w-md mx-auto space-y-3">
                    {filteredContent.slice(0, 3).map(content => <div key={content.id} className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                        <img src={getContentImage(content.id)} alt={content.title} className="w-full h-40 object-cover" />
                        <div className="p-3">
                          <p className="text-sm font-medium text-slate-800">{content.title}</p>
                          <p className="text-xs text-slate-600 mt-1">{content.author} • {content.type}</p>
                          <p className="text-xs text-blue-600 mt-2">lovable.app/read/{content.id}</p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>}

            {/* Slack Preview */}
            {selectedChannels.includes("slack") && <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <Hash size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Slack</span>
                </div>
                <div className="p-6 bg-white">
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                        <FileText size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Conteúdos Bot</p>
                        <p className="text-xs text-slate-500">Agora</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-800 mb-3">
                      📋 <strong>Novos conteúdos disponíveis:</strong>
                    </p>
                    <div className="space-y-2 bg-slate-50 rounded p-3">
                      {filteredContent.slice(0, 3).map((content, idx) => <div key={content.id} className="pb-2 border-b border-slate-200 last:border-0">
                          <p className="text-sm font-medium text-slate-800">{idx + 1}. {content.title}</p>
                          <p className="text-xs text-slate-600">{content.author} • {content.type}</p>
                          <a href="#" className="text-xs text-blue-600 hover:underline">Ver artigo →</a>
                        </div>)}
                    </div>
                    <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700 transition">
                      Ver Todos
                    </button>
                  </div>
                </div>
              </div>}

            {/* Telegram Preview */}
            {selectedChannels.includes("telegram") && <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <Send size={16} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Telegram</span>
                </div>
                <div className="p-6 bg-gradient-to-b from-blue-50 to-white">
                  <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          C
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">Conteúdos Channel</p>
                          <p className="text-xs text-slate-500">Canal verificado</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-800 mb-3">
                        🎯 <strong>Destaques da Semana</strong>
                      </p>
                      {filteredContent.slice(0, 3).map(content => <div key={content.id} className="mb-3">
                          <img src={getContentImage(content.id)} alt={content.title} className="w-full h-32 object-cover rounded mb-2" />
                          <p className="text-sm font-medium text-slate-800">{content.title}</p>
                          <p className="text-xs text-slate-600 mt-1">{content.author}</p>
                          <a href="#" className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1">
                            Ler mais <ExternalLink size={12} />
                          </a>
                        </div>)}
                      <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                        <span>3.2K visualizações</span>
                        <span>Hoje às {scheduleTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}