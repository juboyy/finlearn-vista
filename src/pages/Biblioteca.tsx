import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Search, Bell, Plus, Folder, FolderOpen, Star, MoreHorizontal, FileText, Mic, Link as LinkIcon, ChevronLeft, ChevronRight, StickyNote, X, CalendarCheck } from "lucide-react";
import { useState } from "react";

export function Biblioteca() {
  const [showModal, setShowModal] = useState(false);

  const libraryItems = [
    {
      id: 1,
      title: "Estratégias de Day Trade",
      description: "Anotações sobre padrões gráficos e indicadores técnicos...",
      type: "Nota",
      typeColor: "#7FA8C9",
      icon: "file-alt",
      modifiedDate: "17/11/2024",
      modifiedRelative: "há 2 horas",
      createdDate: "15/11/2024",
      createdTime: "10:30",
      starred: false
    },
    {
      id: 2,
      title: "Resumo Webinar IA",
      description: "",
      type: "Áudio",
      typeColor: "#A68CC9",
      icon: "microphone",
      audioProgress: 75,
      audioDuration: "12:34",
      modifiedDate: "16/11/2024",
      modifiedRelative: "há 1 dia",
      createdDate: "16/11/2024",
      createdTime: "19:20",
      starred: false
    },
    {
      id: 3,
      title: "Link - Análise Mercado B3",
      description: "Relatório trimestral sobre performance das ações mais negociadas",
      type: "Link",
      typeColor: "#8CC99B",
      icon: "link",
      modifiedDate: "15/11/2024",
      modifiedRelative: "há 2 dias",
      createdDate: "12/11/2024",
      createdTime: "14:15",
      starred: true
    },
    {
      id: 4,
      title: "Rascunho - Estudo ETFs",
      description: "Comparativo entre diferentes ETFs de renda variável disponíveis no mercado brasileiro",
      type: "Rascunho",
      typeColor: "#C99BA6",
      icon: "file-alt",
      modifiedDate: "14/11/2024",
      modifiedRelative: "há 3 dias",
      createdDate: "10/11/2024",
      createdTime: "16:45",
      starred: false
    },
    {
      id: 5,
      title: "Podcast - Fundos Imobiliários",
      description: "",
      type: "Áudio",
      typeColor: "#A68CC9",
      icon: "microphone",
      audioProgress: 100,
      audioDuration: "45:12",
      modifiedDate: "13/11/2024",
      modifiedRelative: "há 4 dias",
      createdDate: "13/11/2024",
      createdTime: "11:00",
      starred: false
    },
    {
      id: 6,
      title: "Cronograma de Estudos",
      description: "Planejamento semanal de conteúdos a estudar e revisar",
      type: "Nota",
      typeColor: "#8CC99B",
      icon: "calendar-check",
      modifiedDate: "10/11/2024",
      modifiedRelative: "há 1 semana",
      createdDate: "03/11/2024",
      createdTime: "08:00",
      starred: true,
      showStarInTitle: true
    },
    {
      id: 7,
      title: "Regulamentação CVM",
      description: "Principais normas e instruções da CVM para o mercado de capitais",
      type: "Nota",
      typeColor: "#A68CC9",
      icon: "file-alt",
      modifiedDate: "08/11/2024",
      modifiedRelative: "há 1 semana",
      createdDate: "01/11/2024",
      createdTime: "09:30",
      starred: false
    }
  ];

  const folders = [
    { name: "Todas as Notas", count: 47, color: "#B8D4E8", active: true },
    { name: "Análise Técnica", count: 12, color: "#7FA8C9", active: false },
    { name: "Compliance", count: 8, color: "#A68CC9", active: false },
    { name: "Regulamentação", count: 15, color: "#8CC99B", active: false },
    { name: "Estratégias", count: 6, color: "#C9A68C", active: false },
    { name: "Ideias", count: 6, color: "#C99BA6", active: false }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "microphone":
        return <Mic className="h-5 w-5 text-slate-600" />;
      case "link":
        return <LinkIcon className="h-5 w-5 text-slate-600" />;
      case "calendar-check":
        return <CalendarCheck className="h-5 w-5 text-slate-600" />;
      default:
        return <FileText className="h-5 w-5 text-slate-600" />;
    }
  };

  const getSmallIconComponent = (iconName: string) => {
    switch (iconName) {
      case "microphone":
        return <Mic className="h-3 w-3" />;
      case "link":
        return <LinkIcon className="h-3 w-3" />;
      case "calendar-check":
        return <CalendarCheck className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Minha Biblioteca</h1>
              <p className="text-sm text-slate-500 mt-1">Organize seu conhecimento e anotações</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar na biblioteca..."
                  className="w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ outlineColor: '#B8D4E8' }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 rounded-lg font-medium hover:bg-opacity-80 transition text-slate-700"
                style={{ backgroundColor: '#D4C5E8' }}
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Novo Item
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-80 space-y-6">
              {/* Folders */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Pastas</h2>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {folders.map((folder, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer group transition ${
                        folder.active ? 'text-slate-800' : 'hover:bg-slate-100'
                      }`}
                      style={folder.active ? { backgroundColor: folder.color, color: '#1e293b' } : {}}
                    >
                      <div className="relative">
                        {folder.active ? (
                          <FolderOpen className="h-4 w-4 text-slate-600" />
                        ) : (
                          <Folder className="h-4 w-4" style={{ color: folder.color }} />
                        )}
                      </div>
                      <span className={`text-sm ${folder.active ? 'font-medium' : 'text-slate-700'}`}>
                        {folder.name}
                      </span>
                      <span
                        className={`ml-auto text-xs px-2 py-1 rounded-full ${
                          folder.active ? 'bg-white' : 'text-slate-500'
                        }`}
                      >
                        {folder.count}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tags */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Tags</h2>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs rounded-full text-slate-700 cursor-pointer transition" style={{ backgroundColor: '#B8D4E8' }}>
                    fintech
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-slate-200 cursor-pointer transition">
                    regulação
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-slate-200 cursor-pointer transition">
                    open-finance
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-slate-200 cursor-pointer transition">
                    blockchain
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-slate-200 cursor-pointer transition">
                    pix
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-slate-200 cursor-pointer transition">
                    drex
                  </span>
                </div>
              </section>

              {/* Stats */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total de Itens</span>
                    <span className="text-sm font-semibold text-slate-800">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Favoritos</span>
                    <span className="text-sm font-semibold text-slate-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Última Modificação</span>
                    <span className="text-sm font-semibold text-slate-800">Hoje</span>
                  </div>
                </div>
              </section>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Filter Bar */}
              <div className="flex items-center gap-4 mb-6">
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent">
                  <option>Todos os Tipos</option>
                  <option>Notas</option>
                  <option>Áudios</option>
                  <option>Links</option>
                  <option>Rascunhos</option>
                </select>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent">
                  <option>Modificado Recentemente</option>
                  <option>Criado Recentemente</option>
                  <option>Nome (A-Z)</option>
                  <option>Nome (Z-A)</option>
                </select>
                <div className="flex gap-2 ml-auto">
                  <button className="p-2 rounded-lg transition text-slate-700" style={{ backgroundColor: '#B8D4E8' }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="col-span-5 text-xs font-semibold text-slate-600 uppercase">Nome</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-600 uppercase">Tipo</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-600 uppercase">Modificado</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-600 uppercase">Criado</div>
                  <div className="col-span-1 text-xs font-semibold text-slate-600 uppercase text-right">Ações</div>
                </div>

                {/* Items */}
                {libraryItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                      <div className="col-span-5 flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.typeColor }}
                        >
                          {getIconComponent(item.icon)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-800 truncate flex items-center gap-2">
                            {item.title}
                            {item.showStarInTitle && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-slate-500 truncate">{item.description}</p>
                          )}
                          {item.audioProgress !== undefined && (
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-32 bg-slate-200 rounded-full h-1">
                                <div
                                  className="h-1 rounded-full"
                                  style={{
                                    backgroundColor: item.typeColor,
                                    width: `${item.audioProgress}%`
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs text-slate-500 font-mono">{item.audioDuration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1 text-white rounded-full text-xs font-medium"
                          style={{ backgroundColor: item.typeColor }}
                        >
                          {getSmallIconComponent(item.icon)}
                          {item.type}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-slate-700">{item.modifiedDate}</div>
                        <div className="text-xs text-slate-500">{item.modifiedRelative}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm text-slate-700">{item.createdDate}</div>
                        <div className="text-xs text-slate-500">{item.createdTime}</div>
                      </div>
                      <div className="col-span-1 flex items-center justify-end gap-2">
                        <button
                          className={`p-2 transition-colors ${
                            item.starred
                              ? 'text-yellow-600 hover:text-yellow-700'
                              : 'text-slate-400 hover:text-yellow-600'
                          }`}
                        >
                          <Star className={`h-4 w-4 ${item.starred ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Pagination */}
              <section className="flex items-center justify-center pt-6">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <ChevronLeft className="h-4 w-4 inline mr-2" />
                    Anterior
                  </button>
                  <button className="px-4 py-2 rounded-lg font-medium text-slate-700" style={{ backgroundColor: '#B8D4E8' }}>
                    1
                  </button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">2</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">3</button>
                  <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    Próximo
                    <ChevronRight className="h-4 w-4 inline ml-2" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Novo Item</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-[#B8D4E8] transition" style={{ '--hover-bg': 'rgba(184, 212, 232, 0.2)' } as any}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                  <StickyNote className="h-6 w-6 text-slate-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-800">Nova Nota</p>
                  <p className="text-sm text-slate-500">Criar nota de texto</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-[#D4C5E8] transition" style={{ '--hover-bg': 'rgba(212, 197, 232, 0.2)' } as any}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                  <Mic className="h-6 w-6 text-slate-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-800">Gravação de Áudio</p>
                  <p className="text-sm text-slate-500">Gravar nota de voz</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-[#C5E8D4] transition" style={{ '--hover-bg': 'rgba(197, 232, 212, 0.2)' } as any}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                  <Folder className="h-6 w-6 text-slate-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-800">Nova Pasta</p>
                  <p className="text-sm text-slate-500">Organizar conteúdo</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
