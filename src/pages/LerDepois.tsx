import { useState } from "react";
import { ArrowLeft, Search, Bell, Filter, Bookmark, Check, Clock, Star, Newspaper, Video, FileText, FileType, Mic, Circle, MoreHorizontal, CheckCircle, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ReadLaterItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'blog' | 'pdf' | 'podcast';
  duration: string;
  source: string;
  savedDate: string;
  savedDateRelative: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
}
const mockItems: ReadLaterItem[] = [{
  id: '1',
  title: 'Novas Diretrizes CVM para Fundos de Investimento',
  type: 'article',
  duration: '12 min',
  source: 'Valor Econômico',
  savedDate: '17/11/2024',
  savedDateRelative: 'há 1 hora',
  priority: 'urgent',
  status: 'pending'
}, {
  id: '2',
  title: 'Webinar: Gestão de Risco em Cartões de Crédito',
  type: 'video',
  duration: '45 min',
  source: 'FinLearn Academy',
  savedDate: '16/11/2024',
  savedDateRelative: 'há 1 dia',
  priority: 'high',
  status: 'pending'
}, {
  id: '3',
  title: 'Análise: Tendências do Mercado de Pagamentos',
  type: 'blog',
  duration: '8 min',
  source: 'InfoMoney',
  savedDate: '15/11/2024',
  savedDateRelative: 'há 2 dias',
  priority: 'high',
  status: 'completed'
}, {
  id: '4',
  title: 'Relatório: Open Finance no Brasil 2024',
  type: 'pdf',
  duration: '42 páginas',
  source: 'Banco Central',
  savedDate: '14/11/2024',
  savedDateRelative: 'há 3 dias',
  priority: 'medium',
  status: 'pending'
}, {
  id: '5',
  title: 'Estratégias de Compliance para Instituições Financeiras',
  type: 'article',
  duration: '15 min',
  source: 'Valor Econômico',
  savedDate: '10/11/2024',
  savedDateRelative: 'há 7 dias',
  priority: 'medium',
  status: 'pending'
}, {
  id: '6',
  title: 'Como Analisar Demonstrações Financeiras',
  type: 'video',
  duration: '28 min',
  source: 'FinLearn Academy',
  savedDate: '08/11/2024',
  savedDateRelative: 'há 9 dias',
  priority: 'low',
  status: 'completed'
}, {
  id: '7',
  title: 'Inovações em Meios de Pagamento Digital',
  type: 'blog',
  duration: '10 min',
  source: 'InfoMoney',
  savedDate: '05/11/2024',
  savedDateRelative: 'há 12 dias',
  priority: 'medium',
  status: 'pending'
}, {
  id: '8',
  title: 'Podcast: Futuro dos Investimentos no Brasil',
  type: 'podcast',
  duration: '52 min',
  source: 'FinCast',
  savedDate: '01/11/2024',
  savedDateRelative: 'há 16 dias',
  priority: 'low',
  status: 'pending'
}, {
  id: '9',
  title: 'Análise Técnica: Padrões de Candlestick',
  type: 'article',
  duration: '18 min',
  source: 'Valor Econômico',
  savedDate: '28/10/2024',
  savedDateRelative: 'há 20 dias',
  priority: 'urgent',
  status: 'pending'
}, {
  id: '10',
  title: 'Guia Completo: Prevenção à Lavagem de Dinheiro',
  type: 'pdf',
  duration: '68 páginas',
  source: 'COAF',
  savedDate: '15/10/2024',
  savedDateRelative: 'há 33 dias',
  priority: 'high',
  status: 'completed'
}];
export default function LerDepois() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ReadLaterItem[]>(mockItems);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
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
  const toggleItemStatus = (id: string) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      status: item.status === 'pending' ? 'completed' : 'pending' as 'pending' | 'completed'
    } : item));
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
                    <span className="font-semibold text-foreground">87</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-green/70 rounded-lg flex items-center justify-center border border-pastel-green/80">
                        <Check className="text-pastel-gray-dark" size={14} />
                      </div>
                      <span className="text-sm text-muted-foreground">Já Lidos</span>
                    </div>
                    <span className="font-semibold text-foreground">34</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-rose/70 rounded-lg flex items-center justify-center border border-pastel-rose/80">
                        <Clock className="text-pastel-gray-dark" size={14} />
                      </div>
                      <span className="text-sm text-muted-foreground">Pendentes</span>
                    </div>
                    <span className="font-semibold text-foreground">53</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pastel-purple/70 rounded-lg flex items-center justify-center border border-pastel-purple/80">
                        <Star className="text-pastel-gray-dark" size={14} />
                      </div>
                      <span className="text-sm text-muted-foreground">Alta Prioridade</span>
                    </div>
                    <span className="font-semibold text-foreground">21</span>
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
                      <p className="text-xs text-muted-foreground">42 itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-purple/70 rounded-lg flex items-center justify-center border border-pastel-purple/80">
                      <Video className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Vídeos</p>
                      <p className="text-xs text-muted-foreground">18 itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-green/70 rounded-lg flex items-center justify-center border border-pastel-green/80">
                      <FileText className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Blog Posts</p>
                      <p className="text-xs text-muted-foreground">15 itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-peach/70 rounded-lg flex items-center justify-center border border-pastel-peach/80">
                      <FileType className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">PDFs</p>
                      <p className="text-xs text-muted-foreground">8 itens</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition">
                    <div className="w-8 h-8 bg-pastel-pink/70 rounded-lg flex items-center justify-center border border-pastel-pink/80">
                      <Mic className="text-pastel-gray-dark" size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Podcasts</p>
                      <p className="text-xs text-muted-foreground">4 itens</p>
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

                {/* Table Body */}
                {filteredItems.map((item, index) => <div key={item.id} className={`${index !== filteredItems.length - 1 ? 'border-b border-border' : ''} hover:bg-muted/30 transition-colors cursor-pointer`}>
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                      <div className="col-span-5 flex items-center gap-4">
                        <div className={`w-10 h-10 ${getTypeColor(item.type)} rounded-lg flex items-center justify-center flex-shrink-0 border ${getTypeColor(item.type).replace('/70', '/80')}`}>
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {item.type === 'article' ? 'Artigo' : item.type === 'video' ? 'Vídeo' : item.type === 'blog' ? 'Blog' : item.type === 'pdf' ? 'PDF' : 'Podcast'} • {item.duration}
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
                      <div className="col-span-1 flex items-center justify-end gap-2">
                        <button onClick={e => {
                      e.stopPropagation();
                      toggleItemStatus(item.id);
                    }} className={`p-2 transition-colors ${item.status === 'completed' ? 'text-pastel-green hover:text-pastel-green/80' : 'text-muted-foreground hover:text-pastel-green'}`} title={item.status === 'completed' ? 'Concluído' : 'Marcar como concluído'}>
                          {item.status === 'completed' ? <CheckCircle size={18} className="fill-current" /> : <CheckCircle size={18} />}
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                  </div>)}
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
    </div>;
}