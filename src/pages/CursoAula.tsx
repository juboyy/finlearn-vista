import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import CourseQuizModal from "@/components/Dashboard/CourseQuizModal";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Plus,
  Save,
  Palette
} from "lucide-react";

interface CourseNote {
  id: string;
  title: string;
  content: string;
  tag: string;
  color: 'yellow' | 'blue' | 'green' | 'purple' | 'pink' | 'peach';
  module: string;
  lesson: string;
  timestamp: string;
  createdAt: Date;
}

const CursoAula = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'conteudo' | 'notas'>('conteudo');
  const [activeInfoTab, setActiveInfoTab] = useState<'sobre' | 'materiais' | 'discussao' | 'notas' | 'duvidas'>('sobre');
  const [activeResourceTab, setActiveResourceTab] = useState<'recursos' | 'quiz'>('recursos');
  const [expandedModules, setExpandedModules] = useState<string[]>(['module-1']);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  
  // Note creation state
  const [noteSheetOpen, setNoteSheetOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('');
  const [newNoteColor, setNewNoteColor] = useState<CourseNote['color']>('yellow');
  
  // Video state (simulated - would come from video player)
  const [currentModule] = useState('Módulo 1');
  const [currentLesson] = useState('Aula 3');
  const [currentTimestamp] = useState('12:45');
  
  // Notes list
  const [notes, setNotes] = useState<CourseNote[]>([
    {
      id: '1',
      title: 'Tipos de Ativos',
      content: 'Lembrar de revisar os tipos de ativos: renda fixa, renda variável e fundos de investimento.',
      tag: 'Importante',
      color: 'yellow',
      module: 'Módulo 1',
      lesson: 'Aula 3',
      timestamp: '12:45',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Participantes do Mercado',
      content: 'Participantes do mercado: investidores, corretoras, bolsas e entidades reguladoras (CVM, BACEN).',
      tag: 'Conceito',
      color: 'blue',
      module: 'Módulo 1',
      lesson: 'Aula 2',
      timestamp: '08:32',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Mercado Primário vs Secundário',
      content: 'Mercado primário vs secundário: no primário a empresa emite, no secundário ocorre negociação entre investidores.',
      tag: 'Diferença',
      color: 'green',
      module: 'Módulo 1',
      lesson: 'Aula 1',
      timestamp: '15:20',
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Função do Mercado',
      content: 'Função do mercado de capitais: canalizar recursos da poupança para investimentos produtivos.',
      tag: 'Definição',
      color: 'purple',
      module: 'Módulo 1',
      lesson: 'Aula 1',
      timestamp: '05:10',
      createdAt: new Date()
    }
  ]);

  const colorOptions: { value: CourseNote['color']; label: string; bg: string; border: string }[] = [
    { value: 'yellow', label: 'Amarelo', bg: 'bg-pastel-yellow', border: 'border-pastel-yellow' },
    { value: 'blue', label: 'Azul', bg: 'bg-pastel-blue', border: 'border-pastel-blue' },
    { value: 'green', label: 'Verde', bg: 'bg-pastel-green', border: 'border-pastel-green' },
    { value: 'purple', label: 'Roxo', bg: 'bg-pastel-purple', border: 'border-pastel-purple' },
    { value: 'pink', label: 'Rosa', bg: 'bg-pastel-pink', border: 'border-pastel-pink' },
    { value: 'peach', label: 'Laranja', bg: 'bg-pastel-peach', border: 'border-pastel-peach' },
  ];

  const getColorClasses = (color: CourseNote['color']) => {
    const colorMap = {
      yellow: { bg: 'bg-pastel-yellow/20', border: 'border-pastel-yellow/40', tag: 'bg-pastel-yellow/50' },
      blue: { bg: 'bg-pastel-blue/20', border: 'border-pastel-blue/40', tag: 'bg-pastel-blue/50' },
      green: { bg: 'bg-pastel-green/20', border: 'border-pastel-green/40', tag: 'bg-pastel-green/50' },
      purple: { bg: 'bg-pastel-purple/20', border: 'border-pastel-purple/40', tag: 'bg-pastel-purple/50' },
      pink: { bg: 'bg-pastel-pink/20', border: 'border-pastel-pink/40', tag: 'bg-pastel-pink/50' },
      peach: { bg: 'bg-pastel-peach/20', border: 'border-pastel-peach/40', tag: 'bg-pastel-peach/50' },
    };
    return colorMap[color];
  };

  const handleSaveNote = () => {
    if (!newNoteContent.trim()) return;
    
    const newNote: CourseNote = {
      id: Date.now().toString(),
      title: newNoteTitle || 'Nota sem título',
      content: newNoteContent,
      tag: newNoteTag || 'Geral',
      color: newNoteColor,
      module: currentModule,
      lesson: currentLesson,
      timestamp: currentTimestamp,
      createdAt: new Date()
    };
    
    setNotes(prev => [newNote, ...prev]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTag('');
    setNewNoteColor('yellow');
    setNoteSheetOpen(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

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
              {activeTab === 'conteudo' ? (
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
                      <div className="flex items-center gap-3 p-3 bg-pastel-blue/30 border-l-4 border-pastel-blue cursor-pointer">
                        <div className="w-8 h-8 bg-pastel-blue rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Tipos de Ativos Financeiros</p>
                          <p className="text-xs text-slate-500">25:30</p>
                        </div>
                      </div>
                      
                      {/* Pending lesson */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Operações no Mercado à Vista</p>
                          <p className="text-xs text-slate-500">35:12</p>
                        </div>
                      </div>

                      {/* Material */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-pastel-purple/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3 h-3 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Material: Glossário de Termos</p>
                          <p className="text-xs text-slate-500">PDF</p>
                        </div>
                      </div>
                      
                      {/* Quiz */}
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-pastel-peach/50 rounded-full flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-3 h-3 text-slate-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Questionário Módulo 1</p>
                          <p className="text-xs text-slate-500">10 questões</p>
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
                        <p className="text-xs text-slate-600 mt-1">10 aulas • 4h 30min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-medium">0/10</span>
                    </div>
                  </div>
                  
                  {expandedModules.includes('module-2') && (
                    <div className="bg-white">
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Balanço Patrimonial</p>
                          <p className="text-xs text-slate-500">32:18</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">DRE - Demonstração de Resultado</p>
                          <p className="text-xs text-slate-500">28:45</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Fluxo de Caixa</p>
                          <p className="text-xs text-slate-500">30:20</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Indicadores de Rentabilidade</p>
                          <p className="text-xs text-slate-500">35:10</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Material: Planilha de Análise</p>
                          <p className="text-xs text-slate-500">Excel</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Questionário Módulo 2</p>
                          <p className="text-xs text-slate-500">15 questões</p>
                        </div>
                      </div>
                    </div>
                  )}
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
                        <h3 className="font-semibold text-slate-800 text-sm">Módulo 3: Análise Técnica</h3>
                        <p className="text-xs text-slate-600 mt-1">12 aulas • 5h 15min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-medium">0/12</span>
                    </div>
                  </div>
                  
                  {expandedModules.includes('module-3') && (
                    <div className="bg-white">
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Introdução à Análise Gráfica</p>
                          <p className="text-xs text-slate-500">25:40</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Candlesticks e Padrões</p>
                          <p className="text-xs text-slate-500">38:20</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Suportes e Resistências</p>
                          <p className="text-xs text-slate-500">30:15</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Médias Móveis</p>
                          <p className="text-xs text-slate-500">28:50</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Indicadores de Momentum</p>
                          <p className="text-xs text-slate-500">35:00</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Material: Setup de Trading</p>
                          <p className="text-xs text-slate-500">PDF</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Questionário Módulo 3</p>
                          <p className="text-xs text-slate-500">20 questões</p>
                        </div>
                      </div>
                    </div>
                  )}
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
                        <h3 className="font-semibold text-slate-800 text-sm">Módulo 4: Gestão de Carteira</h3>
                        <p className="text-xs text-slate-600 mt-1">8 aulas • 3h 50min</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-600 font-medium">0/8</span>
                    </div>
                  </div>
                  
                  {expandedModules.includes('module-4') && (
                    <div className="bg-white">
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Teoria Moderna de Portfólio</p>
                          <p className="text-xs text-slate-500">32:45</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Diversificação e Correlação</p>
                          <p className="text-xs text-slate-500">28:30</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Alocação de Ativos</p>
                          <p className="text-xs text-slate-500">29:50</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Rebalanceamento de Carteira</p>
                          <p className="text-xs text-slate-500">25:10</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Material: Simulador de Carteira</p>
                          <p className="text-xs text-slate-500">Excel</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Questionário Módulo 4</p>
                          <p className="text-xs text-slate-500">20 questões</p>
                        </div>
                      </div>
                    </div>
                  )}
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
                  
                  {expandedModules.includes('module-5') && (
                    <div className="bg-white">
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Introdução aos Derivativos</p>
                          <p className="text-xs text-slate-500">28:30</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Mercado Futuro</p>
                          <p className="text-xs text-slate-500">35:15</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Opções: Conceitos Básicos</p>
                          <p className="text-xs text-slate-500">32:40</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Estratégias com Opções</p>
                          <p className="text-xs text-slate-500">40:25</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FileText className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Material: Calculadora de Opções</p>
                          <p className="text-xs text-slate-500">Excel</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">Questionário Módulo 5</p>
                          <p className="text-xs text-slate-500">15 questões</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              ) : (
              <div className="space-y-4">
                {/* Notes Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 text-sm">Minhas Anotações</h3>
                  <button 
                    onClick={() => setNoteSheetOpen(true)}
                    className="flex items-center gap-1 text-xs text-pastel-blue hover:underline font-medium"
                  >
                    <Plus className="w-3 h-3" />
                    Nova Nota
                  </button>
                </div>

                {/* Search Notes */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Buscar nas notas..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pastel-blue/50"
                  />
                </div>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.map((note) => {
                    const colors = getColorClasses(note.color);
                    return (
                      <div key={note.id} className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs text-slate-500">{note.module} - {note.lesson} • {note.timestamp}</span>
                          <button 
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        {note.title && <p className="text-xs font-semibold text-slate-700 mb-1">{note.title}</p>}
                        <p className="text-sm text-slate-700 mb-2">{note.content}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 ${colors.tag} text-slate-600 text-xs rounded`}>{note.tag}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Notes Stats */}
                <div className="bg-slate-50 rounded-lg p-3 mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Total de notas: {notes.length}</span>
                    <span>Última atualização: hoje</span>
                  </div>
                </div>

                {/* New Note Sheet */}
                <Sheet open={noteSheetOpen} onOpenChange={setNoteSheetOpen}>
                  <SheetContent side="right" className="w-[400px] bg-white border-l border-slate-200">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2 text-slate-800">
                        <StickyNote className="w-5 h-5 text-pastel-blue" />
                        Nova Anotação
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="mt-6 space-y-5">
                      {/* Auto-captured info */}
                      <div className="bg-pastel-blue/10 border border-pastel-blue/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-[hsl(207,45%,40%)]" />
                          <span className="text-xs font-medium text-slate-700">Capturado automaticamente</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                          <div>
                            <span className="text-slate-400">Módulo:</span>
                            <p className="font-medium text-slate-700">{currentModule}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Aula:</span>
                            <p className="font-medium text-slate-700">{currentLesson}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Minuto:</span>
                            <p className="font-medium text-slate-700">{currentTimestamp}</p>
                          </div>
                        </div>
                      </div>

                      {/* Note Title */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Título da Nota</label>
                        <Input
                          placeholder="Ex: Conceito importante..."
                          value={newNoteTitle}
                          onChange={(e) => setNewNoteTitle(e.target.value)}
                          className="border-slate-200 focus:ring-pastel-blue/50"
                        />
                      </div>

                      {/* Note Content */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Conteúdo da Nota</label>
                        <Textarea
                          placeholder="Escreva sua anotação aqui..."
                          value={newNoteContent}
                          onChange={(e) => setNewNoteContent(e.target.value)}
                          className="min-h-[120px] border-slate-200 focus:ring-pastel-blue/50 resize-none"
                        />
                      </div>

                      {/* Tag */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Tag / Categoria</label>
                        <Input
                          placeholder="Ex: Importante, Conceito, Dúvida..."
                          value={newNoteTag}
                          onChange={(e) => setNewNoteTag(e.target.value)}
                          className="border-slate-200 focus:ring-pastel-blue/50"
                        />
                      </div>

                      {/* Color Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          Cor da Nota
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => setNewNoteColor(color.value)}
                              className={`w-8 h-8 rounded-full ${color.bg} border-2 transition-all ${
                                newNoteColor === color.value 
                                  ? 'border-slate-600 scale-110' 
                                  : 'border-transparent hover:scale-105'
                              }`}
                              title={color.label}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Preview</label>
                        <div className={`${getColorClasses(newNoteColor).bg} border ${getColorClasses(newNoteColor).border} rounded-lg p-3`}>
                          <span className="text-xs text-slate-500">{currentModule} - {currentLesson} • {currentTimestamp}</span>
                          {newNoteTitle && <p className="text-xs font-semibold text-slate-700 mt-1">{newNoteTitle}</p>}
                          <p className="text-sm text-slate-700 mt-1">{newNoteContent || 'Sua anotação aparecerá aqui...'}</p>
                          <span className={`inline-block mt-2 px-2 py-0.5 ${getColorClasses(newNoteColor).tag} text-slate-600 text-xs rounded`}>
                            {newNoteTag || 'Geral'}
                          </span>
                        </div>
                      </div>

                      {/* Save Button */}
                      <Button 
                        onClick={handleSaveNote}
                        disabled={!newNoteContent.trim()}
                        className="w-full bg-pastel-blue hover:bg-pastel-blue/80 text-slate-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Anotação
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              )}
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
          <main className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            <div className="h-[400px] relative bg-black flex items-center justify-center flex-shrink-0">
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
            <div className="flex-1 flex flex-col bg-white border-t border-slate-200 overflow-hidden">
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

              <div className="p-6 flex-1 overflow-y-auto">
                {/* Sobre a Aula */}
                {activeInfoTab === 'sobre' && (
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
                )}

                {/* Materiais */}
                {activeInfoTab === 'materiais' && (
                  <div className="max-w-4xl">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">Materiais da Aula</h2>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-pastel-blue/20 border border-pastel-blue/40 rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-pastel-blue rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-7 h-7 text-slate-700" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">Slides da Aula</h4>
                            <p className="text-xs text-slate-500 mb-2">PDF - 2.4 MB</p>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full">
                              <Download className="w-3 h-3" /> Baixar
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-pastel-green/20 border border-pastel-green/40 rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-pastel-green rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-7 h-7 text-slate-700" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">Planilha Comparativa</h4>
                            <p className="text-xs text-slate-500 mb-2">XLSX - 1.8 MB</p>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full">
                              <Download className="w-3 h-3" /> Baixar
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-pastel-peach/20 border border-pastel-peach/40 rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-pastel-peach rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-7 h-7 text-slate-700" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">Resumo Executivo</h4>
                            <p className="text-xs text-slate-500 mb-2">PDF - 856 KB</p>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full">
                              <Download className="w-3 h-3" /> Baixar
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-pastel-pink/20 border border-pastel-pink/40 rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-pastel-pink rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-7 h-7 text-slate-700" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1">Glossário de Termos</h4>
                            <p className="text-xs text-slate-500 mb-2">PDF - 420 KB</p>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-white px-2 py-1 rounded-full">
                              <Download className="w-3 h-3" /> Baixar
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pastel-yellow/20 border border-pastel-yellow rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-slate-700 mt-0.5" />
                        <p className="text-sm text-slate-600">Todos os materiais são exclusivos e complementam o conteúdo das aulas. Baixe e mantenha para consultas futuras.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Discussão */}
                {activeInfoTab === 'discussao' && (
                  <div className="max-w-4xl">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-slate-800">Discussão da Aula</h2>
                      <span className="text-sm text-slate-500">24 comentários</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-slate-700">MC</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-slate-800 text-sm">Marina Costa</span>
                              <span className="text-xs text-slate-400">há 2 horas</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">Excelente explicação sobre a diferença entre ações ON e PN! Alguém sabe se existe alguma preferência entre elas para investidores iniciantes?</p>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-pastel-blue transition">
                                <Check className="w-3 h-3" /> 12 curtidas
                              </button>
                              <button className="text-xs text-slate-500 hover:text-pastel-blue transition">Responder</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-pastel-green rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-slate-700">RS</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-slate-800 text-sm">Ricardo Santos</span>
                              <span className="text-xs text-pastel-blue bg-pastel-blue/20 px-2 py-0.5 rounded-full">Instrutor</span>
                              <span className="text-xs text-slate-400">há 1 hora</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">Ótima pergunta, Marina! Para iniciantes, geralmente recomendo começar com ações PN por conta da prioridade nos dividendos. Na próxima aula abordaremos mais detalhes.</p>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-pastel-blue transition">
                                <Check className="w-3 h-3" /> 8 curtidas
                              </button>
                              <button className="text-xs text-slate-500 hover:text-pastel-blue transition">Responder</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-slate-700">PL</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-slate-800 text-sm">Paulo Lima</span>
                              <span className="text-xs text-slate-400">há 30 min</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">A parte sobre FIIs foi muito esclarecedora! Estou considerando diversificar minha carteira com esse tipo de ativo.</p>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-pastel-blue transition">
                                <Check className="w-3 h-3" /> 5 curtidas
                              </button>
                              <button className="text-xs text-slate-500 hover:text-pastel-blue transition">Responder</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <textarea 
                        className="w-full resize-none border-0 focus:ring-0 text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
                        placeholder="Adicione um comentário ou tire uma dúvida..."
                        rows={2}
                      />
                      <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                        <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium hover:bg-pastel-blue/80 transition">
                          Comentar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Minhas Notas */}
                {activeInfoTab === 'notas' && (
                  <div className="max-w-4xl">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-slate-800">Minhas Notas</h2>
                      <button className="flex items-center gap-2 px-3 py-2 bg-pastel-green text-slate-700 rounded-lg text-sm font-medium hover:bg-pastel-green/80 transition">
                        <Plus className="w-4 h-4" /> Nova Nota
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-pastel-yellow/20 border border-pastel-yellow/40 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">05:23 do vídeo</span>
                          <button className="text-slate-400 hover:text-slate-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-700 font-medium mb-2">Diferença ON vs PN</p>
                        <p className="text-xs text-slate-600">Ações ON = direito a voto. Ações PN = prioridade dividendos. Importante para estratégia de longo prazo.</p>
                      </div>

                      <div className="bg-pastel-blue/20 border border-pastel-blue/40 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">12:45 do vídeo</span>
                          <button className="text-slate-400 hover:text-slate-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-700 font-medium mb-2">Características dos FIIs</p>
                        <p className="text-xs text-slate-600">FIIs distribuem 95% do lucro. Isenção de IR para pessoa física. Boa opção para renda passiva.</p>
                      </div>

                      <div className="bg-pastel-green/20 border border-pastel-green/40 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">18:30 do vídeo</span>
                          <button className="text-slate-400 hover:text-slate-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-700 font-medium mb-2">Renda Fixa</p>
                        <p className="text-xs text-slate-600">CDBs, LCIs, LCAs. Garantia do FGC até R$ 250k. Tributação regressiva no tempo.</p>
                      </div>

                      <div className="bg-pastel-peach/20 border border-pastel-peach/40 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">22:10 do vídeo</span>
                          <button className="text-slate-400 hover:text-slate-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-700 font-medium mb-2">ETFs</p>
                        <p className="text-xs text-slate-600">Diversificação automática. Taxas baixas. BOVA11 replica Ibovespa. Boa opção para iniciantes.</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-dashed border-slate-300">
                      <div className="text-center">
                        <StickyNote className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600 mb-2">Adicione notas durante o vídeo</p>
                        <p className="text-xs text-slate-400">Clique no botão de marcador no player para criar uma nota naquele momento</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dúvidas */}
                {activeInfoTab === 'duvidas' && (
                  <div className="max-w-4xl">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-slate-800">Tire suas Dúvidas</h2>
                      <button className="flex items-center gap-2 px-3 py-2 bg-pastel-purple text-slate-700 rounded-lg text-sm font-medium hover:bg-pastel-purple/80 transition">
                        <HelpCircle className="w-4 h-4" /> Fazer Pergunta
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-pastel-pink rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-slate-700">AF</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-slate-800 text-sm">Ana Ferreira</span>
                              <span className="text-xs bg-pastel-green/30 text-slate-600 px-2 py-0.5 rounded-full">Respondida</span>
                            </div>
                            <p className="text-sm text-slate-700 font-medium mb-2">Qual a diferença prática entre CDB e LCI?</p>
                            <div className="bg-pastel-green/10 border-l-4 border-pastel-green rounded p-3 mt-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-slate-700">Resposta do Instrutor</span>
                              </div>
                              <p className="text-xs text-slate-600">A principal diferença está na tributação: CDBs têm IR regressivo, enquanto LCIs são isentas de IR para pessoa física. LCIs também têm lastro em crédito imobiliário.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-pastel-blue rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-slate-700">JM</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-slate-800 text-sm">João Mendes</span>
                              <span className="text-xs bg-pastel-yellow/50 text-slate-600 px-2 py-0.5 rounded-full">Aguardando</span>
                            </div>
                            <p className="text-sm text-slate-700 font-medium mb-2">É possível investir em ETFs internacionais pela B3?</p>
                            <p className="text-xs text-slate-500 mt-2">Perguntado há 3 horas</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-pastel-purple rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-slate-700">CS</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-slate-800 text-sm">Carla Silva</span>
                              <span className="text-xs bg-pastel-green/30 text-slate-600 px-2 py-0.5 rounded-full">Respondida</span>
                            </div>
                            <p className="text-sm text-slate-700 font-medium mb-2">Os derivativos são recomendados para iniciantes?</p>
                            <div className="bg-pastel-green/10 border-l-4 border-pastel-green rounded p-3 mt-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-slate-700">Resposta do Instrutor</span>
                              </div>
                              <p className="text-xs text-slate-600">Derivativos são instrumentos mais complexos e voláteis. Recomendo primeiro dominar os fundamentos de ações e renda fixa antes de explorar esse mercado.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pastel-blue/10 border border-pastel-blue/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-slate-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-700 font-medium mb-1">Dúvidas frequentes são respondidas em até 24h</p>
                          <p className="text-xs text-slate-500">O instrutor e monitores estão disponíveis para ajudar você a entender melhor o conteúdo.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                  onClick={() => setQuizModalOpen(true)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition ${
                    activeResourceTab === 'quiz' ? 'bg-pastel-purple text-slate-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Quiz
                </button>
              </div>
            </div>

            <CourseQuizModal open={quizModalOpen} onOpenChange={setQuizModalOpen} />

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
