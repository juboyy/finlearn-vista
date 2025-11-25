import { useNavigate } from "react-router-dom";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, 
  Bell, 
  Download,
  Eye,
  UserCheck,
  Heart,
  FileText,
  Video,
  Book,
  Mic,
  MessageCircle,
  Star,
  Headphones,
  MapPin
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

export default function PerfilEmpresaEstatisticas() {
  const navigate = useNavigate();

  // Dados dos gráficos
  const followersData = [
    { date: '01 Nov', value: 120500 },
    { date: '08 Nov', value: 122800 },
    { date: '15 Nov', value: 125200 },
    { date: '22 Nov', value: 127800 },
    { date: '29 Nov', value: 130500 },
    { date: '06 Dez', value: 133200 },
    { date: '13 Dez', value: 135800 },
    { date: '20 Dez', value: 138200 },
    { date: '27 Dez', value: 139900 },
    { date: '03 Jan', value: 141200 },
    { date: '10 Jan', value: 142500 },
    { date: '17 Jan', value: 143800 },
    { date: '24 Jan', value: 145100 },
    { date: '31 Jan', value: 146400 }
  ];

  const contentDistribution = [
    { name: 'Artigos', value: 324, color: '#D4C5E8' },
    { name: 'Webinars', value: 87, color: '#B8D4E8' },
    { name: 'E-books', value: 45, color: '#C5E8D4' },
    { name: 'Podcasts', value: 156, color: '#E8E0C5' },
    { name: 'Cursos', value: 23, color: '#E8D4C5' },
    { name: 'Relatórios', value: 35, color: '#E8C5D8' }
  ];

  const visitorsSubscribers = [
    { month: 'Agosto', subscribers: 58200, visitors: 485000 },
    { month: 'Setembro', subscribers: 62800, visitors: 512000 },
    { month: 'Outubro', subscribers: 68500, visitors: 548000 },
    { month: 'Novembro', subscribers: 75300, visitors: 592000 },
    { month: 'Dezembro', subscribers: 82100, visitors: 635000 },
    { month: 'Janeiro', subscribers: 89400, visitors: 678000 }
  ];

  const engagementData = [
    { type: 'Artigos', rate: 5.2, color: '#D4C5E8' },
    { type: 'Webinars', rate: 6.8, color: '#B8D4E8' },
    { type: 'E-books', rate: 4.5, color: '#C5E8D4' },
    { type: 'Podcasts', rate: 7.3, color: '#E8E0C5' },
    { type: 'Cursos', rate: 8.1, color: '#F5D5B8' }
  ];

  const peakHoursData = [
    { hour: '00h', accesses: 1200 },
    { hour: '02h', accesses: 800 },
    { hour: '04h', accesses: 600 },
    { hour: '06h', accesses: 1500 },
    { hour: '08h', accesses: 8500 },
    { hour: '10h', accesses: 15200 },
    { hour: '12h', accesses: 18900 },
    { hour: '14h', accesses: 16800 },
    { hour: '16h', accesses: 14200 },
    { hour: '18h', accesses: 12500 },
    { hour: '20h', accesses: 9800 },
    { hour: '22h', accesses: 5400 }
  ];

  const retentionData = [
    { week: 'Semana 1', rate: 100 },
    { week: 'Semana 2', rate: 82 },
    { week: 'Semana 3', rate: 71 },
    { week: 'Semana 4', rate: 65 },
    { week: 'Semana 5', rate: 61 },
    { week: 'Semana 6', rate: 58 }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/perfil-empresa/1')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Estatísticas de Engajamento</h1>
                <p className="text-sm text-slate-500 mt-1">Análise detalhada do desempenho do Itaú Unibanco na plataforma</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                <Download className="w-4 h-4 inline mr-2" />
                Exportar Relatório
              </button>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Company Info Banner */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center">
                <div className="text-3xl font-bold text-orange-500">I</div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Itaú Unibanco</h2>
                <p className="text-sm text-slate-600">Período de análise: Últimos 90 dias</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">142.5k</div>
                  <div className="text-xs text-slate-500">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+18.2%</div>
                  <div className="text-xs text-slate-500">Crescimento</div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#F5D5B8] rounded-lg flex items-center justify-center">
                  <Eye className="text-slate-700 w-6 h-6" />
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">+24.5%</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">2.8M</div>
              <div className="text-sm text-slate-600">Visualizações de Perfil</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#B8D4E8] rounded-lg flex items-center justify-center">
                  <UserCheck className="text-slate-700 w-6 h-6" />
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">+31.2%</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">89.4k</div>
              <div className="text-sm text-slate-600">Novos Assinantes</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#C5E8D4] rounded-lg flex items-center justify-center">
                  <Heart className="text-slate-700 w-6 h-6" />
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">+19.8%</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">4.7</div>
              <div className="text-sm text-slate-600">Taxa de Engajamento (%)</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#D4C5E8] rounded-lg flex items-center justify-center">
                  <FileText className="text-slate-700 w-6 h-6" />
                </div>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">Estável</span>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">612</div>
              <div className="text-sm text-slate-600">Total de Conteúdos</div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Followers Growth Chart */}
            <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Crescimento de Seguidores</h3>
                  <p className="text-sm text-slate-500 mt-1">Evolução nos últimos 90 dias</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-[#F5D5B8] text-slate-700 rounded-lg text-xs font-medium">90 dias</button>
                  <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50">30 dias</button>
                  <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50">7 dias</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={followersData}>
                  <defs>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5D5B8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F5D5B8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#F5D5B8" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Content Distribution */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Distribuição de Conteúdo</h3>
                <p className="text-sm text-slate-500 mt-1">Por tipo de publicação</p>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={contentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    label={(entry) => `${entry.name}`}
                  >
                    {contentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Visitors vs Subscribers */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Visitantes vs Assinantes</h3>
                <p className="text-sm text-slate-500 mt-1">Comparativo mensal dos últimos 6 meses</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={visitorsSubscribers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="subscribers" name="Assinantes" fill="#F5D5B8" stackId="a" />
                  <Bar dataKey="visitors" name="Visitantes" fill="#B8D4E8" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Engagement Rate */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Taxa de Engajamento por Conteúdo</h3>
                <p className="text-sm text-slate-500 mt-1">Média de interações por tipo</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="rate" name="Taxa (%)">
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Content & Demographics */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Top Content */}
            <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Conteúdos Mais Populares</h3>
                <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Ver todos</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className="w-12 h-12 bg-[#F5D5B8] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-slate-700 w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 mb-1">Tendências do Open Banking no Brasil</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span><Eye className="w-3 h-3 inline mr-1" />8.5k visualizações</span>
                      <span><Heart className="w-3 h-3 inline mr-1" />1.2k curtidas</span>
                      <span><MessageCircle className="w-3 h-3 inline mr-1" />234 comentários</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+42%</div>
                    <div className="text-xs text-slate-500">crescimento</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className="w-12 h-12 bg-[#B8D4E8] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="text-slate-700 w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 mb-1">Webinar: Estratégias de Investimento 2024</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span><Eye className="w-3 h-3 inline mr-1" />2.3k participantes</span>
                      <span><Heart className="w-3 h-3 inline mr-1" />892 curtidas</span>
                      <span><MessageCircle className="w-3 h-3 inline mr-1" />156 comentários</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+38%</div>
                    <div className="text-xs text-slate-500">crescimento</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className="w-12 h-12 bg-[#C5E8D4] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Book className="text-slate-700 w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 mb-1">E-book: Guia Completo de Meios de Pagamento</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span><Download className="w-3 h-3 inline mr-1" />4.1k downloads</span>
                      <span><Heart className="w-3 h-3 inline mr-1" />743 curtidas</span>
                      <span><Star className="w-3 h-3 inline mr-1" />4.8 avaliação</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+35%</div>
                    <div className="text-xs text-slate-500">crescimento</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className="w-12 h-12 bg-[#D4C5E8] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mic className="text-slate-700 w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 mb-1">Podcast: Transformação Digital no Setor Bancário</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span><Headphones className="w-3 h-3 inline mr-1" />6.7k ouvintes</span>
                      <span><Heart className="w-3 h-3 inline mr-1" />1.5k curtidas</span>
                      <span><MessageCircle className="w-3 h-3 inline mr-1" />298 comentários</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+29%</div>
                    <div className="text-xs text-slate-500">crescimento</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Demografia da Audiência</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Gestores de Investimento</span>
                    <span className="text-sm font-semibold text-slate-800">32%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#F5D5B8] h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Analistas Financeiros</span>
                    <span className="text-sm font-semibold text-slate-800">28%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#B8D4E8] h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Gerentes de Banco</span>
                    <span className="text-sm font-semibold text-slate-800">18%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#C5E8D4] h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Consultores</span>
                    <span className="text-sm font-semibold text-slate-800">12%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#D4C5E8] h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Outros</span>
                    <span className="text-sm font-semibold text-slate-800">10%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#E8E0C5] h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-800 mb-4">Localização Principal</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-slate-400 w-4 h-4" />
                      <span className="text-sm text-slate-700">São Paulo</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-slate-400 w-4 h-4" />
                      <span className="text-sm text-slate-700">Rio de Janeiro</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">22%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-slate-400 w-4 h-4" />
                      <span className="text-sm text-slate-700">Brasília</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-slate-400 w-4 h-4" />
                      <span className="text-sm text-slate-700">Outros</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">18%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row 3 */}
          <div className="grid grid-cols-2 gap-6">
            {/* Peak Hours */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Horários de Pico de Acesso</h3>
                <p className="text-sm text-slate-500 mt-1">Distribuição de acessos por hora do dia</p>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={peakHoursData}>
                  <defs>
                    <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5E8D4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C5E8D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="accesses" stroke="#C5E8D4" strokeWidth={3} fillOpacity={1} fill="url(#colorPeak)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Retention Rate */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Taxa de Retenção</h3>
                <p className="text-sm text-slate-500 mt-1">Retenção de usuários ao longo das semanas</p>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 105]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#E8C5D8" strokeWidth={3} dot={{ fill: '#E8C5D8', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
