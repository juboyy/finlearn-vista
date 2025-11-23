import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Download, Bell, Settings2, XCircle, Calendar, BookOpen, Clock, FileText, Podcast, Video, File, BookText, Search, ChevronLeft, ChevronRight, CreditCard, Receipt, Play, Heart, Share2, ThumbsUp, CheckCircle2, AlertCircle, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function MinhaAssinatura() {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <Link to="/newsletter" className="hover:text-slate-700">Newsletter</Link>
                  <ChevronRight size={14} />
                  <span className="text-slate-800 font-medium">Minha Assinatura</span>
                </div>
                <h1 className="text-2xl font-semibold text-slate-800">Payments Insider</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-slate-800 rounded-lg font-medium hover:bg-opacity-80 transition" style={{ backgroundColor: '#B8D4E8' }}>
                  <Download size={18} className="inline mr-2" />
                  Exportar Relatório
                </button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition" title="Notificações">
                  <Bell size={18} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 text-slate-800 rounded-full font-medium" style={{ backgroundColor: '#D4C5E8' }}>Assinante Premium</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-600">Renovação: 23 Dez 2023</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Subscription Header */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#D4C5E8' }}>
                  <FileText className="text-slate-700" size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Payments Insider</h2>
                  <p className="text-sm text-slate-600 mb-3">Por Ana Paula Costa • Especialista em Meios de Pagamento</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-slate-500" size={16} />
                      <span className="text-slate-600">Membro desde Abr 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-slate-500" size={16} />
                      <span className="text-slate-600">47 conteúdos lidos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-slate-500" size={16} />
                      <span className="text-slate-600">8h 32min de leitura</span>
                    </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
              <DialogTrigger asChild>
                <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                  <Settings2 size={18} className="inline mr-2" />
                  Gerenciar
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-slate-800">Gerenciar Assinatura</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Subscription Info */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Payments Insider - Premium</h3>
                        <p className="text-sm text-slate-600">Plano mensal com renovação automática</p>
                      </div>
                      <span className="px-3 py-1.5 text-slate-800 rounded-full text-xs font-bold" style={{ backgroundColor: '#C5E8D4' }}>
                        <CheckCircle2 size={12} className="inline mr-1" />
                        Ativa
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Valor Mensal</div>
                        <div className="text-2xl font-bold text-slate-800">R$ 49,00</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Próxima Cobrança</div>
                        <div className="text-lg font-semibold text-slate-800">23 Dez 2023</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Membro Desde</div>
                        <div className="text-lg font-semibold text-slate-800">15 Abr 2023</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Método de Pagamento</h3>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                          <CreditCard className="text-slate-700" size={24} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 mb-1">Visa •••• 4532</div>
                          <div className="text-sm text-slate-500">Expira em 12/2025</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                        Alterar
                      </button>
                    </div>
                  </div>

                  {/* Invoices */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800">Histórico de Faturas</h3>
                      <button className="text-sm font-medium hover:underline" style={{ color: '#8b5cf6' }}>
                        Ver todas
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { date: '23 Nov 2023', amount: 'R$ 49,00', status: 'Pago', invoice: 'INV-2023-11-001' },
                        { date: '23 Out 2023', amount: 'R$ 49,00', status: 'Pago', invoice: 'INV-2023-10-001' },
                        { date: '23 Set 2023', amount: 'R$ 49,00', status: 'Pago', invoice: 'INV-2023-09-001' },
                        { date: '23 Ago 2023', amount: 'R$ 49,00', status: 'Pago', invoice: 'INV-2023-08-001' },
                      ].map((invoice, index) => (
                        <div key={index} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                              <Receipt className="text-slate-700" size={18} />
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 mb-1">{invoice.date}</div>
                              <div className="text-xs text-slate-500">{invoice.invoice}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold text-slate-800">{invoice.amount}</div>
                              <div className="text-xs text-green-600 font-medium">{invoice.status}</div>
                            </div>
                            <button 
                              onClick={() => setSelectedInvoice(invoice)}
                              className="px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition"
                            >
                              <Download size={14} className="inline mr-1" />
                              PDF
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Benefícios Inclusos</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: FileText, label: 'Artigos ilimitados', color: '#B8D4E8' },
                        { icon: Podcast, label: 'Podcasts exclusivos', color: '#D4C5E8' },
                        { icon: Video, label: 'Webinars mensais', color: '#E8D4C5' },
                        { icon: File, label: 'Relatórios Deep Dive', color: '#C5E8D4' },
                        { icon: BookText, label: 'Biblioteca E-books', color: '#E8C5D8' },
                        { icon: Heart, label: 'Comunidade Premium', color: '#E8E0C5' },
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: benefit.color }}>
                            <benefit.icon className="text-slate-700" size={16} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{benefit.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border border-red-200 rounded-xl p-5 bg-red-50/30">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="text-red-600 shrink-0" size={20} />
                      <div>
                        <h3 className="font-bold text-slate-800 mb-1">Cancelar Assinatura</h3>
                        <p className="text-sm text-slate-600">
                          Ao cancelar, você perderá acesso a todos os benefícios premium no final do período atual (23 Dez 2023).
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition">
                      <XCircle size={18} className="inline mr-2" />
                      Cancelar Assinatura
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B8D4E8' }}>
                  <FileText className="text-slate-700" size={20} />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">+12%</span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">124</div>
              <div className="text-sm text-slate-600">Artigos Disponíveis</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D4C5E8' }}>
                  <Podcast className="text-slate-700" size={20} />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">+2</span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">18</div>
              <div className="text-sm text-slate-600">Podcasts Exclusivos</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8D4C5' }}>
                  <Video className="text-slate-700" size={20} />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">+1</span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">6</div>
              <div className="text-sm text-slate-600">Webinars Gravados</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C5E8D4' }}>
                  <File className="text-slate-700" size={20} />
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">+3</span>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">12</div>
              <div className="text-sm text-slate-600">Relatórios Deep Dive</div>
            </div>
          </section>

          {/* Content Tabs */}
          <section className="bg-white rounded-2xl border border-slate-200 mb-8">
            <div className="border-b border-slate-200 px-6">
              <div className="flex gap-6">
                <button className="px-4 py-4 border-b-2 text-slate-800 font-medium" style={{ borderColor: '#D4C5E8' }}>
                  <FileText size={16} className="inline mr-2" />
                  Artigos (124)
                </button>
                <button className="px-4 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition">
                  <Podcast size={16} className="inline mr-2" />
                  Podcasts (18)
                </button>
                <button className="px-4 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition">
                  <Video size={16} className="inline mr-2" />
                  Webinars (6)
                </button>
                <button className="px-4 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition">
                  <File size={16} className="inline mr-2" />
                  Relatórios (12)
                </button>
                <button className="px-4 py-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition">
                  <BookText size={16} className="inline mr-2" />
                  E-books (8)
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Buscar conteúdo..." 
                      className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 w-80"
                      style={{ '--tw-ring-color': '#D4C5E8' } as React.CSSProperties}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  </div>
                  <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ '--tw-ring-color': '#D4C5E8' } as React.CSSProperties}>
                    <option>Todos os tópicos</option>
                    <option>PIX</option>
                    <option>Open Finance</option>
                    <option>Fintechs</option>
                    <option>Regulação</option>
                    <option>Inovação</option>
                  </select>
                  <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ '--tw-ring-color': '#D4C5E8' } as React.CSSProperties}>
                    <option>Mais recentes</option>
                    <option>Mais antigos</option>
                    <option>Mais lidos</option>
                    <option>Não lidos</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        <input type="checkbox" className="rounded border-slate-300" />
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Título</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Categoria</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Data</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Tempo</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: "Drex: O que muda para o varejo em 2024", subtitle: "Análise completa sobre implementação do Real Digital", category: "Regulação", date: "20 Nov 2023", time: "12 min", status: "lido", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-cc3eeac0dc56bb648ccb.png", categoryBg: '#B8D4E8' },
                      { title: "Open Finance: Dados de conversão revelados", subtitle: "Relatório exclusivo com métricas dos principais bancos", category: "Open Finance", date: "18 Nov 2023", time: "15 min", status: "nao-lido", badge: "NOVO", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-640177462dea5e4389d0.png", categoryBg: '#D4C5E8' },
                      { title: "PIX Automático: Estratégias de adoção", subtitle: "Como grandes varejistas estão implementando recorrência", category: "PIX", date: "15 Nov 2023", time: "10 min", status: "lendo", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/412d9e8d3c-5b783ac9bdcf2157dc2d.png", categoryBg: '#C5E8D4' },
                      { title: "Fintechs vs Bancos: Guerra de taxas 2024", subtitle: "Análise comparativa de precificação no mercado", category: "Fintechs", date: "13 Nov 2023", time: "18 min", status: "lido", favorited: true, image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3ff4a772cc-7580381a35e8e40fb5d6.png", categoryBg: '#E8D4C5' },
                      { title: "Bacen anuncia novas regras para carteiras digitais", subtitle: "Impactos para empresas de meios de pagamento", category: "Regulação", date: "10 Nov 2023", time: "8 min", status: "lido", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-cc3eeac0dc56bb648ccb.png", categoryBg: '#B8D4E8' },
                      { title: "Como a Nubank está revolucionando crédito", subtitle: "Análise de modelos de scoring e aprovação instantânea", category: "Inovação", date: "8 Nov 2023", time: "14 min", status: "nao-lido", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/4130ae5a64-640177462dea5e4389d0.png", categoryBg: '#E8C5D8' },
                      { title: "Cartões de crédito: O fim está próximo?", subtitle: "Tendências globais e o futuro dos pagamentos no Brasil", category: "Tendências", date: "5 Nov 2023", time: "16 min", status: "lido", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/412d9e8d3c-5b783ac9bdcf2157dc2d.png", categoryBg: '#E8E0C5' },
                      { title: "Embedded Finance: Cases de sucesso no Brasil", subtitle: "Como empresas não-financeiras estão monetizando serviços", category: "Inovação", date: "3 Nov 2023", time: "20 min", status: "nao-lido", image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/2cd1c67dd4-920f4b14030d7b9c806d.png", categoryBg: '#E8C5D8' }
                    ].map((article, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition">
                        <td className="py-4 px-4">
                          <input type="checkbox" className="rounded border-slate-300" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                              <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800 text-sm mb-0.5 flex items-center gap-2">
                                {article.title}
                                {article.badge && (
                                  <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold">{article.badge}</span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500">{article.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 text-slate-700 rounded text-xs font-medium" style={{ backgroundColor: article.categoryBg }}>{article.category}</span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600">{article.date}</td>
                        <td className="py-4 px-4 text-sm text-slate-600">{article.time}</td>
                        <td className="py-4 px-4">
                          {article.status === 'lido' && (
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium flex items-center gap-1 w-fit">
                              <ThumbsUp size={12} />
                              Lido
                            </span>
                          )}
                          {article.status === 'nao-lido' && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium flex items-center gap-1 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              Não lido
                            </span>
                          )}
                          {article.status === 'lendo' && (
                            <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium flex items-center gap-1 w-fit">
                              <Clock size={12} />
                              Lendo
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition" title={article.status === 'lido' ? 'Ler novamente' : article.status === 'lendo' ? 'Continuar' : 'Ler'}>
                              {article.status === 'lendo' ? <Play size={14} /> : <BookOpen size={14} />}
                            </button>
                            <button className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition ${article.favorited ? 'text-red-500' : 'text-slate-600'}`} title="Favoritar">
                              <Heart size={14} fill={article.favorited ? 'currentColor' : 'none'} />
                            </button>
                            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition" title="Compartilhar">
                              <Share2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  Mostrando <span className="font-semibold">1-8</span> de <span className="font-semibold">124</span> artigos
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition disabled:opacity-50" disabled>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="px-3 py-2 text-slate-800 rounded-lg text-sm font-medium" style={{ backgroundColor: '#D4C5E8' }}>1</button>
                  <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition">2</button>
                  <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition">3</button>
                  <span className="px-2 text-slate-400">...</span>
                  <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition">16</button>
                  <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="grid grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Podcasts Recentes</h3>
                <Podcast className="text-slate-400" size={24} />
              </div>
              <div className="space-y-3">
                {[
                  { title: "EP 18: PIX Internacional", duration: "42 min", date: "15 Nov", bg: '#D4C5E8' },
                  { title: "EP 17: Fraudes em 2023", duration: "38 min", date: "8 Nov", bg: '#B8D4E8' },
                  { title: "EP 16: Entrevista Stone", duration: "55 min", date: "1 Nov", bg: '#C5E8D4' }
                ].map((podcast, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: podcast.bg }}>
                      <Play className="text-slate-700" size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{podcast.title}</div>
                      <div className="text-xs text-slate-500">{podcast.duration} • {podcast.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                Ver todos os podcasts
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Webinars Gravados</h3>
                <Video className="text-slate-400" size={24} />
              </div>
              <div className="space-y-3">
                {[
                  { title: "Drex na Prática", duration: "1h 15min", date: "12 Nov", bg: '#E8D4C5' },
                  { title: "Open Finance Q&A", duration: "58 min", date: "5 Nov", bg: '#E8C5D8' },
                  { title: "Regulação 2024", duration: "1h 32min", date: "29 Out", bg: '#E8E0C5' }
                ].map((webinar, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: webinar.bg }}>
                      <Video className="text-slate-700" size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{webinar.title}</div>
                      <div className="text-xs text-slate-500">{webinar.duration} • {webinar.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                Ver todos os webinars
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Biblioteca E-books</h3>
                <BookText className="text-slate-400" size={24} />
              </div>
              <div className="space-y-3">
                {[
                  { title: "Guia PIX 2024", pages: "86 páginas", bg: '#C5E8D4' },
                  { title: "Open Finance Completo", pages: "142 páginas", bg: '#B8D4E8' },
                  { title: "Fintechs no Brasil", pages: "98 páginas", bg: '#D4C5E8' }
                ].map((ebook, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: ebook.bg }}>
                      <File className="text-slate-700" size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{ebook.title}</div>
                      <div className="text-xs text-slate-500">{ebook.pages} • PDF</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                Ver toda a biblioteca
              </button>
            </div>
          </section>

          {/* Subscription Management */}
          <section className="bg-slate-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full -mr-32 -mt-32" style={{ backgroundColor: '#D4C5E8' }}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 rounded-full -ml-24 -mb-24" style={{ backgroundColor: '#B8D4E8' }}></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gerenciar Assinatura</h3>
                  <p className="text-slate-300">Controle completo sobre sua conta e preferências</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400 mb-1">Próxima cobrança</div>
                  <div className="text-xl font-bold text-white">23 Dez 2023</div>
                  <div className="text-sm text-slate-300">R$ 49,00</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition group">
                  <CreditCard className="text-2xl mb-3 group-hover:scale-110 transition-transform" style={{ color: '#B8D4E8' }} size={28} />
                  <div className="text-white font-semibold mb-1">Método de Pagamento</div>
                  <div className="text-xs text-slate-300">Atualizar cartão</div>
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition group">
                  <Bell className="text-2xl mb-3 group-hover:scale-110 transition-transform" style={{ color: '#C5E8D4' }} size={28} />
                  <div className="text-white font-semibold mb-1">Notificações</div>
                  <div className="text-xs text-slate-300">Configurar alertas</div>
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-left transition group">
                  <Receipt className="text-2xl mb-3 group-hover:scale-110 transition-transform" style={{ color: '#E8E0C5' }} size={28} />
                  <div className="text-white font-semibold mb-1">Histórico</div>
                  <div className="text-xs text-slate-300">Ver faturas</div>
                </button>
                <button className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 text-left transition group">
                  <XCircle className="text-2xl text-red-300 mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <div className="text-white font-semibold mb-1">Cancelar</div>
                  <div className="text-xs text-red-200">Encerrar assinatura</div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Invoice Modal */}
      <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden p-0">
          {selectedInvoice && (
            <div className="bg-gradient-to-br from-slate-50 to-white overflow-y-auto max-h-[85vh]">
              {/* Invoice Header with decorative background */}
              <div className="relative px-8 pt-8 pb-6 mb-6" style={{ background: 'linear-gradient(135deg, #D4C5E8 0%, #B8D4E8 100%)' }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <FileText className="text-slate-700" size={28} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 mb-1">FATURA</h2>
                      <p className="text-sm text-slate-700 font-medium">Payments Insider</p>
                    </div>
                  </div>
                  <div className="text-right bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="text-xs text-slate-600 mb-1">Fatura Nº</div>
                    <div className="text-xl font-bold text-slate-800 mb-2">{selectedInvoice.invoice}</div>
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5" style={{ backgroundColor: '#C5E8D4', color: '#4a5568' }}>
                      <CheckCircle2 size={12} />
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8">
                {/* Dates Section - Compact */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-lg p-3 border border-slate-200" style={{ backgroundColor: '#E8D4C5' }}>
                    <div className="text-xs text-slate-700 font-medium mb-1">Data de Emissão</div>
                    <div className="font-bold text-slate-800">{selectedInvoice.date}</div>
                  </div>
                  <div className="rounded-lg p-3 border border-slate-200" style={{ backgroundColor: '#D4C5E8' }}>
                    <div className="text-xs text-slate-700 font-medium mb-1">Vencimento</div>
                    <div className="font-bold text-slate-800">{selectedInvoice.date}</div>
                  </div>
                  <div className="rounded-lg p-3 border border-slate-200" style={{ backgroundColor: '#C5E8D4' }}>
                    <div className="text-xs text-slate-700 font-medium mb-1">Pagamento</div>
                    <div className="font-bold text-slate-800">{selectedInvoice.date}</div>
                  </div>
                </div>

                {/* Company and Customer Info - Side by side, compact */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-700 mb-3" style={{ color: '#6b7280' }}>EMISSOR</div>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2">
                        <Building2 size={14} className="text-slate-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-800 text-sm">Payments Insider Ltda</div>
                          <div className="text-xs text-slate-600">CNPJ: 12.345.678/0001-90</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-500 mt-0.5 shrink-0" />
                        <div className="text-xs text-slate-600">Av. Paulista, 1000 - 10º andar, São Paulo, SP</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-500 shrink-0" />
                        <div className="text-xs text-slate-600">contato@paymentsinsider.com.br</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-700 mb-3" style={{ color: '#6b7280' }}>CLIENTE</div>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2">
                        <Building2 size={14} className="text-slate-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-800 text-sm">João Silva</div>
                          <div className="text-xs text-slate-600">CPF: 123.456.789-00</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-500 mt-0.5 shrink-0" />
                        <div className="text-xs text-slate-600">Rua das Flores, 123, São Paulo, SP</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-500 shrink-0" />
                        <div className="text-xs text-slate-600">joao.silva@email.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Items - Compact table */}
                <div className="mb-6">
                  <div className="text-sm font-bold text-slate-800 mb-3">Itens da Fatura</div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#D4C5E8' }}>
                        <tr>
                          <th className="text-left text-xs font-bold text-slate-700 px-4 py-3">Descrição</th>
                          <th className="text-center text-xs font-bold text-slate-700 px-4 py-3">Período</th>
                          <th className="text-right text-xs font-bold text-slate-700 px-4 py-3">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-800 text-sm">Assinatura Premium</div>
                            <div className="text-xs text-slate-600">Payments Insider - Acesso completo</div>
                          </td>
                          <td className="px-4 py-3 text-center text-xs text-slate-600">
                            23 Nov - 22 Dez 2023
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-slate-800">
                            R$ 49,00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Summary and Method - Side by side */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl p-4 border border-slate-200 shadow-sm" style={{ backgroundColor: '#B8D4E8' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center">
                        <CreditCard className="text-slate-700" size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-700 font-medium mb-0.5">Método de Pagamento</div>
                        <div className="font-bold text-slate-800 text-sm">Visa •••• 4532</div>
                        <div className="text-xs text-slate-600 mt-1">Comprovante: #PAY-2023-11-4532</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-semibold text-slate-800">R$ 49,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Descontos</span>
                        <span className="font-semibold text-slate-800">R$ 0,00</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">Total</span>
                        <span className="text-2xl font-bold text-slate-800">{selectedInvoice.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 text-white rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]" style={{ backgroundColor: '#D4C5E8' }}>
                    <Download size={18} className="inline mr-2" />
                    Baixar PDF
                  </button>
                  <button className="flex-1 px-4 py-3 text-white rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]" style={{ backgroundColor: '#B8D4E8' }}>
                    <Mail size={18} className="inline mr-2" />
                    Enviar por Email
                  </button>
                </div>

                {/* Footer Notes - Compact */}
                <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200 space-y-0.5">
                  <p>Esta é uma fatura eletrônica válida para todos os fins legais.</p>
                  <p className="text-slate-400">Documento gerado em {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
