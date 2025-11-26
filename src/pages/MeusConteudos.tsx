import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { MenutabbarFix } from "@/components/Dashboard/MenutabbarFix";
import { ArrowLeft, Plus, Filter, ArrowDownWideNarrow, BookOpen, Video, PieChart, Calculator, Search, FileText, Bell, Crown, Podcast, Newspaper, TrendingUp, Users as UsersIcon, Book, GraduationCap, Bot, FileCheck, FlaskConical, Eye, Pen, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live';
type FilterType = 'todos' | 'rascunho' | 'revisao' | 'publicado';

export default function MeusConteudos() {
  const [activeTab, setActiveTab] = useState<TabType>('todos');
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');
  
  const contentItems = [{
    type: "Podcast",
    icon: <Podcast className="w-5 h-5" />,
    bgColor: "bg-[#D8BFD8]",
    title: "Regulação do Open Finance no Brasil",
    subtitle: "Episódio #42 • 45min",
    status: "Publicado",
    statusColor: "bg-[#98D8C8]",
    statusDot: "bg-[#6FA997]",
    date: "15 Out 2024",
    views: "2.4k"
  }, {
    type: "Artigo",
    icon: <Newspaper className="w-5 h-5" />,
    bgColor: "bg-[#B8C5D6]",
    title: "Tendências de Pagamentos Digitais 2025",
    subtitle: "8min de leitura",
    status: "Rascunho",
    statusColor: "bg-[#F4E4A6]",
    statusDot: "bg-[#D4C186]",
    date: "18 Out 2024",
    views: "-"
  }, {
    type: "Análise",
    icon: <TrendingUp className="w-5 h-5" />,
    bgColor: "bg-[#B8D8B8]",
    title: "Projeção Trimestral: Mercado de Capitais Q4",
    subtitle: "Relatório completo • 24 páginas",
    status: "Em Revisão",
    statusColor: "bg-[#B8D4E8]",
    statusDot: "bg-[#88A8C8]",
    date: "20 Out 2024",
    views: "-"
  }, {
    type: "Webinar",
    icon: <Video className="w-5 h-5" />,
    bgColor: "bg-[#F4C8D8]",
    title: "Estratégias de Investimento para 2025",
    subtitle: "Transmissão ao vivo • 1h30min",
    status: "Publicado",
    statusColor: "bg-[#98D8C8]",
    statusDot: "bg-[#6FA997]",
    date: "10 Out 2024",
    views: "5.8k"
  }, {
    type: "E-book",
    icon: <Book className="w-5 h-5" />,
    bgColor: "bg-[#A8A8B8]",
    title: "Guia Completo: Mercado de Meios de Pagamento",
    subtitle: "120 páginas • PDF",
    status: "Concluído",
    statusColor: "bg-[#D8B8D8]",
    statusDot: "bg-[#B898B8]",
    date: "22 Out 2024",
    views: "-"
  }, {
    type: "Curso",
    icon: <GraduationCap className="w-5 h-5" />,
    bgColor: "bg-[#B8C5D6]",
    title: "Fundamentos de Análise de Crédito",
    subtitle: "12 módulos • 8h de conteúdo",
    status: "Rascunho",
    statusColor: "bg-[#F4E4A6]",
    statusDot: "bg-[#D4C186]",
    date: "25 Out 2024",
    views: "-"
  }, {
    type: "Avatar IA",
    icon: <Bot className="w-5 h-5" />,
    bgColor: "bg-[#A8C8D8]",
    title: "Resumo Semanal do Mercado Financeiro",
    subtitle: "Vídeo gerado • 5min",
    status: "Publicado",
    statusColor: "bg-[#98D8C8]",
    statusDot: "bg-[#6FA997]",
    date: "21 Out 2024",
    views: "3.2k"
  }, {
    type: "Documento",
    icon: <FileCheck className="w-5 h-5" />,
    bgColor: "bg-[#B8C5D6]",
    title: "Relatório Anual de Compliance 2024",
    subtitle: "PDF • 86 páginas",
    status: "Em Revisão",
    statusColor: "bg-[#B8D4E8]",
    statusDot: "bg-[#88A8C8]",
    date: "19 Out 2024",
    views: "-"
  }, {
    type: "Estudo",
    icon: <FlaskConical className="w-5 h-5" />,
    bgColor: "bg-[#F4C8A8]",
    title: "Impacto da LGPD no Setor Financeiro",
    subtitle: "Pesquisa acadêmica • 42 páginas",
    status: "Concluído",
    statusColor: "bg-[#D8B8D8]",
    statusDot: "bg-[#B898B8]",
    date: "17 Out 2024",
    views: "-"
  }];

  const filteredItems = contentItems.filter(item => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'rascunho') return item.status === 'Rascunho';
    if (activeFilter === 'revisao') return item.status === 'Em Revisão';
    if (activeFilter === 'publicado') return item.status === 'Publicado';
    return true;
  });

  return <div className="flex min-h-screen w-full bg-background">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/aprendizado" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-semibold text-foreground">Meus Conteúdos</h1>
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
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtrar
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors flex items-center gap-2">
                    <ArrowDownWideNarrow className="w-4 h-4" />
                    Ordenar
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
                        <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredItems.map((item, index) => <tr key={index} className="hover:bg-accent/5 transition-colors group">
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
                            <div className="flex items-center justify-end gap-2">
                              <button className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                <Pen className="w-4 h-4" />
                              </button>
                              <button className="w-8 h-8 rounded-lg hover:bg-accent/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Mostrando</span>
                    <select className="px-3 py-1.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                    <span className="text-sm text-muted-foreground">de {filteredItems.length} conteúdos</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button disabled className="px-3 py-1.5 text-sm font-medium text-muted-foreground bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      ‹
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary border border-primary rounded-lg">
                      1
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors">
                      2
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors">
                      3
                    </button>
                    <span className="px-2 text-muted-foreground">...</span>
                    <button className="px-3 py-1.5 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors">
                      13
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors">
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>;
}