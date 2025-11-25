import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, 
  Bell, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  Globe,
  Building,
  ChartBar,
  FileText,
  Video,
  Book,
  Mic,
  GraduationCap,
  TrendingUp,
  Newspaper,
  BookOpen,
  Radio,
  LineChart,
  Briefcase,
  Clock,
  Eye,
  Star,
  Shield,
  CreditCard,
  Smartphone,
  Trophy,
  Award,
  Medal,
  Phone,
  Mail,
  BadgeCheck,
  BarChart3
} from "lucide-react";

export default function PerfilEmpresa() {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Perfil da Empresa</h1>
                <p className="text-sm text-slate-500 mt-1">Informações institucionais e conteúdos publicados</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[hsl(207,35%,78%)] hover:bg-[hsl(142,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200">
                <BarChart3 size={18} />
                Estatísticas
              </button>
              <button 
                onClick={() => navigate("/perfil-empresa/1/materiais")}
                className="px-4 py-2 bg-[hsl(207,35%,78%)] hover:bg-[hsl(142,35%,65%)] text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-200"
              >
                <FileText size={18} />
                Materiais
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Company Hero Section */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
            <div className="h-48 bg-[#F5D5B8]"></div>
            <div className="px-8 pb-8">
              <div className="flex items-start gap-6 -mt-16">
                <div className="w-32 h-32 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="text-6xl font-bold text-orange-500">I</div>
                </div>
                <div className="flex-1 pt-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-slate-800">Itaú Unibanco</h2>
                        <BadgeCheck className="w-6 h-6 text-[#F5D5B8]" fill="currentColor" />
                        <span className="px-3 py-1 bg-[#B8D4E8] text-slate-700 rounded-full text-sm font-medium">
                          Empresa Verificada
                        </span>
                      </div>
                      <p className="text-lg text-slate-600 mb-3">Maior banco privado da América Latina</p>
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>São Paulo, SP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>Fundado em 1945</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>95.000+ colaboradores</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-slate-400" />
                          <span>Presença em 18 países</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsFollowing(!isFollowing)}
                        className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                      >
                        <Star className="w-4 h-4 inline mr-2" />
                        Seguir
                      </button>
                      <button className="px-6 py-3 bg-[#F5D5B8] text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                        <Bell className="w-4 h-4 inline mr-2" />
                        Ativar Notificações
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Content - 2 columns */}
            <div className="col-span-2 space-y-6">
              {/* About Company */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-slate-600" />
                  Sobre a Empresa
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  O Itaú Unibanco é o maior banco privado do Brasil e da América Latina, com mais de 100 anos de história no mercado financeiro. A instituição oferece soluções completas em serviços bancários, investimentos, seguros e previdência, atendendo mais de 60 milhões de clientes em todo o país.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Reconhecido pela inovação e excelência em atendimento, o Itaú investe continuamente em tecnologia, sustentabilidade e educação financeira. A empresa está comprometida com o desenvolvimento do mercado financeiro brasileiro e a formação de profissionais qualificados.
                </p>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-[#F5D5B8] rounded-lg">
                    <div className="text-2xl font-bold text-slate-800 mb-1">60M+</div>
                    <div className="text-xs text-slate-600">Clientes</div>
                  </div>
                  <div className="text-center p-4 bg-[#B8D4E8] rounded-lg">
                    <div className="text-2xl font-bold text-slate-800 mb-1">4.800+</div>
                    <div className="text-xs text-slate-600">Agências</div>
                  </div>
                  <div className="text-center p-4 bg-[#C5E8D4] rounded-lg">
                    <div className="text-2xl font-bold text-slate-800 mb-1">R$ 2,3T</div>
                    <div className="text-xs text-slate-600">Ativos</div>
                  </div>
                  <div className="text-center p-4 bg-[#D4C5E8] rounded-lg">
                    <div className="text-2xl font-bold text-slate-800 mb-1">18</div>
                    <div className="text-xs text-slate-600">Países</div>
                  </div>
                </div>
              </section>

              {/* Content Overview */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <ChartBar className="w-5 h-5 text-slate-600" />
                    Conteúdos Publicados
                  </h3>
                  <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</button>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-[#D4C5E8] rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">324</div>
                    <div className="text-xs text-slate-600">Artigos</div>
                  </div>
                  <div className="text-center p-4 bg-[#B8D4E8] rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">87</div>
                    <div className="text-xs text-slate-600">Webinars</div>
                  </div>
                  <div className="text-center p-4 bg-[#C5E8D4] rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">45</div>
                    <div className="text-xs text-slate-600">E-books</div>
                  </div>
                  <div className="text-center p-4 bg-[#E8E0C5] rounded-lg">
                    <div className="text-3xl font-bold text-slate-800 mb-1">156</div>
                    <div className="text-xs text-slate-600">Podcasts</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-[#F5D5B8] transition cursor-pointer">
                    <div className="w-20 h-20 bg-[#F5D5B8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-8 h-8 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 mb-1">Tendências do Open Banking no Brasil</h4>
                      <p className="text-sm text-slate-600 mb-2">Análise completa sobre o impacto do Open Banking no mercado financeiro brasileiro e oportunidades para instituições</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">Há 1 dia</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">8.5k visualizações</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="px-2 py-0.5 bg-slate-400 text-white rounded text-xs">Open Banking</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-[#B8D4E8] transition cursor-pointer">
                    <div className="w-20 h-20 bg-[#B8D4E8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="w-8 h-8 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 mb-1">Webinar: Estratégias de Investimento 2024</h4>
                      <p className="text-sm text-slate-600 mb-2">Especialistas do Itaú discutem cenário macroeconômico e oportunidades para investidores institucionais</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">Há 3 dias</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">2.3k participantes</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="px-2 py-0.5 bg-slate-400 text-white rounded text-xs">Investimentos</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-[#C5E8D4] transition cursor-pointer">
                    <div className="w-20 h-20 bg-[#C5E8D4] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Book className="w-8 h-8 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 mb-1">E-book: Guia Completo de Meios de Pagamento</h4>
                      <p className="text-sm text-slate-600 mb-2">Manual abrangente sobre soluções de pagamento digital, PIX, cartões e tendências do setor</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">Há 1 semana</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">4.1k downloads</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="px-2 py-0.5 bg-slate-400 text-white rounded text-xs">Pagamentos</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-[#D4C5E8] transition cursor-pointer">
                    <div className="w-20 h-20 bg-[#D4C5E8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mic className="w-8 h-8 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 mb-1">Podcast: Transformação Digital no Setor Bancário</h4>
                      <p className="text-sm text-slate-600 mb-2">Série sobre como a tecnologia está revolucionando os serviços financeiros e a experiência do cliente</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">Há 2 semanas</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">6.7k ouvintes</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="px-2 py-0.5 bg-slate-400 text-white rounded text-xs">Tecnologia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content Channels */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Radio className="w-5 h-5 text-slate-600" />
                  Canais de Comunicação
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-[#F5D5B8] transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#F5D5B8] rounded-lg flex items-center justify-center">
                        <Newspaper className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Blog Corporativo</h4>
                        <p className="text-xs text-slate-500">324 artigos publicados</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Artigos sobre mercado financeiro, economia e inovação</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-[#B8D4E8] transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#B8D4E8] rounded-lg flex items-center justify-center">
                        <Video className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Webinars</h4>
                        <p className="text-xs text-slate-500">87 eventos realizados</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Eventos online com especialistas do mercado</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-[#C5E8D4] transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#C5E8D4] rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">E-books</h4>
                        <p className="text-xs text-slate-500">45 publicações</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Guias e manuais especializados</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-[#D4C5E8] transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#D4C5E8] rounded-lg flex items-center justify-center">
                        <Radio className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Podcasts</h4>
                        <p className="text-xs text-slate-500">156 episódios</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Séries sobre tendências e análises de mercado</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-[#E8E0C5] transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#E8E0C5] rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Cursos Online</h4>
                        <p className="text-xs text-slate-500">23 cursos disponíveis</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Programas de educação financeira</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-[#E8C5D8] transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#E8C5D8] rounded-lg flex items-center justify-center">
                        <LineChart className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Relatórios</h4>
                        <p className="text-xs text-slate-500">Publicações mensais</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Análises e perspectivas econômicas</p>
                  </div>
                </div>
              </section>

              {/* Company Representatives */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-slate-600" />
                    Creators da Empresa
                  </h3>
                  <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</button>
                </div>
                <p className="text-sm text-slate-600 mb-6">Profissionais que representam o Itaú e criam conteúdo na plataforma</p>
                <div className="space-y-4">
                  {[
                    { name: "Roberto Setubal", role: "Vice-Presidente do Conselho de Administração", articles: 42, followers: "15.2k", tags: ["Estratégia", "Liderança"], color: "#F5D5B8", following: false, avatar: "avatar-3.jpg" },
                    { name: "Claudia Politanski", role: "Diretora de Relações com Investidores", articles: 68, followers: "23.8k", tags: ["Mercado de Capitais"], color: "#B8D4E8", following: false, avatar: "avatar-5.jpg" },
                    { name: "Marcelo Kopel", role: "Diretor de Tecnologia e Digital", articles: 91, followers: "31.5k", tags: ["Inovação", "Tecnologia"], color: "#C5E8D4", following: true, avatar: "avatar-8.jpg" },
                    { name: "Livia Chanes", role: "Diretora Executiva de Sustentabilidade", articles: 54, followers: "18.9k", tags: ["ESG", "Sustentabilidade"], color: "#D4C5E8", following: false, avatar: "avatar-6.jpg" },
                    { name: "Ricardo Guerra", role: "Diretor de Gestão de Patrimônio", articles: 76, followers: "27.3k", tags: ["Investimentos", "Wealth"], color: "#E8E0C5", following: false, avatar: "avatar-4.jpg" },
                    { name: "Ana Paula Vescovi", role: "Diretora de Compliance e Controles", articles: 38, followers: "12.6k", tags: ["Compliance", "Governança"], color: "#E8C5D8", following: false, avatar: "avatar-7.jpg" }
                  ].map((creator, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-[#F5D5B8] transition cursor-pointer">
                      <img 
                        src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${creator.avatar}`}
                        alt={creator.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-800">{creator.name}</h4>
                          <BadgeCheck className="w-4 h-4" style={{ color: creator.color }} fill="currentColor" />
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{creator.role}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {creator.articles} artigos
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {creator.followers} seguidores
                          </span>
                          {creator.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-400 text-white rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <button 
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          creator.following 
                            ? 'bg-[#C5E8D4] text-slate-700 hover:bg-opacity-80' 
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {creator.following ? 'Seguindo' : 'Seguir'}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-600" />
                  Atividade Recente
                </h3>
                <div className="space-y-4">
                  {[
                    { text: <><span className="font-semibold">Marcelo Kopel</span> publicou um novo artigo: "Inteligência Artificial no Setor Bancário"</>, time: "Há 2 horas", color: "#F5D5B8" },
                    { text: <>Novo webinar agendado: "Perspectivas Econômicas para 2024"</>, time: "Há 5 horas", color: "#B8D4E8" },
                    { text: <><span className="font-semibold">Ricardo Guerra</span> publicou episódio do podcast sobre gestão de portfólio</>, time: "Há 1 dia", color: "#C5E8D4" },
                    { text: <>Novo e-book disponível: "Guia de Investimentos em Renda Fixa"</>, time: "Há 2 dias", color: "#D4C5E8" },
                    { text: <><span className="font-semibold">Claudia Politanski</span> compartilhou relatório trimestral de resultados</>, time: "Há 3 dias", color: "#E8E0C5" }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: activity.color }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 mb-1">{activity.text}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Statistics */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Estatísticas</h3>
                <div className="space-y-4">
                  {[
                    { icon: Users, label: "Seguidores", value: "142.5k", color: "#F5D5B8" },
                    { icon: Eye, label: "Visualizações", value: "2.8M", color: "#B8D4E8" },
                    { icon: FileText, label: "Total Conteúdos", value: "612", color: "#C5E8D4" },
                    { icon: Star, label: "Avaliação", value: "4.9/5.0", color: "#D4C5E8" }
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: stat.color }}
                        >
                          <stat.icon className="w-5 h-5 text-slate-700" />
                        </div>
                        <span className="text-sm text-slate-700">{stat.label}</span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Business Areas */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Áreas de Atuação</h3>
                <div className="space-y-3">
                  {[
                    { icon: Building, title: "Banking", desc: "Serviços bancários completos para pessoas físicas e jurídicas", color: "#F5D5B8" },
                    { icon: TrendingUp, title: "Investimentos", desc: "Gestão de ativos e wealth management", color: "#B8D4E8" },
                    { icon: Shield, title: "Seguros", desc: "Soluções completas em seguros e previdência", color: "#C5E8D4" },
                    { icon: CreditCard, title: "Cartões", desc: "Cartões de crédito e débito para todos os perfis", color: "#D4C5E8" },
                    { icon: Smartphone, title: "Digital", desc: "Soluções digitais e inovação financeira", color: "#E8E0C5" }
                  ].map((area, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <area.icon className="w-4 h-4" style={{ color: area.color }} />
                        <h4 className="font-medium text-slate-800 text-sm">{area.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Specialties */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {["Banking", "Investimentos", "Seguros", "Cartões", "Open Banking", "PIX", "Compliance", "ESG", "Inovação", "Tecnologia"].map((tag, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-400 text-white rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Certificações e Prêmios</h3>
                <div className="space-y-3">
                  {[
                    { icon: Trophy, title: "Banco Mais Valioso da América Latina", org: "Brand Finance 2024", color: "#F5D5B8" },
                    { icon: Award, title: "Melhor Banco Digital", org: "Época Negócios 2024", color: "#B8D4E8" },
                    { icon: Medal, title: "Top Employer Brasil", org: "Top Employers Institute", color: "#C5E8D4" },
                    { icon: Star, title: "Índice de Sustentabilidade", org: "B3 - ISE", color: "#D4C5E8" }
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <cert.icon className="w-5 h-5" style={{ color: cert.color }} />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{cert.title}</p>
                        <p className="text-xs text-slate-500">{cert.org}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Social Media */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Redes Sociais</h3>
                <div className="space-y-3">
                  {[
                    { icon: "linkedin", text: "linkedin.com/company/itau" },
                    { icon: "twitter", text: "@itau" },
                    { icon: "instagram", text: "@itau" },
                    { icon: "youtube", text: "Itaú Unibanco" },
                    { icon: "globe", text: "www.itau.com.br" }
                  ].map((social, idx) => (
                    <a key={idx} href="#" className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition">
                      {social.icon === "globe" ? <Globe className="w-5 h-5 text-slate-600" /> : 
                       <i className={`fab fa-${social.icon} text-slate-600 text-lg`}></i>}
                      <span className="text-sm text-slate-700">{social.text}</span>
                    </a>
                  ))}
                </div>
              </section>

              {/* Contact Info */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Informações de Contato</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-slate-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Sede</p>
                      <p className="text-xs text-slate-600">Praça Alfredo Egydio de Souza Aranha, 100<br />São Paulo, SP - 04344-902</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Phone className="w-4 h-4 text-slate-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Atendimento</p>
                      <p className="text-xs text-slate-600">4004-4828 (Capitais e regiões metropolitanas)<br />0800 728 0728 (Demais localidades)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="w-4 h-4 text-slate-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">E-mail Institucional</p>
                      <p className="text-xs text-slate-600">ri@itau-unibanco.com.br</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter */}
              <section className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Newsletter</h3>
                <p className="text-sm text-slate-600 mb-4">Receba atualizações sobre novos conteúdos e eventos</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Seu e-mail" 
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5D5B8]"
                  />
                  <button className="px-4 py-2 bg-[#F5D5B8] text-slate-700 rounded-lg text-sm font-medium hover:bg-opacity-80 transition whitespace-nowrap">
                    Inscrever
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
