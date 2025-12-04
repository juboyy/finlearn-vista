import { useState, useEffect } from "react";
import { ArrowLeft, Search, Bell, Filter, Bookmark, Check, Clock, Star, Newspaper, Video, FileText, FileType, Mic, Circle, MoreHorizontal, CheckCircle, ChevronLeft, ChevronRight, Layers, Loader2, Trash2, Pencil, X, Save } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SavedItem {
  id: string;
  item_id: string;
  item_type: string;
  item_title: string;
  item_image: string | null;
  item_description: string | null;
  item_url: string | null;
  metadata: any;
  created_at: string;
}

interface ReadLaterItem {
  id: string;
  item_id: string;
  title: string;
  type: 'article' | 'video' | 'blog' | 'pdf' | 'podcast' | 'ebook' | 'course';
  duration: string;
  source: string;
  savedDate: string;
  savedDateRelative: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  url: string | null;
}

export default function LerDepois() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<ReadLaterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [editingItem, setEditingItem] = useState<ReadLaterItem | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch saved items from database
  useEffect(() => {
    const fetchSavedItems = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('saved_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('item_type', 'read_later')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformedItems: ReadLaterItem[] = (data || []).map((item: SavedItem) => ({
          id: item.id,
          item_id: item.item_id,
          title: item.item_title,
          type: item.metadata?.content_type || 'article',
          duration: item.metadata?.duration || '10 min',
          source: item.metadata?.source || 'FinLearn',
          savedDate: new Date(item.created_at).toLocaleDateString('pt-BR'),
          savedDateRelative: formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: ptBR }),
          priority: item.metadata?.priority || 'medium',
          status: item.metadata?.status || 'pending',
          url: item.item_url
        }));

        setItems(transformedItems);
      } catch (err) {
        console.error('Error fetching saved items:', err);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os itens salvos.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedItems();
  }, [user, toast]);

  // Delete saved item
  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(items.filter(item => item.id !== id));
      toast({
        title: "Removido",
        description: "Item removido de Ler Depois."
      });
    } catch (err) {
      console.error('Error deleting item:', err);
      toast({
        title: "Erro",
        description: "Não foi possível remover o item.",
        variant: "destructive"
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Newspaper className="text-pastel-gray-dark" size={20} />;
      case 'video':
        return <Video className="text-pastel-gray-dark" size={20} />;
      case 'blog':
        return <FileText className="text-pastel-gray-dark" size={20} />;
      case 'pdf':
        return <FileType className="text-pastel-gray-dark" size={20} />;
      case 'podcast':
        return <Mic className="text-pastel-gray-dark" size={20} />;
      default:
        return <FileText className="text-pastel-gray-dark" size={20} />;
    }
  };
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-pastel-blue/70';
      case 'video':
        return 'bg-pastel-purple/70';
      case 'blog':
        return 'bg-pastel-green/70';
      case 'pdf':
        return 'bg-pastel-peach/70';
      case 'podcast':
        return 'bg-pastel-pink/70';
      default:
        return 'bg-pastel-blue/70';
    }
  };
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-rose/70 text-pastel-gray-dark rounded-full text-xs font-medium border border-pastel-rose/80">
            <Circle className="fill-current" size={6} />
            Urgente
          </span>;
      case 'high':
        return <span className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-peach/70 text-pastel-gray-dark rounded-full text-xs font-medium border border-pastel-peach/80">
            <Circle className="fill-current" size={6} />
            Alta
          </span>;
      case 'medium':
        return <span className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-yellow/70 text-pastel-gray-dark rounded-full text-xs font-medium border border-pastel-yellow/80">
            <Circle className="fill-current" size={6} />
            Média
          </span>;
      case 'low':
        return <span className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-blue/70 text-pastel-gray-dark rounded-full text-xs font-medium border border-pastel-blue/80">
            <Circle className="fill-current" size={6} />
            Baixa
          </span>;
      default:
        return null;
    }
  };
  const toggleItemStatus = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    const newStatus = item.status === 'pending' ? 'completed' : 'pending';
    
    try {
      const { error } = await supabase
        .from('saved_items')
        .update({
          metadata: {
            ...item,
            status: newStatus
          }
        })
        .eq('id', id);

      if (error) throw error;

      setItems(items.map(i => i.id === id ? {
        ...i,
        status: newStatus as 'pending' | 'completed'
      } : i));
    } catch (err) {
      console.error('Error updating status:', err);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        variant: "destructive"
      });
    }
  };

  const openEditSheet = (item: ReadLaterItem) => {
    setEditingItem({ ...item });
    setIsEditSheetOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('saved_items')
        .update({
          item_title: editingItem.title,
          metadata: {
            content_type: editingItem.type,
            duration: editingItem.duration,
            source: editingItem.source,
            priority: editingItem.priority,
            status: editingItem.status
          }
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      setItems(items.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      
      setIsEditSheetOpen(false);
      setEditingItem(null);
      
      toast({
        title: "Salvo",
        description: "Item atualizado com sucesso."
      });
    } catch (err) {
      console.error('Error updating item:', err);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredItems = items.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });
  return <div className="flex h-screen overflow-hidden bg-background">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Ler/ Assistir Depois</h1>
                <p className="text-sm text-muted-foreground mt-1">Conteúdos salvos para leitura futura</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input type="text" placeholder="Buscar conteúdo..." className="w-80 pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <Button className="bg-pastel-yellow/30 hover:bg-pastel-yellow/40 text-pastel-gray-dark border border-pastel-yellow/40">
                <Filter size={16} className="mr-2" />
                Filtrar
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar Lateral */}
            <aside className="w-80 space-y-6 flex-shrink-0">
              {/* Visão Geral */}
              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Visão Geral</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-yellow/70 rounded-lg flex items-center justify-center border border-pastel-yellow/80">
                        <Bookmark className="text-pastel-gray-dark" size={14} />
                      </div>
                      <span className="text-sm text-muted-foreground">Total Salvos</span>
                    </div>
                    <span className="font-semibold text-foreground">{items.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green/70 rounded-lg flex items-center justify-center border border-pastel-green/80">
                        <Check className="text-pastel-gray-dark" size={14} />
                      </div>
                      <span className="text-sm text-muted-foreground">Já Lidos</span>
                    </div>
                    <span className="font-semibold text-foreground">{items.filter(i => i.status === 'completed').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-rose/70 rounded-lg flex items-center justify-center border border-pastel-rose/80">
                        <Clock className="text-pastel-gray-dark" size={14} />
                      </div>
                      <span className="text-sm text-muted-foreground">Pendentes</span>
                    </div>
                    <span className="font-semibold text-foreground">{items.filter(i => i.status === 'pending').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple/70 rounded-lg flex items-center justify-center border border-pastel-purple/80">
                        <Star className="text-pastel-gray-dark" size={14} />
                      </div>
                      <span className="text-sm text-muted-foreground">Alta Prioridade</span>
                    </div>
                    <span className="font-semibold text-foreground">{items.filter(i => i.priority === 'high' || i.priority === 'urgent').length}</span>
                  </div>
                </div>
              </section>

              {/* Filtro de Prioridade */}
              <section className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Prioridade</h2>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition">Limpar</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-pastel-yellow/30 text-pastel-gray-dark cursor-pointer border border-pastel-yellow/40">
                    <Circle className="fill-current" size={8} />
                    <span className="text-sm font-medium flex-1">Todas</span>
                    <span className="text-xs bg-background px-2 py-1 rounded-full">87</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <Circle className="fill-current text-destructive" size={8} />
                    <span className="text-sm text-muted-foreground flex-1">Urgente</span>
                    <span className="text-xs text-muted-foreground">12</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <Circle className="fill-current text-pastel-peach" size={8} />
                    <span className="text-sm text-muted-foreground flex-1">Alta</span>
                    <span className="text-xs text-muted-foreground">21</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <Circle className="fill-current text-pastel-yellow" size={8} />
                    <span className="text-sm text-muted-foreground flex-1">Média</span>
                    <span className="text-xs text-muted-foreground">35</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <Circle className="fill-current text-pastel-green" size={8} />
                    <span className="text-sm text-muted-foreground flex-1">Baixa</span>
                    <span className="text-xs text-muted-foreground">19</span>
                  </div>
                </div>
              </section>

              {/* Tipo de Conteúdo */}
              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Tipo de Conteúdo</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-blue/70 rounded-lg flex items-center justify-center border border-pastel-blue/80">
                      <Newspaper className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Artigos</p>
                      <p className="text-xs text-muted-foreground">{items.filter(i => i.type === 'article').length} itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-purple/70 rounded-lg flex items-center justify-center border border-pastel-purple/80">
                      <Video className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Vídeos</p>
                      <p className="text-xs text-muted-foreground">{items.filter(i => i.type === 'video').length} itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-green/70 rounded-lg flex items-center justify-center border border-pastel-green/80">
                      <FileText className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Blog Posts</p>
                      <p className="text-xs text-muted-foreground">{items.filter(i => i.type === 'blog').length} itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-peach/70 rounded-lg flex items-center justify-center border border-pastel-peach/80">
                      <FileType className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">PDFs</p>
                      <p className="text-xs text-muted-foreground">{items.filter(i => i.type === 'pdf').length} itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-pink/70 rounded-lg flex items-center justify-center border border-pastel-pink/80">
                      <Mic className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Podcasts</p>
                      <p className="text-xs text-muted-foreground">{items.filter(i => i.type === 'podcast').length} itens</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tempo de Espera */}
              <section className="bg-card rounded-xl p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Tempo de Espera</h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <span className="text-sm text-muted-foreground">Hoje</span>
                    <span className="text-xs text-muted-foreground">8</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <span className="text-sm text-muted-foreground">Esta semana</span>
                    <span className="text-xs text-muted-foreground">15</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <span className="text-sm text-muted-foreground">Este mês</span>
                    <span className="text-xs text-muted-foreground">28</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <span className="text-sm text-muted-foreground">Mais de 30 dias</span>
                    <span className="text-xs bg-pastel-rose/70 text-pastel-gray-dark px-2 py-0.5 rounded-full border border-pastel-rose/80">36</span>
                  </div>
                </div>
              </section>
            </aside>

            {/* Área Principal */}
            <div className="flex-1 space-y-6">
              {/* Toolbar */}
              <section className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Ordenar por:</span>
                      <Select defaultValue="recent">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Data (mais recente)</SelectItem>
                          <SelectItem value="oldest">Data (mais antigo)</SelectItem>
                          <SelectItem value="priority">Prioridade</SelectItem>
                          <SelectItem value="title">Título (A-Z)</SelectItem>
                          <SelectItem value="status">Status de leitura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button onClick={() => setFilterStatus('all')} className={`${filterStatus === 'all' ? 'bg-pastel-green/30 hover:bg-pastel-green/40 text-pastel-gray-dark border border-pastel-green/40' : 'bg-transparent text-muted-foreground hover:bg-muted border-transparent'}`} variant="outline">
                      <Layers size={16} className="mr-2" />
                      Todos
                    </Button>
                    <Button onClick={() => setFilterStatus('completed')} className={`${filterStatus === 'completed' ? 'bg-pastel-green/30 hover:bg-pastel-green/40 text-pastel-gray-dark border border-pastel-green/40' : 'bg-transparent text-muted-foreground hover:bg-muted border-transparent'}`} variant="outline">
                      <CheckCircle size={16} className="mr-2" />
                      Lidos
                    </Button>
                    <Button onClick={() => setFilterStatus('pending')} className={`${filterStatus === 'pending' ? 'bg-pastel-green/30 hover:bg-pastel-green/40 text-pastel-gray-dark border border-pastel-green/40' : 'bg-transparent text-muted-foreground hover:bg-muted border-transparent'}`} variant="outline">
                      <Clock size={16} className="mr-2" />
                      Pendentes
                    </Button>
                  </div>
                </div>
              </section>

              {/* Lista */}
              <section className="bg-card rounded-xl border border-border overflow-hidden">
                {/* Table Header */}
                <div className="border-b border-border bg-muted/30">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="col-span-5">Conteúdo</div>
                    <div className="col-span-2">Salvo em</div>
                    <div className="col-span-2">Prioridade</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Ações</div>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="animate-spin text-muted-foreground" size={32} />
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredItems.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bookmark className="text-muted-foreground mb-4" size={48} />
                    <h3 className="text-lg font-medium text-foreground mb-2">Nenhum item salvo</h3>
                    <p className="text-sm text-muted-foreground">Salve artigos e conteúdos para ler depois</p>
                  </div>
                )}

                {/* Table Body */}
                {!isLoading && filteredItems.map((item, index) => (
                  <div key={item.id} className={`${index !== filteredItems.length - 1 ? 'border-b border-border' : ''} hover:bg-muted/30 transition-colors`}>
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                      <div className="col-span-5 flex items-center gap-4">
                        <div className={`w-10 h-10 ${getTypeColor(item.type)} rounded-lg flex items-center justify-center flex-shrink-0 border ${getTypeColor(item.type).replace('/70', '/80')}`}>
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          {item.url ? (
                            <Link to={item.url} className="font-semibold text-foreground truncate block hover:text-primary transition-colors">{item.title}</Link>
                          ) : (
                            <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                          )}
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {item.type === 'article' ? 'Artigo' : item.type === 'video' ? 'Vídeo' : item.type === 'blog' ? 'Blog' : item.type === 'pdf' ? 'PDF' : item.type === 'podcast' ? 'Podcast' : item.type === 'ebook' ? 'E-book' : 'Curso'} • {item.duration}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{item.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-foreground">{item.savedDate}</div>
                        <div className="text-xs text-muted-foreground">{item.savedDateRelative}</div>
                      </div>
                      <div className="col-span-2">
                        {getPriorityBadge(item.priority)}
                      </div>
                      <div className="col-span-2">
                        {item.status === 'pending' ? <span className="inline-flex items-center gap-2 px-3 py-1 bg-muted text-pastel-gray-dark rounded-full text-xs font-medium border border-border">
                            <Clock size={12} />
                            Pendente
                          </span> : <span className="inline-flex items-center gap-2 px-3 py-1 bg-pastel-green/70 text-pastel-gray-dark rounded-full text-xs font-medium border border-pastel-green/80">
                            <Check size={12} />
                            Concluído
                          </span>}
                      </div>
                      <div className="col-span-1 flex items-center justify-end gap-1">
                        <button 
                          onClick={e => {
                            e.stopPropagation();
                            openEditSheet(item);
                          }} 
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button onClick={e => {
                          e.stopPropagation();
                          toggleItemStatus(item.id);
                        }} className={`p-2 transition-colors ${item.status === 'completed' ? 'text-pastel-green hover:text-pastel-green/80' : 'text-muted-foreground hover:text-pastel-green'}`} title={item.status === 'completed' ? 'Concluído' : 'Marcar como concluído'}>
                          {item.status === 'completed' ? <CheckCircle size={16} className="fill-current" /> : <CheckCircle size={16} />}
                        </button>
                        <button 
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteItem(item.id);
                          }} 
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          title="Remover"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Paginação */}
              <section className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                    <ChevronLeft size={16} className="mr-2" />
                    Anterior
                  </Button>
                  <Button className="bg-pastel-yellow/30 hover:bg-pastel-yellow/40 text-pastel-gray-dark border border-pastel-yellow/40">
                    1
                  </Button>
                  <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                    2
                  </Button>
                  <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                    3
                  </Button>
                  <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                    4
                  </Button>
                  <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                    5
                  </Button>
                  <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                    Próximo
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[450px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Pencil size={18} />
              Editar Item
            </SheetTitle>
          </SheetHeader>
          
          {editingItem && (
            <div className="mt-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="edit-title">Titulo</Label>
                <Input
                  id="edit-title"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Titulo do item"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label>Tipo de Conteudo</Label>
                <Select 
                  value={editingItem.type} 
                  onValueChange={(value) => setEditingItem({ ...editingItem, type: value as ReadLaterItem['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Artigo</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                    <SelectItem value="ebook">E-book</SelectItem>
                    <SelectItem value="course">Curso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label>Prioridade</Label>
                <Select 
                  value={editingItem.priority} 
                  onValueChange={(value) => setEditingItem({ ...editingItem, priority: value as ReadLaterItem['priority'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">
                      <div className="flex items-center gap-2">
                        <Circle className="fill-pastel-rose text-pastel-rose" size={8} />
                        Urgente
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Circle className="fill-pastel-peach text-pastel-peach" size={8} />
                        Alta
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Circle className="fill-pastel-yellow text-pastel-yellow" size={8} />
                        Media
                      </div>
                    </SelectItem>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Circle className="fill-pastel-blue text-pastel-blue" size={8} />
                        Baixa
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={editingItem.status} 
                  onValueChange={(value) => setEditingItem({ ...editingItem, status: value as ReadLaterItem['status'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        Pendente
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center gap-2">
                        <Check size={14} />
                        Concluido
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duracao</Label>
                <Input
                  id="edit-duration"
                  value={editingItem.duration}
                  onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                  placeholder="Ex: 10 min, 1h 30min"
                />
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="edit-source">Fonte</Label>
                <Input
                  id="edit-source"
                  value={editingItem.source}
                  onChange={(e) => setEditingItem({ ...editingItem, source: e.target.value })}
                  placeholder="Ex: FinLearn, YouTube"
                />
              </div>

              {/* Info Card */}
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">Informacoes</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Salvo em:</span>
                    <span>{editingItem.savedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo:</span>
                    <span>{editingItem.savedDateRelative}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsEditSheetOpen(false);
                    setEditingItem(null);
                  }}
                >
                  <X size={16} className="mr-2" />
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-pastel-green/70 hover:bg-pastel-green/80 text-pastel-gray-dark border border-pastel-green/80"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Save size={16} className="mr-2" />
                  )}
                  Salvar
                </Button>
              </div>

              {/* Delete Button */}
              <Button
                variant="outline"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                onClick={() => {
                  handleDeleteItem(editingItem.id);
                  setIsEditSheetOpen(false);
                  setEditingItem(null);
                }}
              >
                <Trash2 size={16} className="mr-2" />
                Remover Item
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>;
}