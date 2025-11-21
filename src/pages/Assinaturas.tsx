import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { 
  Bell, ArrowUpCircle, Check, Plus, Edit, Trash2, Calendar, Coins, Gift, 
  Percent, Download, CreditCard, CheckCircle, TrendingUp
} from "lucide-react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export default function Assinaturas() {
  const fadeCurrentPlanRef = useFadeInOnScroll<HTMLElement>();
  const fadePaymentMethodsRef = useFadeInOnScroll<HTMLElement>();
  const fadeBillingSummaryRef = useFadeInOnScroll<HTMLElement>();
  const fadeCouponsRef = useFadeInOnScroll<HTMLElement>();
  const fadeBillingHistoryRef = useFadeInOnScroll<HTMLElement>();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFix />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Cobrança e Assinatura</h1>
              <p className="text-sm text-slate-500 mt-1">Gerencie sua assinatura e histórico de pagamentos</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-pastel-green text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <ArrowUpCircle className="inline mr-2" size={18} />
                Upgrade Plano
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <section ref={fadeCurrentPlanRef} className="bg-white rounded-xl p-6 border border-slate-200 mb-8 opacity-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Plano Atual</h2>
              <span className="px-3 py-1 bg-pastel-green text-slate-700 rounded-full text-sm font-medium">Ativo</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">Premium</h3>
                    <p className="text-slate-600">Acesso completo a todos os recursos da plataforma</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-slate-800">R$ 197</p>
                    <p className="text-sm text-slate-500">por mês</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="text-pastel-green" size={18} />
                    <span className="text-sm text-slate-600">Acesso ilimitado a conteúdos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="text-pastel-green" size={18} />
                    <span className="text-sm text-slate-600">Chat com IA sem limites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="text-pastel-green" size={18} />
                    <span className="text-sm text-slate-600">Certificados profissionais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="text-pastel-green" size={18} />
                    <span className="text-sm text-slate-600">Suporte prioritário</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                    Alterar Plano
                  </button>
                  <button className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition">
                    Cancelar Assinatura
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-800 mb-3">Próxima Cobrança</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Data:</span>
                    <span className="font-medium text-slate-800">16 Dez 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Valor:</span>
                    <span className="font-medium text-slate-800">R$ 197,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Método:</span>
                    <span className="font-medium text-slate-800">•••• 4532</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  Atualizar Pagamento
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <section ref={fadePaymentMethodsRef} className="col-span-2 bg-white rounded-xl p-6 border border-slate-200 opacity-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Métodos de Pagamento</h2>
                <button className="px-4 py-2 bg-pastel-blue text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                  <Plus className="inline mr-2" size={18} />
                  Adicionar Cartão
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                  <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <CreditCard className="text-slate-700" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800">Visa •••• 4532</h3>
                    <p className="text-sm text-slate-500">Expira em 12/2026</p>
                  </div>
                  <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Principal</span>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-600 hover:text-slate-800">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
                  <div className="w-12 h-12 bg-pastel-purple rounded-lg flex items-center justify-center">
                    <CreditCard className="text-slate-700" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800">Mastercard •••• 8901</h3>
                    <p className="text-sm text-slate-500">Expira em 08/2025</p>
                  </div>
                  <button className="px-3 py-1 text-slate-600 border border-slate-200 rounded text-xs font-medium hover:bg-slate-50 transition">
                    Definir como Principal
                  </button>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-600 hover:text-slate-800">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-slate-600 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section ref={fadeBillingSummaryRef} className="bg-white rounded-xl p-6 border border-slate-200 opacity-0">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Resumo de Cobrança</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-pastel-green">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="text-slate-700" size={20} />
                    <span className="font-medium text-slate-800">Última Cobrança</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 197,00</p>
                  <p className="text-sm text-slate-600">16 Nov 2024</p>
                </div>

                <div className="p-4 rounded-lg bg-pastel-yellow">
                  <div className="flex items-center gap-3 mb-2">
                    <Coins className="text-slate-700" size={20} />
                    <span className="font-medium text-slate-800">Total Gasto</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 1.576,00</p>
                  <p className="text-sm text-slate-600">Últimos 12 meses</p>
                </div>

                <div className="p-4 rounded-lg bg-pastel-peach">
                  <div className="flex items-center gap-3 mb-2">
                    <Gift className="text-slate-700" size={20} />
                    <span className="font-medium text-slate-800">Economia</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 364,00</p>
                  <p className="text-sm text-slate-600">Com plano anual</p>
                </div>
              </div>
            </section>
          </div>

          <section ref={fadeCouponsRef} className="bg-white rounded-xl p-6 border border-slate-200 mb-8 opacity-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Cupons de Desconto</h2>
              <button className="px-4 py-2 bg-pastel-purple text-slate-700 rounded-lg font-medium hover:bg-opacity-80 transition">
                <Percent className="inline mr-2" size={18} />
                Aplicar Cupom
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border-2 border-dashed border-pastel-green bg-pastel-green bg-opacity-20">
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="text-slate-700" size={20} />
                  <span className="font-medium text-slate-800">SAVE20</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">20% de desconto no próximo pagamento</p>
                <p className="text-xs text-slate-500">Válido até 31/12/2024</p>
              </div>
              
              <div className="p-4 rounded-lg border-2 border-dashed border-pastel-blue bg-pastel-blue bg-opacity-20">
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="text-slate-700" size={20} />
                  <span className="font-medium text-slate-800">FRIEND50</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">R$ 50 para você e seu amigo</p>
                <p className="text-xs text-slate-500">Programa de indicação</p>
              </div>
              
              <div className="p-4 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <Plus className="text-slate-400" size={20} />
                  <span className="font-medium text-slate-500">Adicionar Cupom</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">Digite seu código de desconto</p>
                <button className="text-xs text-pastel-blue hover:underline">Inserir código</button>
              </div>
            </div>
          </section>

          <section ref={fadeBillingHistoryRef} className="bg-white rounded-xl p-6 border border-slate-200 opacity-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Histórico de Cobrança</h2>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pastel-blue">
                  <option>Todos os períodos</option>
                  <option>Últimos 3 meses</option>
                  <option>Últimos 6 meses</option>
                  <option>Último ano</option>
                </select>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition">
                  <Download className="inline mr-2" size={16} />
                  Exportar
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Data</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Descrição</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Valor</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">16 Nov 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Plano Premium - Novembro</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blue hover:underline text-sm">
                        <Download className="inline mr-1" size={14} />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">16 Out 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Plano Premium - Outubro</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blue hover:underline text-sm">
                        <Download className="inline mr-1" size={14} />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">16 Set 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Plano Premium - Setembro</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blue hover:underline text-sm">
                        <Download className="inline mr-1" size={14} />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 px-4 text-sm text-slate-800">16 Ago 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Plano Premium - Agosto</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 197,00</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blue hover:underline text-sm">
                        <Download className="inline mr-1" size={14} />
                        Baixar
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-sm text-slate-800">28 Jul 2024</td>
                    <td className="py-4 px-4 text-sm text-slate-800">Upgrade para Premium</td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">R$ 98,50</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-pastel-green text-slate-700 text-xs rounded-full">Pago</span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-pastel-blue hover:underline text-sm">
                        <Download className="inline mr-1" size={14} />
                        Baixar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500">Mostrando 5 de 12 transações</p>
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  Anterior
                </button>
                <button className="px-3 py-2 bg-pastel-blue text-slate-700 rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  2
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                  Próximo
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
