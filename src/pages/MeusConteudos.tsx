import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { 
  ArrowLeft, 
  Bell, 
  Plus, 
  Filter, 
  ArrowDownWideNarrow, 
  Eye, 
  Pen, 
  MoreVertical,
  Podcast,
  Newspaper,
  ChartLine,
  Video,
  BookOpen,
  GraduationCap,
  Bot,
  FileText,
  TestTube,
  Calculator,
  Search,
  FileSpreadsheet,
  Crown
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusType = 'published' | 'draft' | 'review' | 'completed';
type ContentType = 'podcast' | 'article' | 'analysis' | 'webinar' | 'ebook' | 'course' | 'avatar' | 'document' | 'study';

interface Content {
  id: string;
  type: ContentType;
  title: string;
  subtitle: string;
  status: StatusType;
  date: string;
  views: number | null;
}

const contentData: Content[] = [
  {
    id: '1',
    type: 'podcast',
    title: 'Regulação do Open Finance no Brasil',
    subtitle: 'Episódio #42 • 45min',
    status: 'published',
    date: '15 Out 2024',
    views: 2400
  },
  {
    id: '2',
    type: 'article',
    title: 'Tendências de Pagamentos Digitais 2025',
    subtitle: '8min de leitura',
    status: 'draft',
    date: '18 Out 2024',
    views: null
  },
  {
    id: '3',
    type: 'analysis',
    title: 'Projeção Trimestral: Mercado de Capitais Q4',
    subtitle: 'Relatório completo • 24 páginas',
    status: 'review',
    date: '20 Out 2024',
    views: null
  },
  {
    id: '4',
    type: 'webinar',
    title: 'Estratégias de Investimento para 2025',
    subtitle: 'Transmissão ao vivo • 1h30min',
    status: 'published',
    date: '10 Out 2024',
    views: 5800
  },
  {
    id: '5',
    type: 'ebook',
    title: 'Guia Completo: Mercado de Meios de Pagamento',
    subtitle: '120 páginas • PDF',
    status: 'completed',
    date: '22 Out 2024',
    views: null
  },
  {
    id: '6',
    type: 'course',
    title: 'Fundamentos de Análise de Crédito',
    subtitle: '12 módulos • 8h de conteúdo',
    status: 'draft',
    date: '25 Out 2024',
    views: null
  },
  {
    id: '7',
    type: 'avatar',
    title: 'Resumo Semanal do Mercado Financeiro',
    subtitle: 'Vídeo gerado • 5min',
    status: 'published',
    date: '21 Out 2024',
    views: 3200
  },
  {
    id: '8',
    type: 'document',
    title: 'Relatório Anual de Compliance 2024',
    subtitle: 'PDF • 86 páginas',
    status: 'review',
    date: '19 Out 2024',
    views: null
  },
  {
    id: '9',
    type: 'study',
    title: 'Impacto da LGPD no Setor Financeiro',
    subtitle: 'Pesquisa acadêmica • 42 páginas',
    status: 'completed',
    date: '17 Out 2024',
    views: null
  }
];

const getTypeConfig = (type: ContentType) => {
  const configs = {
    podcast: { icon: Podcast, label: 'Podcast', bgColor: 'bg-pastel-purple' },
    article: { icon: Newspaper, label: 'Artigo', bgColor: 'bg-pastel-blue' },
    analysis: { icon: ChartLine, label: 'Análise', bgColor: 'bg-pastel-green' },
    webinar: { icon: Video, label: 'Webinar', bgColor: 'bg-pastel-pink' },
    ebook: { icon: BookOpen, label: 'E-book', bgColor: 'bg-pastel-gray' },
    course: { icon: GraduationCap, label: 'Curso', bgColor: 'bg-pastel-blue' },
    avatar: { icon: Bot, label: 'Avatar IA', bgColor: 'bg-pastel-sky' },
    document: { icon: FileText, label: 'Documento', bgColor: 'bg-pastel-blue' },
    study: { icon: TestTube, label: 'Estudo', bgColor: 'bg-pastel-orange' }
  };
  return configs[type];
};

const getStatusConfig = (status: StatusType) => {
  const configs = {
    published: { label: 'Publicado', className: 'bg-pastel-green/70 text-slate-700' },
    draft: { label: 'Rascunho', className: 'bg-pastel-yellow/70 text-slate-700' },
    review: { label: 'Em Revisão', className: 'bg-pastel-sky/70 text-slate-700' },
    completed: { label: 'Concluído', className: 'bg-pastel-purple/70 text-slate-700' }
  };
  return configs[status];
};

const MeusConteudos = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'draft' | 'review' | 'published'>('all');
  const [itemsPerPage, setItemsPerPage] = useState('10');

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 flex-none z-20">
          <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/aprendizado')}
                className="text-foreground hover:bg-accent"
              >
                <ArrowLeft size={20} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ChartLine className="text-primary-foreground" size={16} />
                </div>
                <span className="font-bold text-lg text-foreground">FinLearn</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent relative"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
              </Button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">João Silva</p>
                  <p className="text-xs text-muted-foreground">Premium</p>
                </div>
                <img 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" 
                  alt="User" 
                  className="w-9 h-9 rounded-full object-cover border border-border"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-card border-r border-border flex-none hidden lg:flex flex-col overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Biblioteca
              </h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/80">
                  <BookOpen size={18} />
                  Meus Artigos
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/80">
                  <Video size={18} />
                  Vídeos Salvos
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/80">
                  <ChartLine size={18} />
                  Relatórios
                </Button>
              </div>
              
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 mt-8">
                Ferramentas
              </h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/80">
                  <Calculator size={18} />
                  Calculadora de Taxas
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/80">
                  <Search size={18} />
                  Análise de Risco
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/80">
                  <FileSpreadsheet size={18} />
                  Gerador de Propostas
                </Button>
              </div>
            </div>
            
            <div className="mt-auto p-6 border-t border-border">
              <div className="bg-muted rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <Crown size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Plano Pro</p>
                    <p className="text-xs text-muted-foreground">Acesso ilimitado</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Gerenciar Assinatura
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-muted/30">
            <div className="max-w-[1400px] mx-auto px-8 py-8">
              {/* Page Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Meus Conteúdos</h1>
                  <p className="text-muted-foreground">Gerencie todos os materiais criados para sua audiência</p>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm">
                  <Plus size={18} />
                  Criar Novo
                </Button>
              </div>

              {/* Filters */}
              <div className="flex gap-6 mb-6">
                <div className="flex-1 flex gap-3 bg-card rounded-lg border border-border p-1">
                  <Button
                    variant={activeFilter === 'all' ? 'default' : 'ghost'}
                    className="flex-1"
                    onClick={() => setActiveFilter('all')}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={activeFilter === 'draft' ? 'default' : 'ghost'}
                    className="flex-1"
                    onClick={() => setActiveFilter('draft')}
                  >
                    Rascunho
                  </Button>
                  <Button
                    variant={activeFilter === 'review' ? 'default' : 'ghost'}
                    className="flex-1"
                    onClick={() => setActiveFilter('review')}
                  >
                    Em Revisão
                  </Button>
                  <Button
                    variant={activeFilter === 'published' ? 'default' : 'ghost'}
                    className="flex-1"
                    onClick={() => setActiveFilter('published')}
                  >
                    Publicado
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Filter size={18} />
                    Filtrar
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ArrowDownWideNarrow size={18} />
                    Ordenar
                  </Button>
                </div>
              </div>

              {/* Content Table */}
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead className="uppercase text-xs font-semibold">Tipo</TableHead>
                        <TableHead className="uppercase text-xs font-semibold">Título</TableHead>
                        <TableHead className="uppercase text-xs font-semibold">Status</TableHead>
                        <TableHead className="uppercase text-xs font-semibold">Data</TableHead>
                        <TableHead className="uppercase text-xs font-semibold">Visualizações</TableHead>
                        <TableHead className="text-right uppercase text-xs font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentData.map((content) => {
                        const typeConfig = getTypeConfig(content.type);
                        const statusConfig = getStatusConfig(content.status);
                        const TypeIcon = typeConfig.icon;
                        
                        return (
                          <TableRow key={content.id} className="hover:bg-muted/30">
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${typeConfig.bgColor} text-slate-700 flex items-center justify-center`}>
                                  <TypeIcon size={18} />
                                </div>
                                <span className="text-sm font-medium text-foreground">{typeConfig.label}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <h4 className="text-sm font-semibold text-foreground">{content.title}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{content.subtitle}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${statusConfig.className} border-0`}>
                                <span className="w-1.5 h-1.5 bg-current rounded-full mr-1.5"></span>
                                {statusConfig.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-foreground">{content.date}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <Eye size={14} className="text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">
                                  {content.views ? content.views.toLocaleString() : '-'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Pen size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">Mostrando</span>
                    <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-foreground">de 127 conteúdos</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      ‹
                    </Button>
                    <Button variant="default" size="sm">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <span className="px-2 text-muted-foreground">...</span>
                    <Button variant="outline" size="sm">13</Button>
                    <Button variant="outline" size="sm">
                      ›
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      
    </div>
  );
};

export default MeusConteudos;
