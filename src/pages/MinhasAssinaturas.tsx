import { useState } from "react";
import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  ArrowLeft, 
  Download, 
  Plus, 
  Search, 
  Table2, 
  LayoutGrid,
  CheckCircle2,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  CreditCard,
  Scale,
  Globe,
  Building,
  Lightbulb,
  Handshake,
  Leaf,
  MoreVertical
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis } from "recharts";

export default function MinhasAssinaturas() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const subscriptions = [
    {
      id: 1,
      name: "Análise de Mercado Premium",
      schedule: "Segunda, 08:00",
      creator: "Ana - Analista Técnica",
      creatorRole: "Agente IA",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f28f1efee6-bb8cd63f0a8ea0129291.png",
      category: "Mercado de Capitais",
      categoryColor: "pastel-blue",
      frequency: "Semanal",
      price: "R$ 49,00",
      isPaid: true,
      status: "Ativa",
      renewal: "15 Jan 2025",
      daysUntilRenewal: "Em 18 dias",
      icon: TrendingUp
    },
    {
      id: 2,
      name: "Payments Insider",
      schedule: "Quarta, 09:00",
      creator: "Ana Costa",
      creatorRole: "Especialista PIX",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      category: "Payments",
      categoryColor: "pastel-purple",
      frequency: "Semanal",
      price: "R$ 39,00",
      isPaid: true,
      status: "Ativa",
      renewal: "22 Jan 2025",
      daysUntilRenewal: "Em 25 dias",
      icon: CreditCard
    },
    {
      id: 3,
      name: "Compliance em Foco",
      schedule: "Quinzenal, 10:00",
      creator: "Roberto Lima",
      creatorRole: "Compliance Officer",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      category: "Regulamentação",
      categoryColor: "pastel-green",
      frequency: "Quinzenal",
      price: "Gratuita",
      isPaid: false,
      status: "Ativa",
      renewal: "—",
      daysUntilRenewal: "",
      icon: Scale
    },
    {
      id: 4,
      name: "Economia em Números",
      schedule: "Sexta, 07:00",
      creator: "Marina Santos",
      creatorRole: "Economista",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      category: "Economia Global",
      categoryColor: "pastel-yellow",
      frequency: "Semanal",
      price: "Gratuita",
      isPaid: false,
      status: "Ativa",
      renewal: "—",
      daysUntilRenewal: "",
      icon: Globe
    },
    {
      id: 5,
      name: "Banking Insights",
      schedule: "Terça, 08:30",
      creator: "Ricardo - Renda Fixa",
      creatorRole: "Agente IA",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4f08e86bcd-772ce53ecbb47d504bde.png",
      category: "Banking",
      categoryColor: "pastel-pink",
      frequency: "Semanal",
      price: "R$ 45,00",
      isPaid: true,
      status: "Ativa",
      renewal: "08 Fev 2025",
      daysUntilRenewal: "Em 42 dias",
      icon: Building
    },
    {
      id: 6,
      name: "Inovação Financeira",
      schedule: "Quinta, 09:30",
      creator: "Fernanda Rocha",
      creatorRole: "Innovation Lead",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      category: "Inovação",
      categoryColor: "pastel-peach",
      frequency: "Semanal",
      price: "R$ 42,00",
      isPaid: true,
      status: "Ativa",
      renewal: "28 Jan 2025",
      daysUntilRenewal: "Em 31 dias",
      icon: Lightbulb
    },
    {
      id: 7,
      name: "Crédito & Risco",
      schedule: "Segunda, 10:00",
      creator: "Ricardo Alves",
      creatorRole: "Risk Manager",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      category: "Banking",
      categoryColor: "pastel-blue",
      frequency: "Semanal",
      price: "R$ 41,00",
      isPaid: true,
      status: "Ativa",
      renewal: "12 Fev 2025",
      daysUntilRenewal: "Em 46 dias",
      icon: Handshake
    },
    {
      id: 8,
      name: "ESG & Finanças",
      schedule: "Quinzenal, 11:00",
      creator: "Júlia Martins",
      creatorRole: "ESG Specialist",
      creatorAvatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      category: "Sustentabilidade",
      categoryColor: "pastel-green",
      frequency: "Quinzenal",
      price: "Gratuita",
      isPaid: false,
      status: "Cancelada",
      renewal: "—",
      daysUntilRenewal: "",
      icon: Leaf
    }
  ];

  const investmentBreakdown = [
    { category: "Mercado de Capitais", color: "pastel-blue", amount: "R$ 49,00", percentage: "22.7%" },
    { category: "Banking", color: "pastel-pink", amount: "R$ 86,00", percentage: "39.8%" },
    { category: "Payments", color: "pastel-purple", amount: "R$ 39,00", percentage: "18.1%" },
    { category: "Inovação", color: "pastel-peach", amount: "R$ 42,00", percentage: "19.4%" }
  ];

  const upcomingRenewals = [
    { name: "Análise de Mercado Premium", date: "15 Jan 2025", amount: "R$ 49,00" },
    { name: "Payments Insider", date: "22 Jan 2025", amount: "R$ 39,00" },
    { name: "Inovação Financeira", date: "28 Jan 2025", amount: "R$ 42,00" }
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
                onClick={() => navigate(-1)}
                className="text-slate-600 hover:text-slate-800 transition"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Minhas Assinaturas</h1>
                <p className="text-sm text-slate-500 mt-1">Gerencie todas as suas newsletters em um só lugar</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                <Download size={16} className="inline mr-2" />
                Exportar
              </button>
              <button 
                className="px-4 py-2 text-slate-700 rounded-lg font-medium hover:opacity-80 transition"
                style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.5)' }}
              >
                <Plus size={16} className="inline mr-2" />
                Nova Assinatura
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Summary Cards */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-blue) / 0.5)' }}>
                  <CheckCircle2 className="text-slate-700" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">8</h3>
              <p className="text-sm text-slate-500">Assinaturas Ativas</p>
              <p className="text-xs text-slate-600 mt-2">5 pagas, 3 gratuitas</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-green) / 0.5)' }}>
                  <DollarSign className="text-slate-700" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">R$ 216</h3>
              <p className="text-sm text-slate-500">Total Mensal</p>
              <p className="text-xs text-slate-600 mt-2">Investimento em conhecimento</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-purple) / 0.5)' }}>
                  <Calendar className="text-slate-700" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">R$ 2.592</h3>
              <p className="text-sm text-slate-500">Total Anual</p>
              <p className="text-xs text-slate-600 mt-2">Projeção 12 meses</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--pastel-yellow) / 0.5)' }}>
                  <Clock className="text-slate-700" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-1">18</h3>
              <p className="text-sm text-slate-500">Próxima Renovação</p>
              <p className="text-xs text-slate-600 mt-2">Em 18 dias</p>
            </div>
          </section>

          {/* Filters */}
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Buscar newsletter..." 
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-blue w-80"
                  />
                </div>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Todas as categorias</option>
                  <option>Mercado de Capitais</option>
                  <option>Regulamentação</option>
                  <option>Payments</option>
                  <option>Banking</option>
                  <option>Economia Global</option>
                </select>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Todos os tipos</option>
                  <option>Pagas</option>
                  <option>Gratuitas</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    viewMode === 'table' 
                      ? 'text-slate-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  style={viewMode === 'table' ? { backgroundColor: 'hsl(var(--pastel-blue) / 0.5)' } : {}}
                >
                  <Table2 size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Subscriptions Table */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Newsletter</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Creator</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tema</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Frequência</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Renovação</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {subscriptions.map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `hsl(var(--${sub.categoryColor}) / 0.5)` }}
                            >
                              <Icon className="text-slate-700" size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{sub.name}</p>
                              <p className="text-xs text-slate-500">{sub.schedule}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <img src={sub.creatorAvatar} alt={sub.creator} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="text-sm font-medium text-slate-800">{sub.creator}</p>
                              <p className="text-xs text-slate-500">{sub.creatorRole}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span 
                            className="px-2 py-1 text-slate-700 rounded text-xs font-medium"
                            style={{ backgroundColor: `hsl(var(--${sub.categoryColor}) / 0.5)` }}
                          >
                            {sub.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-800">{sub.frequency}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className={`text-sm font-semibold ${sub.isPaid ? 'text-slate-800' : 'text-green-600'}`}>
                            {sub.price}
                          </p>
                          {sub.isPaid && <p className="text-xs text-slate-500">/mês</p>}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            sub.status === "Cancelada" 
                              ? "bg-red-100 text-red-700" 
                              : "bg-green-100 text-green-700"
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-800">{sub.renewal}</p>
                          {sub.daysUntilRenewal && <p className="text-xs text-slate-500">{sub.daysUntilRenewal}</p>}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-slate-600 transition">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-50 border-t-2 border-slate-300">
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-slate-800">Total de Assinaturas Pagas:</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-2xl font-bold text-slate-800">R$ 216,00/mês</p>
                    </td>
                    <td colSpan={3} className="px-6 py-4">
                      <p className="text-xs text-slate-600">5 newsletters pagas + 3 gratuitas</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          {/* Payment Breakdown & Upcoming Renewals */}
          <section className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-800 mb-4">Distribuição de Investimento</h3>
              <div className="space-y-4">
                {investmentBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(var(--${item.color}) / 0.8)` }}
                      />
                      <span className="text-sm text-slate-600">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-800">{item.amount}</p>
                      <p className="text-xs text-slate-500">{item.percentage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-800 mb-4">Próximas Renovações</h3>
              <div className="space-y-3">
                {upcomingRenewals.map((renewal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{renewal.name}</p>
                      <p className="text-xs text-slate-500">{renewal.date}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{renewal.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-800 mb-4">Gráfico de Distribuição de Investimento</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={investmentBreakdown.map((item, index) => ({
                      name: item.category,
                      value: parseFloat(item.amount.replace('R$ ', '').replace(',', '.'))
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {investmentBreakdown.map((item, index) => {
                      const colors = {
                        'pastel-blue': 'hsl(var(--pastel-blue))',
                        'pastel-pink': 'hsl(var(--pastel-pink))',
                        'pastel-purple': 'hsl(var(--pastel-purple))',
                        'pastel-peach': 'hsl(var(--pastel-peach))'
                      };
                      return <Cell key={`cell-${index}`} fill={colors[item.color as keyof typeof colors]} />;
                    })}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-800 mb-4">Custo vs Satisfação com Assinatura</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="price" 
                    name="Custo" 
                    unit=" R$"
                    label={{ value: 'Custo Mensal (R$)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="satisfaction" 
                    name="Satisfação" 
                    unit="%"
                    label={{ value: 'Satisfação (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <ZAxis range={[100, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter 
                    name="Newsletters" 
                    data={[
                      { name: 'Análise de Mercado', price: 49, satisfaction: 92 },
                      { name: 'Payments Insider', price: 39, satisfaction: 88 },
                      { name: 'Compliance em Foco', price: 0, satisfaction: 78 },
                      { name: 'Economia em Números', price: 0, satisfaction: 82 },
                      { name: 'Banking Insights', price: 45, satisfaction: 90 },
                      { name: 'Inovação Financeira', price: 42, satisfaction: 85 },
                      { name: 'Crédito & Risco', price: 41, satisfaction: 87 },
                      { name: 'ESG & Finanças', price: 0, satisfaction: 75 }
                    ]} 
                    fill="hsl(var(--pastel-purple))"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
