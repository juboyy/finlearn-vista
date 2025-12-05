import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { ArrowLeft, Plus, BookOpen, Video, Search, FileText, Bell, Crown, Podcast, Newspaper, TrendingUp, Book, GraduationCap, Bot, FileCheck, FlaskConical, Eye, Pen, MoreVertical, FileSearch, BarChart3, Trash2, Loader2, Image, Presentation, Radio, MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live' | 'entrevistas' | 'insights' | 'graficos';
type FilterType = 'todos' | 'rascunho' | 'revisao' | 'concluido' | 'publicado';

interface ContentItem {
  id?: string;
  type: string;
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor: string;
  statusDot: string;
  date: string;
  views: string;
  isFromDb?: boolean;
  isVisible?: boolean;
}

export default function GerenciarConteudosEmpresa() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('todos');
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ContentItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibilityState, setVisibilityState] = useState<Record<string, boolean>>({});

  const toggleVisibility = (id: string) => {
    setVisibilityState(prev => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id]
    }));
    toast.success("Visibilidade atualizada");
  };

  // Dados estáticos específicos para conteúdos da empresa (diferentes de MeusConteudos)
  const companyContentItems: ContentItem[] = [
    {
      id: "emp-1",
      type: "Podcast",
      icon: <Podcast className="w-5 h-5" />,
      bgColor: "bg-[#D8BFD8]",
      title: "Panorama Econômico Semanal - Edição Corporativa",
      subtitle: "45min • Mercado Financeiro",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "02 Dez 2024",
      views: "12.4k"
    },
    {
      id: "emp-2",
      type: "Webinar",
      icon: <Video className="w-5 h-5" />,
      bgColor: "bg-[#F4C8D8]",
      title: "Transformação Digital no Setor Bancário",
      subtitle: "Transmissão ao vivo • 2h",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "28 Nov 2024",
      views: "8.7k"
    },
    {
      id: "emp-3",
      type: "E-book",
      icon: <Book className="w-5 h-5" />,
      bgColor: "bg-[#A8A8B8]",
      title: "Manual de Compliance Corporativo 2025",
      subtitle: "180 páginas • PDF",
      status: "Concluido",
      statusColor: "bg-[#D8B8D8]",
      statusDot: "bg-[#B898B8]",
      date: "25 Nov 2024",
      views: "3.2k"
    },
    {
      id: "emp-4",
      type: "Curso",
      icon: <GraduationCap className="w-5 h-5" />,
      bgColor: "bg-[#B8C5D6]",
      title: "Certificação em Gestão de Riscos Financeiros",
      subtitle: "24 módulos • 16h de conteúdo",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "20 Nov 2024",
      views: "5.1k"
    },
    {
      id: "emp-5",
      type: "Artigo",
      icon: <Newspaper className="w-5 h-5" />,
      bgColor: "bg-[#B8C5D6]",
      title: "Impacto das Novas Regulamentações BACEN",
      subtitle: "12min de leitura",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "18 Nov 2024",
      views: "4.5k"
    },
    {
      id: "emp-6",
      type: "Analise",
      icon: <TrendingUp className="w-5 h-5" />,
      bgColor: "bg-[#B8D8B8]",
      title: "Relatório de Performance Institucional Q3",
      subtitle: "Relatório completo • 56 páginas",
      status: "Em Revisao",
      statusColor: "bg-[#B8D4E8]",
      statusDot: "bg-[#88A8C8]",
      date: "15 Nov 2024",
      views: "-"
    },
    {
      id: "emp-7",
      type: "Infográfico",
      icon: <Image className="w-5 h-5" />,
      bgColor: "bg-[#F4E4A6]",
      title: "Mapa de Atuação da Empresa no Brasil",
      subtitle: "Infográfico interativo",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "10 Nov 2024",
      views: "7.8k"
    },
    {
      id: "emp-8",
      type: "Whitepaper",
      icon: <FileCheck className="w-5 h-5" />,
      bgColor: "bg-[#B8C5D6]",
      title: "ESG e Sustentabilidade no Setor Financeiro",
      subtitle: "PDF • 64 páginas",
      status: "Rascunho",
      statusColor: "bg-[#F4E4A6]",
      statusDot: "bg-[#D4C186]",
      date: "05 Nov 2024",
      views: "-"
    },
    {
      id: "emp-9",
      type: "Apresentação",
      icon: <Presentation className="w-5 h-5" />,
      bgColor: "bg-[#A8C8D8]",
      title: "Resultados Financeiros Anuais 2024",
      subtitle: "45 slides • PPTX",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "01 Nov 2024",
      views: "9.3k"
    },
    {
      id: "emp-10",
      type: "Live",
      icon: <Radio className="w-5 h-5" />,
      bgColor: "bg-[#F4C8A8]",
      title: "Mesa Redonda: Tendências do Mercado 2025",
      subtitle: "Gravação • 1h45min",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "28 Out 2024",
      views: "6.2k"
    },
    {
      id: "emp-11",
      type: "Entrevista",
      icon: <MessageSquare className="w-5 h-5" />,
      bgColor: "bg-[#D8BFD8]",
      title: "CEO Fala Sobre Expansão Internacional",
      subtitle: "Vídeo • 25min",
      status: "Em Revisao",
      statusColor: "bg-[#B8D4E8]",
      statusDot: "bg-[#88A8C8]",
      date: "22 Out 2024",
      views: "-"
    },
    {
      id: "emp-12",
      type: "Avatar IA",
      icon: <Bot className="w-5 h-5" />,
      bgColor: "bg-[#A8C8D8]",
      title: "Assistente Virtual de Atendimento Corporativo",
      subtitle: "IA Personalizada",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "15 Out 2024",
      views: "15.6k"
    },
    {
      id: "emp-13",
      type: "Estudo",
      icon: <FlaskConical className="w-5 h-5" />,
      bgColor: "bg-[#F4C8A8]",
      title: "Pesquisa de Satisfação do Cliente 2024",
      subtitle: "Pesquisa completa • 78 páginas",
      status: "Concluido",
      statusColor: "bg-[#D8B8D8]",
      statusDot: "bg-[#B898B8]",
      date: "10 Out 2024",
      views: "2.1k"
    },
    {
      id: "emp-14",
      type: "Documento",
      icon: <FileText className="w-5 h-5" />,
      bgColor: "bg-[#B8C5D6]",
      title: "Política de Governança Corporativa",
      subtitle: "PDF • 42 páginas",
      status: "Publicado",
      statusColor: "bg-[#98D8C8]",
      statusDot: "bg-[#6FA997]",
      date: "05 Out 2024",
      views: "1.8k"
    }
  ];

  const filteredItems = companyContentItems.filter(item => {
    const typeMatch = activeTab === 'todos' || 
      (activeTab === 'podcasts' && item.type === 'Podcast') ||
      (activeTab === 'artigos' && item.type === 'Artigo') ||
      (activeTab === 'analises' && item.type === 'Analise') ||
      (activeTab === 'webinars' && item.type === 'Webinar') ||
      (activeTab === 'ebooks' && item.type === 'E-book') ||
      (activeTab === 'cursos' && item.type === 'Curso') ||
      (activeTab === 'avatar-ia' && item.type === 'Avatar IA') ||
      (activeTab === 'documentos' && item.type === 'Documento') ||
      (activeTab === 'estudos' && item.type === 'Estudo') ||
      (activeTab === 'infograficos' && item.type === 'Infográfico') ||
      (activeTab === 'whitepaper' && item.type === 'Whitepaper') ||
      (activeTab === 'apresentacoes' && item.type === 'Apresentação') ||
      (activeTab === 'live' && item.type === 'Live') ||
      (activeTab === 'entrevistas' && item.type === 'Entrevista');

    const statusMatch = activeFilter === 'todos' ||
      (activeFilter === 'rascunho' && item.status === 'Rascunho') ||
      (activeFilter === 'revisao' && item.status === 'Em Revisao') ||
      (activeFilter === 'concluido' && item.status === 'Concluido') ||
      (activeFilter === 'publicado' && item.status === 'Publicado');

    return typeMatch && statusMatch;
  });

  const handleDeleteItem = async () => {
    if (!itemToDelete?.id) return;
    setIsDeleting(true);
    // Simular exclusão (dados estáticos)
    setTimeout(() => {
      toast.success("Conteúdo excluído com sucesso");
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }, 500);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/configurar-pagina-empresa" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-semibold text-foreground">Conteúdos da Empresa</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full hover:bg-accent/10 flex items-center justify-center text-muted-foreground transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
                </button>
                
                <Link to="/criar-conteudo">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
                    <Plus className="w-4 h-4" />
                    Criar Novo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* MenutabbarFix */}
        <MenutabbarFix activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-muted/30">
            <div className="max-w-[1400px] mx-auto px-8 py-4">

              <div className="flex gap-6 mb-4">
                <div className="flex-1 flex gap-3 bg-card rounded-lg border border-border p-1">
                  <button 
                    onClick={() => setActiveFilter('todos')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeFilter === 'todos' 
                        ? 'text-primary-foreground bg-primary' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    Todos
                  </button>
                  <button 
                    onClick={() => setActiveFilter('rascunho')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeFilter === 'rascunho' 
                        ? 'text-primary-foreground bg-primary' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    Rascunho
                  </button>
                  <button 
                    onClick={() => setActiveFilter('revisao')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeFilter === 'revisao' 
                        ? 'text-primary-foreground bg-primary' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    Em Revisão
                  </button>
                  <button 
                    onClick={() => setActiveFilter('concluido')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeFilter === 'concluido' 
                        ? 'text-primary-foreground bg-primary' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    Concluído
                  </button>
                  <button 
                    onClick={() => setActiveFilter('publicado')}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeFilter === 'publicado' 
                        ? 'text-primary-foreground bg-primary' 
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    Publicado
                  </button>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <input type="checkbox" className="w-4 h-4 rounded border-border" />
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Título
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Visualizações
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Visível
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {isLoading ? (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mt-2">Carregando conteúdos...</p>
                          </td>
                        </tr>
                      ) : filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center">
                            <p className="text-sm text-muted-foreground">Nenhum conteúdo encontrado</p>
                          </td>
                        </tr>
                      ) : (
                        filteredItems.map((item, index) => (
                          <tr key={item.id || index} className="hover:bg-accent/5 transition-colors group">
                            <td className="px-6 py-4">
                              <input type="checkbox" className="w-4 h-4 rounded border-border" />
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${item.bgColor} text-[#475569] flex items-center justify-center`}>
                                  {item.icon}
                                </div>
                                <span className="text-sm font-medium text-foreground">{item.type}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${item.statusColor} text-[#475569]`}>
                                <span className={`w-1.5 h-1.5 ${item.statusDot} rounded-full`}></span>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-muted-foreground">{item.date}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                                <span className={`text-sm font-medium ${item.views === '-' ? 'text-muted-foreground' : 'text-foreground'}`}>
                                  {item.views}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center">
                                {item.status === 'Publicado' ? (
                                  <Switch
                                    checked={visibilityState[item.id || ''] ?? true}
                                    onCheckedChange={() => toggleVisibility(item.id || '')}
                                  />
                                ) : (
                                  <span className="text-xs text-muted-foreground">-</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                                  <Pen className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                      <MoreVertical className="w-4 h-4" />
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem className="gap-2">
                                      <FileSearch className="w-4 h-4" />
                                      Ver Detalhes
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2">
                                      <BarChart3 className="w-4 h-4" />
                                      Analytics
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="gap-2 text-red-600"
                                      onClick={() => {
                                        setItemToDelete(item);
                                        setDeleteDialogOpen(true);
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Mostrando {filteredItems.length} de {companyContentItems.length} conteúdos
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors">
                      Anterior
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md">
                      1
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors">
                      2
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors">
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conteúdo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{itemToDelete?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteItem}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
