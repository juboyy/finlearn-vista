import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, 
  Bell, 
  Search,
  Mic,
  GraduationCap,
  Bot,
  Book,
  Video,
  Newspaper,
  TrendingUp,
  FileText,
  Eye,
  Download,
  Clock,
  User,
  ChevronRight,
  Bookmark,
  Play,
  BookOpen,
  FileSignature,
  Radio,
  ChartPie,
  Beaker,
  Filter,
  Mail,
  Layers
} from "lucide-react";

export default function PerfilEmpresaMateriais() {
  const navigate = useNavigate();
  
  const chartData = [
    { name: 'Artigos', value: 324, color: '#B8D4E8' },
    { name: 'Podcasts', value: 156, color: '#D4C5E8' },
    { name: 'Webinars', value: 87, color: '#E8C5D8' },
    { name: 'E-books', value: 45, color: '#F5D5B8' },
    { name: 'Cursos', value: 23, color: '#E8E0C5' },
    { name: 'Análises', value: 112, color: '#C5E8D4' }
  ];
  
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 flex-shrink-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/perfil-empresa/1')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F5D5B8] rounded-lg flex items-center justify-center text-orange-600 font-bold text-xl">
                  I
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">Itaú Unibanco</h1>
                  <p className="text-sm text-slate-500">Central de Conteúdo & Educação Corporativa</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar conteúdos..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5D5B8] w-64"
                />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Hero Stats Section */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Total de Conteúdos</p>
                <h2 className="text-3xl font-bold text-slate-800">1.284</h2>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12 essa semana
                </p>
              </div>
              <div className="w-12 h-12 bg-[#B8D4E8] rounded-full flex items-center justify-center text-slate-700 text-xl">
                <Layers className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Visualizações Totais</p>
                <h2 className="text-3xl font-bold text-slate-800">5.4M</h2>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.5% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 bg-[#C5E8D4] rounded-full flex items-center justify-center text-slate-700 text-xl">
                <Eye className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Média de Avaliação</p>
                <h2 className="text-3xl font-bold text-slate-800">4.9<span className="text-lg text-slate-400 font-normal">/5.0</span></h2>
                <p className="text-xs text-slate-500 mt-2">Baseado em 42k reviews</p>
              </div>
              <div className="w-12 h-12 bg-[#E8E0C5] rounded-full flex items-center justify-center text-slate-700 text-xl">
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Certificações Emitidas</p>
                <h2 className="text-3xl font-bold text-slate-800">15.2k</h2>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +120 esse mês
                </p>
              </div>
              <div className="w-12 h-12 bg-[#D4C5E8] rounded-full flex items-center justify-center text-slate-700 text-xl">
                <i className="fas fa-certificate"></i>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-8">
            {/* Left: Content Categories Grid */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* Categories Grid Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Explore por Formato</h3>
                  <button className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1">
                    <Filter className="w-4 h-4" />
                    Filtrar visualização
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Podcast */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#D4C5E8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#D4C5E8] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mic className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Podcast</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Áudios sobre mercado e tendências.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">156 eps</span>
                        <span><Play className="w-3 h-3 inline mr-1" /> 89k plays</span>
                      </div>
                    </div>
                  </div>

                  {/* Cursos */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#E8E0C5] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#E8E0C5] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <GraduationCap className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Cursos</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Módulos e aulas para ensino financeiro.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">23 cursos</span>
                        <span><i className="fas fa-user-graduate text-slate-400 mr-1"></i> 12k alunos</span>
                      </div>
                    </div>
                  </div>

                  {/* Avatar IA */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#B8D4E8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#B8D4E8] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Bot className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                          Avatar IA 
                          <span className="text-[10px] bg-slate-800 text-white px-1.5 rounded uppercase font-bold">Beta</span>
                        </h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Vídeos gerados com apresentadores virtuais.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">45 vídeos</span>
                        <span><Clock className="w-3 h-3 inline mr-1" /> 12h conteúdo</span>
                      </div>
                    </div>
                  </div>

                  {/* E-books */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#F5D5B8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#F5D5B8] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Book className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">E-books</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Livros digitais e guias completos.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">45 títulos</span>
                        <span><Download className="w-3 h-3 inline mr-1" /> 156k downloads</span>
                      </div>
                    </div>
                  </div>

                  {/* Webinars */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#E8C5D8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#E8C5D8] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Video className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Webinars</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Transmissões gravadas e agenda ao vivo.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">87 eventos</span>
                        <span><i className="fas fa-users text-slate-400 mr-1"></i> 240k assistiram</span>
                      </div>
                    </div>
                  </div>

                  {/* Artigos */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#B8D4E8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Newspaper className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Artigos</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Análises escritas e notícias do setor.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">324 posts</span>
                        <span><i className="fas fa-book-reader text-slate-400 mr-1"></i> 1.2M leituras</span>
                      </div>
                    </div>
                  </div>

                  {/* Análises */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#C5E8D4] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#C5E8D4] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <TrendingUp className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Análises Técnicas</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Gráficos e projeções de mercado.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">112 relatórios</span>
                        <span><i className="fas fa-chart-bar text-slate-400 mr-1"></i> Premium</span>
                      </div>
                    </div>
                  </div>

                  {/* Relatórios */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#D4C5E8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#D4C5E8] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FileText className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Relatórios</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Documentos detalhados de performance.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">Mensal</span>
                        <span><i className="fas fa-calendar text-slate-400 mr-1"></i> Institucional</span>
                      </div>
                    </div>
                  </div>

                  {/* Newspaper */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#E8C5D8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#E8C5D8] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className="fas fa-columns text-slate-700 text-2xl"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Newspaper</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Curadoria diária de notícias.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">Diário</span>
                        <span><i className="fas fa-coffee text-slate-400 mr-1"></i> Morning Call</span>
                      </div>
                    </div>
                  </div>

                  {/* Estudos Acadêmicos */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#E8D4C5] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#E8D4C5] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Beaker className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Estudos Acadêmicos</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Teses e pesquisas aprofundadas.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">28 teses</span>
                        <span><i className="fas fa-university text-slate-400 mr-1"></i> Científico</span>
                      </div>
                    </div>
                  </div>

                  {/* Infográficos */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#C5E8D4] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <ChartPie className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Infográficos</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Visualizações gráficas impactantes.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">64 arquivos</span>
                        <span><i className="fas fa-image text-slate-400 mr-1"></i> Visual</span>
                      </div>
                    </div>
                  </div>

                  {/* Whitepapers */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#B8D4E8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FileSignature className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Whitepapers</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Documentos técnicos detalhados.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">15 docs</span>
                        <span><i className="fas fa-cog text-slate-400 mr-1"></i> Técnico</span>
                      </div>
                    </div>
                  </div>

                  {/* Apresentações */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#C5E8D4] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-lime-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className="fas fa-chalkboard-teacher text-slate-700 text-2xl"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Apresentações</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Slides profissionais para eventos.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">Templates</span>
                        <span><i className="fas fa-desktop text-slate-400 mr-1"></i> PPTX</span>
                      </div>
                    </div>
                  </div>

                  {/* Live */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#F5D5B8] hover:shadow-md transition cursor-pointer flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Radio className="text-slate-700 w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800">Live</h4>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-600 w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Transmissões ao vivo com audiência.</p>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded animate-pulse">● Ao Vivo</span>
                        <span><i className="fas fa-users text-slate-400 mr-1"></i> 1.2k</span>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Featured/Recent Content List */}
              <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-800">Conteúdos em Destaque</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">Mais Recentes</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 rounded-lg">Mais Vistos</button>
                  </div>
                </div>
                <div>
                  {/* Item 1 */}
                  <div className="flex items-start gap-4 p-5 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-16 h-16 bg-[#B8D4E8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="text-slate-700 w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Avatar IA</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">Há 2 horas</span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-800 mb-1">O Futuro dos Meios de Pagamento com IA Generativa</h4>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-1">Uma análise profunda sobre como a inteligência artificial está remodelando a infraestrutura de pagamentos globais.</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span><Eye className="w-3 h-3 inline mr-1" /> 2.4k visualizações</span>
                        <span><Clock className="w-3 h-3 inline mr-1" /> 8 min de vídeo</span>
                        <span><User className="w-3 h-3 inline mr-1" /> Marcelo Kopel</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-4 p-5 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-16 h-16 bg-[#C5E8D4] rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="text-slate-700 w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded">Análise</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">Há 5 horas</span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-800 mb-1">Cenário Macroeconômico Q3 2024</h4>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-1">Projeções de inflação, taxa de juros e impacto no mercado de capitais brasileiro para o próximo trimestre.</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span><Eye className="w-3 h-3 inline mr-1" /> 5.1k visualizações</span>
                        <span><FileText className="w-3 h-3 inline mr-1" /> PDF Disponível</span>
                        <span><User className="w-3 h-3 inline mr-1" /> Claudia Politanski</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-4 p-5 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-16 h-16 bg-[#D4C5E8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mic className="text-slate-700 w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Podcast</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">Ontem</span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-800 mb-1">ESG e Sustentabilidade Corporativa #42</h4>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-1">Entrevista exclusiva com líderes do setor sobre a implementação de práticas ESG em grandes instituições financeiras.</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span><Play className="w-3 h-3 inline mr-1" /> 1.8k plays</span>
                        <span><Clock className="w-3 h-3 inline mr-1" /> 45 min</span>
                        <span><User className="w-3 h-3 inline mr-1" /> Livia Chanes</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start gap-4 p-5 hover:bg-slate-50 transition cursor-pointer">
                    <div className="w-16 h-16 bg-[#F5D5B8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Book className="text-slate-700 w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">E-book</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">Há 2 dias</span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-800 mb-1">Manual de Compliance para Fintechs</h4>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-1">Guia completo sobre as regulamentações atuais do Banco Central para novas instituições de pagamento.</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span><Download className="w-3 h-3 inline mr-1" /> 890 downloads</span>
                        <span><BookOpen className="w-3 h-3 inline mr-1" /> 120 páginas</span>
                        <span><User className="w-3 h-3 inline mr-1" /> Ana Paula Vescovi</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
                  <button className="text-sm font-semibold text-slate-600 hover:text-slate-800">Ver todo o histórico</button>
                </div>
              </section>

            </div>

            {/* Right: Filters & Trending */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Chart Section */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Distribuição de Conteúdo</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="circle"
                        formatter={(value, entry: any) => (
                          <span className="text-xs text-slate-600">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* Topics Filter */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Filtrar por Tópico</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Banking</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Investimentos</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Open Finance</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">ESG</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Inovação</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Segurança</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Regulação</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Crédito</button>
                  <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition">Pix</button>
                </div>
              </section>

              {/* Popular Creators */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Top Creators</h3>
                  <a href="#" className="text-xs text-blue-600 hover:underline">Ver todos</a>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-10 h-10 rounded-full object-cover" alt="Roberto Setubal" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">Roberto Setubal</h4>
                      <p className="text-xs text-slate-500">42 artigos • 15k seguidores</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg" className="w-10 h-10 rounded-full object-cover" alt="Marcelo Kopel" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">Marcelo Kopel</h4>
                      <p className="text-xs text-slate-500">91 conteúdos • 31k seguidores</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-10 h-10 rounded-full object-cover" alt="Claudia Politanski" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">Claudia Politanski</h4>
                      <p className="text-xs text-slate-500">68 conteúdos • 23k seguidores</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter Promo */}
              <section className="bg-[#F5D5B8] bg-opacity-30 rounded-xl p-6 border border-[#F5D5B8]">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <i className="fas fa-envelope-open-text text-orange-400 text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Newsletter Semanal</h3>
                <p className="text-sm text-slate-600 mb-4">Receba um resumo curado dos melhores conteúdos do mercado financeiro toda sexta-feira.</p>
                <button className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition">Inscrever-se Gratuitamente</button>
              </section>

            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200 text-center pb-8">
            <p className="text-sm text-slate-500">© 2024 Itaú Unibanco S.A. - Todos os direitos reservados. Central de Conteúdo Corporativo.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}
