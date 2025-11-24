import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Share2, Heart, ShoppingCart, Gift, Video, Clock, FileText, Infinity, Smartphone, Award, Star, CheckCircle, PlayCircle, FileDown, Lock, Trophy, BadgeCheck, Briefcase, Users, Wrench, Headphones, RefreshCw, User, GraduationCap, ChartLine, Repeat, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CursoDetalhes = () => {
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = useState(1);
  
  // Countdown state - define end date (7 days from now for demo)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days from now
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/aprendizado')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Domine o Mercado de Capitais em 2025</h1>
                <p className="text-sm text-slate-500 mt-1">Curso completo com certificação internacional</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Heart size={20} />
              </button>
              <button className="px-6 py-3 bg-pastel-purple text-slate-800 rounded-lg font-semibold hover:bg-opacity-80 transition">
                Inscrever-se Agora
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Hero Video Section */}
          <section className="mb-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="bg-slate-900 rounded-xl overflow-hidden h-[480px] flex items-center justify-center relative">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c37907bb40-efb5c703a3adf9ca8913.png" 
                    alt="professional financial instructor teaching market analysis"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition shadow-xl">
                      <PlayCircle className="text-slate-800 ml-1" size={32} />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="px-3 py-1 bg-white text-slate-800 text-sm font-medium rounded-full">Vídeo de Introdução</span>
                    <span className="px-3 py-1 bg-white text-slate-800 text-sm font-medium rounded-full">5:42</span>
                  </div>
                </div>

                {/* AI Insights Section */}
                <div className="mt-6 bg-gradient-to-br from-pastel-purple to-pastel-blue rounded-xl border border-slate-200 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-brain text-slate-700 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Insights da IA sobre o curso</h3>
                      <p className="text-sm text-black leading-relaxed">
                        Este curso combina teoria e prática de forma excepcional, com foco em aplicações reais do mercado financeiro. O conteúdo está atualizado com as tendências de 2025 e oferece uma progressão pedagógica bem estruturada, do básico ao avançado.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="text-slate-700" size={16} />
                        <span className="text-xs font-medium text-slate-700">Nível de Qualidade</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">9.2/10</p>
                    </div>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-slate-700" size={16} />
                        <span className="text-xs font-medium text-slate-700">Tempo Estimado</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">8 semanas</p>
                    </div>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="text-slate-700" size={16} />
                        <span className="text-xs font-medium text-slate-700">Taxa de Conclusão</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800">87%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Sidebar */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                {/* Countdown Timer */}
                <div className="mb-6 p-4 bg-[hsl(var(--pastel-blue))] rounded-lg">
                  <p className="text-center text-xs font-semibold text-pastel-gray-dark mb-3 uppercase tracking-wide">
                    Oferta Especial Termina Em
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-white/90 backdrop-blur rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-pastel-gray-dark">
                        {String(timeLeft.days).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">Dias</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-pastel-gray-dark">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">Horas</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-pastel-gray-dark">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">Min</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-pastel-gray-dark">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">Seg</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 line-through">R$ 1.497,00</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">33% OFF</span>
                  </div>
                  <div className="text-4xl font-bold text-slate-800 mb-4">R$ 997,00</div>
                  <p className="text-xs text-slate-500">ou 12x de R$ 97,00 sem juros</p>
                </div>

                <button className="w-full px-6 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition mb-3">
                  <ShoppingCart className="inline mr-2" size={16} />
                  Comprar Agora
                </button>
                <button className="w-full px-6 py-3 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition mb-6">
                  <Gift className="inline mr-2" size={16} />
                  Presentear Alguém
                </button>

                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Video size={20} />
                    <span>42 aulas em vídeo</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Clock size={20} />
                    <span>28 horas de conteúdo</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FileText size={20} />
                    <span>15 materiais complementares</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Infinity size={20} />
                    <span>Acesso vitalício</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Smartphone size={20} />
                    <span>Disponível em mobile</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Award size={20} />
                    <span>Certificado de conclusão</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">4.9</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-[hsl(var(--pastel-yellow))] fill-[hsl(var(--pastel-yellow))]" size={12} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">2.847 avaliações</p>
                  <p className="text-sm text-slate-600"><strong>8.432</strong> alunos matriculados</p>
                </div>
              </div>
            </div>
          </section>

          {/* Course Overview */}
          <section className="mb-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-8">
                {/* About Course */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">Sobre o Curso</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-base text-slate-600 mb-3">
                      Este curso completo foi desenvolvido para profissionais que desejam dominar o mercado de capitais brasileiro e internacional. Com uma abordagem prática e atualizada, você aprenderá desde os fundamentos até as estratégias mais avançadas utilizadas por gestores de fundos de investimento.
                    </p>
                    <p className="text-base text-slate-600 mb-3">
                      Ao longo de 28 horas de conteúdo exclusivo, você será guiado por especialistas renomados do mercado financeiro, que compartilharão suas experiências, técnicas e insights valiosos para que você possa tomar decisões de investimento mais assertivas e construir uma carreira sólida no mercado de capitais.
                    </p>
                    <p className="text-base text-slate-600">
                      O curso aborda tópicos essenciais como análise fundamentalista, valuation de empresas, estratégias de alocação de ativos, gestão de portfólios, análise de risco, mercado de ações, renda fixa, derivativos e muito mais. Além disso, você terá acesso a casos práticos reais, planilhas de análise e ferramentas profissionais utilizadas no dia a dia do mercado.
                    </p>
                  </div>
                </div>

                {/* What You Learn */}
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-6">O Que Você Vai Aprender</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Análise Fundamentalista", desc: "Avalie empresas através de indicadores financeiros e projete resultados futuros" },
                      { title: "Valuation de Ativos", desc: "Domine técnicas de precificação e avaliação de empresas e ativos" },
                      { title: "Gestão de Portfólios", desc: "Construa e gerencie carteiras de investimento eficientes" },
                      { title: "Análise de Risco", desc: "Identifique, mensure e mitigue riscos em operações financeiras" },
                      { title: "Mercado de Derivativos", desc: "Opere com opções, futuros e outros instrumentos derivativos" },
                      { title: "Estratégias de Investimento", desc: "Desenvolva estratégias personalizadas para diferentes perfis" },
                      { title: "Renda Fixa Avançada", desc: "Compreenda títulos públicos, debêntures e estruturas complexas" },
                      { title: "Macroeconomia Aplicada", desc: "Analise cenários macroeconômicos e seus impactos no mercado" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-pastel-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="text-slate-700" size={14} />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Curriculum */}
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-6">Conteúdo do Curso</h2>
                  <div className="space-y-4">
                    {[
                      { 
                        id: 1, 
                        title: "Módulo 1: Fundamentos do Mercado de Capitais", 
                        lessons: "8 aulas • 3h 45min", 
                        level: "Iniciante", 
                        levelColor: "bg-white text-slate-700",
                        content: [
                          { title: "Introdução ao Mercado de Capitais", subtitle: "Conceitos básicos e estrutura do mercado", duration: "28:42", type: "video" },
                          { title: "Participantes do Mercado", subtitle: "Bolsas, corretoras, investidores e reguladores", duration: "32:15", type: "video" },
                          { title: "Tipos de Ativos Financeiros", subtitle: "Ações, títulos, derivativos e fundos", duration: "25:38", type: "video" },
                          { title: "Sistema Financeiro Nacional", subtitle: "Estrutura e regulamentação do SFN", duration: "30:12", type: "video" },
                          { title: "Mercado Primário vs Secundário", subtitle: "Diferenças e funcionamento", duration: "22:45", type: "video" },
                          { title: "Índices de Mercado", subtitle: "Ibovespa, IBrX e outros indicadores", duration: "27:30", type: "video" },
                          { title: "Introdução à Análise de Investimentos", subtitle: "Conceitos iniciais de análise", duration: "29:18", type: "video" },
                          { title: "Material Complementar: Glossário", subtitle: "PDF com termos essenciais do mercado", duration: "PDF", type: "pdf" }
                        ]
                      },
                      { 
                        id: 2, 
                        title: "Módulo 2: Análise Fundamentalista", 
                        lessons: "10 aulas • 4h 20min", 
                        level: "Intermediário", 
                        levelColor: "bg-pastel-yellow text-slate-700",
                        content: [
                          { title: "Fundamentos da Análise Fundamentalista", subtitle: "Conceitos e metodologias", duration: "31:45", type: "video" },
                          { title: "Análise de Balanços Patrimoniais", subtitle: "Interpretação e análise de demonstrações", duration: "35:20", type: "video" },
                          { title: "DRE e Demonstração de Fluxo de Caixa", subtitle: "Análise de resultados e caixa", duration: "33:15", type: "video" },
                          { title: "Indicadores de Liquidez", subtitle: "Liquidez corrente, seca e imediata", duration: "25:30", type: "video" },
                          { title: "Indicadores de Rentabilidade", subtitle: "ROE, ROA, margem líquida", duration: "28:42", type: "video" },
                          { title: "Indicadores de Endividamento", subtitle: "Análise da estrutura de capital", duration: "26:18", type: "video" },
                          { title: "Múltiplos de Mercado", subtitle: "P/L, P/VP, EV/EBITDA", duration: "32:50", type: "video" },
                          { title: "Análise Setorial", subtitle: "Como analisar diferentes setores", duration: "29:15", type: "video" },
                          { title: "Análise Macroeconômica", subtitle: "Impactos macro nos investimentos", duration: "27:40", type: "video" },
                          { title: "Material: Planilha de Análise", subtitle: "Excel com indicadores fundamentalistas", duration: "XLSX", type: "pdf" }
                        ]
                      },
                      { 
                        id: 3, 
                        title: "Módulo 3: Valuation e Precificação", 
                        lessons: "8 aulas • 3h 55min", 
                        level: "Intermediário", 
                        levelColor: "bg-pastel-yellow text-slate-700",
                        content: [
                          { title: "Introdução ao Valuation", subtitle: "Conceitos e metodologias de avaliação", duration: "30:25", type: "video" },
                          { title: "Fluxo de Caixa Descontado (FCD)", subtitle: "Metodologia e aplicação prática", duration: "38:15", type: "video" },
                          { title: "WACC e Custo de Capital", subtitle: "Cálculo e interpretação", duration: "32:40", type: "video" },
                          { title: "Valuation por Múltiplos", subtitle: "Comparação com empresas similares", duration: "28:55", type: "video" },
                          { title: "Valuation de Empresas em Crescimento", subtitle: "Técnicas para empresas de alto crescimento", duration: "31:20", type: "video" },
                          { title: "Precificação de Títulos de Renda Fixa", subtitle: "Valor presente e yield", duration: "27:30", type: "video" },
                          { title: "Análise de Sensibilidade", subtitle: "Cenários e análise de risco", duration: "25:45", type: "video" },
                          { title: "Material: Modelo de Valuation", subtitle: "Planilha completa de FCD", duration: "XLSX", type: "pdf" }
                        ]
                      },
                      { 
                        id: 4, 
                        title: "Módulo 4: Gestão de Portfólios", 
                        lessons: "9 aulas • 4h 10min", 
                        level: "Avançado", 
                        levelColor: "bg-pastel-pink text-slate-700",
                        content: [
                          { title: "Teoria Moderna de Portfólios", subtitle: "Markowitz e fronteira eficiente", duration: "35:20", type: "video" },
                          { title: "Diversificação e Correlação", subtitle: "Redução de risco através da diversificação", duration: "30:45", type: "video" },
                          { title: "CAPM e Beta", subtitle: "Modelo de precificação de ativos", duration: "32:15", type: "video" },
                          { title: "Construção de Carteiras Eficientes", subtitle: "Otimização de portfólios", duration: "36:40", type: "video" },
                          { title: "Alocação de Ativos", subtitle: "Estratégias de alocação tática e estratégica", duration: "29:30", type: "video" },
                          { title: "Rebalanceamento de Carteiras", subtitle: "Quando e como rebalancear", duration: "26:25", type: "video" },
                          { title: "Gestão Ativa vs Passiva", subtitle: "Comparação de estratégias", duration: "28:15", type: "video" },
                          { title: "Métricas de Performance", subtitle: "Sharpe, Sortino, Treynor", duration: "27:50", type: "video" },
                          { title: "Material: Otimizador de Portfólio", subtitle: "Ferramenta de otimização", duration: "XLSX", type: "pdf" }
                        ]
                      },
                      { 
                        id: 5, 
                        title: "Módulo 5: Derivativos e Estratégias", 
                        lessons: "7 aulas • 3h 30min", 
                        level: "Avançado", 
                        levelColor: "bg-pastel-pink text-slate-700",
                        content: [
                          { title: "Introdução aos Derivativos", subtitle: "Conceitos e tipos de derivativos", duration: "32:45", type: "video" },
                          { title: "Mercado de Opções", subtitle: "Call, Put e estratégias básicas", duration: "36:20", type: "video" },
                          { title: "Estratégias com Opções", subtitle: "Straddle, Strangle, Butterfly", duration: "34:15", type: "video" },
                          { title: "Mercado Futuro", subtitle: "Contratos futuros e hedge", duration: "31:40", type: "video" },
                          { title: "Swaps e Forwards", subtitle: "Instrumentos de hedge customizado", duration: "28:30", type: "video" },
                          { title: "Precificação de Opções", subtitle: "Black-Scholes e volatilidade implícita", duration: "33:25", type: "video" },
                          { title: "Material: Calculadora de Opções", subtitle: "Ferramenta de pricing", duration: "XLSX", type: "pdf" }
                        ]
                      }
                    ].map((module) => (
                      <div key={module.id} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div 
                          className={`${expandedModule === module.id ? 'bg-pastel-blue' : 'bg-slate-50'} p-4 flex items-center justify-between cursor-pointer transition-colors hover:bg-pastel-blue hover:bg-opacity-50`}
                          onClick={() => setExpandedModule(expandedModule === module.id ? 0 : module.id)}
                        >
                          <div className="flex items-center gap-4">
                            <i className={`fas fa-chevron-${expandedModule === module.id ? 'down' : 'right'} text-slate-700 transition-transform duration-200`}></i>
                            <div>
                              <h3 className="font-semibold text-slate-800">{module.title}</h3>
                              <p className="text-sm text-slate-600 mt-1">{module.lessons}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 ${module.levelColor} text-xs font-medium rounded-full`}>{module.level}</span>
                        </div>
                        <div 
                          className={`transition-all duration-300 ease-in-out ${
                            expandedModule === module.id 
                              ? 'max-h-[2000px] opacity-100' 
                              : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="p-4 space-y-2">
                            {module.content.map((lesson, idx) => (
                              <div key={idx} className="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-lg transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3">
                                  {lesson.type === 'video' ? (
                                    <PlayCircle className="text-pastel-blue group-hover:text-slate-700 transition-colors" size={20} />
                                  ) : (
                                    <FileDown className="text-slate-400 group-hover:text-slate-700 transition-colors" size={20} />
                                  )}
                                  <div>
                                    <p className="text-sm font-medium text-slate-800">{lesson.title}</p>
                                    <p className="text-xs text-slate-500">{lesson.subtitle}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs text-slate-500">{lesson.duration}</span>
                                  <Lock className="text-slate-300 group-hover:text-slate-400 transition-colors" size={16} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quiz Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-6">Avaliações e Certificação</h2>
                  <div className="space-y-4">
                    {[
                      { title: "Questionário Módulo 1", questions: "15 questões • 30 minutos", color: "bg-pastel-blue", status: "Não iniciado", statusColor: "bg-slate-100 text-slate-600" },
                      { title: "Questionário Módulo 2", questions: "20 questões • 40 minutos", color: "bg-pastel-yellow", status: "Não iniciado", statusColor: "bg-slate-100 text-slate-600" },
                      { title: "Prova Final de Certificação", questions: "50 questões • 90 minutos", color: "bg-pastel-green", status: "Bloqueado", statusColor: "bg-slate-100 text-slate-600", isFinal: true }
                    ].map((quiz, idx) => (
                      <div key={idx} className={`border border-slate-200 rounded-lg p-6 ${quiz.isFinal ? 'bg-pastel-green bg-opacity-20' : ''}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${quiz.color} rounded-lg flex items-center justify-center`}>
                              {quiz.isFinal ? <Trophy className="text-slate-700" size={24} /> : <i className="fas fa-clipboard-list text-slate-700 text-xl"></i>}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{quiz.title}</h3>
                              <p className="text-sm text-slate-600 mt-1">{quiz.questions}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 ${quiz.statusColor} text-sm font-medium rounded-full`}>{quiz.status}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
                          <div className="flex items-center gap-2">
                            <i className="fas fa-chart-bar"></i>
                            <span>Nota mínima: {quiz.isFinal ? '80%' : '70%'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="fas fa-redo"></i>
                            <span>{quiz.isFinal ? 'Máximo 3 tentativas' : 'Tentativas ilimitadas'}</span>
                          </div>
                        </div>
                        {quiz.isFinal && (
                          <p className="text-sm text-slate-600">Complete todos os módulos e questionários para desbloquear a prova final e receber seu certificado internacional.</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-6">O Que Você Ganha ao Completar</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: BadgeCheck, title: "Certificado Internacional", desc: "Reconhecido por instituições financeiras e órgãos reguladores do mercado", color: "bg-pastel-purple" },
                      { icon: Briefcase, title: "Oportunidades de Carreira", desc: "Acesso exclusivo a vagas em bancos, corretoras e gestoras de investimento", color: "bg-pastel-blue" },
                      { icon: Users, title: "Networking Exclusivo", desc: "Comunidade privada com profissionais e especialistas do mercado financeiro", color: "bg-pastel-green" },
                      { icon: Wrench, title: "Ferramentas Profissionais", desc: "Planilhas, modelos de análise e templates utilizados por analistas", color: "bg-pastel-yellow" },
                      { icon: Headphones, title: "Mentoria Personalizada", desc: "Sessões de mentoria com instrutores para tirar dúvidas e aprofundar conhecimento", color: "bg-pastel-pink" },
                      { icon: RefreshCw, title: "Atualizações Constantes", desc: "Conteúdo atualizado regularmente com novas aulas e materiais", color: "bg-pastel-peach" }
                    ].map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <benefit.icon className="text-slate-700" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                          <p className="text-sm text-slate-600">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Audience */}
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-6">Para Quem é Este Curso</h2>
                  <div className="space-y-4">
                    {[
                      { icon: User, title: "Profissionais do Mercado Financeiro", desc: "Analistas, gestores e consultores que desejam aprofundar conhecimentos em mercado de capitais", color: "bg-pastel-blue" },
                      { icon: GraduationCap, title: "Estudantes e Recém-Formados", desc: "Graduandos e graduados em economia, administração ou finanças que buscam iniciar carreira no mercado", color: "bg-pastel-green" },
                      { icon: ChartLine, title: "Investidores Avançados", desc: "Investidores que desejam aprimorar suas análises e tomar decisões mais fundamentadas", color: "bg-pastel-purple" },
                      { icon: Repeat, title: "Profissionais em Transição de Carreira", desc: "Pessoas de outras áreas que desejam migrar para o mercado financeiro", color: "bg-pastel-yellow" }
                    ].map((audience, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className={`w-10 h-10 ${audience.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <audience.icon className="text-slate-700" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">{audience.title}</h4>
                          <p className="text-sm text-slate-600">{audience.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Introduction Card */}
                <div className="bg-white rounded-xl border border-slate-200 px-4 pt-4 pb-3">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <ChartLine className="text-slate-700" size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm mb-0.5">Introdução ao Mercado de Capitais</h3>
                      <p className="text-xs text-slate-600">Comece sua jornada aqui</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 mb-2 leading-relaxed">
                    Descubra os fundamentos essenciais do mercado de capitais: estrutura, participantes, tipos de ativos e como funciona o ecossistema financeiro brasileiro e internacional.
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      Módulo 1
                    </span>
                    <span className="flex items-center gap-1">
                      <PlayCircle size={13} />
                      Aula gratuita
                    </span>
                  </div>
                </div>

                {/* Instructor Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Instrutor Principal</h2>
                  <div className="text-center mb-6">
                    <img 
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" 
                      alt="instructor" 
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-slate-800 mb-1">Prof. Dr. Ricardo Almeida</h3>
                    <p className="text-sm text-slate-500 mb-4">CFA, CNPI, PhD em Finanças</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-[hsl(var(--pastel-yellow))] fill-[hsl(var(--pastel-yellow))]" size={12} />
                        <span className="font-medium">4.9</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>24.5k alunos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircle size={12} />
                        <span>12 cursos</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Professor com mais de 20 anos de experiência no mercado financeiro. Ex-gestor de fundos de investimento e atual consultor de instituições financeiras de grande porte.
                  </p>
                  <p className="text-sm text-slate-600 mb-4">
                    Possui PhD em Finanças pela Universidade de São Paulo, certificações CFA (Chartered Financial Analyst) e CNPI (Certificação Nacional do Profissional de Investimento).
                  </p>
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="font-medium text-slate-800 mb-3">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-pastel-blue text-slate-700 hover:bg-pastel-blue">Valuation</Badge>
                      <Badge className="bg-pastel-green text-slate-700 hover:bg-pastel-green">Gestão de Portfólios</Badge>
                      <Badge className="bg-pastel-purple text-slate-700 hover:bg-pastel-purple">Derivativos</Badge>
                      <Badge className="bg-pastel-yellow text-slate-700 hover:bg-pastel-yellow">Análise de Risco</Badge>
                    </div>
                  </div>
                </div>

                {/* Co-Instructors */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Co-Instrutores</h2>
                  <div className="space-y-4">
                    {[
                      { name: "Dra. Ana Beatriz Costa", cert: "CGA, Especialista em Renda Fixa", rating: 4.8, students: "8.2k", desc: "15 anos de experiência em gestão de fundos de renda fixa", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b2da92c95d-2bbdc31a97c8479658e1.png" },
                      { name: "Prof. Marcos Ferreira", cert: "CFP, Especialista em Derivativos", rating: 4.9, students: "12.1k", desc: "Ex-trader de derivativos em grandes bancos de investimento", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b24014b83d-0b455d5abe744d3f9416.png" }
                    ].map((instructor, idx) => (
                      <div key={idx} className={`flex items-start gap-3 ${idx === 0 ? 'pb-4 border-b border-slate-200' : ''}`}>
                        <img src={instructor.avatar} alt="co-instructor" className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">{instructor.name}</h4>
                          <p className="text-xs text-slate-500 mb-2">{instructor.cert}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="text-[hsl(var(--pastel-yellow))] fill-[hsl(var(--pastel-yellow))]" size={10} />
                              <span>{instructor.rating}</span>
                            </div>
                            <span>{instructor.students} alunos</span>
                          </div>
                          <p className="text-xs text-slate-600">{instructor.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-800 mb-6">Requisitos</h2>
                  <ul className="space-y-3">
                    {[
                      "Conhecimentos básicos de matemática financeira",
                      "Noções de economia e finanças",
                      "Acesso a computador e internet",
                      "Dedicação de 6-8 horas semanais"
                    ].map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle className="text-pastel-green mt-1 flex-shrink-0" size={16} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guarantee */}
                <div className="bg-pastel-green bg-opacity-30 rounded-xl border border-pastel-green p-6 text-center">
                  <div className="w-16 h-16 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="text-slate-700" size={32} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Garantia de 30 Dias</h3>
                  <p className="text-sm text-slate-600">Se não ficar satisfeito, devolvemos 100% do seu investimento sem perguntas</p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Courses */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">Outros Cursos do Instrutor</h2>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: "Análise Técnica Avançada para Traders", category: "Análise de Mercado", rating: 4.8, students: "3.2k", price: "R$ 697,00", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d5ea2a1712-680073352a19ae8afd86.png", badge: "Bestseller", badgeColor: "bg-yellow-100 text-yellow-700", color: "bg-pastel-blue" },
                { title: "Gestão de Riscos em Investimentos", category: "Gestão de Risco", rating: 4.9, students: "2.8k", price: "R$ 797,00", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ce47da15ca-c0a9ace585c3dd78d20c.png", badge: null, badgeColor: "", color: "bg-pastel-green" },
                { title: "Estratégias de Alocação de Ativos", category: "Investimentos", rating: 5.0, students: "1.5k", price: "R$ 897,00", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c0f0b4a54e-565aa1d4b4f0a2087474.png", badge: "Novo", badgeColor: "bg-green-100 text-green-700", color: "bg-pastel-purple" }
              ].map((course, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
                  <div className="relative">
                    <div className={`h-40 ${course.color} overflow-hidden`}>
                      <img className="w-full h-full object-cover" src={course.image} alt={course.title} />
                    </div>
                    {course.badge && (
                      <span className={`absolute top-3 left-3 px-3 py-1 ${course.badgeColor} text-xs font-medium rounded-full`}>{course.badge}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <Badge className={`${course.color} text-slate-700 mb-3`}>{course.category}</Badge>
                    <h3 className="font-semibold text-slate-800 mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="text-[hsl(var(--pastel-yellow))] fill-[hsl(var(--pastel-yellow))]" size={12} />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span>{course.students} alunos</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <span className="text-xl font-bold text-slate-800">{course.price}</span>
                      <button className={`px-4 py-2 ${course.color} text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition`}>Ver Curso</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-slate-800">Avaliações dos Alunos</h2>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700">
                  <option>Mais recentes</option>
                  <option>Mais úteis</option>
                  <option>Melhor avaliadas</option>
                </select>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-8 pb-8 border-b border-slate-200">
                <div className="col-span-1 text-center">
                  <div className="text-5xl font-bold text-slate-800 mb-2">4.9</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = 4.9;
                      const fillPercentage = Math.min(Math.max(rating - (star - 1), 0), 1) * 100;
                      
                      return (
                        <div key={star} className="relative w-4 h-4">
                          {/* Estrela de fundo (vazia) */}
                          <Star className="absolute text-slate-200 fill-slate-200" size={16} />
                          {/* Estrela preenchida com clip-path */}
                          <div 
                            className="absolute overflow-hidden" 
                            style={{ width: `${fillPercentage}%` }}
                          >
                            <Star className="text-[hsl(var(--pastel-yellow))] fill-[hsl(var(--pastel-yellow))]" size={16} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-slate-500">2.847 avaliações</p>
                </div>
                <div className="col-span-3 space-y-2">
                  {[
                    { stars: 5, percentage: 85 },
                    { stars: 4, percentage: 12 },
                    { stars: 3, percentage: 2 },
                    { stars: 2, percentage: 1 },
                    { stars: 1, percentage: 0 }
                  ].map((rating, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 w-16">{rating.stars} estrelas</span>
                      <Progress value={rating.percentage} className="flex-1 h-2" />
                      <span className="text-sm text-slate-500 w-12">{rating.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: "Lucas Ferreira", time: "Há 2 semanas", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg", rating: 5, review: "Curso excepcional! O Prof. Ricardo tem uma didática impressionante e consegue explicar conceitos complexos de forma muito clara. Os casos práticos ajudaram muito a fixar o conteúdo. Já estou aplicando as técnicas aprendidas no meu trabalho.", helpful: 142 },
                  { name: "Juliana Oliveira", time: "Há 1 mês", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg", rating: 5, review: "Melhor investimento que fiz na minha carreira! O conteúdo é muito completo e atualizado. As planilhas e ferramentas disponibilizadas são de altíssima qualidade. Consegui uma promoção no trabalho após concluir o curso e aplicar os conhecimentos adquiridos.", helpful: 98 },
                  { name: "Rafael Santos", time: "Há 1 mês", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg", rating: 5, review: "Conteúdo de altíssimo nível. Os instrutores são profissionais experientes e compartilham insights valiosos do mercado. A plataforma é intuitiva e os materiais complementares são excelentes. Recomendo fortemente!", helpful: 76 }
                ].map((review, idx) => (
                  <div key={idx} className="pb-6 border-b border-slate-200">
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt="reviewer" className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-800">{review.name}</h4>
                            <p className="text-xs text-slate-500">{review.time}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="text-[hsl(var(--pastel-yellow))] fill-[hsl(var(--pastel-yellow))]" size={14} />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600 mb-3">{review.review}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <button className="hover:text-slate-700">
                            <i className="far fa-thumbs-up mr-1"></i>
                            Útil ({review.helpful})
                          </button>
                          <button className="hover:text-slate-700">
                            <i className="far fa-comment mr-1"></i>
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                  Ver Todas as Avaliações
                </button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {[
                  { question: "Como funciona o acesso ao curso?", answer: "Após a compra, você recebe acesso imediato e vitalício ao curso. Pode assistir as aulas no seu ritmo, quantas vezes quiser, em qualquer dispositivo." },
                  { question: "O certificado é reconhecido pelo mercado?", answer: null },
                  { question: "Posso parcelar o pagamento?", answer: null },
                  { question: "Como funciona a garantia?", answer: null },
                  { question: "Preciso de conhecimentos prévios?", answer: null }
                ].map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg">
                    <button className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition">
                      <span className="font-medium text-slate-800">{faq.question}</span>
                      <i className="fas fa-chevron-down text-slate-400"></i>
                    </button>
                    {faq.answer && (
                      <div className="px-4 pb-4 text-sm text-slate-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-slate-700 text-lg"></i>
                </div>
                <span className="text-xl font-semibold text-slate-800">FinLearn</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <a href="#" className="hover:text-slate-800">Sobre</a>
                <a href="#" className="hover:text-slate-800">Contato</a>
                <a href="#" className="hover:text-slate-800">Termos</a>
                <a href="#" className="hover:text-slate-800">Privacidade</a>
              </div>
            </div>
            <p className="text-sm text-slate-500">© 2025 FinLearn. Todos os direitos reservados.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CursoDetalhes;
