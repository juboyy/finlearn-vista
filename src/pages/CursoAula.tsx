import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, 
  Settings, 
  Expand, 
  List, 
  MessageSquare, 
  ChevronDown, 
  ChevronRight,
  Check,
  Play,
  FileText,
  ClipboardList,
  Trophy,
  Bookmark,
  Share2,
  StepBack,
  Rewind,
  FastForward,
  StepForward,
  Captions,
  Gauge,
  Info,
  File,
  MessagesSquare,
  StickyNote,
  HelpCircle,
  Clock,
  Signal,
  Lightbulb,
  Download,
  GraduationCap,
  Search,
  X,
  Plus
} from "lucide-react";

const CursoAula = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'conteudo' | 'notas'>('conteudo');
  const [activeInfoTab, setActiveInfoTab] = useState<'sobre' | 'materiais' | 'discussao' | 'notas' | 'duvidas'>('sobre');
  const [activeResourceTab, setActiveResourceTab] = useState<'recursos' | 'quiz'>('recursos');
  const [expandedModules, setExpandedModules] = useState<string[]>(['module-1']);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <SidebarFix />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header padrão da plataforma */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 flex-shrink-0">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Aula do Curso</h1>
            <p className="text-sm text-slate-500">Análise Técnica Avançada</p>
          </div>
        </header>

        {/* Course Player Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Course Sidebar */}
          <aside className="w-80 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                    <Expand className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h2 className="font-semibold text-slate-800 mb-1">Domine o Mercado de Capitais em 2025</h2>
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                <span>42 aulas</span>
                <span>•</span>
                <span>28h total</span>
              </div>
              <div className="bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                <div className="bg-pastel-blue h-full rounded-full" style={{ width: '24%' }}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">24% concluído</span>
                <span className="text-slate-800 font-medium">10 de 42 aulas</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('conteudo')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                  activeTab === 'conteudo' ? 'bg-pastel-blue text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <List className="w-4 h-4" />
                Conteúdo
              </button>
              <button 
                onClick={() => setActiveTab('notas')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition ${
                  activeTab === 'notas' ? 'bg-pastel-blue text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Notas
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {/* Module 1 - Expanded */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div 
                    onClick={() => toggleModule('module-1')}
                    className="bg-pastel-blue/50 p-3 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {expandedModules.includes('module-1') ? (
                        <ChevronDown className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-700" />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">Módulo 1: Fundamentos</h3>
                        <p className="text-xs text-slate-600 mt-1">8 aulas • 3h 45min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-pastel-green rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-slate-700" />
                    </div>
                  </div>
                  
                  {expandedModules.includes('module-1') && (
                    <div className="bg-white">
                      {/* Completed lesson */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-pastel-green rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Introdução ao Mercado de Capitais</p>
                          <p className="text-xs text-slate-500">28:42</p>
                        </div>
                      </div>
                      
                      {/* Completed lesson */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-pastel-green rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Participantes do Mercado</p>
                          <p className="text-xs text-slate-500">32:15</p>
                        </div>
                      </div>
                      
                      {/* Current lesson */}
                      <div className="flex items-center gap-3 p-3 bg-pastel-blue/30 cursor-pointer border-l-4 border-pastel-blue">
                        <div className="w-8 h-8 bg-pastel-blue rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Tipos de Ativos Financeiros</p>
                          <p className="text-xs text-slate-600">25:38 • Assistindo</p>
                        </div>
                      </div>
                      
                      {/* Pending lessons */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Mercado Primário e Secundário</p>
                          <p className="text-xs text-slate-500">30:22</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Índices de Mercado</p>
                          <p className="text-xs text-slate-500">27:18</p>
                        </div>
                      </div>
                      
                      {/* Material */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Material: Glossário Completo</p>
                          <p className="text-xs text-slate-500">PDF</p>
                        </div>
                      </div>
                      
                      {/* Quiz */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Questionário Módulo 1</p>
                          <p className="text-xs text-slate-500">15 questões</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Module 2 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div 
                    onClick={() => toggleModule('module-2')}
                    className="bg-slate-50 p-3 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {expandedModules.includes('module-2') ? (
                        <ChevronDown className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-700" />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">Módulo 2: Análise Fundamentalista</h3>
                        <p className="text-xs text-slate-600 mt-1">10 aulas • 4h 20min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-medium">0/10</span>
                    </div>
                  </div>
                </div>

                {/* Module 3 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div 
                    onClick={() => toggleModule('module-3')}
                    className="bg-slate-50 p-3 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {expandedModules.includes('module-3') ? (
                        <ChevronDown className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-700" />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">Módulo 3: Valuation e Precificação</h3>
                        <p className="text-xs text-slate-600 mt-1">8 aulas • 3h 55min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-medium">0/8</span>
                    </div>
                  </div>
                </div>

                {/* Module 4 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div 
                    onClick={() => toggleModule('module-4')}
                    className="bg-slate-50 p-3 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {expandedModules.includes('module-4') ? (
                        <ChevronDown className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-700" />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">Módulo 4: Gestão de Portfólios</h3>
                        <p className="text-xs text-slate-600 mt-1">9 aulas • 4h 10min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-medium">0/9</span>
                    </div>
                  </div>
                </div>

                {/* Module 5 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div 
                    onClick={() => toggleModule('module-5')}
                    className="bg-slate-50 p-3 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {expandedModules.includes('module-5') ? (
                        <ChevronDown className="w-4 h-4 text-slate-700" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-700" />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">Módulo 5: Derivativos</h3>
                        <p className="text-xs text-slate-600 mt-1">7 aulas • 3h 30min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-medium">0/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Footer */}
            <div className="p-4 border-t border-slate-200 bg-pastel-green/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pastel-green rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-slate-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">Continue aprendendo!</p>
                  <p className="text-xs text-slate-600">Você está indo muito bem</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-lg p-2">
                  <p className="text-lg font-bold text-slate-800">10</p>
                  <p className="text-xs text-slate-600">Aulas</p>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <p className="text-lg font-bold text-slate-800">6h</p>
                  <p className="text-xs text-slate-600">Assistidas</p>
                </div>
                <div className="bg-white rounded-lg p-2">
                  <p className="text-lg font-bold text-slate-800">5</p>
                  <p className="text-xs text-slate-600">Dias</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Video Player Main */}
          <main className="flex-1 flex flex-col bg-slate-900">
            <div className="flex-1 relative bg-black flex items-center justify-center min-h-0">
              <img 
                className="w-full h-full object-contain" 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c37907bb40-efb5c703a3adf9ca8913.png" 
                alt="financial instructor explaining asset types with charts and diagrams"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
              
              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white transition">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="bg-black/60 px-4 py-2 rounded-lg">
                    <p className="text-white text-sm font-medium">Módulo 1 - Aula 3</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white transition">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition">
                  <Play className="w-8 h-8 text-slate-800 ml-1" fill="currentColor" />
                </button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between text-white text-sm mb-2">
                    <span>8:24</span>
                    <span>25:38</span>
                  </div>
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-pastel-blue rounded-full" style={{ width: '32.8%' }}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-pastel-blue transition">
                      <StepBack className="w-6 h-6" />
                    </button>
                    <button className="text-white hover:text-pastel-blue transition">
                      <Rewind className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition">
                      <Play className="w-5 h-5 text-slate-800 ml-0.5" fill="currentColor" />
                    </button>
                    <button className="text-white hover:text-pastel-blue transition">
                      <FastForward className="w-5 h-5" />
                    </button>
                    <button className="text-white hover:text-pastel-blue transition">
                      <StepForward className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-pastel-blue transition">
                      <Captions className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-black/60 px-3 py-2 rounded-lg">
                      <Gauge className="w-4 h-4 text-white" />
                      <select className="bg-transparent text-white text-sm border-none outline-none cursor-pointer">
                        <option value="1">1.0x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2.0x</option>
                      </select>
                    </div>
                    <button className="text-white hover:text-pastel-blue transition">
                      <Settings className="w-6 h-6" />
                    </button>
                    <button className="text-white hover:text-pastel-blue transition">
                      <Expand className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info Tabs */}
            <div className="bg-white border-t border-slate-200">
              <div className="flex items-center border-b border-slate-200">
                <button 
                  onClick={() => setActiveInfoTab('sobre')}
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                    activeInfoTab === 'sobre' 
                      ? 'text-slate-800 border-b-2 border-pastel-blue' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  Sobre a Aula
                </button>
                <button 
                  onClick={() => setActiveInfoTab('materiais')}
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition ${
                    activeInfoTab === 'materiais' 
                      ? 'text-slate-800 border-b-2 border-pastel-blue' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <File className="w-4 h-4" />
                  Materiais
                </button>
                <button 
                  onClick={() => setActiveInfoTab('discussao')}
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition ${
                    activeInfoTab === 'discussao' 
                      ? 'text-slate-800 border-b-2 border-pastel-blue' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <MessagesSquare className="w-4 h-4" />
                  Discussão
                </button>
                <button 
                  onClick={() => setActiveInfoTab('notas')}
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition ${
                    activeInfoTab === 'notas' 
                      ? 'text-slate-800 border-b-2 border-pastel-blue' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <StickyNote className="w-4 h-4" />
                  Minhas Notas
                </button>
                <button 
                  onClick={() => setActiveInfoTab('duvidas')}
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition ${
                    activeInfoTab === 'duvidas' 
                      ? 'text-slate-800 border-b-2 border-pastel-blue' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  Dúvidas
                </button>
              </div>

              <div className="p-6">
                <div className="max-w-4xl">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">Tipos de Ativos Financeiros</h2>
                  
                  <div className="mb-6">
                    <p className="text-sm text-slate-600 mb-3">
                      Nesta aula, você aprenderá sobre os principais tipos de ativos financeiros disponíveis no mercado de capitais. Vamos explorar as características, riscos e retornos esperados de cada categoria de ativo.
                    </p>
                    <p className="text-sm text-slate-600 mb-3">
                      Compreender os diferentes tipos de ativos é fundamental para construir uma carteira de investimentos diversificada e alinhada com seus objetivos financeiros.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Tópicos Abordados</h3>
                    <div className="space-y-2">
                      {[
                        'Ações ordinárias e preferenciais',
                        'Títulos de renda fixa (públicos e privados)',
                        'Fundos de investimento e ETFs',
                        'Derivativos (opções, futuros e swaps)',
                        'Fundos imobiliários (FIIs)',
                        'Certificados de depósito bancário (CDBs)'
                      ].map((topic, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="w-6 h-6 bg-pastel-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-slate-700" />
                          </div>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-pastel-blue/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-slate-700" />
                        <span className="text-sm font-medium text-slate-800">Duração</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">25:38</p>
                    </div>
                    <div className="bg-pastel-green/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Signal className="w-4 h-4 text-slate-700" />
                        <span className="text-sm font-medium text-slate-800">Nível</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">Iniciante</p>
                    </div>
                    <div className="bg-pastel-purple/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <File className="w-4 h-4 text-slate-700" />
                        <span className="text-sm font-medium text-slate-800">Materiais</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">3 arquivos</p>
                    </div>
                  </div>

                  <div className="bg-pastel-yellow/20 border border-pastel-yellow rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-slate-700 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Dica do Instrutor</h4>
                        <p className="text-sm text-slate-600">Faça anotações sobre cada tipo de ativo e suas características principais. Isso facilitará a compreensão dos módulos seguintes sobre análise e seleção de investimentos.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Resources Sidebar */}
          <aside className="w-96 bg-white border-l border-slate-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <button 
                  onClick={() => setActiveResourceTab('recursos')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                    activeResourceTab === 'recursos' ? 'bg-pastel-purple text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Recursos
                </button>
                <button 
                  onClick={() => setActiveResourceTab('quiz')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition ${
                    activeResourceTab === 'quiz' ? 'bg-pastel-purple text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Quiz
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {/* Downloads Section */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Materiais para Download</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer transition">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 text-sm mb-1">Slides da Aula 3</h4>
                          <p className="text-xs text-slate-500 mb-2">PDF • 2.4 MB</p>
                          <button className="text-xs text-pastel-blue hover:underline font-medium flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            Baixar
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer transition">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-pastel-green rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-file-excel text-slate-700"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 text-sm mb-1">Planilha Comparativa de Ativos</h4>
                          <p className="text-xs text-slate-500 mb-2">XLSX • 1.8 MB</p>
                          <button className="text-xs text-pastel-green hover:underline font-medium flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            Baixar
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 cursor-pointer transition">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-pastel-purple rounded-lg flex items-center justify-center flex-shrink-0">
                          <File className="w-5 h-5 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 text-sm mb-1">Resumo Executivo</h4>
                          <p className="text-xs text-slate-500 mb-2">PDF • 856 KB</p>
                          <button className="text-xs text-pastel-purple hover:underline font-medium flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            Baixar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transcript Section */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-800">Transcrição</h3>
                    <button className="text-xs text-slate-600 hover:text-slate-800 flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      Buscar
                    </button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <div className="text-sm text-slate-600 hover:bg-slate-50 p-2 rounded cursor-pointer">
                      <span className="text-xs text-slate-500 font-medium">00:00</span>
                      <p className="mt-1">Olá, bem-vindo à aula sobre tipos de ativos financeiros. Hoje vamos explorar as principais categorias de investimentos disponíveis no mercado de capitais.</p>
                    </div>
                    <div className="text-sm text-slate-600 hover:bg-slate-50 p-2 rounded cursor-pointer">
                      <span className="text-xs text-slate-500 font-medium">00:32</span>
                      <p className="mt-1">Começaremos pelas ações, que representam a menor fração do capital social de uma empresa. Existem dois tipos principais: ordinárias e preferenciais.</p>
                    </div>
                    <div className="text-sm text-slate-600 hover:bg-slate-50 p-2 rounded cursor-pointer">
                      <span className="text-xs text-slate-500 font-medium">01:15</span>
                      <p className="mt-1">As ações ordinárias, identificadas pela sigla ON, conferem direito a voto nas assembleias da empresa. Já as preferenciais, PN, têm prioridade no recebimento de dividendos.</p>
                    </div>
                    <div className="text-sm text-slate-600 hover:bg-slate-50 p-2 rounded cursor-pointer">
                      <span className="text-xs text-slate-500 font-medium">02:08</span>
                      <p className="mt-1">Agora vamos falar sobre títulos de renda fixa. Estes são investimentos onde você conhece antecipadamente a forma de remuneração.</p>
                    </div>
                  </div>
                </div>

                {/* Bookmarks Section */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Seus Marcadores</h3>
                  <div className="space-y-2">
                    <div className="bg-pastel-yellow/20 border border-pastel-yellow rounded-lg p-3 cursor-pointer hover:bg-pastel-yellow/30 transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-700">05:23</span>
                        <button className="text-slate-400 hover:text-slate-600">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600">Diferença entre ações ON e PN</p>
                    </div>
                    <div className="bg-pastel-yellow/20 border border-pastel-yellow rounded-lg p-3 cursor-pointer hover:bg-pastel-yellow/30 transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-700">12:45</span>
                        <button className="text-slate-400 hover:text-slate-600">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600">Características dos FIIs</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar Marcador
                  </button>
                </div>
              </div>
            </div>

            {/* Next Lesson Footer */}
            <div className="p-4 border-t border-slate-200 bg-pastel-blue/20">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Próxima Aula</h4>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-medium text-slate-800 mb-1">Mercado Primário e Secundário</p>
                  <p className="text-xs text-slate-600 mb-3">30:22 • Módulo 1</p>
                  <button className="w-full px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-pastel-blue/80 transition">
                    Ir para Próxima Aula
                  </button>
                </div>
              </div>
              <button className="w-full px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-white transition flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Marcar como Concluída
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CursoAula;
