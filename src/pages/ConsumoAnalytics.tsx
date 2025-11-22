import { SidebarFix } from "@/components/Dashboard/SidebarFix";
import { Bell, TrendingUp, Download, Mic, Pen, Video, Coins, Receipt, Wallet, Info, ShoppingCart, Percent, Gift, Plus, Edit, Trash, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ConsumoAnalytics() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SidebarFix />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Cobrança e Assinatura</h1>
              <p className="text-sm text-slate-500 mt-1">Gerencie suas assinaturas, créditos e histórico de consumo</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Button className="bg-pastel-green hover:bg-pastel-greenBtn text-pastel-gray-dark">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plano
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Assinaturas Ativas</h2>
              <Badge className="bg-pastel-green text-pastel-gray-dark border-0">3 Ativas</Badge>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="p-4 rounded-lg border border-pastel-blue bg-pastel-blue bg-opacity-20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">Newsletter Diária</h3>
                  <i className="fas fa-envelope text-slate-600"></i>
                </div>
                <p className="text-sm text-slate-600 mb-4">Análises do mercado financeiro todos os dias</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-800">R$ 49,90/mês</span>
                  <button className="text-xs text-slate-600 hover:text-slate-800">Gerenciar</button>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-pastel-purple bg-pastel-purple bg-opacity-20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">Relatórios Semanais</h3>
                  <i className="fas fa-file-alt text-slate-600"></i>
                </div>
                <p className="text-sm text-slate-600 mb-4">Relatórios detalhados de tendências</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-800">R$ 79,90/mês</span>
                  <button className="text-xs text-slate-600 hover:text-slate-800">Gerenciar</button>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-pastel-green bg-pastel-green bg-opacity-20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">Insights Premium</h3>
                  <i className="fas fa-star text-slate-600"></i>
                </div>
                <p className="text-sm text-slate-600 mb-4">Conteúdo exclusivo de especialistas</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-800">R$ 129,90/mês</span>
                  <button className="text-xs text-slate-600 hover:text-slate-800">Gerenciar</button>
                </div>
              </div>
            </div>
            <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition">
              <Plus className="w-4 h-4 inline-block mr-2" />
              Adicionar Nova Assinatura
            </button>
          </section>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <section className="col-span-2 bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Saldo de Créditos IA</h2>
                <Button className="bg-pastel-yellow hover:bg-opacity-80 text-pastel-gray-dark">
                  <Coins className="w-4 h-4 mr-2" />
                  Comprar Créditos
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-pastel-blue bg-opacity-30">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-medium text-slate-700">Voz</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">1.250</p>
                  <p className="text-xs text-slate-600">créditos disponíveis</p>
                  <div className="mt-3 bg-slate-200 rounded-full h-2">
                    <div className="bg-pastel-blue h-2 rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-pastel-purple bg-opacity-30">
                  <div className="flex items-center gap-2 mb-2">
                    <Pen className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-medium text-slate-700">Escrita</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">3.840</p>
                  <p className="text-xs text-slate-600">créditos disponíveis</p>
                  <div className="mt-3 bg-slate-200 rounded-full h-2">
                    <div className="bg-pastel-purple h-2 rounded-full" style={{ width: '76.8%' }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-pastel-pink bg-opacity-30">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-medium text-slate-700">Vídeo</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">420</p>
                  <p className="text-xs text-slate-600">créditos disponíveis</p>
                  <div className="mt-3 bg-slate-200 rounded-full h-2">
                    <div className="bg-pastel-pink h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Custo por crédito</span>
                    <Info className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Voz:</span>
                      <span className="font-medium text-slate-800">R$ 0,05</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Escrita:</span>
                      <span className="font-medium text-slate-800">R$ 0,02</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Vídeo:</span>
                      <span className="font-medium text-slate-800">R$ 0,15</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Pacotes disponíveis</span>
                    <ShoppingCart className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">1.000 créditos:</span>
                      <span className="font-medium text-slate-800">R$ 39,90</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">5.000 créditos:</span>
                      <span className="font-medium text-slate-800">R$ 179,90</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">10.000 créditos:</span>
                      <span className="font-medium text-slate-800">R$ 329,90</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Resumo do Mês</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-pastel-green">
                  <div className="flex items-center gap-3 mb-2">
                    <Receipt className="w-5 h-5 text-slate-700" />
                    <span className="font-medium text-slate-800">Total Assinaturas</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 259,70</p>
                  <p className="text-sm text-slate-600">Novembro 2024</p>
                </div>

                <div className="p-4 rounded-lg bg-pastel-yellow">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-robot text-slate-700"></i>
                    <span className="font-medium text-slate-800">Créditos IA</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 187,35</p>
                  <p className="text-sm text-slate-600">Consumo do mês</p>
                </div>

                <div className="p-4 rounded-lg bg-pastel-peach">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="w-5 h-5 text-slate-700" />
                    <span className="font-medium text-slate-800">Total Geral</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">R$ 447,05</p>
                  <p className="text-sm text-slate-600">Novembro 2024</p>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Histórico de Consumo</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      15/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Geração de texto com IA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Escrita
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 text-right">
                      R$ 2,50
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      14/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Geração de vídeo curto
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Vídeo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 text-right">
                      R$ 7,50
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      14/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Transcrição de áudio
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Voz
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 text-right">
                      R$ 1,25
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-sm text-slate-600 hover:text-slate-800">
                Ver Mais
              </button>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Métodos de Pagamento</h2>
              <Button className="bg-pastel-blue hover:bg-opacity-80 text-pastel-gray-dark">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Cartão
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                  <i className="fab fa-cc-visa text-2xl text-slate-600"></i>
                  <div>
                    <p className="font-medium text-slate-800">Visa **** 1234</p>
                    <p className="text-sm text-slate-600">Expira em 12/25</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                  <i className="fab fa-cc-mastercard text-2xl text-slate-600"></i>
                  <div>
                    <p className="font-medium text-slate-800">Mastercard **** 5678</p>
                    <p className="text-sm text-slate-600">Expira em 08/26</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Cupons de Desconto</h2>
              <Button className="bg-pastel-yellow hover:bg-opacity-80 text-pastel-gray-dark">
                <Percent className="w-4 h-4 mr-2" />
                Resgatar Cupom
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                  <Gift className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Cupom de 10% OFF</p>
                    <p className="text-sm text-slate-600">Expira em 30/11/2024</p>
                  </div>
                </div>
                <Badge className="bg-pastel-green text-pastel-gray-dark border-0">Ativo</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                  <Ticket className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-800">Cupom de R$20 OFF</p>
                    <p className="text-sm text-slate-600">Expira em 15/12/2024</p>
                  </div>
                </div>
                <Badge className="bg-slate-200 text-slate-500 border-0">Disponível</Badge>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Histórico de Pagamentos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Método
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      10/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Assinatura Insights Premium
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Visa **** 1234
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 text-right">
                      R$ 129,90
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      05/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Compra de 5.000 créditos IA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Mastercard **** 5678
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 text-right">
                      R$ 179,90
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      01/11/2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Assinatura Newsletter Diária
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                      Visa **** 1234
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 text-right">
                      R$ 49,90
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-sm text-slate-600 hover:text-slate-800">
                Ver Mais
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
