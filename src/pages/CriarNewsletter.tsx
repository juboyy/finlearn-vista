import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { ArrowLeft, Plus, Search, Filter, Mail, Calendar, Eye, CheckCircle, XCircle, Percent, Users, TrendingUp, Send, Edit, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CriarNewsletter() {
  const navigate = useNavigate();
  const [selectedNewsletter, setSelectedNewsletter] = useState<number | null>(1);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const newsletters = [
    {
      id: 1,
      title: "Insights Financeiros Semanais",
      description: "Análises profundas do mercado financeiro",
      subscribers: 2847,
      openRate: 68,
      lastSent: "2024-01-15",
      status: "active",
      color: "#B8D4E8"
    },
    {
      id: 2,
      title: "Compliance em Dia",
      description: "Atualizações regulatórias e conformidade",
      subscribers: 1523,
      openRate: 72,
      lastSent: "2024-01-14",
      status: "active",
      color: "#C5E8D4"
    },
    {
      id: 3,
      title: "Payments Innovation",
      description: "Novidades em meios de pagamento",
      subscribers: 3201,
      openRate: 65,
      lastSent: "2024-01-13",
      status: "draft",
      color: "#D4C5E8"
    }
  ];

  const subscribers = [
    {
      id: 1,
      name: "Carlos Silva",
      email: "carlos.silva@empresa.com",
      subscriptionDate: "2023-08-15",
      hasDiscount: true,
      discountValue: 20,
      lastOpened: "2024-01-14",
      openRate: 85,
      channel: "Email",
      status: "active",
      company: "Fintech Brasil"
    },
    {
      id: 2,
      name: "Ana Rodrigues",
      email: "ana.rodrigues@banco.com",
      subscriptionDate: "2023-09-22",
      hasDiscount: false,
      discountValue: 0,
      lastOpened: "2024-01-15",
      openRate: 92,
      channel: "Email",
      status: "active",
      company: "Banco Regional"
    },
    {
      id: 3,
      name: "Pedro Santos",
      email: "pedro.santos@invest.com",
      subscriptionDate: "2023-07-10",
      hasDiscount: true,
      discountValue: 15,
      lastOpened: "2024-01-10",
      openRate: 78,
      channel: "WhatsApp",
      status: "active",
      company: "Investimentos Plus"
    },
    {
      id: 4,
      name: "Marina Costa",
      email: "marina.costa@tech.com",
      subscriptionDate: "2023-10-05",
      hasDiscount: false,
      discountValue: 0,
      lastOpened: null,
      openRate: 0,
      channel: "Email",
      status: "inactive",
      company: "Tech Solutions"
    },
    {
      id: 5,
      name: "Roberto Lima",
      email: "roberto.lima@consultoria.com",
      subscriptionDate: "2023-06-18",
      hasDiscount: true,
      discountValue: 25,
      lastOpened: "2024-01-15",
      openRate: 95,
      channel: "Email",
      status: "active",
      company: "Consultoria Financeira"
    },
    {
      id: 6,
      name: "Julia Mendes",
      email: "julia.mendes@startup.com",
      subscriptionDate: "2023-11-12",
      hasDiscount: false,
      discountValue: 0,
      lastOpened: "2024-01-13",
      openRate: 88,
      channel: "Telegram",
      status: "active",
      company: "Startup Inovação"
    }
  ];

  const selectedNewsletterData = newsletters.find(n => n.id === selectedNewsletter);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/newsletter')}
                  className="w-10 h-10 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center justify-center"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-800">Gerenciar Newsletters</h1>
                  <p className="text-sm text-slate-500 mt-1">Crie e gerencie suas newsletters e acompanhe seus assinantes</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                style={{ backgroundColor: '#D4C5E8' }}
              >
                <Plus size={18} className="inline mr-2" />
                Nova Newsletter
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Newsletters List */}
            <div className="col-span-3">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-slate-800 mb-3">Minhas Newsletters</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar newsletter..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  {newsletters.map((newsletter) => (
                    <button
                      key={newsletter.id}
                      onClick={() => setSelectedNewsletter(newsletter.id)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedNewsletter === newsletter.id
                          ? 'text-slate-800'
                          : 'hover:bg-slate-50'
                      }`}
                      style={selectedNewsletter === newsletter.id ? { backgroundColor: newsletter.color } : {}}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{newsletter.title}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            newsletter.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {newsletter.status === 'active' ? 'Ativa' : 'Rascunho'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">{newsletter.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {newsletter.subscribers}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp size={12} />
                          {newsletter.openRate}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9 space-y-6">
              {/* Newsletter Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                      <Users className="text-slate-700" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">{selectedNewsletterData?.subscribers}</h3>
                  <p className="text-sm text-slate-500">Total Assinantes</p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                      <Eye className="text-slate-700" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">{selectedNewsletterData?.openRate}%</h3>
                  <p className="text-sm text-slate-500">Taxa de Abertura</p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                      <Percent className="text-slate-700" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">32%</h3>
                  <p className="text-sm text-slate-500">Com Desconto</p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8E0C5' }}>
                      <Send className="text-slate-700" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">24</h3>
                  <p className="text-sm text-slate-500">Enviadas</p>
                </div>
              </div>

              {/* Subscribers Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">Assinantes</h2>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Buscar assinante..."
                          className="w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      </div>
                      <button className="w-10 h-10 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center justify-center">
                        <Filter size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="col-span-3 text-xs font-semibold text-slate-600 uppercase">Assinante</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-600 uppercase">Data Assinatura</div>
                  <div className="col-span-1 text-xs font-semibold text-slate-600 uppercase text-center">Desconto</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-600 uppercase">Última Abertura</div>
                  <div className="col-span-1 text-xs font-semibold text-slate-600 uppercase text-center">Taxa</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-600 uppercase">Canal</div>
                  <div className="col-span-1 text-xs font-semibold text-slate-600 uppercase text-right">Ações</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-slate-100">
                  {subscribers.map((subscriber) => (
                    <div
                      key={subscriber.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition"
                    >
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-slate-700"
                            style={{ backgroundColor: '#B8D4E8' }}
                          >
                            {subscriber.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-slate-800">{subscriber.name}</p>
                            <p className="text-xs text-slate-500">{subscriber.email}</p>
                            <p className="text-xs text-slate-400">{subscriber.company}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-700">
                            {new Date(subscriber.subscriptionDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1 text-center">
                        {subscriber.hasDiscount ? (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-slate-700"
                            style={{ backgroundColor: '#C5E8D4' }}
                          >
                            <CheckCircle size={12} />
                            {subscriber.discountValue}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium">
                            <XCircle size={12} />
                            Não
                          </span>
                        )}
                      </div>

                      <div className="col-span-2">
                        {subscriber.lastOpened ? (
                          <div className="flex items-center gap-2">
                            <Eye size={14} className="text-slate-400" />
                            <span className="text-sm text-slate-700">
                              {new Date(subscriber.lastOpened).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">Nunca abriu</span>
                        )}
                      </div>

                      <div className="col-span-1 text-center">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            subscriber.openRate >= 80
                              ? 'text-slate-700'
                              : subscriber.openRate >= 50
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                          style={subscriber.openRate >= 80 ? { backgroundColor: '#C5E8D4' } : {}}
                        >
                          {subscriber.openRate}%
                        </span>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-700">{subscriber.channel}</span>
                          <span
                            className={`ml-auto w-2 h-2 rounded-full ${
                              subscriber.status === 'active' ? 'bg-green-500' : 'bg-slate-300'
                            }`}
                          ></span>
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Newsletter Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Criar Nova Newsletter</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título da Newsletter</label>
                <input
                  type="text"
                  placeholder="Ex: Insights Financeiros"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                <textarea
                  placeholder="Descreva o conteúdo da newsletter..."
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Frequência</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8D4E8]">
                    <option>Semanal</option>
                    <option>Quinzenal</option>
                    <option>Mensal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cor</label>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-lg border-2 border-slate-300" style={{ backgroundColor: '#B8D4E8' }}></button>
                    <button className="w-10 h-10 rounded-lg border-2 border-transparent" style={{ backgroundColor: '#C5E8D4' }}></button>
                    <button className="w-10 h-10 rounded-lg border-2 border-transparent" style={{ backgroundColor: '#D4C5E8' }}></button>
                    <button className="w-10 h-10 rounded-lg border-2 border-transparent" style={{ backgroundColor: '#E8E0C5' }}></button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition"
                  style={{ backgroundColor: '#D4C5E8' }}
                >
                  Criar Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
