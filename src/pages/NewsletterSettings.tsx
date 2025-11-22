import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Undo, Save, Send, Bell, Filter, Clock, Mail, Smartphone, Monitor, MessageSquare, Plus, X, Download, ChartLine, Newspaper, Book, Mic, MessageCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewsletterSettings() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Configurações de Newsletter</h1>
              <p className="text-sm text-slate-500 mt-1">Personalize sua experiência de recebimento e leitura de newsletters</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                <Undo size={16} className="inline mr-2" />
                Restaurar Padrões
              </button>
              <button className="px-4 py-2 text-slate-800 rounded-lg font-medium hover:opacity-90 transition" style={{ backgroundColor: '#C5E8D4' }}>
                <Save size={16} className="inline mr-2" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <button className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#B8D4E8' }}>
                <Send className="text-slate-700" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">Canais de Recebimento</h3>
              <p className="text-xs text-slate-500">Email, App, SMS e mais</p>
            </button>

            <button className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#D4C5E8' }}>
                <Bell className="text-slate-700" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">Notificações e Alertas</h3>
              <p className="text-xs text-slate-500">Push, email e alertas</p>
            </button>

            <button className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#C5E8D4' }}>
                <Filter className="text-slate-700" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">Preferências de Conteúdo</h3>
              <p className="text-xs text-slate-500">Categorias e temas</p>
            </button>

            <button className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#E8E0C5' }}>
                <Clock className="text-slate-700" size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">Horários e Frequência</h3>
              <p className="text-xs text-slate-500">Quando receber</p>
            </button>
          </div>

          <section className="space-y-6">
            {/* Delivery Channels */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Canais de Entrega</h2>
                  <p className="text-sm text-slate-500 mt-1">Escolha como deseja receber suas newsletters</p>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">3 canais ativos</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                      <Mail className="text-slate-700" size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">Email Principal</h3>
                      <p className="text-xs text-slate-500">joao.silva@empresa.com.br</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Verificado</span>
                        <span className="text-xs text-slate-500">Canal principal</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Editar</button>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                      <Smartphone className="text-slate-700" size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">Aplicativo Mobile</h3>
                      <p className="text-xs text-slate-500">Push notifications e leitura offline</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">Conectado</span>
                        <span className="text-xs text-slate-500">iOS 17.2</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Configurar</button>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                      <Monitor className="text-slate-700" size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">Plataforma Web</h3>
                      <p className="text-xs text-slate-500">Acesso via navegador e notificações desktop</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Ativo</span>
                        <span className="text-xs text-slate-500">Último acesso: Hoje</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">Gerenciar</button>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8C5D8' }}>
                      <MessageSquare className="text-slate-700" size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">SMS / WhatsApp</h3>
                      <p className="text-xs text-slate-500">Resumos diários e alertas importantes</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded font-medium">Desativado</span>
                        <span className="text-xs text-slate-500">Requer verificação</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ativar</button>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <Bell className="text-blue-600 mt-1" size={16} />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Dica de Produtividade</h4>
                    <p className="text-xs text-blue-700">Ative múltiplos canais para nunca perder uma newsletter importante. O app mobile é ideal para leitura em movimento.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Notificações e Alertas</h2>
                  <p className="text-sm text-slate-500 mt-1">Configure como e quando ser notificado</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Notificações Push</h3>
                  
                  {[
                    { label: 'Nova newsletter disponível', detail: 'Instantâneo', checked: true },
                    { label: 'Resumo diário', detail: '08:00 da manhã', checked: true },
                    { label: 'Newsletters não lidas', detail: 'Lembrete após 3 dias', checked: false },
                    { label: 'Autor favorito publicou', detail: 'Prioridade alta', checked: true }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                      </div>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Alertas por Email</h3>
                  
                  {[
                    { label: 'Digest semanal', detail: 'Segundas-feiras', checked: true },
                    { label: 'Conteúdo recomendado', detail: 'Baseado em leituras', checked: true },
                    { label: 'Alertas de mercado', detail: 'Notícias urgentes', checked: true },
                    { label: 'Atualizações de assinatura', detail: 'Mudanças e novidades', checked: false }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                      </div>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Modo Não Perturbe</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <label className="text-xs font-medium text-slate-600 mb-2 block">Horário de início</label>
                    <select className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                      <option>20:00</option>
                      <option>21:00</option>
                      <option>22:00</option>
                      <option>23:00</option>
                    </select>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <label className="text-xs font-medium text-slate-600 mb-2 block">Horário de término</label>
                    <select className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                      <option>07:00</option>
                      <option>08:00</option>
                      <option>09:00</option>
                      <option>10:00</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Preferences */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Preferências de Conteúdo</h2>
                  <p className="text-sm text-slate-500 mt-1">Personalize os tipos de conteúdo que deseja receber</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Categorias de Interesse</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Economia Global', count: '63 newsletters', color: '#B8D4E8', checked: true },
                    { label: 'Mercado de Capitais', count: '52 newsletters', color: '#D4C5E8', checked: true },
                    { label: 'Meios de Pagamento', count: '48 newsletters', color: '#C5E8D4', checked: true },
                    { label: 'Banking Digital', count: '18 newsletters', color: null, checked: false },
                    { label: 'Compliance', count: '24 newsletters', color: '#E8E0C5', checked: true },
                    { label: 'Investimentos', count: '31 newsletters', color: null, checked: false },
                    { label: 'Regulamentação', count: '27 newsletters', color: '#E8C5D8', checked: true },
                    { label: 'Fintech', count: '39 newsletters', color: null, checked: false },
                    { label: 'Análise de Risco', count: '15 newsletters', color: null, checked: false }
                  ].map((cat, idx) => (
                    <label key={idx} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${cat.checked ? 'bg-opacity-30' : 'bg-slate-50 hover:bg-slate-100 transition'}`} style={cat.checked && cat.color ? { backgroundColor: cat.color + '4D', border: `2px solid ${cat.color}` } : { border: '1px solid #e2e8f0' }}>
                      <Checkbox defaultChecked={cat.checked} />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{cat.label}</p>
                        <p className="text-xs text-slate-500">{cat.count}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Tipos de Conteúdo</h3>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { icon: ChartLine, label: 'Análises', checked: true },
                    { icon: Newspaper, label: 'Notícias', checked: true },
                    { icon: Book, label: 'Estudos', checked: false },
                    { icon: Mic, label: 'Entrevistas', checked: true },
                    { icon: MessageCircle, label: 'Opinião', checked: true }
                  ].map((type, idx) => (
                    <label key={idx} className="flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:border-pastel-blue hover:bg-pastel-blue hover:bg-opacity-10 transition">
                      <Checkbox defaultChecked={type.checked} />
                      <type.icon className="text-2xl text-slate-600" size={24} />
                      <span className="text-xs font-medium text-slate-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Nível de Profundidade</h3>
                <div className="flex items-center gap-4">
                  <label className="flex-1 p-4 bg-slate-50 rounded-lg cursor-pointer" style={{ border: '2px solid #B8D4E8' }}>
                    <input type="radio" name="depth" defaultChecked className="w-4 h-4 mb-2" />
                    <p className="text-sm font-medium text-slate-800">Análise Profunda</p>
                    <p className="text-xs text-slate-500 mt-1">Conteúdo técnico e detalhado</p>
                  </label>

                  <label className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:border-pastel-blue transition">
                    <input type="radio" name="depth" className="w-4 h-4 mb-2" />
                    <p className="text-sm font-medium text-slate-800">Balanceado</p>
                    <p className="text-xs text-slate-500 mt-1">Mix de técnico e resumos</p>
                  </label>

                  <label className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:border-pastel-blue transition">
                    <input type="radio" name="depth" className="w-4 h-4 mb-2" />
                    <p className="text-sm font-medium text-slate-800">Resumos Rápidos</p>
                    <p className="text-xs text-slate-500 mt-1">Conteúdo direto ao ponto</p>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-4">Tamanho Preferido</h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    <span className="text-sm text-slate-700">Curto (2-3 min)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox defaultChecked />
                    <span className="text-sm text-slate-700">Médio (5-7 min)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span className="text-sm text-slate-700">Longo (10+ min)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Authors and Tags */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Autores e Tags</h2>
                  <p className="text-sm text-slate-500 mt-1">Siga autores específicos e filtre por tags</p>
                </div>
                <button className="px-4 py-2 text-sm text-slate-800 rounded-lg font-medium hover:opacity-90 transition" style={{ backgroundColor: '#B8D4E8' }}>
                  <Plus size={16} className="inline mr-2" />
                  Adicionar Autor
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Autores Favoritos</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Carlos Mendes', role: 'Especialista em Mercados', articles: '24 artigos', color: '#B8D4E8', avatar: 'avatar-3.jpg' },
                      { name: 'Ana Paula Santos', role: 'Analista de Compliance', articles: '18 artigos', color: '#D4C5E8', avatar: 'avatar-5.jpg' },
                      { name: 'Roberto Lima', role: 'Economia Global', articles: '32 artigos', color: '#C5E8D4', avatar: 'avatar-8.jpg' },
                      { name: 'Mariana Costa', role: 'Payments & Fintech', articles: '15 artigos', color: '#E8E0C5', avatar: 'avatar-6.jpg' }
                    ].map((author, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <img src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${author.avatar}`} className="w-10 h-10 rounded-full object-cover" alt={author.name} />
                          <div>
                            <p className="text-sm font-medium text-slate-800">{author.name}</p>
                            <p className="text-xs text-slate-500">{author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-700 px-2 py-1 rounded" style={{ backgroundColor: author.color }}>{author.articles}</span>
                          <button className="text-slate-400 hover:text-red-600"><X size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700"><Bell size={12} className="inline mr-2" />Você receberá notificação prioritária quando estes autores publicarem</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Tags de Interesse</h3>
                  <div className="mb-4">
                    <input type="text" placeholder="Adicionar nova tag..." className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue" />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['#Taxa-Selic', '#PIX', '#Banco-Central', '#Open-Banking', '#Regulação', '#LGPD', '#ESG', '#Investimentos', '#Mercado-Cambial'].map((tag, idx) => {
                      const colors = ['#B8D4E8', '#D4C5E8', '#C5E8D4', '#E8E0C5', '#E8C5D8', '#E8D4C5', '#B8D4E8', '#D4C5E8', '#C5E8D4'];
                      return (
                        <span key={idx} className="px-3 py-1.5 text-slate-800 rounded-full text-xs font-medium flex items-center gap-2" style={{ backgroundColor: colors[idx % colors.length] }}>
                          {tag}
                          <button className="hover:text-red-600"><X size={12} /></button>
                        </span>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Tags Sugeridas</h4>
                    <div className="flex flex-wrap gap-2">
                      {['#Cartões-Crédito', '#Bancos-Digitais', '#B3', '#Copom', '#CVM', '#Fundos-Investimento'].map((tag, idx) => (
                        <button key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-pastel-blue hover:text-slate-800 transition">
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-xs text-green-700"><Filter size={12} className="inline mr-2" />Newsletters serão filtradas automaticamente por estas tags</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule and Frequency */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Horários e Frequência</h2>
                  <p className="text-sm text-slate-500 mt-1">Defina quando e com que frequência receber newsletters</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Horários Preferenciais</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Entrega matinal', time: '08:00', desc: 'Newsletters prioritárias e resumo diário' },
                      { label: 'Entrega vespertina', time: '16:00', desc: 'Atualizações e análises do mercado' },
                      { label: 'Entrega noturna', time: '19:00', desc: 'Resumo do dia e leituras complementares' }
                    ].map((slot, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                        <label className="text-xs font-medium text-slate-600 mb-2 block">{slot.label}</label>
                        <select className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                          <option>{slot.time}</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-2">{slot.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Frequência de Recebimento</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-opacity-20 rounded-lg" style={{ backgroundColor: '#B8D4E84D', border: '2px solid #B8D4E8' }}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="frequency" defaultChecked className="w-4 h-4" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">Diário</p>
                          <p className="text-xs text-slate-600 mt-1">Receba todas as newsletters assim que forem publicadas</p>
                        </div>
                      </label>
                    </div>

                    {[
                      { label: 'Digest Diário', desc: 'Um único email por dia com todas as newsletters' },
                      { label: 'Semanal', desc: 'Resumo semanal todas as segundas-feiras' },
                      { label: 'Personalizado', desc: 'Escolha dias e horários específicos' }
                    ].map((freq, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-pastel-blue transition">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="frequency" className="w-4 h-4" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{freq.label}</p>
                            <p className="text-xs text-slate-600 mt-1">{freq.desc}</p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Dias da Semana</h4>
                    <div className="grid grid-cols-7 gap-2">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, idx) => (
                        <button key={idx} className={`aspect-square rounded-lg text-xs font-medium transition ${idx < 5 ? 'text-slate-800 hover:opacity-80' : 'bg-slate-200 text-slate-500 hover:text-slate-800'}`} style={idx < 5 ? { backgroundColor: '#B8D4E8' } : {}}>
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Configurações Avançadas</h2>
                  <p className="text-sm text-slate-500 mt-1">Opções adicionais de personalização</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Formato e Apresentação</h3>
                  
                  {[
                    { label: 'Modo escuro automático', detail: 'Ativar após 18:00', checked: true },
                    { label: 'Imagens em emails', detail: 'Carregar automaticamente', checked: true },
                    { label: 'Modo leitura', detail: 'Simplificar layout', checked: false }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                      </div>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <label className="text-xs font-medium text-slate-600 mb-2 block">Tamanho da fonte</label>
                    <select className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                      <option>Pequeno</option>
                      <option selected>Médio</option>
                      <option>Grande</option>
                      <option>Extra Grande</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-3">Privacidade e Dados</h3>
                  
                  {[
                    { label: 'Rastreamento de leitura', detail: 'Analytics e métricas', checked: true },
                    { label: 'Compartilhar dados anônimos', detail: 'Melhorar recomendações', checked: true },
                    { label: 'Sincronização multi-dispositivo', detail: 'Progresso em nuvem', checked: true }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
                      </div>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <label className="text-xs font-medium text-slate-600 mb-2 block">Retenção de dados</label>
                    <select className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                      <option>30 dias</option>
                      <option>90 dias</option>
                      <option selected>1 ano</option>
                      <option>Permanente</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">Exportar Configurações</h3>
                    <p className="text-xs text-slate-500">Salve suas preferências para backup ou migração</p>
                  </div>
                  <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                    <Download size={16} className="inline mr-2" />
                    Exportar JSON
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
