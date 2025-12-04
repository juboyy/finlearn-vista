import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, ArrowRight, Save, Plus, Folder, Video, FileText, Eye, Edit, Trash2, GripVertical, ChevronDown, Lightbulb, Check, HelpCircle, ClipboardCheck, FileQuestion, File, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  materials: number;
  type: 'video' | 'text' | 'quiz' | 'exercise' | 'project';
}

interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
  totalDuration: string;
  color: string;
  isExpanded: boolean;
}

export default function CriarEbookEtapa2() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      number: 1,
      title: 'Fundamentos do Mercado de Capitais',
      description: 'Introdução aos conceitos básicos e estrutura do mercado financeiro brasileiro',
      totalDuration: '2h 45m',
      color: 'pastel-blue',
      isExpanded: true,
      lessons: [
        { id: '1-1', title: 'Introdução ao Mercado de Capitais', duration: '35min', materials: 3, type: 'video' },
        { id: '1-2', title: 'Estrutura do Sistema Financeiro Nacional', duration: '42min', materials: 5, type: 'video' },
        { id: '1-3', title: 'Principais Instituições e Reguladores', duration: '50min', materials: 8, type: 'text' },
        { id: '1-4', title: 'Tipos de Ativos e Instrumentos Financeiros', duration: '38min', materials: 6, type: 'video' },
      ]
    },
    {
      id: '2',
      number: 2,
      title: 'Análise de Investimentos',
      description: 'Técnicas e metodologias para análise e avaliação de ativos financeiros',
      totalDuration: '3h 20m',
      color: 'pastel-purple',
      isExpanded: true,
      lessons: [
        { id: '2-1', title: 'Análise Fundamentalista - Parte 1', duration: '45min', materials: 4, type: 'video' },
        { id: '2-2', title: 'Análise Fundamentalista - Parte 2', duration: '48min', materials: 3, type: 'video' },
        { id: '2-3', title: 'Análise Técnica e Gráfica', duration: '52min', materials: 7, type: 'video' },
        { id: '2-4', title: 'Métodos de Valuation', duration: '40min', materials: 5, type: 'text' },
        { id: '2-5', title: 'Exercício Prático: Análise Completa de Ativo', duration: '55min', materials: 2, type: 'exercise' },
      ]
    },
    {
      id: '3',
      number: 3,
      title: 'Gestão de Portfólios',
      description: 'Estratégias de construção e gestão de carteiras de investimento',
      totalDuration: '2h 25m',
      color: 'pastel-green',
      isExpanded: true,
      lessons: [
        { id: '3-1', title: 'Teoria Moderna de Portfólios', duration: '50min', materials: 4, type: 'video' },
        { id: '3-2', title: 'Diversificação e Gestão de Riscos', duration: '48min', materials: 6, type: 'video' },
        { id: '3-3', title: 'Projeto Final: Construa seu Portfólio', duration: '47min', materials: 3, type: 'project' },
      ]
    }
  ]);

  const [settings, setSettings] = useState({
    releaseByModule: false,
    certificate: true,
    downloadMaterials: true
  });

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, isExpanded: !m.isExpanded } : m
    ));
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Vídeo';
      case 'text': return 'Texto + Quiz';
      case 'quiz': return 'Quiz';
      case 'exercise': return 'Exercício';
      case 'project': return 'Projeto';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-[hsl(var(--pastel-green))]/30';
      case 'text': return 'bg-[hsl(var(--pastel-yellow))]/30';
      case 'quiz': return 'bg-[hsl(var(--pastel-yellow))]/30';
      case 'exercise': return 'bg-[hsl(var(--pastel-pink))]/30';
      case 'project': return 'bg-[hsl(var(--pastel-pink))]/30';
      default: return 'bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-muted-foreground" />;
      case 'text': return <FileText className="w-4 h-4 text-muted-foreground" />;
      case 'quiz': return <FileQuestion className="w-4 h-4 text-muted-foreground" />;
      case 'exercise': return <ClipboardCheck className="w-4 h-4 text-muted-foreground" />;
      case 'project': return <ClipboardCheck className="w-4 h-4 text-muted-foreground" />;
      default: return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getModuleColor = (color: string) => {
    switch (color) {
      case 'pastel-blue': return 'bg-[hsl(var(--pastel-blue))]';
      case 'pastel-purple': return 'bg-[hsl(var(--pastel-purple))]';
      case 'pastel-green': return 'bg-[hsl(var(--pastel-green))]';
      default: return 'bg-[hsl(var(--pastel-blue))]';
    }
  };

  const getModuleBgColor = (color: string) => {
    switch (color) {
      case 'pastel-blue': return 'bg-[hsl(var(--pastel-blue))]/20';
      case 'pastel-purple': return 'bg-[hsl(var(--pastel-purple))]/20';
      case 'pastel-green': return 'bg-[hsl(var(--pastel-green))]/20';
      default: return 'bg-[hsl(var(--pastel-blue))]/20';
    }
  };

  const totalModules = modules.length;
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalMaterials = modules.reduce((acc, m) => acc + m.lessons.reduce((a, l) => a + l.materials, 0), 0);
  const totalExercises = modules.reduce((acc, m) => acc + m.lessons.filter(l => l.type === 'exercise' || l.type === 'project').length, 0);
  const totalQuizzes = modules.reduce((acc, m) => acc + m.lessons.filter(l => l.type === 'quiz' || l.type === 'text').length, 0);

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/criar-ebook" className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Conteúdo do E-book</h1>
                <p className="text-sm text-muted-foreground mt-1">Organize capítulos, seções e materiais</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Rascunho
              </button>
              <button className="px-5 py-2 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed">
                Publicar E-book
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-green))] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Informações Básicas</h3>
                    <p className="text-xs text-muted-foreground">Título, descrição e categoria</p>
                  </div>
                </div>
                <div className="flex-1 mx-6 h-1 bg-[hsl(var(--pastel-blue))] rounded-full"></div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-blue))] rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Conteúdo do E-book</h3>
                    <p className="text-xs text-muted-foreground">Capítulos, seções e materiais</p>
                  </div>
                </div>
                <div className="flex-1 mx-6 h-1 bg-muted rounded-full">
                  <div className="h-full bg-[hsl(var(--pastel-blue))] rounded-full" style={{ width: '66%' }}></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-muted-foreground">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Preços e Publicação</h3>
                    <p className="text-xs text-muted-foreground">Valores e formas de pagamento</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Etapa 2 de 3</span>
                <span>66% Completo</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Modules */}
            <div className="col-span-2 space-y-6">
              {/* Course Structure Overview */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Estrutura do E-book</h2>
                    <p className="text-sm text-muted-foreground mt-1">Organize seu conteúdo em capítulos e seções</p>
                  </div>
                  <button className="px-4 py-2 bg-[hsl(var(--pastel-blue))] text-foreground rounded-lg font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Capítulo
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[hsl(var(--pastel-blue))]/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground mb-1">{totalModules}</div>
                    <div className="text-sm text-muted-foreground">Capítulos</div>
                  </div>
                  <div className="bg-[hsl(var(--pastel-purple))]/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground mb-1">{totalLessons}</div>
                    <div className="text-sm text-muted-foreground">Seções</div>
                  </div>
                  <div className="bg-[hsl(var(--pastel-green))]/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground mb-1">8h 30m</div>
                    <div className="text-sm text-muted-foreground">Duração Total</div>
                  </div>
                  <div className="bg-[hsl(var(--pastel-yellow))]/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-foreground mb-1">{totalMaterials}</div>
                    <div className="text-sm text-muted-foreground">Materiais</div>
                  </div>
                </div>
              </div>

              {/* Modules */}
              {modules.map((module) => (
                <div key={module.id} className="bg-card rounded-xl border border-border overflow-hidden">
                  {/* Module Header */}
                  <div className={`${getModuleBgColor(module.color)} p-6 border-b border-border`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-10 h-10 ${getModuleColor(module.color)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Folder className="w-5 h-5 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-card text-muted-foreground text-xs font-medium rounded">Capítulo {module.number}</span>
                            <span className="text-xs text-muted-foreground">{module.lessons.length} seções • {module.totalDuration}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-muted-foreground hover:bg-card rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:bg-card rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleModule(module.id)}
                          className="p-2 text-muted-foreground hover:bg-card rounded-lg transition-colors"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${module.isExpanded ? '' : '-rotate-90'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}
                  {module.isExpanded && (
                    <>
                      <div className="divide-y divide-border">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-3 flex-1">
                                <GripVertical className="w-4 h-4 text-muted-foreground/50" />
                                <div className={`w-8 h-8 ${lesson.type === 'video' ? 'bg-[hsl(var(--pastel-purple))]/30' : lesson.type === 'text' ? 'bg-[hsl(var(--pastel-blue))]/30' : 'bg-[hsl(var(--pastel-pink))]/30'} rounded flex items-center justify-center flex-shrink-0`}>
                                  {getTypeIcon(lesson.type)}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground text-sm mb-1">{lesson.title}</h4>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span><i className="far fa-clock mr-1"></i>{lesson.duration}</span>
                                    <span><i className="fas fa-paperclip mr-1"></i>{lesson.materials} materiais</span>
                                    <span className={`px-2 py-0.5 ${getTypeColor(lesson.type)} text-muted-foreground rounded`}>{getTypeLabel(lesson.type)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-border bg-muted/30">
                        <button className="w-full px-4 py-3 text-muted-foreground hover:bg-card rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" />
                          Adicionar Nova Seção
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Add New Module Section */}
              <div className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center hover:border-[hsl(var(--pastel-blue))] transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-[hsl(var(--pastel-blue))] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Folder className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Adicionar Novo Capítulo</h3>
                <p className="text-sm text-muted-foreground mb-4">Organize seu conteúdo em capítulos temáticos</p>
                <button className="px-6 py-2 bg-[hsl(var(--pastel-blue))] text-foreground rounded-lg font-medium hover:opacity-80 transition-opacity flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Criar Capítulo
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Organization Tips */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[hsl(var(--pastel-yellow))] rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Dicas de Organização</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Organize o conteúdo do simples para o complexo</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Cada seção deve ter entre 5-15 minutos</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Adicione materiais complementares em PDF</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Use quizzes para reforçar o aprendizado</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--pastel-green))] mt-0.5 flex-shrink-0" />
                    <p>Inclua exercícios práticos ao final de cada capítulo</p>
                  </div>
                </div>
              </div>

              {/* Content Types */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Tipos de Conteúdo</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-[hsl(var(--pastel-purple))]/20 rounded-lg flex items-center gap-3">
                    <Video className="w-5 h-5 text-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Vídeo Aula</div>
                      <div className="text-xs text-muted-foreground">MP4, MOV, AVI</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[hsl(var(--pastel-blue))]/20 rounded-lg flex items-center gap-3">
                    <FileText className="w-5 h-5 text-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Texto/Artigo</div>
                      <div className="text-xs text-muted-foreground">Editor de texto</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[hsl(var(--pastel-yellow))]/20 rounded-lg flex items-center gap-3">
                    <FileQuestion className="w-5 h-5 text-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Quiz</div>
                      <div className="text-xs text-muted-foreground">Múltipla escolha</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[hsl(var(--pastel-pink))]/20 rounded-lg flex items-center gap-3">
                    <ClipboardCheck className="w-5 h-5 text-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Exercício</div>
                      <div className="text-xs text-muted-foreground">Prática guiada</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[hsl(var(--pastel-green))]/20 rounded-lg flex items-center gap-3">
                    <File className="w-5 h-5 text-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Material Extra</div>
                      <div className="text-xs text-muted-foreground">PDF, PPT, Excel</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Settings */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Configurações do E-book</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">Liberar por capítulo</div>
                      <div className="text-xs text-muted-foreground">Leitores avançam progressivamente</div>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.releaseByModule}
                        onChange={(e) => setSettings({ ...settings, releaseByModule: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-12 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--pastel-blue))]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">Certificado</div>
                      <div className="text-xs text-muted-foreground">Emitir ao concluir 100%</div>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.certificate}
                        onChange={(e) => setSettings({ ...settings, certificate: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-12 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--pastel-blue))]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">Download de materiais</div>
                      <div className="text-xs text-muted-foreground">Permitir baixar PDFs</div>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.downloadMaterials}
                        onChange={(e) => setSettings({ ...settings, downloadMaterials: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-12 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--pastel-blue))]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Course Preview */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Prévia do E-book</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Total de capítulos:</span>
                    <span className="font-semibold text-foreground">{totalModules}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Total de seções:</span>
                    <span className="font-semibold text-foreground">{totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Duração total:</span>
                    <span className="font-semibold text-foreground">8h 30m</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Materiais extras:</span>
                    <span className="font-semibold text-foreground">{totalMaterials} arquivos</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Exercícios:</span>
                    <span className="font-semibold text-foreground">{totalExercises}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Quizzes:</span>
                    <span className="font-semibold text-foreground">{totalQuizzes}</span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Precisa de Ajuda?</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Book className="w-5 h-5" />
                    <span>Guia de Upload de Vídeos</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Video className="w-5 h-5" />
                    <span>Como Criar Quizzes</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    <span>Suporte Técnico</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Link to="/criar-ebook">
              <button className="px-6 py-3 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Etapa Anterior
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar e Sair
              </button>
              <Link to="/criar-ebook/etapa-3">
                <button className="px-6 py-3 bg-[hsl(var(--pastel-blue))] text-foreground rounded-lg font-semibold hover:opacity-80 transition-opacity flex items-center gap-2">
                  Próxima Etapa
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
