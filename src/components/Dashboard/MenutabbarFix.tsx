import { BarChart3, Grid3x3, List, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'relatorios' | 'documentos' | 'estudos' | 'infograficos' | 'whitepaper' | 'apresentacoes' | 'live' | 'entrevistas';
interface MenutabbarFixProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onHistoricoClick?: () => void;
  onAnalyticsClick?: () => void;
  showHistoricoButton?: boolean;
  showAnalyticsButton?: boolean;
  isHistoricoActive?: boolean;
  isAnalyticsActive?: boolean;
}
export const MenutabbarFix = ({
  activeTab,
  setActiveTab,
  onHistoricoClick,
  onAnalyticsClick,
  showHistoricoButton = false,
  showAnalyticsButton = false,
  isHistoricoActive = false,
  isAnalyticsActive = false
}: MenutabbarFixProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return <div className="px-8 pt-4 pb-3 bg-slate-50 border-b border-slate-200">
      <div className="mb-4 relative">
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition shadow-sm">
          <ChevronLeft size={18} />
        </button>
        <div ref={scrollContainerRef} className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-10" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
          <button onClick={() => {
          setActiveTab('todos');
        }} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'todos' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-table-cells"></i>
            <span>Todos</span>
          </button>
          <button onClick={() => setActiveTab('podcasts')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'podcasts' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-podcast"></i>
            <span>Podcasts</span>
          </button>
          <button onClick={() => setActiveTab('cursos')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'cursos' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-graduation-cap"></i>
            <span>Cursos</span>
          </button>
          <button onClick={() => setActiveTab('avatar-ia')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'avatar-ia' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-robot"></i>
            <span>Avatar IA</span>
          </button>
          <button onClick={() => setActiveTab('ebooks')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'ebooks' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-book-open"></i>
            <span>E-books</span>
          </button>
          <button onClick={() => setActiveTab('webinars')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'webinars' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-video"></i>
            <span>Webinars</span>
          </button>
          <button onClick={() => setActiveTab('artigos')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'artigos' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-newspaper"></i>
            <span>Artigos</span>
          </button>
          <button onClick={() => setActiveTab('analises')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'analises' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-chart-line"></i>
            <span>Análises</span>
          </button>
          <button onClick={() => setActiveTab('relatorios')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'relatorios' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-file-invoice"></i>
            <span>Relatórios</span>
          </button>
          <button onClick={() => setActiveTab('documentos')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'documentos' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-file-alt"></i>
            <span>Newspaper</span>
          </button>
          <button onClick={() => setActiveTab('estudos')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'estudos' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-flask"></i>
            <span>Estudos Acadêmicos</span>
          </button>
          <button onClick={() => setActiveTab('infograficos')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'infograficos' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-chart-pie"></i>
            <span>Infográficos</span>
          </button>
          <button onClick={() => setActiveTab('whitepaper')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'whitepaper' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-file-lines"></i>
            <span>Whitepaper</span>
          </button>
          <button onClick={() => setActiveTab('apresentacoes')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'apresentacoes' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-display"></i>
            <span>Apresentações</span>
          </button>
          <button onClick={() => setActiveTab('live')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'live' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-circle-dot"></i>
            <span>Live</span>
          </button>
          <button onClick={() => setActiveTab('entrevistas')} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out flex items-center gap-2 whitespace-nowrap text-sm hover:scale-105 active:scale-95 ${activeTab === 'entrevistas' ? 'bg-pastel-blue text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-pastel-pink/20'}`}>
            <i className="fas fa-comments"></i>
            <span>Entrevistas</span>
          </button>
        </div>
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition shadow-sm">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
          <input type="text" placeholder="Buscar podcasts, episódios ou temas..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
        </div>
        <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:scale-105 active:scale-95">
          <Grid3x3 size={20} />
        </button>
        <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all duration-200 hover:scale-105 active:scale-95">
          <List size={20} />
        </button>
        <button className="px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap">
          <i className="fas fa-filter"></i>
          <span>Filtro Avançado</span>
        </button>
        
        {showAnalyticsButton && onAnalyticsClick && (
          <button 
            onClick={onAnalyticsClick}
            className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap ${
              isAnalyticsActive
                ? 'bg-pastel-green text-slate-800 border border-slate-300' 
                : 'bg-pastel-blue text-slate-700 border border-slate-200 hover:bg-opacity-80'
            }`}
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </button>
        )}
        
        {showHistoricoButton && onHistoricoClick && (
          <button 
            onClick={onHistoricoClick}
            className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap ${
              isHistoricoActive
                ? 'bg-pastel-green text-slate-800 border border-slate-300' 
                : 'bg-pastel-blue text-slate-700 border border-slate-200 hover:bg-opacity-80'
            }`}
          >
            <i className="fas fa-clock-rotate-left"></i>
            <span>Histórico</span>
          </button>
        )}
      </div>
    </div>;
};