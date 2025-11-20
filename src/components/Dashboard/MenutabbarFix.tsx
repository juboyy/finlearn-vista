import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TabType = 'todos' | 'podcasts' | 'cursos' | 'avatar-ia' | 'ebooks' | 'webinars' | 'artigos' | 'analises' | 'documentos' | 'estudos';

interface MenutabbarFixProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const MenutabbarFix = ({ activeTab, setActiveTab }: MenutabbarFixProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="px-8 py-6 bg-slate-50 border-b border-slate-200 sticky top-[81px] z-10 bg-opacity-95 backdrop-blur-sm">
      <div className="mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('todos')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'todos' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-table-cells"></i>
            <span>Todos</span>
          </button>
          <button 
            onClick={() => setActiveTab('podcasts')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'podcasts' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-podcast"></i>
            <span>Podcasts</span>
          </button>
          <button 
            onClick={() => setActiveTab('cursos')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'cursos' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-graduation-cap"></i>
            <span>Cursos</span>
          </button>
          <button 
            onClick={() => setActiveTab('avatar-ia')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'avatar-ia' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-robot"></i>
            <span>Avatar IA</span>
          </button>
          <button 
            onClick={() => setActiveTab('ebooks')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'ebooks' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-book-open"></i>
            <span>E-books</span>
          </button>
          <button 
            onClick={() => navigate('/webinars')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'webinars' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-video"></i>
            <span>Webinars</span>
          </button>
          <button 
            onClick={() => setActiveTab('artigos')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'artigos' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-newspaper"></i>
            <span>Artigos</span>
          </button>
          <button 
            onClick={() => setActiveTab('analises')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'analises' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-chart-line"></i>
            <span>Análises</span>
          </button>
          <button 
            onClick={() => setActiveTab('documentos')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'documentos' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-file-alt"></i>
            <span>Documentos</span>
          </button>
          <button 
            onClick={() => setActiveTab('estudos')}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap text-sm ${
              activeTab === 'estudos' ? 'bg-pastel-blue text-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className="fas fa-flask"></i>
            <span>Estudos Acadêmicos</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Buscar podcasts, episódios ou temas..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-blue"
          />
        </div>
        <button className="px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center gap-2 whitespace-nowrap">
          <i className="fas fa-filter"></i>
          <span>Filtro Avançado</span>
        </button>
        <button className="px-5 py-3 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2 whitespace-nowrap">
          <BarChart3 size={18} />
          <span>Analytics</span>
        </button>
        <button className="px-5 py-3 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition flex items-center gap-2 whitespace-nowrap">
          <i className="fas fa-history"></i>
          <span>Histórico</span>
        </button>
      </div>
    </div>
  );
};
